import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className='min-h-screen' style={{ backgroundColor: '#f8faf9' }}>
      <div className='max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16'>
        <div className='bg-white rounded-lg shadow-lg p-8 md:p-12'>
          <h1 className='text-3xl md:text-4xl font-bold mb-8' style={{ color: '#074a3c' }}>
            Privacy Policy
          </h1>

          <div className='space-y-8 text-gray-700 leading-relaxed text-sm md:text-base'>
            <section>
              <h2 className='text-lg md:text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
                1. Information We Collect
              </h2>
              <p className='text-xs md:text-sm'>
                We collect personal information you voluntarily provide through our website:
              </p>
              <ul className='list-disc list-inside mt-2 space-y-1 ml-4 text-xs md:text-sm'>
                <li><strong>Contact Form:</strong> Name, Email, Phone Number</li>
                <li><strong>Donations:</strong> Name, Email, Phone Number, Payment Info</li>
              </ul>
            </section>

            <section>
              <h2 className='text-lg md:text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
                2. How We Use Your Information
              </h2>
              <p className='text-xs md:text-sm'>We use information for:</p>
              <ul className='list-disc list-inside mt-2 space-y-1 ml-4 text-xs md:text-sm'>
                <li>Responding to inquiries</li>
                <li>Processing donations</li>
                <li>Sending receipts</li>
                <li>Improving services</li>
                <li>Legal compliance</li>
              </ul>
            </section>

            <section>
              <h2 className='text-lg md:text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
                3. Payment Processing
              </h2>
              <p className='text-xs md:text-sm'>
                Donations are processed securely through Razorpay. We don't store complete card details. Payment information is encrypted and handled by Razorpay.
              </p>
            </section>

            <section>
              <h2 className='text-lg md:text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
                4. Data Security
              </h2>
              <p className='text-xs md:text-sm'>
                We protect your information with technical measures. All data transmission is encrypted using SSL/TLS security protocols.
              </p>
            </section>

            <section>
              <h2 className='text-lg md:text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
                5. Data Retention
              </h2>
              <p className='text-xs md:text-sm'>
                We retain information only as long as necessary. You can request deletion anytime.
              </p>
            </section>

            <section>
              <h2 className='text-lg md:text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
                6. Third-Party Services
              </h2>
              <p className='text-xs md:text-sm'>
                We use Razorpay for payments. Review their privacy policy for payment details.
              </p>
            </section>

            <section>
              <h2 className='text-lg md:text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
                7. Your Rights
              </h2>
              <p className='text-xs md:text-sm'>You have the right to:</p>
              <ul className='list-disc list-inside mt-2 space-y-1 ml-4 text-xs md:text-sm'>
                <li>Access your information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion</li>
                <li>Opt-out of communications</li>
              </ul>
            </section>

            <section>
              <h2 className='text-lg md:text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
                8. Contact Us
              </h2>
              <div className='mt-2 ml-4 text-xs md:text-sm space-y-1'>
                <p><strong>Email:</strong> info@ngo.org</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> 123 Charity Lane, Delhi</p>
              </div>
            </section>

            <section>
              <h2 className='text-lg md:text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
                9. Policy Updates
              </h2>
              <p className='text-xs md:text-sm'>
                We may update this policy. Changes will be posted on our website.
              </p>
            </section>

            <div className='border-t border-gray-300 pt-6 mt-6'>
              <p className='text-xs text-gray-600'>
                <strong>Last Updated:</strong> February 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}