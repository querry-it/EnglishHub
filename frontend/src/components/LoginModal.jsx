import React from 'react';
import AuthModal from './AuthModal';

export default function LoginModal(props) {
  return <AuthModal {...props} initialMode="login" />;
}
