import React, { useState } from 'react';
import { 
  Play, Pause, RotateCcw, ChevronLeft, ChevronRight, 
  Mic, Volume2, Settings, Keyboard, MessageSquare, 
  ChevronUp, ChevronDown, Edit3, AlertTriangle, Eye, EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NoteModal from './NoteModal';

export default function ShadowingStudio({ lesson }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [autoPause, setAutoPause] = useState(true);
  const [hideTranscript, setHideTranscript] = useState(false);
  const [showIPA, setShowIPA] = useState(true);
  const [showTrans, setShowTrans] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);

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
    commentCount: 2010
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

  const buildShadowingSegment = (id, num, english, vietnamese) => ({
    id,
    number: `#${num}`,
    english,
    vietnamese,
    words: english.split(/\s+/).map(w => ({
      word: w,
      ipa: getIPA(w)
    }))
  });

  const rawShadowingData = [
    { num: 1, en: "One of my favorite times of the day is bath time.", vi: "Một trong những khoảng thời gian yêu thích của tôi trong ngày là giờ tắm bồn." },
    { num: 2, en: "I absolutely love taking a bath.", vi: "Tôi cực kỳ thích tắm bồn." },
    { num: 3, en: "Honestly, I think baths are so much better than showers.", vi: "Nói thật, tôi nghĩ tắm bồn tốt hơn nhiều so với tắm vòi sen." },
    { num: 4, en: "For me, having a bath is the most relaxing thing.", vi: "Đối với tôi, việc tắm bồn là điều thư giãn nhất." },
    { num: 5, en: "There's nothing better in life...", vi: "Không có gì tuyệt vời hơn trong cuộc sống..." },
    { num: 6, en: "...than sinking into a hot bath.", vi: "...ngoài việc ngâm mình vào một bồn nước nóng." },
    { num: 7, en: "Welcome to English Listening Practice for Beginners.", vi: "Chào mừng bạn đến với bài luyện nghe tiếng Anh cho người mới bắt đầu." },
    { num: 8, en: "Today we are going to learn about different types of homes.", vi: "Hôm nay chúng ta sẽ học về các loại hình nhà ở khác nhau." },
    { num: 9, en: "Some people live in big houses while others live in cozy apartments.", vi: "Một số người sống trong những ngôi nhà lớn trong khi những người khác sống trong các căn hộ ấm cúng." },
    { num: 10, en: "Let us take a complete tour around the beautiful neighborhood.", vi: "Chúng ta hãy dạo một vòng quanh khu phố xinh đẹp này." },
    { num: 11, en: "You can hear the cars passing by and birds singing outside.", vi: "Bạn có thể nghe thấy tiếng ô tô chạy qua và tiếng chim hót bên ngoài." },
    { num: 12, en: "Pay close attention to each word you hear in this audio lesson.", vi: "Hãy chú ý kỹ đến từng từ bạn nghe được trong bài học âm thanh này." },
    { num: 13, en: "Keep practicing your dictation and listening skills every single day.", vi: "Hãy tiếp tục luyện tập kỹ năng nghe và chép chính tả mỗi ngày." }
  ];

  const shadowingSegments = rawShadowingData.map(d => buildShadowingSegment(d.num, d.num, d.en, d.vi));

  const activeSegment = shadowingSegments[currentSegmentIndex] || shadowingSegments[0];

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setHasRecorded(false);
    } else {
      setIsRecording(false);
      setHasRecorded(true);
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
          
          <div className="space-y-6">
            
            {/* HTML5 Audio Player Bar */}
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current text-indigo-600" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <span className="font-mono text-xs font-bold shrink-0">0:00 / {currentLesson.duration}</span>

              {/* Seek Track Bar */}
              <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden relative cursor-pointer">
                <div className="bg-slate-700 dark:bg-indigo-500 h-full w-[15%] rounded-full"></div>
              </div>

              <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 shrink-0">
                <Volume2 className="w-4 h-4" />
              </button>
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
                onClick={() => setIsPlaying(!isPlaying)}
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
              <button
                onClick={() => setIsPlaying(true)}
                className="px-6 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xs transition-all active:scale-98"
              >
                <RotateCcw className="w-4 h-4" />
                <span>PHÁT LẠI GHI ÂM</span>
              </button>

              <button
                onClick={handleToggleRecord}
                className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-98 ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white'
                }`}
              >
                <Mic className="w-4 h-4 fill-current" />
                <span>{isRecording ? '🔴 ĐANG GHI ÂM...' : 'GHI ÂM'}</span>
              </button>
            </div>

          </div>

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
                    0%
                  </span>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#1E2540] dark:bg-indigo-500 h-full w-[0%] transition-all duration-300" />
                </div>
              </div>

              {/* Scrollable Segment Cards List */}
              <div className="flex-1 space-y-3 font-mono overflow-y-auto pr-1 custom-scrollbar my-1">
                {shadowingSegments.map((seg, idx) => {
                  const isActive = idx === currentSegmentIndex;
                  return (
                    <div
                      key={seg.id}
                      onClick={() => {
                        setCurrentSegmentIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                        isActive
                          ? 'border-[#1E2540] dark:border-indigo-500 bg-slate-50 dark:bg-slate-800 shadow-sm ring-1 ring-[#1E2540]/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900 opacity-90'
                      }`}
                    >
                      {/* Header Row (#1, Note Icon, Alert Icon) */}
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                        <span className="font-black text-slate-900 dark:text-white">
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
