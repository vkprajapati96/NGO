
import Razorpay from "razorpay";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import Donation from "../models/Donation.js";

// ─── Razorpay Instance ────────────────────────────────────────
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ═══════════════════════════════════════════════════════════
//  1. CREATE ORDER
//  POST /api/payment/create-order
//
//  Kya karta hai:
//  - Frontend se amount, naam, email leta hai
//  - Razorpay pe order banata hai
//  - orderId frontend ko deta hai (checkout ke liye)
// ═══════════════════════════════════════════════════════════ 

export const createOrder = async (req, res) => {
  try {
    const { amount, name, email, phone } = req.body;

    // ── Validation ────────────────────────────────────────
    if (!amount || isNaN(amount) || Number(amount) < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid amount zaroori hai (minimum Rs.1)",
      });
    }
    if (Number(amount) > 500000) {
      return res.status(400).json({
        success: false,
        message: "Maximum donation limit Rs.5,00,000 hai",
      });
    }
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Naam zaroori hai (minimum 2 characters)",
      });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Valid email address zaroori hai",
      });
    }

    // ── Razorpay Order Banao ──────────────────────────────
    const receiptId = `ngo_${uuidv4().replace(/-/g, "").slice(0, 16)}`;

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount)) * 100, // Paise mein
      currency: "INR",
      receipt: receiptId,
      notes: {
        donor_name: name.trim(),
        donor_email: email.trim().toLowerCase(),
        donor_phone: phone || "N/A",
        ngo: process.env.NGO_NAME || "MyHeart Foundation",
      },
    });

    console.log(`Order created: ${order.id} | Rs.${amount} | ${name}`);

    // ── MongoDB mein PENDING donation save karo ───────────
    // (verify hone ke baad "success" ho jayega)
    await Donation.create({
      orderId: order.id,
      paymentId: `pending_${order.id}`, // placeholder — verify pe update hoga
      amount: Number(amount),
      currency: "INR",
      status: "pending",
      donor: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone || "",
      },
    });

    // ── Frontend ko respond karo ──────────────────────────
    return res.status(201).json({
      success: true,
      message: "Order successfully created",
      data: {
        orderId: order.id,
        amount: order.amount,       // paise mein
        amountInRupees: amount,
        currency: order.currency,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID,
        donorDetails: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone || "",
        },
      },
    });

  } catch (error) {
    console.error("Create Order Error:", error);

    // Razorpay specific error
    if (error.error) {
      return res.status(502).json({
        success: false,
        message: "Razorpay se connection nahi hua. Baad mein try karein.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Order create nahi hua. Baad mein try karein.",
    });
  }
};

// ═══════════════════════════════════════════════════════════
//  2. VERIFY PAYMENT
//  POST /api/payment/verify
//
//  Kya karta hai:
//  - Razorpay ka HMAC SHA256 signature verify karta hai
//  - Payment captured hai ya nahi check karta hai
//  - MongoDB mein donation "success" update karta hai
//
//  !! YEH STEP SECURITY KE LIYE SABSE ZAROORI HAI !!
//  Bina verify ke koi bhi fake payment bhej sakta hai
// ═══════════════════════════════════════════════════════════
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donorDetails,
    } = req.body;

    // ── Fields Check ──────────────────────────────────────
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment details incomplete hain",
      });
    }

    // ══════════════════════════════════════════════════════
    //  SIGNATURE VERIFY (HMAC SHA256)
    //
    //  Razorpay ye karta hai:
    //  1. order_id + "|" + payment_id → string banata hai
    //  2. Apni secret key se HMAC hash banata hai
    //  3. Woh hash frontend ko bhejta hai (razorpay_signature)
    //
    //  Hum bhi same cheez karte hain aur compare karte hain
    //  Agar match kare → payment real hai
    //  Agar match na kare → koi tamper kar raha hai!
    // ══════════════════════════════════════════════════════
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // timingSafeEqual → timing attack se bachata hai
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "hex"),
      Buffer.from(razorpay_signature, "hex")
    );

    if (!isValid) {
      console.warn(`INVALID SIGNATURE! Order: ${razorpay_order_id}`);

      // MongoDB mein failed update karo
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: "failed" }
      );

      return res.status(400).json({
        success: false,
        message: "Payment verify nahi hua — signature invalid hai",
      });
    }

    // ── Razorpay se Real Payment Details Fetch Karo ───────
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // Payment captured nahi hua?
    if (payment.status !== "captured") {
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: "failed" }
      );

      return res.status(400).json({
        success: false,
        message: `Payment captured nahi hua. Status: ${payment.status}`,
      });
    }

    // ══════════════════════════════════════════════════════
    //  MongoDB UPDATE
    //  Pending donation ko success mein update karo
    //  aur real paymentId, method save karo
    // ══════════════════════════════════════════════════════
    const updatedDonation = await Donation.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        paymentId: razorpay_payment_id,
        status: "success",
        method: payment.method,
        amount: payment.amount / 100, // paise → rupees
        donor: {
          name: donorDetails?.name || payment.notes?.donor_name || "Anonymous",
          email: donorDetails?.email || payment.notes?.donor_email || "",
          phone: donorDetails?.phone || payment.contact || "",
        },
      },
      { new: true } // Updated document return karo
    );

    console.log(`Payment Verified! Rs.${updatedDonation.amount} from ${updatedDonation.donor.name}`);

    // ── Success Response ──────────────────────────────────
    return res.status(200).json({
      success: true,
      message: "Donation successful! Dil se shukriya",
      data: {
        donationId: updatedDonation._id,
        paymentId: razorpay_payment_id,
        amount: updatedDonation.amount,
        donor: updatedDonation.donor.name,
        method: payment.method,
        timestamp: updatedDonation.updatedAt,
      },
    });

  } catch (error) {
    console.error("Verify Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Verification mein error aaya. Support se contact karein.",
    });
  }
};

// ═══════════════════════════════════════════════════════════
//  3. PAYMENT FAILED
//  POST /api/payment/failed
//  Razorpay checkout pe cancel/fail hone pe call hota hai
// ═══════════════════════════════════════════════════════════
export const paymentFailed = async (req, res) => {
  const { error, orderId } = req.body;
  console.warn(`Payment Failed - Order: ${orderId}`);

  // MongoDB mein status update karo
  if (orderId) {
    await Donation.findOneAndUpdate(
      { orderId },
      { status: "failed" }
    ).catch(() => {}); // non-critical
  }

  return res.status(200).json({ success: true, message: "Failed payment logged" });
};

// ═══════════════════════════════════════════════════════════
//  4. GET ALL DONATIONS  (Admin ke liye)
//  GET /api/payment/donations
//  Production mein auth lagao is route pe!
// ═══════════════════════════════════════════════════════════
export const getDonations = async (req, res) => {
  try {
    // Sirf successful donations
    const donations = await Donation.find({ status: "success" })
      .sort({ createdAt: -1 }) // Nayi pehle
      .select("amount donor.name method createdAt paymentId"); // Sensitive fields hide

    // Total calculate karo
    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

    return res.status(200).json({
      success: true,
      data: {
        totalDonations: donations.length,
        totalAmount: `Rs.${totalAmount.toLocaleString("en-IN")}`,
        donations,
      },
    });

  } catch (error) {
    console.error("Get Donations Error:", error);
    return res.status(500).json({ success: false, message: "Donations fetch nahi hue" });
  }
};
