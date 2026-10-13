import React, { useState } from 'react';
import { 
  Play, RotateCcw, Eye, EyeOff, Mic, Volume2, Settings, 
  Share2, AlertTriangle, ChevronRight, ChevronLeft, Brain, 
  Copy, MessageSquare, Check, Sparkles, RefreshCw, X, ArrowRight, BookOpen,
  LogIn
} from 'lucide-react';
import AppMascot from '../../components/AppMascot';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LearningWorkspace() {
  const { user, openLoginModal } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dictation'); // 'dictation' | 'shadowing'
  const [hideTranscript, setHideTranscript] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [revealedWords, setRevealedWords] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Default Review Queue (Empty by default matching user screenshot)
  const [reviewSentences, setReviewSentences] = useState([]);

  const sampleReviewSentences = [
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
  const isEmpty = reviewSentences.length === 0 || currentSentenceIndex >= reviewSentences.length;

  const toggleRevealWord = (sentenceId, wordIdx) => {
    setRevealedWords(prev => ({
      ...prev,
      [`${sentenceId}-${wordIdx}`]: !prev[`${sentenceId}-${wordIdx}`]
    }));
  };

  const handleRevealAllWords = () => {
    if (!currentItem) return;
    const newRevealed = { ...revealedWords };
    currentItem.words.forEach((_, idx) => {
      newRevealed[`${currentItem.id}-${idx}`] = true;
    });
    setRevealedWords(newRevealed);
  };

  const handleNext = () => {
    if (currentSentenceIndex < reviewSentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
      setUserAnswer('');
      setRevealedWords({});
    } else {
      setCurrentSentenceIndex(reviewSentences.length);
    }
  };

  const handleLoadSampleReview = () => {
    setReviewSentences(sampleReviewSentences);
    setCurrentSentenceIndex(0);
    setUserAnswer('');
    setRevealedWords({});
  };

  if (!user) {
    return (
      <div className="w-full min-h-screen pb-12 select-none">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-center pt-10 sm:pt-20">
          <div className="w-full max-w-2xl py-12 px-6 sm:px-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-slate-700 dark:text-slate-300" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                Mở khóa hành trình ôn tập của bạn
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Đăng nhập để theo dõi tiến độ và ôn tập các câu bạn đã học. Hệ thống lặp lại ngắt quãng của chúng tôi sẽ giúp bạn ghi nhớ tốt hơn.
              </p>
            </div>

            <div className="space-y-3 max-w-sm mx-auto text-left py-4">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs shrink-0">1</span>
                Theo dõi tiến độ học tập của bạn
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs shrink-0">2</span>
                Ôn tập câu vào thời điểm phù hợp nhất
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs shrink-0">3</span>
                Xây dựng trí nhớ dài hạn hiệu quả
              </div>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-2xl bg-[#1E2540] hover:bg-[#151a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-sm transition-colors shadow-md inline-flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Đăng nhập để bắt đầu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pb-12 select-none">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-6">

        {/* ================= MAIN REVIEW WORKSPACE CANVAS ================= */}
        {isEmpty ? (
          /* ================= DEFAULT EMPTY STATE VIEW (MATCHING USER SCREENSHOT) ================= */
          <div className="w-full min-h-[500px] flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-4xl py-20 px-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm text-center space-y-5 animate-fade-in">
              
              {/* Mascot Illustration with Glasses/Pencil */}
              <div className="w-28 h-28 mx-auto relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  {/* Blue Head */}
                  <circle cx="50" cy="50" r="42" fill="#29B6F6" />

                  {/* Sleeping/Closed Eyes with Glasses */}
                  <circle cx="36" cy="45" r="13" fill="none" stroke="#374151" strokeWidth="3" />
                  <circle cx="64" cy="45" r="13" fill="none" stroke="#374151" strokeWidth="3" />
                  <line x1="49" y1="45" x2="51" y2="45" stroke="#374151" strokeWidth="3" />
                  
                  {/* Curved Eyes inside Glasses */}
                  <path d="M 30 46 Q 36 39 42 46" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 58 46 Q 64 39 70 46" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Orange Beak */}
                  <polygon points="45,55 55,55 50,63" fill="#FF9800" />

                  {/* Pencil in hand */}
                  <g transform="rotate(-30 75 35)">
                    <rect x="70" y="20" width="8" height="30" fill="#FBBF24" rx="1" />
                    <polygon points="70,20 78,20 74,10" fill="#F43F5E" />
                    <polygon points="70,50 78,50 74,58" fill="#78350F" />
                    <polygon points="72,55 76,55 74,58" fill="#1E293B" />
                  </g>

                  {/* Book */}
                  <rect x="20" y="62" width="22" height="28" fill="#F59E0B" rx="3" transform="rotate(-15 30 75)" />
                  <line x1="22" y1="67" x2="38" y2="63" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>

              {/* Text Information matching screenshot */}
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                  Không có câu nào để ôn tập.
                </h2>
                <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
                  Hãy quay lại sau nhé!
                </p>
              </div>



            </div>
          </div>
        ) : (
          /* ================= ACTIVE 3-COLUMN WORKSPACE ================= */
          <div className="space-y-6 animate-fade-in">
            {/* Top Sub-Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-slate-200 dark:border-slate-800 pb-3">
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
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-mono text-[10px] flex items-center justify-center font-extrabold shrink-0 shadow-xs">
                    {reviewSentences.length - currentSentenceIndex}
                  </span>
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* Left Video Panel */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {currentItem.lessonTitle}
                </h3>

                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 group shadow-inner">
                  <iframe 
                    src={currentItem.embedUrl}
                    title={currentItem.lessonTitle}
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

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
              </div>

              {/* Middle Dictation Box */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  CHÉP CHÍNH TẢ
                </h3>

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
                  </div>
                </div>

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
                    <button className="absolute right-3 bottom-3 text-slate-400 hover:text-indigo-600 transition-colors p-1">
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {currentItem.words.map((word, wordIdx) => {
                      const isRevealed = revealedWords[`${currentItem.id}-${wordIdx}`];
                      const maskedStr = currentItem.maskedWords[wordIdx] || '****';

                      return (
                        <div key={wordIdx} className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => toggleRevealWord(currentItem.id, wordIdx)}
                            className="text-slate-400 hover:text-indigo-600 p-0.5 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

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
                </div>

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

              {/* Right Review Queue List */}
              <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                    PHIÊN ÂM
                  </h3>
                  <button 
                    onClick={() => setReviewSentences([])}
                    className="text-[10px] font-extrabold text-slate-400 hover:text-rose-500"
                  >
                    Xóa tất cả
                  </button>
                </div>

                <div className="space-y-3">
                  {reviewSentences.map((sent, idx) => {
                    const isCurrent = idx === currentSentenceIndex;
                    return (
                      <div
                        key={sent.id}
                        onClick={() => setCurrentSentenceIndex(idx)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                          isCurrent 
                            ? 'bg-slate-50 dark:bg-slate-800/90 border-slate-900 dark:border-indigo-500 shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono font-black">
                          <span className={isCurrent ? 'text-indigo-600' : 'text-slate-500'}>#{sent.id}</span>
                        </div>
                        <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                          {sent.maskedWords.join(' ')}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
