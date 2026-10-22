import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, ChevronLeft, ChevronRight, 
  Mic, Volume2, Settings, Keyboard, MessageSquare, 
  ChevronUp, ChevronDown, Edit3, AlertTriangle, Eye, EyeOff,
  Video
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NoteModal from './NoteModal';
import { useAuth } from '../context/AuthContext';
import { Crown, Lock, CheckCircle2, Sparkles } from 'lucide-react';

export default function ShadowingStudio({ lesson }) {
  const { openProModal, updateProfile } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [autoPause, setAutoPause] = useState(true);
  const [hideTranscript, setHideTranscript] = useState(false);
  const [showIPA, setShowIPA] = useState(true);
  const [showTrans, setShowTrans] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [recordedSegments, setRecordedSegments] = useState({}); // Track recorded status per segment
  const [showComments, setShowComments] = useState(false);
  const [isProLocked, setIsProLocked] = useState(false);

  // Ref for iframe video control
  const iframeRef = useRef(null);

  // Note Modal state
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedNoteSeg, setSelectedNoteSeg] = useState(null);

  const currentLesson = lesson || {
    id: 1,
    title: 'My Perfect Bath Time',
    category: 'Short Story',
    level: 'B1',
    isPro: false,
    duration: '0:53',
    commentCount: 2010,
    videoUrl: 'M7lc1UVf-VE'
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "https://www.youtube.com/embed/M7lc1UVf-VE";
    if (url.length === 11 && !url.includes('/') && !url.includes('?') && !url.includes('=')) {
      return `https://www.youtube.com/embed/${url}`;
    }
    if (url.includes("youtube.com/embed/")) {
      return url.split("?")[0];
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2] && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return `https://www.youtube.com/embed/${url}`;
  };

  // IPA Dictionary Lookup Map
  const ipaDict = {
    one: '/wʌn/', of: '/əv/', my: '/maɪ/', favorite: '/ˈfeɪ.vər.ɪt/', times: '/taɪmz/',
    day: '/deɪ/', is: '/ɪz/', bath: '/bɑːθ/', time: '/taɪm/', i: '/aɪ/',
    absolutely: '/ˌæb.səˈluːt.li/', love: '/lʌv/', taking: '/ˈteɪ.kɪŋ/', a: '/ə/',
    honestly: '/ˈɒn.ɪst.li/', think: '/θɪŋk/', baths: '/bɑːðz/', are: '/ɑː/',
    so: '/səʊ/', much: '/mʌtʃ/', better: '/ˈbet.ər/', than: '/ðæn/', showers: '/ˈʃaʊ.əz/',
    for: '/fɔː/', me: '/miː/', having: '/ˈhæv.ɪŋ/', the: '/ðə/', most: '/məʊst/',
    relaxing: '/rɪˈlæk.sɪŋ/', thing: '/θɪŋ/', there: '/ðeə/', theres: '/ðeəz/',
    nothing: '/ˈnʌθ.ɪŋ/', in: '/ɪn/', life: '/laɪf/', sinking: '/ˈsɪŋ.kɪŋ/',
    into: '/ˈɪn.tuː/', hot: '/hɒt/', welcome: '/ˈwel.kəm/', to: '/tə/',
    english: '/ˈɪŋ.ɡlɪʃ/', listening: '/ˈlɪs.ən.ɪŋ/', practice: '/ˈpræk.tɪs/',
    beginners: '/bɪˈɡɪn.əz/', today: '/təˈdeɪ/', we: '/wi/', going: '/ˈɡəʊ.ɪŋ/',
    learn: '/lɜːn/', about: '/əˈbaʊt/', different: '/ˈdɪf.ər.ənt/', types: '/taɪps/',
    homes: '/həʊmz/', some: '/sʌm/', people: '/ˈpiː.pəl/', live: '/lɪv/',
    big: '/bɪɡ/', houses: '/ˈhaʊ.zɪz/', while: '/waɪl/', others: '/ˈʌð.əz/',
    cozy: '/ˈkəʊ.zi/', apartments: '/əˈpɑːt.mənts/'
  };

  const getIPA = (word) => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
    return ipaDict[clean] || `/${clean || 'word'}/`;
  };

  const buildShadowingSegment = (id, num, english, vietnamese, startTime = 0) => ({
    id,
    number: `#${num}`,
    english,
    vietnamese,
    startTime,
    words: english.split(/\s+/).filter(Boolean).map(w => ({
      word: w,
      ipa: getIPA(w)
    }))
  });

  const generateSegments = (targetLesson) => {
    let rawData = [];
    if (targetLesson?.transcript) {
      try {
        rawData = typeof targetLesson.transcript === 'string'
          ? JSON.parse(targetLesson.transcript)
          : targetLesson.transcript;
      } catch (e) {
        const lines = targetLesson.transcript.split('\n').filter(l => l.trim());
        rawData = lines.map((l, i) => ({ text: l, start: i * 5 }));
      }
    }

    if (rawData && Array.isArray(rawData) && rawData.length > 0) {
      return rawData.map((d, i) => buildShadowingSegment(i + 1, i + 1, d.text, d.vi || d.vietnamese || '', d.start || 0));
    }

    // Fallback if no data
    return [
      buildShadowingSegment(1, 1, "One of my favorite times of the day is bath time.", "Một trong những khoảng thời gian yêu thích của tôi trong ngày là giờ tắm bồn.", 0),
      buildShadowingSegment(2, 2, "I absolutely love taking a bath.", "Tôi cực kỳ thích tắm bồn.", 5)
    ];
  };

  const [shadowingSegments, setShadowingSegments] = useState(() => generateSegments(currentLesson));

  useEffect(() => {
    setShadowingSegments(generateSegments(currentLesson));
    setCurrentSegmentIndex(0);
  }, [lesson?.id]);

  const activeSegment = shadowingSegments[currentSegmentIndex] || shadowingSegments[0];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const seekToSegment = (idx) => {
    if (!shadowingSegments || !shadowingSegments[idx]) return;
    setCurrentSegmentIndex(idx);
    setIsPlaying(true);
    const targetSeg = shadowingSegments[idx];
    if (iframeRef.current && iframeRef.current.contentWindow) {
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

  const handleNextSegment = () => {
    if (currentSegmentIndex < shadowingSegments.length - 1) {
      seekToSegment(currentSegmentIndex + 1);
      setHasRecorded(false);
    } else {
      handleSubmitResult();
    }
  };

  const calculateShadowingScore = () => {
    const recordedCount = Object.keys(recordedSegments).length;
    const totalSegments = shadowingSegments.length;
    if (totalSegments === 0) return 0;
    return Math.round((recordedCount / totalSegments) * 100);
  };

  const handleSubmitResult = async () => {
    if (isSubmitting || isFinished) return;
    setIsSubmitting(true);

    const finalScore = calculateShadowingScore();

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dictation/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          lessonId: currentLesson.id,
          score: finalScore
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitResult(result.data);
        setIsFinished(true);
        if (result.data.totalExp !== undefined) {
          updateProfile({
            totalExp: result.data.totalExp,
            level: result.data.level
          });
        }
      }
    } catch (error) {
      console.error('Submit Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setHasRecorded(false);
    } else {
      setIsRecording(false);
      setHasRecorded(true);
      // Đánh dấu đoạn này đã được ghi âm
      setRecordedSegments(prev => ({
        ...prev,
        [currentSegmentIndex]: true
      }));
    }
  };

  return (
    <div className="space-y-3 max-w-[1550px] mx-auto w-full text-slate-900 dark:text-white flex flex-col h-[calc(100vh-85px)] overflow-hidden">
      
      {/* 1. TOP HEADER & BREADCRUMB BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2 border-b border-slate-200 dark:border-slate-800">
        
        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-slate-500 dark:text-slate-400">
          <Link to="/courses" className="hover:text-slate-800 dark:hover:text-slate-200">Topics</Link>
          <span>&gt;</span>
          <span className="text-slate-700 dark:text-slate-300">{currentLesson.category}</span>
          <span>&gt;</span>
          <span className="font-extrabold text-slate-900 dark:text-white">{currentLesson.title}</span>
          <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-[10px] ml-1">
            {currentLesson.level}
          </span>
        </div>

        {/* Mascot timer & Hide transcript button */}
        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
          
          {/* Parrot Mascot & Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold">
            <svg viewBox="0 0 100 100" className="w-5 h-5 drop-shadow-xs">
              <path d="M 22 45 A 30 30 0 0 1 78 45" fill="none" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
              <circle cx="50" cy="52" r="28" fill="#0EA5E9" />
              <ellipse cx="43" cy="46" rx="9" ry="11" fill="#FFFFFF" />
              <ellipse cx="57" cy="46" rx="9" ry="11" fill="#FFFFFF" />
              <circle cx="45" cy="46" r="4" fill="#0F172A" />
              <circle cx="55" cy="46" r="4" fill="#0F172A" />
              <path d="M 46 54 Q 50 64 54 54 Z" fill="#F59E0B" />
              <rect x="14" y="42" width="9" height="18" rx="4" fill="#1E293B" />
              <rect x="77" y="42" width="9" height="18" rx="4" fill="#1E293B" />
            </svg>
            <span>⏱ 0:00</span>
          </div>

        </div>

      </div>

      {/* 2. MAIN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 h-[calc(100vh-140px)] overflow-hidden mb-2">
        
        {/* ================= COLUMN 1: AUDIO & SHADOWING STUDIO (MAIN PANEL) ================= */}
        <div className={`${
          hideTranscript ? 'lg:col-span-12' : 'lg:col-span-8'
        } bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm h-full overflow-y-auto flex flex-col justify-between space-y-6 custom-scrollbar`}>
          
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
                onClick={openProModal}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/20 transition-transform active:scale-98 flex items-center gap-2"
              >
                <Crown className="w-4 h-4 text-amber-300 fill-current" />
                MỞ KHÓA PRO
              </button>
            </div>
          ) : (
          <div className="space-y-6">
            
            {/* Video Player */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-black text-xs text-slate-700 dark:text-slate-300 tracking-wider">
                <span>VIDEO BÀI HỌC</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-mono flex items-center gap-1">
                  ⏱ {currentLesson.duration || "0:53"}
                </span>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-200 dark:border-slate-800 shadow-lg">
                <iframe
                  ref={iframeRef}
                  className="w-full h-full"
                  src={`${getYouTubeEmbedUrl(currentLesson.videoUrl)}?enablejsapi=1&autoplay=0&rel=0`}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Controls Bar: Auto-pause toggle, Big Start Button, Options */}
            <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
              
              {/* Auto Pause Switch */}
              <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-slate-700 dark:text-slate-300">
                <input 
                  type="checkbox" 
                  checked={autoPause} 
                  onChange={(e) => setAutoPause(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1E2540] dark:peer-checked:bg-indigo-600 relative"></div>
                <span>Tự động dừng</span>
              </label>

              {/* Big Center BẮT ĐẦU Button */}
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
                className="px-10 py-3.5 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'TẠM DỪNG' : 'BẮT ĐẦU'}</span>
              </button>

              {/* Right Options Toolbar (Speed, Settings, Shortcuts) */}
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-400">
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

            {/* Word-by-Word IPA Underline Display */}
            <div className="py-8 my-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center justify-center gap-x-4 gap-y-6 px-6 text-center">
              {activeSegment.words.map((wObj, idx) => (
                <div key={idx} className="flex flex-col items-center group cursor-pointer">
                  {/* English Word with Underline */}
                  <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white border-b-2 border-slate-700 dark:border-slate-300 group-hover:border-indigo-600 group-hover:text-indigo-600 transition-colors pb-0.5">
                    {wObj.word}
                  </span>
                  
                  {/* IPA Phonetic below */}
                  {showIPA && (
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 mt-1">
                      {wObj.ipa}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Recording Buttons Row: PHÁT LẠI GHI ÂM & GHI ÂM */}
            <div className="flex items-center justify-center gap-4 pt-2">
              {isFinished && submitResult ? (
                <div className="w-full p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-500/50 animate-fade-in space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">HOÀN THÀNH SHADOWING!</span>
                    <span className="text-xs font-bold text-emerald-600">Score: {Math.round(submitResult.score)}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>+{submitResult.expGained} EXP</span>
                    {submitResult.levelUp && (
                      <span className="px-2 py-0.5 rounded bg-amber-400 text-amber-950 text-[10px] font-black">LEVEL UP TO {submitResult.level}!</span>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => seekToSegment(currentSegmentIndex)}
                    disabled={isSubmitting}
                    className="px-6 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xs transition-all active:scale-98 disabled:opacity-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>PHÁT LẠI ĐOẠN</span>
                  </button>

                  <button
                    onClick={handleToggleRecord}
                    disabled={isSubmitting}
                    className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-98 ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white'
                    } disabled:opacity-50`}
                  >
                    <Mic className="w-4 h-4 fill-current" />
                    <span>{isRecording ? '🔴 ĐANG GHI ÂM...' : 'GHI ÂM'}</span>
                  </button>

                  <button
                    onClick={handleNextSegment}
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50"
                  >
                    <span>{currentSegmentIndex === shadowingSegments.length - 1 ? (isSubmitting ? 'ĐANG NỘP...' : 'XONG') : 'TIẾP'}</span>
                    {currentSegmentIndex === shadowingSegments.length - 1 ? <CheckCircle2 className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </>
              )}
            </div>

          </div>
          )}

          {/* Comments Collapsible Section at Bottom */}
          <div className="pt-6">
            <div className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
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
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ================= COLUMN 2: TRANSCRIPT PANEL (BẢN CHÉP) ================= */}
        {!hideTranscript && (
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col justify-between space-y-3 overflow-hidden">
            
            <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
              {/* Header with IPA & Trans Toggles and % Pill & Progress Line */}
              <div className="space-y-2 pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center justify-between font-black text-xs text-slate-700 dark:text-slate-300">
                  <span className="tracking-wider">BẢN CHÉP</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowIPA(!showIPA)}
                      className={`px-2 py-0.5 rounded text-[11px] font-extrabold flex items-center gap-1 transition-colors ${
                        showIPA ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <Eye className="w-3 h-3" /> IPA
                    </button>

                    <button
                      onClick={() => setShowTrans(!showTrans)}
                      className={`px-2 py-0.5 rounded text-[11px] font-extrabold flex items-center gap-1 transition-colors ${
                        showTrans ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <Eye className="w-3 h-3" /> Trans
                    </button>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    {calculateShadowingScore()}%
                  </span>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1E2540] dark:bg-indigo-500 h-full transition-all duration-300"
                    style={{ width: `${calculateShadowingScore()}%` }}
                  />
                </div>
              </div>

              {/* Scrollable Segment Cards List */}
              <div className="flex-1 space-y-3 font-mono overflow-y-auto pr-1 custom-scrollbar my-1">
                {shadowingSegments.map((seg, idx) => {
                  const isActive = idx === currentSegmentIndex;
                  const isRecorded = recordedSegments[idx];
                  return (
                    <div
                      key={seg.id}
                      onClick={() => {
                        seekToSegment(idx);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                        isActive
                          ? 'border-[#1E2540] dark:border-indigo-500 bg-slate-50 dark:bg-slate-800 shadow-sm ring-1 ring-[#1E2540]/20'
                          : isRecorded
                            ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/10'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900 opacity-90'
                      }`}
                    >
                      {/* Header Row (#1, Note Icon, Alert Icon) */}
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 dark:text-white">
                            {seg.number}
                          </span>
                          {isRecorded && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                        </div>
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

                      {/* English Sentence Text */}
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white leading-relaxed">
                        {seg.english}
                      </p>

                      {/* Vietnamese Translation (if enabled) */}
                      {showTrans && (
                        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 italic leading-snug">
                          {seg.vietnamese}
                        </p>
                      )}
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
