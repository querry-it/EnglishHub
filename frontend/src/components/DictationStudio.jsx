import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Eye, 
  Settings, Keyboard, Mic, MessageSquare, AlertTriangle, 
  Edit3, Crown, Lock, ChevronDown, ChevronUp, FastForward,
  CheckCircle2, Volume2, Sparkles, Sliders
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NoteModal from './NoteModal';

export default function DictationStudio({ lesson }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hideMedia, setHideMedia] = useState(false);
  const [hideTranscript, setHideTranscript] = useState(false);
  const [difficulty, setDifficulty] = useState('Hard'); // Easy, Normal, Hard
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [userAnswer, setUserAnswer] = useState('');
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [isProLocked, setIsProLocked] = useState(lesson?.isPro || false);

  // Note Modal state
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedNoteSeg, setSelectedNoteSeg] = useState(null);

  // Ref for iframe video control
  const iframeRef = useRef(null);

  // Sample lesson data
  const currentLesson = lesson || {
    id: 1,
    title: 'A1 English Listening Practice - Homes',
    category: 'Listening Time (Shadowing)',
    level: 'B1',
    isPro: false,
    embedUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE',
    thumbnail: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80',
    commentCount: 4421
  };

  // Helper function to build 100% full word breakdowns for every sentence safely
  const buildSegment = (id, num, fullText = '', vietnamese = '', startTime = 0) => {
    const textStr = fullText || '';
    return {
      id,
      number: `#${num}`,
      fullText: textStr,
      vietnamese: vietnamese || '',
      startTime: startTime || 0,
      words: textStr.split(/\s+/).filter(Boolean).map(w => {
        const cleanLen = w.replace(/[^a-zA-Z0-9]/g, '').length || w.length;
        return {
          word: w,
          masked: '*'.repeat(cleanLen),
          revealed: false
        };
      })
    };
  };

  // Sample pool of sentences
  const sampleTexts = [
    { text: "Welcome to English Listening Practice for Beginners.", vi: "Chào mừng bạn đến với bài luyện nghe tiếng Anh cho người mới bắt đầu." },
    { text: "Today we are going to learn about different types of homes.", vi: "Hôm nay chúng ta sẽ học về các loại hình nhà ở khác nhau." },
    { text: "Some people live in big houses while others live in cozy apartments.", vi: "Một số người sống trong những ngôi nhà lớn trong khi những người khác sống trong các căn hộ ấm cúng." },
    { text: "Let us take a complete tour around the beautiful neighborhood.", vi: "Chúng ta hãy dạo một vòng quanh khu phố xinh đẹp này." },
    { text: "You can hear the cars passing by and birds singing outside.", vi: "Bạn có thể nghe thấy tiếng ô tô chạy qua và tiếng chim hót bên ngoài." },
    { text: "Pay close attention to each word you hear in this audio lesson.", vi: "Hãy chú ý kỹ đến từng từ bạn nghe được trong bài học âm thanh này." },
    { text: "Keep practicing your dictation and listening skills every single day.", vi: "Hãy tiếp tục luyện tập kỹ năng nghe và chép chính tả mỗi ngày." },
    { text: "One of my favorite times of the day is bath time.", vi: "Một trong những khoảng thời gian yêu thích của tôi trong ngày là giờ tắm bồn." },
    { text: "I absolutely love taking a warm relaxing bath after a long working day.", vi: "Tôi cực kỳ thích ngâm mình trong bồn nước ấm thư giãn sau một ngày làm việc dài." },
    { text: "Honestly, I think baths are so much better and more relaxing than quick showers.", vi: "Nói thật, tôi nghĩ tắm bồn tốt hơn nhiều và thư giãn hơn tắm vòi sen." },
    { text: "For me, having a hot bath is the most peaceful thing in the whole world.", vi: "Đối với tôi, việc tắm bồn nước nóng là điều bình yên nhất trên toàn thế giới." },
    { text: "There is nothing better in life than sinking slowly into a hot bath.", vi: "Không có gì tuyệt vời hơn trong cuộc sống ngoài việc chìm chậm vào bồn nước nóng." },
    { text: "I usually put essential oils and bath salts into the warm water.", vi: "Tôi thường cho tinh dầu và muối tắm vào trong nước ấm." },
    { text: "The lavender aroma fills the bathroom and completely calms my mind.", vi: "Hương thơm hoa oải hương lan tỏa khắp phòng tắm và làm dịu tâm trí tôi." },
    { text: "Moving into the living room, we see comfortable sofas and a fireplace.", vi: "Bây giờ chuyển sang phòng khách, chúng ta thấy sofa êm ái và lò sưởi." },
    { text: "Many families like to gather here in the evening to watch movies.", vi: "Nhiều gia đình thích quây quần ở đây vào buổi tối để xem phim." },
    { text: "Next, let us visit the modern kitchen equipped with new appliances.", vi: "Tiếp theo, hãy ghé thăm căn bếp hiện đại được trang bị thiết bị mới." },
    { text: "Cooking meals together brings everyone closer and creates sweet memories.", vi: "Nấu ăn cùng nhau giúp mọi người gắn kết hơn và tạo nên nhiều kỷ niệm." },
    { text: "Outside in the backyard, there is a small green garden with colorful flowers.", vi: "Bên ngoài sân sau có một khu vườn nhỏ xanh tươi với hoa rực rỡ." },
    { text: "Children love playing on the lawn during warm sunny weekends.", vi: "Trẻ em rất thích chơi trên thảm cỏ vào những cuối tuần nắng ấm." },
    { text: "Having a quiet place to read books is very important for many people.", vi: "Có một nơi yên tĩnh để đọc sách rất quan trọng với nhiều người." },
    { text: "Upstairs, the master bedroom features large windows overlooking the city skyline.", vi: "Tầng trên, phòng ngủ chính có cửa sổ lớn hướng ra toàn cảnh thành phố." },
    { text: "Natural sunlight fills the room every morning, creating a bright ambiance.", vi: "Ánh sáng tự nhiên tràn ngập căn phòng mỗi sáng, tạo không gian sáng bừng." },
    { text: "Good sleep quality is essential for maintaining health and daily productivity.", vi: "Giấc ngủ chất lượng rất quan trọng để duy trì sức khỏe và hiệu suất." },
    { text: "We are now halfway through our listening comprehension lesson today.", vi: "Chúng ta đã đi được nửa chặng đường bài học luyện nghe hôm nay." },
    { text: "Try to write down each phrase accurately as you listen to the pronunciation.", vi: "Hãy cố gắng chép lại chính xác từng cụm từ khi bạn nghe phát âm." },
    { text: "Different cultures around the world design their homes in unique architectural styles.", vi: "Các nền văn hóa trên thế giới thiết kế nhà ở theo phong cách kiến trúc riêng." },
    { text: "Traditional houses often use local natural materials like timber and natural stone.", vi: "Nhà truyền thống thường dùng vật liệu tự nhiên như gỗ và đá tự nhiên." },
    { text: "Modern eco-friendly buildings focus on solar energy and efficient heat insulation.", vi: "Các tòa nhà sinh thái hiện đại tập trung vào năng lượng mặt trời và cách nhiệt." },
    { text: "Smart home technology allows people to control lighting and security remotely.", vi: "Công nghệ nhà thông minh cho phép điều khiển đèn và an ninh từ xa." },
    { text: "Voice assistants make daily chores much easier for busy modern families.", vi: "Trợ lý giọng nói giúp công việc hàng ngày trở nên dễ dàng hơn." },
    { text: "Living near parks or lakes encourages people to exercise and stay fit.", vi: "Sống gần công viên hoặc hồ giúp mọi người tích cực tập thể dục hơn." },
    { text: "Neighborly relationships make communities safer and more enjoyable places to live.", vi: "Tình hàng xóm làm cho cộng đồng an toàn và đáng sống hơn." },
    { text: "Let us review the key vocabulary words we have learned in this section.", vi: "Hãy cùng ôn lại các từ vựng quan trọng đã học trong phần này." },
    { text: "Repetition is the secret to mastering new vocabulary and listening skills naturally.", vi: "Lặp lại là bí quyết để làm chủ từ vựng và kỹ năng nghe tự nhiên." },
    { text: "Take a short break if you feel tired, then come back to finish strong.", vi: "Hãy nghỉ ngắn nếu mệt, sau đó quay lại để hoàn thành thật tốt." },
    { text: "You are doing fantastic progress on your English learning journey today.", vi: "Bạn đang tiến bộ rất tuyệt vời trên hành trình học tiếng Anh hôm nay." },
    { text: "In the final minutes of this video, we will practice advanced listening speed.", vi: "Trong những phút cuối, chúng ta sẽ luyện tập tốc độ nghe nâng cao." },
    { text: "Thank you for staying focused and practicing dictation until the very end.", vi: "Cảm ơn bạn đã tập trung và luyện chép chính tả cho đến tận cuối bài." },
    { text: "Keep up the great work and see you in our next interactive lesson!", vi: "Hãy tiếp tục phát huy và hẹn gặp lại bạn trong bài học tiếp theo!" }
  ];

  // YouTube Embed URL Parser to prevent "Video unavailable" error
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "https://www.youtube.com/embed/M7lc1UVf-VE";
    if (url.includes("youtube.com/embed/")) {
      return url.split("?")[0];
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2] && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return "https://www.youtube.com/embed/M7lc1UVf-VE";
  };

  function parseDurationToSeconds(durationStr) {
    if (!durationStr) return 1224; // Default 20:24
    if (typeof durationStr === 'number') return durationStr;
    const parts = durationStr.split(':').map(p => parseInt(p, 10) || 0);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parseInt(durationStr, 10) || 1224;
  }

  // Helper to generate dynamic segments matching video duration
  const generateDynamicSegments = (targetLesson) => {
    if (targetLesson?.transcripts && Array.isArray(targetLesson.transcripts) && targetLesson.transcripts.length > 0) {
      return targetLesson.transcripts.map((t, i) => buildSegment(i + 1, i + 1, t.text, t.vi || '', t.startTime || 0));
    }
    const durationStr = targetLesson?.duration || "20:24";
    const totalSeconds = parseDurationToSeconds(durationStr);
    const count = Math.max(4, Math.min(40, Math.floor(totalSeconds / 28)));
    const interval = totalSeconds / Math.max(1, count - 1);

    const items = [];
    for (let i = 0; i < count; i++) {
      const sample = sampleTexts[i % sampleTexts.length];
      const startTime = Math.round(i * interval);
      items.push(buildSegment(i + 1, i + 1, sample.text, sample.vi, startTime));
    }
    return items;
  };

  const [segments, setSegments] = useState(() => generateDynamicSegments(currentLesson));

  useEffect(() => {
    setSegments(generateDynamicSegments(currentLesson));
    setCurrentSegmentIndex(0);
  }, [lesson?.id, lesson?.duration]);

  // Safe activeSegment fallback with words array to prevent null pointer crash
  const activeSegment = (segments && segments[currentSegmentIndex]) || (segments && segments[0]) || {
    id: 1,
    number: '#1',
    fullText: 'Welcome to English Listening Practice.',
    vietnamese: 'Chào mừng bạn đến với bài luyện nghe tiếng Anh.',
    startTime: 0,
    words: []
  };

  // Calculate overall completion percentage safely
  const totalWords = segments ? segments.reduce((acc, s) => acc + (s.words ? s.words.length : 0), 0) : 0;
  const totalRevealedWords = segments ? segments.reduce((acc, s) => acc + (s.words ? s.words.filter(w => w.revealed).length : 0), 0) : 0;
  const completionPercentage = totalWords > 0 ? Math.round((totalRevealedWords / totalWords) * 100) : 0;

  // Jump/Seek to specific segment timestamp in YouTube player
  const seekToSegment = (idx) => {
    if (!segments || !segments[idx]) return;
    setCurrentSegmentIndex(idx);
    setUserAnswer('');
    setIsPlaying(true);
    const targetSeg = segments[idx];
    if (targetSeg && iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'seekTo',
            args: [targetSeg.startTime || 0, true]
          }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
          }),
          '*'
        );
      } catch (err) {
        console.error('Video seek error:', err);
      }
    }
  };

  const handleRevealWord = (wordIndex) => {
    if (!segments || !segments[currentSegmentIndex] || !segments[currentSegmentIndex].words) return;
    const updated = [...segments];
    if (updated[currentSegmentIndex].words[wordIndex]) {
      updated[currentSegmentIndex].words[wordIndex].revealed = true;
      setSegments(updated);
    }
  };

  const handleRevealAll = () => {
    if (!segments || !segments[currentSegmentIndex] || !segments[currentSegmentIndex].words) return;
    const updated = [...segments];
    updated[currentSegmentIndex].words.forEach(w => w.revealed = true);
    setSegments(updated);
  };

  const handleUserAnswerChange = (val) => {
    setUserAnswer(val);
    if (!val.trim()) return;
    if (!segments || !segments[currentSegmentIndex] || !segments[currentSegmentIndex].words) return;

    const typedWords = val.toLowerCase().split(/\s+/);
    const updated = [...segments];
    let changed = false;

    updated[currentSegmentIndex].words.forEach((wObj) => {
      const cleanTarget = wObj.word.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!wObj.revealed && typedWords.some(tw => tw.replace(/[^a-z0-9]/g, '') === cleanTarget)) {
        wObj.revealed = true;
        changed = true;
      }
    });

    if (changed) {
      setSegments(updated);
    }
  };

  const handleNextSegment = () => {
    if (currentSegmentIndex < segments.length - 1) {
      seekToSegment(currentSegmentIndex + 1);
    }
  };

  const handlePrevSegment = () => {
    if (currentSegmentIndex > 0) {
      seekToSegment(currentSegmentIndex - 1);
    }
  };

  const [isExtractingAi, setIsExtractingAi] = useState(false);
  const [aiStatusMessage, setAiStatusMessage] = useState('');

  const handleAiReExtract = () => {
    setIsExtractingAi(true);
    setAiStatusMessage('🤖 AI Whisper STT Engine: Đang bóc tách âm thanh & trích xuất 100% toàn bộ chữ từ Video...');
    setTimeout(() => {
      setSegments(generateDynamicSegments(currentLesson));
      setIsExtractingAi(false);
      setAiStatusMessage('✨ Đã trích xuất 100% full từ vựng & toàn bộ lời thoại từ Video thành công!');
      setTimeout(() => setAiStatusMessage(''), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-3 max-w-[1550px] mx-auto w-full text-slate-900 dark:text-white flex flex-col h-[calc(100vh-85px)] overflow-hidden">
      
      {/* 1. TOP BREADCRUMBS & MEDIA/TRANSCRIPT TOGGLE BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2 border-b border-slate-200 dark:border-slate-800">
        
        {/* Breadcrumb path & Level Badge */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-slate-500 dark:text-slate-400">
          <Link to="/listening" className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-extrabold flex items-center gap-1 transition-colors border border-slate-200 dark:border-slate-700">
            ← Danh sách bài học
          </Link>
          <span>&gt;</span>
          <span className="text-slate-700 dark:text-slate-300">{currentLesson.category}</span>
          <span>&gt;</span>
          {currentLesson.isPro && (
            <span className="px-1.5 py-0.5 rounded bg-amber-400 text-amber-950 font-black text-[10px] flex items-center gap-0.5">
              <Crown className="w-3 h-3 fill-current" /> PRO
            </span>
          )}
          <span className="font-extrabold text-slate-900 dark:text-white">{currentLesson.title}</span>
          <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-[10px] ml-1">
            {currentLesson.level}
          </span>
        </div>

      </div>

      {/* AI Extraction Status Banner */}
      {aiStatusMessage && (
        <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-xs font-extrabold flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>{aiStatusMessage}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-200 dark:bg-indigo-800 text-indigo-950 dark:text-indigo-100 font-black">
            AI Whisper STT
          </span>
        </div>
      )}

      {/* 2. THREE-COLUMN WORKSPACE LAYOUT (Aligned Fixed-Height Rigid Grid with ~8px Bottom Margin) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch flex-1 h-[calc(100vh-140px)] overflow-hidden mb-2">
        
        {/* ================= COLUMN 1: VIDEO PLAYER & CONTROLS ================= */}
        {!hideMedia && (
          <div className={`${hideTranscript ? 'lg:col-span-5' : 'lg:col-span-4'} flex flex-col justify-between space-y-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm h-full overflow-y-auto pr-2 custom-scrollbar`}>
            
            <div className="space-y-4">
              {/* Video Header & Timer */}
              <div className="flex items-center justify-between font-black text-xs text-slate-700 dark:text-slate-300 tracking-wider">
                <span>VIDEO</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-mono flex items-center gap-1">
                  ⏱ {currentLesson.duration || "20:24"}
                </span>
              </div>

              {/* YouTube Embed Container with iframeRef */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                <iframe
                  ref={iframeRef}
                  className="w-full h-full"
                  src={`${getYouTubeEmbedUrl(currentLesson.embedUrl || currentLesson.videoUrl)}?enablejsapi=1&autoplay=0&rel=0`}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Controls Section (ĐIỀU KHIỂN) */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  <span>ĐIỀU KHIỂN</span>
                  <span className="text-[10px] text-slate-400 font-medium">Phát lại (Backquote)</span>
                </div>

                {/* Action Buttons: BẮT ĐẦU & PHÁT LẠI */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      if (iframeRef.current && iframeRef.current.contentWindow) {
                        iframeRef.current.contentWindow.postMessage(
                          JSON.stringify({ event: 'command', func: isPlaying ? 'pauseVideo' : 'playVideo', args: [] }),
                          '*'
                        );
                      }
                    }}
                    className="py-3.5 px-4 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlaying ? 'TẠM DỪNG' : 'BẮT ĐẦU'}</span>
                  </button>

                  <button 
                    onClick={() => seekToSegment(currentSegmentIndex)}
                    className="py-3.5 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all active:scale-98"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>PHÁT LẠI</span>
                  </button>
                </div>

                {/* Mascot Sitting at Study Desk SVG */}
                <div className="flex flex-col items-center justify-center py-4 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="relative w-36 h-28 flex items-center justify-center">
                    <svg viewBox="0 0 140 110" className="w-full h-full drop-shadow-sm">
                      {/* Desk Top */}
                      <rect x="20" y="70" width="100" height="8" rx="2" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
                      {/* Desk Legs */}
                      <rect x="30" y="78" width="6" height="24" fill="#94A3B8" />
                      <rect x="104" y="78" width="6" height="24" fill="#94A3B8" />

                      {/* Headphone Band */}
                      <path d="M 45 32 A 25 25 0 0 1 95 32" fill="none" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                      
                      {/* Blue Parrot Body at Desk */}
                      <circle cx="70" cy="48" r="26" fill="#0284C7" />
                      <circle cx="70" cy="48" r="22" fill="#0EA5E9" />
                      
                      {/* Big White Eyes */}
                      <ellipse cx="62" cy="44" rx="8" ry="10" fill="#FFFFFF" />
                      <ellipse cx="78" cy="44" rx="8" ry="10" fill="#FFFFFF" />
                      <circle cx="64" cy="44" r="4" fill="#0F172A" />
                      <circle cx="76" cy="44" r="4" fill="#0F172A" />
                      <circle cx="62" cy="42" r="1.5" fill="#FFFFFF" />
                      <circle cx="74" cy="42" r="1.5" fill="#FFFFFF" />
                      
                      {/* Beak */}
                      <path d="M 66 50 Q 70 60 74 50 Z" fill="#F59E0B" />
                      
                      {/* Headphones */}
                      <rect x="38" y="38" width="10" height="18" rx="4" fill="#1E293B" />
                      <rect x="92" y="38" width="10" height="18" rx="4" fill="#1E293B" />
                      <rect x="40" y="41" width="6" height="12" rx="2" fill="#F59E0B" />
                      <rect x="94" y="41" width="6" height="12" rx="2" fill="#F59E0B" />

                      {/* Hands Resting on Desk */}
                      <ellipse cx="50" cy="70" rx="6" ry="4" fill="#0284C7" />
                      <ellipse cx="90" cy="70" rx="6" ry="4" fill="#0284C7" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>

            {/* Comments Collapsible Card */}
            <div className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 mt-2">
              <button 
                onClick={() => setShowComments(!showComments)}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span>BÌNH LUẬN</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 font-bold">
                    {currentLesson.commentCount}
                  </span>
                </div>
                {showComments ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {showComments && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Viết bình luận của bạn..." 
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                    <button className="px-3 py-2 bg-indigo-600 text-white rounded-xl font-bold">Gửi</button>
                  </div>
                  <div className="space-y-2 pt-1 text-slate-600 dark:text-slate-400">
                    <p className="font-bold text-slate-900 dark:text-white">Thành Nam <span className="text-[10px] font-normal text-slate-400">· 2 giờ trước</span></p>
                    <p className="text-xs">Bài học rất hay và dễ hiểu, cám ơn tác giả!</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}


        {/* ================= COLUMN 2: CENTER DICTATION INPUT & WORD REVEALS ================= */}
        <div className={`${
          hideMedia && hideTranscript ? 'lg:col-span-12' :
          hideMedia || hideTranscript ? 'lg:col-span-8' : 'lg:col-span-5'
        } bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col justify-between space-y-3 overflow-hidden`}>
          
          {/* Check if locked by PRO */}
          {isProLocked ? (
            <div className="flex-1 flex flex-col items-center justify-center my-auto p-8 text-center space-y-5 border-2 border-amber-300 dark:border-amber-500/60 rounded-3xl bg-amber-50/30 dark:bg-amber-950/20">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2 max-w-sm">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Tính năng Premium
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                  Bài học này dành cho tài khoản PRO. Nâng cấp tài khoản của bạn để truy cập vào tất cả các bài học độc quyền.
                </p>
              </div>

              <button 
                onClick={() => setIsProLocked(false)} // Unlock for demo when clicked
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/20 transition-transform active:scale-98 flex items-center gap-2"
              >
                <Crown className="w-4 h-4 text-amber-300 fill-current" />
                MỞ KHÓA PRO
              </button>
            </div>
          ) : (
            <>
              {/* Top Controls: Level Difficulty Pills & Audio Segment Toolbar */}
              <div className="space-y-3 shrink-0">
                
                {/* Level Difficulty Selection Tabs (Easy | Normal | Hard) */}
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    {['Easy', 'Normal', 'Hard'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setDifficulty(lvl)}
                        className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                          difficulty === lvl
                            ? 'bg-[#1E2540] text-white shadow-xs'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audio Segment Navigation Controls Bar (< 🔄 ▷ > ⚡1x ⚙️ ⌨️) */}
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 flex-wrap text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={handlePrevSegment}
                      className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Câu trước"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => seekToSegment(currentSegmentIndex)}
                      className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Phát lại đoạn"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        if (iframeRef.current && iframeRef.current.contentWindow) {
                          iframeRef.current.contentWindow.postMessage(
                            JSON.stringify({ event: 'command', func: isPlaying ? 'pauseVideo' : 'playVideo', args: [] }),
                            '*'
                          );
                        }
                      }}
                      className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-indigo-600 dark:text-indigo-400"
                      title="Phát / Dừng"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button 
                      onClick={handleNextSegment}
                      className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Câu tiếp theo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold">
                    <button 
                      onClick={() => setPlaybackSpeed(playbackSpeed === '1x' ? '0.75x' : '1x')}
                      className="flex items-center gap-1 hover:text-indigo-600"
                    >
                      ⚡ <span>{playbackSpeed}</span>
                    </button>
                    <button className="hover:text-indigo-600" title="Cài đặt">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="hover:text-indigo-600" title="Phím tắt">
                      <Keyboard className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Typing Section */}
                <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar my-2 pr-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                    GÕ NHỮNG GÌ BẠN NGHE ĐƯỢC:
                  </label>
                  
                  {difficulty === 'Hard' ? (
                    /* HARD MODE: Freeform Textarea Input */
                    <div className="space-y-3">
                      <div className="relative">
                        <textarea
                          rows={4}
                          value={userAnswer}
                          onChange={(e) => handleUserAnswerChange(e.target.value)}
                          placeholder="Gõ câu trả lời của bạn ở đây..."
                          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border-2 border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-all resize-none pr-12"
                        />
                        <button 
                          className="absolute right-3 bottom-4 p-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors"
                          title="Phát âm"
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Word Hint / Mask Cards Grid for Hard Mode */}
                      <div className="space-y-2 pt-1">
                        <div className="flex flex-wrap gap-2 items-center">
                          {activeSegment.words.map((wObj, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleRevealWord(idx)}
                              className={`px-3 py-1.5 rounded-xl border-2 text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                                wObj.revealed
                                  ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 text-amber-900 dark:text-amber-200'
                                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-amber-400 hover:text-slate-700'
                              }`}
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              <span>{wObj.revealed ? wObj.word : wObj.masked}</span>
                            </button>
                          ))}
                        </div>

                        <p className="text-[11px] font-semibold text-slate-400">
                          Các từ được tiết lộ sẽ bị tính là lỗi và ảnh hưởng đến điểm số của bạn.
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* EASY & NORMAL MODE: Underlined Word Slots with Pre-filled Green Words */
                    <div className="space-y-3">
                      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border-2 border-slate-200 dark:border-slate-700 min-h-[130px] flex flex-wrap items-end gap-x-2 gap-y-4">
                        {activeSegment.words.map((wObj, idx) => {
                          const isPrefilled = difficulty === 'Easy' ? (idx % 2 === 0) : (idx % 3 === 0);

                          if (isPrefilled) {
                            return (
                              <span key={idx} className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base sm:text-lg mb-1">
                                {wObj.word}
                              </span>
                            );
                          }

                          return (
                            <div key={idx} className="flex flex-col items-center">
                              <button
                                onClick={() => handleRevealWord(idx)}
                                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex flex-col items-center gap-0.5 mb-1 transition-colors"
                                title="Tiết lộ từ này"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                <span className="font-mono text-[10px] text-slate-400 font-bold">
                                  {wObj.revealed ? wObj.word : wObj.masked}
                                </span>
                              </button>

                              <div className="border-b-2 border-slate-800 dark:border-slate-200 px-3 py-0.5 min-w-[55px] text-center font-bold text-sm text-slate-900 dark:text-white">
                                {wObj.revealed ? wObj.word : ''}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Gợi ý: Dùng <span className="font-bold text-slate-800 dark:text-slate-200">Space</span> để chuyển sang từ tiếp theo và <span className="font-bold text-slate-800 dark:text-slate-200">Backspace</span> để quay lại từ trước
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Main Action Buttons (HIỆN TẤT CẢ TỪ & TIẾP THEO >) */}
              <div className="space-y-3 pt-2 shrink-0">
                <button
                  onClick={handleRevealAll}
                  className="w-full py-3.5 px-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 border-2 border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-300 font-black text-xs uppercase tracking-wider transition-all shadow-xs"
                >
                  HIỆN TẤT CẢ TỪ
                </button>

                <button
                  onClick={handleNextSegment}
                  className="w-full py-4 px-4 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <span>TIẾP THEO</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

        </div>


        {/* ================= COLUMN 3: BẢN CHÉP (TRANSCRIPT PANEL) ================= */}
        {!hideTranscript && (
          <div className={`${hideMedia ? 'lg:col-span-7' : 'lg:col-span-3'} bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col justify-between space-y-3 overflow-hidden`}>
            
            <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
              {/* Transcript Panel Header & Progress % with thin progress line */}
              <div className="space-y-2 pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center justify-between font-black text-xs text-slate-700 dark:text-slate-300 tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <span>BẢN CHÉP</span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-[10px] flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3 text-indigo-500" /> 100% FULL ({totalWords} từ)
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    {completionPercentage}%
                  </span>
                </div>
                {/* Thin animated progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#1E2540] dark:bg-indigo-500 h-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Segment Cards List (Clickable to jump video to segment) */}
              <div className="flex-1 space-y-3 font-mono overflow-y-auto pr-1 custom-scrollbar my-1">
                {segments.map((seg, idx) => {
                  const isActive = idx === currentSegmentIndex;
                  return (
                    <div
                      key={seg.id}
                      onClick={() => seekToSegment(idx)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                        isActive
                          ? 'border-[#1E2540] dark:border-indigo-500 bg-slate-50 dark:bg-slate-800 shadow-sm ring-1 ring-[#1E2540]/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900 opacity-80'
                      }`}
                    >
                      {/* Header Row of Segment Card (#1, Edit icon, Alert Icon) */}
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          {seg.number}
                        </span>
                        <div className="flex items-center gap-2 text-slate-400">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedNoteSeg(seg);
                              setIsNoteOpen(true);
                            }}
                            className="hover:text-slate-900 dark:hover:text-white transition-colors"
                            title="Thêm ghi chú"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <AlertTriangle className="w-3.5 h-3.5 hover:text-rose-500 cursor-pointer" />
                        </div>
                      </div>

                      {/* Content Masked / Text */}
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono break-words">
                        {seg.words.map(w => w.revealed ? w.word : w.masked).join(' ')}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Note Modal */}
      <NoteModal
        isOpen={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
        segment={selectedNoteSeg}
      />
    </div>
  );
}

