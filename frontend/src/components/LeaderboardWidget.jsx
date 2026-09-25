import React from 'react';
import { Trophy, User } from 'lucide-react';
import AppCard from './AppCard';

export default function LeaderboardWidget() {
  const users = [
    { rank: '#1', name: 'Phat TV', level: 'Lv.41', time: '12g 31p' },
    { rank: '#2', name: 'Cẩm Tiên Đỗ Thị', level: 'Lv.34', time: '11g 56p' },
    { rank: '#3', name: '@lightstar', level: 'Lv.4', time: '11g 50p' },
    { rank: '#4', name: '@hungtvb', level: 'Lv.3', time: '11g 46p' },
  ];

  return (
    <AppCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Bảng xếp hạng</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Xem bạn đang đứng thứ mấy so với các bạn khác
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {users.map((user, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-xs text-amber-500 w-6">{user.rank}</span>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">{user.name}</p>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-extrabold">{user.level}</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">{user.time}</span>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
