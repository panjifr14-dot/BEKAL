import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { recipeService } from "../services/recipe.service.js";

export class RecipeController {
  async getRecommendations(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const isPremium = req.user!.tier === "premium";
      const { category } = req.query as { category?: string };

      const recipes = await recipeService.getRescueRecommendations(userId, { category, isPremium });

      // Jika Free tier, batasi 3 rekomendasi per hari
      const resultData = isPremium ? recipes : recipes.slice(0, 3);

      res.json({
        status: "success",
        tier: req.user!.tier,
        limitApplied: !isPremium ? "Maksimal 3 rekomendasi/hari untuk Akun Gratis" : "Unlimited",
        count: resultData.length,
        data: resultData,
      });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async completeCooking(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const result = await recipeService.completeCooking(userId, req.body);
      res.json({ status: "success", data: result });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
}

export const recipeController = new RecipeController();
