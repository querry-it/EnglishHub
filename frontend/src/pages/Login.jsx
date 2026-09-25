import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 relative">
      <LoginModal isOpen={true} onClose={() => navigate('/')} />
    </div>
  );
}
