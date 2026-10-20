import { pgTable, text, timestamp, boolean, integer, numeric, pgEnum, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth.js";

export const storageLocationEnum = pgEnum("storage_location", [
  "chiller_sayur",
  "kulkas_utama",
  "crisper_box",
  "pintu_kulkas",
  "freezer",
  "suhu_ruang_pantry",
]);

export const riskLevelEnum = pgEnum("risk_level", ["low", "medium", "high"]);

export const receipts = pgTable("receipts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  merchantName: text("merchant_name"),
  receiptDate: timestamp("receipt_date").defaultNow(),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }),
  itemCount: integer("item_count").default(0).notNull(),
  rawOcrJson: text("raw_ocr_json"), // Minimized data (tanpa data sensitif kartu/kasir - UU PDP No. 27/2022)
  scanImageUrl: text("scan_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pantryItems = pgTable("pantry_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  category: text("category").notNull(), // Bahan Basah, Protein Segar, Sayuran Segar, Dairy, dll.
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(), // kg, g, L, Ikat, Butir, Pcs

  storageLocation: storageLocationEnum("storage_location").default("suhu_ruang_pantry").notNull(),

  purchaseDate: timestamp("purchase_date").defaultNow().notNull(),
  expiryDate: timestamp("expiry_date").notNull(),
  estimatedShelfLifeDays: integer("estimated_shelf_life_days").notNull(),

  // Dynamic Food Risk Score (0 - 100)
  riskScore: integer("risk_score").default(0).notNull(),
  riskLevel: riskLevelEnum("risk_level").default("low").notNull(),

  // Smart Pantry Passport / OCR Metadata
  receiptId: uuid("receipt_id").references(() => receipts.id, { onDelete: "set null" }),
  ocrConfidence: numeric("ocr_confidence", { precision: 5, scale: 2 }),
  isManualCorrection: boolean("is_manual_correction").default(false).notNull(),
  imageUrl: text("image_url"),

  // Lifecycle status
  isConsumed: boolean("is_consumed").default(false).notNull(),
  isDonated: boolean("is_donated").default(false).notNull(),
  isDiscarded: boolean("is_discarded").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
