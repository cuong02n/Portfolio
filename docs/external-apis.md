# Tích hợp API & dữ liệu ngoài

Không có backend riêng. Mọi dữ liệu động được gọi trực tiếp từ trình duyệt tới
các public API.

## 1. Codeforces API

Builder URL: `src/api/CodeforcesApi.js` (và bản trùng `src/api/api.js`).

```js
BASE_URL = "https://codeforces.com"
USER_STATUS(username)                       // /api/user.status?handle=...
GET_SUBMISSIONS_BY_CONTEST(contestId, n)    // /api/contest.status?...
GET_USER_RATINGS(usernames)                 // /api/user.info?handles=...
GET_RATING_GRAPH(username)                  // /api/user.rating?handle=...
```

### `CodeforcesRatingChart` — `src/components/About/CodeforcesRatingChart.js`

Handle dùng: **`cuong2905say`** (truyền từ `About.js`).

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

> Đổi handle Codeforces: sửa prop `username` trong `src/components/About/About.js`.

## 2. GitHub Contribution Calendar

`src/components/About/Github.js` dùng `react-github-calendar`:
- **username**: `cuong02n`
- Tự gọi API GitHub nội bộ của thư viện, không cần token.
- Dòng "Updated on" tính bằng `new Date()` lúc render (giờ máy client).

## 3. PDF Resume

`src/components/Resume/ResumeNew.js` dùng `react-pdf`:
- File nguồn: `src/Assets/Resume_CuongNguyenManh.pdf` (import như asset).
- Worker pdf.js nạp từ CDN:
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/<version>/pdf.worker.min.js`.
- Chỉ render trang 1; nút Download mở PDF ở tab mới.

> Cập nhật CV: thay file PDF tại `src/Assets/Resume_CuongNguyenManh.pdf`
> (giữ nguyên tên hoặc sửa import trong `ResumeNew.js`).

## Lưu ý chung

- Tất cả gọi mạng đều phía client → phụ thuộc CORS & uptime của dịch vụ bên thứ
  ba (Codeforces, GitHub, cloudflare CDN).
- Không có biến môi trường / API key nào trong repo (`.env*` bị gitignore).
