import React, { useState } from 'react';
import { 
  GraduationCap, Search, CheckCircle2, Award, BookOpen, 
  Users, Star, Plus, ShieldCheck, Mail, Check, X, Eye, ArrowUpRight
} from 'lucide-react';

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState([
    {
      id: 'inst-1',
      fullName: 'Phạm Thị Lan',
      email: 'lan.english@gmail.com',
      certificates: ['IELTS 8.5', 'TESOL Certificate', 'MA in Linguistics'],
      coursesCount: 5,
      studentsCount: 3420,
      rating: 4.9,
      status: 'VERIFIED', // 'VERIFIED' | 'PENDING'
      joinedDate: '2025-11-05',
      bio: 'Chuyên gia luyện thi IELTS 8.5 với 8 năm kinh nghiệm giảng dạy Writing & Speaking.'
    },
    {
      id: 'inst-2',
      fullName: 'Nguyễn Văn Minh',
      email: 'minhproielts@gmail.com',
      certificates: ['TOEIC 990', 'CELTA Cambridge'],
      coursesCount: 3,
      studentsCount: 1850,
      rating: 4.8,
      status: 'VERIFIED',
      joinedDate: '2025-08-20',
      bio: 'Giảng viên chuyên luyện thi TOEIC 900+ và Giao tiếp Tiếng Anh công sở.'
    },
    {
      id: 'inst-3',
      fullName: 'Trịnh Đức Huy',
      email: 'huy.trinh.ielts@gmail.com',
      certificates: ['IELTS 8.0'],
      coursesCount: 1,
      studentsCount: 420,
      rating: 4.7,
      status: 'PENDING',
      joinedDate: '2026-03-25',
      bio: 'Cựu du học sinh Anh Quốc, chuyên gia hướng dẫn kỹ năng Nghe - Đọc Academic.'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstructorForPreview, setSelectedInstructorForPreview] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleVerifyInstructor = (id) => {
    setInstructors((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, status: 'VERIFIED' } : inst
      )
    );
    showToast('Đã xác thực bằng cấp & hồ sơ Giảng viên thành công!');
  };

  const handleRevokeInstructor = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn thu hồi quyền Giảng viên của ${name} về vai trò Học viên?`)) {
      setInstructors((prev) => prev.filter((inst) => inst.id !== id));
      showToast(`Đã hạ quyền Giảng viên của ${name} thành công.`);
    }
  };

  const filteredInstructors = instructors.filter(
    (inst) =>
      inst.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalInstructors = instructors.length;
  const verifiedCount = instructors.filter((i) => i.status === 'VERIFIED').length;
  const pendingCount = instructors.filter((i) => i.status === 'PENDING').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 font-extrabold text-xs flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-8 h-8 text-amber-500" />
            <span>Quản Lý Giảng Viên & Chứng Chỉ</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
            Xác thực hồ sơ giảng viên, duyệt chứng chỉ IELTS/TESOL & quản lý danh sách giáo viên.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">Tổng Đội Nguồn Giảng Viên</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{totalInstructors} Giảng viên</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-emerald-200 dark:border-emerald-900/40 shadow-xs space-y-1">
          <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold block uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Đã xác thực bằng cấp
          </span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{verifiedCount} Giảng viên</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-xs space-y-1">
          <span className="text-amber-600 dark:text-amber-400 text-xs font-bold block uppercase tracking-wider flex items-center gap-1">
            <Award className="w-4 h-4" /> Đang chờ duyệt hồ sơ
          </span>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">{pendingCount} Hồ sơ</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Tìm theo tên giảng viên hoặc email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
          />
        </div>
      </div>

      {/* Instructors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredInstructors.map((inst) => (
          <div
            key={inst.id}
            className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950 font-black text-lg flex items-center justify-center shadow-md">
                    {inst.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900 dark:text-white leading-tight">
                      {inst.fullName}
                    </h3>
                    <p className="text-xs font-mono text-slate-400">{inst.email}</p>
                  </div>
                </div>

                {inst.status === 'VERIFIED' ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-extrabold text-[10px] flex items-center gap-1 border border-emerald-300">
                    <ShieldCheck className="w-3 h-3" /> Đã xác thực
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 font-extrabold text-[10px]">
                    Chờ duyệt bằng
                  </span>
                )}
              </div>

              {/* Certificates badges */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {inst.certificates.map((cert, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-black text-[10px] flex items-center gap-1"
                  >
                    <Award className="w-3 h-3 text-amber-500" /> {cert}
                  </span>
                ))}
              </div>

              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {inst.bio}
              </p>
            </div>

            {/* Metrics Footer & Actions */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-indigo-500" /> {inst.coursesCount} Khóa học</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4 text-sky-500" /> {inst.studentsCount} Học viên</span>
                <span className="flex items-center gap-1 text-amber-500 font-black"><Star className="w-4 h-4 fill-current" /> {inst.rating}</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                {inst.status === 'PENDING' && (
                  <button
                    onClick={() => handleVerifyInstructor(inst.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-md"
                  >
                    XÁC THỰC BẰNG CẤP
                  </button>
                )}

                <button
                  onClick={() => handleRevokeInstructor(inst.id, inst.fullName)}
                  className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-extrabold text-xs hover:bg-rose-100 transition-colors"
                  title="Hạ quyền về vai trò Học viên"
                >
                  Hạ quyền
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
