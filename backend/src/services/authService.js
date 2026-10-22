import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import { logAction } from './auditService.js';

export const registerUser = async ({ email, password, fullName, role, ipAddress }) => {
  // Kiểm tra đầu vào bắt buộc
  if (!email || !password || !fullName || !role) {
    throw { status: 400, message: 'Vui lòng nhập đầy đủ thông tin!' };
  }

  // Kiểm tra vai trò hợp lệ
  const validRoles = ['STUDENT', 'INSTRUCTOR', 'ADMIN'];
  if (!validRoles.includes(role.toUpperCase())) {
    throw { status: 400, message: 'Vai trò không hợp lệ!' };
  }

  // Kiểm tra email đã tồn tại chưa
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw { status: 400, message: 'Email này đã được sử dụng!' };
  }

  // Băm mật khẩu bằng bcrypt
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Lưu người dùng vào Database
  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash,
      fullName,
      role: role.toUpperCase(),
      isActive: true
    }
  });

  // Ghi Log Đăng ký thành công
  await logAction({
    userId: newUser.id,
    action: 'REGISTER_USER',
    details: `Người dùng đăng ký tài khoản với vai trò ${newUser.role}`,
    ipAddress
  });

  return {
    id: newUser.id,
    email: newUser.email,
    fullName: newUser.fullName,
    role: newUser.role,
    totalExp: newUser.totalExp,
    level: newUser.level,
    gems: newUser.gems,
    lastCheckIn: newUser.lastCheckIn
  };
};

export const loginUser = async ({ email, password, ipAddress }) => {
  // Kiểm tra dữ liệu đầu vào
  if (!email || !password) {
    throw { status: 400, message: 'Vui lòng nhập email và mật khẩu!' };
  }

  // Tìm người dùng theo email
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    // Log đăng nhập thất bại - Sai Email
    await logAction({
      action: 'LOGIN_FAILED',
      details: `Thử đăng nhập thất bại với email không tồn tại: ${email}`,
      ipAddress
    });
    throw { status: 401, message: 'Tài khoản không tồn tại hoặc đã bị khóa!' };
  }

  if (!user.isActive) {
    throw { status: 401, message: 'Tài khoản đã bị khóa!' };
  }

  // Kiểm tra mật khẩu
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    // Log đăng nhập thất bại - Sai Mật khẩu
    await logAction({
      userId: user.id,
      action: 'LOGIN_FAILED',
      details: 'Nhập sai mật khẩu',
      ipAddress
    });
    throw { status: 401, message: 'Mật khẩu không chính xác!' };
  }

  // Tạo Access Token (15 phút)
  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
      totalExp: user.totalExp,
      level: user.level
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  // Tạo Refresh Token (7 ngày)
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // Lưu Refresh Token vào Database với thời hạn 7 ngày
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt
    }
  });

  // Log Đăng nhập thành công
  await logAction({
    userId: user.id,
    action: 'LOGIN',
    details: 'Đăng nhập vào hệ thống',
    ipAddress
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      totalExp: user.totalExp,
      level: user.level,
      gems: user.gems,
      lastCheckIn: user.lastCheckIn
    }
  };
};

// Cấp lại Access Token bằng Refresh Token
export const refreshTokenService = async (token) => {
  if (!token) {
    throw { status: 401, message: 'Bạn chưa cung cấp Refresh Token!' };
  }

  // Kiểm tra Token trong DB
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!storedToken) {
    throw { status: 403, message: 'Refresh Token không hợp lệ hoặc đã bị vô hiệu hóa!' };
  }

  // Verify JWT
  try {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    // Nếu token hết hạn, xoá khỏi DB
    await prisma.refreshToken.delete({ where: { token } }).catch(() => {});
    throw { status: 403, message: 'Refresh Token đã hết hạn, vui lòng đăng nhập lại!' };
  }

  // Kiểm tra tính kích hoạt của user
  if (!storedToken.user.isActive) {
    throw { status: 403, message: 'Tài khoản đã bị khóa!' };
  }

  // Tạo Access Token mới
  const newAccessToken = jwt.sign(
    {
      id: storedToken.user.id,
      role: storedToken.user.role,
      email: storedToken.user.email,
      fullName: storedToken.user.fullName,
      totalExp: storedToken.user.totalExp,
      level: storedToken.user.level
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  return {
    accessToken: newAccessToken,
    user: {
      id: storedToken.user.id,
      email: storedToken.user.email,
      fullName: storedToken.user.fullName,
      role: storedToken.user.role,
      totalExp: storedToken.user.totalExp,
      level: storedToken.user.level,
      gems: storedToken.user.gems,
      lastCheckIn: storedToken.user.lastCheckIn
    }
  };
};

// Hàm xóa Refresh Token khỏi Database khi người dùng đăng xuất
export const logoutUser = async (token, userId, ipAddress) => {
  if (token) {
    await prisma.refreshToken.delete({ where: { token } }).catch(() => {});
  }

  if (userId) {
    await logAction({
      userId,
      action: 'LOGOUT',
      details: 'Người dùng đăng xuất khỏi hệ thống',
      ipAddress
    });
  }
};

// Đổi mật khẩu
export const changePasswordService = async ({ userId, oldPassword, newPassword, ipAddress }) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw { status: 404, message: 'Người dùng không tồn tại' };

  const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!isPasswordValid) throw { status: 400, message: 'Mật khẩu cũ không chính xác' };

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newPassword, saltRounds);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash }
  });

  await logAction({
    userId,
    action: 'CHANGE_PASSWORD',
    details: 'Người dùng đã thay đổi mật khẩu thành công',
    ipAddress
  });
};
