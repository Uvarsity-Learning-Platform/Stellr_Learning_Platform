import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CourseService } from '../../services/courseService'
import type { Course } from '../../types/course';


const categories = ['All', 'Web Development', 'Digital Marketing', 'Brand Experience Design', 'User Experience Design (UX)', 'Motion Design', 'Merch Design'];
const sortOptions = ['Most Popular', 'Newest', 'Price: Low to High', 'Price: High to Low'];

const CourseCatalogPage: React.FC = () => {
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
    if (price === undefined || price === 0) return 'GHS 0.00';
    return `GHS ${price.toFixed(2)}`;
  };

  const renderCourseCard = (course: Course) => {
    const difficulty = course.difficulty || course.level || 'Beginner';
    const thumbnail = course.thumbnail || course.thumbnailUrl || '/api/placeholder/400/300';
    const instructorName = typeof course.instructor === 'string' ? course.instructor : course.instructor?.name || 'Unknown';
    const instructorAvatar = typeof course.instructor === 'object' ? course.instructor.avatar : '/api/placeholder/40/40';
    const price = (course as { price?: number }).price ?? 50;
    const duration = course.duration || course.totalDuration || 0;
    const lessonsCount = (course as any).lessonsCount ?? 20;
    const weeks = (course as any).weeks ?? 8;

    return (
      <div key={course.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-150">
        <div className="relative">
          <img
            src={thumbnail}
            alt={course.title + ' thumbnail'}
            className="w-full h-44 sm:h-48 object-cover object-center bg-gray-200"
          />
          {/* green pill in top-left */}
          <div className="absolute left-3 top-3 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full"></span>
            <span>{weeks} weeks</span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
            <span className="text-xs text-gray-500 truncate">{course.category}</span>
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>

          <p className="text-gray-500 text-xs mb-3 line-clamp-2">{course.description}</p>

          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={instructorAvatar}
                alt={instructorName + ' avatar'}
                className="w-7 h-7 rounded-full object-cover border border-gray-200"
              />
              <div>
                <div className="text-xs font-medium text-gray-700 truncate">{instructorName}</div>
                <div className="text-xs text-gray-400">{lessonsCount} lessons • {formatDuration(duration)}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-bold text-purple-600">{formatPrice(price)}</div>
              <div className="text-xs text-gray-400">per course</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to={`/app/courses/${course.id}`}
              className="text-xs sm:text-sm text-purple-600 font-medium hover:underline px-2 py-1 rounded transition-colors hover:bg-purple-50"
            >
              View Course
            </Link>

            <button className="text-xs sm:text-sm bg-white border border-gray-200 text-purple-600 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPlaceholderCard = (index: number) => (
    <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="w-full h-44 sm:h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gray-200 h-5 sm:h-6 w-16 rounded-full animate-pulse"></div>
          <div className="bg-gray-200 h-3 sm:h-4 w-20 rounded animate-pulse"></div>
        </div>
        <div className="bg-gray-200 h-5 sm:h-6 w-3/4 rounded mb-2 animate-pulse"></div>
        <div className="bg-gray-200 h-4 w-full rounded mb-3 sm:mb-4 animate-pulse"></div>
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
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Course Catalog</h1>
            <p className="text-sm text-gray-500 mt-1">Explore an array of courses and start your journey now</p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search Certificate.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-full bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500 text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters & chips */}
      <section className="py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {isLoading || error ? (
              Array.from({ length: 9 }).map((_, index) => renderPlaceholderCard(index))
            ) : currentCourses.length > 0 ? (
              currentCourses.map(course => renderCourseCard(course))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="max-w-md mx-auto">
                  <p className="text-gray-500 text-lg mb-2">No courses found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your filters or search terms</p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && filteredCourses.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
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
                      className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                        currentPage === pageNum 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Next
              </button>
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

export default CourseCatalogPage;