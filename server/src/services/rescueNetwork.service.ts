import { db } from "../db/index.js";
import { rescuePartners, rescueListings, rescueListingItems, users, pantryItems } from "../db/schema/index.js";
import { eq, and, desc } from "drizzle-orm";

export class RescueNetworkService {
  /**
   * Cari mitra UMKM & Komunitas terdekat (Warung Rescue Network)
   */
  async getNearbyPartners(userLat: number, userLng: number, radiusKm = 2.0) {
    try {
      const allPartners = await db
        .select()
        .from(rescuePartners)
        .where(eq(rescuePartners.isVerified, true));

      if (allPartners.length === 0) {
        return this.getDefaultCuratedPartners(userLat, userLng);
      }

      // Hitung jarak Haversine (km)
      return allPartners
        .map((partner) => {
          const lat = parseFloat(partner.latitude);
          const lng = parseFloat(partner.longitude);
          const distance = this.calculateHaversineDistance(userLat, userLng, lat, lng);
          return {
            ...partner,
            distanceKm: parseFloat(distance.toFixed(2)),
          };
        })
        .filter((p) => p.distanceKm <= radiusKm)
        .sort((a, b) => a.distanceKm - b.distanceKm);
    } catch (e: any) {
      return this.getDefaultCuratedPartners(userLat, userLng);
    }
  }

  /**
   * Cocokkan bahan berlebih di kulkas dengan kebutuhan bahan mitra
   */
  async matchPantryWithPartners(userId: string) {
    try {
      const items = await db
        .select()
        .from(pantryItems)
        .where(
          and(
            eq(pantryItems.userId, userId),
            eq(pantryItems.isConsumed, false),
            eq(pantryItems.isDonated, false)
          )
        );

      const excessPantry = items.filter((i) => i.riskScore >= 60);
      const partners = await this.getNearbyPartners(-6.2415, 106.7942, 3.0);

      return partners.map((p) => {
        const needed = Array.isArray(p.neededIngredients) ? p.neededIngredients : ["Tomat", "Ayam", "Bayam"];
        const matched = excessPantry.filter((ep) =>
          needed.some((n: any) => ep.name.toLowerCase().includes(n.toLowerCase()))
        );

        return {
          partnerId: p.id,
          partnerName: p.name,
          partnerType: p.type,
          distanceKm: p.distanceKm,
          matchedCount: matched.length,
          matchedItems: matched.map((m) => m.name),
        };
      });
    } catch (e) {
      return [];
    }
  }

