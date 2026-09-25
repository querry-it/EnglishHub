import React, { useState } from 'react';
import { 
  BookOpen, Gamepad2, HelpCircle, Trophy, Sparkles, Plus, Search, 
  FolderPlus, Crown, Award, CheckCircle2, Zap, TrendingUp, Target, 
  Clock, RotateCcw, Volume2, RotateCw, Eye, ArrowRight, ChevronRight, 
  Globe, Folder, Users, Star, Flame, X, Check
} from 'lucide-react';
import AppLayout from '../components/AppLayout';
import AppMascot from '../components/AppMascot';

export default function Vocabulary() {
  const [activeDeck, setActiveDeck] = useState(null); // null = catalog, object = active flashcard study
  const [selectedTag, setSelectedTag] = useState('Tất cả');
  const [isCreateDeckModalOpen, setIsCreateDeckModalOpen] = useState(false);
  const [isSrInfoModalOpen, setIsSrInfoModalOpen] = useState(false);
  
  // Flashcard study state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);

  // New Deck Form state
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');
  const [userDecks, setUserDecks] = useState([]);

  const filterTags = [
    'Tất cả', '#a1', '#a2', '#b1', '#b2', '#basic', '#c1', 
    '#common', '#communication', '#conversation', '#essential', 
    '#ets', '#idioms', '#ielts', '#oxford', '#sat', '#thpt', '#toefl', '#toeic'
  ];

  const commonDecks = [
    {
      id: 'common-1',
      title: '1000 từ tiếng Anh thông dụng',
      cardsCount: 992,
      learners: '381,770',
      isPro: false,
      color: 'bg-teal-500',
      tag: '#common'
    },
    {
      id: 'common-2',
      title: 'Từ vựng tiếng Anh giao tiếp',
      cardsCount: 326,
      learners: '96,345',
      isPro: false,
      color: 'bg-amber-500',
      tag: '#communication'
    }
  ];

  const oxfordDecks = [
    {
      id: 'oxford-1',
      title: '3000 Từ Vựng Oxford A1',
      cardsCount: 500,
      learners: '45,120',
      isPro: false,
      color: 'bg-amber-500',
      tag: '#a1'
    },
    {
      id: 'oxford-2',
      title: '3000 Từ Vựng Oxford A2',
      cardsCount: 800,
      learners: '32,450',
      isPro: false,
      color: 'bg-orange-500',
      tag: '#a2'
    },
    {
      id: 'oxford-3',
      title: '3000 Từ Vựng Oxford B1',
      cardsCount: 1200,
      learners: '28,910',
      isPro: true,
      color: 'bg-teal-600',
      tag: '#b1'
    },
    {
      id: 'oxford-4',
      title: '3000 Từ Vựng Oxford B2',
      cardsCount: 1500,
      learners: '22,400',
      isPro: true,
      color: 'bg-emerald-600',
      tag: '#b2'
    },
    {
      id: 'oxford-5',
      title: '5000 Oxford Vocabulary B2',
      cardsCount: 699,
      learners: '1,522',
      isPro: true,
      color: 'bg-lime-600',
      tag: '#b2'
    },
    {
      id: 'oxford-6',
      title: '5000 Oxford Vocabulary C1',
      cardsCount: 1312,
      learners: '2,319',
      isPro: true,
      color: 'bg-purple-600',
      tag: '#c1'
    }
  ];

  const toeicDecks = [
    {
      id: 'toeic-1',
      title: '600 từ vựng thiết yếu cho TOEIC',
      cardsCount: 622,
      learners: '92,957',
      isPro: false,
      color: 'bg-sky-600',
      tag: '#toeic'
    },
    {
      id: 'toeic-2',
      title: 'Từ vựng ETS TOEIC',
      cardsCount: 1600,
      learners: '3,903',
      isPro: true,
      color: 'bg-amber-600',
      tag: '#ets'
    },
    {
      id: 'toeic-3',
      title: 'Thành Ngữ TOEIC Phổ Biến',
      cardsCount: 114,
      learners: '662',
      isPro: true,
      color: 'bg-emerald-600',
      tag: '#idioms'
    }
  ];

  const sampleFlashcards = [
    {
      word: 'Substantial',
      ipa: '/səbˈstæn.ʃəl/',
      type: 'adjective',
      meaning: 'Lớn lao, đáng kể, có giá trị thực tế.',
      example: 'There has been a substantial increase in international students.',
      synonyms: 'significant, considerable, sizable'
    },
    {
      word: 'Plausible',
      ipa: '/ˈplɔː.zə.bəl/',
      type: 'adjective',
      meaning: 'Có vẻ hợp lý, có thể tin tưởng được.',
      example: 'The candidate offered a plausible explanation for the delay.',
      synonyms: 'credible, reasonable, believable'
    },
    {
      word: 'Ameliorate',
      ipa: '/əˈmiː.li.ə.reɪt/',
      type: 'verb',
      meaning: 'Cải thiện, làm cho tốt hơn (một tình huống xấu).',
      example: 'Steps were taken to ameliorate living conditions.',
      synonyms: 'improve, enhance, boost'
    }
  ];

  const leaderboardUsers = [
    { rank: 1, name: 'hương phạm', level: 27, diamonds: 42204, badge: '🥇' },
    { rank: 2, name: '@bomaylanhavua', level: 64, diamonds: 33268, badge: '🥈' },
    { rank: 3, name: '@vuhoanganh', level: 31, diamonds: 26416, badge: '🥉' },
    { rank: 4, name: '@kitton', level: 22, diamonds: 25620, badge: '#4' },
    { rank: 5, name: '@tranquymhanh_257', level: 18, diamonds: 25328, badge: '#5' },
  ];

  const handleCreateDeckSubmit = (e) => {
    e.preventDefault();
    if (!newDeckTitle.trim()) return;
    const created = {
      id: Date.now(),
      title: newDeckTitle,
      desc: newDeckDesc || 'Bộ thẻ tự tạo',
      cardsCount: 0,
      learners: '1',
      isPro: false,
      color: 'bg-indigo-600'
    };
    setUserDecks([...userDecks, created]);
    setNewDeckTitle('');
    setNewDeckDesc('');
    setIsCreateDeckModalOpen(false);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % sampleFlashcards.length);
    setReviewCount((prev) => prev + 1);
  };

  const renderDeckCard = (deck) => (
    <div 
      key={deck.id}
      onClick={() => { setActiveDeck(deck); setCurrentCardIndex(0); setIsFlipped(false); }}
      className={`group bg-white dark:bg-slate-900 rounded-3xl p-5 flex flex-col justify-between space-y-4 cursor-pointer transition-all duration-300 border-2 ${
        deck.isPro 
          ? 'border-amber-400 dark:border-amber-500/80 shadow-md shadow-amber-500/10 hover:shadow-xl' 
          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:shadow-xl'
      }`}
    >
      {/* Thumbnail Banner Area */}
      <div className={`relative h-44 rounded-2xl ${deck.color || 'bg-slate-800'} p-4 flex flex-col justify-between overflow-hidden shadow-inner text-white`}>
        <div className="flex items-center justify-between z-10">
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/30 backdrop-blur-md">
            FLASHCARD DECK
          </span>
          {deck.isPro && (
            <span className="px-2 py-0.5 rounded bg-amber-400 text-amber-950 font-black text-[10px] flex items-center gap-1 shadow-xs">
              <Crown className="w-3 h-3 fill-current" /> PRO
            </span>
          )}
        </div>

        {/* Deck Title in Card Header */}
        <div className="z-10 my-auto text-center">
          <h3 className="text-lg font-black tracking-tight leading-snug drop-shadow-sm">
            {deck.title}
          </h3>
        </div>

        {/* Decorative Grid SVG background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* Card Info Details */}
      <div className="space-y-3">
        <h4 className="font-black text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {deck.title}
        </h4>

        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" /> {deck.cardsCount} thẻ
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" /> {deck.learners} học viên
          </span>
        </div>

        {/* Main Action Button */}
        <button className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
          deck.isPro 
            ? 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md' 
            : 'bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white shadow-md'
        }`}>
          {deck.isPro && <Crown className="w-3.5 h-3.5 text-amber-300 fill-current" />}
          <span>BẮT ĐẦU HỌC</span>
        </button>
      </div>
    </div>
  );

  return (
    <AppLayout>
      <div className="w-full min-h-screen pb-12">
        {activeDeck ? (
          /* ================= FLASHCARD STUDY ARENA VIEW ================= */
          <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-6">
            
            {/* Top Navigation Back Button */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveDeck(null)}
                className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-indigo-600 font-extrabold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                ← Quay lại danh sách bộ thẻ
              </button>

              <span className="text-xs font-black text-slate-900 dark:text-white px-3 py-1 bg-indigo-50 dark:bg-indigo-950 rounded-xl border border-indigo-200 dark:border-indigo-800">
                {activeDeck.title}
              </span>
            </div>

            {/* Flashcard Header Info */}
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-extrabold">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                SuperMemo SM-2 Spaced Repetition Engine
              </span>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white pt-1">
                Lật Thẻ Flashcard Ôn Tập
              </h1>
            </div>

            {/* Main Interactive 3D Flashcard */}
            <div className="max-w-xl mx-auto space-y-5">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 px-1">
                <span>Thẻ số {currentCardIndex + 1} / {sampleFlashcards.length}</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono">🔥 Đã ôn {reviewCount} từ</span>
              </div>

              {/* Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[340px] perspective-1000 select-none"
              >
                <div className={`relative w-full min-h-[340px] duration-500 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
                  
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full p-8 rounded-3xl flex flex-col justify-between items-center text-center backface-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl">
                    <span className="text-[10px] font-black text-amber-900 dark:text-amber-300 px-3 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-full uppercase tracking-wider">
                      {sampleFlashcards[currentCardIndex % sampleFlashcards.length].type}
                    </span>

                    <div className="space-y-2">
                      <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        {sampleFlashcards[currentCardIndex % sampleFlashcards.length].word}
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 font-mono text-sm font-semibold">
                        {sampleFlashcards[currentCardIndex % sampleFlashcards.length].ipa}
                      </p>

                      <button className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs mx-auto flex items-center gap-1.5 hover:bg-slate-200 transition-colors">
                        <Volume2 className="w-4 h-4 text-indigo-600" /> Nghe phát âm
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5" /> Chạm vào thẻ để xoay xem nghĩa & ví dụ
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full p-8 rounded-3xl flex flex-col justify-between items-center text-center backface-hidden rotate-y-180 bg-[#1E2540] text-white border-2 border-indigo-500 shadow-2xl">
                    <div className="space-y-3 w-full">
                      <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">Ý NGHĨA TIẾNG VIỆT</span>
                      <h3 className="text-2xl font-black text-amber-300">
                        {sampleFlashcards[currentCardIndex % sampleFlashcards.length].meaning}
                      </h3>
                      
                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs text-slate-200 italic leading-relaxed text-left">
                        <span className="font-bold text-amber-300 block mb-1">Ví dụ:</span>
                        "{sampleFlashcards[currentCardIndex % sampleFlashcards.length].example}"
                      </div>

                      <p className="text-xs text-slate-300 font-mono">
                        Đồng nghĩa: {sampleFlashcards[currentCardIndex % sampleFlashcards.length].synonyms}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400 font-semibold">Chạm để xoay lại mặt trước</div>
                  </div>

                </div>
              </div>

              {/* SM-2 Rating Buttons */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <div className="text-center text-xs font-extrabold text-slate-600 dark:text-slate-400">
                  Đánh giá mức độ ghi nhớ theo thuật toán SM-2:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={handleNextCard}
                    className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-black text-xs flex flex-col items-center transition-all"
                  >
                    <span>🔴 Again</span>
                    <span className="text-[10px] text-rose-500 font-normal">1m</span>
                  </button>

                  <button
                    onClick={handleNextCard}
                    className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 font-black text-xs flex flex-col items-center transition-all"
                  >
                    <span>🟠 Hard</span>
                    <span className="text-[10px] text-amber-600 font-normal">12h</span>
                  </button>

                  <button
                    onClick={handleNextCard}
                    className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900 font-black text-xs flex flex-col items-center transition-all"
                  >
                    <span>🔵 Good</span>
                    <span className="text-[10px] text-sky-600 font-normal">1d</span>
                  </button>

                  <button
                    onClick={handleNextCard}
                    className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 font-black text-xs flex flex-col items-center transition-all"
                  >
                    <span>🟢 Easy</span>
                    <span className="text-[10px] text-emerald-600 font-normal">4d</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* ================= MAIN VOCABULARY DASHBOARD & CATALOG VIEW ================= */
          <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4">
            
            {/* 1. HEADER TITLE BAR & ACTION BUTTONS */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-3">
                <AppMascot className="w-12 h-12 shrink-0" />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Học Từ Vựng Tiếng Anh
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">
                    Thành thạo từ vựng tiếng Anh với hệ thống lặp lại ngắt quãng của EnglishHub
                  </p>
                </div>
              </div>

              {/* Action Buttons: Sổ tay | Trò Chơi | Spaced Repetition là gì? */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button className="px-4 py-2.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-98">
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span>Sổ tay từ vựng</span>
                </button>

                <button className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm shadow-emerald-500/20 transition-all active:scale-98">
                  <Gamepad2 className="w-4 h-4" />
                  <span>Trò Chơi</span>
                </button>

                <button 
                  onClick={() => setIsSrInfoModalOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-extrabold text-xs flex items-center gap-2 transition-colors shadow-2xs"
                >
                  <HelpCircle className="w-4 h-4 text-indigo-500" />
                  <span>Spaced Repetition là gì?</span>
                </button>
              </div>
            </div>

            {/* 2. STATS & VOCABULARY STATUS OVERVIEW GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Card: Thống Kê Học Tập */}
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5">
                <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                  Thống Kê Học Tập
                </h3>

                {/* 2x2 Grid Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <Target className="w-4 h-4 text-sky-500" />
                      <span>Tổng số Thẻ</span>
                    </div>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">0</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>Đến Hạn</span>
                    </div>
                    <p className="text-2xl font-black text-amber-600 dark:text-amber-400">0</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      <span>Tổng số Lần Ôn tập</span>
                    </div>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">0</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <Award className="w-4 h-4 text-emerald-500" />
                      <span>Độ Chính xác</span>
                    </div>
                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">0%</p>
                  </div>
                </div>

                {/* Banner Button: Đấu Trường Từ Vựng */}
                <button className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 border-2 border-purple-900/30 transition-all active:scale-98">
                  <Sparkles className="w-4 h-4 text-amber-300 fill-current" />
                  <span>⚔️ ĐẤU TRƯỜNG TỪ VỰNG</span>
                </button>
              </div>

              {/* Right Card: Trạng thái Từ vựng Bar Graph */}
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5">
                <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                  Trạng thái Từ vựng
                </h3>

                {/* Bar Graph Columns */}
                <div className="grid grid-cols-4 gap-3 items-end h-40 pt-4">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">0</span>
                    <div className="w-full h-12 bg-sky-400 rounded-lg shadow-xs" />
                    <span className="text-[10px] font-extrabold text-slate-500 text-center">Đang Học</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">0</span>
                    <div className="w-full h-12 bg-blue-600 rounded-lg shadow-xs" />
                    <span className="text-[10px] font-extrabold text-slate-500 text-center">Đang Ôn tập</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">0</span>
                    <div className="w-full h-12 bg-emerald-500 rounded-lg shadow-xs" />
                    <span className="text-[10px] font-extrabold text-slate-500 text-center">Đã Thành thạo</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">0</span>
                    <div className="w-full h-12 bg-rose-500 rounded-lg shadow-xs" />
                    <span className="text-[10px] font-extrabold text-slate-500 text-center">Tổng số Thẻ</span>
                  </div>
                </div>

                <p className="text-[11px] font-semibold text-slate-400 text-center pt-2">
                  Bấm vào một cột để xem danh sách từ
                </p>
              </div>

            </div>

            {/* 3. LEADERBOARD & MY DECKS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: BẢNG XẾP HẠNG (4 cols) */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      🏆 BẢNG XẾP HẠNG
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-400">
                      🕒 Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
                    </p>
                  </div>

                  <button className="px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] hover:bg-slate-100">
                    Xem tất cả &gt;
                  </button>
                </div>

                {/* Reward banner with Mascot */}
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <AppMascot className="w-8 h-8" />
                    <span className="font-black text-xs text-amber-900 dark:text-amber-300">
                      🎁 Phần thưởng hàng tháng
                    </span>
                  </div>

                  <p className="text-[11px] font-bold text-amber-800 dark:text-amber-400">
                    Nhận huy hiệu, khung avatar và kim cương vào cuối tháng
                  </p>
                </div>

                {/* User Ranking List */}
                <div className="space-y-2">
                  {leaderboardUsers.map((u) => (
                    <div 
                      key={u.rank}
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 font-black text-xs text-slate-400 text-center">
                          {u.badge}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 font-bold text-xs flex items-center gap-0 justify-center">
                          👤
                        </div>
                        <div>
                          <p className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1">
                            {u.name}
                          </p>
                          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400">
                            Lv.{u.level} 💎 {u.diamonds}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded bg-sky-500 text-white font-black text-[10px]">
                        #{u.rank}
                      </span>
                    </div>
                  ))}
                </div>

                {/* My Rank Row */}
                <div className="p-3 rounded-2xl bg-[#1E2540] text-white flex items-center justify-between text-xs font-extrabold">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500 text-[10px]">#31623</span>
                    <span>huy nguyen</span>
                  </div>
                  <span>#31623</span>
                </div>
              </div>

              {/* Right Column: BỘ THẺ CỦA TÔI & PHỔ BIẾN (8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                
                {/* 1. BỘ THẺ CỦA TÔI */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                        📘 BỘ THẺ CỦA TÔI
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-400">
                        Người dùng miễn phí: {userDecks.length}/3 bộ thẻ · tối đa 600 thẻ
                      </p>
                    </div>

                    <button 
                      onClick={() => setIsCreateDeckModalOpen(true)}
                      className="px-4 py-2 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-98"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tạo Bộ Thẻ</span>
                    </button>
                  </div>

                  {/* Empty state container (dashed border) */}
                  {userDecks.length === 0 ? (
                    <div className="p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50/50 dark:bg-slate-800/30">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <FolderPlus className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-base text-slate-900 dark:text-white">
                          Chưa có bộ thẻ nào
                        </h4>
                        <p className="text-xs text-slate-500 font-semibold">
                          Tạo bộ thẻ đầu tiên để bắt đầu quản lý từ vựng của bạn
                        </p>
                      </div>

                      <button 
                        onClick={() => setIsCreateDeckModalOpen(true)}
                        className="px-5 py-2.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-98 pt-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tạo Bộ Thẻ Đầu Tiên</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {userDecks.map(renderDeckCard)}
                    </div>
                  )}
                </div>

                {/* 2. BỘ THẺ PHỔ BIẾN CARD */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
                      ✨
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-slate-900 dark:text-white">
                        BỘ THẺ PHỔ BIẾN
                      </h4>
                      <p className="text-xs text-slate-400 font-semibold">
                        Khám phá các bộ thẻ phổ biến nhất
                      </p>
                    </div>
                  </div>

                  <button className="px-5 py-2.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] text-white font-extrabold text-xs shadow-sm">
                    Khám phá
                  </button>
                </div>

                {/* 3. XEM BỘ THẺ CỘNG ĐỒNG CARD */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                      🌐
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-slate-900 dark:text-white">
                        XEM BỘ THẺ CỘNG ĐỒNG
                      </h4>
                      <p className="text-xs text-slate-400 font-semibold">
                        Thành thạo từ vựng tiếng Anh với hệ thống lặp lại ngắt quãng của EnglishHub
                      </p>
                    </div>
                  </div>

                  <button className="px-5 py-2.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] text-white font-extrabold text-xs shadow-sm">
                    Khám phá
                  </button>
                </div>

              </div>
            </div>

            {/* 4. TAGS FILTER BAR */}
            <div className="space-y-3 pt-2">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                🏷️ Lọc theo Tags
              </h2>

              <div className="flex items-center gap-2 flex-wrap">
                {filterTags.map((tag) => {
                  const isActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                        isActive 
                          ? 'bg-slate-900 dark:bg-indigo-600 text-white border-slate-900 dark:border-indigo-600 shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. DECK COLLECTIONS GRID SECTIONS */}

            {/* Section 1: Từ Vựng Tiếng Anh Thông Dụng */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  Từ Vựng Tiếng Anh Thông Dụng <span className="text-xs font-bold text-slate-400">(2 bộ thẻ)</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {commonDecks.map(renderDeckCard)}
              </div>
            </div>

            {/* Section 2: Từ Vựng Oxford */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  Từ Vựng Oxford <span className="text-xs font-bold text-slate-400">(6 bộ thẻ)</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {oxfordDecks.map(renderDeckCard)}
              </div>
            </div>

            {/* Section 3: Từ Vựng TOEIC */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  Từ Vựng TOEIC <span className="text-xs font-bold text-slate-400">(3 bộ thẻ)</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {toeicDecks.map(renderDeckCard)}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* CREATE DECK MODAL */}
      {isCreateDeckModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-indigo-600" />
                Tạo Bộ Thẻ Từ Vựng Mới
              </h3>
              <button 
                onClick={() => setIsCreateDeckModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDeckSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  Tên Bộ Thẻ *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Ví dụ: Từ vựng Chuyên ngành IT..."
                  value={newDeckTitle}
                  onChange={(e) => setNewDeckTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  Mô tả ngắn
                </label>
                <textarea 
                  rows={3}
                  placeholder="Nhập mô tả bộ thẻ từ vựng của bạn..."
                  value={newDeckDesc}
                  onChange={(e) => setNewDeckDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-indigo-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateDeckModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md"
                >
                  Tạo Bộ Thẻ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SPACED REPETITION INFO MODAL */}
      {isSrInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                Spaced Repetition (Lặp lại ngắt quãng) là gì?
              </h3>
              <button 
                onClick={() => setIsSrInfoModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              <p>
                <strong className="text-slate-900 dark:text-white font-extrabold">Spaced Repetition (Lặp lại ngắt quãng)</strong> là phương pháp học dựa trên đường quên (Forgetting Curve) của nhà tâm lý học Hermann Ebbinghaus.
              </p>
              <p>
                Thay vì học nhồi nhét, thuật toán thông minh sẽ tự động tính toán chính xác thời điểm từ vựng sắp bị quên để nhắc nhở bạn ôn tập lại.
              </p>
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 space-y-1.5 text-indigo-900 dark:text-indigo-200">
                <p className="font-extrabold text-xs">✨ Lợi ích vượt trội:</p>
                <ul className="list-disc list-inside space-y-1 text-[11px]">
                  <li>Ghi nhớ từ vựng lâu gấp 4 lần so với học truyền thống.</li>
                  <li>Tiết kiệm 70% thời gian ôn tập mỗi ngày.</li>
                  <li>Tự động điều chỉnh tần suất cho từ khó và từ dễ.</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsSrInfoModalOpen(false)}
                className="px-6 py-2.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] text-white font-extrabold text-xs shadow-md"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

    </AppLayout>
  );
}
