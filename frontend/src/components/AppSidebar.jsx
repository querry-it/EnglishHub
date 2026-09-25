import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, Headphones, Repeat, FileText, Mic, 
  ClipboardList, GraduationCap, Gamepad2, Video, Brain, 
  MessageSquare, MessageCircle, Trophy, ChevronDown, LogOut, Crown, FileEdit, LogIn, ShoppingBag, Gift,
  ChevronsLeft, ChevronsRight, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppMascot from './AppMascot';

export default function AppSidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const { user, openLoginModal, logout } = useAuth();
  const [showMoreItems, setShowMoreItems] = useState(true);

  const mainNavItems = [
    { label: 'Trang chủ', icon: Home, path: '/' },
    { label: 'Chủ đề', icon: BookOpen, path: '/courses' },
    { label: 'Luyện nghe', icon: Headphones, path: '/listening' },
    { label: 'Từ vựng', icon: FileText, path: '/vocabulary' },
    { label: 'Luyện nói', icon: Mic, path: '/speaking' },
    { label: 'Luyện thi TOEIC', icon: ClipboardList, path: '/exams?type=toeic' },
    { label: 'Luyện thi IELTS', icon: GraduationCap, path: '/exams?type=ielts' },
    { label: 'Trò Chơi', icon: Gamepad2, path: '/games' },
    { label: 'Ôn tập', icon: Brain, path: '/workspace', badgeCount: 2 },
  ];

  const communityNavItems = [
    { label: 'Cộng đồng', icon: MessageSquare, path: '/community' },
    { label: 'Bảng xếp hạng', icon: Trophy, path: '/leaderboard' },
    { label: 'Trò chuyện', icon: MessageCircle, path: '/chat' },
    { label: 'Feedback từ người dùng', icon: MessageSquare, path: '/feedbacks' },
    { label: 'Đổi quà', icon: Gift, path: '/shop' },
  ];

  const userItems = [
    { label: 'Ghi chú của tôi', icon: FileEdit, path: '/workspace?tab=notes' },
    { label: 'Từ vựng của tôi', icon: FileText, path: '/vocabulary?tab=saved' },
  ];

  const isNavItemActive = (itemPath) => {
    const currentFullPath = location.pathname + location.search;
    if (currentFullPath === itemPath) return true;

    if (itemPath === '/' && (location.pathname === '/' || location.pathname === '/dashboard')) {
      return true;
    }

    const [itemBasePath, itemQueryString] = itemPath.split('?');

    if (itemQueryString) {
      return location.pathname === itemBasePath && location.search.includes(itemQueryString);
    } else if (itemPath !== '/') {
      if (location.pathname !== itemBasePath && !location.pathname.startsWith(itemBasePath + '/')) {
        return false;
      }
      if (location.search) {
        const allItems = [...mainNavItems, ...communityNavItems, ...userItems];
        const isHandledByQueryItem = allItems.some(it => {
          const [bPath, qStr] = it.path.split('?');
          return qStr && bPath === itemBasePath && location.search.includes(qStr);
        });
        if (isHandledByQueryItem) return false;
      }
      return true;
    }

    return false;
  };

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white dark:bg-slate-900 border-r-2 border-slate-300 dark:border-slate-700 flex flex-col h-screen sticky top-0 z-30 shrink-0 select-none transition-all duration-300`}>
      
      {/* 1. TOP HEADER (LOGO) */}
      <div className="h-16 px-4 border-b-2 border-slate-300 dark:border-slate-700 shrink-0 flex items-center justify-between">
        <Link to="/intro" className="flex items-center gap-2.5 px-1 group" title="Quay lại trang giới thiệu">
          <AppMascot className="w-8 h-8 shrink-0 group-hover:scale-105 transition-transform" />
          {!collapsed && (
            <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
              EnglishHub
            </span>
          )}
        </Link>
      </div>

      {/* 2. MIDDLE NAVIGATION SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
        {/* Main Nav Items */}
        <nav className="space-y-1">
          {mainNavItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = isNavItemActive(item.path);

            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 font-extrabold border-2 border-sky-300 dark:border-sky-700 shadow-2xs'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400'}`} />
                  {!collapsed && <span className="text-sm font-bold">{item.label}</span>}
                </div>
                {!collapsed && item.badgeCount && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-mono text-[10px] flex items-center justify-center font-extrabold shrink-0 shadow-xs">
                    {item.badgeCount}
                  </span>
                )}
                {!collapsed && item.isNew && (
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-rose-500 text-white rounded-full">
                    MỚI
                  </span>
                )}
              </Link>
            );
          })}

          {/* Community Section Header & Items */}
          <div className="pt-2">
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 mb-1">
              {!collapsed && (
                <p className="px-3.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                  CỘNG ĐỒNG
                </p>
              )}
            </div>

            {communityNavItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = isNavItemActive(item.path);
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                    isActive 
                      ? 'bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 font-extrabold border-2 border-sky-300 dark:border-sky-700' 
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0" />
                    {!collapsed && <span className="text-sm font-bold">{item.label}</span>}
                  </div>
                </Link>
              );
            })}

            {/* Chevron Expand / Collapse Toggle Button */}
            {!collapsed && (
              <div className="flex justify-end pt-1 pr-1">
                <button
                  onClick={() => setShowMoreItems(!showMoreItems)}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 transition-colors border border-slate-200 dark:border-slate-700 shadow-xs"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMoreItems ? '' : 'rotate-180 text-indigo-600'}`} />
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* PRO Banner Button (Matching exact reference gradient) */}
        {!collapsed && (
          <div className="pt-2">
            <Link
              to="/courses"
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-600 to-purple-600 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 border-2 border-indigo-900/30 transition-all transform active:scale-98"
            >
              <Crown className="w-4 h-4 text-amber-300 fill-current shrink-0" />
              <span>MỞ KHÓA PRO</span>
            </Link>
          </div>
        )}

        {/* User Items (Ghi chú | Từ vựng | Đăng xuất) */}
        {!collapsed && (
          <div className="pt-2 space-y-1">
            {userItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {user ? (
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-extrabold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors text-left"
              >
                <LogOut className="w-5 h-5 shrink-0 text-rose-600" />
                <span>Đăng xuất</span>
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-extrabold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors text-left"
              >
                <LogIn className="w-5 h-5 shrink-0" />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* 3. USER PROFILE BAR (Bottom of Sidebar) */}
      {!collapsed && (
        <div className="p-3 border-t-2 border-slate-100 dark:border-slate-800 shrink-0">
          <Link to="/profile" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-stone-700 text-white flex items-center justify-center font-bold text-sm border-2 border-white dark:border-slate-800">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : '?'}
              </div>
              <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[9px] font-black border border-white dark:border-slate-800">
                Lv.{user?.level || 1}
              </span>
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                {user?.fullName || 'Khách'}
              </h4>
              <p className="text-xs text-slate-400 font-semibold">
                {user?.role === 'ADMIN' ? 'Quản trị viên' : user?.role === 'INSTRUCTOR' ? 'Giảng viên' : 'Học viên'}
              </p>
            </div>
          </Link>
        </div>
      )}

      {/* 4. BOTTOM-MOST COLLAPSE BUTTON */}
      <div className="p-2 border-t border-slate-100 dark:border-slate-800 shrink-0 flex justify-center">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 py-1.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {collapsed ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronsLeft className="w-4 h-4" />
              <span>Thu gọn</span>
            </>
          )}
        </button>
      </div>

    </aside>
  );
}

