import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Video, FileText, Upload } from "lucide-react";

interface CourseEditorProps {
  courseId: string | null;
  onBack: () => void;
}

export function CourseEditor({ courseId, onBack }: CourseEditorProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Editor de Curso</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Título do Curso</label>
                <Input placeholder="Ex: Massoterapia Avançada" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Descrição</label>
                <Textarea 
                  placeholder="Descreva o conteúdo e objetivos do curso..." 
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Preço (R$)</label>
                  <Input type="number" placeholder="497,00" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Duração (horas)</label>
                  <Input type="number" placeholder="40" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Módulos e Aulas</CardTitle>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Módulo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((module) => (
                  <div key={module} className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-3">Módulo {module}</h4>
                    <div className="space-y-2">
                      {[1, 2].map((lesson) => (
                        <div key={lesson} className="flex items-center justify-between bg-muted p-3 rounded">
                          <div className="flex items-center space-x-3">
                            <Video className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Aula {lesson}</span>
                          </div>
                          <Button variant="ghost" size="sm">Editar</Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Aula
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Imagem de Capa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">Arraste uma imagem ou clique para fazer upload</p>
                <Button variant="outline" size="sm">Selecionar Arquivo</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Materiais de Apoio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Upload PDF
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Upload Arquivo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Salvar Rascunho</Button>
              <Button className="w-full" variant="outline">Pré-visualizar</Button>
              <Button className="w-full bg-green-600 hover:bg-green-700">Publicar Curso</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
