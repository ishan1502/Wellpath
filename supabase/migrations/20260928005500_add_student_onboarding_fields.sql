-- Add new fields to students table for onboarding
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS contact_number TEXT,
ADD COLUMN IF NOT EXISTS documents_url TEXT,
ADD COLUMN IF NOT EXISTS resume_url TEXT;
