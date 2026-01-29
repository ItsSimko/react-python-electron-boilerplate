import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: 'src/renderer', // Set new root where index.html is located
  plugins: [react()],
  build: {
    outDir: '../../dist', // Output to dist folder at project root
  },
  base: './', 
})
