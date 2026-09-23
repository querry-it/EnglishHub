import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import RoadmapsPage from './pages/RoadmapsPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';

// Student Pages
import DashboardPage from './pages/DashboardPage';
import LessonPage from './pages/LessonPage';
import PracticePage from './pages/PracticePage';
import FlashcardsPage from './pages/FlashcardsPage';
import SubmissionsPage from './pages/SubmissionsPage';

// Instructor Pages
import InstructorCoursesPage from './pages/InstructorCoursesPage';
import GradingPage from './pages/GradingPage';

// Admin Pages
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AuditLogsPage from './pages/AuditLogsPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0b1120]">
        <Toaster position="top-right" />
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseSlug" element={<CourseDetailPage />} />

          {/* --- STUDENT ROUTES (Yêu cầu đăng nhập) --- */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/roadmaps" element={<ProtectedRoute><RoadmapsPage /></ProtectedRoute>} />
          <Route path="/flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
          <Route path="/my-submissions" element={<ProtectedRoute><SubmissionsPage /></ProtectedRoute>} />
          <Route path="/learn/:courseSlug/lessons/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
          <Route path="/learn/:courseSlug/lessons/:lessonId/practice" element={<ProtectedRoute><PracticePage /></ProtectedRoute>} />

          {/* --- INSTRUCTOR ROUTES (Chỉ Giảng viên & Admin) --- */}
          <Route
            path="/instructor/courses"
            element={
              <ProtectedRoute allowedRoles={['INSTRUCTOR', 'ADMIN']}>
                <InstructorCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/grading"
            element={
              <ProtectedRoute allowedRoles={['INSTRUCTOR', 'ADMIN']}>
                <GradingPage />
              </ProtectedRoute>
            }
          />

          {/* --- ADMIN ROUTES (Chỉ Admin) --- */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AuditLogsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
