
import express from "express";
import {
  createOrder,
  verifyPayment,
  paymentFailed,
  getDonations,
} from "../controllers/paymentController.js";

const router = express.Router();

// POST /api/payment/create-order
router.post("/create-order", createOrder);


// POST /api/payment/verify
router.post("/verify", verifyPayment);

// POST /api/payment/failed
router.post("/failed", paymentFailed);

// GET /api/payment/donations
router.get("/donations", getDonations);

export default router;
