import { Router } from "express";
import authRoutes from "./auth.routes.js";
import pantryRoutes from "./pantry.routes.js";
import foodRiskRoutes from "./foodRisk.routes.js";
import promoTrapRoutes from "./promoTrap.routes.js";
import recipeRoutes from "./recipe.routes.js";
import rescueNetworkRoutes from "./rescueNetwork.routes.js";
import impactRoutes from "./impact.routes.js";
import subscriptionRoutes from "./subscription.routes.js";
import b2bRoutes from "./b2b.routes.js";

const router = Router();

router.use(authRoutes);
router.use(pantryRoutes);
router.use(foodRiskRoutes);
router.use(promoTrapRoutes);
router.use(recipeRoutes);
router.use(rescueNetworkRoutes);
router.use(impactRoutes);
router.use(subscriptionRoutes);
router.use(b2bRoutes);

export default router;
