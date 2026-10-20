import { db } from "../db/index.js";
import { pantryItems, receipts } from "../db/schema/index.js";
import { eq, and, desc, gte } from "drizzle-orm";
import { aiService, OcrExtractedItem } from "./ai.service.js";

const inMemoryPantry: any[] = [
  {
    id: "item_tomat_01",
    userId: "usr_andi_pratama_01",
    name: "Tomat Segar",
    category: "Bahan Basah",
    quantity: "3.0",
    unit: "kg",
    storageLocation: "chiller_sayur",
    expiryDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    estimatedShelfLifeDays: 2,
    riskScore: 85,
    riskLevel: "high",
    isConsumed: false,
    isDonated: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1wR-H3Dj3GC9R6e-JZaBWNuDA7GdVL13qaEZBvlzXiPB2PYfvytB2mdc41F4gmfjNxcj8FsE6zvUmN2abwHuUVF-4mMrZP2xjRvZxQXgMHWpi4p2gvn6ey-2_pmWjMIdgdbds837OB3LkGuTtp76dQw2mUeHggnyPxPUriWc--MPoxOtkMWxkYpH54hqyH3_zD8fqrkVlnyICi8pq7p_S49AUbnUZXkDu0Fq-z8yD2Igqn7m8arxN"
  },
  {
    id: "item_ayam_02",
    userId: "usr_andi_pratama_01",
    name: "Daging Ayam Fillet",
    category: "Protein Segar",
    quantity: "500",
    unit: "g",
    storageLocation: "kulkas_utama",
    expiryDate: new Date(Date.now() + 1 * 86400000).toISOString(),
    estimatedShelfLifeDays: 1,
    riskScore: 80,
    riskLevel: "high",
    isConsumed: false,
    isDonated: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz-DacYyzA8P8T3Iyvann3ISnUne9sWd-8_5eQbCICYs40p7dx82E1vpo2TgNdIXRd7ICVyMHBvBl5_e0kr1OC1X8G5JBN50CyvtZaLsWMNcN_jL5yoz3a7VOhnvLDy4jaC2gUPgHEBwjgE2q-sCvboeSBZMpP1wotKUOrFZeQhyYThL6fCDawB8TiWwJk7MMFa7bwTrRcXgjKemKoededA0_trqT_L0QU4qNw1eOcSlZdw4tOEBN5"
  },
  {
    id: "item_susu_03",
    userId: "usr_andi_pratama_01",
    name: "Susu UHT Plain",
    category: "Dairy & Olahan",
    quantity: "1",
    unit: "L",
    storageLocation: "pintu_kulkas",
    expiryDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    estimatedShelfLifeDays: 5,
    riskScore: 45,
    riskLevel: "medium",
    isConsumed: false,
    isDonated: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvGRZFQgISRDodFOwDdIZt0dBad-vl46ZhytHUdcKtL4oFbZ0FfbR6zb4etOiN_ytMWc-M09FqxTK83uxfkyLaCSTcNZ_X5jlOLkF_lzc6dho0Vw4mULdY2qv0WUnk41CaGRM6CAFxyjpKsY3PHp2uyyZI06NY-RaAHBLXaNbUYTDZmnfne254MFR71L2BC-JSXtaifM4qabKM-W87ob-tBTwUawDxK5MH1foqZ7B_7c03yVX9N0IS"
  },
  {
    id: "item_bayam_04",
    userId: "usr_andi_pratama_01",
    name: "Bayam Hijau",
    category: "Sayuran Segar",
    quantity: "2",
    unit: "Ikat",
    storageLocation: "crisper_box",
    expiryDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    estimatedShelfLifeDays: 3,
    riskScore: 60,
    riskLevel: "medium",
    isConsumed: false,
    isDonated: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG9cUsfY3Hr4ADazWm0LK75LnWuIKsFAX-p_5VwrtE4M90M9k8yHJJTD3MucpGD1_9UNSjJwhFAx47aVcJC3zjcVDbkzXCOP8VY6Ya2bVkenkmbdYaZI3lDLDfYtziTwVlBWf3T-Ya3k9YjUIBJqsLUu9zBqTRhivgBbYyK-mZYuJoafql2dgOM1lhoRn5xRyhTwZwLRUT0PCRE7r3_qnwktYtDUtsX_1RgXmq2iswLeLWMSdQVgKC"
  }
];

