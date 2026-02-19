import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#074a3c' }} className='text-white py-12 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
          {/* Logo & About */}
          <div>
            <h3 className='text-2xl font-bold mb-3'>MyHeart</h3>
            <p className='text-emerald-100 text-sm leading-relaxed'>
              Transforming lives through education, healthcare, and community support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Navigation</h3>
            <ul className='space-y-2'>
              <li>
                <Link to="/" className='text-emerald-100 hover:text-white transition'>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className='text-emerald-100 hover:text-white transition'>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className='text-emerald-100 hover:text-white transition'>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/donate" className='text-emerald-100 hover:text-white transition'>
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Contact</h3>
            <div className='space-y-2 text-emerald-100 text-sm'>
              <p> 123 Charity Lane, Delhi</p>
              <p> +91 98765 43210</p>
              <p> info@ngo.org</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Follow Us</h3>
            <div className='flex gap-3'>
              <a href="#" className='bg-emerald-600 hover:bg-emerald-700 p-3 rounded-lg transition'>
                <Facebook size={20} />
              </a>
              <a href="#" className='bg-emerald-600 hover:bg-emerald-700 p-3 rounded-lg transition'>
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-emerald-600 pt-8 text-center md:text-left'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-emerald-100 text-sm'>
              © 2024 MyHeart Foundation. All rights reserved.
            </p>
            <div className='flex gap-6'>
              <a href="#" className='text-emerald-100 hover:text-white text-sm transition'>
                Privacy Policy
              </a>
              <a href="#" className='text-emerald-100 hover:text-white text-sm transition'>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer