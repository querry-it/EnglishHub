import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Edit2, Trash2, Video, CheckCircle2, XCircle,
  FileText, Play, ChevronRight, Layers, Eye, Sparkles, AlertCircle, Check, Save, X, Loader2
} from 'lucide-react';
import api from '../../api/axios';

export default function AdminCoursesPage() {
  const [activeTab, setActiveTab] = useState('PENDING'); // 'PENDING' | 'PUBLISHED' | 'REJECTED'
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseForPreview, setSelectedCourseForPreview] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [courseToReject, setCourseToReject] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/lessons/all-admin');
      if (response.data.success) {
        setCourses(response.data.courses.map(c => ({
          ...c,
          status: 'PUBLISHED' // Tạm thời giả định PUBLISHED cho seeding
        })));
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách khóa học:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleApprove = async (course) => {
    try {
      await api.patch(`/courses/${course.id}/status`, { status: 'PUBLISHED' });
      setCourses(prev => prev.map(c => c.id === course.id ? { ...c, status: 'PUBLISHED' } : c));
      setSelectedCourseForPreview(null);
      showToast(`Đã duyệt khóa học "${course.title}"!`);
    } catch (err) {
      showToast("Lỗi khi duyệt khóa học.");
    }
  };

  const handleConfirmReject = async () => {
    if (!courseToReject) return;
    try {
      await api.patch(`/courses/${courseToReject.id}/status`, {
        status: 'REJECTED',
        reason: rejectReason
      });
      setCourses(prev => prev.map(c => c.id === courseToReject.id ? { ...c, status: 'REJECTED' } : c));
      setShowRejectModal(false);
      setSelectedCourseForPreview(null);
      showToast(`Đã từ chối khóa học.`);
    } catch (err) {
      showToast("Lỗi khi thực hiện.");
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesTab = c.status === activeTab;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[200] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 font-bold text-xs flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Quản Lý & Kiểm Duyệt</h1>
          <p className="text-sm font-bold text-slate-500 mt-1">Hệ thống quản trị nội dung EnglishHub.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl border-2 border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {['PENDING', 'PUBLISHED', 'REJECTED'].map(status => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === status ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {status === 'PENDING' ? 'Chờ duyệt' : status === 'PUBLISHED' ? 'Đã đăng' : 'Từ chối'}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 text-xs font-bold focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-extrabold text-sm text-slate-700">Trống</h3>
          </div>
        ) : (
          filteredCourses.map((c) => (
            <div key={c.id} className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex justify-between items-center">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 font-black text-[10px]">{c.level}</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{c.title}</h3>
                <p className="text-xs text-slate-500 font-bold">Giảng viên: {c.instructorName || 'Admin'}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSelectedCourseForPreview(c)} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600"><Eye className="w-5 h-5" /></button>
                {c.status === 'PENDING' && (
                  <>
                    <button onClick={() => handleApprove(c)} className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase">Duyệt</button>
                    <button onClick={() => { setCourseToReject(c); setShowRejectModal(true); }} className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl font-black text-[10px] uppercase">Từ chối</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
