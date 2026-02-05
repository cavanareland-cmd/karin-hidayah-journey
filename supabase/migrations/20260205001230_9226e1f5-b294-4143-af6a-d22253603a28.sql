-- Create arrangement_section table for the 3-card layout
CREATE TABLE public.arrangement_section (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE, -- 'left_card', 'center_cta', 'right_card'
  title TEXT,
  subtitle TEXT,
  description TEXT,
  badge_text TEXT,
  button_text TEXT,
  button_link TEXT,
  image_url TEXT,
  date_text TEXT,
  location_text TEXT,
  spots_text TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.arrangement_section ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Anyone can view active arrangement section" 
  ON public.arrangement_section 
  FOR SELECT 
  USING (is_active = true);

-- Admin write policies
CREATE POLICY "Admins can insert arrangement section" 
  ON public.arrangement_section 
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update arrangement section" 
  ON public.arrangement_section 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete arrangement section" 
  ON public.arrangement_section 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_arrangement_section_updated_at
  BEFORE UPDATE ON public.arrangement_section
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert default data
INSERT INTO public.arrangement_section (section_key, title, subtitle, badge_text, image_url, order_index) VALUES
  ('left_card', 'OLEH-OLEH', 'HAJI DAN UMRAH', 'NEW SEASON', NULL, 1);

INSERT INTO public.arrangement_section (section_key, title, subtitle, description, button_text, button_link, order_index) VALUES
  ('center_cta', 'Arrange your', 'and place perfectly.', 'Plan your trip to explore the world with ease and comfort', 'Get Started', '#', 2);

INSERT INTO public.arrangement_section (section_key, title, date_text, location_text, spots_text, image_url, order_index) VALUES
  ('right_card', 'Travelling to Bali', '21 Oct - 24 Oct 2024', 'Total', '7 Spots', NULL, 3);