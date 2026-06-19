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
export const SCHEMA_VERSION = 6

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

// ── NexusTI — debt-collection & lending platform (current company) ───────────
// Real architecture reverse-engineered from the e:\CODE\NEXUSTI workspace and an
// interview: Java/Spring-Boot microservices on Kubernetes, NO app-level API
// gateway (Nginx ingress routes straight to services), Keycloak as the central
// IAM (nexus-account bridges its Admin API), REST + Feign for sync calls, Kafka
// for async events, PostgreSQL per service. Nodes tagged "★ Mine" are the
// services the owner personally builds (mono-collection, debt-management,
// mono-teller). Scope chosen via interview (a subset of the full estate).
const nexusTI = {
  id: 'nexus-ti',
  name: 'NexusTI · DCMS / Lending',
  nodes: [
    // ── Clients ──
    n('web', 'frontend', 'Web App', 40, 240, {
      subtitle: 'Call-desk agents · React/Umi',
      description: 'Web console for office (call-desk) collection agents and back-office ops — CRM + CRM-v2, the DCMS collection UI and the PPE loan-origination portal (React / Umi Max). Agents work cases by phone here. Authenticates with Keycloak (OIDC) and calls services through the Nginx ingress.',
      tags: ['React', 'Umi Max', 'Call-desk'],
    }),
    n('mobile', 'mobile', 'Mobile App', 40, 420, {
      subtitle: 'Field collection agents',
      description: 'Mobile app for on-site (field) debt-collection agents — visit check-in, GPS/geo-location tracking, on-the-spot payment capture and case updates. Uses a confidential Keycloak mobile client and drives mono-collection (field-staff tracking) through the same ingress.',
      tags: ['Mobile', 'Android/iOS', 'GPS'],
    }),
    // ── IAM & entry ──
    n('keycloak', 'iam', 'Keycloak', 300, 40, {
      subtitle: 'Central IAM · OAuth2/OIDC',
      description: 'Single identity provider for every app and service. Apps log in via Authorization-Code+PKCE; services talk to each other with Client-Credentials. nexus-account drives its Admin API for user/group/role management.',
      tags: ['Keycloak', 'OAuth2', 'OIDC'],
    }),
    n('ingress', 'gateway', 'Nginx Ingress', 300, 320, {
      subtitle: 'K8s ingress (NOT an API gateway)',
      description: 'Kubernetes Nginx ingress at api-*.mono.com.vn — the single public entry. It only does TLS termination and host/path routing (/collection, /calendar, /account …). There is no app-level API gateway, so each service enforces its own auth.',
      tags: ['Kubernetes', 'Nginx', 'Ingress'],
    }),
    // ── Backend services (Java / Spring Boot) ──
    n('account', 'service', 'nexus-account', 600, -120, {
      subtitle: 'IAM hub · Spring Boot (Java 21)',
      description: 'Account & access hub. Bridges the Keycloak Admin API and owns the user/group/role lookups every other service calls (SystemAccountClient). Caches sessions in Redis/Valkey. Plugin architecture (keycloak / f88 plugins).',
      tags: ['Java 21', 'Spring Boot', 'Keycloak Admin', 'Redis'],
    }),
    n('collection', 'service', 'mono-collection', 600, 40, {
      subtitle: '★ Mine · Spring Boot (Java 21)',
      description: '★ One of the services I build. The debt-collection orchestrator and heart of the platform: collection cases, field-staff geo-tracking and multi-channel outreach. Integrates F88, BKAV e-contract and call-centers, and produces collection events to Kafka. Calls nexus-account, nexus-calendar and mono-teller.',
      tags: ['★ Mine', 'Java 21', 'Spring Boot', 'Kafka', 'Feign'],
    }),
    n('debt', 'service', 'debt-management', 600, 200, {
      subtitle: '★ Mine · Spring Boot (Java 17)',
      description: '★ One of the services I build. Manages debts, repayment schedules and risk assessment, with distributed scheduling (ShedLock). Stores documents and Excel exports to AWS S3 and looks up users from nexus-account.',
      tags: ['★ Mine', 'Java 17', 'Spring Boot', 'S3', 'ShedLock'],
    }),
    n('calendar', 'service', 'nexus-calendar', 600, 360, {
      subtitle: 'Spring Boot (Java 17)',
      description: 'Calendar & working-day service for collection schedules and event management. Called by mono-collection; fires reminders through the notification service.',
      tags: ['Java 17', 'Spring Boot'],
    }),
    n('product', 'service', 'product-service', 600, 520, {
      subtitle: 'Spring Boot (Java 17)',
      description: 'Master data for loan products — terms, interest rates and custom fields. Queried by the lead/origination flows.',
      tags: ['Java 17', 'Spring Boot'],
    }),
    n('teller', 'service', 'mono-teller', 600, 680, {
      subtitle: '★ Mine · Spring Boot (Java 17)',
      description: '★ One of the services I build. The multi-channel notification hub: consumes Kafka commands and delivers email/SMS via AWS SES & SendGrid and chat via Zalo OA. Also serves notification templates back to mono-collection. Dual Kafka clusters (internal + call-center).',
      tags: ['★ Mine', 'Java 17', 'Spring Boot', 'Kafka'],
    }),
    n('notif', 'service', 'nexus-notification', 600, 840, {
      subtitle: 'Legacy · Spring Boot (Java 17)',
      description: 'Legacy notification service (Firebase push) consuming Kafka events. Being superseded by mono-teller but still live.',
      tags: ['Java 17', 'Spring Boot', 'Firebase', 'Legacy'],
    }),
    // ── Databases (PostgreSQL, one per service) ──
    n('accountdb', 'database', 'account DB', 900, -120, {
      subtitle: 'PostgreSQL', description: 'Private datastore for nexus-account (database-per-service): users, groups, role mappings.', tags: ['PostgreSQL'],
    }),
    n('collectiondb', 'database', 'collection DB', 900, 40, {
      subtitle: 'PostgreSQL', description: 'Private datastore for mono-collection: collection cases, allocations, field activity.', tags: ['PostgreSQL'],
    }),
    n('debtdb', 'database', 'debt DB', 900, 200, {
      subtitle: 'PostgreSQL', description: 'Private datastore for debt-management: debts, repayment plans, schedules.', tags: ['PostgreSQL'],
    }),
    n('calendardb', 'database', 'calendar DB', 900, 360, {
      subtitle: 'PostgreSQL', description: 'Private datastore for nexus-calendar: events, working-day calendars.', tags: ['PostgreSQL'],
    }),
    n('productdb', 'database', 'product DB', 900, 520, {
      subtitle: 'PostgreSQL', description: 'Private datastore for product-service: loan products, terms, interest rates.', tags: ['PostgreSQL'],
    }),
    n('tellerdb', 'database', 'teller DB', 900, 680, {
      subtitle: 'PostgreSQL', description: 'Private datastore for mono-teller: notification templates, send logs, webhooks.', tags: ['PostgreSQL'],
    }),
    n('notifdb', 'database', 'notification DB', 900, 840, {
      subtitle: 'PostgreSQL', description: 'Private datastore for nexus-notification: notification records and device tokens.', tags: ['PostgreSQL'],
    }),
    // ── Shared infra ──
    n('redis', 'cache', 'Redis / Valkey', 900, -280, {
      subtitle: 'Cache / session',
      description: 'Session and cache store used by nexus-account (and available to others).',
      tags: ['Redis', 'Valkey', 'Cache'],
    }),
    n('s3', 'storage', 'AWS S3', 1240, 200, {
      subtitle: 'Object storage',
      description: 'Object storage for debt-management documents and Excel/report exports.',
      tags: ['AWS S3', 'Documents'],
    }),
    // ── External integrations ──
    n('f88', 'external', 'F88 Platform', 1240, -180, {
      subtitle: '3rd-party partner',
      description: 'Third-party collection-partner platform integrated by mono-collection (debt data exchange).',
      tags: ['Partner', 'REST'],
    }),
    n('bkav', 'external', 'BKAV eContract', 1240, -60, {
      subtitle: 'e-Signature',
      description: 'Electronic contract / e-signature provider (BKAV) for collection & lending agreements, called by mono-collection.',
      tags: ['eContract', 'e-Signature'],
    }),
    n('callcenter', 'external', 'Call Center', 1540, 40, {
      subtitle: 'VoIP / auto-dial',
      description: 'Automatic-dialing & VoIP call systems (CGV, Stringee, Meetech) driven by mono-collection for outbound collection calls.',
      tags: ['VoIP', 'Auto-dial', 'Stringee'],
    }),
    n('emailsms', 'external', 'Email / SMS', 1540, 680, {
      subtitle: 'AWS SES · SendGrid',
      description: 'Transactional email & SMS delivery (AWS SES, SendGrid) used by mono-teller for alerts and OTP.',
      tags: ['AWS SES', 'SendGrid', 'SMS'],
    }),
    n('zalo', 'external', 'Zalo OA', 1540, 800, {
      subtitle: 'Zalo Business (ZBS)',
      description: 'Zalo Official Account messaging channel (ZBS) used by mono-teller to reach customers on Zalo.',
      tags: ['Zalo', 'ZBS'],
    }),
    n('firebase', 'external', 'Firebase Push', 1240, 840, {
      subtitle: 'FCM',
      description: 'Firebase Cloud Messaging for legacy mobile push, used by nexus-notification.',
      tags: ['Firebase', 'FCM'],
    }),
    // ── Platform / DevOps ──
    n('vcs', 'vcs', 'Git (GitLab)', 40, 1040, {
      subtitle: 'Source control',
      description: 'Git server hosting every service & frontend repo. A push triggers the CI/CD pipeline.',
      tags: ['Git', 'GitLab'],
    }),
    n('cicd', 'cicd', 'CI/CD', 340, 1040, {
      subtitle: 'Build & deploy pipeline',
      description: 'Builds each service (Maven), pulls/publishes artifacts to the Nexus repository, bakes container images and deploys to Kubernetes. Conceptually deploys ALL services (one arrow shown for clarity).',
      tags: ['Jenkins', 'GitLab CI', 'Maven'],
    }),
    n('nexus', 'registry', 'Nexus Repository', 640, 1040, {
      subtitle: 'Private Maven / artifact repo',
      description: 'Self-hosted Nexus Repository Manager — the internal "Maven Central". Hosts shared internal Java libraries/JARs that every Spring Boot service depends on; CI pulls dependencies from and publishes built artifacts to it.',
      tags: ['Nexus Repository', 'Maven', 'Artifacts'],
    }),
    n('monitoring', 'observability', 'Prometheus + Grafana', 1000, 1040, {
      subtitle: 'Metrics & dashboards',
      description: 'Scrapes Spring Actuator metrics from ALL services (one arrow shown for clarity) and visualises them in Grafana dashboards.',
      tags: ['Prometheus', 'Grafana', 'Actuator'],
    }),
    n('alerting', 'observability', 'Alerting / On-call', 1300, 1040, {
      subtitle: 'Alertmanager · on-call',
      description: 'Fires alerts from monitoring thresholds to the on-call channel (Alertmanager → Telegram/PagerDuty).',
      tags: ['Alertmanager', 'On-call'],
    }),
  ],
  edges: [
    // Login + entry (no app gateway → ingress routes straight to services)
    e('web', 'keycloak', 'oauth', 'login (OIDC)'),
    e('web', 'ingress', 'api'),
    e('mobile', 'keycloak', 'oauth', 'login (OIDC)'),
    e('mobile', 'ingress', 'api'),
    e('ingress', 'account', 'api'),
    e('ingress', 'collection', 'api'),
    e('ingress', 'debt', 'api'),
    e('ingress', 'calendar', 'api'),
    e('ingress', 'product', 'api'),
    e('account', 'keycloak', 'oauth', 'Admin API'),
    // Sync service-to-service (Feign / REST)
    e('collection', 'account', 'api', 'users/groups'),
    e('collection', 'calendar', 'api', 'events'),
    e('collection', 'teller', 'api', 'templates'),
    e('debt', 'account', 'api', 'users'),
    e('calendar', 'notif', 'api', 'reminders'),
    // DB-per-service
    e('account', 'accountdb', 'jdbc'),
    e('collection', 'collectiondb', 'jdbc'),
    e('debt', 'debtdb', 'jdbc'),
    e('calendar', 'calendardb', 'jdbc'),
    e('product', 'productdb', 'jdbc'),
    e('teller', 'tellerdb', 'jdbc'),
    e('notif', 'notifdb', 'jdbc'),
    // Shared infra
    e('account', 'redis', 'redis', 'session/cache'),
    e('debt', 's3', 'api', 'documents'),
    // Async events over Kafka — no standalone broker node; drawn as dashed,
    // animated edges directly between the producing and consuming services.
    e('collection', 'teller', 'kafka', 'notify cmd'),
    e('collection', 'notif', 'kafka', 'events'),
    e('teller', 'collection', 'kafka', 'delivery status'),
    // External integrations
    e('collection', 'f88', 'api'),
    e('collection', 'bkav', 'api', 'eContract'),
    e('collection', 'callcenter', 'api', 'auto-dial'),
    e('teller', 'emailsms', 'api', 'SES/SendGrid'),
    e('teller', 'zalo', 'api', 'Zalo OA'),
    e('notif', 'firebase', 'api', 'push'),
    // Platform / DevOps pipeline (build-time; anchored to one service for clarity)
    e('vcs', 'cicd', 'api', 'git push'),
    e('cicd', 'nexus', 'api', 'deps / publish'),
    e('cicd', 'collection', 'api', 'deploy → K8s'),
    e('collection', 'monitoring', 'api', 'metrics'),
    e('monitoring', 'alerting', 'api', 'alerts'),
  ],
}

// NexusTI first → it's the default tab (the user's current company).
export const SEED_COMPANIES = [nexusTI, companyA, companyB]
