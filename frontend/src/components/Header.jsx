import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const navItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Giới thiệu', path: '/about' },
    { label: 'Khóa học', path: '/courses' },
    { label: 'Lộ trình', path: '/roadmaps' },
    { label: 'Liên hệ', path: '/contact' },
  ];

  return (
    <header className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <div className="logo-icon">⚡</div>
          <span>English<span className="gradient-text">Hub</span></span>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-sky-400 font-semibold' : 'text-slate-300 hover:text-sky-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5">
            Đăng nhập
          </Link>
          <Link to="/register" className="btn btn-primary text-xs px-4 py-2 rounded-lg shadow-md">
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}
