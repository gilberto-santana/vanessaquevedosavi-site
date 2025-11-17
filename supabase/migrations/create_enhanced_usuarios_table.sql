-- Tabela de usuários completa para gerenciamento
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(50),
    cpf VARCHAR(14),
    tipo_usuario VARCHAR(50) DEFAULT 'aluno' CHECK (tipo_usuario IN ('aluno', 'instrutor', 'admin')),
    status VARCHAR(50) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'suspenso')),
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    ultimo_acesso TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_tipo_usuario ON usuarios(tipo_usuario);
CREATE INDEX idx_usuarios_status ON usuarios(status);
CREATE INDEX idx_usuarios_data_cadastro ON usuarios(data_cadastro);

-- Habilitar RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
-- SELECT: Permitir que usuários autenticados vejam todos os usuários
CREATE POLICY usuarios_select_policy ON usuarios FOR SELECT 
    USING (auth.role() = 'authenticated');

-- INSERT: Permitir que administradores criem novos usuários
CREATE POLICY usuarios_insert_policy ON usuarios FOR INSERT 
    WITH CHECK (
        auth.role() = 'authenticated' AND 
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id = auth.uid() AND tipo_usuario = 'admin'
        )
    );

-- UPDATE: Permitir que administradores atualizem usuários
CREATE POLICY usuarios_update_policy ON usuarios FOR UPDATE 
    USING (
        auth.role() = 'authenticated' AND 
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id = auth.uid() AND tipo_usuario = 'admin'
        )
    )
    WITH CHECK (
        auth.role() = 'authenticated' AND 
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id = auth.uid() AND tipo_usuario = 'admin'
        )
    );

-- DELETE: Permitir que administradores excluam usuários
CREATE POLICY usuarios_delete_policy ON usuarios FOR DELETE 
    USING (
        auth.role() = 'authenticated' AND 
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id = auth.uid() AND tipo_usuario = 'admin'
        )
    );

-- Grant permissions
GRANT SELECT ON usuarios TO anon;
GRANT SELECT ON usuarios TO authenticated;
GRANT INSERT ON usuarios TO authenticated;
GRANT UPDATE ON usuarios TO authenticated;
GRANT DELETE ON usuarios TO authenticated;