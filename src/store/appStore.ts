import { create } from 'zustand';
import type { Course, UserProgress, Certificate } from '@/types';

interface AppStore {
  // Courses
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  
  // User Progress
  userProgress: UserProgress[];
  setUserProgress: (progress: UserProgress[]) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  
  // Certificates
  certificates: Certificate[];
  setCertificates: (certificates: Certificate[]) => void;
  addCertificate: (certificate: Certificate) => void;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // Courses
  courses: [],
  setCourses: (courses) => set({ courses }),
  addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
  updateCourse: (courseId, updates) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId ? { ...course, ...updates } : course
      ),
    })),

  // User Progress
  userProgress: [],
  setUserProgress: (userProgress) => set({ userProgress }),
  updateCourseProgress: (courseId, progress) =>
    set((state) => ({
      userProgress: state.userProgress.map((p) =>
        p.courseId === courseId ? { ...p, progress } : p
      ),
    })),

  // Certificates
  certificates: [],
  setCertificates: (certificates) => set({ certificates }),
  addCertificate: (certificate) =>
    set((state) => ({ certificates: [...state.certificates, certificate] })),

  // UI State
  isLoading: false,
  error: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearError: () => set({ error: null }),
}));