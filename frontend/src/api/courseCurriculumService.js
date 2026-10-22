// API Service kết nối và tải lộ trình khóa học (Curriculum & Lessons)
import api from './axios';
import { COURSES_CURRICULUM_MAP, getCourseCurriculum } from '../data/coursesCurriculumData';

/**
 * Cache trong phiên để tăng tốc độ tải
 */
const curriculumCache = new Map();

/**
 * Móc API lấy lộ trình khóa học chi tiết
 * Tự động thử endpoint backend (/courses/:id/curriculum hoặc /lessons/:courseId),
 * nếu backend offline hoặc chưa có thì fallback sang dữ liệu giáo trình chuẩn Coursera đã qua kiểm định video hoạt động.
 */
export async function fetchCourseCurriculumAPI(courseId = 'course-ielts-1') {
  const targetId = courseId || 'course-ielts-1';

  if (curriculumCache.has(targetId)) {
    return curriculumCache.get(targetId);
  }

  try {
    // 1. Thử gọi backend API
    const res = await api.get(`/lessons/${targetId}`).catch(() => null);
    if (res && res.data && res.data.success && res.data.curriculum) {
      curriculumCache.set(targetId, res.data.curriculum);
      return res.data.curriculum;
    }
  } catch (err) {
    console.warn(`[Curriculum API] Backend offline cho khóa ${targetId}, sử dụng giáo trình Coursera:`, err.message);
  }

  // 2. Fallback sang dữ liệu giáo trình chuẩn Coursera chất lượng cao
  const defaultCurriculum = getCourseCurriculum(targetId);
  curriculumCache.set(targetId, defaultCurriculum);
  
  // Giả lập độ trễ mạng nhẹ (150ms) để UI mượt mà có animation loading chuẩn LMS
  await new Promise((resolve) => setTimeout(resolve, 150));
  return defaultCurriculum;
}

/**
 * Lấy danh sách toàn bộ các khóa học đang có lộ trình chi tiết
 */
export async function fetchAllCurriculumsList() {
  return Object.values(COURSES_CURRICULUM_MAP);
}
