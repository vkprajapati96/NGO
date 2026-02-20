import React from 'react'
/* ======= 5. CORE VALUES SECTION ============ */
import { Heart, Target, Zap, Globe } from 'lucide-react'
import { Award, Users,CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Achievement from '../components/Achievement'

import journey from "../../src/image/journey.jpeg"
import mission1 from "../../src/image/mission1.jpeg"
import vision from "../../src/image/vision.jpeg"


const values = [
  {
    icon: <Heart size={32} />,
    title: "Compassion",
    description: "We care deeply about every individual we serve"
  },
  {
    icon: <Target size={32} />,
    title: "Integrity",
    description: "We operate with transparency and honesty"
  },
  {
    icon: <Zap size={32} />,
    title: "Impact",
    description: "We focus on creating lasting sustainable change"
  },
  {
    icon: <Globe size={32} />,
    title: "Inclusivity",
    description: "We welcome and value diverse perspectives"
  }
]
const achievements = [
  { icon: "🎓", title: "5000+", description: "Children Educated" },
  { icon: "🍽️", title: "50K+", description: "Meals Distributed" },
  { icon: "🏥", title: "1000+", description: "Medical Camps" },
  { icon: "🤝", title: "500+", description: "Active Volunteers" }
]

const teamMembers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Founder & Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "20+ years in social welfare"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Program Head",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Education specialist"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Volunteer Coordinator",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Community mobilizer"
  }
]


