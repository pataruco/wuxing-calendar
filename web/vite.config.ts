import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  root: '.',
  base: process.env.BASE_PATH || '/',
  publicDir: 'public',
  plugins: [wasm()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext',
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
