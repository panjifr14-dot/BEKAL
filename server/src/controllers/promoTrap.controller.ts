import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { promoTrapService } from "../services/promoTrap.service.js";

export class PromoTrapController {
  async evaluate(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const evaluation = await promoTrapService.evaluatePromoDeal(userId, req.body);
      res.json({ status: "success", data: evaluation });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async recordDecision(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { checkId, decision } = req.body;
      const result = await promoTrapService.recordDecision(userId, checkId, decision);
      res.json({ status: "success", data: result });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
}

export const promoTrapController = new PromoTrapController();
