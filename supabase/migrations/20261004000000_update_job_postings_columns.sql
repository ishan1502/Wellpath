-- Update job_postings table to ensure compensation and deadline columns exist
ALTER TABLE public.job_postings ADD COLUMN IF NOT EXISTS compensation TEXT;
ALTER TABLE public.job_postings ADD COLUMN IF NOT EXISTS deadline DATE;

-- If compensation is null but stipend exists, copy stipend into compensation
UPDATE public.job_postings
SET compensation = stipend
WHERE compensation IS NULL AND stipend IS NOT NULL;

-- Ensure RLS policies exist for authenticated professionals to insert and update job postings
DO $$
BEGIN
  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'job_postings' AND policyname = 'Professionals can insert job postings'
  ) THEN
      CREATE POLICY "Professionals can insert job postings" ON public.job_postings
        FOR INSERT WITH CHECK (auth.uid() = professional_id);
  END IF;

  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'job_postings' AND policyname = 'Professionals can update own job postings'
  ) THEN
      CREATE POLICY "Professionals can update own job postings" ON public.job_postings
        FOR UPDATE USING (auth.uid() = professional_id);
  END IF;

  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'job_postings' AND policyname = 'Professionals can view own job postings'
  ) THEN
      CREATE POLICY "Professionals can view own job postings" ON public.job_postings
        FOR SELECT USING (auth.uid() = professional_id);
  END IF;

  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'job_postings' AND policyname = 'Admins can manage all job postings'
  ) THEN
      CREATE POLICY "Admins can manage all job postings" ON public.job_postings
        FOR ALL USING (
          EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid() AND users.role = 'admin'
          )
        );
  END IF;
END $$;

-- Ensure RLS policies exist for events table
DO $$
BEGIN
  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'events' AND policyname = 'Approved events are viewable by everyone'
  ) THEN
      CREATE POLICY "Approved events are viewable by everyone" ON public.events
        FOR SELECT USING (status = 'approved');
  END IF;

  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'events' AND policyname = 'Professionals can view own events'
  ) THEN
      CREATE POLICY "Professionals can view own events" ON public.events
        FOR SELECT USING (auth.uid() = professional_id);
  END IF;

  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'events' AND policyname = 'Professionals can insert events'
  ) THEN
      CREATE POLICY "Professionals can insert events" ON public.events
        FOR INSERT WITH CHECK (auth.uid() = professional_id);
  END IF;

  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'events' AND policyname = 'Professionals can update own events'
  ) THEN
      CREATE POLICY "Professionals can update own events" ON public.events
        FOR UPDATE USING (auth.uid() = professional_id);
  END IF;

  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'events' AND policyname = 'Admins can manage all events'
  ) THEN
      CREATE POLICY "Admins can manage all events" ON public.events
        FOR ALL USING (
          EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid() AND users.role = 'admin'
          )
        );
  END IF;
END $$;
