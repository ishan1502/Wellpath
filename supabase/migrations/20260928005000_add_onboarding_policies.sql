-- Create patients table if missing
CREATE TABLE IF NOT EXISTS public.patients (
  id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
  age INTEGER,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  clinical_focus TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own patient profile" ON public.patients
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own patient profile" ON public.patients
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own patient profile" ON public.patients
  FOR SELECT USING (auth.uid() = id);

-- Create students table if missing
CREATE TABLE IF NOT EXISTS public.students (
  id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
  university TEXT NOT NULL,
  degree TEXT NOT NULL,
  graduation_year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own student profile" ON public.students
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own student profile" ON public.students
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own student profile" ON public.students
  FOR SELECT USING (auth.uid() = id);

-- Add INSERT policy for users table
DO $$
BEGIN
  IF NOT EXISTS (
      SELECT 1
      FROM pg_policies
      WHERE tablename = 'users' AND policyname = 'Users can insert their own data'
  ) THEN
      CREATE POLICY "Users can insert their own data" ON public.users
        FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Add INSERT/UPDATE policies for professionals table
DO $$
BEGIN
  IF NOT EXISTS (
      SELECT 1
      FROM pg_policies
      WHERE tablename = 'professionals' AND policyname = 'Users can insert their own professional profile'
  ) THEN
      CREATE POLICY "Users can insert their own professional profile" ON public.professionals
        FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
      SELECT 1
      FROM pg_policies
      WHERE tablename = 'professionals' AND policyname = 'Users can update their own professional profile'
  ) THEN
      CREATE POLICY "Users can update their own professional profile" ON public.professionals
        FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- Ensure Verification Documents bucket exists
INSERT INTO storage.buckets (id, name, public) VALUES ('Verification Documents', 'Verification Documents', true) ON CONFLICT (id) DO NOTHING;

-- Policies for Storage
DROP POLICY IF EXISTS "Anyone can upload verification docs" ON storage.objects;
CREATE POLICY "Anyone can upload verification docs" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'Verification Documents' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update their own verification docs" ON storage.objects;
CREATE POLICY "Users can update their own verification docs" ON storage.objects
  FOR UPDATE USING (bucket_id = 'Verification Documents' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Anyone can view verification docs" ON storage.objects;
CREATE POLICY "Anyone can view verification docs" ON storage.objects
  FOR SELECT USING (bucket_id = 'Verification Documents');

-- Add missing columns to professionals table
ALTER TABLE public.professionals ADD COLUMN IF NOT EXISTS verification_doc_url TEXT;

