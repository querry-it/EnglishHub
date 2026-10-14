import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Edit2, Trash2, Video, Check,
  FileText, Play, ChevronRight, Layers,
  ExternalLink, Save, X, Sparkles, Loader2
} from 'lucide-react';
import api from '../../api/axios';

export default function AdminLessonsPage() {
  const [courses, setCourses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rawTranscript, setRawTranscript] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    level: 'B1',
    lessonType: 'Dictation',
    videoUrl: '',
    transcript: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchLessons = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/lessons/all-admin');
      if (response.data.success) {
        // Flatten lessons để hiển thị trực tiếp thay vì chỉ hiện Course
        const allLessons = response.data.courses.flatMap(c =>
          (c.lessons || []).map(l => ({
            ...l,
            courseId: c.id,
            courseTitle: c.title,
            level: l.level || c.level
          }))
        );
        setCourses(allLessons);
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
    setRawTranscript([]);
    setIsEditing(false);
    setShowAddModal(true);
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
        showToast("Trích xuất thành công!");
      }
    } catch (error) {
      showToast("Video không có phụ đề hoặc bị chặn.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLesson = async () => {
    if (!formData.title || !formData.videoUrl) return showToast("Vui lòng điền đủ thông tin");
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

      await api.post('/lessons', {
        ...formData,
        transcript: finalTranscript,
        // Có thể thêm moduleId nếu sau này muốn chọn module cụ thể
      });
      showToast("Đã lưu bài học!");
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
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Kho Bài Học</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mt-1">Quản lý nội dung bài tập Dictation & Video.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-2xl font-black text-xs uppercase shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Soạn bài mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl border-2 border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài học..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 rounded-2xl text-xs font-bold outline-none"
          />
        </div>
        <select className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 rounded-2xl text-xs font-bold px-4 py-2 outline-none">
          <option>Tất cả trình độ</option>
          {['A1', 'A2', 'B1', 'B2', 'C1', 'IELTS'].map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 gap-4">
        {courses.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200">
            <Video className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 font-bold text-sm">Chưa có bài học nào được tạo.</p>
          </div>
        ) : (
          courses.map(course => (
            <div key={course.id} className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 hover:border-indigo-400 transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-sm">
                    {course.level}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors text-lg">{course.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg">
                        {course.lessonType || 'Dictation'}
                      </span>
                      <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                        <Video className="w-3 h-3" /> YouTube ID: {course.videoUrl || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // Logic Edit sẽ bổ sung sau (cần fetch full lesson detail)
                      showToast("Tính năng sửa đang được hoàn thiện");
                    }}
                    className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteLesson(course.id)}
                    className="p-2.5 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <ChevronRight className="w-6 h-6 text-slate-300" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Tiêu đề bài học</label>
                    <input
                      type="text"
                      className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-bold text-sm focus:border-indigo-500 transition-all outline-none"
                      placeholder="Ví dụ: IELTS Listening Practice #1"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">YouTube Link</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
                        <input
                          type="text"
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-bold text-sm focus:border-indigo-500 transition-all outline-none"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={formData.videoUrl}
                          onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
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
                      Nội dung Transcript
                    </label>
                    <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded-lg">
                      {(formData.transcript || '').split('\n').filter(l => l.trim()).length} dòng
                    </span>
                  </div>
                  <textarea
                    className="flex-1 min-h-[300px] w-full p-6 bg-slate-900 text-emerald-400 font-mono text-xs rounded-[1.5rem] border-2 border-slate-800 focus:border-indigo-500 outline-none resize-none leading-relaxed"
                    placeholder="Mỗi câu một dòng..."
                    value={formData.transcript}
                    onChange={(e) => setFormData({...formData, transcript: e.target.value})}
                  />
                  <p className="mt-3 text-[10px] text-slate-500 font-bold italic flex items-center gap-2">
                    <Check className="w-3 h-3 text-emerald-500" />
                    Hệ thống sẽ tự động khớp Timestamp nếu số dòng không thay đổi sau khi trích xuất.
                  </p>
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

