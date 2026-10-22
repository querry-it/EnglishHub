import React, { useState, useMemo, useEffect } from 'react';
import { 
  MessageSquare, Send, CheckCircle2, Clock, GraduationCap, 
  FileText, UserCheck, Filter, ChevronDown, ChevronUp, Sparkles, Search,
  Award, Check, Copy, AlertCircle, ArrowRight, ArrowLeft,
  BookOpen, Star, RefreshCw, Eye, Edit3, Mic, Volume2, Play, Pause,
  Printer, Download, Tag, Sliders, Plus, Trash2, HelpCircle, Info, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getStoredSubmissions, gradeSubmission } from '../../api/submissionService';

// Danh sách giảng viên trong hệ thống
const INSTRUCTORS = [
  { id: 'inst-1', name: 'Nguyen Van An', email: 'nguyenvanan@englishhub.edu.vn', roleTitle: 'Giảng viên IELTS Lead (IELTS 8.5)' },
  { id: 'inst-2', name: 'Tran Thi Bich', email: 'tranthibich@englishhub.edu.vn', roleTitle: 'Giảng viên TOEIC Master (990/990)' },
  { id: 'inst-3', name: 'Le Hoang Nam', email: 'lehoangnam@englishhub.edu.vn', roleTitle: 'Giảng viên Giao tiếp Quốc tế' },
  { id: 'inst-4', name: 'Dang Quoc Bao', email: 'dangquocbao@englishhub.edu.vn', roleTitle: 'Giảng viên Tiếng Anh Học thuật' },
];

