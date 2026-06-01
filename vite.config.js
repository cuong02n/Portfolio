import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Portfolio (Vite + React 18). All JSX lives in .jsx files, so the React plugin
// (automatic runtime + Fast Refresh) handles everything with no extra config.
// The phone-crawler module talks to its backend through absolute URLs from
// VITE_CRAWLER_API / VITE_CRAWLER_WS, so no dev proxy is required.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
})
