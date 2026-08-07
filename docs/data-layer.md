# Lớp dữ liệu — `src/data/`

Toàn bộ **nội dung** của portfolio (mình là ai, đã làm ở đâu, biết công nghệ gì,
đã xây dự án nào) được khai báo dưới dạng dữ liệu trong `src/data/`, tách khỏi
component. Muốn cập nhật portfolio thì sửa ở đây — hầu như không cần chạm JSX.

## Nguyên tắc chung

- File data chỉ chứa **danh từ riêng và giá trị ổn định**: tên công ty, tên công
  nghệ, URL, mốc thời gian, phiên bản.
- Mọi **câu văn hiển thị** nằm trong `src/Assets/lang/i18n.js` và được tham chiếu
  từ data qua các trường có hậu tố `Key` (`titleKey`, `descKey`, `bulletKeys`…).
- Component nhận key rồi gọi `t(key)` khi render → đổi ngôn ngữ không cần sửa data.

## `profile.js`

| Export | Nội dung |
|--------|----------|
| `PROFILE` | Tên, email, SĐT, domain, handle GitHub / Codeforces / Stack Overflow, các URL |
| `STATS` | 4 con số trên hero (`value` hiển thị nguyên văn, `labelKey` là chú thích dịch) |
| `TYPED_ROLE_KEYS` | Danh sách key cho hiệu ứng gõ chữ ở hero |

CV **không** nằm trong `PROFILE` — component import trực tiếp
`src/Assets/Resume_CuongNguyenManh.pdf` để Vite băm tên file khi build.

## `experience.js`

Phản chiếu nội dung CV (`src/Assets/Resume_CuongNguyenManh.pdf`) — **cập nhật CV
thì cập nhật luôn file này**.

| Export | Nội dung |
|--------|----------|
| `EXPERIENCE` | Lịch sử công việc, mới nhất trước. `to: null` + `current: true` → render "Hiện tại" |
| `EDUCATION` | Học vấn (HUST) |
| `CERTIFICATIONS` | Chứng chỉ (OCA 1Z0-808, Codeforces, TOEIC) |

Mỗi mục việc làm gồm `company`, `roleKey`, `from`/`to`, `summaryKey`,
`bulletKeys[]` và `stack[]` (tag công nghệ, hiển thị nguyên văn).

## `skills.js`

Nguồn của trang **`/stack`**. Dựng từ hệ thống thật đã làm — chủ yếu là nền tảng
**NEXUSTI DCMS** (13 service triển khai độc lập: mono-collection, mono-teller,
mono-reporting, nexus-account, nexus-calendar, nexus-notification,
common-resource, activiti engine + modeler, nx-collection-etl, crm, ppe và
framework hạ tầng dcms-onboarding) cộng các vai trò trước đó ở DAC Data và
Vietdefi.

| Export | Nội dung |
|--------|----------|
| `SKILL_GROUPS` | 10 nhóm công nghệ, mỗi nhóm có `icon`, `titleKey`, `blurbKey`, `items[]` |
| `LEVELS` | `['core', 'working', 'familiar']` — thứ tự chú giải |
| `CORE_STACK` | Dải tag ngắn hiển thị ở trang chủ |

Nhóm (theo thứ tự hiển thị): `languages`, `backend`, `architecture`, `data`,
`messaging`, `workflow`, `security`, **`devops`** (đánh dấu `featured: true` →
chiếm 2 cột trên màn rộng), `frontend`, `tooling`.

Mỗi skill gồm:

| Trường | Ý nghĩa |
|--------|---------|
| `name` | Tên công nghệ (danh từ riêng, không dịch) |
| `note` | Ngữ cảnh cụ thể: phiên bản, đã dùng để làm gì (không dịch) |
| `level` | `core` = dùng hằng ngày, tự ra quyết định thiết kế · `working` = tự làm được việc production · `familiar` = đã làm ra sản phẩm, còn phải tra tài liệu |

> Quy ước: **không thêm công nghệ chưa từng dùng thật**. `note` phải nêu được
> service / pipeline / môi trường cụ thể đứng sau nó.

## `projects.js`

| Export | Nội dung |
|--------|----------|
| `LIVE_DEMOS` | 3 tab demo nhúng iframe ở trang Projects (`src` là route nội bộ) |
| `PROJECTS` | Toàn bộ danh mục dự án (kể cả dự án private, không có mã nguồn) |
| `FEATURED_PROJECTS` | Lọc `featured: true` — dùng ở trang chủ |
| `KIND` | Map loại dự án → key i18n cho badge |

Mỗi project gồm `icon`, `kind` (`live` / `oss` / `work` / `infra`), `period`
(+ `ongoing: true` → hiển thị "— Hiện tại"), `titleKey`, `descKey`, `tags[]` và
`links[]`. Link có `internal: true` sẽ dùng `<Link>` của react-router; `links: []`
tức là dự án private → thẻ hiện nhãn "Mã nguồn riêng tư".

`src/config/projects.js` vẫn giữ vai trò **registry route** của các feature
module (slug, route, env backend); `src/data/projects.js` là phần **hiển thị**.

## Thêm nội dung mới

1. Thêm entry vào file data tương ứng, dùng `*Key` cho phần văn bản.
2. Thêm key vào **cả `en` và `vi`** trong `src/Assets/lang/i18n.js`.
3. Chạy `npm run check:i18n` — script báo lỗi nếu thiếu key ở một ngôn ngữ hoặc
   có key khai báo mà không dùng.
