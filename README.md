# 📚 Dự án Nền tảng Học Tiếng Anh Trực Tuyến Toàn Diện (Parrato Clone)

## 📖 Tổng quan
Dự án là một hệ thống E-learning chuyên biệt cho việc học ngôn ngữ (Tiếng Anh). Hệ thống hỗ trợ rèn luyện 4 kỹ năng (Nghe, Nói, Đọc, Viết) với tính năng chấm điểm tự động, theo dõi tiến độ học tập, gamification (tạo động lực), và hệ thống quản trị nội dung (CMS) mạnh mẽ kèm phân quyền đa cấp độ.

---

## 🚀 TỔNG HỢP TẤT CẢ CÁC CHỨC NĂNG HỆ THỐNG

### 1. Module Xác thực & Tài khoản (Authentication & Profile)
- **Đăng ký/Đăng nhập:** Bằng Email/Password hoặc Social Login (Google, Facebook, Github).
- **Xác thực:** Gửi mã OTP/Link xác nhận qua Email để kích hoạt tài khoản.
- **Quản lý mật khẩu:** Quên mật khẩu, Đổi mật khẩu.
- **Hồ sơ cá nhân (Profile):** Cập nhật Avatar, thông tin cá nhân, mục tiêu học tập (IELTS 7.0, Giao tiếp, v.v.).
- **Lịch sử hoạt động:** Xem lịch sử đăng nhập, thiết bị đang sử dụng (hỗ trợ đăng xuất từ xa).

### 2. Module Phân quyền (Role-Based Access Control - RBAC)
Hệ thống phân chia 3 cấp độ với quyền hạn cụ thể:
* **Học viên (Student):**
  - Chỉ truy cập được các khóa học đã mua/miễn phí.
  - Làm bài tập, tham gia thảo luận, đánh giá khóa học.
* **Giáo viên/Người tạo nội dung (Teacher):**
  - Quản lý khóa học, bài giảng, bài test do chính mình tạo.
  - Theo dõi danh sách học viên trong lớp, chấm điểm tự luận/nói.
  - Xem thống kê doanh thu từ khóa học của mình.
* **Quản trị viên (Admin):**
  - Toàn quyền (Super Admin).
  - Khóa/Mở khóa tài khoản, cấp quyền (Role).
  - Quản lý toàn bộ giao dịch, hoàn tiền, xét duyệt nội dung khóa học.

### 3. Module Quản lý Khóa học & Bài giảng (Course Management)
- **Danh mục khóa học (Categories):** Phân loại theo mục tiêu (TOEIC, IELTS, Giao tiếp, Tiếng Anh trẻ em) và trình độ (A1 -> C2).
- **Trang chi tiết khóa học:** Hiển thị Video intro, mô tả, lộ trình học (Syllabus), yêu cầu đầu vào, đánh giá (Review/Rating), và thông tin giáo viên.
- **Cấu trúc khóa học:** Chương (Chapter) -> Bài giảng (Lesson) -> Tài liệu đính kèm (Attachments).
- **Định dạng bài giảng đa dạng:** Video (nhúng từ Youtube/Vimeo hoặc lưu trữ S3), Audio (cho bài Listening), Text (Ngữ pháp/Từ vựng), PDF download.

### 4. Module Không gian Học tập (Learning Workspace)
- **Trình phát Video thông minh:** Hỗ trợ điều chỉnh tốc độ (0.5x - 2x), tua nhanh, tự động lưu vị trí xem cuối cùng (Resume playback).
- **Ghi chú trực tiếp (Timestamp Notes):** Học viên có thể gõ ghi chú ngay lúc đang xem video, click vào ghi chú video sẽ tua đúng về thời gian đó.
- **Hỏi đáp (Q&A):** Mục thảo luận ngay dưới mỗi bài giảng, giáo viên và học viên khác có thể vào trả lời.
- **Đánh dấu hoàn thành:** Tự động hoặc thủ công đánh dấu bài học đã hoàn thành để tính % tiến độ.

