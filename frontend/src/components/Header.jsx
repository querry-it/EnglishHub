import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-bottom border-white/10 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl group-hover:rotate-12 transition-transform shadow-lg shadow-blue-900/40">
            ⚡
          </div>
          <span>English<span className="text-blue-500">Hub</span></span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
               <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold uppercase">
                  {user.fullName.charAt(0)}
               </div>
               <span className="text-sm font-medium text-white">{user.fullName}</span>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-white font-medium px-4 py-2 flex items-center gap-2 transition-colors"
              >
                <LogIn size={18} />
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <UserPlus size={18} />
                Bắt đầu ngay
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
