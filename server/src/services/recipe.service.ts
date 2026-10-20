import { db } from "../db/index.js";
import { recipes, recipeIngredients, cookingSessions, pantryItems, users } from "../db/schema/index.js";
import { eq, and, desc } from "drizzle-orm";
import { aiService } from "./ai.service.js";

export class RecipeService {
  /**
   * Menampilkan Rekomendasi Rescue Recipe diprioritaskan dari bahan dapur paling kritis
   */
  async getRescueRecommendations(userId: string, filter?: { category?: string; isPremium?: boolean }) {
    try {
      // 1. Ambil bahan berisiko tinggi milik user
      const userItems = await db
        .select()
        .from(pantryItems)
        .where(
          and(
            eq(pantryItems.userId, userId),
            eq(pantryItems.isConsumed, false),
            eq(pantryItems.isDonated, false)
          )
        )
        .orderBy(desc(pantryItems.riskScore));

      const highRiskItems = userItems.filter((i) => i.riskScore >= 60);

      // 2. Ambil daftar resep dari DB
      const dbRecipes = await db.select().from(recipes);

      if (dbRecipes.length === 0) {
        // Fallback default recipe dataset kurasi BEKAL jika DB belum di-seed
        return this.getDefaultCuratedRecipes(highRiskItems, filter?.category);
      }

      // 3. Score resep berdasarkan bahan berisiko yang terselamatkan
      const scoredRecipes = [];

      for (const r of dbRecipes) {
        const ingredients = await db
          .select()
          .from(recipeIngredients)
          .where(eq(recipeIngredients.recipeId, r.id));

        let rescueScore = 50;
        const matchedItems: string[] = [];

        for (const ing of ingredients) {
          const match = userItems.find((ui) =>
            ui.name.toLowerCase().includes(ing.ingredientName.toLowerCase()) ||
            ing.ingredientName.toLowerCase().includes(ui.name.toLowerCase())
          );
          if (match) {
            matchedItems.push(match.name);
            rescueScore += match.riskScore * 0.4;
          }
        }

        if (filter?.category && filter.category !== "all") {
          if (filter.category === "quick" && r.cookingTimeMinutes > 20) continue;
          if (filter.category === "budget" && r.budgetCategory !== "hemat") continue;
          if (filter.category === "family" && !r.isFamilyFriendly) continue;
        }

        scoredRecipes.push({
          ...r,
          rescueScore: Math.min(99, Math.round(rescueScore)),
          isTopPriority: rescueScore >= 80,
          matchedIngredients: matchedItems,
          savingTag: matchedItems.length > 0 ? `Selamatkan ${matchedItems.join(" & ")}` : "Resep Bergizi",
        });
      }

      return scoredRecipes.sort((a, b) => b.rescueScore - a.rescueScore);
    } catch (e: any) {
      return this.getDefaultCuratedRecipes([], filter?.category);
    }
  }

  /**
   * Selesai Masak Flow (Complete Cooking)
   * Mengurangi stok pantry otomatis, mencatat kilogram & rupiah terselamatkan, menambah XP gamifikasi.
   */
  async completeCooking(userId: string, data: {
    recipeId: string;
    recipeTitle: string;
    foodSavedKg: number;
    moneySavedRp: number;
    xpEarned?: number;
    deductions: Array<{ pantryItemId?: string; ingredientName: string; quantity: number; unit: string }>;
  }) {
    const xpToAdd = data.xpEarned || 50;
    const foodKg = data.foodSavedKg || 0.8;
    const moneyRp = data.moneySavedRp || 35000;

    // 1. Potong stok pantry yang dipakai
    for (const d of data.deductions) {
      if (d.pantryItemId) {
        try {
          const [existing] = await db
            .select()
            .from(pantryItems)
            .where(and(eq(pantryItems.id, d.pantryItemId as any), eq(pantryItems.userId, userId)));

          if (existing) {
            const currentQty = parseFloat(existing.quantity);
            const remaining = currentQty - d.quantity;
            if (remaining <= 0) {
              await db
                .update(pantryItems)
                .set({ isConsumed: true, quantity: "0", updatedAt: new Date() })
                .where(eq(pantryItems.id, existing.id));
            } else {
              await db
                .update(pantryItems)
                .set({ quantity: remaining.toFixed(2), updatedAt: new Date() })
                .where(eq(pantryItems.id, existing.id));
            }
          }
        } catch (e) {
          // Non-blocking
        }
      }
    }

    // 2. Catat sesi memasak
    let savedSession = null;
    try {
      if (data.recipeId && data.recipeId.length === 36) {
        [savedSession] = await db
          .insert(cookingSessions)
          .values({
            userId,
            recipeId: data.recipeId as any,
            foodSavedKg: foodKg.toString(),
            moneySavedRp: moneyRp.toString(),
            xpEarned: xpToAdd,
            deductedPantryItems: data.deductions,
          })
          .returning();
      }
    } catch (e) {
      // Non-blocking
    }

    // 3. Tambahkan XP pengguna dan update health score
    let newLevel = 1;
    let newXp = 0;
    try {
      const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      if (user) {
        newXp = user.xp + xpToAdd;
        newLevel = Math.floor(newXp / 250) + 1;
        let title = user.levelTitle;
        if (newLevel >= 4) title = "Zero-Waste Warrior";
        if (newLevel >= 5) title = "Earth Guardian";

        await db
          .update(users)
          .set({
            xp: newXp,
            level: newLevel,
            levelTitle: title,
            kitchenHealthScore: Math.min(99, user.kitchenHealthScore + 2),
            updatedAt: new Date(),
          })
          .where(eq(users.id, userId));
      }
    } catch (e) {
      // Non-blocking
    }

    return {
      success: true,
      message: `Selamat! Masakan selesai. Kamu menyelamatkan ${foodKg} kg bahan dan menghemat Rp${moneyRp.toLocaleString("id-ID")}`,
      xpEarned: xpToAdd,
      foodSavedKg: foodKg,
      moneySavedRp: moneyRp,
    };
  }

