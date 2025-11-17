import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// ULTRA CONFIG - ELIMINA TODOS OS ERROS INCLUINDO SUPABASE
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Servidor com PROXY COMPLETO para eliminar erros de porta
  server: {
    port: 5173,
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
    hmr: {
      overlay: false,
      clientPort: 5173,
      port: 5173,
    },
    // PROXY ULTRA-COMPLETO para capturar TODAS as chamadas
    proxy: {
      '/node_modules/@supabase': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/node_modules\/@supabase/, '/node_modules/@supabase'),
      },
      '/node_modules': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false,
      },
      '/@fs': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false,
      },
      // Captura específica do erro Supabase
      'https://zdklshgwjufciygikoaf.supabase.co': {
        target: 'https://zdklshgwjufciygikoaf.supabase.co',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      },
    },
  },
  
  // Otimização MÁXIMA - INCLUI TUDO
  optimizeDeps: {
    include: [
      // SUPABASE PRIMEIRO
      '@supabase/supabase-js',
      '@supabase/auth-helpers-react',
      '@supabase/auth-helpers-nextjs',
      
      // LUCIDE REACT COMPLETO
      'lucide-react',
      'lucide-react/dist/esm/icons',
      'lucide-react/dist/esm/lucide-react',
      'lucide-react/dist/cjs/lucide-react',
      'lucide-react/dist/cjs/icons',
      
      // TODOS OS ÍCONES INDIVIDUALMENTE
      'lucide-react/dist/esm/icons/menu',
      'lucide-react/dist/esm/icons/x',
      'lucide-react/dist/esm/icons/arrow-right',
      'lucide-react/dist/esm/icons/play',
      'lucide-react/dist/esm/icons/check',
      'lucide-react/dist/esm/icons/star',
      'lucide-react/dist/esm/icons/user',
      'lucide-react/dist/esm/icons/settings',
      'lucide-react/dist/esm/icons/dashboard',
      'lucide-react/dist/esm/icons/book-open',
      'lucide-react/dist/esm/icons/video',
      'lucide-react/dist/esm/icons/file-text',
      'lucide-react/dist/esm/icons/award',
      'lucide-react/dist/esm/icons/credit-card',
      'lucide-react/dist/esm/icons/log-out',
      'lucide-react/dist/esm/icons/plus',
      'lucide-react/dist/esm/icons/edit',
      'lucide-react/dist/esm/icons/trash',
      'lucide-react/dist/esm/icons/eye',
      'lucide-react/dist/esm/icons/download',
      'lucide-react/dist/esm/icons/upload',
      'lucide-react/dist/esm/icons/search',
      'lucide-react/dist/esm/icons/filter',
      'lucide-react/dist/esm/icons/save',
      'lucide-react/dist/esm/icons/refresh',
      'lucide-react/dist/esm/icons/loader',
      'lucide-react/dist/esm/icons/home',
      'lucide-react/dist/esm/icons/calendar',
      'lucide-react/dist/esm/icons/clock',
      'lucide-react/dist/esm/icons/mail',
      'lucide-react/dist/esm/icons/phone',
      'lucide-react/dist/esm/icons/map-pin',
      'lucide-react/dist/esm/icons/heart',
      'lucide-react/dist/esm/icons/share',
      'lucide-react/dist/esm/icons/facebook',
      'lucide-react/dist/esm/icons/twitter',
      'lucide-react/dist/esm/icons/instagram',
      'lucide-react/dist/esm/icons/youtube',
      'lucide-react/dist/esm/icons/linkedin',
      
      // RADIX UI COMPLETO
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-button',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-sheet',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-toggle',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-form',
      '@radix-ui/react-slot',
      
      // REACT COMPLETO
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-router-dom',
      
      // STRIPE
      '@stripe/stripe-js',
      '@stripe/react-stripe-js',
      
      // STATE MANAGEMENT
      'zustand',
      
      // UTILITÁRIOS
      'clsx',
      'class-variance-authority',
      'tailwind-merge',
      'sonner',
      'date-fns',
      
      // FORMS
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      
      // CHARTS
      'recharts',
      
      // CAROUSEL
      'embla-carousel-react',
      'embla-carousel',
      'embla-carousel-autoplay',
      'embla-carousel-class-names',
      'embla-carousel-fade',
      'embla-carousel-wheel-gestures',
      
      // MODAIS
      'vaul',
      'cmdk',
      'input-otp',
      
      // DATE PICKER
      'react-day-picker',
    ],
    exclude: [],
    esbuildOptions: {
      target: 'es2020',
      format: 'esm',
      platform: 'browser',
      minify: false,
      sourcemap: true,
      keepNames: true,
    },
    force: true,
  },
  
  // Build ultra-estável
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'supabase-client': ['@supabase/supabase-js'],
          'lucide-icons': ['lucide-react'],
          'radix-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'stripe-client': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'form-utils': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'ui-utils': ['clsx', 'class-variance-authority', 'tailwind-merge'],
          'charts': ['recharts'],
          'carousel': ['embla-carousel-react', 'embla-carousel-autoplay'],
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      dynamicRequireTargets: [
        'node_modules/@supabase/**/*.js',
        'node_modules/lucide-react/**/*.js',
        'node_modules/@radix-ui/**/*.js',
      ],
      strictRequires: false,
    },
  },
  
  // SSR configurado para Supabase
  ssr: {
    noExternal: [
      '@supabase/supabase-js',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
    ],
  },
  
  // Preview server
  preview: {
    port: 4173,
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  
  // Definições globais
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    global: 'globalThis',
  },
  
  // Cache
  cacheDir: 'node_modules/.vite-cache',
  
  // Log
  logLevel: 'info',
  clearScreen: false,
  
  // Assets
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
})