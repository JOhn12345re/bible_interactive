import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
    force: true,
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    VitePWA({
      registerType: 'autoUpdate',
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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
        globIgnores: [
          '**/bibles_json_6.0/**/*.json', // Exclure les fichiers JSON de la bible
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
    // Augmenter la limite de taille des chunks pour éviter les warnings
    chunkSizeWarningLimit: 1000, // 1000 KB au lieu de 500 KB par défaut
    // Optimisations de sécurité
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer les console.log en production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Chunking optimisé pour éviter la duplication de React
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Forcer React, React-DOM, scheduler, et react-router dans un seul chunk vendor-react
            if (id.includes('react') || id.includes('scheduler') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('zustand')) return 'store';
            if (id.includes('hls.js')) return 'media';
            if (id.includes('phaser')) return 'phaser-core';
            return 'vendor';
          }
          if (id.includes('/src/phaser/scenes/')) return 'phaser-scenes';
          if (id.includes('/src/components/SermonPlayer')) return 'media-player';
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
