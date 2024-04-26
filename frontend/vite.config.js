import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@src": '/src',
      "@src/assets": '/src/assets',
      "@src/config": '/src/config',
      "@src/components": '/src/components',
      "@src/context": '/src/context',
      "@src/pages": '/src/pages',
      "@src/hooks": '/src/hooks',
      "@src/utilities": '/src/utilities',
    },
  },
});
