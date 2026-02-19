import React from 'react'
import hero from "../../src/image/hero.jpeg"
import { Link } from 'react-router-dom' 
import { BookOpen, Heart, Users } from 'lucide-react'
import ConsultationForm from '../components/Consultationform'
import education from "../../src/image/education.jpeg"
import classroom from "../../src/image/classroom.jpeg"
import volunteer from "../../src/image/volunteer.jpeg"
import team from "../../src/image/team.jpeg"
import health from "../../src/image/health.jpeg"
import food from "../../src/image/food.jpeg"
import whoarewe from "../../src/image/whoAreWe.jpeg"


import food1 from "../../src/image/food1.jpeg"

import health1 from "../../src/image/health1.jpeg"

import education1 from "../../src/image/education1.jpeg"


  const programs = [
    {
      id: 1,
      icon: <BookOpen size={40} />,
      title: "Education",
      description: "We provide quality education to underprivileged children. Our programs include scholarship distribution, study materials, and coaching classes for competitive exams.",
      image: education1
    },
    {
      id: 2,
      icon: <Heart size={40} />,
      title: "Health Camp",
      description: "Free medical checkups and health awareness camps in rural areas. We organize camps for immunization, nutrition guidance, and preventive healthcare for communities.",
      image: health1
    },
    {
      id: 3,
      icon: <Users size={40} />,
      title: "Food Distribution",
      description: "We distribute nutritious meals to underfed children and families in need. Regular meal drives ensure no one goes hungry in our community.",
      image: food1
    }
  ]

    const galleryImages = [
    {
      id: 1,
      src: education,
      category: "Education",
      title: "Classroom Learning"
    },
    {
      id: 2,
      src: classroom,
      category: "Community",
      title: "Community Engagement"
    },
    {
      id: 3,
      src: health,
      category: "Health",
      title: "Health Camp"
    },
    {
      id: 4,
      src: food,
      category: "Food",
      title: "Meal Distribution"
    },
    {
      id: 5,
      src: team,
      category: "Team",
      title: "Our Team" 
    },
    {
      id: 6,
      src: volunteer,
      category: "Volunteers",
      title: "Volunteer Work"
    }
  ]



const Home = () => {
  return (
    <>
        <div className='max-w-7xl mx-auto px-4  rounded-lg overflow-hidden relative mt-2 md:mt-4'>
      {/* Background Image Container */}
      <div className='relative overflow-hidden rounded-lg h-96 md:h-[500px] lg:h-[600px]'>
        <img 
          src={hero}
          alt='Hero Image'
          className='w-full h-full object-cover'
        />

        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black opacity-40'></div>

        {/* Text Content - Absolute */}
        <div className='absolute inset-0 flex flex-col justify-center px-6 md:px-12'>
          <div className='w-full md:w-1/2'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 md:mb-4'>
              Small Help. Big Impact'
            </h1>
            <p className='text-sm sm:text-base md:text-lg text-white font-light mb-4 md:mb-6 leading-relaxed'>
              Your support can provide food, education, and hope to those who need it most. Let's stand together and make a real difference.
            </p>

<Link 
  to="/contact"
  className='inline-block bg-green-500 text-white px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-md font-bold hover:bg-green-600 transition duration-300 hover:shadow-lg transform hover:scale-105'
>
  Get Free Consultation
</Link>          </div>
        </div>
      </div>
    </div>
{/* short about */}
    <div className='max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16'>
      <div className='grid md:grid-cols-2 gap-12 items-center'>
        {/* Left - Image */}
        <div>
          <img 
          src={whoarewe}
            alt="About us"
            className='rounded-lg shadow-lg w-full h-auto'
          />
        </div>

        {/* Right - Text */}
        <div>
          <h2 className='text-3xl md:text-4xl font-bold mb-6' style={{ color: '#074a3c' }}>
            Who We Are
         
          </h2>
          
          <p className='text-gray-700 mb-4 leading-relaxed text-lg'>
            We are a dedicated NGO committed to transforming lives through education, healthcare, and community support. Since 2015, we've been working tirelessly to reach underprivileged children and families.
          </p>
          
          <p className='text-gray-700 mb-4 leading-relaxed text-lg'>
            Our mission is simple yet powerful: to create opportunities for those who have been left behind. Every child deserves a chance to learn, grow, and achieve their dreams.
          </p>
          
          <p className='text-gray-700 mb-6 leading-relaxed text-lg'>
            With the support of hundreds of volunteers and donors, we've impacted thousands of lives. Join us in making a real difference in the world.
          </p>

          <Link 
            to="/about"
            className='inline-block px-8 py-3 rounded-lg font-semibold text-white transition duration-300 hover:shadow-lg transform hover:scale-105'
            style={{ backgroundColor: '#074a3c' }}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>

    {/* our work */}
        <div className='bg-gray-50 py-12 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4' style={{ color: '#074a3c' }}>
            Our Programs
          </h2>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            We run multiple initiatives to create a positive impact in communities
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
  {programs.map((program) => (
    <div 
      key={program.id}
      className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 flex flex-col'
    >
      {/* Image */}
      <img 
        src={program.image}
        alt={program.title}
        className='w-full h-64 object-cover'
      />

      {/* Content */}
      <div className='p-6 flex flex-col flex-grow'>
        {/* Icon */}
        <div 
          className='w-12 h-12 rounded-lg flex items-center justify-center mb-4'
          style={{ backgroundColor: '#f0f9f7', color: '#074a3c' }}
        >
          {program.icon}
        </div>

        {/* Title */}
        <h3 className='text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
          {program.title}
        </h3>

        {/* Description */}
        <p className='text-gray-600 leading-relaxed mb-6'>
          {program.description}
        </p>

        {/* Button - Bottom mein fixed */}
        <Link 
          to="/donate"
          className='w-full block text-center px-4 py-2 rounded-lg font-bold text-white transition duration-300 hover:shadow-lg transform hover:scale-105 mt-auto'
          style={{ backgroundColor: '#084a3c' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a5e4f'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#084a3c'}
        >
          Donate
        </Link>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
    {/* gallery */}
    <div className='bg-gray-50 py-12 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4' style={{ color: '#074a3c' }}>
            Our Gallery
          </h2>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            Visual stories of the impact we create every day in our communities
          </p>
        </div>

        {/* Grid - 3 columns x 2 rows */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className='rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 group'
            >
              {/* Image */}
              <div className='relative overflow-hidden h-64'>
                <img
                  src={image.src}
                  alt={image.title}
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-300'></div>
              </div>

              {/* Content */}
              <div className='bg-white p-4'>
                <span 
                  className='inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-2'
                  style={{ backgroundColor: '#074a3c' }}
                >
                  {image.category}
                </span>
                <h3 className='text-lg font-bold mb-4' style={{ color: '#074a3c' }}>
                  {image.title}
                </h3>
                
                {/* Donate Button */}
<Link 
  to="/donate"
  className='w-full block text-center px-4 py-2 rounded-lg font-bold text-white transition duration-300 hover:shadow-lg transform hover:scale-105'
  style={{ backgroundColor: '#084a3c' }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a5e4f'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#084a3c'}
>
  Donate
</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Consultationform  */}
    <ConsultationForm/>

    </>

  )
}

export default Home