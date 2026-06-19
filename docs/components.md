# Components

Mô tả từng component portfolio, vai trò và props. Mọi text hiển thị đều qua
`t()` của `react-i18next` (xem [i18n.md](./i18n.md)).

> Lưu ý: từ khi migrate sang Vite, các file component là **`.jsx`** (đường dẫn
> bên dưới ghi `.js` theo tên cũ — file thực tế có đuôi `.jsx`). Component của
> feature module nằm ở `src/features/<slug>/` — xem [phone-crawler.md](./phone-crawler.md).

## Khung chung

### `App` — `src/App.js`
Root component. Quản lý preloader (`load`, tự tắt sau 1.2s), khai báo `Router`,
`Navbar` và các `Route`.

### `Navbar` — `src/components/Navbar.js`
Thanh điều hướng cố định trên cùng (`react-bootstrap` Navbar). Đổi class
`navbar` ↔ `sticky` khi cuộn quá 20px. Chứa `LanguagePicker` ở brand, các link
Home/About/Projects/Resume, và nút "fork" trỏ tới GitHub.

### `Pre` — `src/components/Pre.js`
Màn hình preloader hiển thị khi `load === true`.

### `Particle` — `src/components/Particle.js`
Nền hạt động dùng `react-tsparticles` (160 hạt, di chuyển sang phải, click để
thêm hạt). Được render độc lập trong mỗi trang.

### `Footer`, `ScrollToTop`
Đã import nhưng **đang bị comment** trong `App.js` → không hiển thị.

## Trang Home

### `Home` — `src/components/Home/Home.js`
Hero section: lời chào, tên, hiệu ứng `Type`. Cột phải (trước là minh hoạ
`home-main.svg`) nay là **hai màn game tự chơi** đặt cạnh nhau — `SnakeGame` +
`TetrisGame` (cùng prop `fill`, bọc khung kính `.home-game`). `Home2` bên dưới.
**Không còn** dải arcade riêng ở cuối trang.

### Game tự chơi — `src/components/Arcade/{SnakeGame,TetrisGame}.js`
Hai game **tự code, tự chơi vòng lặp vô hạn** trên canvas (không thư viện game),
**không nhãn/tiêu đề**. Dùng trực tiếp trong `Home` (không còn wrapper `Arcade`).
- `SnakeGame.jsx` — AI BFS tìm đường ngắn nhất tới mồi, fallback flood-fill để
  sinh tồn; kẹt mới reset.
- `TetrisGame.jsx` — AI heuristic (aggregate height / holes / bumpiness / lines,
  kiểu El-Tetris) chọn xoay+cột tối ưu rồi thả. **Chế độ vô hạn — KHÔNG reset cả
  bàn**: khi stack quá cao không đặt được, tự "nhả" hàng đáy (tụt stack xuống) để
  có chỗ, chạy liên tục mãi.
- **Props**: `cell`, `interval` (cả hai), `cols`/`rows` (Snake), `fill` (canvas
  phủ kín container theo `object-fit`), `className`. Vòng lặp `setInterval`, dọn
  dẹp khi unmount; canvas scale theo `devicePixelRatio`; màu theme Aurora.

### `Type` — `src/components/Home/Type.js`
Hiệu ứng gõ chữ (`typewriter-effect`) luân phiên các vai trò: Java developer /
Software Engineering / Problem Solving / pursuing Solution Architect.

### `Home2` — `src/components/Home/Home2.js`
Khối "LET ME INTRODUCE MYSELF": đoạn giới thiệu, avatar nghiêng 3D
(`react-parallax-tilt`), và danh sách social. Email/SĐT có thể bấm để ẩn/hiện
text (`showEmailText`, `showPhoneText`).

### `Home/Icon/*`
Các icon SVG tùy biến: `EmailIcon`, `PhoneIcon`, `GithubIcon`,
`StackOverFlowIcon`.

## Trang About

### `About` — `src/components/About/About.js`
Bố cục trang: `AboutCard`, ba nhóm tech stack, lịch GitHub, biểu đồ Codeforces.
Truyền `username="cuong2905say"` cho `CodeforcesRatingChart`.

### `AboutCard` — `src/components/About/AboutCard.js`
Thẻ giới thiệu bản thân.

