import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, PlusCircle, CheckSquare, 
  Users, LogOut, Bell, Crown, Sparkles, ChevronRight 
} from 'lucide-react';
import AppMascot from '../../components/AppMascot';
import { useAuth } from '../../context/AuthContext';

import InstructorDashboard from './InstructorDashboard';
import InstructorCourses from './InstructorCourses';
import CreateLesson from './CreateLesson';
import InstructorGrading from './InstructorGrading';
import InstructorStudents from './InstructorStudents';

function InstructorSidebar({ onClose }) {
  const location = useLocation();
  const navItems = [
    { icon: Home, label: 'Trang chủ', path: '/instructor' },
    { icon: BookOpen, label: 'Khóa học của tôi', path: '/instructor/courses' },
    { icon: PlusCircle, label: 'Soạn bài học mới', path: '/instructor/create-lesson' },
    { icon: CheckSquare, label: 'Hỗ trợ 1-1 Học viên PRO', path: '/instructor/grading', badge: 'PRO' },
    { icon: Users, label: 'Danh sách học viên', path: '/instructor/students' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen sticky top-0 p-4 flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 mb-8 pt-2">
          <AppMascot className="w-9 h-9 shrink-0" />
          <div>
            <h3 className="font-black text-sm text-white tracking-tight">EnglishHub</h3>
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">Kênh Giảng Viên</span>
          </div>
        </div>

        {/* Menu Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-black shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-400 text-amber-950 uppercase">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>


    </aside>
  );
}

export default function InstructorLayout() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen w-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      {/* Instructor Sidebar */}
      <InstructorSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        
        {/* Header Bar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-black text-slate-900 dark:text-white text-base">
              Xin chào, {user?.fullName || 'Giảng viên'} 👋
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-xs font-black flex items-center gap-1.5 border border-amber-300 dark:border-amber-800">
              <Crown className="w-3.5 h-3.5 fill-current text-amber-500" /> Giảng viên Đã xác thực
            </span>
            <div className="w-9 h-9 rounded-full bg-stone-700 text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
              {user?.fullName?.charAt(0).toUpperCase() || 'G'}
            </div>
          </div>
        </header>

        {/* Scrollable Page Router View */}
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <Routes>
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/instructor/courses" element={<InstructorCourses />} />
            <Route path="/instructor/create-lesson" element={<CreateLesson />} />
            <Route path="/instructor/grading" element={<InstructorGrading />} />
            <Route path="/instructor/students" element={<InstructorStudents />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
