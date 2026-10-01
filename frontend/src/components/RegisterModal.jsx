import React from 'react';
import AuthModal from './AuthModal';

export default function RegisterModal(props) {
  return <AuthModal {...props} initialMode="register" />;
}
