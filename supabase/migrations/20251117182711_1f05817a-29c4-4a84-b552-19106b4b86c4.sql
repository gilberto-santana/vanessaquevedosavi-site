-- Fix tarefas table security - restrict to authenticated users only
-- Since tarefas doesn't have user_id and appears to be a demo/test table,
-- we'll restrict it to authenticated users with proper ownership

-- Add user_id column to track ownership
ALTER TABLE tarefas ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop overly permissive policies
DROP POLICY IF EXISTS "tarefas_select_all" ON tarefas;
DROP POLICY IF EXISTS "tarefas_insert_all" ON tarefas;
DROP POLICY IF EXISTS "tarefas_update_all" ON tarefas;
DROP POLICY IF EXISTS "tarefas_delete_all" ON tarefas;

-- Create user-specific policies
CREATE POLICY "tarefas_user_select" ON tarefas
  FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "tarefas_user_insert" ON tarefas
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "tarefas_user_update" ON tarefas
  FOR UPDATE
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "tarefas_user_delete" ON tarefas
  FOR DELETE
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));