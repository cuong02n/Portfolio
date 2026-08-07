import { useTranslation } from 'react-i18next'
import { SatelliteDish, Loader } from 'lucide-react'
import { useWsData } from '../CrawlerApp'

function StatCard({ label, value, accent }) {
  return (
    <div className="card stat-card">
      <div className="stat-value" style={accent ? { color: accent } : undefined}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

// Designed placeholder shown when the demo backend isn't reachable, so the page
// reads as an intentional "offline demo" rather than a broken empty dashboard.
function EmptyState({ variant }) {
  const { t } = useTranslation()
  const connecting = variant === 'connecting'
  const Icon = connecting ? Loader : SatelliteDish
  return (
    <div className="crawler-empty">
      <div className="crawler-empty-glow" aria-hidden="true" />
      <div className={`crawler-empty-icon${connecting ? ' spin' : ''}`}>
        <Icon size={30} strokeWidth={1.6} />
      </div>
      {!connecting && <span className="crawler-empty-badge">{t('crawler.offline.badge')}</span>}
      <h2 className="crawler-empty-title">
        {connecting ? t('crawler.connecting.title') : t('crawler.offline.title')}
      </h2>
      <p className="crawler-empty-desc">
        {connecting ? t('crawler.connecting.desc') : t('crawler.offline.desc')}
      </p>
      {!connecting && <p className="crawler-empty-hint">{t('crawler.offline.hint')}</p>}
    </div>
  )
}

export default function Dashboard() {
  const { t } = useTranslation()
  const { stats, feed, jobs, wsStatus } = useWsData()

  // Has any real data arrived from the backend yet?
  const hasData =
    (stats.total_jobs ?? 0) > 0 ||
    (stats.total_saved ?? 0) > 0 ||
    feed.length > 0 ||
    (jobs && jobs.length > 0)

  // No backend / no data → show a designed empty state instead of all-zero cards.
  if (!hasData && wsStatus !== 'connected') {
    return (
      <div>
        <h1 className="page-title">{t('crawler.dash.title')}</h1>
        <EmptyState variant={wsStatus === 'connecting' ? 'connecting' : 'offline'} />
      </div>
    )
  }

  const numbers = [...feed].reverse()
  const failedJobs = (jobs || []).filter(j => j.status === 'failed').length

  return (
    <div>
      <h1 className="page-title">{t('crawler.dash.title')}</h1>

      <div className="stats-grid">
        <StatCard label={t('crawler.dash.stat.running')}  value={stats.running_jobs} accent="var(--green)" />
        <StatCard label={t('crawler.dash.stat.saved')}    value={stats.total_saved.toLocaleString()} />
        <StatCard label={t('crawler.dash.stat.jobs')}     value={stats.total_jobs} />
        <StatCard label={t('crawler.dash.stat.progress')} value={`${stats.avg_progress}%`} />
        {failedJobs > 0 && (
          <StatCard label={t('crawler.dash.stat.failed')} value={failedJobs} accent="var(--red)" />
        )}
      </div>

      <div className="card">
        <div className="card-title">🔢 {t('crawler.dash.feed.title')}</div>
        {numbers.length === 0 ? (
          <p className="muted" style={{ padding: '12px 0' }}>
            {t('crawler.dash.feed.waiting')}
          </p>
        ) : (
          <div className="feed-grid">
            {numbers.map((n, i) => (
              <div key={`${n}-${i}`} className="feed-number">{n}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
