import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações da Plataforma</h1>
        <p className="text-muted-foreground mt-1">Gerencie configurações gerais e integrações</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="platform-name">Nome da Plataforma</Label>
              <Input id="platform-name" placeholder="Vanessa Quevedo Savi" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="support-email">Email de Suporte</Label>
              <Input id="support-email" type="email" placeholder="suporte@plataforma.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="domain">Domínio Customizado</Label>
              <Input id="domain" placeholder="cursos.seudominio.com" className="mt-1" />
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrações de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="stripe-key">Stripe API Key</Label>
              <Input id="stripe-key" type="password" placeholder="sk_live_..." className="mt-1" />
            </div>
            <div>
              <Label htmlFor="mercadopago-token">MercadoPago Access Token</Label>
              <Input id="mercadopago-token" type="password" placeholder="APP_USR..." className="mt-1" />
            </div>
            <Button className="w-full" variant="outline">Testar Conexão</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input id="smtp-host" placeholder="smtp.gmail.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input id="smtp-port" placeholder="587" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="smtp-user">SMTP User</Label>
              <Input id="smtp-user" placeholder="noreply@plataforma.com" className="mt-1" />
            </div>
            <Button className="w-full" variant="outline">Enviar Email de Teste</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-forum">Fórum da Comunidade</Label>
                <p className="text-sm text-muted-foreground">Permitir discussões entre alunos</p>
              </div>
              <Switch id="enable-forum" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-gamification">Gamificação</Label>
                <p className="text-sm text-muted-foreground">Pontos, badges e rankings</p>
              </div>
              <Switch id="enable-gamification" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-certificates">Certificados Automáticos</Label>
                <p className="text-sm text-muted-foreground">Emitir após conclusão do curso</p>
              </div>
              <Switch id="enable-certificates" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-2fa">Autenticação 2FA</Label>
                <p className="text-sm text-muted-foreground">Exigir verificação em duas etapas</p>
              </div>
              <Switch id="enable-2fa" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
