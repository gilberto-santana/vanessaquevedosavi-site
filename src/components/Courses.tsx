import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  numero_alunos: string;
  certificado: string;
  imagem_url: string;
  preco: number;
  preco_parcelado: string;
  nivel: 'basico' | 'avancado' | 'holistico';
  created_at: string;
  updated_at: string;
}

export const Courses = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCursos();
    
    // Setup realtime subscription
    const subscription = supabase
      .channel('cursos-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'cursos' },
        (payload) => {
          fetchCursos();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchCursos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCursos(data || []);
    } catch (err) {
      console.error('Erro ao buscar cursos:', err);
      setError('Erro ao carregar cursos. Por favor, recarregue a página.');
    } finally {
      setLoading(false);
    }
  };

  const getRouteForCourse = (curso: Curso): string => {
    switch (curso.nivel) {
      case 'basico':
        return '/curso/massoterapia-basica';
      case 'avancado':
        return '/curso/massoterapia-avancada';
      case 'holistico':
        return '/curso/terapias-holisticas';
      default:
        return '/curso/massoterapia-basica';
    }
  };

  if (loading) {
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
          <div className="flex justify-center items-center h-64">
            <div className="text-muted-foreground">Carregando cursos...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
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
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500 text-center">
              <p>{error}</p>
              <Button onClick={fetchCursos} className="mt-4 rounded-full">
                Tentar novamente
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (cursos.length === 0) {
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
          <div className="flex justify-center items-center h-64">
            <div className="text-muted-foreground text-center">
              <p>Nenhum curso disponível no momento.</p>
              <p>Volte em breve para conferir nossas novidades!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
          {cursos.map((curso) => (
            <Card key={curso.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={curso.imagem_url}
                  alt={curso.titulo}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{curso.titulo}</CardTitle>
                <CardDescription>{curso.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {curso.duracao}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  {curso.numero_alunos} alunos
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Award className="mr-2 h-4 w-4" />
                  {curso.certificado}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full rounded-full"
                  onClick={() => navigate(getRouteForCourse(curso))}
                >
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
