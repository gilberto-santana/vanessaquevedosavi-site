// Cliente Supabase ultra-estável para evitar erros de importação
import { createClient } from '@supabase/supabase-js';

// Configuração com valores padrão para evitar erros
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Criar cliente com configuração otimizada
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
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

// Função auxiliar para verificar conexão
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('id').limit(1);
    if (error) {
      console.warn('Supabase connection check failed:', error.message);
      return false;
    }
    console.log('✅ Supabase connection successful');
    return true;
  } catch (err) {
    console.error('❌ Supabase connection error:', err);
    return false;
  }
};

// Exportar tipos para TypeScript
export type SupabaseClient = typeof supabase;
export type Database = any; // Você pode adicionar seus tipos aqui
export type Tables = any;
export type Enums = any;

// Configuração de desenvolvimento
if (import.meta.env.DEV) {
  console.log('🚀 Supabase client initialized in development mode');
  console.log('📍 URL:', supabaseUrl);
}

export default supabase;