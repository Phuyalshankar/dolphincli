import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dolphincssPlugin from 'dolphincss/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dolphincssPlugin()
  ],
})
