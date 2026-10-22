import React, { useState, useEffect } from 'react';
import { 
  Trophy, Flame, Zap, Medal, Crown, ChevronLeft, ChevronRight, 
  Clock, Award, Sparkles, CheckCircle2, MessageSquare, Star, Loader2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageLayout from '../../components/PageLayout';
import api from '../../api/axios';

export default function Ranking() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rankingList, setRankingList] = useState([]);

  // Month selector state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        const response = await api.get('/auth/leaderboard');
        if (response.data.success) {
          setRankingList(response.data.users);
        }
      } catch (error) {
        console.error('Lỗi khi tải bảng xếp hạng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  // Live countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 21,
    minutes: 57,
    seconds: 40
  });

  // Change month handler
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <PageLayout
      title="Bảng xếp hạng"
      subtitle="Xem những người học năng động nhất trong tháng"
      badge={{ label: 'Tháng này', color: 'indigo' }}
    >
      <div className="max-w-4xl mx-auto space-y-6 select-none">

          {/* ================= 2. COUNTDOWN & MONTHLY REWARDS CONTAINER ================= */}
          <div className="p-6 sm:p-7 rounded-3xl bg-purple-50/70 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800/60 shadow-xs space-y-6 text-center">
            
            {/* Countdown Header */}
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Bảng xếp hạng đóng trong:
              </span>

              {/* 4 Countdown Boxes */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 text-purple-950 dark:text-purple-100">
                <div className="flex flex-col items-center">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 font-mono font-black text-lg sm:text-xl flex items-center justify-center shadow-xs">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1">Ngày</span>
                </div>
                <span className="font-mono font-black text-lg text-purple-400 mb-4">:</span>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 font-mono font-black text-lg sm:text-xl flex items-center justify-center shadow-xs">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1">Giờ</span>
                </div>
                <span className="font-mono font-black text-lg text-purple-400 mb-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 font-mono font-black text-lg sm:text-xl flex items-center justify-center shadow-xs">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1">Phút</span>
                </div>
                <span className="font-mono font-black text-lg text-purple-400 mb-4">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 font-mono font-black text-lg sm:text-xl flex items-center justify-center shadow-xs text-rose-500">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1">Giây</span>
                </div>
              </div>
            </div>

            {/* Month Navigation Row */}
            <div className="flex items-center justify-between pt-2 border-t border-purple-200/60 dark:border-purple-800/40">
              <button
                onClick={handlePrevMonth}
                className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs flex items-center gap-1 hover:bg-purple-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Tháng trước</span>
              </button>

              <h2 className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 tracking-tight">
                tháng {currentMonth} năm {currentYear}
              </h2>

              <button
                onClick={handleNextMonth}
                className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs flex items-center gap-1 hover:bg-purple-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <span>Tháng tới</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Monthly Rewards Showcase */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  Phần thưởng hàng tháng
                </h3>
              </div>

              {/* 4 Award Badges Grid */}
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-black text-amber-500">🥇 #1</span>
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800">
                    <Crown className="w-6 h-6 text-amber-100 fill-amber-100" />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-black text-slate-400">🥈 #2</span>
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800">
                    <Award className="w-6 h-6 text-slate-100" />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-black text-amber-700">🥉 #3</span>
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800">
                    <Award className="w-6 h-6 text-amber-200" />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-black text-indigo-500">#50 #50</span>
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800 font-black">
                    <Trophy className="w-6 h-6 text-purple-200" />
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Nhận huy hiệu, khung avatar và kim cương vào cuối tháng <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </p>
            </div>

          </div>

          {/* ================= 3. MONTHLY LEADERBOARD LIST SECTION ================= */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            
            {/* Section Header */}
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Medal className="w-5 h-5 text-amber-500" /> Bảng xếp hạng hàng tháng
              </h2>
              <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Cập nhật lần cuối: 25/09/2026 07:09
              </p>
            </div>

            {/* Current User Highlighted Card */}
            {user && (
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-indigo-500 shadow-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2.5 py-1 rounded-xl bg-[#1E2540] dark:bg-indigo-600 text-white font-mono font-black text-xs shrink-0">
                    #{rankingList.findIndex(u => u.id === user.id) + 1 || '??'}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-white overflow-hidden">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      user.fullName?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                        {user.fullName} (Bạn)
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900/40 text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400">
                        Lv.{user.level || 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      <span>🎯 Tổng EXP: {user.totalExp?.toLocaleString() || 0}</span>
                      <span>🔥 Streak: 0 ngày</span>
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-mono font-black text-xs shrink-0 border border-sky-200 dark:border-sky-800">
                  #{rankingList.findIndex(u => u.id === user.id) + 1 || '??'}
                </span>
              </div>
            )}

            {/* Rankings List (#1 to #12) */}
            <div className="space-y-3 pt-2">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 animate-pulse">
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        <div className="w-6 h-4 bg-slate-200 dark:bg-slate-700 rounded shrink-0"></div>
                        <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded-xl shrink-0"></div>
                    </div>
                  ))}
                </div>
              ) : rankingList.length > 0 ? (
                rankingList.map((item, idx) => {
                  const rank = idx + 1;
                  const badgeEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Rank Number */}
                        <span className="w-6 font-black font-mono text-sm text-slate-700 dark:text-slate-300 text-center shrink-0">
                          {rank}
                        </span>

                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center font-bold text-xs shrink-0 relative overflow-hidden">
                          {item.avatarUrl ? (
                            <img src={item.avatarUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-lg">👤</span>
                          )}
                          {badgeEmoji && (
                            <span className="absolute -top-1.5 -right-1.5 text-xs">
                              {badgeEmoji}
                            </span>
                          )}
                        </div>

                        {/* User Info & Stats */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                              {item.fullName}
                            </span>
                            <span className="px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900/40 text-[9px] font-bold text-indigo-600 dark:text-indigo-400">
                              Lv.{item.level}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 mt-0.5">
                            <span>🔥 Streak: 0 ngày</span>
                            <span>🎯 EXP: {item.totalExp.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Score Badges */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono font-black text-xs border border-indigo-200 dark:border-indigo-800">
                          <span>{item.totalExp.toLocaleString()}</span>
                          <span>XP</span>
                        </div>

                        <span className="px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono font-black text-xs">
                          #{rank}
                        </span>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-500 font-bold">
                  Chưa có dữ liệu bảng xếp hạng.
                </div>
              )}
            </div>

          </div>

        </div>
    </PageLayout>
  );
}
