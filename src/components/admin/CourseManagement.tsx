import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Eye } from "lucide-react";

export function CourseManagement() {
  const courses = [
    { id: "1", title: "Massoterapia Avançada", instructor: "Vanessa Quevedo", students: 89, status: "Publicado", price: "R$ 497,00" },
    { id: "2", title: "Reflexologia Profissional", instructor: "Vanessa Quevedo", students: 67, status: "Publicado", price: "R$ 397,00" },
    { id: "3", title: "Aromaterapia Clínica", instructor: "Dr. Carlos Silva", students: 54, status: "Publicado", price: "R$ 447,00" },
    { id: "4", title: "Drenagem Linfática", instructor: "Ana Paula", students: 0, status: "Rascunho", price: "R$ 397,00" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Cursos</h1>
          <p className="text-muted-foreground mt-1">Administre todos os cursos da plataforma</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Curso
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar cursos..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Curso</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Instrutor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Alunos</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{course.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{course.instructor}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{course.students}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{course.price}</td>
                    <td className="px-6 py-4">
                      <Badge variant={course.status === "Publicado" ? "default" : "secondary"}>
                        {course.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
