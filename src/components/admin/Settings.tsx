import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Settings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configurações</h2>
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;