import React, { useState } from 'react';
import { Users, Search, BookOpen, Clock, Calendar } from 'lucide-react';

export default function InstructorStudents() {
  const [searchTerm, setSearchTerm] = useState('');

  const studentsList = [
    { 
      id: 1, 
      name: 'Trần Thu Hà', 
      email: 'thuhapromember@gmail.com', 
      courseName: 'Khóa học IELTS cho người mới bắt đầu (Foundation 4.5+)',
      lessonsCompleted: '18 / 36 bài', 
      totalTime: '12h 40m',
      enrolledDate: '2026-02-10'
    },
    { 
      id: 2, 
      name: 'Nguyễn Văn Minh', 
      email: 'minhproielts@gmail.com', 
      courseName: 'TOEIC 750+ Intensive Listening & Reading',
      lessonsCompleted: '24 / 28 bài', 
      totalTime: '18h 15m',
      enrolledDate: '2026-02-15'
    },
    { 
      id: 3, 
      name: 'Lê Hoàng Nam', 
      email: 'nampro123@gmail.com', 
      courseName: 'Giao tiếp tiếng Anh Công sở & Đàm phán Hợp đồng',
      lessonsCompleted: '12 / 20 bài', 
      totalTime: '8h 50m',
      enrolledDate: '2026-03-01'
    },
    { 
      id: 4, 
      name: 'Phạm Thị Thảo', 
      email: 'thaopham@gmail.com', 
      courseName: 'Khóa học IELTS cho người mới bắt đầu (Foundation 4.5+)',
      lessonsCompleted: '5 / 36 bài', 
      totalTime: '3h 10m',
      enrolledDate: '2026-03-12'
    },
    { 
      id: 5, 
      name: 'Vũ Quốc Khánh', 
      email: 'khanhvu99@gmail.com', 
      courseName: 'TOEIC 750+ Intensive Listening & Reading',
      lessonsCompleted: '8 / 28 bài', 
      totalTime: '5h 20m',
      enrolledDate: '2026-03-20'
    },
  ];

  const filteredStudents = studentsList.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Users className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span>Danh Sách Học Viên Theo Học</span>
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-1">
          Bảng thông tin học viên đang tham gia các khóa học do bạn phụ trách giảng dạy.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm học viên theo tên, email hoặc khóa học..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors shadow-xs"
        />
      </div>

      {/* Clean User Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b-2 border-slate-100 dark:border-slate-700 text-slate-400 uppercase tracking-wider font-black text-[10px]">
              <tr>
                <th className="p-4 px-5">Thông tin Học viên</th>
                <th className="p-4">Khóa học đăng ký</th>
                <th className="p-4">Tiến độ bài học</th>
                <th className="p-4">Thời gian tích lũy</th>
                <th className="p-4 px-5 text-right">Ngày tham gia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold text-slate-700 dark:text-slate-200">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  
                  {/* User info */}
                  <td className="p-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 font-black text-sm flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0 border border-slate-200 dark:border-slate-700">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-white text-sm">{s.name}</p>
                        <p className="text-[11px] font-mono text-slate-400 font-normal">{s.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Course Name */}
                  <td className="p-4">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-xs flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 shrink-0" />
                      <span>{s.courseName}</span>
                    </span>
                  </td>

                  {/* Lessons Progress */}
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {s.lessonsCompleted}
                  </td>

                  {/* Study Time */}
                  <td className="p-4 font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {s.totalTime}
                    </span>
                  </td>

                  {/* Enrolled Date */}
                  <td className="p-4 px-5 text-right font-mono text-slate-400 text-[11px]">
                    {s.enrolledDate}
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