### 5. Module Bài Kiểm Tra & Luyện Tập (Quiz & Assessment) - *Đặc thù môn Tiếng Anh*
- **Ngân hàng câu hỏi (Question Bank):** Quản lý câu hỏi theo tag (Grammar, Vocab, Reading, Listening) để random ra đề.
- **Hỗ trợ đa dạng loại câu hỏi:**
  - *Multiple Choice:* Trắc nghiệm 1 hoặc nhiều đáp án.
  - *Fill in the blanks:* Điền từ vào chỗ trống.
  - *Drag & Drop:* Kéo thả từ vào đúng vị trí.
  - *Matching:* Nối cột A với cột B.
  - *Reading Comprehension:* Một đoạn văn dài dùng chung cho nhiều câu hỏi trắc nghiệm bên dưới.
  - *Listening:* Tích hợp Audio Player trực tiếp trong câu hỏi, giới hạn số lần nghe.
  - *Speaking:* Tích hợp ghi âm trực tiếp trên web, gửi file cho giáo viên chấm (hoặc dùng AI Speech-to-Text để nhận diện phát âm).
  - *Writing:* Ô nhập văn bản (Rich Text) để viết Essay.
- **Chế độ làm bài:**
  - *Chế độ luyện tập (Practice):* Chọn đáp án xong biết ngay đúng/sai và xem giải thích (Explanation).
  - *Chế độ thi (Exam):* Có đồng hồ đếm ngược, không hiện kết quả cho đến khi nộp bài.
- **Báo cáo kết quả:** Hiển thị điểm số, % đúng từng kỹ năng, lưu lại lịch sử làm bài để học viên so sánh sự tiến bộ.

### 6. Module Gamification & Tạo Động Lực Học (Engagement)
- **Hệ thống điểm (XP/Coins):** Nhận điểm khi hoàn thành bài học, làm bài test điểm cao.
- **Chuỗi ngày học (Daily Streak):** Hiển thị số ngày đăng nhập và học liên tục (giống Duolingo).
- **Huy hiệu (Badges/Achievements):** Đạt được khi hoàn thành các mốc (VD: "Cú đêm" khi học sau 12h đêm, "Vua trắc nghiệm" khi đúng 100%).
- **Bảng xếp hạng (Leaderboard):** Xếp hạng học viên theo tuần/tháng dựa trên XP.
- **Flashcards:** Hệ thống thẻ ghi nhớ từ vựng lật 2 mặt (Thuật toán Spaced Repetition - Lặp lại ngắt quãng).

### 7. Module Thương mại & Thanh toán (E-commerce & Payments)
- **Giỏ hàng (Cart):** Thêm nhiều khóa học vào giỏ.
- **Mã giảm giá (Coupon/Voucher):** Áp dụng mã giảm giá theo %, hoặc số tiền cố định, có giới hạn số lần nhập và ngày hết hạn.
- **Thanh toán trực tuyến:** Tích hợp cổng thanh toán (VNPay, MoMo, ZaloPay hoặc chuyển khoản ngân hàng quét mã QR tự động xác nhận).
- **Quản lý hóa đơn:** Tự động gửi email biên lai, lịch sử mua hàng trong Profile.

### 8. Module Quản trị Hệ thống (Admin CMS)
- **Bảng điều khiển (Dashboard):** Biểu đồ doanh thu, số lượng học viên mới, khóa học bán chạy.
- **Quản lý Users:** Danh sách, tìm kiếm, lọc, ban/unban tài khoản.
- **Quản lý Nội dung (CMS):** Thêm, sửa, xóa các trang tĩnh (Giới thiệu, Chính sách, Hỗ trợ).
- **Quản lý Blog:** Viết bài chuẩn SEO, chia sẻ tài liệu ngữ pháp, từ vựng để thu hút traffic.
- **Hệ thống Thông báo (Notifications):** Gửi thông báo đẩy (Push notification) hoặc Email đến toàn bộ học viên khi có khóa học mới hoặc bảo trì web.

---

## 🛠 Công nghệ Khuyến nghị (Tech Stack)

Để xử lý tốt các tính năng trên, dự án nên được cấu trúc bằng các công nghệ:
* **Frontend:**
  - (React) # 📚 Dự án Nền tảng Học Tiếng Anh Trực Tuyến Toàn Diện (Parrato Clone)

## 📖 Tổng quan
Dự án là một hệ thống E-learning chuyên biệt cho việc học ngôn ngữ (Tiếng Anh). Hệ thống hỗ trợ rèn luyện 4 kỹ năng (Nghe, Nói, Đọc, Viết) với tính năng chấm điểm tự động, theo dõi tiến độ học tập, gamification (tạo động lực), và hệ thống quản trị nội dung (CMS) mạnh mẽ kèm phân quyền đa cấp độ.

---

## 🚀 TỔNG HỢP TẤT CẢ CÁC CHỨC NĂNG HỆ THỐNG

