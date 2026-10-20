import { db, pool, checkDatabaseConnection } from "./index.js";
import { users, pantryItems, recipes, recipeIngredients, rescuePartners, badges, userBadges } from "./schema/index.js";

export async function runSeed() {
  console.log("🌱 Menjalankan Seeder Data BEKAL...");

  const isConnected = await checkDatabaseConnection();
  if (!isConnected) {
    console.warn("⚠️ Melewati penulisan seeder ke database karena PostgreSQL belum aktif.");
    return;
  }

  try {
    // 1. Seed User
    const [user] = await db
      .insert(users)
      .values({
        id: "usr_andi_pratama_01",
        name: "Andi Pratama",
        email: "andi@domain.com",
        role: "consumer",
        householdType: "small",
        householdPortions: 3,
        tier: "free",
        xp: 820,
        level: 4,
        levelTitle: "Zero-Waste Warrior",
        kitchenHealthScore: 78,
      })
      .onConflictDoNothing()
      .returning();

    // 2. Seed Initial Pantry Items
    const now = new Date();
    const expiry2Days = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    const expiry1Days = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
    const expiry5Days = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    const expiry3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    await db
      .insert(pantryItems)
      .values([
        {
          userId: "usr_andi_pratama_01",
          name: "Tomat Segar",
          category: "Bahan Basah",
          quantity: "3.0",
          unit: "kg",
          storageLocation: "chiller_sayur",
          purchaseDate: now,
          expiryDate: expiry2Days,
          estimatedShelfLifeDays: 8,
          riskScore: 85,
          riskLevel: "high",
        },
        {
          userId: "usr_andi_pratama_01",
          name: "Daging Ayam Fillet",
          category: "Protein Segar",
          quantity: "500",
          unit: "g",
          storageLocation: "kulkas_utama",
          purchaseDate: now,
          expiryDate: expiry1Days,
          estimatedShelfLifeDays: 3,
          riskScore: 80,
          riskLevel: "high",
        },
        {
          userId: "usr_andi_pratama_01",
          name: "Susu UHT Plain",
          category: "Dairy & Olahan",
          quantity: "1",
          unit: "L",
          storageLocation: "pintu_kulkas",
          purchaseDate: now,
          expiryDate: expiry5Days,
          estimatedShelfLifeDays: 14,
          riskScore: 45,
          riskLevel: "medium",
        },
        {
          userId: "usr_andi_pratama_01",
          name: "Bayam Hijau",
          category: "Sayuran Segar",
          quantity: "2",
          unit: "Ikat",
          storageLocation: "crisper_box",
          purchaseDate: now,
          expiryDate: expiry3Days,
          estimatedShelfLifeDays: 4,
          riskScore: 60,
          riskLevel: "medium",
        },
      ])
      .onConflictDoNothing();

    // 3. Seed Partners
    await db
      .insert(rescuePartners)
      .values([
        {
          name: "Warung Makan Bu Sari",
          type: "warung_makan",
          description: "Warung nasi rames & aneka sayur rumahan.",
          address: "Jl. Melati No. 12, Kebayoran",
          latitude: "-6.241500",
          longitude: "106.794200",
          contactWhatsapp: "081234567890",
          isVerified: true,
          rating: "4.90",
          canPickup: true,
          neededIngredients: ["Tomat", "Ayam", "Bayam"],
        },
        {
          name: "Dapur Nusa Catering",
          type: "catering",
          description: "Katering harian rumahan & dapur sosial.",
          address: "Jl. Gandaria Tengah No. 4",
          latitude: "-6.243500",
          longitude: "106.791200",
          contactWhatsapp: "081234567891",
          isVerified: true,
          rating: "4.85",
          canPickup: true,
          neededIngredients: ["Tomat", "Ayam"],
        },
      ])
      .onConflictDoNothing();

    // 4. Seed Badges
    await db
      .insert(badges)
      .values([
        { id: "anti_promo_trap", title: "Anti-Promo Trap", description: "Mencegah 5x overbuy", iconName: "verified_user" },
        { id: "rescue_chef", title: "Rescue Chef", description: "Memasak 10 resep penyelamat", iconName: "skillet" },
        { id: "pahlawan_warung", title: "Pahlawan Warung", description: "Salurkan 5kg bahan ke UMKM", iconName: "storefront" },
      ])
      .onConflictDoNothing();

    console.log("✅ Seeding data BEKAL selesai.");
  } catch (err: any) {
    console.error("❌ Error running seed:", err.message);
  } finally {
    await pool.end();
  }
}

if (process.argv[1] && process.argv[1].includes("seed")) {
  runSeed();
}
