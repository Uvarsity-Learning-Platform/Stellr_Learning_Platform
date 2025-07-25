import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  Award, 
  CircleCheck, 
  Lock,
  Download,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { CourseService } from '@/services/courseService';
import type { Course, Lesson } from '@/types';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const loadCourseData = useCallback(async () => {
    if (!courseId) return;
    
    setIsLoading(true);
    try {
      const [courseResponse, lessonsResponse] = await Promise.all([
        CourseService.getCourse(courseId),
        CourseService.getCourseLessons(courseId)
      ]);

      if (courseResponse.success) {
        setCourse(courseResponse.data);
      }
      if (lessonsResponse.success) {
        setLessons(lessonsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load course data:', error);
      toast.error('Failed to load course details');
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      loadCourseData();
    }
  }, [courseId, loadCourseData]);

  const handleEnroll = async () => {
    if (!courseId) return;
    
    setIsEnrolling(true);
    try {
      await CourseService.enrollCourse(courseId);
      toast.success('Successfully enrolled in course!');
      // Reload course data to update enrollment status
      loadCourseData();
    } catch (error) {
      console.error('Enrollment failed:', error);
      toast.error('Failed to enroll in course');
    } finally {
      setIsEnrolling(false);
    }
  };

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
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="animate-spin text-primary-600" size={48} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Course not found</h3>
        <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
        <Link to="/app/courses" className="btn-primary">
          <ArrowLeft className="mr-2" size={16} />
          Back to Courses
        </Link>
      </div>
    );
  }

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercent = lessons.length > 0 ? Math.round((completedLessons / lessons.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <Link to="/app/courses" className="hover:text-gray-700">Courses</Link>
        <span>/</span>
        <span className="text-gray-900">{course.title}</span>
      </nav>

      {/* Course Header */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-start gap-4 mb-6">
              <img
                src={course.thumbnail || course.thumbnailUrl}
                alt={course.title}
                className="w-32 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty || course.level || 'Beginner')}`}>
                    {course.difficulty || course.level || 'Beginner'}
                  </span>
                  <span className="text-sm text-gray-500">{course.category}</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{formatDuration(course.duration ?? 0)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={16} />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>2.1k students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span>4.8 rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <img
                src={typeof course.instructor === 'object' && course.instructor?.avatar ? course.instructor.avatar : '/default-avatar.png'}
                alt={typeof course.instructor === 'object' && course.instructor?.name ? course.instructor.name : 'Instructor'}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{typeof course.instructor === 'object' && course.instructor?.name ? course.instructor.name : 'Instructor'}</p>
                <p className="text-sm text-gray-600">Course Instructor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Card */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-6">
            {course.enrolled ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{progressPercent}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    {completedLessons} of {lessons.length} lessons completed
                  </p>
                  {progressPercent === 100 && (
                    <div className="flex items-center gap-2 text-green-600">
                      <Award size={16} />
                      <span className="text-sm font-medium">Course Completed!</span>
                    </div>
                  )}
                </div>

                <Link 
                  to={`/app/courses/${courseId}/lessons/${lessons[0]?.id}`}
                  className="w-full btn-primary text-center block"
                >
                  <Play className="mr-2 inline" size={16} />
                  {progressPercent > 0 ? 'Continue Learning' : 'Start Course'}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 mb-2">Free</p>
                  <p className="text-sm text-gray-600">Get full access to this course</p>
                </div>
                
                <button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  {isEnrolling ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2" size={16} />
                      Enroll Now
                    </>
                  )}
                </button>
                
                <div className="text-xs text-gray-500 text-center">
                  Free enrollment • Lifetime access
                </div>
              </div>
            )}

            {/* Course Features */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">This course includes:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Play size={16} className="text-green-500" />
                  {course.lessonsCount} video lessons
                </li>
                <li className="flex items-center gap-2">
                  <Download size={16} className="text-green-500" />
                  Downloadable resources
                </li>
                <li className="flex items-center gap-2">
                  <Award size={16} className="text-green-500" />
                  Certificate of completion
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={16} className="text-green-500" />
                  Lifetime access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Course Content</h2>
        <p className="text-gray-600 mb-6">
          {lessons.length} lessons • {formatDuration(course.duration ?? 0)} total length
        </p>

        <div className="space-y-2">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                  {lesson.completed ? (
                    <CircleCheck className="text-green-500" size={16} />
                  ) : course.enrolled ? (
                    <span className="text-gray-600">{index + 1}</span>
                  ) : (
                    <Lock className="text-gray-400" size={16} />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">{lesson.description}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {lesson.type === 'video' && lesson.duration && (
                    <div className="flex items-center gap-1">
                      <Play size={14} />
                      <span>{lesson.duration}m</span>
                    </div>
                  )}
                  {lesson.type === 'pdf' && (
                    <div className="flex items-center gap-1">
                      <Download size={14} />
                      <span>PDF</span>
                    </div>
                  )}
                </div>
              </div>

              {course.enrolled && (
                <Link
                  to={`/app/courses/${courseId}/lessons/${lesson.id}`}
                  className="btn-primary text-sm"
                >
                  {lesson.completed ? 'Review' : 'Start'}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;