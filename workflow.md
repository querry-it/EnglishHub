# BÁO CÁO THIẾT KẾ KIẾN TRÚC VÀ ĐẶC TẢ HỆ THỐNG
## DỰ ÁN: HỆ THỐNG QUẢN LÝ ĐÀO TẠO VÀ HỌC TẬP TIẾNG ANH TRỰC TUYẾN (SMART ENGLISH LMS)
**Học phần:** Thiết kế web nâng cao (Mã học phần: CSE702051)  
**Nhánh công nghệ lựa chọn:** Nhánh B (Node.js / Express / NestJS + PostgreSQL)  
**Đơn vị đào tạo:** Khoa Hệ thống thông tin, Trường Công nghệ thông tin – Đại học Phenikaa  

---

# PHẦN I. PHIẾU ĐỀ XUẤT ĐỀ TÀI NGOÀI DANH MỤC (THEO PHỤ LỤC 12)

*   **Tên đề tài đề xuất:**
    *   Tiếng Việt: Hệ thống Quản lý Đào tạo và Học tập Tiếng Anh Trực tuyến.
    *   Tiếng Anh: Smart English Learning Management System (Smart English LMS).
*   **Bối cảnh và vấn đề thực tiễn cần giải quyết:**  
    Các hệ thống học trực tuyến hiện nay đa số chỉ dừng lại ở việc xem video thụ động hoặc làm bài trắc nghiệm một chiều, thiếu tính năng thực hành trực tiếp 4 kỹ năng (đặc biệt là Speaking và Writing). Hệ thống Smart English LMS giải quyết vấn đề này bằng cách cung cấp bộ thu âm Speaking trực tiếp qua trình duyệt, phòng chấm chữa Writing theo tiêu chí Rubric, đồng thời ứng dụng thuật toán Lặp lại ngắt quãng (Spaced Repetition System - SM-2) để tối ưu hóa khả năng ghi nhớ từ vựng lâu dài của học viên.
*   **Các vai trò người dùng (Tối thiểu 03 vai trò thực chất):**  
    1.  *Student (Học viên):* Xem lộ trình, học bài giảng video/text, làm bài trắc nghiệm, nộp bài ghi âm Speaking, nộp bài viết Writing, theo dõi chuỗi ngày học (Streak) và xem kết quả chấm điểm.
    2.  *Instructor (Giảng viên / Trợ giảng):* Quản lý giáo trình (Course Builder), ngân hàng câu hỏi, phòng chấm bài tập (nghe audio học viên nộp, chấm điểm theo Rubric, ghim lỗi sai văn bản kèm nhận xét).
    3.  *Administrator (Quản trị viên hệ thống):* Quản lý người dùng, phân quyền RBAC, khóa/mở tài khoản, duyệt khóa học, quản lý đơn hàng/mã kích hoạt, xem nhật ký kiểm toán và báo cáo doanh thu.
*   **Xử lý nghiệp vụ đặc thù dự kiến (Thuật toán trọng tâm):**  
    *   *Thuật toán Spaced Repetition (SuperMemo SM-2):* Tự động tính toán chu kỳ ôn tập từ vựng dựa trên phản hồi mức độ nhớ của người học.
    *   *Cơ chế khóa bài có điều kiện (Conditional Progression Locking):* Kiểm soát điều kiện tiên quyết ở tầng nghiệp vụ; bài học kế tiếp chỉ mở khóa khi học viên hoàn thành thời lượng video và đạt $\ge 80\%$ điểm bài kiểm tra.
*   **Các thực thể dữ liệu chính (Tối thiểu 06 thực thể):** Gồm 08 thực thể có quan hệ thực chất: `users`, `courses`, `modules`, `lessons`, `enrollments`, `submissions`, `submission_feedbacks`, `flashcard_reviews`.
*   **Nhánh công nghệ & Ngăn xếp dự kiến:**  
    *   Backend: Node.js (Express/NestJS) thiết kế theo kiến trúc 3 tầng chuẩn.
    *   Cơ sở dữ liệu: PostgreSQL (Supabase / Neon).
    *   Frontend: Next.js / React.
