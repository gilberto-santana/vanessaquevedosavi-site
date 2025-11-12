import { Check } from "lucide-react";

export const Results = () => {
  const results = [
    {
      title: "Alívio imediato da dor",
      description: "Técnicas comprovadas para redução da dor em até 80%",
    },
    {
      title: "Melhora da flexibilidade",
      description: "Aumento significativo da amplitude de movimento",
    },
    {
      title: "Relaxamento profundo",
      description: "Redução do estresse e melhora do bem-estar geral",
    },
    {
      title: "Prevenção de lesões",
      description: "Fortalecimento e proteção muscular duradoura",
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Resultados que você pode{" "}
              <span className="text-primary">sentir e medir</span>
            </h3>
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg mb-1">
                      {result.title}
                    </h4>
                    <p className="text-muted-foreground">{result.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              alt="Resultados da massoterapia"
              className="rounded-xl shadow-elegant object-cover w-full h-96"
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
