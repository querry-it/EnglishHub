import jwt from 'jsonwebtoken';

// Xác thực token JWT
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Bạn chưa đăng nhập!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Phiên làm việc hết hạn hoặc token không hợp lệ!' });
  }
};

// Phân quyền dựa trên vai trò
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền thực hiện hành động này!'
      });
    }
    next();
  };
};

// Kiểm tra quyền ADMIN cụ thể
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Yêu cầu quyền quản trị viên!'
    });
  }
};

// Kiểm tra quyền GIẢNG VIÊN (INSTRUCTOR)
export const isInstructor = (req, res, next) => {
  if (req.user && (req.user.role === 'INSTRUCTOR' || req.user.role === 'ADMIN')) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Yêu cầu quyền giảng viên!'
    });
  }
};