// Khung tiêu chuẩn khảo thí quốc tế & Band Descriptors chính thức
const COURSE_CATEGORIES = {
  IELTS: {
    label: 'IELTS Writing',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    scale: 'Band 0 – 9.0',
    criteria: [
      { 
        key: 'ta', 
        label: 'Task Achievement (TA)', 
        shortDesc: 'Độ hoàn thành yêu cầu đề bài',
        bandGuide: {
          '6.0': 'Trả lời được yêu cầu chính, lập luận còn chung chung, kết luận chưa nổi bật.',
          '6.5': 'Bao quát tốt các luận điểm, dẫn chứng rõ ràng nhưng chưa đào sâu toàn diện.',
          '7.0': 'Đáp ứng đầy đủ mọi yêu cầu đề bài, quan điểm nhất quán xuyên suốt bài viết.',
          '7.5': 'Luận điểm sắc sảo, dẫn chứng thuyết phục và có chiều sâu tư duy phản biện.',
          '8.0': 'Phân tích toàn diện mọi khía cạnh, dẫn chứng xuất sắc chuẩn học thuật quốc tế.'
        }
      },
      { 
        key: 'cc', 
        label: 'Coherence & Cohesion (CC)', 
        shortDesc: 'Tính mạch lạc và liên kết đoạn',
        bandGuide: {
          '6.0': 'Bố cục đoạn văn hợp lý nhưng từ nối (cohesive devices) còn cơ bản hoặc lặp.',
          '6.5': 'Chuyển đoạn mượt mà, sử dụng đa dạng các từ nối logic giữa các ý.',
          '7.0': 'Ý tứ phát triển tự nhiên, phân đoạn chuẩn mực, liên kết ý chặt chẽ.',
          '7.5': 'Mạch văn trôi chảy, sử dụng từ nối tinh tế và không gượng ép.',
          '8.0': 'Cấu trúc bài viết hoàn hảo như văn phong của người bản xứ.'
        }
      },
      { 
        key: 'lr', 
        label: 'Lexical Resource (LR)', 
        shortDesc: 'Vốn từ vựng & Collocations học thuật',
        bandGuide: {
          '6.0': 'Vốn từ đủ dùng cho chủ đề, còn mắc một số lỗi chọn từ và collocation.',
          '6.5': 'Sử dụng được một số từ vựng ít phổ biến (less common), còn vài lỗi chính tả nhỏ.',
          '7.0': 'Vốn từ học thuật phong phú, dùng collocation chính xác và có nhận thức về phong cách.',
          '7.5': 'Sử dụng linh hoạt các từ ngữ C1-C2, diễn đạt tự nhiên và giàu sắc thái.',
          '8.0': 'Vốn từ vựng sâu rộng, thành ngữ và thuật ngữ chuyên ngành chuẩn xác tuyệt đối.'
        }
      },
      { 
        key: 'gra', 
        label: 'Grammar Accuracy (GRA)', 
        shortDesc: 'Độ đa dạng & Chính xác ngữ pháp',
        bandGuide: {
          '6.0': 'Kết hợp câu đơn và câu phức, còn mắc một số lỗi thì và mạo từ.',
          '6.5': 'Phần lớn câu phức viết đúng, ít lỗi gây hiểu lầm ngữ nghĩa.',
          '7.0': 'Cấu trúc câu phong phú (mệnh đề quan hệ, đảo ngữ, câu điều kiện), tỷ lệ câu đúng cao.',
          '7.5': 'Kiểm soát ngữ pháp rất tốt, chỉ xuất hiện vài lỗi hiếm gặp.',
          '8.0': 'Hầu như không có lỗi ngữ pháp, kiểm soát dấu câu và cấu trúc phức tạp điêu luyện.'
        }
      },
    ],
    overallLabel: 'Overall Band',
    defaultScores: { ta: '6.5', cc: '6.5', lr: '6.5', gra: '6.0' },
    defaultOverall: '6.5',
    steps: ['5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'],
  },
  TOEIC: {
    label: 'TOEIC Assessment',
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
    scale: 'Tổng 0 – 990',
    criteria: [
      { key: 'listening', label: 'Listening Comprehension (/495)', shortDesc: 'Nghe hiểu tình huống đàm thoại' },
      { key: 'reading', label: 'Reading Comprehension (/495)', shortDesc: 'Đọc hiểu báo cáo và email thương mại' },
      { key: 'grammar', label: 'Ngữ pháp Part 5-6 (%)', shortDesc: 'Độ chính xác cấu trúc & từ loại' },
      { key: 'reading7', label: 'Chiến thuật Part 7 (%)', shortDesc: 'Khả năng skimming & scanning thông tin' },
    ],
    overallLabel: 'Tổng điểm (/990)',
    defaultScores: { listening: '390', reading: '355', grammar: '80', reading7: '75' },
    defaultOverall: '745',
    steps: [],
  },
  GIAOTIEP: {
    label: 'Giao tiếp Thực tế',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    scale: 'Thang 10',
    criteria: [
      { key: 'grammar', label: 'Ngữ pháp & Cấu trúc', shortDesc: 'Câu đúng ngữ pháp và diễn đạt tự nhiên' },
      { key: 'vocab', label: 'Từ vựng ứng dụng', shortDesc: 'Sử dụng từ đúng ngữ cảnh thương mại' },
      { key: 'context', label: 'Xử lý tình huống', shortDesc: 'Giải quyết vấn đề linh hoạt và lịch thiệp' },
      { key: 'naturalness', label: 'Độ tự nhiên bản ngữ', shortDesc: 'Văn phong chuyên nghiệp và trôi chảy' },
    ],
    overallLabel: 'Tổng điểm (/10)',
    defaultScores: { grammar: '8.0', vocab: '8.0', context: '8.5', naturalness: '8.0' },
    defaultOverall: '8.1',
    steps: ['6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0'],
  },
};

// Loại lỗi dùng cho in-line annotations
const ANNOTATION_TYPES = {
  grammar: { label: 'Lỗi Ngữ pháp (Grammar)', color: 'border-rose-400 bg-rose-50 text-rose-800', dot: 'bg-rose-500' },
  vocab: { label: 'Từ vựng / Collocation (Vocabulary)', color: 'border-amber-400 bg-amber-50 text-amber-800', dot: 'bg-amber-500' },
  style: { label: 'Văn phong & Diễn đạt (Style)', color: 'border-blue-400 bg-blue-50 text-blue-800', dot: 'bg-blue-500' },
  praise: { label: 'Điểm sáng C1-C2 (Praise)', color: 'border-emerald-400 bg-emerald-50 text-emerald-800', dot: 'bg-emerald-500' },
};

