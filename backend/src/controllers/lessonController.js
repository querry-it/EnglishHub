import prisma from '../config/prisma.js';
import { getYoutubeTranscript, extractVideoId } from '../services/youtubeService.js';

export const createLesson = async (req, res) => {
  try {
    const { title, videoUrl, level, lessonType, transcript } = req.body;
    const adminId = req.user.id;

    // Đảm bảo luôn lấy ID sạch từ URL YouTube
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return res.status(400).json({ success: false, message: 'Link YouTube không hợp lệ hoặc không tìm thấy ID' });
    }

    let finalTranscript = [];
    let finalDuration = "00:00";

    // Uu tien su dung transcript tu form (Admin da trich xuat hoac sua tay)
    if (transcript && transcript.trim() !== '') {
      try {
        const parsed = JSON.parse(transcript);
        if (Array.isArray(parsed)) {
          finalTranscript = parsed;
          // Tinh duration neu khong co trong body
          const lastItem = parsed[parsed.length - 1];
          if (lastItem) {
            const totalSeconds = lastItem.start + (lastItem.duration || 0);
            const m = Math.floor(totalSeconds / 60);
            const s = Math.floor(totalSeconds % 60);
            finalDuration = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
          }
        }
      } catch (e) {
        // Neu la van ban thuan (moi dong 1 cau), tu dong gan thoi gian 5s
        const lines = transcript.split('\n').filter(line => line.trim() !== '');
        finalTranscript = lines.map((line, index) => ({
          start: index * 5,
          duration: 4,
          text: line.trim()
        }));
        finalDuration = `${Math.floor((lines.length * 5) / 60).toString().padStart(2, '0')}:${((lines.length * 5) % 60).toString().padStart(2, '0')}`;
      }
    }

    // Neu van trong, tu dong lay tu YouTube
    if (finalTranscript.length === 0) {
      try {
        const result = await getYoutubeTranscript(videoId);
        finalTranscript = result.transcript;
        finalDuration = result.duration;
      } catch (ytError) {
        console.warn("Khong the tu dong lay phu de YouTube:", ytError.message);
      }
    }

    if (finalTranscript.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Khong the lay phu de! Vui long nhap tay hoac thu link khac.'
      });
    }

    // Tim hoac tao Module/Course cho Level nay
    let course = await prisma.course.findFirst({
      where: { level: level }
    });

    if (!course) {
      course = await prisma.course.create({
        data: {
          instructorId: adminId,
          title: `Dictation Master - Level ${level}`,
          slug: `dictation-master-${level.toLowerCase()}-${Date.now()}`,
          level: level,
          modules: {
            create: {
              title: `Luyen nghe ${level} thuc chien`,
              orderIndex: 1,
            }
          }
        },
        include: { modules: true }
      });
    }

    let module = await prisma.module.findFirst({
      where: { courseId: course.id }
    });

    if (!module) {
        module = await prisma.module.create({
            data: {
                courseId: course.id,
                title: `Luyen nghe ${level} thuc chien`,
                orderIndex: 1,
            }
        });
    }

    // Luu bai hoc
    const lessonsCount = await prisma.lesson.count({ where: { moduleId: module.id } });
    const newLesson = await prisma.lesson.create({
      data: {
        moduleId: module.id,
        title,
        videoUrl: videoId,
        duration: finalDuration,
        lessonType: lessonType === 'Dictation' ? 'PRACTICE' : 'SPEAKING',
        contentText: JSON.stringify(finalTranscript),
        orderIndex: lessonsCount + 1,
      }
    });

    res.status(201).json({
      success: true,
      message: 'Tao bai hoc thanh cong!',
      data: newLesson
    });
  } catch (error) {
    console.error('Loi khi tao bai hoc:', error);
    res.status(500).json({ success: false, message: 'Loi he thong khi tao bai hoc' });
  }
};

export const getAllLessonsForAdmin = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });

    // Sắp xếp theo trình độ
    const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'IELTS'];
    const sortedCourses = [...courses].sort((a, b) => {
      const idxA = levelOrder.indexOf(a.level);
      const idxB = levelOrder.indexOf(b.level);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });

    // Format lai du lieu cho de dung o Frontend
    const formatted = sortedCourses.map(c => {
      const lessons = [];
      if (c.modules) {
        c.modules.forEach(m => {
          if (m.lessons) {
            m.lessons.forEach(l => {
              lessons.push({
                ...l,
                videoUrl: extractVideoId(l.videoUrl) || l.videoUrl, // Đảm bảo trả về ID sạch
                level: c.level,
                courseTitle: c.title
              });
            });
          }
        });
      }
      return {
        id: c.id,
        title: c.title,
        level: c.level,
        modulesCount: c.modules?.length || 0,
        lessonsCount: lessons.length,
        lessons: lessons
      };
    });

    res.json({ success: true, courses: formatted });
  } catch (error) {
    console.error('Lỗi getAllLessonsForAdmin:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải danh sách bài học (Admin)',
      error: error.message
    });
  }
};

