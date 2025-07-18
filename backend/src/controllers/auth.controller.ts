import { Request, Response } from 'express';
import PrismaService from '@/services/prisma.service';
import { hashPassword, comparePasswords } from '@/utils/password';
import { signToken } from '@/utils/jwt';
import { AppError } from '@/middleware/error';
import {
  loginSchema,
  registerSchema,
  otpVerificationSchema,
  sendOtpSchema,
  updateProfileSchema,
  type LoginInput,
  type RegisterInput,
  type OtpVerificationInput,
  type SendOtpInput,
  type UpdateProfileInput,
} from '@/utils/validation';

const prisma = PrismaService.getInstance();

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { emailOrPhone, password }: LoginInput = loginSchema.parse(req.body);

    // Check if user exists
    const user = emailOrPhone.includes('@')
      ? await prisma.findUserByEmail(emailOrPhone)
      : await prisma.findUserByPhone(emailOrPhone);

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // For now, we'll create a mock successful login
    // In a real app, you'd verify the password if provided
    if (password && user.passwordHash) {
      const isPasswordValid = await comparePasswords(password, user.passwordHash);
      if (!isPasswordValid) {
        throw new AppError('Invalid credentials', 401);
      }
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      phone: user.phone,
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          isOnboarded: user.isOnboarded,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
        token,
      },
    });
  }

  static async register(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, phone, password }: RegisterInput = registerSchema.parse(req.body);

    // Check if user already exists
    if (email) {
      const existingUser = await prisma.findUserByEmail(email);
      if (existingUser) {
        throw new AppError('User with this email already exists', 409);
      }
    }

    if (phone) {
      const existingUser = await prisma.findUserByPhone(phone);
      if (existingUser) {
        throw new AppError('User with this phone number already exists', 409);
      }
    }

    // Hash password if provided
    let passwordHash: string | undefined;
    if (password) {
      passwordHash = await hashPassword(password);
    }

    // Create user
    const user = await prisma.createUser({
      firstName,
      lastName,
      email,
      phone,
      passwordHash,
    });

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      phone: user.phone,
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          isOnboarded: user.isOnboarded,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
        token,
      },
    });
  }

  static async sendOtp(req: Request, res: Response): Promise<void> {
    const { phone }: SendOtpInput = sendOtpSchema.parse(req.body);

    // Mock OTP sending - in real app, you'd integrate with SMS service
    console.log(`Sending OTP to ${phone}: 123456`);

    res.json({
      success: true,
      data: { sent: true },
      message: 'OTP sent successfully',
    });
  }

  static async verifyOtp(req: Request, res: Response): Promise<void> {
    const { phone, otp }: OtpVerificationInput = otpVerificationSchema.parse(req.body);

    // Mock OTP verification - in real app, you'd verify against stored OTP
    if (otp !== '123456') {
      throw new AppError('Invalid OTP', 400);
    }

    // Check if user exists, create if not
    let user = await prisma.findUserByPhone(phone);
    if (!user) {
      user = await prisma.createUser({
        phone,
        firstName: 'User',
        lastName: 'Account',
      });
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      phone: user.phone,
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          isOnboarded: user.isOnboarded,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
        token,
      },
    });
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    // User is already authenticated via middleware
    const userId = req.user!.id;
    const user = await prisma.findUserById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Generate new JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      phone: user.phone,
    });

    res.json({
      success: true,
      data: { token },
    });
  }

  static async logout(_req: Request, res: Response): Promise<void> {
    // In a real app, you might invalidate the token in a blacklist
    res.json({
      success: true,
      data: { success: true },
    });
  }

  static async updateProfile(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id;
    const updateData: UpdateProfileInput = updateProfileSchema.parse(req.body);

    // Check if email is being updated and not already taken
    if (updateData.email) {
      const existingUser = await prisma.findUserByEmail(updateData.email);
      if (existingUser && existingUser.id !== userId) {
        throw new AppError('Email already in use', 409);
      }
    }

    // Check if phone is being updated and not already taken
    if (updateData.phone) {
      const existingUser = await prisma.findUserByPhone(updateData.phone);
      if (existingUser && existingUser.id !== userId) {
        throw new AppError('Phone number already in use', 409);
      }
    }

    const user = await prisma.updateUser(userId, updateData);

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        isOnboarded: user.isOnboarded,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    });
  }

  static async completeOnboarding(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id;

    const user = await prisma.updateUser(userId, {
      isOnboarded: true,
    });

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        isOnboarded: user.isOnboarded,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    });
  }

  static async getProfile(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id;
    const user = await prisma.findUserById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        isOnboarded: user.isOnboarded,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    });
  }
}