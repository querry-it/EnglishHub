import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Moon, ChevronDown, Crown, Search, LayoutDashboard, BookOpen, GraduationCap, Brain, Settings, ShieldCheck } from 'lucide-react';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Guest', role: 'STUDENT' };
  const location = useLocation();

  const navItems = [
    { name: 'Lộ trình', path: '/roadmaps', icon: <LayoutDashboard size={16} /> },
    { name: 'Khóa học', path: '/courses', icon: <BookOpen size={16} /> },
    { name: 'Từ vựng', path: '/flashcards', icon: <Brain size={16} />, badge: 'SM-2' },
    { name: 'Kết quả', path: '/my-submissions', icon: <GraduationCap size={16} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#0b1120]/90 backdrop-blur-xl border-b border-white/5 py-2">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 flex justify-between items-center">
        {/* Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white group">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-xl shadow-lg shadow-blue-900/20">
              🦜
            </div>
            <span className="tracking-tight font-outfit">English<span className="text-blue-500">Hub</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[14px] font-semibold transition-colors hover:text-white flex items-center gap-2 ${
                  isActive(item.path) ? 'text-blue-500' : 'text-slate-300'
                }`}
              >
                {item.icon}
                {item.name}
                {item.badge && (
                  <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full border border-blue-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action & Role-based Nav */}
        <div className="flex items-center gap-3">
          {/* Nút giả lập quyền (Cho bạn dễ test "vỏ") */}
          <div className="hidden xl:flex items-center gap-2 mr-2">
            <Link to="/instructor/courses" className="text-[12px] text-slate-500 hover:text-orange-400 font-bold flex items-center gap-1">
              <Settings size={14} /> Giảng viên
            </Link>
            <div className="w-[1px] h-3 bg-white/10 mx-1"></div>
            <Link to="/admin/dashboard" className="text-[12px] text-slate-500 hover:text-red-400 font-bold flex items-center gap-1">
              <ShieldCheck size={14} /> Admin
            </Link>
          </div>

          <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[13px] font-bold px-4 py-1.5 rounded-full shadow-lg transition-all active:scale-95">
            <Crown size={14} fill="currentColor" />
            Mở khóa PRO
          </button>

          <div className="flex items-center gap-1 text-slate-400">
            <button className="p-2 hover:text-white transition-colors"><Search size={18} /></button>
            <button className="p-2 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0b1120]"></span>
            </button>
          </div>

          {/* User Avatar Shell */}
          <Link to="/dashboard" className="flex items-center gap-2 ml-1 cursor-pointer group">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold border border-white/20 group-hover:scale-110 transition-transform">
                {user.fullName.charAt(0)}
             </div>
             <div className="hidden sm:block">
                <div className="text-[11px] font-bold text-white leading-none">{user.fullName}</div>
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Student</div>
             </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
