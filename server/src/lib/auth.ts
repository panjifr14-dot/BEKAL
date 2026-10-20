import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import { env } from "../config/env.js";
import * as schema from "../db/schema/index.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "consumer",
      },
      householdType: {
        type: "string",
        defaultValue: "solo",
      },
      householdPortions: {
        type: "number",
        defaultValue: 1,
      },
      tier: {
        type: "string",
        defaultValue: "free",
      },
      xp: {
        type: "number",
        defaultValue: 0,
      },
      level: {
        type: "number",
        defaultValue: 1,
      },
      levelTitle: {
        type: "string",
        defaultValue: "Eco Beginner",
      },
      kitchenHealthScore: {
        type: "number",
        defaultValue: 78,
      },
      alarmEnabled: {
        type: "boolean",
        defaultValue: true,
      },
    },
  },
});
