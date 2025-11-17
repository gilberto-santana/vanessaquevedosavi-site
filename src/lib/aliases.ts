// Arquivo de aliases para resolver problemas de importação definitivamente
// Isso cria caminhos diretos que evitam erros de módulo

// Supabase - exportar tudo de uma vez para evitar problemas de importação
export { createClient } from '@supabase/supabase-js';
export type { SupabaseClient, User, Session } from '@supabase/supabase-js';

// React - garantir que estão disponíveis
export { default as React } from 'react';
export { useState, useEffect, useContext, useCallback, useMemo } from 'react';

// React Router
export { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

// React Query
export { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// UI Components - Radix UI
export * from '@radix-ui/react-dialog';
export * from '@radix-ui/react-dropdown-menu';
export * from '@radix-ui/react-slot';
export * from '@radix-ui/react-toast';
export * from '@radix-ui/react-tooltip';

// Utilidades
export { clsx } from 'clsx';
export { twMerge } from 'tailwind-merge';
export { cva, type VariantProps } from 'class-variance-authority';

// Sonner (toast notifications)
export { Toaster, toast } from 'sonner';

// Exportar tudo como objeto global para debug
export const Modules = {
  supabase: '@supabase/supabase-js',
  react: 'react',
  reactRouter: 'react-router-dom',
  reactQuery: '@tanstack/react-query',
  radixUI: '@radix-ui',
  utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
  sonner: 'sonner'
};

// Função para verificar se todos os módulos estão carregados
export const checkModules = () => {
  const results = {};

  try {
    // @ts-ignore
    results.supabase = typeof createClient === 'function';
    // @ts-ignore
    results.react = typeof React !== 'undefined';
    // @ts-ignore
    results.reactQuery = typeof useQuery === 'function';

    console.log('✅ Módulos carregados:', results);
    return results;
  } catch (error) {
    console.error('❌ Erro ao verificar módulos:', error);
    return { error: true, details: error };
  }
};

// Inicializar verificação em desenvolvimento
if (import.meta.env.DEV) {
  setTimeout(() => {
    console.log('🔍 Verificando módulos...');
    checkModules();
  }, 1000);
}