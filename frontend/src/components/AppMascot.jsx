import React from 'react';

export default function AppMascot({ className = "w-8 h-8", animated = false }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 overflow-hidden rounded-xl border-2 border-sky-300 shadow-sm dark:border-sky-500 ${className} ${animated ? 'animate-bounce' : ''}`}>
      <img
        src="/app-icon-192-v2.png"
        alt="EnglishHub"
        className="w-full h-full object-contain drop-shadow-sm"
        draggable="false"
      />
    </div>
  );
}
