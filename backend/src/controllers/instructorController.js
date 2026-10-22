import prisma from '../config/prisma.js';

// Lấy danh sách khóa học được gán cho giảng viên
export const getMyCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await prisma.course.findMany({
      where: { instructorId },
      include: {
        _count: {
          select: {
            enrollments: true,
            modules: true
          }
        },
        modules: {
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                lessonType: true
              }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      courses: courses.map(c => ({
        id: c.id,
        title: c.title,
        level: c.level,
        studentsCount: c._count.enrollments,
        modulesCount: c._count.modules,
        lessonsCount: c.modules.reduce((acc, m) => acc + m.lessons.length, 0),
        updatedAt: c.updatedAt
      }))
    });
  } catch (error) {
    console.error('Lỗi getMyCourses:', error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

// Lấy danh sách học viên trong khóa học cụ thể của giảng viên
export const getCourseStudents = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;

    // Kiểm tra xem khóa học có thuộc về giảng viên này không
    const course = await prisma.course.findFirst({
      where: { id: courseId, instructorId }
    });

    if (!course) {
      return res.status(403).json({ success: false, message: 'Bạn không có quyền truy cập khóa học này' });
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { courseId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            avatarUrl: true,
            level: true,
            progress: {
              where: {
                lesson: {
                  module: {
                    courseId: courseId
                  }
                },
                completed: true
              },
              select: {
                lessonId: true,
                updatedAt: true,
                lesson: {
                  select: {
                    title: true
                  }
                }
              }
            }
          }
        }
      }
    });

    const students = enrollments.map(e => ({
      id: e.user.id,
      fullName: e.user.fullName,
      email: e.user.email,
      avatarUrl: e.user.avatarUrl,
      level: e.user.level,
      enrolledAt: e.enrolledAt,
      completedLessonsCount: e.user.progress.length,
      completedLessons: e.user.progress.map(p => ({
        id: p.lessonId,
        title: p.lesson.title,
        at: p.updatedAt
      }))
    }));

    res.json({
      success: true,
      students
    });
  } catch (error) {
    console.error('Lỗi getCourseStudents:', error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};
