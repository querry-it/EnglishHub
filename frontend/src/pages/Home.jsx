import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Headphones, Mic, BookOpen, Award, ArrowRight, Sparkles, 
  CheckCircle2, Zap, Star, ShieldCheck, Clock, Users, Target, 
  TrendingUp, Heart, ChevronDown, MessageCircle, Play, Check, Flame, 
  ArrowUpRight, GraduationCap, ClipboardCheck, Brain, BarChart3
} from 'lucide-react';
import AppMascot from '../components/AppMascot';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(0);

  // Section 2 Data (Exact Screenshot 7)
  const section2Items = [
    {
      icon: Headphones,
      bgColor: 'bg-[#0088FF]',
      title: 'Luyện nghe tiếng Anh (Dictation)',
      desc: 'Nghe và gõ lại từng từ. Phương pháp nghe chép chính tả rèn tai bạn trên hội thoại thực tế, không phải audio giáo trình.',
      linkText: 'Luyện nghe ngay',
      path: '/listening'
    },
    {
      icon: Mic,
      bgColor: 'bg-[#B033FF]',
      title: 'Luyện nói & phát âm (Shadowing)',
      desc: 'Nhại theo người bản xứ, AI chấm phát âm, ngữ điệu và nhịp điệu của bạn theo thời gian thực.',
      linkText: 'Luyện nói ngay',
      path: '/listening?mode=shadowing'
    },
    {
      icon: Users,
      bgColor: 'bg-[#FF4F33]',
      title: 'Luyện nói cùng cộng đồng',
      desc: 'Ghép cặp voice chat 1-1 với người học cùng trình độ. Hội thoại thật, không áp lực.',
      linkText: 'Tìm bạn luyện nói',
      path: '/speaking'
    },
    {
      icon: BookOpen,
      bgColor: 'bg-[#FF8800]',
      title: 'Từ vựng tiếng Anh theo chủ đề',
      desc: 'Học từ trong ngữ cảnh và ghi nhớ lâu dài nhờ hệ thống ôn tập ngắt quãng (SRS).',
      linkText: 'Học từ vựng',
      path: '/vocabulary'
    },
    {
      icon: GraduationCap,
      bgColor: 'bg-[#00C853]',
      title: 'Luyện thi IELTS',
      desc: 'Đề thi thử IELTS đầy đủ, chấm điểm tức thì, để bạn biết chính xác mình đang ở đâu trước ngày thi.',
      linkText: 'Luyện đề IELTS',
      path: '/exams?type=ielts'
    },
    {
      icon: ClipboardCheck,
      bgColor: 'bg-[#00BFA5]',
      title: 'Luyện thi TOEIC',
      desc: 'Đề thi thử TOEIC miễn phí theo chuẩn format TOEIC - đủ 7 parts, chấm điểm ngay khi nộp bài.',
      linkText: 'Luyện đề TOEIC',
      path: '/exams?type=toeic'
    }
  ];

  // Section 3 Data (Exact Screenshot 8)
  const section3Steps = [
    {
      stepNum: '1',
      title: 'Chọn Bài Học Theo Sở Thích',
      desc: 'Lựa chọn bài học phù hợp với trình độ và sở thích của bạn — từ giao tiếp hàng ngày, phim ảnh, tin tức, đến tiếng Anh thương mại, du lịch và luyện thi IELTS, TOEIC, TOEFL.',
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
      badge: 'BƯỚC 1'
    },
    {
      stepNum: '2',
      title: 'Nghe và Chép Chính Tả (Dictation)',
      desc: 'Lắng nghe thật kỹ và gõ lại những gì bạn nghe được. Công nghệ AI của chúng tôi sẽ kiểm tra độ chính xác và gợi ý sửa lỗi tức thì.',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
      badge: 'BƯỚC 2'
    },
    {
      stepNum: '3',
      title: 'Luyện Nói Nhại Theo (Shadowing)',
      desc: 'Cải thiện kỹ năng nói bằng cách bắt chước phát âm của người bản xứ. Ghi âm giọng nói của bạn và nhận phản hồi chi tiết về phát âm.',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badge: 'BƯỚC 3'
    },
    {
      stepNum: '4',
      title: 'Theo Dõi Lộ Trình Tiến Bộ',
      desc: 'Giám sát sự tiến bộ của bạn theo thời gian với các báo cáo chi tiết và đề xuất học tập được cá nhân hóa theo mục tiêu của bạn.',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      badge: 'BƯỚC 4'
    }
  ];

  // Section 5 Data (Exact Screenshot 10 - Tại Sao Chọn EnglishHub?)
  const whyChooseItems = [
    {
      icon: Headphones,
      bgColor: 'bg-[#0088FF]',
      title: 'Nâng Cao Kỹ Năng Nghe',
      desc: 'Rèn đôi tai trên cách người bản xứ nói thật ngoài đời — phim ảnh, tin tức, hội thoại hằng ngày, không phải audio dựng sẵn trong giáo trình'
    },
    {
      icon: Mic,
      bgColor: 'bg-[#B033FF]',
      title: 'Luyện Nói Tự Nhiên',
      desc: 'Shadowing theo phát âm bản xứ để chuẩn ngữ điệu và nhịp điệu, rồi mang ra dùng thật khi ghép cặp voice chat 1-1 cùng cộng đồng'
    },
    {
      icon: Brain,
      bgColor: 'bg-[#FF8800]',
      title: 'Tăng Cường Ghi Nhớ',
      desc: 'Lưu từ mới ngay từ bài học bạn đang xem và ghi nhớ lâu dài nhờ ôn tập ngắt quãng (SRS) — từ vựng gắn liền với ngữ cảnh'
    },
    {
      icon: Target,
      bgColor: 'bg-[#00C853]',
      title: 'Theo Dõi Lộ Trình Tiến Bộ',
      desc: 'Xem biểu đồ trình độ nghe – nói của bạn theo thời gian, và tự do mình bằng đề mô phỏng IELTS, TOEIC trước ngày thi'
    }
  ];

  // Section 6 Data (Exact Screenshot 11 - Người dùng nói gì về EnglishHub)
  const reviews = [
    {
      name: 'Meti nt',
      country: 'United States',
      date: 'Oct 17, 2025',
      stars: 5,
      comment: 'Ứng dụng này cung cấp đúng tính năng mình cần. Cảm ơn đội ngũ phát triển, nó thực sự giúp mình cải thiện tiếng Anh.'
    },
    {
      name: 'Huy forum',
      country: 'Vietnam',
      date: 'Oct 16, 2025',
      stars: 5,
      comment: 'App đỉnh quá, bài học rất thú vị nha!'
    },
    {
      name: 'Linh Nguyen 2397',
      country: 'Vietnam',
      date: 'Nov 15, 2025',
      stars: 5,
      comment: 'Đây là app đầu tiên mà mình chủ động tìm đến phần nhận xét. Mình đã thử rất nhiều app tiếng Anh nhưng app này khiến mình hài lòng nhất. Vừa luyện được nghe, vừa luyện được nói. Các bài học sắp xếp theo trình độ rất dễ dàng để tìm bài phù hợp với trình độ của mình. Bài học ngắn gọn, không gây chán, mỗi ngày học một bài cũng không tốn quá nhiều thời gian. Mức độ nhận diện phát âm không gây ức chế như một số app khác. Giao diện thân thiện, tinh gọn, dễ dùng. Và đặc biệt hơn nó lại hoàn toàn miễn phí. Quá tuyệt vời. Xin cảm ơn đội ngũ làm ra app rất rất nhiều!'
    }
  ];

  const faqs = [
    {
      q: 'Tôi bị mất gốc tiếng Anh thì có theo học được không?',
      a: 'Hoàn toàn phù hợp! EnglishHub thiết kế lộ trình bắt đầu từ bảng âm IPA cơ bản và nghe chép chính tả cấp độ A1 với tốc độ chậm (0.75x) giúp bạn lấy lại gốc nhanh chóng.'
    },
    {
      q: 'Học trên EnglishHub có cần cài đặt ứng dụng không?',
      a: 'Không cần! Bạn có thể truy cập trực tiếp trên trình duyệt máy tính, máy tính bảng hoặc điện thoại mọi lúc mọi nơi.'
    },
    {
      q: 'Phương pháp Dictation & Shadowing giúp ích gì cho tôi?',
      a: 'Dictation (nghe chép) giúp bạn bắt trọn từng từ nối và âm đuôi, còn Shadowing (nhại giọng) giúp cơ miệng làm quen với ngữ điệu tự nhiên như người bản xứ.'
    },
    {
      q: 'Tôi có được học thử miễn phí không?',
      a: 'Có! Toàn bộ bài học nghe chép chính tả demo, từ vựng SM-2 và thi thử cơ bản đều được mở miễn phí ngay khi bạn bắt đầu.'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden min-h-screen">
      
      {/* 1. HERO SECTION - Exact Screenshot 3 */}
      <section className="container relative py-16 md:py-28 lg:py-32 border-b border-slate-100 dark:border-slate-900">
        <div className="absolute top-8 right-16 w-16 h-16 rounded-full border-2 border-dashed border-slate-300 pointer-events-none hidden md:block" />
        <div className="absolute bottom-12 left-8 w-12 h-12 rounded-full border-4 border-slate-200 pointer-events-none hidden md:block" />
        <div className="absolute bottom-16 right-20 text-3xl font-light text-slate-300 pointer-events-none hidden md:block">+</div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.18] text-[#1E2540] dark:text-white">
              Học tiếng Anh online: <br />
              <span className="text-[#384160] dark:text-indigo-400">
                luyện nghe, luyện nói, <br />
                từ vựng và luyện thi
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Nghe chép chính tả <strong>(Dictation)</strong> và <strong>Shadowing</strong> trên video thực tế, ghép cặp luyện nói cùng cộng đồng, <strong>luyện thi IELTS/TOEIC</strong> — đều có phản hồi AI tức thì. Phù hợp mọi trình độ, từ A1 đến C2.
            </p>

            <div className="pt-2">
              <Link
                to="/listening"
                className="inline-flex items-center justify-center px-10 py-4.5 rounded-full bg-[#1E2540] hover:bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Bắt Đầu Miễn Phí</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative pt-4 pb-6">
            <div className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center">
              
              <div className="absolute -top-4 left-2 z-20 text-slate-800 dark:text-slate-200 animate-float">
                <Headphones className="w-12 h-12 stroke-[1.5]" />
              </div>

              <div className="absolute top-2 right-4 z-20 text-slate-800 dark:text-slate-200">
                <svg className="w-12 h-12 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-3.5 transform -rotate-2 scale-95 hover:rotate-0 transition-transform duration-500 shadow-2xl rounded-3xl p-3.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 w-full">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-emerald-100">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Học viên luyện nghe" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-amber-100">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" alt="Học viên tự học" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-sky-100">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Luyện nói AI" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-indigo-100">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80" alt="Học sinh tự tin" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="absolute -bottom-5 right-2 z-30 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border-2 border-slate-900 dark:border-slate-700 shadow-2xl flex items-center gap-2 rotate-6">
                <AppMascot className="w-10 h-10" />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. SECTION 2 - Một nền tảng - đủ mọi kỹ năng tiếng Anh (Exact Screenshot 7) */}
      <section className="container py-20 md:py-28 border-b border-slate-100 dark:border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Một nền tảng - đủ mọi kỹ năng tiếng Anh
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Mọi kỹ năng ở cùng một chỗ, đều xoay quanh <strong>video thực tế</strong> và phản hồi AI tức thì
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {section2Items.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-8 md:p-9 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${item.bgColor} text-white flex items-center justify-center mb-6 shadow-sm shrink-0`}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                    {item.desc}
                  </p>
                </div>

                <div>
                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>{item.linkText}</span>
                    <span className="text-sm">›</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECTION 3 - Phương Pháp Học Đơn Giản (Exact Screenshot 8) */}
      <section className="container py-20 md:py-28 border-b border-slate-100 dark:border-slate-900 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Phương Pháp Học Đơn Giản
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Chỉ với 4 bước đơn giản, bạn sẽ bắt đầu hành trình <strong>học tiếng Anh</strong> một cách hiệu quả và đầy hứng thú.
          </p>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {section3Steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover rounded-2xl opacity-90 shadow-md transform hover:scale-105 transition-transform"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black tracking-wider">
                  {step.badge}
                </span>
              </div>

              <div className="p-6 md:p-7 flex-1 flex flex-col justify-between space-y-4">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Product App Interface Showcase Banner Below */}
        <div className="relative rounded-3xl bg-[#0B0F19] border-4 border-slate-800 p-8 md:p-12 shadow-2xl overflow-hidden text-white mt-12">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-xs text-slate-400">
            <div className="flex items-center gap-3 font-mono">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="ml-2 font-bold text-slate-300">EnglishHub Workspace · Entertainment Topics</span>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-600 text-white">34 Lessons Total</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-2xl md:text-3xl font-black text-white">
                Kho Bài Học Đa Dạng Chủ Đề
              </h4>
              <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                Tự do lựa chọn từ hơn 500+ chủ đề phim ảnh, âm nhạc, khoa học, tin tức BBC & TED Talks với bộ lọc độ khó linh hoạt từ A1 đến C2.
              </p>
            </div>
            <div className="flex justify-start md:justify-end pt-2 md:pt-0">
              <Link
                to="/listening"
                className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <span>Khám phá chủ đề</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 4 - Trải Nghiệm Học Tiếng Anh Thông Minh (Exact Screenshots 9, 12, 13) */}
      <section className="container py-20 md:py-28 border-b border-slate-100 dark:border-slate-900 space-y-24 md:space-y-32">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider animate-pulse-glow">
            CÔNG NGHỆ HỌC TẬP THÔNG MINH
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Trải Nghiệm Học Tiếng Anh Thông Minh
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Khám phá <strong>phương pháp học tiếng Anh hiệu quả nhất</strong> được hỗ trợ bởi <strong>công nghệ AI tiên tiến</strong>
          </p>
        </div>

        {/* SUB-SECTION 1: Dictation (Nghe chép) - Screenshot 1 */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-4">
          {/* Left Text Box */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs shadow-xs">
              Phương pháp <strong>Dictation (Nghe chép)</strong> Độc quyền
            </span>

            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Luyện Nghe Sâu Như Người Bản Xứ
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              Bạn gặp khó khăn khi nghe hiểu các cuộc hội thoại <strong>tiếng Anh</strong>? Phương pháp <strong>Dictation</strong> độc quyền của chúng tôi sẽ rèn luyện đôi tai của bạn để nghe rõ từng từ. <strong>92% người học đã cải thiện khả năng nghe hiểu</strong> chỉ sau một tháng.
            </p>

            <div className="pt-2">
              <Link
                to="/listening"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1E2540] hover:bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
              >
                <span>Thử ngay ›</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Graphics Card (Exact Screenshot 1) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-sky-500 rounded-3xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 shadow-2xl flex flex-col justify-between transform hover:scale-[1.02] transition-transform duration-300">
              
              <div className="p-8 md:p-10 relative min-h-[220px] flex items-center justify-between gap-4">
                <div className="relative z-10 space-y-2">
                  <span className="text-5xl animate-bounce inline-block">💡</span>
                </div>

                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" 
                  alt="Giáo viên hướng dẫn" 
                  className="w-44 h-44 object-cover rounded-2xl shadow-xl border-2 border-white/40"
                />
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 md:p-7 flex items-center justify-between border-t-2 border-sky-400">
                <div className="flex items-center gap-3">
                  <AppMascot className="w-14 h-14 hover:rotate-12 transition-transform" />
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Phản hồi AI realtime
                  </div>
                </div>

                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
                  alt="Học sinh suy nghĩ" 
                  className="w-20 h-20 object-cover rounded-full border-2 border-sky-500 shadow-md"
                />
              </div>

            </div>
          </div>
        </div>

        {/* SUB-SECTION 2: Shadowing (Nói nhại theo) - Screenshot 2 */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 border-t border-slate-100 dark:border-slate-800/60">
          {/* Left Visual Graphics Card (Exact Screenshot 2) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-full max-w-md bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-slate-900 rounded-3xl p-8 border-2 border-purple-200 dark:border-purple-800/60 shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              
              {/* Floating Thought Bubble with Mascot & Smiley */}
              <div className="relative mb-6 flex justify-start">
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 px-5 py-3 rounded-3xl shadow-xl flex items-center gap-3 animate-float">
                  <AppMascot className="w-10 h-10" />
                  <div className="flex items-center gap-1.5 text-2xl">
                    <span>🗣️</span>
                    <span>😊</span>
                  </div>
                </div>
              </div>

              {/* Speaker Student */}
              <div className="flex justify-center items-end relative min-h-[220px]">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                  alt="Học sinh luyện Shadowing" 
                  className="w-52 h-52 object-cover rounded-3xl shadow-xl border-4 border-white dark:border-slate-800"
                />
                <span className="absolute bottom-2 right-4 px-3 py-1 rounded-full bg-purple-600 text-white font-extrabold text-[11px] shadow-md">
                  AI Real-time Score: 98%
                </span>
              </div>

            </div>
          </div>

          {/* Right Text Box */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 order-1 lg:order-2 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold text-xs shadow-xs">
              Kỹ thuật <strong>Shadowing (Nói nhại theo)</strong> Đột phá
            </span>

            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Nói Tiếng Anh Tự Nhiên và Trôi Chảy
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              Nói <strong>tiếng Anh</strong> với ngữ điệu và sự <strong>tự tin</strong> như người bản xứ! Kỹ thuật <strong>Shadowing</strong> giúp bạn làm chủ <strong>phát âm</strong>, nhịp điệu và sự <strong>lưu loát</strong>. <strong>95% người học cho biết họ đã tự tin hơn khi nói chỉ sau 3 tháng.</strong>
            </p>

            <div className="pt-2">
              <Link
                to="/listening?mode=shadowing"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1E2540] hover:bg-purple-600 dark:bg-indigo-600 dark:hover:bg-purple-600 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
              >
                <span>Thử ngay ›</span>
              </Link>
            </div>
          </div>
        </div>

        {/* SUB-SECTION 3: Error Analysis (Phân tích lỗi sai) - Screenshot 3 */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 border-t border-slate-100 dark:border-slate-800/60">
          {/* Left Text Box */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold text-xs shadow-xs">
              <strong>Phân Tích Lỗi Sai Thông Minh</strong>
            </span>

            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Học Từ Lỗi Sai Của Chính Bạn
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              Sai lầm là cơ hội để tiến bộ. Sau mỗi bài tập, bạn sẽ nhận được điểm số tức thì và <strong>phản hồi chi tiết</strong> để hiểu rõ lỗi sai của mình. Tập trung vào các điểm yếu và cải thiện từng bước một.
            </p>

            <div className="pt-2">
              <Link
                to="/listening"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1E2540] hover:bg-amber-600 dark:bg-indigo-600 dark:hover:bg-amber-600 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
              >
                <span>Thử ngay ›</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Graphics Card (Exact Screenshot 3) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-slate-900 rounded-3xl p-8 border-2 border-amber-200 dark:border-amber-800/60 shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              
              {/* Brain & Checkmark Doodles at top */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-sm animate-bounce">
                  <span className="text-2xl">🧠</span>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300">AI Feedback</span>
                </div>
                <span className="text-3xl">✅</span>
              </div>

              {/* Student image with error analysis elements */}
              <div className="relative flex items-center justify-center py-4">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" 
                  alt="Học từ lỗi sai" 
                  className="w-48 h-48 object-cover rounded-2xl shadow-xl border-4 border-white dark:border-slate-800"
                />

                <div className="absolute top-0 right-2 bg-rose-500 text-white p-2 rounded-2xl shadow-lg animate-float">
                  <span className="text-xl">🔍</span>
                </div>

                <div className="absolute bottom-2 left-2 bg-emerald-500 text-white px-3 py-1.5 rounded-2xl font-extrabold text-xs shadow-lg flex items-center gap-1">
                  <span>📈 +35% Precision</span>
                </div>
              </div>

              {/* Floating Mascot avatar at bottom right */}
              <div className="flex justify-end pt-2">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border-2 border-slate-900 dark:border-slate-700 shadow-xl flex items-center gap-2">
                  <AppMascot className="w-9 h-9" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SUB-SECTION 4: Spaced Repetition SRS (Ghi nhớ ngắt quãng) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 border-t border-slate-100 dark:border-slate-800/60">
          {/* Left Visual Graphics Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-full max-w-md bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-slate-900 rounded-3xl p-8 border-2 border-emerald-200 dark:border-emerald-800/60 shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold shadow-sm">
                  Thuật toán SM-2 (SRS)
                </span>
                <span className="text-2xl animate-pulse">🔥 14 Ngày Streak</span>
              </div>

              <div className="relative flex items-center justify-center py-4">
                <img 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" 
                  alt="Ghi nhớ từ vựng SRS" 
                  className="w-48 h-48 object-cover rounded-2xl shadow-xl border-4 border-white dark:border-slate-800"
                />

                <div className="absolute -bottom-2 right-4 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-2xl border-2 border-emerald-500 shadow-xl flex items-center gap-2">
                  <AppMascot className="w-8 h-8" />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Ghi nhớ vĩnh viễn</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Text Box */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 order-1 lg:order-2 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs shadow-xs">
              Ôn tập <strong>Ngắt Quãng (SRS)</strong> Tối Ưu
            </span>

            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Ghi Nhớ Từ Vựng Vĩnh Viễn Không Quên
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              Hệ thống tự động nhắc nhở ôn tập đúng thời điểm bạn chuẩn bị quên từ. Chỉ <strong>10 phút học mỗi ngày</strong> với thuật toán lặp lại ngắt quãng SRS mang lại hiệu quả <strong>gấp 5 lần</strong> so với phương pháp học thuộc lòng truyền thống.
            </p>

            <div className="pt-2">
              <Link
                to="/vocabulary"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1E2540] hover:bg-emerald-600 dark:bg-indigo-600 dark:hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
              >
                <span>Học từ vựng ngay ›</span>
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* 5. SECTION 5 - Tại Sao Chọn EnglishHub? (Exact Screenshot 10) */}
      <section className="container py-20 md:py-28 border-b border-slate-100 dark:border-slate-900 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Tại Sao Chọn EnglishHub?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Phần lớn ứng dụng chỉ cho bạn cày từ vựng và ngữ pháp. EnglishHub rèn đúng những kỹ năng bạn thực sự dùng — trên <strong>tiếng Anh thật</strong>, có <strong>phản hồi AI ở mọi bước</strong>
          </p>
        </div>

        {/* 2x2 Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {whyChooseItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-8 md:p-9 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bgColor} text-white flex items-center justify-center shadow-sm shrink-0`}>
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. SECTION 6 - Người dùng nói gì về EnglishHub (Exact Screenshot 11) */}
      <section className="container py-20 md:py-28 border-b border-slate-100 dark:border-slate-900 space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Người dùng nói gì về EnglishHub
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Tham gia cùng hàng ngàn học viên đã cải thiện kỹ năng phát âm và nghe tiếng Anh thông qua phương pháp Dictation và Shadowing.
          </p>

          {/* Rating Header */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, r) => (
                <Star key={r} className="w-5 h-5 fill-current" />
              ))}
              <span className="font-extrabold text-slate-900 dark:text-white text-base ml-1.5">4.8/5</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">
              Dựa trên 2.300+ đánh giá tại <span className="underline">App Store</span>
            </p>
          </div>
        </div>

        {/* 3 Review Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((rev, i) => (
            <div 
              key={i}
              className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-7 md:p-8 flex flex-col justify-between space-y-5 hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white">{rev.name}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold">
                    {rev.country}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.stars)].map((_, r) => (
                      <Star key={r} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>• {rev.date}</span>
                </div>

                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {rev.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="container max-w-4xl py-20 md:py-28 space-y-10 border-b border-slate-100 dark:border-slate-900">
        <div className="text-center space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/80 border-2 border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 text-xs font-black uppercase tracking-wider">
            CÂU HỎI THƯỜNG GẶP
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Giải Đáp Thắc Mắc Cho Học Viên
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-300 dark:border-slate-700 overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                className="w-full p-6 text-left font-bold text-sm md:text-base text-slate-900 dark:text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${activeFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {activeFaq === idx && (
                <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-t-2 border-slate-100 dark:border-slate-800/60 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
      <section className="container py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-[#1E2540] text-white p-10 md:p-16 border-2 border-slate-700 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-extrabold text-xs">
                ⚡ HỌC TIẾNG ANH THÔNG MINH HÔM NAY
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Sẵn Sàng Bứt Phá Trình Độ Tiếng Anh Của Bạn?
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                Bắt đầu luyện nghe chép chính tả, từ vựng SM-2 và kiểm tra trình độ hoàn toàn miễn phí ngay bây giờ.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                to="/listening"
                className="px-9 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm uppercase tracking-wider text-center shadow-lg hover:scale-105 transition-transform"
              >
                BẮT ĐẦU MIỄN PHÍ 🚀
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
