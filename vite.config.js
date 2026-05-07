import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/minibakes/',
  server: {
    port: 3000, // Changes the port from 5173 to 3000
    host: true, // Changes the host from localhost to 0.0.0.0 (allows network access)
  }
})
