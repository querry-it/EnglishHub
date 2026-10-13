import React, { useState } from 'react';
import {
  Plus, Search, Edit2, Trash2, Video, CheckCircle2, XCircle,
  FileText, Play, ChevronRight, Layers, Eye, Sparkles, AlertCircle, Check, Save, X
} from 'lucide-react';

export default function AdminCoursesPage() {
  const [activeTab, setActiveTab] = useState('PENDING'); // 'PENDING' | 'PUBLISHED' | 'REJECTED'

  const [courses, setCourses] = useState([
    {
      id: 'c-101',
      title: 'IELTS Intensive Writing Task 2 (Band 7.5+)',
      instructorName: 'Phạm Thị Lan',
      instructorEmail: 'lan.english@gmail.com',
      level: 'IELTS',
      price: '890.000đ',
      status: 'PENDING',
      submittedAt: 'Hôm nay, 09:30',
      modulesCount: 6,
      lessonsCount: 30,
      description: 'Khóa học chuyên sâu tư duy phản biện, từ vựng Academic và dàn bài IELTS Writing Task 2.'
    },
    {
      id: 'c-102',
      title: 'Giao tiếp tiếng Anh Công sở & Đàm phán Hợp đồng',
      instructorName: 'Nguyễn Văn Minh',
      instructorEmail: 'minhproielts@gmail.com',
      level: 'B2',
      price: '590.000đ',
      status: 'PENDING',
      submittedAt: 'Hôm qua, 15:45',
      modulesCount: 4,
      lessonsCount: 20,
      description: 'Luyện phản xạ phỏng vấn, thuyết trình slide và giao tiếp đối tác nước ngoài.'
    },
    {
      id: 'c-1',
      title: 'IELTS Band 7.0+ Masterclass 4 Kỹ Năng',
      instructorName: 'Hệ thống EnglishHub',
      instructorEmail: 'admin@englishhub.com',
      level: 'IELTS',
      price: '1.490.000đ',
      status: 'PUBLISHED',
      submittedAt: '2026-01-10',
      modulesCount: 8,
      lessonsCount: 45,
      studentsCount: 1420
    },
    {
      id: 'c-2',
      title: 'TOEIC 750+ Intensive Listening & Reading',
      instructorName: 'Nguyễn Văn Minh',
      instructorEmail: 'minhproielts@gmail.com',
      level: 'TOEIC',
      price: '990.000đ',
      status: 'PUBLISHED',
      submittedAt: '2026-02-01',
      modulesCount: 5,
      lessonsCount: 28,
      studentsCount: 980
    }
  ]);

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

  const handleApprove = (course) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, status: 'PUBLISHED' } : c))
    );
    setSelectedCourseForPreview(null);
    showToast(`Đã duyệt và xuất bản khóa học "${course.title}" lên ứng dụng!`);
  };

  const handleOpenReject = (course) => {
    setCourseToReject(course);
    setRejectReason('');
    setShowRejectModal(true);
  };

  const handleConfirmReject = () => {
    if (!courseToReject) return;
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseToReject.id
          ? { ...c, status: 'REJECTED', rejectReason: rejectReason || 'Cần bổ sung tài liệu học tập.' }
          : c
      )
    );
    setShowRejectModal(false);
    setSelectedCourseForPreview(null);
    showToast(`Đã từ chối khóa học "${courseToReject.title}" và gửi phản hồi cho Giảng viên.`);
  };

  const filteredCourses = courses.filter((c) => {
    const matchesTab = c.status === activeTab;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingCount = courses.filter((c) => c.status === 'PENDING').length;
  const publishedCount = courses.filter((c) => c.status === 'PUBLISHED').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 font-extrabold text-xs flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <CheckCircle2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Kiểm Duyệt & Quản Lý Khóa Học</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
            Phê duyệt bài đăng giáo trình của Giảng viên trước khi xuất bản chính thức.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('PENDING')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'PENDING'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Đang chờ duyệt</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-extrabold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('PUBLISHED')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'PUBLISHED'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Đã xuất bản ({publishedCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('REJECTED')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'REJECTED'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <XCircle className="w-4 h-4" />
            <span>Đã từ chối</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Tìm theo tên khóa học / Giảng viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">Không có khóa học nào trong mục này</h3>
            <p className="text-xs text-slate-400">Tất cả các bài nộp đã được xử lý xong!</p>
          </div>
        ) : (
          filteredCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-4 hover:border-indigo-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
                      {c.level}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Giảng viên: <strong className="text-slate-700 dark:text-slate-200">{c.instructorName}</strong> ({c.instructorEmail})
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                    {c.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-1">
                    <span className="flex items-center gap-1"><Layers className="w-4 h-4 text-indigo-500" /> {c.modulesCount} Modules</span>
                    <span className="flex items-center gap-1"><Video className="w-4 h-4 text-sky-500" /> {c.lessonsCount} Bài học</span>
                    <span className="text-emerald-600 font-black text-sm">{c.price}</span>
                    <span className="text-slate-400 font-mono">Gửi lúc: {c.submittedAt}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedCourseForPreview(c)}
                    className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Xem trước (Preview)</span>
                  </button>

                  {c.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleApprove(c)}
                        className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-transform active:scale-98"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>DUYỆT ĐĂNG</span>
                      </button>

                      <button
                        onClick={() => handleOpenReject(c)}
                        className="px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center gap-1.5 border border-rose-200 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>TỪ CHỐI</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Preview Modal */}
      {selectedCourseForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                <span>Xem Trước Khóa Học Giảng Viên Đăng</span>
              </h3>
              <button onClick={() => setSelectedCourseForPreview(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 font-black">{selectedCourseForPreview.level}</span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mt-2">{selectedCourseForPreview.title}</h2>
                <p className="text-slate-500 mt-1">Tác giả: <strong>{selectedCourseForPreview.instructorName}</strong> ({selectedCourseForPreview.instructorEmail})</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-extrabold text-slate-900 dark:text-white block">Mô tả giáo trình:</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedCourseForPreview.description || 'Khóa học chưa bổ sung mô tả.'}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold">
                  <span className="text-slate-400 block text-[10px] uppercase">Số chương</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">{selectedCourseForPreview.modulesCount} Modules</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold">
                  <span className="text-slate-400 block text-[10px] uppercase">Số bài học</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">{selectedCourseForPreview.lessonsCount} Lessons</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 font-bold">
                  <span className="text-emerald-600 block text-[10px] uppercase">Giá niêm yết</span>
                  <span className="text-base font-black text-emerald-600">{selectedCourseForPreview.price}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setSelectedCourseForPreview(null)} className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 font-bold text-xs">
                Đóng
              </button>
              {selectedCourseForPreview.status === 'PENDING' && (
                <button
                  onClick={() => handleApprove(selectedCourseForPreview)}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase shadow-md"
                >
                  XÁC NHẬN DUYỆT & XUẤT BẢN
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {showRejectModal && courseToReject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-500" />
              <span>Lý Do Từ Chối Khóa Học</span>
            </h3>

            <p className="text-xs font-semibold text-slate-500">
              Nhập lý do cần chỉnh sửa gửi đến Giảng viên <strong>{courseToReject.instructorName}</strong>:
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Ví dụ: Thiếu file PDF bài tập đính kèm ở Chương 2, cần bổ sung transcript tiếng Anh..."
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowRejectModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs">
                Hủy
              </button>
              <button onClick={handleConfirmReject} className="px-5 py-2 rounded-xl bg-rose-600 text-white font-black text-xs uppercase shadow-md">
                GỬI PHẢN HỒI TỪ CHỐI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
