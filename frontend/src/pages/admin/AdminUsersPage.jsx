import React, { useState } from 'react';
import { 
  Users, Search, Crown, UserX, UserCheck, 
  Check, GraduationCap, RefreshCw, Filter
} from 'lucide-react';

export default function AdminUsersPage() {
  const [students, setStudents] = useState([
    {
      id: 'stu-1',
      fullName: 'Trần Thu Hà',
      email: 'thuhapromember@gmail.com',
      role: 'STUDENT',
      isPro: true,
      proExpireDate: '2027-10-01',
      status: 'ACTIVE',
      joinedDate: '2026-01-15',
      level: 'Trình độ A2 (Sơ cấp)',
      completedLessons: 18
    },
    {
      id: 'stu-2',
      fullName: 'Lê Hoàng Nam',
      email: 'nampro123@gmail.com',
      role: 'STUDENT',
      isPro: false,
      status: 'ACTIVE',
      joinedDate: '2026-03-10',
      level: 'Trình độ B1 (Trung cấp)',
      completedLessons: 12
    },
    {
      id: 'stu-3',
      fullName: 'Phạm Thị Thảo',
      email: 'thaopham@gmail.com',
      role: 'STUDENT',
      isPro: true,
      proExpireDate: '2027-05-20',
      status: 'ACTIVE',
      joinedDate: '2026-02-01',
      level: 'Trình độ B2 (IELTS 6.0+)',
      completedLessons: 28
    },
    {
      id: 'stu-4',
      fullName: 'Vũ Quốc Khánh',
      email: 'khanhvu99@gmail.com',
      role: 'STUDENT',
      isPro: false,
      status: 'ACTIVE',
      joinedDate: '2026-03-15',
      level: 'Trình độ A1 (Người mới)',
      completedLessons: 5
    },
    {
      id: 'stu-5',
      fullName: 'Đỗ Mạnh Cường',
      email: 'cuongspam99@gmail.com',
      role: 'STUDENT',
      isPro: false,
      status: 'BLOCKED',
      joinedDate: '2026-04-02',
      level: 'Trình độ A2',
      blockReason: 'Spam bình luận tại cộng đồng'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'PRO' | 'FREE' | 'BLOCKED'
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter Students
  const filteredStudents = students.filter((s) => {
    const matchesSearch = 
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterType === 'ALL' ||
      (filterType === 'PRO' && s.isPro && s.status === 'ACTIVE') ||
      (filterType === 'FREE' && !s.isPro && s.status === 'ACTIVE') ||
      (filterType === 'BLOCKED' && s.status === 'BLOCKED');

    return matchesSearch && matchesFilter;
  });

  // Promote Student to Instructor
  const handlePromoteToInstructor = (student) => {
    if (window.confirm(`Bạn có muốn nâng cấp Học viên "${student.fullName}" lên vai trò Giảng viên không? (Tài khoản này sẽ chuyển sang trang Quản Lý Giảng Viên)`)) {
      setStudents((prev) => prev.filter((s) => s.id !== student.id));
      showToast(`Đã nâng cấp "${student.fullName}" thành Giảng viên! Đã chuyển sang Quản lý Giảng viên.`);
    }
  };

  // Toggle PRO status
  const handleTogglePro = (studentId) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const nextPro = !s.isPro;
          showToast(`Đã ${nextPro ? 'kích hoạt PRO' : 'hủy PRO'} cho học viên ${s.fullName}!`);
          return { ...s, isPro: nextPro, proExpireDate: nextPro ? '2027-12-31' : null };
        }
        return s;
      })
    );
  };

  // Toggle Block/Unban
  const handleToggleBlock = (studentId) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const isBlocked = s.status === 'BLOCKED';
          const nextStatus = isBlocked ? 'ACTIVE' : 'BLOCKED';
          showToast(`Đã ${isBlocked ? 'mở khóa' : 'khóa tài khoản học viên'} ${s.fullName}!`);
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  // Metrics
  const totalStudents = students.length;
  const proStudents = students.filter((s) => s.isPro && s.status === 'ACTIVE').length;
  const freeStudents = students.filter((s) => !s.isPro && s.status === 'ACTIVE').length;
  const blockedStudents = students.filter((s) => s.status === 'BLOCKED').length;

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
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Users className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span>Quản Lý Học Viên</span>
        </h1>
        <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
          Danh sách toàn bộ học viên đang theo học trên hệ thống EnglishHub.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">Tổng Học Viên</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{totalStudents} Học viên</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/40 shadow-xs space-y-1">
          <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold block uppercase tracking-wider flex items-center gap-1">
            <Crown className="w-4 h-4 text-amber-500" /> Học Viên PRO
          </span>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{proStudents} Học viên</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider">Học Viên Miễn Phí</span>
          <span className="text-2xl font-black text-slate-700 dark:text-slate-200 font-mono">{freeStudents} Học viên</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-rose-200 dark:border-rose-900/40 shadow-xs space-y-1">
          <span className="text-rose-500 text-xs font-bold block uppercase tracking-wider flex items-center gap-1">
            <UserX className="w-4 h-4" /> Đang bị khóa
          </span>
          <span className="text-2xl font-black text-rose-500 font-mono">{blockedStudents} Học viên</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email học viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          {[
            { key: 'ALL', label: 'Tất cả' },
            { key: 'PRO', label: 'Học viên PRO' },
            { key: 'FREE', label: 'Miễn phí' },
            { key: 'BLOCKED', label: 'Đang bị khóa' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                filterType === tab.key
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">Học viên</th>
                <th className="py-4 px-4">Trình độ & Tiến độ</th>
                <th className="py-4 px-4">Gói tài khoản</th>
                <th className="py-4 px-4">Trạng thái</th>
                <th className="py-4 px-4">Ngày tham gia</th>
                <th className="py-4 px-5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-bold">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  
                  {/* User info */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 font-black text-sm flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0 border border-slate-200 dark:border-slate-700">
                        {s.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                          {s.fullName}
                        </div>
                        <div className="text-slate-400 font-mono text-[11px]">
                          {s.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Level & Completed */}
                  <td className="py-4 px-4">
                    <div className="font-extrabold text-slate-900 dark:text-white">{s.level}</div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">Đã học: {s.completedLessons} bài</div>
                  </td>

                  {/* PRO Status */}
                  <td className="py-4 px-4">
                    {s.isPro ? (
                      <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1 w-fit shadow-xs">
                        <Crown className="w-3 h-3 fill-current" /> PRO Active
                      </span>
                    ) : (
                      <span className="text-slate-400 font-semibold text-[11px]">Tài khoản Miễn phí</span>
                    )}
                  </td>

                  {/* Account Status */}
                  <td className="py-4 px-4">
                    {s.status === 'ACTIVE' ? (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px]">
                        Hoạt động
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-500 font-extrabold text-[11px]">
                        Đang bị khóa
                      </span>
                    )}
                  </td>

                  {/* Joined Date */}
                  <td className="py-4 px-4 font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                    {s.joinedDate}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      
                      {/* Promote to Instructor Button */}
                      <button
                        onClick={() => handlePromoteToInstructor(s)}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/80 hover:bg-amber-100 text-amber-700 dark:text-amber-300 font-extrabold text-xs transition-colors flex items-center gap-1 border border-amber-300 dark:border-amber-800"
                        title="Nâng cấp học viên lên vai trò Giảng viên"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Nâng lên Giảng viên</span>
                      </button>

                      {/* Toggle PRO Button */}
                      <button
                        onClick={() => handleTogglePro(s.id)}
                        className={`p-1.5 rounded-xl border transition-colors ${
                          s.isPro
                            ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800'
                            : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-amber-500 dark:bg-slate-800 dark:border-slate-700'
                        }`}
                        title={s.isPro ? 'Hủy quyền PRO' : 'Cấp gói PRO thủ công'}
                      >
                        <Crown className="w-4 h-4 fill-current" />
                      </button>

                      {/* Block/Unban Button */}
                      <button
                        onClick={() => handleToggleBlock(s.id)}
                        className={`p-1.5 rounded-xl border transition-colors ${
                          s.status === 'BLOCKED'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40'
                            : 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/40'
                        }`}
                        title={s.status === 'BLOCKED' ? 'Mở khóa tài khoản' : 'Khóa tài khoản học viên'}
                      >
                        {s.status === 'BLOCKED' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
