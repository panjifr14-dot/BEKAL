import { Router } from "express";
import { impactController } from "../controllers/impact.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/impact/summary", requireAuth, impactController.getSummary);
router.get("/impact/story-card", requireAuth, impactController.getStoryShareCard);

export default router;
