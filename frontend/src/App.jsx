import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import AppLayout from './components/AppLayout';

import Home from './pages/home/Home';
import Login from './pages/home/Login';
import Register from './pages/home/Register';

import Dashboard from './pages/dashboard/Dashboard';
import Listening from './pages/dashboard/Listening';
import Pronunciation from './pages/dashboard/Pronunciation';
import Vocabulary from './pages/dashboard/Vocabulary';
import Speaking from './pages/dashboard/Speaking';
import Exams from './pages/dashboard/Exams';
import Games from './pages/dashboard/Games';
import Courses from './pages/dashboard/Courses';
import CourseClassroom from './pages/dashboard/CourseClassroom';
import Community from './pages/dashboard/Community';
import Chat from './pages/dashboard/Chat';
import Feedbacks from './pages/dashboard/Feedbacks';
import Shop from './pages/dashboard/Shop';
import Ranking from './pages/dashboard/Ranking';
import Cart from './pages/dashboard/Cart';
import LearningWorkspace from './pages/dashboard/LearningWorkspace';
import MyNotes from './pages/dashboard/MyNotes';
import MyVocabulary from './pages/dashboard/MyVocabulary';
import Profile from './pages/dashboard/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminInstructorsPage from './pages/admin/AdminInstructorsPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';
import AdminLessonsPage from './pages/admin/AdminLessonsPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminVocabPage from './pages/admin/AdminVocabPage';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import InstructorCourses from './pages/instructor/InstructorCourses';
import InstructorGrading from './pages/instructor/InstructorGrading';
import InstructorStudents from './pages/instructor/InstructorStudents';
import InstructorProfile from './pages/instructor/InstructorProfile';

import { useAuth } from './context/AuthContext';
import LoginModal from './components/LoginModal';
import ProtectedRoute from './components/ProtectedRoute';
import PricingModal from './components/PricingModal';

function ProfileWrapper() {
  const { user } = useAuth();
  if (user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN') {
    return <InstructorProfile />;
  }
  return <Profile />;
}

function AppContent() {
  const location = useLocation();
  const { isLoginModalOpen, closeLoginModal, isProModalOpen, closeProModal, loading } = useAuth();

  const isPublicPage = ['/', '/home', '/welcome', '/login', '/register'].includes(location.pathname);
  const isCourseLearnPage = location.pathname.startsWith('/course-learn');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1120]">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Trang phòng học Coursera độc lập (Standalone full screen - không dùng sidebar AppLayout)
  if (isCourseLearnPage) {
    return (
      <div className="h-screen w-screen bg-slate-900 overflow-hidden">
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
        <Routes>
          <Route path="/course-learn/:courseId" element={<CourseClassroom />} />
          <Route path="/course-learn" element={<CourseClassroom />} />
        </Routes>
      </div>
    );
  }

  // Trang public — dùng header/footer riêng, không có sidebar
  if (isPublicPage) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
        <PricingModal isOpen={isProModalOpen} onClose={closeProModal} />
        <AppHeader isPublic={true} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/welcome" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }

  // Tất cả trang còn lại (dashboard + instructor + admin) — dùng chung AppLayout

  return (
    <AppLayout>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <PricingModal isOpen={isProModalOpen} onClose={closeProModal} />
      <Routes>
        {/* Core App Routes */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Learning Features (Mọi người dùng đều có thể truy cập để học) */}
        <Route path="/topics" element={<Listening />} />
        <Route path="/listening" element={<Listening />} />
        <Route path="/dictation" element={<Listening />} />
        <Route path="/pronunciation" element={<Pronunciation />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/games" element={<Games />} />
        <Route path="/courses" element={<Courses />} />

        {/* Community & Tools */}
        <Route path="/community" element={<Community />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/leaderboard" element={<Ranking />} />

        {/* User Account (Cần đăng nhập) */}
        <Route path="/profile" element={<ProtectedRoute><ProfileWrapper /></ProtectedRoute>} />
        <Route path="/workspace" element={<LearningWorkspace />} />
        <Route path="/review" element={<LearningWorkspace />} />
        <Route path="/my-notes" element={<ProtectedRoute><MyNotes /></ProtectedRoute>} />
        <Route path="/my-vocabulary" element={<ProtectedRoute><MyVocabulary /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

        {/* Instructor Section */}
        <Route path="/instructor" element={<ProtectedRoute allowedRoles={['INSTRUCTOR','ADMIN']}><InstructorDashboard /></ProtectedRoute>} />
        <Route path="/instructor/courses" element={<ProtectedRoute allowedRoles={['INSTRUCTOR','ADMIN']}><InstructorCourses /></ProtectedRoute>} />
        <Route path="/instructor/grading" element={<ProtectedRoute allowedRoles={['INSTRUCTOR','ADMIN']}><InstructorGrading /></ProtectedRoute>} />
        <Route path="/instructor/students" element={<ProtectedRoute allowedRoles={['INSTRUCTOR','ADMIN']}><InstructorStudents /></ProtectedRoute>} />
        <Route path="/instructor/profile" element={<ProtectedRoute allowedRoles={['INSTRUCTOR','ADMIN']}><InstructorProfile /></ProtectedRoute>} />

        {/* Admin Section (Quyền ADMIN) */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/instructors" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminInstructorsPage /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminCoursesPage /></ProtectedRoute>} />
        <Route path="/admin/lessons" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLessonsPage /></ProtectedRoute>} />
        <Route path="/admin/vocabulary" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminVocabPage /></ProtectedRoute>} />
        <Route path="/admin/blog" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminBlogPage /></ProtectedRoute>} />
        <Route path="/admin/notifications" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminNotificationsPage /></ProtectedRoute>} />
        <Route path="/admin/logs" element={<ProtectedRoute allowedRoles={['ADMIN']}><AuditLogsPage /></ProtectedRoute>} />
        <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
