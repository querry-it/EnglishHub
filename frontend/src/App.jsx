import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureCard from './components/FeatureCard';

function App() {
  const features = [
    {
      icon: '⚛️',
      title: 'React 18 + Vite',
      description: 'Tốc độ HMR (Hot Module Replacement) siêu nhanh, trải nghiệm lập trình mượt mà tối đa.'
    },
    {
      icon: '🟢',
      title: 'Express Backend Skeleton',
      description: 'Khung Node.js Express gọn nhẹ sẵn sàng để bạn định nghĩa các API routes.'
    },
    {
      icon: '🎨',
      title: 'Giao Diện Glassmorphism',
      description: 'Thiết kế CSS hiện đại sử dụng HSL Palette, hiệu ứng kính mờ và micro-animations sống động.'
    },
    {
      icon: '⚡',
      title: 'Đồng Bộ Khởi Chạy',
      description: 'Sử dụng script npm run dev để chạy đồng thời cả Frontend và Backend bằng concurrently.'
    }
  ];

  return (
    <>
      <Header />
      <main className="container" style={{ flex: 1 }}>
        <Hero />

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            Tính Năng <span className="gradient-text">Nổi Bật</span>
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Nền tảng vững chắc để bạn bắt đầu xây dựng dự án EnglishHub hoặc bất kỳ sản phẩm web nào.
          </p>
        </div>

        <div className="features-grid">
          {features.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>
      </main>

      <footer>
        <div className="container">
          <p>© 2026 EnglishHub Project Starter. Built with React.js & Node.js Express.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
