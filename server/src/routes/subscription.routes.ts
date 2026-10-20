import { Router } from "express";
import { subscriptionController } from "../controllers/subscription.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/subscriptions/status", requireAuth, subscriptionController.getStatus);
router.post("/subscriptions/upgrade", requireAuth, subscriptionController.upgrade);

export default router;
