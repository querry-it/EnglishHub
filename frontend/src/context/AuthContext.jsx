import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi chạy
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  // Các hàm Mock để test giao diện (Đã cập nhật Role theo chuẩn Backend)
  const loginAsAdmin = () => {
    const admin = { id: 99, fullName: 'Admin', role: 'ADMIN', isApproved: true };
    login(admin, 'mock-admin-token');
    return admin;
  };

  const loginAsTeacher = () => {
    const teacher = { id: 50, fullName: 'Instructor Alex', role: 'INSTRUCTOR', isApproved: true };
    login(teacher, 'mock-teacher-token');
    return teacher;
  };

  const updateProfile = (updates) => {
    setUser(prev => {
      const newUser = prev ? { ...prev, ...updates } : null;
      if (newUser) localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{
      user, loading, isAuthenticated: !!user,
      login, logout, loginAsAdmin, loginAsTeacher, updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
