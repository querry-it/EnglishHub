import prisma from '../config/prisma.js';
import { logAction } from '../services/auditService.js';

// Lấy danh sách Audit Logs
export const getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 20, action } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = action ? { action } : {};

    const [logs, total] = await prisma.$transaction([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              email: true,
              fullName: true,
              role: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.auditLog.count({ where })
    ]);

    res.json({
      success: true,
      logs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Lỗi getAuditLogs:', error);
    res.status(500).json({ success: false, message: 'Không thể tải nhật ký hoạt động' });
  }
};

// Cập nhật giảng viên cho khóa học (Bước 5)
export const updateCourseInstructor = async (req, res) => {
  try {
    const { courseId, newInstructorId } = req.body;
    const adminId = req.user.id;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Kiểm tra khóa học tồn tại
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { instructor: true }
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học' });
    }

    // Kiểm tra giảng viên mới có hợp lệ không
    const newInstructor = await prisma.user.findUnique({
      where: { id: newInstructorId }
    });

    if (!newInstructor || newInstructor.role !== 'INSTRUCTOR') {
      return res.status(400).json({ success: false, message: 'Người dùng được chọn không phải là giảng viên hợp lệ' });
    }

    const oldInstructorName = course.instructor.fullName;

    // Cập nhật
    await prisma.course.update({
      where: { id: courseId },
      data: { instructorId: newInstructorId }
    });

    // Ghi Log Audit
    await logAction({
      userId: adminId,
      action: 'UPDATE_COURSE_INSTRUCTOR',
      targetId: courseId,
      details: `Thay đổi giảng viên khóa "${course.title}" từ ${oldInstructorName} sang ${newInstructor.fullName}`,
      ipAddress
    });

    res.json({
      success: true,
      message: `Đã chuyển khóa học sang giảng viên ${newInstructor.fullName}`
    });
  } catch (error) {
    console.error('Lỗi updateCourseInstructor:', error);
    res.status(500).json({ success: false, message: 'Lỗi hệ thống khi chuyển giảng viên' });
  }
};

// Lấy danh sách người dùng (Học viên)
export const getUsers = async (req, res) => {
  try {
    const { role, status, search } = req.query;

    const where = {};
    if (role) where.role = role;
    if (status === 'ACTIVE') where.isActive = true;
    if (status === 'BLOCKED') where.isActive = false;

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    const users = await prisma.user.findMany({
      where,
      include: {
        _count: {
          select: { progress: { where: { completed: true } } }
        },
        enrollments: {
          include: {
            course: {
              select: {
                title: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      users: users.map(u => ({
        id: u.id,
        fullName: u.fullName,
        email: u.email,
        role: u.role,
        isActive: u.isActive,
        createdAt: u.createdAt,
        level: u.level,
        completedLessons: u._count.progress,
        avatarUrl: u.avatarUrl,
        enrolledCourses: u.enrollments.map(e => e.course.title)
      }))
    });
  } catch (error) {
    console.error('Lỗi getUsers:', error);
    res.status(500).json({ success: false, message: 'Không thể tải danh sách người dùng' });
  }
};

// Cập nhật trạng thái người dùng (Khóa/Mở khóa)
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const adminId = req.user.id;

    const user = await prisma.user.update({
      where: { id },
      data: { isActive }
    });

    await logAction({
      userId: adminId,
      action: isActive ? 'UNBLOCK_USER' : 'BLOCK_USER',
      targetId: id,
      details: `${isActive ? 'Mở khóa' : 'Khóa'} người dùng ${user.email}`
    });

    res.json({ success: true, message: 'Cập nhật trạng thái thành công' });
  } catch (error) {
    console.error('Lỗi updateUserStatus:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật trạng thái' });
  }
};

// Xóa khóa học (Admin)
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    const course = await prisma.course.findUnique({
      where: { id },
      include: { modules: { include: { lessons: true } } }
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học' });
    }

    // Xóa khóa học (Prisma sẽ tự động xử lý xóa cascade nếu đã cấu hình,
    // nếu chưa thì ta xóa thủ công)
    await prisma.course.delete({
      where: { id }
    });

    await logAction({
      userId: adminId,
      action: 'DELETE_COURSE',
      targetId: id,
      details: `Đã xóa khóa học: ${course.title}`
    });

    res.json({ success: true, message: 'Đã xóa khóa học thành công' });
  } catch (error) {
    console.error('Lỗi deleteCourse:', error);
    res.status(500).json({ success: false, message: 'Không thể xóa khóa học. Vui lòng kiểm tra lại ràng buộc dữ liệu.' });
  }
};
