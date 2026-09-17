# HỆ THỐNG THIẾT KẾ GIAO DIỆN & TRẢI NGHIỆM NGƯỜI DÙNG (UI/UX DESIGN SYSTEM)
**Dự án:** Smart English LMS
**Phong cách:** Tươi sáng, năng động, trẻ trung (Inspire by Prep.vn)
**Mục tiêu:** Đảm bảo tính nhất quán (consistency) toàn hệ thống và đáp ứng tiêu chuẩn trợ năng WCAG 2.1 AA[cite: 1].
**Công cụ CSS khuyến nghị:** Tailwind CSS.

---

## 1. HỆ THỐNG MÀU SẮC (COLOR PALETTE)

Tất cả màu sắc phải đảm bảo tỷ lệ tương phản tối thiểu 4.5:1 đối với văn bản thường và nền theo chuẩn WCAG 2.1 AA[cite: 1].

### 1.1. Màu Thương hiệu (Brand Colors)
Mang lại cảm giác tươi mới, nhiều năng lượng, thúc đẩy cảm hứng học tập.
*   **Primary (Xanh Lơ / Cerulean Blue):** 
    *   Base (`primary-600`): `#0284C7` (Sky 600) — Đủ đậm để chữ trắng bên trên đạt chuẩn tương phản AA[cite: 1].
    *   Hover (`primary-700`): `#0369A1` (Sky 700)
    *   Light/Background (`primary-50`): `#F0F9FF` (Nền xanh cực nhạt, rất trong trẻo)
*   **Secondary (Vàng Cam / Amber - Điểm nhấn, Nút CTA, Gamification):**
    *   Base (`secondary-500`): `#F59E0B` (Amber 500)
    *   Hover (`secondary-600`): `#D97706` (Amber 600)
    *   Text (`secondary-700`): `#B45309` (Dùng khi cần viết chữ màu cam trên nền trắng để đảm bảo dễ đọc[cite: 1])

### 1.2. Màu Trạng thái (Semantic Colors)
*   **Success (Xanh Ngọc / Emerald - Chấm điểm đúng, Hoàn thành bài):** 
    *   Base (`success-600`): `#059669` (Emerald 600)
    *   Bg Light (`success-50`): `#ECFDF5`
*   **Error / Danger (Đỏ Hồng / Rose - Trả lời sai, Cảnh báo lỗi):**
    *   Base (`error-600`): `#E11D48` (Rose 600 - Tươi hơn màu đỏ thuần)
    *   Bg Light (`error-50`): `#FFF1F2`
*   **Warning (Vàng Tươi - Đợi chấm điểm):**
    *   Base (`warning-500`): `#EAB308` (Yellow 500)

### 1.3. Màu Trung tính (Neutral / Grayscale)
*   **Text Primary (Chữ chính):** `#1E293B` (Slate 800 - Có ánh xanh nhẹ, hợp với màu Primary hơn là đen thuần)
*   **Text Secondary (Chữ phụ, Placeholder):** `#64748B` (Slate 500)
*   **Borders (Đường viền):** `#E2E8F0` (Slate 200)
*   **Background (Nền ứng dụng ngoài cùng):** `#F8FAFC` (Slate 50)
*   **Surface (Nền Card/Modal):** `#FFFFFF` (White)

---

## 2. HỆ THỐNG FONT CHỮ (TYPOGRAPHY)

*   **Font gia đình (Font Family):** Ưu tiên sử dụng `Quicksand` hoặc `Nunito` cho các Tiêu đề (Headings) để tạo nét bo tròn, thân thiện, trẻ trung. Dùng `Roboto` hoặc `Inter` cho văn bản thường (Body text) để đảm bảo độ nét và tuân thủ quy cách đồ án[cite: 1].
*   **Tỷ lệ giãn dòng (Line Height):** `1.5` cho văn bản thường, `1.2` cho tiêu đề.

### Các Kích Cỡ Tiêu Chuẩn:
| Loại chữ | Kích thước (px/rem) | Độ đậm (Weight) | Màu sắc khuyên dùng | Mục đích sử dụng |
| :--- | :--- | :--- | :--- | :--- |
| **H1 (Tiêu đề trang)** | 32px (`2rem`) | ExtraBold (800) | `Slate-800` | Tiêu đề màn hình chính (Vd: Tên khóa học) |
| **H2 (Tiêu đề mục)** | 24px (`1.5rem`) | Bold (700)| `Slate-800` | Tiêu đề các section (Vd: Mục lục bài học) |
| **H3 (Tiêu đề Card)** | 18px (`1.125rem`)| SemiBold (600) | `Slate-800` | Tên bài học trong danh sách, Tiêu đề form |
| **Body (Chữ thường)** | 16px (`1rem`) | Normal (400) | `Slate-700` | Đoạn văn bản lý thuyết, Đề bài |
| **Small (Chữ nhỏ)** | 14px (`0.875rem`)| Normal (400) | `Slate-500` | Ghi chú, Thời gian, Badge, Chân trang |

---

## 3. HỆ THỐNG LƯỚI & PHÂN KHỐI BỐ CỤC (GRID & LAYOUT)

Bố cục mang phong cách "Card-based" (thẻ nổi) với nhiều khoảng trắng (White-space) để tạo cảm giác thoáng đãng, không bị ngợp chữ.

