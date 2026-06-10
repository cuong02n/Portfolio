// Default company diagrams shipped with the module. Visitors can drag, edit and
// rewire these freely — changes are kept in localStorage and never touch this
// file, so "Reset" always restores exactly what's here.
//
// Shape (kept JSON-serialisable so Export/Import round-trips cleanly):
//   company: { id, name, nodes[], edges[] }
//   node:    { id, type:'flowNode', position:{x,y}, data:{ kind, label, subtitle? } }
//   edge:    { id, source, target, label?, data:{ kind } }
//
// Bump SCHEMA_VERSION when the shape changes so storage.js can drop stale state.
export const SCHEMA_VERSION = 1

const n = (id, kind, label, x, y, subtitle) => ({
  id,
  type: 'flowNode',
  position: { x, y },
  data: subtitle ? { kind, label, subtitle } : { kind, label },
})

const e = (source, target, kind, label) => ({
  id: `${source}-${target}-${kind}`,
  source,
  target,
  label,
  data: { kind },
})

// ── Company A — microservice e-commerce platform ─────────────────────────────
const companyA = {
  id: 'company-a',
  name: 'Company A · E-commerce',
  nodes: [
    n('web',      'frontend', 'Web App',        40,  220, 'React SPA'),
    n('mobile',   'frontend', 'Mobile App',     40,  360, 'Android/iOS'),
    n('gw',       'gateway',  'API Gateway',    280, 290, 'Spring Cloud'),
    n('iam',      'iam',      'IAM',            280, 80,  'Keycloak'),
    n('order',    'service',  'Order Service',  560, 140, 'Spring Boot'),
    n('payment',  'service',  'Payment Service',560, 290, 'Spring Boot'),
    n('inventory','service',  'Inventory Svc',  560, 440, 'Spring Boot'),
    n('kafka',    'broker',   'Kafka',          840, 290, 'Event bus'),
    n('notif',    'service',  'Notification',  1120, 290, 'Spring Boot'),
    n('orderdb',  'database', 'Orders DB',      560, -10, 'PostgreSQL'),
    n('paydb',    'database', 'Payments DB',    840, 440, 'PostgreSQL'),
    n('redis',    'cache',    'Cache',          840, 140, 'Redis'),
    n('stripe',   'external', 'Stripe',         840, 580, 'Payment API'),
  ],
  edges: [
    e('web', 'gw', 'api'),
    e('mobile', 'gw', 'api'),
    e('web', 'iam', 'oauth'),
    e('gw', 'iam', 'oauth'),
    e('gw', 'order', 'api'),
    e('gw', 'payment', 'api'),
    e('gw', 'inventory', 'api'),
    e('order', 'orderdb', 'jdbc'),
    e('order', 'redis', 'redis'),
    e('payment', 'paydb', 'jdbc'),
    e('payment', 'stripe', 'api'),
    e('order', 'kafka', 'kafka', 'order.created'),
    e('payment', 'kafka', 'kafka', 'payment.paid'),
    e('inventory', 'kafka', 'kafka', 'stock.reserved'),
    e('kafka', 'notif', 'kafka', 'consume'),
  ],
}

// ── Company B — data / analytics pipeline ────────────────────────────────────
const companyB = {
  id: 'company-b',
  name: 'Company B · Data Platform',
  nodes: [
    n('dash',    'frontend', 'Dashboard',     40,  240, 'Next.js'),
    n('api',     'gateway',  'BFF / API',     300, 240, 'NestJS'),
    n('auth',    'iam',      'Auth',          300, 60,  'Keycloak'),
    n('ingest',  'service',  'Ingest Svc',    560, 140, 'Go'),
    n('etl',     'service',  'ETL Worker',    560, 360, 'Python'),
    n('queue',   'broker',   'Kafka',         820, 240, 'Streams'),
    n('warehouse','database','Warehouse',    1080, 140, 'PostgreSQL'),
    n('lake',    'storage',  'Data Lake',    1080, 360, 'S3'),
  ],
  edges: [
    e('dash', 'api', 'api'),
    e('dash', 'auth', 'oauth'),
    e('api', 'auth', 'oauth'),
    e('api', 'ingest', 'grpc'),
    e('ingest', 'queue', 'kafka', 'events.raw'),
    e('queue', 'etl', 'kafka', 'consume'),
    e('etl', 'warehouse', 'jdbc'),
    e('etl', 'lake', 'api', 'parquet'),
    e('api', 'warehouse', 'jdbc'),
  ],
}

export const SEED_COMPANIES = [companyA, companyB]
