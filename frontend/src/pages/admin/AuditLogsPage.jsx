import React, { useState } from 'react';
import { 
  Activity, ShieldCheck, Search, Filter, Clock, 
  User, CheckCircle2, AlertTriangle, Key, Crown, UserX 
} from 'lucide-react';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([
    {
      id: 'log-101',
      actor: 'Admin System (Hoàng Anh Tuấn)',
      actorRole: 'ADMIN',
      action: 'ROLE_CHANGE',
      details: 'Nâng cấp vai trò người dùng "Nguyễn Văn Minh" từ Học viên (STUDENT) ➔ Giảng viên (INSTRUCTOR)',
      ipAddress: '113.161.45.12',
      timestamp: '2026-10-09 11:45:10',
      level: 'WARNING' // 'INFO' | 'WARNING' | 'CRITICAL'
    },
    {
      id: 'log-102',
      actor: 'Admin System (Hoàng Anh Tuấn)',
      actorRole: 'ADMIN',
      action: 'COURSE_APPROVED',
      details: 'Phê duyệt xuất bản khóa học "IELTS Intensive Writing Task 2" của Giảng viên Phạm Thị Lan',
      ipAddress: '113.161.45.12',
      timestamp: '2026-10-09 10:20:05',
      level: 'INFO'
    },
    {
      id: 'log-103',
      actor: 'Giảng viên Phạm Thị Lan',
      actorRole: 'INSTRUCTOR',
      action: 'LESSON_CREATED',
      details: 'Tạo bài học mới "Part 2 Speaking Cue Card Strategy" trong khóa học IELTS',
      ipAddress: '14.232.18.99',
      timestamp: '2026-10-09 09:12:40',
      level: 'INFO'
    },
    {
      id: 'log-104',
      actor: 'Admin System (Hoàng Anh Tuấn)',
      actorRole: 'ADMIN',
      action: 'PRO_UPGRADE',
      details: 'Kích hoạt gói PRO vĩnh viễn cho học viên "Trần Thu Hà" (Giao dịch MBBank #88219)',
      ipAddress: '113.161.45.12',
      timestamp: '2026-10-08 16:50:00',
      level: 'INFO'
    },
    {
      id: 'log-105',
      actor: 'Admin System (Hoàng Anh Tuấn)',
      actorRole: 'ADMIN',
      action: 'USER_BLOCKED',
      details: 'Khóa tài khoản "cuongspam99@gmail.com" do vi phạm quy định phát ngôn cộng đồng',
      ipAddress: '113.161.45.12',
      timestamp: '2026-10-08 14:05:22',
      level: 'CRITICAL'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');

  const filteredLogs = logs.filter((l) => {
    const matchesLevel = levelFilter === 'ALL' || l.level === levelFilter;
    const matchesSearch = 
      l.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Activity className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span>Nhật Ký Nhật Ký Thao Tác Hệ Thống (Audit Logs)</span>
        </h1>
        <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
          Ghi vết toàn bộ hành động thay đổi quyền hạn, kiểm duyệt bài đăng & kích hoạt gói PRO.
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
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  
                  {/* Timestamp & IP */}
                  <td className="py-4 px-5 font-mono text-[11px]">
                    <div className="text-slate-900 dark:text-white font-extrabold">{log.timestamp}</div>
                    <div className="text-slate-400">IP: {log.ipAddress}</div>
                  </td>

                  {/* Actor */}
                  <td className="py-4 px-4">
                    <div className="font-extrabold text-slate-900 dark:text-white">{log.actor}</div>
                    <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase">
                      {log.actorRole}
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
                    {log.level === 'INFO' && (
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-black text-[10px] uppercase">
                        INFO
                      </span>
                    )}
                    {log.level === 'WARNING' && (
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-600 font-black text-[10px] uppercase">
                        WARNING
                      </span>
                    )}
                    {log.level === 'CRITICAL' && (
                      <span className="px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950 text-rose-600 font-black text-[10px] uppercase">
                        CRITICAL
                      </span>
                    )}
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
