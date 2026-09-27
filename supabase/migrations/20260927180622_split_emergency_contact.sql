ALTER TABLE public.patients DROP COLUMN IF EXISTS emergency_contact;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT;
