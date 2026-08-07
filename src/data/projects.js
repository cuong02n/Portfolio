// Everything shown on the Projects page.
//
// Two shapes live here:
//   • LIVE_DEMOS — feature modules mounted inside this app under
//     /projects/<slug>/*, embedded on the Projects page as full-screen iframes.
//     The routable registry itself stays in src/config/projects.js.
//   • PROJECTS — the full catalogue, including work that is private or lives on
//     GitHub / Google Play and therefore has no in-app demo.
//
// Titles and descriptions are i18n keys; URLs, tech tags and dates are literal.

import {
  SiKubernetes, SiReact, SiSpringboot, SiAndroid, SiCplusplus,
} from 'react-icons/si'
import { FaDiagramProject, FaFileExcel, FaGamepad, FaGlobe } from 'react-icons/fa6'

// Kinds drive the badge + accent on a card.
export const KIND = {
  live: 'projects.kind.live',
  oss: 'projects.kind.oss',
  work: 'projects.kind.work',
  infra: 'projects.kind.infra',
}

// Tabs on the Projects page: each renders the real module in an iframe. The
// portfolio Navbar hides itself on /projects/*, so the frame shows only the
// demo chrome. System-flow demos pre-select a board with ?company=<id>.
export const LIVE_DEMOS = [
  {
    key: 'nexus',
    labelKey: 'demo.nexus.label',
    subKey: 'demo.nexus.sub',
    bodyKey: 'demo.nexus.body',
    src: '/projects/system-flow/board?company=nexus-ti',
    tags: ['Microservices', 'Kafka', 'Keycloak', 'Kubernetes'],
  },
  {
    key: 'crawler',
    labelKey: 'demo.crawler.label',
    subKey: 'demo.crawler.sub',
    bodyKey: 'demo.crawler.body',
    src: '/projects/phone-crawler',
    tags: ['FastAPI', 'PostgreSQL', 'WebSocket', 'Kubernetes'],
  },
  {
    key: 'sample',
    labelKey: 'demo.sample.label',
    subKey: 'demo.sample.sub',
    bodyKey: 'demo.sample.body',
    src: '/projects/system-flow/board?company=company-a',
    tags: ['React Flow', 'System design', 'localStorage'],
  },
]

export const PROJECTS = [
  {
    id: 'nexusti-dcms',
    icon: SiKubernetes,
    kind: 'work',
    featured: true,
    period: '2025',
    ongoing: true,
    titleKey: 'proj.dcms.title',
    descKey: 'proj.dcms.desc',
    tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Keycloak', 'Kubernetes', 'Terraform'],
    links: [{ labelKey: 'links.demo', href: '/projects/system-flow/board?company=nexus-ti', internal: true }],
  },
  {
    id: 'phone-crawler',
    icon: SiSpringboot,
    kind: 'live',
    featured: true,
    period: '2024',
    titleKey: 'proj.crawler.title',
    descKey: 'proj.crawler.desc',
    tags: ['FastAPI', 'PostgreSQL', 'WebSocket', 'Proxy rotation', 'Kubernetes'],
    links: [{ labelKey: 'links.demo', href: '/projects/phone-crawler', internal: true }],
  },
  {
    id: 'system-flow',
    icon: FaDiagramProject,
    kind: 'live',
    featured: true,
    period: '2025',
    titleKey: 'proj.flow.title',
    descKey: 'proj.flow.desc',
    tags: ['React', 'React Flow', 'Vite', 'localStorage'],
    links: [
      { labelKey: 'links.demo', href: '/projects/system-flow', internal: true },
      { labelKey: 'links.github', href: 'https://github.com/cuong02n/Portfolio' },
    ],
  },
  {
    id: 'excel-export',
    icon: FaFileExcel,
    kind: 'work',
    period: '2024',
    titleKey: 'proj.excel.title',
    descKey: 'proj.excel.desc',
    tags: ['Java', 'Apache POI', 'Streaming', 'Profiling'],
    links: [],
  },
  {
    id: 'ehust',
    icon: SiSpringboot,
    kind: 'oss',
    period: '2024',
    titleKey: 'proj.ehust.title',
    descKey: 'proj.ehust.desc',
    tags: ['Java', 'Spring Boot', 'REST', 'Docker', 'Thesis'],
    links: [{ labelKey: 'links.github', href: 'https://github.com/cuong02n/eHust-class-registration-java-backend' }],
  },
  {
    id: 'game-backend',
    icon: FaGamepad,
    kind: 'work',
    period: '2023',
    titleKey: 'proj.game.title',
    descKey: 'proj.game.desc',
    tags: ['Java', 'Vert.x', 'WebSocket', 'Event loop', 'Multithreading'],
    links: [],
  },
  {
    id: 'food-ordering',
    icon: SiSpringboot,
    kind: 'work',
    period: '2023 — 2025',
    titleKey: 'proj.food.title',
    descKey: 'proj.food.desc',
    tags: ['Java', 'Spring Boot', 'Web crawling', 'MySQL'],
    links: [],
  },
  {
    id: 'sudoku',
    icon: SiAndroid,
    kind: 'oss',
    period: '2020 — 2022',
    titleKey: 'proj.sudoku.title',
    descKey: 'proj.sudoku.desc',
    tags: ['Java', 'Android', 'Backtracking', 'Google Play'],
    links: [{ labelKey: 'links.store', href: 'https://play.google.com/store/apps/details?id=com.cuong02n.sudoku2905' }],
  },
  {
    id: 'codearena',
    icon: SiCplusplus,
    kind: 'oss',
    period: '2021',
    ongoing: true,
    titleKey: 'proj.codearena.title',
    descKey: 'proj.codearena.desc',
    tags: ['C++', 'Algorithms', 'Data structures', 'Codeforces'],
    links: [{ labelKey: 'links.github', href: 'https://github.com/cuong02n/CodeArena' }],
  },
  {
    id: 'infra',
    icon: FaGlobe,
    kind: 'infra',
    period: '2023',
    ongoing: true,
    titleKey: 'proj.infra.title',
    descKey: 'proj.infra.desc',
    tags: ['Linux', 'Nginx', 'Docker', 'DNS', 'TLS', 'Self-hosting'],
    links: [{ labelKey: 'links.site', href: 'https://portfolio.cuong02.com' }],
  },
  {
    id: 'portfolio',
    icon: SiReact,
    kind: 'oss',
    period: '2024',
    ongoing: true,
    titleKey: 'proj.portfolio.title',
    descKey: 'proj.portfolio.desc',
    tags: ['React 18', 'Vite', 'i18next', 'Recharts'],
    links: [{ labelKey: 'links.github', href: 'https://github.com/cuong02n/Portfolio' }],
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)