export class PantryService {
  async getPantry(userId: string, filter?: { storageLocation?: string; riskLevel?: string }) {
    try {
      const conditions = [eq(pantryItems.userId, userId), eq(pantryItems.isConsumed, false), eq(pantryItems.isDonated, false)];

      const items = await db
        .select()
        .from(pantryItems)
        .where(and(...conditions))
        .orderBy(desc(pantryItems.riskScore));

      if (!filter) return items.length > 0 ? items : inMemoryPantry;

      return items.filter((item) => {
        if (filter.storageLocation && item.storageLocation !== filter.storageLocation) return false;
        if (filter.riskLevel && item.riskLevel !== filter.riskLevel) return false;
        return true;
      });
    } catch (e: any) {
      console.warn("DB query fallback in getPantry:", e.message);
      let items = inMemoryPantry;
      if (filter) {
        items = items.filter((item) => {
          if (filter.storageLocation && item.storageLocation !== filter.storageLocation) return false;
          if (filter.riskLevel && item.riskLevel !== filter.riskLevel) return false;
          return true;
        });
      }
      return items;
    }
  }

  async addItem(userId: string, data: {
    name: string;
    category: string;
    quantity: number;
    unit: string;
    storageLocation: "chiller_sayur" | "kulkas_utama" | "crisper_box" | "pintu_kulkas" | "freezer" | "suhu_ruang_pantry";
    shelfLifeDays: number;
    imageUrl?: string;
  }) {
    const purchaseDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(purchaseDate.getDate() + data.shelfLifeDays);

    // Initial risk score calculation
    let riskScore = 20;
    if (data.shelfLifeDays <= 2) riskScore = 85;
    else if (data.shelfLifeDays <= 4) riskScore = 60;
    else if (data.shelfLifeDays <= 7) riskScore = 40;

    const riskLevel: "low" | "medium" | "high" = riskScore >= 70 ? "high" : riskScore >= 40 ? "medium" : "low";

    try {
      const [inserted] = await db
        .insert(pantryItems)
        .values({
          userId,
          name: data.name,
          category: data.category,
          quantity: data.quantity.toString(),
          unit: data.unit,
          storageLocation: data.storageLocation,
          purchaseDate,
          expiryDate,
          estimatedShelfLifeDays: data.shelfLifeDays,
          riskScore,
          riskLevel,
          imageUrl: data.imageUrl,
        })
        .returning();

      if (inserted) inMemoryPantry.unshift(inserted);
      return inserted;
    } catch {
      const fallbackItem = {
        id: "item_" + Math.random().toString(36).substring(7),
        userId,
        name: data.name,
        category: data.category,
        quantity: data.quantity.toString(),
        unit: data.unit,
        storageLocation: data.storageLocation,
        purchaseDate,
        expiryDate: expiryDate.toISOString(),
        estimatedShelfLifeDays: data.shelfLifeDays,
        riskScore,
        riskLevel,
        imageUrl: data.imageUrl,
        isConsumed: false,
        isDonated: false,
      };
      inMemoryPantry.unshift(fallbackItem);
      return fallbackItem;
    }
  }

  async updateItem(userId: string, itemId: string, updateData: Partial<typeof pantryItems.$inferInsert>) {
    try {
      const [updated] = await db
        .update(pantryItems)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(and(eq(pantryItems.id, itemId as any), eq(pantryItems.userId, userId)))
        .returning();

      return updated;
    } catch {
      const found = inMemoryPantry.find(i => i.id === itemId);
      if (found) Object.assign(found, updateData);
      return found;
    }
  }

  async deleteItem(userId: string, itemId: string) {
    try {
      await db
        .delete(pantryItems)
        .where(and(eq(pantryItems.id, itemId as any), eq(pantryItems.userId, userId)));
    } catch {
      const idx = inMemoryPantry.findIndex(i => i.id === itemId);
      if (idx !== -1) inMemoryPantry.splice(idx, 1);
    }
    return { success: true };
  }

