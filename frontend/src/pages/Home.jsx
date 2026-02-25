import React from "react";
import hero from "../../src/image/hero.jpeg";
import { Link } from "react-router-dom";
import { BookOpen, Heart, Users } from "lucide-react";
import { UtensilsCrossed,  Package } from 'lucide-react'

import ConsultationForm from "../components/Consultationform";

import classroom from "../../src/image/classroom.jpeg";
import volunteer from "../../src/image/volunteer.jpeg";
import food from "../../src/image/food.jpeg";
import whoarewe from "../../src/image/whoAreWe.jpeg";

import food1 from "../../src/image/food1.jpeg";
import streetfeeding from "../../src/image/streetfeeding.jpeg";
import ration from "../../src/image/ration.jpeg";



const programs = [
  {
    id: 1,
    title: "Daily Food Distribution",
    description: "We prepare and distribute fresh, hygienic meals to underprivileged children, families, and homeless individuals. Our daily drives ensure no one in our community sleeps hungry.",
    image: food1,
    icon: UtensilsCrossed
  },
  {
    id: 2,
    title: "Street Feeding Drive",
    description: "Regular food distribution for homeless individuals living on streets and shelters.",
    image: streetfeeding,
    icon: Users
  },
  {
    id: 3,
    title: "Ration Distribution",
    description: "We provide monthly ration kits including rice, pulses, oil, and basic necessities to families in need.",
    image: ration,
    icon: Package
  }
]

const galleryImages = [
 {
    id: 1,
    src: food,
    category: "Food",
    title: "Meal Distribution",
  },
 
  {
    id: 2,
    src: classroom,
    category: "Community",
    title: "Community Engagement",
  },
  
  {
    id: 3,
    src: volunteer,
    category: "Volunteers",
    title: "Volunteer Work",
  },
];

