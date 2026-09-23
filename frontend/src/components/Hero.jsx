import React from 'react';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Hệ thống học tiếng Anh thế hệ mới
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6 font-outfit">
          Học tiếng Anh online: <br />
          <span className="text-blue-500">luyện nghe, luyện nói,</span> <br />
          từ vựng và luyện thi
        </h1>

        <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
          Nghe chép chính tả <span className="text-white font-medium">(Dictation)</span> và <span className="text-white font-medium">(Shadowing)</span> trên video thực tế, ghép cặp luyện nói cùng cộng đồng, <span className="text-white font-medium">luyện thi IELTS/TOEIC</span> — đều có phản hồi AI tức thì. Phù hợp mọi trình độ, từ A1 đến C2.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-900/20 transition-all transform hover:-translate-y-1 active:scale-95 text-lg">
            Bắt đầu Miễn Phí
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full border border-white/10 transition-all flex items-center gap-2 text-lg">
            <Play size={20} fill="currentColor" />
            Xem video giới thiệu
          </button>
        </div>
      </div>

      {/* Collage Image Section (Right Side) */}
      <div className="flex-1 relative w-full max-w-lg">
        <div className="relative z-10 grid grid-cols-2 gap-4 animate-float">
            <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=500&fit=crop" alt="Learning" className="w-full h-auto object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop" alt="Speaking" className="w-full h-auto object-cover" />
                </div>
            </div>
            <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop" alt="Community" className="w-full h-auto object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=500&fit=crop" alt="Success" className="w-full h-auto object-cover" />
                </div>
            </div>
        </div>
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/10 blur-[100px] -z-10 rounded-full"></div>
      </div>
    </section>
  );
}
