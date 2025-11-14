import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users, Award, BookOpen, Video, FileText, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseAdvanced = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Módulo 1: Anatomia Avançada",
      lessons: [
        "Anatomia Palpatória",
        "Biomecânica Aplicada",
        "Sistema Fascial",
        "Cadeias Musculares"
      ]
    },
    {
      title: "Módulo 2: Técnicas Específicas",
      lessons: [
        "Trigger Points",
        "Liberação Miofascial",
        "Terapia Craniosacral",
        "Drenagem Linfática"
      ]
    },
    {
      title: "Módulo 3: Patologias e Tratamentos",
      lessons: [
        "Dor Crônica",
        "Lesões Esportivas",
        "Patologias da Coluna",
        "Transtornos Posturais"
      ]
    },
    {
      title: "Módulo 4: Avaliação e Diagnóstico",
      lessons: [
        "Anamnese Detalhada",
        "Testes Específicos",
        "Avaliação Postural",
        "Elaboração de Planos de Tratamento"
      ]
    }
  ];

  const features = [
    { icon: Clock, text: "80 horas de conteúdo avançado" },
    { icon: Video, text: "Aulas práticas demonstrativas" },
    { icon: BookOpen, text: "Material complementar exclusivo" },
    { icon: Users, text: "Grupo de estudos avançado" },
    { icon: Award, text: "Certificado profissional reconhecido" },
    { icon: Star, text: "Avaliação 4.8/5 de 300+ alunos" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-purple-600 hover:text-purple-700"
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
                <TrendingUp className="h-6 w-6 text-purple-500 mr-2" />
                <span className="text-purple-600 font-semibold">Curso Avançado</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Massoterapia Avançada
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Domine técnicas avançadas e especializadas para tratar patologias complexas. 
                Aprenda abordagens terapêuticas sofisticadas e se torne um profissional 
                altamente qualificado na área de massoterapia.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-2 h-5 w-5 text-purple-500" />
                  <span>80 horas</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="mr-2 h-5 w-5 text-purple-500" />
                  <span>300+ alunos</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="mr-2 h-5 w-5 text-purple-500" />
                  <span>Certificado Profissional</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-full"
                  onClick={() => navigate('/auth')}
                >
                  Inscreva-se Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-purple-500 text-purple-500 hover:bg-purple-50"
                >
                  Ver Grade Curricular
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80"
                alt="Massoterapia Avançada"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-purple-500 text-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold">R$ 897</div>
                <div className="text-sm opacity-90">ou 12x de R$ 83,50</div>
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
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <IconComponent className="h-6 w-6 text-purple-600" />
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
              <Card key={index} className="border-purple-200 shadow-lg">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="text-xl text-purple-800">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="mr-3 h-5 w-5 text-purple-500 flex-shrink-0" />
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
      <section className="py-16 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para Avançar na sua Carreira?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Junte-se a mais de 300 profissionais que já elevaram suas habilidades com nosso curso avançado
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-purple-50 rounded-full px-8 text-lg font-semibold"
            onClick={() => navigate('/auth')}
          >
            Garantir Minha Vaga Agora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CourseAdvanced;