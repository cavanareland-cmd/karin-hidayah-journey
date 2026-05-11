
-- 1. Remove sensitive user_roles table from realtime publication
ALTER PUBLICATION supabase_realtime DROP TABLE public.user_roles;

-- 2. Fix broken admin policy on gallery_items (was using auth.role() = 'admin')
DROP POLICY IF EXISTS "Admin can manage gallery items" ON public.gallery_items;
CREATE POLICY "Admins can manage gallery_items"
ON public.gallery_items
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 3. Restrict EXECUTE on internal trigger functions (not meant to be called via PostgREST)
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
