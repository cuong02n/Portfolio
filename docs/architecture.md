# Kiến trúc

## Loại ứng dụng

Single Page Application (SPA) tĩnh, build bằng **Vite 5** +
**@vitejs/plugin-react**, **React 18**, JavaScript (không TypeScript). Không có
back-end trong repo này — đây là **frontend hub đa-module**:

- Phần **portfolio** (Home/About/Stack/Projects/Resume) render từ dữ liệu tĩnh
  trong [`src/data/`](../src/data), cộng vài nguồn động lấy từ public API bên
  ngoài (Codeforces, GitHub) ngay trên client.
- Mỗi **project có demo live** được nhúng làm **feature module** dưới
  `/projects/<slug>/*`, gọi tới **backend riêng của nó** qua URL tuyệt đối lấy từ
  env (`import.meta.env.VITE_*`) — không cùng origin với frontend.

## Luồng khởi động

```
index.html  (gốc repo: meta SEO + JSON-LD Person, div#root, <script src="/src/index.jsx">)
        │
src/index.jsx        ← THỨ TỰ IMPORT LÀ THỨ TỰ NẠP CSS
        ├─ import "./index.css"          (Tailwind preflight — phải trước App)
        ├─ import font @fontsource/{inter, space-mono}
        ├─ import "./Assets/lang/i18n"   (init trước lần render đầu)
        ├─ import App                    (App kéo theo style.css)
        └─ ReactDOM.createRoot(#root).render(<App/>)   (React.StrictMode)
        │
src/App.jsx
        ├─ Preloader 0.9s (state `load`, component <Pre/>)
        ├─ import style.css               (design system pf-*)
        └─ <Router> → <AppShell/>
                        ├─ <ScrollToTop/>  (về đầu trang khi đổi route)
                        ├─ useLocation → ẩn <Navbar/> + <Footer/> nếu path bắt đầu /projects/
                        └─ <Suspense> → <Routes> (xem bảng dưới)
```

> **Cạm bẫy đã xử lý:** `index.css` chứa `@tailwind base` (preflight). Nếu nó nạp
> *sau* `style.css`, preflight sẽ đè lên base của design system. Vì vậy
> `src/index.jsx` import `index.css` **trước** `App`.

## Routing (`src/App.jsx`)

| Path | Render | File | Tải |
|------|--------|------|-----|
| `/` | Home | `src/components/Home/Home.jsx` | eager (entry chunk) |
| `/about` | About | `src/components/About/About.jsx` | lazy |
| `/stack` | Stack | `src/components/Stack/Stack.jsx` | lazy |
| `/project` | Projects | `src/components/Projects/Projects.jsx` | lazy |
| `/resume` | Resume | `src/components/Resume/Resume.jsx` | lazy |
| `/projects/phone-crawler/*` | Feature module | `src/features/phone-crawler/CrawlerApp.jsx` | lazy |
| `/projects/system-flow/*` | Feature module | `src/features/system-flow/SystemFlowApp.jsx` | lazy |
| `*` | → redirect `/` | `<Navigate to="/" replace/>` | — |

- `react-router-dom` v6. `Navbar` + `Footer` render trong `AppShell` và **bị ẩn
  trên `/projects/*`** để module demo chiếm full màn hình với chrome riêng (trang
  Projects nhúng chính các route này qua `<iframe>`, nên nếu không ẩn sẽ lồng
  portfolio trong portfolio).
- Module tự khai báo **nested routes tương đối** — không tạo `<BrowserRouter>`
  thứ hai.

## Code-splitting

Chỉ `Home` nằm trong entry chunk. Mọi thứ khác `React.lazy` + `<Suspense>` với
fallback `src/components/ui/Fallback.jsx`:

| Chunk | Vì sao tách |
|-------|-------------|
| `SystemFlowApp` | kéo theo `@xyflow/react` |
| `CodeforcesRatingChart` | kéo theo `recharts`; nằm cuối trang About nên tách riêng khỏi About |
| `CrawlerApp`, `About`, `Stack`, `Projects`, `Resume` | không cần cho lần paint đầu |

Kết quả: entry chunk ~351 kB (~121 kB gzip) thay vì ~1.13 MB nếu gộp tất cả.

## Cây thư mục

```
index.html                   # entry HTML (Vite, gốc repo) + meta SEO + JSON-LD
vite.config.js               # cấu hình Vite + plugin React
vercel.json                  # SPA history fallback
.env.example                 # VITE_CRAWLER_API / VITE_CRAWLER_WS
scripts/
└── check-i18n.mjs           # kiểm tra key i18n đủ ở cả en + vi (npm run check:i18n)
src/
├── index.jsx                # nạp CSS/font/i18n theo thứ tự rồi render App
├── App.jsx                  # Router + AppShell + routes + lazy loading
├── index.css                # Tailwind directives (+ nền tối chống nháy trắng)
├── style.css                # DESIGN SYSTEM `pf-*` (tokens, layout, component)
├── api/
│   └── CodeforcesApi.js     # builder URL Codeforces
├── data/                    # NGUỒN SỰ THẬT NỘI DUNG — xem data-layer.md
│   ├── profile.js           # danh tính, liên hệ, số liệu hero
│   ├── experience.js        # công việc, học vấn, chứng chỉ (khớp CV)
│   ├── skills.js            # 10 nhóm công nghệ (rút từ hệ thống NEXUSTI)
│   └── projects.js          # demo live + toàn bộ danh mục dự án
├── config/
│   └── projects.js          # registry route của feature module
├── shared/
│   └── adminToken.js        # token admin dùng chung (localStorage + hook)
├── Assets/
│   ├── lang/i18n.js         # TẤT CẢ chuỗi dịch en + vi (JS thuần)
│   └── Resume_CuongNguyenManh.pdf, avatar.webp, pre.svg, ...
├── components/              # PORTFOLIO (xem components.md)
│   ├── Layout/  Navbar.jsx  Footer.jsx
│   ├── ui/      SectionHead.jsx  Fallback.jsx
│   ├── Home/    Home.jsx  Hero.jsx  Terminal.jsx  Type.jsx  Arcade.jsx
│   ├── About/   About.jsx  Timeline.jsx  Credentials.jsx  Contact.jsx
│   │            Github.jsx  CodeforcesRatingChart.jsx  RatingColor.js
│   ├── Stack/   Stack.jsx
│   ├── Projects/ Projects.jsx  ProjectCard.jsx
│   ├── Resume/  Resume.jsx
│   ├── Language/ LanguagePicker.jsx
│   ├── Arcade/  SnakeGame.jsx  TetrisGame.jsx
│   └── Pre.jsx  ScrollToTop.jsx
└── features/                # FEATURE MODULES (mỗi project demo một thư mục)
    ├── phone-crawler/        # xem phone-crawler.md
    └── system-flow/          # xem system-flow.md
```

## Nguyên tắc tổ chức

- **Nội dung là dữ liệu**: component không hardcode danh sách kỹ năng / công việc
  / dự án — tất cả đọc từ `src/data/`.
- **Portfolio theo trang**: mỗi route có thư mục trong `components/`; phần dùng
  chung nằm ở `components/ui/` và `components/Layout/`.
- **Module theo project**: mỗi demo là một app con tự chứa trong `features/`,
  cô lập về routing (nested tương đối) và style (scope class gốc).
- **Không state management toàn cục**: `useState` cục bộ; i18n qua react-i18next;
  admin token qua `shared/adminToken.js` + localStorage + custom event.
- **JSX ở `.jsx`**, JS thuần ở `.js` (yêu cầu của setup Vite).
