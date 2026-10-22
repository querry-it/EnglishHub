import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Crown, Sparkles, ArrowRight, Search, Users, Filter, ChevronDown, ArrowLeft,
  GraduationCap, Clock, CheckCircle2, BookOpen, FolderOpen, Star, PlusCircle, Check, BookMarked, Play, Award, ShieldCheck, CreditCard, Tag,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PaymentModal from '../../components/PaymentModal';

export default function Courses() {
  const navigate = useNavigate();
  const { openProModal } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Giả lập fetch dữ liệu từ API
  useEffect(() => {
    const timer = setTimeout(() => {
      setMyCourses([
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
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Payment Modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState(null);

  // Filter States
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const coursesCatalog = [
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
      }
  ];

  const filteredCatalog = useMemo(() => {
    return coursesCatalog.filter(course => {
      if (activeCategoryTab !== 'all' && course.category !== activeCategoryTab) return false;
      if (searchQuery.trim() && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
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
      setToastMessage(`Thanh toán thành công!`);
      setTimeout(() => {
        setToastMessage(null);
        navigate(`/course-learn/${course.id}`);
      }, 1200);
    }
  };

  // Skeleton UI Component
  const CourseSkeleton = () => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs animate-pulse">
        <div className="h-32 bg-slate-200 dark:bg-slate-800"></div>
        <div className="p-5 space-y-4">
            <div className="space-y-2">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                <div className="h-4 bg-slate-50 dark:bg-slate-800/50 rounded w-full"></div>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-xl w-1/3"></div>
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/2"></div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4 pb-16 text-slate-900 dark:text-white">

      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl animate-slide-in font-extrabold text-xs">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPlan={selectedCourseForPayment}
        onSuccess={handlePaymentSuccess}
      />

      {/* Page Header */}
      <div className="text-center py-2 space-y-1">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
          Khám Phá Khóa Học
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          Nâng tầm kỹ năng Tiếng Anh với lộ trình bài bản.
        </p>
      </div>

      {/* SECTION 1: KHÓA HỌC CỦA TÔI */}
      <div className="space-y-4">
        <h2 className="text-xl font-black flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-indigo-600" />
          Khóa học của tôi
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => <CourseSkeleton key={i} />)}
          </div>
        ) : myCourses.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-xs font-bold text-slate-400">Bạn chưa tham gia khóa học nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myCourses.map((course) => (
              <div key={course.id} className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-500/30 p-5 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-extrabold text-[10px]">{course.category}</span>
                  <h3 className="font-black text-base leading-snug">{course.title}</h3>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[10px] font-extrabold text-slate-500">
                      <span>Tiến độ</span>
                      <span className="text-indigo-600">0/{course.lessonsCount} bài</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full w-[5%]" />
                    </div>
                  </div>
                </div>
                <button onClick={() => navigate(`/course-learn/${course.id}`)} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center gap-2">
                  VÀO HỌC NGAY <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: GỢI Ý KHÓA HỌC */}
      <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-black flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            Gợi ý khóa học mới
        </h2>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
            {['all', 'IELTS', 'TOEIC', 'GIAO TIẾP'].map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategoryTab(cat)}
                    className={`px-4 py-2 rounded-2xl font-black text-[10px] uppercase transition-all ${
                        activeCategoryTab === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-white dark:bg-slate-900 text-slate-500 border-2 border-slate-200 dark:border-slate-800'
                    }`}
                >
                    {cat === 'all' ? 'Tất cả' : cat}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [1, 2, 3].map(i => <CourseSkeleton key={i} />)
          ) : (
            filteredCatalog.map((course) => (
                <div key={course.id} className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden hover:border-indigo-500 transition-all flex flex-col">
                    <div className={`p-5 bg-gradient-to-r ${course.gradient} text-white`}>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-1 rounded-lg">{course.category}</span>
                        <h3 className="font-black text-lg mt-2">{course.title}</h3>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <p className="text-xs font-semibold text-slate-500 line-clamp-2">{course.description}</p>
                        <div className="pt-3 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-lg font-black">{course.price}</span>
                            <button onClick={() => handleOpenPayment(course)} className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-black text-[10px] uppercase">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
