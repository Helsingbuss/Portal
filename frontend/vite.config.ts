import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: '.', // <-- här är ändringen
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
