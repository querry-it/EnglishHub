import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sun, Moon, Flame, Crown, Diamond, Target, Globe, Share2, ChevronDown } from 'lucide-react';

export default function AppHeader({ gems = 52, missions = '0/3' }) {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-16 shrink-0 bg-white dark:bg-slate-900 border-b-2 border-slate-300 dark:border-slate-700 px-6 sm:px-8 flex items-center justify-between z-20 transition-colors">
      {/* Search Dictionary Input */}
      <div className="relative w-80 md:w-96">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
        <input
          type="text"
          placeholder="Tra từ điển"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-sm font-bold focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100 shadow-xs"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noreferrer" 
          className="hidden md:flex items-center gap-2 text-sm font-extrabold px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 border-2 border-blue-200 hover:bg-blue-100 transition-colors shadow-2xs"
        >
          <Share2 className="w-4 h-4" /> Facebook Community
        </a>

        <button 
          onClick={toggleTheme}
          title="Đổi giao diện sáng/tối"
          className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-2xs"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </button>

        <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-extrabold text-slate-800 dark:text-slate-200 border-2 border-slate-300 dark:border-slate-700 shadow-2xs">
          <Globe className="w-4 h-4 text-slate-500" />
          <span>Tiếng Việt</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Gems */}
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-black text-sm border-2 border-sky-300 dark:border-sky-800 shadow-2xs">
          <Diamond className="w-4 h-4 fill-sky-500 text-sky-500" />
          <span>{gems}</span>
        </div>

        {/* Mission counter */}
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-black text-sm border-2 border-amber-300 dark:border-amber-800 shadow-2xs">
          <Target className="w-4 h-4 text-amber-500" />
          <span>{missions}</span>
        </div>

        {/* PRO badge */}
        <Link to="/pricing" className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-black text-sm shadow-md flex items-center gap-1.5 border-2 border-indigo-900/30 transition-transform hover:scale-105">
          <Crown className="w-4 h-4 text-amber-300 fill-current" />
          <span>PRO</span>
        </Link>

        {/* Streak Flame */}
        <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-500 shadow-2xs">
          <Flame className="w-5 h-5 fill-current" />
        </div>
      </div>
    </header>
  );
}
