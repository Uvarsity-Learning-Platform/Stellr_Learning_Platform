import apiClient from './apiClient';

export const CourseService = {
  async getCourses(page = 1, limit = 9, category?: string, q?: string) {
    const offset = (page - 1) * limit;
    const params: Record<string, any> = { limit, offset };
    if (category) params.category = category;
    if (q) params.q = q;
    const resp = await apiClient.get('/api/v1/courses', { params });
    return resp.data; // ensure you return the ApiResponse payload, not the AxiosResponse
  },
  async getCourse(courseId: string) {
    const resp = await apiClient.get(`/api/v1/courses/${courseId}`);
    return resp.data;
  },
  async getCourseLessons(courseId: string) {
    const resp = await apiClient.get(`/api/v1/courses/${courseId}/lessons`);
    return resp.data;
  },
  async enrollCourse(courseId: string) {
    const resp = await apiClient.post(`/api/v1/courses/${courseId}/enroll`);
    return resp.data;
  },
  async markLessonComplete(lessonId: string) {
    const resp = await apiClient.post(`/api/v1/progress/lessons/${lessonId}/complete`);
    return resp.data;
  },
  async getEnrolledCourses() {
    const resp = await apiClient.get('/api/v1/courses/enrollments/my');
    return resp.data;
  },
  async getCourseCategories() {
    const resp = await apiClient.get('/api/v1/courses/categories/list');
    return resp.data;
  },
  async getUserCourses(userId: string) {
    const resp = await apiClient.get(`/api/v1/users/${userId}/courses`);
    return resp.data;
  },
};