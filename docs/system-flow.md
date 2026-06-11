# Feature module: system-flow

**System Flow Board** — bảng vẽ kiến trúc hệ thống dạng node kéo-thả. Người xem
phác họa/sửa sơ đồ các hệ thống (microservices, API gateway, Kafka, IAM Keycloak,
PostgreSQL, Redis…) ngay trên trình duyệt. Khác phone-crawler, module này
**thuần frontend — không có backend**: dữ liệu sơ đồ lưu ở `localStorage`.

Module có **2 màn**: một **landing page** (cửa ngõ giới thiệu, hero "3D" thuần
CSS/SVG) ở route gốc, và **editor** (bảng vẽ) ở route con `/board`.

- **Routes** (khai báo nested trong `SystemFlowApp.jsx`, mount tại
  `/projects/system-flow/*` ở `src/App.jsx`):
  - `/projects/system-flow` → **landing** (`SystemFlowLanding.jsx`)
  - `/projects/system-flow/board` → **editor** (`FlowEditor`, bọc `ReactFlowProvider`)
  - path lạ → redirect về landing.
- **Thư mục**: `src/features/system-flow/`
- **Thư viện**: [React Flow](https://reactflow.dev) (`@xyflow/react` v12) — render
  canvas, node, edge, minimap, controls. Landing **không** dùng React Flow (chỉ
  CSS/SVG) nên không gánh context của nó. Icon dùng `lucide-react`.
- **Lưu trữ**: `localStorage['system-flow:diagrams']`. Ai cũng sửa được, chỉ ảnh
  hưởng trình duyệt của họ; **Reset** xoá key → khôi phục seed gốc.

## Cấu trúc module

```
features/system-flow/
  SystemFlowApp.jsx        # router của module (landing vs /board) + FlowEditor
                           #   - <Routes>: index→landing, board→editor, * →redirect
                           #   - FlowEditor: <div className="flow-scope"> bao UI editor
                           #   - topbar: tabs công ty, Reset/Export/Import, link "← Overview"
                           #   - 3 cột: palette | canvas (ReactFlow) | inspector
                           #   - single source of truth = state `companies`; mọi thay đổi
                           #     node/edge đi qua applyNodeChanges/applyEdgeChanges
  SystemFlowLanding.jsx    # landing page (hero "3D" CSS/SVG, parallax, features, CTA)
  landing.css              # style landing, scope dưới .sf-landing
  routes.js                # SYSTEM_FLOW_BASE (tách riêng, tránh circular import)
  flow.css                 # style editor scope dưới .flow-scope (+ override .react-flow__*)
  nodes/FlowNode.jsx       # custom node: icon theo `data.kind`, 4 handle (mỗi cạnh 1)
  nodes/NodeDetailPopup.jsx# popup chi tiết node, hiện ở vị trí con trỏ khi click
  lib/palette.js           # NODE_KINDS, PALETTE, EDGE_KINDS, EDGE_ORDER (data thuần, no JSX)
  lib/storage.js           # load/save/reset + export/import JSON 1 công ty
  data/seed.js             # SCHEMA_VERSION + SEED_COMPANIES (2 sơ đồ mẫu, có description/tags)
```

## Mô hình dữ liệu (JSON-serialisable)

```js
company = { id, name, nodes[], edges[] }
node    = { id, type:'flowNode', position:{x,y},
            data:{ kind, label, subtitle?, description?, tags?[] } }
edge    = { id, source, target, label?, data:{ kind } }
```

- **`node.data.kind`** ∈ `palette.NODE_KINDS` (frontend, gateway, service, iam,
  broker, database, cache, storage, external) → chọn icon (lucide) + màu accent.
- **`description` + `tags`** (tuỳ chọn) là dữ liệu "chi tiết" hiển thị trong popup
  khi click node; sửa được ở inspector. Thêm 2 trường này nên đã **bump
  `SCHEMA_VERSION` lên `2`** (state cũ version 1 sẽ tự fallback về seed).
- **`edge.data.kind`** ∈ `palette.EDGE_KINDS` (api, grpc, kafka, jdbc, redis,
  oauth) → chọn màu + nhãn + kiểu line. `style:'async'` (kafka) → line nét đứt +
  animation; `style:'sync'` → line liền. Edge được "decorate" lúc render
  (`decorate()` trong `SystemFlowApp.jsx`), còn lưu trữ thì giữ dạng raw.

## Lưu trữ & schema version

- Key: `localStorage['system-flow:diagrams']`, shape `{ version, companies[] }`.
- `SCHEMA_VERSION` trong `data/seed.js`. **Khi đổi shape dữ liệu phải bump
  version** — `storage.js` thấy version lệch (hoặc JSON hỏng) sẽ tự fallback về
  seed thay vì render canvas lỗi.
- `seed.js` là nguồn "mẫu gốc"; Reset luôn khôi phục đúng nội dung file này.

## Tính năng UI

- **Palette** (trái): kéo component vào canvas (`dataTransfer 'application/flow-kind'`
  → `onDrop` dùng `screenToFlowPosition`), hoặc click để thêm ở giữa. Có legend
  các loại kết nối.
- **Canvas** (giữa): kéo node, nối edge bằng cách kéo từ handle này sang node
  khác (`onConnect` tạo edge kind mặc định `api`). Xoá bằng phím `Delete`/
  `Backspace`. Có Background grid, Controls, MiniMap (màu theo kind).
- **Popup chi tiết node** (`NodeDetailPopup.jsx`): click một node → hiện popup
  lớn **ngay tại con trỏ** (`onNodeClick` lấy `clientX/clientY`), tự lật/ghim để
  luôn nằm trong viewport (`useLayoutEffect` đo kích thước). Hiển thị icon + nhãn
  + loại (badge) + subtitle + `description` + `tags`, và **danh sách kết nối**
  (đi ra "Calls / sends" và đi vào "Called / fed by", suy ra từ `edges`). Đóng
  bằng click ra ngoài / `Esc` / nút ✕ / click vào canvas (`onPaneClick`). Đây là
  view **chỉ đọc**; sửa vẫn ở inspector.
- **Inspector** (phải): đổi tên/xoá công ty; sửa label/subtitle/**description**/
  **tags**/kind của node; sửa kind/label của edge; nút xoá.
- **Tabs công ty**: chuyển/thêm nhiều sơ đồ tách biệt.
- **Reset / Export / Import**: Export/Import một công ty dạng `.json`
  (`exportCompany`/`parseCompany`).
- **Landing page** (`SystemFlowLanding.jsx`): hero "3D" thuần CSS (`perspective`
  + `preserve-3d` + parallax theo chuột ghi vào CSS var, không re-render), sơ đồ
  mini với node bay (`translateZ`) và đường nối SVG chạy animation; kèm khối
  features, showcase các loại node, và CTA "Open the board →" dẫn sang `/board`.

## Đăng ký & quy ước đã theo

- `src/config/projects.js`: thêm entry slug `system-flow` (không có `apiBase`/
  `wsBase` vì không backend).
- `src/components/Projects/Projects.jsx`: thêm `<ProjectCard internalLink=
  "/projects/system-flow">` — link này nay mở **landing page** (cửa ngõ), từ đó
  bấm "Open the board" để vào editor.
- i18n: key `System Flow Board` + `System Flow Description` ở **cả** khối `en` và
  `vi` của `src/Assets/lang/i18n.js`. Lưu ý: UI **bên trong** module (editor +
  landing) hardcode tiếng Anh — bám theo style sẵn có của `FlowEditor`, không qua
  i18n; i18n chỉ dùng cho card ở trang Projects của portfolio.
- **CSS scope**: editor scope dưới `.flow-scope`, landing scope dưới `.sf-landing`
  (prefix mọi selector, kể cả override `.react-flow__*`). Hai scope tách biệt.

## Lưu ý kỹ thuật

- `SYSTEM_FLOW_BASE` để ở `routes.js` riêng (cả app shell lẫn landing import được
  mà không vòng tròn phụ thuộc với `SystemFlowApp.jsx`).
- Chỉ **editor** mới bọc `<ReactFlowProvider>` (cần `useReactFlow()` →
  `screenToFlowPosition` cho drag-drop); landing không dùng nên không bọc.
- `nodeTypes` khai báo ở module scope (ngoài component) để tránh React Flow cảnh
  báo tạo lại object mỗi render.
- Popup định vị `position: fixed` theo toạ độ con trỏ; lấy node "live" từ
  `active.nodes` theo `id` nên sửa ở inspector là popup cập nhật theo.
- Parallax hero ghi thẳng vào CSS var (`--rx`/`--ry`) qua `ref`, **không**
  set state → không re-render khi rê chuột. Mọi animation đều tắt dưới
  `prefers-reduced-motion`.
- Trước khi lưu/export, `clean()` strip cờ tạm `selected`/`dragging`.
- Phụ thuộc thêm: `@xyflow/react`. Cài bằng `npm i --legacy-peer-deps` (xem
  `.npmrc`).
