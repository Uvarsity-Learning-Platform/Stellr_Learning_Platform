import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, TrendingUp, Plus, ArrowRight, Palette, Code, Smartphone, Video, Shirt, BarChart3 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import graduationHatImage from '../../assets/graduation-hat.png';
import UXimage from '../../assets/UX.png'; 
import CSSimage from '../../assets/CSS.png';
import webDevImage from '../../assets/WebDev.png';
import Webdevelopment from '../../assets/web.png';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Keep track of your enrolled courses, check your progress, and pick up right where you left off.</p>
          </div>
        </div>

        {/* Welcome Section with Gradient Background */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 rounded-2xl p-6 sm:p-8 text-white overflow-hidden">
            {/* Decorative elements - adjusted for mobile */}
            <div className="hidden sm:block absolute top-4 right-8 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="hidden sm:block absolute bottom-4 right-16 w-20 h-20 bg-white/20 rounded-full"></div>
            <div className="hidden sm:block absolute top-1/2 right-4 w-24 h-16 bg-yellow-400/30 rounded-lg transform rotate-12"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Welcome Back, Stellr</h2>
              <p className="text-white/90 mb-6 max-w-lg text-sm sm:text-base">
                Keep your learning journey going. Watch just one step
                closer to your goals.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Explore New Courses
              </button>
            </div>
          </div>
          
          {/* Graduation Hat Image */}
          
          <div className="absolute top-[110px] lg:top-[-88px] right-2 z-30 mb-20 sm:mb-24">
            <img 
              className="w-24 sm:w-32 md:w-40 lg:w-[442px] h-24 sm:h-32 md:h-40 lg:h-[448px] object-contain" 
              src={graduationHatImage} 
              alt="Graduation Hat" 
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="text-blue-600" size={16} />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Enrolled courses</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Award className="text-blue-600" size={16} />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="text-purple-600" size={16} />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Hours Learned</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">18.5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={16} />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Streaks</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Continue Learning</h2>
            <Link to="/app/courses" className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm font-medium flex items-center">
              View All <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={UXimage}
                alt="UX Design"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 w-full">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">UX Fundamentals</h3>
              <p className="text-xs sm:text-sm text-gray-600">Lesson 1 • What is UX?</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2 sm:mt-3">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">90% complete</p>
            </div>
            <button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm">
              Continue Learning
            </button>
          </div>
        </div>

        {/* Your Courses Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Your Courses</h2>
            <Link to="/app/courses" className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm font-medium">
              Enroll Now →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* UX Fundamentals */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-28 sm:h-32 relative">
                <img 
                  src={UXimage}
                  alt="UX Design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">UX Fundamentals</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">12 lessons</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Beginner</span>
                  <span className="text-gray-500">70% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>

            {/* Styling the Web */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-28 sm:h-32 relative">
                <img 
                  src={CSSimage}
                  alt="CSS Development"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Styling the Web: Introduction to CSS</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">8 lessons</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Beginner</span>
                  <span className="text-gray-500">80% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* Web Basics */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-28 sm:h-32 relative">
                <img 
                  src={Webdevelopment}
                  alt="Web Development"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Web Basics: From Zero to Hosted Website</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">16 lessons</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Beginner</span>
                  <span className="text-gray-500">24 lessons</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>

            {/* Building Blocks */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-28 sm:h-32 relative">
                <img 
                  src={webDevImage}
                  alt="HTML Development"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Building Blocks of the Web: Structure with HTML5</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">24 lessons</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Beginner</span>
                  <span className="text-gray-500">24 lessons</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You might be interested In */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">You might be interested In</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Interest Cards */}
            <div className="flex items-center justify-between p-4 border-2 border-green-200 rounded-xl bg-green-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Palette className="text-black" size={16} />
                </div>
                <span className="font-medium text-gray-900">UX Design</span>
              </div>
              <Plus size={20} className="text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-green-200 rounded-xl bg-green-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Code className="text-black" size={16} />
                </div>
                <span className="font-medium text-gray-900">Web Development</span>
              </div>
              <Plus size={20} className="text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-green-200 rounded-xl bg-green-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Smartphone className="text-black" size={16} />
                </div>
                <span className="font-medium text-gray-900">Brand Experience</span>
              </div>
              <Plus size={20} className="text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-green-200 rounded-xl bg-green-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Video className="text-black" size={16} />
                </div>
                <span className="font-medium text-gray-900">Motion Design</span>
              </div>
              <Plus size={20} className="text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-green-200 rounded-xl bg-green-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Shirt className="text-black" size={16} />
                </div>
                <span className="font-medium text-gray-900">Merch Design</span>
              </div>
              <Plus size={20} className="text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-green-200 rounded-xl bg-green-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-black" size={16} />
                </div>
                <span className="font-medium text-gray-900">Marketing</span>
              </div>
              <Plus size={20} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;