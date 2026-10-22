import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Headphones, Play, Search, Globe, Sparkles, Crown, 
  Video, ChevronRight, Eye, Clock, Check, Users, ArrowRight,
  MessageSquare, Film, Tv, ExternalLink, User, Zap, X, Loader2
} from 'lucide-react';
import DictationStudio from '../../components/DictationStudio';
import ShadowingStudio from '../../components/ShadowingStudio';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const getYoutubeId = (url) => {
  if (!url) return '';
  if (url.length === 11) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const id = (match && match[2].length === 11) ? match[2] : url.trim();
  return id.length === 11 ? id : '';
};

const getThumbnail = (videoId) => {
  if (!videoId) return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80';
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};

function LimitPopup({ isOpen, onClose }) {
  const { openProModal } = useAuth();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl w-full max-w-sm border-2 border-slate-200 dark:border-slate-800 shadow-2xl relative text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
           <X className="w-5 h-5" />
        </button>
        <div className="w-16 h-16 mx-auto bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
           <Crown className="w-8 h-8 fill-current" />
        </div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Đã đạt giới hạn</h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Bạn đã tạo tối đa 3 bài học miễn phí. Vui lòng nâng cấp lên tài khoản PRO để tạo không giới hạn bài học từ video YouTube!
        </p>
        <button 
          onClick={() => {
            onClose();
            openProModal();
          }}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-sm uppercase tracking-wider shadow-lg transition-transform active:scale-98 mb-3"
        >
          Nâng cấp PRO ngay
        </button>
        <button onClick={onClose} className="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors">
          Để sau
        </button>
      </div>
    </div>
  );
}

// Component Skeleton để hiển thị khi đang tải dữ liệu
const LessonCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 flex flex-col animate-pulse">
    <div className="aspect-video bg-slate-200 dark:bg-slate-800" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4" />
      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2" />
      <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-1/4" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-1/4" />
      </div>
    </div>
  </div>
);

// Helper components tách biệt để tối ưu render
const LessonCard = React.memo(({ lesson, onSelect, onSelectShadowing }) => (
  <div
    className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
  >
    {/* Thumbnail Area */}
    <div
      onClick={() => {
        onSelect(lesson.id);
      }}
      className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer"
    >
      <img
        src={lesson.thumbnail}
        alt={lesson.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80';
        }}
      />

      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
        <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white font-bold text-[10px] flex items-center gap-1">
          <Eye className="w-3 h-3 text-slate-300" /> {lesson.views}
        </span>
      </div>

      <div className="absolute top-2.5 right-2.5 z-10">
        <span className={`px-2.5 py-0.5 rounded-lg text-white font-extrabold text-[11px] shadow-sm ${lesson.levelColor || 'bg-sky-600'}`}>
          {lesson.level}
        </span>
      </div>

      <div className="absolute bottom-2.5 left-2.5 z-10">
        <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-white font-semibold text-[10px] flex items-center gap-1">
          <Video className="w-3 h-3 text-rose-500 fill-current" /> Youtube
        </span>
      </div>

      <div className="absolute bottom-2.5 right-2.5 z-10">
        <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-white font-mono text-[10px] font-bold flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-300" /> {lesson.duration}
        </span>
      </div>
    </div>

    {/* Card Info */}
    <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-slate-900">
      <h4
        onClick={() => {
          onSelect(lesson.id);
        }}
        className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer"
      >
        {lesson.title}
      </h4>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <button
          onClick={() => {
            onSelect(lesson.id);
          }}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
        >
          Dictation <span className="text-slate-400 text-[10px]">⊗</span>
        </button>

        <button
          onClick={() => {
            onSelectShadowing(lesson.id);
          }}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
        >
          Shadowing <span className="text-slate-400 text-[10px]">⊗</span>
        </button>
      </div>
    </div>
  </div>
));

