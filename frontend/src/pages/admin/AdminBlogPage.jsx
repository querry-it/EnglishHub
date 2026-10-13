import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Edit2, Trash2, Eye, Sparkles, 
  Tag, Calendar, User, Save, X, Check
} from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([
    {
      id: 'post-1',
      title: '10 Mẹo Luyện Shadowing Hiệu Quả Cho Người Mới Bắt Đầu',
      category: 'Kinh nghiệm học',
      author: 'Ban Biên Tập EnglishHub',
      views: 3420,
      status: 'PUBLISHED',
      publishedAt: '2026-03-28',
      summary: 'Phương pháp Shadowing giúp bạn cải thiện âm điệu, nối âm và tăng độ trôi chảy khi nói tiếng Anh.',
      coverUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'post-2',
      title: 'Lộ Trình Tự Học IELTS 7.0+ Từ Cấu Trúc Đề Đến Kỹ Năng Nghe Nói',
      category: 'Luyện thi IELTS',
      author: 'Phạm Thị Lan (IELTS 8.5)',
      views: 5890,
      status: 'PUBLISHED',
      publishedAt: '2026-03-15',
      summary: 'Tổng hợp chiến thuật làm bài Writing Task 1, 2 và bí quyết ghi điểm trong Speaking Part 2.',
      coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'post-3',
      title: 'Cập Nhật Bản Phân Loại Từ Vựng TOEIC 2026 Mới Nhất',
      category: 'Thông báo hệ thống',
      author: 'Admin System',
      views: 1200,
      status: 'DRAFT',
      publishedAt: 'Chưa xuất bản',
      summary: 'Bổ sung thêm 500 từ vựng chuyên ngành Thương mại và Văn phòng vào ngân hàng đề thi.',
      coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Kinh nghiệm học',
    summary: '',
    content: '',
    coverUrl: '',
    status: 'PUBLISHED'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      category: 'Kinh nghiệm học',
      summary: '',
      content: '',
      coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
      status: 'PUBLISHED'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      category: post.category,
      summary: post.summary,
      content: post.summary,
      coverUrl: post.coverUrl,
      status: post.status
    });
    setShowModal(true);
  };

  const handleSavePost = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingPost) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? { ...p, ...formData }
            : p
        )
      );
      showToast(`Đã cập nhật bài viết "${formData.title}"!`);
    } else {
      const newPost = {
        id: `post-${Date.now()}`,
        ...formData,
        author: 'Admin System',
        views: 0,
        publishedAt: new Date().toISOString().split('T')[0]
      };
      setPosts([newPost, ...posts]);
      showToast(`Đã xuất bản bài viết mới "${formData.title}"!`);
    }
    setShowModal(false);
  };

  const handleDeletePost = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast('Đã xóa bài viết thành công!');
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <FileText className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Quản Lý Bài Viết & Blog CMS</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
            Đăng tin tức, bài viết chia sẻ phương pháp học tiếng Anh & mẹo luyện thi.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-transform active:scale-98 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>VIẾT BÀI MỚI</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết theo tiêu đề hoặc danh mục..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
          />
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={post.coverUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white font-extrabold text-[10px] uppercase">
                  {post.category}
                </span>

                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                    post.status === 'PUBLISHED'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-400 text-amber-950'
                  }`}
                >
                  {post.status === 'PUBLISHED' ? 'Đã xuất bản' : 'Bản nháp'}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-black text-base text-slate-900 dark:text-white line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>

            {/* Footer info & actions */}
            <div className="p-5 pt-0 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views} xem</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  title="Chỉnh sửa bài viết"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 hover:bg-rose-100 transition-colors"
                  title="Xóa bài viết"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleSavePost}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>{editingPost ? 'Chỉnh Sửa Bài Viết' : 'Soạn Bài Viết Blog Mới'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-extrabold mb-1">Tiêu đề bài viết</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ví dụ: Bí quyết chinh phục 8.0 IELTS Listening trong 3 tháng"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-extrabold mb-1">Chủ đề / Danh mục</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                  >
                    <option value="Kinh nghiệm học">Kinh nghiệm học</option>
                    <option value="Luyện thi IELTS">Luyện thi IELTS</option>
                    <option value="Luyện thi TOEIC">Luyện thi TOEIC</option>
                    <option value="Thông báo hệ thống">Thông báo hệ thống</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-extrabold mb-1">Trạng thái xuất bản</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                  >
                    <option value="PUBLISHED">Xuất bản ngay (Published)</option>
                    <option value="DRAFT">Lưu bản nháp (Draft)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-extrabold mb-1">Ảnh bìa (URL Image)</label>
                <input
                  type="text"
                  value={formData.coverUrl}
                  onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-extrabold mb-1">Tóm tắt ngắn</label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Mô tả tóm tắt hiển thị ở thẻ bài viết..."
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 font-bold text-xs"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-7 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>LƯU BÀI VIẾT</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
