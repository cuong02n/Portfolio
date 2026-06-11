import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import {
  ReactFlow, ReactFlowProvider, Background, Controls, MiniMap,
  applyNodeChanges, applyEdgeChanges, addEdge, useReactFlow, MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  Monitor, Network, Box, KeyRound, Radio, Database, Zap, HardDrive, Cloud,
  Plus, Trash2, RotateCcw, Download, Upload, ArrowLeft, X,
  MousePointerClick, GripVertical, Boxes, Cable,
} from 'lucide-react'
import FlowNode from './nodes/FlowNode'
import NodeDetailPopup from './nodes/NodeDetailPopup'
import SystemFlowLanding from './SystemFlowLanding'
import { NODE_KINDS, PALETTE, EDGE_KINDS, EDGE_ORDER, nodeKind, edgeKind } from './lib/palette'
import {
  loadState, saveState, resetState, exportCompany, parseCompany,
} from './lib/storage'
import { SYSTEM_FLOW_BASE } from './routes'
import './flow.css'

export { SYSTEM_FLOW_BASE }

// Split a comma-separated tag input into a clean array.
const splitTags = (s) => s.split(',').map((t) => t.trim()).filter(Boolean)

const PALETTE_ICONS = { Monitor, Network, Box, KeyRound, Radio, Database, Zap, HardDrive, Cloud }
const nodeTypes = { flowNode: FlowNode }

let _seq = 0
const uid = (p) => `${p}-${Date.now().toString(36)}-${_seq++}`

// Strip transient UI flags before persisting / exporting.
const clean = (companies) => companies.map((c) => ({
  ...c,
  nodes: c.nodes.map(({ selected, dragging, ...n }) => n),
  edges: c.edges.map(({ selected, ...e }) => e),
}))

// Turn a stored edge into a styled React Flow edge (colour, arrow, async dash).
const decorate = (edge) => {
  const k = edgeKind(edge.data?.kind)
  return {
    ...edge,
    label: edge.label || k.label,
    animated: k.style === 'async',
    style: { stroke: k.color, strokeWidth: 1.6, strokeDasharray: k.style === 'async' ? '6 4' : undefined },
    labelStyle: { fill: '#cbd5e1', fontSize: 11, fontWeight: 600 },
    labelBgStyle: { fill: '#0d1117', fillOpacity: 0.85 },
    labelBgPadding: [4, 2],
    markerEnd: { type: MarkerType.ArrowClosed, color: k.color, width: 16, height: 16 },
  }
}

