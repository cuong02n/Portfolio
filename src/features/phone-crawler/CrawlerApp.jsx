import { createContext, useContext } from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'
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
  { to: CRAWLER_BASE,                 end: true,  icon: LayoutDashboard, label: 'Dashboard' },
  { to: `${CRAWLER_BASE}/jobs`,       end: false, icon: Briefcase,       label: 'Jobs'      },
  { to: `${CRAWLER_BASE}/explorer`,   end: false, icon: Database,        label: 'Explorer'  },
  { to: `${CRAWLER_BASE}/settings`,   end: false, icon: Settings,        label: 'Settings'  },
]

export default function CrawlerApp() {
  const wsData = useWs()

  return (
    <WsContext.Provider value={wsData}>
      <div className="crawler-scope">
        <div className="layout">
          <aside className="sidebar">
            <Link to="/project" className="back-portfolio">
              <ArrowLeft size={14} /> Portfolio
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
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="ws-status-bar">
              <span className={`ws-dot ws-${wsData.wsStatus}`} />
              <span className="ws-label">
                {wsData.wsStatus === 'connected'
                  ? `Live · ${wsData.wsMsgCount ?? 0} msg`
                  : wsData.wsStatus === 'connecting' ? 'Connecting...'
                  : wsData.wsStatus === 'error' ? 'WS Error'
                  : 'Disconnected'}
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
