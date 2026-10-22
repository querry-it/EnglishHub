// Service quản lý bài nộp giữa Học viên (CourseClassroom) và Giảng viên (InstructorGrading)

export const DEFAULT_SUBMISSIONS = [
  {
    id: 1,
    category: 'IELTS',
    courseId: 'course-ielts-2',
    instructorName: 'Nguyen Van An',
    instructorEmail: 'nguyenvanan@englishhub.edu.vn',
    studentName: 'Nguyễn Văn Minh',
    studentEmail: 'minhielts@gmail.com',
    courseTitle: 'Khóa học IELTS Bứt phá Band 6.0 - 6.5+ Chuyên sâu',
    coursePrice: '790.000đ',
    lessonId: 'ielts2-m3-l3',
    lessonTitle: 'Bài kiểm tra Writing Task 2 — Education & Technology',
    submittedAt: '15 phút trước',
    type: 'Writing Task 2 (Opinion Essay)',
    status: 'pending',
    targetBand: '7.0',
    studentNote: `In recent decades, the integration of digital technology in educational institutions has triggered intense global debate. While some skeptics argue that electronic devices induce major classroom distractions, I firmly believe that technological innovations deliver substantial pedagogical advantages when implemented under strict pedagogical guidelines.

On the one hand, excessive reliance on smartphones and social media can severely diminish students' concentration. Studies conducted by Cambridge University demonstrate that students who multitask during lectures retain 25% less conceptual knowledge compared to those using traditional textbooks. Furthermore, over-dependence on automated grammatical tools may undermine foundational writing competencies.

On the other hand, cutting-edge educational platforms empower students to access unprecedented learning repositories. Interactive simulations, digital encyclopedias, and cloud-based collaborative workspaces allow learners from underprivileged areas to participate in world-class academic curricula. Additionally, personalized artificial intelligence tutors can cater to individual learning paces, thereby bridging the achievement gap.

In conclusion, while the hazards of digital distractions cannot be dismissed, the profound benefits of educational technology are undeniable. Educational policy makers should therefore focus on teaching responsible digital literacy rather than imposing outright technological bans.`,
    annotations: [
      {
        id: 'ann-1',
        original: 'induce major classroom distractions',
        correction: 'cause major distractions in the classroom',
        type: 'vocab',
        categoryLabel: 'Từ vựng (Vocabulary)',
        explanation: 'Từ "induce" thường gắn với ngữ cảnh y học hoặc tâm lý (induce labor/sleep). Trong văn cảnh giáo dục, dùng "cause" hoặc "lead to significant distractions" sẽ tự nhiên hơn.'
      },
      {
        id: 'ann-2',
        original: 'under strict pedagogical guidelines',
        correction: 'under structured academic frameworks',
        type: 'praise',
        categoryLabel: 'Điểm sáng (Praise)',
        explanation: 'Cụm collocation C1 rất ấn tượng! Thể hiện tư duy học thuật tốt và diễn đạt trang trọng.'
      },
      {
        id: 'ann-3',
        original: 'diminish students\' concentration',
        correction: 'compromise students\' attention spans',
        type: 'style',
        categoryLabel: 'Diễn đạt (Style)',
        explanation: 'Cách dùng khá tốt, có thể nâng cấp thành "compromise attention spans" để ghi điểm Lexical Resource Band 7.5+.'
      },
      {
        id: 'ann-4',
        original: 'bridging the achievement gap',
        correction: 'narrowing the educational divide',
        type: 'praise',
        categoryLabel: 'Collocation đắt giá (Praise)',
        explanation: 'Cụm từ rất đắt giá và chuẩn phong cách bài thi IELTS Writing Task 2.'
      }
    ],
    upgradedSample: `In contemporary education, the pervasive adoption of technological tools represents an epochal transformation. Far from being merely a source of classroom diversion, digital infrastructure fundamentally democratizes access to elite academic resources, provided that institutions establish rigorous pedagogical frameworks.`,
    result: null
  },
  {
    id: 2,
    category: 'IELTS',
    courseId: 'course-ielts-1',
    instructorName: 'Nguyen Van An',
    instructorEmail: 'nguyenvanan@englishhub.edu.vn',
    studentName: 'Trần Thu Hà',
    studentEmail: 'thuha@gmail.com',
    courseTitle: 'Khóa học IELTS cho người mới bắt đầu (Foundation 4.5+)',
    coursePrice: '490.000đ',
    lessonId: 'ielts1-m4-l2',
    lessonTitle: 'Bài kiểm tra Writing Task 1 — Biểu đồ cột (Bar chart)',
    submittedAt: '40 phút trước',
    type: 'Writing Task 1 (Bar Chart Report)',
    status: 'pending',
    targetBand: '5.5',
    studentNote: `The bar chart illustrates the number of university enrollments across three major institutions in the UK between 2010 and 2020.

Overall, it is clear that University A experienced the most significant upward trend throughout the decade, whereas University C witnessed a gradual downward trajectory. Additionally, University B remained relatively stable despite minor fluctuations.

Looking closely at University A, student admissions stood at approximately 12,000 in 2010 before soaring remarkably to reach a peak of 24,000 in 2020, representing a twofold increase. In stark contrast, University C started as the most popular institution with 18,000 enrollments, but this figure steadily declined to just 11,000 at the end of the period. Meanwhile, University B maintained an average of roughly 15,000 attendees across the entire 10-year span.`,
    annotations: [
      {
        id: 'ann-2-1',
        original: 'experienced the most significant upward trend',
        correction: 'recorded the most pronounced growth',
        type: 'style',
        categoryLabel: 'Diễn đạt (Style)',
        explanation: 'Cách viết overview rất rõ ràng và đầy đủ 2 đặc điểm chính của biểu đồ.'
      },
      {
        id: 'ann-2-2',
        original: 'soaring remarkably to reach a peak of',
        correction: 'surging to a high of',
        type: 'vocab',
        categoryLabel: 'Từ vựng số liệu (Vocabulary)',
        explanation: '"Soar" đã mang nghĩa tăng rất mạnh, không cần thêm "remarkably" để tránh lặp sắc thái.'
      }
    ],
    result: null
  },
  {
    id: 3,
    category: 'TOEIC',
    courseId: 'course-toeic-1',
    instructorName: 'Tran Thi Bich',
    instructorEmail: 'tranthibich@englishhub.edu.vn',
    studentName: 'Lê Hoàng Nam',
    studentEmail: 'nam123@gmail.com',
    courseTitle: 'TOEIC 750+ Intensive Listening & Reading Comprehensive',
    coursePrice: '490.000đ',
    lessonId: 'toeic-m4-l2',
    lessonTitle: 'Bài kiểm tra giữa kỳ: Full Test Listening & Reading',
    submittedAt: '1 giờ trước',
    type: 'Mock Test Giữa kỳ (Listening & Reading)',
    status: 'pending',
    targetBand: '800+',
    studentNote: `Dạ em nộp kết quả bài làm Mock Test giữa kỳ:
- Phần Listening: Đạt 78/100 câu đúng (ước tính ~390 điểm). Em bị mất điểm ở Part 3 đoạn hội thoại 3 người nói và Part 4 câu hỏi ngụ ý (inference).
- Phần Reading: Đạt 72/100 câu đúng (ước tính ~355 điểm). Part 5 em sai 5 câu về mệnh đề quan hệ rút gọn (V-ing vs V3/ed) và liên từ phụ thuộc. Part 7 em bị thiếu 7 phút nên phải đánh lụi 4 câu cuối.

Em nhờ cô nhận xét chi tiết chiến thuật phân bổ thời gian cho Part 7 và sửa giúp em lỗi ngữ pháp ở Part 5 ạ!`,
    annotations: [
      {
        id: 'ann-3-1',
        original: 'Part 3 đoạn hội thoại 3 người nói',
        correction: 'Chiến thuật: Đọc trước 3 câu hỏi và xác định giọng nói (nam/nữ) trước khi audio phát',
        type: 'style',
        categoryLabel: 'Chiến thuật (Strategy)',
        explanation: 'Khi có 3 người, cần chú ý tên riêng được nhắc trong audio để bắt đúng thông tin.'
      }
    ],
    result: null
  },
  {
    id: 4,
    category: 'GIAOTIEP',
    courseId: 'course-daily-1',
    instructorName: 'Le Hoang Nam',
    instructorEmail: 'lehoangnam@englishhub.edu.vn',
    studentName: 'Đỗ Minh Tuấn',
    studentEmail: 'tuando@gmail.com',
    courseTitle: 'Khóa học Tiếng Anh Giao Tiếp Thực Tế (Everyday English Mastery)',
    coursePrice: '290.000đ',
    lessonId: 'daily-m5-l2',
    lessonTitle: 'Bài kiểm tra cuối kỳ: Viết Email đàm phán tiến độ dự án',
    submittedAt: '2 giờ trước',
    type: 'Tình huống Thương Mại (Business Email)',
    status: 'pending',
    targetBand: 'Thang 10',
    studentNote: `Subject: Urgent - Project Delivery Timeline Adjustment Request

Dear Mr. Henderson,

Following our telephone conversation this morning, I am writing to discuss about our project timeline. As you know, our development team has met several technical issues last week during the server migration, so we need to extend the delivery date.

Could you please confirm if we can delay the final presentation until next Friday, October 30th? I would like to apologize for this inconvenience and I promise we will deliver the highest quality product.

Looking forward to hearing from you soon.

Best regards,
Do Minh Tuan
Senior Front-end Engineer`,
    annotations: [
      {
        id: 'ann-4-1',
        original: 'discuss about',
        correction: 'discuss',
        type: 'grammar',
        categoryLabel: 'Lỗi Ngữ pháp (Grammar)',
        explanation: '"Discuss" là ngoại động từ (transitive verb), đi trực tiếp với tân ngữ: "discuss our project timeline", không thêm giới từ "about".'
      },
      {
        id: 'ann-4-2',
        original: 'has met several technical issues',
        correction: 'encountered several technical difficulties',
        type: 'vocab',
        categoryLabel: 'Collocation (Vocabulary)',
        explanation: 'Trong tiếng Anh công sở, nên dùng "encountered technical issues" hoặc "ran into unforeseen bugs" thay vì "met issues".'
      },
      {
        id: 'ann-4-3',
        original: 'delay the final presentation until',
        correction: 'postpone the final delivery milestone to',
        type: 'style',
        categoryLabel: 'Văn phong thương mại (Business Style)',
        explanation: '"Postpone" hoặc "reschedule" tạo cảm giác chuyên nghiệp và có kế hoạch hơn từ "delay".'
      }
    ],
    upgradedSample: `Dear Mr. Henderson,

Further to our discussion earlier today, I am writing to formally request a brief extension on our project delivery milestone. Owing to unforeseen infrastructure bottlenecks during our database migration, our engineering team requires an additional four business days to perform comprehensive quality assurance.

We would be immensely grateful if the final handover could be rescheduled to Friday, October 30th. Please accept our sincere apologies for any inconvenience this adjustment may cause.

Kind regards,
Do Minh Tuan`,
    result: null
  }
];