  /**
   * Pemindaian Struk / Foto Bahan (Smart Pantry Passport)
   */
  async scanReceipt(userId: string, imagePayload: string) {
    // 1. Ekstraksi AI OCR
    const ocrResult = await aiService.processReceiptImage(imagePayload);

    // 2. Simpan catatan receipt (jika DB terhubung)
    let receiptId = "rcp_" + Date.now();
    try {
      const [savedReceipt] = await db
        .insert(receipts)
        .values({
          userId,
          merchantName: ocrResult.merchantName,
          totalAmount: ocrResult.totalAmountRp.toString(),
          itemCount: ocrResult.items.length,
          rawOcrJson: JSON.stringify(ocrResult.items),
          scanImageUrl: imagePayload.startsWith("http") ? imagePayload : undefined,
        })
        .returning();
      if (savedReceipt) receiptId = savedReceipt.id;
    } catch (e: any) {
      console.warn("DB save receipt notice:", e.message);
    }

    return {
      receiptId,
      merchantName: ocrResult.merchantName,
      receiptDate: ocrResult.receiptDate,
      totalAmountRp: ocrResult.totalAmountRp,
      detectedItems: ocrResult.items,
    };
  }

  /**
   * Konfirmasi / Koreksi Manual setelah Scan Struk
   */
  async confirmReceiptItems(userId: string, receiptId: string, confirmedItems: OcrExtractedItem[]) {
    const insertedItems = [];

    for (const item of confirmedItems) {
      const purchaseDate = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(purchaseDate.getDate() + (item.estimatedShelfLifeDays || 5));

      let riskScore = 20;
      if (item.estimatedShelfLifeDays <= 2) riskScore = 85;
      else if (item.estimatedShelfLifeDays <= 4) riskScore = 60;
      else if (item.estimatedShelfLifeDays <= 7) riskScore = 40;

      const riskLevel: "low" | "medium" | "high" = riskScore >= 70 ? "high" : riskScore >= 40 ? "medium" : "low";

      try {
        const [inserted] = await db
          .insert(pantryItems)
          .values({
            userId,
            name: item.name,
            category: item.category,
            quantity: item.quantity.toString(),
            unit: item.unit,
            storageLocation: item.suggestedStorage || "suhu_ruang_pantry",
            purchaseDate,
            expiryDate,
            estimatedShelfLifeDays: item.estimatedShelfLifeDays,
            riskScore,
            riskLevel,
            receiptId: receiptId.length === 36 ? (receiptId as any) : null,
            ocrConfidence: item.confidence.toString(),
            isManualCorrection: item.confidence < 0.8,
          })
          .returning();
        if (inserted) {
          insertedItems.push(inserted);
          inMemoryPantry.unshift(inserted);
        }
      } catch (e: any) {
        const fallback = {
          id: "item_" + Math.random().toString(36).substring(7),
          userId,
          name: item.name,
          quantity: item.quantity.toString(),
          unit: item.unit,
          category: item.category,
          storageLocation: item.suggestedStorage || "chiller_sayur",
          expiryDate: expiryDate.toISOString(),
          estimatedShelfLifeDays: item.estimatedShelfLifeDays || 5,
          riskScore,
          riskLevel,
          isConsumed: false,
          isDonated: false,
        };
        insertedItems.push(fallback);
        inMemoryPantry.unshift(fallback);
      }
    }

    return insertedItems;
  }

  /**
   * Riwayat Inventaris & Konsumsi (Free: 30 hari, Premium: tanpa batas)
   */
  async getHistory(userId: string, isPremium: boolean) {
    const conditions = [eq(pantryItems.userId, userId)];

    if (!isPremium) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      conditions.push(gte(pantryItems.createdAt, thirtyDaysAgo));
    }

    return db
      .select()
      .from(pantryItems)
      .where(and(...conditions))
      .orderBy(desc(pantryItems.createdAt));
  }
}

export const pantryService = new PantryService();
