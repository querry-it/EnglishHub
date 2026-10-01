import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, BookOpen, Headphones, Repeat, FileText, Mic,
  ClipboardList, GraduationCap, Gamepad2, Video, Brain,
  MessageSquare, MessageCircle, Trophy, ChevronDown, LogOut, Crown, FileEdit, LogIn, ShoppingBag, Gift,
  ChevronsLeft, ChevronsRight, LayoutDashboard, PlusCircle, CheckSquare, Users, ArrowLeft,
  Bell, Activity, ShieldCheck, User, Settings, MoreVertical
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppMascot from './AppMascot';

// ─── Nav configs ────────────────────────────────────────────────────────────

const STUDENT_SECTIONS = [
  {
    label: null,
    items: [
      { label: 'Trang chủ',       icon: Home,          path: '/dashboard' },
      { label: 'Chủ đề',          icon: BookOpen,       path: '/courses' },
      { label: 'Luyện nghe',      icon: Headphones,     path: '/listening' },
      { label: 'Từ vựng',         icon: FileText,       path: '/vocabulary' },
      { label: 'Luyện nói',       icon: Mic,            path: '/speaking' },
      { label: 'Luyện thi TOEIC', icon: ClipboardList,  path: '/exams?type=toeic' },
      { label: 'Luyện thi IELTS', icon: GraduationCap,  path: '/exams?type=ielts' },
      { label: 'Trò Chơi',        icon: Gamepad2,       path: '/games' },
      { label: 'Ôn tập',          icon: Brain,          path: '/workspace', badgeCount: 2 },
    ],
  },
  {
    label: 'CỘNG ĐỒNG',
    items: [
      { label: 'Cộng đồng',             icon: MessageSquare,  path: '/community' },
      { label: 'Bảng xếp hạng',         icon: Trophy,         path: '/leaderboard' },
      { label: 'Trò chuyện',            icon: MessageCircle,  path: '/chat' },
      { label: 'Feedback từ người dùng', icon: MessageSquare, path: '/feedbacks' },
      { label: 'Đổi quà',               icon: Gift,           path: '/shop' },
    ],
  },
];

const INSTRUCTOR_SECTIONS = [
  {
    label: null,
    items: [
      { label: 'Trang chủ',            icon: Home,            path: '/instructor' },
      { label: 'Khóa học của tôi',     icon: BookOpen,        path: '/instructor/courses' },
      { label: 'Soạn bài học mới',     icon: PlusCircle,      path: '/instructor/create-lesson' },
      { label: 'Hỗ trợ 1-1 PRO',       icon: CheckSquare,     path: '/instructor/grading', badge: 'PRO' },
      { label: 'Danh sách học viên',   icon: Users,           path: '/instructor/students' },
    ],
  },
];

const ADMIN_SECTIONS = [
  {
    label: null,
    items: [
      { label: 'Dashboard Admin',      icon: LayoutDashboard, path: '/admin' },
      { label: 'Quản lý Users',        icon: Users,           path: '/admin/users' },
      { label: 'Quản lý Khóa học',     icon: BookOpen,        path: '/admin/courses' },
      { label: 'Quản lý Blog',         icon: FileText,        path: '/admin/blog' },
      { label: 'Thông báo',            icon: Bell,            path: '/admin/notifications' },
      { label: 'Nhật ký logs',         icon: Activity,        path: '/admin/logs' },
    ],
  },
];

// ─── Helper: is a nav item active? ─────────────────────────────────────────

function useNavActive() {
  const location = useLocation();
  return (itemPath) => {
    const full = location.pathname + location.search;
    if (full === itemPath) return true;
    if (itemPath === '/dashboard' && location.pathname === '/dashboard') return true;
    const [base, qs] = itemPath.split('?');
    if (qs) return location.pathname === base && location.search.includes(qs);
    if (itemPath !== '/dashboard' && itemPath !== '/') {
      return location.pathname === base || location.pathname.startsWith(base + '/');
    }
    return false;
  };
}

// ─── Reusable NavLink ───────────────────────────────────────────────────────

