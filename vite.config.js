import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import dolphincssPlugin from './vite-plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [tailwindcss(), react(), dolphincssPlugin()],
  resolve: {
    alias: {
      '@maincss': path.resolve(__dirname, 'MainCss'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        css: path.resolve(__dirname, 'src/dolphin-css/App.css')
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'App.css') {
            return 'dolphin-css.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        entryFileNames: 'index.js',
        chunkFileNames: 'chunks/[name].js',
      },
    },
  },
});