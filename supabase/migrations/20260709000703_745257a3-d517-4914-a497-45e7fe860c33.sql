
ALTER TABLE public.umrah_packages
  ADD COLUMN IF NOT EXISTS permit_number text,
  ADD COLUMN IF NOT EXISTS airline text,
  ADD COLUMN IF NOT EXISTS route text,
  ADD COLUMN IF NOT EXISTS deposit_amount numeric,
  ADD COLUMN IF NOT EXISTS whatsapp_number text,
  ADD COLUMN IF NOT EXISTS hotels jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS trust_badges jsonb DEFAULT '[]'::jsonb;

ALTER TABLE public.hajj_packages
  ADD COLUMN IF NOT EXISTS permit_number text,
  ADD COLUMN IF NOT EXISTS airline text,
  ADD COLUMN IF NOT EXISTS route text,
  ADD COLUMN IF NOT EXISTS deposit_amount numeric,
  ADD COLUMN IF NOT EXISTS whatsapp_number text,
  ADD COLUMN IF NOT EXISTS hotels jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS trust_badges jsonb DEFAULT '[]'::jsonb;
