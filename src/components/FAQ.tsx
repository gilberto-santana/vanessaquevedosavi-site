import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "Preciso ter experiência prévia?",
      answer:
        "Não! Nossos cursos são desenvolvidos para todos os níveis, desde iniciantes até profissionais que desejam se aperfeiçoar.",
    },
    {
      question: "Os cursos são reconhecidos?",
      answer:
        "Sim, todos os nossos cursos possuem certificação reconhecida e atendem às normas vigentes para formação em massoterapia.",
    },
    {
      question: "Qual a carga horária dos cursos?",
      answer:
        "A carga horária varia de acordo com o curso escolhido, entre 40 e 80 horas de conteúdo teórico e prático.",
    },
    {
      question: "Há aulas práticas?",
      answer:
        "Sim! Todos os cursos incluem aulas práticas supervisionadas para você desenvolver as técnicas de forma adequada.",
    },
    {
      question: "Posso parcelar o pagamento?",
      answer:
        "Sim, oferecemos diversas opções de pagamento e parcelamento para facilitar seu investimento na sua carreira.",
    },
    {
      question: "Há suporte após o curso?",
      answer:
        "Com certeza! Você terá acesso a um grupo exclusivo de alunos e professores para tirar dúvidas mesmo após a conclusão.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h3>
          <p className="text-muted-foreground text-lg">
            Tire suas dúvidas sobre nossos cursos
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
