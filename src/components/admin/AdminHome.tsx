import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, DollarSign, TrendingUp, Activity } from "lucide-react";

export function AdminHome() {
  const stats = [
    { label: "Total Usuários", value: "1,248", icon: Users, change: "+12.5%", color: "text-blue-600" },
    { label: "Cursos Ativos", value: "34", icon: BookOpen, change: "+3", color: "text-teal-600" },
    { label: "Receita Total", value: "R$ 89.340", icon: DollarSign, change: "+18.2%", color: "text-green-600" },
    { label: "Taxa de Conclusão", value: "78%", icon: TrendingUp, change: "+5.3%", color: "text-purple-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">Visão geral da plataforma e métricas principais.</p>
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
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Vendas Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "Maria Silva", course: "Massoterapia Avançada", value: "R$ 497,00", time: "há 15 min" },
                { user: "João Santos", course: "Reflexologia", value: "R$ 397,00", time: "há 1 hora" },
                { user: "Ana Costa", course: "Aromaterapia", value: "R$ 447,00", time: "há 2 horas" },
              ].map((sale, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{sale.user}</p>
                    <p className="text-sm text-muted-foreground">{sale.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{sale.value}</p>
                    <p className="text-xs text-muted-foreground">{sale.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cursos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Massoterapia Avançada", sales: 234, revenue: "R$ 116.298" },
                { name: "Reflexologia Profissional", sales: 189, revenue: "R$ 75.033" },
                { name: "Aromaterapia Clínica", sales: 156, revenue: "R$ 69.732" },
              ].map((course) => (
                <div key={course.name}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{course.name}</p>
                    <p className="text-sm font-semibold text-green-600">{course.revenue}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(course.sales / 250) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{course.sales} vendas</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
