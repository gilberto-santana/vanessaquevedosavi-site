import { useSupabase } from '@/hooks/use-supabase'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface Tarefa {
  id?: number
  titulo: string
  descricao: string
  concluida: boolean
  criada_em?: string
}

export function SupabaseCrudExample() {
  const { supabase, user } = useSupabase()
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [novaTarefa, setNovaTarefa] = useState({ titulo: '', descricao: '' })
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState('')

  // Função para buscar tarefas
  const buscarTarefas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tarefas')
        .select('*')
        .order('criada_em', { ascending: false })

      if (error) {
        setMensagem(`Erro ao buscar: ${error.message}`)
        console.error('Erro detalhado:', error)
      } else {
        setTarefas(data || [])
        setMensagem(`Encontradas ${data?.length || 0} tarefas`)
      }
    } catch (error) {
      setMensagem('Erro de conexão com o banco')
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  // Função para criar nova tarefa
  const criarTarefa = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!novaTarefa.titulo.trim()) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tarefas')
        .insert([
          {
            titulo: novaTarefa.titulo,
            descricao: novaTarefa.descricao,
            concluida: false,
            criada_em: new Date().toISOString()
          }
        ])
        .select()

      if (error) {
        setMensagem(`Erro ao criar: ${error.message}`)
        console.error('Erro detalhado:', error)
      } else {
        setMensagem('Tarefa criada com sucesso!')
        setNovaTarefa({ titulo: '', descricao: '' })
        buscarTarefas() // Recarregar lista
      }
    } catch (error) {
      setMensagem('Erro ao criar tarefa')
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  // Função para deletar tarefa
  const deletarTarefa = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('tarefas')
        .delete()
        .eq('id', id)

      if (error) {
        setMensagem(`Erro ao deletar: ${error.message}`)
      } else {
        setMensagem('Tarefa deletada!')
        buscarTarefas() // Recarregar lista
      }
    } catch (error) {
      setMensagem('Erro ao deletar tarefa')
    } finally {
      setLoading(false)
    }
  }

  // Buscar tarefas ao montar o componente
  useEffect(() => {
    buscarTarefas()
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Teste CRUD Supabase</CardTitle>
          <CardDescription>
            Crie, leia, atualize e delete tarefas no banco de dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Formulário de nova tarefa */}
          <form onSubmit={criarTarefa} className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold">Nova Tarefa</h3>
            <div>
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                type="text"
                value={novaTarefa.titulo}
                onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
                placeholder="Digite o título da tarefa"
                required
              />
            </div>
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                value={novaTarefa.descricao}
                onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
                placeholder="Digite a descrição (opcional)"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Criando...' : 'Criar Tarefa'}
            </Button>
          </form>

          {/* Lista de tarefas */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Tarefas ({tarefas.length})</h3>
              <Button onClick={buscarTarefas} variant="outline" size="sm" disabled={loading}>
                🔄 Atualizar
              </Button>
            </div>

            {tarefas.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhuma tarefa encontrada. Crie sua primeira tarefa!
              </p>
            ) : (
              <div className="space-y-3">
                {tarefas.map((tarefa) => (
                  <div key={tarefa.id} className="p-4 border rounded-lg">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-medium ${tarefa.concluida ? 'line-through text-gray-500' : ''}`}>
                          {tarefa.titulo}
                        </h4>
                        <div className="flex gap-1">
                          <Button
                            onClick={() => deletarTarefa(tarefa.id!)}
                            variant="destructive"
                            size="sm"
                          >
                            🗑️
                          </Button>
                        </div>
                      </div>
                      {tarefa.descricao && (
                        <p className={`text-sm text-gray-600 ${tarefa.concluida ? 'line-through' : ''}`}>
                          {tarefa.descricao}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        ID: {tarefa.id} | Criada: {new Date(tarefa.criada_em!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mensagens de status */}
          {mensagem && (
            <div className="p-3 bg-blue-50 text-blue-700 rounded text-sm">
              {mensagem}
            </div>
          )}

          {/* Informações de debug */}
          <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>• Usuário: {user ? user.email : 'Não logado'}</p>
            <p>• Total de tarefas: {tarefas.length}</p>
            <p>• Status: {loading ? 'Carregando...' : 'Pronto'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}