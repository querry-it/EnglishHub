import prisma from '../config/prisma.js';

/**
 * Service xử lý tích lũy kinh nghiệm và thăng cấp
 */
export const addExperience = async (tx, userId, expAmount) => {
  // Tăng Exp nguyên tử
  const user = await tx.user.update({
    where: { id: userId },
    data: {
      totalExp: { increment: expAmount }
    }
  });

  // Tính toán Level
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
