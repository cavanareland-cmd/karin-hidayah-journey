-- Drop old restrictive policies
DROP POLICY IF EXISTS "Admin Upload Only 1ffg0oo_0" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Only 1ffg0oo_0" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Only 1ffg0oo_1" ON storage.objects;
DROP POLICY IF EXISTS "Admin can view images 1ffg0oo_0" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload gallery images" ON storage.objects;

-- Drop new policies if they exist (from previous attempt)
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Create proper policies for admin users to manage images
-- Allow admin users to upload images
CREATE POLICY "Admin can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Allow admin users to update images
CREATE POLICY "Admin can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  bucket_id = 'images' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Allow admin users to delete images
CREATE POLICY "Admin can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);