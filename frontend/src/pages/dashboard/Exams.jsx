import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ClipboardList, Clock, Award, CheckCircle2, FileText, Sparkles, 
  BookOpen, ChevronRight, Headphones, ArrowRight, Trophy, TrendingUp,
  RotateCcw, Eye, ShieldCheck, Crown, Users, GraduationCap
} from 'lucide-react';

export default function Exams() {
  const [searchParams] = useSearchParams();
  const examType = searchParams.get('type') || 'toeic'; // toeic | ielts
  
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const isIelts = examType === 'ielts';

  const toeicCollections = [
    {
      id: 'toeic-vol-1',
      title: 'Bộ đề EnglishHub TOEIC Practice Vol. 1',
      tags: ['EnglishHub', '2026'],
      testsCount: 10,
      attempts: '55,751',
      iconColor: 'bg-sky-500',
      isPro: false
    },
    {
      id: 'toeic-2026',
      title: 'Bộ đề TOEIC 2026',
      tags: ['TOEIC', '2026'],
      testsCount: 10,
      attempts: '139,888',
      iconColor: 'bg-amber-500',
      isPro: false
    },
    {
      id: 'toeic-2024',
      title: 'Bộ đề TOEIC 2024',
      tags: ['TOEIC', '2024'],
      testsCount: 10,
      attempts: '19,986',
      iconColor: 'bg-purple-600',
      isPro: false
    },
    {
      id: 'toeic-2023',
      title: 'Bộ đề TOEIC 2023',
      tags: ['TOEIC', '2023'],
      testsCount: 10,
      attempts: '19,881',
      iconColor: 'bg-blue-600',
      isPro: false
    }
  ];

  const ieltsCollections = [
    {
      id: 'cam-20',
      title: 'CAM 20',
      tags: ['Cambridge', '20'],
      testsCount: 8,
      attempts: '20,820',
      iconColor: 'bg-rose-500',
      isPro: false
    },
    {
      id: 'vol-9',
      title: 'VOL 9',
      tags: ['Vol', '9'],
      testsCount: 18,
      attempts: '22,754',
      iconColor: 'bg-purple-600',
      isPro: false
    },
    {
      id: 'cam-19',
      title: 'CAM 19',
      tags: ['Cambridge', '19'],
      testsCount: 8,
      attempts: '3,550',
      iconColor: 'bg-sky-500',
      isPro: false
    },
    {
      id: 'cam-18',
      title: 'CAM 18',
      tags: ['Cambridge', '18'],
      testsCount: 8,
      attempts: '2,007',
      iconColor: 'bg-indigo-600',
      isPro: false
    },
    {
      id: 'cam-17',
      title: 'CAM 17',
      tags: ['Cambridge', '17'],
      testsCount: 8,
      attempts: '1,860',
      iconColor: 'bg-rose-500',
      isPro: false
    },
    {
      id: 'cam-16',
      title: 'CAM 16',
      tags: ['Cambridge', '16'],
      testsCount: 8,
      attempts: '1,813',
      iconColor: 'bg-amber-500',
      isPro: false
    },
    {
      id: 'cam-15',
      title: 'CAM 15',
      tags: ['Cambridge', '15'],
      testsCount: 8,
      attempts: '3,600',
      iconColor: 'bg-emerald-500',
      isPro: false
    },
    {
      id: 'vol-8',
      title: 'VOL 8',
      tags: ['Vol', '8'],
      testsCount: 20,
      attempts: '7,752',
      iconColor: 'bg-sky-500',
      isPro: false
    },
    {
      id: 'vol-7',
      title: 'VOL 7',
      tags: ['Vol', '7'],
      testsCount: 20,
      attempts: '6,003',
      iconColor: 'bg-indigo-600',
      isPro: false
    },
    {
      id: 'vol-6',
      title: 'VOL 6',
      tags: ['Vol', '6'],
      testsCount: 19,
      attempts: '4,143',
      iconColor: 'bg-rose-500',
      isPro: false
    }
  ];

  const currentCollections = isIelts ? ieltsCollections : toeicCollections;

  const sampleQuestions = [
    {
      id: 1,
      text: 'Question 1: What is the primary focus of the announcement regarding the new company policy?',
      options: [
        'A. Revision of flexible working hours for remote staff',
        'B. Relocation of the corporate headquarters to Chicago',
        'C. Implementation of mandatory online safety training',
        'D. Launching a new customer referral reward program'
      ],
      correct: 'A'
    },
    {
      id: 2,
      text: 'Question 2: According to the passage, when will the quarterly financial report be finalized?',
      options: [
        'A. At the end of next month',
        'B. Next Friday before noon',
        'C. Prior to the annual shareholders meeting',
        'D. Immediately after the audit team completes verification'
      ],
      correct: 'B'
    }
  ];

  const handleOptionSelect = (qId, char) => {
    setAnswers({ ...answers, [qId]: char });
  };

  const handleSubmitExam = () => {
    setSubmitted(true);
    let correctCount = 0;
    sampleQuestions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount += 1;
    });

    setResult({
      correct: correctCount,
      total: sampleQuestions.length,
      toeicScore: correctCount === 2 ? 890 : correctCount === 1 ? 650 : 450,
      bandScore: correctCount === 2 ? '8.0' : correctCount === 1 ? '6.5' : '5.0'
    });
  };

  return (
    <div className="w-full min-h-screen pb-12">
      {selectedExam ? (
        /* ================= ACTIVE EXAM SIMULATOR ROOM ================= */
        <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-6 animate-fade-in">

          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setSelectedExam(null); setSubmitted(false); }}
              className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-indigo-600 font-extrabold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              ← Quay lại danh sách bộ đề
            </button>

            <span className="text-xs font-black text-slate-900 dark:text-white px-3 py-1 bg-indigo-50 dark:bg-indigo-950 rounded-xl border border-indigo-200 dark:border-indigo-800">
              {selectedExam.title}
            </span>
          </div>

          {/* Exam Room Header Banner */}
          <div className="bg-[#1E2540] text-white p-6 rounded-3xl border-2 border-indigo-900/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-400 block mb-1">
                PHÒNG THI THỬ TRỰC TUYẾN
              </span>
              <h2 className="text-xl font-black text-white">{selectedExam.title}</h2>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-slate-800/90 border border-slate-700 font-mono text-amber-300 font-extrabold text-sm flex items-center gap-2 shadow-inner">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>119:45 CÒN LẠI</span>
            </div>
          </div>

          {/* Questions Container */}
          <div className="space-y-5">
            {sampleQuestions.map((q) => (
              <div key={q.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base leading-relaxed">
                  {q.text}
                </h4>

                <div className="space-y-2.5">
                  {q.options.map((opt, oIdx) => {
                    const char = opt.charAt(0);
                    const isSelected = answers[q.id] === char;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleOptionSelect(q.id, char)}
                        className={`w-full text-left p-4 rounded-2xl border-2 text-xs font-semibold transition-all ${
                          isSelected
                            ? 'border-[#1E2540] dark:border-indigo-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          {!submitted ? (
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setSelectedExam(null)}
                className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs"
              >
                Bỏ dở bài thi
              </button>

              <button
                onClick={handleSubmitExam}
                className="px-8 py-3.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-98"
              >
                NỘP BÀI THI & XEM KẾT QUẢ ✨
              </button>
            </div>
          ) : (
            /* Result Report Card */
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-emerald-500/50 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
                🎉
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Kết Quả Thi Thử {isIelts ? 'IELTS' : 'TOEIC'}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Chúc mừng bạn đã hoàn thành bài thi thử thành công!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 font-bold block mb-1">
                    {isIelts ? 'Overall Band' : 'Điểm TOEIC ước tính'}
                  </span>
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    {isIelts ? `Band ${result.bandScore}` : `${result.toeicScore} / 990`}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 font-bold block mb-1">Số câu đúng</span>
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                    {result.correct} / {result.total}
                  </span>
                </div>
              </div>

              <button
                onClick={() => { setSelectedExam(null); setSubmitted(false); }}
                className="px-7 py-3 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
              >
                Quay về danh sách bộ đề
              </button>
            </div>
          )}

        </div>
      ) : (
        /* ================= MAIN EXAM COLLECTIONS DASHBOARD VIEW ================= */
        <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4">

          {/* 1. HEADER TITLE & TOP RIGHT ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
            <div className="space-y-1.5 max-w-3xl">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Luyện thi {isIelts ? 'IELTS' : 'TOEIC'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                {isIelts
                  ? 'Luyện thi IELTS online miễn phí. Rèn kỹ năng Nghe và Đọc theo đúng format đề thi thật, chấm band 1.0–9.0 và theo dõi tiến độ để giúp bạn đạt band điểm mục tiêu.'
                  : 'Luyện thi TOEIC online miễn phí với các đề thi thử đầy đủ theo chuẩn TOEIC. Mỗi đề gồm đủ 7 phần Nghe và Đọc, tự động chấm điểm, kèm giải thích đáp án chi tiết và theo dõi tiến độ để giúp bạn nâng điểm nhanh hơn.'
                }
              </p>
            </div>

            {/* Action Buttons: Lịch sử làm bài | Phân tích kết quả */}
            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <button className="px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm shadow-sky-500/20 transition-all active:scale-98">
                <Clock className="w-4 h-4" />
                <span>Lịch sử làm bài</span>
              </button>

              <button className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm shadow-emerald-500/20 transition-all active:scale-98">
                <TrendingUp className="w-4 h-4" />
                <span>Phân tích kết quả</span>
              </button>
            </div>
          </div>

          {/* 2. EXAM COLLECTIONS GRID (2 COLUMNS GRID MATCHING SCREENSHOT) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {currentCollections.map((col) => (
              <div
                key={col.id}
                onClick={() => setSelectedExam(col)}
                className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <h3 className="font-black text-base text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {col.title}
                    </h3>

                    {/* Sub Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {col.tags.map((tg, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[11px]">
                          {tg}
                        </span>
                      ))}
                    </div>

                    {/* Info: 📖 8 đề · 👥 20,820 lượt làm */}
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" /> {col.testsCount} đề
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> {col.attempts} lượt làm
                      </span>
                    </div>
                  </div>

                  {/* Graduation Cap / Book Icon Box Right */}
                  <div className={`w-12 h-12 rounded-2xl ${col.iconColor || 'bg-sky-500'} text-white flex items-center justify-center shrink-0 shadow-md`}>
                    {isIelts ? <GraduationCap className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                  </div>
                </div>

                {/* Link bottom left: Vào luyện ➔ */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 flex items-center gap-1 transition-colors">
                    Vào luyện <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 3. GỢI Ý HỌC THÊM CONTAINER BOX */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">

            {/* Header Subtitle Banner */}
            <div className="space-y-1">
              <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                GỢI Ý HỌC THÊM
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
                🚀 {isIelts ? 'Đạt band IELTS mục tiêu nhanh hơn nhờ luyện từ vựng và nghe mỗi ngày. Giữ chuỗi học của bạn nhé!' : '89% học viên tăng hơn 100 điểm TOEIC chỉ sau 4 tuần luyện từ vựng và nghe mỗi ngày. Giữ chuỗi học của bạn nhé!'}
              </p>
            </div>

            {/* 2 Sub-Columns inside container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Left Sub-Column: Từ vựng */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>Từ vựng {isIelts ? 'IELTS' : 'TOEIC'}</span>
                  </h4>

                  <Link to="/vocabulary" className="text-[11px] font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                    Xem tất cả &gt;
                  </Link>
                </div>

                <div className="space-y-2">
                  {isIelts ? (
                    <>
                      <Link
                        to="/vocabulary"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            📘
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                              600 Từ Vựng IELTS Cơ Bản
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">599 Từ</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>

                      <Link
                        to="/vocabulary"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            📘
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                              Từ vựng IELTS Band 4-5
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">2086 Từ</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>

                      <Link
                        to="/vocabulary"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            👑
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                              <span>Từ vựng IELTS Band 6-7</span>
                              <span className="px-1.5 py-0.2 rounded bg-indigo-900 text-amber-300 font-black text-[9px]">PRO</span>
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">2753 Từ</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>

                      <Link
                        to="/vocabulary"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            👑
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                              <span>Từ vựng IELTS Band 8-9</span>
                              <span className="px-1.5 py-0.2 rounded bg-indigo-900 text-amber-300 font-black text-[9px]">PRO</span>
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">1604 Từ</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/vocabulary"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            📘
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                              600 từ vựng thiết yếu cho TOEIC
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">622 Từ</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>

                      <Link
                        to="/vocabulary"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            👑
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                              <span>Từ vựng ETS TOEIC</span>
                              <span className="px-1.5 py-0.2 rounded bg-indigo-900 text-amber-300 font-black text-[9px]">PRO</span>
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">1600 Từ</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Right Sub-Column: Luyện nghe */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Headphones className="w-4 h-4 text-emerald-500" />
                    <span>Luyện nghe {isIelts ? 'IELTS' : 'TOEIC'}</span>
                  </h4>

                  <Link to="/listening" className="text-[11px] font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                    Xem tất cả &gt;
                  </Link>
                </div>

                <div className="space-y-2">
                  {isIelts ? (
                    <>
                      <Link
                        to="/listening"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            🎧
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                              Cam 20 Test 1 Part 1
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">B2</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>

                      <Link
                        to="/listening"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#1E2540] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            🎧
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                              Cam 20 Test 1 Part 2
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">B1</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>

                      <Link
                        to="/listening"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            👑
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                              <span>Cam 20 Test 1 Part 3</span>
                              <span className="px-1.5 py-0.2 rounded bg-indigo-900 text-amber-300 font-black text-[9px]">PRO</span>
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">B1</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>

                      <Link
                        to="/listening"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#1E2540] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            👑
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                              <span>Cam 20 Test 1 Part 4</span>
                              <span className="px-1.5 py-0.2 rounded bg-indigo-900 text-amber-300 font-black text-[9px]">PRO</span>
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">B1</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/listening"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            🎧
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                              First-Class Upgrade Perks
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">B1</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>

                      <Link
                        to="/listening"
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            🎧
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                              Sarah's Sales Success: MVP Debate
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">B1</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </Link>
                    </>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}
