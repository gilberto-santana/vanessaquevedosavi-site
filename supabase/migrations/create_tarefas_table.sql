-- Criar tabela de tarefas
CREATE TABLE IF NOT EXISTS tarefas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  concluida BOOLEAN DEFAULT FALSE,
  criada_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conceder permissões para anon (usuários não autenticados)
GRANT ALL ON tarefas TO anon;
GRANT ALL ON tarefas TO authenticated;

-- Conceder permissões na sequência
GRANT USAGE ON SEQUENCE tarefas_id_seq TO anon;
GRANT USAGE ON SEQUENCE tarefas_id_seq TO authenticated;

-- Criar índice para melhor performance
CREATE INDEX idx_tarefas_concluida ON tarefas(concluida);
CREATE INDEX idx_tarefas_criada_em ON tarefas(criada_em);

-- Habilitar RLS e criar políticas permissivas (ambiente de desenvolvimento)
ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'tarefas' AND policyname = 'tarefas_select_all'
  ) THEN
    CREATE POLICY tarefas_select_all ON tarefas FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'tarefas' AND policyname = 'tarefas_insert_all'
  ) THEN
    CREATE POLICY tarefas_insert_all ON tarefas FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'tarefas' AND policyname = 'tarefas_update_all'
  ) THEN
    CREATE POLICY tarefas_update_all ON tarefas FOR UPDATE USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'tarefas' AND policyname = 'tarefas_delete_all'
  ) THEN
    CREATE POLICY tarefas_delete_all ON tarefas FOR DELETE USING (true);
  END IF;
END $$;
