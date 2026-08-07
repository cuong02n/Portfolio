import { createContext, useContext } from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LayoutDashboard, Briefcase, Database, Settings, ArrowLeft } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Explorer from './pages/Explorer'
import SettingsPage from './pages/Settings'
import { useWs } from './hooks/useWs'
import './crawler.css'

// WebSocket data context — pages read live job/stats/feed data from here.
export const WsContext = createContext(null)
export const useWsData = () => useContext(WsContext)

// This app is mounted under CRAWLER_BASE by the portfolio router. Internal links
// use absolute paths off this base (robust regardless of current sub-route).
export const CRAWLER_BASE = '/projects/phone-crawler'

const NAV = [
  { to: CRAWLER_BASE,                 end: true,  icon: LayoutDashboard, label: 'crawler.nav.dashboard' },
  { to: `${CRAWLER_BASE}/jobs`,       end: false, icon: Briefcase,       label: 'crawler.nav.jobs'      },
  { to: `${CRAWLER_BASE}/explorer`,   end: false, icon: Database,        label: 'crawler.nav.explorer'  },
  { to: `${CRAWLER_BASE}/settings`,   end: false, icon: Settings,        label: 'crawler.nav.settings'  },
]

export default function CrawlerApp() {
  const { t } = useTranslation()
  const wsData = useWs()

  return (
    <WsContext.Provider value={wsData}>
      <div className="crawler-scope">
        <div className="layout">
          <aside className="sidebar">
            <Link to="/project" className="back-portfolio">
              <ArrowLeft size={14} /> {t('crawler.nav.portfolio')}
            </Link>
            <div className="logo">📱 <span>Sim</span>Crawler</div>
            <nav>
              {NAV.map(({ to, end, icon: Icon, label }) => (
                <NavLink
                  key={to || 'index'}
                  to={to}
                  end={end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  <Icon size={15} />
                  {t(label)}
                </NavLink>
              ))}
            </nav>
            <div className="ws-status-bar">
              <span className={`ws-dot ws-${wsData.wsStatus}`} />
              <span className="ws-label">
                {wsData.wsStatus === 'connected'
                  ? t('crawler.ws.live', { count: wsData.wsMsgCount ?? 0 })
                  : wsData.wsStatus === 'connecting' ? t('crawler.ws.connecting')
                  : wsData.wsStatus === 'error' ? t('crawler.ws.error')
                  : t('crawler.ws.disconnected')}
              </span>
            </div>
          </aside>

          <main className="content">
            <Routes>
              <Route index             element={<Dashboard />}    />
              <Route path="jobs"        element={<Jobs />}         />
              <Route path="explorer"    element={<Explorer />}     />
              <Route path="settings"    element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </WsContext.Provider>
  )
}
