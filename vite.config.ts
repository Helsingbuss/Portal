// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Så du kan importera med "@/components/..."
    },
  },
  server: {
    port: 5173, // standard, kan ändras om du vill
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // bra för debugging
  },
  css: {
    preprocessorOptions: {
      // Om du använder SCSS, LESS etc kan du lägga till här
    },
  },
  // Om du vill använda miljövariabler i .env-filer
  envPrefix: ['VITE_', 'REACT_'], // Vite läser bara in "VITE_" by default
});
