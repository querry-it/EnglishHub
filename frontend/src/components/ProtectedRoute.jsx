import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Component bảo vệ Route dựa trên trạng thái đăng nhập và vai trò (Role)
 * @param {Element} children - Component con sẽ được hiển thị nếu hợp lệ
 * @param {Array} allowedRoles - Danh sách các vai trò được phép truy cập (vd: ['ADMIN', 'INSTRUCTOR'])
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  // Nếu chưa đăng nhập -> Chuyển hướng về trang đăng nhập
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu có yêu cầu vai trò và vai trò hiện tại không nằm trong danh sách được phép
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Đủ điều kiện -> Cho phép truy cập
  return children;
}
