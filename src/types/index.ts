export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  isOnboarded?: boolean;
  enrolledCourses?: string[];
  certificates?: Certificate[];
  progress?: UserProgress[];
  createdAt?: string;
  updatedAt?: string;
}

// Instructor type
export interface Instructor {
  totalDuration?: number;
  id?: string;
  name?: string;
  avatar?: string;
  bio?: string;
}

// Course type
export interface Course {
  id: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  rating?: number;
  price?: number;
  createdAt?: string;
  dateCreated?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  instructor?: string | Instructor;
  duration?: number;
  totalDuration?: number;
  studentsCount?: number;
  tags?: string[];
  enrolled?: boolean;
  progress?: number;
  lessonsCount?: number;
  isPublished?: boolean;
  updatedAt?: string;
}

// Lesson type
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  type?: 'video' | 'pdf' | 'text';
  videoUrl?: string;
  pdfUrl?: string;
  content?: string;
  duration?: number;
  order: number;
  completed: boolean;
  createdAt: string;
}

// Quiz types
export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  timeLimit?: number;
  passingScore: number;
  attempts: number;
  maxAttempts: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'single-choice';
  options: string[];
  correctAnswers: number[];
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Record<string, number[]>;
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt?: string;
}

// Certificate type
export interface Certificate {
  id: string;
  courseId: string;
  userId: string;
  courseName: string;
  studentName: string;
  completedAt: string;
  certificateUrl: string;
  issuedAt?: string;
}

// Progress type
export interface UserProgress {
  courseId: string;
  courseName: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: string;
  certificateEarned: boolean;
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


// Auth and App state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// AuthContextType for context value
export interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
}

export interface AppState {
  auth: AuthState;
  courses: Course[];
  userProgress: UserProgress[];
  certificates: Certificate[];
  isLoading: boolean;
  error: string | null;
}