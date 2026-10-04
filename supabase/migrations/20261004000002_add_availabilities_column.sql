-- Add availabilities column to professionals table for managing scheduling
ALTER TABLE public.professionals ADD COLUMN IF NOT EXISTS availabilities JSONB DEFAULT '{}'::jsonb;
