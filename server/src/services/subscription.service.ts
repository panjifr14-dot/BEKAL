import { db } from "../db/index.js";
import { users, subscriptions } from "../db/schema/index.js";
import { eq } from "drizzle-orm";

export class SubscriptionService {
  /**
   * Cek status paket akun (Gratis vs Premium)
   */
  async getStatus(userId: string) {
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    const isPremium = user?.tier === "premium";
    return {
      tier: isPremium ? "premium" : "free",
      expiresAt: user?.subscriptionExpiresAt || null,
      priceMonthlyRp: 15000,
      features: {
        ocrScanPerMonth: isPremium ? "unlimited" : 5,
        promoTrapChecksPerWeek: isPremium ? "unlimited" : 1,
        rescueRecipePerDay: isPremium ? "unlimited" : 3,
        rescueNetworkRadiusKm: isPremium ? 5.0 : 1.5,
        inventoryHistoryDays: isPremium ? "unlimited" : 30,
        detailedCarbonReport: isPremium,
      },
    };
  }

  /**
   * Simulasi / Proses Upgrade ke Premium (Rp 15.000 / bulan)
   */
  async upgradeToPremium(userId: string, paymentProvider = "google_play") {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);

    // 1. Simpan transaksi langganan
    await db.insert(subscriptions).values({
      userId,
      amountRp: "15000",
      paymentProvider,
      status: "active",
      expiresAt: expiry,
    });

    // 2. Update tier user
    await db
      .update(users)
      .set({
        tier: "premium",
        subscriptionExpiresAt: expiry,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    return {
      success: true,
      message: "Selamat! Akunmu telah berhasil di-upgrade ke BEKAL Premium.",
      tier: "premium",
      expiresAt: expiry,
    };
  }
}

export const subscriptionService = new SubscriptionService();
