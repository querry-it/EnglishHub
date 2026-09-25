import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import AppMascot from '../../components/AppMascot';
import { useAuth } from '../../context/AuthContext';
import {
  Camera,
  Image as ImageIcon,
  Lock,
  Save,
  X,
  Crown,
  Share2,
  Gift,
  Edit3,
  Clock,
  Zap,
  BookOpen,
  Award,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Info,
  Copy,
  Check,
  UserCheck,
  Flame,
  Diamond,
  Feather
} from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();

  // Active top tab in Left Card: 'edit' | 'share' | 'referral'
  const [activeLeftTab, setActiveLeftTab] = useState('edit');

  // Active main tab in Right Column: 'dictation' | 'shadowing'
  const [activeRightTab, setActiveRightTab] = useState('dictation');

  // Dictation/Shadowing sub-tab in stats: 'dictation' | 'shadowing'
  const [activeStatsMode, setActiveStatsMode] = useState('dictation');

  // Lesson progress tab: 'completed' | 'learning'
  const [activeLessonTab, setActiveLessonTab] = useState('completed');

  // Form states
  const [username, setUsername] = useState(user?.username || 'huy nguyen');
  const [bio, setBio] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [avatarPhoto, setAvatarPhoto] = useState(null);
  const [saveToast, setSaveToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (updateProfile) {
      updateProfile({ username, bio, isPrivate });
    }
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AppLayout title="Hồ sơ cá nhân">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        {/* Toast Notification */}
        {saveToast && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl animate-slide-in">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="font-extrabold text-sm">Đã lưu thay đổi hồ sơ thành công!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ========================================== */}
          {/* LEFT COLUMN: USER PROFILE & SETTINGS CARD  */}
          {/* ========================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-6 border-2 border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
              
              {/* TOP TABS: CHỈNH SỬA / CHIA SẺ / GIỚI THIỆU */}
              <div className="flex items-center gap-2 border-b-2 border-slate-100 dark:border-slate-800 pb-4">
                <button
                  onClick={() => setActiveLeftTab('edit')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                    activeLeftTab === 'edit'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  CHỈNH SỬA
                </button>

                <button
                  onClick={() => setActiveLeftTab('share')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                    activeLeftTab === 'share'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  CHIA SẺ
                </button>

                <button
                  onClick={() => setActiveLeftTab('referral')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                    activeLeftTab === 'referral'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  GIỚI THIỆU
                </button>
              </div>

              {/* TAB 1: EDIT PROFILE */}
              {activeLeftTab === 'edit' && (
                <form onSubmit={handleSave} className="space-y-5">
                  {/* Avatar & Mascot graphic */}
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-stone-700 text-white flex items-center justify-center font-black text-3xl border-4 border-slate-100 dark:border-slate-800 shadow-inner overflow-hidden">
                        {avatarPhoto ? (
                          <img src={avatarPhoto} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          username.charAt(0).toLowerCase() || 'h'
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-slate-900 text-white border-2 border-white dark:border-slate-800 cursor-pointer hover:bg-slate-800 transition-transform hover:scale-110 shadow-md">
                        <Camera className="w-3.5 h-3.5" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setAvatarPhoto(URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Mascot Illustration */}
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <AppMascot className="w-16 h-16 animate-bounce" />
                    </div>
                  </div>

                  {/* Cover Photo Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Ảnh nền
                    </label>
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group">
                      {coverPhoto ? (
                        <div className="relative w-full h-24 rounded-xl overflow-hidden">
                          <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-7 h-7 text-slate-400 group-hover:scale-110 transition-transform mb-2" />
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            Nhấp để chọn ảnh nền
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setCoverPhoto(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Full Name Input */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>Tên hiển thị</span>
                      <span>{username.length}/20</span>
                    </div>
                    <input
                      type="text"
                      maxLength={20}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-extrabold text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 transition-colors"
                      placeholder="Nhập tên của bạn"
                    />
                  </div>

                  {/* Bio Textarea */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>Giới thiệu bản thân</span>
                      <span>{bio.length}/300</span>
                    </div>
                    <textarea
                      maxLength={300}
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 transition-colors resize-none"
                      placeholder="Nhập mô tả về bản thân"
                    />
                  </div>

                  {/* Privacy Toggle Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-slate-500" />
                        <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                          Quyền riêng tư hồ sơ
                        </span>
                      </div>
                      {/* Toggle Switch */}
                      <button
                        type="button"
                        onClick={() => setIsPrivate(!isPrivate)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                          isPrivate ? 'bg-sky-500 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                      </button>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-400 leading-snug">
                      Công khai: Khi được bật, người khác sẽ không thể xem hồ sơ của bạn
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      LƯU
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUsername(user?.username || 'huy nguyen');
                        setBio('');
                      }}
                      className="p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: SHARE PROFILE */}
              {activeLeftTab === 'share' && (
                <div className="space-y-4 py-2">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Chia sẻ trang hồ sơ cá nhân
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Sao chép đường dẫn trực tiếp tới hồ sơ của bạn để chia sẻ với bạn bè:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={window.location.href}
                      className="flex-1 px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedLink ? 'Đã chép' : 'Sao chép'}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: REFERRAL */}
              {activeLeftTab === 'referral' && (
                <div className="space-y-4 py-2 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 flex items-center justify-center mx-auto">
                    <Gift className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Mã giới thiệu bạn bè
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                    Nhận ngay 100 Kim Cương <Diamond className="w-3.5 h-3.5 text-sky-500 fill-sky-500 inline" /> cho mỗi bạn bè đăng ký bằng mã giới thiệu của bạn!
                  </p>
                  <div className="inline-block py-2 px-6 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-mono font-black text-base text-slate-900 dark:text-white">
                    HUY-NGUYEN-888
                  </div>
                </div>
              )}

              {/* PREMIUM STATUS CARD */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                      Trạng thái Premium
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-extrabold text-[11px]">
                    Chưa kích hoạt
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span>Tổng số tháng Premium</span>
                  <span className="font-black text-slate-800 dark:text-slate-200">0</span>
                </div>

                <p className="text-xs font-semibold text-slate-400">
                  Chưa phải thành viên Premium
                </p>

                <Link
                  to="/pricing"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
                  MỞ KHÓA NGAY
                </Link>
              </div>

              {/* STATS BADGES BAR */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 font-extrabold text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Diamond className="w-4 h-4 text-sky-500 fill-sky-500" />
                  <span>52</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span>1</span>
                </div>
                <div className="text-slate-500">
                  Chuỗi dài nhất: <span className="font-black text-slate-800 dark:text-slate-200">1</span>
                </div>
              </div>

              {/* LEARNING TIME & LAST ACTIVE GRID */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block leading-none mb-1">
                      Tổng thời gian học
                    </span>
                    <span className="font-black text-xs text-slate-900 dark:text-white">
                      1h 16m
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block leading-none mb-1">
                      Hoạt động cuối
                    </span>
                    <span className="font-black text-xs text-slate-900 dark:text-white">
                      10 phút trước
                    </span>
                  </div>
                </div>
              </div>

              {/* DETAILED LESSON STATS */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <button
                    onClick={() => setActiveStatsMode('dictation')}
                    className={`font-black text-xs pb-1 transition-colors ${
                      activeStatsMode === 'dictation'
                        ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Nghe chép
                  </button>
                  <button
                    onClick={() => setActiveStatsMode('shadowing')}
                    className={`font-black text-xs pb-1 transition-colors ${
                      activeStatsMode === 'shadowing'
                        ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Nhại theo
                  </button>
                </div>

                <div className="space-y-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      Tổng số bài học
                    </span>
                    <span className="font-black text-slate-900 dark:text-white">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-sky-500" />
                      Tổng số câu
                    </span>
                    <span className="font-black text-slate-900 dark:text-white">2</span>
                  </div>
                </div>
              </div>

              {/* LEVEL / RANKING LEVEL PROGRESS BOX */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                    Cấp độ hiện tại
                  </span>
                  <button className="text-[11px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    Thông tin xếp hạng
                  </button>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-extrabold text-xs">
                  <Feather className="w-3.5 h-3.5" /> Chưa có hạng
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full w-[4%]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 block">
                    Đã hoàn thành 4%
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                  Hoàn thành 50 câu để mở khóa cấp độ của bạn và bắt đầu hành trình học tập.
                </p>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 pt-1">
                  <Info className="w-3.5 h-3.5 shrink-0 text-sky-500" />
                  <span>Hoàn thành thêm 48 câu để mở khóa cấp bậc đầu tiên</span>
                </div>
              </div>

            </div>
          </div>


          {/* ========================================== */}
          {/* RIGHT COLUMN: LESSON PROGRESS & RANK HISTORY */}
          {/* ========================================== */}
          <div className="lg:col-span-7 space-y-6">

            {/* TOP SEGMENTED TABS: NGHE CHÉP vs NHẠI THEO */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-1.5 shadow-sm flex items-center">
              <button
                onClick={() => setActiveRightTab('dictation')}
                className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${
                  activeRightTab === 'dictation'
                    ? 'bg-slate-900 text-white dark:bg-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                NGHE CHÉP
              </button>
              <button
                onClick={() => setActiveRightTab('shadowing')}
                className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${
                  activeRightTab === 'shadowing'
                    ? 'bg-slate-900 text-white dark:bg-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                NHẠI THEO
              </button>
            </div>

            {/* RANKING HISTORY CARD */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-slate-200/80 dark:border-slate-800 shadow-sm text-center py-12">
              <span className="text-xs font-bold text-slate-400">
                Chưa có lịch sử xếp hạng.
              </span>
            </div>

            {/* LESSON PROGRESS CARD */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                Tiến độ bài học
              </h3>

              {/* Sub-filter tabs for Completed vs Learning */}
              <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <button
                  onClick={() => setActiveLessonTab('completed')}
                  className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    activeLessonTab === 'completed'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Đã hoàn thành
                </button>
                <button
                  onClick={() => setActiveLessonTab('learning')}
                  className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    activeLessonTab === 'learning'
                      ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Đang học
                </button>
              </div>

              {/* Empty state canvas */}
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 stroke-[1.5]" />
                </div>
                <p className="text-xs font-bold text-slate-400">
                  {activeLessonTab === 'completed' ? 'Không tìm thấy bài học nào' : 'Chưa có bài học đang dở dở'}
                </p>
                <Link
                  to="/listening"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs transition-colors shadow-sm"
                >
                  Bắt đầu bài học mới
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
