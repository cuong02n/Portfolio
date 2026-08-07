# Tích hợp API & dữ liệu ngoài

Không có backend riêng. Mọi dữ liệu động được gọi trực tiếp từ trình duyệt tới
các public API.

## 1. Codeforces API

Builder URL: `src/api/CodeforcesApi.js`.

```js
BASE_URL = "https://codeforces.com"
USER_STATUS(username)                       // /api/user.status?handle=...
GET_SUBMISSIONS_BY_CONTEST(contestId, n)    // /api/contest.status?...
GET_USER_RATINGS(usernames)                 // /api/user.info?handles=...
GET_RATING_GRAPH(username)                  // /api/user.rating?handle=...
```

### `CodeforcesRatingChart` — `src/components/About/CodeforcesRatingChart.jsx`

Handle dùng: **`cuong2905say`** — truyền từ `About.jsx` qua
`PROFILE.codeforces` (`src/data/profile.js`).

Component được **nạp lazy** (`React.lazy` trong `About.jsx`) vì nó kéo theo
`recharts` — dependency nặng nhất của trang.

Luồng dữ liệu:
1. `fetchData()` → `GET_RATING_GRAPH` lấy lịch sử rating từng contest → `data`.
2. `fetchProblemsSolved()` → `USER_STATUS` lấy mọi submission, lọc `verdict==='OK'`
   và loại trùng theo tên bài → `problemsSolved`.
3. `useEffect` thứ hai ghép hai nguồn: tính số bài đã giải tích lũy tại mỗi mốc
   contest (`counts.total`) → `graphData`.

Hiển thị (recharts `LineChart`):
- **Trục X** = `counts.total` (tổng bài đã giải tích lũy).
- **Trục Y** = rating; các mốc rank vẽ bằng `ReferenceArea` với màu theo rank
  Codeforces (xám → đỏ).
- `CustomTooltip` hiển thị rank, ngày, tên contest, delta, rating mới.
- `ratingColor()` (`RatingColor.js`) map rating → màu cho phần thống kê dưới biểu
  đồ.

Lỗi fetch được nuốt (`catch` → set mảng rỗng + `console.log`), nên khi Codeforces
chặn/timeout biểu đồ chỉ trống chứ không crash.

> Đổi handle Codeforces: sửa `PROFILE.codeforces` trong `src/data/profile.js`
> (dùng chung cho biểu đồ, khối liên hệ và footer).

## 2. GitHub Contribution Calendar

`src/components/About/Github.jsx` dùng `react-github-calendar` v3:
- **username**: lấy từ `PROFILE.github` (`cuong02n`).
- Props: `blockSize`, `blockMargin`, `color` (`#a78bfa`), `fontSize`.
- Tự gọi API GitHub nội bộ của thư viện, không cần token.

> Package export ESM qua trường `module` (`dist/index.es.js`) — bản build cho
> trình duyệt nhận đúng `default` là component. Nếu bundle cho Node/SSR, Rollup
> lấy nhánh CJS và `default` trở thành object; đây là đặc thù interop, không ảnh
> hưởng bản chạy thật.

## 3. PDF Resume

`src/components/Resume/Resume.jsx` nhúng PDF bằng thẻ **`<object>`**:
- File nguồn: `src/Assets/Resume_CuongNguyenManh.pdf` (import như asset, Vite băm
  tên khi build).
- Giao cho **trình xem PDF sẵn có của trình duyệt** — không thư viện, không CDN.
- Trình duyệt không xem được inline → `<object>` tự rơi về khối fallback có nút
  tải, kèm chuỗi `resume.failed`.

> Bản cũ dùng `react-pdf` với worker pdf.js nạp từ
> `cdnjs.cloudflare.com` theo đúng version pdf.js. CDN lỗi hoặc lệch version là
> trang trắng — đã bỏ cùng dependency.

> Cập nhật CV: thay file PDF tại `src/Assets/Resume_CuongNguyenManh.pdf`, rồi
> đồng bộ lại `src/data/experience.js` cho khớp.

## Lưu ý chung

- Tất cả gọi mạng đều phía client → phụ thuộc CORS & uptime của Codeforces và
  GitHub.
- Font được self-host qua `@fontsource` → không còn phụ thuộc Google Fonts CDN.
- Không có biến môi trường / API key nào trong repo (`.env*` bị gitignore); env
  duy nhất là URL backend của feature module phone-crawler.
