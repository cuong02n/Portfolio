import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, RefreshCw } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'

// ── Preset definitions ─────────────────────────────────────────────────────────

// Static presets: name must match backend PRESETS dict keys exactly
const STATIC_PRESETS = [
  { group: 'Tứ quý / Ngũ quý', items: [
    'Tứ quý (xxxx)',
    'Tứ quý ở cuối',
    'Ngũ quý (xxxxx)',
  ]},
  { group: 'Lặp / Taxi', items: [
    'Taxi (abcabc)',
    'Lặp đôi (aabbcc)',
  ]},
  { group: 'Sảnh lặp', items: [
    'Sảnh xyzxyz',
    'Sảnh xyzxyz ở cuối',
    'Sảnh xyztxyzt',
    'Sảnh xyztxyzt ở cuối',
  ]},
  { group: 'Sảnh tiến', items: [
    'Tiến đều (4 số cuối)',
    'Tiến đều bước 2 (5 số cuối)',
    'Sảnh tiến (>=4 số)',
    'Sảnh tiến ở cuối',
  ]},
  { group: 'Đặc biệt', items: [
    'Toàn số chẵn',
    '0abxabyabz',
    '0abxab(x+1)ab(x+2)',
    '0abxab(x-1)ab(x-2)',
    '0abcabcabc',
    '0axaayaaza',
    '0xaxbxcxdx',
  ]},
  { group: 'Số ít chữ số (ngoài 0)', items: [
    'Chỉ 2 số (ngoài 0)',
    'Chỉ 3 số (ngoài 0)',
  ]},
]

