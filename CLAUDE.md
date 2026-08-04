# CLAUDE.md

Hướng dẫn cho Claude Code khi làm việc trong repo này.

## Tổng quan

Website portfolio cá nhân của **Nguyễn Mạnh Cường** (Manh Cuong Nguyen), một
Java backend developer. Đây là Single Page Application xây bằng **Vite + React
18**, hỗ trợ song ngữ Anh/Việt, deploy tại `https://portfolio.cuong02.com` (và
trên Vercel).

Đây là **frontend hub đa-module**: portfolio là một frontend repo duy nhất, mỗi
"project" có demo chạy thật được nhúng làm **feature module** dưới
`/projects/<slug>/*`. Module có thể gọi tới **backend riêng** qua URL tuyệt đối
cấu hình bằng biến môi trường, hoặc **thuần frontend** (lưu localStorage). Hiện có:
- **phone-crawler** (`/projects/phone-crawler`) — gọi backend FastAPI/PostgreSQL
  riêng qua env URL. Xem [`docs/phone-crawler.md`](./docs/phone-crawler.md).
- **system-flow** (`/projects/system-flow`) — bảng vẽ kiến trúc hệ thống kéo-thả
  bằng React Flow, thuần frontend, lưu localStorage. **Route gốc mở thẳng editor
  (sơ đồ)** — cả `/projects/system-flow` và `…/board` đều render board; `?company=
  <id>` chọn sẵn công ty. Click node mở popup chi tiết tại con trỏ. (Component
  `SystemFlowLanding.jsx` vẫn còn trong repo nhưng **không còn là entry** — đã bỏ
  bước landing "Open the board".) Xem [`docs/system-flow.md`](./docs/system-flow.md).

Phần portfolio bắt nguồn từ template của Soumyajit Behera (còn sót vài đoạn
code/comment gốc) nhưng đã tùy biến nội dung + thêm i18n, biểu đồ Codeforces,
language picker.

> Lịch sử: repo từng là Create React App (React 17) và đã được migrate sang
> Vite + React 18 — xem [`docs/development.md`](./docs/development.md).

## Lệnh thường dùng

```bash
npm install      # cài dependencies (lần đầu)
npm run dev      # chạy dev server tại http://localhost:3000 (npm start cũng được)
npm run build    # build production tĩnh vào /build
npm run preview  # xem thử bản build
```

Không có test runner / lint script riêng. Không dùng TypeScript — toàn bộ là
JS/JSX. **JSX phải nằm trong file `.jsx`** (Vite + @vitejs/plugin-react xử lý
automatic runtime); file `.js` chỉ chứa JS thuần (api builders, i18n, helpers).

## Kiến trúc

- **Entry**: `index.html` (gốc repo) → `src/index.jsx` (`createRoot`), import
  toàn bộ CSS font (`@fontsource/*`); `i18n` nạp gián tiếp.
- **Routing**: `src/App.jsx` dùng `react-router-dom` v6:
  `/` (Home), `/about`, `/project` (Projects), `/resume`, và các feature module
  `/projects/phone-crawler/*`, `/projects/system-flow/*`. Route không khớp redirect `/`.
  Navbar của portfolio **bị ẩn** trên route demo (`/projects/*`). Preloader 1.2s.
- **Portfolio components**: theo từng trang trong `src/components/<Page>/`.
- **Feature modules**: `src/features/<slug>/` — app con tự chứa, mount dưới
  `/projects/<slug>/*` qua nested routes tương đối; CSS scope dưới một class gốc
  để không đụng style portfolio.
- **Registry**: `src/config/projects.js` khai báo các project có demo live.
- **Shared**: `src/shared/` dùng chung giữa portfolio và modules (vd
  `adminToken.js`).
- **i18n**: `src/Assets/lang/i18n.js` chứa TẤT CẢ chuỗi dịch (en + vi). Ngôn ngữ
  lưu ở `localStorage['language']`.
- **API portfolio**: `src/api/CodeforcesApi.js` (+ bản trùng `api.js`) build URL
  Codeforces public. Backend của feature module nằm trong từng module
  (`features/<slug>/api.js`), gọi qua env URL — không cùng origin.

Chi tiết hơn xem thư mục [`docs/`](./docs/).

## Quy ước & lưu ý quan trọng

- **Mọi chuỗi hiển thị phải qua i18n.** Khi thêm/sửa text UI, thêm key vào
  CẢ HAI khối `en` và `vi` trong `src/Assets/lang/i18n.js`, rồi dùng `t('Key')`.
  Đừng hardcode text tiếng Anh/Việt trực tiếp trong JSX.
