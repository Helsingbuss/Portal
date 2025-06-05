import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/", // viktigt för rätt länkstruktur på Vercel
  plugins: [react()],
  server: {
    port: 5173,
  },
});
