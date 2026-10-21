import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
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

    // 1. Tránh loop vô tận: Nếu request lỗi chính là api refresh hoặc login thì không retry
    if (originalRequest.url.includes('/auth/refresh') || originalRequest.url.includes('/auth/login')) {
      return Promise.reject(error);
    }

    // 2. Nếu lỗi 401 (Unauthorized) và chưa thử lại lần nào
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (response.data.success) {
          const { accessToken, user: newUser } = response.data;
          const storage = localStorage.getItem('accessToken') ? localStorage : sessionStorage;

          storage.setItem('accessToken', accessToken);

          if (newUser) {
            const oldUser = JSON.parse(storage.getItem('user') || '{}');
            storage.setItem('user', JSON.stringify({ ...oldUser, ...newUser }));
          }

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Clear session và đẩy về login
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('accessToken');

        if (window.location.pathname !== '/login') {
          window.location.href = '/login?expired=true';
        }
        return Promise.reject(refreshError);
      }
    }

    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