*   **Nền tảng triển khai trực tuyến dự kiến:** Render / Vercel qua giao thức HTTPS có chứng thư số hợp lệ.
*   **Tiêu chí nghiệm thu tự đặt:**  
    *   Hệ thống tải trang nhanh ($< 1.5$s), bao phủ 100% 10 khối chức năng bắt buộc K1 – K10.
    *   Vượt qua 12 rủi ro bảo mật OWASP Top 10 và đạt chuẩn WCAG 2.1 AA.
    *   Dựng lại toàn bộ hệ thống bằng Docker Compose chỉ với một câu lệnh trong dưới 5 phút.

---

# PHẦN II. MA TRẬN ĐỐI CHIẾU CHUẨN ĐẦU RA VÀ 10 KHỐI CHỨC NĂNG

### 1. Ma trận đối chiếu 10 khối chức năng bắt buộc (Phụ lục 03)

| Mã | Khối chức năng bắt buộc | Hiện thực chi tiết trên hệ thống Smart English LMS |
| :--- | :--- | :--- |
| **K1** | Quản lý người dùng & Xác thực | Đăng ký, đăng nhập JWT kép (Access Token ngắn hạn + Refresh Token HttpOnly Cookie), đổi mật khẩu, khóa tài khoản. Mật khẩu băm bằng Argon2/bcrypt. |
| **K2** | Phân quyền theo vai trò (RBAC) | 03 vai trò khác biệt: Student, Instructor, Admin. Kiểm soát quyền phía server qua Middleware/Guards, chặn IDOR. |
| **K3** | Nghiệp vụ cốt lõi của đề tài | 1. Luồng học video $\rightarrow$ làm Quiz $\rightarrow$ tự động mở bài kế tiếp.<br>2. Luồng nộp Speaking/Writing $\rightarrow$ Chấm điểm theo Rubric $\rightarrow$ Trả kết quả.<br>3. Luồng ôn từ vựng ngắt quãng (SM-2 Flashcard). |
| **K4** | Quản trị dữ liệu danh mục | Đầy đủ thao tác CRUD trên 08 thực thể với xác thực DTO và ràng buộc khóa ngoại (Foreign Keys). |
| **K5** | Tìm kiếm, lọc và phân trang | Tìm kiếm khóa học, lọc theo trình độ (A1–IELTS), kỹ năng; phân trang server-side (`limit`/`offset`). |
| **K6** | Tải và quản lý tệp an toàn | Tải tệp ghi âm Speaking, kiểm tra magic bytes (`audio/webm`, `audio/mpeg`), giới hạn $\le 10$MB, đổi tên file hash ngẫu nhiên. |
| **K7** | Báo cáo và thống kê | Báo cáo tiến độ học tập, phổ điểm các kỹ năng Speaking/Writing, doanh thu theo thời gian; hỗ trợ xuất tệp ra CSV/Excel. |
| **K8** | Nhật ký hệ thống (Audit Log) | Ghi vết đăng nhập thất bại liên tiếp, cập nhật quyền, xóa khóa học, sửa điểm; giao diện tra cứu dành cho Admin[cite: 1]. |
| **K9** | Thông báo[cite: 1] | Thông báo trong ứng dụng (In-app Notification) cho học viên khi bài nộp Speaking/Writing được chấm điểm[cite: 1]. |
| **K10** | Trang công khai[cite: 1] | Trang chủ, Giới thiệu, Lộ trình, Liên hệ, FAQ, Điều khoản; đầy đủ Open Graph, WCAG 2.1 AA; có dòng chữ *"Dữ liệu mô phỏng phục vụ mục đích học tập"* ở chân trang[cite: 1]. |

### 2. Ma trận đối chiếu Chuẩn đầu ra (Mục 6.5)

