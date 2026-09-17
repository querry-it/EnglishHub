// Middleware kiểm tra quyền truy cập (Authentication Middleware)

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
  }

  try {
    // Logic verify JWT token (VD: jwt.verify(token, process.env.JWT_SECRET))
    req.user = { id: 1, role: 'user' };
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Invalid Token' });
  }
};
