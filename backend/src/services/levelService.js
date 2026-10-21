import prisma from '../config/prisma.js';

/**
 * Service xử lý tích lũy kinh nghiệm và thăng cấp
 * @param {object} tx - Prisma Transaction Client
 * @param {string} userId - ID người dùng
 * @param {number} expAmount - Số exp nhận được
 * @param {string} reason - Lý do nhận exp (để log)
 */
export const addExperience = async (tx, userId, expAmount, reason = 'LEARNING_ACTIVITY') => {
  // 1. Ghi log nhận Exp
  await tx.expLog.create({
    data: {
      userId,
      amount: expAmount,
      reason
    }
  });

  // 2. Tăng Exp nguyên tử cho User
  const user = await tx.user.update({
    where: { id: userId },
    data: {
      totalExp: { increment: expAmount }
    }
  });

  // 3. Tính toán Level (Công thức: Mỗi level cần 1000 * level exp)
  // Level 1: 0 - 999
  // Level 2: 1000 - 2999 (cần thêm 2000)
  // Để đơn giản hiện tại giữ Math.floor(user.totalExp / 1000) + 1
  // Hoặc dùng công thức tiến cấp: level = floor(sqrt(totalExp/500)) + 1
  const newLevel = Math.floor(user.totalExp / 1000) + 1;

  let levelUp = false;
  if (newLevel > user.level) {
    await tx.user.update({
      where: { id: userId },
      data: { level: newLevel }
    });
    levelUp = true;
  }

  return {
    totalExp: user.totalExp,
    level: newLevel,
    levelUp,
    expGained: expAmount
  };
};
