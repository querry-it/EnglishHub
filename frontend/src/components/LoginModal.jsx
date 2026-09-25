import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppMascot from './AppMascot';

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email || 'student@englishhub.app');
      setLoading(false);
      onClose();
    }, 400);
  };

  const handleSocialLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('google.user@englishhub.app');
      setLoading(false);
      onClose();
    }, 400);
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
                Chào mừng trở lại
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Tiếp tục hành trình học tiếng Anh cùng EnglishHub
            </p>
          </div>

          {/* Social Logins */}
          <div className="space-y-2 pt-1">
            {/* Google Button */}
            <button
              onClick={handleSocialLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2.5 text-xs font-bold transition-all shadow-2xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Tiếp tục với Google</span>
            </button>

            {/* Apple Button */}
            <button
              onClick={handleSocialLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-black text-white hover:bg-slate-900 flex items-center justify-center gap-2.5 text-xs font-bold transition-all shadow-2xs"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.63c.66-.8 1.11-1.92.99-3.03-.96.04-2.12.64-2.8 1.44-.61.71-1.14 1.86-1 2.97 1.08.08 2.16-.58 2.81-1.38z" />
              </svg>
              <span>Tiếp tục với Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-1 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <span className="relative bg-white dark:bg-slate-900 px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              HOẶC TIẾP TỤC VỚI
            </span>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#1E2540] hover:bg-[#151A30] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Đang kết nối...</span>
              ) : (
                <>
                  <span>TIẾP TỤC VỚI EMAIL</span>
                </>
              )}
            </button>
          </form>

          {/* Micro Footer Notes */}
          <div className="space-y-1.5 pt-1 text-center">
            <p className="text-[10px] text-slate-400 leading-normal font-medium">
              Nếu bạn gặp khó khăn khi đăng nhập bằng Google hoặc Apple, hãy thử đăng nhập bằng email
            </p>
            <p className="text-[10px] text-slate-400 leading-normal">
              Bằng cách đăng nhập, bạn đồng ý với{' '}
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
        <div className="hidden md:flex md:w-1/2 bg-[#F0F5FE] dark:bg-slate-800/80 p-8 flex-col items-center justify-center relative overflow-hidden">
          {/* Subtle Background Decorative Circles */}
          <div className="absolute w-64 h-64 rounded-full bg-blue-200/40 dark:bg-indigo-900/20 blur-2xl pointer-events-none -top-10 -right-10" />
          <div className="absolute w-40 h-40 rounded-full border-4 border-blue-200/50 dark:border-slate-700 pointer-events-none top-8 right-8" />
          
          {/* Speech Bubble */}
          <div className="relative mb-2 animate-bounce">
            <div className="bg-amber-400 text-slate-900 font-black px-4 py-2 rounded-2xl rounded-bl-none text-xs shadow-md shadow-amber-400/30 flex items-center gap-1">
              <span>Hi....</span>
            </div>
          </div>

          {/* Large Center Mascot */}
          <div className="relative z-10 my-2 transform hover:scale-105 transition-transform duration-300">
            <AppMascot className="w-48 h-48 drop-shadow-xl" />
          </div>

          {/* Sub text badge */}
          <div className="mt-4 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-blue-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-bold shadow-xs">
            ✨ EnglishHub Speech & AI Coach
          </div>
        </div>

      </div>
    </div>
  );
}
