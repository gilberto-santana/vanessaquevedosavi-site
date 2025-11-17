-- Verificar e garantir permissões para a tabela usuarios
-- Esta migration garante que as políticas de segurança estejam corretamente configuradas

-- Remover políticas existentes para recriar
DROP POLICY IF EXISTS "Permitir leitura pública de usuários ativos" ON public.usuarios;
DROP POLICY IF EXISTS "Permitir leitura total para usuários autenticados" ON public.usuarios;
DROP POLICY IF EXISTS "Permitir registro de novos usuários" ON public.usuarios;
DROP POLICY IF EXISTS "Permitir usuários atualizarem seu próprio perfil" ON public.usuarios;
DROP POLICY IF EXISTS "Permitir administradores atualizarem qualquer usuário" ON public.usuarios;
DROP POLICY IF EXISTS "Permitir apenas administradores excluírem usuários" ON public.usuarios;

-- Recriar políticas com configuração correta

-- 1. Leitura pública apenas de usuários ativos
CREATE POLICY "Permitir leitura pública de usuários ativos" 
    ON public.usuarios FOR SELECT 
    USING (status = 'ativo');

-- 2. Leitura total para usuários autenticados
CREATE POLICY "Permitir leitura total para usuários autenticados" 
    ON public.usuarios FOR SELECT 
    TO authenticated 
    USING (true);

-- 3. Inserção de novos usuários (registro público)
CREATE POLICY "Permitir registro de novos usuários" 
    ON public.usuarios FOR INSERT 
    WITH CHECK (true);

-- 4. Usuários podem atualizar seu próprio perfil
CREATE POLICY "Permitir usuários atualizarem seu próprio perfil" 
    ON public.usuarios FOR UPDATE 
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 5. Administradores podem atualizar qualquer usuário
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

-- 6. Apenas administradores podem excluir usuários
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

-- Garantir permissões GRANT
GRANT SELECT ON public.usuarios TO anon;
GRANT SELECT ON public.usuarios TO authenticated;
GRANT INSERT ON public.usuarios TO anon;
GRANT INSERT ON public.usuarios TO authenticated;
GRANT UPDATE ON public.usuarios TO authenticated;
GRANT DELETE ON public.usuarios TO authenticated;

-- Criar função auxiliar para verificar se usuário é admin
CREATE OR REPLACE FUNCTION is_user_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.usuarios 
        WHERE id = user_id 
        AND tipo_usuario = 'admin' 
        AND status = 'ativo'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar view para listar usuários com segurança
CREATE OR REPLACE VIEW public.usuarios_publicos AS
SELECT 
    id,
    nome,
    email,
    telefone,
    tipo_usuario,
    status,
    created_at
FROM public.usuarios
WHERE status = 'ativo';

-- Grant permissions para a view
GRANT SELECT ON public.usuarios_publicos TO anon;
GRANT SELECT ON public.usuarios_publicos TO authenticated;