import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Sparkles, Crown, Search, Volume2, Plus, 
  Check, Trash2, Layers, Edit3, RotateCcw, ArrowRight, Play,
  Loader2, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

export default function MyVocabulary() {
  const { user, openProModal } = useAuth();
  
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'flashcard' | 'write'
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Flashcard mode state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // User Saved Vocabulary Dataset
  const [vocabList, setVocabList] = useState([]);

  // Fetch Flashcards from Backend
  const fetchFlashcards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/flashcards');
      if (response.data.success) {
        setVocabList(response.data.data);
      }
    } catch (err) {
      console.error("Lỗi khi tải từ vựng:", err);
      setError("Không thể tải danh sách từ vựng. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  // Audio speech synthesis
  const handlePlayAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Dừng các âm thanh đang phát
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Delete word handler
  const handleDeleteWord = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa từ này khỏi danh sách ôn tập?")) return;

    try {
      const response = await api.delete(`/flashcards/${id}`);
      if (response.data.success) {
        setVocabList(vocabList.filter(v => v.id !== id));
      }
    } catch (err) {
      alert("Lỗi khi xóa từ vựng");
    }
  };

  const filteredVocab = vocabList.filter(v => 
    v.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.meaning && v.meaning.toLowerCase().includes(searchTerm.toLowerCase()))
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
              Quản lý danh sách từ vựng của bạn để ôn tập SRS
            </p>
          </div>

          {/* ================= 2. FREE PLAN STORAGE BANNER ================= */}
          <div className="p-4 sm:p-5 rounded-3xl bg-sky-50 dark:bg-sky-950/60 border-2 border-sky-200 dark:border-sky-800/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-sky-900 dark:text-sky-200">
              <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Gói miễn phí: bạn được lưu tối đa 100 từ. Hiện có: {vocabList.length}/100</span>
            </div>

            <button
              onClick={openProModal}
              className="px-5 py-2.5 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98 shrink-0 flex items-center gap-1.5 self-end sm:self-auto"
            >
              <Crown className="w-4 h-4 text-amber-300 fill-current" />
              <span>NÂNG CẤP</span>
            </button>
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

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center gap-3 font-bold text-xs">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* ================= 4. TAB 1: LIST VIEW & EMPTY CANVAS ================= */}
          {activeTab === 'list' && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Search Box */}
              {!isLoading && vocabList.length > 0 && (
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

              {isLoading ? (
                /* LOADING STATE SKELETON */
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 animate-pulse flex items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
                        <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded w-1/2"></div>
                        <div className="h-4 bg-slate-50 dark:bg-slate-800/30 rounded w-2/3"></div>
                      </div>
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              ) : vocabList.length === 0 ? (
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
                      Thêm từ vựng bằng cách nhấp vào biểu tượng + khi xem bài học hoặc từ điển
                    </p>
                  </div>

                </div>
              ) : (
                /* VOCABULARY ITEMS LIST */
                <div className="space-y-3">
                  {filteredVocab.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs flex items-start justify-between gap-4 hover:border-indigo-200 transition-colors"
                    >
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                            {item.word}
                          </h3>
                          <span className="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                            {item.phonetic}
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
                        
                        {item.definition && (
                          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                            <span className="text-indigo-500">Def:</span> {item.definition}
                          </p>
                        )}

                        {item.example && (
                          <p className="text-[11px] italic font-medium text-slate-500 dark:text-slate-400">
                            "{item.example}"
                          </p>
                        )}

                        <div className="flex items-center gap-4 mt-2 pt-2 border-t border-slate-50 dark:border-slate-800/50">
                             <div className="flex items-center gap-1">
                                <RotateCcw className="w-3 h-3 text-slate-400" />
                                <span className="text-[9px] font-black text-slate-400 uppercase">
                                    Next: {new Date(item.nextReviewAt).toLocaleDateString()}
                                </span>
                             </div>
                             <div className="flex items-center gap-1">
                                <Layers className="w-3 h-3 text-slate-400" />
                                <span className="text-[9px] font-black text-slate-400 uppercase">
                                    Lần ôn: {item.repetitionCount}
                                </span>
                             </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                         {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.word} className="w-12 h-12 rounded-xl object-cover border-2 border-slate-100 dark:border-slate-800 shadow-sm" />
                         )}
                        <button
                            onClick={() => handleDeleteWord(item.id)}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors shrink-0"
                            title="Xóa từ vựng"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredVocab.length === 0 && searchTerm && (
                    <div className="text-center py-10 text-slate-400 font-bold text-xs">
                        Không tìm thấy từ nào khớp với "{searchTerm}"
                    </div>
                  )}
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
                  className="w-full aspect-[4/3] rounded-[2.5rem] bg-white dark:bg-slate-900 border-3 border-indigo-500 p-8 shadow-xl flex flex-col items-center justify-center space-y-4 cursor-pointer hover:scale-102 transition-transform select-none relative group overflow-hidden"
                >
                  <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider absolute top-6 right-8">
                    {isFlipped ? 'MẶT SAU' : 'MẶT TRƯỚC'}
                  </span>

                  <div className="absolute top-6 left-8 flex items-center gap-1 text-[10px] font-black text-slate-400">
                    <Layers className="w-3 h-3" />
                    <span>{currentCardIndex + 1} / {vocabList.length}</span>
                  </div>

                  {!isFlipped ? (
                    <>
                      <h2 className="text-4xl font-black text-slate-900 dark:text-white">
                        {vocabList[currentCardIndex].word}
                      </h2>
                      <div className="flex items-center gap-2">
                        <p className="text-base font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {vocabList[currentCardIndex].phonetic}
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); handlePlayAudio(vocabList[currentCardIndex].word); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                            <Volume2 className="w-4 h-4 text-indigo-500" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4 px-4 w-full">
                      <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {vocabList[currentCardIndex].meaning}
                      </p>
                      {vocabList[currentCardIndex].definition && (
                         <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                            {vocabList[currentCardIndex].definition}
                         </p>
                      )}
                      {vocabList[currentCardIndex].example && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <p className="text-xs italic text-slate-500 dark:text-slate-400">
                            "{vocabList[currentCardIndex].example}"
                            </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-4 px-8">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(false);
                            setCurrentCardIndex(prev => (prev > 0 ? prev - 1 : vocabList.length - 1));
                        }}
                        className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
                    >
                        <ArrowRight className="w-5 h-5 text-slate-600 rotate-180" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(false);
                            setCurrentCardIndex(prev => (prev < vocabList.length - 1 ? prev + 1 : 0));
                        }}
                        className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center">
                     <p className="text-xs font-bold text-slate-400">Chưa có từ vựng nào để lật thẻ!</p>
                </div>
              )}
            </div>
          )}

          {/* ================= 6. TAB 3: WRITING PRACTICE VIEW ================= */}
          {activeTab === 'write' && (
            <div className="py-8 max-w-lg mx-auto space-y-4 animate-fade-in text-center">
              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-950 rounded-3xl flex items-center justify-center mx-auto border-2 border-amber-200 dark:border-amber-900">
                    <Edit3 className="w-8 h-8 text-amber-500" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Luyện viết chính tả</h3>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                        Chế độ này giúp bạn ghi nhớ cách viết từ vựng một cách chính xác nhất. Tính năng đang được hoàn thiện.
                    </p>
                </div>
                <button className="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-indigo-600 text-white font-black text-xs uppercase tracking-widest opacity-50 cursor-not-allowed">
                    Sắp ra mắt
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
  );
}
