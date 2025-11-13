import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, DollarSign, CreditCard, TrendingUp } from "lucide-react";

export function PaymentManagement() {
  const stats = [
    { label: "Receita Total", value: "R$ 89.340", icon: DollarSign, color: "text-green-600" },
    { label: "Transações Mês", value: "247", icon: CreditCard, color: "text-blue-600" },
    { label: "Ticket Médio", value: "R$ 362", icon: TrendingUp, color: "text-purple-600" },
  ];

  const transactions = [
    { id: "1", user: "Maria Silva", course: "Massoterapia Avançada", amount: "R$ 497,00", status: "Aprovado", date: "15/11/2025", method: "Cartão" },
    { id: "2", user: "João Santos", course: "Reflexologia", amount: "R$ 397,00", status: "Aprovado", date: "14/11/2025", method: "PIX" },
    { id: "3", user: "Ana Costa", course: "Aromaterapia", amount: "R$ 447,00", status: "Pendente", date: "14/11/2025", method: "Boleto" },
    { id: "4", user: "Pedro Lima", course: "Massoterapia Avançada", amount: "R$ 497,00", status: "Aprovado", date: "13/11/2025", method: "Cartão" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gerenciar Pagamentos</h1>
        <p className="text-muted-foreground mt-1">Acompanhe transações e receitas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar transações..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Usuário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Curso</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Método</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{transaction.user}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.course}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">{transaction.amount}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.method}</td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant="outline" 
                        className={
                          transaction.status === "Aprovado" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.date}</td>
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
