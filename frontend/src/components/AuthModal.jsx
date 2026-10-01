import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppMascot from './AppMascot';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // States
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Helper for role redirection after login
  const redirectUserByRole = (loggedInUser) => {
    const role = loggedInUser?.role;
    if (role === 'INSTRUCTOR') {
      navigate('/instructor');
    } else if (role === 'ADMIN') {
      navigate('/admin');
    } else if (window.location.pathname === '/' || window.location.pathname === '/home') {
      navigate('/dashboard');
    }
  };

  // Reset or update mode when modal opens or initialMode changes
  useEffect(() => {
    setMode(initialMode);
    setError('');
    setSuccessMsg('');
  }, [initialMode, isOpen]);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isRegister = mode === 'register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    if (isRegister) {
      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp.');
        setLoading(false);
        return;
      }
      const result = await register({ fullName, email, password, role: 'STUDENT' });
      if (result.success) {
        setSuccessMsg(result.message || 'Đăng ký thành công! Đang tự động đăng nhập...');
        setTimeout(async () => {
          const loginResult = await login(email, password, true);
          setLoading(false);
          if (loginResult.success) {
            onClose();
            redirectUserByRole(loginResult.user);
          } else {
            setMode('login');
          }
        }, 1200);
      } else {
        setError(result.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        setLoading(false);
      }
    } else {
      const result = await login(email, password, rememberMe);
      if (result.success) {
        setLoading(false);
        onClose();
        redirectUserByRole(result.user);
      } else {
        setError(result.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        setLoading(false);
      }
    }
  };

  const handleSocialLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 400);
  };

  const switchMode = (targetMode) => {
    setError('');
    setSuccessMsg('');
    setMode(targetMode);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Box */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 animate-scale-up border border-slate-100 dark:border-slate-800">

        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Form Area */}
        <div className="p-8 sm:p-10 md:w-1/2 flex flex-col justify-center space-y-5">

          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="flex items-center justify-center gap-2.5">
              <AppMascot className="w-9 h-9" />
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {isRegister ? 'Tạo tài khoản mới' : 'Chào mừng trở lại'}
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {isRegister
                ? 'Bắt đầu hành trình chinh phục tiếng Anh ngay hôm nay'
                : 'Tiếp tục hành trình học tiếng Anh cùng EnglishHub'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-bold text-center animate-fade-in">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-xs text-emerald-600 dark:text-emerald-400 font-bold text-center animate-fade-in">
              {successMsg}
            </div>
          )}



          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name field (Register only) */}
            {isRegister && (
              <div className="relative">
                <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Họ và tên của bạn"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder={isRegister ? "Mật khẩu (ít nhất 6 ký tự)" : "Nhập mật khẩu"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Confirm Password (Register only) */}
            {isRegister && (
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Xác nhận lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
                />
              </div>
            )}

            {/* Remember Me & Forgot Password (Login only) */}
            {!isRegister && (
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Quên mật khẩu?</a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#1E2540] hover:bg-[#151A30] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Đang xử lý...</span>
              ) : (
                <>
                  <span>{isRegister ? 'ĐĂNG KÝ NGAY' : 'ĐĂNG NHẬP'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Mode Switcher Button */}
            <div className="text-center pt-1">
              <p className="text-xs text-slate-500 font-medium">
                {isRegister ? (
                  <>
                    Đã có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-indigo-600 font-bold hover:underline focus:outline-none"
                    >
                      Đăng nhập tại đây
                    </button>
                  </>
                ) : (
                  <>
                    Chưa có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('register')}
                      className="text-indigo-600 font-bold hover:underline focus:outline-none"
                    >
                      Đăng ký ngay
                    </button>
                  </>
                )}
              </p>
            </div>
          </form>

          {/* Micro Footer Notes */}
          <div className="pt-1 text-center">
            <p className="text-xs text-slate-400 leading-normal">
              Bằng cách {isRegister ? 'đăng ký' : 'đăng nhập'}, bạn đồng ý với{' '}
              <a href="#" className="underline font-semibold hover:text-slate-600">
                Điều khoản sử dụng
              </a>{' '}
              và{' '}
              <a href="#" className="underline font-semibold hover:text-slate-600">
                Chính sách bảo mật
              </a>{' '}
              của chúng tôi
            </p>
          </div>

        </div>

        {/* Right Side: Cute Illustration Box */}
        <div className="hidden md:flex md:w-1/2 bg-[#F0F5FE] dark:bg-slate-800/80 p-10 flex-col items-center justify-center relative overflow-hidden">
          {/* Subtle Background Decorative Circles */}
          <div className="absolute w-72 h-72 rounded-full bg-blue-200/40 dark:bg-indigo-900/20 blur-2xl pointer-events-none -top-10 -right-10" />
          <div className="absolute w-48 h-48 rounded-full border-4 border-blue-200/50 dark:border-slate-700 pointer-events-none top-8 right-8" />

          {/* Speech Bubble */}
          <div className="relative mb-3 animate-bounce">
            <div className="bg-amber-400 text-slate-900 font-black px-5 py-2.5 rounded-2xl rounded-bl-none text-sm shadow-md shadow-amber-400/30 flex items-center gap-1">
              <span>{isRegister ? "Let's Go!" : "Hi...."}</span>
            </div>
          </div>

          {/* Large Center Mascot */}
          <div className="relative z-10 my-3 transform hover:scale-105 transition-transform duration-300">
            <AppMascot className="w-56 h-56 drop-shadow-xl" />
          </div>

          {/* Sub text badge */}
          <div className="mt-5 px-5 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-blue-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-extrabold shadow-sm">
            ✨ EnglishHub Speech & AI Coach
          </div>
        </div>

      </div>
    </div>
  );
}
