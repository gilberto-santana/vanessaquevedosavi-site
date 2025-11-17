import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users, Award, BookOpen, Video, FileText, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const CourseBasic = () => {
  const navigate = useNavigate();
  useScrollToTop();

  const modules = [
    {
      title: "Módulo 1: Fundamentos da Massoterapia",
      lessons: [
        "Introdução à Massoterapia",
        "História e Filosofia",
        "Benefícios e Contra-indicações",
        "Ética Profissional"
      ]
    },
    {
      title: "Módulo 2: Anatomia Aplicada",
      lessons: [
        "Sistema Muscular",
        "Sistema Esquelético",
        "Sistema Nervoso",
        "Pontos de Pressão"
      ]
    },
    {
      title: "Módulo 3: Técnicas Básicas",
      lessons: [
        "Massagem Sueca",
        "Movimentos de Efleurage",
        "Técnicas de Petrissagem",
        "Massagem de Relaxamento"
      ]
    },
    {
      title: "Módulo 4: Prática Profissional",
      lessons: [
        "Postura e Ergonomia",
        "Comunicação com Cliente",
        "Documentação de Casos",
        "Marketing Pessoal"
      ]
    }
  ];

  const features = [
    { icon: Clock, text: "40 horas de conteúdo completo" },
    { icon: Video, text: "Vídeo-aulas gravadas em HD" },
    { icon: BookOpen, text: "Material didático em PDF" },
    { icon: Users, text: "Grupo exclusivo no WhatsApp" },
    { icon: Award, text: "Certificado reconhecido nacionalmente" },
    { icon: Star, text: "Avaliação 4.9/5 de 500+ alunos" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-teal-600 hover:text-teal-700"
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
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Massoterapia Básica
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Aprenda os fundamentos essenciais da massoterapia com nosso curso completo. 
                Desde anatomia básica até técnicas de relaxamento, tudo o que você precisa 
                para iniciar sua carreira como massoterapeuta.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-2 h-5 w-5 text-teal-500" />
                  <span>40 horas</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="mr-2 h-5 w-5 text-teal-500" />
                  <span>500+ alunos</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="mr-2 h-5 w-5 text-teal-500" />
                  <span>Certificado</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-teal-500 hover:bg-teal-600 text-white rounded-full"
                  onClick={() => navigate('/auth')}
                >
                  Inscreva-se Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-teal-500 text-teal-500 hover:bg-teal-50"
                >
                  Ver Grade Curricular
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&q=80"
                alt="Massoterapia Básica"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-teal-500 text-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold">R$ 497</div>
                <div className="text-sm opacity-90">ou 12x de R$ 46,50</div>
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
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <IconComponent className="h-6 w-6 text-teal-600" />
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
              <Card key={index} className="border-teal-200 shadow-lg">
                <CardHeader className="bg-teal-50">
                  <CardTitle className="text-xl text-teal-800">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="mr-3 h-5 w-5 text-teal-500 flex-shrink-0" />
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
      <section className="py-16 bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para Começar sua Jornada?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Junte-se a mais de 500 alunos que já transformaram suas vidas com nosso curso de Massoterapia Básica
          </p>
          <Button 
            size="lg" 
            className="bg-white text-teal-600 hover:bg-teal-50 rounded-full px-8 text-lg font-semibold"
            onClick={() => navigate('/auth')}
          >
            Garantir Minha Vaga Agora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CourseBasic;