| CĐR | Nội dung chuẩn đầu ra | Bằng chứng bắt buộc trong sản phẩm |
| :--- | :--- | :--- |
| **1.1** | Thực hiện lập trình phía máy chủ cho ứng dụng web[cite: 1]. | Mã nguồn tầng Service, Repository; xử lý JWT kép; truy vấn tham số hóa chống SQLi; băm mật khẩu Argon2[cite: 1]. Trình bày tại Chương 1 và 4[cite: 1]. |
| **4.1** | Thiết kế cấu trúc và chức năng cho website động[cite: 1]. | Đặc tả 33 YCCN, YCPCN đo được; sơ đồ phân tầng 3 tầng; biểu đồ Use Case; biểu đồ ERD chuẩn 3NF gồm 8 thực thể[cite: 1]. Trình bày tại Chương 2 và 3[cite: 1]. |
| **4.2** | Xây dựng và đề xuất cấu trúc, chức năng phù hợp[cite: 1]. | Luận giải lựa chọn kiến trúc và ngăn xếp công nghệ; mã giả thuật toán SM-2; ma trận 12 rủi ro bảo mật OWASP Top 10; bảng đo hiệu năng trước/sau[cite: 1]. Trình bày tại Chương 1, 3 và 5[cite: 1]. |
| **4.3** | Xây dựng website động dựa trên backend hiện đại[cite: 1]. | Website chạy trực tuyến trên Render/Vercel qua HTTPS[cite: 1]; backend Node.js 3 tầng[cite: 1]; tài liệu Swagger UI OpenAPI v3[cite: 1]; bộ 25+ ca kiểm thử[cite: 1]. Trình bày tại Chương 4, 5 và 6[cite: 1]. |

---

# PHẦN III. BẢNG ĐẶC TẢ YÊU CẦU CHỨC NĂNG (YCCN) THEO THỨ TỰ THỰC HIỆN

### Giai đoạn 1: Trang công khai & Nhận diện (Tuần 1 - Mốc 0 & Mốc 1)[cite: 1]

| Thứ tự | Mã YC | Tên chức năng / Màn hình | Mô tả chi tiết nghiệp vụ | Vai trò | Mức ưu tiên | CĐR |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: |
| 1 | **YCCN-01** | Trang chủ (`/`) | Hiển thị hero banner, khóa học tiêu biểu, cảm nhận học viên; chân trang có dòng chữ *"Dữ liệu mô phỏng phục vụ mục đích học tập"*[cite: 1]. | Khách | Bắt buộc[cite: 1] | CĐR 4.2[cite: 1] |
| 2 | **YCCN-02** | Giới thiệu & Sứ mệnh (`/about`) | Giới thiệu đội ngũ giảng viên, phương pháp học đa phương tiện và chuẩn đầu ra CEFR[cite: 1]. | Khách | Bắt buộc[cite: 1] | CĐR 4.2[cite: 1] |
| 3 | **YCCN-03** | Lộ trình đào tạo (`/roadmaps`) | Hiển thị cây lộ trình học từ A1 đến IELTS trực quan, điều hướng tới danh mục khóa học[cite: 1]. | Khách | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 4 | **YCCN-04** | Câu hỏi thường gặp (`/faq`) | Giao diện accordion giải đáp thắc mắc về cách nộp bài và cấp chứng chỉ[cite: 1]. | Khách | Cần có[cite: 1] | CĐR 4.2[cite: 1] |
| 5 | **YCCN-05** | Liên hệ & Hỗ trợ (`/contact`) | Form gửi phản hồi góp ý, thông tin liên hệ và bản đồ chỉ dẫn[cite: 1]. | Khách | Cần có[cite: 1] | CĐR 4.1[cite: 1] |
| 6 | **YCCN-06** | Điều khoản & Bảo mật (`/terms`) | Chính sách bảo vệ dữ liệu cá nhân giả lập và quy định sử dụng dịch vụ[cite: 1]. | Khách | Bắt buộc[cite: 1] | CĐR 4.2[cite: 1] |
| 7 | **YCCN-07** | Tìm kiếm & Lọc khóa học (`/courses`) | Lọc theo trình độ (A1–IELTS), kỹ năng, giá tiền; phân trang phía máy chủ[cite: 1]. | Khách | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 8 | **YCCN-08** | Chi tiết khóa học (`/courses/[slug]`) | Xem đề cương bài giảng, thông tin giảng viên, đánh giá của học viên[cite: 1]. | Khách | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |

### Giai đoạn 2: Xác thực, Phân quyền & Quản trị dữ liệu (Đầu Tuần 2 - Mốc 2)[cite: 1]

