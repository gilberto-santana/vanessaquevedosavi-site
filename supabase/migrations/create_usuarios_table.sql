-- Criar tabela de usuários de exemplo (para testes de leitura)
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nome TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Habilitar RLS e políticas permissivas (ambiente de desenvolvimento)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'usuarios' AND policyname = 'usuarios_select_all'
  ) THEN
    CREATE POLICY usuarios_select_all ON usuarios FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'usuarios' AND policyname = 'usuarios_insert_all'
  ) THEN
    CREATE POLICY usuarios_insert_all ON usuarios FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'usuarios' AND policyname = 'usuarios_update_all'
  ) THEN
    CREATE POLICY usuarios_update_all ON usuarios FOR UPDATE USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'usuarios' AND policyname = 'usuarios_delete_all'
  ) THEN
    CREATE POLICY usuarios_delete_all ON usuarios FOR DELETE USING (true);
  END IF;
END $$;
