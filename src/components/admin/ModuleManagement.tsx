import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Save, X, BookOpen, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Modulo {
  id: string;
  curso_id: string;
  titulo: string;
  descricao: string;
  ordem: number;
  duracao_estimada: string;
  created_at: string;
  updated_at: string;
  curso_titulo?: string;
}

interface Curso {
  id: string;
  titulo: string;
}

export const ModuleManagement = () => {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModulo, setEditingModulo] = useState<Modulo | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    curso_id: '',
    titulo: '',
    descricao: '',
    ordem: 0,
    duracao_estimada: ''
  });

  useEffect(() => {
    fetchCursos();
    fetchModulos();
  }, []);

  const fetchCursos = async () => {
    try {
      const { data, error } = await supabase
        .from('cursos')
        .select('id, titulo')
        .order('titulo');

      if (error) throw error;
      setCursos(data || []);
    } catch (error) {
      toast({
        title: 'Erro ao carregar cursos',
        description: 'Não foi possível carregar os cursos.',
        variant: 'destructive',
      });
    }
  };

  const fetchModulos = async () => {
    try {
      const { data, error } = await supabase
        .from('modulos')
        .select(`
          *,
          cursos!inner(titulo)
        `)
        .order('ordem', { ascending: true });

      if (error) throw error;
      
      const modulosComCursos = data?.map(modulo => ({
        ...modulo,
        curso_titulo: modulo.cursos?.titulo
      })) || [];
      
      setModulos(modulosComCursos);
    } catch (error) {
      toast({
        title: 'Erro ao carregar módulos',
        description: 'Não foi possível carregar os módulos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingModulo) {
        const { error } = await supabase
          .from('modulos')
          .update(formData)
          .eq('id', editingModulo.id);

        if (error) throw error;

        toast({
          title: 'Sucesso!',
          description: 'Módulo atualizado com sucesso.',
        });
      } else {
        // Para novos módulos, definir a ordem correta
        const maxOrdem = modulos
          .filter(m => m.curso_id === formData.curso_id)
          .reduce((max, m) => Math.max(max, m.ordem), -1);
        
        const novoModulo = {
          ...formData,
          ordem: maxOrdem + 1
        };

        const { error } = await supabase
          .from('modulos')
          .insert([novoModulo]);

        if (error) throw error;

        toast({
          title: 'Sucesso!',
          description: 'Módulo criado com sucesso.',
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchModulos();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o módulo.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este módulo? As aulas associadas também serão excluídas.')) return;

    try {
      const { error } = await supabase
        .from('modulos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso!',
        description: 'Módulo excluído com sucesso.',
      });

      fetchModulos();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o módulo.',
        variant: 'destructive',
      });
    }
  };

  const handleOrderChange = async (id: string, novaOrdem: number, direcao: 'up' | 'down') => {
    try {
      const moduloAtual = modulos.find(m => m.id === id);
      if (!moduloAtual) return;

      const modulosDoCurso = modulos
        .filter(m => m.curso_id === moduloAtual.curso_id)
        .sort((a, b) => a.ordem - b.ordem);

      const indiceAtual = modulosDoCurso.findIndex(m => m.id === id);
      const novoIndice = direcao === 'up' ? indiceAtual - 1 : indiceAtual + 1;

      if (novoIndice < 0 || novoIndice >= modulosDoCurso.length) return;

      // Trocar ordem entre os dois módulos
      const moduloAlvo = modulosDoCurso[novoIndice];
      
      await supabase
        .from('modulos')
        .update({ ordem: moduloAlvo.ordem })
        .eq('id', id);

      await supabase
        .from('modulos')
        .update({ ordem: moduloAtual.ordem })
        .eq('id', moduloAlvo.id);

      fetchModulos();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível reordenar o módulo.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      curso_id: '',
      titulo: '',
      descricao: '',
      ordem: 0,
      duracao_estimada: ''
    });
    setEditingModulo(null);
  };

  const openEditDialog = (modulo: Modulo) => {
    setEditingModulo(modulo);
    setFormData({
      curso_id: modulo.curso_id,
      titulo: modulo.titulo,
      descricao: modulo.descricao,
      ordem: modulo.ordem,
      duracao_estimada: modulo.duracao_estimada
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciamento de Módulos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Módulo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingModulo ? 'Editar Módulo' : 'Criar Novo Módulo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="curso_id">Curso</Label>
                <Select
                  value={formData.curso_id}
                  onValueChange={(value) => setFormData({...formData, curso_id: value})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {cursos.map((curso) => (
                      <SelectItem key={curso.id} value={curso.id}>
                        {curso.titulo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="titulo">Título do Módulo</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Ex: Módulo 1 - Introdução"
                  required
                />
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  rows={3}
                  placeholder="Descreva o conteúdo deste módulo"
                  required
                />
              </div>

              <div>
                <Label htmlFor="duracao_estimada">Duração Estimada</Label>
                <Input
                  id="duracao_estimada"
                  value={formData.duracao_estimada}
                  onChange={(e) => setFormData({...formData, duracao_estimada: e.target.value})}
                  placeholder="Ex: 4 horas"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {editingModulo ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Módulos</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Carregando...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordem</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modulos.map((modulo) => (
                  <TableRow key={modulo.id}>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOrderChange(modulo.id, modulo.ordem, 'up')}
                          disabled={modulos.filter(m => m.curso_id === modulo.curso_id).sort((a, b) => a.ordem - b.ordem)[0]?.id === modulo.id}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium">{modulo.ordem + 1}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOrderChange(modulo.id, modulo.ordem, 'down')}
                          disabled={modulos.filter(m => m.curso_id === modulo.curso_id).sort((a, b) => a.ordem - b.ordem).slice(-1)[0]?.id === modulo.id}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{modulo.curso_titulo}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <span>{modulo.titulo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{modulo.duracao_estimada}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(modulo)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(modulo.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {modulos.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              Nenhum módulo encontrado. Clique em "Novo Módulo" para criar o primeiro.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleManagement;