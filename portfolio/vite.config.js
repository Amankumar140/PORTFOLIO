import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/gfg-api': {
        target: 'https://authapi.geeksforgeeks.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gfg-api/, ''),
      },
    },
  },
})
