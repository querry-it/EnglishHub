import React, { useState, useEffect } from 'react';
import { 
  Trophy, Flame, Zap, Medal, Crown, ChevronLeft, ChevronRight, 
  Clock, Award, Sparkles, CheckCircle2, MessageSquare, Star
} from 'lucide-react';
import AppLayout from '../../components/AppLayout';
import { useAuth } from '../../context/AuthContext';

export default function Leaderboard() {
  const { user } = useAuth();
  
  // Month selector state
  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2026);

  // Live countdown timer state (5 days, 21 hours, 57 mins, 40 secs)
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 21,
    minutes: 57,
    seconds: 40
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Leaderboard Rankings Dataset (Matching Screenshots 1 & 2)
  const rankingList = [
    { rank: 1, name: '@toodles_dw', level: 41, time: '57h 47m', questions: '8920 câu', score: 10000, streak: 8986, isPro: true, badge: '🥇' },
    { rank: 2, name: '@henryy', level: 31, time: '57h 47m', questions: '8268 câu', score: 8581, streak: 4300, isPro: false, badge: '🥈' },
    { rank: 3, name: '@_hanayuki_', level: 45, time: '37h 2m', questions: '7761 câu', score: 10000, streak: 3870, isPro: true, badge: '🥉' },
    { rank: 4, name: 'Chuka Idako', level: 54, time: '21h 11m', questions: '7378 câu', score: 10000, streak: 10000, isPro: true },
    { rank: 5, name: '@vuhoanganh', level: 31, time: '25h 54m', questions: '6960 câu', score: 5801, streak: 617, isPro: false },
    { rank: 6, name: '@pew', level: 58, time: '26h 14m', questions: '6948 câu', score: 10000, streak: 8400, isPro: true },
    { rank: 7, name: '@baek', level: 51, time: '38h 38m', questions: '6924 câu', score: 9870, streak: 8138, isPro: false },
    { rank: 8, name: '@capri', level: 46, time: '42h 46m', questions: '6906 câu', score: 9540, streak: 7600, isPro: false },
    { rank: 9, name: '@minh_le', level: 39, time: '43h 3m', questions: '6720 câu', score: 10000, streak: 8986, isPro: false },
    { rank: 10, name: '@tuyet_mai', level: 42, time: '35h 12m', questions: '6450 câu', score: 9200, streak: 6500, isPro: true },
    { rank: 11, name: '@david_smith', level: 33, time: '31h 20m', questions: '6100 câu', score: 8900, streak: 5400, isPro: false },
    { rank: 12, name: '@linh_chi', level: 29, time: '28h 45m', questions: '5890 câu', score: 8750, streak: 4900, isPro: false },
    { rank: 13, name: '@khanh_nam', level: 50, time: '27h 10m', questions: '5600 câu', score: 9900, streak: 9200, isPro: true },
    { rank: 14, name: '@thanh_truc', level: 25, time: '24h 50m', questions: '5300 câu', score: 8200, streak: 4100, isPro: false },
    { rank: 15, name: '@hoang_yen', level: 38, time: '22h 15m', questions: '5100 câu', score: 9100, streak: 7200, isPro: false }
  ];

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
    <AppLayout>
      <div className="w-full min-h-screen pb-16 select-none">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 space-y-6">
          
          {/* ================= 1. PAGE HEADER TITLE ================= */}
          <div className="text-center space-y-1 py-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Bảng xếp hạng
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Xem những người học năng động nhất trong tháng
            </p>
          </div>

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
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-indigo-500 shadow-md flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-2.5 py-1 rounded-xl bg-[#1E2540] dark:bg-indigo-600 text-white font-mono font-black text-xs shrink-0">
                  #42842
                </span>
                <div className="w-9 h-9 rounded-full bg-stone-700 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-white">
                  h
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                      {user?.username || 'huy nguyen'}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-[9px] font-extrabold text-slate-700 dark:text-slate-300">
                      Lv.1
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    <span>⏱ 0h 53m</span>
                    <span>💬 4 câu</span>
                  </div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-mono font-black text-xs shrink-0 border border-sky-200 dark:border-sky-800">
                #42842
              </span>
            </div>

            {/* Rankings List (#1 to #15) */}
            <div className="space-y-3 pt-2">
              {rankingList.map((item) => (
                <div
                  key={item.rank}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Rank Number */}
                    <span className="w-6 font-black font-mono text-sm text-slate-700 dark:text-slate-300 text-center shrink-0">
                      {item.rank}
                    </span>

                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center font-bold text-xs shrink-0 relative">
                      👤
                      {item.badge && (
                        <span className="absolute -top-1.5 -right-1.5 text-xs">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* User Info & Stats */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                          {item.name}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-[9px] font-bold text-slate-600 dark:text-slate-300">
                          Lv.{item.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 mt-0.5">
                        <span>⏱ {item.time}</span>
                        <span>💬 {item.questions}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Score Badges */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-mono font-black text-xs border border-sky-200 dark:border-sky-800">
                      <span>%</span>
                      <span>{item.score}</span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-mono font-black text-xs border border-emerald-200 dark:border-emerald-800">
                      <span>⚡</span>
                      <span>{item.streak}</span>
                    </div>

                    <span className="px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono font-black text-xs">
                      #{item.rank}
                    </span>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </AppLayout>
  );
}
