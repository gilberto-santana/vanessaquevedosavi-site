import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function SupabaseTest() {
  const [testResult, setTestResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      // Test 1: Verificar autenticação
      const { data: authData, error: authError } = await supabase.auth.getSession()
      
      if (authError) {
        setTestResult(`Erro de autenticação: ${authError.message}`)
        return
      }

      // Test 2: Listar tabelas públicas
      const { data: tablesData, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')

      if (tablesError) {
        setTestResult(`Erro ao listar tabelas: ${tablesError.message}`)
        return
      }

      setTestResult(`✅ Conexão bem-sucedida!\nSessão: ${authData.session ? 'Ativa' : 'Inativa'}\nTabelas públicas: ${tablesData?.length || 0}`)
    } catch (error) {
      setTestResult(`❌ Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Teste de Conexão Supabase</h2>
      
      <div className="mb-4">
        <button
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Testando...' : 'Testar Conexão'}
        </button>
      </div>

      <div className="p-3 bg-gray-100 rounded text-sm">
        <pre className="whitespace-pre-wrap">{testResult || 'Clique em "Testar Conexão" para verificar'}</pre>
      </div>

      <div className="mt-4 text-xs text-gray-600">
        <p>📋 <strong>Próximos passos:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Configure suas credenciais no arquivo .env</li>
          <li>Crie tabelas no dashboard do Supabase</li>
          <li>Configure RLS (Row Level Security) se necessário</li>
        </ul>
      </div>
    </div>
  )
}