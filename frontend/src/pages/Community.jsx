import React, { useState } from 'react';
import { 
  MessageSquare, Heart, Share2, CheckCircle2, Search, Plus, 
  Send, ThumbsUp, MoreHorizontal, FileText, Award, Users,
  Sparkles, ExternalLink, MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Community() {
  const { user } = useAuth();
  
  // Topic selection & Filter state
  const [selectedTopic, setSelectedTopic] = useState('Tất cả');
  const [feedFilter, setFeedFilter] = useState('all'); // 'all' | 'favorite' | 'editorial'
  
  // Post Creator Modal state
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('# Góc Chia Sẻ');

  // User Stats state
  const [userStats, setUserStats] = useState({
    postsCreated: 0,
    commentsCreated: 0,
    votesReceived: 0
  });

  // Topics dataset
  const topics = [
    { label: 'Tất cả', icon: '👥' },
    { label: '# Góc Chia Sẻ' },
    { label: '# Học Tiếng Anh' },
    { label: '# Du Học' },
    { label: '# Du Lịch' },
    { label: '# Dịch Thuật' },
    { label: '# Tìm Bạn Học' },
    { label: '# Tìm Gia Sư Tiếng Anh' },
    { label: '# Việc Làm Tiếng Anh' },
    { label: '# Khác' }
  ];

  // Posts Feed Dataset (Matching Screenshot 1 & 2)
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'secret_agent',
      level: 16,
      avatarBg: 'bg-emerald-600',
      category: 'Khác',
      time: '11 giờ trước',
      title: 'Lại là cuộc hội thoại của cộng đồng',
      content: 'Cần tìm bạn luyện nghe và nói 1v1 phản xạ tiếng Anh mỗi ngày vào buổi tối từ 20:00 - 21:00. Bạn nào cùng mục tiêu thì nhắn tin cho mình nhé!',
      votes: 3,
      commentsCount: 2,
      isVoted: false,
      comments: [
        { id: 101, author: 'thvan', text: 'Cho mình đăng ký 1 suất nhé!', time: '10 giờ trước' }
      ]
    },
    {
      id: 2,
      author: 'amuro',
      level: 24,
      avatarBg: 'bg-indigo-600',
      category: 'Góc Chia Sẻ',
      time: '14 giờ trước',
      title: 'PHẦN 2: BẢN HỢP ĐỒNG MẶT VÀ MẶT NẠ SỤP ĐỔ',
      content: 'Đêm đó, cơn mưa tầm tã trút xuống thành phố. An Nhiên ngồi lặng lẽ trên chiếc sofa trong phòng khách tối om, chờ đợi bước chân quen thuộc của Hải Đăng. Tiếng mở cửa vang lên, anh ta cầm trên tay bó hoa hồng đỏ thắm - món quà anh ta vẫn luôn dùng để ngụy trang cho những dối trá...',
      votes: 0,
      commentsCount: 1,
      isVoted: false,
      comments: []
    },
    {
      id: 3,
      author: 'amuro',
      level: 24,
      avatarBg: 'bg-indigo-600',
      category: 'Học Tiếng Anh',
      time: '14 giờ trước',
      title: 'The Importance of Self-Study in the Digital Age',
      content: 'In today\'s rapidly changing digital world, information is available at our fingertips. With just a click, we can access endless libraries, online courses, and interactive tools. However, this abundance of information also presents a challenge: having access to knowledge is not the same as mastering it...',
      votes: 0,
      commentsCount: 0,
      isVoted: false,
      comments: []
    },
    {
      id: 4,
      author: 'minh_nguyen',
      level: 8,
      avatarBg: 'bg-sky-600',
      category: 'Học Tiếng Anh',
      time: '1 ngày trước',
      title: 'Self-Study English Speaking Tips for Absolute Beginners',
      content: 'Hi everyone! I used to be terrified of speaking English because I was afraid of making grammar mistakes. Here are 3 habits that helped me overcome my fear: 1. Mirror dictation 2. Shadowing short clips 3. Speaking out loud...',
      votes: 12,
      commentsCount: 4,
      isVoted: true,
      comments: []
    }
  ]);

  // Handle Creating New Post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPostObj = {
      id: Date.now(),
      author: user?.username || 'huy nguyen',
      level: 1,
      avatarBg: 'bg-[#1E2540]',
      category: newPostCategory.replace('# ', ''),
      time: 'Vừa xong',
      title: newPostTitle.trim() || 'Bài chia sẻ mới',
      content: newPostContent,
      votes: 0,
      commentsCount: 0,
      isVoted: false,
      comments: []
    };

    setPosts([newPostObj, ...posts]);
    setUserStats(prev => ({ ...prev, postsCreated: prev.postsCreated + 1 }));
    setNewPostTitle('');
    setNewPostContent('');
    setShowPostModal(false);
  };

  // Toggle Upvote / Vote
  const handleToggleVote = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const nextVoted = !p.isVoted;
        return {
          ...p,
          isVoted: nextVoted,
          votes: nextVoted ? p.votes + 1 : Math.max(0, p.votes - 1)
        };
      }
      return p;
    }));
  };

  // Filter posts based on selected topic
  const filteredPosts = posts.filter(post => {
    if (selectedTopic === 'Tất cả') return true;
    const cleanTopic = selectedTopic.replace('# ', '').trim();
    return post.category.toLowerCase() === cleanTopic.toLowerCase();
  });

  return (
    <div className="w-full min-h-screen pb-16 select-none">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-6">

        {/* ================= 1. HERO HEADER SECTION ================= */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Cộng đồng EnglishHub - Diễn đàn tự học tiếng Anh
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-4xl">
            Cộng đồng EnglishHub là nơi người học tiếng Anh chia sẻ mẹo học, giữ động lực và trao đổi kinh nghiệm luyện nghe, luyện nói và ôn thi. Đặt câu hỏi, khoe tiến bộ và cùng học với những người có chung mục tiêu.
          </p>

          {/* Checkmark Bullets List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Chia sẻ và khám phá mẹo tự học nghe, nói, từ vựng và ngữ pháp.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Đặt câu hỏi và nhận giải đáp từ người khác và đội ngũ EnglishHub.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Giữ động lực với bài đăng tiến bộ, streak và cộng đồng thân thiện.</span>
            </div>
          </div>
        </div>

        {/* ================= 2. MAIN 3-COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ----------------- LEFT COLUMN: CHỦ ĐỀ TOPICS MENU (3 cols) ----------------- */}
          <div className="lg:col-span-3 space-y-5 sticky top-3">
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white px-2">
                CHỦ ĐỀ
              </h3>

              <div className="space-y-1">
                {topics.map((item, idx) => {
                  const isActive = selectedTopic === item.label;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTopic(item.label)}
                      className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold border-2 border-slate-300 dark:border-slate-700 shadow-2xs'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Facebook Community Pill Button */}
              <div className="pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-sky-100 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Facebook Community</span>
                </a>
              </div>
            </div>

            {/* Left Bottom Mascot Illustration */}
            <div className="flex justify-center pt-2">
              <div className="w-28 h-28 relative">
                <svg className="w-full h-full text-sky-500" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="35" fill="#38BDF8" />
                  <circle cx="40" cy="45" r="7" fill="white" />
                  <circle cx="60" cy="45" r="7" fill="white" />
                  <circle cx="41" cy="45" r="3.5" fill="#0F172A" />
                  <circle cx="61" cy="45" r="3.5" fill="#0F172A" />
                  <path d="M46 54 L54 54 L50 61 Z" fill="#F59E0B" />
                  {/* Graduation cap */}
                  <path d="M30 35 L50 25 L70 35 L50 45 Z" fill="#0F172A" />
                  <rect x="47" y="40" width="6" height="12" fill="#0F172A" />
                  <circle cx="70" cy="42" r="3" fill="#F59E0B" />
                </svg>
              </div>
            </div>
          </div>

          {/* ----------------- MIDDLE COLUMN: FEED & POST CREATOR (6 cols) ----------------- */}
          <div className="lg:col-span-6 space-y-5">

            {/* Post Creation Box Trigger */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-stone-700 text-white flex items-center justify-center font-bold text-sm">
                  h
                </div>
                <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[9px] font-black">
                  Lv.1
                </span>
              </div>

              <button
                onClick={() => setShowPostModal(true)}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left text-xs font-semibold text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Bạn đang thắc mắc điều gì?
              </button>
            </div>

            {/* Feed Filter Tabs Bar */}
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'TẤT CẢ' },
                { id: 'favorite', label: 'YÊU THÍCH' },
                { id: 'editorial', label: 'LỰA CHỌN CỦA BAN BIÊN TẬP' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFeedFilter(tab.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all border ${
                    feedFilter === tab.id
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 shadow-2xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Posts Cards Stream */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-3 hover:border-slate-300 transition-all"
                >
                  {/* Post Header: Avatar, Username, Category, Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${post.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                        👤
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                            @{post.author}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                            {post.category}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {post.time}
                        </span>
                      </div>
                    </div>

                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post Title & Content Body */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                    <button className="text-xs font-bold text-sky-600 hover:underline pt-0.5">
                      Xem thêm
                    </button>
                  </div>

                  {/* Post Footer: Vote & Comments Count */}
                  <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-extrabold text-slate-500">
                    <button
                      onClick={() => handleToggleVote(post.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-colors ${
                        post.isVoted
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isVoted ? 'fill-current text-rose-500' : ''}`} />
                      <span>{post.votes}</span>
                    </button>

                    <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <MessageCircle className="w-4 h-4 text-slate-400" />
                      <span>{post.commentsCount}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* ----------------- RIGHT COLUMN: THỐNG KÊ CỦA TÔI (3 cols) ----------------- */}
          <div className="lg:col-span-3 space-y-5 sticky top-3">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                THỐNG KÊ CỦA TÔI
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Bài viết đã tạo
                    </span>
                  </div>
                  <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                    {userStats.postsCreated}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Bình luận đã tạo
                    </span>
                  </div>
                  <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                    {userStats.commentsCreated}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Lượt vote nhận được
                    </span>
                  </div>
                  <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                    {userStats.votesReceived}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* CREATE POST MODAL */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                Tạo bài viết thảo luận mới
              </h3>
              <button 
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-slate-500 mb-1 block">
                  Chủ đề bài viết
                </label>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                >
                  {topics.filter(t => t.label !== 'Tất cả').map((t, i) => (
                    <option key={i} value={t.label}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-500 mb-1 block">
                  Tiêu đề bài viết
                </label>
                <input 
                  type="text"
                  placeholder="Nhập tiêu đề ngắn gọn..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-500 mb-1 block">
                  Nội dung chi tiết
                </label>
                <textarea 
                  rows={4}
                  placeholder="Chia sẻ câu hỏi, mẹo học hoặc suy nghĩ của bạn..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs hover:bg-slate-200 transition-colors"
                >
                  HỦY BỎ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98"
                >
                  ĐĂNG BÀI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
