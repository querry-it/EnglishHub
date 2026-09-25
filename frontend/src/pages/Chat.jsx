import React, { useState } from 'react';
import { 
  MessageSquare, MessageCircle, Users, RefreshCw, Smile, 
  Send, Search, ShieldOff, Sparkles, Flame, CheckCircle2, UserPlus, ChevronRight, Lightbulb
} from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';

export default function Chat() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('community'); // 'community' | 'friends'
  const [inputMessage, setInputMessage] = useState('');
  const [friendSearch, setFriendSearch] = useState('');
  const [showBlocked, setShowBlocked] = useState(false);

  // Live Community Chat Dataset (Matching Screenshot 1)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'achievement',
      text: 'Bình Nguyễn Thanh just reached Level 25!',
      icon: '💡'
    },
    {
      id: 2,
      type: 'achievement',
      text: 'Nguyễn Tường Vy just reached Level 15!',
      icon: '💡'
    },
    {
      id: 3,
      user: 'mgh',
      level: 3,
      time: '9h',
      text: 'alo mn',
      avatarBg: 'bg-stone-700'
    },
    {
      id: 4,
      user: 'auraa',
      level: 1,
      time: '9h',
      text: 'thoi buoi bay glo 6.5 ielts con cao khong mn',
      avatarBg: 'bg-slate-700'
    },
    {
      id: 5,
      user: 'kurolin_version1',
      level: 7,
      time: '9h',
      text: 'ko bt:) tuy theo do tuoi a',
      avatarBg: 'bg-indigo-600'
    },
    {
      id: 6,
      user: 'kurolin_version1',
      level: 7,
      time: '9h',
      text: 'nhung 8. cx ko it',
      avatarBg: 'bg-indigo-600'
    },
    {
      id: 7,
      user: 'txinchao2k',
      level: 5,
      time: '9h',
      text: 'hi',
      avatarBg: 'bg-emerald-600'
    },
    {
      id: 8,
      type: 'achievement',
      text: 'Trần Trúc just reached Level 10!',
      icon: '💡'
    },
    {
      id: 9,
      type: 'achievement',
      text: 'Minh Anh Đỗ just hit a 30-day streak and claimed the reward!',
      icon: '🔥'
    },
    {
      id: 10,
      user: 'thuymy',
      level: 1,
      time: '9h',
      text: 'xin chào mn, mình là bạn mới',
      avatarBg: 'bg-rose-500'
    },
    {
      id: 11,
      user: 'meo_11',
      level: 1,
      time: '3h',
      text: 'sau khi học xong 1 nhóm từ, ví dụ như 49 thẻ family thì bấm đâu để ôn tập từ vậy ạ',
      avatarBg: 'bg-sky-600'
    },
    {
      id: 12,
      user: 'meo_11',
      level: 1,
      time: '3h',
      text: 'lúc mà học xong 1 nhóm từ ví dụ như family 49 thẻ thì ôn tập từ ở đâu vayy ạ',
      avatarBg: 'bg-sky-600'
    }
  ]);

  // Handle Send Message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsgObj = {
      id: Date.now(),
      user: user?.username || 'huy nguyen',
      level: 1,
      time: 'Vừa xong',
      text: inputMessage.trim(),
      avatarBg: 'bg-[#1E2540]'
    };

    setMessages([...messages, newMsgObj]);
    setInputMessage('');
  };

  // Add quick emoji
  const handleAddEmoji = (emoji) => {
    setInputMessage(prev => prev + emoji);
  };

  return (
    <AppLayout>
      <div className="w-full min-h-screen pb-12 select-none">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 space-y-4">
          
          {/* ================= 1. TOP SUB-TABS & REFRESH BUTTON ================= */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('community')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                  activeTab === 'community'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-indigo-500" />
                <span>CHAT CỘNG ĐỒNG</span>
              </button>

              <button
                onClick={() => setActiveTab('friends')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                  activeTab === 'friends'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-500" />
                <span>BẠN BÈ</span>
              </button>
            </div>

            <button 
              title="Làm mới cuộc trò chuyện"
              className="w-9 h-9 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors shadow-2xs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

          </div>

          {/* ================= 2. TAB 1: CHAT CỘNG ĐỒNG (LIVE CHAT STREAM) ================= */}
          {activeTab === 'community' ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col h-[calc(100vh-210px)] min-h-[500px]">
              
              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-3.5">
                {messages.map((msg) => {
                  if (msg.type === 'achievement') {
                    return (
                      <div key={msg.id} className="flex items-center gap-2 text-xs font-bold text-slate-400 italic py-1 pl-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{msg.text}</span>
                      </div>
                    );
                  }

                  return (
                    <div key={msg.id} className="flex items-start gap-3 group">
                      {/* Avatar */}
                      <div className="relative shrink-0 mt-0.5">
                        <div className={`w-8 h-8 rounded-full ${msg.avatarBg} text-white flex items-center justify-center font-bold text-xs`}>
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[8px] font-black">
                          Lv.{msg.level}
                        </span>
                      </div>

                      {/* Message Content */}
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                            @{msg.user}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {msg.time}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 inline-block">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Message Input Box (Matching Screenshot 1) */}
              <div className="p-3 bg-white dark:bg-slate-900 border-t-2 border-slate-100 dark:border-slate-800">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input 
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="w-full pl-4 pr-20 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors"
                  />
                  
                  <div className="absolute right-3 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleAddEmoji('😊')}
                      className="text-slate-400 hover:text-amber-500 p-1 transition-colors"
                      title="Chèn biểu cảm"
                    >
                      <Smile className="w-4 h-4" />
                    </button>

                    <button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      className="w-8 h-8 rounded-xl bg-[#1E2540] dark:bg-indigo-600 text-white flex items-center justify-center hover:bg-[#151a2e] disabled:opacity-40 transition-all shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            /* ================= 3. TAB 2: BẠN BÈ (FRIENDS LIST - MATCHING SCREENSHOT 2) ================= */
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-6 min-h-[500px]">
              
              {/* Friends Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  value={friendSearch}
                  onChange={(e) => setFriendSearch(e.target.value)}
                  placeholder="Tìm theo @username..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors"
                />
              </div>

              {/* Blocked Users Accordion Header */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowBlocked(!showBlocked)}
                  className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors"
                >
                  <ChevronRight className={`w-4 h-4 transition-transform ${showBlocked ? 'rotate-90' : ''}`} />
                  <ShieldOff className="w-4 h-4 text-slate-400" />
                  <span>NGƯỜI DÙNG ĐÃ CHẶN</span>
                </button>

                {showBlocked && (
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400">
                    Chưa có người dùng nào bị chặn.
                  </div>
                )}
              </div>

              {/* Friends List Header & Empty Canvas */}
              <div className="space-y-6 pt-2">
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  BẠN BÈ
                </h3>

                <div className="py-20 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto border-2 border-slate-200 dark:border-slate-700">
                    <Users className="w-8 h-8 text-emerald-500" />
                  </div>
                  <p className="text-xs font-extrabold text-slate-400">
                    Chưa có bạn bè
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400 max-w-sm mx-auto">
                    Gõ <span className="font-bold text-indigo-600">@username</span> trên thanh tìm kiếm phía trên để kết bạn và trò chuyện trực tiếp.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </AppLayout>
  );
}
