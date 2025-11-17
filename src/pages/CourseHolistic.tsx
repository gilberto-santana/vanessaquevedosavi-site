import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users, Award, BookOpen, Video, FileText, Star, Heart, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const CourseHolistic = () => {
  const navigate = useNavigate();
  useScrollToTop();

  const modules = [
    {
      title: "Módulo 1: Fundamentos da Saúde Holística",
      lessons: [
        "Princípios da Medicina Holística",
        "Corpo, Mente e Espírito",
        "Energia Vital e Chakras",
        "Constituição Individual"
      ]
    },
    {
      title: "Módulo 2: Terapias Energéticas",
      lessons: [
        "Reiki e Imposição de Mãos",
        "Cristaloterapia",
        "Aromaterapia",
        "Florais de Bach"
      ]
    },
    {
      title: "Módulo 3: Abordagens Corporais",
      lessons: [
        "Reflexologia Podal",
        "Digitopuntura",
        "Shiatsu",
        "Terapia Tântrica"
      ]
    },
    {
      title: "Módulo 4: Integração e Prática",
      lessons: [
        "Avaliação Holística",
        "Protocolos Integrados",
        "Meditação e Mindfulness",
        "Empoderamento Pessoal"
      ]
    }
  ];

  const features = [
    { icon: Clock, text: "60 horas de conteúdo transformador" },
    { icon: Video, text: "Aulas com técnicas práticas demonstradas" },
    { icon: BookOpen, text: "Guias de práticas holísticas" },
    { icon: Users, text: "Comunidade de praticantes" },
    { icon: Award, text: "Certificado holístico reconhecido" },
    { icon: Star, text: "Avaliação 4.9/5 de 400+ alunos" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-green-600 hover:text-green-700"
          >
            ← Voltar para Home
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-green-600 font-semibold">Curso Transformador</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Terapias Holísticas
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Descubra abordagens integradas para saúde e bem-estar que unificam corpo, 
                mente e espírito. Aprenda técnicas holísticas poderosas para promover equilíbrio 
                e harmonia na vida de seus clientes e na sua própria jornada pessoal.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-2 h-5 w-5 text-green-500" />
                  <span>60 horas</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="mr-2 h-5 w-5 text-green-500" />
                  <span>400+ alunos</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="mr-2 h-5 w-5 text-green-500" />
                  <span>Certificado</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                  onClick={() => navigate('/auth')}
                >
                  Inscreva-se Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-green-500 text-green-500 hover:bg-green-50"
                >
                  Ver Grade Curricular
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80"
                alt="Terapias Holísticas"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-500 text-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold">R$ 697</div>
                <div className="text-sm opacity-90">ou 12x de R$ 65,00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            O Que Você Vai Receber
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <IconComponent className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">{feature.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Grade Curricular Completa
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <Card key={index} className="border-green-200 shadow-lg">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-xl text-green-800">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="h-16 w-16 text-white opacity-80" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para Transformar Vidas?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Junte-se a mais de 400 terapeutas holísticos que já estão fazendo a diferença no mundo
          </p>
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-green-50 rounded-full px-8 text-lg font-semibold"
            onClick={() => navigate('/auth')}
          >
            Garantir Minha Vaga Agora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CourseHolistic;