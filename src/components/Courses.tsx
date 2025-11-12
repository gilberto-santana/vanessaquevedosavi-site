import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Award } from "lucide-react";

export const Courses = () => {
  const courses = [
    {
      title: "Massoterapia Básica",
      description: "Fundamentos essenciais da massoterapia e técnicas básicas",
      duration: "40 horas",
      students: "500+",
      certificate: "Certificado incluso",
      image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&q=80",
    },
    {
      title: "Massoterapia Avançada",
      description: "Técnicas avançadas e especializadas de tratamento",
      duration: "80 horas",
      students: "300+",
      certificate: "Certificado profissional",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    },
    {
      title: "Terapias Holísticas",
      description: "Abordagens integradas para saúde e bem-estar",
      duration: "60 horas",
      students: "400+",
      certificate: "Certificado incluso",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
    },
  ];

  return (
    <section id="cursos" className="py-20 bg-background scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nossos Cursos
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha o curso ideal para iniciar ou avançar na sua carreira de
            massoterapeuta
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-elegant transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {course.duration}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  {course.students} alunos
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Award className="mr-2 h-4 w-4" />
                  {course.certificate}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded-full">
                  Saiba mais
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
