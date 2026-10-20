import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware.js";
import { db } from "../db/index.js";
import { receipts, promoTrapChecks } from "../db/schema/index.js";
import { and, eq, gte } from "drizzle-orm";

export const checkQuota = (feature: "ocr_scan" | "promo_check" | "recipe_recommendation") => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ status: "error", message: "User not authenticated" });
    }

    // Jika user tier Premium, lewati semua batasan (Unlimited)
    if (user.tier === "premium") {
      return next();
    }

    const now = new Date();

    // 1. Quota Scan Struk OCR: Maks 5x per bulan kalender untuk Free Tier
    if (feature === "ocr_scan") {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      try {
        const scans = await db
          .select()
          .from(receipts)
          .where(and(eq(receipts.userId, user.id), gte(receipts.createdAt, firstDayOfMonth)));

        if (scans.length >= 5) {
          return res.status(403).json({
            status: "error",
            code: "QUOTA_EXCEEDED",
            message: "Batas pemindaian gratis (5x/bulan) telah tercapai. Upgrade ke BEKAL Premium (Rp15.000/bln) untuk scan tanpa batas!",
            quota: { limit: 5, used: scans.length, feature: "ocr_scan" },
          });
        }
      } catch (e) {
        // Safe proceed in case DB tables not migrated yet
      }
    }

    // 2. Quota Promo Trap Detector: Maks 1x per minggu untuk Free Tier
    if (feature === "promo_check") {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      try {
        const checks = await db
          .select()
          .from(promoTrapChecks)
          .where(and(eq(promoTrapChecks.userId, user.id), gte(promoTrapChecks.createdAt, oneWeekAgo)));

        if (checks.length >= 1) {
          return res.status(403).json({
            status: "error",
            code: "QUOTA_EXCEEDED",
            message: "Batas uji promo gratis (1x/minggu) telah digunakan. Upgrade ke BEKAL Premium untuk cek promo supermarket tanpa batas!",
            quota: { limit: 1, used: checks.length, feature: "promo_check" },
          });
        }
      } catch (e) {
        // Safe proceed
      }
    }

    // 3. Quota Rescue Recipe: Maks 3 rekomendasi per hari
    // (Akan dihitung atau diformat di controller/service)
    next();
  };
};
