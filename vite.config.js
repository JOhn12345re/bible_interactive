var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            // Optimisations React
            babel: {
                plugins: __spreadArray([], (process.env.NODE_ENV === 'production' ? [['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]] : []), true)
            }
        }),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon-192.png', 'icon-512.png', 'favicon.ico'],
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg,json}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'google-fonts-stylesheets',
                        }
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-webfonts',
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            }
                        }
                    }
                ]
            },
            manifest: {
                name: 'Bible Interactive - Jeu Éducatif',
                short_name: 'Bible Interactive',
                description: 'Jeu éducatif pour découvrir la Bible de manière interactive dans la tradition chrétienne orthodoxe',
                theme_color: '#4f46e5',
                background_color: '#ffffff',
                display: 'standalone',
                orientation: 'portrait-primary',
                scope: '/',
                start_url: '/',
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
                ],
                categories: ['education', 'kids', 'games'],
                lang: 'fr'
            }
        })
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
                rewrite: function (path) { return path.replace(/^\/api/, '/api'); }
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
});
