import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';
import { authenticate } from '@/middleware/auth';
import { asyncHandler } from '@/middleware/error';

const router = Router();

// Public routes
router.post('/login', asyncHandler(AuthController.login));
router.post('/register', asyncHandler(AuthController.register));
router.post('/send-otp', asyncHandler(AuthController.sendOtp));
router.post('/verify-otp', asyncHandler(AuthController.verifyOtp));

// Protected routes
router.use(authenticate);
router.post('/refresh', asyncHandler(AuthController.refreshToken));
router.post('/logout', asyncHandler(AuthController.logout));
router.get('/profile', asyncHandler(AuthController.getProfile));
router.patch('/profile', asyncHandler(AuthController.updateProfile));
router.patch('/complete-onboarding', asyncHandler(AuthController.completeOnboarding));

export default router;