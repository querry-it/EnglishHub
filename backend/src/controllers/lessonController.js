import prisma from '../config/prisma.js';
import { getYoutubeTranscript, extractVideoId } from '../services/youtubeService.js';

export const createLesson = async (req, res) => {
  try {
    const { title, videoUrl, level, lessonType, transcript } = req.body;
    const adminId = req.user.id;

    // Trich xuat Video ID 
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return res.status(400).json({ success: false, message: 'Link YouTube khong hop le' });
    }

    let finalTranscript = [];

    // Uu tien su dung transcript tu form (Admin da trich xuat hoac sua tay)
    if (transcript && transcript.trim() !== '') {
      try {
        const parsed = JSON.parse(transcript);
        if (Array.isArray(parsed)) finalTranscript = parsed;
      } catch (e) {
        // Neu la van ban thuan (moi dong 1 cau), tu dong gan thoi gian 5s
        const lines = transcript.split('\n').filter(line => line.trim() !== '');
        finalTranscript = lines.map((line, index) => ({
          start: index * 5,
          duration: 4,
          text: line.trim()
        }));
      }
    }

    // Neu van trong, tu dong lay tu YouTube
    if (finalTranscript.length === 0) {
      try {
        finalTranscript = await getYoutubeTranscript(videoId);
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

    const module = await prisma.module.findFirst({
      where: { courseId: course.id }
    });

    // Luu bai hoc
    const lessonsCount = await prisma.lesson.count({ where: { moduleId: module.id } });
    const newLesson = await prisma.lesson.create({
      data: {
        moduleId: module.id,
        title,
        videoUrl: videoId,
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
            lessons: {
              select: {
                id: true,
                title: true,
                lessonType: true,
                videoUrl: true,
                orderIndex: true,
                createdAt: true
              }
            }
          }
        }
      },
      orderBy: { level: 'asc' }
    });

    // Format lai du lieu cho de dung o Frontend
    const formatted = courses.map(c => ({
      id: c.id,
      title: c.title,
      level: c.level,
      modulesCount: c.modules.length,
      lessonsCount: c.modules.reduce((acc, m) => acc + m.lessons.length, 0),
      lessons: c.modules.flatMap(m => m.lessons)
    }));

    res.json({ success: true, courses: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Loi khi tai danh sach bai hoc' });
  }
};

export const getLessonsForStudent = async (req, res) => {
  try {
    const { level } = req.query;

    const lessons = await prisma.lesson.findMany({
      where: {
        lessonType: 'PRACTICE',
        ...(level ? {
          module: {
            course: {
              level: level
            }
          }
        } : {})
      },
      include: {
        module: {
          include: {
            course: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formatted = lessons.map(l => ({
      id: l.id,
      title: l.title,
      videoUrl: l.videoUrl,
      level: l.module.course.level,
      lessonType: l.lessonType,
      moduleId: l.moduleId,
      courseTitle: l.module.course.title,
      createdAt: l.createdAt
    }));

    res.json({ success: true, lessons: formatted });
  } catch (error) {
    console.error('Loi getLessonsForStudent:', error);
    res.status(500).json({ success: false, message: 'Loi khi tai danh sach bai hoc' });
  }
};
