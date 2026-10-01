import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sun, Moon, Flame, Crown, ChevronDown, 
  Bell, User, FileEdit, Languages, LogOut, Search,
  Target, Gem, GraduationCap, ShieldCheck, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppMascot from './AppMascot';

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function AppHeader({ isPublic = false }) {
  const { user, openLoginModal, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isSpecialPortal = location.pathname.startsWith('/instructor') || location.pathname.startsWith('/admin');

  const profileDropdownRef = useRef(null);
  const moreMenuRef = useRef(null);

  const isLinkActive = (path) => {
    const currentFullPath = location.pathname + location.search;
    if (path.includes('?')) {
      return currentFullPath === path;
    }
    return location.pathname === path && !location.search;
  };

  const isMoreActive = [
    '/exams?type=toeic', '/games', '/workspace', '/community', '/shop'
  ].some(p => isLinkActive(p));

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/vocabulary?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const renderNavLinks = () => (
    <nav className="flex items-center gap-1.5 sm:gap-2 font-bold text-slate-700 dark:text-slate-200">
      <Link 
        to="/listening" 
        className={`px-3 py-1.5 rounded-xl border-2 transition-all duration-200 whitespace-nowrap text-xs sm:text-sm ${
          isLinkActive('/listening')
            ? 'bg-blue-600 text-white border-blue-600 font-extrabold shadow-sm'
            : 'border-transparent hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white'
        }`}
      >
        Luyện nghe
      </Link>
      
      <Link 
        to="/listening?mode=shadowing" 
        className={`px-3 py-1.5 rounded-xl border-2 transition-all duration-200 whitespace-nowrap text-xs sm:text-sm hidden sm:inline-block ${
          isLinkActive('/listening?mode=shadowing')
            ? 'bg-blue-600 text-white border-blue-600 font-extrabold shadow-sm'
            : 'border-transparent hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white'
        }`}
      >
        Shadowing
      </Link>

      <Link 
        to="/vocabulary" 
        className={`px-3 py-1.5 rounded-xl border-2 transition-all duration-200 whitespace-nowrap text-xs sm:text-sm ${
          isLinkActive('/vocabulary')
            ? 'bg-blue-600 text-white border-blue-600 font-extrabold shadow-sm'
            : 'border-transparent hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white'
        }`}
      >
        Từ vựng
      </Link>

      <Link 
        to="/speaking" 
        className={`px-3 py-1.5 rounded-xl border-2 transition-all duration-200 whitespace-nowrap text-xs sm:text-sm hidden lg:inline-block ${
          isLinkActive('/speaking')
            ? 'bg-blue-600 text-white border-blue-600 font-extrabold shadow-sm'
            : 'border-transparent hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white'
        }`}
      >
        Luyện nói
      </Link>

      <Link 
        to="/exams?type=ielts" 
        className={`px-3 py-1.5 rounded-xl border-2 transition-all duration-200 flex items-center whitespace-nowrap text-xs sm:text-sm relative group ${
          isLinkActive('/exams?type=ielts')
            ? 'bg-blue-600 text-white border-blue-600 font-extrabold shadow-sm'
            : 'border-transparent hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white'
        }`}
      >
        <span>Luyện thi IELTS</span>
        <span className="ml-1 px-1.5 py-0.2 text-[9px] font-black uppercase bg-[#ff7b6e] text-white rounded-full shadow-2xs transform -translate-y-1.5">
          Mới
        </span>
      </Link>

      {/* "Thêm ∨" Dropdown */}
      <div className="relative" ref={moreMenuRef}>
        <button
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          className={`px-3 py-1.5 rounded-xl border-2 transition-all duration-200 flex items-center gap-1 focus:outline-none font-bold text-xs sm:text-sm group ${
            isMoreActive
              ? 'bg-blue-600 text-white border-blue-600 font-extrabold shadow-sm'
              : 'border-transparent hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white'
          }`}
        >
          <span>Thêm</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
        </button>

        {isMoreOpen && (
          <div className="absolute left-0 top-10 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
            <Link
              to="/exams?type=toeic"
              onClick={() => setIsMoreOpen(false)}
              className={`block px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                isLinkActive('/exams?type=toeic')
                  ? 'bg-blue-600 text-white font-extrabold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white'
              }`}
            >
              Luyện thi TOEIC
            </Link>
            <Link
              to="/games"
              onClick={() => setIsMoreOpen(false)}
              className={`block px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                isLinkActive('/games')
                  ? 'bg-blue-600 text-white font-extrabold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white'
              }`}
            >
              Trò chơi
            </Link>
            <Link
              to="/workspace"
              onClick={() => setIsMoreOpen(false)}
              className={`block px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                isLinkActive('/workspace')
                  ? 'bg-blue-600 text-white font-extrabold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white'
              }`}
            >
              Ôn tập
            </Link>
            <Link
              to="/community"
              onClick={() => setIsMoreOpen(false)}
              className={`block px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                isLinkActive('/community')
                  ? 'bg-blue-600 text-white font-extrabold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white'
              }`}
            >
              Cộng đồng
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsMoreOpen(false)}
              className={`block px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                isLinkActive('/shop')
                  ? 'bg-blue-600 text-white font-extrabold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white'
              }`}
            >
              Đổi quà
            </Link>
          </div>
        )}
      </div>
    </nav>
  );

  const renderProfileDropdown = () => (
    <div className="relative shrink-0" ref={profileDropdownRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="relative group focus:outline-none flex items-center"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#5c4033] text-white flex items-center justify-center font-extrabold text-sm border-2 border-white dark:border-slate-800 shadow-md">
          {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
        </div>
        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[9px] font-black border border-slate-300 dark:border-slate-700 shadow-xs">
          Lv.{user?.level || 1}
        </span>
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 top-12 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-800 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
              {user?.fullName || 'Người dùng'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
              {user?.email || ''}
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 my-2" />

          <div className="space-y-1">
            <Link
              to={user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN' ? "/instructor/profile" : "/profile"}
              onClick={() => setIsProfileOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>Hồ sơ</span>
            </Link>

            {user?.role === 'ADMIN' && (
              <Link
                to="/admin"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Trang Quản Trị Admin</span>
              </Link>
            )}

            {(user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN') && (
              <Link
                to="/instructor"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Kênh Giảng Viên</span>
              </Link>
            )}

            <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
              <button
                onClick={() => {
                  setIsProfileOpen(false);
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
  );

  return (
    <header className="h-16 shrink-0 bg-white dark:bg-slate-900 border-b-2 border-slate-300 dark:border-slate-700 px-4 sm:px-6 flex items-center justify-between z-20 transition-colors">
      {/* ========================================================
          PUBLIC HOME HEADER
          ======================================================== */}
      {isPublic ? (
        <>
          {/* 1. LEFT SECTION: Mascot Logo + Navigation Links */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <AppMascot className="w-9 h-9 group-hover:scale-105 transition-transform" />
              <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight">
                EnglishHub
              </span>
            </Link>

            {renderNavLinks()}
          </div>

          {/* 2. RIGHT SECTION */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {user ? (
              <>
                {/* PRO Pill Button */}
                <Link
                  to="/pricing"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-md inline-flex items-center gap-2 transition-transform hover:scale-105 shrink-0 whitespace-nowrap"
                >
                  <Crown className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
                  <span className="whitespace-nowrap">Mở khóa PRO</span>
                </Link>

                {/* Bell */}
                <button 
                  title="Thông báo"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                >
                  <Bell className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>

                {/* Streak Badge (🔥) */}
                <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-extrabold text-sm shrink-0">
                  <div className="w-7 h-7 rounded-full bg-[#1c2336] flex items-center justify-center shadow-2xs">
                    <Flame className="w-4 h-4 fill-[#0088ff] text-[#0088ff]" />
                  </div>
                  <span>{user?.streak || user?.streakCount || 1}</span>
                </div>

                {/* User Profile Avatar & Dropdown (For Public Header) */}
                {renderProfileDropdown()}
              </>
            ) : (
              <button
                onClick={openLoginModal}
                className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </>
      ) : (
        /* ========================================================
            DASHBOARD TOP HEADER (WITH NAV LINKS & SEARCH PILL)
           ======================================================== */
        <>
          {/* LEFT: Search Dictionary Pill */}
          {!isSpecialPortal && (
            <div className="flex items-center gap-3 lg:gap-5">
              <div className="relative flex items-center bg-[#ebf3ff] dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700/80 rounded-full px-3.5 py-1.5 w-40 sm:w-48 focus-within:ring-2 focus-within:ring-blue-400 transition-all shrink-0">
                <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Tra từ điển"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  className="bg-transparent border-none outline-none text-xs sm:text-sm text-slate-700 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 w-full font-medium"
                />
              </div>
            </div>
          )}

          {/* RIGHT: Dashboard Controls & Badges */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {user ? (
              <>
                {/* Notification Bell */}
                <button
                  title="Thông báo"
                  className="p-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300" />
                </button>

                {!isSpecialPortal && (
                  <>
                    {/* Gems Badge (💎) */}
                    <div
                      title="Kim cương"
                      className="flex items-center gap-1.5 bg-[#ebf3ff] dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 rounded-full px-3 py-1 text-xs sm:text-sm font-black shrink-0 shadow-2xs"
                    >
                      <Gem className="w-4 h-4 text-sky-500 fill-sky-400 shrink-0" />
                      <span className="text-amber-500 dark:text-amber-400">{user?.gems ?? 51}</span>
                    </div>

                    {/* Missions Target Badge (🎯) */}
                    <div
                      title="Nhiệm vụ hàng ngày"
                      className="flex items-center gap-1.5 bg-[#fff8eb] dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-full px-3 py-1 text-xs sm:text-sm font-black shrink-0 shadow-2xs"
                    >
                      <Target className="w-4 h-4 text-amber-700 dark:text-amber-500 shrink-0" />
                      <span className="text-amber-700 dark:text-amber-400">0/3</span>
                    </div>

                    {/* PRO Badge */}
                    <Link
                      to="/pricing"
                      className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white rounded-full px-3.5 py-1 text-xs sm:text-sm font-black shadow-xs transition-transform hover:scale-105 shrink-0 whitespace-nowrap"
                    >
                      <Crown className="w-3.5 h-3.5 text-white fill-white/20 shrink-0" />
                      <span>PRO</span>
                    </Link>

                    {/* Streak Badge (🔥) */}
                    <div
                      title="Chuỗi học tập"
                      className="flex items-center gap-1.5 bg-[#e2e8f0]/80 dark:bg-slate-800 border border-slate-300/70 dark:border-slate-700 rounded-full px-3 py-1 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 shrink-0"
                    >
                      <Flame className="w-4 h-4 text-slate-800 dark:text-blue-400 fill-slate-800 dark:fill-blue-400 shrink-0" />
                      <span>{user?.streak || user?.streakCount || 1}</span>
                    </div>
                  </>
                )}
              </>
            ) : null}
          </div>
        </>
      )}
    </header>
  );
}

