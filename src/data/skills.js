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
      { name: 'Python', note: 'FastAPI crawler, scripting', level: 'working' },
    ],
  },
  {
    id: 'backend',
    icon: SiSpringboot,
    titleKey: 'stack.backend.title',
    blurbKey: 'stack.backend.blurb',
    items: [
      { name: 'Spring Boot', note: '2.x → 3.3, on an in-house nexus-boot base', level: 'core' },
      { name: 'Spring Data JPA', note: 'Hibernate, projections, native tuning', level: 'core' },
      { name: 'REST APIs', note: 'versioned contracts, OpenAPI', level: 'core' },
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
      { name: 'Redis', note: 'cache + distributed locks', level: 'working' },
    ],
  },
  {
    id: 'messaging',
    icon: SiApachekafka,
    titleKey: 'stack.messaging.title',
    blurbKey: 'stack.messaging.blurb',
    items: [
      { name: 'Apache Kafka', note: 'KRaft mode, domain events + job dispatch', level: 'core' },
      { name: 'Notification fan-out', note: 'owned the SMS / Zalo / email / push module', level: 'core' },
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
    ],
  },
  {
    id: 'devops',
    icon: SiKubernetes,
    titleKey: 'stack.devops.title',
    blurbKey: 'stack.devops.blurb',
    items: [
      { name: 'GitLab CI/CD', note: 'build → image → deploy, branch-mapped environments', level: 'core' },
      { name: 'Docker', note: 'slim JRE runtime images, tuned G1GC flags', level: 'core' },
      { name: 'Kubernetes', note: 'deployments, rollouts, secrets, ingress, HPA', level: 'working' },
      { name: 'Terraform', note: 'keycloak · postgresql · kubernetes · helm providers', level: 'working' },
      { name: 'Linux', note: 'daily driver; systemd, networking, troubleshooting', level: 'core' },
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
      { name: 'Vite', note: 'build tooling and dev server', level: 'working' },
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
      { name: 'Postman', note: 'API collections shared across the team', level: 'working' },
    ],
  },
]

// Compact strip shown on the landing page — the stack someone should remember
// after ten seconds.
export const CORE_STACK = [
  'Java 21', 'Spring Boot 3', 'PostgreSQL', 'Kafka', 'Redis', 'Keycloak',
  'Docker', 'Kubernetes', 'Terraform', 'GitLab CI/CD', 'Camunda', 'React',
]
