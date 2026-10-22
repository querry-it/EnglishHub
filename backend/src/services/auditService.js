import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Ghi lại nhật ký hoạt động của người dùng
 * @param {Object} params
 * @param {string} params.userId - ID của người dùng thực hiện hành động
 * @param {string} params.action - Loại hành động (REGISTER_USER, LOGIN, etc.)
 * @param {string} [params.targetId] - ID của đối tượng bị tác động (Course ID, Lesson ID, etc.)
 * @param {string} [params.details] - Chi tiết mô tả hành động
 * @param {string} [params.ipAddress] - Địa chỉ IP của người dùng
 */
export const logAction = async ({ userId, action, targetId, details, ipAddress, tx }) => {
  const db = tx || prisma;
  try {
    await db.auditLog.create({
      data: {
        userId,
        action,
        targetId,
        details,
        ipAddress,
      },
    });
  } catch (error) {
    console.error('Failed to save audit log:', error);
  }
};
