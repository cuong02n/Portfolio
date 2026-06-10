// localStorage persistence for the system-flow diagrams. Everyone can edit; the
// edits live only in *their* browser. The shape stored is:
//   { version, companies: [ {id, name, nodes, edges}, ... ] }
//
// On version mismatch (or corrupt JSON) we silently fall back to the seed, so a
// schema change never leaves a visitor staring at a broken canvas.

import { SCHEMA_VERSION, SEED_COMPANIES } from '../data/seed'

const KEY = 'system-flow:diagrams'

const clone = (v) => JSON.parse(JSON.stringify(v))

export const loadState = () => {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { version: SCHEMA_VERSION, companies: clone(SEED_COMPANIES) }
    const parsed = JSON.parse(raw)
    if (parsed?.version !== SCHEMA_VERSION || !Array.isArray(parsed.companies) || !parsed.companies.length) {
      return { version: SCHEMA_VERSION, companies: clone(SEED_COMPANIES) }
    }
    return parsed
  } catch {
    return { version: SCHEMA_VERSION, companies: clone(SEED_COMPANIES) }
  }
}

export const saveState = (companies) => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ version: SCHEMA_VERSION, companies }))
  } catch {
    /* quota / private mode — non-fatal, the in-memory state still works */
  }
}

// Restore the shipped seed (drops all local edits).
export const resetState = () => {
  try { localStorage.removeItem(KEY) } catch { /* ignore */ }
  return { version: SCHEMA_VERSION, companies: clone(SEED_COMPANIES) }
}

export const seedCompanies = () => clone(SEED_COMPANIES)

// ── Export / Import a single company as a JSON file ──────────────────────────
export const exportCompany = (company) => {
  const blob = new Blob([JSON.stringify(company, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${company.id || 'diagram'}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// Parse + sanity-check an imported company file. Throws on anything malformed.
export const parseCompany = (text) => {
  const obj = JSON.parse(text)
  if (!obj || !Array.isArray(obj.nodes) || !Array.isArray(obj.edges)) {
    throw new Error('Invalid diagram file: expected { nodes[], edges[] }')
  }
  return {
    id: obj.id || `imported-${obj.nodes.length}`,
    name: obj.name || 'Imported diagram',
    nodes: obj.nodes,
    edges: obj.edges,
  }
}
