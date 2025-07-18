import { z } from 'zod';

// User validation schemas
export const loginSchema = z.object({
  emailOrPhone: z.string().min(1, 'Email or phone is required'),
  password: z.string().optional(),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

export const otpVerificationSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const sendOtpSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
});

// Course validation schemas
export const createCourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  thumbnailUrl: z.string().url().optional(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
  duration: z.number().int().positive().default(0),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).default([]),
  instructorName: z.string().min(1, 'Instructor name is required'),
  instructorAvatar: z.string().url().optional(),
});

export const updateCourseSchema = createCourseSchema.partial();

export const courseQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  category: z.string().optional(),
  search: z.string().optional(),
});

// Lesson validation schemas
export const createLessonSchema = z.object({
  courseId: z.string().uuid('Invalid course ID'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['video', 'pdf', 'text']),
  videoUrl: z.string().url().optional(),
  pdfUrl: z.string().url().optional(),
  content: z.string().optional(),
  duration: z.number().int().positive().optional(),
  order: z.number().int().positive(),
});

export const updateLessonSchema = createLessonSchema.partial();

// Progress validation schemas
export const markLessonCompleteSchema = z.object({
  completed: z.boolean().default(true),
});

// Category validation schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

// Common validation schemas
export const uuidSchema = z.string().uuid('Invalid ID format');
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OtpVerificationInput = z.infer<typeof otpVerificationSchema>;
export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type CourseQueryInput = z.infer<typeof courseQuerySchema>;
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
export type MarkLessonCompleteInput = z.infer<typeof markLessonCompleteSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;