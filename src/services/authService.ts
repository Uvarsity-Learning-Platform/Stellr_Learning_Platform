import apiClient from './apiClient';
import type { ApiResponse, User, LoginCredentials, RegisterData, OTPVerification } from '@/types';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    const resp = await apiClient.post<ApiResponse<{ user: User; token: string }>>('/api/auth/login', credentials);
    return resp.data;
  }

  static async register(data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    // Mock implementation (keep while backend isn't ready)
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

    // When backend is available, use the real endpoint and return resp.data:
    // const resp = await apiClient.post<ApiResponse<{ user: User; token: string }>>('/register', data);
    // return resp.data;
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

    // When backend is available:
    // const resp = await apiClient.post<ApiResponse<{ sent: boolean }>>('/auth/send-otp', { phone });
    // return resp.data;
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

    // When backend is available:
    // const resp = await apiClient.post<ApiResponse<{ user: User; token: string }>>('/auth/verify-otp', data);
    // return resp.data;
  }

  static async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const resp = await apiClient.post<ApiResponse<{ token: string }>>('/auth/refresh');
    return resp.data;
  }

  static async logout(): Promise<ApiResponse<{ success: boolean }>> {
    const resp = await apiClient.post<ApiResponse<{ success: boolean }>>('/auth/logout');
    return resp.data;
  }

  static async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    const resp = await apiClient.patch<ApiResponse<User>>('/auth/profile', data);
    return resp.data;
  }

  static async completeOnboarding(): Promise<ApiResponse<User>> {
    // Mock implementation (while backend isn't ready)
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

    // When backend is available:
    // const resp = await apiClient.patch<ApiResponse<User>>('/auth/complete-onboarding');
    // return resp.data;
  }
}