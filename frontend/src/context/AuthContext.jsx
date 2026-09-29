import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi chạy
  useEffect(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (userData, token, rememberMe) => {
    setUser(userData);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(userData));
    storage.setItem('accessToken', token);
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        handleAuthSuccess(response.data.user, response.data.accessToken, rememberMe);
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success) {
        // Sau khi đăng ký thành công, có thể tự động đăng nhập hoặc yêu cầu user đăng nhập lại
        // Ở đây backend trả về user, ta có thể gọi login luôn nếu backend trả về token
        // Tuy nhiên authController.js register chỉ trả về user.
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('accessToken');
      window.location.href = '/home';
    }
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
      isLoginModalOpen, openLoginModal, closeLoginModal,
      login, register, logout, loginAsAdmin, loginAsTeacher, updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
