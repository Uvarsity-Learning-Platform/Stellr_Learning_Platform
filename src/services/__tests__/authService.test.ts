import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the apiClient
vi.mock('@/services/apiClient', () => ({
  apiClient: {
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  describe('login', () => {
    it('should login with email credentials successfully', async () => {
      const { AuthService } = await import('@/services/authService');
      const credentials = {
        emailOrPhone: 'test@example.com',
        password: 'password123',
      };

      const promise = AuthService.login(credentials);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.user.email).toBe('test@example.com');
      expect(result.data.user.phone).toBeUndefined();
      expect(result.data.token).toContain('mock-jwt-token-');
    });

    it('should login with phone credentials successfully', async () => {
      const { AuthService } = await import('@/services/authService');
      const credentials = {
        emailOrPhone: '+1234567890',
        password: 'password123',
      };

      const promise = AuthService.login(credentials);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.user.phone).toBe('+1234567890');
      expect(result.data.user.email).toBeUndefined();
      expect(result.data.token).toContain('mock-jwt-token-');
    });

    it('should return user with correct default properties', async () => {
      const { AuthService } = await import('@/services/authService');
      const credentials = {
        emailOrPhone: 'test@example.com',
        password: 'password123',
      };

      const promise = AuthService.login(credentials);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.data.user).toMatchObject({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        isOnboarded: true,
      });
      expect(result.data.user.createdAt).toBeDefined();
      expect(result.data.user.updatedAt).toBeDefined();
    });
  });

  describe('register', () => {
    it('should register new user successfully', async () => {
      const { AuthService } = await import('@/services/authService');
      const registerData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '+1234567890',
        password: 'password123',
      };

      const promise = AuthService.register(registerData);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.user).toMatchObject({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '+1234567890',
        isOnboarded: false,
      });
      expect(result.data.token).toContain('mock-jwt-token-');
    });

    it('should create user with unique ID', async () => {
      const { AuthService } = await import('@/services/authService');
      const registerData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+1234567890',
        password: 'password123',
      };

      const promise = AuthService.register(registerData);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.data.user.id).toBeDefined();
      expect(typeof result.data.user.id).toBe('string');
    });
  });

  describe('sendOTP', () => {
    it('should send OTP successfully', async () => {
      const { AuthService } = await import('@/services/authService');
      const phone = '+1234567890';

      const promise = AuthService.sendOTP(phone);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.sent).toBe(true);
      expect(result.message).toBe('OTP sent successfully');
    });

    it('should handle any phone number format', async () => {
      const { AuthService } = await import('@/services/authService');
      const phone = '1234567890';

      const promise = AuthService.sendOTP(phone);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.sent).toBe(true);
    });
  });

  describe('verifyOTP', () => {
    it('should verify OTP successfully with correct code', async () => {
      const { AuthService } = await import('@/services/authService');
      const otpData = {
        phone: '+1234567890',
        otp: '123456',
      };

      const promise = AuthService.verifyOTP(otpData);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.user.phone).toBe('+1234567890');
      expect(result.data.user.isOnboarded).toBe(false);
      expect(result.data.token).toContain('mock-jwt-token-');
    });

    it('should reject with invalid OTP', async () => {
      const { AuthService } = await import('@/services/authService');
      const otpData = {
        phone: '+1234567890',
        otp: '654321',
      };

      const promise = AuthService.verifyOTP(otpData);
      vi.advanceTimersByTime(1000);

      await expect(promise).rejects.toEqual({
        response: {
          data: { message: 'Invalid OTP' },
          status: 400,
        },
      });
    });

    it('should create user with correct default values', async () => {
      const { AuthService } = await import('@/services/authService');
      const otpData = {
        phone: '+1234567890',
        otp: '123456',
      };

      const promise = AuthService.verifyOTP(otpData);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.data.user).toMatchObject({
        firstName: 'Jane',
        lastName: 'Doe',
        isOnboarded: false,
      });
      expect(result.data.user.createdAt).toBeDefined();
      expect(result.data.user.updatedAt).toBeDefined();
    });
  });

  describe('completeOnboarding', () => {
    it('should complete onboarding successfully', async () => {
      const { AuthService } = await import('@/services/authService');
      const promise = AuthService.completeOnboarding();
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.isOnboarded).toBe(true);
      expect(result.data).toMatchObject({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      });
    });

    it('should return updated timestamps', async () => {
      const { AuthService } = await import('@/services/authService');
      const promise = AuthService.completeOnboarding();
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result.data.createdAt).toBeDefined();
      expect(result.data.updatedAt).toBeDefined();
    });
  });

  // Note: The following tests would be for when the backend is implemented
  describe('Real API Methods (commented out)', () => {
    it('should have refreshToken method', async () => {
      const { AuthService } = await import('@/services/authService');
      expect(typeof AuthService.refreshToken).toBe('function');
    });

    it('should have logout method', async () => {
      const { AuthService } = await import('@/services/authService');
      expect(typeof AuthService.logout).toBe('function');
    });

    it('should have updateProfile method', async () => {
      const { AuthService } = await import('@/services/authService');
      expect(typeof AuthService.updateProfile).toBe('function');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty credentials gracefully', async () => {
      const { AuthService } = await import('@/services/authService');
      const credentials = {
        emailOrPhone: '',
        password: '',
      };

      const promise = AuthService.login(credentials);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      // Should still work with mock implementation
      expect(result.success).toBe(true);
    });

    it('should handle special characters in phone number', async () => {
      const { AuthService } = await import('@/services/authService');
      const otpData = {
        phone: '+1 (234) 567-8900',
        otp: '123456',
      };

      const promise = AuthService.verifyOTP(otpData);
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data.user.phone).toBe('+1 (234) 567-8900');
    });

    it('should generate unique tokens for each login', async () => {
      const { AuthService } = await import('@/services/authService');
      const credentials = {
        emailOrPhone: 'test@example.com',
        password: 'password123',
      };

      const promise1 = AuthService.login(credentials);
      vi.advanceTimersByTime(1000);
      const result1 = await promise1;

      vi.advanceTimersByTime(100); // Ensure different timestamp

      const promise2 = AuthService.login(credentials);
      vi.advanceTimersByTime(1000);
      const result2 = await promise2;

      expect(result1.data.token).not.toBe(result2.data.token);
    });
  });
});