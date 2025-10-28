import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration de production avec imports manuels React
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('react-router-dom')) return 'router';
            if (id.includes('zustand')) return 'store';
            if (id.includes('hls.js')) return 'media';
            if (id.includes('phaser')) return 'phaser-core';
            return 'vendor';
          }
          if (id.includes('/src/phaser/scenes/')) return 'phaser-scenes';
          if (id.includes('/src/components/SermonPlayer')) return 'media-player';
          return undefined;
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  publicDir: 'public',
});
