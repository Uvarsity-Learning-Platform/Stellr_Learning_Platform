export interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}
import type { User } from "./user";


export interface LoginCredentials {
  emailOrPhone: string;
  password?: string;
}

export interface OTPVerification {
  phone: string;
  otp: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}


export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
