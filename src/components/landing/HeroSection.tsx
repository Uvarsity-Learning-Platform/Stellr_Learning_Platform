import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroImages from '@/assets/heroImages';


const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className=" text-white md:py-36  px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroImages[current]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      <div className="absolute inset-0 "></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center lg:grid lg:grid-cols-2 gap-12">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Empower your future today</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">Accelerate, affordable, and hybrid learning for Africa's next-tech talents.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start py-6">
              <Link to="/courses" className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-all inline-flex items-center justify-center">Explore Courses <ArrowRight className="ml-2 w-5 h-5" /></Link>
              <Link to="/register" className="bg-primary-700 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:text-white hover:bg-from-primary-500 hover:bg-to-pink-500 transition-all inline-flex items-center justify-center">
                Register 
              </Link>
            </div>
          </div>
                  </div>
      </div>
    </section>
  );
};

export default HeroSection;
