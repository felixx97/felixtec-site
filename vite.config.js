import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        natal: resolve(__dirname, 'natal.html'),
        automacoes: resolve(__dirname, 'automacoes.html'),
        'floripa-cultural': resolve(__dirname, 'floripa-cultural.html'),
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
        },
      },
    },
  },
});
