import React, { useState } from 'react';
import { 
  Play, RotateCcw, Eye, EyeOff, Mic, Volume2, Settings, 
  Share2, AlertTriangle, ChevronRight, ChevronLeft, Brain, 
  Copy, MessageSquare, Check, Sparkles, RefreshCw, X, ArrowRight
} from 'lucide-react';
import AppLayout from '../../components/AppLayout';

export default function LearningWorkspace() {
  const [activeTab, setActiveTab] = useState('dictation'); // 'dictation' | 'shadowing'
  const [hideTranscript, setHideTranscript] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [revealedWords, setRevealedWords] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Review Queue Items (Matching Screenshot 1 & 2)
  const reviewSentences = [
    {
      id: 1,
      targetSentence: "THIS IS A TEST SENTENCE FOR LISTENING PRACTICE",
      words: ["THIS", "IS", "A", "TEST", "SENTENCE", "FOR", "LISTENING", "PRACTICE"],
      maskedWords: ["****", "**", "*", "****", "********", "***", "*********", "********"],
      errors: 10,
      replays: 0,
      reason: "Bạn đã mắc 10 lỗi với câu này",
      lastScore: 0,
      lessonTitle: "A1 English Listening Practice - Homes",
      embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE"
    },
    {
      id: 2,
      targetSentence: "YOU SHOULD PRACTICE ENGLISH EVERY DAY TO IMPROVE QUICKLY",
      words: ["YOU", "SHOULD", "PRACTICE", "ENGLISH", "EVERY", "DAY", "TO", "IMPROVE", "QUICKLY"],
      maskedWords: ["***", "******", "********", "_______", "_____", "***", "**", "_______", "_______"],
      errors: 5,
      replays: 1,
      reason: "Cần ôn tập theo thuật toán ngắt quãng",
      lastScore: 50,
      lessonTitle: "A1 English Listening Practice - Homes",
      embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE"
    }
  ];

  const currentItem = reviewSentences[currentSentenceIndex];

  // Helper to toggle eye reveal for a single word
  const toggleRevealWord = (sentenceId, wordIdx) => {
    setRevealedWords(prev => ({
      ...prev,
      [`${sentenceId}-${wordIdx}`]: !prev[`${sentenceId}-${wordIdx}`]
    }));
  };

  // Reveal all words in current sentence
  const handleRevealAllWords = () => {
    if (!currentItem) return;
    const newRevealed = { ...revealedWords };
    currentItem.words.forEach((_, idx) => {
      newRevealed[`${currentItem.id}-${idx}`] = true;
    });
    setRevealedWords(newRevealed);
  };

  // Next sentence or complete
  const handleNext = () => {
    if (currentSentenceIndex < reviewSentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
      setUserAnswer('');
      setRevealedWords({});
    } else {
      // Completed all sentences
      setCurrentSentenceIndex(reviewSentences.length);
    }
  };

  const isCompleted = currentSentenceIndex >= reviewSentences.length;

  return (
    <AppLayout>
      <div className="w-full min-h-screen pb-12 select-none">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-6">
          
          {/* ================= 1. TOP SUB-TABS & TRANSCRIPT TOGGLE ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            
            {/* Left Sub-Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dictation')}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 relative ${
                  activeTab === 'dictation'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <span>Nghe - Viết chính tả</span>
                {!isCompleted && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-mono text-[10px] flex items-center justify-center font-extrabold shrink-0 shadow-xs">
                    {reviewSentences.length - currentSentenceIndex}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('shadowing')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'shadowing'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <span>Bắt chước phát âm</span>
              </button>
            </div>

            {/* Right Action: Hide / Show Transcript */}
            <button
              onClick={() => setHideTranscript(!hideTranscript)}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-xs flex items-center gap-2 shadow-2xs transition-colors self-end sm:self-auto"
            >
              {hideTranscript ? (
                <>
                  <Eye className="w-4 h-4 text-indigo-500" />
                  <span>Hiện transcript</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-slate-500" />
                  <span>Ẩn transcript</span>
                </>
              )}
            </button>

          </div>

          {/* ================= 2. MAIN REVIEW WORKSPACE CANVAS ================= */}
          {isCompleted ? (
            /* ================= SCREENSHOT 2: EMPTY STATE VIEW ================= */
            <div className="py-16 px-6 max-w-4xl mx-auto text-center rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6 animate-fade-in">
              
              {/* Center Mascot Illustration */}
              <div className="w-40 h-40 mx-auto relative flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center">
                  <svg className="w-24 h-24 text-sky-500" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="45" r="30" fill="#38BDF8" />
                    <circle cx="42" cy="40" r="6" fill="white" />
                    <circle cx="58" cy="40" r="6" fill="white" />
                    <circle cx="43" cy="40" r="3" fill="#0F172A" />
                    <circle cx="59" cy="40" r="3" fill="#0F172A" />
                    <path d="M47 48 L53 48 L50 54 Z" fill="#F59E0B" />
                    <rect x="35" y="60" width="30" height="25" rx="5" fill="#0EA5E9" />
                    <path d="M25 45 Q20 30 35 35" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
                    <path d="M75 45 Q80 30 65 35" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Không có câu nào để ôn tập.
                </h2>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Hãy quay lại sau nhé!
                </p>
              </div>

              <button
                onClick={() => setCurrentSentenceIndex(0)}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98 inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>ÔN TẬP LẠI TỪ ĐẦU</span>
              </button>

            </div>
          ) : (
            /* ================= SCREENSHOT 1: ACTIVE 3-COLUMN WORKSPACE ================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* ----------------- COLUMN 1: LEFT VIDEO & STATS PANEL (4 cols) ----------------- */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                
                {/* Lesson Title Header */}
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {currentItem.lessonTitle}
                </h3>

                {/* Video Player Box */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 group shadow-inner">
                  <iframe 
                    src={currentItem.embedUrl}
                    title={currentItem.lessonTitle}
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Controls Bar */}
                <div className="space-y-2">
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    ĐIỀU KHIỂN
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="py-3 px-4 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{isPlaying ? 'TẠM DỪNG' : 'BẮT ĐẦU'}</span>
                    </button>

                    <button
                      onClick={() => setIsPlaying(true)}
                      className="py-3 px-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-2xs"
                    >
                      <RotateCcw className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      <span>PHÁT LẠI</span>
                    </button>
                  </div>
                </div>

                {/* 2x2 Stat Cards Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span className="text-rose-500 text-xs">⊗</span> Lỗi sai
                    </span>
                    <p className="text-base font-black text-slate-900 dark:text-white font-mono">
                      {currentItem.errors}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <RotateCcw className="w-3 h-3 text-sky-500" /> Lượt phát lại
                    </span>
                    <p className="text-base font-black text-slate-900 dark:text-white font-mono">
                      {currentItem.replays}
                    </p>
                  </div>

                  <div className="col-span-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span className="text-amber-500 text-xs">🎯</span> Lý do
                    </span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {currentItem.reason}
                    </p>
                  </div>

                  <div className="col-span-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span className="text-amber-500 text-xs">🎯</span> Điểm lần trước
                    </span>
                    <p className="text-base font-black text-slate-900 dark:text-white font-mono">
                      {currentItem.lastScore}
                    </p>
                  </div>
                </div>

                {/* Bottom Bird Mascot Illustration */}
                <div className="pt-2 flex justify-center">
                  <div className="w-24 h-24 relative">
                    <svg className="w-full h-full text-sky-500" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="50" r="35" fill="#38BDF8" />
                      <circle cx="40" cy="45" r="7" fill="white" />
                      <circle cx="60" cy="45" r="7" fill="white" />
                      <circle cx="41" cy="45" r="3.5" fill="#0F172A" />
                      <circle cx="61" cy="45" r="3.5" fill="#0F172A" />
                      <path d="M46 54 L54 54 L50 61 Z" fill="#F59E0B" />
                      {/* Ruler */}
                      <rect x="25" y="65" width="50" height="8" rx="2" fill="#FBBF24" />
                      <line x1="30" y1="65" x2="30" y2="69" stroke="#78350F" strokeWidth="1.5" />
                      <line x1="38" y1="65" x2="38" y2="70" stroke="#78350F" strokeWidth="1.5" />
                      <line x1="46" y1="65" x2="46" y2="69" stroke="#78350F" strokeWidth="1.5" />
                      <line x1="54" y1="65" x2="54" y2="70" stroke="#78350F" strokeWidth="1.5" />
                      <line x1="62" y1="65" x2="62" y2="69" stroke="#78350F" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* ----------------- COLUMN 2: MIDDLE DICTATION ARENA - CHÉP CHÍNH TẢ (5 cols) ----------------- */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                
                {/* Header */}
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  CHÉP CHÍNH TẢ
                </h3>

                {/* Player Audio Control Bar */}
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <button className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-7 h-7 rounded-full bg-slate-900 dark:bg-indigo-600 text-white flex items-center justify-center hover:scale-105 transition-transform"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                    <button className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <button 
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="hover:text-indigo-600 flex items-center gap-0.5"
                    >
                      <span>⚡ {playbackSpeed}</span>
                    </button>
                    <button className="hover:text-indigo-600">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="hover:text-indigo-600">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Input Text Box */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    GÕ NHỮNG GÌ BẠN NGHE ĐƯỢC:
                  </label>
                  <div className="relative">
                    <textarea 
                      rows={3}
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Gõ câu trả lời của bạn tại đây..."
                      className="w-full p-3.5 pr-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors resize-none"
                    />
                    <button 
                      title="Thu âm giọng nói"
                      className="absolute right-3 bottom-3 text-slate-400 hover:text-indigo-600 transition-colors p-1"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Word Hint Pills (Masked words with eye icons) */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {currentItem.words.map((word, wordIdx) => {
                      const isRevealed = revealedWords[`${currentItem.id}-${wordIdx}`];
                      const maskedStr = currentItem.maskedWords[wordIdx] || '****';

                      return (
                        <div key={wordIdx} className="flex flex-col items-center gap-1">
                          {/* Small Eye Reveal Button */}
                          <button
                            onClick={() => toggleRevealWord(currentItem.id, wordIdx)}
                            className="text-slate-400 hover:text-indigo-600 p-0.5 transition-colors"
                            title="Hiện từ này"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Word Box */}
                          <div className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-black transition-all ${
                            isRevealed 
                              ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}>
                            {isRevealed ? word : maskedStr}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-[11px] font-semibold text-slate-400 text-center">
                    Nhấp vào biểu tượng con mắt để hiện từ
                  </p>
                </div>

                {/* Bottom Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={handleRevealAllWords}
                    className="w-full py-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-black text-xs uppercase tracking-wider hover:bg-amber-100 transition-colors shadow-2xs"
                  >
                    HIỆN TẤT CẢ TỪ
                  </button>

                  <button
                    onClick={handleNext}
                    className="w-full py-3.5 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                  >
                    <span>TIẾP THEO</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* ----------------- COLUMN 3: RIGHT TRANSCRIPT & REVIEW QUEUE (3 cols) ----------------- */}
              <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                    PHIÊN ÂM
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 font-extrabold text-[10px]">
                    Cần ôn tập {reviewSentences.length - currentSentenceIndex} câu
                  </span>
                </div>

                {/* Review Sentence Queue Items */}
                <div className="space-y-3">
                  {reviewSentences.map((sent, idx) => {
                    const isCurrent = idx === currentSentenceIndex;
                    const isDone = idx < currentSentenceIndex;

                    return (
                      <div
                        key={sent.id}
                        onClick={() => setCurrentSentenceIndex(idx)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                          isCurrent 
                            ? 'bg-slate-50 dark:bg-slate-800/90 border-slate-900 dark:border-indigo-500 shadow-sm'
                            : isDone
                            ? 'bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-60'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                        }`}
                      >
                        {/* Top Bar inside Card */}
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-black font-mono ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                            #{sent.id}
                          </span>
                          <div className="flex items-center gap-2 text-slate-400">
                            <button title="Sao chép" className="hover:text-slate-700">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button title="Báo cáo" className="hover:text-rose-500">
                              <AlertTriangle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Masked Sentence Preview */}
                        <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 leading-relaxed tracking-wider">
                          {hideTranscript ? (
                            '**** ****** ** ****** ***'
                          ) : (
                            sent.maskedWords.join(' ')
                          )}
                        </p>

                        {isCurrent && (
                          <div className="pt-1 flex justify-end">
                            <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                              ĐANG ÔN TẬP ➔
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </AppLayout>
  );
}
