import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Sparkles, Crown, ArrowLeft, Save, CheckCircle2, Headphones, Mic } from 'lucide-react';

export default function CreateLesson() {
  const navigate = useNavigate();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dictation');
  const [level, setLevel] = useState('B1');
  const [transcript, setTranscript] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/instructor/courses');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-2 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        <h1 className="text-xl font-black text-slate-900 dark:text-white">
          Soạn bài học Dictation / Shadowing Mới
        </h1>
      </div>

      {isSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-extrabold text-xs text-center shadow-md animate-fade-in">
          ✅ Đã xuất bản bài học mới thành công! Đang chuyển hướng...
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleCreate} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        
        {/* YouTube Link Converter Input */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Video className="w-4 h-4 text-rose-500 fill-current" />
            <span>Link Video YouTube Gốc</span>
          </label>
          <input
            type="url"
            required
            placeholder="https://www.youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
          />
        </div>

        {/* Title & Level */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block">
              Tiêu đề bài học
            </label>
            <input
              type="text"
              required
              placeholder="VD: Ordering Coffee at Starbucks..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block">
              Cấp độ (CEFR)
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
            >
              <option value="A1">A1 — Bắt đầu</option>
              <option value="A2">A2 — Sơ cấp</option>
              <option value="B1">B1 — Trung cấp</option>
              <option value="B2">B2 — Trên trung cấp</option>
              <option value="C1">C1 — Cao cấp</option>
            </select>
          </div>
        </div>

        {/* Category Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block">
            Loại bài tập
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCategory('Dictation')}
              className={`flex-1 py-3 rounded-2xl font-extrabold text-xs border-2 flex items-center justify-center gap-2 transition-all ${
                category === 'Dictation'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Headphones className="w-4 h-4" /> Nghe chép chính tả (Dictation)
            </button>
            <button
              type="button"
              onClick={() => setCategory('Shadowing')}
              className={`flex-1 py-3 rounded-2xl font-extrabold text-xs border-2 flex items-center justify-center gap-2 transition-all ${
                category === 'Shadowing'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Mic className="w-4 h-4" /> Nhại âm giọng đọc (Shadowing)
            </button>
          </div>
        </div>

        {/* Transcript Area */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block">
            Nội dung Transcript Phụ đề (Mỗi câu 1 dòng)
          </label>
          <textarea
            rows={8}
            required
            placeholder="Dán toàn bộ câu phụ đề tiếng Anh vào đây..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-transform active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>XUẤT BẢN BÀI HỌC</span>
          </button>
        </div>
      </form>
    </div>
  );
}
