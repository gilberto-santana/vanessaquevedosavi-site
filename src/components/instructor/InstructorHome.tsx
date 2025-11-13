import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Star, TrendingUp } from "lucide-react";

export function InstructorHome() {
  const stats = [
    { label: "Cursos Ativos", value: "8", icon: BookOpen, color: "text-teal-600" },
    { label: "Total de Alunos", value: "342", icon: Users, color: "text-blue-600" },
    { label: "Avaliação Média", value: "4.8", icon: Star, color: "text-yellow-600" },
    { label: "Receita Mensal", value: "R$ 12.450", icon: TrendingUp, color: "text-green-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard do Instrutor</h1>
        <p className="text-muted-foreground">Bem-vindo de volta! Aqui está um resumo das suas atividades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cursos com Melhor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Massoterapia Avançada", students: 89, rating: 4.9 },
                { name: "Reflexologia Profissional", students: 67, rating: 4.8 },
                { name: "Aromaterapia Clínica", students: 54, rating: 4.7 },
              ].map((course) => (
                <div key={course.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{course.name}</p>
                    <p className="text-sm text-muted-foreground">{course.students} alunos</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Novo aluno matriculado", course: "Massoterapia Avançada", time: "há 2 horas" },
                { action: "Avaliação 5 estrelas", course: "Reflexologia Profissional", time: "há 5 horas" },
                { action: "Comentário no fórum", course: "Aromaterapia Clínica", time: "há 1 dia" },
              ].map((activity, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.course}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
