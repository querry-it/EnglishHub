import React from 'react';
import { X, Edit3, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StudyModeModal({ isOpen, onClose, lesson }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelectMode = (mode) => {
    onClose();
    // Navigate to listening page with the selected mode and lesson id if available
    if (lesson?.id) {
      navigate(`/listening?mode=${mode}&lessonId=${lesson.id}`);
    } else {
      navigate(`/listening?mode=${mode}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden text-slate-900 dark:text-white transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 mb-6">
          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Chọn chế độ học
          </h3>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Chọn chế độ học phù hợp với bạn nhất
          </p>
        </div>

        {/* Mode Options Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
          
          {/* Option 1: Dictation (Nghe - Viết chính tả) */}
          <button
            onClick={() => handleSelectMode('dictation')}
            className="group relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-400 rounded-3xl p-5 flex flex-col items-center justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            {/* Mascot Illustration */}
            <div className="w-36 h-36 relative flex items-center justify-center my-2">
              <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
                {/* Headphone Band */}
                <path d="M 40 70 A 42 42 0 0 1 120 70" fill="none" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
                
                {/* Parrot Head / Body */}
                <circle cx="80" cy="80" r="44" fill="#0284C7" />
                <circle cx="80" cy="80" r="40" fill="#0EA5E9" />
                
                {/* White Eye Patches */}
                <ellipse cx="68" cy="72" rx="14" ry="17" fill="#FFFFFF" />
                <ellipse cx="92" cy="72" rx="14" ry="17" fill="#FFFFFF" />
                
                {/* Pupils */}
                <circle cx="70" cy="72" r="7" fill="#0F172A" />
                <circle cx="90" cy="72" r="7" fill="#0F172A" />
                <circle cx="68" cy="69" r="2.5" fill="#FFFFFF" />
                <circle cx="88" cy="69" r="2.5" fill="#FFFFFF" />
                
                {/* Beak */}
                <path d="M 74 82 Q 80 100 86 82 Z" fill="#F59E0B" />
                <path d="M 75 82 Q 80 95 85 82 Z" fill="#FBBF24" />
                
                {/* Headphones */}
                <rect x="26" y="62" width="16" height="28" rx="7" fill="#1E293B" />
                <rect x="118" y="62" width="16" height="28" rx="7" fill="#1E293B" />
                <rect x="29" y="66" width="10" height="20" rx="4" fill="#F59E0B" />
                <rect x="121" y="66" width="10" height="20" rx="4" fill="#F59E0B" />

                {/* Blush Cheeks */}
                <ellipse cx="58" cy="86" rx="6" ry="4" fill="#F43F5E" opacity="0.5" />
                <ellipse cx="102" cy="86" rx="6" ry="4" fill="#F43F5E" opacity="0.5" />

                {/* Notebook / Paper */}
                <rect x="44" y="112" width="40" height="30" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" transform="rotate(-6 64 127)" />
                <line x1="50" y1="120" x2="76" y2="117" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="50" y1="127" x2="74" y2="124" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

                {/* Hand holding Pencil */}
                <circle cx="92" cy="118" r="10" fill="#0EA5E9" />
                <path d="M 88 126 L 102 100 L 106 104 L 92 130 Z" fill="#F59E0B" />
                <path d="M 88 126 L 86 132 L 92 130 Z" fill="#334155" />
              </svg>
            </div>

            {/* Label Button */}
            <div className="w-full mt-3 py-3 px-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 group-hover:border-sky-500 group-hover:bg-sky-50 dark:group-hover:bg-sky-950/40 transition-colors flex items-center justify-center gap-2">
              <Edit3 className="w-4 h-4 text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
              <span className="text-xs font-black tracking-tight text-slate-800 dark:text-white uppercase group-hover:text-sky-600 dark:group-hover:text-sky-400">
                NGHE - VIẾT CHÍNH TẢ
              </span>
            </div>
          </button>

          {/* Option 2: Pronunciation (Bắt chước phát âm) */}
          <button
            onClick={() => handleSelectMode('shadowing')}
            className="group relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-400 rounded-3xl p-5 flex flex-col items-center justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            {/* Mascot Illustration */}
            <div className="w-36 h-36 relative flex items-center justify-center my-2">
              <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
                {/* Headphone Band */}
                <path d="M 40 70 A 42 42 0 0 1 120 70" fill="none" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
                
                {/* Parrot Head / Body */}
                <circle cx="80" cy="80" r="44" fill="#0284C7" />
                <circle cx="80" cy="80" r="40" fill="#0EA5E9" />
                
                {/* White Eye Patches */}
                <ellipse cx="68" cy="72" rx="14" ry="17" fill="#FFFFFF" />
                <ellipse cx="92" cy="72" rx="14" ry="17" fill="#FFFFFF" />
                
                {/* Pupils */}
                <circle cx="70" cy="72" r="7" fill="#0F172A" />
                <circle cx="90" cy="72" r="7" fill="#0F172A" />
                <circle cx="68" cy="69" r="2.5" fill="#FFFFFF" />
                <circle cx="88" cy="69" r="2.5" fill="#FFFFFF" />
                
                {/* Beak Open / Talking */}
                <path d="M 72 82 Q 80 104 88 82 Z" fill="#F59E0B" />
                <path d="M 74 84 Q 80 96 86 84 Z" fill="#EF4444" />

                {/* Headphones */}
                <rect x="26" y="62" width="16" height="28" rx="7" fill="#1E293B" />
                <rect x="118" y="62" width="16" height="28" rx="7" fill="#1E293B" />
                <rect x="29" y="66" width="10" height="20" rx="4" fill="#F59E0B" />
                <rect x="121" y="66" width="10" height="20" rx="4" fill="#F59E0B" />

                {/* Blush Cheeks */}
                <ellipse cx="58" cy="86" rx="6" ry="4" fill="#F43F5E" opacity="0.5" />
                <ellipse cx="102" cy="86" rx="6" ry="4" fill="#F43F5E" opacity="0.5" />

                {/* Speech Bubble / Hi badge */}
                <g transform="translate(100, 84)">
                  <rect x="0" y="0" width="40" height="26" rx="13" fill="#FBBF24" />
                  <polygon points="4,22 -4,28 10,24" fill="#FBBF24" />
                  <text x="20" y="17" textAnchor="middle" fill="#78350F" fontSize="12" fontWeight="900" fontFamily="sans-serif">Hi~</text>
                </g>

                {/* Waving Hand */}
                <circle cx="50" cy="116" r="10" fill="#0EA5E9" />
              </svg>
            </div>

            {/* Label Button */}
            <div className="w-full mt-3 py-3 px-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 group-hover:border-sky-500 group-hover:bg-sky-50 dark:group-hover:bg-sky-950/40 transition-colors flex items-center justify-center gap-2">
              <Mic className="w-4 h-4 text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
              <span className="text-xs font-black tracking-tight text-slate-800 dark:text-white uppercase group-hover:text-sky-600 dark:group-hover:text-sky-400">
                BẮT CHƯỚC PHÁT ÂM
              </span>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