export default function InstructorGrading() {
  const { user } = useAuth();
  const currentInstructorName = user?.fullName || 'Nguyen Van An';

  const [submissions, setSubmissions] = useState(() => getStoredSubmissions());
  const [searchQuery, setSearchQuery] = useState('');
  const [instructorFilter, setInstructorFilter] = useState('MY_COURSES');
  const [selectedCourseTitle, setSelectedCourseTitle] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [activeItem, setActiveItem] = useState(null);

  // Chế độ xem bài viết: 'annotated' (Chữa bài chuyên sâu) | 'original' (Văn bản gốc)
  const [essayViewMode, setEssayViewMode] = useState('annotated');
  const [selectedAnnotationId, setSelectedAnnotationId] = useState(null);
  const [showAddAnnotationModal, setShowAddAnnotationModal] = useState(false);
  const [showOfficialReportModal, setShowOfficialReportModal] = useState(false);

  // New annotation form
  const [newAnnData, setNewAnnData] = useState({
    original: '',
    correction: '',
    type: 'grammar',
    explanation: ''
  });

  // State form chấm điểm
  const [scores, setScores] = useState({});
  const [overall, setOverall] = useState('');
  const [feedback, setFeedback] = useState('');
  const [strengths, setStrengths] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [upgradedSample, setUpgradedSample] = useState('');
  const [activeTabFeedback, setActiveTabFeedback] = useState('rubric'); // 'rubric' | 'strengths' | 'upgrade' | 'audio'
  
  // Voice note simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioDuration, setAudioDuration] = useState('01:24');

  const [sentSuccess, setSentSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Lắng nghe cập nhật bài nộp từ các trang khác
  useEffect(() => {
    const handleUpdate = () => {
      setSubmissions(getStoredSubmissions());
    };
    window.addEventListener('submission_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('submission_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Danh sách các khóa học duy nhất của bộ lọc giảng viên
  const availableCourses = useMemo(() => {
    let pool = submissions;
    if (instructorFilter === 'MY_COURSES') {
      pool = pool.filter(
        (s) => s.instructorName === currentInstructorName || (user?.email && s.instructorEmail === user.email)
      );
    } else if (instructorFilter !== 'ALL') {
      pool = pool.filter((s) => s.instructorName === instructorFilter);
    }
    return [...new Set(pool.map((s) => s.courseTitle))];
  }, [submissions, instructorFilter, currentInstructorName, user?.email]);

  const handleInstructorFilterChange = (newFilter) => {
    setInstructorFilter(newFilter);
    setSelectedCourseTitle('ALL');
  };

  // Lọc bài nộp
  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (instructorFilter === 'MY_COURSES') {
        const isMine =
          s.instructorName === currentInstructorName || (user?.email && s.instructorEmail === user.email);
        if (!isMine) return false;
      } else if (instructorFilter !== 'ALL') {
        if (s.instructorName !== instructorFilter) return false;
      }

      if (selectedCourseTitle !== 'ALL' && s.courseTitle !== selectedCourseTitle) {
        return false;
      }

      if (activeCategory !== 'ALL' && s.category !== activeCategory) {
        return false;
      }

      if (s.status !== statusFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = s.studentName?.toLowerCase().includes(q);
        const matchesEmail = s.studentEmail?.toLowerCase().includes(q);
        const matchesLesson = s.lessonTitle?.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesLesson) return false;
      }

      return true;
    });
  }, [submissions, instructorFilter, selectedCourseTitle, activeCategory, statusFilter, searchQuery, currentInstructorName, user?.email]);

  // Tự động chọn bài đầu tiên khi lọc thay đổi
  useEffect(() => {
    if (filtered.length > 0) {
      if (!activeItem || !filtered.find(f => f.id === activeItem)) {
        setActiveItem(filtered[0].id);
      }
    } else {
      setActiveItem(null);
    }
  }, [filtered, activeItem]);

  const selected = filtered.find((s) => s.id === activeItem) || (filtered.length > 0 ? filtered[0] : null);
  const config = selected ? COURSE_CATEGORIES[selected.category] || COURSE_CATEGORIES.IELTS : COURSE_CATEGORIES.IELTS;

  // Danh sách annotations cục bộ của bài hiện tại
  const [currentAnnotations, setCurrentAnnotations] = useState([]);

  // Đồng bộ form khi chuyển bài
  useEffect(() => {
    if (!selected) return;
    const cfg = COURSE_CATEGORIES[selected.category] || COURSE_CATEGORIES.IELTS;
    setScores(selected.result?.scores || cfg.defaultScores);
    setOverall(selected.result?.overall || cfg.defaultOverall);
    setFeedback(selected.result?.feedback || 'Bài viết có cấu trúc rõ ràng, luận điểm mạch lạc. Cần chú ý hoàn thiện các cụm từ vựng học thuật để nâng band điểm.');
    setStrengths(selected.result?.strengths || '• Lập luận có tính liên kết cao và mở rộng ý tưởng đầy đủ.\n• Vận dụng linh hoạt các câu phức và mệnh đề quan hệ.\n• Giữ vững lập trường xuyên suốt từ mở bài đến kết bài.');
    setWeaknesses(selected.result?.weaknesses || '• Một vài collocation còn mang hơi hướng dịch từng từ (word-by-word).\n• Chú ý kiểm soát mạo từ xác định "the" trong các câu phức.');
    setUpgradedSample(selected.upgradedSample || selected.result?.upgradedSample || '');
    setCurrentAnnotations(selected.annotations || []);
    setSelectedAnnotationId(null);
  }, [selected?.id, selected?.status]);

  // Thống kê nhanh
  const stats = useMemo(() => {
    const mySubmissions = submissions.filter(
      (s) => s.instructorName === currentInstructorName || (user?.email && s.instructorEmail === user.email)
    );
    const pendingCount = mySubmissions.filter((s) => s.status === 'pending').length;
    const gradedCount = mySubmissions.filter((s) => s.status === 'graded').length;
    const total = pendingCount + gradedCount;
    const completionRate = total > 0 ? Math.round((gradedCount / total) * 100) : 100;

    return { pendingCount, gradedCount, completionRate };
  }, [submissions, currentInstructorName, user?.email]);

  // Tự động tính điểm tổng thể cho IELTS
  const handleScoreChange = (criterionKey, value) => {
    const updated = { ...scores, [criterionKey]: value };
    setScores(updated);

    if (selected?.category === 'IELTS') {
      const vals = Object.values(updated).map(v => parseFloat(v)).filter(v => !isNaN(v));
      if (vals.length === 4) {
        const avg = vals.reduce((a, b) => a + b, 0) / 4;
        const rounded = Math.round(avg * 2) / 2;
        setOverall(rounded.toFixed(1));
      }
    } else if (selected?.category === 'GIAOTIEP') {
      const vals = Object.values(updated).map(v => parseFloat(v)).filter(v => !isNaN(v));
      if (vals.length === 4) {
        const avg = vals.reduce((a, b) => a + b, 0) / 4;
        setOverall(avg.toFixed(1));
      }
    } else if (selected?.category === 'TOEIC') {
      const listening = parseInt(updated.listening, 10) || 0;
      const reading = parseInt(updated.reading, 10) || 0;
      setOverall(String(listening + reading));
    }
  };

  // Thêm annotation mới
  const handleAddAnnotation = (e) => {
    e.preventDefault();
    if (!newAnnData.original.trim() || !newAnnData.correction.trim()) return;

    const newAnn = {
      id: `ann-${Date.now()}`,
      original: newAnnData.original.trim(),
      correction: newAnnData.correction.trim(),
      type: newAnnData.type,
      categoryLabel: ANNOTATION_TYPES[newAnnData.type].label,
      explanation: newAnnData.explanation.trim() || 'Giảng viên đã nhận xét và đề xuất phương án cải thiện.'
    };

    const updated = [...currentAnnotations, newAnn];
    setCurrentAnnotations(updated);
    setShowAddAnnotationModal(false);
    setNewAnnData({ original: '', correction: '', type: 'grammar', explanation: '' });
  };

  // Xóa annotation
  const handleDeleteAnnotation = (id) => {
    setCurrentAnnotations(prev => prev.filter(a => a.id !== id));
    if (selectedAnnotationId === id) setSelectedAnnotationId(null);
  };

  // Lưu và gửi kết quả chấm
  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!selected) return;

    const updated = gradeSubmission(selected.id, { 
      scores, 
      overall, 
      feedback,
      strengths,
      weaknesses,
      upgradedSample,
      annotations: currentAnnotations,
      instructorGraded: selected.instructorName
    });
    setSubmissions(updated);
    setSentSuccess(selected.studentName);

    setTimeout(() => {
      setSentSuccess(false);
      const nextPending = filtered.find(f => f.id !== selected.id && f.status === 'pending');
      if (nextPending) {
        setActiveItem(nextPending.id);
      }
    }, 1500);
  };

  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Chuyển bài trước/sau
  const handlePrevSubmission = () => {
    const idx = filtered.findIndex(s => s.id === activeItem);
    if (idx > 0) setActiveItem(filtered[idx - 1].id);
  };

  const handleNextSubmission = () => {
    const idx = filtered.findIndex(s => s.id === activeItem);
    if (idx < filtered.length - 1) setActiveItem(filtered[idx + 1].id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-20">
      
      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* TOP HEADER: PROFESSIONAL SPEEDGRADER BAR                               */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-[10px] font-black uppercase tracking-wider">
              SpeedGrader Studio • Cambridge Aligned
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Hệ thống thẩm định & Chữa bài trực tiếp
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Không Gian Chấm Điểm & Chữa Bài Giảng Viên</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1 max-w-2xl">
            Sửa lỗi từng câu trên bài viết của học viên, thẩm định 4 tiêu chí Band Descriptor chuẩn IDP/British Council và xuất phiếu đánh giá học thuật 1-1.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
          <button
            type="button"
            onClick={() => setShowOfficialReportModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all shadow-2xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Xem & In Phiếu Điểm</span>
          </button>

          <div className="flex items-center gap-2.5 px-3.5 py-2 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
              {currentInstructorName.charAt(0)}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase text-slate-400 block leading-tight">Giảng viên</span>
              <span className="text-xs font-black text-slate-900 block leading-tight">{currentInstructorName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* FILTER & METRICS BAR                                                    */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleInstructorFilterChange('MY_COURSES')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
                instructorFilter === 'MY_COURSES'
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Khóa học của tôi ({currentInstructorName})</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                instructorFilter === 'MY_COURSES' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-800'
              }`}>
                {stats.pendingCount}
              </span>
            </button>

            <button
              onClick={() => handleInstructorFilterChange('ALL')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
                instructorFilter === 'ALL'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Tất cả giảng viên</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm học viên, bài tập..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <select
              value={instructorFilter}
              onChange={(e) => handleInstructorFilterChange(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:border-indigo-600"
            >
              <option value="MY_COURSES">⭐ Khóa học của tôi</option>
              <option value="ALL">🌐 Toàn bộ giảng viên</option>
              {INSTRUCTORS.map((inst) => (
                <option key={inst.id} value={inst.name}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Lọc theo Loại chứng chỉ */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider mr-1">
            Loại chứng chỉ:
          </span>
          {[
            { key: 'ALL', label: 'Tất cả' },
            ...Object.entries(COURSE_CATEGORIES).map(([k, v]) => ({ key: k, label: v.label })),
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-black transition-all flex items-center gap-1.5 ${
                activeCategory === tab.key
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* SPEEDGRADER MAIN WORKSPACE: 2-COLUMN VIEW                              */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* CỘT TRÁI: QUEUE BÀI NỘP HỌC VIÊN (4 COLS) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-4 rounded-3xl shadow-xs space-y-3">
          
          {/* Tab Chờ chấm vs Đã chấm */}
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => setStatusFilter('pending')}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                statusFilter === 'pending'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Chờ chấm điểm</span>
              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full text-[10px]">
                {submissions.filter(s => s.status === 'pending').length}
              </span>
            </button>

            <button
              onClick={() => setStatusFilter('graded')}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                statusFilter === 'graded'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã chấm điểm</span>
              <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full text-[10px]">
                {submissions.filter(s => s.status === 'graded').length}
              </span>
            </button>
          </div>

          {/* Danh sách cuộn */}
          <div className="space-y-2 max-h-[820px] overflow-y-auto pr-1 custom-scrollbar">
            {filtered.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-2">
                <UserCheck className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-xs font-black text-slate-700">Không có bài nộp nào</p>
                <p className="text-[11px] text-slate-400">
                  Không tìm thấy bài nộp {statusFilter === 'pending' ? 'chờ chấm' : 'đã chấm'} theo tiêu chí đã chọn.
                </p>
              </div>
            ) : (
              filtered.map((sub) => {
                const cat = COURSE_CATEGORIES[sub.category] || COURSE_CATEGORIES.IELTS;
                const isSelected = selected && sub.id === selected.id;
                const wordCount = countWords(sub.studentNote);

                return (
                  <div
                    key={sub.id}
                    onClick={() => setActiveItem(sub.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left space-y-2 ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black shrink-0">
                          {sub.studentName.charAt(0)}
                        </div>
                        <span className="font-black text-xs text-slate-900 truncate">
                          {sub.studentName}
                        </span>
                      </div>

                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${cat.badge}`}>
                        {cat.label}
                      </span>
                    </div>

                    <p className="text-[11px] font-bold text-slate-500 truncate">
                      {sub.lessonTitle}
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 pt-1.5 border-t border-slate-200/80">
                      <span className="flex items-center gap-1 font-bold text-slate-600">
                        <FileText className="w-3 h-3 text-slate-400" />
                        {wordCount} từ
                      </span>

                      {sub.status === 'graded' ? (
                        <span className="text-emerald-700 font-black flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Band {sub.result?.overall}</span>
                        </span>
                      ) : (
                        <span className="text-amber-700 font-bold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>{sub.submittedAt}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* CỘT PHẢI: KHÔNG GIAN CHỮA BÀI & BẢNG ĐIỂM CHUYÊN SÂU (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          {!selected ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-black text-slate-700">Chưa chọn bài nộp nào</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Chọn một bài kiểm tra ở danh sách bên trái để mở không gian chấm bài và nhận xét chuyên sâu.
              </p>
            </div>
          ) : (
            <>
              {/* TOP WORKSPACE CARD: THÔNG TIN HỌC VIÊN & ĐIỀU HƯỚNG */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-black text-slate-900">
                        {selected.studentName}
                      </h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${config.badge}`}>
                        {config.label}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        ({selected.studentEmail})
                      </span>
                    </div>
                    <p className="text-xs font-black text-indigo-700">
                      Khóa học: {selected.courseTitle}
                    </p>
                    <p className="text-xs font-bold text-slate-600">
                      Bài kiểm tra: {selected.lessonTitle} ({selected.type})
                    </p>
                  </div>

                  {/* Điều hướng Bài Trước / Bài Sau */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={handlePrevSubmission}
                      className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
                      title="Bài nộp trước"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextSubmission}
                      className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
                      title="Bài nộp tiếp theo"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-500">
                      Độ dài bài viết: <strong className="text-slate-900">{countWords(selected.studentNote)} từ</strong>
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold">
                      ✓ Đạt chuẩn tối thiểu
                    </span>
                  </div>

                  <span className="text-slate-400 font-medium text-[11px]">
                    Nộp: {selected.submittedAt} • Phân công: {selected.instructorName}
                  </span>
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────────── */}
              {/* KHỐI 1: BÀI LÀM CỦA HỌC VIÊN & CHẾ ĐỘ CHỮA BÀI IN-LINE          */}
              {/* ────────────────────────────────────────────────────────────── */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                
                {/* Switcher: Annotated vs Original */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEssayViewMode('annotated')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                        essayViewMode === 'annotated'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Chế độ Chữa bài Sâu ({currentAnnotations.length} ghi chú)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEssayViewMode('original')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                        essayViewMode === 'original'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Văn bản gốc</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAnnotationModal(true)}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-black flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Thêm lỗi/chữa câu</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(selected.studentNote);
                        setCopiedText(true);
                        setTimeout(() => setCopiedText(false), 2000);
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Sao chép bài viết"
                    >
                      {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Khung hiển thị nội dung bài viết */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-sans">
                  {essayViewMode === 'original' ? (
                    <p className="text-xs sm:text-sm font-medium text-slate-800 whitespace-pre-line leading-relaxed select-text">
                      {selected.studentNote}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-medium text-slate-800 whitespace-pre-line leading-relaxed select-text">
                        {selected.studentNote}
                      </p>

                      {/* Danh sách các câu được Giảng viên gạch chân & sửa lỗi */}
                      <div className="pt-3 border-t border-slate-200 space-y-2.5">
                        <span className="text-[11px] font-black uppercase text-indigo-900 block tracking-wider">
                          📌 Chi tiết các điểm cần sửa chữa trực tiếp trên bài:
                        </span>

                        <div className="space-y-2">
                          {currentAnnotations.map((ann, idx) => {
                            const typeMeta = ANNOTATION_TYPES[ann.type] || ANNOTATION_TYPES.grammar;
                            const isExpanded = selectedAnnotationId === ann.id;

                            return (
                              <div
                                key={ann.id || idx}
                                className={`p-3 rounded-xl border transition-all text-left ${typeMeta.color}`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className={`w-2 h-2 rounded-full ${typeMeta.dot}`}></span>
                                      <span className="text-[11px] font-black uppercase tracking-tight">
                                        {typeMeta.label}
                                      </span>
                                    </div>
                                    <div className="text-xs font-bold">
                                      <span className="line-through opacity-70 mr-1.5">"{ann.original}"</span>
                                      <span className="text-indigo-900 font-black">➔ "{ann.correction}"</span>
                                    </div>
                                    <p className="text-[11px] font-medium leading-relaxed mt-1 opacity-90">
                                      {ann.explanation}
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAnnotation(ann.id)}
                                    className="p-1 hover:text-rose-600 rounded transition-colors"
                                    title="Xóa nhận xét này"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* ────────────────────────────────────────────────────────────── */}
              {/* KHỐI 2: THẨM ĐỊNH RUBRIC & TIÊU CHÍ BAND DESCRIPTORS          */}
              {/* ────────────────────────────────────────────────────────────── */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-600" />
                      <span>Thang Điểm Rubric Theo Chuẩn Khảo Thí ({config.label})</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Thang chuẩn: {config.scale} • Điểm tổng thể được tính toán tự động
                    </p>
                  </div>

                  {/* OVERALL SCORE DISPLAY */}
                  <div className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl shadow-sm text-center">
                    <span className="text-[10px] font-black uppercase tracking-wider block opacity-80 leading-none">
                      {config.overallLabel}
                    </span>
                    <span className="text-2xl font-black font-mono leading-tight">
                      {overall || '—'}
                    </span>
                  </div>
                </div>

                {/* Grid 4 Tiêu chí Rubric */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {config.criteria.map((crit) => (
                    <div key={crit.key} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-black text-slate-900">{crit.label}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{crit.shortDesc}</p>
                        </div>
                        <input
                          type="text"
                          value={scores[crit.key] ?? ''}
                          onChange={(e) => handleScoreChange(crit.key, e.target.value)}
                          className="w-16 px-2.5 py-1 text-center font-mono text-sm font-black text-indigo-700 bg-white border border-indigo-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                      </div>

                      {/* Band Descriptors Selector nếu có */}
                      {crit.bandGuide && (
                        <div className="space-y-1.5 pt-1">
                          <div className="flex flex-wrap gap-1">
                            {Object.keys(crit.bandGuide).map((bandVal) => (
                              <button
                                key={bandVal}
                                type="button"
                                onClick={() => handleScoreChange(crit.key, bandVal)}
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                                  scores[crit.key] === bandVal
                                    ? 'bg-indigo-600 text-white shadow-2xs'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                {bandVal}
                              </button>
                            ))}
                          </div>
                          {crit.bandGuide[scores[crit.key]] && (
                            <p className="text-[10px] text-indigo-900 bg-indigo-50/60 p-2 rounded-lg border border-indigo-100 font-medium">
                              {crit.bandGuide[scores[crit.key]]}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>

              {/* ────────────────────────────────────────────────────────────── */}
              {/* KHỐI 3: NHẬN XÉT SƯ PHẠM TOÀN DIỆN (STRUCTURED FEEDBACK)       */}
              {/* ────────────────────────────────────────────────────────────── */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
                
                {/* Tabs nhận xét */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  {[
                    { id: 'rubric', label: '1. Nhận xét tổng kết & Lời khuyên' },
                    { id: 'strengths', label: '2. Điểm mạnh & Lỗ hổng cần sửa' },
                    { id: 'upgrade', label: '3. Đoạn văn mẫu nâng cấp Band 8.0' },
                    { id: 'audio', label: '4. Voice Note giọng nói' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTabFeedback(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                        activeTabFeedback === tab.id
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab 1: Nhận xét tổng quan */}
                {activeTabFeedback === 'rubric' && (
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-indigo-600" />
                      <span>Nhận xét sư phạm từ Giảng viên *</span>
                    </label>
                    <textarea
                      rows={4}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Nhập nhận xét tổng quan..."
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white leading-relaxed"
                    />
                  </div>
                )}

                {/* Tab 2: Điểm mạnh & Lỗ hổng */}
                {activeTabFeedback === 'strengths' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Điểm mạnh nổi bật (Key Strengths)</span>
                      </label>
                      <textarea
                        rows={5}
                        value={strengths}
                        onChange={(e) => setStrengths(e.target.value)}
                        placeholder="Những điểm học viên làm tốt..."
                        className="w-full p-3 rounded-2xl bg-emerald-50/40 border border-emerald-200 text-xs font-medium text-slate-900 focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-rose-700 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Lỗ hổng cần khắc phục (Areas for Improvement)</span>
                      </label>
                      <textarea
                        rows={5}
                        value={weaknesses}
                        onChange={(e) => setWeaknesses(e.target.value)}
                        placeholder="Những lỗi khiến học viên bị trừ band..."
                        className="w-full p-3 rounded-2xl bg-rose-50/40 border border-rose-200 text-xs font-medium text-slate-900 focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 3: Đoạn văn mẫu nâng cấp Band 8.0 */}
                {activeTabFeedback === 'upgrade' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black uppercase text-indigo-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Đoạn văn viết lại nâng cấp mẫu (Upgraded Model Paragraph Band 8.0)</span>
                      </label>
                    </div>
                    <textarea
                      rows={5}
                      value={upgradedSample}
                      onChange={(e) => setUpgradedSample(e.target.value)}
                      placeholder="Giảng viên viết lại 1 đoạn của học viên để đối chiếu cách nâng cấp từ vựng & cấu trúc..."
                      className="w-full p-4 rounded-2xl bg-indigo-50/30 border border-indigo-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white leading-relaxed font-serif"
                    />
                  </div>
                )}

                {/* Tab 4: Ghi âm giọng nói */}
                {activeTabFeedback === 'audio' && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Mic className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">Bản ghi âm nhận xét của Giảng viên</p>
                        <p className="text-[11px] text-slate-400">Audio giải thích chi tiết phát âm & ngữ điệu (Độ dài: {audioDuration})</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                      >
                        {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{isPlayingAudio ? 'Đang phát...' : 'Nghe thử'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Nút gửi chính thức */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-600">
                      Trạng thái: {selected.status === 'graded' ? 'Đã hoàn tất chấm điểm' : 'Đang xử lý bài làm'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendFeedback}
                    className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>{selected.status === 'graded' ? 'Cập nhật & Phát hành phiếu điểm' : 'Gửi Kết Quả Chấm Bài 1-1'}</span>
                  </button>
                </div>

              </div>
            </>
          )}
        </div>

      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* MODAL 1: THÊM GHI CHÚ CHỮA BÀI IN-LINE (ADD INLINE CORRECTION)         */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {showAddAnnotationModal && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>Thêm Chữa Lỗi Trực Tiếp Trên Bài Viết</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddAnnotationModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAnnotation} className="space-y-3">
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                  Cụm từ gốc trong bài của học viên *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: discuss about, creates distractions..."
                  value={newAnnData.original}
                  onChange={(e) => setNewAnnData({ ...newAnnData, original: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                  Đề xuất phương án sửa lại (Correction) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: discuss, induces digital distractions..."
                  value={newAnnData.correction}
                  onChange={(e) => setNewAnnData({ ...newAnnData, correction: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-indigo-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                  Phân loại lỗi
                </label>
                <select
                  value={newAnnData.type}
                  onChange={(e) => setNewAnnData({ ...newAnnData, type: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="grammar">🔴 Lỗi Ngữ pháp (Grammar)</option>
                  <option value="vocab">🟠 Lỗi Từ vựng / Collocation (Vocabulary)</option>
                  <option value="style">🟢 Gợi ý Diễn đạt Tự nhiên (Native Style)</option>
                  <option value="praise">🟣 Khen ngợi Điểm sáng (Praise C1-C2)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                  Giải thích lý do & quy tắc sư phạm
                </label>
                <textarea
                  rows={2}
                  placeholder="Lý do vì sao cần sửa như vậy..."
                  value={newAnnData.explanation}
                  onChange={(e) => setNewAnnData({ ...newAnnData, explanation: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAnnotationModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase"
                >
                  Thêm nhận xét
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* MODAL 2: XEM TRƯỚC PHIẾU ĐIỂM CHÍNH THỨC (OFFICIAL EVALUATION SHEET)   */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {showOfficialReportModal && selected && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Header Report Card */}
            <div className="flex items-center justify-between border-b-2 border-indigo-600 pb-4">
              <div>
                <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase">
                  EnglishHub Academic Assessment Service
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Phiếu Đánh Giá Năng Lực Học Thuật 1-1
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowOfficialReportModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile table */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Học viên</span>
                <strong className="text-slate-900 text-sm">{selected.studentName}</strong>
                <p className="text-slate-500">{selected.studentEmail}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Giảng viên khảo thí</span>
                <strong className="text-slate-900 text-sm">{selected.instructorName}</strong>
                <p className="text-indigo-600 font-semibold">{selected.instructorEmail}</p>
              </div>
            </div>

            {/* Band Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-700">Kết quả đánh giá theo Rubric:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(scores).map(([k, val]) => (
                  <div key={k} className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-center">
                    <span className="text-[10px] uppercase font-bold text-indigo-800 block">{k}</span>
                    <span className="text-lg font-black text-indigo-900">{val}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-indigo-600 text-white rounded-2xl flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider">Overall Band Score:</span>
                <span className="text-2xl font-black">{overall}</span>
              </div>
            </div>

            {/* Teacher Feedback Quote */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-slate-700">Lời phê chính thức từ Giảng viên:</h4>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                {feedback}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>In phiếu điểm</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
