import React, { useState } from 'react';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen w-screen bg-slate-50 dark:bg-slate-950 font-sans flex overflow-hidden">
      {/* App Sidebar - Fixed on Left */}
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Right Container - Fixed 100vh */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* App Header Bar - Pinned at Top */}
        <AppHeader />

        {/* Scrollable Page Content - ONLY THIS AREA SCROLLS */}
        <main className="flex-1 min-h-0 p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}

