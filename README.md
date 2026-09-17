# EnglishHub - ReactJS & Node.js Express Boilerplate

Dự án mẫu Full-Stack được xây dựng với:
- **Frontend**: React.js 18+, Vite, Vanilla CSS với thiết kế Glassmorphism & Responsive UI.
- **Backend**: Node.js, Express.js RESTful API, CORS, Dotenv.

---

## 🚀 Hướng Dẫn Nhanh (Quick Start)

### 1. Cài Đặt Dependencies

Chạy lệnh sau tại thư mục gốc dự án để tự động cài đặt gói cho cả Root, Frontend và Backend:

```bash
npm run setup
```

### 2. Khởi Chạy Dự Án Ở Chế Độ Development

Chạy đồng thời cả Frontend (Vite) và Backend (Express):

```bash
npm run dev
```

Sau khi chạy thành công:
- **Frontend**: Truy cập tại `http://localhost:5173`
- **Backend API**: Chạy tại `http://localhost:5000/api/health`

---

## 📁 Cấu Trúc Thư Mục

```
EnglishHub/
├── package.json          # Root package.json điều khiển scripts
├── README.md             # Tài liệu hướng dẫn
├── backend/              # Mã nguồn Express.js Backend
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── app.js        # Cấu hình Express, Middleware
│       ├── index.js      # Entrypoint server
│       ├── controllers/  # Logic điều khiển API
│       └── routes/       # Định nghĩa API routes
└── frontend/             # Mã nguồn React.js Frontend
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css     # Design System, HSL Colors & CSS Variables
        └── components/   # Các UI Components
```
