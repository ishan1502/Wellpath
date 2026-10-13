-- Migration: Security Lockdown for public.users, appointments, conversations, and messages

-- 1. Ensure RLS is enabled and strictly enforced on public.users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies on users table to eliminate open / insecure policies
DO $$
DECLARE
    pol record;
BEGIN
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'users' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.users', pol.policyname);
    END LOOP;
END $$;

-- Policy 1: Authenticated users can view user profiles (needed for directory, booking, messaging)
CREATE POLICY "Authenticated users can view users" ON public.users
  FOR SELECT TO authenticated
  USING (true);

-- Policy 2: Authenticated users can only update their own profile, and CANNOT self-promote to 'admin'
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND 
    (
      role = (SELECT role FROM public.users WHERE id = auth.uid()) 
      OR public.is_admin()
    )
  );

-- Policy 3: Users can insert their own record during signup/onboarding
CREATE POLICY "Users can insert own record" ON public.users
  FOR INSERT TO authenticated, anon
  WITH CHECK (auth.uid() = id);

-- Policy 4: Admins can manage all users
CREATE POLICY "Admins can manage all users" ON public.users
  FOR ALL TO authenticated
  USING (public.is_admin());


-- 2. APPOINTMENTS RLS POLICIES
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
    pol record;
BEGIN
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'appointments' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.appointments', pol.policyname);
    END LOOP;
END $$;

CREATE POLICY "Users can view their appointments" ON public.appointments
  FOR SELECT TO authenticated
  USING (
    patient_id = auth.uid() OR 
    professional_id = auth.uid() OR 
    public.is_admin()
  );

CREATE POLICY "Patients can book appointments" ON public.appointments
  FOR INSERT TO authenticated
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Participants can update appointments" ON public.appointments
  FOR UPDATE TO authenticated
  USING (
    patient_id = auth.uid() OR 
    professional_id = auth.uid() OR 
    public.is_admin()
  );

CREATE POLICY "Participants can delete or cancel appointments" ON public.appointments
  FOR DELETE TO authenticated
  USING (
    patient_id = auth.uid() OR 
    professional_id = auth.uid() OR 
    public.is_admin()
  );


-- 3. CONVERSATIONS & MESSAGES RLS POLICIES
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
    pol record;
BEGIN
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'conversations' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.conversations', pol.policyname);
    END LOOP;
END $$;

CREATE POLICY "Participants can view conversations" ON public.conversations
  FOR SELECT TO authenticated
  USING (
    auth.uid() = ANY(participant_ids) OR 
    public.is_admin()
  );

CREATE POLICY "Participants can create conversations" ON public.conversations
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = ANY(participant_ids)
  );

CREATE POLICY "Participants can update conversations" ON public.conversations
  FOR UPDATE TO authenticated
  USING (
    auth.uid() = ANY(participant_ids) OR 
    public.is_admin()
  );


ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
    pol record;
BEGIN
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'messages' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.messages', pol.policyname);
    END LOOP;
END $$;

CREATE POLICY "Participants can view messages" ON public.messages
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c 
      WHERE c.id = messages.conversation_id 
      AND (auth.uid() = ANY(c.participant_ids) OR public.is_admin())
    )
  );

CREATE POLICY "Participants can send messages" ON public.messages
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.conversations c 
      WHERE c.id = messages.conversation_id 
      AND auth.uid() = ANY(c.participant_ids)
    )
  );


-- 4. STORAGE POLICIES
INSERT INTO storage.buckets (id, name, public) 
VALUES ('Verification Documents', 'Verification Documents', true) 
ON CONFLICT (id) DO UPDATE SET public = true;