function NavLink({ item, collapsed, isActive }) {
  const Icon = item.icon;
  const activeStyle = 'bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 border-2 border-sky-300 dark:border-sky-700 shadow-2xs font-extrabold';
  const inactiveStyle = 'text-slate-700 dark:text-slate-300 border-2 border-transparent hover:bg-sky-50/70 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-200 dark:hover:border-sky-800';

  return (
    <Link
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm transition-all group ${
        isActive ? activeStyle : inactiveStyle
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 shrink-0 transition-colors ${
          isActive
            ? 'text-sky-600 dark:text-sky-400'
            : 'text-slate-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400'
        }`} />
        {!collapsed && <span className="text-sm font-bold truncate">{item.label}</span>}
      </div>
      {!collapsed && item.badgeCount && (
        <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-mono text-[10px] flex items-center justify-center font-extrabold shrink-0">
          {item.badgeCount}
        </span>
      )}
      {!collapsed && item.badge && (
        <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-400 text-amber-950 uppercase shrink-0">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

// ─── Main Sidebar ───────────────────────────────────────────────────────────

export default function AppSidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const { user, openLoginModal, logout } = useAuth();
  const [showMore, setShowMore] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const isActive = useNavActive();

  const isAdmin = location.pathname.startsWith('/admin');
  const isInstructor = location.pathname.startsWith('/instructor');
  const isSpecialPortal = isAdmin || isInstructor;

  const sections = isAdmin
    ? ADMIN_SECTIONS
    : isInstructor
    ? INSTRUCTOR_SECTIONS
    : STUDENT_SECTIONS;
  const activeColor = 'sky';
  const hoverColor  = 'blue';

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white dark:bg-slate-900 border-r-2 border-slate-300 dark:border-slate-700 flex flex-col h-screen sticky top-0 z-30 shrink-0 select-none transition-all duration-300`}>

      {/* ── LOGO ─────────────────────────────────────────────── */}
      <div className="h-16 px-4 border-b-2 border-slate-300 dark:border-slate-700 shrink-0 flex items-center">
        <Link to="/" className="flex items-center gap-2.5 px-1 group" title="Trang chủ">
          <AppMascot className="w-8 h-8 shrink-0 group-hover:scale-105 transition-transform" />
          {!collapsed && (
            <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight block leading-tight">
              EnglishHub
            </span>
          )}
        </Link>
      </div>

      {/* ── NAVIGATION ───────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className={sIdx > 0 ? 'pt-2' : ''}>
            {/* Section label */}
            {section.label && !collapsed && (
              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 mb-1">
                <p className="px-3.5 text-[11px] font-extrabold uppercase tracking-wider mb-1 text-slate-400 dark:text-slate-500">
                  {section.label}
                </p>
              </div>
            )}
            {section.label && collapsed && <div className="border-t border-slate-200 dark:border-slate-800 my-2" />}

            {/* Items */}
            <nav className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  item={item}
                  collapsed={collapsed}
                  activeColor={activeColor}
                  hoverColor={hoverColor}
                  isActive={isActive(item.path)}
                />
              ))}
            </nav>
          </div>
        ))}

        {/* PRO banner — chỉ hiện khi đã đăng nhập và ở student mode */}
        {user && !isSpecialPortal && !collapsed && (
          <div className="pt-3">
            <Link
              to="/courses"
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-600 to-purple-600 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 border-2 border-indigo-900/30 transition-all active:scale-98"
            >
              <Crown className="w-4 h-4 text-amber-300 fill-current shrink-0" />
              <span>MỞ KHÓA PRO</span>
            </Link>
          </div>
        )}
      </div>

      {/* ── PINNED BOTTOM FOOTER ─────────────────────────────── */}
      <div className="p-3 border-t-2 border-slate-200 dark:border-slate-800 shrink-0 space-y-2 bg-white dark:bg-slate-900">
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              title={collapsed ? user.fullName || 'Người dùng' : undefined}
              className={`w-full flex items-center justify-between p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-[#5c4033] text-white flex items-center justify-center font-extrabold text-sm border-2 border-white dark:border-slate-800 shadow-sm">
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="absolute -bottom-1 -right-1 px-1 py-0.1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[8px] font-black border border-slate-300 dark:border-slate-700 shadow-2xs">
                    Lv.{user.level || 1}
                  </span>
                </div>
                {!collapsed && (
                  <div className="text-left truncate">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {user.fullName || 'Người dùng'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium truncate">
                      {user.email || ''}
                    </div>
                  </div>
                )}
              </div>
              {!collapsed && (
                <MoreVertical className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 shrink-0" />
              )}
            </button>

            {/* Dropdown menu popover */}
            {isUserMenuOpen && (
              <div className={`absolute ${collapsed ? 'left-16 bottom-0' : 'left-0 bottom-14'} w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-800 py-3 px-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150`}>
                <div className="px-3 py-2">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                    {user.fullName || 'Người dùng'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                    {user.email || ''}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 my-2" />

                <div className="space-y-1">
                  <Link
                    to={user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN' ? "/instructor/profile" : "/profile"}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Hồ sơ</span>
                  </Link>

                  {/* Portal links for Admin / Instructor */}
                  {!isSpecialPortal && (
                    <>
                      {user.role === 'ADMIN' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span>Trang Quản Trị Admin</span>
                        </Link>
                      )}

                      {(user.role === 'INSTRUCTOR' || user.role === 'ADMIN') && (
                        <Link
                          to="/instructor"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 transition-colors"
                        >
                          <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>Kênh Giảng Viên</span>
                        </Link>
                      )}
                    </>
                  )}
                  {isSpecialPortal && user.role === 'ADMIN' && location.pathname.startsWith('/instructor') && (
                    <Link
                      to="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Trang Quản Trị Admin</span>
                    </Link>
                  )}
                  {isSpecialPortal && user.role === 'ADMIN' && location.pathname.startsWith('/admin') && (
                    <Link
                      to="/instructor"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 transition-colors"
                    >
                      <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Kênh Giảng Viên</span>
                    </Link>
                  )}

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={openLoginModal}
            title={collapsed ? "Đăng nhập" : undefined}
            className={`w-full py-3 px-4 rounded-2xl bg-[#1c243c] hover:bg-[#283354] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center transition-all active:scale-98 ${
              collapsed ? 'px-2 py-2.5' : ''
            }`}
          >
            {collapsed ? <LogIn className="w-5 h-5 text-white shrink-0" /> : <span>ĐĂNG NHẬP</span>}
          </button>
        )}

        {/* ── COLLAPSE TOGGLE ──────────────────────────────────── */}
        <div className="pt-1 border-t border-slate-200 dark:border-slate-800 flex justify-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 py-1 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full justify-center"
          >
            {collapsed ? <ChevronsRight className="w-4 h-4" /> : (
              <><ChevronsLeft className="w-4 h-4" /><span>Thu gọn</span></>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
