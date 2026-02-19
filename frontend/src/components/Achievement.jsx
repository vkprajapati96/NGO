import React, { useState, useEffect, useRef } from 'react'
import { BookOpen, UtensilsCrossed, Stethoscope, Users } from 'lucide-react'

const Counter = ({ target, duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const increment = target / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target, duration, isVisible])

  return <span>{count.toLocaleString()}</span>
}

export default function Achievement() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const achievements = [
    { icon: <BookOpen size={48} />, title: "5000", description: "Children Educated", target: 5000 },
    { icon: <UtensilsCrossed size={48} />, title: "50000", description: "Meals Distributed", target: 50000 },
    { icon: <Stethoscope size={48} />, title: "1000", description: "Medical Camps", target: 1000 },
    { icon: <Users size={48} />, title: "500", description: "Active Volunteers", target: 500 }
  ]

  return (
    <div 
      ref={sectionRef}
      className='py-12 md:py-16' 
      style={{ backgroundColor: '#074a3c' }}
    >
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-center text-white mb-12'>
          Our Achievements
        </h2>
        
        <div className='grid md:grid-cols-4 gap-8'>
          {achievements.map((item, idx) => (
            <div key={idx} className='text-center p-8 rounded-lg' style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <div className='mb-4 flex justify-center' style={{ color: '#4ade80' }}>
                {item.icon}
              </div>
              <div className='text-4xl md:text-5xl font-bold text-emerald-300 mb-2'>
                {isVisible ? <Counter target={item.target} duration={2500} isVisible={isVisible} /> : '0'}
                +
              </div>
              <p className='text-emerald-100 text-lg'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}