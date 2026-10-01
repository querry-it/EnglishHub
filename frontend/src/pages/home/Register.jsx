import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterModal from '../../components/RegisterModal';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { closeLoginModal } = useAuth();

  const handleClose = () => {
    closeLoginModal();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 relative">
      <RegisterModal isOpen={true} onClose={handleClose} />
    </div>
  );
}
