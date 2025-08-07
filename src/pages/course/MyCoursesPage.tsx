import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CourseService } from '@/services/courseService';
import type { Course } from '@/types';


const categories = ['All', 'Web Development', 'Digital Marketing', 'Brand Experience Design', 'User Experience Design (UX)', 'Motion Design', 'Merch Design'];
const sortOptions = ['Most Popular', 'Newest', 'Price: Low to High', 'Price: High to Low'];

const MyCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const coursesPerPage = 9;

  useEffect(() => {
    const fetchMyCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await CourseService.getEnrolledCourses();
        setCourses(response.data);
      } catch {
        setError('Failed to load your courses.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

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
    const progress = course.progress || 0; // Assuming a progress field, default to 0 if undefined

    return (
      <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <img
          src={thumbnail}
          alt={course.title + ' thumbnail'}
          className="w-full h-40 sm:h-48 object-cover object-center bg-gray-200"
        />
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
            <span className="text-xs text-gray-500 truncate">{course.category}</span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-2">{course.description}</p>
          {/* Progress Bar */}
          <div className="mb-3 sm:mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
            <img
              src={instructorAvatar}
              alt={instructorName + ' avatar'}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-300 flex-shrink-0"
            />
            <span className="text-xs sm:text-sm text-gray-700 font-medium truncate">{instructorName}</span>
            <span className="text-xs text-gray-500 flex-shrink-0">{formatDuration(duration)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-xl font-bold text-purple-600">
              {formatPrice(price)}
            </div>
            <Link 
              to={`/app/courses/${course.id}`} 
              className="text-xs sm:text-sm text-purple-600 font-medium hover:underline px-2 py-1 rounded transition-colors hover:bg-purple-50"
            >
              Go to Course
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderPlaceholderCard = (index: number) => (
    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="w-full h-40 sm:h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gray-200 h-5 sm:h-6 w-16 rounded-full animate-pulse"></div>
          <div className="bg-gray-200 h-3 sm:h-4 w-20 rounded animate-pulse"></div>
        </div>
        <div className="bg-gray-200 h-5 sm:h-6 w-3/4 rounded mb-2 animate-pulse"></div>
        <div className="bg-gray-200 h-4 w-full rounded mb-3 sm:mb-4 animate-pulse"></div>
        <div className="mb-3 sm:mb-4">
          <div className="flex justify-between text-xs text-gray-200 mb-1">
            <span>Progress</span>
            <span>0%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gray-300 h-2 rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="bg-gray-200 h-5 sm:h-6 w-16 rounded animate-pulse"></div>
          <div className="bg-gray-200 h-6 sm:h-8 w-20 sm:w-24 rounded animate-pulse"></div>
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
      
      {/* Search and Filters */}
      <section className="py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between mb-4 sm:hidden">
            <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg text-gray-700"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Desktop Filters */}
          <div className="hidden sm:block">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Sort Dropdown */}
                <div className="flex-shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full lg:w-auto px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search my courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder-gray-500"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              {/* Category Filters */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showMobileFilters && (
            <div className="sm:hidden bg-white rounded-lg shadow-lg mb-4 border border-gray-200">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Sort */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile Search */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search my courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-10 pl-4 py-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                {/* Mobile Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowMobileFilters(false);
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-4 sm:py-6 lg:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          {!isLoading && (
            <div className="mb-4 sm:mb-6">
              <p className="text-sm text-gray-600">
                Showing {currentCourses.length} of {filteredCourses.length} courses
                {selectedCategory !== 'All' && (
                  <span className="ml-1">in {selectedCategory}</span>
                )}
              </p>
            </div>
          )}

<div className="mt-8">
  {(isLoading || error || courses.length === 0) ? (
    // Show placeholders if loading, error, or backend returns no data
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => renderPlaceholderCard(index))}
    </div>
  ) : currentCourses.length > 0 ? (
    // Show actual courses if available
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {currentCourses.map(course => renderCourseCard(course))}
    </div>
  ) : (
    // Show "No Courses found" only if user filtered/search and no results
    <div className="flex flex-col items-center justify-center py-20">
      <img
        src={noCoursesImg}
        alt="No courses found"
        className="w-44 h-44 mb-6"
      />
      <h2 className="text-2xl font-bold font-['Poppins'] text-gray-900 mb-2">No Courses found</h2>
      <p className="text-gray-500 text-base mb-2">Try adjusting your search or filter criteria.</p>
    </div>
  )}
</div>

          {/* Pagination */}
          {!isLoading && filteredCourses.length > 0 && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              {/* Mobile Pagination */}
              <div className="flex items-center gap-2 sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors text-sm"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm text-gray-600">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors text-sm"
                >
                  Next
                </button>
              </div>

              {/* Desktop Pagination */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === pageNum 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Error</h3>
              <button 
                onClick={() => setError(null)} 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">{error}</p>
            <button
              onClick={() => setError(null)}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default MyCoursesPage;	