| Thứ tự | Mã YC | Tên chức năng / Màn hình | Mô tả chi tiết nghiệp vụ | Vai trò | Mức ưu tiên | CĐR |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: |
| 9 | **YCCN-09** | Đăng ký tài khoản (`/register`) | Đăng ký tài khoản học viên mới, kiểm tra trùng lặp email, băm mật khẩu bằng Argon2/bcrypt[cite: 1]. | Khách | Bắt buộc[cite: 1] | CĐR 1.1[cite: 1] |
| 10 | **YCCN-10** | Đăng nhập hệ thống (`/login`) | Cấp Access Token ngắn hạn và Refresh Token trong HttpOnly Cookie[cite: 1]. | Tất cả | Bắt buộc[cite: 1] | CĐR 1.1[cite: 1] |
| 11 | **YCCN-11** | Đăng xuất an toàn | Hủy phiên trên server, xóa HttpOnly Cookie trên trình duyệt[cite: 1]. | Tất cả | Bắt buộc[cite: 1] | CĐR 1.1[cite: 1] |
| 12 | **YCCN-12** | Kiểm soát quyền phía Server | Áp dụng middleware chặn truy cập theo role (Student, Instructor, Admin)[cite: 1]. | Hệ thống | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 13 | **YCCN-13** | Quản lý Giáo trình (`/instructor/courses`) | Giảng viên tạo, sửa, xóa khóa học, chương mục (Modules) và bài học (Lessons)[cite: 1]. | Instructor | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 14 | **YCCN-14** | Ngân hàng câu hỏi (`/instructor/quizzes`) | Quản trị kho câu hỏi trắc nghiệm, phân loại theo độ khó và kỹ năng[cite: 1]. | Instructor | Cần có[cite: 1] | CĐR 4.1[cite: 1] |
| 15 | **YCCN-15** | Đổi mật khẩu cá nhân (`/profile`) | Cập nhật mật khẩu mới khi xác thực đúng mật khẩu cũ[cite: 1]. | Tất cả | Cần có[cite: 1] | CĐR 1.1[cite: 1] |

### Giai đoạn 3: Không gian Học tập & Nộp bài thực hành (Cuối Tuần 2 - Tuần 3)[cite: 1]

| Thứ tự | Mã YC | Tên chức năng / Màn hình | Mô tả chi tiết nghiệp vụ | Vai trò | Mức ưu tiên | CĐR |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: |
| 16 | **YCCN-16** | Ghi danh khóa học | Học viên đăng ký tham gia, khởi tạo tiến độ học 0%[cite: 1]. | Student | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 17 | **YCCN-17** | Dashboard Học viên (`/dashboard`) | Theo dõi danh sách khóa đang học, tiến độ hoàn thành, chuỗi Streak[cite: 1]. | Student | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 18 | **YCCN-18** | Học qua Video (`/learn/.../lessons/:id`) | Xem video, tùy chỉnh tốc độ phát, xem transcript song ngữ[cite: 1]. | Student | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 19 | **YCCN-19** | Ghi chú theo thời gian | Tạo ghi chú cá nhân ghim theo số giây của video[cite: 1]. | Student | Cần có[cite: 1] | CĐR 4.1[cite: 1] |
| 20 | **YCCN-20** | Làm bài trắc nghiệm cuối bài | Tự động chấm điểm, hiển thị đáp án đúng và giải thích tức thì[cite: 1]. | Student | Bắt buộc[cite: 1] | CĐR 1.1[cite: 1] |
| 21 | **YCCN-21** | Khóa tiến độ bài học | Tự động mở bài kế tiếp khi xem xong video và điểm kiểm tra $\ge 80\%$[cite: 1]. | Hệ thống | Bắt buộc[cite: 1] | CĐR 4.3[cite: 1] |
| 22 | **YCCN-22** | Thu âm & Nộp bài Speaking | Thu âm trực tiếp bằng micro trình duyệt, gửi tệp audio WebM/MP3 lên máy chủ[cite: 1]. | Student | Bắt buộc[cite: 1] | CĐR 4.3[cite: 1] |
| 23 | **YCCN-23** | Soạn thảo & Nộp bài Writing | Khung soạn thảo có bộ đếm từ tự động (Word Counter) và nộp bài luận[cite: 1]. | Student | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 24 | **YCCN-24** | Ôn từ vựng Lặp lại ngắt quãng | Flashcard lật 2 mặt, áp dụng thuật toán SM-2 để tính ngày ôn tập tiếp theo[cite: 1]. | Student | Cần có[cite: 1] | CĐR 4.3[cite: 1] |

