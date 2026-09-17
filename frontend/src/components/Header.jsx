import React from 'react';

export default function Header() {
  return (
    <header className="navbar">
      <div className="container nav-content">
        <a href="/" className="logo">
          <div className="logo-icon">⚡</div>
          <span>English<span className="gradient-text">Hub</span></span>
        </a>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            React + Express Starter
          </span>
        </div>
      </div>
    </header>
  );
}
