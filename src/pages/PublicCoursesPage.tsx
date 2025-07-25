import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { CourseService } from '@/services/courseService';
import type { Course } from '@/types';

// Ensure Course type includes totalDuration
// If not present in src/types/index.ts, add:
// export interface Course { ... totalDuration?: number; ... }
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import courseImage from "@/assets/courses.png"

const categories = ['All', 'Web Development', 'Digital Marketing', 'Brand Experience Design', 'User Experience Design (UX)', 'Motion Design', 'Merch Design'];
const sortOptions = ['Most Popular', 'Newest', 'Price: Low to High', 'Price: High to Low'];

const PublicCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  useEffect(() => {
    const fetchCoursesWrapper = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await CourseService.getCourses(
          currentPage,
          coursesPerPage,
          selectedCategory !== 'All' ? selectedCategory : undefined,
          searchTerm || undefined
        );
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Network error. Please check your connection and try again.');
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoursesWrapper();
  }, [selectedCategory, searchTerm, currentPage]);

  // Filter by category
  let filteredCourses = courses;
  if (selectedCategory !== 'All') {
    filteredCourses = filteredCourses.filter(course => course.category === selectedCategory);
  }

  // Filter by search term
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.description?.toLowerCase().includes(term) ||
      course.category?.toLowerCase().includes(term)
    );
  }

  // Sort
  if (sortBy === 'Most Popular') {
    filteredCourses = [...filteredCourses].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  } else if (sortBy === 'Newest') {
    filteredCourses = [...filteredCourses].sort((a, b) => {
      const dateA = new Date(a.createdAt ?? a.dateCreated ?? 0).getTime();
      const dateB = new Date(b.createdAt ?? b.dateCreated ?? 0).getTime();
      return dateB - dateA;
    });
  } else if (sortBy === 'Price: Low to High') {
    filteredCourses = [...filteredCourses].sort((a, b) => ((a.price ?? 0) - (b.price ?? 0)));
  } else if (sortBy === 'Price: High to Low') {
    filteredCourses = [...filteredCourses].sort((a, b) => ((b.price ?? 0) - (a.price ?? 0)));
  }

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
    const duration = course.duration || course.totalDuration || 0;

    return (
      <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Use thumbnail */}
        <img
          src={thumbnail}
          alt={course.title + ' thumbnail'}
          className="w-full h-48 object-cover object-center bg-gray-200"
        />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
            <span className="text-xs text-gray-500">{course.category}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
          {/* Instructor info and duration */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={instructorAvatar}
              alt={instructorName + ' avatar'}
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
            <span className="text-sm text-gray-700 font-medium">{instructorName}</span>
            <span className="text-xs text-gray-500">{formatDuration(duration)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-purple-600">
              {formatPrice(price)}
            </div>
            <Link to="/auth/register" className="text-sm text-purple-600 font-medium hover:underline">
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderPlaceholderCard = (index: number) => (
    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gray-200 h-6 w-16 rounded-full animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
        </div>
        <div className="bg-gray-200 h-6 w-3/4 rounded mb-2 animate-pulse"></div>
        <div className="bg-gray-200 h-4 w-full rounded mb-4 animate-pulse"></div>
        <div className="flex items-center justify-between">
          <div className="bg-gray-200 h-6 w-16 rounded animate-pulse"></div>
          <div className="bg-gray-200 h-8 w-24 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
          <section className="relative p-32  overflow-hidden">
  {/* Background Image */}
  <img
    src={courseImage}
    alt="Courses background"
    className="absolute inset-0 w-full h-full object-cover object-center max-h-[420px]"
    style={{ top: 0, left: 0, right: 0, bottom: 0, margin: 'auto' }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

  {/* Text Content */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4 sm:px-6 lg:px-8">
   <h1 className="text-4xl md:text-5xl font-bold mb-4">Courses</h1>
   <p className="text-lg md:text-xl max-w-2xl">
    Learn job-ready design and tech skills—online, offline, and with real mentorship.
   </p>
  </div>

  {/* Decorative Elements */}
  <div className="absolute top-10 left-10 w-8 h-8 bg-orange-400 rounded-full opacity-50 z-10"></div>
  <div className="absolute top-20 left-20 w-4 h-4 bg-white rounded z-10"></div>
  <div className="absolute top-40 right-20 w-6 h-6 bg-white rotate-45 z-10"></div>
  <div className="absolute bottom-10 right-10 w-6 h-6 bg-orange-400 rotate-45 opacity-50 z-10"></div>
</section>

      {/* Search and Filters */}
      <section className="py-8 
       text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-lg mb-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 flex flex-wrap items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mr-1 sm:mr-4 p-2 bg-gray-200 text-gray-900 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option} className="text-gray-600">{option}</option>
                ))}
              </select>
              <div className="relative flex-1 min-w-[180px]">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 bg-gray-200 text-gray-900 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-600"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
              </div>
              <div className="flex flex-wrap gap-2 ml-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`my-4 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {isLoading || error ? (
              Array.from({ length: 9 }).map((_, index) => renderPlaceholderCard(index))
            ) : currentCourses.length > 0 ? (
              currentCourses.map(course => renderCourseCard(course))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No courses found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && filteredCourses.length > 0 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-purple-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Error Popup */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Error</h3>
              <button onClick={() => setError(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => setError(null)}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PublicCoursesPage;