### 3.1. Container & Khung màn hình
*   **Max-width (Giao diện Public/Trang chủ):** `1200px`, căn giữa màn hình (`margin: 0 auto`).
*   **Max-width (Giao diện Học tập/Làm bài):** 
    *   Cột Sidebar (Mục lục): Chiếm `300px`. Nền trắng, có viền mỏng.
    *   Khu vực Content chính: Tối đa `850px` để văn bản không bị quá dài gây mỏi mắt.
*   **Giao diện Mobile:** Đảm bảo responsive 100% (sidebar tự động ẩn thành Hamburger Menu). Cấu trúc linh hoạt hiển thị đúng trên thiết bị di động[cite: 1].

### 3.2. Padding & Margin tiêu chuẩn
*   **Padding trong Card/Modal:** Mặc định `24px` (`p-6`) để tạo độ thở.
*   **Khoảng cách giữa các phần (Sections):** `48px` (`gap-12`).

---

## 4. THÀNH PHẦN GIAO DIỆN (UI COMPONENTS)

Các góc bo (Border Radius) được làm to hơn (`12px` đến `16px`) để tạo nét mềm mại, hiện đại.

### 4.1. Nút bấm (Buttons)
Các nút bấm phải có vùng nhấp (click area) tối thiểu `44x44px` trên mobile và có chỉ báo Focus rõ ràng khi dùng phím Tab (chuẩn WCAG[cite: 1]).
*   **Primary Button:** Nền `Primary-600` (`#0284C7`), Chữ Trắng, Bo góc `12px` (`rounded-xl`), có đổ bóng nhẹ `shadow-sm`. 
*   **Secondary/CTA Button:** Nền `Secondary-500` (`#F59E0B`), Chữ Trắng. Dùng cho nút "Mua khóa học" hoặc "Làm bài ngay" để hút mắt.
*   **Outline Button:** Nền Trắng, Viền `Slate-300`, Chữ `Slate-700`. Bo góc `12px`.
*   **Trạng thái Disabled:** Độ mờ `opacity-50`, đổi con trỏ thành `cursor-not-allowed`.

### 4.2. Biểu mẫu & Ô nhập liệu (Forms & Inputs)
Mọi ô input phải có thẻ `<label>` đi kèm hoặc thuộc tính `aria-label` để hỗ trợ trình đọc màn hình[cite: 1].
*   **Trạng thái bình thường:** Viền `Slate-200`, Chữ `Slate-800`, Nền `White`. Bo góc `12px`.
*   **Trạng thái Focus (Đang nhập):** Viền đổi thành `Primary-500`, xuất hiện viền sáng ngoài (Ring) `ring-4 ring-primary-100` (đổ bóng màu xanh nhạt rất đẹp).
*   **Trạng thái Lỗi (Validation Error):** Viền đổi thành `Error-600`. Dòng text báo lỗi màu `Error-600` kèm Icon ⚠️ hiển thị ngay bên dưới.

### 4.3. Thẻ nội dung (Cards)
Sử dụng để hiển thị Khóa học, Bài học, hoặc Bảng điểm.
*   **Border & Shadow:** Bo góc lớn `16px` (`rounded-2xl`), không dùng viền hoặc viền cực mỏng `border-slate-100`, Đổ bóng mềm `shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]`.
*   **Tương tác (Hover):** Dịch chuyển lên `transform -translate-y-1` và tăng bóng đổ `shadow-lg` kèm hiệu ứng transition mượt `duration-300`.

### 4.4. Nhãn trạng thái (Badges)
Dùng để hiển thị trạng thái của Bài nộp hoặc Cấp độ khóa học (Thường thiết kế dạng viên thuốc - Pill shape).
*   **Level (A1/IELTS):** Nền `Primary-50`, Chữ `Primary-700`, Bo góc `rounded-full`, Text `12px` font Bold.
*   **Pending (Chờ chấm):** Nền `Warning-50`, Chữ `Warning-700`.
*   **Graded (Đã chấm):** Nền `Success-50`, Chữ `Success-700`.

---

## 5. TIÊU CHUẨN KHẢ NĂNG TRUY CẬP (ACCESSIBILITY - WCAG 2.1 AA)

Để đáp ứng Mục 6 tại Phụ lục 09 của yêu cầu đồ án[cite: 1], giao diện phải bắt buộc tuân thủ:

1.  **Chỉ báo Tiêu điểm (Focus Indicators):** Bất kỳ thành phần nào có thể tương tác (A, BUTTON, INPUT) khi được điều hướng tới bằng phím `Tab` phải có viền bao quanh (outline) rõ ràng (Vd: `focus:ring-4 focus:ring-primary-200`)[cite: 1].
2.  **Độ tương phản (Contrast Ratio):** Tuyệt đối không dùng chữ xám nhạt trên nền trắng. Màu chữ nhạt nhất cho phép là `Slate-500` (tương phản 4.5:1 so với nền trắng)[cite: 1].
3.  **Văn bản thay thế (Alt Text):** Mọi hình ảnh (Banner, Thumbnail khóa học) đều phải có thuộc tính `alt="Mô tả ảnh"`[cite: 1].
4.  **Cấu trúc thẻ (Semantic HTML):** 
    *   Thanh điều hướng phải dùng `<nav>`.
    *   Phần nội dung chính phải nằm trong `<main>`.
    *   Khu vực footer trang chủ chứa dòng "Dữ liệu mô phỏng phục vụ mục đích học tập" phải dùng thẻ `<footer>`[cite: 1].