export class B2BAnalyticsService {
  /**
   * Menghasilkan Laporan Consumer Insight Pangan Teranonimkan (B2B Partner Dashboard)
   * Berlangganan Rp 5.000.000 / mitra / bulan untuk supermarket / e-grocery
   * Kepatuhan Ketat UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi
   */
  async getClusterInsights(city = "Jakarta & Tangerang Raya") {
    return {
      clusterRegion: city,
      reportingPeriod: "Oktober 2026",
      complianceNotice: "Data telah diagregasi dan dianonimkan 100% sesuai UU Pelindungan Data Pribadi No. 27/2022.",
      topOverboughtCommodities: [
        {
          commodity: "Tomat Merah Segar",
          frequencyRank: 1,
          overbuyIncidencePercent: 42.6,
          averageExcessKgPerHousehold: 1.8,
          spoilageRiskPercent: 68.0,
          primaryPromoTrigger: "Diskon Kuantitas (Buy 2 Get 1 / Diskon > 35%)",
        },
        {
          commodity: "Sayuran Daun Hijau (Bayam & Kangkung)",
          frequencyRank: 2,
          overbuyIncidencePercent: 38.1,
          averageExcessKgPerHousehold: 0.9,
          spoilageRiskPercent: 74.5,
          primaryPromoTrigger: "Paket Bundle Sayur Segar",
        },
        {
          commodity: "Daging Ayam Fillet / Unggas",
          frequencyRank: 3,
          overbuyIncidencePercent: 24.3,
          averageExcessKgPerHousehold: 0.5,
          spoilageRiskPercent: 35.0,
          primaryPromoTrigger: "Promo Akhir Pekan",
        },
      ],
      consumptionVelocityTrends: {
        soloHousehold: { avgDaysToConsumeProduce: 4.2, wasteFactorPercent: 22.5 },
        smallFamily: { avgDaysToConsumeProduce: 6.8, wasteFactorPercent: 14.2 },
        largeFamily: { avgDaysToConsumeProduce: 8.5, wasteFactorPercent: 8.1 },
      },
      recommendationsForRetailers: [
        "Sediakan opsi porsi mini / pack 500g untuk produk sayur guna menekan churn pembeli anak kos.",
        "Alihkan promo dari diskon kuantitas besar (misal 3kg) ke kupon potongan flat untuk mempertahankan loyalitas tanpa limbah pangan.",
      ],
    };
  }
}

export const b2bAnalyticsService = new B2BAnalyticsService();