export default function Listening() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'dictation';
  const lessonId = searchParams.get('lessonId');

  const { user , openProModal } = useAuth();
  const [customLessonCount, setCustomLessonCount] = useState(() => parseInt(localStorage.getItem('customLessonCount') || '0', 10));
  const [showLimitPopup, setShowLimitPopup] = useState(false);

  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
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

  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const fetchLessons = async (page = 1, isLoadMore = false) => {
    if (isLoadMore) setIsMoreLoading(true);
    else setIsLoading(true);

    try {
      let levelParam = '';
      if (selectedTag === 'Người mới bắt đầu') levelParam = 'A2';
      if (selectedTag === 'Nâng cao') levelParam = 'B2';

      let typeParam = undefined;
      if (selectedTag === '#shadowing') typeParam = 'SPEAKING';

      const response = await api.get(`/lessons`, {
        params: {
          level: levelParam || undefined,
          type: typeParam,
          page: page,
          limit: 12
        }
      });

      if (response.data.success) {
        if (isLoadMore) {
          setLessons(prev => [...prev, ...response.data.lessons]);
        } else {
          setLessons(response.data.lessons);
        }
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Lỗi khi tải bài học:', error);
    } finally {
      setIsLoading(false);
      setIsMoreLoading(false);
    }
  };

  React.useEffect(() => {
    fetchLessons(1, false);
  }, [selectedTag]);

  const handleLoadMore = () => {
    if (pagination.page < pagination.totalPages) {
      fetchLessons(pagination.page + 1, true);
    }
  };

  const activeLessonDetail = lessons.find(l => String(l.id) === String(lessonId));

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

    setCustomLessonCount(prev => {
      const next = prev + 1;
      localStorage.setItem('customLessonCount', next.toString());
      return next;
    });
  };

  const activeLesson = activeLessonDetail || customLesson || [...movieLessons, ...dailyLessons].find(l => String(l.id) === String(lessonId)) || movieLessons[0];

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
          <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4 pt-2">

            {/* 2. TAGS & TOPICS FILTER BAR */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Luyện Shadowing và dictation qua video đa dạng chủ đề
              </h2>

              <div className="flex items-center gap-2 flex-wrap">
                {categoryTags.map((tag, idx) => {
                  const isActive = selectedTag === tag.label;
                  const TagIcon = tag.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTag(prev => prev === tag.label ? null : tag.label)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-slate-900 dark:bg-indigo-600 text-white border-slate-900 dark:border-indigo-600 shadow-sm font-extrabold'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {TagIcon && <TagIcon className="w-3.5 h-3.5" />}
                      <span>{tag.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. SECTION 1: MOVIE SHORT CLIP (DYNAMIC) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-indigo-600" />
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    Bài học mới nhất <span className="text-xs font-bold text-slate-400 dark:text-slate-500">({lessons.length} bài học)</span>
                  </h2>
                </div>

                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 text-slate-700 dark:text-slate-300 font-extrabold text-xs flex items-center gap-1 transition-colors"
                >
                  <span>{showAll ? 'THU GỌN' : 'XEM TẤT CẢ'}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {isLoading ? (
                <div className={showAll ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" : "flex gap-5 overflow-hidden"}>
                  {[...Array(showAll ? 8 : 4)].map((_, i) => (
                    <div key={i} className={showAll ? "" : "w-[280px] shrink-0"}>
                      <LessonCardSkeleton />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {!showAll ? (
                    /* Dạng lướt ngang 2 hàng - Tối ưu chống giật */
                    <div className="overflow-x-auto pb-6 -mx-2 px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:display-none overscroll-x-contain touch-pan-x snap-x snap-proximity scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
                      <div className="flex flex-col gap-5 w-max min-w-full">
                        <div className="grid grid-rows-2 grid-flow-col gap-5 auto-cols-max">
                          {lessons.length > 0 ? (
                            lessons.slice(0, 20).map(l => {
                              const vId = getYoutubeId(l.videoUrl);
                              return (
                                <div key={l.id} className="w-[280px] snap-start">
                                  <LessonCard
                                    lesson={{
                                      ...l,
                                      thumbnail: getThumbnail(vId),
                                      views: 'New',
                                      duration: 'Dictation'
                                    }}
                                    onSelect={(id) => setSearchParams({ mode: 'dictation', lessonId: id })}
                                    onSelectShadowing={(id) => setSearchParams({ mode: 'shadowing', lessonId: id })}
                                    openProModal={openProModal}
                                  />
                                </div>
                              );
                            })
                          ) : (
                            <div className="w-[300px] p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                               <p className="text-slate-500 font-bold text-sm">Chưa có bài học nào.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Dạng Grid đầy đủ khi nhấn Xem tất cả - Đã tối ưu triệt để cuộn dọc */
                    <div className="space-y-8 pb-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-fade-in">
                        {lessons.map(l => {
                          const vId = getYoutubeId(l.videoUrl);
                          return (
                            <LessonCard
                              key={l.id}
                              lesson={{
                                ...l,
                                thumbnail: getThumbnail(vId),
                                views: 'New',
                                duration: 'Dictation'
                              }}
                              onSelect={(id) => setSearchParams({ mode: 'dictation', lessonId: id })}
                              onSelectShadowing={(id) => setSearchParams({ mode: 'shadowing', lessonId: id })}
                              openProModal={openProModal}
                            />
                          );
                        })}
                      </div>

                      {/* Nút Load More */}
                      {pagination.page < pagination.totalPages && (
                        <div className="flex justify-center pt-4">
                          <button
                            onClick={handleLoadMore}
                            disabled={isMoreLoading}
                            className="px-8 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-900 dark:text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
                          >
                            {isMoreLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>ĐANG TẢI...</span>
                              </>
                            ) : (
                              <>
                                <span>TẢI THÊM BÀI HỌC</span>
                                <ChevronRight className="w-4 h-4 rotate-90" />
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* 4. SECTION 2: MOVIE SHORT CLIP (SAMPLE) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-emerald-500" />
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    Movie short clip <span className="text-xs font-bold text-slate-400 dark:text-slate-500">(Sample)</span>
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-10">
                {movieLessons.map(l => (
                  <LessonCard
                    key={l.id}
                    lesson={l}
                    onSelect={(id) => setSearchParams({ mode: 'dictation', lessonId: id })}
                    onSelectShadowing={(id) => setSearchParams({ mode: 'shadowing', lessonId: id })}
                    openProModal={openProModal}
                  />
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
  );
}
