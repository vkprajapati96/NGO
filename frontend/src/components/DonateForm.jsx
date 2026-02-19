import { useState, useCallback } from "react"
import axios from "axios"

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000, 25000]
const API_BASE = "https://ngo-backend-tx39.onrender.com/api/payment"

export default function DonateForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  })
  const [selectedPreset, setSelectedPreset] = useState(null)
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState("form")
  const [successData, setSuccessData] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handlePreset = (amount) => {
    setSelectedPreset(amount)
    setForm((prev) => ({ ...prev, amount: String(amount) }))
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: "" }))
  }

  const validate = useCallback(() => {
    const newErrors = {}
    const amt = parseInt(form.amount)

    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = "Name kamse kam 2 characters ka hona chahiye"

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email address likhein"

    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      newErrors.phone = "Valid 10-digit Indian phone number likhein"

    if (!form.amount || isNaN(amt) || amt < 1)
      newErrors.amount = "Donation amount likhein (minimum ₹1)"
    else if (amt > 500000)
      newErrors.amount = "Maximum ₹5,00,000 tak donate kar sakte hain"

    return newErrors
  }, [form])

  const handleDonate = async () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStep("loading")
    setErrorMsg("")

    try {
      const orderRes = await axios.post(`${API_BASE}/create-order`, {
        amount: parseInt(form.amount),
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
      })

      if (!orderRes.data.success) {
        throw new Error(orderRes.data.message || "Order create nahi hua")
      }

      const { orderId, amount, razorpayKeyId, donorDetails } = orderRes.data.data

      const razorpayOptions = {
        key: razorpayKeyId,
        amount: amount,
        currency: "INR",
        name: "MyHeart Foundation",
        description: "Donation - MyHeart Foundation ",
        order_id: orderId,
        prefill: {
          name: donorDetails.name,
          email: donorDetails.email,
          contact: donorDetails.phone,
        },
        notes: {
          ngo: "MyHeart Foundation NGO",
          purpose: "Charitable Donation",
        },
        theme: {
          color: "#074a3c",
        },
        handler: async function (response) {
          await handlePaymentSuccess(response, donorDetails)
        },
        modal: {
          ondismiss: function () {
            setStep("form")
            notifyBackendFailure(orderId, "User cancelled payment")
          },
        },
      }

      const razorpayInstance = new window.Razorpay(razorpayOptions)

      razorpayInstance.on("payment.failed", function (response) {
        notifyBackendFailure(orderId, response.error?.description)
        setErrorMsg(
          response.error?.description || "Payment fail hua. Dobara try karein."
        )
        setStep("error")
      })

      razorpayInstance.open()
    } catch (err) {
      console.error("Donate error:", err)
      setErrorMsg(
        err.response?.data?.message ||
          err.message ||
          "Kuch problem aayi. Baad mein try karein."
      )
      setStep("error")
    }
  }

  const handlePaymentSuccess = async (razorpayResponse, donorDetails) => {
    try {
      const verifyRes = await axios.post(`${API_BASE}/verify`, {
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        donorDetails,
      })

      if (verifyRes.data.success) {
        setSuccessData(verifyRes.data.data)
        setStep("success")
      } else {
        throw new Error(verifyRes.data.message)
      }
    } catch (err) {
      setErrorMsg(
        "Payment hua lekin verify nahi hua. Payment ID note karein aur support@hopefoundation.org pe email karein."
      )
      setStep("error")
    }
  }

  const notifyBackendFailure = async (orderId, description) => {
    try {
      await axios.post(`${API_BASE}/failed`, {
        orderId,
        error: { description },
      })
    } catch (_) {}
  }

  const reset = () => {
    setForm({ name: "", email: "", phone: "", amount: "" })
    setErrors({})
    setSelectedPreset(null)
    setSuccessData(null)
    setErrorMsg("")
    setStep("form")
  }

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#f8faf9' }}>
      <div className='max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16'>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          {/* Header */}
<div className='px-6 md:px-12 py-8 md:py-12 text-center' style={{ backgroundColor: '#074a3c' }}>
  <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
    Make a Donation
  </h1>
  <p className='text-emerald-100 text-lg'>
    Your contribution creates real impact in communities
  </p>
