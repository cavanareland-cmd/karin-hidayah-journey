-- Add new columns to highlight_services for Explore section
ALTER TABLE public.highlight_services
ADD COLUMN IF NOT EXISTS badge_text TEXT DEFAULT 'Place',
ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '5 d',
ADD COLUMN IF NOT EXISTS guests INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS max_guests INTEGER DEFAULT 80;