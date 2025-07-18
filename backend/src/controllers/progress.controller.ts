import { Request, Response } from 'express';
import PrismaService from '@/services/prisma.service';
import { AppError } from '@/middleware/error';
import {
  uuidSchema,
  markLessonCompleteSchema,
  type MarkLessonCompleteInput,
} from '@/utils/validation';

const prisma = PrismaService.getInstance();

export class ProgressController {
  static async markLessonComplete(req: Request, res: Response): Promise<void> {
    const lessonId = uuidSchema.parse(req.params.id);
    const userId = req.user!.id;
    const { completed }: MarkLessonCompleteInput = markLessonCompleteSchema.parse(req.body);

    // Verify lesson exists
    const lesson = await prisma.findLessonById(lessonId);
    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    // Verify user is enrolled in the course
    const enrollment = await prisma.findEnrollmentByUserAndCourse(userId, lesson.courseId);
    if (!enrollment) {
      throw new AppError('Not enrolled in this course', 403);
    }

    // Create or update lesson progress
    await prisma.createOrUpdateLessonProgress(userId, lessonId, completed);

    res.json({
      success: true,
      data: { completed },
    });
  }

  static async getLessonProgress(req: Request, res: Response): Promise<void> {
    const lessonId = uuidSchema.parse(req.params.id);
    const userId = req.user!.id;

    // Verify lesson exists
    const lesson = await prisma.findLessonById(lessonId);
    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    // Get lesson progress
    const progress = await prisma.getClient().lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    });

    res.json({
      success: true,
      data: {
        lessonId,
        completed: progress?.completed || false,
        completedAt: progress?.completedAt?.toISOString() || null,
      },
    });
  }

  static async getCourseProgress(req: Request, res: Response): Promise<void> {
    const courseId = uuidSchema.parse(req.params.id);
    const userId = req.user!.id;

    // Verify course exists
    const course = await prisma.findCourseById(courseId);
    if (!course) {
      throw new AppError('Course not found', 404);
    }

    // Verify user is enrolled in the course
    const enrollment = await prisma.findEnrollmentByUserAndCourse(userId, courseId);
    if (!enrollment) {
      throw new AppError('Not enrolled in this course', 403);
    }

    // Get course progress
    const progress = await prisma.getUserProgress(userId, courseId);

    res.json({
      success: true,
      data: {
        courseId,
        courseName: course.title,
        progress: progress.progress,
        completedLessons: progress.completedLessons,
        totalLessons: progress.totalLessons,
        lastAccessedAt: enrollment.enrolledAt.toISOString(),
        certificateEarned: false, // TODO: Implement certificate logic
      },
    });
  }

  static async getUserProgress(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id;

    // Get all enrollments for the user
    const enrollments = await prisma.findEnrollmentsByUser(userId);

    // Get progress for each enrolled course
    const progressList = await Promise.all(
      enrollments.map(async (enrollment: any) => {
        const progress = await prisma.getUserProgress(userId, enrollment.course.id);
        
        return {
          courseId: enrollment.course.id,
          courseName: enrollment.course.title,
          progress: progress.progress,
          completedLessons: progress.completedLessons,
          totalLessons: progress.totalLessons,
          lastAccessedAt: enrollment.enrolledAt.toISOString(),
          certificateEarned: false, // TODO: Implement certificate logic
        };
      })
    );

    res.json({
      success: true,
      data: progressList,
    });
  }
}