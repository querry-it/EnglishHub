import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart } from 'lucide-react';
import AppMascot from './AppMascot';

export default function Footer() {
  return (
    <footer className="bg-[#141414] text-slate-300 pt-14 pb-8 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          
          {/* Column 1: Brand & App Download Links */}
          <div className="lg:col-span-5 space-y-5">
            <Link 
              to="/intro" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center gap-2.5 group"
            >
              <AppMascot className="w-9 h-9 group-hover:scale-105 transition-transform" />
              <span className="font-extrabold text-xl text-white tracking-tight">
                EnglishHub
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Cải thiện kỹ năng phát âm và nói tiếng Anh của bạn với phương pháp shadowing và nghe chép hiện đại.
            </p>

            <div className="pt-2 space-y-3">
              <h5 className="text-xs font-bold text-slate-200 tracking-wide">
                Tải ứng dụng
              </h5>

              <div className="flex flex-wrap items-center gap-3">
                {/* App Store Button */}
                <a
                  href="#"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white transition-all shadow-sm group"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.63c.66-.8 1.11-1.92.99-3.03-.96.04-2.12.64-2.8 1.44-.61.71-1.14 1.86-1 2.97 1.08.08 2.16-.58 2.81-1.38z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-semibold">Download on the</span>
                    <span className="block text-xs font-bold text-white">App Store</span>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="#"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white transition-all shadow-sm group"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M3.6 1.8c-.2.2-.3.5-.3.9v18.6c0 .4.1.7.3.9l.1.1 10.4-10.4v-.2L3.7 1.7l-.1.1z" />
                    <path fill="#FBBC04" d="M17.6 15.3l-3.5-3.5v-.2l3.5-3.5.1.1 4.2 2.4c1.2.7 1.2 1.8 0 2.5l-4.3 2.2z" />
                    <path fill="#4285F4" d="M17.7 15.2L14.1 11.7 3.6 22.2c.4.4 1 .4 1.7 0l12.4-7z" />
                    <path fill="#34A853" d="M17.7 8.8L5.3 1.8c-.7-.4-1.3-.4-1.7 0L14.1 12.3l3.6-3.5z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-semibold">GET IT ON</span>
                    <span className="block text-xs font-bold text-white">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: THÔNG TIN */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              THÔNG TIN
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-400 transition-colors">Chính sách bảo mật</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">Về chúng tôi</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">Tác giả</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-400 transition-colors">Điều khoản dịch vụ</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Liên hệ</Link></li>
              <li><Link to="/faq" className="hover:text-indigo-400 transition-colors">Feedback</Link></li>
            </ul>
          </div>

          {/* Column 3: TÍNH NĂNG */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              TÍNH NĂNG
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li><Link to="/listening?mode=shadowing" className="hover:text-indigo-400 transition-colors">Shadowing</Link></li>
              <li><Link to="/listening" className="hover:text-indigo-400 transition-colors">Nghe chép</Link></li>
              <li><Link to="/vocabulary" className="hover:text-indigo-400 transition-colors">Từ vựng</Link></li>
              <li><Link to="/speaking" className="hover:text-indigo-400 transition-colors">Luyện nói</Link></li>
              <li><Link to="/games" className="hover:text-indigo-400 transition-colors">Vocab Battle</Link></li>
              <li><Link to="/games" className="hover:text-indigo-400 transition-colors">Trò Chơi</Link></li>
              <li><Link to="/exams?type=ielts" className="hover:text-indigo-400 transition-colors">Luyện thi IELTS</Link></li>
              <li><Link to="/exams?type=toeic" className="hover:text-indigo-400 transition-colors">Luyện thi TOEIC</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Divider & Copyright */}
        <div className="border-t border-slate-800/80 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Copyright */}
          <div>
            © 2026 ENGLISHHUB CO., LTD. All rights reserved.
          </div>

          {/* Social Pills */}
          <div className="flex items-center gap-2.5">
            {/* Facebook */}
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all text-xs font-black">
              f
            </a>
            {/* TikTok */}
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-all text-xs font-black">
              🎵
            </a>
            {/* LinkedIn */}
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-all text-xs font-black">
              in
            </a>
            {/* Threads */}
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all text-xs font-black">
              @
            </a>
            {/* Product */}
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-orange-600 text-slate-300 hover:text-white flex items-center justify-center transition-all text-xs font-bold">
              P
            </a>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1.5 font-medium">
            <span>Làm với</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>bởi <strong className="text-white font-bold">EnglishHub</strong></span>
          </div>

        </div>

      </div>

      {/* Floating Chat Bubble Widget at bottom right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          className="w-12 h-12 rounded-full bg-[#1E2540] hover:bg-indigo-900 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform border border-indigo-700/50 relative group"
          title="Hỗ trợ & Trò chuyện"
        >
          <MessageSquare className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
            ×
          </span>
        </button>
      </div>
    </footer>
  );
}
