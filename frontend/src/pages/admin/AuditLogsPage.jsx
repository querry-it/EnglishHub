import React, { useState, useEffect } from 'react';
import { 
  Activity, ShieldCheck, Search, Filter, Clock, 
  User, CheckCircle2, AlertTriangle, Key, Crown, UserX, Loader2,
  FileSpreadsheet, FileText, ChevronLeft, ChevronRight, Check
} from 'lucide-react';
import api from '../../api/axios';
import { exportToCSV, exportToDOC } from '../../utils/exportUtils';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    fetchLogs(1);
  }, []);

  const fetchLogs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get('/admin/audit-logs', {
        params: { page, limit: 50 }
      });
      if (response.data.success) {
        setLogs(response.data.logs);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Lỗi khi tải nhật ký:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine log level based on action type
  const getLogLevel = (action) => {
    const warningActions = ['LOGIN_FAILED', 'UPDATE_COURSE_INSTRUCTOR', 'CHANGE_PASSWORD'];
    const criticalActions = ['DELETE_LESSON', 'USER_BLOCKED'];

    if (criticalActions.includes(action)) return 'CRITICAL';
    if (warningActions.includes(action)) return 'WARNING';
    return 'INFO';
  };

  const filteredLogs = logs.filter((l) => {
    const level = getLogLevel(l.action);
    const matchesLevel = levelFilter === 'ALL' || level === levelFilter;
    const actorName = l.user?.fullName || 'Hệ thống';
    const matchesSearch = 
      (l.details || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, levelFilter]);

  // Thống kê
  const totalLogs = logs.length;
  const infoLogs = logs.filter(l => getLogLevel(l.action) === 'INFO').length;
  const warningLogs = logs.filter(l => getLogLevel(l.action) === 'WARNING').length;
  const criticalLogs = logs.filter(l => getLogLevel(l.action) === 'CRITICAL').length;

  // Phân trang
  const totalPages = Math.ceil(filteredLogs.length / pageSize) || 1;
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Xuất file CSV
  const handleExportCSV = () => {
    if (filteredLogs.length === 0) {
      showToast('⚠️ Không có nhật ký nào để xuất file!');
      return;
    }
    const headers = ['Thời gian', 'Địa chỉ IP', 'Người thực hiện', 'Quyền hạn', 'Mã thao tác', 'Chi tiết hoạt động', 'Mức độ'];
    const rows = filteredLogs.map(l => [
      new Date(l.createdAt).toLocaleString('vi-VN'),
      l.ipAddress || 'Unknown',
      l.user?.fullName || 'Hệ thống',
      l.user?.role || 'SYSTEM',
      l.action,
      l.details,
      getLogLevel(l.action)
    ]);
    exportToCSV({
      filename: 'nhat_ky_he_thong',
      headers,
      rows
    });
    showToast('Đã xuất file CSV nhật ký hệ thống thành công!');
  };

  // Xuất file Word (.DOC)
  const handleExportDOC = () => {
    if (filteredLogs.length === 0) {
      showToast('⚠️ Không có nhật ký nào để xuất file!');
      return;
    }
    const headers = ['STT', 'Thời gian', 'Người thực hiện', 'Mã thao tác', 'Chi tiết', 'Mức độ'];
    const rows = filteredLogs.map((l, idx) => [
      idx + 1,
      new Date(l.createdAt).toLocaleString('vi-VN'),
      `${l.user?.fullName || 'Hệ thống'} (${l.user?.role || 'SYSTEM'})`,
      l.action,
      l.details,
      getLogLevel(l.action)
    ]);
    exportToDOC({
      filename: 'bao_cao_audit_logs',
      title: 'BÁO CÁO NHẬT KÝ THAO TÁC HỆ THỐNG ENGLISSHHUB',
      subtitle: 'Trích xuất toàn bộ lịch sử hoạt động, bảo mật và thay đổi dữ liệu của Admin & Giảng viên',
      statsSummary: [
        { label: 'Tổng số bản ghi', value: totalLogs },
        { label: 'Thông tin (INFO)', value: infoLogs },
        { label: 'Cảnh báo (WARNING)', value: warningLogs },
        { label: 'Nghiêm trọng (CRITICAL)', value: criticalLogs }
      ],
      headers,
      rows
    });
    showToast('Đã xuất file Word (.doc) nhật ký thành công!');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[200] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 font-bold text-xs flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Activity className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Nhật Ký Thao Tác Hệ Thống (Audit Logs)</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
            Ghi vết toàn bộ hành động đăng ký, đăng nhập, quản lý bài học và thay đổi giảng viên.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Nút Xuất CSV */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-xs"
            title="Xuất bảng tính CSV nhật ký thao tác"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Xuất CSV</span>
          </button>

          {/* Nút Xuất Word .DOC */}
          <button
            onClick={handleExportDOC}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-xs"
            title="Xuất báo cáo nhật ký định dạng Word (.doc)"
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Xuất Word (.DOC)</span>
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Tổng số Logs</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{totalLogs}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Thông tin (INFO)</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{infoLogs}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Cảnh báo (WARNING)</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{warningLogs}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Nghiêm trọng (CRITICAL)</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{criticalLogs}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Tìm theo nội dung thao tác / Admin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          {[
            { key: 'ALL', label: 'Tất cả Logs' },
            { key: 'INFO', label: 'Thông tin (Info)' },
            { key: 'WARNING', label: 'Cảnh báo (Warning)' },
            { key: 'CRITICAL', label: 'Nghiêm trọng (Critical)' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setLevelFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                levelFilter === tab.key
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">Thời gian & IP</th>
                <th className="py-4 px-4">Người thực hiện</th>
                <th className="py-4 px-4">Mã thao tác</th>
                <th className="py-4 px-5">Chi tiết hoạt động</th>
                <th className="py-4 px-4 text-right">Mức độ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-bold">
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-5">
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-1"></div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-16"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-1"></div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-12"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-1"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-16 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : paginatedLogs.length > 0 ? (
                paginatedLogs.map((log) => {
                  const level = getLogLevel(log.action);
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      {/* Timestamp & IP */}
                      <td className="py-4 px-5 font-mono text-[11px]">
                        <div className="text-slate-900 dark:text-white font-extrabold">
                          {new Date(log.createdAt).toLocaleString('vi-VN')}
                        </div>
                        <div className="text-slate-400">IP: {log.ipAddress || 'Unknown'}</div>
                      </td>

                      {/* Actor */}
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-slate-900 dark:text-white">
                          {log.user?.fullName || 'Hệ thống'}
                        </div>
                        <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase">
                          {log.user?.role || 'SYSTEM'}
                        </span>
                      </td>

                      {/* Action Code */}
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-black text-slate-700 dark:text-slate-300">
                          {log.action}
                        </span>
                      </td>

                      {/* Details */}
                      <td className="py-4 px-5 font-medium text-slate-700 dark:text-slate-200 leading-snug">
                        {log.details}
                      </td>

                      {/* Level Badge */}
                      <td className="py-4 px-4 text-right">
                        {level === 'INFO' && (
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-black text-[10px] uppercase">
                            INFO
                          </span>
                        )}
                        {level === 'WARNING' && (
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-600 font-black text-[10px] uppercase">
                            WARNING
                          </span>
                        )}
                        {level === 'CRITICAL' && (
                          <span className="px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950 text-rose-600 font-black text-[10px] uppercase">
                            CRITICAL
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500 font-bold">
                    Không tìm thấy nhật ký nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Thanh Phân Trang (Pagination Bar) */}
        {filteredLogs.length > 0 && (
          <div className="px-6 py-4 border-t-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                <option value={10}>10 dòng / trang</option>
                <option value={20}>20 dòng / trang</option>
                <option value={50}>50 dòng / trang</option>
                <option value={100}>100 dòng / trang</option>
              </select>
              <span>
                (Từ {Math.min((currentPage - 1) * pageSize + 1, filteredLogs.length)} - {Math.min(currentPage * pageSize, filteredLogs.length)} trên tổng {filteredLogs.length} bản ghi)
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
    </div>
  );
}
