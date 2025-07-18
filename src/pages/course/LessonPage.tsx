import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  FileText, 
  Download, 
  Clock, 
  CheckCircle2, 
  Circle,
  Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { CourseService } from '@/services/courseService';
import type { Course, Lesson } from '@/types';

const LessonPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const loadLessonData = useCallback(async () => {
    if (!courseId || !lessonId) return;
    
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
        const lesson = lessonsResponse.data.find(l => l.id === lessonId);
        if (lesson) {
          setCurrentLesson(lesson);
        }
      }
    } catch (error) {
      console.error('Failed to load lesson data:', error);
      toast.error('Failed to load lesson');
    } finally {
      setIsLoading(false);
    }
  }, [courseId, lessonId]);

  useEffect(() => {
    if (courseId && lessonId) {
      loadLessonData();
    }
  }, [courseId, lessonId, loadLessonData]);

  const handleLessonComplete = async () => {
    if (!currentLesson) return;
    
    try {
      // Mark lesson as completed
      await CourseService.markLessonComplete(currentLesson.id);
      
      // Update local state
      setLessons(prev => prev.map(lesson => 
        lesson.id === currentLesson.id 
          ? { ...lesson, completed: true }
          : lesson
      ));
      
      toast.success('Lesson completed!');
      
      // Auto-navigate to next lesson
      const nextLesson = getNextLesson();
      if (nextLesson) {
        navigate(`/app/courses/${courseId}/lessons/${nextLesson.id}`);
      }
    } catch (error) {
      console.error('Failed to mark lesson as completed:', error);
      toast.error('Failed to mark lesson as completed');
    }
  };

  const getNextLesson = () => {
    if (!currentLesson) return null;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  };

  const getPreviousLesson = () => {
    if (!currentLesson) return null;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    return currentIndex > 0 ? lessons[currentIndex - 1] : null;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!currentLesson || !course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
        <p className="text-gray-600 mb-6">The lesson you're looking for doesn't exist.</p>
        <Link 
          to={`/app/courses/${courseId}`}
          className="btn-primary"
        >
          Back to Course
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${showSidebar ? 'mr-80' : ''}`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to={`/app/courses/${courseId}`}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Course
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">
                {currentLesson.title}
              </h1>
            </div>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="btn-outline"
            >
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video/Content Player */}
        <div className="flex-1 bg-black">
          {currentLesson.type === 'video' ? (
            <div className="relative h-full flex items-center justify-center">
              {/* Video Player Placeholder */}
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white bg-opacity-10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    {isVideoPlaying ? (
                      <Pause className="w-10 h-10 text-white" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-1" />
                    )}
                  </div>
                  <p className="text-white text-lg mb-2">Video Player</p>
                  <p className="text-gray-300 text-sm">
                    {currentLesson.videoUrl ? 'Video content would load here' : 'No video available'}
                  </p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="flex items-center space-x-2 hover:text-primary-300"
                  >
                    {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    <span>{isVideoPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  <div className="flex items-center space-x-4">
                    <Volume2 className="w-5 h-5" />
                    <Maximize className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-white p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                {currentLesson.type === 'text' ? (
                  <div className="prose prose-lg max-w-none">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                      {currentLesson.title}
                    </h1>
                    <div className="text-gray-700 leading-relaxed">
                      {currentLesson.content || 'No content available for this lesson.'}
                    </div>
                  </div>
                ) : currentLesson.type === 'pdf' ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">PDF Document</h2>
                    <p className="text-gray-600 mb-6">
                      {currentLesson.pdfUrl ? 'PDF viewer would be embedded here' : 'No PDF available'}
                    </p>
                    {currentLesson.pdfUrl && (
                      <button className="btn-primary">
                        <Download className="w-5 h-5 mr-2" />
                        Download PDF
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getPreviousLesson() && (
                <Link
                  to={`/app/courses/${courseId}/lessons/${getPreviousLesson()!.id}`}
                  className="btn-outline"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </Link>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {!currentLesson.completed && (
                <button
                  onClick={handleLessonComplete}
                  className="btn-primary"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Mark as Complete
                </button>
              )}
              
              {getNextLesson() && (
                <Link
                  to={`/app/courses/${courseId}/lessons/${getNextLesson()!.id}`}
                  className="btn-primary"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Course Content</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{course.title}</p>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  to={`/app/courses/${courseId}/lessons/${lesson.id}`}
                  className={`block p-3 rounded-lg transition-colors ${
                    lesson.id === currentLesson.id
                      ? 'bg-primary-50 border border-primary-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {index + 1}. {lesson.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {lesson.type === 'video' ? 'Video' : 
                           lesson.type === 'pdf' ? 'PDF' : 'Text'}
                        </span>
                        {lesson.duration && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDuration(lesson.duration)}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPage;