import React, { useState } from 'react'
import emailjs from 'emailjs-com'

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consultationType: ''
  })

  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  React.useEffect(() => {
    emailjs.init('YOUR_PUBLIC_KEY')
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: 'your-ngo-email@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          consultation_type: formData.consultationType,
          message: formData.message,
        }
      )

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        consultationType: ''
      })
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-gradient-to-br from-emerald-50 to-blue-50 py-12 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4' style={{ color: '#074a3c' }}>
            Get Free Consultation
          </h1>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className='mb-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-green-700 font-semibold'>
            ✅ Thank you! We'll contact you soon.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className='mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-lg text-red-700 font-semibold'>
            ❌ Error sending request. Please try again.
          </div>
        )}

        {/* Form Container */}
        <div className='bg-white rounded-lg shadow-lg p-8 md:p-12'>
          <form onSubmit={handleSubmit}>
            {/* Row 1: Name and Email */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <label className='block text-sm font-semibold mb-2' style={{ color: '#074a3c' }}>
                  Full Name *
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder='Enter your full name'
                  className='w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition'
                  style={{ borderColor: '#084a3c' }}
                  onFocus={(e) => e.target.style.borderColor = '#0a5e4f'}
                  onBlur={(e) => e.target.style.borderColor = '#084a3c'}
                />
              </div>

              <div>
                <label className='block text-sm font-semibold mb-2' style={{ color: '#074a3c' }}>
                  Email Address *
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder='Enter your email'
                  className='w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition'
                  style={{ borderColor: '#084a3c' }}
                  onFocus={(e) => e.target.style.borderColor = '#0a5e4f'}
                  onBlur={(e) => e.target.style.borderColor = '#084a3c'}
                />
              </div>
            </div>

            {/* Row 2: Phone and Consultation Type */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <label className='block text-sm font-semibold mb-2' style={{ color: '#074a3c' }}>
                  Phone Number *
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder='Enter your phone number'
                  className='w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition'
                  style={{ borderColor: '#084a3c' }}
                  onFocus={(e) => e.target.style.borderColor = '#0a5e4f'}
                  onBlur={(e) => e.target.style.borderColor = '#084a3c'}
                />
              </div>

              <div>
                <label className='block text-sm font-semibold mb-2' style={{ color: '#074a3c' }}>
                  Consultation Type *
                </label>
                <select
                  name='consultationType'
                  value={formData.consultationType}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition'
                  style={{ borderColor: '#084a3c' }}
                  onFocus={(e) => e.target.style.borderColor = '#0a5e4f'}
                  onBlur={(e) => e.target.style.borderColor = '#084a3c'}
                >
                  <option value=''>Select consultation type</option>
                  <option value='education'>Education Program</option>
                  <option value='health'>Health Camp</option>
                  <option value='food'>Food Distribution</option>
                  <option value='volunteer'>Volunteer Opportunity</option>
                  <option value='donation'>Donation Inquiry</option>
                  <option value='other'>Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className='mb-8'>
              <label className='block text-sm font-semibold mb-2' style={{ color: '#074a3c' }}>
                Message *
              </label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                placeholder='Tell us more about your inquiry...'
                rows='5'
                className='w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition resize-none'
                style={{ borderColor: '#084a3c' }}
                onFocus={(e) => e.target.style.borderColor = '#0a5e4f'}
                onBlur={(e) => e.target.style.borderColor = '#084a3c'}
              ></textarea>
            </div>

            {/* Submit Button */}
<div className='flex justify-center'>
  <button
    type='submit'
    disabled={loading}
    className='w-[200px] py-3 rounded-lg font-bold text-white transition duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50'
    style={{ backgroundColor: '#084a3c' }}
    onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#0a5e4f')}
    onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#084a3c')}
  >
    {loading ? 'Sending...' : 'Submit'}
  </button>
</div>          </form>
        </div>
      </div>
    </div>
  )
}

export default ConsultationForm