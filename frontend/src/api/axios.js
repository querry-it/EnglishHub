import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Quan trọng: Cho phép gửi và nhận HttpOnly Cookies
});

// Request interceptor: Thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Xử lý lỗi tập trung và Refresh Token tự động
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 (Unauthorized) và chưa thử lại lần nào
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi API refresh token
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (response.data.success) {
          const { accessToken } = response.data;

          // Lưu token mới vào storage đang sử dụng
          const storage = localStorage.getItem('accessToken') ? localStorage : sessionStorage;
          storage.setItem('accessToken', accessToken);

          // Cập nhật header và thực hiện lại request ban đầu
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Nếu refresh thất bại, xóa session và yêu cầu đăng nhập lại
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('accessToken');
        // Không redirect ngay để tránh reload loop, trả về lỗi để UI xử lý
        return Promise.reject(refreshError);
      }
    }

    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
