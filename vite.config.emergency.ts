import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// EMERGÊNCIA TOTAL - SERVIDOR ULTRA-ESTÁVEL
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Servidor EMERGÊNCIA - Configuração máxima
  server: {
    port: 3000,
    host: '127.0.0.1', // Localhost garantido
    cors: {
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
    open: true,
    strictPort: false, // Tenta 3000, se não conseguir usa outra
    force: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-cache',
    },
    hmr: {
      overlay: false,
      port: 3000,
      host: '127.0.0.1',
    },
    // Proxy DESATIVADO para evitar conflitos
  },
  
  // Preview também EMERGÊNCIA
  preview: {
    port: 3000,
    host: '127.0.0.1',
    cors: true,
    open: true,
    strictPort: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  
  // Otimização MÁXIMA - SOMENTE ESSENCIAIS
  optimizeDeps: {
    include: [
      // ESSENCIAIS PRIMEIRO
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'zustand',
      'clsx',
      'tailwind-merge',
    ],
    exclude: [],
    esbuildOptions: {
      target: 'es2020',
      format: 'esm',
      platform: 'browser',
      minify: false,
      sourcemap: true,
    },
    force: true,
    holdUntilCrawlEnd: false, // Não espera crawling
  },
  
  // Build mínimo para desenvolvimento
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    minify: false, // Desabilita minificação para debug
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'supabase': ['@supabase/supabase-js'],
          'ui': ['lucide-react', '@radix-ui/react-dialog'],
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  
  // SSR mínimo
  ssr: {
    noExternal: ['@supabase/supabase-js', 'lucide-react'],
  },
  
  // Definições essenciais
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    global: 'globalThis',
  },
  
  // Cache limpo
  cacheDir: 'node_modules/.vite-emergency',
  
  // Log visível
  logLevel: 'info',
  clearScreen: true,
  
  // Assets básicos
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg'],
})