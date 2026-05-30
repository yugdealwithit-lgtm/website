
ALTER FUNCTION public.set_updated_at() SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

-- Restrict listing to admins only; reads of individual files by URL still work (bucket is public)
DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;
CREATE POLICY "Admins can list blog images" ON storage.objects
  FOR SELECT TO authenticated USING (
    bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin')
  );