const About = () => {
  return (
    <>
    {/* about */}
<div  className='px-4'>
  <div className='max-w-7xl mx-auto  py-12 md:py-20 mt-2 md:mt-4 rounded-lg' style={{ backgroundColor: '#074a3c' }}>
    <div className='text-center mb-12'>
      <h1 className='text-4xl md:text-6xl font-bold mb-6 text-white'>
        About MyHeart Foundation
      </h1>
      <p className='text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto'>
        Empowering underprivileged communities through education, healthcare, and sustainable development
      </p>
    </div>
  </div>
</div>
{/* journey */}
<div className='bg-gradient-to-r from-emerald-50 to-blue-50 py-12 md:py-16'>
  <div className='max-w-7xl mx-auto px-4 md:px-6'>
    <div className='grid md:grid-cols-2 gap-12 items-stretch'>
      <div className='flex flex-col justify-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6' style={{ color: '#074a3c' }}>
          Our Journey
        </h2>
        <p className='text-gray-700 mb-4 leading-relaxed text-base md:text-lg'>
          We began with a simple mission to provide nutritious meals to underprivileged children. What started as distributing meals to a few families has now reached over 50,000 children across multiple communities.
        </p>
        <p className='text-gray-700 mb-4 leading-relaxed text-base md:text-lg'>
          Today, our food programs ensure proper nutrition, health awareness, and sustainable meal distribution. We believe every child deserves access to nutritious food for a healthy future.
        </p>
        <p className='text-gray-700 leading-relaxed text-base md:text-lg'>
          Your support helps us continue this mission and bring hope through food to thousands of families in need.
        </p>
      </div>
      <div className='flex items-center'>
        <img 
          src={journey}
          alt="Our food distribution journey"
          className='rounded-lg shadow-lg w-full h-auto'
        />
      </div>
    </div>
  </div>
</div>

{/* mission  */}
<div className='py-12 md:py-16' style={{ backgroundColor: '#074a3c' }}>
  <div className='max-w-7xl mx-auto px-4 md:px-6'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
      <div className='order-2 md:order-1'>
        <img 
          src={mission1}
          alt="Our mission"
          className='rounded-lg shadow-lg w-full h-auto'
        />
      </div>
      <div className='order-1 md:order-2'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6 text-white'>
          Our Mission
        </h2>
        <p className='text-emerald-100 mb-6 leading-relaxed text-base md:text-lg'>
          To ensure every underprivileged child has access to nutritious meals and food security. We provide quality nutrition programs that create lasting positive change.
        </p>
        <div className='space-y-3'>
          <div className='flex gap-3'>
            <CheckCircle size={24} style={{ color: '#fff' }} className='flex-shrink-0' />
            <span className='text-emerald-100 text-base md:text-lg'>Distribute nutritious meals</span>
          </div>
          <div className='flex gap-3'>
            <CheckCircle size={24} style={{ color: '#fff' }} className='flex-shrink-0' />
            <span className='text-emerald-100 text-base md:text-lg'>Ensure food security</span>
          </div>
          <div className='flex gap-3'>
            <CheckCircle size={24} style={{ color: '#fff' }} className='flex-shrink-0' />
            <span className='text-emerald-100 text-base md:text-lg'>Nutrition awareness</span>
          </div>
          <div className='flex gap-3'>
            <CheckCircle size={24} style={{ color: '#fff' }} className='flex-shrink-0' />
            <span className='text-emerald-100 text-base md:text-lg'>Sustainable food programs</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 {/*vision  */}

<div className='py-12 md:py-16 bg-white'>
  <div className='max-w-7xl mx-auto px-4 md:px-6'>
    <div className='grid md:grid-cols-2 gap-12 items-center'>
      <div>
        <h2 className='text-3xl md:text-4xl font-bold mb-6' style={{ color: '#074a3c' }}>
          Our Vision
        </h2>
        <p className='text-gray-700 mb-6 leading-relaxed text-base md:text-lg'>
          A world where every underprivileged child has access to nutritious meals and grows up healthy and strong. We envision communities where food security becomes a basic right.
        </p>
        <div className='space-y-3'>
          <div className='flex gap-3'>
            <Award size={24} style={{ color: '#074a3c' }} className='flex-shrink-0' />
            <span className='text-gray-700 text-base md:text-lg'>Zero hunger - nutritious meals for every child</span>
          </div>
          <div className='flex gap-3'>
            <Globe size={24} style={{ color: '#074a3c' }} className='flex-shrink-0' />
            <span className='text-gray-700 text-base md:text-lg'>Sustainable food systems in every community</span>
          </div>
          <div className='flex gap-3'>
            <Users size={24} style={{ color: '#074a3c' }} className='flex-shrink-0' />
            <span className='text-gray-700 text-base md:text-lg'>Empowered families through nutrition knowledge</span>
          </div>
        </div>
      </div>
      <div>
        <img 
          src={vision}
          alt="Our food vision"
          className='rounded-lg shadow-lg w-full h-auto'
        />
      </div>
    </div>
  </div>
</div>

{/*  */}
<div className='max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16'>
  <h2 className='text-3xl md:text-4xl font-bold text-center mb-12' style={{ color: '#074a3c' }}>
    Our Core Values
  </h2>
  
  <div className='grid md:grid-cols-4 gap-8'>
    {values.map((value, idx) => (
      <div key={idx} className='p-8 rounded-lg shadow-md hover:shadow-lg transition' style={{ backgroundColor: '#f0f9f7' }}>
        <div className='mb-4' style={{ color: '#074a3c' }}>
          {value.icon}
        </div>
        <h3 className='text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
          {value.title}
        </h3>
        <p className='text-gray-700 leading-relaxed'>
          {value.description}
        </p>
      </div>
    ))}
  </div>
</div>
{/*  */}
<Achievement/>
{/*  */}




<div className='bg-gradient-to-r from-emerald-50 to-blue-50 py-12 md:py-16'>
  <div className='max-w-7xl mx-auto px-4 md:px-6'>
    <h2 className='text-3xl md:text-4xl font-bold text-center mb-12' style={{ color: '#074a3c' }}>
      Why Support Us?
    </h2>
    
    <div className='grid md:grid-cols-2 gap-8'>
      <div className='p-6 bg-white rounded-lg shadow-md'>
        <h3 className='text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
           Transparent Operations
        </h3>
        <p className='text-gray-700'>
          Every rupee is accounted for and utilized effectively. We maintain complete transparency in our financial dealings and operations.
        </p>
      </div>
      <div className='p-6 bg-white rounded-lg shadow-md'>
        <h3 className='text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
           Proven Track Record
        </h3>
        <p className='text-gray-700'>
          Over 9 years of consistent work, touching thousands of lives and creating measurable impact in communities.
        </p>
      </div>
      <div className='p-6 bg-white rounded-lg shadow-md'>
        <h3 className='text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
           Dedicated Team
        </h3>
        <p className='text-gray-700'>
          Our passionate team of professionals and volunteers work tirelessly to ensure maximum impact in every program.
        </p>
      </div>
      <div className='p-6 bg-white rounded-lg shadow-md'>
        <h3 className='text-xl font-bold mb-3' style={{ color: '#074a3c' }}>
           Sustainable Solutions
        </h3>
        <p className='text-gray-700'>
          We focus on long-term sustainable solutions rather than temporary relief, creating lasting change.
        </p>
      </div>
    </div>
  </div>
</div>

{/*  */}

<div className='max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16'>
  <div className='text-center'>
    <h2 className='text-3xl md:text-4xl font-bold mb-6' style={{ color: '#074a3c' }}>
      Join Our Mission
    </h2>
    <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
      Whether you want to donate, volunteer, or simply spread awareness, your support makes a real difference. Together, we can create lasting positive change.
    </p>
    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
      <Link 
        to="/contact"
        className='px-8 py-3 rounded-lg font-semibold text-white transition duration-300 hover:shadow-lg transform hover:scale-105'
        style={{ backgroundColor: '#074a3c' }}
      >
        Become a Volunteer
      </Link>
      <Link 
        to="/donate"
        className='px-8 py-3 rounded-lg font-semibold text-white transition duration-300 hover:shadow-lg transform hover:scale-105'
        style={{ backgroundColor: '#084a3c' }}
      >
        Donate Now
      </Link>
    </div>
  </div>
</div>
    </>
  )
}

export default About 