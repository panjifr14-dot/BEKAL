import { Router } from "express";
import { promoTrapController } from "../controllers/promoTrap.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { checkQuota } from "../middlewares/quota.middleware.js";

const router = Router();

// Promo Trap Detector - Kuota Free 1x/minggu
router.post("/promo-trap/evaluate", requireAuth, checkQuota("promo_check"), promoTrapController.evaluate);
router.post("/promo-trap/decision", requireAuth, promoTrapController.recordDecision);

export default router;
