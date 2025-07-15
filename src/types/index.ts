// User types
export interface User {
  id: string;
  email?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isOnboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

// Authentication types
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
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  lessonsCount: number;
  enrolled: boolean;
  progress: number; // 0-100
  instructor: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'text';
  videoUrl?: string;
  pdfUrl?: string;
  content?: string;
  duration?: number; // in minutes
  order: number;
  completed: boolean;
  createdAt: string;
}

// Quiz types
export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  passingScore: number; // percentage
  attempts: number;
  maxAttempts: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'single-choice';
  options: string[];
  correctAnswers: number[]; // indices of correct options
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Record<string, number[]>; // questionId -> selected option indices
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt?: string;
}

// Certificate types
export interface Certificate {
  id: string;
  courseId: string;
  userId: string;
  courseName: string;
  studentName: string;
  completedAt: string;
  certificateUrl: string;
}

// Progress types
export interface UserProgress {
  courseId: string;
  courseName: string;
  progress: number; // 0-100
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: string;
  certificateEarned: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// App State types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
  courses: Course[];
  userProgress: UserProgress[];
  certificates: Certificate[];
  isLoading: boolean;
  error: string | null;
}