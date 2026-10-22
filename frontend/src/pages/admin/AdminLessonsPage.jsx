import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Edit2, Trash2, Video, Check,
  FileText, Play, ChevronRight, Layers,
  ExternalLink, Save, X, Sparkles, Loader2,
  FileSpreadsheet, ChevronLeft, AlertCircle, Headphones, Award
} from 'lucide-react';
import api from '../../api/axios';
import { exportToCSV, exportToDOC } from '../../utils/exportUtils';

export default function AdminLessonsPage() {
  const [courses, setCourses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rawTranscript, setRawTranscript] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State & Errors
  const [formData, setFormData] = useState({
    title: '',
    level: 'B1',
    lessonType: 'Dictation',
    videoUrl: '',
    transcript: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); // 3 nhóm trình độ / trang

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Quản lý việc mở/đóng các folder trình độ - Mặc định đóng hết
  const [expandedLevels, setExpandedLevels] = useState([]);

  const toggleLevel = (level) => {
    setExpandedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const getThumbnail = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=500&q=80';

    // Trích xuất ID từ link YouTube hoặc dùng trực tiếp nếu đã là ID
    const extractId = (link) => {
      if (!link) return '';
      if (link.length === 11 && !link.includes('/') && !link.includes('.')) return link;
      try {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const match = link.match(regex);
        return match ? match[1] : link;
      } catch (e) {
        return link;
      }
    };

    const videoId = extractId(url);
    // Sử dụng i.ytimg.com (ổn định hơn) và hqdefault (chất lượng cao)
    return videoId && videoId.length === 11
      ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      : 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=500&q=80';
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=500&q=80';
    e.target.onerror = null; // Ngăn lặp vô hạn
  };

  const fetchLessons = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/lessons/admin/all');
      if (response.data.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách:', error);
      showToast("Không thể tải danh sách bài học");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ title: '', level: 'B1', lessonType: 'Dictation', videoUrl: '', transcript: '' });
    setFormErrors({});
    setRawTranscript([]);
    setIsEditing(false);
    setCurrentEditId(null);
    setShowAddModal(true);
  };

  const handleEditLesson = async (id) => {
    setIsLoading(true);
    setFormErrors({});
    try {
      const response = await api.get(`/lessons/${id}`);
      if (response.data.success) {
        const { lesson } = response.data;
        let transcriptText = "";
        let parsedTranscript = [];

        try {
          parsedTranscript = typeof lesson.transcript === 'string'
            ? JSON.parse(lesson.transcript)
            : lesson.transcript;

          if (Array.isArray(parsedTranscript)) {
            transcriptText = parsedTranscript.map(t => t.text).join('\n');
            setRawTranscript(parsedTranscript);
          } else {
            transcriptText = lesson.transcript;
          }
        } catch (e) {
          transcriptText = lesson.transcript;
        }

        setFormData({
          title: lesson.title,
          level: lesson.level || 'B1',
          lessonType: lesson.lessonType === 'SPEAKING' ? 'Shadowing' : 'Dictation',
          videoUrl: lesson.videoUrl,
          transcript: transcriptText
        });

        setCurrentEditId(id);
        setIsEditing(true);
        setShowAddModal(true);
      }
    } catch (error) {
      console.error("Fetch detail error:", error);
      showToast("Không thể tải chi tiết bài học");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExtractSubtitles = async () => {
    if (!formData.videoUrl) return showToast("Vui lòng nhập Link YouTube");
    setIsLoading(true);
    try {
      const response = await api.post('/lessons/extract-transcript', { videoUrl: formData.videoUrl });
      if (response.data.success) {
        const data = response.data.transcript;
        setRawTranscript(data);
        // Hiển thị dạng text thô để user chỉnh sửa dễ dàng
        setFormData({ ...formData, transcript: data.map(t => t.text).join('\n') });
        if (formErrors.transcript) setFormErrors({ ...formErrors, transcript: null });
        showToast("Trích xuất thành công!");
      }
    } catch (error) {
      showToast("Video không có phụ đề hoặc bị chặn.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLesson = async () => {
    const errs = {};
    if (!formData.title?.trim()) {
      errs.title = 'Vui lòng nhập tiêu đề bài học';
    }
    if (!formData.videoUrl?.trim()) {
      errs.videoUrl = 'Vui lòng nhập đường dẫn hoặc ID video YouTube';
    }
    if (!formData.transcript?.trim()) {
      errs.transcript = 'Vui lòng nhập nội dung transcript hoặc bấm Trích xuất từ YouTube';
    }

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      showToast('⚠️ Vui lòng nhập đầy đủ các ô nhập liệu bắt buộc!');
      return;
    }

    setFormErrors({});
    setIsLoading(true);
    try {
      let finalTranscript = formData.transcript || '';
      const lines = (formData.transcript || '').split('\n').filter(l => l.trim());

      // Nếu có dữ liệu gốc từ YouTube, map lại timestamp
      if (rawTranscript.length > 0 && lines.length === rawTranscript.length) {
        const merged = rawTranscript.map((item, index) => ({
          ...item,
          text: lines[index].trim()
        }));
        finalTranscript = JSON.stringify(merged);
      }

      if (isEditing && currentEditId) {
        await api.put(`/lessons/${currentEditId}`, {
          ...formData,
          transcript: finalTranscript,
        });
        showToast("Đã cập nhật bài học!");
      } else {
        await api.post('/lessons', {
          ...formData,
          transcript: finalTranscript,
        });
        showToast("Đã lưu bài học!");
      }

      setShowAddModal(false);
      fetchLessons();
    } catch (error) {
      console.error("Save error:", error);
      showToast(error.response?.data?.message || "Lỗi khi lưu bài học.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLesson = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài học này?")) return;
    try {
      await api.delete(`/lessons/${id}`);
      showToast("Đã xóa bài học");
      fetchLessons();
    } catch (error) {
      showToast("Lỗi khi xóa bài học");
    }
  };

  // Tính toán số liệu thống kê
  const allLessons = courses.flatMap(c => (c.lessons || []).map(l => ({ ...l, level: c.level, courseTitle: c.title })));
  const totalLessonsCount = allLessons.length;
  const shadowingCount = allLessons.filter(l => l.lessonType === 'SPEAKING' || l.lessonType === 'Shadowing').length;
  const dictationCount = allLessons.filter(l => l.lessonType === 'LISTENING' || l.lessonType === 'Dictation' || !l.lessonType).length;
  const levelsCount = courses.length;

  // Lọc danh sách bài học & cấp độ
  const filteredCourses = courses.filter(c => {
    const matchesLevel = levelFilter === 'ALL' || c.level === levelFilter;
    const matchesSearch = !searchQuery.trim() || 
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.lessons?.some(l => l.title?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, levelFilter]);

  // Phân trang
  const totalPages = Math.ceil(filteredCourses.length / pageSize) || 1;
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Xuất file CSV
  const handleExportCSV = () => {
    if (allLessons.length === 0) {
      showToast('⚠️ Chưa có bài học nào để xuất file!');
      return;
    }
    const headers = ['Mã bài học', 'Tiêu đề bài học', 'Trình độ', 'Loại bài tập', 'Video ID / URL', 'Nhóm chuyên đề'];
    const rows = allLessons.map(l => [
      l.id,
      l.title,
      l.level,
      l.lessonType === 'SPEAKING' ? 'Shadowing' : 'Dictation',
      l.videoUrl,
      l.courseTitle
    ]);
    exportToCSV({
      filename: 'danh_sach_bai_hoc',
      headers,
      rows
    });
    showToast('Đã xuất file CSV bài học thành công!');
  };

  // Xuất file Word (.DOC)
  const handleExportDOC = () => {
    if (allLessons.length === 0) {
      showToast('⚠️ Chưa có bài học nào để xuất file!');
      return;
    }
    const headers = ['STT', 'Tiêu đề bài học', 'Trình độ', 'Phân loại', 'Video URL', 'Chuyên đề'];
    const rows = allLessons.map((l, idx) => [
      idx + 1,
      l.title,
      l.level,
      l.lessonType === 'SPEAKING' ? 'Shadowing' : 'Dictation',
      l.videoUrl,
      l.courseTitle
    ]);
    exportToDOC({
      filename: 'bao_cao_bai_hoc',
      title: 'BÁO CÁO THỐNG KÊ KHO BÀI HỌC VÀ BÀI TẬP ENGLISSHHUB',
      subtitle: 'Thống kê kho bài giảng Dictation & Shadowing theo từng cấp độ khung CEFR',
      statsSummary: [
        { label: 'Tổng số bài học', value: totalLessonsCount },
        { label: 'Bài tập Shadowing', value: shadowingCount },
        { label: 'Bài tập Dictation', value: dictationCount },
        { label: 'Số lượng cấp độ', value: levelsCount }
      ],
      headers,
      rows
    });
    showToast('Đã xuất file Word (.doc) bài học thành công!');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[200] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 font-bold text-xs flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Video className="w-6 h-6 text-indigo-600" />
            <span>Kho Bài Học & Luyện Tập</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mt-0.5">
            Quản lý nội dung bài tập Dictation, Shadowing & Phụ đề thông minh theo cấp độ.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Nút Xuất CSV */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-xs"
            title="Xuất bảng tính CSV toàn bộ bài học"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Xuất CSV</span>
          </button>

          {/* Nút Xuất Word .DOC */}
          <button
            onClick={handleExportDOC}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-xs"
            title="Xuất báo cáo bài học định dạng Word (.doc)"
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Xuất Word (.DOC)</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-black text-xs uppercase shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Soạn bài mới</span>
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Tổng số bài học</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{totalLessonsCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Bài Shadowing</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{shadowingCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Bài Dictation</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{dictationCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Số nhóm cấp độ</p>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{levelsCount}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl border-2 border-slate-100 dark:border-slate-800 flex flex-wrap gap-3 items-center shadow-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề bài học hoặc chuyên đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xs font-bold outline-none text-slate-900 dark:text-white focus:border-indigo-500"
          />
        </div>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xs font-bold px-4 py-2 outline-none text-slate-700 dark:text-slate-200 focus:border-indigo-500"
        >
          <option value="ALL">Tất cả trình độ</option>
          {['A1', 'A2', 'B1', 'B2', 'C1', 'IELTS'].map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Course List - Phân theo Trình độ */}
      <div className="space-y-6">
        {isLoading && courses.length === 0 ? (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="h-16 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl w-full"></div>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 pl-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : paginatedCourses.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200">
            <Video className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 font-bold text-sm">Không tìm thấy bài học nào phù hợp yêu cầu.</p>
          </div>
        ) : (
          paginatedCourses.map(courseGroup => (
            <div key={courseGroup.id} className="space-y-4">
              {/* Level Header (Accordion Toggle) */}
              <button
                onClick={() => toggleLevel(courseGroup.level)}
                className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:border-indigo-400 transition-all shadow-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-200 dark:shadow-none">
                    {courseGroup.level}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-base text-left">{courseGroup.title}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{courseGroup.lessonsCount} bài học đã sẵn sàng</p>
                  </div>
                </div>
                <ChevronRight className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${expandedLevels.includes(courseGroup.level) ? 'rotate-90' : ''}`} />
              </button>

              {/* Lessons Grid (Show if expanded) */}
              {expandedLevels.includes(courseGroup.level) && (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 pl-4 border-l-2 border-slate-100 dark:border-slate-800 ml-5 animate-in slide-in-from-top-2 duration-300">
                  {courseGroup.lessons.map(lesson => (
                    <div key={lesson.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden group hover:border-indigo-500 transition-all flex flex-col shadow-2xs">
                      {/* Video Preview / Thumbnail */}
                      <div className="relative aspect-video overflow-hidden bg-slate-100">
                        <img
                          src={getThumbnail(lesson.videoUrl)}
                          alt={lesson.title}
                          onError={handleImageError}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <a
                            href={`https://youtube.com/watch?v=${lesson.videoUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                          >
                            <Play className="w-3 h-3 fill-current" />
                          </a>
                        </div>
                        <div className="absolute top-1 right-1 bg-slate-900/80 backdrop-blur-md text-[6px] font-black text-white px-1 py-0.5 rounded-sm uppercase">
                          {lesson.lessonType === 'SPEAKING' ? 'SH' : 'DI'}
                        </div>
                      </div>

                      {/* Lesson Content */}
                      <div className="p-1.5 flex-1 flex flex-col justify-between">
                        <h4 className="font-bold text-slate-900 dark:text-white text-[10px] line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors leading-tight h-6">
                          {lesson.title}
                        </h4>

                        <div className="flex items-center justify-between mt-auto pt-1 border-t border-slate-50 dark:border-slate-800">
                          <div className="flex items-center gap-0.5">
                             <button
                              onClick={() => handleEditLesson(lesson.id)}
                              className="p-1 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded text-indigo-600 transition-colors"
                              title="Chỉnh sửa bài học"
                            >
                              <Edit2 className="w-2.5 h-2.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLesson(lesson.id)}
                              className="p-1 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded text-rose-500 transition-colors"
                              title="Xóa bài học"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <span className="text-[7px] font-black text-slate-300 uppercase">Detail</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Quick Button in Grid */}
                  <button
                    onClick={handleOpenAdd}
                    className="border border-dashed border-slate-300 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-indigo-300 transition-all text-slate-400 hover:text-indigo-500 min-h-[80px]"
                  >
                    <Plus className="w-4 h-4 mb-0.5" />
                    <span className="text-[7px] font-black uppercase">Mới</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination Bar */}
      {filteredCourses.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
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
              <option value={2}>2 nhóm / trang</option>
              <option value={3}>3 nhóm / trang</option>
              <option value={5}>5 nhóm / trang</option>
              <option value={10}>10 nhóm / trang</option>
            </select>
            <span>
              (Từ {Math.min((currentPage - 1) * pageSize + 1, filteredCourses.length)} - {Math.min(currentPage * pageSize, filteredCourses.length)} trên tổng {filteredCourses.length} nhóm cấp độ)
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}

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

      {/* Modal soạn bài mới */}
      {showAddModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-500" />
                {isEditing ? 'Cập nhật bài học' : 'Soạn bài học mới'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: Info */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                      Tiêu đề bài học <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl font-bold text-sm transition-all outline-none ${
                        formErrors.title ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-100 dark:border-slate-700 focus:border-indigo-500'
                      }`}
                      placeholder="Ví dụ: IELTS Listening Practice #1"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({...formData, title: e.target.value});
                        if (formErrors.title) setFormErrors({...formErrors, title: null});
                      }}
                    />
                    {formErrors.title && (
                      <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                      YouTube Link hoặc Video ID <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
                        <input
                          type="text"
                          className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl font-bold text-sm transition-all outline-none ${
                            formErrors.videoUrl ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-100 dark:border-slate-700 focus:border-indigo-500'
                          }`}
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={formData.videoUrl}
                          onChange={(e) => {
                            setFormData({...formData, videoUrl: e.target.value});
                            if (formErrors.videoUrl) setFormErrors({...formErrors, videoUrl: null});
                          }}
                        />
                      </div>
                      <button
                        onClick={handleExtractSubtitles}
                        disabled={isLoading}
                        className="px-6 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl text-xs font-black uppercase hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        {isLoading ? 'Đang lấy...' : 'Trích xuất'}
                      </button>
                    </div>
                    {formErrors.videoUrl && (
                      <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.videoUrl}
                      </p>
                    )}
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-100 dark:border-slate-800 relative group">
                    {formData.videoUrl ? (
                      <img
                        src={getThumbnail(formData.videoUrl)}
                        alt="Preview"
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <Video className="w-8 h-8 mb-2 opacity-20" />
                        <span className="text-[10px] font-black uppercase opacity-40">Chưa có video preview</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-[10px] font-black uppercase tracking-widest">Video Thumbnail Preview</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Trình độ</label>
                      <select
                        className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-bold text-sm focus:border-indigo-500 outline-none"
                        value={formData.level}
                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                      >
                        {['A1', 'A2', 'B1', 'B2', 'C1', 'IELTS'].map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Loại bài học</label>
                      <select
                        className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-bold text-sm focus:border-indigo-500 outline-none"
                        value={formData.lessonType}
                        onChange={(e) => setFormData({...formData, lessonType: e.target.value})}
                      >
                        <option value="Dictation">Dictation</option>
                        <option value="Shadowing">Shadowing</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right Side: Transcript Editor */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2 ml-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Nội dung Transcript <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded-lg">
                      {(formData.transcript || '').split('\n').filter(l => l.trim()).length} dòng
                    </span>
                  </div>
                  <textarea
                    className={`flex-1 min-h-[300px] w-full p-6 bg-slate-900 text-emerald-400 font-mono text-xs rounded-[1.5rem] border-2 outline-none resize-none leading-relaxed transition-all ${
                      formErrors.transcript ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-800 focus:border-indigo-500'
                    }`}
                    placeholder="Mỗi câu một dòng..."
                    value={formData.transcript}
                    onChange={(e) => {
                      setFormData({...formData, transcript: e.target.value});
                      if (formErrors.transcript) setFormErrors({...formErrors, transcript: null});
                    }}
                  />
                  {formErrors.transcript ? (
                    <p className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.transcript}
                    </p>
                  ) : (
                    <p className="mt-3 text-[10px] text-slate-500 font-bold italic flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-500" />
                      Hệ thống sẽ tự động khớp Timestamp nếu số dòng không thay đổi sau khi trích xuất.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-8 py-3 text-xs font-black text-slate-500 uppercase hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSaveLesson}
                disabled={isLoading}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl font-black text-xs uppercase shadow-xl shadow-indigo-200 dark:shadow-none transition-all"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Lưu bài học
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

