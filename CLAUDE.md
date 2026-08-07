# CLAUDE.md

Hướng dẫn cho Claude Code khi làm việc trong repo này.

## Tổng quan

Website portfolio cá nhân của **Nguyễn Mạnh Cường** (Nguyen Manh Cuong), một
**backend engineer** (Java / Spring Boot / PostgreSQL / Kafka / Kubernetes). Đây
là Single Page Application xây bằng **Vite + React 18**, hỗ trợ song ngữ Anh/Việt,
deploy tại `https://portfolio.cuong02.com` (và trên Vercel).

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
  `SystemFlowLanding.jsx` vẫn còn trong repo nhưng **không còn là entry**.)
  Xem [`docs/system-flow.md`](./docs/system-flow.md).

> Lịch sử: repo từng là Create React App (React 17) → migrate sang Vite + React
> 18 → **viết lại toàn bộ phần portfolio (2026)**: lớp dữ liệu `src/data/`,
> design system `pf-*`, trang `/stack`, code-splitting, SEO. Mọi dấu vết của
> template gốc (Soumyajit Behera) đã được gỡ. Xem
> [`docs/development.md`](./docs/development.md).

## Lệnh thường dùng

```bash
npm install         # cài dependencies (lần đầu)
npm run dev         # dev server tại http://localhost:3000 (npm start cũng được)
npm run build       # build production tĩnh vào /build
npm run preview     # xem thử bản build
npm run check:i18n  # kiểm tra key i18n đủ ở cả en + vi, không có key chết
```

Không có test runner / lint script. `check:i18n` là kiểm tra tự động duy nhất —
**chạy sau mỗi lần thêm/sửa chuỗi hiển thị**. Không dùng TypeScript — toàn bộ là
JS/JSX. **JSX phải nằm trong file `.jsx`** (Vite + @vitejs/plugin-react xử lý
automatic runtime); file `.js` chỉ chứa JS thuần (data, api builders, i18n, helpers).

## Kiến trúc

- **Entry**: `index.html` (gốc repo, kèm meta SEO + JSON-LD `Person`) →
  `src/index.jsx`.
  ⚠️ **Thứ tự import trong `src/index.jsx` là thứ tự nạp CSS**: `index.css`
  (Tailwind preflight) phải import **trước** `App` (kéo theo `style.css`), nếu
  không preflight sẽ đè lên design system.
- **Routing**: `src/App.jsx` dùng `react-router-dom` v6:
  `/` (Home), `/about`, `/stack`, `/project` (Projects), `/resume`, và các feature
  module `/projects/phone-crawler/*`, `/projects/system-flow/*`. Route không khớp
  redirect `/`. **Navbar + Footer bị ẩn** trên route demo (`/projects/*`).
  Preloader 0.9s.
- **Code-splitting**: chỉ `Home` nằm trong entry chunk; About / Stack / Projects /
  Resume / hai feature module / `CodeforcesRatingChart` đều `React.lazy` trong
  `<Suspense>` (fallback `components/ui/Fallback.jsx`).
- **Lớp dữ liệu** (`src/data/`) — **nguồn sự thật của mọi nội dung**:
  `profile.js` (danh tính, liên hệ, số liệu hero), `experience.js` (công việc /
  học vấn / chứng chỉ, khớp CV), `skills.js` (10 nhóm công nghệ), `projects.js`
  (demo live + danh mục dự án). File data chỉ chứa **danh từ riêng + giá trị ổn
  định**; câu chữ nằm ở i18n và được tham chiếu qua trường hậu tố `Key`.
  Xem [`docs/data-layer.md`](./docs/data-layer.md).
- **Portfolio components**: theo từng trang trong `src/components/<Page>/`; phần
  dùng chung ở `src/components/Layout/` và `src/components/ui/`.
- **Feature modules**: `src/features/<slug>/` — app con tự chứa, mount dưới
  `/projects/<slug>/*` qua nested routes tương đối; CSS scope dưới một class gốc.
- **Registry**: `src/config/projects.js` khai báo route của các project có demo live
  (phần *hiển thị* nằm ở `src/data/projects.js`).
- **Shared**: `src/shared/` dùng chung giữa portfolio và modules (vd `adminToken.js`).
- **i18n**: `src/Assets/lang/i18n.js` chứa TẤT CẢ chuỗi dịch (en + vi).
- **API portfolio**: `src/api/CodeforcesApi.js`. Backend của feature module nằm
  trong từng module (`features/<slug>/api.js`), gọi qua env URL — không cùng origin.

Chi tiết hơn xem thư mục [`docs/`](./docs/).

## Quy ước & lưu ý quan trọng

- **Nội dung là dữ liệu, không phải JSX.** Thêm kỹ năng / công việc / dự án →
  sửa `src/data/*`, đừng hardcode danh sách trong component.
