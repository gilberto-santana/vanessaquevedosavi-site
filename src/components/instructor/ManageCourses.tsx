import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Users, Star } from "lucide-react";

interface ManageCoursesProps {
  onEditCourse: (courseId: string) => void;
}

export function ManageCourses({ onEditCourse }: ManageCoursesProps) {
  const courses = [
    { id: "1", title: "Massoterapia Avançada", students: 89, modules: 8, rating: 4.9, status: "Publicado" },
    { id: "2", title: "Reflexologia Profissional", students: 67, modules: 6, rating: 4.8, status: "Publicado" },
    { id: "3", title: "Aromaterapia Clínica", students: 54, modules: 7, rating: 4.7, status: "Publicado" },
    { id: "4", title: "Drenagem Linfática", students: 0, modules: 5, rating: 0, status: "Rascunho" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Cursos</h1>
          <p className="text-muted-foreground mt-1">Crie e edite seus cursos</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Curso
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students} alunos
                    </span>
                    <span>{course.modules} módulos</span>
                    {course.rating > 0 && (
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                        {course.rating}
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      course.status === "Publicado" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEditCourse(course.id)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
