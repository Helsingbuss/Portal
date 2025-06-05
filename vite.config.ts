import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: '.', // behövs när index.html ligger i roten
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
