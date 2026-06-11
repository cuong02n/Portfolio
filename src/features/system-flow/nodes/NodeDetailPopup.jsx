import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Monitor, Network, Box, KeyRound, Radio, Database, Zap, HardDrive, Cloud,
  X, ArrowRight, ArrowLeft, Pencil,
} from 'lucide-react'
import { nodeKind, edgeKind } from '../lib/palette'

const ICONS = { Monitor, Network, Box, KeyRound, Radio, Database, Zap, HardDrive, Cloud }

const MARGIN = 12   // keep the card this far from the viewport edges
const OFFSET = 16   // gap between the cursor and the card

// Rich, read-only detail card shown at the cursor when a node is clicked.
// Editing still happens in the right-hand inspector; this is the "tell me more".
export default function NodeDetailPopup({ node, nodes, edges, at, onClose, onEdit }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ left: at.x + OFFSET, top: at.y + OFFSET, ready: false })

  // Flip / clamp so the card always stays fully on screen, near the cursor.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    let left = at.x + OFFSET
    let top = at.y + OFFSET
    if (left + width + MARGIN > vw) left = at.x - width - OFFSET   // flip left
    if (top + height + MARGIN > vh) top = at.y - height - OFFSET   // flip up
    left = Math.max(MARGIN, Math.min(left, vw - width - MARGIN))
    top = Math.max(MARGIN, Math.min(top, vh - height - MARGIN))
    setPos({ left, top, ready: true })
  }, [at.x, at.y, node.id])

  // Esc, or a click anywhere outside the card, closes it. (Clicking another
  // node still reopens via the canvas's onNodeClick — fires after this.)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
    }
  }, [onClose])

  const k = nodeKind(node.data.kind)
  const Icon = ICONS[k.icon] || Box
  const labelOf = (id) => nodes.find((n) => n.id === id)?.data?.label || id

  const outgoing = edges.filter((e) => e.source === node.id)
  const incoming = edges.filter((e) => e.target === node.id)
  const tags = node.data.tags || []

  const ConnRow = ({ edge, peerId, dir }) => {
    const ek = edgeKind(edge.data?.kind)
    return (
      <li className="flow-pop-conn">
        <span className="flow-pop-dot" style={{ background: ek.color }} />
        <span className="flow-pop-conn-kind" style={{ color: ek.color }}>{edge.label || ek.label}</span>
        {dir === 'out'
          ? <ArrowRight size={12} className="flow-pop-arrow" />
          : <ArrowLeft size={12} className="flow-pop-arrow" />}
        <span className="flow-pop-conn-peer">{labelOf(peerId)}</span>
      </li>
    )
  }

  return (
    <div
      ref={ref}
      className="flow-pop"
      style={{ left: pos.left, top: pos.top, '--accent': k.color, visibility: pos.ready ? 'visible' : 'hidden' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flow-pop-glow" />
      <header className="flow-pop-head">
        <span className="flow-pop-ic"><Icon size={20} /></span>
        <div className="flow-pop-titles">
          <div className="flow-pop-title">{node.data.label || 'Untitled'}</div>
          <div className="flow-pop-kind">
            <span className="flow-pop-kind-badge">{k.label}</span>
            {node.data.subtitle && <span className="flow-pop-subtitle">{node.data.subtitle}</span>}
          </div>
        </div>
        <button className="flow-pop-x" onClick={onClose} aria-label="Close"><X size={15} /></button>
      </header>

      {node.data.description && <p className="flow-pop-desc">{node.data.description}</p>}

      {tags.length > 0 && (
        <div className="flow-pop-tags">
          {tags.map((t) => <span className="flow-pop-tag" key={t}>{t}</span>)}
        </div>
      )}

      {(outgoing.length > 0 || incoming.length > 0) && (
        <div className="flow-pop-conns">
          {outgoing.length > 0 && (
            <div className="flow-pop-conn-group">
              <div className="flow-pop-conn-label">Calls / sends</div>
              <ul>{outgoing.map((e) => <ConnRow key={e.id} edge={e} peerId={e.target} dir="out" />)}</ul>
            </div>
          )}
          {incoming.length > 0 && (
            <div className="flow-pop-conn-group">
              <div className="flow-pop-conn-label">Called / fed by</div>
              <ul>{incoming.map((e) => <ConnRow key={e.id} edge={e} peerId={e.source} dir="in" />)}</ul>
            </div>
          )}
        </div>
      )}

      <footer className="flow-pop-foot">
        <button className="flow-pop-edit" onClick={onEdit}><Pencil size={13} /> Edit in inspector</button>
      </footer>
    </div>
  )
}
