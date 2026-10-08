import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu seeding dữ liệu bằng bcrypt...');

  // Xóa dữ liệu cũ theo đúng thứ tự (Con trước -> Cha sau) để tránh lỗi Foreign Key
  console.log('Đang làm sạch dữ liệu cũ...');

  await prisma.refreshToken.deleteMany({});
  await prisma.userProgress.deleteMany({});
  await prisma.flashcardReview.deleteMany({});
  await prisma.submissionFeedback.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.instructorProfile.deleteMany({});
  await prisma.user.deleteMany({});

  const saltRounds = 10;

  // Khởi tạo tài khoản ADMIN tối cao ban đầu
  const adminPasswordHash = await bcrypt.hash('Adminenglishhub@', saltRounds);
  await prisma.user.create({
    data: {
      email: 'admin@englishhub.edu.vn',
      fullName: 'Quản trị viên',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      isActive: true,
      isApproved: true,
      totalExp: 5000,
      level: 6,
    },
  });
  console.log('Đã tạo Admin mẫu: admin@englishhub.edu.vn / Adminenglishhub@');

  // Khởi tạo tài khoản GIẢNG VIÊN mẫu (Đã duyệt)
  const instructor1PasswordHash = await bcrypt.hash('alexenglishhub@', saltRounds);
  const alex = await prisma.user.create({
    data: {
      email: 'teacher.alex@englishhub.edu.vn',
      fullName: 'Dr. Alex Ferguson',
      passwordHash: instructor1PasswordHash,
      role: 'INSTRUCTOR',
      isActive: true,
      isApproved: true,
      totalExp: 2500,
      level: 3,
      instructorProfile: {
        create: {
          bio: '10 năm kinh nghiệm luyện thi IELTS và chấm chữa bài viết chuyên sâu.',
          certificates: 'IELTS 8.5, TESOL Certificate',
          cvUrl: 'https://englishhub.edu.vn/cv/alex-ferguson.pdf'
        }
      }
    },
  });
  console.log('Đã tạo Giảng viên mẫu (Đã duyệt): teacher.alex@englishhub.edu.vn / alexenglishhub@');

  // Khởi tạo tài khoản GIẢNG VIÊN mới đăng ký (Chưa duyệt - Cần Onboarding)
  const instructor2PasswordHash = await bcrypt.hash('InstructorNew!', saltRounds);
  await prisma.user.create({
    data: {
      email: 'teacher.new@englishhub.edu.vn',
      fullName: 'Nguyễn Văn B',
      passwordHash: instructor2PasswordHash,
      role: 'INSTRUCTOR',
      isActive: true,
      isApproved: false, // Trạng thái chờ duyệt cho luồng 2 bước
      totalExp: 0,
      level: 1,
    },
  });
  console.log('Đã tạo Giảng viên mới (Chưa duyệt - Cần làm bước 2): teacher.new@englishhub.edu.vn / InstructorNew!');

  // Tài khoản GIẢNG VIÊN cá nhân - Dev account (Đã duyệt)
  const myInstructorPasswordHash = await bcrypt.hash('Huynguyen@123', saltRounds);
  await prisma.user.create({
    data: {
      email: 'instructor.huy@englishhub.edu.vn',
      fullName: 'Khánh An',
      passwordHash: myInstructorPasswordHash,
      role: 'INSTRUCTOR',
      isActive: true,
      isApproved: true,
      totalExp: 1000,
      level: 2,
      instructorProfile: {
        create: {
          bio: 'Giảng viên luyện thi IELTS & TOEIC, chuyên gia phát âm.',
          certificates: 'IELTS 7.5, TOEIC 990',
          cvUrl: ''
        }
      }
    },
  });
  console.log('Đã tạo Giảng viên (Dev): instructor.huy@englishhub.edu.vn / Huynguyen@123');

  // Khởi tạo tài khoản HỌC VIÊN mẫu
  const studentPasswordHash = await bcrypt.hash('Student123!', saltRounds);
  const student = await prisma.user.create({
    data: {
      email: 'student.demo@gmail.com',
      fullName: 'Trần Minh Học',
      passwordHash: studentPasswordHash,
      role: 'STUDENT',
      isActive: true,
      isApproved: true,
      totalExp: 1500,
      level: 2,
    },
  });
  console.log('Đã tạo Học viên mẫu: student.demo@gmail.com / Student123!');

  // --- THÊM DỮ LIỆU KHÓA HỌC MẪU (Dictation) ---
  const course1 = await prisma.course.create({
    data: {
      instructorId: alex.id,
      title: 'Dictation Master: Luyện nghe thực chiến',
      slug: 'dictation-practice',
      level: 'B1',
      price: 0,
      modules: {
        create: [
          {
            title: 'Chương 1: Nhập môn',
            orderIndex: 1,
            lessons: {
              create: [
                {
                  id: '00000000-0000-0000-0000-000000000001',
                  title: 'Bài 1: Luyện nghe qua phim Friends',
                  lessonType: 'PRACTICE',
                  orderIndex: 1,
                  videoUrl: 'L2G_b7x3wL0',
                  contentText: JSON.stringify([
                    { start: 0, duration: 2, text: 'Hello everyone.' },
                    { start: 2, duration: 3, text: 'Welcome to EnglishHub.' },
                    { start: 5, duration: 4, text: 'Today we will practice dictation with Friends movie.' }
                  ])
                }
              ]
            }
          }
        ]
      }
    }
  });

  // Khởi tạo tiến độ cho student
  await prisma.userProgress.create({
    data: {
      userId: student.id,
      lessonId: '00000000-0000-0000-0000-000000000001',
      score: 100,
      completed: true
    }
  });

  console.log(`Đã tạo khóa học mẫu: ${course1.title}`);

  console.log('Quá trình seeding hoàn tất thành công!');
}

main()
  .catch((e) => {
    console.error('Lỗi khi chạy Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
