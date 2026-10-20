import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { requireAuth, AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { db } from "../db/index.js";
import { users } from "../db/schema/index.js";
import { eq } from "drizzle-orm";

const router = Router();

// 1. Better Auth All API Handlers (/api/auth/*)
router.all("/auth/*", toNodeHandler(auth));

// 2. Custom User Profile Endpoints
router.get("/users/profile", requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user!.id;
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    res.json({
      status: "success",
      data: user || req.user,
    });
  } catch (e: any) {
    res.json({ status: "success", data: req.user });
  }
});

router.patch("/users/household", requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user!.id;
    const { householdType, householdPortions } = req.body;
    await db
      .update(users)
      .set({
        householdType,
        householdPortions: householdPortions || 1,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    res.json({ status: "success", message: "Profil rumah tangga berhasil diperbarui" });
  } catch (e: any) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.patch("/users/preferences", requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user!.id;
    const { alarmEnabled } = req.body;
    await db
      .update(users)
      .set({ alarmEnabled, updatedAt: new Date() })
      .where(eq(users.id, userId));

    res.json({ status: "success", message: "Preferensi alarm berhasil diperbarui" });
  } catch (e: any) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

export default router;
