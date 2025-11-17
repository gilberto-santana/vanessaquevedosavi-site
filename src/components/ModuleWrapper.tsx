import React, { useEffect, useState } from 'react';
import { checkModules } from '@/lib/aliases';

interface ModuleWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Componente que garante que todos os módulos estejam carregados antes de renderizar
export const ModuleWrapper: React.FC<ModuleWrapperProps> = ({ children, fallback }) => {
  const [modulesReady, setModulesReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAllModules = async () => {
      try {
        console.log('🔍 Verificando módulos antes da renderização...');

        // Aguardar um pouco para garantir que os módulos estejam carregados
        await new Promise(resolve => setTimeout(resolve, 100));

        const results = checkModules();

        if (results.error) {
          setError('Erro ao carregar módulos');
          console.error('❌ Erro nos módulos:', results.details);
        } else {
          console.log('✅ Todos os módulos carregados com sucesso!');
          setModulesReady(true);
        }
      } catch (err) {
        console.error('❌ Erro crítico ao verificar módulos:', err);
        setError('Erro crítico no carregamento');
      }
    };

    checkAllModules();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-xl mb-4">⚠️ Erro de Carregamento</div>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    );
  }

  if (!modulesReady) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando módulos...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ModuleWrapper;