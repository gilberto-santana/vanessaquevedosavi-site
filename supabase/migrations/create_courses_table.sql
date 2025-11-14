-- Tabela de cursos
CREATE TABLE IF NOT EXISTS cursos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    duracao VARCHAR(50),
    numero_alunos VARCHAR(50),
    certificado VARCHAR(100),
    imagem_url TEXT,
    preco DECIMAL(10,2),
    preco_parcelado VARCHAR(50),
    nivel VARCHAR(50) CHECK (nivel IN ('basico', 'avancado', 'holistico')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Grant permissions
GRANT SELECT ON cursos TO anon;
GRANT SELECT ON cursos TO authenticated;