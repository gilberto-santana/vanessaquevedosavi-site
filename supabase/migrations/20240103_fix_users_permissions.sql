-- Corrigir permissões para a tabela usuarios
-- Migration corrigida com tipos apropriados

-- Remover políticas problemáticas
DROP POLICY IF EXISTS "Permitir usuários atualizarem seu próprio perfil" ON public.usuarios;
DROP POLICY IF EXISTS "Permitir administradores atualizarem qualquer usuário" ON public.usuarios;
DROP POLICY IF EXISTS "Permitir apenas administradores excluírem usuários" ON public.usuarios;

-- Criar políticas corretas

-- 1. Usuários podem atualizar seu próprio perfil (corrigido)
CREATE POLICY "Permitir usuários atualizarem seu próprio perfil" 
    ON public.usuarios FOR UPDATE 
    USING (id = auth.uid()::UUID)
    WITH CHECK (id = auth.uid()::UUID);

-- 2. Administradores podem atualizar qualquer usuário (corrigido)
CREATE POLICY "Permitir administradores atualizarem qualquer usuário" 
    ON public.usuarios FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios 
            WHERE id = auth.uid()::UUID 
            AND tipo_usuario = 'admin' 
            AND status = 'ativo'
        )
    );

-- 3. Apenas administradores podem excluir usuários (corrigido)
CREATE POLICY "Permitir apenas administradores excluírem usuários" 
    ON public.usuarios FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios 
            WHERE id = auth.uid()::UUID 
            AND tipo_usuario = 'admin' 
            AND status = 'ativo'
        )
    );

-- Verificar e garantir permissões básicas
GRANT SELECT ON public.usuarios TO anon;
GRANT SELECT ON public.usuarios TO authenticated;
GRANT INSERT ON public.usuarios TO anon;
GRANT INSERT ON public.usuarios TO authenticated;
GRANT UPDATE ON public.usuarios TO authenticated;
GRANT DELETE ON public.usuarios TO authenticated;

-- Criar função auxiliar para verificar admin (corrigida)
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

-- Criar view segura para usuários públicos
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

-- Inserir usuário admin padrão se não existir
INSERT INTO public.usuarios (nome, email, telefone, cpf, tipo_usuario, status)
SELECT 
    'Administrador Principal',
    'admin@vanessaquevedosavi.com.br',
    '(11) 99999-9999',
    '000.000.000-00',
    'admin',
    'ativo'
WHERE NOT EXISTS (
    SELECT 1 FROM public.usuarios WHERE email = 'admin@vanessaquevedosavi.com.br'
);