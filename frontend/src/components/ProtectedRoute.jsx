import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Component bảo vệ Route dựa trên trạng thái đăng nhập và vai trò (Role)
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Hiển thị loading trong khi đang kiểm tra token/tải dữ liệu user
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1120]">
        <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  // 1. Nếu chưa đăng nhập -> Chuyển hướng về trang đăng nhập
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Kiểm tra nếu là Instructor nhưng chưa được duyệt (isApproved === false)
  // Chỉ áp dụng khi truy cập vào các trang dành riêng cho Instructor/Admin
  if (user.role === 'INSTRUCTOR' && !user.isApproved && allowedRoles && allowedRoles.includes('INSTRUCTOR')) {
    // Bạn có thể tạo trang /onboarding hoặc /waiting-approval
    // Ở đây tạm thời cho phép vào nhưng có thể hiện thông báo ở giao diện sau
    console.warn("Tài khoản giảng viên chưa được phê duyệt");
  }

  // 3. Nếu có yêu cầu vai trò và vai trò hiện tại không nằm trong danh sách được phép
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Đủ điều kiện -> Cho phép truy cập
  return children;
}
