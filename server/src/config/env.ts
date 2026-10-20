import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().default("postgres://postgres:postgres@localhost:5432/bekal_db"),
  BETTER_AUTH_SECRET: z.string().default("bekal_super_secret_session_key_2026_eco_innovation"),
  BETTER_AUTH_URL: z.string().default("http://localhost:4000"),
  CLIENT_URL: z.string().default("http://localhost:5173"),
  GEMINI_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
