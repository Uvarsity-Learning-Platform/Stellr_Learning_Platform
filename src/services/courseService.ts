import { apiClient } from './apiClient';
import type { ApiResponse, Course, Lesson, PaginatedResponse } from '@/types';

export class CourseService {
  static async getCourses(page = 1, limit = 12, category?: string): Promise<PaginatedResponse<Course>> {
    // Mock implementation with sample courses
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCourses: Course[] = [
          {
            id: '1',
            title: 'React for Beginners',
            description: 'Learn the fundamentals of React including components, props, state, and hooks.',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
            category: 'Web Development',
            tags: ['React', 'JavaScript', 'Frontend'],
            difficulty: 'Beginner',
            duration: 240,
            lessonsCount: 12,
            enrolled: true,
            progress: 45,
            instructor: {
              name: 'Sarah Johnson',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e8?w=100&h=100&fit=crop&crop=face',
            },
            createdAt: '2024-01-15T00:00:00Z',
            updatedAt: '2024-01-15T00:00:00Z',
          },
          {
            id: '2',
            title: 'Advanced TypeScript',
            description: 'Master advanced TypeScript concepts including generics, decorators, and type manipulation.',
            thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
            category: 'Web Development',
            tags: ['TypeScript', 'JavaScript', 'Advanced'],
            difficulty: 'Advanced',
            duration: 360,
            lessonsCount: 18,
            enrolled: false,
            progress: 0,
            instructor: {
              name: 'Mike Chen',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            },
            createdAt: '2024-01-10T00:00:00Z',
            updatedAt: '2024-01-10T00:00:00Z',
          },
          {
            id: '3',
            title: 'UI/UX Design Fundamentals',
            description: 'Learn the principles of user interface and user experience design.',
            thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
            category: 'Design',
            tags: ['UI', 'UX', 'Design'],
            difficulty: 'Beginner',
            duration: 180,
            lessonsCount: 10,
            enrolled: true,
            progress: 80,
            instructor: {
              name: 'Emily Rodriguez',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            },
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-05T00:00:00Z',
          },
          {
            id: '4',
            title: 'Python for Data Science',
            description: 'Learn Python programming with focus on data analysis and machine learning.',
            thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
            category: 'Data Science',
            tags: ['Python', 'Data Science', 'Machine Learning'],
            difficulty: 'Intermediate',
            duration: 300,
            lessonsCount: 15,
            enrolled: false,
            progress: 0,
            instructor: {
              name: 'David Park',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
        ];

        let filteredCourses = mockCourses;
        if (category) {
          filteredCourses = mockCourses.filter(course => course.category === category);
        }

        resolve({
          data: filteredCourses,
          pagination: {
            currentPage: page,
            totalPages: 1,
            totalItems: filteredCourses.length,
            itemsPerPage: limit,
          },
        });
      }, 800);
    });

    // Uncomment when backend is ready:
    // const params = { page, limit, ...(category && { category }) };
    // return apiClient.get<PaginatedResponse<Course>>('/courses', { params });
  }

  static async getCourse(courseId: string): Promise<ApiResponse<Course>> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCourse: Course = {
          id: courseId,
          title: 'React for Beginners',
          description: 'Learn the fundamentals of React including components, props, state, and hooks. This comprehensive course covers everything you need to know to start building modern web applications with React.',
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
          category: 'Web Development',
          tags: ['React', 'JavaScript', 'Frontend'],
          difficulty: 'Beginner',
          duration: 240,
          lessonsCount: 12,
          enrolled: true,
          progress: 45,
          instructor: {
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e8?w=100&h=100&fit=crop&crop=face',
          },
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z',
        };

        resolve({
          success: true,
          data: mockCourse,
        });
      }, 500);
    });

    // Uncomment when backend is ready:
    // return apiClient.get<ApiResponse<Course>>(`/courses/${courseId}`);
  }

  static async getCourseLessons(courseId: string): Promise<ApiResponse<Lesson[]>> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockLessons: Lesson[] = [
          {
            id: '1',
            courseId,
            title: 'Introduction to React',
            description: 'Overview of React and its ecosystem',
            type: 'video',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration: 15,
            order: 1,
            completed: true,
            createdAt: '2024-01-15T00:00:00Z',
          },
          {
            id: '2',
            courseId,
            title: 'Setting up Development Environment',
            description: 'Install Node.js, npm, and create your first React app',
            type: 'video',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration: 20,
            order: 2,
            completed: true,
            createdAt: '2024-01-15T00:00:00Z',
          },
          {
            id: '3',
            courseId,
            title: 'React Components Basics',
            description: 'Learn about functional and class components',
            type: 'video',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration: 25,
            order: 3,
            completed: false,
            createdAt: '2024-01-15T00:00:00Z',
          },
          {
            id: '4',
            courseId,
            title: 'React Cheatsheet',
            description: 'Quick reference guide for React concepts',
            type: 'pdf',
            pdfUrl: '/mock-pdf-url.pdf',
            order: 4,
            completed: false,
            createdAt: '2024-01-15T00:00:00Z',
          },
        ];

        resolve({
          success: true,
          data: mockLessons,
        });
      }, 500);
    });

    // Uncomment when backend is ready:
    // return apiClient.get<ApiResponse<Lesson[]>>(`/courses/${courseId}/lessons`);
  }

  static async enrollCourse(courseId: string): Promise<ApiResponse<{ enrolled: boolean }>> {
    return apiClient.post<ApiResponse<{ enrolled: boolean }>>(`/courses/${courseId}/enroll`);
  }

  static async markLessonComplete(lessonId: string): Promise<ApiResponse<{ completed: boolean }>> {
    return apiClient.patch<ApiResponse<{ completed: boolean }>>(`/lessons/${lessonId}/complete`);
  }

  static async getEnrolledCourses(): Promise<ApiResponse<Course[]>> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: '1',
              title: 'React for Beginners',
              description: 'Learn the fundamentals of React',
              thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
              category: 'Web Development',
              tags: ['React', 'JavaScript'],
              difficulty: 'Beginner',
              duration: 240,
              lessonsCount: 12,
              enrolled: true,
              progress: 45,
              instructor: {
                name: 'Sarah Johnson',
              },
              createdAt: '2024-01-15T00:00:00Z',
              updatedAt: '2024-01-15T00:00:00Z',
            },
          ],
        });
      }, 500);
    });

    // Uncomment when backend is ready:
    // return apiClient.get<ApiResponse<Course[]>>('/courses/enrolled');
  }
}