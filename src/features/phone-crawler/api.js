import { getAdminToken } from '../../shared/adminToken'

// Absolute backend base URLs from env (set on Vercel / .env).
// Falls back to a same-origin '/api' so a local dev proxy still works if used.
const B = import.meta.env.VITE_CRAWLER_API ?? '/api'

// Admin-only endpoints attach X-Admin-Token. Public reads (stats, jobs, feed,
// data preview/download, ws) send no token.
const authHeaders = () => {
  const t = getAdminToken()
  return t ? { 'X-Admin-Token': t } : {}
}

// Read response body for error detail before throwing.
const json = async (res) => {
  if (!res.ok) {
    let detail = `HTTP ${res.status}`
    try {
      const body = await res.json()
      if (body.detail) detail = `${res.status}: ${body.detail}`
    } catch {}
    if (res.status === 401) detail = 'Admin token sai hoặc thiếu (401)'
    if (res.status === 503) detail = 'Server chưa cấu hình admin token (503)'
    console.error('[API error]', res.url, detail)
    throw new Error(detail)
  }
  return res.json()
}

const get = (url, { auth = false } = {}) =>
  fetch(url, { headers: { ...(auth ? authHeaders() : {}) } }).then(json)

const post = (url, body, { auth = false, ...options } = {}) => {
  console.debug('[API POST]', url, body !== undefined ? body : '(no body)')
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(auth ? authHeaders() : {}) },
    body: JSON.stringify(body),
    ...options,
  }).then(json)
}

const del = (url, { auth = false } = {}) =>
  fetch(url, { method: 'DELETE', headers: { ...(auth ? authHeaders() : {}) } }).then(json)

export const api = {
  // Config (admin — proxy creds)
  getConfig:  ()     => get(`${B}/config`, { auth: true }),
  saveConfig: (data) => post(`${B}/config`, data, { auth: true }),

  // Viettel session (admin)
  viettelAutoSession:  (noProxy = false) => post(`${B}/viettel/auto-session?no_proxy=${noProxy}`, {}, { auth: true }),
  getViettelSession:   ()      => get(`${B}/viettel/session`, { auth: true }),
  clearViettelSession: ()      => del(`${B}/viettel/session`, { auth: true }),

  // SSE auto-session stream — EventSource cannot set headers, so the admin token
  // goes in the query string per the backend contract.
  autoSessionStreamUrl: (params = {}) => {
    const qs = new URLSearchParams(params)
    const t = getAdminToken()
    if (t) qs.set('admin_token', t)
    const s = qs.toString()
    return `${B}/viettel/auto-session/stream${s ? '?' + s : ''}`
  },

  // Stats (public)
  getStats: () => get(`${B}/stats`),

  // Jobs
  listJobs:          ()              => get(`${B}/jobs`),                                  // public
  createJob:         (data)          => post(`${B}/jobs`, data, { auth: true }),
  pauseJob:          (id)            => post(`${B}/jobs/${id}/pause`, undefined, { auth: true }),
  resumeJob:         (id, data)      => post(`${B}/jobs/${id}/resume`, data ?? {}, { auth: true }),
  setJobThreads:     (id, threads)   => post(`${B}/jobs/${id}/threads`, { threads }, { auth: true }),
  retryJob:          (id)            => post(`${B}/jobs/${id}/retry`, undefined, { auth: true }),
  deleteJob:         (id)            => del(`${B}/jobs/${id}`, { auth: true }),
  getLog:            (id, lines = 500) => get(`${B}/jobs/${id}/log?lines=${lines}`),       // public
  getFailedPatterns: (id)              => get(`${B}/jobs/${id}/failed-patterns`),          // public
  getThreadLogs:     (id, tail = 300)  => get(`${B}/jobs/${id}/thread-logs?tail=${tail}`), // public

  // Feed (public)
  getRecentNumbers: (limit = 60) => get(`${B}/feed/recent?limit=${limit}`),

  // Data / Explorer (public)
  listFiles:   ()               => get(`${B}/data/files`),
  previewData: (data, options)  => post(`${B}/data/preview`, data, options),
  downloadUrl: (path)           => `${B}/data/download?path=${encodeURIComponent(path)}`,
}
