export const Symptoms = () => {
  const symptoms = [
    {
      icon: "ri-body-scan-line",
      title: "Dor Muscular",
      description: "Tensões e dores crônicas que limitam movimentos",
    },
    {
      icon: "ri-run-line",
      title: "Mobilidade Reduzida",
      description: "Dificuldade para realizar atividades diárias",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Estresse",
      description: "Tensão emocional refletida no corpo",
    },
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Você Reconhece Estes Sintomas?
          </h3>
          <p className="text-teal-100 text-lg">
            Identifique os sinais que indicam a necessidade de tratamento
            especializado
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {symptoms.map((symptom, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 shadow-soft"
            >
              <div className="w-16 h-16 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${symptom.icon} text-2xl text-white`}></i>
              </div>
              <h4 className="text-white font-semibold mb-2 text-xl">
                {symptom.title}
              </h4>
              <p className="text-teal-100">{symptom.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
