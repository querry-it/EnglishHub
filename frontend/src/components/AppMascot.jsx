import React from 'react';

export default function AppMascot({ className = "w-8 h-8", animated = false }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className} ${animated ? 'animate-bounce' : ''}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        {/* Main Blue Circle Head */}
        <circle cx="50" cy="50" r="46" fill="#29B6F6" />

        {/* Left Eye */}
        <circle cx="36" cy="40" r="11" fill="#FFFFFF" />
        <circle cx="36" cy="40" r="5" fill="#0F172A" />
        <circle cx="38" cy="38" r="1.5" fill="#FFFFFF" />

        {/* Right Eye */}
        <circle cx="64" cy="40" r="11" fill="#FFFFFF" />
        <circle cx="64" cy="40" r="5" fill="#0F172A" />
        <circle cx="66" cy="38" r="1.5" fill="#FFFFFF" />

        {/* Orange Beak */}
        <polygon points="44,53 56,53 50,63" fill="#FF9800" />

        {/* Yellow/Orange Ruler Strip */}
        <rect x="25" y="66" width="50" height="13" rx="6.5" fill="#FFA726" />
        
        {/* Ruler Tick Lines */}
        <line x1="35" y1="66" x2="35" y2="72" stroke="#422006" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="43" y1="66" x2="43" y2="74" stroke="#422006" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="51" y1="66" x2="51" y2="72" stroke="#422006" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="59" y1="66" x2="59" y2="74" stroke="#422006" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="67" y1="66" x2="67" y2="72" stroke="#422006" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

