// Configuração alternativa do Supabase para evitar problemas de CommonJS
import { createClient } from '@supabase/supabase-js';

// Definir variáveis globais necessárias
if (typeof global === 'undefined') {
  (window as any).global = window;
}

if (typeof exports === 'undefined') {
  (window as any).exports = {};
}

if (typeof module === 'undefined') {
  (window as any).module = { exports: {} };
}

// Obter configuração do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Criar cliente com configurações otimizadas
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage,
    storageKey: 'supabase-auth-token',
  },
  global: {
    headers: {
      'x-application-name': 'vanessa-quevedo-savi',
    },
  },
  db: {
    schema: 'public',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Exportar também para compatibilidade
export default supabase;