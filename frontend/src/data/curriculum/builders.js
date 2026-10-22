// Các hàm dựng (builder) dùng chung cho toàn bộ giáo trình khóa học.
// Mỗi chương (chapter) gồm: video bài giảng, bài đọc lý thuyết, bài trắc nghiệm
// và LUÔN kết thúc bằng 1 bài tập tự luận do Giảng viên phụ trách chấm điểm.

// Tiêu chí chấm điểm — khớp 1:1 với COURSE_CATEGORIES trong InstructorGrading.jsx
export const GRADING_RUBRICS = {
  IELTS: {
    scale: 'Band 0 – 9.0',
    overallLabel: 'Overall Band',
    criteria: [
      { key: 'ta', label: 'Task Achievement', desc: 'Trả lời đúng và đủ yêu cầu đề bài' },
      { key: 'cc', label: 'Coherence & Cohesion', desc: 'Bố cục mạch lạc, liên kết ý chặt chẽ' },
      { key: 'lr', label: 'Lexical Resource', desc: 'Vốn từ đa dạng, dùng collocation chính xác' },
      { key: 'gra', label: 'Grammar (GRA)', desc: 'Cấu trúc câu phong phú, ít lỗi ngữ pháp' },
    ],
  },
  TOEIC: {
    scale: 'Tổng 0 – 990',
    overallLabel: 'Tổng điểm (/990)',
    criteria: [
      { key: 'listening', label: 'Listening (/495)', desc: 'Khả năng nghe hiểu hội thoại công sở' },
      { key: 'reading', label: 'Reading (/495)', desc: 'Khả năng đọc hiểu văn bản thương mại' },
      { key: 'grammar', label: 'Ngữ pháp Part 5-6 (%)', desc: 'Độ chính xác ngữ pháp & từ loại' },
      { key: 'reading7', label: 'Đọc hiểu Part 7 (%)', desc: 'Suy luận & tìm thông tin chi tiết' },
    ],
  },
  GIAOTIEP: {
    scale: 'Thang 10',
    overallLabel: 'Tổng điểm (/10)',
    criteria: [
      { key: 'grammar', label: 'Ngữ pháp', desc: 'Câu đúng ngữ pháp, rõ nghĩa' },
      { key: 'vocab', label: 'Từ vựng', desc: 'Dùng từ phù hợp ngữ cảnh' },
      { key: 'context', label: 'Ứng dụng ngữ cảnh', desc: 'Giải quyết đúng tình huống giao tiếp' },
      { key: 'naturalness', label: 'Độ tự nhiên', desc: 'Văn phong tự nhiên như người bản xứ' },
    ],
  },
};

/** Video bài giảng */
export const video = (id, title, duration, youtubeId, opts = {}) => ({
  id,
  type: 'video',
  title,
  duration,
  youtubeId,
  overview: opts.overview || '',
  keyPoints: opts.keyPoints || [],
  vocabulary: opts.vocabulary || [], // [[word, ipa, nghĩa]]
  resources: opts.resources || [],
});

/** Bài đọc lý thuyết dài — sections: [{ heading, body, bullets, examples: [[en, vi]], tip }] */
export const reading = (id, title, duration, opts = {}) => ({
  id,
  type: 'reading',
  title,
  duration,
  overview: opts.overview || '',
  sections: opts.sections || [],
  resources: opts.resources || [],
});

/** Bài trắc nghiệm — questions: [[câu hỏi, [lựa chọn], chỉ số đáp án đúng, giải thích]] */
export const quiz = (id, title, duration, questions, opts = {}) => ({
  id,
  type: 'quiz',
  title,
  duration,
  passScore: opts.passScore || 70,
  overview: opts.overview || 'Kiểm tra nhanh kiến thức trọng tâm của chương.',
  quizQuestions: questions.map(([question, options, correctAnswer, explanation]) => ({
    question,
    options,
    correctAnswer,
    explanation,
  })),
});

/** Bài tập tự luận nộp cho Giảng viên chấm (cuối mỗi chương) */
export const assignment = (id, title, duration, opts = {}) => ({
  id,
  type: 'assignment',
  graded: true,
  title,
  duration,
  minWords: opts.minWords || 80,
  assignmentType: opts.assignmentType || 'Bài tập tự luận',
  assignmentPrompt: opts.prompt || '',
  requirements: opts.requirements || [],
  overview: opts.overview || 'Bài tập cuối chương — nộp trực tiếp cho Giảng viên phụ trách chấm điểm và nhận xét chi tiết.',
});

/** Chương học */
export const chapter = (id, title, description, lessons) => ({ id, title, description, lessons });
