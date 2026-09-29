import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Mail, Lock, Eye, EyeOff, User, GraduationCap, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import AppMascot from './AppMascot';

export default function RegisterModal({ isOpen, onClose }) {
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT'
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      setLoading(false);
      return;
    }

    const result = await register(formData);

    if (result.success) {
      setSuccessMsg(result.message || 'Đăng ký thành công! Đang chuyển hướng...');
      // Tự động đăng nhập sau khi đăng ký thành công
      setTimeout(async () => {
        const loginResult = await login(formData.email, formData.password);
        if (loginResult.success) {
          setLoading(false);
          onClose();
        } else {
          setError('Đăng ký xong nhưng không thể tự động đăng nhập. Vui lòng thử đăng nhập thủ công.');
          setLoading(false);
        }
      }, 1500);
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Box */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 animate-scale-up border border-slate-100 dark:border-slate-800">

        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors"
          title="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Form Area */}
        <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-center space-y-4">

          {/* Header */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <AppMascot className="w-8 h-8" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Tạo tài khoản mới
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Bắt đầu hành trình chinh phục tiếng Anh ngay hôm nay
            </p>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-[10px] text-red-600 dark:text-red-400 font-bold text-center animate-fade-in">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold text-center animate-fade-in">
              {successMsg}
            </div>
          )}

          {/* Role Selection Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'STUDENT' })}
              className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all text-[10px] font-bold ${
                formData.role === 'STUDENT'
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400'
                : 'bg-slate-50 border-slate-100 text-slate-500 dark:bg-slate-800 dark:border-slate-700'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Học viên</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'INSTRUCTOR' })}
              className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all text-[10px] font-bold ${
                formData.role === 'INSTRUCTOR'
                ? 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400'
                : 'bg-slate-50 border-slate-100 text-slate-500 dark:bg-slate-800 dark:border-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Giảng viên</span>
            </button>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            {/* Full Name */}
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="fullName"
                type="text"
                required
                placeholder="Họ và tên của bạn"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="email"
                type="email"
                required
                placeholder="Địa chỉ email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Mật khẩu (ít nhất 6 ký tự)"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Xác nhận lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#1E2540] hover:bg-[#151A30] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Đang xử lý...</span>
              ) : (
                <>
                  <span>ĐĂNG KÝ NGAY</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-1">
              <p className="text-[10px] text-slate-500 font-medium">
                Đã có tài khoản?{' '}
                <Link to="/login" onClick={onClose} className="text-indigo-600 font-bold hover:underline">
                  Đăng nhập tại đây
                </Link>
              </p>
            </div>
          </form>

          {/* Micro Footer Notes */}
          <div className="space-y-1 text-center">
            <p className="text-[10px] text-slate-400 leading-tight">
              Bằng cách đăng ký, bạn đồng ý với{' '}
              <a href="#" className="underline font-semibold hover:text-slate-600">
                Điều khoản
              </a>{' '}
              &{' '}
              <a href="#" className="underline font-semibold hover:text-slate-600">
                Chính sách bảo mật
              </a>
            </p>
          </div>

        </div>

        {/* Right Side: Cute Illustration Box */}
        <div className="hidden md:flex md:w-1/2 bg-[#F0F5FE] dark:bg-slate-800/80 p-8 flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute w-64 h-64 rounded-full bg-blue-200/40 dark:bg-indigo-900/20 blur-2xl pointer-events-none -top-10 -right-10" />

          {/* Speech Bubble */}
          <div className="relative mb-2 animate-bounce">
            <div className="bg-indigo-600 text-white font-black px-4 py-2 rounded-2xl rounded-bl-none text-xs shadow-md flex items-center gap-1">
              <span>Let's Go!</span>
            </div>
          </div>

          {/* Large Center Mascot */}
          <div className="relative z-10 my-2 transform hover:scale-105 transition-transform duration-300">
            <AppMascot className="w-48 h-48 drop-shadow-xl" />
          </div>

          <div className="mt-4 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-blue-100 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-[11px] font-black shadow-xs">
            ✨ EnglishHub Learning Community
          </div>
        </div>

      </div>
    </div>
  );
}
