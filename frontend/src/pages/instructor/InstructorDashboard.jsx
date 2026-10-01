import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, BookOpen, MessageSquare, Star, ArrowUpRight, 
  PlusCircle, Crown, CheckCircle2, Clock, Play, Headphones 
} from 'lucide-react';

export default function InstructorDashboard() {
  const stats = [
    { label: 'Tổng học viên theo học', value: '1,248', change: '+18.4%', up: true, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/50 dark:border-indigo-800' },
    { label: 'Bài học đã tạo', value: '24', change: '+3 bài mới', up: true, icon: BookOpen, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200 dark:bg-sky-950/50 dark:border-sky-800' },
    { label: 'Bài tập PRO chờ chấm', value: '8', change: 'Cần xử lý', up: false, icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800' },
    { label: 'Đánh giá trung bình', value: '4.9 ⭐', change: '98% hài lòng', up: true, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800' },
  ];

  const pendingGradings = [
    { id: 1, student: 'Trần Thu Hà', type: 'Bài thu âm Shadowing', lesson: 'Ordering Coffee at Starbucks', date: '10 phút trước', badge: 'PRO' },
    { id: 2, student: 'Nguyễn Văn Minh', type: 'Câu hỏi ngữ pháp 1-1', lesson: 'IELTS Speaking Part 2 Strategy', date: '35 phút trước', badge: 'PRO' },
    { id: 3, student: 'Lê Hoàng Nam', type: 'Bài chép chính tả Dictation', lesson: 'Stranger Things Trailer', date: '1 giờ trước', badge: 'PRO' },
  ];

  const myLessons = [
    { id: 1, title: 'Ordering Coffee at Starbucks — Natural Spoken English', category: 'Listening & Dictation', students: 512, rating: 4.9, views: '14,200' },
    { id: 2, title: 'Job Interview Tips — How to Introduce Yourself', category: 'Speaking & Shadowing', students: 389, rating: 4.8, views: '9,800' },
    { id: 3, title: 'IELTS Speaking Part 2 Cue Card Strategy', category: 'IELTS Intensive', students: 347, rating: 5.0, views: '12,500' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white border-2 border-indigo-900/50 shadow-md">
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span>Dashboard Giảng viên</span>
          </h1>
          <p className="text-xs text-slate-300 font-semibold">
            Tạo bài học mới và tương tác hỗ trợ 1-1 với học viên tài khoản PRO.
          </p>
        </div>

        <Link
          to="/instructor/create-lesson"
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>SOẠN BÀI HỌC MỚI</span>
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl ${stat.bg} border flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-extrabold flex items-center gap-0.5 ${stat.up ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {stat.change}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">{stat.value}</h3>
                <p className="text-xs font-bold text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Pending PRO Gradings & My Lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pending PRO Gradings */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              <span>Yêu cầu hỗ trợ 1-1 từ Học viên PRO</span>
            </h3>
            <Link to="/instructor/grading" className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline">
              Xem tất cả →
            </Link>
          </div>

          <div className="space-y-3">
            {pendingGradings.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 hover:border-indigo-400 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">{item.student}</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-400 text-amber-950 font-black text-[9px]">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate">{item.type}</p>
                  <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.date} • Bài: {item.lesson}
                  </p>
                </div>

                <Link
                  to="/instructor/grading"
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs whitespace-nowrap hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  Xử lý
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Top Performing Lessons */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Bài học hàng đầu của bạn</span>
            </h3>
            <Link to="/instructor/courses" className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline">
              Quản lý khóa học →
            </Link>
          </div>

          <div className="space-y-3">
            {myLessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                    {lesson.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-extrabold text-[10px] whitespace-nowrap">
                    {lesson.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span>👥 {lesson.students} học viên</span>
                  <span>👀 {lesson.views} lượt xem</span>
                  <span className="text-amber-500 font-bold">⭐ {lesson.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
