import { Router } from 'express';
import { CourseController } from '@/controllers/course.controller';
import { authenticate, optionalAuthenticate } from '@/middleware/auth';
import { asyncHandler } from '@/middleware/error';

const router = Router();

// Public routes (with optional authentication)
router.get('/', optionalAuthenticate, asyncHandler(CourseController.getCourses));
router.get('/categories/list', asyncHandler(CourseController.getCourseCategories));
router.get('/:id', optionalAuthenticate, asyncHandler(CourseController.getCourse));
router.get('/:id/lessons', optionalAuthenticate, asyncHandler(CourseController.getCourseLessons));

// Protected routes
router.use(authenticate);
router.post('/', asyncHandler(CourseController.createCourse));
router.put('/:id', asyncHandler(CourseController.updateCourse));
router.post('/:id/enroll', asyncHandler(CourseController.enrollCourse));
router.get('/enrollments/my', asyncHandler(CourseController.getEnrolledCourses));

export default router;