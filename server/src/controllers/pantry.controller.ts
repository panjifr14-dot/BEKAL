import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { pantryService } from "../services/pantry.service.js";

export class PantryController {
  async getPantry(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { storageLocation, riskLevel } = req.query as { storageLocation?: string; riskLevel?: string };
      const items = await pantryService.getPantry(userId, { storageLocation, riskLevel });
      res.json({ status: "success", data: items });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async addItem(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const item = await pantryService.addItem(userId, req.body);
      res.status(201).json({ status: "success", data: item });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async updateItem(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const itemId = req.params.id as string;
      const updated = await pantryService.updateItem(userId, itemId, req.body);
      res.json({ status: "success", data: updated });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async deleteItem(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const itemId = req.params.id as string;
      await pantryService.deleteItem(userId, itemId);
      res.json({ status: "success", message: "Bahan berhasil dihapus" });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async scanReceipt(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { imagePayload } = req.body;
      const result = await pantryService.scanReceipt(userId, imagePayload || "");
      res.json({ status: "success", data: result });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async confirmReceipt(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { receiptId, items } = req.body;
      const savedItems = await pantryService.confirmReceiptItems(userId, receiptId, items);
      res.status(201).json({
        status: "success",
        message: `${savedItems.length} bahan berhasil diverifikasi dan disimpan ke inventaris dapur`,
        data: savedItems,
      });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }

  async getHistory(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const isPremium = req.user!.tier === "premium";
      const history = await pantryService.getHistory(userId, isPremium);
      res.json({ status: "success", isPremium, data: history });
    } catch (e: any) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
}

export const pantryController = new PantryController();
