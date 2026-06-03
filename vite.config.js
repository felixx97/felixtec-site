import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    {
      name: 'clean-urls-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0].split('#')[0];
          if (url === '/servicos') {
            req.url = '/servicos.html';
          } else if (url === '/politicas') {
            req.url = '/politicas.html';
          } else if (url === '/parabens-mae') {
            req.url = '/parabens-mae.html';
          }
          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        servicos: resolve(__dirname, 'servicos.html'),
        politicas: resolve(__dirname, 'politicas.html'),
        'parabens-mae': resolve(__dirname, 'parabens-mae.html'),
      },
    },
  },
});
