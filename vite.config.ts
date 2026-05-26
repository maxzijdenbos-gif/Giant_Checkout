import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Giant_Checkout/',
  plugins: [react()],
  server: {
    proxy: {
      // Proxy Giant's dealer API through the dev server to avoid CORS.
      // Only works in development (pnpm dev) — not in the built/deployed version.
      '/giant-api': {
        target: 'https://www.giant-bicycles.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/giant-api/, ''),
        // Make the request look like it originates from within the Giant website,
        // otherwise their server may reject it based on the Referer/Origin headers.
        headers: {
          'Referer': 'https://www.giant-bicycles.com/us/stores',
          'Origin': 'https://www.giant-bicycles.com',
        },
      },
    },
  },
})
