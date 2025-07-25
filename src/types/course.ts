import type { Instructor } from "./instructor";

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
  duration?: number; // in minutes
  totalDuration?: number; // in minutes
  studentsCount?: number;
  tags?: string[];
  enrolled?: boolean;
  progress?: number; // 0-100
  lessonsCount?: number;
  isPublished?: boolean;
  updatedAt?: string;
}
