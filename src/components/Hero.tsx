import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-teal-900/60"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforme Dor em{" "}
              <span className="text-teal-300">Alívio</span> e Restaure a{" "}
              <span className="text-teal-300">Mobilidade</span>
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-teal-100">
              Aprenda técnicas avançadas de massoterapia e terapias holísticas
              com certificação profissional. Mais de 1000 alunos já
              transformaram suas carreiras conosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="rounded-full text-lg font-semibold bg-teal-500 hover:bg-teal-600 text-white"
                onClick={() => scrollToSection("cursos")}
              >
                Quero me inscrever agora
              </Button>
              <Button
                size="lg"

                className="rounded-full text-lg font-semibold bg-teal-500 hover:bg-teal-600 text-white"
                onClick={() => scrollToSection("cursos")}
              >
                Conhecer os cursos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
