// ═══════════════════════════════════════════════════════════
//  models/Donation.js
//  Mongoose Schema — har donation MongoDB mein aise store hoga
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    // ─── Razorpay IDs ─────────────────────────────────────
    orderId: {
      type: String,
      required: true,
      unique: true,       // Ek order ek baar hi save ho
      trim: true,
    },
    paymentId: {
      type: String,
      required: true,
      unique: true,       // Ek payment ek baar hi save ho
      trim: true,
    },

    // ─── Amount ───────────────────────────────────────────
    amount: {
      type: Number,
      required: true,
      min: 1,
      max: 500000,
    },
    currency: {
      type: String,
      default: "INR",
    },

    // ─── Payment Status ───────────────────────────────────
    // "success" | "failed" | "pending"
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },

    // ─── Payment Method ───────────────────────────────────
    // "upi" | "card" | "netbanking" | "wallet"
    method: {
      type: String,
      trim: true,
    },

    // ─── Donor Details ────────────────────────────────────
    donor: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
        default: "",
      },
    },
  },
  {
    // ─── Timestamps ───────────────────────────────────────
    // createdAt aur updatedAt automatically ban jaate hain
    timestamps: true,
  }
);

// ─── Index ────────────────────────────────────────────────────
// Jaldi search karne ke liye
donationSchema.index({ "donor.email": 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ createdAt: -1 });

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
