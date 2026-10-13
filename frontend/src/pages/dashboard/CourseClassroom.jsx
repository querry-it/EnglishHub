import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, PlayCircle, FileText, HelpCircle, 
  ChevronDown, ChevronRight, Trophy, Menu, X, Clock, Download, MessageSquare, 
  Sparkles, Check, Bookmark, Share2, Volume2, Maximize, Play, Pause, RefreshCw, Send,
  Award, Target, AlertCircle, FileQuestion, CheckCircle
} from 'lucide-react';

// Mock detailed course syllabus data with working video IDs & quizzes
const DEFAULT_COURSE_DATA = {
  id: 'course-ielts-1',
  title: 'Khóa học IELTS cho người mới bắt đầu (Foundation 4.5+)',
  category: 'IELTS',
  instructor: 'Master IELTS English Hub Team',
  modules: [
    {
      id: 'm1',
      title: 'Chương 1: Xây dựng nền tảng & Từ vựng Academic cốt lõi',
      lessons: [
        {
          id: 'l1-1',
          title: '1.1 Orientations: Định hướng lộ trình học IELTS từ 0 lên 4.5+',
          type: 'video',
          duration: '12 phút',
          youtubeId: 'juKd26qkbtw',
          completed: true,
          overview: 'Tổng quan về cấu trúc bài thi IELTS 4 kỹ năng (Listening, Reading, Writing, Speaking). Phương pháp học và lập lịch học tập hiệu quả.',
          resources: [
            { name: 'Chiến lược học IELTS 0-4.5+.pdf', size: '2.4 MB' },
            { name: 'Bảng từ vựng Academic Band 4.5.xlsx', size: '1.1 MB' }
          ]
        },
        {
          id: 'l1-2',
          title: '1.2 Vocabulary: 50 Từ vựng Academic chủ đề Education & Life',
          type: 'video',
          duration: '18 phút',
          youtubeId: 'juKd26qkbtw',
          completed: true,
          overview: 'Học từ vựng qua ngữ cảnh, phiên âm chuẩn IPA và cách ứng dụng vào bài nói Speaking Part 1.',
          resources: [
            { name: 'Flashcard từ vựng Education.pdf', size: '3.8 MB' }
          ]
        },
        {
          id: 'l1-3',
          title: '1.3 Grammar: Thì Hiện tại hoàn thành vs Quá khứ đơn trong IELTS',
          type: 'reading',
          duration: '15 phút',
          completed: false,
          overview: 'Phân biệt cách sử dụng Present Perfect và Past Simple. Các dấu hiệu nhận biết và cấu trúc câu ăn điểm ngữ pháp.',
          resources: [
            { name: 'Tài liệu Ngữ pháp IELTS cơ bản.pdf', size: '1.5 MB' }
          ]
        },
        {
          id: 'l1-4',
          title: '1.4 Quiz: Kiểm tra Trắc nghiệm Từ vựng & Ngữ pháp Chương 1',
          type: 'quiz',
          duration: '10 phút',
          completed: false,
          quizQuestions: [
            {
              question: 'Từ nào đồng nghĩa với "Important" trong ngữ cảnh Academic?',
              options: ['Crucial', 'Small', 'Easy', 'Simple'],
              correctAnswer: 0
            },
            {
              question: 'Cho dạng đúng của từ trong ngoặc: "She (study) English since 2020."',
              options: ['studied', 'has studied', 'studies', 'is studying'],
              correctAnswer: 1
            },
            {
              question: 'Dạng bài làm chọn câu trả lời đúng nhất cho từ "Enhance":',
              options: ['Improve/Boost', 'Decrease', 'Destroy', 'Ignore'],
              correctAnswer: 0
            }
          ]
        }
      ]
    },
    {
      id: 'm2',
      title: 'Chương 2: Kỹ năng Listening & Phương pháp Keyword Technique',
      lessons: [
        {
          id: 'l2-1',
          title: '2.1 Listening Part 1: Kỹ thuật nhận diện bẫy con số & tên riêng',
          type: 'video',
          duration: '22 phút',
          youtubeId: 'juKd26qkbtw',
          completed: false,
          overview: 'Chiến thuật lắng nghe các dạng bài Form Completion, cách phân biệt âm đuôi và nhận biết thông tin bị sửa đổi (Self-correction).',
          resources: [
            { name: 'Bài tập Listening Part 1 Form Completion.pdf', size: '4.2 MB' },
            { name: 'Audio_Practice_Part1.mp3', size: '12 MB' }
          ]
        },
        {
          id: 'l2-2',
          title: '2.2 Dictation: Luyện Nghe chép chính tả & Nhận biết Nối âm (Connected Speech)',
          type: 'video',
          duration: '25 phút',
          youtubeId: 'juKd26qkbtw',
          completed: false,
          overview: 'Luyện tập phương pháp Dictation 3 bước giúp tăng phản xạ nghe các cụm từ nối âm nhanh.',
          resources: []
        },
        {
          id: 'l2-3',
          title: '2.3 Practice: Thực hành giải bài nghe Section 1 mẫu',
          type: 'quiz',
          duration: '20 phút',
          completed: false,
          quizQuestions: [
            {
              question: 'Người nói trong file audio đăng ký tham gia lớp học vào ngày nào?',
              options: ['15th October', '5th October', '50th October', '15th November'],
              correctAnswer: 0
            },
            {
              question: 'Số điện thoại liên lạc của trung tâm là:',
              options: ['0912 345 678', '0912 345 679', '0912 345 670', '0912 345 778'],
              correctAnswer: 0
            }
          ]
        }
      ]
    },
    {
      id: 'm3',
      title: 'Chương 3: Kỹ năng Reading - Skimming, Scanning & True/False/Not Given',
      lessons: [
        {
          id: 'l3-1',
          title: '3.1 Reading: Phương pháp Skimming & Scanning thần tốc',
          type: 'video',
          duration: '20 phút',
          youtubeId: 'juKd26qkbtw',
          completed: false,
          overview: 'Cách nắm ý chính của bài đọc trong 2 phút và tìm từ khóa chính xác không cần đọc từng từ.',
          resources: [
            { name: 'Kỹ thuật Skimming Scanning.pdf', size: '2.0 MB' }
          ]
        },
        {
          id: 'l3-2',
          title: '3.2 Reading: Chiến thuật chinh phục dạng True / False / Not Given',
          type: 'reading',
          duration: '18 phút',
          completed: false,
          overview: 'Phân biệt ranh giới giữa False (Thông tin trái ngược) và Not Given (Thông tin không đề cập).',
          resources: []
        }
      ]
    },
    {
      id: 'm4',
      title: 'Chương 4: Kỹ năng Speaking & Writing cơ bản',
      lessons: [
        {
          id: 'l4-1',
          title: '4.1 Speaking Part 1: Công thức trả lời A.R.E.A (Answer, Reason, Example, Alternative)',
          type: 'video',
          duration: '28 phút',
          youtubeId: 'juKd26qkbtw',
          completed: false,
          overview: 'Công thức giúp phát triển câu trả lời dài, tự nhiên và mở rộng ý trong Speaking Part 1.',
          resources: [
            { name: 'Model Answers Speaking Part 1.pdf', size: '3.1 MB' }
          ]
        },
        {
          id: 'l4-2',
          title: '4.2 Writing Task 1: Cách viết Overview ăn điểm 7.0+',
          type: 'video',
          duration: '30 phút',
          youtubeId: 'juKd26qkbtw',
          completed: false,
          overview: 'Tầm quan trọng của đoạn Overview trong Writing Task 1 và cách chọn lọc xu hướng nổi bật.',
          resources: []
        }
      ]
    }
  ]
};

