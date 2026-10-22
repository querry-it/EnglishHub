import React, { useState, useEffect, useCallback } from 'react';
import {
  Search, Eye, Check, RefreshCw,
  BookOpen, Clock, Shield, Layers, Filter, Trash2, XCircle, CheckCircle2,
  ChevronRight, UserPlus
} from 'lucide-react';
import api from '../../api/axios';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  const [instructors, setInstructors] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchInstructors = useCallback(async () => {
    try {
      const response = await api.get('/admin/users', { params: { role: 'INSTRUCTOR' } });
      if (response.data.success) setInstructors(response.data.users);
    } catch (error) { console.error(error); }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/lessons/admin/all');
      if (response.data.success) setCourses(response.data.courses);
    } catch (error) {
      showToast('Không thể tải danh sách khóa học');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, [fetchCourses, fetchInstructors]);

  const handleAssignInstructor = async (instructorId) => {
    try {
      const response = await api.post('/admin/courses/change-instructor', {
        courseId: selectedCourse.id,
        newInstructorId: instructorId
      });
      if (response.data.success) {
        showToast(`Đã gán giảng viên thành công`);
        setShowAssignModal(false);
        // Cập nhật state cục bộ thay vì reload trang
        setCourses(prev => prev.map(c =>
          c.id === selectedCourse.id
            ? { ...c, instructor: instructors.find(i => i.id === instructorId) }
            : c
        ));
      }
    } catch (error) {
      showToast('Lỗi khi gán giảng viên');
    }
  };

  const handleDeleteCourse = async (id, title) => {
    if (!window.confirm(`Xóa khóa học: ${title}?`)) return;
    try {
      await api.delete(`/admin/courses/${id}`);
      setCourses(prev => prev.filter(c => c.id !== id));
      showToast('Đã xóa khóa học');
    } catch (error) { showToast('Lỗi khi xóa'); }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesLevel = levelFilter === 'ALL' || c.level === levelFilter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto w-full pb-20 animate-in fade-in duration-500">
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-[200] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-700 font-bold text-sm flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header - Compact */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            Quản Lý Khóa Học
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hệ thống nội dung đào tạo</p>
        </div>
        <button onClick={fetchCourses} className="p-3 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl hover:border-indigo-500 transition-all shadow-sm">
          <RefreshCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filter Bar - Modern & Slim */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border-2 border-slate-50 dark:border-slate-800 mb-8 flex flex-col lg:flex-row gap-2 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text" placeholder="Tìm tên khóa học..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-none text-sm font-bold focus:ring-2 ring-indigo-500/20 outline-none"
          />
        </div>
        <div className="flex gap-1 p-1 bg-slate-50 dark:bg-slate-800 rounded-xl w-full lg:w-auto overflow-x-auto no-scrollbar">
          {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'IELTS'].map(lvl => (
            <button
              key={lvl} onClick={() => setLevelFilter(lvl)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all whitespace-nowrap ${
                levelFilter === lvl ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Grid - Refined Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-48 bg-slate-100 dark:bg-slate-800/50 rounded-[2rem] animate-pulse" />)
        ) : filteredCourses.map(course => (
          <div key={course.id} className="group bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-[2rem] p-5 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full text-[9px] font-black uppercase">{course.level}</span>
            </div>

            <h3 className="font-black text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{course.title}</h3>

            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {course.modulesCount} Modules</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.lessonsCount} Bài học</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-[10px] font-black text-indigo-600">
                    {course.instructor?.fullName?.charAt(0) || '?'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 font-black uppercase leading-none">Giảng viên</span>
                    <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">
                      {course.instructor ? course.instructor.fullName : 'Chưa có'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedCourse(course); setShowAssignModal(true); }}
                  className="p-1.5 hover:bg-white dark:hover:bg-slate-900 rounded-lg transition-colors text-indigo-600 shadow-xs"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => { setSelectedCourse(course); setShowDetailModal(true); }}
                  className="flex-1 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all"
                >
                  Xem chi tiết
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id, course.title)}
                  className="p-2.5 border-2 border-slate-100 dark:border-slate-800 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Gán Giảng Viên */}
      {showAssignModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border border-slate-200 dark:border-slate-800 scale-in-center">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Gán Giảng Viên</h3>
              <button onClick={() => setShowAssignModal(false)}><XCircle className="w-6 h-6 text-slate-300 hover:text-rose-500 transition-colors" /></button>
            </div>
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {instructors.map(inst => (
                <button
                  key={inst.id} onClick={() => handleAssignInstructor(inst.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-transparent hover:border-indigo-500 hover:bg-indigo-50/30 transition-all text-left group bg-slate-50 dark:bg-slate-800"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">{inst.fullName.charAt(0)}</div>
                  <div className="flex-1">
                    <p className="font-black text-sm text-slate-800 dark:text-white">{inst.fullName}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{inst.email}</p>
                  </div>
                  {selectedCourse?.instructor?.id === inst.id && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Chi Tiết Khóa Học (Danh sách bài học) */}
      {showDetailModal && selectedCourse && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 scale-in-center max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-8 shrink-0">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedCourse.title}</h3>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">Trình độ {selectedCourse.level} • {selectedCourse.lessonsCount} bài học</p>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl"><XCircle className="w-6 h-6 text-slate-400" /></button>
            </div>

            <div className="overflow-y-auto pr-4 custom-scrollbar space-y-3">
              {selectedCourse.lessons?.map((lesson, idx) => (
                <div key={lesson.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 group hover:border-indigo-500/50 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm text-slate-800 dark:text-white truncate">{lesson.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lesson.duration || '00:00'} • {lesson.lessonType}</p>
                  </div>
                  <div className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                  </div>
                </div>
              ))}
              {(!selectedCourse.lessons || selectedCourse.lessons.length === 0) && (
                <div className="py-20 text-center space-y-2">
                  <Layers className="w-12 h-12 text-slate-200 mx-auto" />
                  <p className="text-slate-400 font-bold text-sm">Khóa học này chưa có bài học nào</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 shrink-0">
              <button onClick={() => setShowDetailModal(false)} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em]">Đóng cửa sổ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
