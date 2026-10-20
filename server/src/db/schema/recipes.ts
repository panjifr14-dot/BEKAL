import { pgTable, text, timestamp, boolean, integer, numeric, uuid, jsonb } from "drizzle-orm/pg-core";
import { users } from "./auth.js";

export const recipes = pgTable("recipes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  cookingTimeMinutes: integer("cooking_time_minutes").notNull(),
  servings: integer("servings").default(2).notNull(),
  budgetCategory: text("budget_category").default("hemat").notNull(), // hemat, standard
  isFamilyFriendly: boolean("is_family_friendly").default(true).notNull(),
  imageUrl: text("image_url"),
  steps: jsonb("steps").notNull(), // [{ step: 1, text: "Potong bahan..." }]
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const recipeIngredients = pgTable("recipe_ingredients", {
  id: uuid("id").defaultRandom().primaryKey(),
  recipeId: uuid("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
  ingredientName: text("ingredient_name").notNull(),
  requiredQuantity: numeric("required_quantity", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(),
  isKeyIngredient: boolean("is_key_ingredient").default(true).notNull(),
});

export const cookingSessions = pgTable("cooking_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  recipeId: uuid("recipe_id").notNull().references(() => recipes.id),

  foodSavedKg: numeric("food_saved_kg", { precision: 10, scale: 2 }).notNull(),
  moneySavedRp: numeric("money_saved_rp", { precision: 12, scale: 2 }).notNull(),
  xpEarned: integer("xp_earned").default(50).notNull(),

  deductedPantryItems: jsonb("deducted_pantry_items"), // [{ itemId: "...", quantity: 1.0, unit: "kg" }]

  completedAt: timestamp("completed_at").defaultNow().notNull(),
});
