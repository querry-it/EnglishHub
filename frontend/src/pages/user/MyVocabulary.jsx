import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Sparkles, Crown, Search, Volume2, Plus, 
  Check, Trash2, Layers, Edit3, RotateCcw, ArrowRight, Play
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MyVocabulary() {
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'flashcard' | 'write'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Flashcard mode state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // User Saved Vocabulary Dataset
  const [vocabList, setVocabList] = useState([
    {
      id: 1,
      word: 'Resilience',
      phonetic: '/rɪˈzɪliəns/',
      type: 'noun',
      meaning: 'Khả năng phục hồi, sự kiên cường',
      example: 'Her resilience helped her overcome all difficulties.',
      date: 'Sep 24, 2026'
    },
    {
      id: 2,
      word: 'Ambition',
      phonetic: '/æmˈbɪʃn/',
      type: 'noun',
      meaning: 'Hoài bão, khát vọng thành công',
      example: 'His ambition is to become a top software engineer.',
      date: 'Sep 22, 2026'
    },
    {
      id: 3,
      word: 'Perseverance',
      phonetic: '/ˌpɜːsəˈvɪərəns/',
      type: 'noun',
      meaning: 'Sự kiên trì, bền bỉ',
      example: 'Success requires hard work and perseverance.',
      date: 'Sep 20, 2026'
    }
  ]);

  // Audio speech synthesis
  const handlePlayAudio = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Delete word handler
  const handleDeleteWord = (id) => {
    setVocabList(vocabList.filter(v => v.id !== id));
  };

  const filteredVocab = vocabList.filter(v => 
    v.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen pb-16 select-none">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 space-y-6">
          
          {/* ================= 1. HEADER WITH MASCOT ================= */}
          <div className="text-center space-y-2 py-4">
            <div className="w-16 h-16 rounded-3xl bg-sky-50 dark:bg-sky-950 text-sky-500 flex items-center justify-center mx-auto shadow-xs border-2 border-sky-200 dark:border-sky-800">
              <span className="text-3xl">🦜</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Từ vựng của tôi
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Quản lý danh sách từ vựng của bạn để ôn tập
            </p>
          </div>

          {/* ================= 2. FREE PLAN STORAGE BANNER ================= */}
          <div className="p-4 sm:p-5 rounded-3xl bg-sky-50 dark:bg-sky-950/60 border-2 border-sky-200 dark:border-sky-800/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-sky-900 dark:text-sky-200">
              <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Gói miễn phí: bạn được lưu tối đa 100 từ. Nâng cấp Premium để lưu lên đến 5000 từ.</span>
            </div>

            <Link
              to="/pricing"
              className="px-5 py-2.5 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98 shrink-0 flex items-center gap-1.5 self-end sm:self-auto"
            >
              <Crown className="w-4 h-4 text-amber-300 fill-current" />
              <span>NÂNG CẤP</span>
            </Link>
          </div>

          {/* ================= 3. SUB-TABS (DANH SÁCH | THẺ GHI NHỚ | VIẾT) ================= */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'list'
                  ? 'bg-[#1E2540] dark:bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>≡ DANH SÁCH</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcard')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'flashcard'
                  ? 'bg-[#1E2540] dark:bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>🎴 THẺ GHI NHỚ</span>
            </button>

            <button
              onClick={() => setActiveTab('write')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'write'
                  ? 'bg-[#1E2540] dark:bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>✏️ VIẾT</span>
            </button>
          </div>

          {/* ================= 4. TAB 1: LIST VIEW & EMPTY CANVAS ================= */}
          {activeTab === 'list' && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Search Box */}
              {vocabList.length > 0 && (
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm từ vựng..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors shadow-xs"
                  />
                </div>
              )}

              {vocabList.length === 0 ? (
                /* SCREENSHOT REFERENCE: EMPTY VOCABULARY CANVAS */
                <div className="py-20 px-6 max-w-3xl mx-auto text-center rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
                  
                  {/* Center Mascot Illustration */}
                  <div className="w-32 h-32 mx-auto relative flex items-center justify-center">
                    <svg className="w-full h-full text-sky-500" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="50" r="35" fill="#38BDF8" />
                      <circle cx="40" cy="45" r="7" fill="white" />
                      <circle cx="60" cy="45" r="7" fill="white" />
                      <circle cx="41" cy="45" r="3.5" fill="#0F172A" />
                      <circle cx="61" cy="45" r="3.5" fill="#0F172A" />
                      <path d="M46 54 L54 54 L50 61 Z" fill="#F59E0B" />
                      {/* Glasses & Pencil */}
                      <circle cx="40" cy="45" r="10" stroke="#0F172A" strokeWidth="2" fill="none" />
                      <circle cx="60" cy="45" r="10" stroke="#0F172A" strokeWidth="2" fill="none" />
                      <line x1="50" y1="45" x2="50" y2="45" stroke="#0F172A" strokeWidth="2" />
                      <rect x="35" y="70" width="30" height="20" rx="3" fill="#0EA5E9" />
                    </svg>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      Chưa có từ vựng nào
                    </h2>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Thêm từ vựng bằng cách nhấp vào biểu tượng + khi xem bài học
                    </p>
                  </div>

                </div>
              ) : (
                /* VOCABULARY ITEMS LIST */
                <div className="space-y-3">
                  {filteredVocab.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs flex items-start justify-between gap-4 hover:border-slate-300 transition-colors"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                            {item.word}
                          </h3>
                          <span className="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                            {item.phonetic}
                          </span>
                          <span className="px-2 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                            {item.type}
                          </span>
                          <button
                            onClick={() => handlePlayAudio(item.word)}
                            className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="Phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                          {item.meaning}
                        </p>
                        
                        {item.example && (
                          <p className="text-xs italic font-medium text-slate-500 dark:text-slate-400">
                            "{item.example}"
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteWord(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors shrink-0"
                        title="Xóa từ vựng"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ================= 5. TAB 2: FLASHCARD VIEW ================= */}
          {activeTab === 'flashcard' && (
            <div className="py-8 max-w-lg mx-auto space-y-6 animate-fade-in text-center">
              {vocabList.length > 0 ? (
                <div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full aspect-[4/3] rounded-3xl bg-white dark:bg-slate-900 border-3 border-indigo-500 p-8 shadow-xl flex flex-col items-center justify-center space-y-4 cursor-pointer hover:scale-102 transition-transform select-none relative"
                >
                  <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider absolute top-4 right-4">
                    {isFlipped ? 'MẶT SAU' : 'MẶT TRƯỚC (NHẤP ĐỂ LẬT)'}
                  </span>

                  {!isFlipped ? (
                    <>
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                        {vocabList[currentCardIndex].word}
                      </h2>
                      <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400">
                        {vocabList[currentCardIndex].phonetic}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                        {vocabList[currentCardIndex].meaning}
                      </p>
                      <p className="text-xs italic text-slate-500 dark:text-slate-400">
                        "{vocabList[currentCardIndex].example}"
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-xs font-bold text-slate-400">Chưa có từ vựng nào để lật thẻ!</p>
              )}
            </div>
          )}

          {/* ================= 6. TAB 3: WRITING PRACTICE VIEW ================= */}
          {activeTab === 'write' && (
            <div className="py-8 max-w-lg mx-auto space-y-4 animate-fade-in text-center">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase">LUYỆN VIẾT TỪ VỰNG</p>
                <p className="text-base font-extrabold text-slate-900 dark:text-white">
                  Gõ lại đúng chính tả từ vựng để ôn tập trí nhớ dài hạn.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
  );
}
