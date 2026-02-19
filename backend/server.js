// ═══════════════════════════════════════════════════════════
//  UmeedPath NGO – Main Server  (ES Modules + Mongoose)
// ═══════════════════════════════════════════════════════════

import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import paymentRoutes from "./routes/payment.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ─── MongoDB Connect ──────────────────────────────────────────
// Server start hone se pehle DB connect karo
await connectDB();

// ─── Security Headers ─────────────────────────────────────────
app.use(helmet({ crossOriginEmbedderPolicy: false }));

// ─── CORS ─────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ─── Body Parser ──────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Global Rate Limiter ──────────────────────────────────────
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: "Bahut zyada requests! Baad mein try karein." },
  })
);

// ─── Payment Rate Limiter (strict) ───────────────────────────
const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Bahut zyada payment requests. Thodi der baad karein." },
});

// ─── Routes ───────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "UmeedPath NGO Backend chal raha hai!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", uptime: process.uptime() });
});

app.use("/api/payment", paymentLimiter, paymentRoutes);

// ─── 404 ──────────────────────────────────────────────────────
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} nahi mila` });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Server error. Baad mein try karein.",
  });
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\nUmeedPath Server start hua!`);
  console.log(`URL      : http://localhost:${PORT}`);
  console.log(`Razorpay : ${process.env.RAZORPAY_KEY_ID ? "Configured" : "KEY MISSING!"}`);
  console.log(`MongoDB  : ${process.env.MONGODB_URI ? "Connected" : "URI MISSING!"}\n`);
});
