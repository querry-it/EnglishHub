import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { number: '15,000+', label: 'Học viên tin tưởng', icon: '🎓' },
    { number: '98.5%', label: 'Tỷ lệ đạt chuẩn CEFR', icon: '📈' },
    { number: '120,000+', label: 'Bài Speaking & Writing đã chấm', icon: '📝' },
    { number: '50+', label: 'Giảng viên & Chuyên gia IELTS', icon: '⭐' },
  ];

  const methods = [
    {
      icon: '🎙️',
      title: 'Thu Âm Speaking Trực Tiếp',
      desc: 'Công nghệ thu âm qua trình duyệt giúp học viên nộp bài nói linh hoạt và nhận phản hồi chi tiết từ giảng viên.',
      tag: 'Kỹ năng Nói'
    },
    {
      icon: '✍️',
      title: 'Chấm Writing Theo Tiêu Chí Rubric',
      desc: 'Phòng chấm bài chi tiết: bôi đỏ lỗi sai ngữ pháp, gợi ý từ vựng nâng cao và chấm điểm chuẩn Task Response & Coherence.',
      tag: 'Kỹ năng Viết'
    },
    {
      icon: '🧠',
      title: 'Thuật Toán Lặp Lại Ngắt Quãng (SM-2)',
      desc: 'Hệ thống Flashcard thông minh tự động tính toán thời điểm lặp lại từ vựng dựa trên mức độ ghi nhớ cá nhân.',
      tag: 'Ghi nhớ Từ vựng'
    },
    {
      icon: '🔓',
      title: 'Mở Khóa Tiến Độ Có Điều Kiện',
      desc: 'Đảm bảo kiến thức vững chắc: Học viên chỉ mở khóa bài học tiếp theo khi xem đủ video và đạt ≥80% bài kiểm tra.',
      tag: 'Lộ trình Học tập'
    }
  ];

  const instructors = [
    {
      name: 'ThS. Nguyễn Minh Anh',
      role: 'Chuyên gia IELTS 8.5 - Trưởng ban Chuyên môn',
      bio: '10+ năm kinh nghiệm giảng dạy IELTS & Tiếng Anh học thuật. Thạc sĩ Ngôn ngữ học ứng dụng Đại học Melbourne.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      badge: 'IELTS 8.5'
    },
    {
      name: 'ThS. Trần Hoàng Nam',
      role: 'Chuyên gia Luyện phát âm & Speaking',
      bio: 'Cựu giảng viên Ngôn ngữ Anh. Chuyên sâu nghiên cứu Ngữ âm học và phương pháp phản xạ giao tiếp tự nhiên.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      badge: 'Speaking Specialist'
    },
    {
      name: 'Cô Lê Hoàng Bảo Trân',
      role: 'Cố vấn Phương pháp Ghi nhớ SM-2',
      bio: 'Tốt nghiệp xuất sắc ngành Sư phạm Tiếng Anh. Tiên phong ứng dụng Gamification & Spaced Repetition vào giảng dạy.',
      avatar: 'https://images.unsplash.com/photo-1580894732413-a704274c9408?w=400&auto=format&fit=crop&q=80',
      badge: 'Pedagogy Lead'
    }
  ];

  const cefrLevels = [
    { level: 'A1 - A2', title: 'Cơ Bản & Phản Xạ', desc: 'Xây dựng nền tảng phát âm, từ vựng thông dụng và giao tiếp hàng ngày.' },
    { level: 'B1 - B2', title: 'Độc Lập & Trung Cấp', desc: 'Luyện làm chủ bài thi trắc nghiệm, viết đoạn văn học thuật và thảo luận chủ đề phức tạp.' },
    { level: 'C1 - IELTS', title: 'Thành Thạo & Chuyên Sâu', desc: 'Hoàn thiện kỹ năng Viết luận Academic, Speaking tranh luận và tối ưu điểm số IELTS 7.0+.' }
  ];

  return (
    <div className="py-10">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-sm font-medium mb-6">
          <span>🌟 Về Chúng Tôi — Smart English LMS</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Kiến Tạo Hành Trình Chinh Phục <br />
          <span className="gradient-text">Tiếng Anh Toàn Diện</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-10">
          EnglishHub là nền tảng học tập tiếng Anh thông minh thế hệ mới, kết hợp thu âm bài nói, 
          chấm chữa bài viết theo Rubric và thuật toán ghi nhớ lặp lại ngắt quãng SM-2 giúp học viên tiến bộ nhanh chóng.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/courses" className="btn btn-primary text-base px-8 py-3 rounded-xl shadow-lg">
            Khám Phá Khóa Học
          </Link>
          <Link to="/roadmaps" className="btn border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 text-base px-8 py-3 rounded-xl">
            Xem Lộ Trình Học
          </Link>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map((item, idx) => (
          <div key={idx} className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-3xl md:text-4xl font-extrabold text-sky-400 mb-1">{item.number}</div>
            <div className="text-sm text-slate-400 font-medium">{item.label}</div>
          </div>
        ))}
      </section>

      {/* Sứ mệnh & Tầm nhìn */}
      <section className="mb-20">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">
              Sứ Mệnh & <span className="accent-text">Tầm Nhìn</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Chúng tôi tin rằng việc học tiếng Anh hiệu quả không chỉ dừng lại ở việc xem video thụ động hay làm bài trắc nghiệm một chiều. 
              Sứ mệnh của EnglishHub là mang tới một môi trường thực hành phản hồi 2 chiều thực sự: Học viên được **nộp bài nói**, **nộp bài viết**, 
              được giảng viên trực tiếp chấm chữa và ứng dụng công khoa học bộ nhớ để làm chủ ngôn ngữ bền vững.
            </p>
            <div className="flex items-center gap-3 text-sky-400 font-semibold">
              <span>✓ Đạt chuẩn đầu ra CEFR & IELTS</span>
              <span>•</span>
              <span>✓ Trợ năng chuẩn WCAG 2.1 AA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Phương Pháp Học Đột Phá */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Phương Pháp Học Tập <span className="gradient-text">Đột Phá</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Hệ thống tích hợp công nghệ tương tác đa chiều tiên tiến giúp tối ưu hóa từng phút giây luyện tập.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {methods.map((m, idx) => (
            <div key={idx} className="glass-card p-8 flex flex-col justify-between group hover:border-sky-500/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{m.icon}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                    {m.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-sky-300 transition-colors">
                  {m.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chuẩn Đầu Ra CEFR */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            Lộ Trình Chuẩn Đầu Ra <span className="accent-text">CEFR & IELTS</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Mỗi giai đoạn được thiết kế rõ ràng với tiêu chí đánh giá đo lường được.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cefrLevels.map((lvl, idx) => (
            <div key={idx} className="glass-card p-6 border-t-4 border-t-sky-500">
              <span className="inline-block text-xs font-extrabold px-3 py-1 bg-amber-500/20 text-amber-400 rounded-md mb-3">
                {lvl.level}
              </span>
              <h3 className="text-lg font-bold mb-2">{lvl.title}</h3>
              <p className="text-slate-400 text-sm">{lvl.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Đội Nguồn Giảng Viên */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            Đội Ngũ Giảng Viên & <span className="gradient-text">Chuyên Gia</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Học tập cùng những người thầy cô tận tâm, trình độ chuyên môn cao và giàu kinh nghiệm chấm chữa bài.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {instructors.map((ins, idx) => (
            <div key={idx} className="glass-card overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={ins.avatar} 
                  alt={ins.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                  {ins.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-100 mb-1">{ins.name}</h3>
                <p className="text-sky-400 text-xs font-medium mb-3">{ins.role}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{ins.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