### 1. Module Xác thực & Tài khoản (Authentication & Profile)
- **Đăng ký/Đăng nhập:** Bằng Email/Password hoặc Social Login (Google, Facebook, Github).
- **Xác thực:** Gửi mã OTP/Link xác nhận qua Email để kích hoạt tài khoản.
- **Quản lý mật khẩu:** Quên mật khẩu, Đổi mật khẩu.
- **Hồ sơ cá nhân (Profile):** Cập nhật Avatar, thông tin cá nhân, mục tiêu học tập (IELTS 7.0, Giao tiếp, v.v.).
- **Lịch sử hoạt động:** Xem lịch sử đăng nhập, thiết bị đang sử dụng (hỗ trợ đăng xuất từ xa).

### 2. Module Phân quyền (Role-Based Access Control - RBAC)
Hệ thống phân chia 3 cấp độ với quyền hạn cụ thể:
* **Học viên (Student):**
  - Chỉ truy cập được các khóa học đã mua/miễn phí.
  - Làm bài tập, tham gia thảo luận, đánh giá khóa học.
* **Giáo viên/Người tạo nội dung (Teacher):**
  - Quản lý khóa học, bài giảng, bài test do chính mình tạo.
  - Theo dõi danh sách học viên trong lớp, chấm điểm tự luận/nói.
  - Xem thống kê doanh thu từ khóa học của mình.
* **Quản trị viên (Admin):**
  - Toàn quyền (Super Admin).
  - Khóa/Mở khóa tài khoản, cấp quyền (Role).
  - Quản lý toàn bộ giao dịch, hoàn tiền, xét duyệt nội dung khóa học.

### 3. Module Quản lý Khóa học & Bài giảng (Course Management)
- **Danh mục khóa học (Categories):** Phân loại theo mục tiêu (TOEIC, IELTS, Giao tiếp, Tiếng Anh trẻ em) và trình độ (A1 -> C2).
- **Trang chi tiết khóa học:** Hiển thị Video intro, mô tả, lộ trình học (Syllabus), yêu cầu đầu vào, đánh giá (Review/Rating), và thông tin giáo viên.
- **Cấu trúc khóa học:** Chương (Chapter) -> Bài giảng (Lesson) -> Tài liệu đính kèm (Attachments).
- **Định dạng bài giảng đa dạng:** Video (nhúng từ Youtube/Vimeo hoặc lưu trữ S3), Audio (cho bài Listening), Text (Ngữ pháp/Từ vựng), PDF download.

### 4. Module Không gian Học tập (Learning Workspace)
- **Trình phát Video thông minh:** Hỗ trợ điều chỉnh tốc độ (0.5x - 2x), tua nhanh, tự động lưu vị trí xem cuối cùng (Resume playback).
- **Ghi chú trực tiếp (Timestamp Notes):** Học viên có thể gõ ghi chú ngay lúc đang xem video, click vào ghi chú video sẽ tua đúng về thời gian đó.
- **Hỏi đáp (Q&A):** Mục thảo luận ngay dưới mỗi bài giảng, giáo viên và học viên khác có thể vào trả lời.
- **Đánh dấu hoàn thành:** Tự động hoặc thủ công đánh dấu bài học đã hoàn thành để tính % tiến độ.

### 5. Module Bài Kiểm Tra & Luyện Tập (Quiz & Assessment) - *Đặc thù môn Tiếng Anh*
- **Ngân hàng câu hỏi (Question Bank):** Quản lý câu hỏi theo tag (Grammar, Vocab, Reading, Listening) để random ra đề.
- **Hỗ trợ đa dạng loại câu hỏi:**
  - *Multiple Choice:* Trắc nghiệm 1 hoặc nhiều đáp án.
  - *Fill in the blanks:* Điền từ vào chỗ trống.
  - *Drag & Drop:* Kéo thả từ vào đúng vị trí.
  - *Matching:* Nối cột A với cột B.
  - *Reading Comprehension:* Một đoạn văn dài dùng chung cho nhiều câu hỏi trắc nghiệm bên dưới.
  - *Listening:* Tích hợp Audio Player trực tiếp trong câu hỏi, giới hạn số lần nghe.
  - *Speaking:* Tích hợp ghi âm trực tiếp trên web, gửi file cho giáo viên chấm (hoặc dùng AI Speech-to-Text để nhận diện phát âm).
  - *Writing:* Ô nhập văn bản (Rich Text) để viết Essay.
- **Chế độ làm bài:**
  - *Chế độ luyện tập (Practice):* Chọn đáp án xong biết ngay đúng/sai và xem giải thích (Explanation).
  - *Chế độ thi (Exam):* Có đồng hồ đếm ngược, không hiện kết quả cho đến khi nộp bài.