const STORAGE_KEY = 'englishhub_course_submissions_v3';

/**
 * Lấy danh sách tất cả các bài nộp
 */
export function getStoredSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SUBMISSIONS));
      return DEFAULT_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_SUBMISSIONS;
  }
}

/**
 * Học viên nộp bài kiểm tra mới từ lớp học
 */
export function submitAssignment({
  courseId,
  courseTitle,
  category,
  instructorName,
  instructorEmail,
  lessonId,
  lessonTitle,
  studentName,
  studentEmail,
  type,
  studentNote
}) {
  const current = getStoredSubmissions();
  
  // Kiểm tra xem đã có bài nộp cho bài học này của học viên chưa
  const existingIdx = current.findIndex(
    s => s.courseId === courseId && s.lessonId === lessonId && s.studentEmail === studentEmail
  );

  const newSub = {
    id: existingIdx >= 0 ? current[existingIdx].id : Date.now(),
    category: category || 'IELTS',
    courseId,
    courseTitle,
    instructorName: instructorName || 'Nguyen Van An',
    instructorEmail: instructorEmail || 'nguyenvanan@englishhub.edu.vn',
    studentName: studentName || 'Học viên EnglishHub',
    studentEmail: studentEmail || 'student@englishhub.edu.vn',
    lessonId,
    lessonTitle,
    submittedAt: 'Vừa xong',
    type: type || 'Bài tập tự luận',
    status: 'pending',
    studentNote,
    annotations: [],
    result: null
  };

  let updated;
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = newSub;
  } else {
    updated = [newSub, ...current];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('submission_updated', { detail: newSub }));
  return newSub;
}

/**
 * Giảng viên chấm bài và cập nhật kết quả
 */
export function gradeSubmission(submissionId, result) {
  const current = getStoredSubmissions();
  const updated = current.map(s => {
    if (s.id === submissionId) {
      return {
        ...s,
        status: 'graded',
        annotations: result.annotations || s.annotations || [],
        upgradedSample: result.upgradedSample || s.upgradedSample || '',
        result: {
          ...result,
          gradedAt: new Date().toISOString()
        }
      };
    }
    return s;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('submission_updated', { detail: { id: submissionId, status: 'graded', result } }));
  return updated;
}

/**
 * Tìm bài nộp của học viên cho một bài học cụ thể trong khóa học
 */
export function getSubmissionForLesson(courseId, lessonId, studentEmail) {
  const current = getStoredSubmissions();
  return current.find(
    s => s.courseId === courseId && s.lessonId === lessonId && (!studentEmail || s.studentEmail === studentEmail)
  );
}
