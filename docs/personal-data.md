# Dữ liệu cá nhân — vị trí cần sửa

Thông tin cá nhân **đã được gom về `src/data/`** (trước đây rải rác trong nhiều
component). Muốn đổi thông tin thì sửa đúng một chỗ.

## Bảng tra nhanh

| Thông tin | Giá trị hiện tại | Nơi khai báo |
|-----------|------------------|--------------|
| Tên (hiển thị, song ngữ) | Nguyen Manh Cuong / Nguyễn Mạnh Cường | `src/Assets/lang/i18n.js` — key `profile.name` |
| Vai trò | Backend Engineer | i18n — key `profile.role` |
| Địa điểm | Hanoi, Vietnam | i18n — key `profile.location` |
| Email | `hi@cuong02.com` | `src/data/profile.js` → `PROFILE.email` |
| Số điện thoại | `+84 335 652 578` | `src/data/profile.js` → `PROFILE.phone` / `phoneHref` |
| GitHub | `cuong02n` | `src/data/profile.js` → `PROFILE.github` / `githubUrl` |
| Codeforces | `cuong2905say` | `src/data/profile.js` → `PROFILE.codeforces` / `codeforcesUrl` |
| Stack Overflow | users/23725389/… | `src/data/profile.js` → `PROFILE.stackoverflowUrl` |
| Domain / site | `cuong02.com`, `https://portfolio.cuong02.com` | `src/data/profile.js` → `PROFILE.domain` / `site` |
| Số liệu hero (3+, 1M+, 13, 3.65) | — | `src/data/profile.js` → `STATS` |
| Dòng chữ gõ ở hero | — | `src/data/profile.js` → `TYPED_ROLE_KEYS` + i18n `typed.*` |
| Lịch sử công việc | 4 mục | `src/data/experience.js` → `EXPERIENCE` + i18n `exp.*` |
| Học vấn | HUST 2020–2024 | `src/data/experience.js` → `EDUCATION` + i18n `edu.*` |
| Chứng chỉ | OCA 1Z0-808, Codeforces, TOEIC | `src/data/experience.js` → `CERTIFICATIONS` + i18n `cert.*` |
| Tech stack | 10 nhóm | `src/data/skills.js` → `SKILL_GROUPS`, `CORE_STACK` |
| Danh sách dự án | 11 mục | `src/data/projects.js` → `PROJECTS`, `LIVE_DEMOS` |
| File CV (PDF) | `Resume_CuongNguyenManh.pdf` | `src/Assets/` — import trực tiếp trong `Hero.jsx`, `About.jsx`, `Resume.jsx` |
| Tiêu đề trang, meta SEO, JSON-LD | — | `index.html` (gốc repo) |
| Avatar | `avatar.webp` | `src/Assets/` — dùng trong `About.jsx` |

> `index.html` chứa bản sao của một số giá trị (email, URL, handle) trong khối
> JSON-LD `Person`. Đổi thông tin liên hệ thì **cập nhật cả hai nơi**.

## Danh sách project

Định nghĩa trong `src/data/projects.js`; nội dung text ở `src/Assets/lang/i18n.js`
(`proj.<id>.title` / `proj.<id>.desc`).

| Project | Loại | Link |
|---------|------|------|
| NEXUSTI DCMS — collection platform | `work` | demo nội bộ (system-flow) |
| Phone number crawler | `live` | `/projects/phone-crawler` |
| System Flow board | `live` | `/projects/system-flow` + GitHub |
| Streaming Excel export library | `work` | (private) |
| Class registration backend | `oss` | github.com/cuong02n/eHust-class-registration-java-backend |
| Real-time PvP game backend | `work` | (private) |
| Food ordering platform | `work` | (private) |
| Sudoku for Android | `oss` | Google Play (`com.cuong02n.sudoku2905`) |
| CodeArena | `oss` | github.com/cuong02n/CodeArena |
| Self-hosted infrastructure | `infra` | portfolio.cuong02.com |
| This portfolio | `oss` | github.com/cuong02n/Portfolio |

### Thêm project mới

1. Thêm entry vào `PROJECTS` trong `src/data/projects.js` (chọn `icon` từ
   `react-icons`, `kind`, `period`, `tags`, `links`).
2. Thêm `proj.<id>.title` và `proj.<id>.desc` vào **cả `en` và `vi`** trong
   `src/Assets/lang/i18n.js`.
3. Chạy `npm run check:i18n`.
4. Nếu project có demo chạy trong app: thêm feature module dưới
   `src/features/<slug>/`, đăng ký route trong `src/App.jsx` và
   `src/config/projects.js`, rồi thêm tab vào `LIVE_DEMOS`.

## Ảnh & assets cá nhân

- Avatar: `src/Assets/avatar.webp` (+ `avatar.svg`).
- Preloader: `src/Assets/pre.svg`.
- Favicon: `public/favicon.png`.
- CV: `src/Assets/Resume_CuongNguyenManh.pdf`; nguồn LaTeX ở `public/resume/`.
- `src/Assets/Projects/*`, `about.png`, `home-bg.jpg`, `home-main.svg`,
  `logo.png` là ảnh còn lại từ giao diện cũ, **hiện không component nào dùng**.