- **Trang Projects (`/project`)** là layout **master-detail**: cột **tab dọc bên
  trái** + **panel demo ở giữa/phải**. Bấm tab → panel **nhúng thẳng demo qua
  `<iframe>`** route full-screen (Navbar portfolio **tự ẩn trên `/projects/*`**
  nên iframe không lồng lại portfolio). **Summary ẩn mặc định**, nằm trong
  **dropdown** xổ dưới tiêu đề. System-flow nhúng bằng `…/board?company=<id>`.
  Component cũ `ProjectCards.jsx` không còn dùng ở đây nhưng vẫn giữ lại để tham khảo.
- **Styling trộn 3 hệ**: Bootstrap/react-bootstrap (layout `Container/Row/Col`,
  `Button`, `Card`), Tailwind (chủ yếu ở `CodeforcesRatingChart`), và CSS custom
  (`src/style.css`, `App.css`, `index.css`). Class `.purple` là màu nhấn chủ đạo.
  Khi sửa giao diện, ưu tiên theo phong cách của component đang sửa.
- **⚠️ Bẫy Tailwind × Bootstrap `.collapse`**: Bootstrap dùng `.collapse` cho menu
  Navbar; Tailwind cũng có utility `.collapse { visibility: collapse }`. Tailwind
  quét `src/**/*.{js,jsx,...}` nên **chỉ cần chữ `collapse` đứng riêng trong code
  (kể cả comment)** là nó sinh utility đè Bootstrap → **ẩn toàn bộ nav links cả
  site**. Đã chặn bằng `blocklist: ["collapse"]` trong `tailwind.config.js`; đừng
  gỡ. Tránh viết token `collapse` trần trong source.
- **Thông tin cá nhân hardcode** (handle Codeforces `cuong2905say`, GitHub
  username `cuong02n`, email, SĐT, link project) nằm rải trong các component —
  xem [`docs/personal-data.md`](./docs/personal-data.md) để biết vị trí khi cần
  cập nhật.
- **Assets** (ảnh project, avatar, PDF resume) ở `src/Assets/`. Resume là file
  PDF tĩnh `src/Assets/Resume_CuongNguyenManh.pdf`.
- File `src/api/api.js` và `src/api/CodeforcesApi.js` giống hệt nhau; component
  thực tế import từ `CodeforcesApi.js`.
- `src/utils/ratingColor.js` và `src/components/About/RatingColor.js` cũng trùng
  nội dung; `CodeforcesRatingChart` import bản trong thư mục `About`.

## Thêm / sửa feature module (project demo)

- Mỗi module sống trong `src/features/<slug>/`, tự chứa (api, hooks, pages, css)
  và mount tại `/projects/<slug>/*` trong `src/App.jsx`.
- **Backend qua env tuyệt đối**: dùng `import.meta.env.VITE_*` (không same-origin,
  không hardcode). Khai báo trong `.env.example`. Hiện có: `VITE_CRAWLER_API`,
  `VITE_CRAWLER_WS`.
- **CSS scope**: bọc UI module trong một class gốc (vd `.crawler-scope`) và
  prefix mọi selector — tránh đụng Bootstrap/Tailwind/CSS portfolio (đặc biệt các
  class generic như `.btn`, `.card`, `.badge`).
- **Routing nội bộ**: dùng path tương đối (không leading `/`) + `navigate('../x')`
  để hoạt động dưới base `/projects/<slug>`.
- **Quyền ghi**: nếu module gọi API ghi/nhạy cảm, dùng `src/shared/adminToken.js`;
  khách không token = chỉ xem.
- Đăng ký vào `src/config/projects.js` và (tuỳ chọn) thêm card vào trang Projects
  với prop `internalLink` của `ProjectCard`.
- **Viết docs**: mỗi module mới phải có `docs/<slug>.md` (cấu trúc, dữ liệu,
  routing, env/lưu trữ) và thêm dòng vào `docs/README.md` + danh sách module ở
  đầu `CLAUDE.md`.

## Khi sửa code

- Match style của file xung quanh (indent, cách đặt tên, mức comment).
- Không tự ý chạy `npm run eject` (không thể đảo ngược).
- **LUÔN cập nhật tài liệu khi đổi hành vi/cấu trúc**: sửa `CLAUDE.md` và file
  liên quan trong `docs/` (vd thêm tính năng, đổi route, thêm dependency, đổi
  quy ước). Tài liệu phải khớp với code — coi đây là một phần của thay đổi, không
  phải việc làm sau.
- Trước khi commit/push hãy hỏi người dùng; nhánh chính là `master`.
