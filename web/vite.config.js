import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  root: '.',
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
