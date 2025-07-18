import { Router } from 'express';
import { ProgressController } from '@/controllers/progress.controller';
import { authenticate } from '@/middleware/auth';
import { asyncHandler } from '@/middleware/error';

const router = Router();

// All progress routes require authentication
router.use(authenticate);

router.post('/lessons/:id/complete', asyncHandler(ProgressController.markLessonComplete));
router.get('/lessons/:id', asyncHandler(ProgressController.getLessonProgress));
router.get('/courses/:id', asyncHandler(ProgressController.getCourseProgress));
router.get('/my', asyncHandler(ProgressController.getUserProgress));

export default router;