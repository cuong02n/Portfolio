# Tài liệu dự án Portfolio

Bộ tài liệu kỹ thuật cho website portfolio cá nhân (Vite + React SPA, song ngữ
EN/VI, frontend hub đa-module).

## Mục lục

| Tài liệu | Nội dung |
|----------|----------|
| [architecture.md](./architecture.md) | Kiến trúc tổng thể, luồng khởi động, routing, cây thư mục, mô hình đa-module |
| [components.md](./components.md) | Mô tả từng component/trang và props |
| [phone-crawler.md](./phone-crawler.md) | Feature module phone-crawler: cấu trúc, env, admin token, hợp đồng API |
| [system-flow.md](./system-flow.md) | Feature module system-flow: bảng vẽ kiến trúc kéo-thả (React Flow), lưu localStorage |
| [i18n.md](./i18n.md) | Cách hoạt động đa ngôn ngữ và cách thêm/sửa chuỗi dịch |
| [styling.md](./styling.md) | Ba hệ thống CSS (Bootstrap, Tailwind, custom) + scope CSS module |
| [external-apis.md](./external-apis.md) | Tích hợp Codeforces, GitHub calendar, PDF resume |
| [personal-data.md](./personal-data.md) | Nơi hardcode thông tin cá nhân, cần sửa ở đâu khi cập nhật |
| [development.md](./development.md) | Setup, lệnh, env, build & deploy (Vite) |

## Tóm tắt nhanh

- **Stack**: Vite 5 + React 18, React Router v6, react-i18next,
  Bootstrap + Tailwind + CSS custom, recharts, react-tsparticles, react-pdf,
  lucide-react.
- **Trang portfolio**: Home (`/`), About (`/about`), Projects (`/project`),
  Resume (`/resume`).
- **Feature modules** (demo chạy thật): `/projects/<slug>/*` — hiện có
  phone-crawler (`/projects/phone-crawler`), gọi backend riêng qua env URL; và
  system-flow (`/projects/system-flow`), thuần frontend lưu localStorage.
- **Không có backend trong repo** — portfolio gọi public API Codeforces/GitHub;
  module gọi backend riêng (FastAPI/PostgreSQL) qua CORS.
- **Deploy**: build tĩnh (Vite → `/build`), phục vụ tại
  `https://portfolio.cuong02.com` / Vercel.
