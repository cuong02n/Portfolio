// Career timeline, education and credentials.
//
// Mirrors src/Assets/Resume_CuongNguyenManh.pdf — keep the two in sync when the
// CV is regenerated. Companies, dates and certificate codes are proper nouns and
// stay literal; every sentence is an i18n key resolved at render time.

export const EXPERIENCE = [
  {
    id: 'nexusti',
    company: 'Nexusti JSC',
    roleKey: 'exp.nexusti.role',
    from: '07/2025',
    to: null,                       // null → rendered as "Present"
    current: true,
    summaryKey: 'exp.nexusti.summary',
    bulletKeys: [
      'exp.nexusti.b1',
      'exp.nexusti.b2',
      'exp.nexusti.b3',
      'exp.nexusti.b4',
      'exp.nexusti.b5',
      'exp.nexusti.b6',
    ],
    stack: [
      'Java 21', 'Spring Boot 3', 'PostgreSQL', 'Kafka', 'Redis',
      'Keycloak', 'Camunda BPMN', 'Kubernetes', 'GitLab CI/CD', 'Terraform',
    ],
  },
  {
    id: 'dac-data',
    company: 'DAC Data Technology Vietnam JSC',
    roleKey: 'exp.dacData.role',
    from: '01/2025',
    to: '06/2025',
    summaryKey: 'exp.dacData.summary',
    bulletKeys: ['exp.dacData.b1'],
    stack: ['Java', 'ETL', 'SQL', 'Batch processing'],
  },
  {
    id: 'dac-dev',
    company: 'DAC Data Technology Vietnam JSC',
    roleKey: 'exp.dacDev.role',
    from: '11/2023',
    to: '03/2025',
    summaryKey: 'exp.dacDev.summary',
    bulletKeys: ['exp.dacDev.b1', 'exp.dacDev.b2', 'exp.dacDev.b3'],
    stack: ['Java', 'Spring Boot', 'MySQL', 'Apache POI', 'Web crawling'],
  },
  {
    id: 'vietdefi',
    company: 'Vietdefi LLC',
    roleKey: 'exp.vietdefi.role',
    from: '03/2023',
    to: '08/2023',
    summaryKey: 'exp.vietdefi.summary',
    bulletKeys: ['exp.vietdefi.b1', 'exp.vietdefi.b2'],
    stack: ['Java', 'Vert.x', 'WebSocket', 'REST API', 'Multithreading'],
  },
]

export const EDUCATION = [
  {
    id: 'hust',
    school: 'Hanoi University of Science and Technology',
    degreeKey: 'edu.hust.degree',
    from: '09/2020',
    to: '06/2024',
    scoreKey: 'edu.hust.score',
    detailKey: 'edu.hust.detail',
  },
]

export const CERTIFICATIONS = [
  {
    id: 'oca',
    date: '04/2025',
    titleKey: 'cert.oca.title',
    issuer: 'Oracle Corporation',
    detailKey: 'cert.oca.detail',
  },
  {
    id: 'codeforces',
    date: '08/2023',
    titleKey: 'cert.codeforces.title',
    issuer: 'Codeforces',
    detailKey: 'cert.codeforces.detail',
  },
  {
    id: 'toeic',
    date: '05/2026',
    titleKey: 'cert.toeic.title',
    issuer: 'IIG Vietnam',
    detailKey: 'cert.toeic.detail',
  },
]
