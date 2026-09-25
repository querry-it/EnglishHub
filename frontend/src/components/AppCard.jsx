import React from 'react';

/**
 * AppCard - Reusable UI Card Container with standard 2px border matching theme
 */
export default function AppCard({ 
  children, 
  className = '', 
  padding = 'p-6',
  hoverEffect = false,
  ...props 
}) {
  return (
    <div 
      className={`bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-300 dark:border-slate-700 shadow-sm ${padding} ${
        hoverEffect ? 'hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
