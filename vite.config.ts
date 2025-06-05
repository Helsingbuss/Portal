import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: '.', // <--- LÄGG TILL DETTA FÖR TYDLIG STARTPUNKT
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'public/index.html' // <--- Detta säger åt Vite att börja här
    }
  }
})
