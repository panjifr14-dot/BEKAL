import { pgTable, text, timestamp, boolean, integer, numeric, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth.js";

export const badges = pgTable("badges", {
  id: text("id").primaryKey(), // 'anti_promo_trap', 'rescue_chef', 'pahlawan_warung'
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
});

export const userBadges = pgTable("user_badges", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  badgeId: text("badge_id").notNull().references(() => badges.id),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
});

export const monthlyImpactSummaries = pgTable("monthly_impact_summaries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  year: integer("year").notNull(),
  month: integer("month").notNull(), // 1 - 12
  foodSavedKg: numeric("food_saved_kg", { precision: 10, scale: 2 }).default("0").notNull(),
  moneySavedRp: numeric("money_saved_rp", { precision: 12, scale: 2 }).default("0").notNull(),
  // Konversi FAO 2013: 1 kg food waste dicegah = 2.5 kg CO2e
  co2PreventedKg: numeric("co2_prevented_kg", { precision: 10, scale: 2 }).default("0").notNull(),
  rescueActivitiesCount: integer("rescue_activities_count").default(0).notNull(),
  efficiencyScore: integer("efficiency_score").default(75).notNull(), // Persentase efisiensi dapur
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// B2C Premium Subscription Orders
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  amountRp: numeric("amount_rp", { precision: 12, scale: 2 }).default("15000").notNull(),
  paymentProvider: text("payment_provider").default("google_play").notNull(),
  providerTransactionId: text("provider_transaction_id"),
  status: text("status").default("active").notNull(), // pending, active, expired, cancelled
  startedAt: timestamp("started_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// B2B Aggregated Anonymized Insights (UU PDP No. 27/2022 compliant)
export const b2bAggregateInsights = pgTable("b2b_aggregate_insights", {
  id: uuid("id").defaultRandom().primaryKey(),
  clusterCity: text("cluster_city").notNull(), // Jakarta, Tangerang, Bandung, Yogyakarta
  periodMonth: text("period_month").notNull(), // YYYY-MM
  commodityName: text("commodity_name").notNull(),
  overbuyRatePercent: numeric("overbuy_rate_percent", { precision: 5, scale: 2 }).notNull(),
  averageSpoilageDays: numeric("average_spoilage_days", { precision: 5, scale: 2 }).notNull(),
  averageExcessVolumeKg: numeric("average_excess_volume_kg", { precision: 10, scale: 2 }).notNull(),
  calculatedAt: timestamp("calculated_at").defaultNow().notNull(),
});
