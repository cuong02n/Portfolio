import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { api } from '../api'
import { useAdminToken } from '../../../shared/adminToken'

// ── Admin token card ─────────────────────────────────────────────────────────
function AdminTokenCard() {
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
      <div className="card-title">🔑 Admin Token</div>
      <p className="muted" style={{ fontSize: 12, marginBottom: 12, lineHeight: 1.6 }}>
        Cần admin token để tạo/điều khiển job và xem/sửa cấu hình proxy. Token được
        lưu trong trình duyệt (localStorage) và gửi qua header <code>X-Admin-Token</code>.
        Không có token → chỉ xem (Dashboard, Explorer, feed).
      </p>
      <form className="form-stack" onSubmit={save}>
        <div className="form-group">
          <label>Token</label>
          <input
            className="form-input"
            type="password"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Dán admin token…"
            autoComplete="off"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button type="submit" className="btn btn-primary">💾 Lưu token</button>
          {hasToken && (
            <button type="button" className="btn btn-ghost" onClick={clear}>Xóa token</button>
          )}
          {saved && (
            <span className="saved-notice"><CheckCircle size={14} /> Đã lưu!</span>
          )}
          <span style={{ marginLeft: 'auto', fontSize: 12, color: hasToken ? 'var(--green)' : 'var(--muted)' }}>
            {hasToken ? '● Có token (admin)' : '○ Chưa có token (chỉ xem)'}
          </span>
        </div>
      </form>
    </div>
  )
}

// ── Proxy configuration card (admin only) ───────────────────────────────────
function ProxyConfigCard() {
  const [cfg, setCfg]     = useState({ proxy_dns: '', username: '', password: '', proxy_mode: 'sticky' })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getConfig().then(setCfg).catch(err => setError(err.message || 'Không tải được cấu hình'))
  }, [])

  const set = (k) => (e) => setCfg(c => ({ ...c, [k]: e.target.value }))

  const save = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.saveConfig(cfg)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err.message || 'Lưu cấu hình thất bại')
    }
  }

  return (
    <div className="card settings-card">
      <div className="card-title">⚙️ Proxy Configuration</div>
      {error && <div className="alert alert-error" style={{ fontSize: 12 }}>{error}</div>}
      <form className="form-stack" onSubmit={save}>
        <div className="form-group">
          <label>Proxy DNS (ip:port)</label>
          <input className="form-input" value={cfg.proxy_dns} onChange={set('proxy_dns')}
            placeholder="43.153.x.x:2334" />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input className="form-input" value={cfg.username} onChange={set('username')} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-input" type="password" value={cfg.password} onChange={set('password')} />
        </div>

        <div className="form-group">
          <label>Proxy Mode</label>
          <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
            {[
              ['sticky',   'Sticky (per-job)',    'Cùng IP cho toàn bộ job. D1N challenge chỉ 1 lần đầu. Phù hợp nếu rate limit per-session.'],
              ['rotating', 'Rotating (per-pattern)', 'IP mới mỗi pattern. Bypass rate limit per-IP. Mỗi pattern tốn thêm 1 request D1N challenge.'],
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
          <button type="submit" className="btn btn-primary">💾 Lưu cấu hình</button>
          {saved && (
            <span className="saved-notice"><CheckCircle size={14} /> Đã lưu!</span>
          )}
        </div>
      </form>

      <p className="muted" style={{ marginTop: 16, fontSize: 12, lineHeight: 1.6 }}>
        <strong>Proxy DNS là bắt buộc</strong> — crawler sẽ không chạy nếu chưa cấu hình.<br />
        Cấu hình được đọc mỗi lần gửi request — không cần restart crawler.
      </p>
    </div>
  )
}

export default function Settings() {
  const { hasToken } = useAdminToken()

  return (
    <div>
      <h1 className="page-title">Settings</h1>

      <AdminTokenCard />

      {hasToken ? (
        <ProxyConfigCard />
      ) : (
        <div className="card settings-card">
          <div className="card-title">⚙️ Proxy Configuration</div>
          <p className="muted" style={{ fontSize: 13 }}>
            🔒 Nhập admin token ở trên để xem và chỉnh sửa cấu hình proxy.
          </p>
        </div>
      )}

      <div className="card" style={{ maxWidth: 460 }}>
        <div className="card-title">ℹ️ Thông tin hệ thống</div>
        <table style={{ fontSize: 12, lineHeight: 2, width: '100%' }}>
          <tbody>
            <tr><td className="muted">Dữ liệu crawl</td><td><code className="mono">data/{'{'}network{'}'}_{'{'}{'{'}job_id{'}'}{'}'}.csv</code></td></tr>
            <tr><td className="muted">Backend</td><td className="muted">FastAPI + PostgreSQL (deploy độc lập)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
