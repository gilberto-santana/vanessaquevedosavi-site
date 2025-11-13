import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export function Messages() {
  const conversations = [
    { id: "1", student: "Maria Silva", lastMessage: "Obrigada pela explicação!", time: "10:30", unread: 2 },
    { id: "2", student: "João Santos", lastMessage: "Tenho uma dúvida sobre o módulo 3", time: "Ontem", unread: 0 },
    { id: "3", student: "Ana Costa", lastMessage: "Quando será a próxima aula ao vivo?", time: "há 2 dias", unread: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mensagens</h1>
        <p className="text-muted-foreground">Converse com seus alunos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-border">
                <Input placeholder="Buscar conversas..." />
              </div>
              <div className="divide-y divide-border">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    className="w-full p-4 text-left hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-foreground">{conv.student}</h4>
                      {conv.unread > 0 && (
                        <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{conv.time}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Maria Silva</h3>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
            
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Olá! Tenho uma dúvida sobre a técnica demonstrada no vídeo.</p>
                  <p className="text-xs text-muted-foreground mt-1">10:15</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-teal-600 text-white rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Claro! Qual parte especificamente você gostaria que eu explicasse melhor?</p>
                  <p className="text-xs text-teal-100 mt-1">10:20</p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-xs">
                  <p className="text-sm">A posição das mãos na técnica de drenagem.</p>
                  <p className="text-xs text-muted-foreground mt-1">10:22</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-teal-600 text-white rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Vou preparar um vídeo complementar mostrando em mais detalhes. Te envio amanhã!</p>
                  <p className="text-xs text-teal-100 mt-1">10:25</p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Obrigada pela explicação!</p>
                  <p className="text-xs text-muted-foreground mt-1">10:30</p>
                </div>
              </div>
            </CardContent>
            
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Textarea 
                  placeholder="Digite sua mensagem..." 
                  className="resize-none"
                  rows={2}
                />
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
