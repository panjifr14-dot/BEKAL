import { Router } from "express";
import { rescueNetworkController } from "../controllers/rescueNetwork.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Warung Rescue Network - Peta mitra & serah terima donasi / jual murah
router.get("/rescue-network/partners", requireAuth, rescueNetworkController.getNearbyPartners);
router.get("/rescue-network/matches", requireAuth, rescueNetworkController.getMatchingList);
router.post("/rescue-network/listings", requireAuth, rescueNetworkController.createListing);
router.patch("/rescue-network/listings/:listingId/handover", requireAuth, rescueNetworkController.completeHandover);

export default router;
