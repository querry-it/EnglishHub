import { ieltsFoundation } from './curriculum/ieltsFoundation';
import { ieltsBreakthrough } from './curriculum/ieltsBreakthrough';
import { toeicIntensive } from './curriculum/toeicIntensive';
import { dailyCommunication } from './curriculum/dailyCommunication';
import { getStoredCustomCourses } from '../api/courseService';

// Bản đồ toàn bộ giáo trình các khóa học có phí của EnglishHub
export const COURSES_CURRICULUM_MAP = {
  'course-ielts-1': ieltsFoundation,
  'course-ielts-2': ieltsBreakthrough,
  'course-toeic-1': toeicIntensive,
  'course-daily-1': dailyCommunication,
};

/**
 * Lấy giáo trình khóa học theo ID (tự động kiểm tra cả khóa do Admin tự đăng)
 */
export function getCourseCurriculum(courseId) {
  // 1. Kiểm tra trong danh sách khóa học Admin tạo
  const customCourses = getStoredCustomCourses();
  const foundCustom = customCourses.find(c => c.id === courseId);
  if (foundCustom) {
    return {
      ...foundCustom,
      instructor: foundCustom.instructor?.name || foundCustom.instructor?.fullName || foundCustom.instructor || 'Nguyen Van An',
      instructorEmail: foundCustom.instructor?.email || foundCustom.instructorEmail || 'nguyenvanan@englishhub.edu.vn',
      modules: foundCustom.modules || []
    };
  }

  // 2. Fallback sang bản đồ giáo trình chuẩn
  return COURSES_CURRICULUM_MAP[courseId] || COURSES_CURRICULUM_MAP['course-ielts-1'];
}
