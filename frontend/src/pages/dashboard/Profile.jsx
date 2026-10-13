import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Feather,
  TrendingUp
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const skillData = [
  { subject: 'Grammar', score: 82, fullMark: 100 },
  { subject: 'Vocabulary', score: 91, fullMark: 100 },
  { subject: 'Reading', score: 89, fullMark: 100 },
  { subject: 'Listening', score: 72, fullMark: 100 },
  { subject: 'Speaking', score: 51, fullMark: 100 },
  { subject: 'Writing', score: 43, fullMark: 100 },
];

export default function Profile() {
  const { user, updateProfile, openProModal } = useAuth();

  // Active top tab in Left Card: 'edit' | 'share' | 'referral'
  const [activeLeftTab, setActiveLeftTab] = useState('edit');

  // Active main tab in Right Column: 'dictation' | 'shadowing'
  const [activeRightTab, setActiveRightTab] = useState('dictation');

  // Dictation/Shadowing sub-tab in stats: 'dictation' | 'shadowing'
  const [activeStatsMode, setActiveStatsMode] = useState('dictation');

  // Lesson progress tab: 'completed' | 'learning'
  const [activeLessonTab, setActiveLessonTab] = useState('completed');

  // Toggle state for whether edit form is open or collapsed
  const [isEditing, setIsEditing] = useState(true);

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
    setIsEditing(false);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
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
                  onClick={() => {
                    if (activeLeftTab === 'edit') {
                      setIsEditing(!isEditing);
                    } else {
                      setActiveLeftTab('edit');
                      setIsEditing(true);
                    }
                  }}
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
                isEditing ? (
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
                          setIsEditing(false);
                        }}
                        className="p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                        title="Thu gọn chỉnh sửa"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Collapsed profile card view (Matches Screenshot 2) */
                  <div className="relative rounded-2xl overflow-hidden p-5 border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-rose-500/10 via-amber-500/10 to-sky-500/10 dark:from-rose-950/20 dark:via-amber-950/20 dark:to-sky-950/20 space-y-4 shadow-sm group">
                    {/* Background cover photo overlay if uploaded */}
                    {coverPhoto && (
                      <div className="absolute inset-0 z-0 opacity-40">
                        <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      </div>
                    )}

                    {/* Button to expand/edit again */}
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm border border-white/50 flex items-center gap-1.5 text-xs font-extrabold"
                      title="Chỉnh sửa hồ sơ"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Sửa</span>
                    </button>

                    {/* Header: Avatar with Lv badge & Mascot */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-stone-700 text-white flex items-center justify-center font-black text-3xl border-4 border-white dark:border-slate-800 shadow-md overflow-hidden">
                          {avatarPhoto ? (
                            <img src={avatarPhoto} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            username.charAt(0).toLowerCase() || 'h'
                          )}
                        </div>
                        {/* Lv.1 badge overlapping avatar */}
                        <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-black text-[10px] border-2 border-slate-200 dark:border-slate-700 shadow-sm">
                          Lv.1
                        </div>
                      </div>

                      {/* Mascot Illustration */}
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <AppMascot className="w-16 h-16 animate-bounce" />
                      </div>
                    </div>

                    {/* Badges Row: Display Name, Level, Rank */}
                    <div className="relative z-10 flex items-center gap-2 flex-wrap pt-1">
                      {/* Name pill */}
                      <div className="px-3.5 py-1.5 rounded-xl bg-red-200/70 dark:bg-red-900/40 backdrop-blur-md border border-red-300/50 dark:border-red-800/50 font-black text-sm text-slate-900 dark:text-white shadow-sm">
                        {username}
                      </div>

                      {/* Level pill */}
                      <div className="px-3 py-1 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200 font-extrabold text-xs border border-sky-200 dark:border-sky-800 shadow-sm flex items-center gap-1">
                        Lv.1
                      </div>

                      {/* Rank icon square badge */}
                      <div className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 shadow-sm flex items-center justify-center">
                        <Feather className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Privacy Status Bar */}
                    <div className="relative z-10 p-3 rounded-2xl bg-red-200/50 dark:bg-red-950/40 backdrop-blur-md border border-red-300/40 dark:border-red-900/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-extrabold text-xs">
                        <Lock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span>Quyền riêng tư hồ sơ</span>
                      </div>
                      <div className="px-3 py-1 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-black text-xs shadow-sm">
                        {isPrivate ? 'Riêng tư' : 'Công khai'}
                      </div>
                    </div>
                  </div>
                )
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

                <button
                  onClick={openProModal}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
                  MỞ KHÓA NGAY
                </button>
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

            {/* STUDENT PERFORMANCE ANALYSIS (RADAR CHART) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" /> Phân tích năng lực
                </h3>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                  Cập nhật: Hôm nay
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2 h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Score" dataKey="score" stroke="#4f46e5" strokeWidth={2} fill="#6366f1" fillOpacity={0.4} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2 block flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Kỹ năng mạnh
                    </span>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span>Vocabulary</span> <span className="text-emerald-600">91%</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span>Reading</span> <span className="text-emerald-600">89%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50">
                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-2 block flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Cần cải thiện
                    </span>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span>Writing</span> <span className="text-rose-600">43%</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span>Speaking</span> <span className="text-rose-600">51%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
  );
}
