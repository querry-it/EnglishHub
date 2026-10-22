import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Eye, Check, RefreshCw, Plus,
  BookOpen, Clock, Shield, Layers, Filter, Trash2, XCircle, CheckCircle2,
  ChevronRight, UserPlus, Video, FileText, HelpCircle, Award, Sparkles,
  UploadCloud, DollarSign, Image, Tag, X, ChevronDown, ChevronUp, AlertCircle,
  FileSpreadsheet, ChevronLeft
} from 'lucide-react';
import api from '../../api/axios';
import { exportToCSV, exportToDOC } from '../../utils/exportUtils';
import { 
  getStoredCustomCourses, 
  saveCustomCourse, 
  deleteStoredCustomCourse,
  COURSERA_STYLE_COURSES 
} from '../../api/courseService';

const DEFAULT_INSTRUCTORS = [
  { id: 'inst-1', fullName: 'Nguyen Van An', email: 'nguyenvanan@englishhub.edu.vn', roleTitle: 'Giảng viên IELTS Lead' },
  { id: 'inst-2', fullName: 'Tran Thi Bich', email: 'tranthibich@englishhub.edu.vn', roleTitle: 'Giảng viên TOEIC Master' },
  { id: 'inst-3', fullName: 'Le Hoang Nam', email: 'lehoangnam@englishhub.edu.vn', roleTitle: 'Giảng viên Giao tiếp Quốc tế' },
  { id: 'inst-4', fullName: 'Dang Quoc Bao', email: 'dangquocbao@englishhub.edu.vn', roleTitle: 'Giảng viên Tiếng Anh Doanh Nghiệp' },
];

const PRESET_THUMBNAILS = [
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600',
];

