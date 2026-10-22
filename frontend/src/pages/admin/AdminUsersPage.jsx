import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, Search, UserX, UserCheck,
  Check, RefreshCw, BookOpen,
  Mail, X, FileSpreadsheet, FileText,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import api from '../../api/axios';
import { exportToCSV, exportToDOC } from '../../utils/exportUtils';

export default function AdminUsersPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'BLOCKED'
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedUserCourses, setSelectedUserCourses] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      // Sử dụng instance 'api' thay vì axios thuần để tự động đính kèm Token và xử lý Refresh
      const response = await api.get('/admin/users', {
        params: {
          role: 'STUDENT',
          status: statusFilter === 'ALL' ? undefined : statusFilter
        }
      });
      if (response.data.success) {
        setStudents(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast('Không thể tải danh sách học viên');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleBlock = async (student) => {
    try {
      const nextStatus = !student.isActive;
      await api.patch(`/admin/users/${student.id}/status`,
        { isActive: nextStatus }
      );

      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? { ...s, isActive: nextStatus } : s))
      );
      showToast(`Đã ${nextStatus ? 'mở khóa' : 'khóa'} tài khoản ${student.fullName}`);
    } catch (error) {
      console.error('Error toggling block status:', error);
      showToast('Lỗi khi cập nhật trạng thái');
    }
  };

  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Xuất file CSV
  const handleExportCSV = () => {
    if (filteredStudents.length === 0) {
      showToast('⚠️ Không có dữ liệu học viên để xuất file!');
      return;
    }
    const headers = ['Mã học viên', 'Họ và tên', 'Email', 'Trình độ', 'Số khóa học', 'Danh sách khóa học', 'Trạng thái'];
    const rows = filteredStudents.map(s => [
      s.id,
      s.fullName,
      s.email,
      s.level,
      s.enrolledCourses?.length || 0,
      (s.enrolledCourses || []).join('; '),
      s.isActive ? 'Đang hoạt động' : 'Đang bị khóa'
    ]);
    exportToCSV({
      filename: 'danh_sach_hoc_vien',
      headers,
      rows
    });
    showToast('Đã xuất file CSV thành công!');
  };

  // Xuất file DOC
  const handleExportDOC = () => {
    if (filteredStudents.length === 0) {
      showToast('⚠️ Không có dữ liệu học viên để xuất file!');
      return;
    }
    const headers = ['STT', 'Họ và tên', 'Email', 'Trình độ', 'Khóa học', 'Trạng thái'];
    const rows = filteredStudents.map((s, idx) => [
      idx + 1,
      s.fullName,
      s.email,
      `Level ${s.level}`,
      (s.enrolledCourses || []).join(', ') || 'Chưa đăng ký',
      s.isActive ? 'Hoạt động' : 'Bị khóa'
    ]);
    exportToDOC({
      filename: 'bao_cao_hoc_vien',
      title: 'BÁO CÁO THỐNG KÊ DANH SÁCH HỌC VIÊN',
      subtitle: 'Báo cáo trích xuất từ phân hệ Quản trị viên EnglishHub',
      statsSummary: [
        { label: 'Tổng số học viên', value: stats.total },
        { label: 'Tài khoản hoạt động', value: stats.active },
        { label: 'Tài khoản bị khóa', value: stats.blocked },
        { label: 'Đang theo học', value: stats.learning }
      ],
      headers,
      rows
    });
    showToast('Đã xuất file Word (.doc) thành công!');
  };

  // Stats
  const stats = {
    total: students.length,
    active: students.filter(s => s.isActive).length,
    blocked: students.filter(s => !s.isActive).length,
    learning: students.filter(s => s.enrolledCourses?.length > 0).length
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

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <Users className="w-7 h-7 text-white" />
            </div>
            Quản Lý Học Viên
          </h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-1">
            Theo dõi tiến độ, quản lý quyền truy cập và khóa học của học viên.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Nút Xuất CSV */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-xs"
            title="Xuất danh sách học viên dạng bảng tính Excel / CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Xuất CSV</span>
          </button>

          {/* Nút Xuất Word .DOC */}
          <button
            onClick={handleExportDOC}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-xs"
            title="Xuất báo cáo học viên kèm chỉ số dạng Microsoft Word (.doc)"
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Xuất Word (.DOC)</span>
          </button>

          <button
            onClick={fetchUsers}
            className="group flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 transition-transform group-hover:rotate-180 ${loading ? 'animate-spin' : ''}`} />
            <span>LÀM MỚI</span>
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Tổng học viên', value: stats.total, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
          { label: 'Đang hoạt động', value: stats.active, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
          { label: 'Đã đăng ký học', value: stats.learning, icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
          { label: 'Đang bị khóa', value: stats.blocked, icon: UserX, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/30' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
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

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email học viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full lg:w-auto">
          {[
            { key: 'ALL', label: 'Tất cả' },
            { key: 'ACTIVE', label: 'Hoạt động' },
            { key: 'BLOCKED', label: 'Bị khóa' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`flex-1 lg:flex-none px-6 py-2 rounded-xl text-xs font-black transition-all ${
                statusFilter === tab.key
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-black uppercase tracking-widest text-slate-400">
                <th className="py-6 px-8">Thông tin học viên</th>
                <th className="py-6 px-6">Cấp độ</th>
                <th className="py-6 px-6">Khóa học tham gia</th>
                <th className="py-6 px-6">Trạng thái</th>
                <th className="py-6 px-8 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {loading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                          <div className="h-3 w-44 bg-slate-100 dark:bg-slate-800/50 rounded-lg" />
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="h-4 w-20 bg-slate-100 dark:bg-slate-800 rounded-lg" />
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
                        <div className="h-6 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="h-7 w-20 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex justify-end">
                        <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-slate-400 font-bold text-sm">Không tìm thấy học viên nào phù hợp yêu cầu</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((s) => (
                  <tr key={s.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {s.avatarUrl ? (
                            <img src={s.avatarUrl} alt="" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800" />
                          ) : (
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black text-lg flex items-center justify-center shadow-md">
                              {s.fullName.charAt(0)}
                            </div>
                          )}
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${s.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white text-[15px]">{s.fullName}</p>
                          <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] mt-0.5">
                            <Mail className="w-3 h-3" />
                            {s.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl text-[11px] font-black uppercase">
                        Cấp độ {s.level}
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {s.enrolledCourses?.length > 0 ? (
                          <>
                            {s.enrolledCourses.slice(0, 2).map((course, i) => (
                              <span key={i} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-bold truncate max-w-[120px]">
                                {course}
                              </span>
                            ))}
                            {s.enrolledCourses.length > 2 && (
                              <button
                                onClick={() => setSelectedUserCourses({ name: s.fullName, courses: s.enrolledCourses })}
                                className="px-2.5 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg text-[10px] font-black hover:scale-105 transition-transform"
                              >
                                +{s.enrolledCourses.length - 2}
                              </button>
                            )}
                          </>
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600 text-[10px] font-bold italic">Chưa đăng ký</span>
                        )}
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                        s.isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-100 dark:border-emerald-900'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-100 dark:border-rose-900'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${s.isActive ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                        {s.isActive ? 'Hoạt động' : 'Đang bị khóa'}
                      </span>
                    </td>

                    <td className="py-5 px-8 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleToggleBlock(s)}
                          className={`p-2.5 rounded-xl border-2 transition-all ${
                            !s.isActive
                              ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                              : 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white'
                          }`}
                          title={!s.isActive ? 'Mở khóa tài khoản' : 'Khóa tài khoản học viên'}
                        >
                          {!s.isActive ? <UserCheck className="w-5 h-5" /> : <UserX className="w-5 h-5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Thanh Phân Trang (Pagination Bar) */}
        {filteredStudents.length > 0 && (
          <div className="px-8 py-4 border-t-2 border-slate-50 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
              <span>Hiển thị</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-600"
              >
                <option value={5}>5 / trang</option>
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
                <option value={50}>50 / trang</option>
              </select>
              <span>
                (Từ {Math.min((currentPage - 1) * pageSize + 1, filteredStudents.length)} - {Math.min(currentPage * pageSize, filteredStudents.length)} trên tổng {filteredStudents.length} học viên)
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Hiển thị dạng rút gọn nếu nhiều trang
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-1 text-slate-400 text-xs">...</span>;
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Course List Modal */}
      {selectedUserCourses && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden scale-in-center">
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Khóa học đang theo</h3>
                  <p className="text-sm font-bold text-slate-500">{selectedUserCourses.name}</p>
                </div>
                <button
                  onClick={() => setSelectedUserCourses(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {selectedUserCourses.courses.map((course, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-sm font-black text-slate-700 dark:text-slate-200">{course}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedUserCourses(null)}
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
              >
                ĐÓNG CỬA SỔ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
