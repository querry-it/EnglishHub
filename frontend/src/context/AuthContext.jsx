import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Mock login
  const login = (email, password) => {
    const mockUser = {
      id: 1,
      name: 'Nguyễn Nhật Trình',
      email: email || 'user@englishhub.app',
      avatar: '👨‍💻',
      role: 'student', // student | teacher | admin
      level: 'B2',
      goal: 'ielts',
      xp: 2450,
      coins: 180,
      streak: 12,
      joinDate: '2026-06-15',
      coursesEnrolled: [1, 2, 5],
      badges: ['early_bird', 'streak_7', 'quiz_master'],
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    closeLoginModal();
    return mockUser;
  };

  const loginAsAdmin = () => {
    const admin = {
      id: 99,
      name: 'Admin EnglishHub',
      email: 'admin@englishhub.app',
      avatar: '👑',
      role: 'admin',
      level: 'C2',
      goal: 'admin',
      xp: 99999,
      coins: 9999,
      streak: 365,
      joinDate: '2025-01-01',
      coursesEnrolled: [],
      badges: ['admin', 'founder'],
    };
    setUser(admin);
    setIsAuthenticated(true);
    closeLoginModal();
    return admin;
  };

  const loginAsTeacher = () => {
    const teacher = {
      id: 50,
      name: 'Mr. David Wilson',
      email: 'david@englishhub.app',
      avatar: '👨‍🏫',
      role: 'teacher',
      level: 'C2',
      goal: 'teaching',
      xp: 15000,
      coins: 5000,
      streak: 90,
      joinDate: '2025-06-01',
      coursesEnrolled: [],
      badges: ['teacher', 'top_rated'],
    };
    setUser(teacher);
    setIsAuthenticated(true);
    closeLoginModal();
    return teacher;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updates) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, isLoginModalOpen, openLoginModal, closeLoginModal,
      login, logout, loginAsAdmin, loginAsTeacher, updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
