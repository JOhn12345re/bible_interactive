import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false, // Désactiver SW en développement pour éviter les erreurs
      },
      manifest: {
        name: 'Bible Interactive - Jeu Éducatif',
        short_name: 'Bible Interactive',
        description: 'Jeu éducatif pour découvrir la Bible de manière interactive',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
        globIgnores: [
          '**/bibles_json_6.0/**/*.json', // Exclure seulement les gros fichiers JSON de la bible
          '**/node_modules/**/*',
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Cache pour les fichiers JSON de contenu (histoires) - NetworkFirst pour toujours avoir la dernière version
            urlPattern: /\/content\/.*\.json$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'content-json-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1 jour seulement
              },
            },
          },
          {
            // Cache pour les fichiers JSON de la bible
            urlPattern: /\/bibles_json_6\.0\/.*\.json$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'bible-json-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 3000,
    // Sécurité en développement
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-zustand': ['zustand'],
          'vendor-phaser': ['phaser'],
          'vendor-hls': ['hls.js'],
        },
      },
    },
  },
  define: {
    // Variables d'environnement sécurisées
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
});
