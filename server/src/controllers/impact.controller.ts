import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { impactService } from "../services/impact.service.js";

export class ImpactController {
  async getSummary(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const data = await impactService.getUserImpact(userId);
      res.json({ status: "success", data });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async getStoryShareCard(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const card = await impactService.getStoryShareData(userId);
      res.json({ status: "success", data: card });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
}

export const impactController = new ImpactController();
