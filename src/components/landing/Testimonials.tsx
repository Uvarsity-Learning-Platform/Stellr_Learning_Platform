import React, { useState, useRef, useEffect } from 'react';
import testimonials from '@/assets/testimonials';

const TestimonialsCarousel: React.FC = () => {
  const slideCount = testimonials.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchMove, setTouchMove] = useState<number | null>(null);

  // Measure slide width and track width
  useEffect(() => {
    const measure = () => {
      if (trackRef.current && containerRef.current) {
        const firstSlide = trackRef.current.children[0] as HTMLElement;
        if (firstSlide) {
          const slideRect = firstSlide.getBoundingClientRect();
          const gap = parseFloat(getComputedStyle(trackRef.current).gap || '0');
          setSlideSize(slideRect.width + gap);
        }
        setTrackWidth(containerRef.current.parentElement?.clientWidth || 0);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Navigation handlers
  const nextSlide = () => setCurrentIndex((prev) => Math.min(prev + 1, slideCount - 1));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const goToSlide = (idx: number) => setCurrentIndex(idx);

  // Calculate transform with centering offset
  const calculateTransform = () => {
    if (!slideSize || !trackWidth) return 'translateX(0)';
    const offset = (trackWidth - slideSize) / 2;
    return `translateX(calc(${offset}px - ${currentIndex * slideSize}px))`;
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart !== null && touchMove !== null) {
      const diff = touchStart - touchMove;
      if (diff > 50) nextSlide(); // Swipe left
      else if (diff < -50) prevSlide(); // Swipe right
    }
    setTouchStart(null);
    setTouchMove(null);
  };

  return (
    <section className="py-16 bg-[#01F99E] relative overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black">Success Stories & Testimonials</h2>
      </div>
      
      <div className="relative h-[500px]">
        <div className="flex items-center justify-center h-full" 
             ref={containerRef}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}>
          <div
            ref={trackRef}
            className="flex items-center gap-8"
            style={{
              transform: calculateTransform(),
              transition: 'transform 0.7s cubic-bezier(0.33, 1, 0.68, 1)',
            }}
          >
            {testimonials.map((testimonial, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={idx}
                  className={`flex-shrink-0 cursor-pointer transition-all duration-500 ease-in-out ${
                    isActive ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    width: isActive ? '919px' : '700px',
                    height: '455px',
                    opacity: isActive ? 1 : 0.6,
                    transform: isActive ? 'scale(1)' : 'scale(0.92)',
                    boxShadow: isActive
                      ? '0 20px 40px rgba(0,0,0,0.15)'
                      : '0 8px 16px rgba(0,0,0,0.08)',
                  }}
                  onClick={() => goToSlide(idx)}
                >
                  <div className="bg-white flex overflow-hidden h-full rounded-xl border border-gray-300">
                    <div className="flex-1 flex flex-col justify-between p-12">
                      <h3 className="text-2xl font-bold text-black mb-6 tracking-wide">
                        {testimonial.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {testimonial.content}
                      </p>
                      <div className="mt-8">
                        <h4 className="text-xl font-bold text-black">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.location}</p>
                      </div>
                    </div>
                    <div
                      className="bg-gray-200 overflow-hidden"
                      style={{
                        width: isActive ? '320px' : '280px',
                        height: '100%',
                        borderRadius: '0 16px 16px 0',
                      }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover transition-opacity duration-300"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-3 mt-12">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'bg-green-600 scale-125'
                : 'bg-gray-400 hover:bg-gray-500 hover:scale-110'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-300 ease-in-out hover:scale-110 z-10"
        aria-label="Previous testimonial"
        disabled={currentIndex === 0}
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-300 ease-in-out hover:scale-110 z-10"
        aria-label="Next testimonial"
        disabled={currentIndex === slideCount - 1}
      >
        →
      </button>
    </section>
  );
};

export default TestimonialsCarousel;