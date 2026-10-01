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
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        // Dữ liệu hỏng → xóa đi
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    }
    // Nếu không có token → user = null (chưa đăng nhập)
    setLoading(false);
  }, []);

  const handleAuthSuccess = (userData, token, rememberMe = true) => {
    setUser(userData);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(userData));
    storage.setItem('accessToken', token);
  };

  // Đăng nhập bằng API backend thật
  const login = async (email, password, rememberMe = true) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        handleAuthSuccess(response.data.user, response.data.accessToken, rememberMe);
        return { success: true, user: response.data.user };
      }
      return { success: false, message: 'Đăng nhập thất bại.' };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      };
    }
  };

  // Đăng ký
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success) {
        return { success: true, message: response.data.message };
      }
      return { success: false, message: 'Đăng ký thất bại.' };
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      };
    }
  };

  // Đăng xuất
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
      window.location.href = '/';
    }
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
      login, register, logout, updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
