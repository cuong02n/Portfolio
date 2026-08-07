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
  codeforces: 'cuong2905say',
  codeforcesUrl: 'https://codeforces.com/profile/cuong2905say',
  stackoverflowUrl: 'https://stackoverflow.com/users/23725389/nguyen-manh-cuong',
}

// Headline numbers on the hero. `value` is rendered verbatim (a figure, not
// prose); `labelKey` carries the translated caption.
export const STATS = [
  { value: '3+',   labelKey: 'stats.years' },
  { value: '1M+',  labelKey: 'stats.customers' },
  { value: '13',   labelKey: 'stats.services' },
  { value: '3.65', labelKey: 'stats.gpa' },
]

// The roles typed out under the hero heading.
export const TYPED_ROLE_KEYS = [
  'typed.backend',
  'typed.microservices',
  'typed.devops',
  'typed.architect',
]
