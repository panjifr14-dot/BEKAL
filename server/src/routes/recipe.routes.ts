import { Router } from "express";
import { recipeController } from "../controllers/recipe.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Rescue Recipe - Saran resep prioritas bahan kritis & asisten masak
router.get("/recipes/recommendations", requireAuth, recipeController.getRecommendations);
router.post("/recipes/complete-cooking", requireAuth, recipeController.completeCooking);

export default router;
