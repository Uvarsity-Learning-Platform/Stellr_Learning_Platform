import { Request, Response } from 'express';
import PrismaService from '@/services/prisma.service';
import { AppError } from '@/middleware/error';
import {
  courseQuerySchema,
  createCourseSchema,
  updateCourseSchema,
  uuidSchema,
  type CourseQueryInput,
  type CreateCourseInput,
  type UpdateCourseInput,
} from '@/utils/validation';

const prisma = PrismaService.getInstance();

export class CourseController {
  static async getCourses(req: Request, res: Response): Promise<void> {
    const { page, limit, category, search }: CourseQueryInput = courseQuerySchema.parse(req.query);
    const skip = (page - 1) * limit;

    const { courses, total } = await prisma.findCourses({
      skip,
      take: limit,
      category,
      search,
    });

    // Transform courses to match frontend expectations
    const transformedCourses = courses.map((course: any) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      instructor: {
        name: course.instructorName,
        avatar: course.instructorAvatar,
      },
      thumbnailUrl: course.thumbnailUrl,
      level: course.level,
      duration: course.duration,
      studentsCount: course._count.enrollments,
      rating: course.rating,
      category: course.category,
      tags: course.tags,
      enrolled: false, // Will be updated if user is authenticated
      progress: 0, // Will be updated if user is authenticated
      lessonsCount: course._count.lessons,
      isPublished: course.isPublished,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
      // Legacy properties for backward compatibility
      thumbnail: course.thumbnailUrl,
      difficulty: course.level,
    }));

    // If user is authenticated, check enrollment status
    if (req.user) {
      const userId = req.user.id;
      
      for (const course of transformedCourses) {
        const enrollment = await prisma.findEnrollmentByUserAndCourse(userId, course.id);
        if (enrollment) {
          course.enrolled = true;
          // Get progress
          const progress = await prisma.getUserProgress(userId, course.id);
          course.progress = progress.progress;
        }
      }
    }

    res.json({
      courses: transformedCourses,
      total,
      hasMore: skip + courses.length < total,
    });
  }

  static async getCourse(req: Request, res: Response): Promise<void> {
    const courseId = uuidSchema.parse(req.params.id);

    const course = await prisma.findCourseById(courseId);
    if (!course) {
      throw new AppError('Course not found', 404);
    }

    // Transform course to match frontend expectations
    const transformedCourse = {
      id: course.id,
      title: course.title,
      description: course.description,
      instructor: {
        name: course.instructorName,
        avatar: course.instructorAvatar,
      },
      thumbnailUrl: course.thumbnailUrl,
      level: course.level,
      duration: course.duration,
      studentsCount: course._count.enrollments,
      rating: course.rating,
      category: course.category,
      tags: course.tags,
      enrolled: false,
      progress: 0,
      lessonsCount: course._count.lessons,
      isPublished: course.isPublished,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
      // Legacy properties for backward compatibility
      thumbnail: course.thumbnailUrl,
      difficulty: course.level,
    };

    // If user is authenticated, check enrollment status
    if (req.user) {
      const userId = req.user.id;
      const enrollment = await prisma.findEnrollmentByUserAndCourse(userId, courseId);
      if (enrollment) {
        transformedCourse.enrolled = true;
        // Get progress
        const progress = await prisma.getUserProgress(userId, courseId);
        transformedCourse.progress = progress.progress;
      }
    }

    res.json(transformedCourse);
  }

  static async createCourse(req: Request, res: Response): Promise<void> {
    const courseData: CreateCourseInput = createCourseSchema.parse(req.body);

    const course = await prisma.createCourse(courseData);

    res.status(201).json({
      success: true,
      data: {
        id: course.id,
        title: course.title,
        description: course.description,
        instructor: {
          name: course.instructorName,
          avatar: course.instructorAvatar,
        },
        thumbnailUrl: course.thumbnailUrl,
        level: course.level,
        duration: course.duration,
        studentsCount: course.studentsCount,
        rating: course.rating,
        category: course.category,
        tags: course.tags,
        isPublished: course.isPublished,
        createdAt: course.createdAt.toISOString(),
        updatedAt: course.updatedAt.toISOString(),
      },
    });
  }

  static async updateCourse(req: Request, res: Response): Promise<void> {
    const courseId = uuidSchema.parse(req.params.id);
    const updateData: UpdateCourseInput = updateCourseSchema.parse(req.body);

    const course = await prisma.updateCourse(courseId, updateData);

    res.json({
      success: true,
      data: {
        id: course.id,
        title: course.title,
        description: course.description,
        instructor: {
          name: course.instructorName,
          avatar: course.instructorAvatar,
        },
        thumbnailUrl: course.thumbnailUrl,
        level: course.level,
        duration: course.duration,
        studentsCount: course.studentsCount,
        rating: course.rating,
        category: course.category,
        tags: course.tags,
        isPublished: course.isPublished,
        createdAt: course.createdAt.toISOString(),
        updatedAt: course.updatedAt.toISOString(),
      },
    });
  }

  static async getCourseLessons(req: Request, res: Response): Promise<void> {
    const courseId = uuidSchema.parse(req.params.id);

    // Verify course exists
    const course = await prisma.findCourseById(courseId);
    if (!course) {
      throw new AppError('Course not found', 404);
    }

    const lessons = await prisma.findLessonsByCourse(courseId);

    // Transform lessons to match frontend expectations
    const transformedLessons = lessons.map((lesson: any) => ({
      id: lesson.id,
      courseId: lesson.courseId,
      title: lesson.title,
      description: lesson.description,
      type: lesson.type,
      videoUrl: lesson.videoUrl,
      pdfUrl: lesson.pdfUrl,
      content: lesson.content,
      duration: lesson.duration,
      order: lesson.order,
      completed: false, // Will be updated if user is authenticated
      createdAt: lesson.createdAt.toISOString(),
    }));

    // If user is authenticated, check lesson completion status
    if (req.user) {
      const userId = req.user.id;
      
      for (const lesson of transformedLessons) {
        const progress = await prisma.getClient().lessonProgress.findUnique({
          where: {
            userId_lessonId: {
              userId,
              lessonId: lesson.id,
            },
          },
        });
        
        if (progress) {
          lesson.completed = progress.completed;
        }
      }
    }

    res.json({
      success: true,
      data: {
        lessons: transformedLessons,
      },
    });
  }

  static async enrollCourse(req: Request, res: Response): Promise<void> {
    const courseId = uuidSchema.parse(req.params.id);
    const userId = req.user!.id;

    // Verify course exists
    const course = await prisma.findCourseById(courseId);
    if (!course) {
      throw new AppError('Course not found', 404);
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.findEnrollmentByUserAndCourse(userId, courseId);
    if (existingEnrollment) {
      throw new AppError('Already enrolled in this course', 409);
    }

    // Create enrollment
    await prisma.createEnrollment(userId, courseId);

    res.json({
      success: true,
      data: { enrolled: true },
    });
  }

  static async getEnrolledCourses(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id;

    const enrollments = await prisma.findEnrollmentsByUser(userId);

    // Transform enrollments to match frontend expectations
    const transformedCourses = enrollments.map((enrollment: any) => ({
      id: enrollment.course.id,
      title: enrollment.course.title,
      description: enrollment.course.description,
      instructor: {
        name: enrollment.course.instructorName,
        avatar: enrollment.course.instructorAvatar,
      },
      thumbnailUrl: enrollment.course.thumbnailUrl,
      level: enrollment.course.level,
      duration: enrollment.course.duration,
      studentsCount: enrollment.course.studentsCount,
      rating: enrollment.course.rating,
      category: enrollment.course.category,
      tags: enrollment.course.tags,
      enrolled: true,
      progress: 0, // Will be calculated below
      lessonsCount: enrollment.course._count.lessons,
      isPublished: enrollment.course.isPublished,
      createdAt: enrollment.course.createdAt.toISOString(),
      updatedAt: enrollment.course.updatedAt.toISOString(),
      // Legacy properties for backward compatibility
      thumbnail: enrollment.course.thumbnailUrl,
      difficulty: enrollment.course.level,
    }));

    // Get progress for each course
    for (const course of transformedCourses) {
      const progress = await prisma.getUserProgress(userId, course.id);
      course.progress = progress.progress;
    }

    res.json({
      success: true,
      data: {
        enrollments: transformedCourses.map((course: any) => ({ course })),
      },
    });
  }

  static async getCourseCategories(_req: Request, res: Response): Promise<void> {
    const categories = await prisma.findCategories();

    res.json({
      success: true,
      data: {
        categories: categories.map((category: any) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          courseCount: category.courseCount,
        })),
      },
    });
  }
}