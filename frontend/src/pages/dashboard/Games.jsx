import React, { useState } from 'react';
import { 
  Gamepad2, Rocket, CloudRain, Volume2, Apple, Wind, Puzzle, 
  Swords, Sparkles, Trophy, Star, ArrowRight, CheckCircle2, RotateCcw,
  Clock, Activity, ChevronRight, Lightbulb, Droplets, Zap
} from 'lucide-react';

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const games = [
    {
      id: 'arena',
      title: 'Đấu Trường Từ Vựng',
      desc: 'Đấu trắc nghiệm từ vựng 1v1 thời gian thực với người chơi khác — ai trả lời đúng và nhanh hơn sẽ thắng.',
      badge: 'ĐẤU ONLINE',
      badgeBg: 'bg-sky-500',
      icon: Swords,
      iconBg: 'bg-rose-500 text-white',
      btnBg: 'bg-rose-500 hover:bg-rose-600',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=80',
      isNew: false
    },
    {
      id: 'typing',
      title: 'Luyện Gõ',
      desc: 'Gõ các từ tiếng Anh đang rơi để bắn hạ trước khi chúng chạm đất — luyện tốc độ gõ phím và từ vựng.',
      badge: 'CHƠI ĐƠN',
      badgeBg: 'bg-sky-500',
      icon: Rocket,
      iconBg: 'bg-sky-500 text-white',
      btnBg: 'bg-sky-500 hover:bg-sky-600',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80',
      isNew: false
    },
    {
      id: 'rain',
      title: 'Mưa Từ Vựng',
      desc: 'Nhìn nghĩa đang rơi, nhớ ra từ tiếng Anh và gõ — luyện ghi nhớ chủ động thuần túy.',
      badge: 'CHƠI ĐƠN',
      badgeBg: 'bg-sky-500',
      icon: CloudRain,
      iconBg: 'bg-emerald-500 text-white',
      btnBg: 'bg-emerald-500 hover:bg-emerald-600',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
      isNew: false
    },
    {
      id: 'spelling',
      title: 'Ong Chính Tả',
      desc: 'Nghe phát âm và gõ lại từ với chính tả chuẩn xác.',
      badge: 'CHƠI ĐƠN',
      badgeBg: 'bg-sky-500',
      icon: Volume2,
      iconBg: 'bg-amber-500 text-white',
      btnBg: 'bg-amber-500 hover:bg-amber-600',
      thumbnail: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=500&q=80',
      isNew: false
    },
    {
      id: 'fruit',
      title: 'Ném Hoa Quả',
      desc: 'Ném hoa quả đúng nghĩa để đánh bại quái vật từ vựng.',
      badge: 'CHƠI ĐƠN',
      badgeBg: 'bg-sky-500',
      icon: Apple,
      iconBg: 'bg-lime-500 text-white',
      btnBg: 'bg-lime-500 hover:bg-lime-600',
      thumbnail: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80',
      isNew: true
    },
    {
      id: 'sky',
      title: 'Vẹt Bay Trên Mây',
      desc: 'Điều khiển vẹt bay qua các chướng ngại vật từ vựng.',
      badge: 'CHƠI ĐƠN',
      badgeBg: 'bg-sky-500',
      icon: Wind,
      iconBg: 'bg-indigo-600 text-white',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700',
      thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
      isNew: true
    },
    {
      id: 'bridge',
      title: 'Xây Cầu',
      desc: 'Điền từ đúng để đặt các mảnh gỗ xây cầu sang bờ bên kia.',
      badge: 'CHƠI ĐƠN',
      badgeBg: 'bg-sky-500',
      icon: Trophy,
      iconBg: 'bg-amber-600 text-white',
      btnBg: 'bg-amber-600 hover:bg-amber-700',
      thumbnail: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=500&q=80',
      isNew: true
    },
    {
      id: 'puzzle',
      title: 'Nối Từ',
      desc: 'Nối các chữ cái theo thứ tự đúng để tạo thành từ vựng hoàn chỉnh.',
      badge: 'CHƠI ĐƠN',
      badgeBg: 'bg-sky-500',
      icon: Puzzle,
      iconBg: 'bg-teal-500 text-white',
      btnBg: 'bg-teal-500 hover:bg-teal-600',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80',
      isNew: false
    }
  ];

  const recentActivities = [
    { user: 'avaia', level: 7, game: 'Mưa Từ Vựng', score: '1,350', time: '6 giây trước', icon: '🌧️', bg: 'bg-emerald-100 text-emerald-600' },
    { user: 'Maris', level: 3, game: 'Ong Chính Tả', score: '1,890', time: '18 giây trước', icon: '🔊', bg: 'bg-amber-100 text-amber-600' },
    { user: 'Duy Cáp Văn Mạnh', level: 1, game: 'Mưa Từ Vựng', score: '0', time: '32 giây trước', icon: '🌧️', bg: 'bg-emerald-100 text-emerald-600' },
    { user: 'Tâm Đặng Thanh', level: 7, game: 'Ném Hoa Quả', score: '104', time: '47 giây trước', icon: '🍎', bg: 'bg-lime-100 text-lime-600' },
    { user: 'Người chơi ẩn danh', level: 1, game: 'Bắn Bong Bóng', score: '34', time: '1 phút trước', icon: '🎈', bg: 'bg-purple-100 text-purple-600' },
    { user: 'Duy Cáp Văn Mạnh', level: 1, game: 'Mưa Từ Vựng', score: '0', time: '1 phút trước', icon: '🌧️', bg: 'bg-emerald-100 text-emerald-600' },
    { user: 'avaia', level: 7, game: 'Mưa Từ Vựng', score: '555', time: '2 phút trước', icon: '🌧️', bg: 'bg-emerald-100 text-emerald-600' },
    { user: 'Duy Cáp Văn Mạnh', level: 1, game: 'Nối Từ', score: '2,070', time: '3 phút trước', icon: '🧩', bg: 'bg-teal-100 text-teal-600' },
    { user: 'avaia', level: 7, game: 'Mưa Từ Vựng', score: '1,320', time: '3 phút trước', icon: '🌧️', bg: 'bg-emerald-100 text-emerald-600' },
    { user: 'dirtymatch4x', level: 2, game: 'Mưa Từ Vựng', score: '4,860', time: '4 phút trước', icon: '🌧️', bg: 'bg-emerald-100 text-emerald-600' },
    { user: 'avaia', level: 7, game: 'Mưa Từ Vựng', score: '210', time: '5 phút trước', icon: '🌧️', bg: 'bg-emerald-100 text-emerald-600' },
    { user: 'Duy Cáp Văn Mạnh', level: 1, game: 'Nối Từ', score: '1,025', time: '5 phút trước', icon: '🧩', bg: 'bg-teal-100 text-teal-600' }
  ];

  const dailyLeaderboard = [
    { rank: 1, badge: '🥇', name: '林庭瑜', level: 2, score: '224,580' },
    { rank: 2, badge: '🥈', name: 'avaia', level: 7, score: '180,090' },
    { rank: 3, badge: '🥉', name: 'Cẩm Tiên Đỗ Thị', level: 35, score: '133,919', extra: '⚡2 🛡️' },
    { rank: 4, badge: '4', name: 'Vũ Lê Triều', level: 4, score: '115,880' },
    { rank: 5, badge: '5', name: 'Hà Nguyễn', level: 11, score: '110,670' },
    { rank: 6, badge: '6', name: 'Hữu Phước', level: 1, score: '101,070' },
    { rank: 7, badge: '7', name: 'Sinh Hùng Nguyễn', level: 1, score: '94,620' },
    { rank: 8, badge: '8', name: 'Derel Tam', level: 1, score: '88,800', extra: '⚡1' },
    { rank: 9, badge: '9', name: 'Zougira Hikmah', level: 3, score: '85,590' },
    { rank: 10, badge: '10', name: 'Ý Nhu', level: 4, score: '85,100' }
  ];

  const gameQuestions = [
    { word: 'BEAUTIFUL', hint: 'Xinh đẹp, đẹp đẽ' },
    { word: 'SUCCESS', hint: 'Thành công' },
    { word: 'KNOWLEDGE', hint: 'Kiến thức' },
    { word: 'CHALLENGE', hint: 'Thử thách' }
  ];

  const handleGameSubmit = (e) => {
    e.preventDefault();
    const target = gameQuestions[currentCardIndex];
    if (userAnswer.trim().toUpperCase() === target.word) {
      setScore(score + 10);
      setFeedback({ type: 'success', msg: '🎉 Chính xác! +10 XP' });
      setTimeout(() => {
        setFeedback(null);
        setUserAnswer('');
        if (currentCardIndex < gameQuestions.length - 1) {
          setCurrentCardIndex(currentCardIndex + 1);
        } else {
          setFeedback({ type: 'complete', msg: '🏆 Bạn đã chiến thắng thử thách!' });
        }
      }, 1000);
    } else {
      setFeedback({ type: 'error', msg: '❌ Chưa chính xác, thử lại nhé!' });
    }
  };

  return (
    <div className="w-full min-h-screen pb-12">
      {activeGame ? (
        /* ================= INTERACTIVE MINI-GAME ARENA VIEW ================= */
        <div className="p-4 sm:p-8 max-w-3xl mx-auto w-full space-y-6 animate-fade-in">

          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setActiveGame(null); setScore(0); setCurrentCardIndex(0); setFeedback(null); }}
              className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-indigo-600 font-extrabold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              ← Quay lại danh sách game
            </button>

            <div className="flex items-center gap-2 font-black text-amber-500 text-sm px-4 py-1.5 bg-amber-50 dark:bg-amber-950 rounded-2xl border border-amber-200 dark:border-amber-800">
              <Star className="w-4 h-4 fill-current" />
              <span>XP Score: {score}</span>
            </div>
          </div>

          {/* Play Arena Box */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
                {activeGame.title} · Thử thách {currentCardIndex + 1}/{gameQuestions.length}
              </span>
            </div>

            <div className="py-6 space-y-3 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-100 dark:border-slate-800">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-widest">
                {gameQuestions[currentCardIndex].word.split('').sort(() => 0.5 - Math.random()).join(' ')}
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Gợi ý nghĩa: {gameQuestions[currentCardIndex].hint}</span>
              </p>
            </div>

            <form onSubmit={handleGameSubmit} className="space-y-4 max-w-sm mx-auto">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Gõ từ hoàn chỉnh tại đây..."
                className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-black text-center text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
              />

              <button
                type="submit"
                className={`w-full py-3.5 rounded-2xl ${activeGame.btnBg} text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-98 flex items-center justify-center gap-2`}
              >
                <span>XÁC NHẬN KẾT QUẢ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {feedback && (
              <div className={`p-3.5 rounded-2xl text-xs font-black ${
                feedback.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                feedback.type === 'complete' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                'bg-rose-50 text-rose-600 border border-rose-200'
              }`}>
                {feedback.msg}
              </div>
            )}
          </div>

        </div>
      ) : (
        /* ================= MAIN GAMES LOBBY & CATALOG VIEW ================= */
        <div className="space-y-8 max-w-7xl mx-auto w-full px-2 sm:px-4">

          {/* 1. TOP BANNER CONTAINER */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            {/* Left Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 shrink-0">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Game học tiếng Anh
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">
                  Chơi 5 phút, nhớ từ cả tuần
                </p>
              </div>
            </div>

            {/* Right Strip of Colorful Round Icons */}
            <div className="flex items-center gap-2 flex-wrap max-w-md">
              {[
                { bg: 'bg-rose-500 text-white', icon: Swords },
                { bg: 'bg-sky-400 text-white', icon: Rocket },
                { bg: 'bg-emerald-500 text-white', icon: CloudRain },
                { bg: 'bg-amber-500 text-white', icon: Volume2 },
                { bg: 'bg-lime-500 text-white', icon: Apple },
                { bg: 'bg-indigo-500 text-white', icon: Wind },
                { bg: 'bg-teal-500 text-white', icon: Puzzle },
                { bg: 'bg-orange-500 text-white', icon: Zap },
                { bg: 'bg-purple-500 text-white', icon: Lightbulb },
                { bg: 'bg-blue-500 text-white', icon: Droplets }
              ].map((ic, i) => {
                const IconComp = ic.icon;
                return (
                  <div key={i} className={`w-8 h-8 rounded-full ${ic.bg} flex items-center justify-center shadow-xs`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                );
              })}
            </div>

          </div>

          {/* 2. SECTION HEADER & GAMES CARDS GRID */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Game từ vựng
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[11px]">
                11
              </span>
            </div>

            {/* 3. GAMES GRID CARDS (4 COLUMNS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {games.map((g) => {
                const IconComp = g.icon;
                return (
                  <div
                    key={g.id}
                    onClick={() => setActiveGame(g)}
                    className="group bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden hover:border-indigo-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Thumbnail Image with Badges */}
                    <div className="relative aspect-video overflow-hidden bg-slate-950">
                      <img
                        src={g.thumbnail}
                        alt={g.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />

                      {/* Top Right Badges */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                        {g.isNew && (
                          <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-amber-950 font-black text-[10px] shadow-sm uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 fill-current" /> MỚI
                          </span>
                        )}
                        <span className={`px-2.5 py-0.5 rounded-lg ${g.badgeBg || 'bg-sky-500'} text-white font-black text-[10px] shadow-sm uppercase tracking-wider`}>
                          {g.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-slate-900">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg ${g.iconBg} flex items-center justify-center shrink-0`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <h3 className="font-black text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                            {g.title}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-snug line-clamp-2">
                          {g.desc}
                        </p>
                      </div>

                      {/* Button */}
                      <button className={`w-full py-3 rounded-2xl ${g.btnBg} text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-98 mt-2`}>
                        <span>CHƠI NGAY</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* 4. BOTTOM SECTION: HOẠT ĐỘNG GẦN ĐÂY & TOP NGƯỜI CHƠI TRONG NGÀY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">

            {/* Left Column: Hoạt động gần đây (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-500" />
                Hoạt động gần đây
              </h3>

              <div className="space-y-2.5">
                {recentActivities.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        👤
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-slate-900 dark:text-white truncate">
                          {act.user} <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-[9px] text-slate-600 dark:text-slate-300 font-bold">Lv.{act.level}</span> <span className="font-normal text-slate-500">đạt <strong className="text-slate-900 dark:text-white">{act.score}</strong> điểm trong <strong>{act.game}</strong></span>
                        </p>
                        <span className="text-[10px] font-semibold text-slate-400">{act.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono font-black text-slate-800 dark:text-slate-200 text-xs">
                        {act.score}
                      </span>
                      <div className={`w-7 h-7 rounded-xl ${act.bg} flex items-center justify-center text-xs`}>
                        {act.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Top người chơi trong ngày (4 cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Top người chơi trong ngày
                </h3>

                <div className="space-y-2">
                  {dailyLeaderboard.map((user) => (
                    <div 
                      key={user.rank}
                      className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 font-black text-slate-700 dark:text-slate-300 text-center shrink-0">
                          {user.badge}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                          👤
                        </div>
                        <div className="min-w-0">
                          <p className="font-extrabold text-slate-900 dark:text-white truncate">
                            {user.name}
                          </p>
                          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400">
                            Lv.{user.level} {user.extra || ''}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono font-black text-slate-900 dark:text-white text-xs shrink-0">
                        {user.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Xem thêm
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
