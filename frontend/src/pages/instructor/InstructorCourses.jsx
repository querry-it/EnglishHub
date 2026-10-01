import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlusCircle, Search, Edit3, Trash2, Eye, Star, Headphones, Users, CheckCircle2, Lock } from 'lucide-react';

export default function InstructorCourses() {
  const [searchTerm, setSearchTerm] = useState('');

  const [coursesList, setCoursesList] = useState([
    {
      id: 1,
      title: 'Ordering Coffee at Starbucks — Natural Spoken English',
      category: 'Dictation & Listening',
      level: 'A2',
      views: '14,200',
      students: 512,
      rating: 4.9,
      isPublished: true,
      updatedAt: '24/09/2026'
    },
    {
      id: 2,
      title: 'Job Interview Tips — How to Introduce Yourself',
      category: 'Shadowing & Speaking',
      level: 'B2',
      views: '9,800',
      students: 389,
      rating: 4.8,
      isPublished: true,
      updatedAt: '22/09/2026'
    },
    {
      id: 3,
      title: 'IELTS Speaking Part 2 Cue Card Strategy',
      category: 'IELTS Intensive',
      level: 'C1',
      views: '12,500',
      students: 347,
      rating: 5.0,
      isPublished: true,
      updatedAt: '18/09/2026'
    },
    {
      id: 4,
      title: '50 Essential Phrasal Verbs for Work & Business',
      category: 'Business English',
      level: 'B1',
      views: '6,400',
      students: 210,
      rating: 4.7,
      isPublished: false,
      updatedAt: '15/09/2026'
    }
  ]);

  const togglePublish = (id) => {
    setCoursesList(coursesList.map(c => c.id === id ? { ...c, isPublished: !c.isPublished } : c));
  };

  const filteredCourses = coursesList.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Khóa học & Bài học của tôi
          </h1>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Quản lý các bài giảng Dictation, Shadowing & Luyện thi bạn đã xuất bản.
          </p>
        </div>

        <Link
          to="/instructor/create-lesson"
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-105 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>TẠO BÀI HỌC MỚI</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm bài học..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors shadow-xs"
        />
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => (
          <div 
            key={course.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-extrabold text-[11px]">
                  {course.category}
                </span>
                <span className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold ${
                  course.isPublished 
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {course.isPublished ? '● Đang hiển thị' : '🔒 Nháp / Ẩn'}
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">
                {course.title}
              </h3>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>👥 {course.students} học viên</span>
                <span>👀 {course.views} lượt xem</span>
                <span className="text-amber-500 font-bold">⭐ {course.rating}</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => togglePublish(course.id)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {course.isPublished ? 'Ẩn bài học' : 'Công khai'}
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    to="/instructor/create-lesson"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    title="Chỉnh sửa"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
