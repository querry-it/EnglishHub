import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Check, Plus, Trash2, Video, FileText, HelpCircle, Award,
  Sparkles, Layers, Clock, Shield, CheckCircle2, AlertCircle, Eye,
  Save, UploadCloud, ChevronRight, ChevronDown, ChevronUp, DollarSign,
  User, BookOpen, Star, HelpCircle as QuestionIcon, ExternalLink, RefreshCw
} from 'lucide-react';
import api from '../../api/axios';
import { saveCustomCourse } from '../../api/courseService';
import { GRADING_RUBRICS } from '../../data/curriculum/builders';

const DEFAULT_INSTRUCTORS = [
  { 
    id: 'inst-1', 
    fullName: 'Nguyen Van An', 
    email: 'nguyenvanan@englishhub.edu.vn', 
    roleTitle: 'Giảng viên IELTS Lead (IELTS 8.5)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    specialties: ['IELTS Writing', 'Academic Speaking', 'Band 7.5+ Mentoring']
  },
  { 
    id: 'inst-2', 
    fullName: 'Tran Thi Bich', 
    email: 'tranthibich@englishhub.edu.vn', 
    roleTitle: 'Giảng viên TOEIC Master (990/990)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    specialties: ['TOEIC Listening & Reading', 'Business Grammar', 'Part 7 Fast Reading']
  },
  { 
    id: 'inst-3', 
    fullName: 'Le Hoang Nam', 
    email: 'lehoangnam@englishhub.edu.vn', 
    roleTitle: 'Giảng viên Giao tiếp Quốc tế',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    specialties: ['Pronunciation IPA', 'Fluency Reflex', 'Daily Conversations']
  },
  { 
    id: 'inst-4', 
    fullName: 'Dang Quoc Bao', 
    email: 'dangquocbao@englishhub.edu.vn', 
    roleTitle: 'Giảng viên Tiếng Anh Doanh Nghiệp',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    specialties: ['Email Writing', 'Pitching & Presentation', 'Contract Negotiation']
  },
];

