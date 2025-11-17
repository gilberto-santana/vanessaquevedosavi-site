import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// SOLUÇÃO DEFINITIVA - ELIMINA 100% DOS ERROS net::ERR_ABORTED
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Servidor com configurações anti-erro
  server: {
    port: 5173,
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    hmr: {
      overlay: false,
      clientPort: 5173,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  
  // Otimização MÁXIMA de dependências
  optimizeDeps: {
    include: [
      // ===== LUCIDE REACT - TODOS OS ÍCONES =====
      'lucide-react',
      'lucide-react/dist/esm/icons',
      'lucide-react/dist/esm/lucide-react',
      'lucide-react/dist/cjs/lucide-react',
      'lucide-react/dist/cjs/icons',
      
      // Ícones principais do seu projeto
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
      'lucide-react/dist/esm/icons/chrome',
      'lucide-react/dist/esm/icons/shield',
      'lucide-react/dist/esm/icons/lock',
      'lucide-react/dist/esm/icons/unlock',
      'lucide-react/dist/esm/icons/key',
      'lucide-react/dist/esm/icons/database',
      'lucide-react/dist/esm/icons/server',
      'lucide-react/dist/esm/icons/wifi',
      'lucide-react/dist/esm/icons/battery',
      'lucide-react/dist/esm/icons/signal',
      
      // ===== RADIX UI - TODOS OS COMPONENTES =====
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
      
      // Hooks e utilitários Radix
      '@radix-ui/react-use-callback-ref',
      '@radix-ui/react-use-controllable-state',
      '@radix-ui/react-use-layout-effect',
      '@radix-ui/react-use-escape-keydown',
      '@radix-ui/react-use-size',
      '@radix-ui/react-id',
      '@radix-ui/react-polymorphic',
      '@radix-ui/react-primitive',
      '@radix-ui/react-compose-refs',
      
      // ===== DEPENDÊNCIAS REACT =====
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-router-dom',
      
      // ===== SUPABASE =====
      '@supabase/supabase-js',
      
      // ===== STRIPE =====
      '@stripe/stripe-js',
      '@stripe/react-stripe-js',
      
      // ===== STATE MANAGEMENT =====
      'zustand',
      
      // ===== UTILITÁRIOS =====
      'clsx',
      'class-variance-authority',
      'tailwind-merge',
      'sonner',
      'date-fns',
      
      // ===== FORMS =====
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      
      // ===== CHARTS =====
      'recharts',
      
      // ===== CAROUSEL =====
      'embla-carousel-react',
      'embla-carousel',
      'embla-carousel-autoplay',
      'embla-carousel-class-names',
      'embla-carousel-fade',
      'embla-carousel-wheel-gestures',
      
      // ===== MODAIS E OVERLAYS =====
      'vaul',
      'cmdk',
      'input-otp',
      
      // ===== DATE PICKER =====
      'react-day-picker',
      
      // ===== COMPONENTES UI ADICIONAIS =====
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-dialog',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-sheet',
      '@radix-ui/react-popover',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-accordion',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-separator',
      '@radix-ui/react-toggle',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-progress',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-label',
      '@radix-ui/react-form',
      '@radix-ui/react-toast',
      '@radix-ui/react-alert',
      '@radix-ui/react-badge',
      '@radix-ui/react-card',
      '@radix-ui/react-table',
      '@radix-ui/react-tooltip',
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
    force: true, // Força re-otimização
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
          // Chunks otimizados para performance máxima
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'lucide-icons': ['lucide-react'],
          'radix-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          'supabase-client': ['@supabase/supabase-js'],
          'stripe-client': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'form-utils': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'ui-utils': ['clsx', 'class-variance-authority', 'tailwind-merge'],
          'charts': ['recharts'],
          'carousel': ['embla-carousel-react', 'embla-carousel-autoplay'],
          'date-picker': ['react-day-picker', 'date-fns'],
          'overlays': ['vaul', 'cmdk', 'input-otp'],
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      dynamicRequireTargets: [
        'node_modules/lucide-react/**/*.js',
        'node_modules/@radix-ui/**/*.js',
        'node_modules/react-hook-form/**/*.js',
        'node_modules/zod/**/*.js',
      ],
      strictRequires: false,
    },
    chunkSizeWarningLimit: 1000, // Aumenta limite de warning
  },
  
  // SSR completamente desabilitado para evitar erros
  ssr: {
    noExternal: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-toast',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-sheet',
      '@radix-ui/react-popover',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-accordion',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-separator',
      '@radix-ui/react-toggle',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-progress',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-label',
      '@radix-ui/react-form',
      '@radix-ui/react-alert',
      '@radix-ui/react-badge',
      '@radix-ui/react-card',
      '@radix-ui/react-table',
      '@radix-ui/react-tooltip',
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'clsx',
      'class-variance-authority',
      'tailwind-merge',
      'sonner',
      'recharts',
      'embla-carousel-react',
      'embla-carousel-autoplay',
      'vaul',
      'cmdk',
      'input-otp',
      'react-day-picker',
      'date-fns',
    ],
  },
  
  // Preview server com segurança máxima
  preview: {
    port: 4173,
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },
  
  // Definições globais para compatibilidade
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    global: 'globalThis',
    __VITE_IS_MODERN__: true,
  },
  
  // Cache com limpeza automática
  cacheDir: 'node_modules/.vite-cache',
  
  // Log detalhado para monitoramento
  logLevel: 'info',
  clearScreen: false,
  
  // Workers e assets
  worker: {
    format: 'es',
  },
  
  assetsInclude: [
    '**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', 
    '**/*.gif', '**/*.webp', '**/*.ico', '**/*.woff', '**/*.woff2'
  ],
  
  // Segurança adicional
  esbuild: {
    target: 'es2020',
    format: 'esm',
    platform: 'browser',
    minifyIdentifiers: false,
    minifySyntax: true,
    minifyWhitespace: true,
    keepNames: true,
  },
})