### Giai đoạn 4: Chấm chữa & Tương tác Giảng viên (Đầu Tuần 3 - Mốc 3)[cite: 1]

| Thứ tự | Mã YC | Tên chức năng / Màn hình | Mô tả chi tiết nghiệp vụ | Vai trò | Mức ưu tiên | CĐR |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: |
| 25 | **YCCN-25** | Hàng đợi bài chờ chấm (`/instructor/grading`) | Danh sách bài làm Speaking/Writing chờ chấm, sắp xếp theo thời gian[cite: 1]. | Instructor | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 26 | **YCCN-26** | Chấm Speaking theo Rubric | Nghe file audio học viên nộp, chấm điểm tiêu chí và thu âm nhận xét gửi kèm[cite: 1]. | Instructor | Bắt buộc[cite: 1] | CĐR 1.1[cite: 1] |
| 27 | **YCCN-27** | Chấm Writing & Sửa lỗi sai | Bôi đen văn bản sửa lỗi ngữ pháp/từ vựng kèm giải thích chi tiết[cite: 1]. | Instructor | Bắt buộc[cite: 1] | CĐR 1.1[cite: 1] |
| 28 | **YCCN-28** | Xem kết quả & Nhận xét (`/my-submissions`) | Học viên xem điểm số và nghe audio phản hồi; kiểm soát chống lộ IDOR[cite: 1]. | Student | Bắt buộc[cite: 1] | CĐR 1.1[cite: 1] |
| 29 | **YCCN-29** | Thông báo trong ứng dụng | Thông báo tự động cho học viên ngay khi bài tập được chấm điểm xong[cite: 1]. | Student | Cần có[cite: 1] | CĐR 4.1[cite: 1] |

### Giai đoạn 5: Quản trị, Thống kê & Bảo mật (Tuần 4 - Mốc 4)[cite: 1]

| Thứ tự | Mã YC | Tên chức năng / Màn hình | Mô tả chi tiết nghiệp vụ | Vai trò | Mức ưu tiên | CĐR |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: |
| 30 | **YCCN-30** | Quản lý người dùng (`/admin/users`) | Khóa/mở khóa tài khoản, phân quyền quản trị[cite: 1]. | Admin | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 31 | **YCCN-31** | Báo cáo Tiến độ & Phổ điểm | Biểu đồ trực quan tỷ lệ hoàn thành khóa học và phổ điểm bài thi[cite: 1]. | Instructor, Admin | Bắt buộc[cite: 1] | CĐR 4.1[cite: 1] |
| 32 | **YCCN-32** | Báo cáo Doanh thu & Xuất file | Thống kê số lượng ghi danh theo thời gian, trích xuất báo cáo ra CSV/Excel[cite: 1]. | Admin | Bắt buộc[cite: 1] | CĐR 1.1[cite: 1] |
| 33 | **YCCN-33** | Tra cứu Nhật ký hệ thống (`/admin/audit-logs`) | Xem nhật ký các hành vi: đăng nhập sai, khóa tài khoản, sửa điểm[cite: 1]. | Admin | Bắt buộc[cite: 1] | CĐR 1.1[cite: 1] |

---

# PHẦN IV. ĐẶC TẢ GIAO DIỆN VÀ ĐIỀU HƯỚNG FRONTEND THEO ROUTES

