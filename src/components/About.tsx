export const About = () => {
  return (
    <section id="sobre" className="py-20 bg-background scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              alt="Vanessa Quevedo Savi"
              className="rounded-xl shadow-elegant object-cover w-full h-96"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
            />
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Sobre <span className="text-primary">Vanessa Quevedo Savi</span>
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Com mais de 15 anos de experiência em massoterapia e terapias
                holísticas, Vanessa Quevedo Savi é referência na formação de
                novos profissionais da área.
              </p>
              <p>
                Sua metodologia combina técnicas tradicionais com abordagens
                modernas, proporcionando uma formação completa e prática para
                seus alunos.
              </p>
              <p>
                Já formou mais de 1000 massoterapeutas que hoje atuam com
                sucesso em clínicas, spas e como profissionais autônomos em
                todo o Brasil.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">
                    Anos de experiência
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">
                    Alunos formados
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">
                    Técnicas ensinadas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
