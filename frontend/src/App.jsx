import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import AppLayout from './components/AppLayout';

import Home from './pages/Home';
import Listening from './pages/Listening';
import Pronunciation from './pages/Pronunciation';
import Vocabulary from './pages/Vocabulary';
import Speaking from './pages/Speaking';
import Exams from './pages/Exams';
import Games from './pages/Games';
import Login from './pages/Login';

import Courses from './pages/Courses';
import Community from './pages/Community';
import Chat from './pages/Chat';
import Feedbacks from './pages/Feedbacks';
import Shop from './pages/Shop';
import Pricing from './pages/Pricing';

// User Pages
import Dashboard from './pages/user/Dashboard';
import Leaderboard from './pages/user/Leaderboard';
import Cart from './pages/user/Cart';
import LearningWorkspace from './pages/user/LearningWorkspace';
import MyNotes from './pages/user/MyNotes';
import MyVocabulary from './pages/user/MyVocabulary';
import Profile from './pages/user/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

import { useAuth } from './context/AuthContext';
import LoginModal from './components/LoginModal';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const { isLoginModalOpen, closeLoginModal, loading, user } = useAuth();

  const isPublicPage = ['/intro', '/welcome', '/login', '/register'].includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1120]">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Trang Public (Intro, Login, Register)
  if (isPublicPage) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
        <AppHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/intro" element={<Home />} />
            <Route path="/welcome" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="*" element={<Navigate to="/intro" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }

  // Trang Dashboard/Học tập (Đã đăng nhập)
  return (
    <AppLayout>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <Routes>
        {/* Core App Routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Learning Features */}
        <Route path="/listening" element={<ProtectedRoute><Listening /></ProtectedRoute>} />
        <Route path="/dictation" element={<ProtectedRoute><Listening /></ProtectedRoute>} />
        <Route path="/pronunciation" element={<ProtectedRoute><Pronunciation /></ProtectedRoute>} />
        <Route path="/vocabulary" element={<ProtectedRoute><Vocabulary /></ProtectedRoute>} />
        <Route path="/speaking" element={<ProtectedRoute><Speaking /></ProtectedRoute>} />
        <Route path="/exams" element={<ProtectedRoute><Exams /></ProtectedRoute>} />
        <Route path="/games" element={<ProtectedRoute><Games /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />

        {/* Community & Tools */}
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/feedbacks" element={<ProtectedRoute><Feedbacks /></ProtectedRoute>} />
        <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />

        {/* User Account */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/workspace" element={<ProtectedRoute><LearningWorkspace /></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><LearningWorkspace /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/my-notes" element={<ProtectedRoute><MyNotes /></ProtectedRoute>} />
        <Route path="/my-vocabulary" element={<ProtectedRoute><MyVocabulary /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

        {/* Admin Section */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Instructor Section */}
        <Route
          path="/instructor/*"
          element={
            <ProtectedRoute allowedRoles={['INSTRUCTOR', 'ADMIN']}>
              <div className="p-8 text-slate-800 dark:text-white font-bold">Trang quản lý giảng viên (Đang phát triển)</div>
            </ProtectedRoute>
          }
        />

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
