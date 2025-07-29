

import { apiClient } from './apiClient';
import type { ApiResponse, Course, Lesson, PaginatedResponse } from '@/types';

export class CourseService {
  // Helper function to transform backend course data to frontend format
  private static transformCourse(backendCourse: Record<string, unknown>): Course {
    return {
      id: String(backendCourse.id || ''),
      title: String(backendCourse.title || ''),
      description: String(backendCourse.description || ''),
      instructor: typeof backendCourse.instructor === 'string' 
        ? { name: backendCourse.instructor }
        : (backendCourse.instructor as { name: string; avatar?: string } | undefined) || { name: 'Unknown' },
      thumbnailUrl: String(backendCourse.thumbnailUrl || backendCourse.thumbnail || ''),
      level: (backendCourse.level || backendCourse.difficulty || 'Beginner') as 'Beginner' | 'Intermediate' | 'Advanced',
      duration: Number(backendCourse.duration) || 0,
      studentsCount: Number(backendCourse.studentsCount) || 0,
      rating: Number(backendCourse.rating) || 0,
      category: String(backendCourse.category || 'General'),
      tags: Array.isArray(backendCourse.tags) ? backendCourse.tags.map(String) : [],
      enrolled: Boolean(backendCourse.enrolled),
      progress: Number(backendCourse.progress) || 0,
      lessonsCount: Number(backendCourse.lessonsCount) || 0,
      isPublished: Boolean(backendCourse.isPublished ?? true),
      createdAt: String(backendCourse.createdAt || new Date().toISOString()),
      updatedAt: String(backendCourse.updatedAt || new Date().toISOString()),
      // Legacy properties
      thumbnail: String(backendCourse.thumbnailUrl || backendCourse.thumbnail || ''),
      difficulty: (backendCourse.level || backendCourse.difficulty || 'Beginner') as 'Beginner' | 'Intermediate' | 'Advanced',
    };
  }

  static async getCourses(page = 1, limit = 12, category?: string, search?: string): Promise<PaginatedResponse<Course>> {
    try {
      const params: Record<string, string | number> = { 
        limit, 
        offset: (page - 1) * limit 
      };
      
      if (category) params.category = category;
      if (search) params.search = search;

      const response = await apiClient.get<{ courses: Record<string, unknown>[]; total: number; hasMore: boolean }>('/courses', { params });
      
      // Transform backend response to match our PaginatedResponse format
      return {
        data: response.courses.map(this.transformCourse),
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(response.total / limit),
          totalItems: response.total,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error('Error fetching courses:', error);
      
      // Fallback to placeholder courses during loading/error
      return {
        data: [],
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: limit,
        },
      };
    }
  }

  static async getCourse(courseId: string): Promise<ApiResponse<Course>> {
    try {
      const response = await apiClient.get<Record<string, unknown>>(`/courses/${courseId}`);
      return {
        success: true,
        data: this.transformCourse(response),
      };
    } catch (error) {
      console.error('Error fetching course:', error);
      return {
        success: false,
        data: {} as Course,
        error: 'Failed to fetch course',
      };
    }
  }

  static async getCourseLessons(courseId: string): Promise<ApiResponse<Lesson[]>> {
    try {
      const response = await apiClient.get<{ lessons: Lesson[] }>(`/courses/${courseId}/lessons`);
      return {
        success: true,
        data: response.lessons,
      };
    } catch (error) {
      console.error('Error fetching course lessons:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to fetch course lessons',
      };
    }
  }

  static async enrollCourse(courseId: string): Promise<ApiResponse<{ enrolled: boolean }>> {
    return apiClient.post<ApiResponse<{ enrolled: boolean }>>(`/courses/${courseId}/enroll`);
  }

  static async markLessonComplete(lessonId: string): Promise<ApiResponse<{ completed: boolean }>> {
    return apiClient.post<ApiResponse<{ completed: boolean }>>(`/progress/lessons/${lessonId}/complete`);
  }

  static async getEnrolledCourses(): Promise<ApiResponse<Course[]>> {
    try {
      const response = await apiClient.get<{ enrollments: Array<{ course: Record<string, unknown> }> }>('/courses/enrollments/my');
      return {
        success: true,
        data: response.enrollments.map(enrollment => this.transformCourse(enrollment.course)),
      };
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to fetch enrolled courses',
      };
    }
  }

  static async getCourseCategories(): Promise<ApiResponse<Array<{ id: string; name: string; description: string; courseCount: number }>>> {
    try {
      const response = await apiClient.get<{ categories: Array<{ id: string; name: string; description: string; courseCount: number }> }>('/courses/categories/list');
      return {
        success: true,
        data: response.categories,
      };
    } catch (error) {
      console.error('Error fetching course categories:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to fetch course categories',
      };
    }
  }

  /**
   * Get all courses a specific user is enrolled in (by userId)
   */
  static async getUserCourses(userId: string): Promise<ApiResponse<Course[]>> {
    try {
      const response = await apiClient.get<{ enrollments: Array<{ course: Record<string, unknown> }> }>(`/users/${userId}/courses`);
      return {
        success: true,
        data: response.enrollments.map(enrollment => this.transformCourse(enrollment.course)),
      };
    } catch (error) {
      console.error('Error fetching user courses:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to fetch user courses',
      };
    }
  }
}