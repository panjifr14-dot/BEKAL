import { db } from "../db/index.js";
import { promoTrapChecks, users } from "../db/schema/index.js";
import { eq } from "drizzle-orm";

export class PromoTrapService {
  /**
   * Evaluasi Cek Risiko Promo Trap Sebelum Transaksi
   */
  async evaluatePromoDeal(userId: string, data: any) {
    const itemName = data.itemName || data.productName || "Tomat Segar";
    const normalPrice = Number(data.normalPrice || data.normalPriceRp || 45000);
    const promoPrice = Number(data.promoPrice || data.promoPriceRp || 27000);
    const plannedQuantity = Number(data.plannedQuantity || data.promoQuantity || 3.0);
    const unit = data.unit || "kg";
    const shelfLifeDays = Number(data.shelfLifeDays || 9);

    // 1. Ambil profil konsumsi rumah tangga
    let householdType = "small";
    try {
      const userList = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      if (userList.length > 0) {
        householdType = userList[0].householdType;
      }
    } catch (e) {
      // Fallback
    }

    // Benchmark laju konsumsi mingguan berdasarkan tipe rumah tangga
    let weeklyRate = 0.6; // kg per minggu untuk small household (2-3 org)
    if (householdType === "solo") weeklyRate = 0.3;
    else if (householdType === "large") weeklyRate = 1.2;

    const dailyRate = weeklyRate / 7;

    // Hitung kuantitas aman yang sanggup dihabiskan sebelum busuk
    const rawSafeQuantity = dailyRate * shelfLifeDays;
    const safeQuantity = parseFloat((Math.min(plannedQuantity, Math.max(0.5, rawSafeQuantity * 1.5))).toFixed(1));

    const isOverbuy = plannedQuantity > safeQuantity;
    const potentialWasteQuantity = isOverbuy ? parseFloat((plannedQuantity - safeQuantity).toFixed(1)) : 0;

    // Estimasi kerugian finansial (uang yang terbuang sia-sia karena bahan busuk)
    const pricePerUnit = plannedQuantity > 0 ? promoPrice / plannedQuantity : 0;
    const potentialFinancialLossRp = Math.round(potentialWasteQuantity * pricePerUnit);

    const discountPercent = normalPrice > 0 ? Math.round(((normalPrice - promoPrice) / normalPrice) * 100) : 0;

    // Tips pengawetan alternatif jika user tetap membeli kuantitas promo
    const preservationTips = this.getPreservationTips(itemName);

    // 2. Simpan histori pengecekan
    try {
      await db.insert(promoTrapChecks).values({
        userId,
        itemName: data.itemName,
        normalPrice: data.normalPrice.toString(),
        promoPrice: data.promoPrice.toString(),
        discountPercent,
        plannedQuantity: data.plannedQuantity.toString(),
        unit: data.unit,
        weeklyConsumptionRate: weeklyRate.toString(),
        estimatedShelfLifeDays: shelfLifeDays,
        safeQuantity: safeQuantity.toString(),
        potentialWasteQuantity: potentialWasteQuantity.toString(),
        potentialFinancialLossRp: potentialFinancialLossRp.toString(),
        isOverbuyDetected: isOverbuy,
      });
    } catch (e) {
      // Non-blocking save
    }

    return {
      itemName: data.itemName,
      discountPercent,
      normalPrice: data.normalPrice,
      promoPrice: data.promoPrice,
      plannedQuantity: data.plannedQuantity,
      unit: data.unit,
      isOverbuyDetected: isOverbuy,
      safeQuantity,
      potentialWasteQuantity,
      potentialFinancialLossRp,
      shelfLifeDays,
      weeklyConsumptionRate: weeklyRate,
      riskLevel: isOverbuy ? (potentialWasteQuantity >= 1.5 ? "Tinggi" : "Sedang") : "Aman",
      recommendationSummary: isOverbuy
        ? `Berdasarkan pola konsumsi rumah tanggamu (${weeklyRate} ${data.unit}/minggu), sekitar ${potentialWasteQuantity} ${data.unit} berpotensi busuk sebelum sempat diolah. Disarankan membeli maksimal ${safeQuantity} ${data.unit}.`
        : `Kuantitas ${data.plannedQuantity} ${data.unit} aman untuk dihabiskan dalam masa simpan ${shelfLifeDays} hari tanpa risiko terbuang.`,
      preservationTips,
    };
  }

  /**
   * Catat keputusan akhir user (umpan balik model AI)
   */
  async recordDecision(userId: string, checkId: string, decision: "bought_safe" | "proceed_with_caution" | "cancelled") {
    try {
      await db
        .update(promoTrapChecks)
        .set({ decision })
        .where(eq(promoTrapChecks.id, checkId as any));
      return { success: true };
    } catch (e) {
      return { success: true };
    }
  }

  /**
   * Solusi Pengawetan Pangan Kreatif (Proposal Bab 2.1.2)
   */
  getPreservationTips(itemName: string) {
    const lower = itemName.toLowerCase();
    if (lower.includes("tomat")) {
      return [
        {
          title: "Saus Pasta Marinara Awetan",
          desc: "Rebus tomat dengan bawang putih, oregano, dan minyak zaitun. Simpan di toples kaca kedap udara tahan hingga 3 minggu.",
        },
        {
          title: "Sun-Dried / Oven Tomatoes",
          desc: "Panggang irisan tomat dengan api kecil di oven selama 3 jam, rendam dalam minyak zaitun. Tahan hingga 2 bulan.",
        },
      ];
    }
    if (lower.includes("ayam")) {
      return [
        {
          title: "Ungkep Bumbu Kuning & Bekukan",
          desc: "Rebus ayam dengan bumbu kunyit lengkuas hingga matang, bagi ke wadah kedap per porsi dan bekukan di freezer (tahan 3 bulan).",
        },
      ];
    }
    return [
      {
        title: "Metode Blanching & Freeze",
        desc: "Celupkan bahan sebentar ke air mendidih lalu rendam ke air es, tiriskan dan simpan di freezer.",
      },
    ];
  }
}

export const promoTrapService = new PromoTrapService();
