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

Không có script lint/test riêng. Không TypeScript.

## Stack & cấu hình

- **Vite 5** + **@vitejs/plugin-react** (`vite.config.js`). Output `build/`.
- **React 18** (`createRoot` trong `src/index.jsx`).
- `index.html` nằm ở **gốc repo** (yêu cầu của Vite), trỏ `/src/index.jsx`.
- `public/` được serve tĩnh ở root (`/favicon.png`, `/manifest.json`, `/resume/...`).
- PostCSS + Tailwind tự chạy qua `postcss.config.js` / `tailwind.config.js`.
- **JSX chỉ ở file `.jsx`**; `.js` là JS thuần.

## Biến môi trường (Vite)

Chỉ biến tiền tố `VITE_` mới lộ ra client qua `import.meta.env`. Xem
[`.env.example`](../.env.example):

```
VITE_CRAWLER_API=http://localhost:9000/api    # prod: https://<backend>/api
VITE_CRAWLER_WS=ws://localhost:9000/ws        # prod: wss://<backend>/ws
```

Copy sang `.env.local` cho dev (đã gitignore). Trên Vercel: đặt trong Project
Settings → Environment Variables.

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
