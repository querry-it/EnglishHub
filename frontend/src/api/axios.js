import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Quan trọng: Cho phép gửi và nhận HttpOnly Cookies
});

// Xử lý lỗi tập trung và Refresh Token tự động có thể thêm ở đây sau này
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Ví dụ: Xử lý 401 để refresh token
    return Promise.reject(error);
  }
);

export default api;
