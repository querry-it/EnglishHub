import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ArrowRight, Eye, EyeOff, GraduationCap, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'STUDENT'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { fullName, email, password, role } = formData;

    if (!fullName || !email || !password || !role) {
      return toast.error('Vui lòng điền đầy đủ thông tin!');
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/register', formData);
      if (response.data.success) {
        toast.success('Đăng ký thành công! Hãy đăng nhập.');
        navigate('/login');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Đăng ký thất bại!';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-lg z-10">
        <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Bắt đầu ngay</h1>
            <p className="text-slate-400">Tạo tài khoản EnglishHub của bạn</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'STUDENT' })}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  formData.role === 'STUDENT'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-500'
                  : 'bg-slate-900/50 border-slate-700 text-slate-500 hover:border-slate-500'
                }`}
              >
                <GraduationCap size={24} />
                <span className="text-xs font-semibold">Học viên</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'INSTRUCTOR' })}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  formData.role === 'INSTRUCTOR'
                  ? 'bg-purple-600/20 border-purple-500 text-purple-500'
                  : 'bg-slate-900/50 border-slate-700 text-slate-500 hover:border-slate-500'
                }`}
              >
                <Users size={24} />
                <span className="text-xs font-semibold">Giảng viên</span>
              </button>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300 ml-1">Họ và tên</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300 ml-1">Mật khẩu</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] disabled:opacity-70 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Tạo tài khoản
                  <UserPlus size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-400">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-blue-500 font-semibold hover:text-blue-400 inline-flex items-center gap-1 group">
                Đăng nhập
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
