# Phát triển & Deploy

## Yêu cầu

- Node.js 18+ (tương thích Vite 5).
- npm (repo dùng `package-lock.json`).

## Cài đặt

```bash
npm install
```

## Lệnh (scripts trong `package.json`)

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Dev server Vite tại http://localhost:3000 (HMR). `npm start` là alias. |
| `npm run build` | Build production tĩnh vào `/build` |
| `npm run preview` | Phục vụ thử bản `/build` |
| `npm run check:i18n` | Kiểm tra key i18n có đủ ở **cả `en` và `vi`**, và không có key chết |

Không có test runner / lint script. Không TypeScript. `check:i18n` là kiểm tra tự
động duy nhất — chạy nó sau mỗi lần thêm/sửa chuỗi hiển thị (xem
[i18n.md](./i18n.md)).

## Stack & cấu hình

- **Vite 5** + **@vitejs/plugin-react** (`vite.config.js`). Output `build/`.
- **React 18** (`createRoot` trong `src/index.jsx`).
- `index.html` nằm ở **gốc repo** (yêu cầu của Vite), trỏ `/src/index.jsx`.
- `public/` được serve tĩnh ở root (`/favicon.png`, `/manifest.json`, `/resume/...`).
- PostCSS + Tailwind tự chạy qua `postcss.config.js` / `tailwind.config.js`.
- **JSX chỉ ở file `.jsx`**; `.js` là JS thuần.
- **Code-splitting**: chỉ `Home` nằm trong entry chunk; các trang còn lại và hai
  feature module nạp bằng `React.lazy` (xem [architecture.md](./architecture.md)).
  Cảnh báo "chunk > 500 kB" của Vite đã hết sau khi tách.

## Biến môi trường (Vite)

Chỉ biến tiền tố `VITE_` mới lộ ra client qua `import.meta.env`. Xem
[`.env.example`](../.env.example):

```
VITE_CRAWLER_API=http://localhost:9000/api    # prod: https://<backend>/api
VITE_CRAWLER_WS=ws://localhost:9000/ws        # prod: wss://<backend>/ws
```

Copy sang `.env.local` cho dev (đã gitignore). Trên Vercel: đặt trong Project
Settings → Environment Variables.

## Thiết kế lại (2026)

Toàn bộ phần portfolio được viết lại: lớp dữ liệu `src/data/`, design system
`pf-*`, thêm trang `/stack`, code-splitting, SEO + JSON-LD. Dependency gỡ bỏ
trong đợt này:

| Gỡ | Vì sao |
|----|--------|
| `bootstrap`, `react-bootstrap` | thay bằng design system `pf-*` + CSS Grid/Flex |
| `react-tsparticles` | nền mesh + lưới CSS đủ dùng và nhẹ hơn nhiều |
| `react-pdf`, `@react-pdf/renderer` | trang Resume dùng `<object>`, bỏ worker pdf.js từ CDN |
| `@radix-ui/themes`, `@radix-ui/react-icons` | không component nào dùng |
| `@fortawesome/*` | footer viết lại bằng `react-icons` |
| `react-country-flag` | language picker dùng nhãn `EN` / `VI` |
| `react-parallax-tilt` | component `Home2` đã bỏ |
| `@fontsource/pixelify-sans` | không dùng |
| `axios`, `i18n`, `web-vitals` | không dùng (fetch native / `i18next` / bỏ `reportWebVitals`) |

Sau khi pull thay đổi này, chạy lại `npm install` để prune `node_modules` (không
bắt buộc — bản build vẫn chạy nếu package cũ còn nằm đó).

## Migrate CRA → Vite (lịch sử)

Repo trước đây là Create React App (react-scripts 5, React 17). Các thay đổi
chính khi chuyển sang Vite:

- File chứa JSX đổi `.js` → `.jsx`; `src/index.js` → `src/index.jsx` dùng
  `createRoot`.
- `public/index.html` (`%PUBLIC_URL%`) → `index.html` ở gốc, đường dẫn `/`.
- `react-scripts` → `vite` + `@vitejs/plugin-react`; React 17 → 18.
- Bỏ file test mặc định của CRA (chưa có test runner thay thế).

## Build & Deploy

```bash
npm run build      # tạo build/ (static)
```

Deploy lên static host (Vercel/Netlify/Nginx...). Bản production:
`https://portfolio.cuong02.com`.

SPA dùng `react-router` → host phải **fallback mọi route về `index.html`**.
Đã cấu hình sẵn trong [`vercel.json`](../vercel.json) (rewrites). Với host khác,
cấu hình tương đương để `/about`, `/project`, `/projects/phone-crawler/...` không
trả 404 khi truy cập trực tiếp.

## Git

- Nhánh chính: `master`.
- `node_modules/`, `build/`, `.env*` (trừ `.env.example`) đã gitignore.
- Trước khi commit/push hãy xác nhận với chủ repo.
