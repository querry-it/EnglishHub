import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Gamepad2, HelpCircle, Trophy, Sparkles, Plus, Search, 
  FolderPlus, Crown, Award, CheckCircle2, Zap, TrendingUp, Target, 
  Clock, RotateCcw, Volume2, RotateCw, Eye, ArrowRight, ChevronRight, 
  Globe, Folder, Users, Star, Flame, X, Check, ArrowLeft, Lightbulb, 
  AlertTriangle, Mail, Settings, Shuffle, Repeat, Mic, Play, Pause,
  VolumeX, Sliders, CheckSquare, RefreshCw
} from 'lucide-react';
import AppMascot from '../../components/AppMascot';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function Vocabulary() {
  const navigate = useNavigate();
  const { user , openProModal } = useAuth();
  const [activeDeck, setActiveDeck] = useState(null);
  const [deckDetail, setDeckDetail] = useState(null);
  const [selectedTag, setSelectedTag] = useState('Tất cả');
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isCreateDeckModalOpen, setIsCreateDeckModalOpen] = useState(false);
  const [isSrInfoModalOpen, setIsSrInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  
  // Learning Studio Modes: 'guess' | 'flashcard' | 'quiz' | 'quiz_reverse' | 'repeat'
  const [activeMode, setActiveMode] = useState('guess'); 
  const [selectedSubTopicIndex, setSelectedSubTopicIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  
  // Mode-specific States
  const [inputGuessText, setInputGuessText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null); // null | 'success' | 'error' | 'revealed'
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  
  // Speaking / Recording States
  const [isRecordingWord, setIsRecordingWord] = useState(false);
  const [hasRecordedWord, setHasRecordedWord] = useState(false);
  const [isPlayingRecordedWord, setIsPlayingRecordedWord] = useState(false);
  
  const [isRecordingSentence, setIsRecordingSentence] = useState(false);
  const [hasRecordedSentence, setHasRecordedSentence] = useState(false);
  const [isPlayingRecordedSentence, setIsPlayingRecordedSentence] = useState(false);

  // 3D Flashcard flip state
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);

  // Settings
  const [settings, setSettings] = useState({
    targetLang: 'vi',
    showTranslation: true,
    showNotes: true,
    soundEffects: true,
    voiceAccent: 'US'
  });

  // Fetch Decks
  useEffect(() => {
    const fetchDecks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/vocabulary/decks`, {
          params: { category: selectedTag }
        });
        setDecks(response.data);
      } catch (error) {
        console.error("Error fetching decks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDecks();
  }, [selectedTag]);

  // Fetch Deck Details when activeDeck changes
  useEffect(() => {
    if (activeDeck && user) {
      const fetchDetail = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/vocabulary/decks/${activeDeck.id}`);
          setDeckDetail(response.data);
          setCardIndex(0);
        } catch (error) {
          console.error("Error fetching deck detail:", error);
        }
      };
      fetchDetail();
    } else {
      setDeckDetail(null);
    }
  }, [activeDeck, user]);

  const filterTags = [
    'Tất cả', 'General', 'TOEIC', 'IELTS', 'Oxford', 'Communication', 'Business', 'Academic'
  ];

  // Logic to process deckDetail.words into quiz options etc.
  const processWords = (words) => {
    if (!words || words.length === 0) return [];

    return words.map(w => {
      // Create quiz options by picking random words from the same deck
      const otherWords = words.filter(ow => ow.id !== w.id);
      const randomOthers = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3);

      const quizOptions = [
        { key: 'A', text: w.word, isCorrect: true },
        ...randomOthers.map((ow, idx) => ({ key: String.fromCharCode(66 + idx), text: ow.word, isCorrect: false }))
      ].sort(() => 0.5 - Math.random());

      const quizReverseOptions = [
        { key: 'A', text: w.meaning, isCorrect: true },
        ...randomOthers.map((ow, idx) => ({ key: String.fromCharCode(66 + idx), text: ow.meaning, isCorrect: false }))
      ].sort(() => 0.5 - Math.random());

      return {
        ...w,
        englishWord: w.word,
        vietnameseWord: w.meaning,
        pos: 'Từ vựng', // Fallback as DB might not have POS yet
        englishDef: w.definition,
        vietDef: w.meaning,
        exampleEN: w.example,
        exampleVI: '', // Fallback
        mask: '*'.repeat(w.word.length),
        image: w.imageUrl || 'https://picsum.photos/300/200',
        ipaUS: w.phonetic,
        ipaUK: w.phonetic,
        quizOptions,
        quizReverseOptions
      };
    });
  };

  const currentCards = deckDetail ? processWords(deckDetail.words) : [];
  const activeCard = currentCards.length > 0 ? currentCards[cardIndex % currentCards.length] : null;

  // Feedback form state
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackToast, setFeedbackToast] = useState(false);

  // New Deck Form state
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');
  const [userDecks, setUserDecks] = useState([]);

  // SM-2 Buttons
  const handleSM2Review = async (quality) => {
    if (!activeCard || !user) {
      setCardIndex((prev) => (prev + 1) % currentCards.length);
      setIsFlipped(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/flashcards/review`, {
        word: activeCard.englishWord,
        quality: quality
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsFlipped(false);
      setCardIndex((prev) => (prev + 1) % currentCards.length);
      setReviewCount((prev) => prev + 1);
    } catch (error) {
      console.error("SM-2 API Error:", error);
      // Fallback transition
      setIsFlipped(false);
      setCardIndex((prev) => (prev + 1) % currentCards.length);
    }
  };

  const subTopics = [
    { id: 1, name: 'Tổng quan', count: deckDetail?.words?.length || 0, totalCards: deckDetail?.words?.length || 0, icon: '📊', progress: '0%' },
    { id: 2, name: 'Từ mới', count: deckDetail?.words?.length || 0, totalCards: deckDetail?.words?.length || 0, icon: '🆕', progress: '0%' },
    { id: 3, name: 'Đang ôn', count: '0 từ', totalCards: 0, icon: '🔄', progress: '0%' },
    { id: 4, name: 'Đã thuộc', count: '0 từ', totalCards: 0, icon: '✅', progress: '0%' },
  ];

  const speakText = (text, lang = 'en-US') => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  const handleCheckAnswer = () => {
    if (!inputGuessText.trim() || !activeCard) return;
    if (inputGuessText.trim().toLowerCase() === activeCard.englishWord.toLowerCase()) {
      setFeedbackStatus('success');
      setTimeout(() => {
        setFeedbackStatus(null);
        setInputGuessText('');
        setShowHint(false);
        setCardIndex((prev) => (prev + 1) % currentCards.length);
        setReviewCount((prev) => prev + 1);
      }, 1200);
    } else {
      setFeedbackStatus('error');
    }
  };

  const handleDontKnow = () => {
    if (!activeCard) return;
    setFeedbackStatus('revealed');
    setInputGuessText(activeCard.englishWord);
    setTimeout(() => {
      setFeedbackStatus(null);
      setInputGuessText('');
      setShowHint(false);
      setCardIndex((prev) => (prev + 1) % currentCards.length);
    }, 1800);
  };

  const handleSelectQuizOption = (option) => {
    setSelectedQuizOption(option.key);
    if (option.isCorrect) {
      setFeedbackStatus('success');
      setTimeout(() => {
        setFeedbackStatus(null);
        setSelectedQuizOption(null);
        setCardIndex((prev) => (prev + 1) % currentCards.length);
        setReviewCount((prev) => prev + 1);
      }, 1200);
    } else {
      setFeedbackStatus('error');
      setTimeout(() => {
        setSelectedQuizOption(null);
        setFeedbackStatus(null);
      }, 1500);
    }
  };

  const handleCreateDeckSubmit = (e) => {
    e.preventDefault();
    if (!newDeckTitle.trim()) return;
    // Logic to call API for creating deck would go here
    setIsCreateDeckModalOpen(false);
  };

  const renderDeckCard = (deck) => (
    <div 
      key={deck.id}
      onClick={() => {
        setActiveDeck(deck); 
        setCardIndex(0); 
        setIsFlipped(false); 
        setFeedbackStatus(null); 
        setInputGuessText(''); 
        setSelectedQuizOption(null); 
      }}
      className="group bg-white dark:bg-slate-900 rounded-3xl p-5 flex flex-col justify-between space-y-4 cursor-pointer transition-all duration-300 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:shadow-xl"
    >
      <div className={`relative h-44 rounded-2xl ${deck.color || 'bg-slate-800'} p-0 flex flex-col justify-between overflow-hidden shadow-inner text-white`}>
        {deck.thumbnail ? (
           <img src={deck.thumbnail} alt={deck.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" />
        ) : (
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700" />
        )}

        <div className="flex items-center justify-between z-10 p-4">
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/30 backdrop-blur-md">
            {deck.category || 'GENERAL'}
          </span>
        </div>

        <div className="z-10 my-auto text-center px-4">
          <h3 className="text-lg font-black tracking-tight leading-snug drop-shadow-lg">
            {deck.title}
          </h3>
        </div>

        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

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

        <button className="w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white shadow-md">
          <span>BẮT ĐẦU HỌC</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen pb-12 select-none">
      {activeDeck ? (
        !user ? (
          /* ================= UNAUTHENTICATED PREVIEW STATE ================= */
          <div className="max-w-4xl mx-auto px-4 space-y-8 animate-fade-in py-6">
            <div className="flex items-center gap-2 text-sm text-slate-500 font-bold mb-4">
               <button onClick={() => setActiveDeck(null)} className="hover:text-indigo-600 flex items-center gap-1"><ArrowLeft className="w-4 h-4"/> Quay lại</button>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-6">
              {activeDeck.title}
            </h1>

            {/* Login Requirement Box */}
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl py-12 px-6 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-24 h-24 mb-4">
                 <AppMascot className="w-full h-full" />
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-2">Yêu cầu Đăng nhập</h2>
              <p className="text-sm font-semibold text-slate-500 mb-6">Bạn cần đăng nhập để học từ vựng</p>
              <button 
                onClick={() => navigate('/login')} 
                className="px-8 py-3 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#161a2e] dark:hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md transition-colors"
              >
                Đăng nhập
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Trang chủ <ChevronRight className="w-3 h-3" /> Từ vựng tiếng Anh <ChevronRight className="w-3 h-3" /> <span className="text-slate-700 dark:text-slate-300">{activeDeck.title}</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Về bộ từ vựng "{activeDeck.title}"
              </h2>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeDeck.title} là bộ {activeDeck.cardsCount || 992} từ tiếng Anh được học bằng flashcard theo phương pháp lặp lại ngắt quãng (spaced repetition). Mỗi thẻ gồm từ, phiên âm, nghĩa tiếng Việt và câu ví dụ, và sẽ quay lại đúng lúc bạn sắp quên - nhờ vậy từ vựng đi vào trí nhớ dài hạn thay vì rơi rụng sau một ngày. Bộ từ này phù hợp với trình độ khoảng A1.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                24 từ trong bộ này
              </h3>
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-x-auto shadow-sm">
                <table className="w-full text-left text-sm min-w-[600px]">
                  <thead className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 font-black text-slate-900 dark:text-white w-1/5">Từ</th>
                      <th className="px-6 py-4 font-black text-slate-900 dark:text-white w-1/5">Phiên âm</th>
                      <th className="px-6 py-4 font-black text-slate-900 dark:text-white w-3/5">Nghĩa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">parents</td>
                      <td className="px-6 py-4 font-mono text-slate-500">/'peərənts/</td>
                      <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">Mẹ và cha của một người. Những người nuôi dưỡng một đứa trẻ.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">siblings</td>
                      <td className="px-6 py-4 font-mono text-slate-500">/'sɪblɪŋz/</td>
                      <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">Anh chị em ruột của một người. Những đứa trẻ có cùng cha mẹ.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">spouse</td>
                      <td className="px-6 py-4 font-mono text-slate-500">/'spaʊs/</td>
                      <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">Chồng hoặc vợ. Một người đã kết hôn với người khác.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">cousin</td>
                      <td className="px-6 py-4 font-mono text-slate-500">/'kʌzn/</td>
                      <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">Con của chú hoặc dì của bạn. Một người họ hàng cùng thế hệ.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">nephew</td>
                      <td className="px-6 py-4 font-mono text-slate-500">/'nefju:/</td>
                      <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">Con trai của anh hoặc chị của bạn. Con trai của anh chị em ruột của bạn.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">niece</td>
                      <td className="px-6 py-4 font-mono text-slate-500">/'ni:s/</td>
                      <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">Con gái của anh hoặc chị của bạn. Con gái của anh chị em ruột của bạn.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">grandfather</td>
                      <td className="px-6 py-4 font-mono text-slate-500">/'grænfa:ðər/</td>
                      <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">Cha của cha hoặc mẹ của một người. Cha mẹ nam giới của một phụ huynh.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ) : (
          /* ================= INTERACTIVE STUDY WORKSPACE (MATCHING ALL SCREENSHOTS) ================= */
          <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-5 animate-fade-in">
          
          {/* ================= 1. TOP HEADER & STUDY MODES BAR ================= */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left Back Button & Title */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setActiveDeck(null)}
                className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>

              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white truncate">
                {activeDeck.title}
              </h1>
            </div>

            {/* Right Study Modes Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => { setActiveMode('guess'); setFeedbackStatus(null); }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeMode === 'guess'
                    ? 'bg-[#1E2540] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>🔤 Đoán</span>
              </button>

              <button
                onClick={() => { setActiveMode('flashcard'); setFeedbackStatus(null); }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeMode === 'flashcard'
                    ? 'bg-[#1E2540] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>👁 Flashcard</span>
              </button>

              <button
                onClick={() => { setActiveMode('quiz'); setFeedbackStatus(null); setSelectedQuizOption(null); }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeMode === 'quiz'
                    ? 'bg-[#1E2540] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>❓ Trắc nghiệm</span>
              </button>

              <button
                onClick={() => { setActiveMode('quiz_reverse'); setFeedbackStatus(null); setSelectedQuizOption(null); }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeMode === 'quiz_reverse'
                    ? 'bg-[#1E2540] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>⇄ Trắc nghiệm đảo</span>
              </button>

              <button
                onClick={() => { setActiveMode('repeat'); setFeedbackStatus(null); }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeMode === 'repeat'
                    ? 'bg-[#1E2540] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>🎙 Lặp lại</span>
              </button>

              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

              <button 
                onClick={() => setIsFeedbackModalOpen(true)}
                className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                title="Báo cáo & Góp ý"
              >
                <Mail className="w-4 h-4" />
              </button>

              <button 
                onClick={() => setIsSettingsModalOpen(true)}
                className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                title="Cài đặt"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* ================= 2. PROGRESS BANNER BAR ================= */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <span>TIẾN ĐỘ - {subTopics[selectedSubTopicIndex].name}</span>
              <span className="font-mono">{cardIndex + 1} / {subTopics[selectedSubTopicIndex].totalCards} THẺ</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((cardIndex + 1) / subTopics[selectedSubTopicIndex].totalCards) * 100}%` }}
              />
            </div>
          </div>

          {/* ================= 3. MAIN 2-COLUMN STUDY STUDIO CONTAINER ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* LEFT COLUMN: DANH SÁCH CHỦ ĐỀ (4 cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white px-1">
                DANH SÁCH CHỦ ĐỀ
              </h3>

              <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
                {subTopics.map((topic, idx) => {
                  const isSelected = selectedSubTopicIndex === idx;
                  return (
                    <div
                      key={topic.id}
                      onClick={() => { setSelectedSubTopicIndex(idx); setCardIndex(0); setFeedbackStatus(null); setSelectedQuizOption(null); }}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#1E2540] text-white border-[#1E2540] shadow-md'
                          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-base shrink-0 ${isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                          {topic.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-extrabold text-xs truncate">{topic.name}</p>
                          <span className={`text-[10px] font-semibold ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                            {topic.count}
                          </span>
                        </div>
                      </div>

                      {topic.progress ? (
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-500 text-white font-black text-[10px] shrink-0">
                          {topic.progress}
                        </span>
                      ) : (
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          —
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: MAIN INTERACTIVE CARD WORKSPACE (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs relative space-y-6">
              
              {/* Warning Alert Icon Top Left */}
              <button 
                onClick={() => setIsFeedbackModalOpen(true)}
                className="text-slate-400 hover:text-slate-600 p-1 absolute top-6 left-6" 
                title="Báo lỗi nội dung"
              >
                <AlertTriangle className="w-5 h-5 text-slate-400" />
              </button>

              {/* ================= MODE 1: GUESS (ĐOÁN) ================= */}
              {activeMode === 'guess' && (
                <div className="space-y-6">
                  {/* Center Illustration Image Box */}
                  <div className="flex justify-center pt-2">
                    <div className="w-48 h-40 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md bg-slate-50 dark:bg-slate-800">
                      <img 
                        src={activeCard.image}
                        alt={activeCard.vietnameseWord}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Vietnamese Word Prompt & Part of Speech */}
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-2xl sm:text-3xl font-black text-[#0088FF] tracking-tight">
                        {activeCard.vietnameseWord}
                      </h2>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-[11px]">
                        {activeCard.pos}
                      </span>
                    </div>
                  </div>

                  {/* English & Vietnamese Definitions */}
                  <div className="space-y-2 text-center text-xs sm:text-sm font-medium leading-relaxed max-w-xl mx-auto">
                    <p className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white">Định nghĩa Tiếng Anh:</strong><br />
                      {activeCard.englishDef}
                    </p>
                    {settings.showTranslation && (
                      <p className="text-slate-600 dark:text-slate-300 pt-1">
                        <strong className="text-slate-900 dark:text-white">Định nghĩa:</strong><br />
                        {activeCard.vietDef}
                      </p>
                    )}
                  </div>

                  {/* Example Sentence with Masked Blanks */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1 text-xs sm:text-sm max-w-xl mx-auto">
                    <p className="text-slate-700 dark:text-slate-200 italic font-semibold">
                      " {activeCard.exampleEN.replace(activeCard.englishWord, '********')} "
                    </p>
                    {settings.showTranslation && (
                      <p className="text-slate-500 font-medium">
                        {activeCard.exampleVI}
                      </p>
                    )}
                  </div>

                  {/* Masked Preview & Hint Button */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="px-6 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold text-sm tracking-widest border border-slate-200 dark:border-slate-700">
                      {showHint ? activeCard.englishWord : activeCard.mask}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-extrabold text-xs flex items-center gap-1.5 hover:bg-amber-200 transition-colors shadow-2xs"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-400" />
                      <span>Gợi ý</span>
                    </button>
                  </div>

                  {/* Input Text Form */}
                  <form onSubmit={(e) => { e.preventDefault(); handleCheckAnswer(); }} className="space-y-4 max-w-md mx-auto">
                    <input
                      type="text"
                      value={inputGuessText}
                      onChange={(e) => setInputGuessText(e.target.value)}
                      placeholder="Nhập từ tiếng Anh..."
                      className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-black text-center text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 shadow-xs"
                    />

                    {/* Feedback Banner */}
                    {feedbackStatus && (
                      <div className={`p-3 rounded-2xl text-xs font-black text-center animate-fade-in ${
                        feedbackStatus === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                        feedbackStatus === 'revealed' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-rose-50 text-rose-600 border border-rose-200'
                      }`}>
                        {feedbackStatus === 'success' && '🎉 CHÍNH XÁC! Tuyệt vời lắm!'}
                        {feedbackStatus === 'revealed' && `💡 Đáp án là: "${activeCard.englishWord}"`}
                        {feedbackStatus === 'error' && '❌ Chưa chính xác, hãy kiểm tra lại nhé!'}
                      </div>
                    )}

                    {/* Red & Green Primary Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleDontKnow}
                        className="py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98 flex items-center justify-center gap-1.5"
                      >
                        <X className="w-4 h-4" />
                        <span>KHÔNG BIẾT</span>
                      </button>

                      <button
                        type="submit"
                        className="py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98 flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>KIỂM TRA ĐÁP ÁN</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ================= MODE 2: FLASHCARD 3D FLIP ================= */}
              {activeMode === 'flashcard' && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 px-1">
                    <span>Thẻ số {cardIndex + 1} / {currentCards.length}</span>
                    <span className="text-amber-600 dark:text-amber-400 font-mono">🔥 Đã ôn {reviewCount} từ</span>
                  </div>

                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="cursor-pointer min-h-[320px] perspective-1000 select-none"
                  >
                    <div className={`relative w-full min-h-[320px] duration-500 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full p-8 rounded-3xl flex flex-col justify-between items-center text-center backface-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-lg">
                        <span className="text-[10px] font-black text-amber-900 dark:text-amber-300 px-3 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-full uppercase tracking-wider">
                          {activeCard.pos}
                        </span>

                        <div className="space-y-2">
                          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            {activeCard.englishWord}
                          </h2>
                          <p className="text-slate-500 dark:text-slate-400 font-mono text-sm font-semibold">
                            {activeCard.ipaUS}
                          </p>

                          <button 
                            onClick={(e) => { e.stopPropagation(); speakText(activeCard.englishWord); }}
                            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs mx-auto flex items-center gap-1.5 hover:bg-slate-200 transition-colors"
                          >
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
                            {activeCard.vietnameseWord}
                          </h3>

                          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs text-slate-200 italic leading-relaxed text-left">
                            <span className="font-bold text-amber-300 block mb-1">Ví dụ:</span>
                            "{activeCard.exampleEN}"
                          </div>

                          <p className="text-xs text-slate-300 font-medium">
                            {activeCard.vietDef}
                          </p>
                        </div>

                        <div className="text-[11px] text-slate-400 font-semibold">Chạm để xoay lại mặt trước</div>
                      </div>
                    </div>
                  </div>

                  {/* SM-2 Buttons */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                    <div className="text-center text-xs font-extrabold text-slate-600 dark:text-slate-400">
                      Đánh giá mức độ ghi nhớ theo thuật toán SM-2:
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <button
                        onClick={() => handleSM2Review(0)}
                        className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-black text-xs flex flex-col items-center transition-all"
                      >
                        <span>🔴 Again</span>
                        <span className="text-[10px] text-rose-500 font-normal">1m</span>
                      </button>

                      <button
                        onClick={() => handleSM2Review(2)}
                        className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 font-black text-xs flex flex-col items-center transition-all"
                      >
                        <span>🟠 Hard</span>
                        <span className="text-[10px] text-amber-600 font-normal">12h</span>
                      </button>

                      <button
                        onClick={() => handleSM2Review(4)}
                        className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900 font-black text-xs flex flex-col items-center transition-all"
                      >
                        <span>🔵 Good</span>
                        <span className="text-[10px] text-sky-600 font-normal">1d</span>
                      </button>

                      <button
                        onClick={() => handleSM2Review(5)}
                        className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 font-black text-xs flex flex-col items-center transition-all"
                      >
                        <span>🟢 Easy</span>
                        <span className="text-[10px] text-emerald-600 font-normal">4d</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= MODE 3: QUIZ (TRẮC NGHIỆM - MATCHING SCREENSHOT 1) ================= */}
              {activeMode === 'quiz' && (
                <div className="space-y-6 max-w-xl mx-auto py-2">
                  
                  {/* Prompt Title & Definition */}
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-[#0088FF] tracking-tight">
                      {activeCard.vietnameseWord}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold max-w-lg mx-auto leading-relaxed">
                      {activeCard.vietDef}
                    </p>
                  </div>

                  {/* Subtitle Prompt */}
                  <div className="text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    Chọn đáp án đúng
                  </div>

                  {/* 4 Choice Option Pills (A, B, C, D) */}
                  <div className="space-y-3">
                    {activeCard.quizOptions.map((opt) => {
                      const isSelected = selectedQuizOption === opt.key;
                      const isCorrect = opt.isCorrect;

                      let btnStyle = "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-indigo-400";
                      
                      if (isSelected) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-700 font-black shadow-md";
                        } else {
                          btnStyle = "bg-rose-50 border-2 border-rose-500 text-rose-700 font-black shadow-md";
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectQuizOption(opt)}
                          className={`w-full p-4 rounded-2xl transition-all duration-200 flex items-center gap-4 text-left shadow-2xs group ${btnStyle}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                            isSelected && isCorrect ? 'bg-emerald-500 text-white' :
                            isSelected && !isCorrect ? 'bg-rose-500 text-white' :
                            'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white'
                          }`}>
                            {opt.key}
                          </div>

                          <span className="font-extrabold text-sm tracking-wide flex-1">
                            {opt.text}
                          </span>

                          {isSelected && isCorrect && <Check className="w-5 h-5 text-emerald-600" />}
                          {isSelected && !isCorrect && <X className="w-5 h-5 text-rose-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Message */}
                  {feedbackStatus && (
                    <div className={`p-3.5 rounded-2xl text-xs font-black text-center animate-fade-in ${
                      feedbackStatus === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                      'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}>
                      {feedbackStatus === 'success' ? '🎉 CHÍNH XÁC! Tốt lắm!' : '❌ Sai rồi, thử lại nhé!'}
                    </div>
                  )}

                </div>
              )}

              {/* ================= MODE 4: QUIZ REVERSE (TRẮC NGHIỆM ĐẢO) ================= */}
              {activeMode === 'quiz_reverse' && (
                <div className="space-y-6 max-w-xl mx-auto py-2">
                  
                  {/* English Prompt Word Title & Definition */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-3xl font-black text-[#0088FF] tracking-tight">
                        {activeCard.englishWord}
                      </h2>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-[11px]">
                        {activeCard.pos}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold max-w-lg mx-auto leading-relaxed">
                      {activeCard.englishDef}
                    </p>
                  </div>

                  <div className="text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    Chọn nghĩa Tiếng Việt đúng
                  </div>

                  {/* 4 Vietnamese Choice Options */}
                  <div className="space-y-3">
                    {activeCard.quizReverseOptions.map((opt) => {
                      const isSelected = selectedQuizOption === opt.key;
                      const isCorrect = opt.isCorrect;

                      let btnStyle = "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-indigo-400";
                      
                      if (isSelected) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-700 font-black shadow-md";
                        } else {
                          btnStyle = "bg-rose-50 border-2 border-rose-500 text-rose-700 font-black shadow-md";
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectQuizOption(opt)}
                          className={`w-full p-4 rounded-2xl transition-all duration-200 flex items-center gap-4 text-left shadow-2xs group ${btnStyle}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                            isSelected && isCorrect ? 'bg-emerald-500 text-white' :
                            isSelected && !isCorrect ? 'bg-rose-500 text-white' :
                            'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white'
                          }`}>
                            {opt.key}
                          </div>

                          <span className="font-extrabold text-sm tracking-wide flex-1">
                            {opt.text}
                          </span>

                          {isSelected && isCorrect && <Check className="w-5 h-5 text-emerald-600" />}
                          {isSelected && !isCorrect && <X className="w-5 h-5 text-rose-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {feedbackStatus && (
                    <div className={`p-3.5 rounded-2xl text-xs font-black text-center animate-fade-in ${
                      feedbackStatus === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                      'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}>
                      {feedbackStatus === 'success' ? '🎉 CHÍNH XÁC! Tốt lắm!' : '❌ Chưa đúng!'}
                    </div>
                  )}

                </div>
              )}

              {/* ================= MODE 5: REPEAT / SPEAKING PRACTICE (MATCHING SCREENSHOT 2) ================= */}
              {activeMode === 'repeat' && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  
                  {/* Top Header Card Info */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                      <img src={activeCard.image} alt={activeCard.englishWord} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                          {activeCard.englishWord}
                        </h2>
                        <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px]">
                          {activeCard.pos}
                        </span>
                      </div>

                      {/* Phonetic Pronunciation Audio Buttons */}
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                        <button 
                          onClick={() => speakText(activeCard.englishWord, 'en-US')}
                          className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                        >
                          <span className="font-mono text-indigo-600">US {activeCard.ipaUS}</span>
                          <Volume2 className="w-4 h-4 text-indigo-500" />
                        </button>

                        <button 
                          onClick={() => speakText(activeCard.englishWord, 'en-GB')}
                          className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                        >
                          <span className="font-mono text-indigo-600">UK {activeCard.ipaUK}</span>
                          <Volume2 className="w-4 h-4 text-indigo-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Section: ĐỊNH NGHĨA */}
                  <div className="space-y-2">
                    <h3 className="font-black text-xs uppercase tracking-wider text-slate-400">
                      ĐỊNH NGHĨA
                    </h3>
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 space-y-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <p><strong className="text-slate-400 mr-2">EN</strong> {activeCard.englishDef}</p>
                      <hr className="border-slate-100 dark:border-slate-700/60" />
                      <p><strong className="text-slate-400 mr-2">VI</strong> {activeCard.vietDef}</p>
                    </div>
                  </div>

                  {/* Section: BẢN DỊCH */}
                  <div className="space-y-2">
                    <h3 className="font-black text-xs uppercase tracking-wider text-slate-400">
                      BẢN DỊCH
                    </h3>
                    <div className="p-3.5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/40 border-2 border-sky-200 dark:border-sky-800 text-xs sm:text-sm font-black text-sky-600 dark:text-sky-300 flex items-center gap-2">
                      <span className="text-sky-400 text-[11px]">VI</span>
                      <span>{activeCard.vietnameseWord}</span>
                    </div>
                  </div>

                  {/* Section: LUYỆN NÓI */}
                  <div className="space-y-3 pt-2">
                    <h3 className="font-black text-xs uppercase tracking-wider text-slate-400">
                      LUYỆN NÓI
                    </h3>

                    {/* Word Row Recording */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400 block">TỪ</span>
                        <span className="text-base font-black text-slate-900 dark:text-white italic">
                          {activeCard.englishWord}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsRecordingWord(!isRecordingWord);
                            if (!isRecordingWord) {
                              setTimeout(() => { setIsRecordingWord(false); setHasRecordedWord(true); }, 2500);
                            }
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                            isRecordingWord ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                          }`}
                        >
                          <Mic className="w-3.5 h-3.5" />
                          <span>{isRecordingWord ? 'Đang ghi âm...' : '🎙 Ghi âm'}</span>
                        </button>

                        <button
                          disabled={!hasRecordedWord}
                          onClick={() => {
                            setIsPlayingRecordedWord(true);
                            setTimeout(() => setIsPlayingRecordedWord(false), 2000);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                            hasRecordedWord ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{isPlayingRecordedWord ? 'Đang phát...' : 'Phát lại ghi âm'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Example Sentence Recording */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-slate-400">VÍ DỤ</span>
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <button onClick={() => speakText(activeCard.exampleEN, 'en-US')} className="text-indigo-600 hover:underline flex items-center gap-1">
                            US <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => speakText(activeCard.exampleEN, 'en-GB')} className="text-indigo-600 hover:underline flex items-center gap-1">
                            UK <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 italic">
                        "{activeCard.exampleEN}"
                      </p>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => {
                            setIsRecordingSentence(!isRecordingSentence);
                            if (!isRecordingSentence) {
                              setTimeout(() => { setIsRecordingSentence(false); setHasRecordedSentence(true); }, 3000);
                            }
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                            isRecordingSentence ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                          }`}
                        >
                          <Mic className="w-3.5 h-3.5" />
                          <span>{isRecordingSentence ? 'Đang ghi âm...' : '🎙 Ghi âm'}</span>
                        </button>

                        <button
                          disabled={!hasRecordedSentence}
                          onClick={() => {
                            setIsPlayingRecordedSentence(true);
                            setTimeout(() => setIsPlayingRecordedSentence(false), 2500);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                            hasRecordedSentence ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{isPlayingRecordedSentence ? 'Đang phát...' : 'Phát lại ghi âm'}</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* Bottom Card Footer Note */}
              <div className="text-center text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                Nhóm học {cardIndex + 1}/20 • Tổng cộng {activeDeck.cardsCount || 992} thẻ trong bộ thẻ
              </div>

            </div>

          </div>

        </div>
        )
      ) : (
        /* ================= MAIN VOCABULARY DASHBOARD & CATALOG VIEW ================= */
        <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4">

          {user ? (
            /* ================= LOGGED IN USER DASHBOARD ================= */
            <div className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Top Left: Actions */}
                <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 space-y-2">
                      <BookOpen className="w-6 h-6 text-sky-500" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Tổng số Lần Ôn tập</span>
                      <p className="text-3xl font-black text-slate-900 dark:text-white">1</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700 space-y-2">
                      <Award className="w-6 h-6 text-emerald-500" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Độ Chính xác</span>
                      <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">0%</p>
                    </div>
                  </div>

                  <button className="w-full py-3.5 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98">
                    <Repeat className="w-4 h-4" />
                    <span>ÔN TẬP NGAY (1)</span>
                  </button>

                  <button className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Đấu Trường Từ Vựng</span>
                  </button>

                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 mt-2">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-slate-400" />
                      <div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white">Tiếp tục học: 1000 từ tiếng Anh thông dụng</h4>
                        <p className="text-[10px] font-bold text-amber-500 mt-0.5">🔥 1 từ cần ôn tập hôm nay</p>
                      </div>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-[#1E2540] hover:bg-[#161a2e] text-white font-extrabold text-[10px] uppercase tracking-wider transition-colors shrink-0">
                      TIẾP TỤC HỌC
                    </button>
                  </div>
                </div>

                {/* Top Right: Status */}
                <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center space-y-6">
                  <div className="grid grid-cols-4 gap-3 items-end h-40 pt-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">1</span>
                      <div className="w-full h-8 bg-sky-400 rounded-lg shadow-xs" />
                      <span className="text-[10px] font-extrabold text-slate-500 text-center">Đang Học</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">0</span>
                      <div className="w-full h-2 bg-blue-600 rounded-lg shadow-xs" />
                      <span className="text-[10px] font-extrabold text-slate-500 text-center">Đang Ôn tập</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">0</span>
                      <div className="w-full h-2 bg-emerald-500 rounded-lg shadow-xs" />
                      <span className="text-[10px] font-extrabold text-slate-500 text-center">Đã Thành thạo</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">1</span>
                      <div className="w-full h-8 bg-rose-500 rounded-lg shadow-xs" />
                      <span className="text-[10px] font-extrabold text-slate-500 text-center">Tổng số Thẻ</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-400 text-center pt-2">
                    Bấm vào một cột để xem danh sách từ
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Middle Left: Leaderboard */}
                <div className="lg:col-span-5 bg-[#fff8e7] dark:bg-slate-900 p-6 rounded-3xl border-2 border-amber-200 dark:border-amber-900/30 shadow-sm flex flex-col space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between relative z-10">
                    <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500" /> BẢNG XẾP HẠNG
                    </h3>
                    <button className="text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors">Xem tất cả &gt;</button>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-400 relative z-10">⏱ Cập nhật lần cuối: 08/10/2026 22:50</p>
                  
                  <div className="flex flex-col items-center justify-center p-3 relative z-10">
                    <div className="flex items-center gap-2 text-purple-600 font-black text-sm mb-3">
                      <Award className="w-4 h-4" /> Phần thưởng hàng tháng
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xs font-black shadow-sm text-amber-700">#1</div>
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-black shadow-sm text-slate-700">#2</div>
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xs font-black shadow-sm text-orange-700">#3</div>
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-black shadow-sm text-indigo-700">#50</div>
                    </div>
                    <p className="text-[10px] font-bold text-amber-600 mt-3 text-center">✨ Nhận huy hiệu, khung avatar và kim cương vào cuối tháng</p>
                  </div>

                  <div className="space-y-2 relative z-10">
                    {[
                      { rank: 1, name: 'Người dùng ẩn danh', level: 23, xp: 217032, current: true },
                      { rank: 2, name: '@sphinx', level: 27, xp: 141648, current: false },
                      { rank: 3, name: '@vincent', level: 27, xp: 132003, current: false },
                      { rank: 4, name: '@123', level: 22, xp: 111922, current: false },
                      { rank: 5, name: '@hytmin', level: 18, xp: 97824, current: false },
                    ].map((u) => (
                      <div key={u.rank} className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${u.current ? 'border-amber-400 bg-white shadow-sm scale-[1.02]' : 'border-slate-200/50 bg-white/50 dark:bg-slate-800'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-6 flex justify-center font-black text-xs ${u.rank === 1 ? 'text-amber-500' : u.rank === 2 ? 'text-slate-400' : u.rank === 3 ? 'text-orange-500' : 'text-slate-400'}`}>
                            {u.rank === 1 ? <Trophy className="w-4 h-4"/> : u.rank}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{u.name}</p>
                            <p className="text-[10px] font-semibold text-slate-500">Lv.{u.level} • {u.xp}</p>
                          </div>
                        </div>
                        {u.current && <span className="px-2 py-1 bg-[#1E2540] text-white text-[10px] font-bold rounded-lg">#{u.rank}</span>}
                        {!u.current && <span className="px-2 py-1 bg-sky-100 text-sky-600 text-[10px] font-bold rounded-lg">#{u.rank}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle Right: My Decks, Popular, Community */}
                <div className="lg:col-span-7 flex flex-col gap-5">
                  
                  {/* My Decks */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-sky-500" /> BỘ THẺ CỦA TÔI
                        </h3>
                        <p className="text-[10px] font-semibold text-slate-500 mt-1">Người dùng miễn phí - 0/3 bộ thẻ - tối đa 600 thẻ</p>
                      </div>
                      <button className="px-3.5 py-2 bg-[#1E2540] hover:bg-[#161a2e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Tạo Bộ Thẻ
                      </button>
                    </div>
                    
                    <div className="flex-1 border-2 border-dashed border-sky-200 dark:border-sky-900/50 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-sky-50/50 dark:bg-slate-800/30">
                      <div className="w-14 h-14 bg-white dark:bg-slate-800 border-2 border-sky-100 dark:border-slate-700 text-sky-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                        <FolderPlus className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1.5">Chưa có bộ thẻ nào</h4>
                      <p className="text-[11px] font-medium text-slate-500 mb-5 max-w-xs leading-relaxed">Tạo bộ thẻ đầu tiên để bắt đầu quản lý từ vựng của bạn</p>
                      <button className="px-5 py-2.5 bg-[#1E2540] hover:bg-[#161a2e] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors">
                        <Plus className="w-4 h-4" /> Tạo Bộ Thẻ Đầu Tiên
                      </button>
                    </div>
                  </div>

                  {/* Popular Decks */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between hover:border-indigo-200 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">BỘ THẺ PHỔ BIẾN</h4>
                        <p className="text-[10px] font-semibold text-slate-500">Khám phá các bộ thẻ phổ biến nhất</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#1E2540] hover:bg-[#161a2e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors">
                      <Globe className="w-3.5 h-3.5" /> Khám phá
                    </button>
                  </div>

                  {/* Community Decks */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-slate-100">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">XEM BỘ THẺ CỘNG ĐỒNG</h4>
                        <p className="text-[10px] font-semibold text-slate-500 max-w-xs truncate">Thành thạo từ vựng tiếng Anh với hệ thống lặp lại ngắt quãng của Parroto</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#1E2540] hover:bg-[#161a2e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors">
                      <Globe className="w-3.5 h-3.5" /> Khám phá
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ) : (
            /* ================= GUEST CATALOG VIEW HEADER ================= */
            <>
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

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button 
                    onClick={() => {
                      if (!user) {
                        navigate('/login');
                      } else {
                        navigate('/my-vocabulary');
                      }
                    }}
                    className="px-4 py-2.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-98"
                  >
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
                <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5">
                  <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                    Thống Kê Học Tập
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                        <Target className="w-4 h-4 text-sky-500" />
                        <span>Tổng số Thẻ</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">992</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span>Đến Hạn</span>
                      </div>
                      <p className="text-2xl font-black text-amber-600 dark:text-amber-400">12</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                        <span>Tổng số Lần Ôn tập</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">148</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                        <Award className="w-4 h-4 text-emerald-500" />
                        <span>Độ Chính xác</span>
                      </div>
                      <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">92%</p>
                    </div>
                  </div>
                  <button className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 border-2 border-purple-900/30 transition-all active:scale-98">
                    <Sparkles className="w-4 h-4 text-amber-300 fill-current" />
                    <span>⚔️ ĐẤU TRƯỜNG TỪ VỰNG</span>
                  </button>
                </div>
                <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5">
                  <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                    Trạng thái Từ vựng
                  </h3>
                  <div className="grid grid-cols-4 gap-3 items-end h-40 pt-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">49</span>
                      <div className="w-full h-20 bg-sky-400 rounded-lg shadow-xs" />
                      <span className="text-[10px] font-extrabold text-slate-500 text-center">Đang Học</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">120</span>
                      <div className="w-full h-28 bg-blue-600 rounded-lg shadow-xs" />
                      <span className="text-[10px] font-extrabold text-slate-500 text-center">Đang Ôn tập</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">823</span>
                      <div className="w-full h-36 bg-emerald-500 rounded-lg shadow-xs" />
                      <span className="text-[10px] font-extrabold text-slate-500 text-center">Đã Thành thạo</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">992</span>
                      <div className="w-full h-40 bg-rose-500 rounded-lg shadow-xs" />
                      <span className="text-[10px] font-extrabold text-slate-500 text-center">Tổng số Thẻ</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-400 text-center pt-2">
                    Bấm vào một cột để xem danh sách từ
                  </p>
                </div>
              </div>
            </>
          )}

          {/* 3. TAGS FILTER BAR */}
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

          {/* 4. DECK COLLECTIONS GRID SECTIONS */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                Bộ sưu tập từ vựng <span className="text-xs font-bold text-slate-400">({decks.length} bộ thẻ)</span>
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {decks.map(renderDeckCard)}
              </div>
            )}

            {decks.length === 0 && !loading && (
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 font-bold">Không tìm thấy bộ từ vựng nào trong danh mục này.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ================= SETTINGS MODAL (CÀI ĐẶT - MATCHING SCREENSHOT 3) ================= */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                Cài đặt
              </h3>
              <button 
                onClick={() => setIsSettingsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Controls Form */}
            <div className="space-y-5 text-sm font-semibold">
              
              {/* Field 1: Ngôn ngữ dịch */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Ngôn ngữ dịch
                </label>
                <select
                  value={settings.targetLang}
                  onChange={(e) => setSettings({ ...settings, targetLang: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                >
                  <option value="vi">🇻🇳 Tiếng Việt</option>
                  <option value="ja">🇯🇵 Tiếng Nhật</option>
                  <option value="ko">🇰🇷 Tiếng Hàn</option>
                  <option value="zh">🇨🇳 Tiếng Trung</option>
                </select>
              </div>

              {/* Field 2: Hiển thị Bản dịch */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Hiển thị Bản dịch
                </span>
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, showTranslation: !settings.showTranslation })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.showTranslation ? 'bg-[#1E2540]' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 absolute top-0.5 ${
                    settings.showTranslation ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Field 3: Hiển thị Chú giải */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Hiển thị Chú giải
                </span>
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, showNotes: !settings.showNotes })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.showNotes ? 'bg-[#1E2540]' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 absolute top-0.5 ${
                    settings.showNotes ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Field 4: Hiệu ứng âm thanh */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Hiệu ứng âm thanh
                </span>
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, soundEffects: !settings.soundEffects })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.soundEffects ? 'bg-[#1E2540]' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 absolute top-0.5 ${
                    settings.soundEffects ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Field 5: Giọng phát âm */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Giọng phát âm
                </label>
                <select
                  value={settings.voiceAccent}
                  onChange={(e) => setSettings({ ...settings, voiceAccent: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                >
                  <option value="US">Tiếng Anh Mỹ (US)</option>
                  <option value="UK">Tiếng Anh Anh (UK)</option>
                  <option value="AU">Tiếng Anh Úc (AU)</option>
                </select>
              </div>

            </div>

            {/* Modal Bottom Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-6 py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300 font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                HỦY
              </button>

              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-6 py-2.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all active:scale-98"
              >
                LƯU
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= FEEDBACK & REPORT MODAL ================= */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-500" /> Báo cáo & Góp ý
              </h3>
              <button onClick={() => setIsFeedbackModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Bạn phát hiện lỗi trong thẻ từ vựng này hoặc muốn đóng góp ý kiến cải thiện?
            </p>

            <textarea
              rows={4}
              placeholder="Nhập nội dung góp ý..."
              value={feedbackMsg}
              onChange={(e) => setFeedbackMsg(e.target.value)}
              className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setIsFeedbackModalOpen(false)} className="px-5 py-2.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-extrabold text-xs">
                HỦY
              </button>
              <button 
                onClick={() => {
                  setIsFeedbackModalOpen(false);
                  setFeedbackMsg('');
                  setFeedbackToast(true);
                  setTimeout(() => setFeedbackToast(false), 3000);
                }}
                className="px-5 py-2.5 rounded-2xl bg-[#1E2540] text-white font-extrabold text-xs uppercase"
              >
                GỬI PHẢN HỒI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FEEDBACK SUCCESS TOAST */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>Cảm ơn bạn đã gửi phản hồi! Đội ngũ sẽ xem xét ngay.</span>
        </div>
      )}
    </div>
  );
}
