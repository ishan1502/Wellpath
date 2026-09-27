CREATE TABLE IF NOT EXISTS public.internship_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  motivation_text TEXT,
  use_profile_resume BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own applications"
  ON public.internship_applications
  FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own applications"
  ON public.internship_applications
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own applications"
  ON public.internship_applications
  FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Professionals can view applications for themselves"
  ON public.internship_applications
  FOR SELECT
  USING (auth.uid() = professional_id);

CREATE POLICY "Professionals can update applications for themselves"
  ON public.internship_applications
  FOR UPDATE
  USING (auth.uid() = professional_id);