function FlowEditor() {
  const { screenToFlowPosition } = useReactFlow()
  const fileRef = useRef(null)
  const saveTimer = useRef(null)

  const [companies, setCompanies] = useState(() => loadState().companies)
  const [activeId, setActiveId] = useState(() => loadState().companies[0]?.id)
  const [sel, setSel] = useState({ nodes: [], edges: [] })
  const [popup, setPopup] = useState(null) // { id, x, y } — node detail at cursor

  const active = companies.find((c) => c.id === activeId) || companies[0]

  // Close the detail popup when switching diagrams.
  useEffect(() => { setPopup(null) }, [activeId])

  // Persist (debounced) on every change. localStorage only — never the seed file.
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => saveState(clean(companies)), 350)
    return () => saveTimer.current && clearTimeout(saveTimer.current)
  }, [companies])

  const updateActive = useCallback(
    (fn) => setCompanies((cs) => cs.map((c) => (c.id === active.id ? fn(c) : c))),
    [active?.id],
  )

  // ── React Flow change handlers (single source of truth = companies) ────────
  const onNodesChange = useCallback(
    (ch) => updateActive((c) => ({ ...c, nodes: applyNodeChanges(ch, c.nodes) })),
    [updateActive],
  )
  const onEdgesChange = useCallback(
    (ch) => updateActive((c) => ({ ...c, edges: applyEdgeChanges(ch, c.edges) })),
    [updateActive],
  )
  const onConnect = useCallback(
    (conn) => updateActive((c) => ({
      ...c,
      edges: addEdge({ ...conn, id: uid('e'), data: { kind: 'api' } }, c.edges),
    })),
    [updateActive],
  )

  const displayEdges = useMemo(() => (active?.edges || []).map(decorate), [active?.edges])

  // ── Node detail popup (opens at the cursor on click) ───────────────────────
  const onNodeClick = useCallback((ev, node) => {
    setPopup({ id: node.id, x: ev.clientX, y: ev.clientY })
  }, [])
  const onPaneClick = useCallback(() => setPopup(null), [])
  const popupNode = popup && active?.nodes.find((n) => n.id === popup.id)

  // ── Add nodes (palette click → centre, or drag-drop → cursor) ──────────────
  const addNode = useCallback((kind, position) => {
    updateActive((c) => ({
      ...c,
      nodes: [...c.nodes, { id: uid('n'), type: 'flowNode', position, data: { kind, label: NODE_KINDS[kind].label } }],
    }))
  }, [updateActive])

  const onDrop = useCallback((ev) => {
    ev.preventDefault()
    const kind = ev.dataTransfer.getData('application/flow-kind')
    if (!kind) return
    addNode(kind, screenToFlowPosition({ x: ev.clientX, y: ev.clientY }))
  }, [addNode, screenToFlowPosition])

  const onDragOver = useCallback((ev) => {
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'move'
  }, [])

  // ── Inspector edits ────────────────────────────────────────────────────────
  const selNode = active?.nodes.find((n) => n.id === sel.nodes[0]?.id)
  const selEdge = active?.edges.find((e) => e.id === sel.edges[0]?.id)

  const patchNode = (id, patch) => updateActive((c) => ({
    ...c, nodes: c.nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n)),
  }))
  const patchEdge = (id, patch) => updateActive((c) => ({
    ...c, edges: c.edges.map((e) => (e.id === id ? { ...e, ...patch } : e)),
  }))
  const removeSelected = () => updateActive((c) => ({
    ...c,
    nodes: c.nodes.filter((n) => !sel.nodes.some((s) => s.id === n.id)),
    edges: c.edges.filter((e) => !sel.edges.some((s) => s.id === e.id)
      && !sel.nodes.some((s) => s.id === e.source || s.id === e.target)),
  }))

  // ── Company operations ─────────────────────────────────────────────────────
  const addCompany = () => {
    const c = { id: uid('c'), name: 'New Company', nodes: [], edges: [] }
    setCompanies((cs) => [...cs, c])
    setActiveId(c.id)
  }
  const renameActive = (name) => updateActive((c) => ({ ...c, name }))
  const deleteActive = () => {
    if (companies.length <= 1) return
    const next = companies.find((c) => c.id !== active.id)
    setCompanies((cs) => cs.filter((c) => c.id !== active.id))
    setActiveId(next.id)
  }
  const doReset = () => {
    if (!window.confirm('Reset all diagrams to the original samples? Your local edits will be lost.')) return
    const fresh = resetState().companies
    setCompanies(fresh)
    setActiveId(fresh[0].id)
  }
  const onImport = (ev) => {
    const file = ev.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const c = { ...parseCompany(String(reader.result)), id: uid('c') }
        setCompanies((cs) => [...cs, c])
        setActiveId(c.id)
      } catch (err) {
        window.alert(err.message || 'Could not import that file.')
      }
    }
    reader.readAsText(file)
    ev.target.value = ''
  }

  return (
    <div className="flow-scope">
      {/* ── Top toolbar ──────────────────────────────────────────────────── */}
      <header className="flow-topbar">
        <Link to={SYSTEM_FLOW_BASE} className="flow-back"><ArrowLeft size={14} /> Overview</Link>
        <div className="flow-title">System Flow <span>· architecture board</span></div>
        <div className="flow-tabs">
          {companies.map((c) => (
            <button
              key={c.id}
              className={`flow-tab${c.id === activeId ? ' active' : ''}`}
              onClick={() => setActiveId(c.id)}
            >
              {c.name || 'Untitled'}
            </button>
          ))}
          <button className="flow-tab add" onClick={addCompany} title="New company"><Plus size={14} /></button>
        </div>
        <div className="flow-actions">
          <button onClick={doReset} title="Reset to samples"><RotateCcw size={14} /> Reset</button>
          <button onClick={() => exportCompany(clean([active])[0])} title="Export JSON"><Download size={14} /> Export</button>
          <button onClick={() => fileRef.current?.click()} title="Import JSON"><Upload size={14} /> Import</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={onImport} />
        </div>
      </header>

      <div className="flow-main">
        {/* ── Palette ────────────────────────────────────────────────────── */}
        <aside className="flow-palette">
          <div className="flow-palette-head"><Boxes size={13} /> Components</div>
          <div className="flow-palette-hint">Drag onto the canvas, or click to drop one in</div>
          {PALETTE.map((kind) => {
            const k = NODE_KINDS[kind]
            const Icon = PALETTE_ICONS[k.icon] || Box
            return (
              <div
                key={kind}
                className="flow-palette-item"
                style={{ '--accent': k.color }}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('application/flow-kind', kind)}
                onClick={() => addNode(kind, { x: 260, y: 200 })}
              >
                <span className="pi-icon"><Icon size={16} /></span>
                <span className="pi-label">{k.label}</span>
                <GripVertical size={13} className="pi-grip" />
              </div>
            )
          })}
          <div className="flow-palette-head" style={{ marginTop: 16 }}><Cable size={13} /> Connections</div>
          {EDGE_ORDER.map((k) => {
            const ek = EDGE_KINDS[k]
            return (
              <div key={k} className="flow-legend-item">
                <span className={`legend-line${ek.style === 'async' ? ' dashed' : ''}`} style={{ '--c': ek.color }} />
                <span>{ek.label}</span>
              </div>
            )
          })}
        </aside>

        {/* ── Canvas ─────────────────────────────────────────────────────── */}
        <div className="flow-canvas" onDrop={onDrop} onDragOver={onDragOver}>
          <div className="flow-canvas-fx" aria-hidden="true" />
          <ReactFlow
            nodes={active?.nodes || []}
            edges={displayEdges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={setSel}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            deleteKeyCode={['Backspace', 'Delete']}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.2}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant="dots" gap={20} size={1.4} color="rgba(167, 139, 250, 0.18)" />
            <Controls showInteractive={false} />
            <MiniMap
              pannable
              zoomable
              nodeColor={(n) => nodeKind(n.data?.kind).color}
              nodeStrokeColor="rgba(255,255,255,0.15)"
              maskColor="rgba(5, 8, 16, 0.66)"
            />
          </ReactFlow>
          <div className="flow-hint">
            <MousePointerClick size={13} /> Click a node for details · drag a handle to connect
          </div>
        </div>

        {/* ── Inspector ──────────────────────────────────────────────────── */}
        <aside className="flow-inspector">
          <div className="flow-ins-label">Diagram</div>
          <input
            className="flow-company-name"
            value={active?.name || ''}
            onChange={(e) => renameActive(e.target.value)}
            placeholder="Company name"
          />
          <button className="flow-del-company" onClick={deleteActive} disabled={companies.length <= 1}>
            <Trash2 size={13} /> Delete this company
          </button>

          {selNode && (
            <div className="flow-inspect-card">
              <div className="ins-head">Node <X size={14} className="ins-x" onClick={() => setSel({ nodes: [], edges: [] })} /></div>
              <label>Label
                <input value={selNode.data.label || ''} onChange={(e) => patchNode(selNode.id, { label: e.target.value })} />
              </label>
              <label>Subtitle
                <input value={selNode.data.subtitle || ''} onChange={(e) => patchNode(selNode.id, { subtitle: e.target.value })} placeholder="e.g. Spring Boot" />
              </label>
              <label>Type
                <select value={selNode.data.kind} onChange={(e) => patchNode(selNode.id, { kind: e.target.value })}>
                  {PALETTE.map((k) => <option key={k} value={k}>{NODE_KINDS[k].label}</option>)}
                </select>
              </label>
              <label>Description
                <textarea
                  rows={3}
                  value={selNode.data.description || ''}
                  onChange={(e) => patchNode(selNode.id, { description: e.target.value })}
                  placeholder="What does this component do?"
                />
              </label>
              <label>Tech tags
                <input
                  value={(selNode.data.tags || []).join(', ')}
                  onChange={(e) => patchNode(selNode.id, { tags: splitTags(e.target.value) })}
                  placeholder="Spring Boot, Java 17"
                />
              </label>
              <button className="ins-delete" onClick={removeSelected}><Trash2 size={13} /> Delete node</button>
            </div>
          )}

          {selEdge && !selNode && (
            <div className="flow-inspect-card">
              <div className="ins-head">Connection <X size={14} className="ins-x" onClick={() => setSel({ nodes: [], edges: [] })} /></div>
              <label>Type
                <select value={selEdge.data?.kind || 'api'} onChange={(e) => patchEdge(selEdge.id, { data: { ...selEdge.data, kind: e.target.value } })}>
                  {EDGE_ORDER.map((k) => <option key={k} value={k}>{EDGE_KINDS[k].label}</option>)}
                </select>
              </label>
              <label>Label
                <input
                  value={selEdge.label || ''}
                  onChange={(e) => patchEdge(selEdge.id, { label: e.target.value })}
                  placeholder={edgeKind(selEdge.data?.kind).label}
                />
              </label>
              <button className="ins-delete" onClick={removeSelected}><Trash2 size={13} /> Delete connection</button>
            </div>
          )}

          {!selNode && !selEdge && (
            <div className="flow-inspect-empty">
              <span className="flow-empty-ic"><MousePointerClick size={22} /></span>
              <p>Select a node or connection to edit it.</p>
              <p className="dim">Drag from one node's handle to another to wire them up.</p>
            </div>
          )}
        </aside>
      </div>

      {popupNode && (
        <NodeDetailPopup
          node={popupNode}
          nodes={active.nodes}
          edges={active.edges}
          at={{ x: popup.x, y: popup.y }}
          onClose={() => setPopup(null)}
          onEdit={() => setPopup(null)}
        />
      )}
    </div>
  )
}

// Mount the editor under its own provider so the landing page (which has no
// canvas) doesn't pay for React Flow's context.
function BoardRoute() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  )
}

export default function SystemFlowApp() {
  return (
    <Routes>
      <Route index element={<SystemFlowLanding />} />
      <Route path="board" element={<BoardRoute />} />
      <Route path="*" element={<Navigate to={SYSTEM_FLOW_BASE} replace />} />
    </Routes>
  )
}
