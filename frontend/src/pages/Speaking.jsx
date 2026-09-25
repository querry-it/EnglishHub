import React, { useState } from 'react';
import { 
  Mic, MicOff, Phone, PhoneOff, Users, RefreshCw, Lock, Globe, 
  Sparkles, ShieldCheck, Volume2, MessageSquare, Plus, Check, Play,
  Radio, VolumeX, UserCheck
} from 'lucide-react';

export default function Speaking() {
  const [selectedLevel, setSelectedLevel] = useState('B1');
  const [selectedTopics, setSelectedTopics] = useState(['Daily Conversation']);
  
  // Room Creation state
  const [roomName, setRoomName] = useState('English Practice Room');
  const [maxMembers, setMaxMembers] = useState(5);
  const [isPrivate, setIsPrivate] = useState(false);
  
  // Active Call state
  const [activeCall, setActiveCall] = useState(null); // null = lobby, object = active call room
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const topicsList = [
    'IELTS Speaking', 'TOEIC Speaking', 'TOEFL',
    'Business English', 'Academic English', 'Daily Conversation',
    'Travel', 'Food', 'Music', 'Sport', 'Tech', 'Movies',
    'Books', 'Science', 'Art', 'Gaming', 'Business',
    'Health', 'Fashion', 'Nature'
  ];

  const [availableRooms, setAvailableRooms] = useState([
    {
      id: 1,
      name: 'Em ơi anh làm gì sai sao em nỡ buông câu dừng lại',
      membersCount: 2,
      maxMembers: 5,
      isPrivate: false,
      avatars: ['👨‍💼', '👩‍🦰']
    },
    {
      id: 2,
      name: 'đợi bạn',
      membersCount: 2,
      maxMembers: 2,
      isPrivate: true,
      avatars: ['👱‍♂️', '👩‍🦱']
    },
    {
      id: 3,
      name: 'Luyện IELTS Speaking Part 2 & 3',
      membersCount: 3,
      maxMembers: 4,
      isPrivate: false,
      avatars: ['👨‍🎓', '👩‍🎓', '🧑‍💻']
    }
  ]);

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter(t => t !== topic));
      }
    } else {
      if (selectedTopics.length < 10) {
        setSelectedTopics([...selectedTopics, topic]);
      }
    }
  };

  const handleStartCall = () => {
    setActiveCall({
      name: `Phòng ghép nhanh (${selectedLevel})`,
      level: selectedLevel,
      topic: selectedTopics.join(', '),
      members: [
        { name: 'huy nguyen (Bạn)', role: 'Tôi', avatar: 'h', isSpeaking: true },
        { name: 'Sarah Jenkins', role: 'Thành viên', avatar: '👩‍🦰', isSpeaking: false },
        { name: 'Alex Rivera', role: 'Thành viên', avatar: '👨‍💼', isSpeaking: false }
      ]
    });
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    const newRoom = {
      id: Date.now(),
      name: roomName,
      membersCount: 1,
      maxMembers: maxMembers,
      isPrivate: isPrivate,
      avatars: ['👨‍💼']
    };
    setAvailableRooms([newRoom, ...availableRooms]);
    setActiveCall({
      name: roomName,
      level: selectedLevel,
      topic: selectedTopics[0] || 'Tự do',
      members: [
        { name: 'huy nguyen (Chủ phòng)', role: 'Chủ phòng', avatar: 'h', isSpeaking: true }
      ]
    });
  };

  const handleJoinRoom = (room) => {
    if (room.membersCount >= room.maxMembers) return;
    setActiveCall({
      name: room.name,
      level: selectedLevel,
      topic: 'Luyện hội thoại nhóm',
      members: [
        { name: 'huy nguyen (Bạn)', role: 'Thành viên', avatar: 'h', isSpeaking: false },
        { name: 'Member #1', role: 'Thành viên', avatar: '👨‍💼', isSpeaking: true },
        { name: 'Member #2', role: 'Thành viên', avatar: '👩‍🦰', isSpeaking: false }
      ]
    });
  };

  return (
    <div className="w-full min-h-screen pb-12">
        
        {/* ================= ACTIVE VOICE CALL ROOM MODAL / VIEW ================= */}
        {activeCall ? (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
            
            {/* Top Bar Header */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold animate-pulse">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-base text-slate-900 dark:text-white">
                    {activeCall.name}
                  </h2>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    🟢 Đang kết nối thoại trực tuyến · Trình độ {activeCall.level}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveCall(null)}
                className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-transform active:scale-98"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Rời Phòng</span>
              </button>
            </div>

            {/* Main Voice Room Stage */}
            <div className="bg-[#1E2540] text-white p-8 rounded-3xl border-2 border-indigo-900/50 shadow-2xl space-y-8 text-center relative overflow-hidden">
              
              {/* Background Glow */}
              <div className="absolute -top-24 -left-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl" />

              <div className="space-y-2 relative z-10">
                <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 font-extrabold text-xs border border-white/20">
                  💡 Chủ đề gợi ý: {activeCall.topic}
                </span>
                <p className="text-xs text-slate-300 font-medium pt-1">
                  Hãy bật mic và tự tin chào hỏi các bạn trong phòng nhé!
                </p>
              </div>

              {/* Members Avatar Stage */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 max-w-2xl mx-auto">
                {activeCall.members.map((m, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-3">
                    <div className={`relative w-24 h-24 rounded-full flex items-center justify-center font-bold text-3xl border-4 transition-all ${
                      m.isSpeaking && !isMuted
                        ? 'border-emerald-400 shadow-lg shadow-emerald-500/40 scale-105 ring-4 ring-emerald-400/30 animate-pulse'
                        : 'border-slate-600 bg-slate-800'
                    }`}>
                      {m.avatar === 'h' ? (
                        <div className="w-full h-full rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl">
                          H
                        </div>
                      ) : (
                        <span>{m.avatar}</span>
                      )}
                      
                      {m.isSpeaking && (
                        <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[9px] uppercase">
                          Đang nói...
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-extrabold text-sm text-white">{m.name}</p>
                      <span className="text-[10px] text-slate-400 font-bold">{m.role}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Audio Wave Visualizer Simulation */}
              <div className="flex items-center justify-center gap-1.5 h-10 relative z-10">
                {[40, 70, 30, 90, 60, 100, 50, 80, 40, 60, 80, 30].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-1.5 bg-emerald-400 rounded-full transition-all duration-300"
                    style={{ height: !isMuted ? `${h}%` : '20%' }}
                  />
                ))}
              </div>

              {/* Call Control Toolbar */}
              <div className="flex items-center justify-center gap-4 relative z-10 pt-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                    isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                  title={isMuted ? 'Mở Mic' : 'Tắt Mic'}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6 text-emerald-400" />}
                </button>

                <button
                  onClick={() => setIsDeafened(!isDeafened)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                    isDeafened ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                  title={isDeafened ? 'Mở âm thanh' : 'Tắt loa'}
                >
                  {isDeafened ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 text-sky-400" />}
                </button>

                <button
                  onClick={() => setActiveCall(null)}
                  className="w-16 h-14 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-xl shadow-rose-600/30 transition-transform active:scale-95"
                  title="Kết thúc cuộc gọi"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* ================= MAIN SPEAKING LOBBY & MATCHMAKING VIEW ================= */
          <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4">
            
            {/* 1. PAGE TITLE & SUBTITLE */}
            <div className="text-center space-y-2 py-4">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Luyện nói tiếng Anh online với người thật
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold max-w-3xl mx-auto leading-relaxed">
                Voice chat miễn phí với người thật — luyện hội thoại hằng ngày, cải thiện speaking IELTS & TOEIC và xây dựng sự trôi chảy tiếng Anh thực tế
              </p>
            </div>

            {/* 2. MAIN TWO-COLUMN GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT COLUMN: CHỌN TRÌNH ĐỘ & CHỦ ĐỀ (6 cols) */}
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                
                {/* 1. CHỌN TRÌNH ĐỘ */}
                <div className="space-y-3">
                  <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                    CHỌN TRÌNH ĐỘ
                  </h3>

                  <div className="grid grid-cols-6 gap-2">
                    {levels.map((lvl) => {
                      const isActive = selectedLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          onClick={() => setSelectedLevel(lvl)}
                          className={`py-2.5 rounded-2xl font-black text-xs transition-all border ${
                            isActive
                              ? 'bg-[#1E2540] dark:bg-indigo-600 text-white border-[#1E2540] dark:border-indigo-600 shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. CHỦ ĐỀ QUAN TÂM */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                      CHỦ ĐỀ QUAN TÂM <span className="text-[11px] font-semibold text-slate-400 lowercase">(không bắt buộc)</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {topicsList.map((t) => {
                      const isActive = selectedTopics.includes(t);
                      return (
                        <button
                          key={t}
                          onClick={() => toggleTopic(t)}
                          className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                            isActive
                              ? 'bg-[#1E2540] dark:bg-indigo-600 text-white border-[#1E2540] dark:border-indigo-600 shadow-sm font-extrabold'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] font-bold text-slate-400 pt-1">
                    {selectedTopics.length}/10 đã chọn
                  </p>
                </div>

                {/* 3. MAIN ACTION BUTTON: BẮT ĐẦU GỌI */}
                <button
                  onClick={handleStartCall}
                  className="w-full py-4 px-4 rounded-2xl bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20 border-2 border-indigo-900/30 transition-all active:scale-98"
                >
                  <Mic className="w-5 h-5 text-emerald-400" />
                  <span>BẮT ĐẦU GỌI</span>
                </button>

                {/* Footer Stats & Rules */}
                <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <Users className="w-4 h-4 text-emerald-500" />
                    69 đang trò chuyện
                  </span>
                  <span>·</span>
                  <button className="hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 transition-colors">
                    <ShieldCheck className="w-4 h-4 text-indigo-500" />
                    Quy tắc cộng đồng
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: TẠO PHÒNG & PHÒNG HIỆN CÓ (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* 1. TẠO PHÒNG CARD */}
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                  <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600" />
                    Tạo phòng
                  </h3>

                  <form onSubmit={handleCreateRoom} className="space-y-4">
                    {/* Tên phòng */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                        Tên phòng <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text"
                        required
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    {/* Số thành viên tối đa */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                        Số thành viên tối đa
                      </label>
                      <div className="flex items-center gap-3">
                        {[2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setMaxMembers(num)}
                            className={`w-10 h-10 rounded-2xl font-black text-xs transition-all border ${
                              maxMembers === num
                                ? 'bg-[#1E2540] dark:bg-indigo-600 text-white border-[#1E2540] dark:border-indigo-600 shadow-sm'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Visibility Privacy Toggle */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsPrivate(false)}
                        className={`py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                          !isPrivate
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 font-extrabold shadow-2xs'
                            : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <Globe className="w-4 h-4 text-sky-500" />
                        <span>Công khai</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsPrivate(true)}
                        className={`py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                          isPrivate
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 font-extrabold shadow-2xs'
                            : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <Lock className="w-4 h-4 text-amber-500" />
                        <span>Riêng tư</span>
                      </button>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20 transition-all active:scale-98"
                    >
                      TẠO PHÒNG
                    </button>
                  </form>
                </div>

                {/* 2. PHÒNG HIỆN CÓ LIST CARD */}
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-500" />
                      Phòng hiện có
                    </h3>

                    <button className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-[11px] flex items-center gap-1 hover:bg-slate-100">
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Làm mới</span>
                    </button>
                  </div>

                  {/* Rooms List */}
                  <div className="space-y-3">
                    {availableRooms.map((room) => {
                      const isFull = room.membersCount >= room.maxMembers;
                      return (
                        <div
                          key={room.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 transition-all hover:border-slate-300"
                        >
                          <div className="space-y-1.5 min-w-0">
                            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                              {room.isPrivate && <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                              <span>{room.name}</span>
                              <span className="text-[11px] font-bold text-slate-400 shrink-0">
                                {room.membersCount}/{room.maxMembers}
                              </span>
                            </h4>

                            <div className="flex items-center gap-1">
                              {room.avatars.map((av, avIdx) => (
                                <span key={avIdx} className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-xs flex items-center justify-center border border-white dark:border-slate-800">
                                  {av}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button
                            disabled={isFull}
                            onClick={() => handleJoinRoom(room)}
                            className={`px-5 py-2.5 rounded-xl font-black text-xs shrink-0 transition-all active:scale-98 ${
                              isFull
                                ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-[#1E2540] hover:bg-[#161a2e] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white shadow-xs'
                            }`}
                          >
                            {isFull ? 'ĐẦY' : 'THAM GIA'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
  );
}
