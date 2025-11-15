-- Tabela de módulos dos cursos
CREATE TABLE IF NOT EXISTS modulos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    curso_id UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    ordem INTEGER NOT NULL DEFAULT 0,
    duracao_estimada VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de aulas dos módulos
CREATE TABLE IF NOT EXISTS aulas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    modulo_id UUID NOT NULL REFERENCES modulos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    conteudo TEXT,
    tipo_conteudo VARCHAR(50) CHECK (tipo_conteudo IN ('video', 'texto', 'pdf', 'quiz', 'atividade')),
    url_conteudo TEXT,
    duracao_estimada INTEGER, -- em minutos
    ordem INTEGER NOT NULL DEFAULT 0,
    eh_preview BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de progresso do aluno nas aulas
CREATE TABLE IF NOT EXISTS progresso_aulas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID NOT NULL,
    aula_id UUID NOT NULL REFERENCES aulas(id) ON DELETE CASCADE,
    concluida BOOLEAN DEFAULT FALSE,
    data_conclusao TIMESTAMP WITH TIME ZONE,
    tempo_assistido INTEGER DEFAULT 0, -- em segundos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(usuario_id, aula_id)
);

-- Índices para melhor performance
CREATE INDEX idx_modulos_curso_id ON modulos(curso_id);
CREATE INDEX idx_modulos_ordem ON modulos(ordem);
CREATE INDEX idx_aulas_modulo_id ON aulas(modulo_id);
CREATE INDEX idx_aulas_ordem ON aulas(ordem);
CREATE INDEX idx_progresso_aulas_usuario_id ON progresso_aulas(usuario_id);
CREATE INDEX idx_progresso_aulas_aula_id ON progresso_aulas(aula_id);

-- Grant permissions
GRANT SELECT ON modulos TO anon;
GRANT SELECT ON modulos TO authenticated;
GRANT ALL ON modulos TO authenticated; -- para criar/editar/deletar módulos

GRANT SELECT ON aulas TO anon;
GRANT SELECT ON aulas TO authenticated;
GRANT ALL ON aulas TO authenticated; -- para criar/editar/deletar aulas

GRANT SELECT ON progresso_aulas TO authenticated;
GRANT INSERT ON progresso_aulas TO authenticated;
GRANT UPDATE ON progresso_aulas TO authenticated;