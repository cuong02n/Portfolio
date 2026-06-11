// Default company diagrams shipped with the module. Visitors can drag, edit and
// rewire these freely — changes are kept in localStorage and never touch this
// file, so "Reset" always restores exactly what's here.
//
// Shape (kept JSON-serialisable so Export/Import round-trips cleanly):
//   company: { id, name, nodes[], edges[] }
//   node:    { id, type:'flowNode', position:{x,y},
//              data:{ kind, label, subtitle?, description?, tags?[] } }
//   edge:    { id, source, target, label?, data:{ kind } }
//
// `description` + `tags` power the node detail popup (see SystemFlowApp.jsx).
// Bump SCHEMA_VERSION when the shape changes so storage.js can drop stale state.
export const SCHEMA_VERSION = 2

// n(id, kind, label, x, y, extra) — `extra` carries the optional detail fields
// ({ subtitle, description, tags }) so the positional signature stays short.
const n = (id, kind, label, x, y, extra = {}) => ({
  id,
  type: 'flowNode',
  position: { x, y },
  data: { kind, label, ...extra },
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
    n('web', 'frontend', 'Web App', 40, 220, {
      subtitle: 'React SPA',
      description: 'Customer-facing storefront — catalogue, cart and checkout. Talks to the backend only through the API gateway.',
      tags: ['React', 'Vite', 'Redux'],
    }),
    n('mobile', 'frontend', 'Mobile App', 40, 360, {
      subtitle: 'Android / iOS',
      description: 'Native clients sharing the same gateway APIs as the web app, with push notifications for order updates.',
      tags: ['Kotlin', 'Swift', 'FCM'],
    }),
    n('gw', 'gateway', 'API Gateway', 280, 290, {
      subtitle: 'Spring Cloud',
      description: 'Single entry point — routing, rate limiting, request aggregation and JWT validation before forwarding to services.',
      tags: ['Spring Cloud Gateway', 'Resilience4j'],
    }),
    n('iam', 'iam', 'IAM', 280, 80, {
      subtitle: 'Keycloak',
      description: 'Centralised identity & access management. Issues OAuth2 / OIDC tokens; every service verifies the JWT.',
      tags: ['Keycloak', 'OAuth2', 'OIDC'],
    }),
    n('order', 'service', 'Order Service', 560, 140, {
      subtitle: 'Spring Boot',
      description: 'Owns the order lifecycle (create / confirm / cancel). Persists to its own DB and publishes domain events to Kafka.',
      tags: ['Spring Boot', 'Java 17', 'JPA'],
    }),
    n('payment', 'service', 'Payment Service', 560, 290, {
      subtitle: 'Spring Boot',
      description: 'Processes payments through Stripe, records transactions and emits payment events for downstream consumers.',
      tags: ['Spring Boot', 'Stripe'],
    }),
    n('inventory', 'service', 'Inventory Svc', 560, 440, {
      subtitle: 'Spring Boot',
      description: 'Tracks stock levels and reserves items when an order is placed; releases the reservation on cancellation.',
      tags: ['Spring Boot', 'Java 17'],
    }),
    n('kafka', 'broker', 'Kafka', 840, 290, {
      subtitle: 'Event bus',
      description: 'Asynchronous backbone decoupling the services through domain events (order.created, payment.paid, stock.reserved).',
      tags: ['Apache Kafka', 'Avro'],
    }),
    n('notif', 'service', 'Notification', 1120, 290, {
      subtitle: 'Spring Boot',
      description: 'Consumes events from Kafka and fans out email / SMS / push notifications to customers.',
      tags: ['Spring Boot', 'SMTP', 'FCM'],
    }),
    n('orderdb', 'database', 'Orders DB', 560, -10, {
      subtitle: 'PostgreSQL',
      description: 'Source of truth for orders. Database-per-service — no schema is shared across services.',
      tags: ['PostgreSQL', 'Flyway'],
    }),
    n('paydb', 'database', 'Payments DB', 840, 440, {
      subtitle: 'PostgreSQL',
      description: 'Stores payment transactions and the audit trail, isolated from the order data.',
      tags: ['PostgreSQL'],
    }),
    n('redis', 'cache', 'Cache', 840, 140, {
      subtitle: 'Redis',
      description: 'Caches hot product and session data to take read load off the relational databases.',
      tags: ['Redis', 'TTL'],
    }),
    n('stripe', 'external', 'Stripe', 840, 580, {
      subtitle: 'Payment API',
      description: 'Third-party payment processor, called server-side by the payment service. Webhooks confirm settlement.',
      tags: ['Stripe API', 'Webhooks'],
    }),
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
    n('dash', 'frontend', 'Dashboard', 40, 240, {
      subtitle: 'Next.js',
      description: 'Analytics dashboard rendering charts and reports queried from the warehouse through the BFF.',
      tags: ['Next.js', 'React', 'D3'],
    }),
    n('api', 'gateway', 'BFF / API', 300, 240, {
      subtitle: 'NestJS',
      description: 'Backend-for-frontend — aggregates warehouse queries and proxies authentication for the dashboard.',
      tags: ['NestJS', 'GraphQL'],
    }),
    n('auth', 'iam', 'Auth', 300, 60, {
      subtitle: 'Keycloak',
      description: 'Identity provider issuing OIDC tokens consumed by the dashboard and the BFF.',
      tags: ['Keycloak', 'OIDC'],
    }),
    n('ingest', 'service', 'Ingest Svc', 560, 140, {
      subtitle: 'Go',
      description: 'High-throughput ingestion endpoint — validates incoming events and streams them into Kafka.',
      tags: ['Go', 'gRPC'],
    }),
    n('etl', 'service', 'ETL Worker', 560, 360, {
      subtitle: 'Python',
      description: 'Stream worker consuming raw events, transforming them and loading into the warehouse and the lake.',
      tags: ['Python', 'Pandas', 'Airflow'],
    }),
    n('queue', 'broker', 'Kafka', 820, 240, {
      subtitle: 'Streams',
      description: 'Kafka streaming layer buffering raw events between the ingest service and the ETL worker.',
      tags: ['Apache Kafka', 'Kafka Streams'],
    }),
    n('warehouse', 'database', 'Warehouse', 1080, 140, {
      subtitle: 'PostgreSQL',
      description: 'Columnar analytics store powering the dashboard queries and aggregations.',
      tags: ['PostgreSQL', 'Citus'],
    }),
    n('lake', 'storage', 'Data Lake', 1080, 360, {
      subtitle: 'S3',
      description: 'Object storage for raw and parquet datasets — cheap, durable and replayable.',
      tags: ['Amazon S3', 'Parquet'],
    }),
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
