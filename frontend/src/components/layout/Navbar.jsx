import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='mx-auto max-w-8xl px-4'>
    <nav className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: '#074a3c', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
      <div className="max-w-7xl mx-auto px-5 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:opacity-80 transition text-white">
          MyHeart
        </Link>
        
        {/* Desktop Menu - Hidden on mobile */}
        <div className="hidden md:flex gap-0 items-center list-none">
          {/* Home Tab */}
          <Link 
            to="/" 
            className="text-xl font-medium transition duration-300 px-6 py-4 border-b-2 text-white"
            style={{ borderColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'white';
              e.currentTarget.style.color = '#f0f9f7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            Home
          </Link>
          
          {/* About Tab */}
          <Link 
            to="/about" 
            className="text-xl font-medium transition duration-300 px-6 py-4 border-b-2 text-white"
            style={{ borderColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'white';
              e.currentTarget.style.color = '#f0f9f7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            About
          </Link>
           <Link 
            to="/contact" 
            className="text-xl font-medium transition duration-300 px-6 py-4 border-b-2 text-white"
            style={{ borderColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'white';
              e.currentTarget.style.color = '#f0f9f7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            Contact
          </Link>

          {/* Donate Button */}
          <Link 
            to="/donate" 
            className="px-8 py-3 rounded-lg font-semibold text-white transition duration-300 hover:shadow-lg hover:scale-105 ml-4"
            style={{ backgroundColor: 'white', color: '#074a3c' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Donate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden focus:outline-none transition-transform duration-300 text-white"
        >
          {isOpen ? (
            <X size={28} className="transition-transform duration-300 rotate-90" />
          ) : (
            <Menu size={28} className="transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className="md:hidden overflow-hidden transition-all duration-500 ease-in-out border-t"
        style={{
          maxHeight: isOpen ? '300px' : '0px',
          opacity: isOpen ? '1' : '0',
          borderColor: 'rgba(255,255,255,0.2)',
          backgroundColor: '#0a5e4f'
        }}
      >
        <div className="px-5 py-4">
          <ul className="flex flex-col gap-4 list-none">
            <li>
              <Link 
                to="/" 
                className="text-lg font-medium transition duration-300 block py-3 px-4 border-b-2 text-white"
                style={{ borderColor: 'transparent' }}
                onClick={() => setIsOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="text-lg font-medium transition duration-300 block py-3 px-4 border-b-2 text-white"
                style={{ borderColor: 'transparent' }}
                onClick={() => setIsOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-lg font-medium transition duration-300 block py-3 px-4 border-b-2 text-white"
                style={{ borderColor: 'transparent' }}
                onClick={() => setIsOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/donate" 
                className="text-lg font-semibold transition duration-300 block py-3 px-4 rounded-lg"
                style={{ backgroundColor: 'white', color: '#074a3c' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                onClick={() => setIsOpen(false)}
              >
                Donate
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}