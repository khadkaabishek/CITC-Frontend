import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import VitePluginSitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: 'https://citc.ncit.edu.np',
      dynamicRoutes: [
        '/',
        '/team',
        '/events',
        // Event detail pages will be added dynamically if needed
      ],
      exclude: ['/404'],
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