  private getDefaultCuratedRecipes(highRiskItems: any[], categoryFilter?: string) {
    const list = [
      {
        id: "rcp-sambal-tomat",
        title: "Sambal Tomat Terasi & Ayam Suwir",
        description: "Pedas gurih segar, mengolah tuntas tomat matang dan daging ayam.",
        cookingTimeMinutes: 20,
        servings: 2,
        budgetCategory: "hemat",
        isFamilyFriendly: true,
        rescueScore: 85,
        isTopPriority: true,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsRIUz0H3lurmScfZVaiQYbwib_CDcDtWtTPmRzqMaN_6xihwhOa1_R77okFuXOsfNfEjS5_kuNBR1oH0YdOU5abmZkHUPA4OKgDablfDNttzUHElNxrN1MvZpSWhaqXi3y8fZiUWJYcMgVe1gsteyd67UPv-atIhcEsd_hPcmyCie1KdpzCmIzNo1R0Ng_JUkYy5_FVmv79bZcSbkdmbWYU1e9ftb1cQKUoBpwjg9H5SAcNIb3pZq",
        savingTag: "Selamatkan 1 kg Tomat + 250g Ayam",
        matchedIngredients: ["Tomat Segar", "Daging Ayam Fillet"],
      },
      {
        id: "rcp-semur-ayam",
        title: "Semur Ayam Tomat Manis Gurih",
        description: "Kombinasi kuah manis kecap dan asam segar tomat untuk makan malam keluarga.",
        cookingTimeMinutes: 25,
        servings: 3,
        budgetCategory: "hemat",
        isFamilyFriendly: true,
        rescueScore: 80,
        isTopPriority: false,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcM6LyXlAPH_K_ktaLenZLWcsi9bwsro6xsJ8ao8l5OB3qb2sJmqzz-5VpiiVJw8iF3-RFnmMPgymmMeONaANA7uywBvoBzUN_N3Z5LCL0ksCqT8tREFDH5g3C7tBNUOm3mAg562YiLL0wRf5GAhMrcYqF_kqsqzT9MlRtu8RknQBvgLa8rGZARvMcEsryXiJX-Ux_HxBLJoa8cfUm0Htku9EOYMKWXXGWio_nlLGQq-D84rWw_JRf",
        savingTag: "Selamatkan 500g Daging Ayam",
        matchedIngredients: ["Daging Ayam Fillet"],
      },
      {
        id: "rcp-tumis-bayam",
        title: "Tumis Bayam Bawang Putih Kuah Bening",
        description: "Masakan kilat kaya serat untuk menghabiskan sayuran segar hari ini.",
        cookingTimeMinutes: 12,
        servings: 2,
        budgetCategory: "hemat",
        isFamilyFriendly: true,
        rescueScore: 60,
        isTopPriority: false,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG9cUsfY3Hr4ADazWm0LK75LnWuIKsFAX-p_5VwrtE4M90M9k8yHJJTD3MucpGD1_9UNSjJwhFAx47aVcJC3zjcVDbkzXCOP8VY6Ya2bVkenkmbdYaZI3lDLDfYtziTwVlBWf3T-Ya3k9YjUIBJqsLUu9zBqTRhivgBbYyK-mZYuJoafql2dgOM1lhoRn5xRyhTwZwLRUT0PCRE7r3_qnwktYtDUtsX_1RgXmq2iswLeLWMSdQVgKC",
        savingTag: "Selamatkan 2 Ikat Bayam",
        matchedIngredients: ["Bayam Hijau"],
      },
    ];

    if (categoryFilter && categoryFilter !== "all") {
      if (categoryFilter === "quick") return list.filter((r) => r.cookingTimeMinutes <= 20);
      if (categoryFilter === "budget") return list.filter((r) => r.budgetCategory === "hemat");
      if (categoryFilter === "family") return list.filter((r) => r.isFamilyFriendly);
    }

    return list;
  }
}

export const recipeService = new RecipeService();
