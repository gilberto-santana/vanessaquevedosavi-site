-- Adicionar campos necessários à tabela existente
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS telefone VARCHAR(50),
ADD COLUMN IF NOT EXISTS cpf VARCHAR(14),
ADD COLUMN IF NOT EXISTS tipo_usuario VARCHAR(50) DEFAULT 'aluno' CHECK (tipo_usuario IN ('aluno', 'instrutor', 'admin')),
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'suspenso')),
ADD COLUMN IF NOT EXISTS ultimo_acesso TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL;

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_usuarios_tipo_usuario ON usuarios(tipo_usuario);
CREATE INDEX IF NOT EXISTS idx_usuarios_status ON usuarios(status);

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS usuarios_select_all ON usuarios;
DROP POLICY IF EXISTS usuarios_insert_all ON usuarios;
DROP POLICY IF EXISTS usuarios_update_all ON usuarios;
DROP POLICY IF EXISTS usuarios_delete_all ON usuarios;

-- Criar políticas simples para desenvolvimento
CREATE POLICY usuarios_select_policy ON usuarios FOR SELECT 
    USING (true);

CREATE POLICY usuarios_insert_policy ON usuarios FOR INSERT 
    WITH CHECK (true);

CREATE POLICY usuarios_update_policy ON usuarios FOR UPDATE 
    USING (true)
    WITH CHECK (true);

CREATE POLICY usuarios_delete_policy ON usuarios FOR DELETE 
    USING (true);

-- Grant permissions
GRANT ALL ON usuarios TO authenticated;