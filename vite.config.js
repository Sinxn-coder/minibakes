import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({ hostname: 'https://minibakes.co' })
  ],
  base: '/minibakes/',
  server: {
    port: 3000, // Changes the port from 5173 to 3000
    host: true, // Changes the host from localhost to 0.0.0.0 (allows network access)
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  }
})
