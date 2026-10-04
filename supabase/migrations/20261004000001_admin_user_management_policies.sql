-- Migration: Ensure admins can view and update users and professionals

-- Function to check if authenticated user is admin without recursive RLS trigger
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update status check constraint on public.users to safely allow 'active', 'deactivated', and 'suspended'
DO $$
BEGIN
  ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_status_check;
  ALTER TABLE public.users ADD CONSTRAINT users_status_check CHECK (status IN ('active', 'deactivated', 'suspended'));
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Policies for public.users
DO $$
BEGIN
  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'users' AND policyname = 'Admins can manage all users'
  ) THEN
      CREATE POLICY "Admins can manage all users" ON public.users
        FOR ALL USING (public.is_admin());
  END IF;

  IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'professionals' AND policyname = 'Admins can manage all professionals'
  ) THEN
      CREATE POLICY "Admins can manage all professionals" ON public.professionals
        FOR ALL USING (public.is_admin());
  END IF;
END $$;
