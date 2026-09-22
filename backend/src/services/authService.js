import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

export const registerUser = async ({ email, password, fullName, role }) => {
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

  return {
    id: newUser.id,
    email: newUser.email,
    fullName: newUser.fullName,
    role: newUser.role
  };
};

export const loginUser = async ({ email, password }) => {
  // Kiểm tra dữ liệu đầu vào
  if (!email || !password) {
    throw { status: 400, message: 'Vui lòng nhập email và mật khẩu!' };
  }

  // Tìm người dùng theo email
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || !user.isActive) {
    throw { status: 401, message: 'Tài khoản không tồn tại hoặc đã bị khóa!' };
  }

  // Kiểm tra mật khẩu
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw { status: 401, message: 'Mật khẩu không chính xác!' };
  }

  // Tạo Access Token (15 phút)
  const accessToken = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
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

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
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
    { id: storedToken.user.id, role: storedToken.user.role, email: storedToken.user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  return { accessToken: newAccessToken };
};

// Hàm xóa Refresh Token khỏi Database khi người dùng đăng xuất
export const logoutUser = async (token) => {
  if (token) {
    await prisma.refreshToken.delete({ where: { token } }).catch(() => {
    });
  }
};