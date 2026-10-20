import { pgTable, text, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["consumer", "partner_umkm", "partner_b2b", "admin"]);
export const householdTypeEnum = pgEnum("household_type", ["solo", "small", "large"]);
export const subscriptionTierEnum = pgEnum("subscription_tier", ["free", "premium"]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: userRoleEnum("role").default("consumer").notNull(),
  phoneNumber: text("phone_number"),

  // Custom User Profile Attributes (sesuai proposal BEKAL)
  householdType: householdTypeEnum("household_type").default("solo").notNull(),
  householdPortions: integer("household_portions").default(1).notNull(),
  tier: subscriptionTierEnum("tier").default("free").notNull(),
  subscriptionExpiresAt: timestamp("subscription_expires_at"),

  // Gamification & Dapur Health Score
  xp: integer("xp").default(0).notNull(),
  level: integer("level").default(1).notNull(),
  levelTitle: text("level_title").default("Eco Beginner").notNull(),
  kitchenHealthScore: integer("kitchen_health_score").default(78).notNull(),

  // Notification Preferences
  alarmEnabled: boolean("alarm_enabled").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
