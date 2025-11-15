import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CouponManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciamento de Cupons</h2>
      <Card>
        <CardHeader>
          <CardTitle>Cupons de Desconto</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CouponManagement;