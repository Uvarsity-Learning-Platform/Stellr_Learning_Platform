import type { Certificate } from './certificate';
import type { UserProgress } from './progress';

export interface User {
  isOnboarded?: boolean;
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  enrolledCourses?: string[]; // Array of course IDs
  certificates?: Certificate[];
  progress?: UserProgress[];
  createdAt?: string;
  updatedAt?: string;
}
