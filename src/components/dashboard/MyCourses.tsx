import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award } from "lucide-react";

const mockCourses = {
  inProgress: [
    {
      id: "1",
      title: "Massoterapia Avançada",
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
      instructor: "Vanessa Quevedo Savi",
    },
    {
      id: "2",
      title: "Drenagem Linfática",
      progress: 40,
      totalLessons: 18,
      completedLessons: 7,
      thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400",
      instructor: "Vanessa Quevedo Savi",
    },
    {
      id: "3",
      title: "Reflexologia Podal",
      progress: 20,
      totalLessons: 15,
      completedLessons: 3,
      thumbnail: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=400",
      instructor: "Vanessa Quevedo Savi",
    },
  ],
  completed: [
    {
      id: "4",
      title: "Massagem Relaxante",
      progress: 100,
      totalLessons: 12,
      completedLessons: 12,
      thumbnail: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400",
      instructor: "Vanessa Quevedo Savi",
      completedDate: "2024-10-15",
    },
    {
      id: "5",
      title: "Quick Massage",
      progress: 100,
      totalLessons: 10,
      completedLessons: 10,
      thumbnail: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400",
      instructor: "Vanessa Quevedo Savi",
      completedDate: "2024-09-20",
    },
  ],
};

interface MyCoursesProps {
  onViewCourse: (courseId: string) => void;
}

export const MyCourses = ({ onViewCourse }: MyCoursesProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Meus Cursos</h1>
        <p className="text-muted-foreground">
          Gerencie todos os seus cursos em um só lugar
        </p>
      </div>

      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList>
          <TabsTrigger value="in-progress">
            Em Andamento ({mockCourses.inProgress.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Concluídos ({mockCourses.completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.inProgress.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">por {course.instructor}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        {course.completedLessons} de {course.totalLessons} aulas
                      </span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => onViewCourse(course.id)}
                  >
                    Continuar Curso
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.completed.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span className="text-xs font-semibold">Concluído</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">por {course.instructor}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Progress value={100} />
                    <p className="text-sm text-muted-foreground mt-2">
                      Concluído em {new Date(course.completedDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onViewCourse(course.id)}
                  >
                    Revisar Conteúdo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
