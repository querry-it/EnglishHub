// Service kết nối API danh mục khóa học chuẩn Coursera cho EnglishHub
import api from './axios';

export const CUSTOM_COURSES_STORAGE_KEY = 'englishhub_custom_courses';

/**
 * Lấy danh sách các khóa học do Admin tự tạo/đăng thêm
 */
export function getStoredCustomCourses() {
  try {
    const raw = localStorage.getItem(CUSTOM_COURSES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Lưu khóa học mới do Admin đăng
 */
export function saveCustomCourse(newCourse) {
  const existing = getStoredCustomCourses();
  const updated = [newCourse, ...existing.filter((c) => c.id !== newCourse.id)];
  localStorage.setItem(CUSTOM_COURSES_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('course_catalog_updated', { detail: newCourse }));
  return newCourse;
}

/**
 * Xóa khóa học do Admin tự tạo
 */
export function deleteStoredCustomCourse(courseId) {
  const existing = getStoredCustomCourses();
  const updated = existing.filter((c) => c.id !== courseId);
  localStorage.setItem(CUSTOM_COURSES_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('course_catalog_updated', { detail: { id: courseId, deleted: true } }));
  return updated;
}

// Dữ liệu khóa học chuẩn Coursera (kết hợp các chứng chỉ IELTS, TOEIC, Giao tiếp)
export const COURSERA_STYLE_COURSES = [
  {
    id: 'course-ielts-1',
    title: 'Khóa học IELTS cho người mới bắt đầu (Foundation 4.5+)',
    slug: 'ielts-foundation-4-5',
    provider: 'Cambridge English Assessment Partner',
    providerLogo: '🎓',
    type: 'Professional Certificate',
    category: 'IELTS',
    level: 'Beginner (A2 - B1)',
    instructor: {
      name: 'Nguyen Van An',
      title: 'ThS. Giảng viên IELTS Lead (IELTS 8.5)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    },
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
    description: 'Xây dựng toàn diện nền tảng ngữ pháp học thuật, 600 từ vựng cốt lõi và chiến thuật xử lý 4 kỹ năng Nghe - Đọc - Viết - Nói cho người mới bắt đầu.',
    skillsGained: ['IELTS Reading', 'Grammar in Use', 'Academic Vocabulary', 'Pronunciation IPA', 'Basic Writing Task 1'],
    duration: '3 tháng · 4-6 giờ/tuần',
    schedule: 'Học linh hoạt 100% online',
    modulesCount: 6,
    lessonsCount: 36,
    studentsCount: 1850,
    rating: 4.9,
    reviewsCount: 324,
    price: 490000,
    originalPrice: 990000,
    badge: 'Phổ biến nhất',
    enrolled: true
  },
  {
    id: 'course-ielts-2',
    title: 'Khóa học IELTS Bứt phá Band 6.0 - 6.5+ Chuyên sâu',
    slug: 'ielts-breakthrough-6-5',
    provider: 'British Council Curriculum Aligned',
    providerLogo: '🏛️',
    type: 'Specialization Course',
    category: 'IELTS',
    level: 'Intermediate (B2)',
    instructor: {
      name: 'Nguyen Van An',
      title: 'ThS. Giảng viên IELTS Lead (IELTS 8.5)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    },
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
    description: 'Chiến thuật nâng cao cho Reading Passage 3, bài mẫu Writing Task 1 & Task 2 band 7.5+, cùng phản xạ Speaking tự nhiên với giám khảo.',
    skillsGained: ['Writing Task 2 Argumentation', 'Reading Speed Scanning', 'Speaking Part 2 & 3', 'Advanced Collocations', 'Coherence & Cohesion'],
    duration: '4 tháng · 6 giờ/tuần',
    schedule: 'Có hỗ trợ chấm bài 1-1',
    modulesCount: 5,
    lessonsCount: 26,
    studentsCount: 2410,
    rating: 4.95,
    reviewsCount: 512,
    price: 790000,
    originalPrice: 1490000,
    badge: 'Bán chạy',
    enrolled: false
  },
  {
    id: 'course-toeic-1',
    title: 'TOEIC 750+ Intensive Listening & Reading Comprehensive',
    slug: 'toeic-intensive-750',
    provider: 'ETS Format Mastered',
    providerLogo: '🎯',
    type: 'Certificate Course',
    category: 'TOEIC',
    level: 'Intermediate (B1 - B2)',
    instructor: {
      name: 'Tran Thi Bich',
      title: 'ThS. Giảng viên TOEIC Master (TOEIC 990)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'
    },
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600',
    description: 'Bí kíp bắt bẫy Part 1-2, kỹ thuật Skim 3 câu hỏi Part 3-4 trong 8 giây và 100 dạng ngữ pháp Part 5 giải trong 10 giây.',
    skillsGained: ['TOEIC Listening Mastery', 'Fast Scanning Part 7', 'Grammar Part 5 Hacks', 'Business Vocabulary', 'Time Management'],
    duration: '2.5 tháng · 4 giờ/tuần',
    schedule: 'Bài tập chấm điểm hàng tuần',
    modulesCount: 5,
    lessonsCount: 24,
    studentsCount: 3120,
    rating: 4.92,
    reviewsCount: 680,
    price: 490000,
    originalPrice: 890000,
    badge: 'Cam kết đầu ra',
    enrolled: false
  },
  {
    id: 'course-daily-1',
    title: 'Tiếng Anh Giao Tiếp Thực Chiến & Kỹ Năng Đàm Phán Công Sở',
    slug: 'everyday-conversational-english',
    provider: 'Global Communication Academy',
    providerLogo: '🗣️',
    type: 'Applied Skills Course',
    category: 'GIAO TIẾP',
    level: 'All Levels',
    instructor: {
      name: 'Le Hoang Nam',
      title: 'Giảng viên Giao tiếp Quốc tế & Thạc sĩ TESOL',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
    description: 'Tự tin giao tiếp trong các tình huống thực tế: Đi du lịch, phỏng vấn xin việc, thuyết trình dự án và đàm phán với đối tác nước ngoài.',
    skillsGained: ['Small Talk Fluency', 'American Accent Shadowing', 'Business Email Writing', 'Negotiation Tactics', 'Meeting Etiquette'],
    duration: '2 tháng · 3 giờ/tuần',
    schedule: 'Thực hành phản xạ 1-1',
    modulesCount: 3,
    lessonsCount: 14,
    studentsCount: 4200,
    rating: 4.85,
    reviewsCount: 440,
    price: 390000,
    originalPrice: 690000,
    badge: 'Thực chiến 100%',
    enrolled: false
  },
  {
    id: 'course-business-1',
    title: 'Tiếng Anh Doanh Nghiệp & Kỹ Năng Đàm Phán Hợp Đồng Quốc Tế',
    slug: 'business-english-negotiation',
    provider: 'Global Corporate Skills Institute',
    providerLogo: '💼',
    type: 'Executive Certificate',
    category: 'DOANH NGHIỆP',
    level: 'Advanced (B2 - C1)',
    instructor: {
      name: 'Dang Quoc Bao',
      title: 'Giảng viên Tiếng Anh Thương mại (MBA, CELTA)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    },
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600',
    description: 'Làm chủ kỹ năng thuyết trình trước nhà đầu tư quốc tế, viết email thương mại chuẩn mực và đàm phán hợp đồng kinh doanh đa quốc gia.',
    skillsGained: ['Contract Negotiation', 'Executive Presentation', 'Cross-cultural Communication', 'Formal Business Writing', 'Pitching'],
    duration: '3 tháng · 4 giờ/tuần',
    schedule: 'Case study doanh nghiệp thực tế',
    modulesCount: 5,
    lessonsCount: 30,
    studentsCount: 1420,
    rating: 4.88,
    reviewsCount: 195,
    price: 590000,
    originalPrice: 1200000,
    badge: 'Doanh nghiệp',
    enrolled: false
  }
];

/**
 * Móc API danh mục khóa học, tự động đồng bộ hóa với backend hoặc API đám mây và custom courses
 */
export async function fetchCoursesCatalogAPI() {
  const customCourses = getStoredCustomCourses();

  try {
    const res = await api.get('/lessons/admin/all').catch(() => null);
    if (res && res.data && res.data.success && Array.isArray(res.data.courses) && res.data.courses.length > 0) {
      const merged = COURSERA_STYLE_COURSES.map((preset) => {
        const found = res.data.courses.find(
          (c) => c.title?.toLowerCase().includes(preset.category?.toLowerCase()) || c.id === preset.id
        );
        if (found) {
          return {
            ...preset,
            title: found.title || preset.title,
            modulesCount: found.modules?.length || preset.modulesCount,
            lessonsCount: found.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || preset.lessonsCount,
          };
        }
        return preset;
      });
      return [...customCourses, ...merged];
    }
  } catch (e) {
    console.warn('Backend API offline, sử dụng dữ liệu Coursera chuẩn:', e);
  }

  // Fallback kết hợp catalog chuẩn và các khóa học do Admin tự tạo
  return [...customCourses, ...COURSERA_STYLE_COURSES];
}
