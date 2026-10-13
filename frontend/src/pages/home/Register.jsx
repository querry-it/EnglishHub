import React from 'react';
import AuthModal from '../../components/AuthModal';

export default function Register() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <AuthModal isOpen={true} initialMode="register" isInline={true} />
    </div>
  );
}
