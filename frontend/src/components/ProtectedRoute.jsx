import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingBird from './LoadingBird';

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
        <LoadingBird label="Đang tải..." size={160} />
      </div>
    );
  }

  // Neu chua dang nhap -> Chuyen huong ve trang dang nhap
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kiem tra neu la Instructor nhung chua duoc duyet (isApproved === false)
  // Chi ap dung khi truy cap vao cac trang danh rieng cho Instructor/Admin
  if (user.role === 'INSTRUCTOR' && !user.isApproved && allowedRoles && allowedRoles.includes('INSTRUCTOR')) {
    // Bạn có thể tạo trang /onboarding hoặc /waiting-approval
    // Ở đây tạm thời cho phép vào nhưng có thể hiện thông báo ở giao diện sau
    console.warn("Tài khoản giảng viên chưa được phê duyệt");
  }

  // Neu co yeu cau vai tro va vai tro hien tai khong nam trong danh sach duoc phep
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Đủ điều kiện -> Cho phép truy cập
  return children;
}
