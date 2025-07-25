import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    },
    minify: 'terser',
    cssMinify: true,
    sourcemap: false
  },
  server: {
    port: 3000,
    open: true
  },
  css: {
    devSourcemap: true
  }
})
