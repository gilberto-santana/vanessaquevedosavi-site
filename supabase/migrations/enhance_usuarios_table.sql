-- Alterar a tabela existente de usuários para adicionar os campos necessários
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS telefone VARCHAR(50),
ADD COLUMN IF NOT EXISTS cpf VARCHAR(14),
ADD COLUMN IF NOT EXISTS tipo_usuario VARCHAR(50) DEFAULT 'aluno' CHECK (tipo_usuario IN ('aluno', 'instrutor', 'admin')),
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'suspenso')),
ADD COLUMN IF NOT EXISTS ultimo_acesso TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL;

-- Alterar o tipo da coluna id para UUID se ainda for SERIAL
ALTER TABLE usuarios 
ALTER COLUMN id TYPE UUID USING gen_random_uuid(),
ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_tipo_usuario ON usuarios(tipo_usuario);
CREATE INDEX IF NOT EXISTS idx_usuarios_status ON usuarios(status);
CREATE INDEX IF NOT EXISTS idx_usuarios_data_cadastro ON usuarios(data_cadastro);

-- Habilitar RLS se ainda não estiver habilitado
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS usuarios_select_all ON usuarios;
DROP POLICY IF EXISTS usuarios_insert_all ON usuarios;
DROP POLICY IF EXISTS usuarios_update_all ON usuarios;
DROP POLICY IF EXISTS usuarios_delete_all ON usuarios;

-- Criar novas políticas de segurança mais simples para desenvolvimento
CREATE POLICY usuarios_select_policy ON usuarios FOR SELECT 
    USING (true); -- Permitir que todos vejam (em produção, restringir)

CREATE POLICY usuarios_insert_policy ON usuarios FOR INSERT 
    WITH CHECK (true); -- Permitir que todos criem (em produção, restringir)

CREATE POLICY usuarios_update_policy ON usuarios FOR UPDATE 
    USING (true)
    WITH CHECK (true); -- Permitir que todos atualizem (em produção, restringir)

CREATE POLICY usuarios_delete_policy ON usuarios FOR DELETE 
    USING (true); -- Permitir que todos excluam (em produção, restringir)

-- Grant permissions
GRANT SELECT ON usuarios TO anon;
GRANT SELECT ON usuarios TO authenticated;
GRANT INSERT ON usuarios TO authenticated;
GRANT UPDATE ON usuarios TO authenticated;
GRANT DELETE ON usuarios TO authenticated;