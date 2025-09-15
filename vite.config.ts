import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  publicDir: 'public',
  assetsInclude: ['**/*.json'],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          phaser: ['phaser'],
          state: ['zustand']
        }
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'phaser', 'zustand']
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:80',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  // Éviter que Vite surveille un gros dossier de ressources
  // où des données externes (ZIP extrait) peuvent changer
  // sans impact sur le code source.
  // Cela évite des reloads intempestifs quand on manipule ces fichiers.
  // Vous pouvez changer le chemin si besoin.
  // Note: Vite 5 ne supporte pas une option 'watch.ignore' directe ici,
  // on s'appuie donc sur l'usage hors 'root' (le dossier resources n'est pas dans src)
  // et on évite d'y référencer des fichiers dans le code côté client.
  preview: {
    port: 4173,
    open: true
  }
})
