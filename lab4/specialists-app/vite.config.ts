import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginRequire from 'vite-plugin-require'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
  // plugins: [react(), vitePluginRequire()],
  plugins: [react(), vitePluginRequire.default()],
})
