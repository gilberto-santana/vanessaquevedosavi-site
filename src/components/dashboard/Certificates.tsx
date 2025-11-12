import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2, Eye } from "lucide-react";

const mockCertificates = [
  {
    id: "cert1",
    courseTitle: "Massagem Relaxante",
    completedDate: "2024-10-15",
    certificateNumber: "MR-2024-001543",
    hours: 40,
    thumbnail: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
  },
  {
    id: "cert2",
    courseTitle: "Quick Massage",
    completedDate: "2024-09-20",
    certificateNumber: "QM-2024-001387",
    hours: 30,
    thumbnail: "https://images.unsplash.com/photo-1560264280-88b68371db39?w=400",
  },
  {
    id: "cert3",
    courseTitle: "Shiatsu Básico",
    completedDate: "2024-08-10",
    certificateNumber: "SH-2024-001201",
    hours: 35,
    thumbnail: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400",
  },
  {
    id: "cert4",
    courseTitle: "Aromaterapia Aplicada",
    completedDate: "2024-07-05",
    certificateNumber: "AR-2024-000956",
    hours: 25,
    thumbnail: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400",
  },
  {
    id: "cert5",
    courseTitle: "Massagem Desportiva",
    completedDate: "2024-06-12",
    certificateNumber: "MD-2024-000743",
    hours: 45,
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
  },
];

export const Certificates = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Meus Certificados
        </h1>
        <p className="text-muted-foreground">
          Todos os seus certificados em um só lugar. Baixe, compartilhe ou visualize.
        </p>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{mockCertificates.length} Certificados</h3>
              <p className="text-muted-foreground">
                Total de {mockCertificates.reduce((acc, cert) => acc + cert.hours, 0)} horas de formação
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCertificates.map((certificate) => (
          <Card key={certificate.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[16/10] overflow-hidden relative bg-gradient-to-br from-primary/20 to-primary/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Certificado de Conclusão
                  </h3>
                  <p className="text-lg font-semibold text-primary">
                    {certificate.courseTitle}
                  </p>
                </div>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg">{certificate.courseTitle}</CardTitle>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Concluído em {new Date(certificate.completedDate).toLocaleDateString('pt-BR')}</p>
                <p>Certificado Nº {certificate.certificateNumber}</p>
                <p>Carga Horária: {certificate.hours} horas</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                <Download className="w-4 h-4 mr-2" />
                Baixar Certificado
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Sobre os Certificados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>✓ Todos os certificados são autenticados com QR Code</p>
          <p>✓ Numeração única para cada certificado</p>
          <p>✓ Válidos em todo território nacional</p>
          <p>✓ Podem ser compartilhados no LinkedIn e redes sociais</p>
        </CardContent>
      </Card>
    </div>
  );
};
