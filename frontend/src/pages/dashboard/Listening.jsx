import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Headphones, Play, Search, Globe, Sparkles, Crown, 
  Video, ChevronRight, Eye, Clock, Check, Users, ArrowRight,
  MessageSquare, Film, Tv, ExternalLink, User, Zap, X, Loader2
} from 'lucide-react';
import DictationStudio from '../../components/DictationStudio';
import ShadowingStudio from '../../components/ShadowingStudio';
import StudyModeModal from '../../components/StudyModeModal';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingBird from '../../components/LoadingBird';
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

// Helper components tách biệt để tối ưu render
const LessonCard = React.memo(({ lesson, pageMode, onOpen, onSelectMode }) => {
  const modes = pageMode === 'topics'
    ? [
        { id: 'dictation', label: 'Dictation', progress: lesson.dictationProgress },
        { id: 'shadowing', label: 'Shadowing', progress: lesson.shadowingProgress }
      ]
    : [{
        id: pageMode,
        label: pageMode === 'shadowing' ? 'Shadowing' : 'Dictation',
        progress: pageMode === 'shadowing' ? lesson.shadowingProgress : lesson.dictationProgress
      }];

  return (
    <div className="group h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-400">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Mở bài học: ${lesson.title}`}
        className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer text-left"
      >
        <img
          src={lesson.thumbnail}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80';
          }}
        />
        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/60 text-white font-bold text-[10px] flex items-center gap-1">
          <Eye className="w-3 h-3 text-slate-300" /> {lesson.views}
        </span>
        <span className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-lg text-white font-extrabold text-[11px] shadow-sm ${lesson.levelColor || 'bg-sky-600'}`}>
          {lesson.level}
        </span>
        <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 text-white font-semibold text-[10px] flex items-center gap-1">
          <Video className="w-3 h-3 text-rose-500 fill-current" /> Youtube
        </span>
        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white font-mono text-[10px] font-bold flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-300" /> {lesson.duration}
        </span>
      </button>

      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <button
          type="button"
          onClick={onOpen}
          className="min-h-[2.5rem] text-left font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
        >
          {lesson.title}
        </button>

        <div className="space-y-3">
          {modes.map(({ id, label, progress = 0 }) => (
            <div key={id} className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-slate-600 dark:text-slate-300">{label}</span>
                <span className="text-indigo-600 dark:text-indigo-400">{progress}%</span>
              </div>
              <div
                role="progressbar"
                aria-label={`Tiến độ ${label}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              >
                <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {modes.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => onSelectMode(lesson, id)}
              className="flex-1 rounded-xl bg-slate-50 dark:bg-slate-800 px-2 py-2 text-[10px] font-extrabold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default function Listening({ pageMode = 'topics' }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lessonId = searchParams.get('lessonId');
  const requestedMode = searchParams.get('mode');
  const mode = pageMode === 'topics'
    ? (requestedMode || 'dictation')
    : pageMode === 'dictation' && requestedMode === 'shadowing' && lessonId
      ? 'shadowing'
      : pageMode;

  const { user , openProModal } = useAuth();
  const progressStorageKey = `listening_progress_${user?.id || 'guest'}`;
  const dictationProgressStorageKey = `dictation_progress_${user?.id || 'guest'}`;
  const shadowingProgressStorageKey = `shadowing_progress_${user?.id || 'guest'}`;
  const [customLessonCount, setCustomLessonCount] = useState(() => parseInt(localStorage.getItem('customLessonCount') || '0', 10));
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [dictationProgress, setDictationProgress] = useState({});
  const [shadowingProgress, setShadowingProgress] = useState({});
  const [listeningScores, setListeningScores] = useState({});
  const [selectedStudyLesson, setSelectedStudyLesson] = useState(null);
  const [isStudyModeOpen, setIsStudyModeOpen] = useState(false);

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
  const [lessonDetail, setLessonDetail] = useState(null);
  const [isLessonDetailLoading, setIsLessonDetailLoading] = useState(false);
  const [lessonDetailError, setLessonDetailError] = useState('');
  const [lessonDetailReload, setLessonDetailReload] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  React.useEffect(() => {
    try {
      const readProgress = (key) => {
        const saved = localStorage.getItem(key);
        const parsed = saved ? JSON.parse(saved) : {};
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
      };
      setDictationProgress(
        localStorage.getItem(dictationProgressStorageKey)
          ? readProgress(dictationProgressStorageKey)
          : readProgress(progressStorageKey)
      );
      setShadowingProgress(readProgress(shadowingProgressStorageKey));
    } catch (error) {
      console.error('Lỗi khi đọc tiến độ luyện tập trên thiết bị:', error);
      setDictationProgress({});
      setShadowingProgress({});
    }
  }, [dictationProgressStorageKey, progressStorageKey, shadowingProgressStorageKey]);

  const updateListeningProgress = React.useCallback((id, percentage, score, activityMode = 'dictation') => {
    const lessonKey = String(id);
    const setProgress = activityMode === 'shadowing' ? setShadowingProgress : setDictationProgress;
    const modeStorageKey = activityMode === 'shadowing'
      ? shadowingProgressStorageKey
      : dictationProgressStorageKey;
    setProgress(previous => {
      const updated = { ...previous, [lessonKey]: percentage };
      try {
        localStorage.setItem(modeStorageKey, JSON.stringify(updated));
        const legacyProgress = JSON.parse(localStorage.getItem(progressStorageKey) || '{}');
        localStorage.setItem(progressStorageKey, JSON.stringify({
          ...(legacyProgress && typeof legacyProgress === 'object' && !Array.isArray(legacyProgress) ? legacyProgress : {}),
          [lessonKey]: percentage
        }));
      } catch (error) {
        console.error('Lỗi khi lưu tiến độ luyện tập trên thiết bị:', error);
      }
      return updated;
    });
    if (score !== undefined) {
      setListeningScores(previous => ({ ...previous, [lessonKey]: score }));
    }
  }, [dictationProgressStorageKey, progressStorageKey, shadowingProgressStorageKey]);

  React.useEffect(() => {
    setListeningScores({});
    if (!user?.id) {
      return undefined;
    }

    let cancelled = false;
    api.get('/lessons/my-progress', { params: { status: 'completed' } })
      .then(response => {
        if (!response.data.success) {
          throw new Error(response.data.message || 'Không thể tải điểm luyện nghe.');
        }

        const progressItems = response.data.progress || [];
        const scores = {};
        progressItems.forEach(item => {
          scores[String(item.id)] = item.score;
        });
        if (!cancelled) {
          setListeningScores(scores);
        }
      })
      .catch(error => {
        console.error('Lỗi khi tải điểm luyện nghe:', error);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id, dictationProgressStorageKey, shadowingProgressStorageKey]);

  const fetchLessons = async (page = 1, isLoadMore = false) => {
    if (isLoadMore) setIsMoreLoading(true);
    else setIsLoading(true);

    try {
      let levelParam = '';
      if (selectedTag === 'Người mới bắt đầu') levelParam = 'A2';
      if (selectedTag === 'Nâng cao') levelParam = 'B2';

      let typeParam;
      if (pageMode === 'dictation') typeParam = 'PRACTICE';

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
  }, [selectedTag, pageMode]);

  React.useEffect(() => {
    if (!lessonId || String(customLesson?.id) === String(lessonId)) {
      setLessonDetail(null);
      setLessonDetailError('');
      return;
    }

    const sampleLesson = [...movieLessons, ...dailyLessons]
      .find(lesson => String(lesson.id) === String(lessonId));
    if (sampleLesson) {
      setLessonDetail(null);
      setLessonDetailError('');
      setIsLessonDetailLoading(false);
      return;
    }

    let cancelled = false;
    setIsLessonDetailLoading(true);
    setLessonDetailError('');

    api.get(`/lessons/${lessonId}`)
      .then(response => {
        if (cancelled) return;
        if (response.data.success) {
          setLessonDetail(response.data.lesson);
        } else {
          setLessonDetailError(response.data.message || 'Không thể tải nội dung bài học.');
        }
      })
      .catch(error => {
        console.error('Lỗi khi tải nội dung bài học:', error);
        if (!cancelled) {
          setLessonDetailError(error.response?.data?.message || 'Không thể tải nội dung bài học.');
        }
      })
      .finally(() => {
        if (!cancelled) setIsLessonDetailLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [lessonId, customLesson?.id, lessonDetailReload]);

  const handleLoadMore = () => {
    if (pagination.page < pagination.totalPages) {
      fetchLessons(pagination.page + 1, true);
    }
  };

  const activeLessonDetail = lessons.find(l => String(l.id) === String(lessonId));
  const selectedLessonDetail = lessonDetail && String(lessonDetail.id) === String(lessonId)
    ? lessonDetail
    : null;

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

  const fallbackLesson = activeLessonDetail
    || customLesson
    || [...movieLessons, ...dailyLessons].find(lesson => String(lesson.id) === String(lessonId))
    || movieLessons[0];
  const activeLesson = selectedLessonDetail
    ? {
        ...activeLessonDetail,
        ...selectedLessonDetail,
        videoUrl: selectedLessonDetail.videoUrl || selectedLessonDetail.embedUrl,
        transcript: selectedLessonDetail.transcript || selectedLessonDetail.contentText,
        transcripts: selectedLessonDetail.transcript || selectedLessonDetail.contentText
      }
    : { ...fallbackLesson, videoUrl: fallbackLesson.videoUrl || fallbackLesson.embedUrl };
  const transcriptValue = selectedLessonDetail?.transcript || selectedLessonDetail?.contentText;
  let hasSavedTranscript = false;
  if (Array.isArray(transcriptValue)) {
    hasSavedTranscript = transcriptValue.length > 0;
  } else if (typeof transcriptValue === 'string' && transcriptValue.trim()) {
    try {
      const parsedTranscript = JSON.parse(transcriptValue);
      hasSavedTranscript = Array.isArray(parsedTranscript)
        ? parsedTranscript.length > 0
        : Boolean(parsedTranscript);
    } catch {
      hasSavedTranscript = true;
    }
  }

  const handleOpenLessonCard = (lesson) => {
    if (pageMode === 'topics') {
      setSelectedStudyLesson(lesson);
      setIsStudyModeOpen(true);
      return;
    }

    handleSelectLessonMode(lesson, pageMode);
  };

  const handleSelectLessonMode = (lesson, selectedMode) => {
    const route = selectedMode === 'shadowing' ? '/shadowing' : '/listening';
    navigate(`${route}?lessonId=${encodeURIComponent(lesson.id)}`);
  };

  const handleStudyModeSelection = (selectedMode, lesson) => {
    handleSelectLessonMode(lesson, selectedMode);
  };

  return (
    <div className="w-full min-h-screen pb-12">
        {lessonId ? (
          <ErrorBoundary>
            {isLessonDetailLoading && String(customLesson?.id) !== String(lessonId) ? (
              <div className="min-h-[50vh] flex items-center justify-center">
                <LoadingBird label="Đang tải nội dung bài học..." size={180} />
              </div>
            ) : lessonDetailError ? (
              <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
                <p className="text-slate-600 dark:text-slate-300 font-bold">{lessonDetailError}</p>
                <button
                  onClick={() => setLessonDetailReload(value => value + 1)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                >
                  Thử tải lại
                </button>
              </div>
            ) : selectedLessonDetail && !hasSavedTranscript && String(customLesson?.id) !== String(lessonId) ? (
              <div className="min-h-[50vh] flex items-center justify-center px-4 text-center">
                <p className="max-w-xl text-slate-600 dark:text-slate-300 font-bold">
                  Bài học này chưa có phụ đề được lưu. Hãy thêm phụ đề trong phần quản lý bài học để luyện nghe theo đúng video.
                </p>
              </div>
            ) : mode === 'shadowing' ? (
              <ShadowingStudio
                lesson={activeLesson}
                onProgressChange={updateListeningProgress}
                isPreviouslyCompleted={Number(shadowingProgress[String(lessonId)]) >= 100}
                previousScore={Number(shadowingProgress[String(lessonId)]) >= 100 ? listeningScores[String(lessonId)] : undefined}
              />
            ) : (
              <DictationStudio
                lesson={activeLesson}
                onProgressChange={updateListeningProgress}
                isPreviouslyCompleted={Number(dictationProgress[String(lessonId)]) >= 100}
                previousScore={Number(dictationProgress[String(lessonId)]) >= 100 ? listeningScores[String(lessonId)] : undefined}
              />
            )}
          </ErrorBoundary>
        ) : (
          <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4 pt-2">

            {/* 2. TAGS & TOPICS FILTER BAR */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                {pageMode === 'topics'
                  ? 'Luyện nghe và Shadowing qua video đa dạng chủ đề'
                  : pageMode === 'shadowing'
                    ? 'Luyện Shadowing qua video'
                    : 'Luyện nghe - viết chính tả qua video'}
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
                <div className="min-h-[40vh] flex items-center justify-center">
                  <LoadingBird label="Đang tải danh sách bài luyện nghe..." size={180} />
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
                                      dictationProgress: dictationProgress[String(l.id)] || 0,
                                      shadowingProgress: shadowingProgress[String(l.id)] || 0,
                                      score: listeningScores[String(l.id)]
                                    }}
                                    pageMode={pageMode}
                                    onOpen={() => handleOpenLessonCard(l)}
                                    onSelectMode={handleSelectLessonMode}
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
                                dictationProgress: dictationProgress[String(l.id)] || 0,
                                shadowingProgress: shadowingProgress[String(l.id)] || 0,
                                score: listeningScores[String(l.id)]
                              }}
                              pageMode={pageMode}
                              onOpen={() => handleOpenLessonCard(l)}
                              onSelectMode={handleSelectLessonMode}
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
                    lesson={{
                      ...l,
                      dictationProgress: dictationProgress[String(l.id)] || 0,
                      shadowingProgress: shadowingProgress[String(l.id)] || 0
                    }}
                    pageMode={pageMode}
                    onOpen={() => handleOpenLessonCard(l)}
                    onSelectMode={handleSelectLessonMode}
                  />
                ))}
              </div>
            </div>

          </div>
        )}
        <StudyModeModal
          isOpen={isStudyModeOpen}
          onClose={() => setIsStudyModeOpen(false)}
          lesson={selectedStudyLesson}
          onSelectMode={handleStudyModeSelection}
        />
      </div>
  );
}
