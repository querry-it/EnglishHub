import React, { useState } from 'react';
import { 
  Bell, Send, Users, Crown, GraduationCap, Check, 
  Trash2, AlertCircle, Clock, Sparkles, MessageSquare 
} from 'lucide-react';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Ra mắt tính năng AI Dictation & Shadowing tự động',
      message: 'Hệ thống đã cập nhật AI hỗ trợ tạo bài học từ link YouTube không giới hạn cho tài khoản PRO.',
      targetGroup: 'ALL', // 'ALL' | 'PRO' | 'INSTRUCTOR'
      sentAt: '2026-04-01 10:00',
      sentBy: 'Admin System',
      recipientCount: 1540
    },
    {
      id: 'notif-2',
      title: 'Lịch bảo trì nâng cấp Server định kỳ',
      message: 'Hệ thống sẽ bảo trì nâng cấp trong 30 phút từ 02:00 đến 02:30 sáng ngày 15/04/2026.',
      targetGroup: 'ALL',
      sentAt: '2026-03-25 18:30',
      sentBy: 'Admin System',
      recipientCount: 1540
    },
    {
      id: 'notif-3',
      title: 'Nhắc nhở cập nhật thông tin giảng viên & lịch dạy',
      message: 'Vui lòng hoàn thiện bằng cấp chứng chỉ IELTS / TESOL để được ưu tiên duyệt bài đăng.',
      targetGroup: 'INSTRUCTOR',
      sentAt: '2026-03-10 14:15',
      sentBy: 'Admin System',
      recipientCount: 18
    }
  ]);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetGroup, setTargetGroup] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      targetGroup,
      sentAt: new Date().toLocaleString(),
      sentBy: 'Admin System',
      recipientCount: targetGroup === 'ALL' ? 1540 : targetGroup === 'PRO' ? 420 : 18
    };

    setNotifications([newNotif, ...notifications]);
    setTitle('');
    setMessage('');
    showToast('Đã gửi thông báo hệ thống hàng loạt đến người dùng!');
  };

  const handleDeleteNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast('Đã xóa thông báo khỏi lịch sử.');
  };

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
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Bell className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span>Trung Tâm Gửi Thông Báo Hệ Thống (Broadcast)</span>
        </h1>
        <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
          Gửi thông báo Push Notification đến toàn bộ học viên hoặc nhóm tài khoản cụ thể.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Compose Form (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <h2 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-600" />
            <span>Soạn Thông Báo Mới</span>
          </h2>

          <form onSubmit={handleSendNotification} className="space-y-4 text-xs font-bold">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-extrabold mb-1">
                Tiêu đề thông báo
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Ưu đãi đặc biệt giảm 50% gói PRO tháng 4..."
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-extrabold mb-1">
                Đối tượng nhận thông báo
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetGroup('ALL')}
                  className={`p-2.5 rounded-xl border-2 text-[11px] font-black flex items-center justify-center gap-1 transition-all ${
                    targetGroup === 'ALL'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> Tất cả User
                </button>

                <button
                  type="button"
                  onClick={() => setTargetGroup('PRO')}
                  className={`p-2.5 rounded-xl border-2 text-[11px] font-black flex items-center justify-center gap-1 transition-all ${
                    targetGroup === 'PRO'
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-500" /> Chỉ PRO
                </button>

                <button
                  type="button"
                  onClick={() => setTargetGroup('INSTRUCTOR')}
                  className={`p-2.5 rounded-xl border-2 text-[11px] font-black flex items-center justify-center gap-1 transition-all ${
                    targetGroup === 'INSTRUCTOR'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" /> Giảng viên
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-extrabold mb-1">
                Nội dung thông báo
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập nội dung thông báo gửi đến ứng dụng học viên..."
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>GỬI THÔNG BÁO NGAY</span>
            </button>
          </form>
        </div>

        {/* Right: History Log (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="font-black text-base text-slate-900 dark:text-white flex items-center justify-between">
            <span>Lịch Sử Gửi Thông Báo ({notifications.length})</span>
            <span className="text-xs font-bold text-slate-400 font-mono">Push Notifications</span>
          </h2>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">{n.title}</span>
                  <button
                    onClick={() => handleDeleteNotif(n.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                  {n.message}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400">
                    <Users className="w-3.5 h-3.5" /> Gửi tới: {n.targetGroup} ({n.recipientCount} user)
                  </span>
                  <span>{n.sentAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
