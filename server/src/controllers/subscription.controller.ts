import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { subscriptionService } from "../services/subscription.service.js";

export class SubscriptionController {
  async getStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const status = await subscriptionService.getStatus(userId);
      res.json({ status: "success", data: status });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async upgrade(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { paymentProvider } = req.body;
      const result = await subscriptionService.upgradeToPremium(userId, paymentProvider);
      res.json({ status: "success", data: result });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
}

export const subscriptionController = new SubscriptionController();
