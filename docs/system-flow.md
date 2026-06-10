# Feature module: system-flow

**System Flow Board** — bảng vẽ kiến trúc hệ thống dạng node kéo-thả. Người xem
phác họa/sửa sơ đồ các hệ thống (microservices, API gateway, Kafka, IAM Keycloak,
PostgreSQL, Redis…) ngay trên trình duyệt. Khác phone-crawler, module này
**thuần frontend — không có backend**: dữ liệu sơ đồ lưu ở `localStorage`.

- **Route**: `/projects/system-flow/*` (khai báo trong `src/App.jsx`)
- **Thư mục**: `src/features/system-flow/`
- **Thư viện**: [React Flow](https://reactflow.dev) (`@xyflow/react` v12) — render
  canvas, node, edge, minimap, controls.
- **Lưu trữ**: `localStorage['system-flow:diagrams']`. Ai cũng sửa được, chỉ ảnh
  hưởng trình duyệt của họ; **Reset** xoá key → khôi phục seed gốc.

## Cấu trúc module

```
features/system-flow/
  SystemFlowApp.jsx     # shell + editor (bọc trong <ReactFlowProvider>)
                        #   - <div className="flow-scope"> bao toàn bộ UI
                        #   - topbar: tabs công ty, Reset/Export/Import, link "← Portfolio"
                        #   - 3 cột: palette | canvas (ReactFlow) | inspector
                        #   - single source of truth = state `companies`; mọi thay đổi
                        #     node/edge đi qua applyNodeChanges/applyEdgeChanges
  flow.css              # toàn bộ style scope dưới .flow-scope (+ override .react-flow__*)
  nodes/FlowNode.jsx    # custom node: icon theo `data.kind`, 4 handle (mỗi cạnh 1)
  lib/palette.js        # NODE_KINDS, PALETTE, EDGE_KINDS, EDGE_ORDER (data thuần, no JSX)
  lib/storage.js        # load/save/reset + export/import JSON 1 công ty
  data/seed.js          # SCHEMA_VERSION + SEED_COMPANIES (2 sơ đồ mẫu)
```

## Mô hình dữ liệu (JSON-serialisable)

```js
company = { id, name, nodes[], edges[] }
node    = { id, type:'flowNode', position:{x,y}, data:{ kind, label, subtitle? } }
edge    = { id, source, target, label?, data:{ kind } }
```

- **`node.data.kind`** ∈ `palette.NODE_KINDS` (frontend, gateway, service, iam,
  broker, database, cache, storage, external) → chọn icon (lucide) + màu accent.
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
- **Inspector** (phải): đổi tên/xoá công ty; sửa label/subtitle/kind của node;
  sửa kind/label của edge; nút xoá.
- **Tabs công ty**: chuyển/thêm nhiều sơ đồ tách biệt.
- **Reset / Export / Import**: Export/Import một công ty dạng `.json`
  (`exportCompany`/`parseCompany`).

## Đăng ký & quy ước đã theo

- `src/config/projects.js`: thêm entry slug `system-flow` (không có `apiBase`/
  `wsBase` vì không backend).
- `src/components/Projects/Projects.jsx`: thêm `<ProjectCard internalLink=
  "/projects/system-flow">`.
- i18n: key `System Flow Board` + `System Flow Description` ở **cả** khối `en` và
  `vi` của `src/Assets/lang/i18n.js`.
- CSS scope `.flow-scope` (prefix mọi selector, kể cả override `.react-flow__*`).

## Lưu ý kỹ thuật

- Phải bọc editor trong `<ReactFlowProvider>` để dùng `useReactFlow()`
  (`screenToFlowPosition` cho drag-drop).
- `nodeTypes` khai báo ở module scope (ngoài component) để tránh React Flow cảnh
  báo tạo lại object mỗi render.
- Trước khi lưu/export, `clean()` strip cờ tạm `selected`/`dragging`.
- Phụ thuộc thêm: `@xyflow/react`. Cài bằng `npm i --legacy-peer-deps` (xem
  `.npmrc`).
