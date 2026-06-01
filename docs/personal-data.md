# Dữ liệu cá nhân — vị trí cần sửa

Thông tin cá nhân được **hardcode rải rác** trong code (không tập trung 1 file).
Bảng dưới giúp tìm đúng chỗ khi cần cập nhật.

| Thông tin | Giá trị hiện tại | File |
|-----------|------------------|------|
| Tên hiển thị | Manh Cuong Nguyen / Nguyễn Mạnh Cường | `src/Assets/lang/i18n.js` (key `Name`) |
| Địa chỉ | Đông Anh, Hà Nội | `src/Assets/lang/i18n.js` (key `Address`) |
| Tiêu đề trang | Nguyễn Mạnh Cường \| Portfolio | `public/index.html` |
| Handle Codeforces | `cuong2905say` | `src/components/About/About.js` (prop `username`) |
| GitHub username | `cuong02n` | `src/components/About/Github.js`, `Navbar.js`, `Home2.js` |
| Email | `hi@cuong02.com` | `src/components/Home/Home2.js`; key `Domain Owner Description` trong `i18n.js` |
| Số điện thoại | `+84335652578` | `src/components/Home/Home2.js` |
| Stack Overflow | users/23725389/... | `src/components/Home/Home2.js` |
| Domain portfolio | `https://portfolio.cuong02.com` | key `Domain Owner Description` trong `i18n.js` |
| File CV (PDF) | `Resume_CuongNguyenManh.pdf` | `src/Assets/`, import trong `ResumeNew.js` |

## Danh sách project (trang Projects)

Định nghĩa trong `src/components/Projects/Projects.js`; nội dung text trong
`src/Assets/lang/i18n.js`.

| Project | Link GitHub / Demo |
|---------|--------------------|
| Food Ordering Web Tool | (private) |
| Game Backend Development | (private) |
| Personal Portfolio Website | github.com/cuong02n/portfolio |
| CodeArena | github.com/cuong02n/CodeArena |
| Class Registration System | github.com/cuong02n/eHust-class-registration-java-backend |
| Tracking Private Data | (private) |
| Android Sudoku Game | Google Play (com.cuong02n.sudoku2905) |
| Domain Owner | (info card) |

Thêm project mới:
1. Thêm ảnh thumbnail vào `src/Assets/Projects/`.
2. Thêm key `title` + `description` (cả `en` và `vi`) vào `i18n.js`.
3. Thêm một `<Col><ProjectCard .../></Col>` trong `Projects.js`.

## Ảnh & assets cá nhân

- Avatar: `src/Assets/avatar.webp` (+ `avatar.svg`).
- Ảnh nền/hero: `src/Assets/home-main.svg`, `home-bg.jpg`, `about.png`.
- Thumbnail project: `src/Assets/Projects/*`.
- Favicon: `public/favicon.png`.