  /**
   * Buat Penawaran Redistribusi (Donasi / Jual Murah)
   */
  async createListing(userId: string, data: {
    partnerId?: string;
    listingType: "donation" | "discount_sale" | "donasi" | "jual_murah";
    priceRp?: number;
    foodConditionNote: string;
    itemPhotoUrl?: string;
    totalWeightKg: number;
    items: Array<{ pantryItemId?: string; itemName: string; quantity: number; unit: string }>;
  }) {
    const note = data.foodConditionNote || "Bahan pangan segar bersih, disimpan rapi dalam chiller.";
    const listingType: "donation" | "discount_sale" =
      (data.listingType === "donasi" || data.listingType === "donation") ? "donation" : "discount_sale";

    try {
      const [listing] = await db
        .insert(rescueListings)
        .values({
          donorUserId: userId,
          partnerId: data.partnerId ? (data.partnerId as any) : null,
          listingType,
          status: "open",
          priceRp: (data.priceRp || 0).toString(),
          foodConditionNote: note,
          itemPhotoUrl: data.itemPhotoUrl,
          totalWeightKg: (data.totalWeightKg || 1).toString(),
          beneficiariesCount: Math.max(1, Math.round((data.totalWeightKg || 1) * 2)),
        })
        .returning();

      // Catat item detail
      if (listing && data.items) {
        for (const item of data.items) {
          try {
            await db.insert(rescueListingItems).values({
              listingId: listing.id,
              pantryItemId: item.pantryItemId ? (item.pantryItemId as any) : null,
              itemName: item.itemName,
              quantity: item.quantity.toString(),
              unit: item.unit,
            });

            // Tandai item di pantry sebagai sedang disalurkan
            if (item.pantryItemId) {
              await db
                .update(pantryItems)
                .set({ isDonated: true, updatedAt: new Date() })
                .where(eq(pantryItems.id, item.pantryItemId as any));
            }
          } catch {
            // DB non-blocking
          }
        }
      }

      return listing;
    } catch {
      return {
        id: "list_" + Date.now(),
        donorUserId: userId,
        partnerId: data.partnerId,
        listingType,
        status: "open",
        totalWeightKg: data.totalWeightKg,
        foodConditionNote: note,
        beneficiariesCount: Math.max(1, Math.round((data.totalWeightKg || 1) * 2)),
        createdAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Verifikasi Serah Terima Fisik Bahan (Quality Control & Gamification Reward)
   */
  async completeHandover(listingId: string, handoverPhotoUrl: string) {
    const [listing] = await db
      .select()
      .from(rescueListings)
      .where(eq(rescueListings.id, listingId as any));

    if (!listing) throw new Error("Listing tidak ditemukan");

    await db
      .update(rescueListings)
      .set({
        status: "completed",
        handoverPhotoUrl,
        completedAt: new Date(),
      })
      .where(eq(rescueListings.id, listingId as any));

    // Berikan reward poin XP ke donatur (+80 XP)
    const [donor] = await db.select().from(users).where(eq(users.id, listing.donorUserId));
    if (donor) {
      await db
        .update(users)
        .set({
          xp: donor.xp + 80,
          updatedAt: new Date(),
        })
        .where(eq(users.id, donor.id));
    }

    return {
      success: true,
      message: "Serah terima sukses diverifikasi! +80 XP telah ditambahkan ke akun donatur.",
      foodWeightKg: listing.totalWeightKg,
    };
  }

  private calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private getDefaultCuratedPartners(userLat: number, userLng: number) {
    return [
      {
        id: "partner-bu-sari",
        name: "Warung Makan Bu Sari",
        type: "warung_makan",
        description: "Warung nasi rames & sayur matang legendaris.",
        address: "Jl. Melati No. 12, Kebayoran",
        distanceKm: 0.3,
        contactWhatsapp: "081234567890",
        rating: "4.90",
        totalReviews: 48,
        canPickup: true,
        neededIngredients: ["Tomat", "Ayam", "Cabai", "Bayam"],
      },
      {
        id: "partner-dapur-nusa",
        name: "Dapur Nusa Catering",
        type: "catering",
        description: "Katering harian rumahan & dapur sosial.",
        address: "Jl. Gandaria Tengah No. 4",
        distanceKm: 0.55,
        contactWhatsapp: "081234567891",
        rating: "4.85",
        totalReviews: 32,
        canPickup: true,
        neededIngredients: ["Tomat Segar", "Daging Ayam", "Wortel"],
      },
      {
        id: "partner-komunitas-berbagi",
        name: "Komunitas Berbagi Pangan",
        type: "komunitas_sosial",
        description: "Food rescue & shelter pembagian makan berkah mahasiswa.",
        address: "Komplek STAN Kampus Bintaro",
        distanceKm: 1.2,
        contactWhatsapp: "081234567892",
        rating: "5.00",
        totalReviews: 120,
        canPickup: false,
        neededIngredients: ["Beras", "Telur", "Sayuran Segar", "Minyak Goreng"],
      },
      {
        id: "partner-kedai-kopi",
        name: "Kedai Kopi & Roti Lokal",
        type: "kedai_kopi",
        description: "Kedai kopi ramah lingkungan, mengolah buah segar untuk mocktail.",
        address: "Jl. Bintaro Utama Sektor 3",
        distanceKm: 0.8,
        contactWhatsapp: "081234567893",
        rating: "4.75",
        totalReviews: 29,
        canPickup: true,
        neededIngredients: ["Susu UHT", "Gula", "Buah Segar"],
      },
    ];
  }
}

export const rescueNetworkService = new RescueNetworkService();
