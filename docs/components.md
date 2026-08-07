# Components

Mô tả từng component portfolio, vai trò và props. Mọi text hiển thị đều qua
`t()` của `react-i18next` (xem [i18n.md](./i18n.md)); nội dung dạng danh sách đọc
từ `src/data/` (xem [data-layer.md](./data-layer.md)).

Component của feature module nằm ở `src/features/<slug>/` — xem
[phone-crawler.md](./phone-crawler.md) và [system-flow.md](./system-flow.md).

## Khung chung

### `App` — `src/App.jsx`
Root component. Quản lý preloader (`load`, tự tắt sau 0.9s), khai báo `Router`,
`ScrollToTop`, `Navbar`/`Footer` (ẩn trên `/projects/*`) và các `Route`. Mọi route
trừ `Home` được nạp bằng `React.lazy` trong một `<Suspense>` chung.

### `Navbar` — `src/components/Layout/Navbar.jsx`
Thanh điều hướng cố định. Thêm class `pf-nav--scrolled` (kính mờ + viền) khi cuộn
quá 16px. Dùng `NavLink` nên trang đang mở tự nhận class `is-active`. Dưới 860px
danh sách link biến thành drawer, mở/đóng bằng state `open` + class `is-open`;
route đổi thì drawer tự đóng. Bên phải có `LanguagePicker` và nút mailto (ẩn dưới
560px).

### `Footer` — `src/components/Layout/Footer.jsx`
Ba cột: thương hiệu + tagline + social, danh sách trang, danh sách liên kết
ngoài. Thanh dưới cùng hiện năm bản quyền. Dữ liệu lấy từ `PROFILE`.

### `SectionHead` — `src/components/ui/SectionHead.jsx`
Bộ ba **eyebrow → tiêu đề → lead** mở đầu mọi section, giữ nhịp dọc đồng nhất.

| Prop | Kiểu | Ý nghĩa |
|------|------|---------|
| `eyebrow` | string? | nhãn mono in hoa phía trên |
| `title` | string? | tiêu đề `h2` |
| `lead` | string? | đoạn mô tả |
| `action` | node? | phần tử bên phải tiêu đề (vd link "xem tất cả") |
| `id` | string? | id gắn vào `h2` |

### `Fallback` — `src/components/ui/Fallback.jsx`
Chỗ giữ layout khi chunk lazy đang tải. Prop `height` (mặc định `60vh`).

### `Pre` — `src/components/Pre.jsx`
Màn hình preloader hiển thị khi `load === true`.

### `ScrollToTop` — `src/components/ScrollToTop.jsx`
Cuộn về đầu trang mỗi khi `pathname` đổi.

## Trang Home — `src/components/Home/`

### `Home` — `Home.jsx`
Ghép các section: `Hero` → "What I do" (3 thẻ năng lực) → dự án tiêu biểu
(`FEATURED_PROJECTS`) → dải `CORE_STACK` + link sang `/stack` → dải CTA liên hệ →
`Arcade`.

### `Hero` — `Hero.jsx`
Hai cột. Trái: badge trạng thái, lời chào, tên (gradient), `Type`, đoạn giới
thiệu, 3 nút CTA, lưới 4 số liệu từ `STATS`. Phải: `Terminal` + chú thích.

### `Terminal` — `Terminal.jsx`
Thẻ terminal tĩnh tóm tắt stack dưới dạng `whoami` / `cat stack.json` /
`kubectl get deploy | wc -l`. **Cố ý chung chung** — không hostname, IP hay bất
kỳ thông tin nào thuộc về công ty.

### `Type` — `Type.jsx`
Hiệu ứng gõ chữ (`typewriter-effect`) chạy qua `TYPED_ROLE_KEYS`. Widget được
`key={i18n.language}` để remount khi đổi ngôn ngữ (thư viện chỉ đọc `strings` lúc
mount).

### `Arcade` — `Arcade.jsx`
Khối gập, **mặc định đóng** — canvas chạy vòng lặp vô hạn nên không nên tự động
chạy với khách mới vào. Mở ra thì render `SnakeGame` + `TetrisGame`.

### Game tự chơi — `src/components/Arcade/{SnakeGame,TetrisGame}.jsx`
Hai game tự code, tự chơi trên canvas (không thư viện game).
- `SnakeGame` — AI BFS tìm đường ngắn nhất tới mồi, fallback flood-fill để sinh
  tồn; kẹt mới reset. Props: `cols`, `rows`, `cell`, `interval`, `fill`, `className`.
- `TetrisGame` — AI heuristic (aggregate height / holes / bumpiness / lines, kiểu
  El-Tetris) chọn xoay + cột tối ưu rồi thả. Props: `cell`, `interval`, `fill`,
  `className`.

## Trang About — `src/components/About/`

