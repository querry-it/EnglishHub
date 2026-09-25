import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Crown, Sparkles, Headphones, Play, ArrowRight, 
  Search, Users, Video, Filter, ChevronDown, ArrowLeft,
  GraduationCap, Clock, CheckCircle2
} from 'lucide-react';
import StudyModeModal from '../components/StudyModeModal';

export default function Courses() {
  const navigate = useNavigate();

  // Filter States
  const [activeLevelCategory, setActiveLevelCategory] = useState('advanced'); // 'beginner' | 'advanced'
  const [selectedTag, setSelectedTag] = useState('#movie');
  const [viewMode, setViewMode] = useState('category'); // 'category' (all sections) | 'filtered' (topic view with filter bar)
  
  // Topic View Filters
  const [filterSearch, setFilterSearch] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all'); // 'all' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'unlearned' | 'in_progress' | 'completed'
  const [youtubeUrl, setYoutubeUrl] = useState('');

  // Study Mode Modal state
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isStudyModeOpen, setIsStudyModeOpen] = useState(false);

  const topicTags = [
    '#movie', '#daily', '#learning', '#shadowing', '#ielts', '#entertainment',
    '#toeic', '#kids', '#songs', '#bbc', '#voa', '#toefl', '#science',
    '#fairy-tale', '#podcast', '#ipa', '#food', '#tutorial', '#news',
    '#vietnam', '#ted', '#travel', '#animals', '#story', '#business'
  ];

  // Comprehensive Catalog Dataset matching screenshots
  const allLessons = [
    // Movie Clips Category
    {
      id: 101,
      title: 'PRINCESS MONONOKE | Official English Trailer',
      category: 'Movie short clip',
      tag: '#movie',
      thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
      views: '61,160',
      level: 'A2',
      duration: '01:04',
      isPro: true,
      status: 'unlearned'
    },
    {
      id: 102,
      title: "KIKI'S DELIVERY SERVICE | Official English Trailer",
      category: 'Movie short clip',
      tag: '#movie',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
      views: '94,855',
      level: 'B1',
      duration: '00:50',
      isPro: false,
      status: 'unlearned'
    },
    {
      id: 103,
      title: 'Toy Story Tribute',
      category: 'Movie short clip',
      tag: '#movie',
      thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=500&q=80',
      views: '44,559',
      level: 'B2',
      duration: '01:53',
      isPro: false,
      status: 'in_progress'
    },
    {
      id: 104,
      title: 'Stranger Things 5 | Official Trailer | Netflix',
      category: 'Movie short clip',
      tag: '#movie',
      thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=500&q=80',
      views: '22,249',
      level: 'B1',
      duration: '02:55',
      isPro: true,
      status: 'unlearned'
    },
    {
      id: 105,
      title: 'TOM & JERRY - Official Trailer',
      category: 'Movie short clip',
      tag: '#movie',
      thumbnail: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=500&q=80',
      views: '21,492',
      level: 'B2',
      duration: '02:25',
      isPro: true,
      status: 'unlearned'
    },
    {
      id: 106,
      title: 'Avatar: Fire and Ash | Official Trailer',
      category: 'Movie short clip',
      tag: '#movie',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
      views: '17,369',
      level: 'B2',
      duration: '02:26',
      isPro: false,
      status: 'unlearned'
    },
    {
      id: 107,
      title: 'YOUR NAME English Trailer (2016) Anime Movie',
      category: 'Movie short clip',
      tag: '#movie',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80',
      views: '21,760',
      level: 'B1',
      duration: '01:47',
      isPro: false,
      status: 'completed'
    },
    {
      id: 108,
      title: 'Suzume Dub Trailer (2023)',
      category: 'Movie short clip',
      tag: '#movie',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80',
      views: '15,039',
      level: 'B1',
      duration: '02:13',
      isPro: true,
      status: 'unlearned'
    },

    // Daily Conversation Category
    {
      id: 201,
      title: '10 Minute Daily Conversation Practice for Beginners',
      category: 'Daily English Conversation',
      tag: '#daily',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80',
      views: '136,006',
      level: 'A2',
      duration: '04:12',
      isPro: false,
      status: 'unlearned'
    },
    {
      id: 202,
      title: 'Ordering Food at a Restaurant — Real Spoken English',
      category: 'Daily English Conversation',
      tag: '#daily',
      thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80',
      views: '47,843',
      level: 'A2',
      duration: '02:45',
      isPro: false,
      status: 'completed'
    },
    {
      id: 203,
      title: 'How to Introduce Yourself with Confidence',
      category: 'Daily English Conversation',
      tag: '#daily',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
      views: '22,964',
      level: 'B1',
      duration: '03:30',
      isPro: true,
      status: 'unlearned'
    },
    {
      id: 204,
      title: 'Talking About Your Daily Routine & Habits',
      category: 'Daily English Conversation',
      tag: '#daily',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80',
      views: '37,954',
      level: 'B1',
      duration: '02:18',
      isPro: false,
      status: 'unlearned'
    },

    // Learning & IELTS Category
    {
      id: 301,
      title: 'IELTS Speaking Part 2 — Band 9 Sample Answer',
      category: 'IELTS & Learning',
      tag: '#ielts',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=500&q=80',
      views: '88,900',
      level: 'B2',
      duration: '05:15',
      isPro: true,
      status: 'unlearned'
    },
    {
      id: 302,
      title: 'BBC 6 Minute English — The Future of AI',
      category: 'BBC & News',
      tag: '#bbc',
      thumbnail: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=500&q=80',
      views: '112,400',
      level: 'B2',
      duration: '06:00',
      isPro: false,
      status: 'unlearned'
    }
  ];

  // Grouped Categories for default view
  const categoriesGrouped = useMemo(() => {
    const movieGroup = allLessons.filter(l => l.tag === '#movie');
    const dailyGroup = allLessons.filter(l => l.tag === '#daily');
    const ieltsGroup = allLessons.filter(l => l.tag === '#ielts' || l.tag === '#bbc');

    return [
      { id: 'movie', title: 'Movie short clip', count: '157 bài học', lessons: movieGroup },
      { id: 'daily', title: 'Daily English Conversation', count: '148 bài học', lessons: dailyGroup },
      { id: 'learning', title: 'IELTS & Learning Video Clips', count: '92 bài học', lessons: ieltsGroup }
    ];
  }, []);

  // Filtered Lessons for Topic/Filter View
  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      // Search Title Filter
      if (filterSearch.trim() && !lesson.title.toLowerCase().includes(filterSearch.toLowerCase())) {
        return false;
      }
      // Difficulty Filter
      if (filterDifficulty !== 'all' && lesson.level !== filterDifficulty) {
        return false;
      }
      // Status Filter
      if (filterStatus !== 'all' && lesson.status !== filterStatus) {
        return false;
      }
      // Tag Filter (if specific tag chosen in filtered mode)
      if (selectedTag && selectedTag !== '#movie' && viewMode === 'filtered') {
        const cleanTag = selectedTag.replace('#', '');
        const matchTag = lesson.tag.includes(cleanTag) || lesson.category.toLowerCase().includes(cleanTag);
        if (!matchTag) return false;
      }
      return true;
    });
  }, [filterSearch, filterDifficulty, filterStatus, selectedTag, viewMode]);

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 'A1':
      case 'A2':
        return 'bg-emerald-500 text-white';
      case 'B1':
        return 'bg-blue-600 text-white';
      case 'B2':
        return 'bg-purple-600 text-white';
      case 'C1':
      case 'C2':
        return 'bg-rose-600 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
    setViewMode('filtered');
  };

  const handleViewCategory = (catTitle) => {
    setViewMode('filtered');
  };

  return (
    <div className="space-y-6 w-full pb-16 text-slate-900 dark:text-white">

      {/* ========================================================================= */}
      {/* MODE 1: TOPIC FILTERED VIEW (MATCHING SCREENSHOT 1 EXACTLY)               */}
      {/* ========================================================================= */}
      {viewMode === 'filtered' ? (
        <div className="space-y-6 animate-fade-in">

          {/* Top Back Button & Heading Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <button
                onClick={() => setViewMode('category')}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại chủ đề</span>
              </button>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {selectedTag === '#movie' ? 'Movie short clip' : selectedTag.replace('#', '').toUpperCase()}
              </h1>
            </div>

            <div className="text-xs font-extrabold text-slate-400">
              Tổng số bài học: <span className="font-mono text-slate-700 dark:text-slate-200">157</span>
            </div>
          </div>

          {/* BỘ LỌC FILTER BAR (MATCHING SCREENSHOT 1 EXACTLY) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
              <span>BỘ LỌC</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search Input Box */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  placeholder="Tìm kiếm bài học..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors"
                />
              </div>

              {/* Difficulty Filter Dropdown */}
              <div className="md:col-span-3 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center gap-1 text-xs">
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                </div>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200 appearance-none cursor-pointer focus:outline-none focus:border-indigo-600"
                >
                  <option value="all">Tất cả độ khó</option>
                  <option value="A1">Level A1 (Cơ bản)</option>
                  <option value="A2">Level A2 (Sơ cấp)</option>
                  <option value="B1">Level B1 (Trung cấp)</option>
                  <option value="B2">Level B2 (Trung cao cấp)</option>
                  <option value="C1">Level C1 (Cao cấp)</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
              </div>

              {/* Status Filter Dropdown */}
              <div className="md:col-span-3 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center gap-1 text-xs">
                  <Clock className="w-4 h-4 text-indigo-500" />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200 appearance-none cursor-pointer focus:outline-none focus:border-indigo-600"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="unlearned">Chưa học</option>
                  <option value="in_progress">Đang học</option>
                  <option value="completed">Đã hoàn thành</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
              </div>
            </div>
          </div>

          {/* 4-COLUMN CARDS GRID (MATCHING SCREENSHOT 1 EXACTLY) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => {
                  setSelectedLesson(lesson);
                  setIsStudyModeOpen(true);
                }}
                className={`bg-white dark:bg-slate-900 rounded-3xl border-2 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between cursor-pointer ${
                  lesson.isPro
                    ? 'border-amber-400 dark:border-amber-500/80 ring-1 ring-amber-400/30'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Top Thumbnail Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                    {lesson.isPro && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-400 text-amber-950 font-black text-[10px] flex items-center gap-1 shadow-sm">
                        <Crown className="w-3 h-3 fill-current text-amber-950" /> PRO
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold flex items-center gap-1">
                      <Headphones className="w-3 h-3 text-indigo-400" />
                      {lesson.views}
                    </span>
                  </div>

                  <div className="absolute top-2 right-2 z-10">
                    <span className={`px-2.5 py-0.5 rounded-md font-extrabold text-[10px] shadow-sm ${getLevelBadgeColor(lesson.level)}`}>
                      {lesson.level}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Image Badges */}
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="px-2 py-0.5 rounded bg-rose-600/90 text-white text-[9px] font-bold">
                      ▶ Youtube
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 z-10">
                    <span className="px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[10px] font-bold">
                      ⏱ {lesson.duration}
                    </span>
                  </div>
                </div>

                {/* Content & Practice Tags Footer */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    {lesson.title}
                  </h4>

                  {/* Practice Mode Options (Dictation Only - Shadowing removed) */}
                  <div className="flex items-center justify-start text-xs font-bold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/listening?mode=dictation&lessonId=${lesson.id}`);
                      }}
                      className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                    >
                      Dictation <span className="text-[10px] text-slate-400">⊗</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (

        /* ========================================================================= */
        /* MODE 2: MAIN CATEGORY OVERVIEW (MATCHING SCREENSHOT 2 EXACTLY)            */
        /* ========================================================================= */
        <>
          {/* TOP HEADER: Giải thích Phương pháp Nghe chép chính tả */}
          <div className="text-center py-2 space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Giải thích Phương pháp Nghe chép chính tả
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Khám phá cách <span className="font-black text-slate-900 dark:text-white">hiệu quả nhất</span> để học và tinh chỉnh <span className="font-black text-slate-900 dark:text-white">kỹ năng nghe tiếng Anh</span>
            </p>
          </div>

          {/* 1. TOP AI YOUTUBE CONVERTER BANNER */}
          <div className="bg-[#F8FAFC] dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
                  Tạo bài học từ video YouTube
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-500" /> AI
                </span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-black text-[11px] flex items-center gap-1 shadow-xs">
                  <Crown className="w-3 h-3 text-amber-300 fill-current" /> PRO
                </span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium pl-0.5">
              Dán link video tiếng Anh, AI sẽ tự tạo transcript và phân loại cấp độ cho bạn.
            </p>

            {/* Input & Create Button Row */}
            <div className="flex flex-col md:flex-row items-center gap-3 pt-1">
              <div className="relative flex-1 w-full">
                <Video className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Dán link YouTube vào đây..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 shadow-2xs"
                />
              </div>
              <button className="w-full md:w-auto px-6 py-3 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shrink-0 transition-transform active:scale-98">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>TẠO BÀI HỌC</span>
              </button>
            </div>

            {/* Bottom Subtext & Nav Action Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200/80 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Nâng cấp Pro để biến video YouTube thành bài học.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/listening"
                  className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 shadow-2xs"
                >
                  <Video className="w-4 h-4 text-rose-500" /> Kênh YouTube
                </Link>
                <Link
                  to="/about"
                  className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>KHÁM PHÁ BÀI HỌC CỘNG ĐỒNG</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2. HEADING & TOPIC TAG FILTERS (MATCHING SCREENSHOT 2 EXACTLY) */}
          <div className="space-y-4">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Luyện Shadowing và dictation qua video đa dạng chủ đề
            </h1>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Level Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setActiveLevelCategory('beginner')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    activeLevelCategory === 'beginner'
                      ? 'bg-[#1E2540] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 font-bold hover:text-slate-900'
                  }`}
                >
                  Người mới bắt đầu
                </button>
                <button
                  onClick={() => setActiveLevelCategory('advanced')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    activeLevelCategory === 'advanced'
                      ? 'bg-[#1E2540] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 font-bold hover:text-slate-900'
                  }`}
                >
                  Nâng cao
                </button>
              </div>

              {/* Topic Hashtag Pills */}
              {topicTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectTag(tag)}
                  className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all border ${
                    selectedTag === tag
                      ? 'bg-[#1E2540] text-white border-[#1E2540] dark:bg-indigo-600 dark:border-indigo-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 3. CATEGORIES & LESSON CARDS GRID */}
          <div className="space-y-10">
            {categoriesGrouped.map((cat) => (
              <div key={cat.id} className="space-y-4">

                {/* Category Header Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-[#1E2540] dark:bg-indigo-500 rounded-full" />
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                      {cat.title}
                      <span className="text-xs font-bold text-slate-400">({cat.count})</span>
                    </h3>
                  </div>

                  <button
                    onClick={() => handleViewCategory(cat.title)}
                    className="px-4 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold text-xs border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    XEM TẤT CẢ &gt;
                  </button>
                </div>

                {/* 4-Column Lesson Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {cat.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        setSelectedLesson(lesson);
                        setIsStudyModeOpen(true);
                      }}
                      className={`bg-white dark:bg-slate-900 rounded-3xl border-2 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between cursor-pointer ${
                        lesson.isPro
                          ? 'border-amber-400 dark:border-amber-500/80 ring-1 ring-amber-400/30'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {/* Top Image Container */}
                      <div className="relative aspect-video overflow-hidden bg-slate-950">
                        <img
                          src={lesson.thumbnail}
                          alt={lesson.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                          {lesson.isPro && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-400 text-amber-950 font-black text-[10px] flex items-center gap-1 shadow-sm">
                              <Crown className="w-3 h-3 fill-current text-amber-950" /> PRO
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold flex items-center gap-1">
                            <Headphones className="w-3 h-3 text-indigo-400" />
                            {lesson.views}
                          </span>
                        </div>

                        <div className="absolute top-2 right-2 z-10">
                          <span className={`px-2.5 py-0.5 rounded-md font-extrabold text-[10px] shadow-sm ${getLevelBadgeColor(lesson.level)}`}>
                            {lesson.level}
                          </span>
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Bottom Image Badges */}
                        <div className="absolute bottom-2 left-2 z-10">
                          <span className="px-2 py-0.5 rounded bg-rose-600/90 text-white text-[9px] font-bold">
                            ▶ Youtube
                          </span>
                        </div>

                        <div className="absolute bottom-2 right-2 z-10">
                          <span className="px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[10px] font-bold">
                            ⏱ {lesson.duration}
                          </span>
                        </div>
                      </div>

                      {/* Content & Practice Tags Footer */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                          {lesson.title}
                        </h4>

                        {/* Practice Mode Options (Dictation Only - Shadowing removed) */}
                        <div className="flex items-center justify-start text-xs font-bold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/listening?mode=dictation&lessonId=${lesson.id}`);
                            }}
                            className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                          >
                            Dictation <span className="text-[10px] text-slate-400">⊗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </>
      )}

      {/* Study Mode Selection Modal */}
      <StudyModeModal
        isOpen={isStudyModeOpen}
        onClose={() => setIsStudyModeOpen(false)}
        lesson={selectedLesson}
      />
    </div>
  );
}