- **Báo cáo kết quả:** Hiển thị điểm số, % đúng từng kỹ năng, lưu lại lịch sử làm bài để học viên so sánh sự tiến bộ.

### 6. Module Gamification & Tạo Động Lực Học (Engagement)
- **Hệ thống điểm (XP/Coins):** Nhận điểm khi hoàn thành bài học, làm bài test điểm cao.
- **Chuỗi ngày học (Daily Streak):** Hiển thị số ngày đăng nhập và học liên tục (giống Duolingo).
- **Huy hiệu (Badges/Achievements):** Đạt được khi hoàn thành các mốc (VD: "Cú đêm" khi học sau 12h đêm, "Vua trắc nghiệm" khi đúng 100%).
- **Bảng xếp hạng (Leaderboard):** Xếp hạng học viên theo tuần/tháng dựa trên XP.
- **Flashcards:** Hệ thống thẻ ghi nhớ từ vựng lật 2 mặt (Thuật toán Spaced Repetition - Lặp lại ngắt quãng).

### 7. Module Thương mại & Thanh toán (E-commerce & Payments)
- **Giỏ hàng (Cart):** Thêm nhiều khóa học vào giỏ.
- **Mã giảm giá (Coupon/Voucher):** Áp dụng mã giảm giá theo %, hoặc số tiền cố định, có giới hạn số lần nhập và ngày hết hạn.
- **Thanh toán trực tuyến:** Tích hợp cổng thanh toán (VNPay, MoMo, ZaloPay hoặc chuyển khoản ngân hàng quét mã QR tự động xác nhận).
- **Quản lý hóa đơn:** Tự động gửi email biên lai, lịch sử mua hàng trong Profile.

### 8. Module Quản trị Hệ thống (Admin CMS)
- **Bảng điều khiển (Dashboard):** Biểu đồ doanh thu, số lượng học viên mới, khóa học bán chạy.
- **Quản lý Users:** Danh sách, tìm kiếm, lọc, ban/unban tài khoản.
- **Quản lý Nội dung (CMS):** Thêm, sửa, xóa các trang tĩnh (Giới thiệu, Chính sách, Hỗ trợ).
- **Quản lý Blog:** Viết bài chuẩn SEO, chia sẻ tài liệu ngữ pháp, từ vựng để thu hút traffic.
- **Hệ thống Thông báo (Notifications):** Gửi thông báo đẩy (Push notification) hoặc Email đến toàn bộ học viên khi có khóa học mới hoặc bảo trì web.

---

## 🛠 Công nghệ Khuyến nghị (Tech Stack)

Để xử lý tốt các tính năng trên, dự án nên được cấu trúc bằng các công nghệ:
* **Frontend:**
- Reactjs
  - Tailwind CSS + UI Components (Shadcn/MUI).
  - Redux Toolkit hoặc Zustand (Quản lý State, đặc biệt là state của bài Test).
* **Backend:**
  - Node.js (Express/NestJS) hoặc Python (Django/FastAPI).
  - WebSockets (Socket.io) cho tính năng chat hoặc thông báo realtime.
* **Database:**
  - PostgreSQL (Lưu trữ quan hệ: User, Khóa học, Giao dịch).
  - Redis (Caching dữ liệu bảng xếp hạng, session).
* **Lưu trữ & Khác:**
  - AWS S3 / Cloudinary (Lưu ảnh, video bài giảng, file audio gốc).
  - Nodemailer/SendGrid (Hệ thống gửi Email).
  - ffmpeg (Nén và chuyển đổi định dạng video/audio tối ưu trên web).
cho khả năng SEO tốt (phần Public) và tốc độ tải trang nhanh.
  - Tailwind CSS + UI Components (Shadcn/MUI).
  - Redux Toolkit hoặc Zustand (Quản lý State, đặc biệt là state của bài Test).
* **Backend:**
  - Node.js (Express/NestJS) hoặc Python (Django/FastAPI).
  - WebSockets (Socket.io) cho tính năng chat hoặc thông báo realtime.
* **Database:**
  - PostgreSQL (Lưu trữ quan hệ: User, Khóa học, Giao dịch).
  - Redis (Caching dữ liệu bảng xếp hạng, session).
* **Lưu trữ & Khác:**
  - AWS S3 / Cloudinary (Lưu ảnh, video bài giảng, file audio gốc).
  - Nodemailer/SendGrid (Hệ thống gửi Email).
  - ffmpeg (Nén và chuyển đổi định dạng video/audio tối ưu trên web).

---