import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Monitor, Network, Box, KeyRound, Radio, Database, Zap, HardDrive, Cloud,
  ArrowLeft, ArrowRight, MousePointerClick, Layers, FileJson, Github,
  Boxes, Workflow,
} from 'lucide-react'
import { NODE_KINDS, EDGE_KINDS, nodeKind } from './lib/palette'
import { SYSTEM_FLOW_BASE } from './routes'
import './landing.css'

const ICONS = { Monitor, Network, Box, KeyRound, Radio, Database, Zap, HardDrive, Cloud }

// ── Mini architecture rendered in the hero (curated for looks, not the seed) ──
// Coordinates are in the 560×430 stage space; `z` lifts the card in 3D for depth.
const CARD = { w: 132, h: 56 }
const HERO_NODES = [
  { id: 'web',   kind: 'frontend', label: 'Web App',     sub: 'React SPA',   x: 16,  y: 40,  z: 64 },
  { id: 'gw',    kind: 'gateway',  label: 'API Gateway', sub: 'Spring Cloud', x: 208, y: 152, z: 128 },
  { id: 'order', kind: 'service',  label: 'Order Svc',   sub: 'Spring Boot', x: 410, y: 26,  z: 44 },
  { id: 'kafka', kind: 'broker',   label: 'Kafka',       sub: 'Event bus',   x: 420, y: 238, z: 96 },
  { id: 'db',    kind: 'database', label: 'Orders DB',   sub: 'PostgreSQL',  x: 226, y: 338, z: 24 },
  { id: 'cache', kind: 'cache',    label: 'Cache',       sub: 'Redis',       x: 14,  y: 246, z: 56 },
]
const HERO_EDGES = [
  { from: 'web',   to: 'gw',    kind: 'api' },
  { from: 'gw',    to: 'order', kind: 'api' },
  { from: 'gw',    to: 'cache', kind: 'redis' },
  { from: 'gw',    to: 'db',    kind: 'jdbc' },
  { from: 'order', to: 'kafka', kind: 'kafka', async: true },
  { from: 'order', to: 'db',    kind: 'jdbc' },
]

const center = (n) => ({ cx: n.x + CARD.w / 2, cy: n.y + CARD.h / 2 })
const byId = Object.fromEntries(HERO_NODES.map((n) => [n.id, n]))

const FEATURES = [
  { icon: MousePointerClick, title: 'Drag & drop', text: 'Pull components from the palette, wire them up by dragging between node handles.' },
  { icon: Layers, title: 'Multiple diagrams', text: 'Keep a separate board per company or system and switch between them in tabs.' },
  { icon: FileJson, title: 'Export / Import', text: 'Round-trip any board as plain JSON — share it, version it, or hand it off.' },
  { icon: Boxes, title: 'Local-first', text: 'Everything lives in your browser (localStorage). No account, no backend, instant.' },
]

