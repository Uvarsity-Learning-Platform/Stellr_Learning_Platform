export interface UserProgress {
  courseId: string;
  courseName: string;
  progress: number; // 0-100
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: string;
  certificateEarned: boolean;
}
