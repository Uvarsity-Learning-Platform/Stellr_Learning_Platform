import { apiClient } from './apiClient';
import type { ApiResponse, User, LoginCredentials, RegisterData, OTPVerification } from '@/types';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    // For MVP, we'll simulate API calls with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          email: credentials.emailOrPhone.includes('@') ? credentials.emailOrPhone : undefined,
          phone: credentials.emailOrPhone.includes('@') ? undefined : credentials.emailOrPhone,
          firstName: 'John',
          lastName: 'Doe',
          isOnboarded: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        resolve({
          success: true,
          data: {
            user: mockUser,
            token: 'mock-jwt-token-' + Date.now(),
          },
        });
      }, 1000);
    });

    // Uncomment when backend is ready:
    // return apiClient.post<ApiResponse<{ user: User; token: string }>>('/login', credentials);
  }

  static async register(data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: Date.now().toString(),
          email: data.email,
          phone: data.phone,
          firstName: data.firstName,
          lastName: data.lastName,
          isOnboarded: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        resolve({
          success: true,
          data: {
            user: mockUser,
            token: 'mock-jwt-token-' + Date.now(),
          },
        });
      }, 1000);
    });

    // Uncomment when backend is ready:
    // return apiClient.post<ApiResponse<{ user: User; token: string }>>('/register', data);
  }

  static async sendOTP(phone: string): Promise<ApiResponse<{ sent: boolean }>> {
    // Mock implementation
    console.log('Sending OTP to:', phone);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { sent: true },
          message: 'OTP sent successfully',
        });
      }, 1000);
    });

    // Uncomment when backend is ready:
    // return apiClient.post<ApiResponse<{ sent: boolean }>>('/auth/send-otp', { phone });
  }

  static async verifyOTP(data: OTPVerification): Promise<ApiResponse<{ user: User; token: string }>> {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.otp === '123456') {
          const mockUser: User = {
            id: Date.now().toString(),
            phone: data.phone,
            firstName: 'Jane',
            lastName: 'Doe',
            isOnboarded: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          resolve({
            success: true,
            data: {
              user: mockUser,
              token: 'mock-jwt-token-' + Date.now(),
            },
          });
        } else {
          reject({
            response: {
              data: { message: 'Invalid OTP' },
              status: 400,
            },
          });
        }
      }, 1000);
    });

    // Uncomment when backend is ready:
    // return apiClient.post<ApiResponse<{ user: User; token: string }>>('/auth/verify-otp', data);
  }

  static async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiClient.post<ApiResponse<{ token: string }>>('/auth/refresh');
  }

  static async logout(): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post<ApiResponse<{ success: boolean }>>('/auth/logout');
  }

  static async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.patch<ApiResponse<User>>('/auth/profile', data);
  }

  static async completeOnboarding(): Promise<ApiResponse<User>> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            isOnboarded: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        });
      }, 500);
    });

    // Uncomment when backend is ready:
    // return apiClient.patch<ApiResponse<User>>('/auth/complete-onboarding');
  }
}