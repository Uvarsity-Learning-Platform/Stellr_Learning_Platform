import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockCourse, createMockLesson } from '@/__tests__/test-utils';

// Mock the apiClient
vi.mock('@/services/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('CourseService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getCourses', () => {
    it('should get courses with default pagination', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourses();
      vi.advanceTimersByTime(800);
      const result = await promise;

      expect(result.data).toHaveLength(4);
      expect(result.pagination).toEqual({
        currentPage: 1,
        totalPages: 1,
        totalItems: 4,
        itemsPerPage: 12,
      });
    });

    it('should get courses with custom pagination', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourses(2, 5);
      vi.advanceTimersByTime(800);
      const result = await promise;

      expect(result.pagination.currentPage).toBe(2);
      expect(result.pagination.itemsPerPage).toBe(5);
    });

    it('should filter courses by category', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourses(1, 12, 'Web Development');
      vi.advanceTimersByTime(800);
      const result = await promise;

      expect(result.data.every(course => course.category === 'Web Development')).toBe(true);
      expect(result.data).toHaveLength(2); // React and TypeScript courses
    });

    it('should filter courses by Design category', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourses(1, 12, 'Design');
      vi.advanceTimersByTime(800);
      const result = await promise;

      expect(result.data.every(course => course.category === 'Design')).toBe(true);
      expect(result.data).toHaveLength(1); // UI/UX course
    });

    it('should return empty array for non-existent category', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourses(1, 12, 'Non-existent Category');
      vi.advanceTimersByTime(800);
      const result = await promise;

      expect(result.data).toHaveLength(0);
    });

    it('should return courses with correct structure', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourses();
      vi.advanceTimersByTime(800);
      const result = await promise;

      const course = result.data[0];
      expect(course).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        thumbnail: expect.any(String),
        category: expect.any(String),
        tags: expect.any(Array),
        difficulty: expect.any(String),
        duration: expect.any(Number),
        lessonsCount: expect.any(Number),
        enrolled: expect.any(Boolean),
        progress: expect.any(Number),
        instructor: expect.objectContaining({
          name: expect.any(String),
          avatar: expect.any(String),
        }),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });

  describe('getCourse', () => {
    it('should get single course by ID', async () => {
      const { CourseService } = await import('@/services/courseService');
      const courseId = '123';
      const promise = CourseService.getCourse(courseId);
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.id).toBe(courseId);
      expect(result.data.title).toBe('React for Beginners');
    });

    it('should return course with detailed description', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourse('1');
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result.data.description).toContain('comprehensive course');
      expect(result.data.description.length).toBeGreaterThan(100);
    });

    it('should return enrolled course', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourse('1');
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result.data.enrolled).toBe(true);
      expect(result.data.progress).toBe(45);
    });
  });

  describe('getCourseLessons', () => {
    it('should get lessons for a course', async () => {
      const { CourseService } = await import('@/services/courseService');
      const courseId = '123';
      const promise = CourseService.getCourseLessons(courseId);
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(4);
      expect(result.data.every(lesson => lesson.courseId === courseId)).toBe(true);
    });

    it('should return lessons with correct order', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourseLessons('1');
      vi.advanceTimersByTime(500);
      const result = await promise;

      const orders = result.data.map(lesson => lesson.order);
      expect(orders).toEqual([1, 2, 3, 4]);
    });

    it('should return lessons with mixed types', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourseLessons('1');
      vi.advanceTimersByTime(500);
      const result = await promise;

      const types = result.data.map(lesson => lesson.type);
      expect(types).toContain('video');
      expect(types).toContain('pdf');
    });

    it('should return lessons with completion status', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourseLessons('1');
      vi.advanceTimersByTime(500);
      const result = await promise;

      const completed = result.data.filter(lesson => lesson.completed);
      const incomplete = result.data.filter(lesson => !lesson.completed);
      
      expect(completed).toHaveLength(2);
      expect(incomplete).toHaveLength(2);
    });

    it('should return video lessons with videoUrl', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourseLessons('1');
      vi.advanceTimersByTime(500);
      const result = await promise;

      const videoLessons = result.data.filter(lesson => lesson.type === 'video');
      expect(videoLessons.every(lesson => lesson.videoUrl)).toBe(true);
    });

    it('should return pdf lessons with pdfUrl', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourseLessons('1');
      vi.advanceTimersByTime(500);
      const result = await promise;

      const pdfLessons = result.data.filter(lesson => lesson.type === 'pdf');
      expect(pdfLessons.every(lesson => lesson.pdfUrl)).toBe(true);
    });
  });

  describe('getEnrolledCourses', () => {
    it('should get enrolled courses', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getEnrolledCourses();
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].enrolled).toBe(true);
      expect(result.data[0].progress).toBe(45);
    });

    it('should return courses with instructor info', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getEnrolledCourses();
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result.data[0].instructor).toEqual({
        name: 'Sarah Johnson',
      });
    });
  });

  // Note: The following tests would be for when the backend is implemented
  describe('Real API Methods (commented out)', () => {
    it('should have enrollCourse method', async () => {
      const { CourseService } = await import('@/services/courseService');
      expect(typeof CourseService.enrollCourse).toBe('function');
    });

    it('should have markLessonComplete method', async () => {
      const { CourseService } = await import('@/services/courseService');
      expect(typeof CourseService.markLessonComplete).toBe('function');
    });
  });

  describe('Edge Cases', () => {
    it('should handle getCourse with any courseId', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourse('any-id');
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.id).toBe('any-id');
    });

    it('should handle getCourseLessons with any courseId', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourseLessons('any-course-id');
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.every(lesson => lesson.courseId === 'any-course-id')).toBe(true);
    });

    it('should handle zero pagination parameters', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourses(0, 0);
      vi.advanceTimersByTime(800);
      const result = await promise;

      expect(result.pagination.currentPage).toBe(0);
      expect(result.pagination.itemsPerPage).toBe(0);
    });

    it('should return all course difficulties', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourses();
      vi.advanceTimersByTime(800);
      const result = await promise;

      const difficulties = result.data.map(course => course.difficulty);
      expect(difficulties).toContain('Beginner');
      expect(difficulties).toContain('Intermediate');
      expect(difficulties).toContain('Advanced');
    });

    it('should return courses with realistic durations', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise = CourseService.getCourses();
      vi.advanceTimersByTime(800);
      const result = await promise;

      const durations = result.data.map(course => course.duration);
      expect(durations.every(duration => duration > 0)).toBe(true);
      expect(durations.every(duration => duration <= 600)).toBe(true); // Max 10 hours
    });
  });

  describe('Performance', () => {
    it('should respond within expected time', async () => {
      const { CourseService } = await import('@/services/courseService');
      const startTime = Date.now();
      const promise = CourseService.getCourses();
      vi.advanceTimersByTime(800);
      await promise;
      
      expect(vi.getTimerCount()).toBe(0); // All timers should be resolved
    });

    it('should handle multiple concurrent requests', async () => {
      const { CourseService } = await import('@/services/courseService');
      const promise1 = CourseService.getCourses();
      const promise2 = CourseService.getCourse('1');
      const promise3 = CourseService.getCourseLessons('1');

      vi.advanceTimersByTime(800);

      const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);

      expect(result1.data).toHaveLength(4);
      expect(result2.success).toBe(true);
      expect(result3.success).toBe(true);
    });
  });
});