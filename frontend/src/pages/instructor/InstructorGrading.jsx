import React, { useState } from 'react';
import { MessageSquare, Crown, CheckCircle2, Play, Mic, Send, Clock, Star, Volume2 } from 'lucide-react';

export default function InstructorGrading() {
  const [activeItem, setActiveItem] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState('9.0');
  const [sentSuccess, setSentSuccess] = useState(false);

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      studentName: 'Trần Thu Hà',
      studentEmail: 'thuhapromember@gmail.com',
      badge: 'PRO',
      lessonTitle: 'Ordering Coffee at Starbucks',
      submittedAt: '10 phút trước',
      type: 'Bài ghi âm Shadowing (Bắt chước phát âm)',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/person_speaking.ogg',
      studentNote: 'Dạ nhờ cô sửa giùm em từ macchiato và caramel em đọc thấy chưa được tự nhiên ạ.'
    },
    {
      id: 2,
      studentName: 'Nguyễn Văn Minh',
      studentEmail: 'minhproielts@gmail.com',
      badge: 'PRO',
      lessonTitle: 'IELTS Speaking Part 2 Cue Card Strategy',
      submittedAt: '35 phút trước',
      type: 'Hỏi đáp Ngữ pháp & Phát âm 1-1',
      studentNote: 'Thầy cho em hỏi cụm từ align with core values có dùng được trong Writing Task 2 không ạ?'
    },
    {
      id: 3,
      studentName: 'Lê Hoàng Nam',
      studentEmail: 'nampro123@gmail.com',
      badge: 'PRO',
      lessonTitle: 'Stranger Things Trailer',
      submittedAt: '1 giờ trước',
      type: 'Bài chép chính tả Dictation',
      studentNote: 'Em sai 10 câu này, nhờ thầy giải thích cấu trúc thì quá khứ hoàn thành trong video ạ.'
    }
  ]);

  const selectedStudent = submissions.find(s => s.id === activeItem) || submissions[0];

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setFeedback('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <span>Hỗ trợ 1-1 & Chấm bài Học viên PRO</span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider">
            PRO EXCLUSIVE
          </span>
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-1">
          Lắng nghe file ghi âm bài nói, giải đáp thắc mắc và cho điểm các thành viên mua gói PRO.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Queue List (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 px-2">
            HÀNG ĐỢI XỬ LÝ ({submissions.length})
          </h3>

          <div className="space-y-2">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setActiveItem(sub.id)}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer space-y-1.5 ${
                  sub.id === activeItem
                    ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-600 dark:border-indigo-500 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">{sub.studentName}</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-400 text-amber-950 font-black text-[9px]">
                      {sub.badge}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{sub.submittedAt}</span>
                </div>

                <p className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate">{sub.lessonTitle}</p>
                <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">{sub.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Submission Detail & Feedback Form (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          
          {/* Top Info Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  {selectedStudent.studentName}
                </h2>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-amber-950 font-black text-xs">
                  {selectedStudent.badge} MEMBER
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                Email: {selectedStudent.studentEmail} • Bài: {selectedStudent.lessonTitle}
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-slate-400">
              Gửi {selectedStudent.submittedAt}
            </span>
          </div>

          {/* Student Audio Player Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-indigo-600" />
              <span>Ghi âm bài đọc của Học viên:</span>
            </span>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
              <button className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>

              <div className="flex-1 space-y-1">
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[40%]" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
                  <span>00:14</span>
                  <span>00:35</span>
                </div>
              </div>
            </div>

            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 italic bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800/60">
              " {selectedStudent.studentNote} "
            </p>
          </div>

          {/* Teacher Response Form */}
          <form onSubmit={handleSendFeedback} className="space-y-4">
            {sentSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500 text-white font-black text-xs text-center shadow-md animate-fade-in">
                ✅ Đã gửi lời nhận xét & điểm số trực tiếp cho học viên {selectedStudent.studentName}!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block">
                  Nhận xét & Hướng dẫn chỉnh sửa phát âm
                </label>
                <textarea
                  rows={4}
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Nhập nhận xét chi tiết giúp học viên sửa âm sai..."
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block">
                  Cho điểm (Scale 10)
                </label>
                <input
                  type="text"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-black font-mono text-indigo-600 dark:text-indigo-400 focus:outline-none focus:border-indigo-600 text-center"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-transform active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>GỬI PHẢN HỒI NGHĨA VỤ 1-1</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
