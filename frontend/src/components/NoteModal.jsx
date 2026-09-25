import React, { useState, useEffect } from 'react';
import { Edit3, X } from 'lucide-react';

export default function NoteModal({ isOpen, onClose, segment, onSave }) {
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (segment) {
      setNoteText(segment.note || '');
    }
  }, [segment]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (onSave) {
      onSave(segment?.id, noteText);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFFEE0] dark:bg-amber-950/90 border-2 border-amber-300 dark:border-amber-600 rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 text-slate-900 dark:text-amber-100 flex flex-col justify-between min-h-[300px]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200/80 dark:border-amber-700/60">
          <div className="flex items-center gap-2 font-black text-sm text-slate-800 dark:text-amber-200 uppercase tracking-tight">
            <Edit3 className="w-4 h-4 text-slate-700 dark:text-amber-300" />
            <span>THÊM GHI CHÚ</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-amber-100 hover:bg-amber-100/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Text Area */}
        <div className="py-4 flex-1">
          <textarea
            rows={5}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Nhập ghi chú cho câu này"
            className="w-full h-full bg-transparent border-none text-sm font-semibold text-slate-800 dark:text-amber-100 placeholder:text-slate-400 dark:placeholder:text-amber-400/60 focus:outline-none resize-none"
            autoFocus
          />
        </div>

        {/* Bottom Right Save Button */}
        <div className="flex items-center justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-slate-600 hover:bg-slate-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
          >
            LƯU GHI CHÚ
          </button>
        </div>

      </div>
    </div>
  );
}
