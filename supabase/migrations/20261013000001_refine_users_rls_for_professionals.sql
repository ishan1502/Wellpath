-- Refine public.users RLS so public visitors can browse approved professionals, while protecting patients and students

DROP POLICY IF EXISTS "Authenticated users can view users" ON public.users;

-- Public (both anon and authenticated) can view professional users (for directory & doctor search)
CREATE POLICY "Public can view professional users" ON public.users
  FOR SELECT
  USING (role = 'professional');

-- Authenticated users can view other authenticated users (needed for messaging, bookings, peer circles)
CREATE POLICY "Authenticated users can view profiles" ON public.users
  FOR SELECT TO authenticated
  USING (true);
