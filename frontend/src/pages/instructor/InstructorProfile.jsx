import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Mail, Shield, Award, BookOpen, Users, Star, DollarSign,
  Save, Camera, CheckCircle2, Lock, Sparkles, GraduationCap, Check
} from 'lucide-react';
import AppMascot from '../../components/AppMascot';

export default function InstructorProfile() {
  const { user, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || 'Khánh An');
  const [email] = useState(user?.email || 'instructor@englishhub.edu.vn');
  const [bio, setBio] = useState('Giảng viên Tiếng Anh chuyên luyện thi IELTS & TOEIC với 6+ năm kinh nghiệm giảng dạy tại các trung tâm quốc tế.');
  const [specialization, setSpecialization] = useState('IELTS 8.5 • TESOL Certified • TOEIC 990');
  const [phone, setPhone] = useState('0987 654 321');
  const [saveToast, setSaveToast] = useState(false);
  const [avatarPhoto, setAvatarPhoto] = useState(null);

  const stats = [
    { label: 'Khóa học đã tạo', value: '12', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800' },
    { label: 'Tổng số học viên', value: '1,420', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800' },
    { label: 'Đánh giá trung bình', value: '4.9 ⭐', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800' },
    { label: 'Doanh thu tháng', value: '35.8M₫', icon: DollarSign, color: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800' },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (updateProfile) {
      updateProfile({ fullName, bio, specialization, phone });
    }
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="font-extrabold text-sm">Đã cập nhật hồ sơ giảng viên thành công!</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-900 via-amber-950 to-slate-900 p-6 rounded-3xl text-white border-2 border-amber-800/50 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <GraduationCap className="w-4 h-4" /> Giảng viên Đã xác thực
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mt-2">
            Hồ sơ Giảng viên & Cài đặt Tài khoản
          </h1>
          <p className="text-xs text-amber-200/80 font-semibold">
            Quản lý thông tin cá nhân, chuyên môn và thiết lập thông số giảng dạy trên hệ thống EnglishHub.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <AppMascot className="w-16 h-16 animate-pulse" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-2 hover:border-amber-300 transition-all">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl ${stat.bg} border flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Content Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <User className="w-5 h-5 text-amber-500" /> Thông tin Giảng viên
            </h3>

            {/* Avatar Upload */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-stone-700 text-white flex items-center justify-center font-black text-4xl border-4 border-amber-400 shadow-md overflow-hidden">
                  {avatarPhoto ? (
                    <img src={avatarPhoto} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    fullName.charAt(0).toUpperCase() || 'G'
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2 rounded-full bg-amber-500 text-slate-950 border-2 border-white dark:border-slate-800 cursor-pointer hover:bg-amber-400 transition-transform hover:scale-110 shadow-md">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setAvatarPhoto(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </label>
              </div>
              <div className="text-center">
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{fullName}</h4>
                <p className="text-xs text-slate-400 font-medium">{email}</p>
              </div>
            </div>

            {/* Badges / Specialization tags */}
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-amber-900 dark:text-amber-300">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Chứng chỉ & Trình độ chuyên môn</span>
              </div>
              <p className="text-xs font-bold text-amber-800 dark:text-amber-400 leading-relaxed">
                {specialization}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-amber-500" /> Chỉnh sửa hồ sơ
            </h3>

            {/* Full Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Họ và Tên Giảng viên
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            {/* Email (Readonly) */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Email đăng nhập
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 font-medium text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Số điện thoại liên hệ
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Nhập số điện thoại"
              />
            </div>

            {/* Specialization Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Chứng chỉ & Trình độ chuyên môn
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="VD: IELTS 8.5, TESOL, TOEIC 990..."
              />
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Mô tả kinh nghiệm & Giới thiệu bản thân
              </label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                placeholder="Mô tả kinh nghiệm giảng dạy..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <Save className="w-4 h-4" />
                <span>LƯU THAY ĐỔI HỒ SƠ</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
