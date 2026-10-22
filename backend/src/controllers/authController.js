import { registerUser, loginUser, refreshTokenService, logoutUser } from '../services/authService.js';
import prisma from '../config/prisma.js';
import { addExperience } from '../services/levelService.js';
import { logAction } from '../services/auditService.js';

// ĐĂNG KÝ
export const register = async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const user = await registerUser({ email, password, fullName, role, ipAddress });

    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công!',
      user
    });
// ... (giữ phần catch cũ)
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    const status = error.status || 500;
    const message = error.message || 'Có lỗi xảy ra trên máy chủ!';
    return res.status(status).json({ success: false, message });
  }
};

// ĐĂNG NHẬP
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const { accessToken, refreshToken, user } = await loginUser({ email, password, ipAddress });

    // Lưu trữ Refresh Token trong HttpOnly Cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
    });

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công!',
      accessToken,
      user
    });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    const status = error.status || 500;
    const message = error.message || 'Có lỗi xảy ra trên máy chủ!';
    return res.status(status).json({ success: false, message });
  }
};
 
// CẤP LẠI TOKEN 
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const { accessToken, user } = await refreshTokenService(token);

    return res.status(200).json({
      success: true,
      accessToken,
      user
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || 'Lỗi cấp lại Token!';
    return res.status(status).json({ success: false, message });
  }
};

// ĐĂNG XUẤT
export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userId = req.user?.id;

    await logoutUser(token, userId, ipAddress); // Xoá token và ghi log

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(200).json({ success: true, message: 'Đăng xuất thành công!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi đăng xuất!' });
  }
};

// LẤY BẢNG XẾP HẠNG
export const getLeaderboard = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        isActive: true
      },
      select: {
        id: true,
        fullName: true,
        level: true,
        totalExp: true,
        avatarUrl: true,
      },
      orderBy: {
        totalExp: 'desc'
      },
      take: 50 // Lấy top 50
    });

    res.json({ success: true, users });
  } catch (error) {
    console.error('Lỗi getLeaderboard:', error);
    res.status(500).json({ success: false, message: 'Không thể tải bảng xếp hạng' });
  }
};

// ĐIỂM DANH HẰNG NGÀY
export const checkIn = async (req, res) => {
  // ... (keep existing implementation)
};

// CẬP NHẬT HỒ SƠ
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, bio, avatarUrl } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Chỉ cho phép cập nhật chính mình (đã có verifyToken)
    if (req.params.id && req.params.id !== userId) {
      return res.status(403).json({ success: false, message: 'Bạn không có quyền cập nhật hồ sơ này!' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        bio,
        avatarUrl,
        gems: { increment: 0 }
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        bio: true,
        role: true,
        totalExp: true,
        level: true,
        gems: true,
        avatarUrl: true,
        lastCheckIn: true
      }
    });

    await logAction({
      userId,
      action: 'UPDATE_PROFILE',
      details: 'Cập nhật thông tin cá nhân',
      ipAddress
    });

    return res.json({
      success: true,
      message: 'Cập nhật hồ sơ thành công!',
      user: updatedUser
    });
  } catch (error) {
    console.error('Lỗi updateProfile:', error);
    return res.status(500).json({ success: false, message: 'Không thể cập nhật hồ sơ' });
  }
};
