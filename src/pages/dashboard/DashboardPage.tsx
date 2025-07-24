import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, TrendingUp } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-primary-100">
          Ready to continue your learning journey? Let's pick up where you left off.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-primary-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Certificates</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hours Learned</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-gray-900">7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=80&fit=crop" 
                  alt="React Course"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">React for Beginners</h3>
                  <p className="text-sm text-gray-600">Lesson 3: React Components Basics</p>
                  <div className="progress-bar mt-2">
                    <div className="progress-fill" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">45% complete</p>
                </div>
                <Link to="/app/courses/1" className="btn-primary text-sm">
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                to="/app/courses" 
                className="block w-full btn-outline text-left"
              >
                Browse Courses
              </Link>
              <Link 
                to="/app/certificates" 
                className="block w-full btn-outline text-left"
              >
                View Certificates
              </Link>
              <Link 
                to="/app/settings" 
                className="block w-full btn-outline text-left"
              >
                Account Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;