export default function CourseClassroom() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Active state & syllabus
  const [course, setCourse] = useState(DEFAULT_COURSE_DATA);
  const [expandedModules, setExpandedModules] = useState({ m1: true, m2: true, m3: false, m4: false });
  const [currentLesson, setCurrentLesson] = useState(DEFAULT_COURSE_DATA.modules[0].lessons[0]);
  
  // Track completed lesson IDs in localStorage for persistence
  const [completedLessonIds, setCompletedLessonIds] = useState(() => {
    const saved = localStorage.getItem(`course_completed_${courseId || 'default'}`);
    return saved ? JSON.parse(saved) : ['l1-1', 'l1-2'];
  });

  // Navigation sidebar collapse state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'notes' | 'resources' | 'discussion'

  // Interactive Fullscreen Quiz state
  const [isQuizFullScreen, setIsQuizFullScreen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Notes state
  const [userNotes, setUserNotes] = useState(() => {
    return localStorage.getItem(`notes_${currentLesson.id}`) || '';
  });
  const [notesList, setNotesList] = useState([
    { id: 1, time: '02:15', content: 'Từ vựng quan trọng: Crucial = Extremely important' },
    { id: 2, time: '08:40', content: 'Cần chú ý nối âm giữa từ đuôi phụ âm và đầu nguyên âm' }
  ]);
  const [newNoteInput, setNewNoteInput] = useState('');

  // Discussion state
  const [comments, setComments] = useState([
    { id: 1, author: 'Minh Tuấn', avatar: '👨‍🎓', time: '2 giờ trước', text: 'Bài học rất hay và trực quan! Thầy giải thích mẹo nghe rành mạch quá.' },
    { id: 2, author: 'Lan Anh', avatar: '👩‍🎓', time: '5 giờ trước', text: 'Cho em hỏi phần bài tập 1.3 tải file PDF ở mục Tài Liệu đúng không ạ?' }
  ]);
  const [commentInput, setCommentInput] = useState('');

  // Sync saved completion status
  useEffect(() => {
    localStorage.setItem(`course_completed_${courseId || 'default'}`, JSON.stringify(completedLessonIds));
  }, [completedLessonIds, courseId]);

  // Total lessons count & calculation
  const allLessons = course.modules.flatMap(m => m.lessons);
  const totalLessons = allLessons.length;
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / (totalLessons || 1)) * 100);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleSelectLesson = (lesson) => {
    setCurrentLesson(lesson);
    setIsQuizFullScreen(false);
    setQuizSubmitted(false);
    setQuizAnswers({});
    const savedNote = localStorage.getItem(`notes_${lesson.id}`) || '';
    setUserNotes(savedNote);
  };

  const toggleLessonCompleted = (lessonId) => {
    setCompletedLessonIds(prev => {
      if (prev.includes(lessonId)) {
        return prev.filter(id => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < allLessons.length - 1) {
      handleSelectLesson(allLessons[currentIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      handleSelectLesson(allLessons[currentIndex - 1]);
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    const newNote = {
      id: Date.now(),
      time: '05:00',
      content: newNoteInput.trim()
    };
    setNotesList([newNote, ...notesList]);
    setNewNoteInput('');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([
      {
        id: Date.now(),
        author: 'Bạn (Học viên)',
        avatar: '🎓',
        time: 'Vừa xong',
        text: commentInput.trim()
      },
      ...comments
    ]);
    setCommentInput('');
  };

  const isCurrentCompleted = completedLessonIds.includes(currentLesson.id);

  // Calculate score for quiz
  const calculateQuizScore = () => {
    if (!currentLesson.quizQuestions) return { correct: 0, total: 0, percentage: 0 };
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

  return (
    <div className="h-screen w-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* FULL-SCREEN QUIZ EXAM MODE OVERLAY (WHEN ISQUIZFULLSCREEN IS TRUE)         */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      {isQuizFullScreen && currentLesson.type === 'quiz' && (
        <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden animate-fade-in">
          
          {/* Full-Screen Quiz Top Header */}
          <header className="h-16 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsQuizFullScreen(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-extrabold flex items-center gap-2 transition-all"
              >
                <X className="w-4 h-4" />
                <span>Thoát bài làm</span>
              </button>

              <div>
                <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                  {course.category} QUIZ MODE
                </span>
                <h2 className="text-sm font-black text-white truncate max-w-xl">
                  {currentLesson.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Thời gian: {currentLesson.duration}</span>
              </div>
            </div>
          </header>

          {/* Full-Screen Quiz Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900 custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-6 pb-12">
              
              {/* Quiz Results Summary Banner (After Submit) */}
              {quizSubmitted && (
                <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-500/40 space-y-3 shadow-xl">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <Trophy className="w-8 h-8" />
                    <div>
                      <h3 className="text-lg font-black text-white">Kết Quả Bài Kiểm Tra Trắc Nghiệm</h3>
                      <p className="text-xs text-emerald-300 font-semibold">
                        Bạn đã hoàn thành bài thi! Hệ thống đã tự động tích xanh hoàn thành cho bài học này.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="px-4 py-2 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs font-extrabold text-white">
                      Điểm số: <span className="text-emerald-400 font-black text-sm">{calculateQuizScore().correct} / {calculateQuizScore().total} câu đúng ({calculateQuizScore().percentage}%)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6">
                {currentLesson.quizQuestions?.map((q, qIdx) => (
                  <div key={qIdx} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-lg">
                    <h3 className="text-base font-black text-white flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <span className="leading-snug">{q.question}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = quizAnswers[qIdx] === optIdx;
                        const isCorrect = q.correctAnswer === optIdx;
                        
                        let optStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
                        if (quizSubmitted) {
                          if (isCorrect) optStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                          else if (isChosen && !isCorrect) optStyle = "bg-red-500/20 border-red-500 text-red-300 font-bold";
                        } else if (isChosen) {
                          optStyle = "bg-indigo-600/30 border-indigo-500 text-indigo-200 font-bold";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                            className={`p-4 rounded-2xl border text-xs text-left transition-all flex items-center justify-between ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────────── */}
          {/* BOTTOM FIXED ACTION FOOTER (NỘP BÀI TẬP Ở CUỐI CÙNG)               */}
          {/* ────────────────────────────────────────────────────────────────── */}
          <footer className="h-20 bg-slate-950 border-t border-slate-800 px-6 flex items-center justify-center shrink-0 shadow-2xl">
            {!quizSubmitted ? (
              <button
                onClick={() => {
                  setQuizSubmitted(true);
                  if (!completedLessonIds.includes(currentLesson.id)) {
                    toggleLessonCompleted(currentLesson.id);
                  }
                }}
                className="px-10 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-indigo-600/30 active:scale-95 transition-all"
              >
                <span>NỘP BÀI TẬP</span>
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                  className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold flex items-center gap-2 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Làm lại bài tập</span>
                </button>

                <button
                  onClick={() => setIsQuizFullScreen(false)}
                  className="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>HOÀN THÀNH & THOÁT</span>
                </button>
              </div>
            )}
          </footer>

        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* COURSERA-STYLE CLASSROOM TOP BAR NAVIGATION                                */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <header className="h-16 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-xs">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <button 
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-indigo-600 transition-colors bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Khóa học</span>
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 transition-colors"
            title="Đóng/Mở Lộ trình học"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 uppercase tracking-wider">
                {course.category}
              </span>
              <h1 className="text-xs sm:text-sm md:text-base font-black text-slate-900 truncate max-w-xs sm:max-w-md md:max-w-xl">
                {course.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Overall Progress Tracker & Certificate Badge */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-2xl">
            <div className="text-right">
              <div className="text-xs font-black text-slate-900">
                {progressPercent}% Hoàn thành
              </div>
              <div className="text-[11px] font-bold text-slate-500">
                {completedCount}/{totalLessons} bài học
              </div>
            </div>
            <div className="w-24 bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {progressPercent === 100 ? (
            <button className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3.5 py-2 rounded-xl text-xs font-black animate-pulse">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Nhận Chứng Chỉ</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-600 bg-slate-50 px-3 py-2 rounded-xl">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{completedCount}/{totalLessons}</span>
            </div>
          )}
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* MAIN CONTENT AREA: SIDEBAR ROADMAP + VIDEO PLAYER / CONTENT AREA           */}
      {/* ───────────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ─── LEFT SIDEBAR: COURSERA ROADMAP / SYLLABUS ACCORDION ───────────────── */}
        <aside 
          className={`w-80 md:w-96 bg-white flex flex-col shrink-0 transition-all duration-300 z-30 shadow-xs ${
            isSidebarOpen ? 'translate-x-0 ml-0' : '-ml-80 md:-ml-96'
          }`}
        >
          {/* Syllabus Header */}
          <div className="p-4 flex items-center justify-between bg-white">
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>Lộ trình khóa học</span>
              </h2>
              <p className="text-xs text-slate-500 font-bold mt-0.5">
                {course.modules.length} Chương • {totalLessons} Bài học
              </p>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Module Accordion List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar bg-slate-50/60">
            {course.modules.map((module) => {
              const isExpanded = expandedModules[module.id];
              const moduleCompletedLessons = module.lessons.filter(l => completedLessonIds.includes(l.id)).length;
              const moduleTotal = module.lessons.length;
              const isModuleDone = moduleCompletedLessons === moduleTotal && moduleTotal > 0;

              return (
                <div 
                  key={module.id} 
                  className="rounded-2xl bg-white overflow-hidden shadow-xs"
                >
                  {/* Module Header Toggle Button */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-3.5 text-left flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="mt-0.5 text-slate-500 shrink-0">
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-indigo-600" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-slate-900 leading-snug">
                          {module.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-bold text-slate-500">
                            {moduleCompletedLessons}/{moduleTotal} bài hoàn thành
                          </span>
                          {isModuleDone && (
                            <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700">
                              ✓ Xong
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Lessons List in Module */}
                  {isExpanded && (
                    <div className="divide-y divide-slate-100 bg-white">
                      {module.lessons.map((lesson) => {
                        const isSelected = currentLesson.id === lesson.id;
                        const isDone = completedLessonIds.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleSelectLesson(lesson)}
                            className={`w-full p-3 text-left flex items-center justify-between gap-3 transition-all ${
                              isSelected 
                                ? 'bg-indigo-50/80 border-l-4 border-indigo-600 text-indigo-950 font-extrabold' 
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Green Checkmark Icon ONLY on LEFT */}
                              <div className="shrink-0">
                                {isDone ? (
                                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shadow-xs">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                ) : isSelected ? (
                                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center animate-pulse">
                                    <Play className="w-3 h-3 fill-current ml-0.5" />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center">
                                    {lesson.type === 'video' && <PlayCircle className="w-3.5 h-3.5" />}
                                    {lesson.type === 'reading' && <FileText className="w-3.5 h-3.5" />}
                                    {lesson.type === 'quiz' && <HelpCircle className="w-3.5 h-3.5" />}
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className={`text-xs leading-snug font-bold ${
                                  isSelected 
                                    ? 'text-indigo-950 font-black' 
                                    : isDone 
                                      ? 'text-slate-500 font-semibold' 
                                      : 'text-slate-800'
                                }`}>
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {lesson.duration}
                                  </span>
                                  {lesson.type === 'quiz' && (
                                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-100 text-amber-700">
                                      BÀI TẬP
                                    </span>
                                  )}
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

        {/* ─── RIGHT MAIN PANEL: VIDEO PLAYER & LESSON CONTENT ────────── */}
        <main className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
          
          {/* 1. MEDIA / FULL-WIDTH VIDEO PLAYER / QUIZ CONTAINER */}
          {currentLesson.type === 'video' && (
            <div className="w-full bg-black">
              <div className="relative aspect-video w-full max-h-[72vh] mx-auto overflow-hidden bg-black shadow-xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentLesson.youtubeId || 'juKd26qkbtw'}?autoplay=0&rel=0`}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {currentLesson.type === 'reading' && (
            <div className="max-w-5xl mx-auto w-full p-4 sm:p-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-blue-600 tracking-wider">Tài liệu lý thuyết</span>
                    <h2 className="text-lg md:text-xl font-black text-slate-900">{currentLesson.title}</h2>
                  </div>
                </div>

                <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
                  <p className="bg-slate-50 p-4 rounded-2xl text-slate-800">
                    💡 <strong>Nội dung trọng tâm:</strong> {currentLesson.overview}
                  </p>

                  <h3 className="text-base font-black text-slate-900 pt-2">1. Quy tắc ngữ pháp quan trọng:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    <li><strong>Thì Hiện tại hoàn thành (Present Perfect):</strong> Diễn tả hành động xảy ra trong quá khứ kéo dài đến hiện tại hoặc vừa mới hoàn thành. (Cấu trúc: <code>S + have/has + V3/ed</code>)</li>
                    <li><strong>Thì Quá khứ đơn (Past Simple):</strong> Diễn tả hành động đã chấm dứt hoàn toàn trong quá khứ có thời gian xác định. (Cấu trúc: <code>S + V2/ed</code>)</li>
                  </ul>

                  <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-900 text-xs font-semibold">
                    📌 <strong>Mẹo thi IELTS:</strong> Khi viết essay Writing Task 2, hãy kết hợp thì hiện tại hoàn thành khi đưa ra dẫn chứng từ quá khứ đến nay để thể hiện sự đa dạng cấu trúc ngữ pháp (Grammatical Range & Accuracy).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────────────── */}
          {/* QUIZ LESSON INTRO CARD (BAN ĐẦU HIỂN THỊ TIÊU ĐỀ & NÚT BẮT ĐẦU LÀM BÀI)  */}
          {/* ───────────────────────────────────────────────────────────────────────── */}
          {currentLesson.type === 'quiz' && (
            <div className="max-w-4xl mx-auto w-full p-4 sm:p-8">
              <div className="bg-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-sm border border-slate-100">
                
                <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
                  <FileQuestion className="w-10 h-10 stroke-[1.5]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase text-indigo-600 tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
                    BÀI KIỂM TRA TRẮC NGHIỆM
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight pt-1">
                    {currentLesson.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-lg mx-auto leading-relaxed">
                    Hãy kiểm tra và củng cố lại toàn bộ từ vựng & ngữ pháp trọng tâm đã học trong chương này. Bạn sẽ làm bài trên toàn màn hình để tập trung tối đa!
                  </p>
                </div>

                {/* Quiz Meta Details Grid */}
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 text-center">
                    <Clock className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                    <div className="text-[10px] font-bold text-slate-400">Thời gian</div>
                    <div className="text-xs font-black text-slate-900 mt-0.5">{currentLesson.duration}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 text-center">
                    <Target className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                    <div className="text-[10px] font-bold text-slate-400">Số câu hỏi</div>
                    <div className="text-xs font-black text-slate-900 mt-0.5">{currentLesson.quizQuestions?.length || 3} câu</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 text-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                    <div className="text-[10px] font-bold text-slate-400">Trạng thái</div>
                    <div className="text-xs font-black text-slate-900 mt-0.5">
                      {isCurrentCompleted ? 'Đã xong ✓' : 'Chưa làm'}
                    </div>
                  </div>
                </div>

                {/* Start Quiz Button (Nút Bắt Đầu Làm Bài) */}
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsQuizFullScreen(true);
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                    className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 mx-auto shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
                  >
                    <span>🚀 BẮT ĐẦU LÀM BÀI TẬP</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* 2. LESSON ACTION BAR (NEXT LESSON ALIGNED RIGHT) */}
          <div className="bg-white py-3 px-6 shadow-xs flex justify-end items-center mt-auto">
            <button
              onClick={handleNextLesson}
              disabled={allLessons.findIndex(l => l.id === currentLesson.id) === allLessons.length - 1}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-40 disabled:pointer-events-none text-xs font-extrabold flex items-center gap-2 transition-all shadow-2xs"
            >
              <span>Bài tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. LOWER SECTION TABS: OVERVIEW | NOTES | RESOURCES | DISCUSSION (HIDDEN FOR QUIZZES) */}
          {currentLesson.type !== 'quiz' && (
            <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 space-y-6">
              
              {/* Tab Controls */}
              <div className="flex items-center gap-2 pb-2 overflow-x-auto custom-scrollbar">
              {[
                { id: 'overview', label: 'Tổng quan bài học', icon: FileText },
                { id: 'notes', label: 'Ghi chú cá nhân', icon: Bookmark },
                { id: 'resources', label: 'Tài liệu bài học', icon: Download },
                { id: 'discussion', label: 'Hỏi đáp & Thảo luận', icon: MessageSquare }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-5 bg-white p-6 rounded-3xl shadow-xs">
                <div>
                  <h3 className="text-base font-black text-slate-900">{currentLesson.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Giảng viên: {course.instructor} • Thời lượng: {currentLesson.duration}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-indigo-600 tracking-wider">
                    Mục tiêu bài học (Lesson Objectives)
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                    {currentLesson.overview}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">Trạng thái hoàn thành</div>
                      <div className="text-[11px] font-bold text-slate-500">
                        {isCurrentCompleted ? 'Bạn đã hoàn thành bài học này' : 'Chưa hoàn thành'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleLessonCompleted(currentLesson.id)}
                    className="text-xs font-extrabold px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 shadow-2xs"
                  >
                    {isCurrentCompleted ? 'Hủy hoàn thành' : 'Đánh dấu xong'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: PERSONAL NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-5 bg-white p-6 rounded-3xl shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-indigo-600" />
                    <span>Ghi chú bài học</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">{notesList.length} ghi chú</span>
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="space-y-3">
                  <textarea
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    placeholder="Viết ghi chú ngắn cho bài học này..."
                    className="w-full bg-slate-50 rounded-2xl p-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none h-24"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold"
                    >
                      + Thêm ghi chú
                    </button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-3 pt-2">
                  {notesList.map(n => (
                    <div key={n.id} className="p-4 rounded-2xl bg-slate-50 flex items-start gap-3">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-mono font-black text-[10px]">
                        {n.time}
                      </span>
                      <p className="text-xs text-slate-800 font-semibold leading-relaxed flex-1">
                        {n.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: RESOURCES */}
            {activeTab === 'resources' && (
              <div className="space-y-5 bg-white p-6 rounded-3xl shadow-xs">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-indigo-600" />
                  <span>Tài liệu bài học đính kèm</span>
                </h3>

                {currentLesson.resources?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLesson.resources.map((res, rIdx) => (
                      <div key={rIdx} className="p-4 rounded-2xl bg-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-black text-slate-900 truncate">{res.name}</h4>
                            <span className="text-[10px] text-slate-500 font-bold">{res.size}</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => alert(`Đang tải file ${res.name}`)}
                          className="p-2 rounded-xl bg-white hover:bg-slate-200 text-indigo-600 shadow-2xs shrink-0"
                          title="Tải về"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-400 text-xs font-semibold">
                    Bài học này không có tài liệu đính kèm.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 4: DISCUSSION & Q&A */}
            {activeTab === 'discussion' && (
              <div className="space-y-5 bg-white p-6 rounded-3xl shadow-xs">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>Hỏi đáp & Thảo luận cùng lớp</span>
                </h3>

                {/* Comment Input */}
                <form onSubmit={handleAddComment} className="flex gap-3">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Đặt câu hỏi hoặc thảo luận bài học..."
                    className="flex-1 bg-slate-50 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shrink-0 flex items-center gap-2"
                  >
                    <span>Gửi</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-3 pt-2">
                  {comments.map(c => (
                    <div key={c.id} className="p-4 rounded-2xl bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{c.avatar}</span>
                          <span className="text-xs font-black text-slate-900">{c.author}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-xs text-slate-700 font-semibold leading-relaxed pl-7">
                        {c.text}
                      </p>
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
