import prisma from '../config/prisma.js';
import { getYoutubeTranscript, extractVideoId } from '../services/youtubeService.js';
import { logAction } from '../services/auditService.js';

export const createLesson = async (req, res) => {
  try {
    const { title, videoUrl, level, lessonType, transcript } = req.body;
    const adminId = req.user.id;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

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
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        duration: finalDuration,
        lessonType: lessonType === 'Dictation' ? 'PRACTICE' : 'SPEAKING',
        contentText: JSON.stringify(finalTranscript),
        orderIndex: lessonsCount + 1,
      }
    });

    // Ghi Log Audit
    await logAction({
      userId: adminId,
      action: 'CREATE_LESSON',
      targetId: newLesson.id,
      details: `Tạo bài học: ${title} (Level: ${level})`,
      ipAddress
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
        instructor: {
          select: {
            id: true,
            fullName: true,
            email: true,
            avatarUrl: true
          }
        },
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

    const formattedCourses = sortedCourses.map(course => ({
      id: course.id,
      title: course.title,
      level: course.level,
      instructor: course.instructor,
      modulesCount: course.modules.length,
      lessonsCount: course.modules.reduce((acc, m) => acc + m.lessons.length, 0),
      lessons: course.modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleTitle: m.title })))
    }));

    res.json({
      success: true,
      courses: formattedCourses
    });
  } catch (error) {
    console.error('Lỗi getAllLessonsForAdmin:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách khóa học' });
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
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

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
        videoUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : undefined,
        duration: req.body.duration,
        lessonType: lessonType === 'Dictation' ? 'PRACTICE' : (lessonType === 'Shadowing' ? 'SPEAKING' : undefined),
        contentText: transcript, // Frontend đã stringify nếu cần
        ...(moduleId && { moduleId })
      }
    });

    // Ghi Log Audit
    await logAction({
      userId: req.user.id,
      action: 'UPDATE_LESSON',
      targetId: updatedLesson.id,
      details: `Cập nhật bài học: ${updatedLesson.title}`,
      ipAddress
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
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const lesson = await prisma.lesson.findUnique({ where: { id } });
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài học' });
    }

    await prisma.lesson.delete({
      where: { id: id }
    });

    // Ghi Log Audit
    await logAction({
      userId: req.user.id,
      action: 'DELETE_LESSON',
      targetId: id,
      details: `Xóa bài học: ${lesson.title}`,
      ipAddress
    });

    res.json({ success: true, message: 'Da xoa bai hoc' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Loi khi xoa bai hoc' });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query; // 'completed' or 'learning'

    const progress = await prisma.userProgress.findMany({
      where: {
        userId: userId,
        ...(status === 'completed' ? { completed: true } : { completed: false })
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            videoUrl: true,
            duration: true,
            lessonType: true,
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
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    const formatted = progress.map(p => ({
      id: p.lesson.id,
      title: p.lesson.title,
      videoUrl: extractVideoId(p.lesson.videoUrl) || p.lesson.videoUrl,
      duration: p.lesson.duration,
      lessonType: p.lesson.lessonType,
      score: p.score,
      completed: p.completed,
      updatedAt: p.updatedAt,
      level: p.lesson.module.course.level,
      courseTitle: p.lesson.module.course.title
    }));

    res.json({
      success: true,
      progress: formatted
    });
  } catch (error) {
    console.error('Lỗi getUserProgress:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi tải tiến độ học tập' });
  }
};

export const getCourseLessonProgress = async (req, res) => {
  try {
    const courseKey = req.params.courseKey?.trim();
    if (!courseKey) {
      return res.status(400).json({ success: false, message: 'Thiếu mã khóa học.' });
    }

    const progress = await prisma.courseLessonProgress.findMany({
      where: { userId: req.user.id, courseKey, completed: true },
      select: { lessonKey: true }
    });

    res.json({
      success: true,
      completedLessonIds: progress.map(item => item.lessonKey)
    });
  } catch (error) {
    console.error('Lỗi khi tải tiến độ khóa học:', error);
    res.status(500).json({ success: false, message: 'Không thể tải tiến độ khóa học.' });
  }
};

export const setCourseLessonProgress = async (req, res) => {
  try {
    const courseKey = req.params.courseKey?.trim();
    const lessonKey = req.params.lessonKey?.trim();
    const { completed } = req.body;

    if (!courseKey || !lessonKey || typeof completed !== 'boolean') {
      return res.status(400).json({ success: false, message: 'Thông tin tiến độ bài học không hợp lệ.' });
    }

    const progress = await prisma.courseLessonProgress.upsert({
      where: {
        userId_courseKey_lessonKey: {
          userId: req.user.id,
          courseKey,
          lessonKey
        }
      },
      update: { completed },
      create: {
        userId: req.user.id,
        courseKey,
        lessonKey,
        completed
      }
    });

    res.json({ success: true, completed: progress.completed });
  } catch (error) {
    console.error('Lỗi khi lưu tiến độ bài học:', error);
    res.status(500).json({ success: false, message: 'Không thể lưu tiến độ bài học.' });
  }
};

export const extractTranscript = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    if (!videoUrl) return res.status(400).json({ success: false, message: 'Thiếu Link YouTube' });

    const videoId = extractVideoId(videoUrl);
    const result = await getYoutubeTranscript(videoId);

    if (result && result.transcript && result.transcript.length > 0) {
      return res.json({
        success: true,
        transcript: result.transcript,
        duration: result.duration
      });
    }
    res.status(404).json({ success: false, message: 'Không tìm thấy phụ đề cho video này!' });
  } catch (error) {
    console.error('Lỗi extractTranscript:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