*   `/` (Trang chủ): Hero banner, danh sách khóa học nổi bật, cảm nhận học viên, footer có dòng chữ *"Dữ liệu mô phỏng phục vụ mục đích học tập"*[cite: 1].
*   `/about` (Giới thiệu): Sứ mệnh đào tạo, đội ngũ giáo viên, phương pháp học tiếng Anh đa phương tiện[cite: 1].
*   `/roadmaps` (Lộ trình học): Sơ đồ cây lộ trình chuẩn CEFR từ A1 đến IELTS[cite: 1].
*   `/courses` (Danh mục khóa học): Bộ lọc kỹ năng, trình độ, mức giá; phân trang danh sách khóa học[cite: 1].
*   `/courses/[courseSlug]` (Chi tiết khóa học): Video giới thiệu bài học, mục lục chương mục, danh sách đánh giá, nút ghi danh[cite: 1].
*   `/login` & `/register`: Form đăng nhập/đăng ký với cơ chế JWT kép, hỗ trợ Google OAuth[cite: 1].
*   `/dashboard`: Không gian học tập cá nhân, theo dõi chuỗi ngày học liên tục (Streak), thanh tiến độ các khóa học đang theo[cite: 1].
*   `/learn/[courseSlug]/lessons/[lessonId]`: Trình phát video bài học, hiển thị transcript song ngữ, khung ghi chú cá nhân theo mốc giây (timestamped notes), khung thảo luận Q&A[cite: 1].
*   `/learn/[courseSlug]/lessons/[lessonId]/practice`: Khu vực luyện tập tích hợp bộ thu âm Speaking (`MediaRecorder API`), trình soạn thảo Writing đếm từ tự động và bộ trắc nghiệm tự chấm điểm[cite: 1].
*   `/flashcards`: Không gian học từ vựng dạng thẻ lật 2 mặt tích hợp thuật toán SM-2[cite: 1].
*   `/my-submissions`: Lịch sử nộp bài và xem chi tiết lỗi sai, nghe audio nhận xét từ giảng viên[cite: 1].
*   `/instructor/courses`: Quản lý danh sách khóa học, tạo/sửa giáo trình theo chương mục[cite: 1].
*   `/instructor/grading`: Hàng đợi bài nộp chờ chấm, giao diện nghe audio Speaking và bôi đỏ/vàng sửa lỗi Writing theo thang điểm Rubric[cite: 1].
*   `/admin/dashboard`: Biểu đồ thống kê người dùng (DAU/MAU), biểu đồ doanh thu theo ngày/tháng[cite: 1].
*   `/admin/users`: Quản lý tài khoản, gán quyền RBAC, khóa tài khoản tạm thời[cite: 1].
*   `/admin/audit-logs`: Bảng tra cứu nhật ký kiểm toán hệ thống[cite: 1].

---

# PHẦN V. THIẾT KẾ CƠ SỞ DỮ LIỆU (`schema.sql`)

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Bảng Người dùng
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('STUDENT', 'INSTRUCTOR', 'ADMIN')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Khóa học
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    instructor_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    level VARCHAR(20) NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'IELTS')),
    price NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng Chương học (Modules)
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    order_index INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Bảng Bài học (Lessons)
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    video_url VARCHAR(500),
    content_text TEXT,
    lesson_type VARCHAR(20) NOT NULL CHECK (lesson_type IN ('VIDEO', 'PRACTICE', 'SPEAKING', 'WRITING')),
    order_index INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Bảng Ghi danh & Tiến độ (Enrollments)
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    progress_percent INT DEFAULT 0,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_course UNIQUE (user_id, course_id)
);

-- 6. Bảng Bài nộp thực hành Speaking / Writing (Submissions)
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    submission_type VARCHAR(20) NOT NULL CHECK (submission_type IN ('SPEAKING', 'WRITING', 'QUIZ')),
    content_text TEXT,
    audio_url VARCHAR(500),
    score NUMERIC(4, 1),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'GRADED')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Bảng Nhận xét & Chấm điểm chi tiết (Submission Feedbacks)
CREATE TABLE submission_feedbacks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    instructor_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    rubric_scores JSONB NOT NULL,
    feedback_text TEXT,
    audio_feedback_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Bảng Thẻ nhớ Từ vựng (Flashcard Reviews - Spaced Repetition)
CREATE TABLE flashcard_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    word VARCHAR(100) NOT NULL,
    phonetic VARCHAR(100),
    meaning TEXT NOT NULL,
    interval_days INT DEFAULT 1,
    repetition_count INT DEFAULT 0,
    ease_factor NUMERIC(4, 2) DEFAULT 2.50,
    next_review_at DATE DEFAULT CURRENT_DATE
);

-- Chỉ mục tối ưu hóa hiệu năng truy vấn nóng
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_lessons_module ON lessons(module_id, order_index);
CREATE INDEX idx_submissions_user_lesson ON submissions(user_id, lesson_id);
CREATE INDEX idx_flashcard_reviews_due ON flashcard_reviews(user_id, next_review_at);