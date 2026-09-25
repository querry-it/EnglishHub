import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';

// EnglishHub Pages
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

function AppContent() {
  const location = useLocation();
  const { isLoginModalOpen, closeLoginModal } = useAuth();

  const isIntroPage = ['/intro', '/welcome'].includes(location.pathname);
  const showHeaderFooter = isIntroPage;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      {showHeaderFooter && <Header />}
      <main className={showHeaderFooter ? 'flex-1' : ''}>
        <Routes>
          {/* Core App Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/intro" element={<Home />} />
          <Route path="/welcome" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/dictation" element={<Listening />} />
          <Route path="/pronunciation" element={<Pronunciation />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/games" element={<Games />} />

          {/* Sidebar & App Feature Routes */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/community" element={<Community />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/feedbacks" element={<Feedbacks />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<Community />} />
          <Route path="/contact" element={<Dashboard />} />
          <Route path="/roadmaps" element={<Dashboard />} />
          <Route path="/faq" element={<Dashboard />} />
          <Route path="/terms" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />

          {/* User Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/workspace" element={<LearningWorkspace />} />
          <Route path="/review" element={<LearningWorkspace />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/my-notes" element={<MyNotes />} />
          <Route path="/my-vocabulary" element={<MyVocabulary />} />
          <Route path="/cart" element={<Cart />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
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