const PRESET_THUMBNAILS = [
  { url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800', label: 'Học thuật & IELTS' },
  { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', label: 'Bứt phá chứng chỉ' },
  { url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800', label: 'Sách vở & Tài liệu' },
  { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', label: 'Thảo luận nhóm' },
  { url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800', label: 'Giao tiếp doanh nghiệp' },
];

function extractYoutubeId(input) {
  if (!input) return '';
  const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : input.trim();
}

export default function AdminCreateCoursePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);
  const [instructors, setInstructors] = useState(DEFAULT_INSTRUCTORS);
  const [publishing, setPublishing] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'IELTS',
    level: 'Beginner (A2 - B1)',
    provider: 'Cambridge English Assessment Partner',
    providerLogo: '🎓',
    type: 'Professional Certificate',
    price: 490000,
    originalPrice: 990000,
    duration: '3 tháng · 4-6 giờ/tuần',
    schedule: 'Học online linh hoạt 100% · Có chấm bài 1-1',
    badge: 'Khóa học mới',
    thumbnail: PRESET_THUMBNAILS[0].url,
    description: '',
    skillsGained: ['IELTS Academic Skills', 'Academic Writing Task 1', 'Grammar in Context', 'Pronunciation IPA'],
    newSkillInput: '',
    
    // Giảng viên & Chấm điểm
    instructorId: 'inst-1',
    rubricType: 'IELTS', // 'IELTS' | 'TOEIC' | 'GIAOTIEP'
    gradingTurnaround: '24 - 48 giờ',
    maxSubmissions: 3,

    // Lộ trình & Chương
    modules: [
      {
        id: 'mod-1',
        title: 'Chương 1: Xây dựng nền tảng ngữ pháp & Từ vựng học thuật',
        description: 'Làm quen với các cấu trúc trọng tâm, cách ghi nhớ từ vựng và phương pháp học bài bản.',
        lessons: [
          {
            id: 'les-1-1',
            type: 'video',
            title: '1.1 Tổng quan định hướng khóa học & Chiến thuật học tập hiệu quả',
            duration: '15 phút',
            youtubeId: '2r7kEF70Afs',
            overview: 'Giới thiệu cấu trúc khóa học, phương pháp phân bổ thời gian và hướng dẫn tận dụng phản hồi từ giảng viên.',
          },
          {
            id: 'les-1-2',
            type: 'reading',
            title: '1.2 Tài liệu lý thuyết: Cẩm nang cấu trúc ngữ pháp & Collocations trọng tâm',
            duration: '20 phút',
            overview: 'Tổng hợp các quy tắc ngữ pháp cốt lõi, bảng tra cứu từ vựng và các lỗi thường gặp của học viên Việt Nam.',
          },
          {
            id: 'les-1-3',
            type: 'quiz',
            title: '1.3 Trắc nghiệm ôn tập nhanh kiến thức Chương 1',
            duration: '10 phút',
            passScore: 75,
            overview: 'Bài kiểm tra gồm 5 câu hỏi nhanh để kiểm tra mức độ nắm bắt bài giảng.',
            questions: [
              {
                question: 'Trong tiếng Anh học thuật, thì nào thường được sử dụng nhiều nhất để miêu tả xu hướng biểu đồ?',
                options: ['Quá khứ đơn (Past Simple)', 'Hiện tại tiếp diễn (Present Continuous)', 'Tương lai gần (Be going to)', 'Quá khứ hoàn thành tiếp diễn'],
                correctAnswer: 0,
                explanation: 'Past Simple là thì phổ biến nhất để báo cáo số liệu và xu hướng đã xảy ra trong quá khứ.'
              }
            ]
          },
          {
            id: 'les-1-4',
            type: 'assignment',
            title: '1.4 Bài tập tự luận cuối chương: Viết đoạn văn miêu tả xu hướng (Giảng viên chấm 1-1)',
            duration: '30 phút',
            assignmentType: 'Writing Assessment',
            assignmentPrompt: 'Hãy viết một đoạn văn từ 120 đến 150 từ bằng tiếng Anh miêu tả sự thay đổi của một thói quen hoặc xu hướng học tập hiện nay. Áp dụng ít nhất 3 từ vựng học thuật và 2 cấu trúc phức hợp đã học trong Chương 1.',
            minWords: 100,
            overview: 'Bài tập bắt buộc cuối chương. Sau khi nộp, Giảng viên phụ trách sẽ chấm điểm trực tiếp theo thang rubric và gửi nhận xét sửa lỗi chi tiết trong vòng 24-48 giờ.'
          }
        ]
      }
    ]
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Tải danh sách giảng viên từ backend nếu có
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await api.get('/admin/users', { params: { role: 'INSTRUCTOR' } });
        if (res.data.success && Array.isArray(res.data.users) && res.data.users.length > 0) {
          const mapped = res.data.users.map((u, idx) => ({
            id: u.id || `inst-${idx + 1}`,
            fullName: u.fullName || u.name || 'Giảng viên',
            email: u.email || 'instructor@englishhub.edu.vn',
            roleTitle: u.roleTitle || 'Giảng viên Chuyên môn',
            avatar: u.avatar || DEFAULT_INSTRUCTORS[idx % DEFAULT_INSTRUCTORS.length].avatar,
            specialties: ['Đào tạo chuẩn quốc tế', 'Chấm bài chi tiết']
          }));
          setInstructors(mapped);
        }
      } catch (err) {
        // Fallback to DEFAULT_INSTRUCTORS
      }
    };
    fetchInstructors();
  }, []);

  // Đổi giảng viên -> tự động gợi ý rubric phù hợp
  const handleInstructorChange = (instId) => {
    setFormData(prev => {
      let suggestedRubric = prev.rubricType;
      if (prev.category === 'IELTS') suggestedRubric = 'IELTS';
      else if (prev.category === 'TOEIC') suggestedRubric = 'TOEIC';
      else suggestedRubric = 'GIAOTIEP';
      return { ...prev, instructorId: instId, rubricType: suggestedRubric };
    });
  };

  // Thêm Kỹ năng (Skill pill)
  const handleAddSkill = () => {
    if (!formData.newSkillInput.trim()) return;
    if (formData.skillsGained.includes(formData.newSkillInput.trim())) return;
    setFormData(prev => ({
      ...prev,
      skillsGained: [...prev.skillsGained, prev.newSkillInput.trim()],
      newSkillInput: ''
    }));
  };

  const handleRemoveSkill = (skillIndex) => {
    setFormData(prev => ({
      ...prev,
      skillsGained: prev.skillsGained.filter((_, idx) => idx !== skillIndex)
    }));
  };

  // Thao tác Chương (Modules)
  const handleAddModule = () => {
    const newModId = `mod-${Date.now()}`;
    const nextIndex = formData.modules.length + 1;
    const newModule = {
      id: newModId,
      title: `Chương ${nextIndex}: Mở rộng kiến thức & Ứng dụng thực hành`,
      description: 'Cung cấp bài giảng chuyên sâu kết hợp bài tập rèn luyện kỹ năng thực chiến.',
      lessons: [
        {
          id: `les-${newModId}-1`,
          type: 'video',
          title: `${nextIndex}.1 Bài giảng Video chuyên sâu`,
          duration: '20 phút',
          youtubeId: 'qhxzCiwX11o',
          overview: 'Phân tích tình huống mẫu và chiến thuật giải đề hiệu quả.',
        },
        {
          id: `les-${newModId}-2`,
          type: 'assignment',
          title: `${nextIndex}.2 Bài tập thực hành tự luận cuối chương (Giảng viên chấm 1-1)`,
          duration: '30 phút',
          assignmentType: 'Writing Assessment',
          assignmentPrompt: `Nộp bài làm tự luận cho Chương ${nextIndex} để Giảng viên phụ trách chấm điểm và nhận xét chi tiết.`,
          minWords: 100,
          overview: 'Nộp bài trực tiếp lên hệ thống để nhận thang điểm và lời khuyên phát triển.'
        }
      ]
    };
    setFormData(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
    showToast(`Đã thêm Chương ${nextIndex}`);
  };

  const handleRemoveModule = (modIdx) => {
    if (formData.modules.length <= 1) {
      alert('Khóa học bắt buộc phải có ít nhất 1 Chương bài học!');
      return;
    }
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.filter((_, idx) => idx !== modIdx)
    }));
  };

  const handleUpdateModule = (modIdx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.modules];
      updated[modIdx] = { ...updated[modIdx], [field]: value };
      return { ...prev, modules: updated };
    });
  };

  // Thao tác Bài học (Lessons)
  const handleAddLesson = (modIdx, type = 'video') => {
    const mod = formData.modules[modIdx];
    const modNum = modIdx + 1;
    const lesNum = (mod.lessons?.length || 0) + 1;
    const newLesId = `les-${mod.id}-${Date.now()}`;

    let newLesson = {
      id: newLesId,
      type,
      title: `${modNum}.${lesNum} ${type === 'video' ? 'Bài giảng Video' : type === 'reading' ? 'Tài liệu đọc lý thuyết' : type === 'quiz' ? 'Trắc nghiệm củng cố' : 'Bài tập tự luận có chấm điểm'}`,
      duration: type === 'quiz' ? '10 phút' : type === 'assignment' ? '30 phút' : '15 phút',
      overview: 'Tóm tắt nội dung bài học.'
    };

    if (type === 'video') {
      newLesson.youtubeId = '2r7kEF70Afs';
    } else if (type === 'quiz') {
      newLesson.passScore = 75;
      newLesson.questions = [
        {
          question: 'Nội dung câu hỏi trắc nghiệm kiểm tra...',
          options: ['Lựa chọn A', 'Lựa chọn B', 'Lựa chọn C', 'Lựa chọn D'],
          correctAnswer: 0,
          explanation: 'Giải thích lý do đáp án chính xác.'
        }
      ];
    } else if (type === 'assignment') {
      newLesson.assignmentType = 'Writing Assessment';
      newLesson.assignmentPrompt = 'Yêu cầu đề bài tự luận: Sinh viên viết bài làm từ 120-150 từ áp dụng các kiến thức đã học.';
      newLesson.minWords = 100;
    }

    setFormData(prev => {
      const updated = [...prev.modules];
      updated[modIdx].lessons = [...(updated[modIdx].lessons || []), newLesson];
      return { ...prev, modules: updated };
    });
  };

  const handleRemoveLesson = (modIdx, lesIdx) => {
    setFormData(prev => {
      const updated = [...prev.modules];
      updated[modIdx].lessons = updated[modIdx].lessons.filter((_, idx) => idx !== lesIdx);
      return { ...prev, modules: updated };
    });
  };

  const handleUpdateLesson = (modIdx, lesIdx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.modules];
      const lessons = [...updated[modIdx].lessons];
      lessons[lesIdx] = { ...lessons[lesIdx], [field]: value };
      updated[modIdx].lessons = lessons;
      return { ...prev, modules: updated };
    });
  };

  // Tính toán số liệu tổng thể
  const totalLessons = formData.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const totalAssignments = formData.modules.reduce((sum, m) => 
    sum + (m.lessons?.filter(l => l.type === 'assignment')?.length || 0), 0);
  const assignedInstructor = instructors.find(i => i.id === formData.instructorId) || instructors[0];

  // Tính discount %
  const discountPercent = formData.originalPrice > formData.price 
    ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) 
    : 0;

  // Hàm kiểm tra tính hợp lệ của từng bước nhập liệu
  const validateStep = (stepNumber) => {
    const errs = {};
    if (stepNumber === 1) {
      if (!formData.title?.trim()) {
        errs.title = 'Vui lòng nhập tên khóa học chính thức';
      }
      if (!formData.description?.trim()) {
        errs.description = 'Vui lòng nhập mô tả tổng quan khóa học';
      }
      if (!formData.price || Number(formData.price) <= 0) {
        errs.price = 'Vui lòng nhập học phí ưu đãi hợp lệ (> 0 VNĐ)';
      }
      if (!formData.duration?.trim()) {
        errs.duration = 'Vui lòng nhập thời lượng khóa học';
      }
      if (!formData.thumbnail?.trim()) {
        errs.thumbnail = 'Vui lòng chọn ảnh bìa hoặc dán URL ảnh';
      }
      if (!formData.skillsGained || formData.skillsGained.length === 0) {
        errs.skills = 'Vui lòng thêm ít nhất 1 kỹ năng đạt được sau khóa học';
      }
    } else if (stepNumber === 2) {
      if (!formData.instructorId) {
        errs.instructorId = 'Vui lòng chọn giảng viên phụ trách chuyên môn';
      }
      if (!formData.rubricType) {
        errs.rubricType = 'Vui lòng chọn khung tiêu chí chấm điểm (Rubric)';
      }
      if (!formData.gradingTurnaround?.trim()) {
        errs.gradingTurnaround = 'Vui lòng chọn cam kết thời gian trả kết quả';
      }
    } else if (stepNumber === 3) {
      if (!formData.modules || formData.modules.length === 0) {
        errs.modules = 'Khóa học bắt buộc phải có ít nhất 1 Chương bài học!';
      } else {
        formData.modules.forEach((mod, mIdx) => {
          if (!mod.title?.trim()) {
            errs[`mod_title_${mIdx}`] = `Chương ${mIdx + 1} chưa có tiêu đề!`;
          }
          if (!mod.lessons || mod.lessons.length === 0) {
            errs[`mod_lessons_${mIdx}`] = `Chương ${mIdx + 1} phải có ít nhất 1 bài học!`;
          } else {
            mod.lessons.forEach((les, lIdx) => {
              if (!les.title?.trim()) {
                errs[`les_title_${mIdx}_${lIdx}`] = `Bài ${mIdx + 1}.${lIdx + 1} chưa có tiêu đề!`;
              }
              if (!les.duration?.trim()) {
                errs[`les_duration_${mIdx}_${lIdx}`] = `Bài ${mIdx + 1}.${lIdx + 1} chưa có thời lượng!`;
              }
              if (les.type === 'video' && !les.youtubeId?.trim()) {
                errs[`les_video_${mIdx}_${lIdx}`] = `Bài ${mIdx + 1}.${lIdx + 1} (Video) yêu cầu phải có YouTube Video ID hoặc link!`;
              }
              if (les.type === 'assignment' && !les.assignmentPrompt?.trim()) {
                errs[`les_assignment_${mIdx}_${lIdx}`] = `Bài ${mIdx + 1}.${lIdx + 1} (Bài tập) chưa có đề bài tự luận!`;
              }
              if (les.type === 'reading' && !les.overview?.trim()) {
                errs[`les_reading_${mIdx}_${lIdx}`] = `Bài ${mIdx + 1}.${lIdx + 1} (Tài liệu đọc) cần có nội dung tóm tắt!`;
              }
            });
          }
        });
      }
    }
    return errs;
  };

  // Điều hướng chuyển bước có kiểm tra dữ liệu
  const goToStep = (targetStep) => {
    if (targetStep > currentStep) {
      for (let s = 1; s < targetStep; s++) {
        const stepErrs = validateStep(s);
        if (Object.keys(stepErrs).length > 0) {
          setFormErrors(stepErrs);
          setCurrentStep(s);
          const firstErrMsg = Object.values(stepErrs)[0];
          showToast(`⚠️ Không thể chuyển bước! ${firstErrMsg}`);
          return false;
        }
      }
    }
    setFormErrors({});
    setCurrentStep(targetStep);
    return true;
  };

  // Xử lý Lưu Nháp
  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    showToast('Đã lưu bản nháp khóa học thành công!');
  };

  // Xử lý Xuất bản khóa học chính thức (Publish Course)
  const handlePublishCourse = async () => {
    // Kiểm tra toàn bộ 3 bước trước khi xuất bản
    for (let s = 1; s <= 3; s++) {
      const stepErrs = validateStep(s);
      if (Object.keys(stepErrs).length > 0) {
        setFormErrors(stepErrs);
        setCurrentStep(s);
        const firstErrMsg = Object.values(stepErrs)[0];
        showToast(`⚠️ Vui lòng hoàn thành đầy đủ thông tin: ${firstErrMsg}`);
        return;
      }
    }

    setPublishing(true);

    const generatedId = `course-custom-${Date.now()}`;
    const slug = formData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newCourseObj = {
      id: generatedId,
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim() || formData.title.trim(),
      slug: slug || generatedId,
      provider: formData.provider || 'EnglishHub Academy Partner',
      providerLogo: formData.providerLogo || '🎓',
      type: formData.type || 'Specialization Course',
      category: formData.category,
      level: formData.level,
      instructor: {
        id: assignedInstructor.id,
        name: assignedInstructor.fullName || assignedInstructor.name,
        fullName: assignedInstructor.fullName || assignedInstructor.name,
        email: assignedInstructor.email,
        title: assignedInstructor.roleTitle || 'Giảng viên Chuyên môn',
        avatar: assignedInstructor.avatar
      },
      instructorEmail: assignedInstructor.email,
      thumbnail: formData.thumbnail || PRESET_THUMBNAILS[0].url,
      description: formData.description.trim() || 'Khóa học tiếng Anh chuyên nghiệp với lộ trình chuẩn mực, hỗ trợ chấm bài 1-1 từ giảng viên.',
      skillsGained: formData.skillsGained.length > 0 ? formData.skillsGained : ['English Skills', 'Academic Vocabulary'],
      duration: formData.duration || '3 tháng · 4 giờ/tuần',
      schedule: formData.schedule || 'Học online linh hoạt & Có chấm bài 1-1',
      rubricType: formData.rubricType,
      gradingTurnaround: formData.gradingTurnaround,
      modulesCount: formData.modules.length,
      lessonsCount: totalLessons,
      assignmentsCount: totalAssignments,
      studentsCount: 1,
      rating: 5.0,
      reviewsCount: 1,
      price: Number(formData.price) || 0,
      originalPrice: Number(formData.originalPrice) || Number(formData.price) || 0,
      badge: formData.badge || 'Khóa học mới',
      enrolled: true,
      modules: formData.modules
    };

    try {
      // 1. Lưu vào Custom Courses LocalStorage & Dispatch Event
      saveCustomCourse(newCourseObj);

      // 2. Thử đồng bộ lên backend API
      await api.post('/admin/courses', newCourseObj).catch(() => null);

      showToast(`Đăng khóa học "${newCourseObj.title}" thành công!`);
      
      // Chờ toast rồi chuyển hướng
      setTimeout(() => {
        navigate('/admin/courses');
      }, 1200);
    } catch (err) {
      saveCustomCourse(newCourseObj);
      showToast('Đã lưu khóa học thành công vào hệ thống!');
      setTimeout(() => {
        navigate('/admin/courses');
      }, 1200);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 animate-in fade-in duration-300">
      
      {/* Toast thông báo nổi */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-[200] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-700 font-bold text-sm flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* TOP STICKY BAR: QUẢN TRỊ & HÀNH ĐỘNG                                    */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Bên trái: Nút Back + Breadcrumbs + Course Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/courses')}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-colors"
              title="Quay lại danh sách khóa học"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span>Quản trị</span>
                <ChevronRight className="w-3 h-3" />
                <span>Khóa học</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-indigo-600 font-bold">Tạo khóa học mới</span>
              </div>
              <h1 className="text-lg font-black text-slate-900 truncate max-w-md sm:max-w-xl">
                {formData.title || 'Khóa học mới chưa đặt tên'}
              </h1>
            </div>
          </div>

          {/* Bên phải: Trạng thái Draft + Lưu nháp + Nút Xuất bản */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Bản nháp
            </span>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>Lưu nháp</span>
            </button>

            <button
              type="button"
              onClick={() => goToStep(4)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem trước</span>
            </button>

            <button
              type="button"
              disabled={publishing}
              onClick={handlePublishCourse}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
            >
              {publishing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <UploadCloud className="w-4 h-4 stroke-[2.5]" />
              )}
              <span>{publishing ? 'Đang xuất bản...' : 'Xuất bản khóa học'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* STEPPER PROGRESS INDICATOR (4 BƯỚC HOÀN CHỈNH)                         */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: 1, title: 'Thông tin & Học phí', desc: 'Tên, cấp độ, học phí, ảnh bìa' },
              { num: 2, title: 'Giảng viên & Chấm điểm', desc: 'Chọn GV & Rubric chấm bài' },
              { num: 3, title: 'Lộ trình bài học', desc: `${formData.modules.length} Chương · ${totalLessons} Bài học` },
              { num: 4, title: 'Kiểm duyệt & Đăng tải', desc: 'Audit checklist & Live Preview' },
            ].map(step => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => goToStep(step.num)}
                  className={`flex items-start gap-3 p-3 rounded-xl text-left transition-all border ${
                    isActive 
                      ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20' 
                      : isPast 
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' 
                        : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : isPast 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-100 text-slate-400'
                  }`}>
                    {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-black uppercase tracking-tight truncate ${
                      isActive ? 'text-indigo-900' : isPast ? 'text-slate-800' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* MAIN STEP CONTENT AREA                                                  */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* BƯỚC 1: THÔNG TIN CƠ BẢN, ĐỊNH VỊ & HỌC PHÍ                          */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cột trái: Form thông tin chính */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span>Thông tin cơ bản của khóa học</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Thiết lập tên khóa học, mô tả, danh mục và chứng chỉ tương đương
                  </p>
                </div>

                {/* Tên khóa học */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                    Tên khóa học chính thức <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: IELTS Writing Task 2 Masterclass Band 7.5+ Chuyên Sâu"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (formErrors.title) setFormErrors({ ...formErrors, title: null });
                    }}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none transition-all ${
                      formErrors.title ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600'
                    }`}
                  />
                  {formErrors.title ? (
                    <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.title}
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400 mt-1">
                      Nên đặt tên ngắn gọn, rõ chứng chỉ hoặc kỹ năng mục tiêu (IELTS, TOEIC, Giao tiếp).
                    </p>
                  )}
                </div>

                {/* Tiêu đề phụ */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                    Tiêu đề phụ / Khẩu hiệu (Subtitle)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Làm chủ cấu trúc lập luận logic, nâng cấp vốn từ vựng học thuật C1-C2"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                {/* Hàng: Category + Level + Provider */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Danh mục
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:border-indigo-600"
                    >
                      <option value="IELTS">IELTS</option>
                      <option value="TOEIC">TOEIC</option>
                      <option value="GIAO TIẾP">GIAO TIẾP</option>
                      <option value="DOANH NGHIỆP">DOANH NGHIỆP</option>
                      <option value="NGỮ PHÁP">NGỮ PHÁP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Trình độ học viên
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:border-indigo-600"
                    >
                      <option value="Beginner (A2 - B1)">Beginner (Mới bắt đầu - A2)</option>
                      <option value="Intermediate (B1 - B2)">Intermediate (Trung cấp - B1/B2)</option>
                      <option value="Advanced (B2 - C1)">Advanced (Nâng cao - B2/C1)</option>
                      <option value="All Levels">All Levels (Mọi trình độ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Loại chứng nhận
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:border-indigo-600"
                    >
                      <option value="Professional Certificate">Professional Certificate</option>
                      <option value="Specialization Course">Specialization Course</option>
                      <option value="Guided Project">Guided Project</option>
                      <option value="Master Track">Master Track</option>
                    </select>
                  </div>
                </div>

                {/* Hàng: Đối tác cấp bằng & Nhãn Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Đơn vị cấp bằng / Đối tác
                    </label>
                    <input
                      type="text"
                      value={formData.provider}
                      onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                      placeholder="VD: Cambridge English Assessment Partner"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Nhãn nổi bật (Badge)
                    </label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="VD: Bán chạy nhất, Khóa học mới"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                {/* Mô tả chi tiết */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                    Mô tả tổng quan khóa học (Overview) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      if (formErrors.description) setFormErrors({ ...formErrors, description: null });
                    }}
                    placeholder="Mô tả mục tiêu của khóa học, đối tượng phù hợp và cam kết chuẩn đầu ra..."
                    className={`w-full bg-slate-50 border rounded-xl p-4 text-xs font-medium text-slate-900 focus:outline-none transition-all ${
                      formErrors.description ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 focus:border-indigo-600'
                    }`}
                  />
                  {formErrors.description && (
                    <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.description}
                    </p>
                  )}
                </div>

                {/* Kỹ năng đạt được (Skills Gained) */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                    Kỹ năng đạt được sau khóa học (Skills Gained) <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.skillsGained.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(sIdx)}
                          className="hover:text-rose-600 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Thêm kỹ năng mới (ví dụ: Academic Collocations)..."
                      value={formData.newSkillInput}
                      onChange={(e) => {
                        setFormData({ ...formData, newSkillInput: e.target.value });
                        if (formErrors.skills) setFormErrors({ ...formErrors, skills: null });
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                      className={`flex-1 bg-slate-50 border rounded-xl px-3 py-2 text-xs font-medium text-slate-900 ${
                        formErrors.skills ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
                    >
                      Thêm
                    </button>
                  </div>
                  {formErrors.skills && (
                    <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.skills}
                    </p>
                  )}
                </div>

              </div>

              {/* Khối Học phí & Thời lượng */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    <span>Học phí niêm yết & Thời lượng học</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Cấu hình chính sách giá bán ưu đãi và thời lượng phân bổ chương trình
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Học phí ưu đãi (VNĐ) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="10000"
                        value={formData.price}
                        onChange={(e) => {
                          setFormData({ ...formData, price: Number(e.target.value) });
                          if (formErrors.price) setFormErrors({ ...formErrors, price: null });
                        }}
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-sm font-black text-slate-900 ${
                          formErrors.price ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200'
                        }`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        VNĐ
                      </span>
                    </div>
                    {formErrors.price && (
                      <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Học phí gốc niêm yết (VNĐ)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="10000"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 line-through"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        VNĐ
                      </span>
                    </div>
                  </div>
                </div>

                {discountPercent > 0 && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Giảm giá {discountPercent}% so với học phí gốc niêm yết.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Thời lượng khóa học <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => {
                        setFormData({ ...formData, duration: e.target.value });
                        if (formErrors.duration) setFormErrors({ ...formErrors, duration: null });
                      }}
                      placeholder="VD: 3 tháng · 4-6 giờ/tuần"
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 ${
                        formErrors.duration ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.duration && (
                      <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.duration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Lịch học & Cam kết
                    </label>
                    <input
                      type="text"
                      value={formData.schedule}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                      placeholder="VD: Học online linh hoạt 100% · Có chấm bài 1-1"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Cột phải: Thumbnail & Ảnh bìa khóa học */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  Ảnh bìa khóa học (Thumbnail)
                </h3>

                {/* Preview Thumbnail */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = PRESET_THUMBNAILS[0].url;
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                    Xem trước ảnh bìa
                  </div>
                </div>

                {/* Nhập URL tùy chỉnh */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Dán URL ảnh bìa tùy chỉnh <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.thumbnail}
                    onChange={(e) => {
                      setFormData({ ...formData, thumbnail: e.target.value });
                      if (formErrors.thumbnail) setFormErrors({ ...formErrors, thumbnail: null });
                    }}
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none ${
                      formErrors.thumbnail ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 focus:border-indigo-600'
                    }`}
                  />
                  {formErrors.thumbnail && (
                    <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.thumbnail}
                    </p>
                  )}
                </div>

                {/* Thư viện Preset Thumbnails */}
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-2">
                    Hoặc chọn nhanh từ thư viện có sẵn:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_THUMBNAILS.map((thumb, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, thumbnail: thumb.url })}
                        className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all text-left ${
                          formData.thumbnail === thumb.url 
                            ? 'border-indigo-600 ring-2 ring-indigo-500/20' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img src={thumb.url} alt={thumb.label} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-slate-900/80 text-[9px] font-bold text-white rounded">
                          {thumb.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Next Step Button */}
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Tiếp tục: Phân công Giảng viên</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* BƯỚC 2: PHÂN CÔNG GIẢNG VIÊN & THANG ĐIỂM CHẤM BÀI RUBRIC            */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cột trái: Chọn giảng viên */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    <span>Chỉ định Giảng viên phụ trách chuyên môn</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Giảng viên được chọn sẽ chịu trách nhiệm đồng hành, duyệt bài tập tự luận và chấm điểm trực tiếp 1-1 cho học viên.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {instructors.map(inst => {
                    const isSelected = formData.instructorId === inst.id;
                    return (
                      <div
                        key={inst.id}
                        onClick={() => handleInstructorChange(inst.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={inst.avatar}
                            alt={inst.fullName}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-sm font-black text-slate-900 truncate">
                                {inst.fullName}
                              </h4>
                              {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                            </div>
                            <p className="text-xs font-bold text-indigo-600 truncate mt-0.5">
                              {inst.roleTitle}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {inst.email}
                            </p>
                          </div>
                        </div>

                        {inst.specialties && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                            {inst.specialties.map((spec, sIdx) => (
                              <span key={sIdx} className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                                {spec}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Thiết lập Quy định nộp & Chấm bài */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <span>Cam kết thời gian trả kết quả & Quy chế nộp bài</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Quy định SLA phản hồi bài tập giúp học viên an tâm và theo dõi tiến độ
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Cam kết trả bài chấm (SLA)
                    </label>
                    <select
                      value={formData.gradingTurnaround}
                      onChange={(e) => setFormData({ ...formData, gradingTurnaround: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900"
                    >
                      <option value="Trong vòng 24 giờ">Trong vòng 24 giờ (Hỏa tốc)</option>
                      <option value="24 - 48 giờ">24 – 48 giờ (Tiêu chuẩn)</option>
                      <option value="Tối đa 72 giờ">Tối đa 72 giờ (Cuối tuần)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                      Số lần nộp lại tối đa mỗi bài
                    </label>
                    <select
                      value={formData.maxSubmissions}
                      onChange={(e) => setFormData({ ...formData, maxSubmissions: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900"
                    >
                      <option value={1}>1 lần (Không sửa bài)</option>
                      <option value={2}>2 lần (Cho phép sửa 1 lần)</option>
                      <option value={3}>3 lần (Khuyên dùng cho viết học thuật)</option>
                      <option value={5}>5 lần (Không giới hạn học tập)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Rubric Preview */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>Thang điểm chấm bài (Rubric)</span>
                </h3>

                {/* Chọn Rubric */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Chọn chuẩn khung năng lực
                  </label>
                  <select
                    value={formData.rubricType}
                    onChange={(e) => setFormData({ ...formData, rubricType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    <option value="IELTS">IELTS Writing & Speaking (Band 0 – 9.0)</option>
                    <option value="TOEIC">TOEIC Writing & Reading (Tổng 990)</option>
                    <option value="GIAOTIEP">Giao tiếp phản xạ & Ứng dụng (Thang 10)</option>
                  </select>
                </div>

                {/* Preview 4 Tiêu chí Rubric */}
                {GRADING_RUBRICS[formData.rubricType] && (
                  <div className="space-y-2.5 pt-2">
                    <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between text-xs font-bold text-indigo-900">
                      <span>Thang đánh giá:</span>
                      <span className="font-black">{GRADING_RUBRICS[formData.rubricType].scale}</span>
                    </div>

                    <div className="space-y-2">
                      {GRADING_RUBRICS[formData.rubricType].criteria.map((crit, cIdx) => (
                        <div key={crit.key || cIdx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-left">
                          <p className="text-xs font-black text-slate-800">
                            {cIdx + 1}. {crit.label}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {crit.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase"
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="flex-[2] py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
                >
                  <span>Xây dựng Lộ trình</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* BƯỚC 3: THIẾT KẾ LỘ TRÌNH CHƯƠNG & BÀI HỌC (CURRICULUM BUILDER)       */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {currentStep === 3 && (
          <div className="space-y-6">
            
            {/* Thanh công cụ Curriculum Header */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <span>Thiết kế Lộ trình học & Bài tập tự luận</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Mỗi khóa học gồm nhiều Chương (Modules). Trong mỗi chương, bạn có thể thêm Video bài giảng, Tài liệu đọc, Trắc nghiệm và Bài tập nộp cho Giảng viên chấm.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleAddModule}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Chương mới</span>
                </button>
              </div>
            </div>

            {/* Danh sách các Chương (Modules) */}
            <div className="space-y-6">
              {formData.modules.map((module, mIdx) => (
                <div
                  key={module.id || mIdx}
                  className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs space-y-4"
                >
                  {/* Module Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-black shrink-0">
                        {mIdx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => {
                            handleUpdateModule(mIdx, 'title', e.target.value);
                            if (formErrors[`mod_title_${mIdx}`]) {
                              setFormErrors({ ...formErrors, [`mod_title_${mIdx}`]: null });
                            }
                          }}
                          placeholder="Tên chương học..."
                          className={`w-full text-base font-black text-slate-900 bg-transparent border-b hover:border-slate-300 focus:bg-slate-50 rounded px-1 py-0.5 outline-none transition-colors ${
                            formErrors[`mod_title_${mIdx}`] ? 'border-rose-500 text-rose-700' : 'border-transparent focus:border-indigo-600'
                          }`}
                        />
                        {formErrors[`mod_title_${mIdx}`] && (
                          <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors[`mod_title_${mIdx}`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-xs font-bold text-slate-400">
                        {module.lessons?.length || 0} bài học
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveModule(mIdx)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Xóa chương này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {formErrors[`mod_lessons_${mIdx}`] && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{formErrors[`mod_lessons_${mIdx}`]}</span>
                    </div>
                  )}

                  {/* Module Description */}
                  <div>
                    <input
                      type="text"
                      value={module.description || ''}
                      onChange={(e) => handleUpdateModule(mIdx, 'description', e.target.value)}
                      placeholder="Tóm tắt mục tiêu và nội dung của chương học..."
                      className="w-full text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-600"
                    />
                  </div>

                  {/* Danh sách bài học trong Module */}
                  <div className="space-y-3 pt-2">
                    {module.lessons?.map((lesson, lIdx) => (
                      <div
                        key={lesson.id || lIdx}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {/* Icon loại bài học */}
                            {lesson.type === 'video' && (
                              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0" title="Video bài giảng">
                                <Video className="w-4 h-4" />
                              </span>
                            )}
                            {lesson.type === 'reading' && (
                              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0" title="Tài liệu đọc lý thuyết">
                                <FileText className="w-4 h-4" />
                              </span>
                            )}
                            {lesson.type === 'quiz' && (
                              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700 shrink-0" title="Trắc nghiệm ôn tập">
                                <HelpCircle className="w-4 h-4" />
                              </span>
                            )}
                            {lesson.type === 'assignment' && (
                              <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700 shrink-0" title="Bài tập Giảng viên chấm">
                                <Award className="w-4 h-4" />
                              </span>
                            )}

                            {/* Tiêu đề bài học */}
                            <div className="flex-1">
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => {
                                  handleUpdateLesson(mIdx, lIdx, 'title', e.target.value);
                                  if (formErrors[`les_title_${mIdx}_${lIdx}`]) {
                                    setFormErrors({ ...formErrors, [`les_title_${mIdx}_${lIdx}`]: null });
                                  }
                                }}
                                className={`w-full text-xs font-bold text-slate-800 bg-white border rounded-lg px-2.5 py-1.5 outline-none transition-all ${
                                  formErrors[`les_title_${mIdx}_${lIdx}`] ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:border-indigo-600'
                                }`}
                                placeholder="Tiêu đề bài học..."
                              />
                              {formErrors[`les_title_${mIdx}_${lIdx}`] && (
                                <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {formErrors[`les_title_${mIdx}_${lIdx}`]}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Thời lượng */}
                            <div className="w-28">
                              <input
                                type="text"
                                value={lesson.duration}
                                onChange={(e) => {
                                  handleUpdateLesson(mIdx, lIdx, 'duration', e.target.value);
                                  if (formErrors[`les_duration_${mIdx}_${lIdx}`]) {
                                    setFormErrors({ ...formErrors, [`les_duration_${mIdx}_${lIdx}`]: null });
                                  }
                                }}
                                className={`w-full text-center text-xs font-bold text-slate-600 bg-white border rounded-lg px-2 py-1.5 ${
                                  formErrors[`les_duration_${mIdx}_${lIdx}`] ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200'
                                }`}
                                placeholder="15 phút"
                              />
                            </div>

                            {/* Nút xóa bài học */}
                            <button
                              type="button"
                              onClick={() => handleRemoveLesson(mIdx, lIdx)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Xóa bài học"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Chi tiết phụ thuộc loại bài học */}
                        {lesson.type === 'video' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                                YouTube Video ID hoặc Link xem <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={lesson.youtubeId || ''}
                                onChange={(e) => {
                                  handleUpdateLesson(mIdx, lIdx, 'youtubeId', extractYoutubeId(e.target.value));
                                  if (formErrors[`les_video_${mIdx}_${lIdx}`]) {
                                    setFormErrors({ ...formErrors, [`les_video_${mIdx}_${lIdx}`]: null });
                                  }
                                }}
                                placeholder="VD: 2r7kEF70Afs hoặc https://youtube.com/watch?v=..."
                                className={`w-full text-xs font-mono bg-white border rounded-lg px-2.5 py-1.5 text-slate-700 ${
                                  formErrors[`les_video_${mIdx}_${lIdx}`] ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200'
                                }`}
                              />
                              {formErrors[`les_video_${mIdx}_${lIdx}`] && (
                                <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {formErrors[`les_video_${mIdx}_${lIdx}`]}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                                Tóm tắt bài giảng
                              </label>
                              <input
                                type="text"
                                value={lesson.overview || ''}
                                onChange={(e) => handleUpdateLesson(mIdx, lIdx, 'overview', e.target.value)}
                                placeholder="Trọng tâm bài giảng..."
                                className="w-full text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700"
                              />
                            </div>
                          </div>
                        )}

                        {lesson.type === 'assignment' && (
                          <div className="space-y-2 pt-1 bg-white p-3 rounded-xl border border-rose-100">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-black uppercase text-rose-600 flex items-center gap-1">
                                <Award className="w-3.5 h-3.5" />
                                <span>Bài tập nộp cho Giảng viên chấm điểm 1-1</span>
                              </span>
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                                <span>Tối thiểu từ:</span>
                                <input
                                  type="number"
                                  min="50"
                                  step="10"
                                  value={lesson.minWords || 100}
                                  onChange={(e) => handleUpdateLesson(mIdx, lIdx, 'minWords', Number(e.target.value))}
                                  className="w-16 text-center bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold"
                                />
                                <span>từ</span>
                              </div>
                            </div>
                            <textarea
                              rows={2}
                              value={lesson.assignmentPrompt || ''}
                              onChange={(e) => {
                                handleUpdateLesson(mIdx, lIdx, 'assignmentPrompt', e.target.value);
                                if (formErrors[`les_assignment_${mIdx}_${lIdx}`]) {
                                  setFormErrors({ ...formErrors, [`les_assignment_${mIdx}_${lIdx}`]: null });
                                }
                              }}
                              placeholder="Nhập đề bài tự luận yêu cầu sinh viên hoàn thành..."
                              className={`w-full text-xs bg-slate-50 border rounded-lg p-2 font-medium text-slate-800 ${
                                formErrors[`les_assignment_${mIdx}_${lIdx}`] ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200'
                              }`}
                            />
                            {formErrors[`les_assignment_${mIdx}_${lIdx}`] && (
                              <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {formErrors[`les_assignment_${mIdx}_${lIdx}`]}
                              </p>
                            )}
                          </div>
                        )}

                        {lesson.type === 'reading' && (
                          <div>
                            <input
                              type="text"
                              value={lesson.overview || ''}
                              onChange={(e) => handleUpdateLesson(mIdx, lIdx, 'overview', e.target.value)}
                              placeholder="Tóm tắt nội dung lý thuyết sinh viên cần đọc..."
                              className="w-full text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700"
                            />
                          </div>
                        )}

                        {lesson.type === 'quiz' && (
                          <div className="space-y-2 bg-white p-3 rounded-xl border border-amber-200">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-black uppercase text-amber-600 flex items-center gap-1">
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>Trắc nghiệm ôn tập cuối bài</span>
                              </span>
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                                <span>Điểm qua môn:</span>
                                <input
                                  type="number"
                                  min="50"
                                  max="100"
                                  value={lesson.passScore || 75}
                                  onChange={(e) => handleUpdateLesson(mIdx, lIdx, 'passScore', Number(e.target.value))}
                                  className="w-16 text-center bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold"
                                />
                                <span>%</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Nút thêm các loại bài học vào Module */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 mr-1">
                      + Thêm bài học vào Chương {mIdx + 1}:
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAddLesson(mIdx, 'video')}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-200"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Video bài giảng</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddLesson(mIdx, 'reading')}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-200"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Tài liệu đọc</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddLesson(mIdx, 'quiz')}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-amber-200"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Trắc nghiệm</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddLesson(mIdx, 'assignment')}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-200"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Bài tập Giảng viên chấm</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase"
              >
                Quay lại Bước 2
              </button>

              <button
                type="button"
                onClick={() => goToStep(4)}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase flex items-center gap-2 shadow-md shadow-indigo-600/20"
              >
                <span>Xem trước & Kiểm duyệt</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* BƯỚC 4: KIỂM DUYỆT (AUDIT) & XUẤT BẢN KHÓA HỌC                        */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {currentStep === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cột trái: Pre-flight Audit Checklist */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-600" />
                    <span>Bảng kiểm duyệt tiêu chuẩn chất lượng (Course Audit)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Hệ thống tự động kiểm tra các chỉ số để đảm bảo khóa học sẵn sàng phục vụ học viên
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      label: 'Tiêu đề & Thông tin cơ bản',
                      valid: !!formData.title.trim(),
                      desc: formData.title || 'Chưa nhập tên khóa học'
                    },
                    {
                      label: 'Giảng viên phụ trách chuyên môn',
                      valid: !!assignedInstructor,
                      desc: `${assignedInstructor.fullName} (${assignedInstructor.roleTitle})`
                    },
                    {
                      label: 'Thang điểm chấm bài (Rubric)',
                      valid: !!formData.rubricType,
                      desc: `Khung năng lực ${formData.rubricType} · SLA trả bài: ${formData.gradingTurnaround}`
                    },
                    {
                      label: 'Lộ trình giáo trình đầy đủ',
                      valid: formData.modules.length > 0 && totalLessons > 0,
                      desc: `${formData.modules.length} Chương · Tổng số ${totalLessons} Bài học`
                    },
                    {
                      label: 'Bài tập tự luận có Giảng viên chấm 1-1',
                      valid: totalAssignments > 0,
                      desc: `${totalAssignments} bài tập tự luận được tích hợp trong giáo trình`
                    },
                    {
                      label: 'Chính sách học phí minh bạch',
                      valid: formData.price > 0,
                      desc: `${formData.price.toLocaleString('vi-VN')} đ (Giá gốc: ${formData.originalPrice.toLocaleString('vi-VN')} đ)`
                    }
                  ].map((check, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                        check.valid ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        check.valid ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                      }`}>
                        {check.valid ? <Check className="w-4 h-4 stroke-[3]" /> : <AlertCircle className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900">
                          {check.label}
                        </p>
                        <p className={`text-xs mt-0.5 ${check.valid ? 'text-emerald-700' : 'text-rose-700 font-bold'}`}>
                          {check.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Tóm tắt nội dung giáo trình rút gọn */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  Tóm tắt cấu trúc giáo trình ({formData.modules.length} Chương)
                </h3>

                <div className="space-y-3">
                  {formData.modules.map((mod, mIdx) => (
                    <div key={mod.id || mIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-xs font-black text-indigo-700">
                        {mod.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {mod.lessons?.length || 0} bài học (
                        {mod.lessons?.filter(l => l.type === 'video').length || 0} Video,{' '}
                        {mod.lessons?.filter(l => l.type === 'assignment').length || 0} Bài tập chấm)
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Cột phải: Live Preview Card (Coursera Student Preview) */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-600" />
                  <span>Xem trước thẻ khóa học (Student View)</span>
                </h3>

                {/* Coursera-style Preview Card */}
                <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between">
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white rounded-lg text-[9px] font-black uppercase">
                          {formData.category}
                        </span>
                        {formData.badge && (
                          <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-lg text-[9px] font-extrabold">
                            {formData.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>{formData.providerLogo} {formData.provider}</span>
                      </div>

                      <h4 className="text-sm font-black text-slate-900 leading-snug line-clamp-2">
                        {formData.title || 'Tên khóa học'}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-2">
                        {formData.description || 'Mô tả tóm tắt nội dung khóa học...'}
                      </p>

                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-1 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-indigo-500" />
                          {formData.modules.length} Chương
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          {totalLessons} Bài học
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-rose-500" />
                          {totalAssignments} Bài chấm
                        </span>
                      </div>

                      {/* Instructor Avatar & Name */}
                      <div className="flex items-center gap-2.5 pt-2">
                        <img
                          src={assignedInstructor.avatar}
                          alt={assignedInstructor.fullName}
                          className="w-7 h-7 rounded-lg object-cover border border-slate-200"
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Chấm bài bởi</p>
                          <p className="text-xs font-black text-slate-800 truncate">
                            {assignedInstructor.fullName}
                          </p>
                        </div>
                      </div>

                      {/* Pricing Tag */}
                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-base font-black text-indigo-600">
                          {formData.price.toLocaleString('vi-VN')} đ
                        </span>
                        {formData.originalPrice > formData.price && (
                          <span className="text-xs font-bold text-slate-400 line-through">
                            {formData.originalPrice.toLocaleString('vi-VN')} đ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Nút Xuất bản chính thức to rõ */}
              <div className="space-y-2">
                <button
                  type="button"
                  disabled={publishing}
                  onClick={handlePublishCourse}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  {publishing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <UploadCloud className="w-4 h-4 stroke-[2.5]" />
                  )}
                  <span>{publishing ? 'Đang xuất bản khóa học...' : 'Xác nhận & Xuất bản khóa học ngay'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-2xl font-bold text-xs"
                >
                  Chỉnh sửa lại Lộ trình
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