### `About` — `About.jsx`
Bố cục trang: tiểu sử + avatar → `Timeline` → `Credentials` → `Github` → biểu đồ
Codeforces (lazy) → `Contact`.

### `Timeline` — `Timeline.jsx`
Dòng thời gian sự nghiệp đọc từ `EXPERIENCE`, mới nhất trước. Mục `current: true`
có chấm nhấn sáng và hiển thị "Hiện tại" thay cho ngày kết thúc.

### `Credentials` — `Credentials.jsx`
Hai thẻ cạnh nhau: học vấn (`EDUCATION`) và chứng chỉ (`CERTIFICATIONS`).

### `Contact` — `Contact.jsx`
Lưới liên hệ: email, điện thoại, GitHub, Codeforces, Stack Overflow. Dữ liệu từ
`PROFILE` — đều là thông tin đã có sẵn trên CV công khai.

### `Github` — `Github.jsx`
Lịch đóng góp GitHub (`react-github-calendar`, username từ `PROFILE.github`, màu
accent `#a78bfa`) kèm link tới profile.

### `CodeforcesRatingChart` — `CodeforcesRatingChart.jsx`
Component phức tạp nhất, **nạp lazy** vì kéo theo `recharts`. Xem chi tiết ở
[external-apis.md](./external-apis.md).
- **Props**: `username` (Codeforces handle).
- Fetch `user.rating` (đồ thị rating) và `user.status` (số bài đã giải).
- Vẽ `LineChart` với các dải màu rank nền (`ReferenceArea`), `CustomTooltip`
  hiển thị contest/delta/rating. Trục X là tổng số bài đã giải tích lũy.

### `RatingColor` — `RatingColor.js`
Hàm `ratingColor(rating)` → mã màu theo rank Codeforces.

## Trang Stack — `src/components/Stack/Stack.jsx`

Trang công nghệ đầy đủ, đọc từ `SKILL_GROUPS`.
- **Chú giải** ba mức (`core` / `working` / `familiar`) + tổng số công nghệ.
- **Bộ lọc** theo nhóm (chip `pf-filter`), mặc định "Tất cả".
- Mỗi nhóm là một thẻ: icon + tiêu đề + blurb + danh sách skill. Mỗi skill hiển
  thị 3 chấm mức độ (`LevelDots`, component nội bộ), tên, và `note` ngữ cảnh.
- Nhóm `devops` có `featured: true` → nền nhấn và chiếm 2 cột từ 1100px trở lên.

## Trang Projects — `src/components/Projects/`

### `Projects` — `Projects.jsx`
Hai phần.
1. **Demo chạy thật**: tab dọc bên trái (`LIVE_DEMOS`) + panel bên phải nhúng
   `<iframe>` route full-screen. `key` theo tab để remount khi đổi demo. Summary
   ẩn mặc định, nằm trong dropdown dưới tiêu đề (render `t(bodyKey)` qua
   `dangerouslySetInnerHTML` vì chuỗi dịch có `<br/>`, `<b>`). Có link "Mở toàn
   màn hình".
2. **Toàn bộ danh mục**: bộ lọc theo `KIND` (`live` / `oss` / `work` / `infra`) +
   lưới `ProjectCard` từ `PROJECTS`.

### `ProjectCard` — `ProjectCard.jsx`
Một thẻ dự án.

| Prop | Kiểu | Ý nghĩa |
|------|------|---------|
| `project` | object | phần tử của `PROJECTS` (xem [data-layer.md](./data-layer.md)) |

Hiển thị icon, badge loại, khoảng thời gian (`ongoing` → "— Hiện tại"), tiêu đề,
mô tả, tag công nghệ, và các link. `links: []` → hiện nhãn "Mã nguồn riêng tư";
link có `internal: true` dùng `<Link>` của react-router.

## Trang Resume — `src/components/Resume/Resume.jsx`

Nhúng `src/Assets/Resume_CuongNguyenManh.pdf` bằng thẻ `<object>` — giao cho
trình xem PDF sẵn có của trình duyệt. Trình duyệt không xem được inline thì
`<object>` tự rơi về khối fallback có nút tải. Nút "Tải PDF" xuất hiện cả ở
header section lẫn cuối trang.

> Bản cũ (`ResumeNew.jsx`) render bằng `react-pdf` với worker pdf.js lấy từ CDN
> cloudflare — CDN lỗi là trang trắng. Đã bỏ cùng dependency `react-pdf`.

## Đa ngôn ngữ — `src/components/Language/LanguagePicker.jsx`

Dropdown tự viết (không react-bootstrap) chọn EN/VI, hiển thị mã ngôn ngữ dạng
mono. Đóng khi click ra ngoài hoặc nhấn Escape. Gọi `i18n.changeLanguage(lang)`
và lưu `localStorage['language']`.
