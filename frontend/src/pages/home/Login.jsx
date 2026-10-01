import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../../components/LoginModal';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { closeLoginModal } = useAuth();

  const handleClose = () => {
    closeLoginModal();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 relative">
      <LoginModal isOpen={true} onClose={handleClose} />
    </div>
  );
}
