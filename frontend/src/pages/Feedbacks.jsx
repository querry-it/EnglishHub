import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Star, ArrowLeft, Heart,
  MessageCircle
} from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';

export default function Feedbacks() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Feedback Modal State
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  // Total Feedback Count & Average Rating
  const [totalCount, setTotalCount] = useState(609);
  const [visibleCount, setVisibleCount] = useState(16);

  // Feedbacks Dataset (Matching Screenshots 1 & 2)
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: 'Thanh Trung Vo',
      avatarBg: 'bg-slate-400',
      stars: 5,
      content: 'good',
      date: 'Sep 24, 2026',
      reply: null
    },
    {
      id: 2,
      name: 'thi chung thuy Dang',
      avatarBg: 'bg-emerald-700',
      stars: 5,
      content: "I love this app it's help me learn more things than use to",
      date: 'Oct 26, 2025',
      reply: null
    },
    {
      id: 3,
      name: 'Vincent',
      avatarBg: 'bg-[#1E2540]',
      stars: 5,
      content: 'gud',
      date: 'Sep 21, 2026',
      reply: null
    },
    {
      id: 4,
      name: 'cậu bé thông minh💕',
      avatarBg: 'bg-emerald-600',
      stars: 5,
      content: 'tôi rất thích ai chê chịu',
      date: 'Aug 3, 2026',
      reply: null
    },
    {
      id: 5,
      name: 'Đào Đức Bình',
      avatarBg: 'bg-sky-600',
      stars: 5,
      content: 'Hay',
      date: 'Sep 22, 2028',
      reply: null
    },
    {
      id: 6,
      name: 'nolove.',
      avatarBg: 'bg-slate-800',
      stars: 1,
      content: 'app này lúc đầu tớ dùng khá là ổn áp mà càng dùng thì thấy càng lag và giờ tớ ấn vào tham gia mà hẳn...',
      date: 'Sep 20, 2026',
      reply: null
    },
    {
      id: 7,
      name: 'minhmetroii',
      avatarBg: 'bg-teal-700',
      stars: 5,
      content: 'tuyệt với lòng tôi, nhưng app chính phần nghe nhé ạ, mình đọc nhưng không nghe được xong cứ báo min...',
      date: 'Sep 22, 2026',
      reply: null
    },
    {
      id: 8,
      name: 'huyenanh Hieu',
      avatarBg: 'bg-amber-600',
      stars: 5,
      content: 'hello một ngày đi học bất ổn của tui',
      date: 'Sep 21, 2026',
      reply: null
    },
    {
      id: 9,
      name: '@blablabla',
      avatarBg: 'bg-indigo-600',
      stars: 4,
      content: 'app oke à, nhưng phần shadowing ko ổn lắm nha nó ko nhận diện được giọng nói của t',
      date: 'Aug 23, 2026',
      reply: {
        author: 'EnglishHub',
        text: 'Cảm ơn bạn vì đã ủng hộ app nha! Bạn có thể sử dụng tai nghe hoặc điện thoại để hệ thống ghi nhận giọng nói tốt hơn'
      }
    },
    {
      id: 10,
      name: 'Trúc thanh',
      avatarBg: 'bg-sky-500',
      stars: 5,
      content: 'app hay qas tr sau khi bt đến app thì mlk rất thích học tiếng anh và thích nch vs các bạn hơn nx app...',
      date: 'Aug 23, 2026',
      reply: {
        author: 'EnglishHub',
        text: 'Cảm ơn bạn vì đã ủng hộ app nha!'
      }
    },
    {
      id: 11,
      name: 'Đỗ Thị Hải Trường TH Phước Long 1',
      avatarBg: 'bg-blue-600',
      stars: 5,
      content: 'Rất hay!',
      date: 'Aug 26, 2026',
      reply: {
        author: 'EnglishHub',
        text: 'Cảm ơn bạn vì đã ủng hộ app nha!'
      }
    },
    {
      id: 12,
      name: 'Như Ngọc >_<',
      avatarBg: 'bg-purple-600',
      stars: 5,
      content: 'tuyệt vời',
      date: 'Aug 26, 2026',
      reply: {
        author: 'EnglishHub',
        text: 'Cảm ơn bạn vì đã ủng hộ app nha!'
      }
    },
    {
      id: 13,
      name: 'Rubicute',
      avatarBg: 'bg-pink-600',
      stars: 5,
      content: 'app này học cũng rất hay mình rất thích',
      date: 'Aug 23, 2026',
      reply: {
        author: 'EnglishHub',
        text: 'Cảm ơn bạn vì đã ủng hộ app nha!'
      }
    },
    {
      id: 14,
      name: 'Nee',
      avatarBg: 'bg-teal-600',
      stars: 4,
      content: 'app cx rất ổn nha',
      date: 'Aug 23, 2026',
      reply: {
        author: 'EnglishHub',
        text: 'Cảm ơn bạn vì đã ủng hộ app nha!'
      }
    },
    {
      id: 15,
      name: 'Tiến Phát Nguyễn',
      avatarBg: 'bg-orange-600',
      stars: 5,
      content: 'app này dùng bổ trợ cho ielt cũng được đấy chú !',
      date: 'Aug 23, 2026',
      reply: {
        author: 'EnglishHub',
        text: 'Cảm ơn bạn vì đã ủng hộ app nha!'
      }
    },
    {
      id: 16,
      name: 'Sunny',
      avatarBg: 'bg-amber-500',
      stars: 5,
      content: '100 điểm',
      date: 'Aug 25, 2028',
      reply: {
        author: 'EnglishHub',
        text: 'Cảm ơn bạn vì đã ủng hộ app nha!'
      }
    }
  ]);

  // Submit Feedback Handler
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const newFb = {
      id: Date.now(),
      name: user?.username || 'huy nguyen',
      avatarBg: 'bg-[#1E2540]',
      stars: rating,
      content: feedbackText.trim(),
      date: 'Vừa xong',
      reply: {
        author: 'EnglishHub',
        text: 'Cảm ơn bạn vì đã ủng hộ app nha! Lời góp ý của bạn rất có ý nghĩa với chúng mình.'
      }
    };

    setFeedbacks([newFb, ...feedbacks]);
    setTotalCount(prev => prev + 1);
    setFeedbackText('');
    setShowModal(false);
  };

  // Render Stars Component
  const renderStars = (count) => {
    const starsArr = [];
    for (let i = 1; i <= 5; i++) {
      starsArr.push(
        <Star 
          key={i} 
          className={`w-3.5 h-3.5 ${i <= count ? 'text-amber-400 fill-current' : 'text-slate-300 dark:text-slate-700'}`} 
        />
      );
    }
    return <div className="flex items-center gap-0.5">{starsArr}</div>;
  };

  return (
    <AppLayout>
      <div className="w-full min-h-screen pb-16 select-none">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-6">
          
          {/* ================= 1. TOP NAVIGATION & TITLE ================= */}
          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-2xs w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>

            <div className="flex items-center justify-center gap-3 py-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Lời nhắn từ cộng đồng
              </h1>
            </div>
          </div>

          {/* ================= 2. HERO OVERVIEW BANNER CARD ================= */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-center max-w-4xl mx-auto">
            
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1.5">
                <Heart className="w-4 h-4 fill-current text-rose-500" />
                Cảm ơn sự ủng hộ của các bạn!
              </span>

              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Thời gian qua, EnglishHub nhận được rất nhiều email góp ý và đề xuất tính năng từ các bạn. Chúng mình đã tạo ra màn hình này để các bạn có thể chia sẻ những góp ý một cách dễ dàng hơn. Đừng ngại comment nhé, hãy tiếp thêm động lực để chúng mình phát triển website miễn phí này nhiều hơn nữa! <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Mỗi feedback của các bạn đều rất quý giá với chúng mình.</span>
              </p>
            </div>

            {/* Average Rating & Total Summary Box */}
            <div className="inline-flex items-center justify-center gap-8 p-4 px-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="text-center space-y-1">
                <div className="text-2xl font-black font-mono text-amber-500 flex items-center justify-center gap-1">
                  <span>4.4</span>
                </div>
                {renderStars(4)}
                <span className="text-[10px] font-bold text-slate-400 block">Điểm trung bình</span>
              </div>

              <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />

              <div className="text-center space-y-1">
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                  {totalCount}
                </div>
                <span className="text-[10px] font-bold text-slate-400 block">Feedback đã nhận</span>
              </div>
            </div>

          </div>

          {/* ================= 3. WRITE FEEDBACK PRIMARY BUTTON ================= */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-3.5 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all transform active:scale-98"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Viết feedback</span>
            </button>
          </div>

          {/* ================= 4. FEEDBACK CARDS GRID (4 COLUMNS) ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {feedbacks.slice(0, visibleCount).map((fb) => (
              <div
                key={fb.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-2">
                  {/* Top Header: Avatar, Name, Rating */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-full ${fb.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                        👤
                      </div>
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                        {fb.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {renderStars(fb.stars)}
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{fb.stars}/5</span>
                    </div>
                  </div>

                  {/* Feedback Text Content */}
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-snug line-clamp-3">
                    {fb.content}
                  </p>

                  {/* Admin Reply Box (if replied) */}
                  {fb.reply && (
                    <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 space-y-1 text-xs">
                      <span className="font-extrabold text-[10px] text-sky-600 dark:text-sky-400 flex items-center gap-1">
                        🦜 {fb.reply.author} đã trả lời:
                      </span>
                      <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-snug">
                        {fb.reply.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Timestamp */}
                <div className="pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400">
                  {fb.date}
                </div>
              </div>
            ))}
          </div>

          {/* ================= 5. LOAD MORE FEEDBACKS BUTTON ================= */}
          {visibleCount < feedbacks.length && (
            <div className="flex justify-center pt-6">
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + 8, feedbacks.length))}
                className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs hover:bg-slate-100 transition-colors shadow-2xs flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                <span>Tải thêm feedback ({totalCount - visibleCount} còn lại)</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* WRITE FEEDBACK MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                Viết feedback góp ý
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              {/* Star Rating Picker */}
              <div className="space-y-1.5 text-center">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                  ĐÁNH GIÁ CỦA BẠN
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star 
                        className={`w-7 h-7 ${
                          star <= (hoverRating || rating) 
                            ? 'text-amber-400 fill-current' 
                            : 'text-slate-300 dark:text-slate-700'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-500 mb-1 block">
                  Nội dung phản hồi / Góp ý
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Chia sẻ trải nghiệm hoặc tính năng bạn muốn EnglishHub cải thiện..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs hover:bg-slate-200 transition-colors"
                >
                  HỦY BỎ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98"
                >
                  GỬI FEEDBACK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
