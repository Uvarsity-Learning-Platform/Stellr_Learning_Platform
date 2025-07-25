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
