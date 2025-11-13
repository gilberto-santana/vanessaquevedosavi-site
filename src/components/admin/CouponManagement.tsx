import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Tag } from "lucide-react";

export function CouponManagement() {
  const coupons = [
    { id: "1", code: "BEMVINDO20", discount: "20%", type: "Percentual", uses: 45, limit: 100, status: "Ativo", expires: "31/12/2025" },
    { id: "2", code: "PRIMEIRACOMPRA", discount: "R$ 50", type: "Fixo", uses: 23, limit: 50, status: "Ativo", expires: "30/11/2025" },
    { id: "3", code: "BLACKFRIDAY", discount: "50%", type: "Percentual", uses: 100, limit: 100, status: "Expirado", expires: "30/11/2024" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Cupons</h1>
          <p className="text-muted-foreground mt-1">Crie e gerencie cupons de desconto</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cupom
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar cupons..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {coupons.map((coupon) => (
          <Card key={coupon.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Tag className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{coupon.code}</h3>
                      <Badge variant={coupon.status === "Ativo" ? "default" : "secondary"}>
                        {coupon.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Desconto</p>
                        <p className="font-semibold text-foreground">{coupon.discount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tipo</p>
                        <p className="font-semibold text-foreground">{coupon.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Usos</p>
                        <p className="font-semibold text-foreground">{coupon.uses}/{coupon.limit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expira em</p>
                        <p className="font-semibold text-foreground">{coupon.expires}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
