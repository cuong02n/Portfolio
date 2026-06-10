// Catalog of the building blocks a system-flow diagram can contain.
//
// A node has a `kind` that picks its icon + accent colour (rendered by
// FlowNode). An edge has a `kind` that picks its label + line style. Keeping
// these as plain data (no JSX) lets the seed diagrams, the palette UI and the
// custom node/edge renderers all read from the same source of truth.
//
// Icons are lucide-react names (already a portfolio dependency); FlowNode maps
// the string to the actual component so this file stays JSX-free.

export const NODE_KINDS = {
  frontend: { label: 'Frontend',     icon: 'Monitor',      color: '#38bdf8' },
  gateway:  { label: 'API Gateway',  icon: 'Network',      color: '#a78bfa' },
  service:  { label: 'Microservice', icon: 'Box',          color: '#4ade80' },
  iam:      { label: 'IAM',          icon: 'KeyRound',     color: '#fbbf24' },
  broker:   { label: 'Message Bus',  icon: 'Radio',        color: '#fb7185' },
  database: { label: 'Database',     icon: 'Database',     color: '#60a5fa' },
  cache:    { label: 'Cache',        icon: 'Zap',          color: '#f472b6' },
  storage:  { label: 'Object Store', icon: 'HardDrive',    color: '#2dd4bf' },
  external: { label: 'External',     icon: 'Cloud',        color: '#94a3b8' },
}

// Palette order shown in the sidebar (drag source list).
export const PALETTE = [
  'frontend', 'gateway', 'service', 'iam', 'broker',
  'database', 'cache', 'storage', 'external',
]

// Connection types. `style` controls the edge line: `async` edges animate and
// dash (events/messages), `sync` edges are solid (request/response).
export const EDGE_KINDS = {
  api:   { label: 'REST API', color: '#a78bfa', style: 'sync'  },
  grpc:  { label: 'gRPC',     color: '#4ade80', style: 'sync'  },
  kafka: { label: 'Kafka',    color: '#fb7185', style: 'async' },
  jdbc:  { label: 'SQL/JDBC', color: '#60a5fa', style: 'sync'  },
  redis: { label: 'Redis',    color: '#f472b6', style: 'sync'  },
  oauth: { label: 'OAuth2',   color: '#fbbf24', style: 'sync'  },
}

export const EDGE_ORDER = ['api', 'grpc', 'kafka', 'jdbc', 'redis', 'oauth']

export const nodeKind = (kind) => NODE_KINDS[kind] || NODE_KINDS.service
export const edgeKind = (kind) => EDGE_KINDS[kind] || EDGE_KINDS.api