const Home = () => {
  return (
    <>
<div className="max-w-7xl mx-auto px-4 rounded-lg overflow-hidden relative mt-2 md:mt-4">
  {/* Background Image Container */}
  <div className="relative overflow-hidden rounded-lg h-96 md:h-[500px] lg:h-[600px]">
    <img
      src={hero}
      alt="Hero Image"
      className="w-full h-full object-cover"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black opacity-40"></div>

    {/* Text Content - Absolute */}
    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 md:mb-4">
          Small Help. Big Impact.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white font-light mb-4 md:mb-6 leading-relaxed">
          A single meal can bring hope to someone in need. We provide
          fresh food to hungry children and families. Your small support
          can make a big difference.
        </p>

        <Link
          to="/donate"
          className="inline-block bg-green-500 text-white px-3 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4 rounded-md font-bold hover:bg-green-600 transition duration-300 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
        >
          Donate Now
        </Link>
      </div>
    </div>
  </div>
</div>

      {/* short about */}
<div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Left - Image */}
    <div>
      <img
        src={whoarewe}
        alt="About us"
        className="rounded-lg shadow-lg w-full h-auto"
      />
    </div>

    {/* Right - Text */}
    <div>
      <h2
        className="text-3xl md:text-4xl font-bold mb-6"
        style={{ color: "#074a3c" }}
      >
        Who We Are
      </h2>

      <p className="text-gray-700 mb-4 leading-relaxed text-lg">
        We are a dedicated NGO committed to fighting hunger and ensuring that no one sleeps without a meal. Since our beginning, we have worked tirelessly to provide fresh, nutritious food to underprivileged children, families, and elderly individuals.
      </p>

      <p className="text-gray-700 mb-4 leading-relaxed text-lg">
        Our mission is simple yet powerful: to make food accessible to those who struggle for daily survival. We believe that food is not charity, it is a basic human right.
      </p>

      <p className="text-gray-700 mb-6 leading-relaxed text-lg">
        With the support of generous donors and passionate volunteers, we have served thousands of meals and brought hope to countless lives. Join us in building a hunger-free community.
      </p>

      <Link
        to="/about"
        className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition duration-300 hover:shadow-lg transform hover:scale-105"
        style={{ backgroundColor: "#074a3c" }}
      >
        Read More
      </Link>
    </div>
  </div>
</div>

     
      {/* our work */}
<div className="bg-gray-50 py-12 md:py-16">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#074a3c" }}>
        Our Programs
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        We run focused initiatives to fight hunger and provide nutritious meals to those in need.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {programs.map((program) => {
        const IconComponent = program.icon
        return (
          <div key={program.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 flex flex-col">
            <img src={program.image} alt={program.title} className="w-full h-64 object-cover" />
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "#f0f9f7", color: "#074a3c" }}>
                <IconComponent size={24} />
              </div>
              
              <h3 className="text-xl font-bold mb-3" style={{ color: "#074a3c" }}>
                {program.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {program.description}
              </p>
              
              <Link to="/donate" className="w-full block text-center px-4 py-2 rounded-lg font-bold text-white transition duration-300 hover:shadow-lg transform hover:scale-105 mt-auto" style={{ backgroundColor: "#084a3c" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0a5e4f")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#084a3c")}>
                Donate
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  </div>
</div>

      {/* how we help */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
  <h2
    className="text-3xl md:text-4xl font-bold text-center mb-12"
    style={{ color: "#074a3c" }}
  >
    How We Help
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* CARD 1 */}
    <div className="h-80 relative cursor-pointer group">
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotateY(180deg)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotateY(0deg)")}
      >
        <div
          className="absolute w-full h-full p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          style={{ backgroundColor: "#084a3c", backfaceVisibility: "hidden" }}
        >
          <div className="text-6xl font-bold mb-4 opacity-30" style={{ color: "#fff" }}>01</div>
          <h3 className="text-xl font-bold text-center" style={{ color: "#fff" }}>Collect Food Donations</h3>
        </div>

        <div
          className="absolute w-full h-full p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          style={{ backgroundColor: "#fff", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-gray-700 text-center text-sm leading-relaxed mb-6 font-medium">
            We receive food donations from individuals, businesses, and organizations.
          </p>
          <a href="/donate" className="px-6 py-2 rounded-lg font-bold text-white" style={{ backgroundColor: "#084a3c" }}>
            Donate
          </a>
        </div>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="h-80 relative cursor-pointer group">
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotateY(180deg)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotateY(0deg)")}
      >
        <div
          className="absolute w-full h-full p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          style={{ backgroundColor: "#084a3c", backfaceVisibility: "hidden" }}
        >
          <div className="text-6xl font-bold mb-4 opacity-30" style={{ color: "#fff" }}>02</div>
          <h3 className="text-xl font-bold text-center" style={{ color: "#fff" }}>Prepare Nutritious Meals</h3>
        </div>

        <div
          className="absolute w-full h-full p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          style={{ backgroundColor: "#fff", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-gray-700 text-center text-sm leading-relaxed mb-6 font-medium">
            Our team carefully prepares balanced, nutritious meals for families.
          </p>
          <a href="/donate" className="px-6 py-2 rounded-lg font-bold text-white" style={{ backgroundColor: "#084a3c" }}>
            Donate
          </a>
        </div>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="h-80 relative cursor-pointer group">
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotateY(180deg)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotateY(0deg)")}
      >
        <div
          className="absolute w-full h-full p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          style={{ backgroundColor: "#084a3c", backfaceVisibility: "hidden" }}
        >
          <div className="text-6xl font-bold mb-4 opacity-30" style={{ color: "#fff" }}>03</div>
          <h3 className="text-xl font-bold text-center" style={{ color: "#fff" }}>Distribute to Needy</h3>
        </div>

        <div
          className="absolute w-full h-full p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          style={{ backgroundColor: "#fff", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-gray-700 text-center text-sm leading-relaxed mb-6 font-medium">
            We distribute meals to underprivileged families and homeless individuals.
          </p>
          <a href="/donate" className="px-6 py-2 rounded-lg font-bold text-white" style={{ backgroundColor: "#084a3c" }}>
            Donate
          </a>
        </div>
      </div>
    </div>

    {/* CARD 4 */}
    <div className="h-80 relative cursor-pointer group">
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotateY(180deg)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotateY(0deg)")}
      >
        <div
          className="absolute w-full h-full p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          style={{ backgroundColor: "#084a3c", backfaceVisibility: "hidden" }}
        >
          <div className="text-6xl font-bold mb-4 opacity-30" style={{ color: "#fff" }}>04</div>
          <h3 className="text-xl font-bold text-center" style={{ color: "#fff" }}>Track & Report</h3>
        </div>

        <div
          className="absolute w-full h-full p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          style={{ backgroundColor: "#fff", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-gray-700 text-center text-sm leading-relaxed mb-6 font-medium">
            We maintain transparent records and impact reports for donors.
          </p>
          <a href="/donate" className="px-6 py-2 rounded-lg font-bold text-white" style={{ backgroundColor: "#084a3c" }}>
            Donate
          </a>
        </div>  
      </div>
    </div>
  </div>
</div>

      {/* gallery */}

      <div className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#074a3c" }}
            >
              Our Gallery
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Visual stories of the impact we create every day in our
              communities
            </p>
          </div>

          {/* Grid - 3 columns x 2 rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-300"></div>
                </div>

                {/* Content */}
                <div className="bg-white p-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-2"
                    style={{ backgroundColor: "#074a3c" }}
                  >
                    {image.category}
                  </span>
                  <h3
                    className="text-lg font-bold mb-4"
                    style={{ color: "#074a3c" }}
                  >
                    {image.title}
                  </h3>

                  {/* Donate Button */}
                  {/* <Link 
  to="/donate"
  className='w-full block text-center px-4 py-2 rounded-lg font-bold text-white transition duration-300 hover:shadow-lg transform hover:scale-105'
  style={{ backgroundColor: '#084a3c' }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a5e4f'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#084a3c'}
>
  Donate
</Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consultationform  */}
      <ConsultationForm />
    </>
  );
};

export default Home;
