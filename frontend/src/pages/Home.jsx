import React from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  const features = [
    {
      icon: '🎙️',
      title: 'Thu Âm Speaking Trực Tiếp',
      description: 'Luyện nói tiếng Anh trực tiếp trên trình duyệt, nộp bài ghi âm và nhận phản hồi chi tiết.'
    },
    {
      icon: '✍️',
      title: 'Chấm Writing Theo Rubric',
      description: 'Giao diện sửa lỗi từ vựng, ngữ pháp và nhận xét chi tiết theo tiêu chí học thuật.'
    },
    {
      icon: '🧠',
      title: 'Ghi Nhớ Từ Vựng SM-2',
      description: 'Thuật toán Spaced Repetition (SuperMemo SM-2) tính toán chu kỳ lặp lại tối ưu cho bộ nhớ.'
    },
    {
      icon: '⚡',
      title: 'Tiến Độ Mở Khóa Bài Học',
      description: 'Chỉ mở khóa bài học tiếp theo khi xem đủ video và đạt ≥80% điểm bài kiểm tra.'
    }
  ];

  return (
    <main className="container py-8" style={{ flex: 1 }}>
      <Hero />

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
          Tính Năng <span className="gradient-text">Nổi Bật</span>
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Hệ thống Quản lý Đào tạo và Học tập Tiếng Anh Trực tuyến (Smart English LMS).
        </p>
      </div>

      <div className="features-grid">
        {features.map((item, index) => (
          <FeatureCard key={index} {...item} />
        ))}
      </div>
    </main>
  );
}
