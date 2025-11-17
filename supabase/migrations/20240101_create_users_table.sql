-- Tabela de usuários (usuarios)
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('aluno', 'admin', 'instrutor')),
    status VARCHAR(20) NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para performance
CREATE INDEX idx_usuarios_email ON public.usuarios(email);
CREATE INDEX idx_usuarios_cpf ON public.usuarios(cpf);
CREATE INDEX idx_usuarios_tipo_usuario ON public.usuarios(tipo_usuario);
CREATE INDEX idx_usuarios_status ON public.usuarios(status);
CREATE INDEX idx_usuarios_created_at ON public.usuarios(created_at);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública de usuários ativos (para listagens públicas)
CREATE POLICY "Permitir leitura pública de usuários ativos" 
    ON public.usuarios FOR SELECT 
    USING (status = 'ativo');

-- Política para permitir leitura total para usuários autenticados
CREATE POLICY "Permitir leitura total para usuários autenticados" 
    ON public.usuarios FOR SELECT 
    TO authenticated 
    USING (true);

-- Política para permitir inserção de novos usuários (registro público)
CREATE POLICY "Permitir registro de novos usuários" 
    ON public.usuarios FOR INSERT 
    WITH CHECK (true);

-- Política para permitir atualização própria do perfil
CREATE POLICY "Permitir usuários atualizarem seu próprio perfil" 
    ON public.usuarios FOR UPDATE 
    USING (auth.uid() = id);

-- Política para permitir atualização total para administradores
CREATE POLICY "Permitir administradores atualizarem qualquer usuário" 
    ON public.usuarios FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios 
            WHERE id = auth.uid() 
            AND tipo_usuario = 'admin' 
            AND status = 'ativo'
        )
    );

-- Política para permitir exclusão apenas por administradores
CREATE POLICY "Permitir apenas administradores excluírem usuários" 
    ON public.usuarios FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios 
            WHERE id = auth.uid() 
            AND tipo_usuario = 'admin' 
            AND status = 'ativo'
        )
    );

-- Grant permissions
GRANT SELECT ON public.usuarios TO anon;
GRANT SELECT ON public.usuarios TO authenticated;
GRANT INSERT ON public.usuarios TO anon;
GRANT INSERT ON public.usuarios TO authenticated;
GRANT UPDATE ON public.usuarios TO authenticated;
GRANT DELETE ON public.usuarios TO authenticated;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_usuarios_updated_at 
    BEFORE UPDATE ON public.usuarios 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();