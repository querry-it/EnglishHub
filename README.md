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

### Chạy model chấm phát âm (prototype)

Tính năng Shadowing gọi một Python inference service riêng; Colab chỉ dùng để huấn luyện, không chạy model phục vụ ứng dụng. Cần có `backend/models/pronunciation/score_regressor.pt` và `metadata.json`.

Mở một terminal tại thư mục `backend` và chạy:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r pronunciation_model_api\requirements.txt
python -m uvicorn app:app --app-dir pronunciation_model_api --host 127.0.0.1 --port 8001
```

Lần đầu khởi động, service tải encoder Wav2Vec2 từ Hugging Face; thời gian xử lý có thể lâu hơn khi chạy CPU. Giữ service này chạy, sau đó khởi động dự án bằng `npm run dev`. Backend Express chuyển audio tới Python service tại `http://127.0.0.1:8001`; có thể đổi URL bằng `PRONUNCIATION_SERVICE_URL` trong `backend/.env`.

Đây là prototype dự đoán điểm **toàn câu**, không chấm riêng từng từ/âm vị. Model được huấn luyện trên SpeechOcean762 (người nói L1 tiếng Trung), chưa được kiểm chứng với người học Việt; điểm chỉ mang tính tham khảo. Endpoint yêu cầu học viên đăng nhập.

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