export const getLessonsForStudent = async (req, res) => {
  try {
    const { level, type, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Xác định loại bài học cần lấy (mặc định lấy cả Practice và Speaking)
    const typeFilter = type ? type : { in: ['PRACTICE', 'SPEAKING'] };

    // Sử dụng transaction để lấy cả data và tổng số lượng cùng lúc
    const [lessons, total] = await prisma.$transaction([
      prisma.lesson.findMany({
        where: {
          lessonType: typeFilter,
          ...(level ? {
            module: {
              course: {
                level: level
              }
            }
          } : {})
        },
        // CHỈ CHỌN các trường cần thiết để giảm tải đường truyền
        select: {
          id: true,
          title: true,
          videoUrl: true,
          duration: true,
          lessonType: true,
          createdAt: true,
          module: {
            select: {
              course: {
                select: {
                  level: true,
                  title: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: skip,
        take: parseInt(limit)
      }),
      prisma.lesson.count({
        where: {
          lessonType: typeFilter,
          ...(level ? {
            module: {
              course: {
                level: level
              }
            }
          } : {})
        }
      })
    ]);

    const formatted = lessons.map(l => ({
      id: l.id,
      title: l.title,
      videoUrl: extractVideoId(l.videoUrl) || l.videoUrl, // Đảm bảo trả về ID sạch
      duration: l.duration || '00:00',
      level: l.module?.course?.level || 'A1',
      lessonType: l.lessonType,
      courseTitle: l.module?.course?.title || 'General',
      createdAt: l.createdAt
    }));

    res.json({
      success: true,
      lessons: formatted,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Lỗi getLessonsForStudent:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi tải danh sách bài học' });
  }
};

export const getLessonDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiem tra xem id co phai la UUID hop le khong (tranh nham voi route khac nhu all-admin)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ success: false, message: 'ID bài học không hợp lệ' });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: id },
      include: {
        module: {
          include: {
            course: true
          }
        }
      }
    });

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Khong tim thay bai hoc' });
    }

    res.json({
      success: true,
      lesson: {
        ...lesson,
        videoUrl: extractVideoId(lesson.videoUrl) || lesson.videoUrl,
        level: lesson.module.course.level,
        transcript: lesson.contentText // Gửi transcript về cho Frontend
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Loi khi lay chi tiet bai hoc' });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, videoUrl, level, lessonType, transcript } = req.body;

    // 1. Chuẩn hóa Video ID
    let videoId = undefined;
    if (videoUrl) {
      videoId = extractVideoId(videoUrl);
      if (!videoId) {
        return res.status(400).json({ success: false, message: 'Link YouTube không hợp lệ' });
      }
    }

    // 2. Kiểm tra nếu thay đổi level, cần tìm module mới
    let moduleId = undefined;
    if (level) {
      let course = await prisma.course.findFirst({ where: { level: level } });
      if (!course) {
        // Tạo course mới nếu level chưa tồn tại
        course = await prisma.course.create({
          data: {
            instructorId: req.user.id,
            title: `Dictation Master - Level ${level}`,
            slug: `dictation-master-${level.toLowerCase()}-${Date.now()}`,
            level: level,
            modules: { create: { title: `Luyện nghe ${level} thực chiến`, orderIndex: 1 } }
          }
        });
      }
      let module = await prisma.module.findFirst({ where: { courseId: course.id } });
      if (!module) {
          module = await prisma.module.create({
              data: {
                  courseId: course.id,
                  title: `Luyện nghe ${level} thực chiến`,
                  orderIndex: 1,
              }
          });
      }
      moduleId = module.id;
    }

    // 3. Cập nhật bài học
    const updatedLesson = await prisma.lesson.update({
      where: { id: id },
      data: {
        title,
        videoUrl: videoId,
        duration: req.body.duration,
        lessonType: lessonType === 'Dictation' ? 'PRACTICE' : (lessonType === 'Shadowing' ? 'SPEAKING' : undefined),
        contentText: transcript, // Frontend đã stringify nếu cần
        ...(moduleId && { moduleId })
      }
    });

    res.json({ success: true, message: 'Cập nhật bài học thành công!', lesson: updatedLesson });
  } catch (error) {
    console.error('Lỗi khi cập nhật bài học:', error);
    res.status(500).json({ success: false, message: 'Lỗi hệ thống khi cập nhật bài học' });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.lesson.delete({
      where: { id: id }
    });
    res.json({ success: true, message: 'Da xoa bai hoc' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Loi khi xoa bai hoc' });
  }
};
