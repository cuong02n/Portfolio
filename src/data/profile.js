// Single source of truth for personal / contact data.
//
// Everything the portfolio shows about *who* Cuong is lives here, so updating a
// phone number or a handle is a one-file change instead of a grep across
// components (see docs/personal-data.md).
//
// Rule: this file holds only PROPER NOUNS and stable values (names, URLs,
// handles, dates). Every prose string stays in src/Assets/lang/i18n.js and is
// referenced here by its i18n key — see the `*Key` fields.

export const PROFILE = {
  name: 'Nguyen Manh Cuong',
  nameKey: 'profile.name',          // localised display name
  roleKey: 'profile.role',          // "Backend Engineer"
  locationKey: 'profile.location',
  taglineKey: 'profile.tagline',

  email: 'hi@cuong02.com',
  phone: '+84 335 652 578',
  phoneHref: '+84335652578',

  site: 'https://portfolio.cuong02.com',
  domain: 'cuong02.com',
  // The CV itself is a bundled asset — components import
  // `src/Assets/Resume_CuongNguyenManh.pdf` so Vite fingerprints it.

  github: 'cuong02n',
  githubUrl: 'https://github.com/cuong02n',
  linkedin: 'cuong02n',
  linkedinUrl: 'https://www.linkedin.com/in/cuong02n/',
  codeforces: 'cuong2905say',
  codeforcesUrl: 'https://codeforces.com/profile/cuong2905say',
  stackoverflowUrl: 'https://stackoverflow.com/users/23725389/nguyen-manh-cuong',
}

// Headline numbers on the hero. `value` is rendered verbatim (a figure, not
// prose); `labelKey` carries the translated caption.
export const STATS = [
  { value: '3+',   labelKey: 'stats.years' },
  { value: '1M+',  labelKey: 'stats.customers' },
  { value: '3.65', labelKey: 'stats.gpa' },
]

// The card beside the hero intro — a CV-style summary written for a human
// reader (recruiters first), which is why it lists role, place, degree and
// certificates rather than a shell transcript. `value` renders verbatim
// (proper nouns); `valueKey` / label come from i18n. `meta` is the smaller
// second line under a value.
export const SNAPSHOT = [
  { id: 'role',      valueKey: 'profile.role',    meta: 'Nexusti JSC · 07/2025 →' },
  { id: 'location',  valueKey: 'profile.location' },
  {
    id: 'education',
    valueKey: 'edu.hust.degree',
    meta: 'Hanoi University of Science and Technology · 2020 — 2024',
  },
  { id: 'certs',     value: 'Oracle Certified Associate — Java SE 8', meta: 'TOEIC 700' },
  { id: 'languages', valueKey: 'snapshot.languages.value' },
]

// The five technologies a recruiter matches against a job description. The
// longer strip on the landing page is CORE_STACK in src/data/skills.js; the
// full breakdown lives on /stack.
export const SNAPSHOT_STACK = [
  'Java 21', 'Spring Boot 3', 'PostgreSQL', 'Apache Kafka', 'Kubernetes',
]


