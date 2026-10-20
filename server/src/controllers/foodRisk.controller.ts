import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { foodRiskService } from "../services/foodRisk.service.js";

export class FoodRiskController {
  async getDashboard(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const summary = await foodRiskService.getDashboardSummary(userId);
      res.json({ status: "success", data: summary });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async recalculate(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const result = await foodRiskService.recalculateRiskScores(userId);
      res.json({ status: "success", data: result });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
}

export const foodRiskController = new FoodRiskController();
