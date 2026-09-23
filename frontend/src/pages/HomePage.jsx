import React from 'react';

import Header from '../components/Header';
import Hero from '../components/Hero';
import { Headphones, Mic, Users, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const coreFeatures = [
    {
      id: 'listen',
      icon: <Headphones size={24} className="text-blue-500" />,
      iconBg: 'bg-blue-500/10',
      title: 'Luyện nghe tiếng Anh (Dictation)',
      description: 'Nghe và gõ lại từng từ. Phương pháp nghe chép chính tả rèn tai bạn trên hội thoại thực tế, không phải audio giáo trình.',
      linkText: 'Luyện nghe ngay',
      linkPath: '/listen'
    },
    {
      id: 'shadowing',
      icon: <Mic size={24} className="text-pink-500" />,
      iconBg: 'bg-pink-500/10',
      title: 'Luyện nói & phát âm (Shadowing)',
      description: 'Nhại theo người bản xứ. AI chấm phát âm, ngữ điệu và nhịp điệu của bạn theo thời gian thực.',
      linkText: 'Luyện nói ngay',
      linkPath: '/shadowing'
    },
    {
      id: 'community',
      icon: <Users size={24} className="text-orange-500" />,
      iconBg: 'bg-orange-500/10',
      title: 'Luyện nói cùng cộng đồng',
      description: 'Ghép cặp voice chat 1-1 với người học cùng trình độ. Hội thoại thật, không áp lực.',
      linkText: 'Tìm bạn luyện nói',
      linkPath: '/speaking'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1120]">
      <Header />

      <main className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 py-8 flex-1 w-full">
        {/* Hero Section */}
        <Hero />

        {/* Section Headline */}
        <div className="text-center my-16 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 font-outfit">
            Một nền tảng - đủ mọi kỹ năng tiếng Anh
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Mọi kỹ năng ở cùng một chỗ, đều xoay quanh <span className="text-white font-medium">video thực tế</span> và <span className="text-white font-medium">phản hồi AI tức thì</span>
          </p>
        </div>

        {/* 3 Core Skill Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {coreFeatures.map((feat) => (
            <div
              key={feat.id}
              className="glass-card bg-[#151f32]/50 border border-white/5 p-6 rounded-2xl transition-all duration-300 hover:bg-[#1b2942]/70 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 ${feat.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-outfit">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {feat.description}
                </p>
              </div>

              <a
                href={feat.linkPath}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors mt-auto group w-fit"
              >
                {feat.linkText}
                <ChevronRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </main>

      {/* Footer with simulation data requirement */}
      <footer className="py-8 border-t border-white/5 text-center text-slate-500 text-xs">
        <div className="container mx-auto px-4 space-y-2">
          <p>© 2026 Smart English LMS - EnglishHub. Toàn bộ quyền được bảo lưu.</p>
          <p className="text-slate-600 italic">Dữ liệu mô phỏng phục vụ mục đích học tập.</p>
        </div>
      </footer>
    </div>
  );
}