export default function AdminCoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  const [instructors, setInstructors] = useState(DEFAULT_INSTRUCTORS);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchInstructors = useCallback(async () => {
    try {
      const response = await api.get('/admin/users', { params: { role: 'INSTRUCTOR' } });
      if (response.data.success && Array.isArray(response.data.users) && response.data.users.length > 0) {
        setInstructors(response.data.users);
      } else {
        setInstructors(DEFAULT_INSTRUCTORS);
      }
    } catch (error) {
      setInstructors(DEFAULT_INSTRUCTORS);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const customCourses = getStoredCustomCourses();
      const response = await api.get('/lessons/admin/all').catch(() => null);

      if (response && response.data && response.data.success && Array.isArray(response.data.courses)) {
        // Gộp custom courses với DB courses
        setCourses([...customCourses, ...response.data.courses]);
      } else {
        // Fallback kết hợp custom courses với COURSERA_STYLE_COURSES
        setCourses([...customCourses, ...COURSERA_STYLE_COURSES]);
      }
    } catch (error) {
      const customCourses = getStoredCustomCourses();
      setCourses([...customCourses, ...COURSERA_STYLE_COURSES]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, [fetchCourses, fetchInstructors]);

  // Đổi giảng viên phụ trách
  const handleAssignInstructor = async (instructorId) => {
    const selectedInst = instructors.find(i => i.id === instructorId) || DEFAULT_INSTRUCTORS.find(i => i.id === instructorId);
    if (!selectedInst || !selectedCourse) return;

    try {
      await api.post('/admin/courses/change-instructor', {
        courseId: selectedCourse.id,
        newInstructorId: instructorId
      }).catch(() => null);

      // Cập nhật state cục bộ
      setCourses(prev => prev.map(c => {
        if (c.id === selectedCourse.id) {
          return {
            ...c,
            instructor: {
              id: selectedInst.id,
              name: selectedInst.fullName || selectedInst.name,
              fullName: selectedInst.fullName || selectedInst.name,
              email: selectedInst.email,
              avatar: selectedInst.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
            }
          };
        }
        return c;
      }));

      // Nếu là custom course, cập nhật trong localStorage
      const customCourses = getStoredCustomCourses();
      const foundIdx = customCourses.findIndex(c => c.id === selectedCourse.id);
      if (foundIdx >= 0) {
        customCourses[foundIdx].instructor = {
          id: selectedInst.id,
          name: selectedInst.fullName || selectedInst.name,
          fullName: selectedInst.fullName || selectedInst.name,
          email: selectedInst.email
        };
        localStorage.setItem('englishhub_custom_courses', JSON.stringify(customCourses));
      }

      showToast(`Đã gán giảng viên ${selectedInst.fullName || selectedInst.name} thành công`);
      setShowAssignModal(false);
    } catch (error) {
      showToast('Lỗi khi gán giảng viên');
    }
  };

  // Xóa khóa học
  const handleDeleteCourse = async (id, title) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa khóa học: "${title}"?`)) return;
    try {
      await api.delete(`/admin/courses/${id}`).catch(() => null);
      deleteStoredCustomCourse(id);
      setCourses(prev => prev.filter(c => c.id !== id));
      showToast('Đã xóa khóa học thành công');
    } catch (error) {
      deleteStoredCustomCourse(id);
      setCourses(prev => prev.filter(c => c.id !== id));
      showToast('Đã xóa khóa học khỏi hệ thống');
    }
  };

  // Lọc khóa học
  const filteredCourses = courses.filter((c) => {
    const matchesLevel = levelFilter === 'ALL' || c.level === levelFilter;
    const matchesCategory = categoryFilter === 'ALL' || c.category === categoryFilter;
    const matchesSearch = c.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, levelFilter, categoryFilter]);

  // Thống kê khóa học
  const totalCourses = courses.length;
  const ieltsCourses = courses.filter(c => c.category === 'IELTS').length;
  const toeicCourses = courses.filter(c => c.category === 'TOEIC').length;
  const totalLessons = courses.reduce((sum, c) => 
    sum + (c.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || c.lessonsCount || 0), 0);

  // Phân trang
  const totalPages = Math.ceil(filteredCourses.length / pageSize) || 1;
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Xuất file CSV
  const handleExportCSV = () => {
    if (filteredCourses.length === 0) {
      showToast('⚠️ Không có khóa học nào để xuất file!');
      return;
    }
    const headers = ['Mã khóa học', 'Tên khóa học', 'Danh mục', 'Trình độ', 'Giảng viên', 'Học phí (VNĐ)', 'Số chương', 'Số bài học'];
    const rows = filteredCourses.map(c => [
      c.id,
      c.title,
      c.category,
      c.level,
      c.instructor?.name || c.instructor?.fullName || 'Chưa gán',
      c.price || 0,
      c.modules?.length || c.modulesCount || 0,
      c.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || c.lessonsCount || 0
    ]);
    exportToCSV({
      filename: 'danh_sach_khoa_hoc',
      headers,
      rows
    });
    showToast('Đã xuất file CSV khóa học thành công!');
  };

  // Xuất file Word (.DOC)
  const handleExportDOC = () => {
    if (filteredCourses.length === 0) {
      showToast('⚠️ Không có khóa học nào để xuất file!');
      return;
    }
    const headers = ['STT', 'Tên khóa học', 'Danh mục', 'Trình độ', 'Giảng viên', 'Học phí', 'Quy mô'];
    const rows = filteredCourses.map((c, idx) => [
      idx + 1,
      c.title,
      c.category,
      c.level,
      c.instructor?.name || c.instructor?.fullName || 'Chưa gán',
      `${(c.price || 0).toLocaleString('vi-VN')} đ`,
      `${c.modules?.length || c.modulesCount || 0} Chương / ${c.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || c.lessonsCount || 0} Bài`
    ]);
    exportToDOC({
      filename: 'bao_cao_khoa_hoc',
      title: 'BÁO CÁO THỐNG KÊ DANH MỤC KHÓA HỌC ENGLISSHHUB',
      subtitle: 'Báo cáo tổng hợp số liệu chương trình đào tạo & phân công chuyên môn',
      statsSummary: [
        { label: 'Tổng số khóa học', value: totalCourses },
        { label: 'Khóa học IELTS', value: ieltsCourses },
        { label: 'Khóa học TOEIC', value: toeicCourses },
        { label: 'Tổng số bài học', value: totalLessons }
      ],
      headers,
      rows
    });
    showToast('Đã xuất file Word (.doc) khóa học thành công!');
  };

  return (
    <div className="max-w-7xl mx-auto w-full pb-20 animate-in fade-in duration-500">
      
      {/* Toast thông báo */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-[200] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-700 font-bold text-sm flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* HEADER: TIÊU ĐỀ & NÚT ĐĂNG KHÓA HỌC MỚI                                */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            <span>Quản Lý & Đăng Khóa Học</span>
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
            Hệ thống quản lý giáo trình, phân công giảng viên & xuất bản khóa học mới
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Nút Xuất CSV */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-xs"
            title="Xuất bảng tính CSV các khóa học"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Xuất CSV</span>
          </button>

          {/* Nút Xuất Word .DOC */}
          <button
            onClick={handleExportDOC}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-xs"
            title="Xuất báo cáo khóa học định dạng Word (.doc)"
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Xuất Word (.DOC)</span>
          </button>

          {/* NÚT ĐĂNG KHÓA HỌC MỚI (CHUYỂN SANG TRANG BUILDER CHUYÊN NGHIỆP) */}
          <button
            onClick={() => navigate('/admin/courses/create')}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/25 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Đăng khóa học mới</span>
          </button>

          <button 
            onClick={fetchCourses} 
            className="p-2.5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:border-indigo-500 transition-all shadow-sm"
            title="Làm mới danh sách"
          >
            <RefreshCw className={`w-4 h-4 text-slate-600 dark:text-slate-300 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* STATS DASHBOARD CARDS                                                  */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Tổng khóa học</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{totalCourses}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Khóa học IELTS</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{ieltsCourses}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Khóa học TOEIC</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{toeicCourses}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Tổng số bài học</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{totalLessons}</p>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* FILTER BAR                                                             */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 mb-8 flex flex-col lg:flex-row gap-3 items-center shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text" 
            placeholder="Tìm theo tên khóa học..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-none text-sm font-bold focus:ring-2 ring-indigo-500/20 outline-none text-slate-900 dark:text-white"
          />
        </div>

        {/* Lọc Category */}
        <div className="flex gap-1 p-1 bg-slate-50 dark:bg-slate-800 rounded-xl overflow-x-auto no-scrollbar">
          {['ALL', 'IELTS', 'TOEIC', 'GIAO TIẾP', 'DOANH NGHIỆP'].map(cat => (
            <button
              key={cat} 
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black transition-all whitespace-nowrap ${
                categoryFilter === cat ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* GRID KHÓA HỌC                                                          */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800/50 rounded-[2rem] animate-pulse" />
          ))
        ) : paginatedCourses.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-bold text-sm">Không tìm thấy khóa học nào phù hợp bộ lọc.</p>
          </div>
        ) : paginatedCourses.map(course => {
          const instructorName = course.instructor?.fullName || course.instructor?.name || course.instructor || 'Chưa gán';

          return (
            <div key={course.id} className="group bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] p-5 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col justify-between">
              <div>
                {/* Thumbnail Preview */}
                {course.thumbnail && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white rounded-lg text-[9px] font-black uppercase">
                        {course.category || course.level}
                      </span>
                      {course.badge && (
                        <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-lg text-[9px] font-extrabold">
                          {course.badge}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <h3 className="font-black text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-indigo-500" /> {course.modulesCount || course.modules?.length || 0} Chương</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {course.lessonsCount || 0} Bài học</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                {/* Giảng viên phụ trách */}
                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-xs font-black text-indigo-600 shrink-0">
                      {instructorName.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] text-slate-400 font-bold uppercase leading-none">Chấm bài bởi</span>
                      <span className="text-xs font-black text-slate-700 dark:text-slate-200 truncate">
                        {instructorName}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedCourse(course); setShowAssignModal(true); }}
                    className="p-1.5 hover:bg-white dark:hover:bg-slate-900 rounded-lg transition-colors text-indigo-600 shadow-2xs shrink-0"
                    title="Gán lại giảng viên"
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>

                {/* Các nút hành động */}
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSelectedCourse(course); setShowDetailModal(true); }}
                    className="flex-1 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem giáo trình</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id, course.title)}
                    className="p-2.5 border-2 border-slate-100 dark:border-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all"
                    title="Xóa khóa học"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* THANH PHÂN TRANG (PAGINATION BAR) CHO KHÓA HỌC                         */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {filteredCourses.length > 0 && (
        <div className="mt-8 bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            <span>Hiển thị</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-600"
            >
              <option value={3}>3 khóa / trang</option>
              <option value={6}>6 khóa / trang</option>
              <option value={9}>9 khóa / trang</option>
              <option value={15}>15 khóa / trang</option>
            </select>
            <span>
              (Từ {Math.min((currentPage - 1) * pageSize + 1, filteredCourses.length)} - {Math.min(currentPage * pageSize, filteredCourses.length)} trên tổng {filteredCourses.length} khóa học)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
              title="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                      currentPage === page
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-1 text-slate-400 text-xs">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
              title="Trang sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}


      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* MODAL 2: GÁN GIẢNG VIÊN                                                */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {showAssignModal && selectedCourse && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border border-slate-200 dark:border-slate-800 scale-in-center">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Gán Giảng Viên Chấm Bài</h3>
                <p className="text-xs text-slate-400 font-semibold">{selectedCourse.title}</p>
              </div>
              <button onClick={() => setShowAssignModal(false)}>
                <XCircle className="w-6 h-6 text-slate-300 hover:text-rose-500 transition-colors" />
              </button>
            </div>

            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {instructors.map(inst => {
                const currentInstId = selectedCourse.instructor?.id || selectedCourse.instructorId;
                const isCurrent = currentInstId === inst.id;

                return (
                  <button
                    key={inst.id} 
                    onClick={() => handleAssignInstructor(inst.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group ${
                      isCurrent 
                        ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40' 
                        : 'border-transparent hover:border-indigo-500 hover:bg-indigo-50/20 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                      {(inst.fullName || inst.name)?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm text-slate-800 dark:text-white">{inst.fullName || inst.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{inst.email}</p>
                    </div>
                    {isCurrent && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* MODAL 3: XEM CHI TIẾT GIÁO TRÌNH KHÓA HỌC                              */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {showDetailModal && selectedCourse && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 scale-in-center max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                  {selectedCourse.title}
                </h3>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                  {selectedCourse.category} • {selectedCourse.modules?.length || selectedCourse.modulesCount || 0} Chương
                </p>
              </div>
              <button 
                onClick={() => setShowDetailModal(false)} 
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto pr-3 custom-scrollbar space-y-4">
              {selectedCourse.modules?.map((mod, mIdx) => (
                <div key={mod.id || mIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <h4 className="text-xs font-black text-indigo-600 uppercase">
                    {mod.title}
                  </h4>
                  <div className="space-y-1.5 pl-2">
                    {mod.lessons?.map((les, lIdx) => (
                      <div key={les.id || lIdx} className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 min-w-0">
                          {les.type === 'video' && <Video className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                          {les.type === 'reading' && <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                          {les.type === 'quiz' && <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                          {les.type === 'assignment' && <Award className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold shrink-0">{les.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {(!selectedCourse.modules || selectedCourse.modules.length === 0) && (
                <div className="py-16 text-center space-y-2">
                  <Layers className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-slate-400 font-bold text-sm">Chưa có bài học cụ thể cho khóa học này</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
              <button 
                onClick={() => setShowDetailModal(false)} 
                className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.15em]"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
