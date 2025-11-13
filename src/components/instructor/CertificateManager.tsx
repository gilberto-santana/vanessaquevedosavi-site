import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Eye } from "lucide-react";

export function CertificateManager() {
  const certificates = [
    { id: "1", course: "Massoterapia Avançada", issued: 89, pending: 5 },
    { id: "2", course: "Reflexologia Profissional", issued: 67, pending: 3 },
    { id: "3", course: "Aromaterapia Clínica", issued: 54, pending: 2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gerenciar Certificados</h1>
        <p className="text-muted-foreground">Emita e gerencie certificados de conclusão</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-teal-600" />
                  <div>
                    <CardTitle>{cert.course}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {cert.issued} emitidos • {cert.pending} pendentes
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar Modelo
                  </Button>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    Configurar
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certificados Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { student: "Maria Silva", course: "Massoterapia Avançada", date: "15/11/2025", code: "CERT-2025-001" },
              { student: "João Santos", course: "Reflexologia", date: "14/11/2025", code: "CERT-2025-002" },
              { student: "Ana Costa", course: "Aromaterapia", date: "13/11/2025", code: "CERT-2025-003" },
            ].map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-semibold text-foreground">{cert.student}</h4>
                  <p className="text-sm text-muted-foreground">{cert.course}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cert.date} • {cert.code}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
