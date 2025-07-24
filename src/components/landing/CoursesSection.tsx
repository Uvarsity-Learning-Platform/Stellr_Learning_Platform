import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CoursesSectionProps {
  isLoadingCourses: boolean;
  courses: unknown[];
  coursePlaceholders: { id: number; isPlaceholder: boolean }[];
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ isLoadingCourses, courses, coursePlaceholders }) => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-[486px] mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Kickstart Your Digital Career In Just 6 Weeks</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingCourses || courses.length === 0 ? (
          coursePlaceholders.map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gray-400 h-6 w-32 rounded mb-2 animate-pulse"></div>
                  <div className="bg-gray-400 h-4 w-20 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
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
);

export default CoursesSection;
