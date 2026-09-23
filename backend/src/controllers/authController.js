import { registerUser, loginUser, refreshTokenService, logoutUser } from '../services/authService.js';

// ĐĂNG KÝ
export const register = async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;

    const user = await registerUser({ email, password, fullName, role });

    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công!',
      user
    });
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

    const { accessToken, refreshToken, user } = await loginUser({ email, password });

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
    const { accessToken } = await refreshTokenService(token);

    return res.status(200).json({
      success: true,
      accessToken
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
    await logoutUser(token); // Xoá token khỏi DB

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