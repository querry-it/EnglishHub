import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, PlayCircle, FileText, HelpCircle, 
  ChevronDown, ChevronRight, Trophy, Menu, X, Clock, Download, MessageSquare, 
  Sparkles, Check, Bookmark, Send, Award, Target, AlertCircle, FileQuestion, 
  PenTool, UserCheck, RotateCcw, Star, BookOpen, Layers, Play,
  CheckCircle, ChevronLeft, Lightbulb, Share2, Eye, Calendar, CheckCheck,
  FileCheck2, GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import LoadingBird from '../../components/LoadingBird';
import { fetchCourseCurriculumAPI } from '../../api/courseCurriculumService';
import { 
  getStoredSubmissions, 
  submitAssignment, 
  getSubmissionForLesson 
} from '../../api/submissionService';
import { GRADING_RUBRICS } from '../../data/curriculum/builders';

export default function CourseClassroom() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Loading & Curriculum state
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [isProgressLoading, setIsProgressLoading] = useState(false);
  const [progressError, setProgressError] = useState('');

  // UI Navigation
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'assignments' | 'notes' | 'resources' | 'discussion'

  // Quiz state
  const [isQuizFullScreen, setIsQuizFullScreen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Assignment state
  const [assignmentText, setAssignmentText] = useState('');
  const [isResubmitting, setIsResubmitting] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState(false);
  const [submissionsList, setSubmissionsList] = useState(getStoredSubmissions);

  // Load curriculum from API
  useEffect(() => {
    let isMounted = true;
    async function loadCurriculum() {
      setIsLoading(true);
      try {
        const data = await fetchCourseCurriculumAPI(courseId);
        if (isMounted && data) {
          setCourse(data);
          if (data.modules?.[0]?.lessons?.[0]) {
            setCurrentLesson(data.modules[0].lessons[0]);
          }
          const exp = {};
          data.modules?.forEach((m, idx) => { exp[m.id] = idx === 0 || idx === 1; });
          setExpandedModules(exp);
        }
      } catch (err) {
        console.error('Lỗi khi tải lộ trình khóa học:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadCurriculum();
    return () => { isMounted = false; };
  }, [courseId]);

  // Sync submissions across tabs/events
  useEffect(() => {
    const handleSync = () => setSubmissionsList(getStoredSubmissions());
    window.addEventListener('submission_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('submission_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Notes state
  const [notesList, setNotesList] = useState([
    { id: 1, time: '02:15', content: 'Từ vựng quan trọng: Crucial = Extremely important' },
    { id: 2, time: '08:40', content: 'Cần chú ý nối âm giữa đuôi phụ âm và đầu nguyên âm' }
  ]);
  const [newNoteInput, setNewNoteInput] = useState('');

  // Discussion state
  const [comments, setComments] = useState([
    { id: 1, author: 'Minh Tuấn', avatar: '👨‍🎓', time: '2 giờ trước', text: 'Bài giảng rất hay và trực quan! Thầy giải thích mẹo nghe rành mạch quá.' },
    { id: 2, author: 'Lan Anh', avatar: '👩‍🎓', time: '5 giờ trước', text: 'Phần bài tập tự luận cuối chương nộp xong bao lâu thì thầy chấm ạ?' }
  ]);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    if (!courseId) return undefined;

    let cancelled = false;
    setIsProgressLoading(true);
    setCompletedLessonIds([]);
    setProgressError('');

    const loadProgress = async () => {
      if (!user) {
        try {
          const saved = localStorage.getItem(`course_completed_${courseId}`);
          const parsed = saved ? JSON.parse(saved) : [];
          if (!cancelled) setCompletedLessonIds(Array.isArray(parsed) ? parsed : []);
        } catch (error) {
          console.error('Lỗi khi đọc tiến độ bài học trên thiết bị:', error);
          if (!cancelled) {
            setCompletedLessonIds([]);
            setProgressError('Không thể đọc tiến độ đã lưu trên thiết bị.');
          }
        } finally {
          if (!cancelled) setIsProgressLoading(false);
        }
        return;
      }

      try {
        const response = await api.get(`/lessons/course-progress/${encodeURIComponent(courseId)}`);
        if (!cancelled) {
          setCompletedLessonIds(response.data.completedLessonIds || []);
        }
      } catch (error) {
        console.error('Lỗi khi tải tiến độ bài học:', error);
        if (!cancelled) setProgressError('Không thể tải tiến độ bài học từ máy chủ.');
      } finally {
        if (!cancelled) setIsProgressLoading(false);
      }
    };

    loadProgress();
    return () => {
      cancelled = true;
    };
  }, [courseId, user?.id]);

  // Calculations
  const allLessons = useMemo(() => course?.modules?.flatMap(m => m.lessons) || [], [course]);
  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter(lesson => completedLessonIds.includes(lesson.id)).length;
  const progressPercent = Math.round((completedCount / (totalLessons || 1)) * 100);

  const allAssignments = useMemo(() => {
    return allLessons.filter(l => l.type === 'assignment');
  }, [allLessons]);

  const studentEmail = user?.email || 'student@englishhub.edu.vn';
  const studentName = user?.fullName || user?.name || 'Học viên EnglishHub';

  const currentSubmission = useMemo(() => {
    if (!course?.id || !currentLesson?.id) return null;
    return (
      getSubmissionForLesson(course.id, currentLesson.id, studentEmail) ||
      getSubmissionForLesson(course.id, currentLesson.id)
    );
  }, [course?.id, currentLesson?.id, studentEmail, submissionsList]);

  // Reset assignment text on lesson change
  useEffect(() => {
    if (currentSubmission?.studentNote) {
      setAssignmentText(currentSubmission.studentNote);
    } else {
      setAssignmentText('');
    }
    setIsResubmitting(false);
  }, [currentLesson?.id, currentSubmission]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleSelectLesson = (lesson) => {
    setCurrentLesson(lesson);
    setIsQuizFullScreen(false);
    setQuizSubmitted(false);
    setQuizAnswers({});
  };

  const toggleLessonCompleted = async (lessonId) => {
    const completed = !completedLessonIds.includes(lessonId);
    setProgressError('');

    if (user) {
      try {
        await api.put(
          `/lessons/course-progress/${encodeURIComponent(courseId)}/${encodeURIComponent(lessonId)}`,
          { completed }
        );
      } catch (error) {
        console.error('Lỗi khi lưu tiến độ bài học:', error);
        setProgressError('Không thể lưu tiến độ bài học. Vui lòng thử lại.');
        return;
      }
    } else {
      const savedIds = completed
        ? [...completedLessonIds, lessonId]
        : completedLessonIds.filter(id => id !== lessonId);
      localStorage.setItem(`course_completed_${courseId}`, JSON.stringify(savedIds));
    }

    setCompletedLessonIds(prev => completed
      ? [...new Set([...prev, lessonId])]
      : prev.filter(id => id !== lessonId));
  };

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      handleSelectLesson(allLessons[currentIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
    if (currentIndex > 0) {
      handleSelectLesson(allLessons[currentIndex - 1]);
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    setNotesList([{ id: Date.now(), time: '05:00', content: newNoteInput.trim() }, ...notesList]);
    setNewNoteInput('');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([
      { id: Date.now(), author: studentName, avatar: '🎓', time: 'Vừa xong', text: commentInput.trim() },
      ...comments
    ]);
    setCommentInput('');
  };

  const handleSubmitAssignment = (e) => {
    e?.preventDefault();
    if (!assignmentText.trim() || !course || !currentLesson) return;

    submitAssignment({
      courseId: course.id,
      courseTitle: course.title,
      category: course.category || 'IELTS',
      instructorName: course.instructor || 'Nguyen Van An',
      instructorEmail: course.instructorEmail || 'nguyenvanan@englishhub.edu.vn',
      lessonId: currentLesson.id,
      lessonTitle: currentLesson.title,
      studentName,
      studentEmail,
      type: currentLesson.assignmentType || 'Bài tập tự luận',
      studentNote: assignmentText.trim()
    });

    if (!completedLessonIds.includes(currentLesson.id)) {
      toggleLessonCompleted(currentLesson.id);
    }

    setIsResubmitting(false);
    setSubmitSuccessMsg(true);
    setTimeout(() => setSubmitSuccessMsg(false), 4000);
  };

  const isCurrentCompleted = currentLesson ? completedLessonIds.includes(currentLesson.id) : false;

  const calculateQuizScore = () => {
    if (!currentLesson?.quizQuestions) return { correct: 0, total: 0, percentage: 0 };
    let correct = 0;
    currentLesson.quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) correct++;
    });
    const total = currentLesson.quizQuestions.length;
    return {
      correct,
      total,
      percentage: Math.round((correct / (total || 1)) * 100)
    };
  };

  const wordCount = useMemo(() => {
    if (!assignmentText) return 0;
    return assignmentText.trim().split(/\s+/).filter(Boolean).length;
  }, [assignmentText]);

  // Rubric config
  const rubric = GRADING_RUBRICS[course?.gradingCategory || course?.category] || GRADING_RUBRICS.IELTS;

  // Assignment statistics
  const assignmentStats = useMemo(() => {
    const total = allAssignments.length;
    const submitted = allAssignments.filter(a => {
      const sub = submissionsList.find(s => s.courseId === course?.id && s.lessonId === a.id);
      return sub && (sub.status === 'pending' || sub.status === 'graded');
    }).length;
    const graded = allAssignments.filter(a => {
      const sub = submissionsList.find(s => s.courseId === course?.id && s.lessonId === a.id);
      return sub && sub.status === 'graded';
    }).length;
    return { total, submitted, graded };
  }, [allAssignments, submissionsList, course?.id]);

  // SKELETON LOADING (WHITE THEME)
  if (isLoading || !course || !currentLesson) {
    return (
      <div className="h-screen w-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <LoadingBird label="Đang tải giáo trình khóa học..." size={180} />
        <p className="text-xs text-slate-500">Đồng bộ video bài giảng, tài liệu & cổng chấm bài</p>
      </div>
    );
  }

  const currentModule = course.modules?.find(m => m.lessons.some(l => l.id === currentLesson.id));
  const currentModuleIndex = course.modules?.findIndex(m => m.id === currentModule?.id);

  return (
    <div className="h-screen w-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-hidden">
      
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* TOP HEADER: COURSERA STYLE CLEAN WHITE NAVIGATION                         */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 z-40 shadow-2xs">
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={() => navigate('/courses')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-slate-100 shrink-0"
            title="Quay lại danh sách khóa học"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Khóa học</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0 ${isSidebarOpen ? 'bg-indigo-50 text-indigo-600' : ''}`}
            title={isSidebarOpen ? 'Thu gọn lộ trình' : 'Mở lộ trình'}
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 uppercase tracking-wider shrink-0">
                {course.category}
              </span>
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md md:max-w-lg">
                {course.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Right side: Progress + Instructor badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-[10px] flex items-center justify-center">
              {course.instructor?.charAt(0) || 'G'}
            </div>
            <div className="text-left text-[11px] leading-tight">
              <span className="text-slate-500 block text-[9px] uppercase font-semibold">Giảng viên chấm</span>
              <span className="font-bold text-slate-800">{course.instructor}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            <div className="text-right text-[11px] leading-tight">
              <span className="font-bold text-emerald-600">{isProgressLoading ? '...' : `${progressPercent}%`}</span>
              <span className="text-slate-500 block text-[9px]">{completedCount}/{totalLessons} bài</span>
            </div>
            <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {progressError && (
        <div role="alert" className="shrink-0 px-4 py-2 bg-amber-50 text-amber-800 text-xs font-semibold border-b border-amber-200">
          {progressError}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* MAIN CONTAINER: SIDEBAR + CONTENT WORKSPACE                               */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ─── LEFT SIDEBAR: LỘ TRÌNH KHÓA HỌC (CLEAN WHITE COURSERA STYLE) ───────── */}
        <aside 
          className={`bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-300 z-30 ${
            isSidebarOpen ? 'w-80 sm:w-96' : 'w-0 overflow-hidden'
          }`}
        >
          {/* Sidebar Top Header */}
          <div className="p-3.5 border-b border-slate-200 bg-white flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Lộ trình học tập</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {course.modules?.length} Chương • {totalLessons} Bài học • {allAssignments.length} Bài nộp chấm
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {completedCount}/{totalLessons} Đã học
            </span>
          </div>

          {/* Module list */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-2 custom-scrollbar bg-slate-50/50">
            {course.modules?.map((mod, mIdx) => {
              const isExpanded = expandedModules[mod.id];
              const modCompleted = mod.lessons.filter(l => completedLessonIds.includes(l.id)).length;
              const modTotal = mod.lessons.length;
              const isModDone = modCompleted === modTotal && modTotal > 0;
              const isCurrentMod = currentModule?.id === mod.id;

              return (
                <div 
                  key={mod.id}
                  className={`rounded-xl border transition-all ${
                    isCurrentMod 
                      ? 'border-indigo-300 bg-white shadow-xs' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Module Toggle */}
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full p-3 text-left flex items-start justify-between gap-2.5 transition-colors"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <div className="mt-0.5 text-slate-400 shrink-0">
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black uppercase text-indigo-600 tracking-wider">
                            Chương {mIdx + 1}
                          </span>
                          {isModDone && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              ✓ Xong
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 leading-snug mt-0.5 line-clamp-2">
                          {mod.title}
                        </h3>
                        <span className="text-[10px] text-slate-500 font-medium block mt-1">
                          {modCompleted}/{modTotal} bài hoàn thành
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Lessons list in module */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 divide-y divide-slate-100 bg-white">
                      {mod.lessons.map((lesson) => {
                        const isSelected = currentLesson.id === lesson.id;
                        const isDone = completedLessonIds.includes(lesson.id);

                        // Assignment status badge
                        let assignStatusTag = null;
                        if (lesson.type === 'assignment') {
                          const sub = submissionsList.find(s => s.courseId === course.id && s.lessonId === lesson.id);
                          if (sub?.status === 'graded') {
                            assignStatusTag = (
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                ✓ Điểm: {sub.result?.overall}
                              </span>
                            );
                          } else if (sub?.status === 'pending') {
                            assignStatusTag = (
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                                ⏳ Đang chấm
                              </span>
                            );
                          } else {
                            assignStatusTag = (
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                                ✍️ Nộp chấm
                              </span>
                            );
                          }
                        }

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleSelectLesson(lesson)}
                            className={`w-full p-2.5 text-left flex items-center justify-between gap-2.5 transition-all ${
                              isSelected 
                                ? 'bg-indigo-50/80 border-l-4 border-indigo-600 text-indigo-950 font-semibold' 
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {/* Left status / type icon */}
                              <div className="shrink-0">
                                {isDone ? (
                                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                ) : isSelected ? (
                                  <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs animate-pulse">
                                    <Play className="w-2 h-2 fill-current ml-0.5" />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center">
                                    {lesson.type === 'video' && <PlayCircle className="w-3 h-3 text-sky-500" />}
                                    {lesson.type === 'reading' && <FileText className="w-3 h-3 text-emerald-500" />}
                                    {lesson.type === 'quiz' && <HelpCircle className="w-3 h-3 text-amber-500" />}
                                    {lesson.type === 'assignment' && <Award className="w-3 h-3 text-rose-500" />}
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className={`text-[11px] leading-snug truncate ${
                                  isSelected ? 'text-indigo-950 font-bold' : isDone ? 'text-slate-500' : 'text-slate-800'
                                }`}>
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[9px] text-slate-400 flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5" />
                                    {lesson.duration}
                                  </span>
                                  {lesson.type === 'quiz' && (
                                    <span className="text-[8px] font-bold px-1 rounded bg-amber-50 text-amber-700 border border-amber-200">
                                      Quiz
                                    </span>
                                  )}
                                  {assignStatusTag}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* ─── RIGHT MAIN PANEL: CONTENT WORKSPACE (WHITE THEME) ────────────────── */}
        <main className="flex-1 overflow-y-auto bg-slate-50 flex flex-col custom-scrollbar">
          
          {/* 1. VIDEO PLAYER WORKSPACE */}
          {currentLesson.type === 'video' && (
            <div className="w-full bg-slate-900 flex flex-col items-center">
              <div className="w-full max-w-5xl mx-auto">
                <div className="relative aspect-video w-full max-h-[68vh] mx-auto overflow-hidden bg-black shadow-xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${currentLesson.youtubeId || '2r7kEF70Afs'}?autoplay=0&rel=0&modestbranding=1`}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Sub-bar below video (White background) */}
              <div className="w-full bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                    Chương {currentModuleIndex !== undefined && currentModuleIndex >= 0 ? currentModuleIndex + 1 : 1}: {currentModule?.title}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    {currentLesson.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLessonCompleted(currentLesson.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isCurrentCompleted 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isCurrentCompleted ? 'Đã hoàn thành' : 'Đánh dấu đã xem'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. READING CONTENT WORKSPACE (WHITE CARD) */}
          {currentLesson.type === 'reading' && (
            <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Tài liệu lý thuyết chi tiết
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1.5">
                      {currentLesson.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Thời lượng đọc ước tính: {currentLesson.duration} • Thuộc: {currentModule?.title}
                    </p>
                  </div>
                </div>

                {currentLesson.overview && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed">
                    💡 <strong className="text-slate-900">Trọng tâm:</strong> {currentLesson.overview}
                  </div>
                )}

                {/* Structured Sections */}
                {currentLesson.sections?.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded bg-indigo-600 inline-block" />
                      <span>{sec.heading}</span>
                    </h3>

                    {sec.body && (
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {sec.body}
                      </p>
                    )}

                    {sec.bullets && (
                      <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-slate-700">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}

                    {sec.examples && (
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Ví dụ mẫu:</span>
                        <div className="grid gap-2">
                          {sec.examples.map(([en, vi], eIdx) => (
                            <div key={eIdx} className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs font-mono">
                              <span className="text-indigo-900 font-semibold block">{en}</span>
                              <span className="text-slate-600 block mt-0.5 font-sans text-[11px]">{vi}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {sec.tip && (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-2.5">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-800 block">Lời khuyên từ Giảng viên:</strong>
                          <span>{sec.tip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Mark reading completed button */}
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => toggleLessonCompleted(currentLesson.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      isCurrentCompleted 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{isCurrentCompleted ? 'Đã hoàn thành lý thuyết' : 'Đánh dấu đã đọc xong'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. ASSIGNMENT WORKSPACE: NỘP BÀI TỰ LUẬN CUỐI CHƯƠNG (WHITE CARD) */}
          {currentLesson.type === 'assignment' && (
            <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                
                {/* Header: Title + Assigned Instructor Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
                          {currentLesson.assignmentType || 'Bài tập tự luận cuối chương'}
                        </span>
                        <span className="text-xs text-slate-500">Thời gian làm: {currentLesson.duration}</span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                        {currentLesson.title}
                      </h2>
                    </div>
                  </div>

                  {/* Assigned Instructor */}
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                      {course.instructor?.charAt(0) || 'G'}
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] font-bold uppercase text-indigo-600 block">Giảng viên chấm bài:</span>
                      <span className="text-xs font-bold text-slate-900 block">{course.instructor}</span>
                      <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Phản hồi trong 24h
                      </span>
                    </div>
                  </div>
                </div>

                {/* Assignment Prompt */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <PenTool className="w-3.5 h-3.5 text-indigo-600" />
                    <span>ĐỀ BÀI & HƯỚNG DẪN CHI TIẾT</span>
                  </h3>
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-line">
                    {currentLesson.assignmentPrompt}
                  </div>
                </div>

                {/* Rubric Criteria Preview */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Tiêu chí chấm điểm ({rubric.scale}):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {rubric.criteria.map(c => (
                      <div key={c.key} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left">
                        <span className="text-xs font-bold text-indigo-600 block">{c.label}</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5 line-clamp-1">{c.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Success Banner */}
                {submitSuccessMsg && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-3 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>
                      Đã gửi bài nộp thành công! Giảng viên <strong>{course.instructor}</strong> đã nhận bài và sẽ trả điểm sớm.
                    </span>
                  </div>
                )}

                {/* ─── CASE A: BÀI ĐÃ ĐƯỢC CHẤM (GRADED) ─── */}
                {currentSubmission?.status === 'graded' && !isResubmitting && (
                  <div className="space-y-5 pt-2">
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-8 h-8 text-amber-300" />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-emerald-100">KẾT QUẢ ĐÃ ĐƯỢC CHẤM</span>
                            <h3 className="text-base sm:text-lg font-bold text-white">
                              Giảng viên {currentSubmission.instructorName} đã hoàn thành chấm bài
                            </h3>
                          </div>
                        </div>

                        <div className="bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2.5 rounded-xl text-center">
                          <span className="text-[9px] font-bold uppercase text-emerald-100 block">{rubric.overallLabel}</span>
                          <span className="text-2xl font-black text-white">{currentSubmission.result?.overall || '7.0'}</span>
                        </div>
                      </div>

                      {/* Criteria breakdown */}
                      {currentSubmission.result?.scores && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/20">
                          {Object.entries(currentSubmission.result.scores).map(([k, val]) => (
                            <div key={k} className="bg-white/10 rounded-lg p-2 text-center border border-white/20">
                              <span className="text-[10px] uppercase font-bold text-emerald-100 block">{k}</span>
                              <span className="text-sm font-bold text-white">{val}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Instructor Feedback Box */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                            {currentSubmission.instructorName?.charAt(0) || 'G'}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              Nhận xét chi tiết từ Thầy/Cô {currentSubmission.instructorName}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {currentSubmission.result?.gradedAt ? new Date(currentSubmission.result.gradedAt).toLocaleString('vi-VN') : 'Vừa xong'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>Chuẩn Rubric</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line">
                        {currentSubmission.result?.feedback}
                      </div>

                      {/* Strengths & Weaknesses if provided */}
                      {(currentSubmission.result?.strengths || currentSubmission.result?.weaknesses) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {currentSubmission.result?.strengths && (
                            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                              <span className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Điểm mạnh nổi bật:</span>
                              </span>
                              <p className="text-xs text-emerald-950 font-medium whitespace-pre-line leading-relaxed">
                                {currentSubmission.result.strengths}
                              </p>
                            </div>
                          )}
                          {currentSubmission.result?.weaknesses && (
                            <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                              <span className="text-[10px] font-black uppercase text-rose-800 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                                <span>Lỗ hổng cần khắc phục:</span>
                              </span>
                              <p className="text-xs text-rose-950 font-medium whitespace-pre-line leading-relaxed">
                                {currentSubmission.result.weaknesses}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* In-line Teacher Annotations */}
                      {currentSubmission.result?.annotations && currentSubmission.result.annotations.length > 0 && (
                        <div className="pt-2 space-y-2">
                          <span className="text-xs font-black uppercase text-indigo-900 block tracking-wider">
                            📌 Giảng viên chữa lỗi chi tiết trên từng câu:
                          </span>
                          <div className="space-y-1.5">
                            {currentSubmission.result.annotations.map((ann, aIdx) => (
                              <div key={ann.id || aIdx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                                    {ann.categoryLabel || 'Sửa lỗi'}
                                  </span>
                                  <span className="line-through text-slate-400 font-semibold">"{ann.original}"</span>
                                  <span className="text-indigo-700 font-black">➔ "{ann.correction}"</span>
                                </div>
                                {ann.explanation && (
                                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium pl-1">
                                    💡 {ann.explanation}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Upgraded Model Paragraph */}
                      {currentSubmission.result?.upgradedSample && (
                        <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-1.5 pt-3">
                          <span className="text-xs font-black uppercase text-indigo-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Đoạn văn viết lại nâng cấp mẫu từ Giảng viên (Band 8.0+):</span>
                          </span>
                          <p className="text-xs font-serif text-slate-800 leading-relaxed italic bg-white p-3 rounded-lg border border-indigo-100">
                            "{currentSubmission.result.upgradedSample}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Submitted essay text */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase text-slate-500 block">Bài bạn đã nộp:</span>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono whitespace-pre-line">
                        {currentSubmission.studentNote}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setIsResubmitting(true)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all border border-slate-300"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Nộp bản làm lại cho Giảng viên</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── CASE B: ĐANG CHỜ CHẤM (PENDING) ─── */}
                {currentSubmission?.status === 'pending' && !isResubmitting && (
                  <div className="space-y-5 pt-2">
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-amber-600 animate-spin" />
                        <div>
                          <h4 className="text-sm font-bold text-amber-900">
                            Đã nộp bài thành công • Đang chờ Giảng viên {currentSubmission.instructorName} chấm điểm
                          </h4>
                          <p className="text-xs text-amber-700 mt-0.5">
                            Thời điểm nộp: {currentSubmission.submittedAt}. Kết quả sẽ hiển thị ngay khi giảng viên hoàn tất.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase text-slate-500 block">Nội dung bài nộp:</span>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-sans whitespace-pre-line">
                        {currentSubmission.studentNote}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setIsResubmitting(true)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all border border-slate-300"
                      >
                        <PenTool className="w-3.5 h-3.5 text-slate-600" />
                        <span>Sửa nội dung & Nộp lại</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── CASE C: SOẠN THẢO VÀ NỘP BÀI MỚI ─── */}
                {(!currentSubmission || isResubmitting) && (
                  <form onSubmit={handleSubmitAssignment} className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase text-slate-700">
                        Bài viết của bạn (Tiếng Anh):
                      </label>
                      <span className={`text-xs font-bold ${
                        wordCount >= (currentLesson.minWords || 80) ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                        {wordCount} từ {wordCount >= (currentLesson.minWords || 80) && '✓ Đủ độ dài'}
                      </span>
                    </div>

                    <textarea
                      rows={12}
                      value={assignmentText}
                      onChange={(e) => setAssignmentText(e.target.value)}
                      placeholder="Viết bài làm của bạn bằng tiếng Anh tại đây... (Ví dụ: The diagram illustrates... / In my view...)"
                      className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-600 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none leading-relaxed resize-y font-sans"
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Bài làm sẽ được gửi trực tiếp vào hàng chờ của Giảng viên <strong>{course.instructor}</strong>.</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {isResubmitting && (
                          <button
                            type="button"
                            onClick={() => setIsResubmitting(false)}
                            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                          >
                            Hủy bỏ
                          </button>
                        )}

                        <button
                          type="submit"
                          disabled={!assignmentText.trim()}
                          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>GỬI BÀI CHO GIẢNG VIÊN CHẤM</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}

              </div>
            </div>
          )}

          {/* 4. QUIZ INTRO CARD (WHITE CARD) */}
          {currentLesson.type === 'quiz' && (
            <div className="w-full max-w-3xl mx-auto p-4 sm:p-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                  <FileQuestion className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
                    BÀI KIỂM TRA TRẮC NGHIỆM
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pt-1">
                    {currentLesson.title}
                  </h2>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Kiểm tra và củng cố toàn bộ kiến thức trọng tâm của chương này trước khi làm bài tập tự luận nộp cho Giảng viên.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <Clock className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block">Thời gian</span>
                    <span className="text-xs font-bold text-slate-900">{currentLesson.duration}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <Target className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block">Số câu</span>
                    <span className="text-xs font-bold text-slate-900">{currentLesson.quizQuestions?.length || 5} câu</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block">Trạng thái</span>
                    <span className="text-xs font-bold text-slate-900">{isCurrentCompleted ? 'Đã xong ✓' : 'Chưa làm'}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsQuizFullScreen(true);
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                    className="px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mx-auto shadow-sm transition-all"
                  >
                    <span>BẮT ĐẦU LÀM BÀI TRẮC NGHIỆM</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. LESSON BOTTOM NAVIGATION BAR */}
          <div className="bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center mt-auto">
            <button
              onClick={handlePrevLesson}
              disabled={allLessons.findIndex(l => l.id === currentLesson.id) === 0}
              className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Bài trước</span>
            </button>

            <button
              onClick={handleNextLesson}
              disabled={allLessons.findIndex(l => l.id === currentLesson.id) === allLessons.length - 1}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <span>Bài tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6. LOWER TABS: OVERVIEW | ASSIGNMENTS | NOTES | RESOURCES | DISCUSSION */}
          {currentLesson.type !== 'quiz' && (
            <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-5">
              
              <div className="flex items-center gap-2 pb-1 overflow-x-auto custom-scrollbar border-b border-slate-200">
                {[
                  { id: 'overview', label: 'Mục tiêu & Tóm tắt', icon: FileText },
                  { id: 'assignments', label: `Bài tập chấm (${allAssignments.length})`, icon: Award },
                  { id: 'notes', label: 'Ghi chú', icon: Bookmark },
                  { id: 'resources', label: 'Tài liệu', icon: Download },
                  { id: 'discussion', label: 'Thảo luận', icon: MessageSquare }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600 font-bold' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: OVERVIEW & KEYPOINTS */}
              {activeTab === 'overview' && (
                <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{currentLesson.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Giảng viên phụ trách: {course.instructor} • Thời lượng: {currentLesson.duration}
                    </p>
                  </div>

                  {currentLesson.overview && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Nội dung bài giảng:</span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {currentLesson.overview}
                      </p>
                    </div>
                  )}

                  {currentLesson.keyPoints?.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Kiến thức cốt lõi cần nhớ:</span>
                      <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-700">
                        {currentLesson.keyPoints.map((kp, kIdx) => (
                          <li key={kIdx}>{kp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentLesson.vocabulary?.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Từ vựng trọng tâm:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentLesson.vocabulary.map(([w, ipa, mean], vIdx) => (
                          <div key={vIdx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                            <div>
                              <strong className="text-slate-900 block">{w}</strong>
                              <span className="text-indigo-600 text-[10px] font-mono">{ipa}</span>
                            </div>
                            <span className="text-slate-500 text-[11px] text-right">{mean}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────────── */}
              {/* TAB 2: ASSIGNMENTS LIST (REDESIGNED LIGHT THEME CARD SYSTEM)       */}
              {/* ───────────────────────────────────────────────────────────────── */}
              {activeTab === 'assignments' && (
                <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  
                  {/* Top Stats Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            Bài tập nộp cho Giảng viên trong các chương
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Mỗi chương kết thúc bằng 1 bài tập do Giảng viên <strong>{course.instructor}</strong> trực tiếp chấm & sửa lỗi.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats Badges */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Tổng số</span>
                        <span className="text-xs font-black text-slate-800">{assignmentStats.total} bài</span>
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
                        <span className="text-[10px] text-indigo-600 block uppercase font-bold">Đã nộp</span>
                        <span className="text-xs font-black text-indigo-700">{assignmentStats.submitted}/{assignmentStats.total}</span>
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                        <span className="text-[10px] text-emerald-600 block uppercase font-bold">Đã chấm</span>
                        <span className="text-xs font-black text-emerald-700">{assignmentStats.graded}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cards Grid for Each Chapter Assignment */}
                  <div className="grid gap-3 pt-1">
                    {allAssignments.map((assign, idx) => {
                      const sub = submissionsList.find(s => s.courseId === course.id && s.lessonId === assign.id);
                      const isSelected = currentLesson.id === assign.id;
                      const parentModule = course.modules?.find(m => m.lessons.some(l => l.id === assign.id));
                      const parentModuleIdx = course.modules?.findIndex(m => m.id === parentModule?.id);

                      // Status Config
                      const isGraded = sub?.status === 'graded';
                      const isPending = sub?.status === 'pending';
                      const isNotSubmitted = !isGraded && !isPending;

                      return (
                        <div 
                          key={assign.id}
                          className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isSelected 
                              ? 'bg-indigo-50/70 border-indigo-400 shadow-xs' 
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                          }`}
                        >
                          {/* Left Details */}
                          <div className="flex items-start gap-3.5 min-w-0">
                            {/* Chapter Index Circle */}
                            <div className={`w-9 h-9 rounded-xl font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                              isGraded 
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
                                : isPending
                                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}>
                              {idx + 1}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                                  Chương {parentModuleIdx !== undefined && parentModuleIdx >= 0 ? parentModuleIdx + 1 : idx + 1}
                                </span>
                                {assign.assignmentType && (
                                  <span className="text-[10px] font-bold text-slate-500">
                                    • {assign.assignmentType}
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {assign.duration}
                                </span>
                              </div>

                              <h4 className="text-sm font-bold text-slate-900 leading-snug mt-1">
                                {assign.title}
                              </h4>

                              {/* Status Badges */}
                              <div className="flex items-center gap-2 mt-2">
                                {isGraded && (
                                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                                    <CheckCheck className="w-3.5 h-3.5" />
                                    <span>Đã có điểm: <strong>{sub.result?.overall}</strong></span>
                                  </span>
                                )}

                                {isPending && (
                                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 animate-pulse">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Đang chờ Giảng viên chấm ({sub.submittedAt})</span>
                                  </span>
                                )}

                                {isNotSubmitted && (
                                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                    Chưa nộp bài
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right Action Button */}
                          <div className="shrink-0 self-end sm:self-auto flex items-center gap-2">
                            {isGraded ? (
                              <button
                                onClick={() => handleSelectLesson(assign)}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Xem điểm & Nhận xét</span>
                              </button>
                            ) : isPending ? (
                              <button
                                onClick={() => handleSelectLesson(assign)}
                                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Xem bài đã nộp</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleSelectLesson(assign)}
                                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
                              >
                                <PenTool className="w-3.5 h-3.5" />
                                <span>Vào làm bài nộp</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: PERSONAL NOTES */}
              {activeTab === 'notes' && (
                <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <h3 className="text-xs font-bold uppercase text-slate-500">Ghi chú bài học</h3>
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <textarea
                      value={newNoteInput}
                      onChange={(e) => setNewNoteInput(e.target.value)}
                      placeholder="Thêm ghi chú nhanh cho bài học này..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 resize-none h-20"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                      >
                        + Thêm ghi chú
                      </button>
                    </div>
                  </form>

                  <div className="space-y-2 pt-2">
                    {notesList.map(n => (
                      <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5">
                        <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold shrink-0">
                          {n.time}
                        </span>
                        <p className="text-slate-700 leading-relaxed">{n.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: RESOURCES */}
              {activeTab === 'resources' && (
                <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <h3 className="text-xs font-bold uppercase text-slate-500">Tài liệu đính kèm</h3>
                  {currentLesson.resources?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentLesson.resources.map((res, rIdx) => (
                        <div key={rIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-slate-900 truncate block">{res.name}</span>
                              <span className="text-[10px] text-slate-500 block">{res.size}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => alert(`Đang tải file: ${res.name}`)}
                            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-indigo-600 border border-slate-200 shrink-0"
                            title="Tải về"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Bài học này không có tài liệu đính kèm.</p>
                  )}
                </div>
              )}

              {/* TAB 5: DISCUSSION */}
              {activeTab === 'discussion' && (
                <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <h3 className="text-xs font-bold uppercase text-slate-500">Hỏi đáp cùng giảng viên & học viên</h3>
                  <form onSubmit={handleAddComment} className="flex gap-2">
                    <input
                      type="text"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Đặt câu hỏi về bài học này..."
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0"
                    >
                      Gửi
                    </button>
                  </form>

                  <div className="space-y-2.5 pt-2">
                    {comments.map(c => (
                      <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{c.avatar} {c.author}</span>
                          <span className="text-[10px] text-slate-400">{c.time}</span>
                        </div>
                        <p className="text-xs text-slate-700 pl-5">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
