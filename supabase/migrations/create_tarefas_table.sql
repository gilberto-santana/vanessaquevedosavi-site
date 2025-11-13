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