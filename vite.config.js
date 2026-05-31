import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base ('./') makes the built site work from any path —
// the domain root, a GitHub Pages project subpath (/repo-name/),
// a subfolder, or local preview — without configuration. Combined
// with hash-based routing, deep links never 404 on static hosts.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
