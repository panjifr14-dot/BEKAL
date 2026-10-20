import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { db } from "../db/index.js";
import { users } from "../db/schema/index.js";
import { eq } from "drizzle-orm";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: "consumer" | "partner_umkm" | "partner_b2b" | "admin";
    householdType: "solo" | "small" | "large";
    householdPortions: number;
    tier: "free" | "premium";
    xp: number;
    level: number;
    levelTitle: string;
    kitchenHealthScore: number;
  };
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // 1. Coba verifikasi session dari Better Auth
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (session && session.user) {
        req.user = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          role: (session.user as any).role || "consumer",
          householdType: (session.user as any).householdType || "solo",
          householdPortions: (session.user as any).householdPortions || 1,
          tier: (session.user as any).tier || "free",
          xp: (session.user as any).xp || 0,
          level: (session.user as any).level || 1,
          levelTitle: (session.user as any).levelTitle || "Eco Beginner",
          kitchenHealthScore: (session.user as any).kitchenHealthScore || 78,
        };
        return next();
      }
    } catch {
      // Better auth session not found or db offline
    }

    // 2. Fallback untuk kemudahan testing / prototipe jika x-user-id dikirim
    const customUserId = req.headers["x-user-id"] as string;
    if (customUserId) {
      try {
        const found = await db.select().from(users).where(eq(users.id, customUserId)).limit(1);
        if (found.length > 0) {
          const u = found[0];
          req.user = {
            id: u.id,
            email: u.email,
            name: u.name,
            role: u.role as any,
            householdType: u.householdType as any,
            householdPortions: u.householdPortions,
            tier: u.tier as any,
            xp: u.xp,
            level: u.level,
            levelTitle: u.levelTitle,
            kitchenHealthScore: u.kitchenHealthScore,
          };
          return next();
        }
      } catch {
        // DB offline, fall through to dev user
      }
    }

    // 3. Fallback default Andi Pratama untuk dev mode
    if (process.env.NODE_ENV !== "production") {
      req.user = {
        id: customUserId || "usr_andi_pratama_01",
        email: "andi@domain.com",
        name: "Andi Pratama",
        role: "consumer",
        householdType: "small",
        householdPortions: 3,
        tier: "free",
        xp: 820,
        level: 4,
        levelTitle: "Zero-Waste Warrior",
        kitchenHealthScore: 78,
      };
      return next();
    }

    return res.status(401).json({ status: "error", message: "Akses ditolak. Sesi login diperlukan." });
  } catch (error: any) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ status: "error", message: "Autentikasi gagal" });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: `Akses ditolak. Fitur ini memerlukan hak akses: ${allowedRoles.join(", ")}`,
      });
    }
    next();
  };
};
