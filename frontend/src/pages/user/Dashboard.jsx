import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Flame, Trophy, Search, Bell, Sun, Moon, Globe, Shield, Zap, Sparkles, 
  BookOpen, MessageSquare, Headphones, Award, Crown, Gamepad2, Layers, 
  MessageCircle, HelpCircle, FileText, Bookmark, LogOut, ChevronRight, ChevronLeft,
  ShoppingBag, CheckCircle, ExternalLink, Play, Lock, ArrowUpRight
} from 'lucide-react';
import AppLayout from '../../components/AppLayout';
import ActivityHeatmap from '../../components/ActivityHeatmap';
import MilestoneRewards from '../../components/MilestoneRewards';
import LeaderboardWidget from '../../components/LeaderboardWidget';
import StudyModeModal from '../../components/StudyModeModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const [checkedIn, setCheckedIn] = useState(false);
  const [gems, setGems] = useState(50);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Study Mode Modal state
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isStudyModeOpen, setIsStudyModeOpen] = useState(false);

  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto scroll effect - scrolls every 2.8 seconds, pauses on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCheckIn = () => {
    if (!checkedIn) {
      setCheckedIn(true);
      setGems(prev => prev + 50);
    }
  };

  const featuredLessons = [
    {
      id: 1,
      title: 'INGREDIENT DOUBLE CHOCOLATE FUDGE',
      thumbnail: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80',
      views: '19,423',
      level: 'B1',
      source: 'Youtube'
    },
    {
      id: 2,
      title: 'Could Bacon at Breakfast Lead to Dementia?',
      thumbnail: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?auto=format&fit=crop&w=500&q=80',
      views: '18,091',
      level: 'B1',
      source: 'Youtube'
    },
    {
      id: 3,
      title: 'SON TUNG M-TP x TYGA | COME MY WAY | OFFICIAL MUSIC...',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80',
      views: '23,567',
      level: 'B1',
      source: 'Youtube'
    },
    {
      id: 4,
      title: 'Learn Phonetics (IPA) in under 5 minutes',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      views: '62,418',
      level: 'A1',
      source: 'Youtube'
    },
    {
      id: 5,
      title: 'Love mom — Short English Animated Story',
      thumbnail: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=500&q=80',
      views: '135,559',
      level: 'A2',
      source: 'Youtube'
    },
    {
      id: 6,
      title: 'Chicken Little — Retold Audio Book',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80',
      views: '22,611',
      level: 'B1',
      source: 'Youtube'
    },
    {
      id: 7,
      title: '10 Minute Daily English Conversation Practice',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80',
      views: '45,820',
      level: 'B2',
      source: 'Youtube'
    },
    {
      id: 8,
      title: 'IELTS Speaking Part 2 Cue Card Strategy',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80',
      views: '89,120',
      level: 'C1',
      source: 'Youtube'
    },
    {
      id: 9,
      title: '50 Essential Phrasal Verbs for Work & Business',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80',
      views: '34,900',
      level: 'B2',
      source: 'Youtube'
    },
    {
      id: 10,
      title: 'BBC Learning English — English at Work',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80',
      views: '112,400',
      level: 'A2',
      source: 'Youtube'
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6 w-full pb-12">
        {/* Top Row: Welcome Back Title & Baolingo Ad */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Chào mừng trở lại
            </h1>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Giữ vững chuỗi học và nhận phần thưởng
            </p>
          </div>

          {/* Ad Banner */}
          <div className="bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 dark:from-amber-950 dark:to-yellow-900 p-4 rounded-3xl border-2 border-amber-300 dark:border-amber-700 flex items-center gap-4 shadow-sm max-w-md">
            <div className="w-12 h-12 rounded-xl bg-amber-400/30 flex items-center justify-center text-2xl shrink-0">
              🐼
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">Baolingo 🇨🇳</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-amber-900">QUẢNG CÁO</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 truncate">
                Học tiếng Trung dễ như chơi — từ vựng, HSK & giao tiếp.
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shrink-0 hover:bg-slate-800 transition-colors">
              Khám phá →
            </button>
          </div>
        </div>

        {/* Streak & XP Widget Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-300 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Streak Counter */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
                <Flame className="w-8 h-8 fill-current" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Streak hiện tại</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  0 <span className="text-base font-bold text-slate-500">ngày</span>
                </h3>
              </div>
            </div>

            {/* Level & XP progress bar */}
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                    1
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-extrabold">✨ Lên level 2</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">0 XP</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full w-[5%] transition-all"></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 text-right font-medium">
                Còn 0 XP đến level tiếp
              </p>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button 
              onClick={handleCheckIn}
              className={`px-5 py-3 rounded-2xl font-extrabold text-xs flex items-center gap-2 transition-all shadow-sm ${
                checkedIn 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-indigo-950 text-white hover:bg-indigo-900'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400 fill-current" />
              {checkedIn ? 'ĐÃ ĐIỂM DANH! (+50 💎)' : '🔥 ĐIỂM DANH NGAY · NHẬN 50 💎 HÔM NAY'}
            </button>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>❄️ Streak freeze: 0</span>
              <button className="px-3 py-1 rounded-xl bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 hover:bg-slate-50">
                🛒 MUA
              </button>
            </div>
          </div>
        </div>

        {/* Quick Review Banner */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-300 dark:border-slate-700 shadow-sm space-y-4">
          <div>
            <p className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> 🎯 Ôn tập nhanh
            </p>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Tiếp tục từ chỗ bạn đã dừng lại
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/vocabulary" className="p-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-sm flex items-center justify-between hover:scale-[1.01] transition-transform shadow-lg shadow-orange-500/20">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                <div>
                  <p className="uppercase tracking-wider text-xs opacity-90">HỌC TỪ VỰNG</p>
                  <p className="text-xs font-normal opacity-80">Bấm để bắt đầu</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 opacity-80" />
            </Link>

            <Link to="/listening" className="p-5 rounded-2xl bg-[#1E2540] dark:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-between hover:scale-[1.01] transition-transform shadow-lg shadow-slate-900/20">
              <div className="flex items-center gap-3">
                <Headphones className="w-6 h-6 text-indigo-400" />
                <div>
                  <p className="uppercase tracking-wider text-xs">NGHE / PHÁT ÂM</p>
                  <p className="text-xs font-normal text-slate-400">Bấm để bắt đầu</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Today's Featured Lessons Infinite Slow-Motion Carousel */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Bài học nổi bật hôm nay
          </h2>

          {/* Infinite Slow-Motion Track */}
          <div className="overflow-hidden py-2 rounded-2xl">
            <div className="animate-marquee-slow flex gap-4">
              {[...featuredLessons, ...featuredLessons].map((lesson, idx) => (
                <div
                  key={`${lesson.id}-${idx}`}
                  onClick={() => {
                    setSelectedLesson(lesson);
                    setIsStudyModeOpen(true);
                  }}
                  className="shrink-0 w-[240px] sm:w-[260px] lg:w-[275px] group/card bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-300 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 opacity-90"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold flex items-center gap-1">
                        <Headphones className="w-3 h-3 text-indigo-400" />
                        {lesson.views}
                      </span>
                    </div>

                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-[10px]">
                        {lesson.level}
                      </span>
                    </div>

                    {/* Play Hover Overlay */}
                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg transform scale-75 group-hover/card:scale-100 transition-transform">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Youtube Tag */}
                    <div className="absolute bottom-2 left-2">
                      <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[9px] font-bold">
                        ▶ Youtube
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover/card:text-blue-600 transition-colors leading-snug">
                      {lesson.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 90-Day Activity Grid (Visual matching user screenshot 2) */}
        <ActivityHeatmap />

        {/* Rewards & Leaderboard Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MilestoneRewards />
          <LeaderboardWidget />
        </div>
      </div>

      {/* Study Mode Selection Modal */}
      <StudyModeModal
        isOpen={isStudyModeOpen}
        onClose={() => setIsStudyModeOpen(false)}
        lesson={selectedLesson}
      />
    </AppLayout>
  );
}
