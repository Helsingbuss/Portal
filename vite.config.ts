import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: { port: 5173, open: true },
  build: { outDir: 'dist', sourcemap: true },
  base: './', // <-- VIKTIGT för Vercel och Netlify!
  envPrefix: ['VITE_', 'REACT_'],
});
