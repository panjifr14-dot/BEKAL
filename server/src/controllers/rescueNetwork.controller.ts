import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { rescueNetworkService } from "../services/rescueNetwork.service.js";

export class RescueNetworkController {
  async getNearbyPartners(req: AuthenticatedRequest, res: Response) {
    try {
      const lat = parseFloat((req.query.lat as string) || "-6.2415");
      const lng = parseFloat((req.query.lng as string) || "106.7942");
      const isPremium = req.user?.tier === "premium";

      // Radius: Free = maks 1.5 km, Premium = hingga 5 km
      const requestedRadius = parseFloat((req.query.radius as string) || "2.0");
      const effectiveRadius = isPremium ? requestedRadius : Math.min(1.5, requestedRadius);

      const partners = await rescueNetworkService.getNearbyPartners(lat, lng, effectiveRadius);
      res.json({
        status: "success",
        tier: req.user?.tier || "free",
        searchRadiusKm: effectiveRadius,
        data: partners,
      });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async getMatchingList(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const matches = await rescueNetworkService.matchPantryWithPartners(userId);
      res.json({ status: "success", data: matches });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async createListing(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const listing = await rescueNetworkService.createListing(userId, req.body);
      res.status(201).json({
        status: "success",
        message: "Penawaran bahan berlebih berhasil dibuat dan siap disalurkan ke mitra terdekat.",
        data: listing,
      });
    } catch (e: any) {
      res.status(400).json({ status: "error", message: e.message });
    }
  }

  async completeHandover(req: AuthenticatedRequest, res: Response) {
    try {
      const listingId = req.params.listingId as string;
      const { handoverPhotoUrl } = req.body;
      const result = await rescueNetworkService.completeHandover(listingId, handoverPhotoUrl);
      res.json({ status: "success", data: result });
    } catch (e: any) {
      res.status(400).json({ status: "error", message: e.message });
    }
  }
}

export const rescueNetworkController = new RescueNetworkController();
