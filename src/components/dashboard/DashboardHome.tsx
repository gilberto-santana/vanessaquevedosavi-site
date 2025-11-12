import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data
const mockStats = {
  coursesInProgress: 3,
  coursesCompleted: 5,
  totalHoursStudied: 42,
  certificatesEarned: 5,
};

const mockActiveCourses = [
  {
    id: "1",
    title: "Massoterapia Avançada",
    progress: 65,
    nextLesson: "Técnicas de Liberação Miofascial",
    thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
  },
  {
    id: "2",
    title: "Drenagem Linfática",
    progress: 40,
    nextLesson: "Movimentos Circulares Profundos",
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400",
  },
  {
    id: "3",
    title: "Reflexologia Podal",
    progress: 20,
    nextLesson: "Mapeamento dos Pontos Reflexos",
    thumbnail: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=400",
  },
];

interface DashboardHomeProps {
  onViewCourse: (courseId: string) => void;
}

export const DashboardHome = ({ onViewCourse }: DashboardHomeProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Bem-vindo de volta! 👋
        </h1>
        <p className="text-muted-foreground">
          Continue seu aprendizado de onde parou
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cursos em Andamento</CardTitle>
            <BookOpen className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.coursesInProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cursos Concluídos</CardTitle>
            <Award className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.coursesCompleted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Horas de Estudo</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalHoursStudied}h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certificados</CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.certificatesEarned}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Courses */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Continue Aprendendo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockActiveCourses.map((course) => (
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
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Próxima aula:</p>
                  <p className="text-sm font-medium">{course.nextLesson}</p>
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
      </div>
    </div>
  );
};
