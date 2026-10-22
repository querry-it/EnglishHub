import React, { useState, useEffect, useCallback } from 'react';
import { 
  GraduationCap, Search, CheckCircle2, Award, BookOpen, 
  Users, Star, ShieldCheck, Mail, Check, X, RefreshCw,
  MoreVertical, UserMinus, UserCheck, Shield
} from 'lucide-react';
import api from '../../api/axios';

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'VERIFIED' | 'PENDING'
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchInstructors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users', {
        params: {
          role: 'INSTRUCTOR',
          status: statusFilter === 'ALL' ? undefined : (statusFilter === 'VERIFIED' ? 'ACTIVE' : 'BLOCKED')
        }
      });
      if (response.data.success) {
        setInstructors(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching instructors:', error);
      showToast('Không thể tải danh sách giảng viên');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  const handleToggleStatus = async (instructor) => {
    try {
      const nextStatus = !instructor.isActive;
      await api.patch(`/admin/users/${instructor.id}/status`,
        { isActive: nextStatus }
      );

      setInstructors((prev) =>
        prev.map((inst) => (inst.id === instructor.id ? { ...inst, isActive: nextStatus } : inst))
      );
      showToast(`Đã ${nextStatus ? 'kích hoạt' : 'tạm ngưng'} quyền giảng viên của ${instructor.fullName}`);
    } catch (error) {
      console.error('Error toggling status:', error);
      showToast('Lỗi khi cập nhật trạng thái');
    }
  };

  const filteredInstructors = instructors.filter(
    (inst) =>
      inst.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: instructors.length,
    active: instructors.filter(i => i.isActive).length,
    blocked: instructors.filter(i => !i.isActive).length,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full pb-20 animate-in fade-in duration-500">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-2xl border border-slate-700 font-bold text-sm flex items-center gap-3 animate-in slide-in-from-bottom-4">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-2xl shadow-lg shadow-amber-200 dark:shadow-none">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            Quản Lý Giảng Viên
          </h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-1">
            Xác thực hồ sơ, quản lý quyền hạn và theo dõi chất lượng giảng dạy.
          </p>
        </div>

        <button
          onClick={fetchInstructors}
          className="group flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-300 hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 transition-transform group-hover:rotate-180 ${loading ? 'animate-spin' : ''}`} />
          LÀM MỚI DỮ LIỆU
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Tổng giảng viên', value: stats.total, icon: GraduationCap, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
          { label: 'Đang hoạt động', value: stats.active, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
          { label: 'Tạm ngưng', value: stats.blocked, icon: X, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/30' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${item.bg} rounded-3xl flex items-center justify-center`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email giảng viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-amber-500 focus:bg-white transition-all text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full lg:w-auto">
          {['ALL', 'VERIFIED', 'PENDING'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`flex-1 lg:flex-none px-6 py-2 rounded-xl text-xs font-black transition-all ${
                statusFilter === tab
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab === 'ALL' ? 'Tất cả' : tab === 'VERIFIED' ? 'Đã xác thực' : 'Chờ duyệt'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] h-64 animate-pulse border-2 border-transparent" />
          ))
        ) : filteredInstructors.length === 0 ? (
          <div className="col-span-full py-20 text-center">
             <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold text-sm">Không tìm thấy giảng viên nào</p>
            </div>
          </div>
        ) : (
          filteredInstructors.map((inst) => (
            <div
              key={inst.id}
              className="group bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-amber-400 to-amber-600 text-white font-black text-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {inst.fullName.charAt(0)}
                  </div>
                  {inst.isActive && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                    inst.isActive
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-rose-50 text-rose-600'
                  }`}>
                    {inst.isActive ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight group-hover:text-amber-600 transition-colors">
                  {inst.fullName}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                  <Mail className="w-3.5 h-3.5" />
                  {inst.email}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Khóa học</p>
                  <p className="text-sm font-black text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    {inst.enrolledCourses?.length || 0}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Học viên</p>
                  <p className="text-sm font-black text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-sky-500" />
                    {inst.studentsCount || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(inst)}
                  className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    inst.isActive
                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white'
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                  }`}
                >
                  {inst.isActive ? 'Tạm ngưng quyền' : 'Kích hoạt lại'}
                </button>
                <button className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
