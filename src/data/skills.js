// Technology stack, grouped by domain.
//
// Sourced from the systems actually shipped at work — chiefly the NEXUSTI DCMS
// platform (13 independently-deployed services: mono-collection, mono-teller,
// mono-reporting, nexus-account, nexus-calendar, nexus-notification,
// common-resource, activiti engine + modeler, nx-collection-etl, crm, ppe and
// the dcms-onboarding IaC framework) — plus earlier roles at DAC Data and
// Vietdefi. Nothing here is aspirational: every entry backs a service that runs
// in production or a pipeline that ships one.
//
// `level` drives the dot indicator, not a self-assessed percentage:
//   core     — used daily, owns design decisions in it
//   working  — ships production work in it, comfortable unsupervised
//   familiar — has delivered with it, reaches for docs
//
// `note` is deliberately concrete (versions, the thing it was used for) because
// a stack list without context reads like a keyword dump. Notes are proper-noun
// heavy and stay untranslated; group titles and blurbs go through i18n.

import {
  SiOpenjdk, SiSpringboot, SiPostgresql, SiApachekafka, SiKubernetes,
  SiKeycloak, SiCamunda, SiReact, SiApachemaven,
} from 'react-icons/si'
import { FaDiagramProject } from 'react-icons/fa6'

export const LEVELS = ['core', 'working', 'familiar']

