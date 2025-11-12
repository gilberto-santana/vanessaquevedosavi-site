import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Download, 
  FileText,
  Play,
  Lock
} from "lucide-react";

// Mock data
const mockCourseData = {
  "1": {
    title: "Massoterapia Avançada",
    description: "Aprenda técnicas avançadas de massoterapia para tratamento de dores crônicas e tensões musculares profundas.",
    instructor: "Vanessa Quevedo Savi",
    progress: 65,
    modules: [
      {
        id: "m1",
        title: "Módulo 1 - Fundamentos",
        lessons: [
          { id: "l1", title: "Introdução à Massoterapia Avançada", duration: "15:30", completed: true, locked: false },
          { id: "l2", title: "Anatomia Aplicada", duration: "22:15", completed: true, locked: false },
          { id: "l3", title: "Ferramentas e Técnicas", duration: "18:45", completed: true, locked: false },
        ],
      },
      {
        id: "m2",
        title: "Módulo 2 - Técnicas Avançadas",
        lessons: [
          { id: "l4", title: "Liberação Miofascial", duration: "25:00", completed: true, locked: false },
          { id: "l5", title: "Trigger Points", duration: "20:30", completed: false, locked: false },
          { id: "l6", title: "Técnicas de Alongamento", duration: "19:15", completed: false, locked: false },
        ],
      },
      {
        id: "m3",
        title: "Módulo 3 - Prática Clínica",
        lessons: [
          { id: "l7", title: "Avaliação do Cliente", duration: "16:45", completed: false, locked: true },
          { id: "l8", title: "Montagem de Protocolo", duration: "23:00", completed: false, locked: true },
          { id: "l9", title: "Estudos de Caso", duration: "28:30", completed: false, locked: true },
        ],
      },
    ],
    materials: [
      { id: "mat1", title: "Apostila Completa - Massoterapia Avançada.pdf", type: "pdf" },
      { id: "mat2", title: "Mapas de Pontos de Trigger.pdf", type: "pdf" },
      { id: "mat3", title: "Protocolo de Avaliação.pdf", type: "pdf" },
    ],
  },
};

interface CoursePlayerProps {
  courseId: string | null;
  onBack: () => void;
}

export const CoursePlayer = ({ courseId, onBack }: CoursePlayerProps) => {
  const [selectedLesson, setSelectedLesson] = useState<string>("l1");
  
  if (!courseId || !mockCourseData[courseId as keyof typeof mockCourseData]) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Curso não encontrado</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>
    );
  }

  const course = mockCourseData[courseId as keyof typeof mockCourseData];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
          <p className="text-sm text-muted-foreground">por {course.instructor}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <Card>
            <div className="aspect-video bg-muted flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="relative z-10 text-center space-y-4">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-10 h-10 text-primary-foreground ml-1" />
                </div>
                <p className="text-lg font-semibold">Vídeo da Aula</p>
                <p className="text-sm text-muted-foreground">
                  Integração com Vimeo/YouTube será adicionada
                </p>
              </div>
            </div>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-2">
                Liberação Miofascial
              </h2>
              <p className="text-muted-foreground">
                Aprenda as técnicas fundamentais de liberação miofascial para tratamento de tensões musculares profundas e restauração da mobilidade.
              </p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="materials">Materiais</TabsTrigger>
              <TabsTrigger value="notes">Anotações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre este Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{course.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Materiais de Apoio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {course.materials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">{material.title}</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Anotações</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full min-h-[200px] p-3 border border-border rounded-lg bg-background text-foreground resize-none"
                    placeholder="Faça suas anotações aqui..."
                  />
                  <Button className="mt-3">Salvar Anotações</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Course Content */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conteúdo do Curso</CardTitle>
              <div className="mt-2">
                <Progress value={course.progress} />
                <p className="text-sm text-muted-foreground mt-2">
                  {course.progress}% concluído
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.modules.map((module) => (
                <div key={module.id} className="space-y-2">
                  <h4 className="font-semibold text-sm">{module.title}</h4>
                  <div className="space-y-1">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => !lesson.locked && setSelectedLesson(lesson.id)}
                        disabled={lesson.locked}
                        className={`
                          w-full text-left p-3 rounded-lg text-sm transition-colors
                          ${lesson.locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}
                          ${selectedLesson === lesson.id ? 'bg-primary/10 border-l-4 border-primary' : ''}
                        `}
                      >
                        <div className="flex items-start gap-2">
                          {lesson.locked ? (
                            <Lock className="w-4 h-4 mt-0.5 text-muted-foreground" />
                          ) : lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary" />
                          ) : (
                            <Circle className="w-4 h-4 mt-0.5 text-muted-foreground" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
