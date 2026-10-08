import React, { useState } from 'react';
import {
  Users, UserPlus, Search, Filter, MoreHorizontal,
  Mail, Shield, Calendar, CheckCircle2, XCircle,
  UserCog, Trash2, ShieldCheck, ShieldAlert
} from 'lucide-react';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - sẽ thay thế bằng API thực sau
  const [users] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'admin@englishhub.com', role: 'ADMIN', status: 'active', joinedDate: '2024-01-10', level: 99, exp: 150000 },
    { id: 2, name: 'Trần Thị B', email: 'instructor@englishhub.com', role: 'INSTRUCTOR', status: 'active', joinedDate: '2024-02-15', level: 50, exp: 45000 },
    { id: 3, name: 'Lê Văn C', email: 'student1@gmail.com', role: 'STUDENT', status: 'active', joinedDate: '2024-03-20', level: 5, exp: 4200 },
    { id: 4, name: 'Phạm Minh D', email: 'student2@gmail.com', role: 'STUDENT', status: 'inactive', joinedDate: '2024-04-05', level: 1, exp: 150 },
  ]);

  const roleColors = {
    ADMIN: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800',
    INSTRUCTOR: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
    STUDENT: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800',
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-500" />
            <span>Quản lý Người dùng</span>
          </h1>
          <p className="text-xs text-slate-500 font-bold">
            Xem danh sách, phân quyền và quản lý trạng thái tài khoản hệ thống.
          </p>
        </div>

        <button className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95">
          <UserPlus className="w-4 h-4" />
          <span>Thêm người dùng</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none font-bold text-sm transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Lọc vai trò</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b-2 border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Người dùng</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Trình độ (Level)</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Ngày tham gia</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-black text-slate-600 dark:text-slate-300">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{u.name}</div>
                        <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center w-fit gap-1.5 ${roleColors[u.role]}`}>
                      {u.role === 'ADMIN' ? <ShieldCheck className="w-3 h-3" /> : u.role === 'INSTRUCTOR' ? <UserCog className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">Cấp độ {u.level}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">{u.exp.toLocaleString()} EXP</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {u.status === 'active' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                      <span className={`text-xs font-bold ${u.status === 'active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {u.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {u.joinedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors" title="Chỉnh sửa">
                        <UserCog className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500 transition-colors" title="Xóa">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
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
