import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Crown, Sparkles, ArrowRight, Search, Users, Filter, ChevronDown, ArrowLeft,
  GraduationCap, Clock, CheckCircle2, BookOpen, FolderOpen, Star, PlusCircle, Check, BookMarked, Play, Award, ShieldCheck, CreditCard, Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PaymentModal from '../../components/PaymentModal';

export default function Courses() {
  const navigate = useNavigate();
  const { openProModal } = useAuth();

  // User Enrolled / Saved Courses state (pre-populated with 1 enrolled course for instant demo)
  const [myCourses, setMyCourses] = useState([
    {
      id: 'course-ielts-1',
      title: 'Khóa học IELTS cho người mới bắt đầu (Foundation 4.5+)',
      description: 'Xây dựng nền tảng từ vựng Academic, ngữ pháp chuyên sâu & kỹ năng nghe nói 4 kỹ năng cơ bản.',
      category: 'IELTS',
      targetScore: 'Target 4.5 - 5.5+',
      levelBadge: 'Cơ bản (A2)',
      lessonsCount: 36,
      duration: '24 giờ học',
      studentsCount: '1,850',
      rating: 4.9,
      price: '490.000đ',
      originalPrice: '990.000đ',
      discount: '-50%',
      badgeText: 'NỀN TẢNG',
      gradient: 'from-blue-600 to-indigo-700'
    }
  ]);
  const [toastMessage, setToastMessage] = useState(null);

  // Payment Modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState(null);

  // Filter States
  const [activeCategoryTab, setActiveCategoryTab] = useState('all'); // 'all' | 'IELTS' | 'TOEIC' | 'GIAO TIẾP' | 'CÔNG SỞ'
  const [searchQuery, setSearchQuery] = useState('');

  // Comprehensive Catalog of Structured Course Cards with Pricing (No PRO, No video thumbnails)
  const coursesCatalog = [
    // ─── IELTS COURSES ──────────────────────────────────────
    {
      id: 'course-ielts-1',
      title: 'Khóa học IELTS cho người mới bắt đầu (Foundation 4.5+)',
      description: 'Xây dựng nền tảng từ vựng Academic, ngữ pháp chuyên sâu & kỹ năng nghe nói 4 kỹ năng cơ bản.',
      category: 'IELTS',
      targetScore: 'Target 4.5 - 5.5+',
      levelBadge: 'Cơ bản (A2)',
      lessonsCount: 36,
      duration: '24 giờ học',
      studentsCount: '1,850',
      rating: 4.9,
      price: '490.000đ',
      originalPrice: '990.000đ',
      discount: '-50%',
      badgeText: 'NỀN TẢNG',
      gradient: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'course-ielts-2',
      title: 'Khóa học IELTS Bứt phá Band 6.0 - 6.5+',
      description: 'Chiến thuật làm bài Listening Section 3 & 4, bài mẫu Speaking Part 2 & 3 và cấu trúc Writing Task 1.',
      category: 'IELTS',
      targetScore: 'Target 6.0 - 6.5+',
      levelBadge: 'Trung cấp (B2)',
      lessonsCount: 52,
      duration: '40 giờ học',
      studentsCount: '2,410',
      rating: 4.95,
      price: '790.000đ',
      originalPrice: '1.490.000đ',
      discount: '-47%',
      badgeText: 'BÁN CHẠY',
      gradient: 'from-indigo-700 to-purple-800'
    },
    {
      id: 'course-ielts-3',
      title: 'Khóa học IELTS Cấp tốc Band 7.0+ Chuyên sâu',
      description: 'Luyện làm chủ 1500+ từ vựng Band 8.0, tư duy lập dàn ý Writing Task 2 & phản xạ Speaking tự nhiên.',
      category: 'IELTS',
      targetScore: 'Target 7.0 - 8.0+',
      levelBadge: 'Nâng cao (C1)',
      lessonsCount: 48,
      duration: '38 giờ học',
      studentsCount: '980',
      rating: 4.88,
      price: '1.290.000đ',
      originalPrice: '2.500.000đ',
      discount: '-48%',
      badgeText: 'CAO CẤP',
      gradient: 'from-purple-800 to-pink-800'
    },

    // ─── TOEIC COURSES ──────────────────────────────────────
    {
      id: 'course-toeic-1',
      title: 'Khóa học TOEIC 500+ Cấp tốc cho người đi làm',
      description: 'Nắm vững 600 từ vựng TOEIC hay gặp nhất, mẹo tránh bẫy Listening Part 1, 2 & bứt phá Reading Part 5.',
      category: 'TOEIC',
      targetScore: 'Target 500 - 650+',
      levelBadge: 'Sơ cấp (A2-B1)',
      lessonsCount: 40,
      duration: '28 giờ học',
      studentsCount: '3,120',
      rating: 4.9,
      price: '390.000đ',
      originalPrice: '790.000đ',
      discount: '-50%',
      badgeText: 'PHỔ BIẾN',
      gradient: 'from-emerald-600 to-teal-800'
    },
    {
      id: 'course-toeic-2',
      title: 'Khóa học TOEIC Chinh phục 750+ (Listening & Reading)',
      description: 'Phương pháp nghe chép chính tả TOEIC Part 3, 4, kỹ năng quét nhanh ý chính Part 7 & giải đề thực chiến.',
      category: 'TOEIC',
      targetScore: 'Target 750 - 900+',
      levelBadge: 'Nâng cao (B2)',
      lessonsCount: 60,
      duration: '45 giờ học',
      studentsCount: '1,950',
      rating: 4.92,
      price: '690.000đ',
      originalPrice: '1.290.000đ',
      discount: '-46%',
      badgeText: 'CHUYÊN SÂU',
      gradient: 'from-teal-700 to-cyan-900'
    },

    // ─── GIAO TIẾP COURSES ──────────────────────────────────
    {
      id: 'course-daily-1',
      title: 'Khóa học Tiếng Anh Giao Tiếp Thực Tế (Everyday English)',
      description: 'Luyện phản xạ nghe nói tự nhiên theo 50 tình huống đời sống: Du lịch, mua sắm, nhà hàng, kết bạn.',
      category: 'GIAO TIẾP',
      targetScore: 'Giao tiếp tự tin',
      levelBadge: 'Căn bản (A2)',
      lessonsCount: 42,
      duration: '30 giờ học',
      studentsCount: '4,200',
      rating: 4.96,
      price: '290.000đ',
      originalPrice: '590.000đ',
      discount: '-50%',
      badgeText: 'ĐỀ XUẤT',
      gradient: 'from-amber-600 to-orange-700'
    },
    {
      id: 'course-daily-2',
      title: 'Khóa học Chuẩn hóa Phát âm IPA & Phản xạ Shadowing',
      description: 'Sửa triệt để lỗi nối âm, nuốt âm, trọng âm từ và ngữ điệu tự nhiên chuẩn giọng Anh - Mỹ.',
      category: 'GIAO TIẾP',
      targetScore: 'Phát âm chuẩn Mỹ',
      levelBadge: 'Mọi trình độ',
      lessonsCount: 30,
      duration: '20 giờ học',
      studentsCount: '2,780',
      rating: 4.91,
      price: '190.000đ',
      originalPrice: '390.000đ',
      discount: '-50%',
      badgeText: 'NỀN TẢNG',
      gradient: 'from-sky-600 to-blue-800'
    },

    // ─── CÔNG SỞ COURSES ─────────────────────────────────────
    {
      id: 'course-business-1',
      title: 'Khóa học Tiếng Anh Công Sở & Phỏng vấn xin việc',
      description: 'Kỹ năng viết Email thương mại chuẩn mực, thuyết trình báo cáo & 50 câu hỏi phỏng vấn công ty đa quốc gia.',
      category: 'CÔNG SỞ',
      targetScore: 'Business Career',
      levelBadge: 'Trung cấp (B2)',
      lessonsCount: 35,
      duration: '25 giờ học',
      studentsCount: '1,150',
      rating: 4.87,
      price: '590.000đ',
      originalPrice: '1.190.000đ',
      discount: '-50%',
      badgeText: 'CÔNG SỞ',
      gradient: 'from-slate-700 to-slate-900'
    }
  ];

  // Filtered Course Catalog
  const filteredCatalog = useMemo(() => {
    return coursesCatalog.filter(course => {
      if (activeCategoryTab !== 'all' && course.category !== activeCategoryTab) {
        return false;
      }
      if (searchQuery.trim() && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && !course.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [activeCategoryTab, searchQuery]);

  const handleOpenPayment = (course) => {
    if (myCourses.some(c => c.id === course.id)) {
      navigate(`/course-learn/${course.id}`);
      return;
    }
    setSelectedCourseForPayment(course);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (course) => {
    if (!myCourses.some(c => c.id === course.id)) {
      setMyCourses(prev => [...prev, { ...course, progress: 0 }]);
      setToastMessage(`Thanh toán thành công! Đang chuyển đến phòng học Coursera...`);
      setTimeout(() => {
        setToastMessage(null);
        navigate(`/course-learn/${course.id}`);
      }, 1200);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4 pb-16 text-slate-900 dark:text-white">

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl animate-slide-in font-extrabold text-xs">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Course Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPlan={selectedCourseForPayment}
        onSuccess={handlePaymentSuccess}
      />

      {/* Page Header Title */}
      <div className="text-center py-2 space-y-1">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Quản Lý & Khám Phá Khóa Học Tiếng Anh
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          Theo dõi khóa học cá nhân và lựa chọn các khóa học lộ trình bài bản IELTS, TOEIC & Giao tiếp
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: KHÓA HỌC CỦA TÔI (MY COURSES)                                  */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Khóa học của tôi</span>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              {myCourses.length}
            </span>
          </h2>
        </div>

        {myCourses.length === 0 ? (
          /* EMPTY STATE BANNER WHEN USER HAS NO ENROLLED COURSES YET */
          <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <FolderOpen className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Chưa có khóa học nào
            </h3>
            <p className="text-xs font-semibold text-slate-400 max-w-md mx-auto leading-relaxed">
              Bạn chưa tham gia hoặc sở hữu khóa học nào. Hãy chọn mua khóa học IELTS, TOEIC hoặc Giao tiếp từ danh sách gợi ý bên dưới để tham gia bài học nhé!
            </p>
          </div>
        ) : (
          /* MY ENROLLED COURSES GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myCourses.map((course) => (
              <div 
                key={course.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-500/30 dark:border-indigo-500/40 p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-slate-900 dark:text-white leading-snug">
                    {course.title}
                  </h3>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      <span>Tiến độ học</span>
                      <span className="text-indigo-600 dark:text-indigo-400">0 / {course.lessonsCount} bài</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full w-[5%]" />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">
                    ⏱ {course.duration}
                  </span>
                  <button
                    onClick={() => navigate(`/course-learn/${course.id}`)}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30 active:scale-95"
                  >
                    <span>VÀO HỌC NGAY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: GỢI Ý KHÓA HỌC (SUGGESTED COURSES WITH PRICING & PAYMENT)      */}
      {/* ========================================================================= */}
      <div className="space-y-6 pt-2">
        
        {/* Section Header */}
        <div className="pb-2">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500 fill-amber-500/20" />
            <span>Gợi ý khóa học</span>
          </h2>
        </div>

        {/* Category Filter Pills (IELTS, TOEIC, Giao Tiếp, Công Sở) */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategoryTab('all')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition-all ${
              activeCategoryTab === 'all'
                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            TẤT CẢ KHÓA HỌC
          </button>
          <button
            onClick={() => setActiveCategoryTab('IELTS')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center gap-1.5 ${
              activeCategoryTab === 'IELTS'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            KHÓA HỌC IELTS
          </button>
          <button
            onClick={() => setActiveCategoryTab('TOEIC')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center gap-1.5 ${
              activeCategoryTab === 'TOEIC'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            KHÓA HỌC TOEIC
          </button>
          <button
            onClick={() => setActiveCategoryTab('GIAO TIẾP')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center gap-1.5 ${
              activeCategoryTab === 'GIAO TIẾP'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            TIẾNG ANH GIAO TIẾP
          </button>
          <button
            onClick={() => setActiveCategoryTab('CÔNG SỞ')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center gap-1.5 ${
              activeCategoryTab === 'CÔNG SỞ'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            TIẾNG ANH CÔNG SỞ
          </button>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCatalog.map((course) => (
            <div 
              key={course.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Course Top Gradient Header Banner */}
              <div className={`p-5 bg-gradient-to-r ${course.gradient} text-white space-y-3 relative overflow-hidden`}>
                <div className="flex items-center justify-between z-10 relative">
                  <span className="px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-md text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1 border border-white/20">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {course.category}
                  </span>

                  <span className="px-2.5 py-1 rounded-xl bg-white/30 backdrop-blur-md text-white font-black text-[10px] shadow-sm">
                    {course.badgeText}
                  </span>
                </div>

                {/* Target Score Tag */}
                <div className="z-10 relative pt-1">
                  <span className="inline-block px-3 py-1 rounded-xl bg-black/30 backdrop-blur-md text-amber-300 font-mono font-black text-xs border border-white/10">
                    🎯 {course.targetScore}
                  </span>
                </div>
              </div>

              {/* Course Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400">
                    <span>Trình độ: {course.levelBadge}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Course Meta Info & Price */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> {course.lessonsCount} bài học
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-500" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-500" /> {course.studentsCount} học viên
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-500 font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-current" /> {course.rating} / 5.0
                    </span>
                  </div>

                  {/* Price Row */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900 dark:text-white">{course.price}</span>
                      <span className="text-xs font-bold text-slate-400 line-through">{course.originalPrice}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-extrabold text-xs">
                      {course.discount}
                    </span>
                  </div>

                  {/* Buy / Study Action Button */}
                  <div className="flex gap-2">
                    {myCourses.some(c => c.id === course.id) ? (
                      <button
                        onClick={() => navigate(`/course-learn/${course.id}`)}
                        className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>ĐÃ SỞ HỮU (VÀO HỌC)</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate(`/course-learn/${course.id}`)}
                          className="px-3.5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-1 shrink-0 transition-all"
                          title="Học thử không cần mua"
                        >
                          <Play className="w-3.5 h-3.5 text-indigo-500 fill-current" />
                          <span>Học thử</span>
                        </button>

                        <button
                          onClick={() => handleOpenPayment(course)}
                          className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 transition-all active:scale-95"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>THANH TOÁN MUA</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
