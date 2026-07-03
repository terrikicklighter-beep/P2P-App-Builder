import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite dev proxy to forward /api requests to the backend during local development
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
});
