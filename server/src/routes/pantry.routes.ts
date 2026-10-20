import { Router } from "express";
import { pantryController } from "../controllers/pantry.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { checkQuota } from "../middlewares/quota.middleware.js";

const router = Router();

router.get("/pantry", requireAuth, pantryController.getPantry);
router.post("/pantry/item", requireAuth, pantryController.addItem);
router.patch("/pantry/item/:id", requireAuth, pantryController.updateItem);
router.delete("/pantry/item/:id", requireAuth, pantryController.deleteItem);

// Smart Pantry Passport (OCR Struk) - Dengan enforcement kuota freemium (5x/bulan untuk Free)
router.post("/pantry/scan-receipt", requireAuth, checkQuota("ocr_scan"), pantryController.scanReceipt);
router.post("/pantry/confirm-receipt", requireAuth, pantryController.confirmReceipt);
router.get("/pantry/history", requireAuth, pantryController.getHistory);

export default router;
