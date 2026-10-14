-- Migration: Fix Users RLS Policy to allow users to switch their role (patient, professional, student) while preventing unauthorized escalation to admin

-- 1. Drop the restrictive update policy that prevented role switching
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

-- 2. Recreate the update policy allowing authenticated users to update their own profile and switch between standard roles ('patient', 'professional', 'student'), but preventing self-promotion to 'admin'
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND 
    (
      (role IN ('patient', 'professional', 'student')) 
      OR public.is_admin()
    )
  );

-- 3. Also ensure INSERT policy prevents creating admin accounts without admin privileges
DROP POLICY IF EXISTS "Users can insert own record" ON public.users;

CREATE POLICY "Users can insert own record" ON public.users
  FOR INSERT TO authenticated, anon
  WITH CHECK (
    auth.uid() = id AND 
    (
      (role IN ('patient', 'professional', 'student')) 
      OR public.is_admin()
    )
  );
