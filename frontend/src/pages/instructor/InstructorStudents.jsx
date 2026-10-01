import React, { useState } from 'react';
import { Users, Search, Crown, CheckCircle2, Award, Clock } from 'lucide-react';

export default function InstructorStudents() {
  const [searchTerm, setSearchTerm] = useState('');

  const studentsList = [
    { id: 1, name: 'Trần Thu Hà', email: 'thuhapromember@gmail.com', isPro: true, lessonsCompleted: 18, totalTime: '12h 40m', streak: 14 },
    { id: 2, name: 'Nguyễn Văn Minh', email: 'minhproielts@gmail.com', isPro: true, lessonsCompleted: 24, totalTime: '18h 15m', streak: 21 },
    { id: 3, name: 'Lê Hoàng Nam', email: 'nampro123@gmail.com', isPro: true, lessonsCompleted: 12, totalTime: '8h 50m', streak: 7 },
    { id: 4, name: 'Phạm Thị Thảo', email: 'thaopham@gmail.com', isPro: false, lessonsCompleted: 5, totalTime: '3h 10m', streak: 3 },
    { id: 5, name: 'Vũ Quốc Khánh', email: 'khanhvu99@gmail.com', isPro: false, lessonsCompleted: 8, totalTime: '5h 20m', streak: 5 },
  ];

  const filteredStudents = studentsList.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Danh sách Học viên theo học
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-1">
          Theo dõi danh sách học viên đăng ký theo học các bài giảng của bạn.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm học viên theo tên hoặc email..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors shadow-xs"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase tracking-wider font-extrabold text-[10px]">
              <tr>
                <th className="p-4">Học viên</th>
                <th className="p-4">Gói tài khoản</th>
                <th className="p-4">Bài học đã hoàn thành</th>
                <th className="p-4">Thời gian học</th>
                <th className="p-4">Chuỗi Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-700 text-white flex items-center justify-center font-extrabold text-xs">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-white">{s.name}</p>
                        <p className="text-[10px] text-slate-400">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {s.isPro ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] inline-flex items-center gap-1">
                        <Crown className="w-3 h-3 fill-current" /> PRO
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-extrabold text-[10px]">
                        Miễn phí
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {s.lessonsCompleted} bài
                  </td>
                  <td className="p-4 font-mono text-slate-600 dark:text-slate-300">
                    {s.totalTime}
                  </td>
                  <td className="p-4 font-mono font-bold text-orange-500">
                    🔥 {s.streak} ngày
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
