import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  ClipboardList, Clock, Award, CheckCircle2, FileText, Sparkles, 
  BookOpen, ChevronRight, Headphones, ArrowRight, Trophy, TrendingUp,
  RotateCcw, Eye, ShieldCheck, Users, GraduationCap, Loader2, Volume2, 
  AlertCircle, RefreshCw, PenTool, Mic, Square, Play
} from 'lucide-react';
import { fetchToeicExamData, fetchIeltsExamData } from '../../api/examService';

export default function Exams() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const examType = searchParams.get('type') || 'toeic'; // toeic | ielts
  const isIelts = examType === 'ielts';

  const [selectedExam, setSelectedExam] = useState(null);
  const [loadingExam, setLoadingExam] = useState(false);
  const [examApiData, setExamApiData] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Trạng thái bài làm
  const [activeTab, setActiveTab] = useState(isIelts ? 'reading' : 'part5');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [writingEssay, setWritingEssay] = useState('');
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showTranscripts, setShowTranscripts] = useState(false);

  // Danh sách bộ đề
  const toeicCollections = [
    {
      id: 'toeic-live-api',
      title: 'Bộ đề thi thử TOEIC chuẩn ETS (Live API)',
      tags: ['Live API', 'ETS 2026'],
      testsCount: 10,
      attempts: '139,888',
      iconColor: 'bg-amber-500',
    },
    {
      id: 'toeic-vol-1',
      title: 'Bộ đề EnglishHub TOEIC Practice Vol. 1',
      tags: ['EnglishHub', '2026'],
      testsCount: 10,
      attempts: '55,751',
      iconColor: 'bg-sky-500',
    },
    {
      id: 'toeic-2024',
      title: 'Bộ đề TOEIC 2024',
      tags: ['TOEIC', '2024'],
      testsCount: 10,
      attempts: '19,986',
      iconColor: 'bg-purple-600',
    },
    {
      id: 'toeic-2023',
      title: 'Bộ đề TOEIC 2023',
      tags: ['TOEIC', '2023'],
      testsCount: 10,
      attempts: '19,881',
      iconColor: 'bg-blue-600',
    }
  ];

  const ieltsCollections = [
    {
      id: 'ielts-full-4skills',
      title: 'IELTS Academic Full Test: 4 Kỹ Năng (Nghe - Đọc - Viết - Nói)',
      tags: ['Live API', '4 Kỹ Năng', 'Band 8.0'],
      testsCount: 4,
      attempts: '38,920',
      iconColor: 'bg-rose-500',
      band: 8
    },
    {
      id: 'ielts-cam-band8',
      title: 'IELTS Academic Reading & Writing (Band 8.0 Live API)',
      tags: ['Live API', 'Academic Reading', 'Band 8.0'],
      testsCount: 4,
      attempts: '24,820',
      iconColor: 'bg-indigo-600',
      band: 8
    },
    {
      id: 'ielts-cam-band7',
      title: 'IELTS Academic Reading Practice (Band 7.0 Live API)',
      tags: ['Live API', 'Academic Reading', 'Band 7.0'],
      testsCount: 4,
      attempts: '32,150',
      iconColor: 'bg-purple-600',
      band: 7
    },
    {
      id: 'cam-20',
      title: 'CAM 20 Academic Test Simulator',
      tags: ['Cambridge', '20'],
      testsCount: 8,
      attempts: '20,820',
      iconColor: 'bg-rose-500',
      band: 8
    }
  ];

  const currentCollections = isIelts ? ieltsCollections : toeicCollections;

  // Dừng phát âm thanh khi đổi tab hoặc đóng đề
  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  // Phát âm thanh văn bản bài nghe IELTS (Text-to-Speech)
  const playListeningText = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ Text-to-Speech.');
      return;
    }
    if (isPlayingAudio) {
      stopAudio();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  // Tải dữ liệu thi thật từ API khi chọn đề
  const handleSelectExam = async (exam) => {
    setSelectedExam(exam);
    setLoadingExam(true);
    setApiError(null);
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setShowTranscripts(false);
    stopAudio();
    setTimeLeft(isIelts ? 60 * 60 : 45 * 60);

    try {
      if (isIelts) {
        const band = exam.band || 8;
        const data = await fetchIeltsExamData(band);
        setExamApiData(data);
        setActiveTab('reading');
      } else {
        const data = await fetchToeicExamData();
        setExamApiData(data);
        setActiveTab('part5');
      }
    } catch (err) {
      console.error('Lỗi tải dữ liệu thi từ API:', err);
      setApiError('Không thể kết nối đến máy chủ đề thi. Vui lòng thử lại.');
    } finally {
      setLoadingExam(false);
    }
  };

  // Đồng hồ đếm ngược
  useEffect(() => {
    if (!selectedExam || submitted || loadingExam) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedExam, submitted, loadingExam]);

  // Clean up audio khi unmount
  useEffect(() => {
    return () => stopAudio();
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const handleOptionSelect = (qId, val) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  // Nộp bài thi & tính điểm
  const handleSubmitExam = () => {
    stopAudio();
    setSubmitted(true);
    setShowTranscripts(true);

    if (isIelts) {
      // Chấm điểm IELTS Reading + Listening
      const readingQ = (examApiData?.passages || []).flatMap((p) => p.questions);
      const listeningQ = (examApiData?.listeningSections || []).flatMap((s) => s.questions);
      const allQ = [...readingQ, ...listeningQ];

      let correct = 0;
      allQ.forEach((q) => {
        const userAns = (answers[q.id] || '').trim().toLowerCase();
        const isMatch = (q.acceptedAnswers || [q.correct || q.answer]).some(
          (ans) => (ans || '').toString().trim().toLowerCase() === userAns
        );
        if (isMatch) correct += 1;
      });

      const total = allQ.length || 1;
      const ratio = correct / total;
      let band = '5.5';
      if (ratio >= 0.88) band = '8.5';
      else if (ratio >= 0.8) band = '8.0';
      else if (ratio >= 0.72) band = '7.5';
      else if (ratio >= 0.65) band = '7.0';
      else if (ratio >= 0.55) band = '6.5';
      else if (ratio >= 0.45) band = '6.0';

      setResult({
        correct,
        total,
        bandScore: band,
      });
    } else {
      // Chấm điểm TOEIC
      const allQ = [
        ...(examApiData?.part5Questions || []),
        ...(examApiData?.part7Groups?.flatMap((g) => g.questions) || []),
        ...(examApiData?.listeningQuestions || [])
      ];

      let correct = 0;
      allQ.forEach((q) => {
        const userAns = (answers[q.id] || '').trim().toUpperCase();
        const expected = (q.correct || '').trim().toUpperCase();
        if (userAns === expected) correct += 1;
      });

      const total = allQ.length || 1;
      const scaledScore = Math.min(990, Math.round((correct / total) * 990));

      setResult({
        correct,
        total,
        toeicScore: Math.max(250, scaledScore),
      });
    }
  };

  return (
    <div className="w-full min-h-screen pb-12">
      {selectedExam ? (
        /* ================= ACTIVE EXAM SIMULATOR ROOM ================= */
        <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full space-y-6 animate-fade-in">

          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={() => { setSelectedExam(null); setSubmitted(false); setExamApiData(null); stopAudio(); }}
              className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-indigo-600 font-extrabold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              ← Quay lại danh sách bộ đề
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Dữ liệu trực tiếp từ API
              </span>
              <span className="text-xs font-black text-slate-900 dark:text-white px-3 py-1 bg-indigo-50 dark:bg-indigo-950 rounded-xl border border-indigo-200 dark:border-indigo-800">
                {selectedExam.title}
              </span>
            </div>
          </div>

          {/* Exam Header Banner */}
          <div className="bg-[#1E2540] text-white p-6 rounded-3xl border-2 border-indigo-900/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-400 block mb-1">
                PHÒNG THI THỬ TRỰC TUYẾN CHUẨN QUỐC TẾ
              </span>
              <h2 className="text-xl font-black text-white">
                {examApiData?.title || selectedExam.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-slate-800/90 border border-slate-700 font-mono text-amber-300 font-extrabold text-sm flex items-center gap-2 shadow-inner">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{submitted ? 'ĐÃ KẾT THÚC' : `${formatTime(timeLeft)} CÒN LẠI`}</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loadingExam && (
            <div className="p-16 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
                Đang móc dữ liệu đề thi trực tiếp từ API GitHub / Open Dataset...
              </p>
              <p className="text-xs text-slate-400">Vui lòng chờ trong giây lát.</p>
            </div>
          )}

          {/* Error State */}
          {apiError && (
            <div className="p-8 bg-red-50 dark:bg-red-950/50 rounded-3xl border-2 border-red-300 dark:border-red-800 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              <p className="text-sm font-extrabold text-red-700 dark:text-red-300">{apiError}</p>
              <button
                onClick={() => handleSelectExam(selectedExam)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
              >
                Thử kết nối lại
              </button>
            </div>
          )}

          {/* Loaded Exam Content */}
          {!loadingExam && examApiData && (
            <>
              {/* SKILL NAVIGATION TABS */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap">
                {isIelts ? (
                  <>
                    <button
                      onClick={() => { setActiveTab('reading'); stopAudio(); }}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                        activeTab === 'reading'
                          ? 'bg-rose-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Reading ({examApiData.passages?.length || 0} bài đọc)</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('listening'); stopAudio(); }}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                        activeTab === 'listening'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Headphones className="w-4 h-4" />
                      <span>Listening ({examApiData.listeningSections?.length || 0} Sections)</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('writing'); stopAudio(); }}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                        activeTab === 'writing'
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <PenTool className="w-4 h-4" />
                      <span>Writing ({examApiData.writingTasks?.length || 0} Tasks)</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('speaking'); stopAudio(); }}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                        activeTab === 'speaking'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Mic className="w-4 h-4" />
                      <span>Speaking (Part 1, 2, 3)</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setActiveTab('part5')}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                        activeTab === 'part5'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <ClipboardList className="w-4 h-4" />
                      <span>Part 5: Ngữ pháp & Từ vựng ({examApiData.part5Questions?.length || 0} câu)</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('part7')}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                        activeTab === 'part7'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Part 7: Đọc hiểu văn bản ({examApiData.part7Groups?.length || 0} đoạn)</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('listening')}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                        activeTab === 'listening'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Headphones className="w-4 h-4" />
                      <span>Part 1: Nghe & Audio ({examApiData.listeningQuestions?.length || 0} câu)</span>
                    </button>
                  </>
                )}
              </div>

              {/* IELTS TAB 1: READING PASSAGES */}
              {isIelts && activeTab === 'reading' && (
                <div className="space-y-8">
                  {examApiData.passages?.map((passage, pIdx) => (
                    <div key={passage.id || pIdx} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Left: Passage Content */}
                      <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-h-[750px] overflow-y-auto custom-scrollbar">
                        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-black text-[10px] uppercase">
                          IELTS Academic Reading • Passage {pIdx + 1}
                        </span>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                          {passage.title}
                        </h3>
                        <div className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
                          {passage.content}
                        </div>
                      </div>

                      {/* Right: Question sets */}
                      <div className="lg:col-span-6 space-y-4">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                          <span>Danh sách câu hỏi Passage {pIdx + 1} ({passage.questions.length} câu)</span>
                        </h4>

                        {passage.questions.map((q, qIdx) => {
                          const isSelected = answers[q.id];
                          const isCorrect = submitted && (q.acceptedAnswers || [q.correct]).some(
                            (ans) => ans.toString().trim().toLowerCase() === (isSelected || '').trim().toLowerCase()
                          );

                          return (
                            <div
                              key={q.id || qIdx}
                              className={`p-5 rounded-3xl border-2 space-y-3 transition-colors ${
                                submitted
                                  ? isCorrect
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500'
                                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                  Câu {q.order || qIdx + 1} • {q.type}
                                </span>
                                {submitted && (
                                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                    isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                                  }`}>
                                    {isCorrect ? 'ĐÚNG' : 'SAI'}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                                {q.question}
                              </p>

                              {/* Options */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {q.options.map((opt, oIdx) => {
                                  const selectedThis = answers[q.id] === opt;
                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleOptionSelect(q.id, opt)}
                                      className={`p-2.5 rounded-xl border-2 text-xs font-black transition-all text-center ${
                                        selectedThis
                                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300'
                                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {submitted && (
                                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 space-y-1">
                                  <span className="font-black text-indigo-600 dark:text-indigo-400 block">
                                    Đáp án chuẩn: {q.correct}
                                  </span>
                                  <p>{q.explanation}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* IELTS TAB 2: LISTENING SECTIONS */}
              {isIelts && activeTab === 'listening' && (
                <div className="space-y-8">
                  {examApiData.listeningSections?.map((sec) => (
                    <div key={sec.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-[10px] font-black uppercase">
                            Section {sec.number} • 10 câu hỏi
                          </span>
                          <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                            {sec.title}
                          </h3>
                        </div>

                        {/* Audio Controller */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => playListeningText(sec.transcript)}
                            className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all shadow-sm ${
                              isPlayingAudio
                                ? 'bg-rose-600 text-white animate-pulse'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                          >
                            {isPlayingAudio ? (
                              <>
                                <Square className="w-3.5 h-3.5" />
                                <span>Dừng phát Audio</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" />
                                <span>Phát Audio (Text-to-Speech)</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => setShowTranscripts(!showTranscripts)}
                            className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black text-slate-700 dark:text-slate-300"
                          >
                            {showTranscripts ? 'Ẩn Transcript' : 'Xem Transcript'}
                          </button>
                        </div>
                      </div>

                      {/* Transcript Box */}
                      {showTranscripts && (
                        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-medium text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto custom-scrollbar">
                          <strong>Kịch bản âm thanh (Audio Transcript):</strong>
                          <p className="mt-2">{sec.transcript}</p>
                        </div>
                      )}

                      {/* Question list for section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sec.questions.map((q) => {
                          const isSelected = answers[q.id];
                          const isCorrect = submitted && (q.acceptedAnswers || [q.answer]).some(
                            (ans) => (ans || '').toString().trim().toLowerCase() === (isSelected || '').trim().toLowerCase()
                          );

                          return (
                            <div
                              key={q.id}
                              className={`p-4 rounded-2xl border-2 space-y-2.5 ${
                                submitted
                                  ? isCorrect
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500'
                                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500'
                                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-400">Câu {q.order}</span>
                                {submitted && (
                                  <span className={`text-[9px] font-black px-2 py-0.2 rounded-full ${
                                    isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                                  }`}>
                                    {isCorrect ? 'ĐÚNG' : 'SAI'}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs font-bold text-slate-900 dark:text-white">{q.text}</p>

                              <input
                                type="text"
                                disabled={submitted}
                                value={answers[q.id] || ''}
                                onChange={(e) => handleOptionSelect(q.id, e.target.value)}
                                placeholder="Nhập đáp án của bạn..."
                                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                              />

                              {submitted && (
                                <p className="text-[11px] font-black text-indigo-600 dark:text-indigo-400">
                                  Đáp án chuẩn: {q.answer}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* IELTS TAB 3: WRITING TASKS */}
              {isIelts && activeTab === 'writing' && (
                <div className="space-y-6">
                  {examApiData.writingTasks?.map((task, tIdx) => (
                    <div key={task.id || tIdx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 text-xs font-black uppercase">
                          {task.title || `Task ${tIdx + 1}`} • Gợi ý: {task.suggested_time}
                        </span>
                        <span className="text-xs font-black text-slate-400">
                          Tối thiểu: {task.min_words} từ
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                        {task.prompt}
                      </div>

                      {task.figure_description && (
                        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-medium text-amber-900 dark:text-amber-200">
                          <strong>Mô tả số liệu biểu đồ:</strong> {task.figure_description}
                        </div>
                      )}

                      {/* Writing Editor */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                            Bài làm của bạn:
                          </label>
                          <span className="text-xs font-mono font-black text-indigo-600">
                            {writingEssay.trim() ? writingEssay.trim().split(/\s+/).length : 0} từ
                          </span>
                        </div>
                        <textarea
                          rows={10}
                          value={writingEssay}
                          onChange={(e) => setWritingEssay(e.target.value)}
                          placeholder="Bắt đầu viết bài luận của bạn tại đây theo chuẩn format Academic..."
                          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* IELTS TAB 4: SPEAKING SIMULATOR */}
              {isIelts && activeTab === 'speaking' && examApiData.speaking && (
                <div className="space-y-6">
                  {/* Part 1 */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-black uppercase">
                      {examApiData.speaking.part1.title}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      Chủ đề: {examApiData.speaking.part1.topic}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500">
                      💡 <em>Lời khuyên:</em> {examApiData.speaking.part1.sampleTips}
                    </p>
                    <div className="space-y-2 pt-2">
                      {examApiData.speaking.part1.questions.map((q, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                          {idx + 1}. {q}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part 2 Cue Card */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-black uppercase">
                      {examApiData.speaking.part2.title}
                    </span>
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                      {examApiData.speaking.part2.cueCard}
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                      <span className="text-xs font-black text-indigo-600 uppercase">
                        Bài mẫu trả lời (Sample Answer Band 8.5):
                      </span>
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
                        "{examApiData.speaking.part2.sampleAnswer}"
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-black uppercase text-slate-400">
                        Từ vựng điểm cao (Key Vocabulary):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {examApiData.speaking.part2.keyVocabulary?.map((v, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs">
                            <strong className="text-indigo-600 block">{v.word}</strong>
                            <span className="text-slate-500 text-[11px]">{v.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Part 3 Discussion */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 text-xs font-black uppercase">
                      {examApiData.speaking.part3.title}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      Chủ đề thảo luận chuyên sâu: {examApiData.speaking.part3.topic}
                    </h4>
                    <div className="space-y-2 pt-2">
                      {examApiData.speaking.part3.questions.map((q, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                          {idx + 1}. {q}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TOEIC TAB 1: PART 5 INCOMPLETE SENTENCES */}
              {!isIelts && activeTab === 'part5' && (
                <div className="space-y-4">
                  <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800 text-xs font-bold text-sky-800 dark:text-sky-300">
                    📖 <strong>Part 5 — Incomplete Sentences:</strong> Chọn một đáp án thích hợp nhất trong 4 lựa chọn (A, B, C, D) để hoàn thành câu.
                  </div>

                  {examApiData.part5Questions?.map((q, idx) => {
                    const isSelected = answers[q.id];
                    const isCorrect = submitted && isSelected === q.correct;

                    return (
                      <div
                        key={q.id || idx}
                        className={`p-6 rounded-3xl border-2 space-y-4 transition-colors ${
                          submitted
                            ? isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500'
                              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-slate-400">
                            CÂU {idx + 101}
                          </span>
                          {submitted && (
                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                              isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                            }`}>
                              {isCorrect ? 'CHÍNH XÁC' : 'CHƯA ĐÚNG'}
                            </span>
                          )}
                        </div>

                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-relaxed">
                          {q.question}
                        </h4>

                        {/* 4 Choices */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.options.map((opt, oIdx) => {
                            const letter = opt.replace(/[()]/g, '').trim().charAt(0);
                            const selectedThis = answers[q.id] === letter;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleOptionSelect(q.id, letter)}
                                className={`text-left p-3.5 rounded-2xl border-2 text-xs font-bold transition-all ${
                                  selectedThis
                                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300'
                                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        {submitted && (
                          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 space-y-1">
                            <span className="font-black text-indigo-600 dark:text-indigo-400 block">
                              Đáp án đúng: {q.correctFull || q.correct}
                            </span>
                            <div
                              dangerouslySetInnerHTML={{ __html: q.explanation }}
                              className="text-xs leading-relaxed"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TOEIC TAB 2: PART 7 READING COMPREHENSION */}
              {!isIelts && activeTab === 'part7' && (
                <div className="space-y-8">
                  {examApiData.part7Groups?.map((group, gIdx) => (
                    <div key={group.id || gIdx} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Left: Passage */}
                      <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3 max-h-[650px] overflow-y-auto custom-scrollbar">
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-black text-[10px] uppercase">
                          TOEIC Part 7 • Đoạn văn {gIdx + 1}
                        </span>
                        <div
                          dangerouslySetInnerHTML={{ __html: group.passage }}
                          className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line"
                        />
                      </div>

                      {/* Right: Child Questions */}
                      <div className="lg:col-span-6 space-y-4">
                        {group.questions.map((q, qIdx) => {
                          const isSelected = answers[q.id];
                          const isCorrect = submitted && isSelected === q.correct;
                          return (
                            <div
                              key={q.id || qIdx}
                              className={`p-5 rounded-3xl border-2 space-y-3 ${
                                submitted
                                  ? isCorrect
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500'
                                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                              }`}
                            >
                              <h5 className="font-extrabold text-xs text-slate-900 dark:text-white">
                                {q.question}
                              </h5>

                              <div className="space-y-2">
                                {q.options.map((opt, oIdx) => {
                                  const letter = opt.replace(/[()]/g, '').trim().charAt(0);
                                  const selectedThis = answers[q.id] === letter;
                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleOptionSelect(q.id, letter)}
                                      className={`w-full text-left p-3 rounded-xl border text-xs font-semibold ${
                                        selectedThis
                                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold'
                                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {submitted && (
                                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
                                  <span className="font-black text-indigo-600">Đáp án: {q.correctFull}</span>
                                  <div dangerouslySetInnerHTML={{ __html: q.explanation }} className="mt-1" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TOEIC TAB 3: PART 1 LISTENING WITH AUDIO */}
              {!isIelts && activeTab === 'listening' && (
                <div className="space-y-6">
                  {examApiData.listeningQuestions?.map((q, idx) => {
                    const isSelected = answers[q.id];
                    const isCorrect = submitted && isSelected === q.correct;

                    return (
                      <div key={q.id || idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-xs font-black uppercase">
                            TOEIC Listening Part 1 • Câu {idx + 1}
                          </span>
                          {submitted && (
                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                              isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                            }`}>
                              {isCorrect ? 'CHÍNH XÁC' : 'CHƯA ĐÚNG'}
                            </span>
                          )}
                        </div>

                        {/* Audio Player */}
                        {q.soundUrl && (
                          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center gap-3">
                            <Volume2 className="w-5 h-5 text-indigo-600 shrink-0" />
                            <audio controls src={q.soundUrl} className="w-full h-8" />
                          </div>
                        )}

                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{q.question}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oIdx) => {
                            const letter = opt.replace(/[()]/g, '').trim().charAt(0);
                            const selectedThis = answers[q.id] === letter;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleOptionSelect(q.id, letter)}
                                className={`text-left p-3.5 rounded-xl border text-xs font-semibold ${
                                  selectedThis
                                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold'
                                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {submitted && q.explanation && (
                          <div
                            dangerouslySetInnerHTML={{ __html: q.explanation }}
                            className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Actions */}
              {!submitted ? (
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => { setSelectedExam(null); setSubmitted(false); stopAudio(); }}
                    className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs"
                  >
                    Bỏ dở bài thi
                  </button>

                  <button
                    onClick={handleSubmitExam}
                    className="px-8 py-3.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-98"
                  >
                    NỘP BÀI THI & XEM ĐIỂM SỐ ✨
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
                      Dữ liệu bài thi được chấm theo barem chuẩn quốc tế.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs text-slate-500 font-bold block mb-1">
                        {isIelts ? 'Overall Band' : 'Điểm TOEIC ước tính'}
                      </span>
                      <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        {isIelts ? `Band ${result?.bandScore}` : `${result?.toeicScore} / 990`}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs text-slate-500 font-bold block mb-1">Số câu đúng</span>
                      <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                        {result?.correct} / {result?.total}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setSelectedExam(null); setSubmitted(false); stopAudio(); }}
                    className="px-7 py-3 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
                  >
                    Quay về danh sách bộ đề
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      ) : (
        /* ================= MAIN EXAM COLLECTIONS DASHBOARD VIEW ================= */
        <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4">

          {/* 1. HEADER TITLE & TOP RIGHT ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
            <div className="space-y-1.5 max-w-3xl">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                <span>Luyện thi {isIelts ? 'IELTS' : 'TOEIC'}</span>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {isIelts ? 'Đủ 4 Kỹ Năng Live API' : 'ETS Live API'}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                {isIelts
                  ? 'Đề thi IELTS Academic được kết nối trực tiếp từ nguồn mở (GitHub Open Dataset) gồm đầy đủ 4 kỹ năng: Reading (Đọc học thuật), Listening (4 Sections có audio), Writing (Task 1 & 2) và Speaking (Part 1, 2, 3).'
                  : 'Luyện thi TOEIC kết nối trực tiếp từ API đề thi chuẩn ETS gồm Part 5 (Incomplete Sentences), Part 7 (Đọc hiểu) và Part 1 (Nghe audio thực tế).'
                }
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <button className="px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-98">
                <Clock className="w-4 h-4" />
                <span>Lịch sử làm bài</span>
              </button>

              <button className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-98">
                <TrendingUp className="w-4 h-4" />
                <span>Phân tích kết quả</span>
              </button>
            </div>
          </div>

          {/* 2. EXAM COLLECTIONS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {currentCollections.map((col) => (
              <div
                key={col.id}
                onClick={() => handleSelectExam(col)}
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

                  <div className={`w-12 h-12 rounded-2xl ${col.iconColor || 'bg-sky-500'} text-white flex items-center justify-center shrink-0 shadow-md`}>
                    {isIelts ? <GraduationCap className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 flex items-center gap-1 transition-colors">
                    Vào luyện trực tiếp <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 3. GỢI Ý HỌC THÊM CONTAINER BOX */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                GỢI Ý HỌC THÊM
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
                🚀 {isIelts ? 'Đạt band IELTS mục tiêu nhanh hơn nhờ luyện từ vựng và 4 kỹ năng mỗi ngày.' : 'Nâng điểm TOEIC vượt trội sau 4 tuần luyện từ vựng và giải đề Part 5 mỗi ngày.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Từ vựng */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>Từ vựng {isIelts ? 'IELTS' : 'TOEIC'}</span>
                  </h4>
                  <Link to="/vocabulary" className="text-[11px] font-bold text-slate-400 hover:text-slate-700">
                    Xem tất cả &gt;
                  </Link>
                </div>

                <div className="space-y-2">
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
                          {isIelts ? '600 Từ Vựng IELTS Cơ Bản' : '600 từ vựng thiết yếu cho TOEIC'}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">599 Từ</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </Link>
                </div>
              </div>

              {/* Right: Luyện nghe */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Headphones className="w-4 h-4 text-emerald-500" />
                    <span>Luyện nghe {isIelts ? 'IELTS' : 'TOEIC'}</span>
                  </h4>
                  <Link to="/listening" className="text-[11px] font-bold text-slate-400 hover:text-slate-700">
                    Xem tất cả &gt;
                  </Link>
                </div>

                <div className="space-y-2">
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
                          {isIelts ? 'Cam 20 Test 1 Part 1' : 'First-Class Upgrade Perks'}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">B2</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}
