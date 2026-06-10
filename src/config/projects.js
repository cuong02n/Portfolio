// Registry of portfolio projects that ship a live, in-app demo module.
// The portfolio is the single frontend host; each demo talks to its own
// independently-deployed backend via env-configured absolute URLs.
//
// Projects without a live demo stay described directly in the Projects page
// (src/components/Projects/Projects.jsx); this registry is only for the ones
// mounted as feature modules under /projects/<slug>/*.

export const PROJECTS = [
  {
    slug: 'phone-crawler',
    title: 'Phone Number Crawler',
    desc: 'Crawl & lọc số điện thoại đẹp (Viettel/VNPT/Vietnamobile), demo chạy thật.',
    route: '/projects/phone-crawler',
    apiBase: import.meta.env.VITE_CRAWLER_API,
    wsBase: import.meta.env.VITE_CRAWLER_WS,
    tags: ['FastAPI', 'PostgreSQL', 'Kubernetes', 'React'],
  },
  {
    slug: 'system-flow',
    title: 'System Flow Board',
    desc: 'Sơ đồ kiến trúc hệ thống kéo-thả; chỉnh sửa & lưu ngay trên trình duyệt (localStorage).',
    route: '/projects/system-flow',
    // Frontend-only: diagrams live in localStorage, no backend.
    tags: ['React Flow', 'Diagram', 'localStorage'],
  },
]

export const getProject = (slug) => PROJECTS.find(p => p.slug === slug)
