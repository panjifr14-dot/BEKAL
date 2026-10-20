import { pgTable, text, timestamp, boolean, integer, numeric, uuid, pgEnum, jsonb } from "drizzle-orm/pg-core";
import { users } from "./auth.js";
import { pantryItems } from "./pantry.js";

export const partnerTypeEnum = pgEnum("partner_type", [
  "warung_makan",
  "catering",
  "komunitas_sosial",
  "kedai_kopi",
]);

export const rescueListingTypeEnum = pgEnum("rescue_listing_type", ["donation", "discount_sale"]);
export const listingStatusEnum = pgEnum("listing_status", ["open", "claimed", "in_transit", "completed", "cancelled"]);

export const rescuePartners = pgTable("rescue_partners", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerUserId: text("owner_user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  type: partnerTypeEnum("type").notNull(),
  description: text("description"),
  address: text("address").notNull(),
  latitude: numeric("latitude", { precision: 10, scale: 6 }).notNull(),
  longitude: numeric("longitude", { precision: 10, scale: 6 }).notNull(),
  contactWhatsapp: text("contact_whatsapp").notNull(),

  // Verification SOP (Proposal Bab 3.2.3: NIB, Bukti Usaha, Rating)
  isVerified: boolean("is_verified").default(false).notNull(),
  verificationNotes: text("verification_notes"),
  rating: numeric("rating", { precision: 3, scale: 2 }).default("5.00").notNull(),
  totalReviews: integer("total_reviews").default(0).notNull(),
  canPickup: boolean("can_pickup").default(true).notNull(),
  neededIngredients: jsonb("needed_ingredients"), // ["Tomat", "Daging Ayam", "Bayam"]

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rescueListings = pgTable("rescue_listings", {
  id: uuid("id").defaultRandom().primaryKey(),
  donorUserId: text("donor_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  partnerId: uuid("partner_id").references(() => rescuePartners.id, { onDelete: "set null" }),

  listingType: rescueListingTypeEnum("listing_type").default("donation").notNull(),
  status: listingStatusEnum("status").default("open").notNull(),
  priceRp: numeric("price_rp", { precision: 12, scale: 2 }).default("0").notNull(),

  foodConditionNote: text("food_condition_note").notNull(),
  itemPhotoUrl: text("item_photo_url"),
  handoverPhotoUrl: text("handover_photo_url"), // Bukti foto serah terima

  totalWeightKg: numeric("total_weight_kg", { precision: 10, scale: 2 }).notNull(),
  beneficiariesCount: integer("beneficiaries_count").default(1),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const rescueListingItems = pgTable("rescue_listing_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id").notNull().references(() => rescueListings.id, { onDelete: "cascade" }),
  pantryItemId: uuid("pantry_item_id").references(() => pantryItems.id, { onDelete: "set null" }),
  itemName: text("item_name").notNull(),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(),
});