export const SKILL_GROUPS = [
  {
    id: 'languages',
    icon: SiOpenjdk,
    titleKey: 'stack.languages.title',
    blurbKey: 'stack.languages.blurb',
    items: [
      { name: 'Java', note: '8 → 17 → 21 LTS', level: 'core' },
      { name: 'SQL', note: 'PostgreSQL / MySQL dialects', level: 'core' },
      { name: 'JavaScript', note: 'ES2022, Node tooling', level: 'working' },
      { name: 'TypeScript', note: 'React app codebases', level: 'working' },
      { name: 'Python', note: 'FastAPI crawler, scripting', level: 'working' },
      { name: 'Bash', note: 'CI jobs, service entrypoints', level: 'working' },
      { name: 'C++', note: 'competitive programming', level: 'familiar' },
      { name: 'HCL', note: 'Terraform configuration', level: 'familiar' },
    ],
  },
  {
    id: 'backend',
    icon: SiSpringboot,
    titleKey: 'stack.backend.title',
    blurbKey: 'stack.backend.blurb',
    items: [
      { name: 'Spring Boot', note: '2.x → 3.3, on an in-house nexus-boot base', level: 'core' },
      { name: 'Spring Security', note: 'OAuth2 resource server, method-level @PreAuthorize', level: 'core' },
      { name: 'Spring Data JPA', note: 'Hibernate, projections, native tuning', level: 'core' },
      { name: 'REST APIs', note: 'versioned contracts, OpenAPI', level: 'core' },
      { name: 'Spring Batch', note: 'report export → upload → mail jobs', level: 'working' },
      { name: 'WebSocket', note: 'live call-centre + crawler dashboards', level: 'working' },
      { name: 'MapStruct', note: 'compile-time DTO mapping', level: 'working' },
      { name: 'Apache POI', note: 'streaming XLSX export, millions of rows', level: 'working' },
      { name: 'Vert.x', note: 'event-loop PvP game backend', level: 'working' },
      { name: 'FastAPI', note: 'phone-crawler service', level: 'working' },
      { name: 'FreeMarker', note: 'notification templates', level: 'familiar' },
    ],
  },
  {
    id: 'architecture',
    icon: FaDiagramProject,
    titleKey: 'stack.architecture.title',
    blurbKey: 'stack.architecture.blurb',
    items: [
      { name: 'Microservices', note: '13 services, independent release trains', level: 'core' },
      { name: 'Event-driven', note: 'Kafka as the async backbone', level: 'core' },
      { name: 'Multi-tenancy', note: 'namespace + realm + database per tenant', level: 'core' },
      { name: 'CQRS-lite', note: 'in-house mono-command / CommandGateway', level: 'working' },
      { name: 'Domain aggregates', note: 'command + event aggregate per domain', level: 'working' },
      { name: 'Design patterns', note: 'Strategy, Command, Executor, SPI plugins', level: 'working' },
      { name: 'Data-driven config', note: 'providers & rules resolved from DB, not code', level: 'working' },
      { name: 'System design', note: 'C4 / UML, sequence + deployment diagrams', level: 'working' },
    ],
  },
  {
    id: 'data',
    icon: SiPostgresql,
    titleKey: 'stack.data.title',
    blurbKey: 'stack.data.blurb',
    items: [
      { name: 'PostgreSQL', note: 'JSONB, triggers, closure tables, partitioning', level: 'core' },
      { name: 'Indexing & query tuning', note: 'EXPLAIN-driven work on multi-million-row logs', level: 'core' },
      { name: 'Flyway', note: 'migrations run as their own CI/CD phase', level: 'core' },
      { name: 'Redis', note: 'cache + distributed locks', level: 'working' },
      { name: 'MySQL', note: 'earlier product databases', level: 'working' },
      { name: 'ShedLock', note: 'single-fire scheduled jobs across replicas', level: 'working' },
      { name: 'ETL pipelines', note: 'loan/payment ingest, advertising campaign data', level: 'working' },
      { name: 'AWS S3', note: 'report + document object storage', level: 'working' },
    ],
  },
  {
    id: 'messaging',
    icon: SiApachekafka,
    titleKey: 'stack.messaging.title',
    blurbKey: 'stack.messaging.blurb',
    items: [
      { name: 'Apache Kafka', note: 'KRaft mode, domain events + job dispatch', level: 'core' },
      { name: 'Consumer design', note: 'idempotency, retry & dead-letter handling', level: 'working' },
      { name: 'Notification fan-out', note: 'owned the SMS / Zalo / email / push module', level: 'core' },
      { name: 'Firebase Cloud Messaging', note: 'mobile push delivery', level: 'working' },
      { name: 'Telephony integrations', note: 'CGV auto-dialer, Stringee, Meetech', level: 'working' },
      { name: 'Webhooks', note: 'API-key authenticated provider callbacks', level: 'working' },
    ],
  },
  {
    id: 'workflow',
    icon: SiCamunda,
    titleKey: 'stack.workflow.title',
    blurbKey: 'stack.workflow.blurb',
    items: [
      { name: 'Camunda BPM', note: '7.20 — process engine, migrated off Activiti 5', level: 'working' },
      { name: 'BPMN 2.0', note: 'collection strategy orchestration', level: 'working' },
      { name: 'DMN / Drools', note: 'KIE 8.40 decision tables', level: 'working' },
      { name: 'Scheduled jobs', note: 'cron reminders, allocation runs', level: 'core' },
      { name: 'Allocation engine', note: 'rule-based debt distribution across teams', level: 'working' },
    ],
  },
  {
    id: 'security',
    icon: SiKeycloak,
    titleKey: 'stack.security.title',
    blurbKey: 'stack.security.blurb',
    items: [
      { name: 'Keycloak', note: 'realms, clients, service accounts, token exchange', level: 'core' },
      { name: 'OAuth2 / OIDC', note: 'resource-server validation, JWK rotation', level: 'core' },
      { name: 'JWT', note: 'claim design, large-token tuning', level: 'core' },
      { name: 'RBAC', note: 'fine-grained xln:action:<Module>/<Action> permissions', level: 'core' },
      { name: 'SSO', note: 'single realm across the whole platform', level: 'working' },
      { name: 'IAM plugin SPI', note: 'pluggable Keycloak / partner-IdP providers', level: 'working' },
      { name: 'Code hardening', note: 'ProGuard + dProtect obfuscated release builds', level: 'familiar' },
    ],
  },
  {
    id: 'devops',
    icon: SiKubernetes,
    titleKey: 'stack.devops.title',
    blurbKey: 'stack.devops.blurb',
    featured: true,
    items: [
      { name: 'GitLab CI/CD', note: 'build → image → deploy, branch-mapped environments', level: 'core' },
      { name: 'Docker', note: 'slim JRE runtime images, tuned G1GC flags', level: 'core' },
      { name: 'BuildKit (rootless)', note: 'daemonless builds with registry layer cache', level: 'working' },
      { name: 'Kubernetes', note: 'deployments, rollouts, secrets, ingress, HPA', level: 'working' },
      { name: 'Helm', note: 'one chart releasing the 12-workload platform', level: 'working' },
      { name: 'Terraform', note: 'keycloak · postgresql · kubernetes · helm providers', level: 'working' },
      { name: 'Rancher', note: 'cluster operations and access control', level: 'working' },
      { name: 'Tenant onboarding IaC', note: 'realm + 8 databases + namespace, provisioned end-to-end', level: 'working' },
      { name: 'Private registries', note: 'self-hosted Docker + Maven repositories', level: 'working' },
      { name: 'Backup & DR', note: 'Velero and Rancher Backup to S3', level: 'familiar' },
      { name: 'Nginx', note: 'reverse proxy, SPA + TLS termination', level: 'working' },
      { name: 'Linux', note: 'daily driver; systemd, networking, troubleshooting', level: 'core' },
      { name: 'WireGuard', note: 'VPN access to private environments', level: 'familiar' },
      { name: 'Observability', note: 'structured logs, pipeline + build alerting', level: 'working' },
    ],
  },
  {
    id: 'frontend',
    icon: SiReact,
    titleKey: 'stack.frontend.title',
    blurbKey: 'stack.frontend.blurb',
    items: [
      { name: 'React', note: '18 — hooks, this portfolio and its demo modules', level: 'working' },
      { name: 'Redux + Redux-Saga', note: 'collection CRM state layer', level: 'working' },
      { name: 'TanStack Query', note: 'server-state in the admin console', level: 'working' },
      { name: 'Ant Design / MUI', note: 'enterprise component libraries', level: 'working' },
      { name: 'Tailwind CSS', note: 'utility styling and design tokens', level: 'working' },
      { name: 'Vite', note: 'build tooling and dev server', level: 'working' },
      { name: 'Monorepos', note: 'pnpm + Turborepo, Yarn 4 workspaces', level: 'familiar' },
    ],
  },
  {
    id: 'tooling',
    icon: SiApachemaven,
    titleKey: 'stack.tooling.title',
    blurbKey: 'stack.tooling.blurb',
    items: [
      { name: 'Maven', note: 'multi-module reactors, private repo, build profiles', level: 'core' },
      { name: 'Git / GitLab', note: 'trunk-ish flow, MR review, protected branches', level: 'core' },
      { name: 'IntelliJ IDEA', note: 'primary environment', level: 'core' },
      { name: 'JUnit + Mockito', note: 'unit and slice tests', level: 'working' },
      { name: 'Postman', note: 'API collections shared across the team', level: 'working' },
      { name: 'Wireshark', note: 'protocol-level debugging', level: 'familiar' },
      { name: 'LaTeX', note: 'documents and this CV', level: 'familiar' },
      { name: 'AI-assisted development', note: 'prompt engineering in the daily loop', level: 'working' },
    ],
  },
]

// Compact strip shown on the landing page — the stack someone should remember
// after ten seconds.
export const CORE_STACK = [
  'Java 21', 'Spring Boot 3', 'PostgreSQL', 'Kafka', 'Redis', 'Keycloak',
  'Docker', 'Kubernetes', 'Terraform', 'GitLab CI/CD', 'Camunda', 'React',
]