// Parametric presets: user supplies a value; backend key = "key:value"
const PARAM_PRESETS = [
  {
    key:         'Tứ quý cuối',
    label:       'Tứ quý X ở cuối',
    description: 'Số kết thúc bằng XXXX (ví dụ: 8888)',
    placeholder: '0–9',
    maxLength:   1,
    isValid:     (v) => /^\d$/.test(v),
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────────

const isParamKey = (name) => PARAM_PRESETS.some(p => name.startsWith(`${p.key}:`))

function resolvePresets(active, paramInputs) {
  return active.filter(name => {
    if (!isParamKey(name)) return true
    const key = name.slice(0, name.indexOf(':'))
    const val = name.slice(key.length + 1)
    const def = PARAM_PRESETS.find(p => p.key === key)
    return def ? def.isValid(val) : false
  })
}

// ── Component Helpers ──────────────────────────────────────────────────────────

const formatPhone = (num) => {
  if (!num) return '';
  if (num.length === 10) return `${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
  return num;
}

const getFileInfo = (f) => {
  const isViettel = f.name.toLowerCase().includes('viettel');
  const isVnpt = f.name.toLowerCase().includes('vnpt');
  const sizeStr = f.size > 1024 * 1024 
    ? (f.size / (1024 * 1024)).toFixed(2) + ' MB'
    : (f.size / 1024).toFixed(1) + ' KB';
  
  const dateObj = new Date(f.updated_at);
  const dateStr = !isNaN(dateObj) ? dateObj.toLocaleString('vi-VN', { 
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }) : '';

  return { 
    name: f.name, 
    sizeStr, 
    dateStr,
    network: isViettel ? 'Viettel' : (isVnpt ? 'VNPT' : 'Unknown'),
    color: isViettel ? '#ef4444' : (isVnpt ? '#3b82f6' : 'var(--muted)')
  };
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Explorer() {
  const { t }                     = useTranslation()
  const [searchParams]            = useSearchParams()
  const [files, setFiles]         = useState([])
  const [selected, setSelected]   = useState('')
  const [activePresets, setActivePresets] = useState([])  // both static names and "key:val" for param
  const [paramInputs, setParamInputs]     = useState({})  // { key: value } — independent of active
  const [result, setResult]       = useState(null)
  const [loading, setLoading]     = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError]         = useState('')
  const [fetchAll, setFetchAll]   = useState(false)
  const [expandedNumbers, setExpandedNumbers] = useState({}) // track clicked numbers

  // Cancel in-flight request when a new one starts; ignore stale responses.
  const abortRef  = useRef(null)
  const reqIdRef  = useRef(0)

  // preview takes already-resolved presets (filtered for validity)
  const preview = useCallback(async (file, resolved) => {
    if (!file) return

    // Cancel any previous request so the latest click wins
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const reqId = ++reqIdRef.current

    setLoading(true)
    setError('')
    try {
      const r = await api.previewData(
        { file, presets: resolved, limit: fetchAll ? 0 : 200 },
        { signal: controller.signal },
      )
      if (reqId === reqIdRef.current) setResult(r)
    } catch (e) {
      if (e.name === 'AbortError') return  // superseded by newer request — silent
      if (reqId === reqIdRef.current) {
        console.error('[preview failed]', e)
        setError(e.message || t('crawler.common.unknownErr'))
      }
    } finally {
      if (reqId === reqIdRef.current) setLoading(false)
    }
  }, [fetchAll])

  const loadFiles = useCallback(() => api.listFiles().catch(() => []), [])

  // Initial load: honour ?file= param or default to first file
  useEffect(() => {
    const fileParam = searchParams.get('file')
    loadFiles().then(list => {
      setFiles(list)
      if (list.length === 0) return
      const paths = list.map(f => f.path)
      const toSelect = fileParam && paths.includes(fileParam) ? fileParam : list[0].path
      setSelected(toSelect)
      preview(toSelect, [])
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Preset toggle helpers ────────────────────────────────────────────────────

  const isStaticActive = (name) => activePresets.includes(name)
  const isParamActive  = (key)  => activePresets.some(p => p.startsWith(`${key}:`))

  const toggleStatic = (name) => {
    const next = isStaticActive(name)
      ? activePresets.filter(p => p !== name)
      : [...activePresets, name]
    setActivePresets(next)
    preview(selected, resolvePresets(next, paramInputs))
  }

  const toggleParam = (key) => {
    if (isParamActive(key)) {
      const next = activePresets.filter(p => !p.startsWith(`${key}:`))
      setActivePresets(next)
      preview(selected, resolvePresets(next, paramInputs))
    } else {
      const val = paramInputs[key] || ''
      const next = [...activePresets, `${key}:${val}`]
      setActivePresets(next)
      preview(selected, resolvePresets(next, paramInputs))
    }
  }

  const updateParamInput = (key, val) => {
    const newInputs = { ...paramInputs, [key]: val }
    setParamInputs(newInputs)
    if (isParamActive(key)) {
      const next = activePresets.map(p => p.startsWith(`${key}:`) ? `${key}:${val}` : p)
      setActivePresets(next)
      preview(selected, resolvePresets(next, newInputs))
    }
  }

  const clearAll = () => {
    setActivePresets([])
    preview(selected, [])
  }

  // ── File handlers ────────────────────────────────────────────────────────────

  const handleFileChange = (path) => {
    setSelected(path)
    setResult(null)
    preview(path, resolvePresets(activePresets, paramInputs))
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    const list = await loadFiles()
    setFiles(list)
    setRefreshing(false)
    const stillExists = list.some(f => f.path === selected)
    const nextFile = stillExists ? selected : (list.length > 0 ? list[0].path : '')
    if (!stillExists && nextFile) setSelected(nextFile)
    if (nextFile) preview(nextFile, resolvePresets(activePresets, paramInputs))
  }

  const totalActive = activePresets.length

  return (
    <div className="explorer-container">
      <h1 className="page-title">{t('crawler.explorer.title')}</h1>

      <div className="explorer-layout">
        {/* Left column: Filters */}
        <div className="explorer-sidebar card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
            <div className="card-title" style={{ marginBottom: 0 }}>🎯 {t('crawler.explorer.filters')}</div>
            {totalActive > 0 && (
              <button className="btn btn-ghost clear-btn" onClick={clearAll}>
                {t('crawler.explorer.clearAll')} ({totalActive})
              </button>
            )}
          </div>

          <div className="filters-scroll">
            {STATIC_PRESETS.map(({ group, items }) => (
              <div key={group} className="filter-group">
                <div className="filter-group-title">{group}</div>
                <div className="preset-grid">
                  {items.map(name => (
                    <label key={name}
                      className={`preset-chip premium-chip ${isStaticActive(name) ? 'on' : ''}`}
                      onClick={() => toggleStatic(name)}>
                      {name}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {PARAM_PRESETS.length > 0 && (
              <div className="filter-group">
                <div className="filter-group-title">{t('crawler.explorer.custom')}</div>
                <div className="preset-grid">
                  {PARAM_PRESETS.map(({ key, label, placeholder, maxLength, isValid }) => {
                    const active = isParamActive(key)
                    const val    = paramInputs[key] || ''
                    const valid  = !active || isValid(val)
                    return (
                      <label key={key}
                        className={`preset-chip premium-chip param-chip ${active ? 'on' : ''} ${active && !valid ? 'invalid' : ''}`}
                        onClick={() => toggleParam(key)}>
                        {label}
                        {active && (
                          <>
                            <span className="param-eq">=</span>
                            <input
                              type="text"
                              className="param-input"
                              value={val}
                              maxLength={maxLength}
                              placeholder={placeholder}
                              onClick={e => e.stopPropagation()}
                              onChange={e => updateParamInput(key, e.target.value)}
                            />
                          </>
                        )}
                      </label>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Results */}
        <div className="explorer-main card">
          {/* Top bar: file selector */}
          <div className="explorer-header">
            <div className="file-selector-wrapper">
              <select
                className="form-select premium-select"
                value={selected}
                onChange={e => handleFileChange(e.target.value)}
              >
                {files.length === 0 && <option>{t('crawler.explorer.noFilesOption')}</option>}
                {files.map(f => {
                  const info = getFileInfo(f);
                  return (
                    <option key={f.path} value={f.path}>
                      {info.network !== 'Unknown' ? `[${info.network}] ` : ''}{info.name} ({info.sizeStr}){info.dateStr ? ` - ${info.dateStr}` : ''}
                    </option>
                  );
                })}
              </select>
              {selected && (() => {
                const f = files.find(x => x.path === selected);
                if (f) {
                  const info = getFileInfo(f);
                  return (
                    <div className="file-badge" style={{ borderColor: info.color, color: info.color }}>
                      {info.network}
                    </div>
                  );
                }
                return null;
              })()}
            </div>

            <div className="header-actions">
              <label className="fetch-all-toggle">
                <input type="checkbox" checked={fetchAll} onChange={e => setFetchAll(e.target.checked)} />
                <span>{t('crawler.explorer.fetchAll')}</span>
              </label>
              <button className="btn btn-ghost icon-btn" onClick={handleRefresh} disabled={refreshing} title={t('crawler.explorer.refreshTitle')}>
                <RefreshCw size={15} className={refreshing ? 'spin' : ''} />
              </button>
              {selected && (
                <a className="btn btn-primary download-btn" href={api.downloadUrl(selected)} download>
                  <Download size={14} /> {t('crawler.common.download')}
                </a>
              )}
            </div>
          </div>

          {/* Results display */}
          <div className="explorer-content">
            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>{t('crawler.explorer.filtering')}</p>
              </div>
            )}

            {error && !loading && (
              <div className="alert alert-error">
                <span>❌ {t('crawler.explorer.error')}: {error}</span>
                <button className="btn btn-ghost btn-sm" onClick={() => preview(selected, resolvePresets(activePresets, paramInputs))}>
                  {t('crawler.common.retry')}
                </button>
              </div>
            )}

            {!loading && !error && result && (
              <>
                {/* Stats Bar */}
                <div className="stats-dashboard">
                  <div className="stat-card highlight">
                    <div className="stat-value">{result.filtered_count.toLocaleString()}</div>
                    <div className="stat-label">Số Khớp</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{result.total_count.toLocaleString()}</div>
                    <div className="stat-label">Tổng File</div>
                  </div>
                  {result.total_count > 0 && (
                    <div className="stat-progress">
                      <div className="progress-bar" style={{ width: `${Math.min(100, (result.filtered_count / result.total_count) * 100)}%` }}></div>
                    </div>
                  )}
                  {!fetchAll && totalActive > 0 && result.numbers.length < result.filtered_count && (
                    <div className="stat-note">{t('crawler.explorer.first200')}</div>
                  )}
                </div>

                {result.numbers.length === 0 ? (
                  <div className="empty-state">
                    <p className="muted">{t('crawler.explorer.noMatch')}</p>
                  </div>
                ) : (
                  <div className="number-grid premium-grid">
                    {result.numbers.map((item, i) => {
                      const numStr = item.phone || item;
                      const timeStr = item.time;
                      const isExpanded = expandedNumbers[i];
                      return (
                        <div 
                          key={i} 
                          className={`number-chip premium-number ${isExpanded ? 'expanded' : ''}`}
                          onClick={() => setExpandedNumbers(prev => ({ ...prev, [i]: !prev[i] }))}
                          style={{ cursor: timeStr ? 'pointer' : 'default' }}
                        >
                          <div className="number-val">{formatPhone(numStr)}</div>
                          {isExpanded && timeStr && <div className="time-badge">{timeStr}</div>}
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            {files.length === 0 && !loading && (
              <div className="empty-state">
                <p className="muted">{t('crawler.explorer.noData')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
