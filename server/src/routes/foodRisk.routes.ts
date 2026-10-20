import { Router } from "express";
import { foodRiskController } from "../controllers/foodRisk.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/food-risk/dashboard", requireAuth, foodRiskController.getDashboard);
router.post("/food-risk/recalculate", requireAuth, foodRiskController.recalculate);

export default router;
