-- Fix critical security issues

-- 1. Create security definer function to fix organization_members recursion
CREATE OR REPLACE FUNCTION public.user_is_org_member(_org_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM organization_members
    WHERE organization_id = _org_id
      AND user_id = _user_id
  );
$$;

-- 2. Fix organization_members RLS policies
DROP POLICY IF EXISTS "Members can view organization members" ON organization_members;
CREATE POLICY "org_members_view" ON organization_members
  FOR SELECT
  USING (public.user_is_org_member(organization_id, auth.uid()));

-- 3. Fix organizations RLS policy
DROP POLICY IF EXISTS "Organizations are viewable by members" ON organizations;
CREATE POLICY "organizations_viewable_by_members" ON organizations
  FOR SELECT
  USING (public.user_is_org_member(id, auth.uid()));

-- 4. Enable RLS on cursos table
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;

-- 5. Add cursos policies - public read for published courses, admin/instructor manage
CREATE POLICY "cursos_public_read" ON cursos
  FOR SELECT
  USING (true);

CREATE POLICY "cursos_admin_instructor_manage" ON cursos
  FOR ALL
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'instructor')
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'instructor')
  );

-- 6. Fix usuarios table - restrict to own data only
DROP POLICY IF EXISTS "usuarios_select_policy" ON usuarios;
CREATE POLICY "usuarios_select_own" ON usuarios
  FOR SELECT
  USING (auth.uid()::text = id::text OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "usuarios_update_policy" ON usuarios;
CREATE POLICY "usuarios_update_own" ON usuarios
  FOR UPDATE
  USING (auth.uid()::text = id::text OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (auth.uid()::text = id::text OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "usuarios_insert_policy" ON usuarios;
CREATE POLICY "usuarios_insert_admin" ON usuarios
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "usuarios_delete_policy" ON usuarios;
CREATE POLICY "usuarios_delete_admin" ON usuarios
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. Secure payments table - prevent client-side manipulation
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "payments_view_own" ON payments
  FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Prevent all direct client inserts/updates/deletes on payments
CREATE POLICY "payments_no_client_insert" ON payments
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY "payments_no_client_update" ON payments
  FOR UPDATE
  USING (false);

CREATE POLICY "payments_no_client_delete" ON payments
  FOR DELETE
  USING (false);