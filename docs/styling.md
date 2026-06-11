# Styling

Dự án trộn **ba hệ thống style**. Khi sửa giao diện, ưu tiên theo phong cách của
component đang chỉnh để giữ nhất quán cục bộ.

## 1. Bootstrap + react-bootstrap

- `bootstrap` (CSS) import trong `App.js`: `bootstrap/dist/css/bootstrap.min.css`.
- `react-bootstrap` cung cấp các component layout & UI: `Container`, `Row`,
  `Col`, `Button`, `Card`, `Navbar`, `Nav`, `Dropdown`, `OverlayTrigger`,
  `Tooltip`.
- Đây là hệ chính cho **bố cục** (grid `Row`/`Col`, `Container fluid`) và phần
  lớn UI.

## 2. Tailwind CSS

- Cấu hình: `tailwind.config.js`, build qua `postcss.config.js`.
- `content` quét `./src/**/*.{js,ts,jsx,tsx}` và `./index.html`.
- Định nghĩa thêm font family: `inter`, `spaceMono`.
- **Dùng hạn chế** — chủ yếu trong `CodeforcesRatingChart.js` (vd `h-96 w-[100%]`,
  `font-spaceMono`, `border-b`, grid utilities).

> Lưu ý: cần đảm bảo directives `@tailwind base/components/utilities` được nạp
> (thường trong `index.css`). Nếu thêm class Tailwind mới mà không có hiệu lực,
> kiểm tra file CSS gốc có import Tailwind layer không.

## 3. CSS custom

Ba file CSS toàn cục, import trong `index.js` / `App.js`:

| File | Vai trò |
|------|---------|
| `src/index.css` | reset/base toàn cục (body nền navy `#080b14`) |
| `src/App.css` | style cấp ứng dụng (phần lớn là default CRA, ít dùng) |
| `src/style.css` | **theme chính "Aurora"**: design tokens, nền mesh động, glass, class section |

### Theme "Aurora" (violet → cyan)

`src/style.css` khai báo **design tokens** trong `html { … }` — dùng lại khắp nơi
thay vì hardcode:

| Token | Giá trị | Ý nghĩa |
|-------|---------|---------|
| `--accent` | `#a78bfa` | tím — màu nhấn chính (`.purple` = `--imp-text-color` = `--accent`) |
| `--accent-2` | `#38bdf8` | cyan — màu nhấn phụ |
| `--accent-3` | `#f472b6` | hồng — điểm xuyết trong mesh |
| `--grad` | `linear-gradient(120deg, --accent, --accent-2)` | gradient chủ đạo (nút, gạch chân nav, tên hero) |
| `--bg` / `--bg-2` | `#080b14` / `#0b1020` | nền navy |
| `--glass` / `--glass-2` | `rgba(255,255,255,0.045 / 0.07)` | nền kính (card/section) |
| `--border` | `rgba(255,255,255,0.09)` | viền mảnh |

- **Nền mesh động**: `body::before` (fixed, `z-index:-2`) là 4 quầng radial
  violet/cyan/hồng trên navy, chạy animation `mesh-shift` (tắt dưới
  `prefers-reduced-motion`). Particles (`Particle.jsx`, tô màu accent) nằm trên
  mesh; section dùng `--section-background-color` (navy translucent) để mesh hắt
  qua mà chữ vẫn đọc được.
- **Glassmorphism**: `.project-card-view`, `.blog-card-view`, `.tech-icons`,
  social icons… dùng `--glass` + `--border` + `backdrop-filter: blur` + glow theo
  accent khi hover.
- Nút Bootstrap override: `.btn-primary` → gradient tím, `.btn-success`
  (Live Demo) → gradient cyan.

Các class custom hay gặp:
- `.purple` — màu nhấn (nay là tím `--accent`; dùng cho tiêu đề, link, highlight).
- `.home-section`, `.about-section`, `.project-section`, `.resume-section` —
  nền + spacing từng trang.
- `.project-heading`, `.tech-icons`, `.project-card-view`, `.social-icons`,
  `.home-about-*` — style các khối nội dung.
- `#no-scroll` / `#scroll` — bật/tắt scroll khi preloader đang chạy.

## 4. Font (`@fontsource`)

Nạp trong `src/index.js`:
- **Inter** (100–900)
- **Space Mono** (400, 700)
- **Pixelify Sans** (400–700)

Cùng với `@radix-ui/themes/styles.css` (Radix UI themes, import ở `index.js`).

## 5. CSS của feature module (scope)

Mỗi feature module (`src/features/<slug>/`) có CSS riêng và **phải scope dưới một
class gốc** để không đụng Bootstrap/Tailwind/CSS portfolio. Ví dụ phone-crawler:
- UI bọc trong `<div className="crawler-scope">` (xem `CrawlerApp.jsx`).
- Mọi selector trong `crawler.css` được prefix `.crawler-scope ` — kể cả các class
  generic dễ trùng (`.btn`, `.card`, `.badge`, `nav`, `h3/h4`, scrollbar).
- `body`/`:root` gốc của module được gập vào `.crawler-scope` (biến CSS + nền tối).

Nhờ độ ưu tiên cao hơn (`.crawler-scope .btn` > Bootstrap `.btn`), style module
thắng bên trong scope mà không rò ra ngoài.

## Quy ước khi sửa UI

- Layout mới → ưu tiên `Container/Row/Col` của react-bootstrap cho đồng bộ.
- Màu nhấn → dùng class `.purple` hoặc các token `--accent`/`--accent-2`/`--grad`
  thay vì hardcode mã màu mới (giữ theme Aurora đồng nhất).
- Inline style xuất hiện nhiều trong code hiện tại (vd `style={{...}}`); chấp
  nhận được nhưng nếu giá trị dùng lại nhiều lần nên cân nhắc đưa vào CSS class.
