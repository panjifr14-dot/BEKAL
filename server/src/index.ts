import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { checkDatabaseConnection } from "./db/index.js";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: [env.CLIENT_URL, "http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get("/api/health", async (req, res) => {
  const isDbOk = await checkDatabaseConnection();
  res.json({
    status: "ok",
    app: "BEKAL Backend API",
    version: "1.0.0",
    database: isDbOk ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
    aiEngine: env.GEMINI_API_KEY ? "Gemini Pro / Flash Online" : "Intelligent Local AI Fallback",
  });
});

// Mount All Routes under /api
app.use("/api", apiRouter);

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(env.PORT, async () => {
  console.log(`\n🌱 ========================================================`);
  console.log(`🚀 BEKAL Backend API running at http://localhost:${env.PORT}`);
  console.log(`🔒 Better Auth endpoints available at http://localhost:${env.PORT}/api/auth`);
  console.log(`📡 Health Check: http://localhost:${env.PORT}/api/health`);
  console.log(`🌱 ========================================================\n`);

  await checkDatabaseConnection();
});

export default app;
