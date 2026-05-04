
-- Drop overly permissive policies and replace with admin-only on content tables
DO $$
DECLARE
  t text;
  tables text[] := ARRAY[
    'about_us_content','blog_posts','footer_settings','hajj_packages',
    'highlight_services','homepage_settings','navigation_menu',
    'prayer_times_settings','products','service_icons','site_settings','team_members'
  ];
  old_names text[] := ARRAY[
    'Authenticated users can manage about us content',
    'Authenticated users can manage blog posts',
    'Authenticated users can manage footer settings',
    'Authenticated users can manage hajj packages',
    'Authenticated users can manage highlight services',
    'Authenticated users can manage homepage settings',
    'Authenticated users can manage navigation menu',
    'Authenticated users can manage prayer times',
    'Authenticated users can manage products',
    'Authenticated users can manage service icons',
    'Authenticated users can manage site settings',
    'Authenticated users can manage team members'
  ];
  i int;
BEGIN
  FOR i IN 1..array_length(tables,1) LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', old_names[i], tables[i]);
    EXECUTE format(
      'CREATE POLICY "Admins can manage %s" ON public.%I FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))',
      tables[i], tables[i]
    );
  END LOOP;
END $$;

-- gallery_items: drop the extra permissive insert policy
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.gallery_items;

-- umrah_packages: clean up duplicate public select policy if exists
DROP POLICY IF EXISTS "Public view active umrah packages" ON public.umrah_packages;