### `TechStack1 / TechStack2 / TechStack3`
Ba hàng icon công nghệ (react-icons), nhóm theo mức độ thành thạo:
- **TechStack1** ("What I have experience"): Java, Spring Boot, MySQL.
- **TechStack2** ("And others"), **TechStack3** ("I also know"): các công nghệ phụ.

### `Github` — `src/components/About/Github.js`
Lịch đóng góp GitHub (`react-github-calendar`, username `cuong02n`, màu accent
`#a78bfa`) kèm dòng "cập nhật lần cuối" theo thời gian thực.

### `CodeforcesRatingChart` — `src/components/About/CodeforcesRatingChart.js`
Component phức tạp nhất. Xem chi tiết ở [external-apis.md](./external-apis.md).
- **Props**: `username` (Codeforces handle).
- Fetch `user.rating` (đồ thị rating) và `user.status` (số bài đã giải).
- Vẽ `LineChart` (recharts) với các dải màu rank nền (`ReferenceArea`),
  `CustomTooltip` hiển thị contest/delta/rating.
- Trục X là tổng số bài đã giải tích lũy, trục Y là rating.

### `RatingColor` — `src/components/About/RatingColor.js`
Hàm `ratingColor(rating)` → mã màu theo rank Codeforces.

## Trang Projects

### `Projects` — `src/components/Projects/Projects.jsx`
Layout **master-detail**: **tab dọc bên trái** + **panel demo ở giữa/phải** (state
`active`, `summaryOpen`). Mảng `TABS`: **Phone Crawler**, **NexusTI Flow**,
**Sample Flow** (mỗi mục `label`, `sub`, `html` = key mô tả HTML tái dùng, `src`).
Bấm tab → panel phải **nhúng thẳng demo qua `<iframe src>`** (route full-screen,
Navbar portfolio tự ẩn trên `/projects/*` nên không lồng portfolio; `key` theo tab
để remount). Phone Crawler → `/projects/phone-crawler`; flow →
`/projects/system-flow/board?company=<id>`. **Summary** không hiện mặc định mà nằm
trong **dropdown** xổ dưới tiêu đề (nút toggle `proj-summary-toggle` →
`proj-summary` render `t(html)`). Có link "Open full screen". Style
`.proj-layout/.proj-side*/.proj-content*/.proj-summary*/.proj-frame` trong `src/style.css`.

### `ProjectCards` — `src/components/Projects/ProjectCards.jsx` (không còn dùng trên trang Projects)
**Props**:
| Prop | Kiểu | Ý nghĩa |
|------|------|---------|
| `imgPath` | string | ảnh thumbnail |
| `title` | string | tiêu đề (đã dịch) |
| `description` | string (HTML) | mô tả — render bằng `dangerouslySetInnerHTML` |
| `ghLink` | string? | link GitHub (hiện nút GitHub/Blog) |
| `demoLink` | string? | link demo ngoài (hiện nút "Deployed") |
| `internalLink` | string? | route demo nội bộ (vd `/projects/phone-crawler`) — hiện nút "Live Demo" + tiêu đề là `<Link>` |
| `isBlog` | bool | nếu true thì nút GitHub đổi nhãn thành "Blog" |

Tiêu đề là link: nếu có `internalLink` → react-router `<Link>` (demo nội bộ);
ngược lại `<a>` ưu tiên `demoLink` → `ghLink` → `#`.

## Trang Resume

### `ResumeNew` — `src/components/Resume/ResumeNew.js`
Nhúng file PDF `src/Assets/Resume_CuongNguyenManh.pdf` bằng `react-pdf`
(`Document`/`Page`, chỉ trang 1). Có 2 nút "Download CV". Scale theo bề rộng màn
hình (1.7 nếu > 786px, ngược lại 0.6). Worker pdf.js lấy từ CDN cloudflare.

## Đa ngôn ngữ

### `LanguagePicker` — `src/components/Language/LanguagePicker.js`
Dropdown (`react-bootstrap`) chọn EN/VI kèm cờ (`react-country-flag`). Gọi
`i18n.changeLanguage(lang)` và lưu `localStorage['language']`. Được `memo` hóa.
