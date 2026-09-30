import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Edit2, Trash2, Video,
  FileText, Play, ChevronRight, Layers,
  ExternalLink, Save, X, Sparkles
} from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([
    { id: '1', title: 'IELTS Band 7.0+ Masterclass', level: 'IELTS', price: '1,490,000', modulesCount: 5, lessonsCount: 24 },
    { id: '2', title: 'TOEIC 900+ Intensive', level: 'B2', price: '990,000', modulesCount: 4, lessonsCount: 18 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    level: 'B1',
    price: '',
    videoUrl: '',
    contentText: '' // This will store our JSON transcript
  });

  const handleOpenAdd = () => {
    setFormData({ title: '', level: 'B1', price: '', videoUrl: '', contentText: '' });
    setIsEditing(false);
    setShowAddModal(true);
  };

  const handleExtractSubtitles = () => {
    alert("Đang giả lập trích xuất phụ đề từ YouTube...\n(Tính năng này sẽ gọi Backend xử lý thư viện youtube-caption-extractor)");
    const mockTranscript = [
      { start: 0.0, end: 2.5, text: "Hello everyone, welcome to EnglishHub." },
      { start: 2.6, end: 5.0, text: "Today we will learn how to master IELTS listening." }
    ];
    setFormData({ ...formData, contentText: JSON.stringify(mockTranscript, null, 2) });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Quản lý Khóa học</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Tạo và quản lý các nội dung bài học, video transcript.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          <Plus className="w-5 h-5" />
          Thêm khóa học mới
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2 focus:ring-2 focus:ring-indigo-500">
          <option>Tất cả trình độ</option>
          <option>A1 - Beginner</option>
          <option>B2 - Upper Intermediate</option>
          <option>IELTS</option>
        </select>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                  {course.level}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Layers className="w-3 h-3" /> {course.modulesCount} Modules
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Video className="w-3 h-3" /> {course.lessonsCount} Bài học
                    </span>
                    <span className="text-xs font-bold text-emerald-600">{course.price} VNĐ</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg text-rose-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal (Đăng bài) */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                {isEditing ? 'Chỉnh sửa bài học' : 'Đăng bài học mới'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tiêu đề bài học</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                      placeholder="Ví dụ: Luyện nghe qua bản tin BBC"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">YouTube Video URL</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={formData.videoUrl}
                          onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                        />
                      </div>
                      <button
                        onClick={handleExtractSubtitles}
                        className="px-4 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Trích xuất
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Trình độ</label>
                      <select
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                        value={formData.level}
                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                      >
                        <option value="A1">A1 - Beginner</option>
                        <option value="A2">A2 - Elementary</option>
                        <option value="B1">B1 - Intermediate</option>
                        <option value="B2">B2 - Upper-Int</option>
                        <option value="IELTS">IELTS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Loại bài học</label>
                      <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none">
                        <option value="VIDEO">Video + Dictation</option>
                        <option value="PRACTICE">Luyện tập</option>
                        <option value="SPEAKING">Luyện nói</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Transcript / JSON Editor */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Transcript JSON (Cấu trúc Dictation)
                    </label>
                    <span className="text-[10px] text-indigo-500 font-bold bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                      Timestamp Required
                    </span>
                  </div>
                  <textarea
                    className="flex-1 min-h-[250px] w-full p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl border border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder='[{"start": 0.0, "end": 2.0, "text": "..."}]'
                    value={formData.contentText}
                    onChange={(e) => setFormData({...formData, contentText: e.target.value})}
                  />
                  <p className="mt-2 text-[10px] text-slate-500 italic">
                    * Mẹo: Sử dụng nút "Trích xuất" để tự động lấy dữ liệu từ YouTube hoặc AI.
                  </p>
                </div>
              </div>

              {/* Preview Section */}
              <div className="mt-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-3 flex items-center gap-2">
                  <Play className="w-3 h-3" /> Xem trước luồng Luyện nghe
                </h4>
                <div className="flex items-center gap-4">
                  <div className="aspect-video w-32 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                    <Video className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Hủy bỏ
              </button>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                <Save className="w-4 h-4" />
                Lưu bài học
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
