import React, { useState } from 'react';
import { Calendar, Snowflake, Flame, Clock, TrendingUp, Rocket } from 'lucide-react';
import AppCard from './AppCard';

export default function ActivityHeatmap() {
  // Generate 91 days data (13 weeks x 7 rows)
  const generateDaysData = () => {
    const days = [];
    const today = new Date(2026, 8, 23); // Sept 23, 2026

    for (let i = 90; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const dayNum = d.getDay(); // 0 is Sunday
      const dateStr = d.toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const isToday = i === 0;
      // Mock activity for today and a few past days
      let minutes = 0;
      let intensity = 0; // 0 to 4
      let isCheckedIn = false;
      let isFrozen = false;
      let activities = [];

      if (isToday) {
        minutes = 14;
        intensity = 2;
        isCheckedIn = true;
        activities = ['Luyện nghe 1 bài chép chính tả', 'Ôn tập 10 từ vựng SRS'];
      } else if (i === 3 || i === 7 || i === 12 || i === 18) {
        minutes = 25;
        intensity = 3;
        isCheckedIn = true;
        activities = ['Hoàn thành bài thi TOEIC Part 1', 'Luyện nói Shadowing 20 phút'];
      } else if (i === 22 || i === 30) {
        minutes = 40;
        intensity = 4;
        isCheckedIn = true;
        activities = ['Đạt Streak 14 ngày', 'Luyện nói 1-1 cộng đồng'];
      } else if (i === 15) {
        isFrozen = true;
      }

      days.push({
        id: i,
        date: d,
        dateStr,
        isToday,
        minutes,
        intensity,
        isCheckedIn,
        isFrozen,
        activities
      });
    }
    return days;
  };

  const [days] = useState(generateDaysData);
  const [selectedDay, setSelectedDay] = useState(days[days.length - 1]); // Default select today

  // Stats calculation
  const activeDaysCount = days.filter(d => d.minutes > 0 || d.isCheckedIn).length;
  const totalMinutes = days.reduce((acc, d) => acc + d.minutes, 0);

  // Month label positions
  const monthLabels = [
    { label: 'Tháng 6', col: 0 },
    { label: 'Tháng 7', col: 3 },
    { label: 'Tháng 8', col: 7 },
    { label: 'Tháng 9', col: 11 },
  ];

  const dayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  return (
    <AppCard className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-500" />
          <span>90 ngày gần nhất</span>
        </h3>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
          Bấm vào một ngày để xem chi tiết. Ô càng đậm = học càng nhiều.
        </p>
      </div>

      {/* Main 3-Column Layout matching user screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Heatmap Matrix & Legend (lg:col-span-5) */}
        <div className="lg:col-span-6 xl:col-span-5 bg-slate-50/80 dark:bg-slate-800/40 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 space-y-4">
          
          {/* Month Header */}
          <div className="flex justify-between text-xs font-extrabold text-slate-400 px-6">
            {monthLabels.map((m, idx) => (
              <span key={idx}>{m.label}</span>
            ))}
          </div>

          {/* Matrix Grid */}
          <div className="flex gap-2.5">
            {/* Day Labels (T3, T5, T7) */}
            <div className="flex flex-col justify-between text-[11px] font-bold text-slate-400 py-1 pr-1">
              <span>T3</span>
              <span>T5</span>
              <span>T7</span>
            </div>

            {/* 7 rows x 13 columns grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 flex-1 overflow-x-auto pb-1">
              {days.map((day) => {
                const isSelected = selectedDay && selectedDay.id === day.id;

                let bgClass = 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
                if (day.isFrozen) {
                  bgClass = 'bg-sky-200 dark:bg-sky-900 border-sky-400';
                } else if (day.intensity === 1) {
                  bgClass = 'bg-emerald-200 dark:bg-emerald-900/60 border-emerald-300';
                } else if (day.intensity === 2) {
                  bgClass = 'bg-emerald-400 dark:bg-emerald-700 border-emerald-500';
                } else if (day.intensity === 3) {
                  bgClass = 'bg-emerald-500 dark:bg-emerald-600 border-emerald-600';
                } else if (day.intensity === 4) {
                  bgClass = 'bg-emerald-700 dark:bg-emerald-500 border-emerald-800';
                }

                return (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day)}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md transition-all border relative ${bgClass} ${
                      isSelected
                        ? 'ring-2 ring-indigo-600 dark:ring-indigo-400 ring-offset-2 scale-110 z-10'
                        : 'hover:scale-110 hover:shadow-md'
                    }`}
                    title={`${day.dateStr}: ${day.minutes > 0 ? `${day.minutes} phút học` : 'Không có hoạt động'}`}
                  >
                    {day.isToday && (
                      <span className="absolute inset-0 rounded-md border-2 border-indigo-600 dark:border-sky-400 animate-pulse pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-bold pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center gap-2">
              <span>Ít</span>
              <div className="flex gap-1 items-center">
                <span className="w-3.5 h-3.5 rounded bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600" />
                <span className="w-3.5 h-3.5 rounded bg-emerald-200 border border-emerald-300" />
                <span className="w-3.5 h-3.5 rounded bg-emerald-400 border border-emerald-500" />
                <span className="w-3.5 h-3.5 rounded bg-emerald-600 border border-emerald-700" />
              </div>
              <span>Nhiều</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-indigo-600 bg-sky-100 dark:bg-sky-900 inline-block" />
                <span>Đã điểm danh</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-sky-200 dark:bg-sky-800 text-[9px] flex items-center justify-center">
                  <Snowflake className="w-3 h-3 text-sky-600" />
                </span>
                <span>Đã dùng freeze</span>
              </span>
            </div>
          </div>

        </div>

        {/* Middle: Selected Day Detail Card (lg:col-span-4) */}
        <div className="lg:col-span-6 xl:col-span-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm space-y-4 min-h-[180px] flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white capitalize">
                {selectedDay ? selectedDay.dateStr : 'Chọn một ngày'}
              </h4>

              {selectedDay?.isToday && (
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-300 text-[11px] font-black">
                  Hôm nay
                </span>
              )}

              {selectedDay?.isCheckedIn && (
                <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300 text-[11px] font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500" /> Đã điểm danh
                </span>
              )}

              {selectedDay && (
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1 ml-auto">
                  <Clock className="w-3.5 h-3.5" /> {selectedDay.minutes}p
                </span>
              )}
            </div>

            <div className="pt-2">
              {selectedDay?.activities && selectedDay.activities.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hoạt động trong ngày:</p>
                  <ul className="space-y-1.5">
                    {selectedDay.activities.map((act, idx) => (
                      <li key={idx} className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-xs font-medium text-slate-400 italic">
                  Không có hoạt động nào ngày này
                </p>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-semibold">
            Bấm vào ô màu bất kỳ trên bảng để xem chi tiết lịch học.
          </div>
        </div>

        {/* Right: Summary Panel (lg:col-span-3) */}
        <div className="lg:col-span-12 xl:col-span-3 bg-slate-50/80 dark:bg-slate-800/40 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            TỔNG KẾT 90 NGÀY
          </h4>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Ngày có học
              </span>
              <span className="font-black text-slate-900 dark:text-white">{activeDaysCount} / 90</span>
            </div>

            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-500" /> Thời gian học
              </span>
              <span className="font-black text-slate-900 dark:text-white">{totalMinutes}p</span>
            </div>

            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-2">
                <Rocket className="w-4 h-4 text-orange-500" /> Chuỗi dài nhất
              </span>
              <span className="font-black text-slate-900 dark:text-white">14 ngày</span>
            </div>
          </div>
        </div>

      </div>
    </AppCard>
  );
}
