import React, { useState } from 'react';
import { 
  Sparkles, Target, Calendar, BarChart2, TrendingUp, CheckCircle, Clock, 
  Brain, FileText, Mic, Headphones, BookOpen, AlertCircle, Award, ArrowUpRight
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

const priorityTasks = [
  { title: 'IELTS Writing Task 1', skill: 'Writing', priority: 84.5, time: '45 phút', type: 'High Priority', icon: FileText, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' },
  { title: 'Speaking Fluency Practice', skill: 'Speaking', priority: 81.2, time: '30 phút', type: 'High Priority', icon: Mic, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { title: 'Listening Part 3', skill: 'Listening', priority: 65.4, time: '45 phút', type: 'Medium Priority', icon: Headphones, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { title: 'Advanced Collocations', skill: 'Vocabulary', priority: 52.1, time: '20 phút', type: 'Low Priority', icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
];

const schedule = [
  {
    day: 'Thứ 2',
    date: 'Hôm nay',
    tasks: [
      { time: '19:00 - 19:45', title: 'IELTS Listening Practice', type: 'Listening', status: 'completed' },
      { time: '19:45 - 20:30', title: 'Vocabulary Review (Spaced Repetition)', type: 'Vocabulary', status: 'current' },
      { time: '20:30 - 21:00', title: 'Grammar Quiz', type: 'Grammar', status: 'upcoming' },
    ]
  },
  {
    day: 'Thứ 4',
    date: 'Ngày mai',
    tasks: [
      { time: '19:00 - 20:00', title: 'Writing Task 2 (Tăng cường 3h/tuần)', type: 'Writing', status: 'upcoming', highlight: true },
      { time: '20:00 - 21:00', title: 'Speaking Mock Test', type: 'Speaking', status: 'upcoming' },
    ]
  }
];

const recommendedCourses = [
  { title: 'IELTS Writing 6.5+', match: 94, students: '1.2k', rating: 4.9, icon: '📝' },
  { title: 'Speaking Accent Reduction', match: 91, students: '850', rating: 4.8, icon: '🗣️' },
  { title: 'Advanced Grammar in Use', match: 76, students: '2.5k', rating: 4.7, icon: '📚' },
  { title: 'Listening Comprehension', match: 51, students: '3.1k', rating: 4.6, icon: '🎧' },
];

export default function StudyPlan() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-glow" />
        <div className="absolute bottom-0 right-40 -mb-20 w-64 h-64 bg-rose-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-indigo-200 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Intelligent Learning Engine
          </div>
          <h1 className="text-3xl font-black tracking-tight leading-tight">
            Kế hoạch học tập AI cá nhân hóa
          </h1>
          <p className="text-indigo-200 font-medium text-sm leading-relaxed">
            Hệ thống phát hiện kỹ năng <strong>Writing</strong> và <strong>Speaking</strong> của bạn đang là điểm yếu. 
            Lịch học tuần này đã được tự động điều chỉnh <em>(Adaptive Scheduling)</em> tăng thêm 1.5 giờ thực hành Writing để đảm bảo kịp mục tiêu IELTS 6.5.
          </p>
        </div>

        <div className="relative z-10 shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex flex-col gap-3 min-w-[240px]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-indigo-200 font-semibold uppercase tracking-wider">Mục tiêu hiện tại</span>
            <Target className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">IELTS 6.5</div>
          <div className="w-full bg-white/10 rounded-full h-2 mt-1">
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-300 h-full rounded-full w-[65%]" />
          </div>
          <div className="flex items-center justify-between text-xs font-medium text-indigo-200 mt-1">
            <span>Tiến độ: 65%</span>
            <span>Deadline: 01/03/2027</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Radar */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <BarChart2 className="w-5 h-5 text-indigo-500" /> Phân tích Năng lực (Performance)
          </h3>
          
          <div className="flex-1 min-h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="#4f46e5" strokeWidth={2} fill="#6366f1" fillOpacity={0.4} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1 block">Điểm mạnh</span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Vocabulary (91%)<br/>Reading (89%)</p>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-1 block">Điểm yếu</span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Writing (43%)<br/>Speaking (51%)</p>
            </div>
          </div>
        </div>

        {/* Schedule & Priority Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Priority Tasks */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-rose-500" /> Thuật toán Ưu tiên (Priority Algorithm)
              </h3>
              <span className="text-xs text-slate-500 font-medium px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Cập nhật lúc 08:00 AM</span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {priorityTasks.map((task, i) => {
                const Icon = task.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group">
                    <div className={`w-10 h-10 rounded-xl ${task.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${task.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{task.skill}</span>
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-md">Score: {task.priority}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate mb-1">{task.title}</h4>
                      <p className="text-xs text-slate-500">{task.time} · {task.type}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-indigo-500" /> Lịch học thông minh (Adaptive Schedule)
            </h3>
            
            <div className="space-y-6">
              {schedule.map((dayData, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-indigo-100 dark:border-indigo-900/50 space-y-4">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-900" />
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 translate-y-[-5px]">
                    {dayData.day} <span className="text-xs font-normal text-slate-500">{dayData.date}</span>
                  </h4>
                  
                  <div className="space-y-3 mt-2">
                    {dayData.tasks.map((task, j) => (
                      <div key={j} className={`flex items-center justify-between p-3 rounded-2xl border ${
                        task.status === 'completed' ? 'bg-slate-50 dark:bg-slate-800/50 border-transparent opacity-60' :
                        task.highlight ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 ring-2 ring-indigo-500/20' :
                        'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                      }`}>
                        <div className="flex items-center gap-3">
                          {task.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : task.status === 'current' ? (
                            <div className="w-5 h-5 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                            </div>
                          ) : (
                            <Clock className="w-5 h-5 text-slate-400" />
                          )}
                          <div>
                            <p className={`text-xs font-extrabold ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                              {task.title}
                            </p>
                            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{task.time}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {task.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Courses (Collaborative Filtering) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" /> Course Recommendation System
            </h3>
            <p className="text-xs text-slate-500 font-medium">Dựa trên Collaborative Filtering & Phân tích điểm yếu</p>
          </div>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            Xem tất cả
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedCourses.map((course, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform cursor-pointer relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2">
                <div className={`text-[10px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1 ${
                  course.match > 90 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400'
                }`}>
                  {course.match}% Match
                </div>
              </div>
              <div className="text-3xl mb-3">{course.icon}</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 line-clamp-2">{course.title}</h4>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Award className="w-3 h-3 text-amber-500" /> {course.rating}</span>
                <span>•</span>
                <span>{course.students} học viên</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
