import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X, CheckCircle, Star } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [courses] = useState<unknown[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  // Placeholder for when courses will be fetched from backend
  // For now, we'll show gray placeholders as requested
  const coursePlaceholders = Array(6).fill(null).map((_, index) => ({
    id: index + 1,
    isPlaceholder: true
  }));

  // This useEffect simulates where courses would be fetched from backend
  // For now, it keeps courses empty to show placeholders
  useEffect(() => {
    // TODO: Replace with actual API call when backend is ready
    // const fetchCourses = async () => {
    //   try {
    //     const response = await fetch('/api/courses');
    //     const coursesData = await response.json();
    //     setCourses(coursesData);
    //     setIsLoadingCourses(false);
    //   } catch (error) {
    //     console.error('Error fetching courses:', error);
    //     setIsLoadingCourses(false);
    //   }
    // };
    // fetchCourses();
    
    // For now, we'll keep courses empty to show placeholders
    setTimeout(() => {
      setIsLoadingCourses(false);
    }, 1000); // Simulate loading delay
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "UX Designer",
      company: "Tech Corp",
      content: "The UX design course transformed my career. The instructors were amazing and the practical projects helped me build a strong portfolio.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      role: "Frontend Developer",
      company: "StartupXYZ",
      content: "Outstanding content and support. I went from beginner to landing my dream job in just 6 months. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Digital Marketer",
      company: "Growth Agency",
      content: "The digital marketing course was exactly what I needed. Real-world projects and expert mentorship made all the difference.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  uvarsity
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link to="/courses" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Courses
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Contact
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-4 py-2 border border-gray-300 rounded-lg">
                Log in
              </Link>
              <Link to="/auth/register" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                Get Started
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="bg-white h-full w-full">
              <div className="flex justify-between items-center h-16 px-4 border-b border-gray-200">
                <Link to="/" className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">U</span>
                  </div>
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    uvarsity
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col h-full">
                <div className="flex-1 px-4 py-8">
                  <div className="flex flex-col space-y-6">
                    <Link to="/" className="text-gray-900 font-medium text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>
                      Home
                    </Link>
                    <Link to="/courses" className="text-gray-900 font-medium text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>
                      Courses
                    </Link>
                    <Link to="/about" className="text-gray-900 font-medium text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>
                      About
                    </Link>
                    <Link to="/contact" className="text-gray-900 font-medium text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>
                      Contact
                    </Link>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <Link to="/auth/login" className="text-gray-900 font-medium text-lg py-2 block mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                      Log in
                    </Link>
                    <Link to="/auth/register" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center text-lg py-3 block rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Empower your future today
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-xl">
                Accelerate, affordable, and hybrid learning for Africa's next-tech talents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all inline-flex items-center justify-center">
                  Explore Courses
                </Link>
                <Link to="/about" className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-all inline-flex items-center justify-center">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=600&fit=crop&crop=face" alt="Happy student" className="rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                    <span className="text-gray-900 font-medium">Certificate Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" alt="Students learning together" className="rounded-2xl shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What Makes Us Different
              </h2>
              <p className="text-gray-600 mb-8">
                We combine cutting-edge technology with expert instruction to create an unparalleled learning experience that prepares you for real-world success.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="text-gray-700">Transformational Power of Technology</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="text-gray-700">Mentoring and Resources</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="text-gray-700">Internship & Job Pipeline</span>
                </div>
              </div>
              <button className="mt-8 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all">
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kickstart Your Digital Career In Just 6 Weeks
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingCourses || courses.length === 0 ? (
              // Show gray placeholders while loading or when no courses available
              coursePlaceholders.map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-gray-400 h-6 w-32 rounded mb-2 animate-pulse"></div>
                      <div className="bg-gray-400 h-4 w-20 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // TODO: Show actual courses when available from backend
              <div className="text-center text-gray-500 py-8">
                <p>No courses available at the moment.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all inline-flex items-center">
              View All Courses
              <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Community Support */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-blue-50 inline-block px-4 py-2 rounded-full mb-4">
                <span className="text-blue-600 font-medium text-sm">COMMUNITY SUPPORT</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Grow With Support, Not Alone
              </h2>
              <p className="text-gray-600 mb-8">
                Join our vibrant community of learners and get personalized support from peers and expert instructors throughout your learning journey.
              </p>
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all">
                Read More
              </button>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop" alt="Community support" className="rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* From Learning to Earning */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="People working together" className="rounded-2xl shadow-lg" />
            </div>
            <div>
              <div className="bg-green-50 inline-block px-4 py-2 rounded-full mb-4">
                <span className="text-green-600 font-medium text-sm">INTERNSHIP & JOB PIPELINE</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                From Learning to Earning
              </h2>
              <p className="text-gray-600 mb-8">
                Our comprehensive career support helps you transition from learning to earning with internship opportunities, job placement assistance, and ongoing career guidance.
              </p>
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all">
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories & Testimonials
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become A Tutor */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Become A Tutor
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our experienced tutors and share your knowledge with ambitious learners. Help shape the next generation of tech professionals while earning a great income.
          </p>
          <Link to="/become-tutor" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center">
            Become A Tutor
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <span className="ml-2 text-xl font-bold">uvarsity</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Africa's Leading Online Learning Platform. Empowering the next generation of tech talents.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
                  <span className="text-xs">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Navigation Links</h3>
              <div className="space-y-2 text-sm">
                <Link to="/" className="text-gray-400 hover:text-white block">Home</Link>
                <Link to="/courses" className="text-gray-400 hover:text-white block">Courses</Link>
                <Link to="/about" className="text-gray-400 hover:text-white block">About Us</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white block">Contact</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Courses</h3>
              <div className="space-y-2 text-sm">
                <Link to="/courses/web-development" className="text-gray-400 hover:text-white block">Web Development</Link>
                <Link to="/courses/mobile-development" className="text-gray-400 hover:text-white block">Mobile Development</Link>
                <Link to="/courses/ux-design" className="text-gray-400 hover:text-white block">UX Design</Link>
                <Link to="/courses/digital-marketing" className="text-gray-400 hover:text-white block">Digital Marketing</Link>
                <Link to="/courses/motion-design" className="text-gray-400 hover:text-white block">Motion Design</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>123 Tech Street</p>
                <p>Accra, Ghana</p>
                <p>+233 123 456 789</p>
                <p>info@uvarsity.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 uvarsity. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;