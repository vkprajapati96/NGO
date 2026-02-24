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
              <h2 className='text-xl md:text-2xl font-bold mb-4' style={{ color: '#074a3c' }}>
                1. Information We Collect
              </h2>
              <p>
                We collect personal information that you voluntarily provide through our website:
              </p>
              <ul className='list-disc list-inside mt-3 space-y-2 ml-4'>
                <li><strong>Contact Form:</strong> Name, Email, and Phone Number</li>
                <li><strong>Donations:</strong> Name, Email, Phone Number, and Payment Information via Razorpay</li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl md:text-2xl font-bold mb-4' style={{ color: '#074a3c' }}>
                2. How We Use Your Information
              </h2>
              <p>We use the information collected for the following purposes:</p>
              <ul className='list-disc list-inside mt-3 space-y-2 ml-4'>
                <li>To respond to your consultation inquiries and messages</li>
                <li>To process and confirm your donations</li>
                <li>To send donation receipts and acknowledgment</li>
                <li>To improve our services and website experience</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl md:text-2xl font-bold mb-4' style={{ color: '#074a3c' }}>
                3. Payment Processing
              </h2>
              <p>
                All donations are processed securely through Razorpay, a trusted payment gateway. We do not store your complete payment card information. Your payment details are encrypted and handled directly by Razorpay.
              </p>
            </section>

            <section>
              <h2 className='text-xl md:text-2xl font-bold mb-4' style={{ color: '#074a3c' }}>
                4. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access. All data transmission is encrypted using SSL/TLS security protocols.
              </p>
            </section>

            <section>
              <h2 className='text-xl md:text-2xl font-bold mb-4' style={{ color: '#074a3c' }}>
                5. Data Retention
              </h2>
              <p>
                We retain your personal information only as long as necessary to fulfill the purposes mentioned above. You can request deletion of your data at any time.
              </p>
            </section>

            <section>
              <h2 className='text-xl md:text-2xl font-bold mb-4' style={{ color: '#074a3c' }}>
                6. Third-Party Services
              </h2>
              <p>
                Our website uses Razorpay for payment processing. Razorpay has its own privacy policy governing the handling of your payment information.
              </p>
            </section>

            <section>
              <h2 className='text-xl md:text-2xl font-bold mb-4' style={{ color: '#074a3c' }}>
                7. Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className='list-disc list-inside mt-3 space-y-2 ml-4'>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of communications</li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl md:text-2xl font-bold mb-4' style={{ color: '#074a3c' }}>
                8. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className='mt-3 ml-4'>
                <p><strong>Email:</strong> info@ngo.org</p>
                <p><strong>Phone:</strong> +91 98765 4XXXX</p>
                <p><strong>Address:</strong> 123 Charity Lane, Delhi</p>
              </div>
            </section>

            <section>
              <h2 className='text-xl md:text-2xl font-bold mb-4' style={{ color: '#074a3c' }}>
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on our website.
              </p>
            </section>

            <div className='border-t border-gray-300 pt-8 mt-8'>
              <p className='text-sm text-gray-600'>
                <strong>Last Updated:</strong> February 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}