export default function SystemFlowLanding() {
  const stageRef = useRef(null)

  // Lightweight pointer parallax — write rotation into CSS vars, no re-render.
  const onMove = useCallback((ev) => {
    const el = stageRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (ev.clientX - r.left) / r.width - 0.5
    const py = (ev.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${px * 18}deg`)
    el.style.setProperty('--rx', `${-py * 14}deg`)
  }, [])

  const onLeave = useCallback(() => {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
  }, [])

  return (
    <div className="sf-landing">
      {/* ambient backdrop */}
      <div className="sf-bg" aria-hidden="true">
        <span className="sf-blob sf-blob-a" />
        <span className="sf-blob sf-blob-b" />
        <span className="sf-blob sf-blob-c" />
        <div className="sf-grid-bg" />
      </div>

      <nav className="sf-nav">
        <Link to="/project" className="sf-nav-back"><ArrowLeft size={15} /> Portfolio</Link>
        <span className="sf-nav-brand"><Workflow size={16} /> System Flow</span>
        <a className="sf-nav-gh" href="https://github.com/cuong02n" target="_blank" rel="noreferrer">
          <Github size={15} /> <span>GitHub</span>
        </a>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="sf-hero">
        <div className="sf-hero-copy">
          <span className="sf-eyebrow">Interactive · Local-first · React Flow</span>
          <h1 className="sf-h1">
            System&nbsp;Flow <span className="sf-grad">Board</span>
          </h1>
          <p className="sf-lead">
            A hands-on canvas for sketching the architectures I build — microservices over
            REST&nbsp;/&nbsp;gRPC, async Kafka events, Keycloak&nbsp;IAM, PostgreSQL&nbsp;&amp;&nbsp;Redis.
            Drag the pieces, wire them up, and click any node for the full story.
          </p>
          <div className="sf-cta">
            <Link to={`${SYSTEM_FLOW_BASE}/board`} className="sf-btn sf-btn-primary">
              Open the board <ArrowRight size={17} />
            </Link>
            <a className="sf-btn sf-btn-ghost" href="https://github.com/cuong02n" target="_blank" rel="noreferrer">
              <Github size={16} /> Source
            </a>
          </div>
          <ul className="sf-badges">
            <li>React Flow</li>
            <li>Diagram</li>
            <li>localStorage</li>
            <li>No backend</li>
          </ul>
        </div>

        {/* 3D-ish architecture scene */}
        <div className="sf-scene" onMouseMove={onMove} onMouseLeave={onLeave}>
          <div className="sf-stage" ref={stageRef}>
            <svg className="sf-wires" viewBox="0 0 560 430" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                {Object.entries(EDGE_KINDS).map(([k, v]) => (
                  <linearGradient id={`sf-wire-${k}`} key={k} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={v.color} stopOpacity="0.15" />
                    <stop offset="50%" stopColor={v.color} stopOpacity="0.95" />
                    <stop offset="100%" stopColor={v.color} stopOpacity="0.15" />
                  </linearGradient>
                ))}
              </defs>
              {HERO_EDGES.map((e, i) => {
                const a = center(byId[e.from])
                const b = center(byId[e.to])
                const col = EDGE_KINDS[e.kind].color
                return (
                  <g key={i} className="sf-wire-g">
                    <line x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} stroke={col} strokeOpacity="0.18" strokeWidth="3" />
                    <line
                      x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
                      stroke={`url(#sf-wire-${e.kind})`}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeDasharray={e.async ? '2 9' : '7 11'}
                      className={`sf-wire ${e.async ? 'is-async' : ''}`}
                      style={{ animationDelay: `${i * -0.7}s` }}
                    />
                  </g>
                )
              })}
            </svg>

            {HERO_NODES.map((n) => {
              const k = nodeKind(n.kind)
              const Icon = ICONS[k.icon] || Box
              return (
                <div
                  key={n.id}
                  className="sf-node3d"
                  style={{
                    left: n.x, top: n.y, width: CARD.w,
                    '--accent': k.color, '--z': `${n.z}px`,
                  }}
                >
                  <span className="sf-node3d-ic"><Icon size={17} /></span>
                  <span className="sf-node3d-body">
                    <span className="sf-node3d-label">{n.label}</span>
                    <span className="sf-node3d-sub">{n.sub}</span>
                  </span>
                </div>
              )
            })}
          </div>
          <div className="sf-scene-floor" aria-hidden="true" />
        </div>
      </section>

      {/* ── Feature grid ──────────────────────────────────────────────────── */}
      <section className="sf-features">
        {FEATURES.map((f) => (
          <article className="sf-feat" key={f.title}>
            <span className="sf-feat-ic"><f.icon size={20} /></span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </article>
        ))}
      </section>

      {/* ── Palette showcase ──────────────────────────────────────────────── */}
      <section className="sf-kinds">
        <h2 className="sf-kinds-title">Everything you can model</h2>
        <p className="sf-kinds-sub">Nine building blocks and six connection types, each with its own colour.</p>
        <div className="sf-kinds-row">
          {Object.entries(NODE_KINDS).map(([key, k]) => {
            const Icon = ICONS[k.icon] || Box
            return (
              <span className="sf-chip" key={key} style={{ '--accent': k.color }}>
                <Icon size={15} /> {k.label}
              </span>
            )
          })}
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────────────────── */}
      <section className="sf-final">
        <h2>Ready to sketch a system?</h2>
        <p>Open the board, drag a few components onto the canvas, and connect them.</p>
        <Link to={`${SYSTEM_FLOW_BASE}/board`} className="sf-btn sf-btn-primary sf-btn-lg">
          Open the board <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  )
}
