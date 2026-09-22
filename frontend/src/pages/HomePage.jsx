import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';

export default function HomePage() {
  const features = [
    {
      icon: '⚛️',
      title: 'React 18 + Vite',
      description: 'Tốc độ HMR (Hot Module Replacement) siêu nhanh, trải nghiệm lập trình mượt mà tối đa.'
    },
    {
      icon: '🟢',
      title: 'Express Backend',
      description: 'Hệ thống Auth với JWT & Refresh Token bảo mật tuyệt đối qua HttpOnly Cookie.'
    },
    {
      icon: '🎨',
      title: 'Tailwind CSS',
      description: 'Giao diện Glassmorphism hiện đại, responsive hoàn hảo trên mọi thiết bị.'
    },
    {
      icon: '⚡',
      title: 'Prisma + Postgres',
      description: 'Quản lý cơ sở dữ liệu mạnh mẽ, an toàn với Supabase Cloud.'
    }
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <Hero />
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-white">
            Tính Năng <span className="gradient-text">Nổi Bật</span>
          </h2>
          <p className="text-slate-400">
            Học tiếng Anh thông minh với lộ trình cá nhân hóa và công nghệ hiện đại.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>
      </main>
      <footer className="py-8 border-t border-white/10 text-center text-slate-500">
        <div className="container mx-auto">
          <p>© 2026 Smart English LMS - EnglishHub. Built for Excellence.</p>
        </div>
      </footer>
    </>
  );
}
