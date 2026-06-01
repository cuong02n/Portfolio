// Single source of truth for the phone-crawler admin token.
// Stored in localStorage; never logged. Read by the crawler API layer
// (attached as X-Admin-Token header / admin_token query) and by the UI to
// decide whether write controls are shown.

import { useState, useEffect } from 'react'

const KEY = 'crawler_admin_token'
const EVT = 'crawler-admin-token-change'

export function getAdminToken() {
  try {
    return localStorage.getItem(KEY) || ''
  } catch {
    return ''
  }
}

export function setAdminToken(token) {
  try {
    if (token) localStorage.setItem(KEY, token)
    else localStorage.removeItem(KEY)
  } catch {
    /* ignore storage failures (private mode, etc.) */
  }
  // Notify same-tab listeners (the native `storage` event only fires cross-tab).
  window.dispatchEvent(new Event(EVT))
}

// React hook: re-renders when the token changes (this tab or another).
export function useAdminToken() {
  const [token, setTok] = useState(getAdminToken())

  useEffect(() => {
    const sync = () => setTok(getAdminToken())
    window.addEventListener(EVT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const update = (t) => {
    setAdminToken(t)
    setTok(t)
  }

  return { token, hasToken: !!token, setToken: update }
}