</div>

          {/* Form State */}
          {step === "form" && (
            <div className='px-6 md:px-12 py-12'>
              {/* Preset Amounts */}
              <div className='mb-8'>
                <label className='block text-sm font-semibold mb-4' style={{ color: '#074a3c' }}>
                  Select Amount
                </label>
                <div className='grid grid-cols-2 md:grid-cols-6 gap-3'>
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handlePreset(amt)}
                      className={`py-3 px-4 rounded-lg font-semibold transition text-sm ${
                        selectedPreset === amt
                          ? 'text-white'
                          : 'border-2 text-gray-700 hover:border-emerald-500'
                      }`}
                      style={{
                        backgroundColor: selectedPreset === amt ? '#074a3c' : 'transparent',
                        borderColor: selectedPreset === amt ? '#074a3c' : '#e5e7eb',
                      }}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <InputField
                label="Custom Amount"
                name="amount"                                                                              
                type="number"
                placeholder="Enter amount"
                value={form.amount}
                onChange={(e) => {
                  setSelectedPreset(null)
                  handleChange(e)
                }}
                error={errors.amount}
              />

              <div className='border-t border-gray-200 my-8' />

              {/* Donor Details */}
              <div className='mb-8'>
                <h3 className='text-lg font-semibold mb-6' style={{ color: '#074a3c' }}>
                  Your Details
                </h3>
                
                <InputField
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <InputField
                  label="Phone Number (Optional)"
                  name="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleDonate}
                className='w-full py-4 rounded-lg font-bold text-white text-lg transition hover:opacity-90'
                style={{ backgroundColor: '#074a3c' }}
              >
                 Donate
                {form.amount &&
                !isNaN(parseInt(form.amount)) &&
                parseInt(form.amount) > 0
                  ? ` – ₹${parseInt(form.amount).toLocaleString()}`
                  : ""}
              </button>

              {/* Security Info */}
            </div>
          )}

          {/* Loading State */}
          {step === "loading" && (
            <div className='px-6 md:px-12 py-16 text-center'>
              <div className='w-14 h-14 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4'></div>
              <p className='text-gray-700 font-semibold'>Processing your donation...</p>
              <p className='text-gray-500 text-sm mt-2'>Please wait while we redirect you to payment</p>
            </div>
          )}

          {/* Success State */}
          {step === "success" && successData && (
            <div className='px-6 md:px-12 py-12 text-center'>
              
              <h2 className='text-3xl font-bold mb-2' style={{ color: '#074a3c' }}>
                Thank You!
              </h2>
              <p className='text-gray-600 mb-8'>Your donation was successful</p>

              {/* Receipt */}
              <div className='bg-gray-50 rounded-lg p-6 mb-8 text-left'>
                <div className='flex justify-between py-2 border-b border-gray-200 mb-2'>
                  <span className='text-gray-600'>Donor</span>
                  <span className='font-semibold text-gray-900'>{successData.donor}</span>
                </div>
                <div className='flex justify-between py-2 border-b border-gray-200 mb-2'>
                  <span className='text-gray-600'>Amount</span>
                  <span className='font-bold text-lg' style={{ color: '#074a3c' }}>
                    ₹{(successData.amount || 0).toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between py-2 border-b border-gray-200 mb-2'>
                  <span className='text-gray-600'>Payment ID</span>
                  <span className='font-mono text-xs text-gray-600'>{successData.paymentId}</span>
                </div>
                <div className='flex justify-between py-2'>
                  <span className='text-gray-600'>Method</span>
                  <span className='text-gray-900'>{successData.method || 'Online'}</span>
                </div>
              </div>

           
              <button
                onClick={reset}
                className='w-full py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition'
              >
                Make Another Donation
              </button>
            </div>
          )}

          {/* Error State */}
          {step === "error" && (
            <div className='px-6 md:px-12 py-12 text-center'>
              <h2 className='text-2xl font-bold mb-4' style={{ color: '#074a3c' }}>
                Payment Failed
              </h2>
              <p className='text-gray-600 mb-8'>
                {errorMsg || "Something went wrong. Please try again."}
              </p>
              <button
                onClick={reset}
                className='w-full py-3 rounded-lg font-semibold text-white transition'
                style={{ backgroundColor: '#074a3c' }}
              >
                Try Again
              </button>
              <p className='text-gray-500 text-xs mt-4'>
                Need help? Contact: support@hopefoundation.org
              </p>
            </div>
          )}
        </div>

        <p className='text-center text-gray-500 text-xs mt-6'>
          © 2026 MyHeart Foundation · Registered under Societies Act
        </p>
      </div>
    </div>
  )
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className='mb-6'>
      <label className='block text-sm font-semibold mb-2 text-gray-700'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-300 focus:border-emerald-500'
        }`}
        style={{ color: '#074a3c' }}
        min={type === "number" ? 1 : undefined}
      />
      {error && (
        <p className='text-red-600 text-sm mt-1'>⚠ {error}</p>
      )}
    </div>
  )
}