- **Mọi chuỗi hiển thị phải qua i18n.** Thêm key vào CẢ HAI object `en` và `vi`
  trong `src/Assets/lang/i18n.js`, rồi dùng `t('some.key')`. Chạy
  `npm run check:i18n` để xác nhận.
  - Key là **chuỗi phẳng có dấu chấm** (`hero.cta.resume`). i18n đã đặt
    `keySeparator: false` / `nsSeparator: false` — **đừng bật lại**, sẽ hỏng toàn
    bộ tra cứu.
  - **Danh từ riêng không dịch**: tên công nghệ, tên công ty, email, URL, mốc
    thời gian — để thẳng trong `src/data/`.
- **Styling: design system `pf-*` trong `src/style.css`.** Bootstrap và
  react-bootstrap **đã gỡ bỏ**. Class mới phải mang tiền tố `pf-`; màu dùng token
  `--pf-accent` / `--pf-accent-2` / `--pf-grad`, không hardcode mã màu mới.
  Section mới → `<section className="pf-container pf-section">` + `SectionHead`.
  Tailwind **chỉ còn dùng trong `CodeforcesRatingChart.jsx`**.
- **⚠️ Bẫy Tailwind `.collapse`**: Tailwind quét `src/**/*.{js,jsx,...}` nên chỉ
  cần chữ `collapse` đứng riêng trong code (kể cả comment) là nó sinh utility
  `.collapse { visibility: collapse }`. Đã chặn bằng `blocklist: ["collapse"]`
  trong `tailwind.config.js` — **đừng gỡ**, và tránh viết token `collapse` trần.
- **Trang Projects (`/project`)** có hai phần: (1) **demo chạy thật** — tab dọc
  bên trái + panel nhúng `<iframe>` route full-screen (Navbar/Footer tự ẩn trên
  `/projects/*` nên iframe không lồng lại portfolio); summary ẩn mặc định trong
  dropdown; (2) **toàn bộ danh mục** — lọc theo `KIND` + lưới `ProjectCard`.
- **Trang Stack (`/stack`)** render `SKILL_GROUPS` với chú giải 3 mức
  (`core` / `working` / `familiar`) và bộ lọc theo nhóm. Nhóm `devops` có
  `featured: true` → chiếm 2 cột trên màn rộng.
  - **Không thêm công nghệ chưa từng dùng thật.** Trường `note` phải nêu được
    service / pipeline / môi trường cụ thể đứng sau nó.
- **Thông tin cá nhân** gom trong `src/data/profile.js` (+ bản sao trong khối
  JSON-LD của `index.html` — sửa thì sửa cả hai). Xem
  [`docs/personal-data.md`](./docs/personal-data.md).
- **Bảo mật/riêng tư**: thẻ terminal ở hero (`components/Home/Terminal.jsx`) và
  mọi nội dung liên quan tới công việc phải **giữ ở mức chung chung** — không
  hostname, IP, tên service nội bộ nhạy cảm, và tuyệt đối không credential.
- **Assets** ở `src/Assets/`. Resume là file PDF tĩnh
  `src/Assets/Resume_CuongNguyenManh.pdf` — cập nhật CV thì đồng bộ luôn
  `src/data/experience.js`.

## Thêm / sửa feature module (project demo)

- Mỗi module sống trong `src/features/<slug>/`, tự chứa (api, hooks, pages, css)
  và mount tại `/projects/<slug>/*` trong `src/App.jsx` (nhớ dùng `React.lazy`).
- **Backend qua env tuyệt đối**: dùng `import.meta.env.VITE_*` (không same-origin,
  không hardcode). Khai báo trong `.env.example`. Hiện có: `VITE_CRAWLER_API`,
  `VITE_CRAWLER_WS`.
- **CSS scope**: bọc UI module trong một class gốc (vd `.crawler-scope`) và
  prefix mọi selector — tránh đụng CSS portfolio (đặc biệt selector theo tên thẻ).
- **Routing nội bộ**: dùng path tương đối (không leading `/`) + `navigate('../x')`
  để hoạt động dưới base `/projects/<slug>`.
- **Quyền ghi**: nếu module gọi API ghi/nhạy cảm, dùng `src/shared/adminToken.js`;
  khách không token = chỉ xem.
- Đăng ký route vào `src/config/projects.js`, thêm entry vào `PROJECTS` (và
  `LIVE_DEMOS` nếu muốn nhúng) trong `src/data/projects.js`.
- **Viết docs**: mỗi module mới phải có `docs/<slug>.md` (cấu trúc, dữ liệu,
  routing, env/lưu trữ) và thêm dòng vào `docs/README.md` + danh sách module ở
  đầu `CLAUDE.md`.

## Khi sửa code

- Match style của file xung quanh (indent, cách đặt tên, mức comment).
- **LUÔN cập nhật tài liệu khi đổi hành vi/cấu trúc**: sửa `CLAUDE.md` và file
  liên quan trong `docs/` (vd thêm tính năng, đổi route, thêm dependency, đổi
  quy ước). Tài liệu phải khớp với code — coi đây là một phần của thay đổi, không
  phải việc làm sau.
- Sau khi đổi UI/chuỗi: chạy `npm run check:i18n` và `npm run build`.
- Trước khi commit/push hãy hỏi người dùng; nhánh chính là `master`.
