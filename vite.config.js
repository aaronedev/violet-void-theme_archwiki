import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      stylus: {
        // Enable Stylus preprocessing
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    // Serve static files from public directory
    fs: {
      strict: false
    }
  },
  publicDir: 'public'
})