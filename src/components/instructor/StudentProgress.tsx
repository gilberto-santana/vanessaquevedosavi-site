import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StudentProgress() {
  const students = [
    { id: "1", name: "Maria Silva", email: "maria@email.com", course: "Massoterapia Avançada", progress: 75, lastAccess: "Hoje" },
    { id: "2", name: "João Santos", email: "joao@email.com", course: "Reflexologia", progress: 45, lastAccess: "Ontem" },
    { id: "3", name: "Ana Costa", email: "ana@email.com", course: "Aromaterapia", progress: 90, lastAccess: "Hoje" },
    { id: "4", name: "Pedro Lima", email: "pedro@email.com", course: "Massoterapia Avançada", progress: 30, lastAccess: "há 3 dias" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Progresso dos Alunos</h1>
        <p className="text-muted-foreground">Acompanhe o desempenho de seus alunos</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar aluno..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {students.map((student) => (
          <Card key={student.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{student.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{student.email}</p>
                  <p className="text-sm text-muted-foreground mb-3">{student.course}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-3">
                    Último acesso: {student.lastAccess}
                  </p>
                </div>
                
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Mensagem
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
