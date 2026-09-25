import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Vui lòng nhập đầy đủ thông tin!');
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.success) {
        toast.success(response.data.message || 'Đăng nhập thành công!');
    
        // Sử dụng hàm login từ Context để cập nhật trạng thái toàn ứng dụng
        login(response.data.user, response.data.accessToken);

        // Điều hướng sau khi đăng nhập thành công
        navigate('/dashboard');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10">
        <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-500 mb-4 shadow-inner">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">English<span className="text-blue-500">Hub</span></h1>
            <p className="text-slate-400">Chào mừng bạn trở lại!</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">Mật khẩu</label>
                <a href="#" className="text-xs text-blue-500 hover:underline">Quên mật khẩu?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Đăng nhập
                  <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-400">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-blue-500 font-semibold hover:text-blue-400 inline-flex items-center gap-1 group">
                Đăng ký ngay
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
