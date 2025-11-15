import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  numero_alunos: string;
  certificado: string;
  imagem_url: string;
  preco: number;
  preco_parcelado: string;
  nivel: 'basico' | 'avancado' | 'holistico';
  created_at: string;
  updated_at: string;
}

export const CourseManagement = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCurso, setEditingCurso] = useState<Curso | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    duracao: '',
    numero_alunos: '',
    certificado: '',
    imagem_url: '',
    preco: 0,
    preco_parcelado: '',
    nivel: 'basico' as 'basico' | 'avancado' | 'holistico'
  });

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCursos(data || []);
    } catch (error) {
      toast({
        title: 'Erro ao carregar cursos',
        description: 'Não foi possível carregar os cursos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCurso) {
        const { error } = await supabase
          .from('cursos')
          .update(formData)
          .eq('id', editingCurso.id);

        if (error) throw error;

        toast({
          title: 'Sucesso!',
          description: 'Curso atualizado com sucesso.',
        });
      } else {
        const { error } = await supabase
          .from('cursos')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: 'Sucesso!',
          description: 'Curso criado com sucesso.',
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchCursos();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o curso.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este curso?')) return;

    try {
      const { error } = await supabase
        .from('cursos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso!',
        description: 'Curso excluído com sucesso.',
      });

      fetchCursos();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o curso.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descricao: '',
      duracao: '',
      numero_alunos: '',
      certificado: '',
      imagem_url: '',
      preco: 0,
      preco_parcelado: '',
      nivel: 'basico'
    });
    setEditingCurso(null);
  };

  const openEditDialog = (curso: Curso) => {
    setEditingCurso(curso);
    setFormData({
      titulo: curso.titulo,
      descricao: curso.descricao,
      duracao: curso.duracao,
      numero_alunos: curso.numero_alunos,
      certificado: curso.certificado,
      imagem_url: curso.imagem_url,
      preco: curso.preco,
      preco_parcelado: curso.preco_parcelado,
      nivel: curso.nivel
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
        <h2 className="text-2xl font-bold">Gerenciamento de Cursos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCurso ? 'Editar Curso' : 'Criar Novo Curso'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duracao">Duração</Label>
                  <Input
                    id="duracao"
                    value={formData.duracao}
                    onChange={(e) => setFormData({...formData, duracao: e.target.value})}
                    placeholder="Ex: 40 horas"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numero_alunos">Número de Alunos</Label>
                  <Input
                    id="numero_alunos"
                    value={formData.numero_alunos}
                    onChange={(e) => setFormData({...formData, numero_alunos: e.target.value})}
                    placeholder="Ex: 500+"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="certificado">Certificado</Label>
                  <Input
                    id="certificado"
                    value={formData.certificado}
                    onChange={(e) => setFormData({...formData, certificado: e.target.value})}
                    placeholder="Ex: Certificado incluso"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="imagem_url">URL da Imagem</Label>
                <Input
                  id="imagem_url"
                  value={formData.imagem_url}
                  onChange={(e) => setFormData({...formData, imagem_url: e.target.value})}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="preco">Preço (R$)</Label>
                  <Input
                    id="preco"
                    type="number"
                    step="0.01"
                    value={formData.preco}
                    onChange={(e) => setFormData({...formData, preco: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="preco_parcelado">Preço Parcelado</Label>
                  <Input
                    id="preco_parcelado"
                    value={formData.preco_parcelado}
                    onChange={(e) => setFormData({...formData, preco_parcelado: e.target.value})}
                    placeholder="Ex: 12x de R$ 46,50"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nivel">Nível</Label>
                  <select
                    id="nivel"
                    value={formData.nivel}
                    onChange={(e) => setFormData({...formData, nivel: e.target.value as 'basico' | 'avancado' | 'holistico'})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="basico">Básico</option>
                    <option value="avancado">Avançado</option>
                    <option value="holistico">Holístico</option>
                  </select>
                </div>
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
                  {editingCurso ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Cursos</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Carregando...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Alunos</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cursos.map((curso) => (
                  <TableRow key={curso.id}>
                    <TableCell className="font-medium">{curso.titulo}</TableCell>
                    <TableCell>{curso.duracao}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        curso.nivel === 'basico' ? 'bg-green-100 text-green-800' :
                        curso.nivel === 'avancado' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {curso.nivel === 'basico' ? 'Básico' :
                         curso.nivel === 'avancado' ? 'Avançado' : 'Holístico'}
                      </span>
                    </TableCell>
                    <TableCell>R$ {curso.preco.toFixed(2)}</TableCell>
                    <TableCell>{curso.numero_alunos}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(curso)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(curso.id)}
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
          
          {cursos.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              Nenhum curso encontrado. Clique em "Novo Curso" para criar o primeiro.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseManagement;