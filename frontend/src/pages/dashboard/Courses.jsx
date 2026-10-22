import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Search, Users, Filter, ChevronRight,
  GraduationCap, Clock, CheckCircle2, BookOpen, FolderOpen, Star, 
  Award, ShieldCheck, Tag, Loader2, PlayCircle, BookMarked,
  Info, ExternalLink, Check, Calendar, Laptop
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PaymentModal from '../../components/PaymentModal';
import { fetchCoursesCatalogAPI, COURSERA_STYLE_COURSES } from '../../api/courseService';

export default function Courses() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  // Modal xem chi tiết khóa học kiểu Coursera (Course Syllabus Modal)
  const [detailCourse, setDetailCourse] = useState(null);

  // Payment Modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Móc API về trực tiếp khi load trang
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const catalog = await fetchCoursesCatalogAPI();
        if (isMounted) {
          setCourses(catalog);
          // Lọc ra các khóa học đã ghi danh (enrolled)
          const enrolledList = catalog.filter((c) => c.enrolled);
          setMyCourses(enrolledList.length > 0 ? enrolledList : [catalog[0]]);
        }
      } catch (err) {
        console.error('Lỗi tải danh mục khóa học:', err);
        if (isMounted) {
          setCourses(COURSERA_STYLE_COURSES);
          setMyCourses([COURSERA_STYLE_COURSES[0]]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { key: 'ALL', label: 'Tất cả chương trình' },
    { key: 'IELTS', label: 'IELTS Academic & Foundation' },
    { key: 'TOEIC', label: 'TOEIC 750+ Comprehensive' },
    { key: 'GIAO TIẾP', label: 'Tiếng Anh Giao Tiếp' },
    { key: 'DOANH NGHIỆP', label: 'Tiếng Anh Doanh Nghiệp' },
  ];

  // Lọc khóa học theo Category và Search
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchCat = activeCategoryTab === 'ALL' || c.category === activeCategoryTab;
      const matchSearch =
        !searchQuery.trim() ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skillsGained?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [courses, activeCategoryTab, searchQuery]);

  const handleOpenPayment = (course) => {
    if (myCourses.some((c) => c.id === course.id)) {
      navigate(`/course-learn/${course.id}`);
      return;
    }
    setSelectedCourseForPayment({
      ...course,
      price: `${course.price.toLocaleString('vi-VN')}đ`,
      originalPrice: `${course.originalPrice.toLocaleString('vi-VN')}đ`,
    });
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (course) => {
    setMyCourses((prev) => {
      if (prev.some((c) => c.id === course.id)) return prev;
      return [...prev, { ...course, enrolled: true, progress: 0 }];
    });
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, enrolled: true } : c))
    );
    showToast(`Đăng ký khóa học thành công! Chào mừng bạn đến với lớp học.`);
    setTimeout(() => {
      navigate(`/course-learn/${course.id}`);
    }, 1200);
  };

  // Coursera Skeleton Card
  const CourseSkeleton = () => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs animate-pulse flex flex-col justify-between">
      <div className="h-44 bg-slate-200 dark:bg-slate-800"></div>
      <div className="p-5 space-y-3">
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/3"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
          <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-1/4"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen pb-20 space-y-10">

      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl animate-fade-in font-extrabold text-xs">
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

      {/* ================= COURSERA HERO BANNER ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0056D2] via-[#00419e] to-[#0b2545] text-white p-8 sm:p-12 shadow-xl border-2 border-blue-900/40">
        {/* Subtle geometric background shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-sky-400/10 blur-xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-sky-200 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Coursera Learning Architecture · EnglishHub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Học tập không giới hạn. Bứt phá mọi mục tiêu tiếng Anh.
          </h1>

          <p className="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
            Tiếp cận các chương trình đào tạo chứng chỉ quốc tế và chuyên sâu về <strong>IELTS Academic</strong>, <strong>TOEIC ETS</strong> và <strong>Giao tiếp thực tế</strong> được thiết kế bởi các chuyên gia hàng đầu.
          </p>

          {/* Coursera-style search bar inside Hero */}
          <div className="pt-2 max-w-xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Bạn muốn học gì? (Tìm khóa học, kỹ năng, IELTS, TOEIC...)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-bold text-xs shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Xóa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 1: KHÓA HỌC CỦA TÔI ĐANG HỌC (IN-PROGRESS COURSERA STYLE) ================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <BookMarked className="w-6 h-6 text-[#0056D2] dark:text-sky-400" />
              <span>Khóa học của tôi</span>
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Tiếp tục bài học gần nhất để giữ vững tiến độ mỗi ngày.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <CourseSkeleton key={i} />
            ))}
          </div>
        ) : myCourses.length === 0 ? (
          <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-xs font-bold text-slate-500">
              Bạn chưa đăng ký khóa học nào. Khám phá danh mục bên dưới để bắt đầu lộ trình!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((c) => (
              <div
                key={c.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-500/20 hover:border-[#0056D2] transition-all shadow-xs hover:shadow-lg flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative h-36 overflow-hidden bg-slate-100">
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#0056D2] text-white text-[10px] font-black uppercase tracking-wider">
                      Đang học
                    </span>
                    <span className="absolute bottom-2.5 left-3 text-xs font-black text-white line-clamp-1">
                      {c.provider}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug">
                      {c.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-500">
                        <span>Tiến độ chương trình</span>
                        <span className="text-[#0056D2] font-black">25%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0056D2] h-full w-[25%] rounded-full transition-all"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => navigate(`/course-learn/${c.id}`)}
                    className="w-full py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>TIẾP TỤC HỌC</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= SECTION 2: COURSERA COURSE CATALOG ================= */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span>Tất cả chương trình đào tạo & chứng chỉ</span>
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Chọn chương trình phù hợp với mục tiêu chứng chỉ hoặc phản xạ ngôn ngữ của bạn.
            </p>
          </div>

          <span className="text-xs font-bold text-slate-400">
            Hiển thị {filteredCourses.length} khóa học
          </span>
        </div>

        {/* Coursera-style Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategoryTab(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border-2 ${
                activeCategoryTab === cat.key
                  ? 'bg-[#0056D2] border-[#0056D2] text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Coursera Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => <CourseSkeleton key={i} />)
          ) : filteredCourses.length === 0 ? (
            <div className="col-span-full py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <Info className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-400">
                Không tìm thấy khóa học nào phù hợp với từ khóa "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategoryTab('ALL');
                }}
                className="text-xs font-black text-[#0056D2] hover:underline"
              >
                Xóa bộ lọc tìm kiếm
              </button>
            </div>
          ) : (
            filteredCourses.map((course) => {
              const isEnrolled = myCourses.some((c) => c.id === course.id);

              return (
                <div
                  key={course.id}
                  className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Course Card Thumbnail & Badge */}
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Provider info overlay on top */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase flex items-center gap-1 shadow-xs">
                          <span>{course.providerLogo}</span>
                          <span className="truncate max-w-[170px]">{course.provider}</span>
                        </span>

                        <span className="px-2 py-0.5 rounded-md bg-[#0056D2] text-white text-[9px] font-black uppercase tracking-wider shrink-0 shadow-xs">
                          {course.badge || course.type}
                        </span>
                      </div>

                      {/* Coursera Program Type */}
                      <div className="absolute bottom-3 left-3 text-white space-y-0.5">
                        <span className="text-[10px] font-black tracking-wider uppercase text-sky-300 block">
                          {course.type}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3">
                      {/* Course Title */}
                      <h3 className="font-black text-base text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#0056D2] transition-colors">
                        {course.title}
                      </h3>

                      {/* Instructor Row */}
                      <div className="flex items-center gap-2 pt-0.5">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200"
                        />
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate">
                          {course.instructor.name} · <span className="text-slate-400 text-[11px] font-medium">{course.instructor.title}</span>
                        </span>
                      </div>

                      {/* Skills You'll Gain (Coursera Signature Feature) */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Kỹ năng bạn sẽ đạt được:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {course.skillsGained.slice(0, 4).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 text-[#0056D2] dark:text-sky-300 text-[10px] font-black border border-sky-100 dark:border-sky-900"
                            >
                              {skill}
                            </span>
                          ))}
                          {course.skillsGained.length > 4 && (
                            <span className="text-[10px] font-bold text-slate-400 self-center">
                              +{course.skillsGained.length - 4} nữa
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Rating & Stats */}
                      <div className="flex items-center gap-2 text-xs pt-1">
                        <span className="flex items-center gap-1 font-black text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{course.rating}</span>
                        </span>
                        <span className="text-slate-400 font-semibold text-[11px]">
                          ({course.reviewsCount} đánh giá)
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-slate-500 text-[11px] font-semibold">
                          {course.studentsCount.toLocaleString('vi-VN')} học viên
                        </span>
                      </div>

                      {/* Metadata: Level & Duration */}
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> {course.level}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA & Pricing */}
                  <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2">
                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                          {course.price.toLocaleString('vi-VN')}đ
                        </div>
                        <div className="text-[10px] text-slate-400 line-through font-semibold">
                          {course.originalPrice.toLocaleString('vi-VN')}đ
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDetailCourse(course)}
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-600 dark:text-slate-300 text-xs font-bold"
                          title="Xem thông tin chi tiết khóa học"
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenPayment(course)}
                          className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                            isEnrolled
                              ? 'bg-[#0056D2] hover:bg-[#00419e] text-white'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          <span>{isEnrolled ? 'VÀO HỌC' : 'ĐĂNG KÝ'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ================= MODAL: COURSERA COURSE SYLLABUS DETAIL ================= */}
      {detailCourse && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto custom-scrollbar p-6 sm:p-8 shadow-2xl border-2 border-slate-200 dark:border-slate-800 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-[#0056D2] font-black text-[10px] uppercase">
                  {detailCourse.provider} · {detailCourse.type}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {detailCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setDetailCourse(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold flex items-center justify-center hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Description & Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-slate-400">Giới thiệu chương trình</h4>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {detailCourse.description}
              </p>
            </div>

            {/* Program Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center space-y-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase">Cấp độ</span>
                <p className="text-xs font-black text-slate-800 dark:text-slate-200">{detailCourse.level}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center space-y-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase">Thời lượng</span>
                <p className="text-xs font-black text-slate-800 dark:text-slate-200">{detailCourse.duration}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center space-y-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase">Bài học</span>
                <p className="text-xs font-black text-slate-800 dark:text-slate-200">{detailCourse.lessonsCount} bài</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center space-y-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase">Đánh giá</span>
                <p className="text-xs font-black text-amber-500">⭐ {detailCourse.rating}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-slate-400">Kỹ năng đầu ra:</h4>
              <div className="flex flex-wrap gap-2">
                {detailCourse.skillsGained.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#0056D2] dark:text-sky-300 font-extrabold text-xs border border-sky-200 dark:border-sky-800 flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-[#0056D2]" />
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <img
                src={detailCourse.instructor.avatar}
                alt={detailCourse.instructor.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
              />
              <div>
                <h5 className="font-black text-sm text-slate-900 dark:text-white">
                  {detailCourse.instructor.name}
                </h5>
                <p className="text-xs font-medium text-slate-500">{detailCourse.instructor.title}</p>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Học phí trọn gói:</span>
                <span className="text-xl font-black text-[#0056D2] font-mono">
                  {detailCourse.price.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDetailCourse(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-xs"
                >
                  Đóng
                </button>

                <button
                  onClick={() => {
                    setDetailCourse(null);
                    handleOpenPayment(detailCourse);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-black text-xs uppercase tracking-wider shadow-md"
                >
                  {myCourses.some((c) => c.id === detailCourse.id) ? 'VÀO HỌC NGAY' : 'ĐĂNG KÝ HỌC'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
