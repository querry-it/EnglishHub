import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Sun, Moon, Globe, Menu, X, ChevronDown, 
  Award, Gamepad2, Trophy, Headphones, CheckCircle, HelpCircle, Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppMascot from './AppMascot';

export default function Header() {
  const { openLoginModal } = useAuth();
  const [lang, setLang] = useState('VI');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const moreDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setMoreDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMoreDropdownOpen(false);
        setLangDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const mainNavItems = [
    { label: 'Luyện nghe', path: '/listening' },
    { label: 'Từ vựng', path: '/vocabulary' },
    { label: 'Luyện nói', path: '/speaking' },
    { label: 'Luyện thi IELTS', path: '/exams', isNew: true },
  ];

  const moreItems = [
    { label: 'Luyện thi TOEIC', path: '/exams?type=toeic', icon: Award, desc: 'Đề thi TOEIC 900+ đếm ngược' },
    { label: 'Trò chơi học tập', path: '/games', icon: Gamepad2, desc: 'Mini game ghép từ & spelling bee' },
    { label: 'Ôn tập SRS', path: '/workspace', icon: CheckCircle, desc: 'Thuật toán lặp lại ngắt quãng' },
    { label: 'Bảng xếp hạng', path: '/leaderboard', icon: Trophy, desc: 'Thi đua XP & streak toàn quốc' },
    { label: 'Cộng đồng', path: '/about', icon: Users, desc: 'Giao lưu học viên toàn quốc' },
    { label: 'Hỏi đáp (FAQ)', path: '/faq', icon: HelpCircle, desc: 'Trợ giúp & giải đáp thắc mắc' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-800 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link 
          to="/intro" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center gap-2.5 shrink-0 group"
          title="Kéo về đầu trang giới thiệu EnglishHub"
        >
          <AppMascot className="w-8 h-8 group-hover:scale-105 transition-transform" />
          <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
            EnglishHub
          </span>
        </Link>

        {/* Center Nav Items: Luyện nghe | Shadowing | Từ vựng | Luyện nói | Luyện thi IELTS [MỚI] | Thêm ∨ */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {mainNavItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-bold transition-all flex items-center gap-1.5 px-3.5 py-2 rounded-xl group ${
                  isActive
                    ? 'text-white bg-blue-600 font-extrabold shadow-sm'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white'
                }`
              }
            >
              <span>{item.label}</span>
              {item.isNew && (
                <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full leading-none shadow-xs">
                  MỚI
                </span>
              )}
            </NavLink>
          ))}

          {/* "Thêm ∨" Dropdown with useRef outside-click handler */}
          <div className="relative" ref={moreDropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(prev => !prev)}
              className={`text-sm font-bold transition-all flex items-center gap-1.5 px-3.5 py-2 rounded-xl group ${
                moreDropdownOpen
                  ? 'text-white bg-blue-600 font-extrabold shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white'
              }`}
            >
              <span>Thêm</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-white' : 'text-slate-400 group-hover:text-white'}`} />
            </button>

            {/* Dropdown Menu */}
            {moreDropdownOpen && (
              <div className="absolute top-full right-0 lg:left-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-fade-in-down">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  HẠNG MỤC MỞ RỘNG
                </div>
                <div className="space-y-1">
                  {moreItems.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMoreDropdownOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-800 dark:text-slate-100 hover:text-white dark:hover:text-white transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 group-hover:bg-white/20 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold block transition-colors">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-slate-400 group-hover:text-blue-100 truncate block transition-colors">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Theme Toggle (☀️/🌙) | Language (🇻🇳 Tiếng Việt ∨) | Login */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Light / Dark Mode Button */}
          <button
            onClick={toggleDarkMode}
            title="Đổi giao diện sáng/tối"
            className="text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all p-2 rounded-xl group"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400 group-hover:text-white" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Language Selector (🇻🇳 Tiếng Việt ∨) */}
          <div className="relative hidden sm:block" ref={langDropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(prev => !prev)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all group"
            >
              <span>{lang === 'VI' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langDropdownOpen ? 'rotate-180 text-white' : 'text-slate-400 group-hover:text-white'}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-36 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-1 z-50 animate-fade-in-down space-y-0.5">
                <button
                  onClick={() => { setLang('VI'); setLangDropdownOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg text-left transition-colors ${
                    lang === 'VI' ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  <span>🇻🇳 Tiếng Việt</span>
                </button>
                <button
                  onClick={() => { setLang('EN'); setLangDropdownOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg text-left transition-colors ${
                    lang === 'EN' ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  <span>🇬🇧 English</span>
                </button>
              </div>
            )}
          </div>

          {/* Clean Single Login Text Link */}
          <button
            onClick={openLoginModal}
            className="text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shrink-0"
          >
            Đăng nhập
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2 animate-fade-in-down">
          {mainNavItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between text-sm font-semibold py-2 px-3 rounded-lg transition-colors ${
                  isActive ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50' : 'text-slate-700 dark:text-slate-300'
                }`
              }
            >
              <span>{item.label}</span>
              {item.isNew && (
                <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full">
                  MỚI
                </span>
              )}
            </NavLink>
          ))}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
              Hạng mục khác
            </div>
            {moreItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-semibold py-2 px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
