import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle } from 'lucide-react'
import { api } from '../api'
import { useAdminToken } from '../../../shared/adminToken'

// ── Admin token card ─────────────────────────────────────────────────────────
function AdminTokenCard() {
  const { t } = useTranslation()
  const { token, hasToken, setToken } = useAdminToken()
  const [draft, setDraft] = useState(token)
  const [saved, setSaved] = useState(false)

  useEffect(() => { setDraft(token) }, [token])

  const save = (e) => {
    e.preventDefault()
    setToken(draft.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const clear = () => {
    setToken('')
    setDraft('')
  }

  return (
    <div className="card settings-card">
      <div className="card-title">🔑 {t('crawler.settings.token.title')}</div>
      <p className="muted" style={{ fontSize: 12, marginBottom: 12, lineHeight: 1.6 }}>
        {t('crawler.settings.token.desc')}
      </p>
      <form className="form-stack" onSubmit={save}>
        <div className="form-group">
          <label>{t('crawler.settings.token.label')}</label>
          <input
            className="form-input"
            type="password"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder={t('crawler.settings.token.placeholder')}
            autoComplete="off"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button type="submit" className="btn btn-primary">💾 {t('crawler.settings.token.save')}</button>
          {hasToken && (
            <button type="button" className="btn btn-ghost" onClick={clear}>{t('crawler.settings.token.clear')}</button>
          )}
          {saved && (
            <span className="saved-notice"><CheckCircle size={14} /> {t('crawler.common.saved')}</span>
          )}
          <span style={{ marginLeft: 'auto', fontSize: 12, color: hasToken ? 'var(--green)' : 'var(--muted)' }}>
            {hasToken ? t('crawler.settings.token.has') : t('crawler.settings.token.none')}
          </span>
        </div>
      </form>
    </div>
  )
}

// ── Proxy configuration card (admin only) ───────────────────────────────────
function ProxyConfigCard() {
  const { t } = useTranslation()
  const [cfg, setCfg]     = useState({ proxy_dns: '', username: '', password: '', proxy_mode: 'sticky' })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getConfig().then(setCfg).catch(err => setError(err.message || t('crawler.settings.proxy.loadErr')))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => setCfg(c => ({ ...c, [k]: e.target.value }))

  const save = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.saveConfig(cfg)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err.message || t('crawler.settings.proxy.saveErr'))
    }
  }

  return (
    <div className="card settings-card">
      <div className="card-title">⚙️ {t('crawler.settings.proxy.title')}</div>
      {error && <div className="alert alert-error" style={{ fontSize: 12 }}>{error}</div>}
      <form className="form-stack" onSubmit={save}>
        <div className="form-group">
          <label>{t('crawler.settings.proxy.dns')}</label>
          <input className="form-input" value={cfg.proxy_dns} onChange={set('proxy_dns')}
            placeholder="43.153.x.x:2334" />
        </div>
        <div className="form-group">
          <label>{t('crawler.settings.proxy.username')}</label>
          <input className="form-input" value={cfg.username} onChange={set('username')} />
        </div>
        <div className="form-group">
          <label>{t('crawler.settings.proxy.password')}</label>
          <input className="form-input" type="password" value={cfg.password} onChange={set('password')} />
        </div>

        <div className="form-group">
          <label>{t('crawler.settings.proxy.mode')}</label>
          <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
            {[
              ['sticky',   t('crawler.settings.proxy.sticky'),   t('crawler.settings.proxy.stickyDesc')],
              ['rotating', t('crawler.settings.proxy.rotating'), t('crawler.settings.proxy.rotatingDesc')],
            ].map(([val, label, desc]) => (
              <label key={val} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, cursor: 'pointer', flex: 1 }}>
                <input type="radio" name="proxy_mode" value={val}
                  checked={cfg.proxy_mode === val}
                  onChange={() => setCfg(c => ({ ...c, proxy_mode: val }))}
                  style={{ marginTop: 3 }} />
                <span>
                  <strong style={{ fontSize: 12 }}>{label}</strong>
                  <br />
                  <span className="muted" style={{ fontSize: 11 }}>{desc}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button type="submit" className="btn btn-primary">💾 {t('crawler.settings.proxy.save')}</button>
          {saved && (
            <span className="saved-notice"><CheckCircle size={14} /> {t('crawler.common.saved')}</span>
          )}
        </div>
      </form>

      <p className="muted" style={{ marginTop: 16, fontSize: 12, lineHeight: 1.6 }}>
        <strong>{t('crawler.settings.proxy.note1')}</strong><br />
        {t('crawler.settings.proxy.note2')}
      </p>
    </div>
  )
}

export default function Settings() {
  const { t } = useTranslation()
  const { hasToken } = useAdminToken()

  return (
    <div>
      <h1 className="page-title">{t('crawler.settings.title')}</h1>

      <AdminTokenCard />

      {hasToken ? (
        <ProxyConfigCard />
      ) : (
        <div className="card settings-card">
          <div className="card-title">⚙️ {t('crawler.settings.proxy.title')}</div>
          <p className="muted" style={{ fontSize: 13 }}>
            🔒 {t('crawler.settings.proxy.locked')}
          </p>
        </div>
      )}

      <div className="card" style={{ maxWidth: 460 }}>
        <div className="card-title">ℹ️ {t('crawler.settings.info.title')}</div>
        <table style={{ fontSize: 12, lineHeight: 2, width: '100%' }}>
          <tbody>
            <tr><td className="muted">{t('crawler.settings.info.data')}</td><td><code className="mono">data/{'{'}network{'}'}_{'{'}{'{'}job_id{'}'}{'}'}.csv</code></td></tr>
            <tr><td className="muted">{t('crawler.settings.info.backend')}</td><td className="muted">{t('crawler.settings.info.backendVal')}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
