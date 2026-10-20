import { Router } from "express";
import { b2bController } from "../controllers/b2b.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();

// B2B Insights Dashboard (Role: partner_b2b or admin, or public demo in development)
router.get("/b2b/insights", requireAuth, b2bController.getInsights);

export default router;
