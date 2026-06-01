# Feature module: phone-crawler

Demo chạy thật của project **Phone Number Crawler** — công cụ crawl & lọc số
điện thoại đẹp (Viettel/VNPT/Vietnamobile). Đây là feature module đầu tiên của
portfolio, minh hoạ mô hình "1 frontend hub — nhiều backend".

- **Route**: `/projects/phone-crawler/*`
- **Thư mục**: `src/features/phone-crawler/`
- **Nguồn gốc**: migrate từ `crawl-phone-number/ui` (Vite + React), tách coupling
  same-origin sang gọi backend qua URL tuyệt đối từ env.
- **Backend**: FastAPI + PostgreSQL, deploy độc lập (Docker/Kubernetes), giới hạn
  CORS theo `CORS_ORIGINS`. **Repo này không sửa backend**, chỉ tiêu thụ API.

## Cấu trúc module

```
features/phone-crawler/
  CrawlerApp.jsx        # shell: sidebar (Dashboard/Jobs/Explorer/Settings) + nested routes
                        #   - không tạo BrowserRouter (dùng router của portfolio)
                        #   - bọc toàn bộ trong <div className="crawler-scope">
                        #   - export WsContext + useWsData
                        #   - link "← Portfolio" về /project
  api.js                # mọi fetch tới backend; base = import.meta.env.VITE_CRAWLER_API
  hooks/useWs.js        # WebSocket; url = import.meta.env.VITE_CRAWLER_WS
  crawler.css           # toàn bộ style scope dưới .crawler-scope
  pages/
    Dashboard.jsx       # stats + live number feed (đọc từ WsContext)
    Jobs.jsx            # tạo/điều khiển job, live log, auto-session (SSE) — phần lớn cần token
    Explorer.jsx        # duyệt CSV, áp filter preset, download (public)
    Settings.jsx        # nhập admin token + cấu hình proxy (proxy config cần token)
```

## Biến môi trường

| Biến | Ví dụ dev | Ví dụ prod |
|------|-----------|-----------|
| `VITE_CRAWLER_API` | `http://localhost:9000/api` | `https://<backend>/api` |
| `VITE_CRAWLER_WS`  | `ws://localhost:9000/ws`    | `wss://<backend>/ws` |

Khai báo trong `.env.local` (dev) / Vercel env (prod). Nếu thiếu, `api.js` fallback
về `/api` same-origin (chỉ hữu ích khi chạy sau proxy).

## Hợp đồng API & phân quyền

Backend chia endpoint thành **public (đọc)** và **admin (ghi/nhạy cảm)**:

- **Public** (không token): `GET /stats`, `GET /jobs`, `.../log`, `.../thread-logs`,
  `.../failed-patterns`, `GET /feed/recent`, `GET /data/files`,
  `POST /data/preview`, `GET /data/download`, `WS /ws`.
- **Admin** (header `X-Admin-Token`): `POST /jobs`, `.../pause|resume|threads|retry`,
  `DELETE /jobs/{id}`, `GET/POST /config`, `GET/DELETE /viettel/session`,
  `POST /viettel/auto-session`.
- **Admin SSE**: `GET /viettel/auto-session/stream` — EventSource không set được
  header nên token đi qua query `?admin_token=<token>`.

`api.js` gắn token **theo từng method** (không blanket): chỉ method admin mới
kèm token; `previewData`/`downloadUrl`/stats/jobs/log... để public.

## Admin token UX (`src/shared/adminToken.js`)

- Token lưu ở `localStorage['crawler_admin_token']`, nhập 1 lần ở trang
  **Settings** của module.
- Hook `useAdminToken()` → `{ token, hasToken, setToken }`; phát custom event để
  các component cập nhật ngay khi token đổi.
- Khi **chưa có token**: form tạo job + các nút điều khiển (pause/resume/threads/
  retry/delete, lưu config, auto-session) **bị ẩn**; chỉ còn xem (Dashboard,
  Explorer, feed, "Xem data").
- Khi gọi ghi mà nhận `401`/`503`: hiện thông báo rõ (token sai/thiếu, hoặc server
  chưa cấu hình token).

## Cô lập với portfolio

- **Routing**: nested routes tương đối (`index`, `jobs`, `explorer`, `settings`);
  điều hướng nội bộ dùng `navigate('../explorer?...')`. Navbar portfolio bị ẩn
  trên `/projects/*` (xem `App.jsx`).
- **Style**: mọi selector trong `crawler.css` đều prefix `.crawler-scope` để không
  đụng `.btn`/`.card`/`.badge`... của Bootstrap và CSS portfolio. `body`/`:root`
  gốc được gập vào `.crawler-scope`.

## WebSocket payload (mỗi giây)

```json
{ "jobs": [ { "...job", "threads": 4, "isdn_type": 2, "no_proxy": false,
              "progress": {...}, "log": "...", "live_stats": {...} } ],
  "stats": { "total_jobs": 0, "running_jobs": 0, "total_saved": 0, "avg_progress": 0 },
  "feed": ["09xxxxxxx", ...], "has_proxy": true }
```

Secrets (csrf token, cookie, proxy creds) đã được backend **redact** — payload an
toàn để hiển thị công khai. Có thể nhận `{"_ping": true}` (bỏ qua).

## Verify end-to-end (cần backend chạy)

1. Bật backend local (`DATABASE_URL` + `ADMIN_TOKEN`), nghe cổng 9000.
2. `VITE_CRAWLER_API=http://localhost:9000/api VITE_CRAWLER_WS=ws://localhost:9000/ws npm run dev`.
3. Vào `/projects/phone-crawler`: Dashboard nhận dữ liệu qua WS, Explorer filter
   chạy (đều public).
4. Chưa nhập token → nút tạo/điều khiển job ẩn. Nhập đúng token ở Settings → tạo
   job OK; nhập sai → nhận 401 và báo lỗi.
5. `npm run build` không lỗi.
