import React, { useState, useEffect } from 'react';
import { 
  Activity, ShieldCheck, Search, Filter, Clock, 
  User, CheckCircle2, AlertTriangle, Key, Crown, UserX, Loader2
} from 'lucide-react';
import api from '../../api/axios';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');

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

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Activity className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span>Nhật Ký Thao Tác Hệ Thống (Audit Logs)</span>
        </h1>
        <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
          Ghi vết toàn bộ hành động đăng ký, đăng nhập, quản lý bài học và thay đổi giảng viên.
        </p>
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
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
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
      </div>
    </div>
  );
}
