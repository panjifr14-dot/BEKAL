import { pgTable, text, timestamp, boolean, integer, numeric, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth.js";

export const promoTrapChecks = pgTable("promo_trap_checks", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),

  itemName: text("item_name").notNull(),
  normalPrice: numeric("normal_price", { precision: 12, scale: 2 }).notNull(),
  promoPrice: numeric("promo_price", { precision: 12, scale: 2 }).notNull(),
  discountPercent: integer("discount_percent").notNull(),

  plannedQuantity: numeric("planned_quantity", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(),

  // Behavior metrics
  weeklyConsumptionRate: numeric("weekly_consumption_rate", { precision: 10, scale: 2 }).notNull(),
  estimatedShelfLifeDays: integer("estimated_shelf_life_days").notNull(),

  safeQuantity: numeric("safe_quantity", { precision: 10, scale: 2 }).notNull(),
  potentialWasteQuantity: numeric("potential_waste_quantity", { precision: 10, scale: 2 }).notNull(),
  potentialFinancialLossRp: numeric("potential_financial_loss_rp", { precision: 12, scale: 2 }).notNull(),
  isOverbuyDetected: boolean("is_overbuy_detected").default(false).notNull(),

  // User decision feedback
  decision: text("decision"), // 'bought_safe', 'proceed_with_caution', 'cancelled'

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
