# Styling

Portfolio dùng **một design system CSS custom** (`src/style.css`), cộng Tailwind
**chỉ cho biểu đồ Codeforces**. Bootstrap / react-bootstrap **đã được gỡ bỏ hoàn
toàn**.

## 1. Design system `pf-*` — `src/style.css`

Mọi class của portfolio đều mang tiền tố **`pf-`** để không thể đụng với CSS của
feature module (`src/features/*`) hay utility của Tailwind.

### Design tokens (`:root`)

| Token | Giá trị | Ý nghĩa |
|-------|---------|---------|
| `--pf-bg` | `#070912` | nền navy đậm |
| `--pf-accent` | `#a78bfa` | tím — màu nhấn chính |
| `--pf-accent-2` | `#38bdf8` | cyan — màu nhấn phụ |
| `--pf-accent-3` | `#f472b6` | hồng — chỉ dùng trong nền mesh |
| `--pf-grad` | `linear-gradient(115deg, accent, accent-2)` | gradient chủ đạo (nút primary, tên hero, filter active) |
| `--pf-text` / `--pf-muted` / `--pf-dim` | `#e9eef7` / `#97a3ba` / `#6c7893` | ba cấp độ chữ |
| `--pf-border` / `--pf-border-soft` | `rgba(255,255,255,.085 / .05)` | viền mảnh |
| `--pf-surface` / `--pf-surface-2` | `rgba(255,255,255,.028 / .055)` | nền kính (card/panel) |
| `--pf-r-sm` / `--pf-r` / `--pf-r-lg` | `8px` / `14px` / `22px` | bo góc |
| `--pf-sans` / `--pf-mono` | Inter / Space Mono | font |
| `--pf-max` | `1180px` | bề rộng container |
| `--pf-nav-h` | `68px` | chiều cao navbar (dùng cho `pf-section--first`) |

`.purple` được giữ lại (trỏ về `--pf-accent`) cho tương thích ngược.

### Nền

- `body::before` — 4 quầng radial violet/cyan/hồng trên navy, animation
  `pf-mesh` (tắt dưới `prefers-reduced-motion`).
- `body::after` — lưới mảnh 64px, mask mờ dần xuống dưới; tạo cảm giác "kỹ thuật"
  mà không gây nhiễu.

> Trước đây có thêm `react-tsparticles` (160 hạt) render lại trên **mọi** trang.
> Đã gỡ: nền mesh + lưới đủ hiệu quả thị giác và nhẹ hơn nhiều.

### Nhóm class chính

| Nhóm | Class tiêu biểu |
|------|-----------------|
| Layout | `pf-container`, `pf-section`, `pf-section--tight`, `pf-section--first`, `pf-grid-2`, `pf-grid-3` |
| Chữ | `pf-eyebrow`, `pf-h1`, `pf-h2`, `pf-h3`, `pf-lead`, `pf-muted`, `pf-dim`, `pf-mono`, `pf-gradient-text` |
| Nút / link | `pf-btn`, `pf-btn--primary`, `pf-btn--sm`, `pf-link-arrow`, `pf-toggle` |
| Bề mặt | `pf-card`, `pf-card--hover`, `pf-card-icon`, `pf-panel` |
| Nhãn | `pf-tag`, `pf-tags`, `pf-badge--{live,work,oss,infra}`, `pf-dot` |
| Navbar | `pf-nav`, `pf-nav--scrolled`, `pf-nav-link.is-active`, `pf-lang*` |
| Hero | `pf-hero`, `pf-hero-status`, `pf-stats`, `pf-term*` |
| About | `pf-bio`, `pf-timeline`, `pf-tl-*`, `pf-cred*`, `pf-contact-*` |
| Stack | `pf-legend`, `pf-level--{core,working,familiar}`, `pf-filters`, `pf-stack-*`, `pf-skill*` |
| Projects | `pf-demo*`, `pf-projects`, `pf-proj-*` |
| Footer | `pf-footer*` |

`pf-section--first` cộng thêm chiều cao navbar vào padding-top — dùng cho section
đầu tiên của mỗi trang con để nội dung không chui dưới thanh nav.

## 2. Tailwind CSS

- Cấu hình: `tailwind.config.js`, build qua `postcss.config.js`.
- `content` quét `./src/**/*.{js,ts,jsx,tsx}` và `./index.html`.
- **Chỉ còn dùng trong `CodeforcesRatingChart.jsx`** (`h-96 w-[100%]`,
  `font-spaceMono`, các utility grid/flex).
- Directive `@tailwind base/components/utilities` nằm ở `src/index.css`, và
  `src/index.jsx` **import `index.css` trước `App`** để preflight không đè lên
  `style.css`.

### ⚠️ `blocklist: ["collapse"]`

Giữ nguyên. Tailwind sinh utility `.collapse { visibility: collapse }` chỉ vì
trong source có chữ `collapse` đứng riêng (kể cả trong comment). Bootstrap đã
được gỡ nên rủi ro hiện thấp hơn, nhưng blocklist là hàng rào rẻ tiền — đừng bỏ,
và tránh viết token `collapse` trần trong source.

## 3. Font (`@fontsource`)

Nạp trong `src/index.jsx`, self-host (không gọi CDN Google Fonts):
- **Inter** (300–800) — toàn bộ UI.
- **Space Mono** (400, 700) — eyebrow, tag, thẻ terminal, nhãn mono.

> Đã bỏ: `@import` Raleway từ Google Fonts trong `index.css` (request chặn
> render), `@fontsource/pixelify-sans` (không dùng), `@radix-ui/themes/styles.css`
> (không component nào dùng Radix).

## 4. CSS của feature module (scope)

Mỗi feature module (`src/features/<slug>/`) có CSS riêng và **phải scope dưới một
class gốc** để không đụng CSS portfolio. Ví dụ phone-crawler:
- UI bọc trong `<div className="crawler-scope">` (xem `CrawlerApp.jsx`).
- Mọi selector trong `crawler.css` được prefix `.crawler-scope ` — kể cả các class
  generic dễ trùng (`.btn`, `.card`, `.badge`, `nav`, `h3/h4`, scrollbar).
- `body`/`:root` gốc của module được gập vào `.crawler-scope`.

Vì design system portfolio dùng tiền tố `pf-`, hai bên gần như không thể va nhau;
scope của module vẫn giữ để phòng các selector theo tên thẻ.

## Quy ước khi sửa UI

- Dùng lại class `pf-*` sẵn có trước khi viết class mới; class mới cũng phải mang
  tiền tố `pf-`.
- Màu → dùng token `--pf-accent` / `--pf-accent-2` / `--pf-grad`, không hardcode
  mã màu mới.
- Section mới → `<section className="pf-container pf-section">` + `SectionHead`
  để giữ nhịp dọc.
- Inline style chỉ dùng cho giá trị dùng một lần (khoảng cách nhỏ, flex ad-hoc);
  cái gì lặp lại thì đưa vào `style.css`.
