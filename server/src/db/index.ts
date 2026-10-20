import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { env } from "../config/env.js";
import * as schema from "./schema/index.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on("error", (err) => {
  console.error("⚠️ PostgreSQL pool unexpected error:", err.message);
});

export const db = drizzle(pool, { schema });

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    client.release();
    console.log("✅ Terhubung ke PostgreSQL Database berhasil.");
    return true;
  } catch (err: any) {
    console.warn("⚠️ PostgreSQL belum aktif atau koneksi gagal (" + err.message + ").");
    console.warn("   Pastikan PostgreSQL berjalan di: " + env.DATABASE_URL);
    return false;
  }
}
