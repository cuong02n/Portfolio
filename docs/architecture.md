# Kiến trúc

## Loại ứng dụng

Single Page Application (SPA) tĩnh, build bằng **Vite 5** +
**@vitejs/plugin-react**, **React 18**, JavaScript (không TypeScript). Không có
back-end trong repo này — đây là **frontend hub đa-module**:

- Phần **portfolio** (Home/About/Projects/Resume) lấy dữ liệu động từ public API
  bên ngoài (Codeforces, GitHub) ngay trên client.
- Mỗi **project có demo live** được nhúng làm **feature module** dưới
  `/projects/<slug>/*`, gọi tới **backend riêng của nó** qua URL tuyệt đối lấy từ
  env (`import.meta.env.VITE_*`) — không cùng origin với frontend.

## Luồng khởi động

```
index.html  (gốc repo: div#root, <script src="/src/index.jsx">)
        │
src/index.jsx
        ├─ import CSS index.css + "@radix-ui/themes/styles.css"
        ├─ import toàn bộ font @fontsource/{inter,space-mono,pixelify-sans}
        └─ ReactDOM.createRoot(#root).render(<App/>)   (React.StrictMode)
        │
src/App.jsx
        ├─ Preloader 1.2s (state `load`, component <Pre/>)
        ├─ import style.css, App.css, bootstrap.min.css
        └─ <Router> → <AppShell/>
                        ├─ useLocation → ẩn <Navbar/> nếu path bắt đầu /projects/
                        └─ <Routes> (xem bảng dưới)
```

## Routing (`src/App.jsx`)

| Path | Render | File |
|------|--------|------|
| `/` | Home | `src/components/Home/Home.jsx` |
| `/about` | About | `src/components/About/About.jsx` |
| `/project` | Projects (gallery) | `src/components/Projects/Projects.jsx` |
| `/resume` | Resume | `src/components/Resume/ResumeNew.jsx` |
| `/projects/phone-crawler/*` | Feature module | `src/features/phone-crawler/CrawlerApp.jsx` |
| `*` | → redirect `/` | `<Navigate to="/"/>` |

- `react-router-dom` v6. `Navbar` render trong `AppShell` (ẩn trên `/projects/*`
  để module demo chiếm full màn hình với chrome riêng).
- Module `CrawlerApp` tự khai báo **nested routes tương đối** (index/jobs/
  explorer/settings) — không tạo `<BrowserRouter>` thứ hai.

## Cây thư mục

```
index.html                   # entry HTML (Vite, gốc repo)
vite.config.js               # cấu hình Vite + plugin React
vercel.json                  # SPA history fallback
.env.example                 # VITE_CRAWLER_API / VITE_CRAWLER_WS
src/
├── index.jsx                # createRoot, nạp font + render App
├── App.jsx                  # Router + AppShell (Navbar có điều kiện) + routes
├── index.css / App.css / style.css
├── reportWebVitals.js
├── api/                     # API portfolio (Codeforces) — JS thuần
│   ├── CodeforcesApi.js     # builder URL Codeforces (đang dùng)
│   └── api.js               # bản trùng (không dùng)
├── config/
│   └── projects.js          # registry các project có demo live
├── shared/
│   └── adminToken.js        # token admin dùng chung (localStorage + hook)
├── Assets/
│   ├── lang/i18n.js         # TẤT CẢ chuỗi dịch en + vi (JS thuần)
│   ├── Projects/*           # ảnh thumbnail
│   └── Resume_CuongNguyenManh.pdf, *.svg/png/webp
├── utils/ratingColor.js     # map rating → màu (bản trùng, JS thuần)
├── components/              # PORTFOLIO (xem components.md)
│   ├── Navbar.jsx, Pre.jsx, Particle.jsx, Footer.jsx, ScrollToTop.jsx
│   ├── Home/  About/  Projects/  Resume/  Language/
└── features/                # FEATURE MODULES (mỗi project demo một thư mục)
    └── phone-crawler/        # xem phone-crawler.md
        ├── CrawlerApp.jsx    # shell + sidebar + nested routes (scope .crawler-scope)
        ├── api.js            # fetch backend qua VITE_CRAWLER_API + X-Admin-Token
        ├── crawler.css       # CSS scope dưới .crawler-scope
        ├── hooks/useWs.js    # WebSocket qua VITE_CRAWLER_WS
        └── pages/ Dashboard Jobs Explorer Settings
```

## Nguyên tắc tổ chức

- **Portfolio theo trang**: mỗi route có thư mục trong `components/`.
- **Module theo project**: mỗi demo là một app con tự chứa trong `features/`,
  cô lập về routing (nested tương đối) và style (scope class gốc).
- **Không state management toàn cục**: `useState` cục bộ; i18n qua react-i18next;
  admin token qua `shared/adminToken.js` + localStorage + custom event.
- **JSX ở `.jsx`**, JS thuần ở `.js` (yêu cầu của setup Vite).

## Điểm trùng lặp cần biết

- `src/api/api.js` ≡ `src/api/CodeforcesApi.js` (component dùng `CodeforcesApi.js`).
- `src/utils/ratingColor.js` ≡ `src/components/About/RatingColor.js`
  (`CodeforcesRatingChart` dùng bản trong `About/`).
