import { useState, useCallback } from "react";
import axios from "axios";

// ─── Preset donation amounts ──────────────────────────────────
const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000, 25000];

// ─── API base URL ─────────────────────────────────────────────
//  Vite proxy se /api → http://localhost:5000/api
const API_BASE = "/api/payment";

// ═══════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function DonateForm() {
  // ── Form State ──────────────────────────────────────────
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [errors, setErrors] = useState({});

  // ── UI State ────────────────────────────────────────────
  const [step, setStep] = useState("form"); // "form" | "loading" | "success" | "error"
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // ─── Handlers ────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePreset = (amount) => {
    setSelectedPreset(amount);
    setForm((prev) => ({ ...prev, amount: String(amount) }));
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: "" }));
  };

  // ─── Validation ──────────────────────────────────────────
  const validate = useCallback(() => {
    const newErrors = {};
    const amt = parseInt(form.amount);

    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = "Naam kam se kam 2 characters ka hona chahiye";

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email address likhein";

    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      newErrors.phone = "Valid 10-digit Indian phone number likhein";

    if (!form.amount || isNaN(amt) || amt < 1)
      newErrors.amount = "Donation amount likhein (minimum ₹1)";
    else if (amt > 500000)
      newErrors.amount = "Maximum ₹5,00,000 tak donate kar sakte hain";

    return newErrors;
  }, [form]);

  // ─── Main Donate Function ─────────────────────────────────
  const handleDonate = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStep("loading");
    setErrorMsg("");

    try {
      // ══════════════════════════════════════════════════
      //  STEP 1: Backend se Order Create karo
      // ══════════════════════════════════════════════════
      const orderRes = await axios.post(`${API_BASE}/create-order`, {
        amount: parseInt(form.amount),
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
      });

      if (!orderRes.data.success) {
        throw new Error(orderRes.data.message || "Order create nahi hua");
      }

      const { orderId, amount, razorpayKeyId, donorDetails } =
        orderRes.data.data;

      // ══════════════════════════════════════════════════
      //  STEP 2: Razorpay Checkout Open karo
      // ══════════════════════════════════════════════════
      const razorpayOptions = {
        key: razorpayKeyId,
        amount: amount, // Paise mein (already converted by backend)
        currency: "INR",
        name: "UmeedPath NGO",
        description: "Donation - UmeedPath NGO",
        order_id: orderId,
        prefill: {
          name: donorDetails.name,
          email: donorDetails.email,
          contact: donorDetails.phone,
        },
        notes: {
          ngo: "UmeedPath NGO",
          purpose: "Charitable Donation",
        },
        theme: {
          color: "#1a6b3c",
        },
        // ── Success Handler ─────────────────────────────
        handler: async function (response) {
          await handlePaymentSuccess(response, donorDetails);
        },
        // ── Modal Close (User ne cancel kiya) ──────────
        modal: {
          ondismiss: function () {
            setStep("form"); // Form pe wapas
            notifyBackendFailure(orderId, "User cancelled payment");
          },
        },
      };

      const razorpayInstance = new window.Razorpay(razorpayOptions);

      // Razorpay Payment Failed Event
      razorpayInstance.on("payment.failed", function (response) {
        notifyBackendFailure(orderId, response.error?.description);
        setErrorMsg(
          response.error?.description || "Payment fail hua. Dobara try karein.",
        );
        setStep("error");
      });

      razorpayInstance.open();
    } catch (err) {
      console.error("Donate error:", err);
      setErrorMsg(
        err.response?.data?.message ||
          err.message ||
          "Kuch problem aayi. Baad mein try karein.",
      );
      setStep("error");
    }
  };

  // ══════════════════════════════════════════════════════
  //  STEP 3: Payment Success → Backend se Verify karo
  // ══════════════════════════════════════════════════════
  const handlePaymentSuccess = async (razorpayResponse, donorDetails) => {
    try {
      const verifyRes = await axios.post(`${API_BASE}/verify`, {
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        donorDetails,
      });

      if (verifyRes.data.success) {
        setSuccessData(verifyRes.data.data);
        setStep("success");
      } else {
        throw new Error(verifyRes.data.message);
      }
    } catch (err) {
      setErrorMsg(
        "Payment hua lekin verify nahi hua. Payment ID note karein aur support@umeedpath.org pe email karein.",
      );
      setStep("error");
    }
  };

  // ─── Notify backend of failure ────────────────────────
  const notifyBackendFailure = async (orderId, description) => {
    try {
      await axios.post(`${API_BASE}/failed`, {
        orderId,
        error: { description },
      });
    } catch (_) {} // Non-critical
  };

  // ─── Reset form ───────────────────────────────────────
  const reset = () => {
    setForm({ name: "", email: "", phone: "", amount: "" });
    setErrors({});
    setSelectedPreset(null);
    setSuccessData(null);
    setErrorMsg("");
    setStep("form");
  };

  // ══════════════════════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════════════════════
  return (
    <div className="w-full max-w-md">
      {/* ── Card ──────────────────────────────────────── */}
      <div className="bg-[#0f1a14] border border-[#e8a020]/20 rounded-2xl overflow-hidden shadow-2xl">
        {/* ── Header ──────────────────────────────────── */}
        <div className="bg-gradient-to-r from-[#1a6b3c] to-[#2d9b5c] px-8 py-6">
          <p className="font-display text-[#e8a020] text-2xl font-black tracking-wide">
            Umeed<span className="text-white">Path</span>
          </p>
          <p className="text-white/70 text-sm mt-1 font-light">
            Aapka ek kadam — kisi ki puri zindagi 🌱
          </p>
        </div>

        {/* ═════════════════════════════════════════════ */}
        {/*  STATE: FORM                                  */}
        {/* ═════════════════════════════════════════════ */}
        {step === "form" && (
          <div className="px-8 py-7">
            <p className="text-white font-semibold text-lg mb-5">
              Donate Karein
            </p>

            {/* ── Preset Amounts ────────────────────── */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handlePreset(amt)}
                  className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedPreset === amt
                      ? "bg-[#e8a020] text-[#0f1a14] shadow-lg shadow-[#e8a020]/30"
                      : "bg-white/8 border border-white/15 text-white hover:border-[#e8a020]/50 hover:bg-white/12"
                  }`}
                >
                  ₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            {/* ── Custom Amount ─────────────────────── */}
            <InputField
              label="Ya apni amount likhein"
              name="amount"
              type="number"
              placeholder="₹ Custom amount"
              value={form.amount}
              onChange={(e) => {
                setSelectedPreset(null);
                handleChange(e);
              }}
              error={errors.amount}
              prefix="₹"
            />

            <div className="border-t border-white/10 my-5" />

            {/* ── Donor Details ─────────────────────── */}
            <InputField
              label="Aapka Naam *"
              name="name"
              placeholder="Poora naam likhein"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

            <InputField
              label="Email Address *"
              name="email"
              type="email"
              placeholder="receipt@email.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <InputField
              label="Phone Number (optional)"
              name="phone"
              type="tel"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            {/* ── Donate Button ─────────────────────── */}
            <button
              onClick={handleDonate}
              className="w-full mt-2 py-4 bg-gradient-to-r from-[#1a6b3c] to-[#2d9b5c] text-white font-bold text-base rounded-xl hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg shadow-green-900/40"
            >
              🔒 Secure Donate Karein
              {form.amount &&
              !isNaN(parseInt(form.amount)) &&
              parseInt(form.amount) > 0
                ? ` – ₹${parseInt(form.amount).toLocaleString("en-IN")}`
                : ""}
            </button>

            {/* ── Security Note ─────────────────────── */}
            <p className="text-center text-white/30 text-xs mt-3">
              🔐 Razorpay · SSL Encrypted · UPI · Cards · Net Banking · Wallets
            </p>
            <p className="text-center text-white/30 text-xs mt-1">
              Donation 80G tax exempt hai
            </p>
          </div>
        )}

        {/* ═════════════════════════════════════════════ */}
        {/*  STATE: LOADING                               */}
        {/* ═════════════════════════════════════════════ */}
        {step === "loading" && (
          <div className="px-8 py-16 flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-[#1a6b3c] border-t-[#e8a020] rounded-full animate-spin" />
            <p className="text-white font-semibold">Processing...</p>
            <p className="text-white/50 text-sm text-center">
              Razorpay checkout khul raha hai. Thoda wait karein...
            </p>
          </div>
        )}

        {/* ═════════════════════════════════════════════ */}
        {/*  STATE: SUCCESS                               */}
        {/* ═════════════════════════════════════════════ */}
        {step === "success" && successData && (
          <div className="px-8 py-7">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#1a6b3c]/20 border-2 border-[#2d9b5c] rounded-full flex items-center justify-center mx-auto text-4xl mb-4 animate-bounce">
                ✅
              </div>
              <h2 className="font-display text-white text-2xl font-bold">
                Shukriya!
              </h2>
              <p className="text-white/60 text-sm mt-1">
                Aapka donation safal hua 🙏
              </p>
            </div>

            {/* Receipt Details */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 mb-6">
              <ReceiptRow label="Donor" value={successData.donor} />
              <ReceiptRow
                label="Amount"
                value={`₹${(successData.amount || 0).toLocaleString("en-IN")}`}
                highlight
              />
              <ReceiptRow
                label="Payment ID"
                value={successData.paymentId}
                mono
              />
              <ReceiptRow
                label="Method"
                value={
                  successData.method
                    ? successData.method.charAt(0).toUpperCase() +
                      successData.method.slice(1)
                    : "Online"
                }
              />
            </div>

            <p className="text-white/50 text-xs text-center mb-5">
              📧 Receipt aapki email pe bhej di gayi hai. 80G certificate ke
              liye info@umeedpath.org pe email karein.
            </p>

            <button
              onClick={reset}
              className="w-full py-3 border border-white/20 text-white/70 rounded-xl hover:bg-white/5 transition text-sm"
            >
              Aur Donate Karein →
            </button>
          </div>
        )}

        {/* ═════════════════════════════════════════════ */}
        {/*  STATE: ERROR                                 */}
        {/* ═════════════════════════════════════════════ */}
        {step === "error" && (
          <div className="px-8 py-10 text-center">
            <div className="text-5xl mb-4">❌</div>
            <h2 className="font-display text-white text-xl font-bold mb-2">
              Kuch Problem Aayi
            </h2>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              {errorMsg || "Payment fail hua. Dobara try karein."}
            </p>
            <button
              onClick={reset}
              className="w-full py-3 bg-[#1a6b3c] text-white rounded-xl hover:bg-[#2d9b5c] transition font-semibold"
            >
              Dobara Try Karein
            </button>
            <p className="text-white/30 text-xs mt-3">
              Help ke liye: support@umeedpath.org
            </p>
          </div>
        )}
      </div>

      {/* ── Footer ──────────────────────────────────── */}
      <p className="text-white/30 text-xs text-center mt-4">
        © 2025 UmeedPath NGO · Registered under Societies Act
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  Sub-components
// ═══════════════════════════════════════════════════════════

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  prefix,
}) {
  return (
    <div className="mb-4">
      <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-semibold text-sm">
            {prefix}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white/7 border rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6b3c] transition-all ${
            prefix ? "pl-7" : ""
          } ${
            error
              ? "border-red-500/60 focus:ring-red-500/40"
              : "border-white/12 focus:border-[#2d9b5c]"
          }`}
          min={type === "number" ? 1 : undefined}
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

function ReceiptRow({ label, value, highlight, mono }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-white/50">{label}</span>
      <span
        className={`font-semibold ${
          highlight ? "text-[#e8a020] text-base" : "text-white"
        } ${mono ? "font-mono text-xs text-white/70" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
