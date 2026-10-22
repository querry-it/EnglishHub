import React, { useState, useEffect } from 'react';
import { Trophy, User, Loader2 } from 'lucide-react';
import AppCard from './AppCard';
import api from '../api/axios';

export default function LeaderboardWidget() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await api.get('/auth/leaderboard');
        if (response.data.success) {
          // Chỉ lấy top 5 cho widget
          setUsers(response.data.users.slice(0, 5));
        }
      } catch (error) {
        console.error('Lỗi khi tải leaderboard widget:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopUsers();
  }, []);

  return (
    <AppCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Bảng xếp hạng</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Những học viên xuất sắc nhất hệ thống
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-8"></div>
                  </div>
                </div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
              </div>
            ))}
          </div>
        ) : users.length > 0 ? (
          users.map((u, idx) => (
            <div key={u.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <span className={`font-extrabold text-xs w-6 ${idx === 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                  #{idx + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center overflow-hidden">
                  {u.avatarUrl ? (
                    <img src={u.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-[120px]">
                    {u.fullName}
                  </p>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-extrabold">Lv.{u.level}</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {u.totalExp.toLocaleString()} XP
              </span>
            </div>
          ))
        ) : (
          <p className="text-center py-4 text-xs text-slate-500 font-bold">Chưa có dữ liệu</p>
        )}
      </div>
    </AppCard>
  );
}
