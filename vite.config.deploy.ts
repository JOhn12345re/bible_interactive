import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration simplifiée pour le déploiement - sans PWA pour éviter les problèmes de cache
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          state: ['zustand'],
          phaser: ['phaser'],
          hls: ['hls.js']
        }
      }
    },
    // Ignore les fichiers volumineux qui peuvent causer des problèmes
    assetsInlineLimit: 0
  },
  server: {
    port: 3000
  },
  define: {
    // Variables d'environnement pour la production
    'process.env.NODE_ENV': '"production"'
  }
})
