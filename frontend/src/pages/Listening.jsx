import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Headphones, Play, Search, Globe, Sparkles, Crown, 
  Video, ChevronRight, Eye, Clock, Check, Users, ArrowRight,
  MessageSquare, Film, Tv, ExternalLink, User, Zap
} from 'lucide-react';
import DictationStudio from '../components/DictationStudio';
import ShadowingStudio from '../components/ShadowingStudio';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Listening() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'dictation';
  const lessonId = searchParams.get('lessonId');

  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedTag, setSelectedTag] = useState('Nâng cao');
  const [customLesson, setCustomLesson] = useState(null);

  const categoryTags = [
    { label: 'Người mới bắt đầu', icon: User },
    { label: 'Nâng cao', icon: Zap },
    { label: '#movie' },
    { label: '#daily' },
    { label: '#learning' },
    { label: '#shadowing' },
    { label: '#ielts' },
    { label: '#entertainment' },
    { label: '#toeic' },
    { label: '#kids' },
    { label: '#songs' },
    { label: '#bbc' },
    { label: '#voa' },
    { label: '#toefl' },
    { label: '#science' },
    { label: '#fairy-tale' },
    { label: '#podcast' },
    { label: '#ipa' },
    { label: '#food' },
    { label: '#tutorial' },
    { label: '#news' },
    { label: '#vietnam' },
    { label: '#ted' },
    { label: '#travel' },
    { label: '#animals' },
    { label: '#story' },
    { label: '#business' }
  ];

  const movieLessons = [
    {
      id: 1,
      title: 'PRINCESS MONONOKE | Official English Trailer',
      thumbnail: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80',
      isPro: true,
      views: '61,262',
      level: 'A2',
      levelColor: 'bg-emerald-600',
      duration: '01:04',
      embedUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE',
      tag: 'Dictation'
    },
    {
      id: 2,
      title: "KIKI'S DELIVERY SERVICE | Official English Trailer",
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80',
      isPro: false,
      views: '94,821',
      level: 'B1',
      levelColor: 'bg-sky-600',
      duration: '00:50',
      embedUrl: 'https://www.youtube.com/embed/v-PjgYDrg70',
      tag: 'Dictation'
    },
    {
      id: 3,
      title: 'Toy Story Tribute',
      thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
      isPro: false,
      views: '44,688',
      level: 'B2',
      levelColor: 'bg-indigo-600',
      duration: '01:53',
      embedUrl: 'https://www.youtube.com/embed/4oiLfTney6g',
      tag: 'Dictation'
    },
    {
      id: 4,
      title: 'Stranger Things 5 | Official Trailer | Netflix',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80',
      isPro: true,
      views: '22,276',
      level: 'B1',
      levelColor: 'bg-sky-600',
      duration: '02:55',
      embedUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU',
      tag: 'Dictation'
    }
  ];

  const dailyLessons = [
    {
      id: 5,
      title: 'Ordering Coffee at Starbucks — Natural Spoken English',
      thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=500&q=80',
      isPro: false,
      views: '112,400',
      level: 'A2',
      levelColor: 'bg-emerald-600',
      duration: '03:40',
      embedUrl: 'https://www.youtube.com/embed/s3kyd5-rT_U',
      tag: 'Dictation'
    },
    {
      id: 6,
      title: 'Job Interview Tips — How to Introduce Yourself',
      thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80',
      isPro: true,
      views: '85,320',
      level: 'B2',
      levelColor: 'bg-indigo-600',
      duration: '04:20',
      embedUrl: 'https://www.youtube.com/embed/1mHjMNZZvFo',
      tag: 'Dictation'
    },
    {
      id: 7,
      title: 'Checking in at the Airport — Travel Phrases',
      thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80',
      isPro: false,
      views: '76,910',
      level: 'B1',
      levelColor: 'bg-sky-600',
      duration: '02:45',
      embedUrl: 'https://www.youtube.com/embed/4dYVsK4S_dM',
      tag: 'Dictation'
    },
    {
      id: 8,
      title: 'Small Talk in Office Meetings',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80',
      isPro: false,
      views: '54,120',
      level: 'B1',
      levelColor: 'bg-sky-600',
      duration: '02:30',
      embedUrl: 'https://www.youtube.com/embed/2X_2IdybJW0',
      tag: 'Dictation'
    }
  ];

  const handleCreateCustomLesson = () => {
    if (!youtubeUrl.trim()) return;
    const newLesson = {
      id: Date.now(),
      title: 'YouTube AI Audio Transcript Lesson',
      category: 'AI Custom Video',
      level: 'B2',
      isPro: false,
      duration: '20:24',
      embedUrl: youtubeUrl,
      commentCount: 12
    };
    setCustomLesson(newLesson);
    setSearchParams({ mode: 'dictation', lessonId: newLesson.id });
  };

  const activeLesson = customLesson || [...movieLessons, ...dailyLessons].find(l => String(l.id) === String(lessonId)) || movieLessons[0];

  const renderCard = (lesson) => (
    <div 
      key={lesson.id}
      onClick={() => setSearchParams({ mode: 'dictation', lessonId: lesson.id })}
      className={`group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer border-2 ${
        lesson.isPro 
          ? 'border-amber-400 dark:border-amber-500 shadow-md shadow-amber-500/10' 
          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400'
      }`}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        <img 
          src={lesson.thumbnail} 
          alt={lesson.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        
        {/* Top Left: PRO badge & Views */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          {lesson.isPro && (
            <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-amber-950 font-black text-[10px] flex items-center gap-1 shadow-sm uppercase tracking-wider">
              <Crown className="w-3 h-3 fill-current" /> PRO
            </span>
          )}
          <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white font-bold text-[10px] flex items-center gap-1">
            <Eye className="w-3 h-3 text-slate-300" /> {lesson.views}
          </span>
        </div>

        {/* Top Right: Level Badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className={`px-2.5 py-0.5 rounded-lg text-white font-extrabold text-[11px] shadow-sm ${lesson.levelColor || 'bg-sky-600'}`}>
            {lesson.level}
          </span>
        </div>

        {/* Bottom Left: Youtube Source */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-white font-semibold text-[10px] flex items-center gap-1">
            <Video className="w-3 h-3 text-rose-500 fill-current" /> Youtube
          </span>
        </div>

        {/* Bottom Right: Duration */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-white font-mono text-[10px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-300" /> {lesson.duration}
          </span>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-slate-900">
        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {lesson.title}
        </h4>
        
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
            {lesson.tag || 'Dictation'} <span className="text-slate-400 text-[9px]">&otimes;</span>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen pb-12">
        {lessonId ? (
          <ErrorBoundary>
            {mode === 'shadowing' ? (
              <ShadowingStudio lesson={activeLesson} />
            ) : (
              <DictationStudio lesson={activeLesson} />
            )}
          </ErrorBoundary>
        ) : (
          <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4">

            {/* 1. TOP HEADER & EXPLANATION */}
            <div className="text-center space-y-2 py-4">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Giải thích Phương pháp Nghe chép chính tả
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold max-w-2xl mx-auto">
                Khám phá cách <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">hiệu quả nhất</span> để học và tinh chỉnh <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">kỹ năng nghe tiếng Anh</span>
              </p>
            </div>

            {/* 2. AI YOUTUBE CONVERTER CARD */}
            <div className="p-5 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/20">
                  <Video className="w-5 h-5 fill-current" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg">
                    Tạo bài học từ video YouTube
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black flex items-center gap-1 border border-blue-200 dark:border-blue-800">
                    <Sparkles className="w-3 h-3" /> AI
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-900 text-amber-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                    <Crown className="w-3 h-3 fill-current text-amber-300" /> PRO
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Dán link video tiếng Anh, AI sẽ tự tạo transcript và phân loại cấp độ cho bạn.
              </p>

              {/* Input field + Main Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="📋 Dán link YouTube vào đây..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 shadow-xs"
                  />
                </div>
                <button
                  onClick={handleCreateCustomLesson}
                  className="px-7 py-3.5 rounded-2xl bg-[#1E2540] hover:bg-[#151a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shrink-0 shadow-md active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>TẠO BÀI HỌC</span>
                </button>
              </div>

              {/* Sub Action Buttons underneath input */}
              <div className="flex items-center gap-3 flex-wrap pt-2">
                <button className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors shadow-2xs">
                  <Tv className="w-4 h-4 text-rose-500" />
                  <span>Kênh YouTube</span>
                </button>

                <Link
                  to="/community"
                  className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all active:scale-98 ml-auto"
                >
                  <Users className="w-4 h-4" />
                  <span>KHÁM PHÁ BÀI HỌC CỘNG ĐỒNG</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 3. TAGS & TOPICS FILTER BAR */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Luyện Shadowing và dictation qua video đa dạng chủ đề
              </h2>

              <div className="flex items-center gap-2 flex-wrap">
                {categoryTags.map((tag, idx) => {
                  const isActive = selectedTag === tag.label;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTag(tag.label)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-slate-900 dark:bg-indigo-600 text-white border-slate-900 dark:border-indigo-600 shadow-sm font-extrabold'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {tag.icon && <span>{tag.icon}</span>}
                      <span>{tag.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. SECTION 1: MOVIE SHORT CLIP */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-indigo-600" />
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    Movie short clip <span className="text-xs font-bold text-slate-400 dark:text-slate-500">(157 bài học)</span>
                  </h2>
                </div>

                <button className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 text-slate-700 dark:text-slate-300 font-extrabold text-xs flex items-center gap-1 transition-colors">
                  <span>XEM TẤT CẢ</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {movieLessons.map(renderCard)}
              </div>
            </div>

            {/* 5. SECTION 2: DAILY CONVERSATION */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-emerald-500" />
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    Daily Conversation <span className="text-xs font-bold text-slate-400 dark:text-slate-500">(84 bài học)</span>
                  </h2>
                </div>

                <button className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 text-slate-700 dark:text-slate-300 font-extrabold text-xs flex items-center gap-1 transition-colors">
                  <span>XEM TẤT CẢ</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {dailyLessons.map(renderCard)}
              </div>
            </div>

          </div>
        )}
      </div>
  );
}
