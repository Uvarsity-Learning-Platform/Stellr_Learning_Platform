import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Star, BookOpen, Play, Users, Award } from 'lucide-react';
import { CourseService } from '@/services/courseService';
import type { Course } from '@/types';

const categories = ['All', 'Web Development', 'Design', 'Data Science', 'Business'];

const PublicCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesWrapper = async () => {
      setIsLoading(true);
      try {
        const response = await CourseService.getCourses(
          1, 
          50, 
          selectedCategory !== 'All' ? selectedCategory : undefined,
          searchTerm || undefined
        );
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoursesWrapper();
  }, [selectedCategory, searchTerm]);

  const featuredCourses = courses.filter(course => course.rating >= 4.7);
  const filteredCourses = courses;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Free';
    return `$${price.toFixed(2)}`;
  };

  const renderCourseCard = (course: Course) => {
    const difficulty = course.difficulty || course.level || 'Beginner';
    const thumbnail = course.thumbnail || course.thumbnailUrl || '/api/placeholder/400/300';
    const instructorName = typeof course.instructor === 'string' ? course.instructor : course.instructor?.name || 'Unknown';
    const instructorAvatar = typeof course.instructor === 'object' ? course.instructor.avatar : '/api/placeholder/40/40';
    const price = (course as { price?: number }).price || 0;
    
    return (
      <div key={course.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
            <span className="text-xs text-gray-500">{course.category}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>{course.lessonsCount || 0} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{course.studentsCount || 0}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img
                src={instructorAvatar}
                alt={instructorName}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-600">{instructorName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-current" size={16} />
              <span className="text-sm text-gray-600">{course.rating || 0}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary-600">
              {formatPrice(price)}
            </div>
            <Link
              to="/auth/register"
              className="btn-primary text-sm"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderPlaceholderCard = (index: number) => (
    <div key={index} className="card overflow-hidden">
      <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gray-200 h-4 w-16 rounded-full animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
        </div>
        <div className="bg-gray-200 h-6 w-3/4 rounded mb-2 animate-pulse"></div>
        <div className="bg-gray-200 h-4 w-full rounded mb-2 animate-pulse"></div>
        <div className="bg-gray-200 h-4 w-2/3 rounded mb-4 animate-pulse"></div>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-12 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 w-6 h-6 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
          </div>
          <div className="bg-gray-200 h-4 w-8 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="bg-gray-200 h-8 w-16 rounded animate-pulse"></div>
          <div className="bg-gray-200 h-8 w-20 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Uvarsity
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="/courses" className="text-primary-600 font-medium">
                Courses
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link
                to="/auth/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Discover Amazing <span className="text-primary-600">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose from hundreds of courses taught by industry experts. 
              Start learning today and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/register"
                className="btn-primary px-8 py-3 text-lg inline-flex items-center justify-center"
              >
                Start Learning Free
                <Play className="ml-2" size={20} />
              </Link>
              <button
                onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline px-8 py-3 text-lg"
              >
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">200+</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section id="courses-section" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Courses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Courses</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {isLoading ? (
                // Show placeholders while loading
                Array.from({ length: 3 }).map((_, index) => renderPlaceholderCard(index))
              ) : featuredCourses.length > 0 ? (
                featuredCourses.slice(0, 3).map(course => (
                  <div key={course.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={course.thumbnail || course.thumbnailUrl || '/api/placeholder/400/300'}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty || course.level || 'Beginner')}`}>
                          {course.difficulty || course.level || 'Beginner'}
                        </span>
                        <span className="text-xs text-gray-500">{course.category}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{formatDuration(course.duration)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen size={16} />
                          <span>{course.lessonsCount || 0} lessons</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={typeof course.instructor === 'object' ? course.instructor.avatar || '/api/placeholder/40/40' : '/api/placeholder/40/40'}
                            alt={typeof course.instructor === 'string' ? course.instructor : course.instructor?.name || 'Unknown'}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-600">{typeof course.instructor === 'string' ? course.instructor : course.instructor?.name || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-400 fill-current" size={16} />
                          <span className="text-sm text-gray-600">{course.rating || 0}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-primary-600">
                          {formatPrice((course as { price?: number }).price)}
                        </div>
                        <Link
                          to="/auth/register"
                          className="btn-primary text-sm"
                        >
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No featured courses available at the moment.</p>
                </div>
              )}
            </div>
          </div>

          {/* All Courses */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Courses</h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => renderPlaceholderCard(index))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => renderCourseCard(course))}
              </div>
            )}
          </div>

          {filteredCourses.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Uvarsity?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of learners who trust Uvarsity for their professional development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of real-world experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Recognized Certificates</h3>
              <p className="text-gray-600">
                Earn certificates that are recognized by top employers worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Support</h3>
              <p className="text-gray-600">
                Join a vibrant community of learners and get help when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already advancing their careers with Uvarsity.
          </p>
          <Link
            to="/auth/register"
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center"
          >
            Get Started Free
            <Play className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="ml-2 text-xl font-bold">
                Uvarsity
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering learners worldwide with quality education.
            </p>
            <div className="flex justify-center space-x-6 mb-4">
              <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              <Link to="/courses" className="text-gray-400 hover:text-white">Courses</Link>
              <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Uvarsity. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicCoursesPage;