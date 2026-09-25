import React, { useState } from 'react';
import { Medal, Flame, Sparkles } from 'lucide-react';
import AppCard from './AppCard';

export default function MilestoneRewards() {
  const [activeTab, setActiveTab] = useState('streak');

  return (
    <AppCard className="space-y-4">
      <div>
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Medal className="w-5 h-5 text-amber-500" />
          <span>Mốc thưởng</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
          Đạt mốc theo chuỗi và theo level để nhận kim cương, huy hiệu và khung avatar
        </p>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setActiveTab('streak')}
          className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all ${
            activeTab === 'streak' 
              ? 'bg-slate-900 text-white' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-orange-500" /> Theo chuỗi
        </button>
        <button 
          onClick={() => setActiveTab('level')}
          className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all ${
            activeTab === 'level' 
              ? 'bg-slate-900 text-white' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Theo level
        </button>
      </div>

      <div className="p-8 text-center text-slate-400 text-xs font-medium bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
        — Hoàn thành bài học đầu tiên để kích hoạt mốc thưởng —
      </div>
    </AppCard>
  );
}
