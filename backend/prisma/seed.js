import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log(' Bắt đầu seeding dữ liệu bằng bcrypt...');

  // Xóa sạch dữ liệu cũ
  await prisma.refreshToken.deleteMany({});
  if (prisma.instructorProfile) {
    await prisma.instructorProfile.deleteMany({});
  }
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
    },
  });
  console.log(' Đã tạo Admin mẫu: admin@englishhub.edu.vn / Adminenglishhub@!');

  // Khởi tạo tài khoản GIẢNG VIÊN mẫu (Đã duyệt)
  const instructor1PasswordHash = await bcrypt.hash('alexenglishhub@', saltRounds);
  await prisma.user.create({
    data: {
      email: 'teacher.alex@englishhub.edu.vn',
      fullName: 'Dr. Alex Ferguson',
      passwordHash: instructor1PasswordHash,
      role: 'INSTRUCTOR',
      isActive: true,
      isApproved: true,
      instructorProfile: {
        create: {
          bio: '10 năm kinh nghiệm luyện thi IELTS và chấm chữa bài viết chuyên sâu.',
          certificates: 'IELTS 8.5, TESOL Certificate',
          cvUrl: 'https://englishhub.edu.vn/cv/alex-ferguson.pdf'
        }
      }
    },
  });
  console.log(' Đã tạo Giảng viên mẫu (Đã duyệt): teacher.alex@englishhub.edu.vn / alexenglishhub@');

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
    },
  });
  console.log(' Đã tạo Giảng viên mới (Chưa duyệt - Cần làm bước 2): teacher.new@englishhub.edu.vn / InstructorNew!');

  // Khởi tạo tài khoản HỌC VIÊN mẫu
  const studentPasswordHash = await bcrypt.hash('Student123!', saltRounds);
  await prisma.user.create({
    data: {
      email: 'student.demo@gmail.com',
      fullName: 'Trần Minh Học',
      passwordHash: studentPasswordHash,
      role: 'STUDENT',
      isActive: true,
      isApproved: true,
    },
  });
  console.log('Đã tạo Học viên mẫu: student.demo@gmail.com / Student123!');

  // --- THÊM DỮ LIỆU KHÓA HỌC MẪU ---
  const instructor = await prisma.user.findFirst({ where: { role: 'INSTRUCTOR' } });

  const course1 = await prisma.course.create({
    data: {
      instructorId: instructor.id,
      title: 'IELTS Band 7.0+ Masterclass',
      slug: 'ielts-masterclass-7',
      level: 'IELTS',
      price: 1490000,
      modules: {
        create: [
          {
            title: 'Khởi động & Chiến thuật Listening',
            orderIndex: 1,
            lessons: {
              create: [
                { title: 'Giới thiệu cấu trúc đề thi', lessonType: 'VIDEO', orderIndex: 1, videoUrl: 'https://youtube.com/watch?v=sample1' },
                { title: 'Luyện tập Part 1: Form Filling', lessonType: 'PRACTICE', orderIndex: 2 }
              ]
            }
          }
        ]
      }
    }
  });

  console.log(`Đã tạo khóa học mẫu: ${course1.title}`);

  console.log('Quá trình seeding hoàn tất thành công!');
}

main()
  .catch((e) => {
    console.error(' Lỗi khi chạy Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
