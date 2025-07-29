import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

// Layout Components
import MainLayout from '@/components/layout/MainLayout';
// Page Components
import LandingPage from '@/pages/LandingPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import PublicCoursesPage from '@/pages/PublicCoursesPage';
import OTPVerificationPage from '@/pages/auth/OTPVerificationPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import CourseCatalogPage from '@/pages/course/CourseCatalogPage';
import CourseDetailPage from '@/pages/course/CourseDetailPage';
import LessonPage from '@/pages/course/LessonPage';
import QuizPage from '@/pages/quiz/QuizPage';
import CertificatesPage from '@/pages/certificate/CertificatesPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import MyCoursesPage from '@/pages/course/MyCoursesPage';

// Route Guards
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PublicRoute from '@/components/auth/PublicRoute';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/auth/forgot-password" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          {/* Public Routes */}
          <Route path="/" element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } />
          
          <Route path="/courses" element={
            <PublicRoute>
              <PublicCoursesPage />
            </PublicRoute>
          } />
          
          <Route path="/about" element={
            <PublicRoute>
              <AboutPage />
            </PublicRoute>
          } />
          
          <Route path="/contact" element={
            <PublicRoute>
              <ContactPage />
            </PublicRoute>
          } />
          
          {/* Auth Routes - direct, no AuthLayout */}
          <Route path="/auth/verify-otp" element={
            <PublicRoute>
              <OTPVerificationPage />
            </PublicRoute>
          } />

          {/* Protected Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="courses" element={<CourseCatalogPage />} />
            <Route path="courses/:courseId" element={<CourseDetailPage />} />
            <Route path="courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
            <Route path="courses/:courseId/quiz" element={<QuizPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="my-courses" element={<MyCoursesPage />} />
          </Route>

          {/* Legacy Routes Redirect */}
          <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="/app/courses" element={<Navigate to="/app/courses" replace />} />
          <Route path="/certificates" element={<Navigate to="/app/certificates" replace />} />
          <Route path="/settings" element={<Navigate to="/app/settings" replace />} />

          {/* Catch-all route */}
          <Route path="*" element={
            isAuthenticated 
              ? <Navigate to="/app/dashboard" replace />
              : <Navigate to="/" replace />
          } />
        </Routes>
        
        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#374151',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
