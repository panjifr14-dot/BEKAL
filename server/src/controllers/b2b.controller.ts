import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { b2bAnalyticsService } from "../services/b2bAnalytics.service.js";

export class B2BController {
  async getInsights(req: AuthenticatedRequest, res: Response) {
    try {
      const city = (req.query.city as string) || "Jakarta & Tangerang Raya";
      const insights = await b2bAnalyticsService.getClusterInsights(city);
      res.json({
        status: "success",
        tier: "B2B_PARTNER_SUBSCRIPTION",
        monthlyRateRp: 5000000,
        data: insights,
      });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
}

export const b2bController = new B2BController();
