-- Cleanup existing demo accounts
DELETE FROM auth.users WHERE email LIKE '%@wellpath.demo';

-- 1. ADMIN ACCOUNT (admin@wellpath.demo)
WITH new_admin AS (
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'admin@wellpath.demo', crypt('Wellpath2026!', gen_salt('bf')),
    now(), '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Admin", "last_name": "Director"}', now(), now()
  ) RETURNING id
)
INSERT INTO public.users (id, email, first_name, last_name, role)
SELECT id, 'admin@wellpath.demo', 'Admin', 'Director', 'admin' FROM new_admin;

-- 2. DOCTOR 1: Dr. Sarah Jenkins (doctor@wellpath.demo)
WITH new_doctor AS (
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'doctor@wellpath.demo', crypt('Wellpath2026!', gen_salt('bf')),
    now(), '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Sarah", "last_name": "Jenkins"}', now(), now()
  ) RETURNING id
),
ins_user AS (
  INSERT INTO public.users (id, email, first_name, last_name, role, avatar_url)
  SELECT id, 'doctor@wellpath.demo', 'Sarah', 'Jenkins', 'professional',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
  FROM new_doctor RETURNING id
)
INSERT INTO public.professionals (id, title, specialty, bio, hourly_rate, years_experience, verification_status)
SELECT id, 'Clinical Psychologist', 'Anxiety & Trauma Specialist', 
'Dr. Sarah Jenkins is a board-certified clinical psychologist with 10+ years specializing in Cognitive Behavioral Therapy (CBT), adult anxiety disorders, and mindfulness-based interventions.',
120, 10, 'approved'
FROM ins_user;

-- 3. DOCTOR 2: Dr. Marcus Vance
WITH doc2_auth AS (
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'marcus.vance@wellpath.demo', crypt('Wellpath2026!', gen_salt('bf')),
    now(), '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Marcus", "last_name": "Vance"}', now(), now()
  ) RETURNING id
),
doc2_user AS (
  INSERT INTO public.users (id, email, first_name, last_name, role, avatar_url)
  SELECT id, 'marcus.vance@wellpath.demo', 'Marcus', 'Vance', 'professional',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300'
  FROM doc2_auth RETURNING id
)
INSERT INTO public.professionals (id, title, specialty, bio, hourly_rate, years_experience, verification_status)
SELECT id, 'Adult Psychiatrist', 'Mood & Sleep Disorders',
'Dr. Marcus Vance focuses on holistic mood stabilization, adult ADHD, and evidence-guided psychiatric management tailored to modern professionals.',
160, 12, 'approved'
FROM doc2_user;

-- 4. DOCTOR 3: Elena Rostova, LMFT
WITH doc3_auth AS (
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'elena.rostova@wellpath.demo', crypt('Wellpath2026!', gen_salt('bf')),
    now(), '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Elena", "last_name": "Rostova"}', now(), now()
  ) RETURNING id
),
doc3_user AS (
  INSERT INTO public.users (id, email, first_name, last_name, role, avatar_url)
  SELECT id, 'elena.rostova@wellpath.demo', 'Elena', 'Rostova', 'professional',
  'https://images.unsplash.com/photo-1594824813589-3221d6049a46?auto=format&fit=crop&q=80&w=300'
  FROM doc3_auth RETURNING id
)
INSERT INTO public.professionals (id, title, specialty, bio, hourly_rate, years_experience, verification_status)
SELECT id, 'Licensed Marriage & Family Counselor', 'Couples & Relational Dynamics',
'Elena Rostova specializes in emotionally-focused therapy (EFT) for couples, pre-marital counseling, and cross-cultural family relationships.',
110, 8, 'approved'
FROM doc3_user;

-- 5. DOCTOR 4: Pending Verification Doctor (for Admin Queue testing)
WITH doc4_auth AS (
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'pending.doctor@wellpath.demo', crypt('Wellpath2026!', gen_salt('bf')),
    now(), '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "David", "last_name": "Kim"}', now(), now()
  ) RETURNING id
),
doc4_user AS (
  INSERT INTO public.users (id, email, first_name, last_name, role, avatar_url)
  SELECT id, 'pending.doctor@wellpath.demo', 'David', 'Kim', 'professional',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300'
  FROM doc4_auth RETURNING id
)
INSERT INTO public.professionals (id, title, specialty, bio, hourly_rate, years_experience, verification_status)
SELECT id, 'Licensed Professional Counselor', 'Depression & Grief Counseling',
'David Kim is an applicant specializing in grief support, life transitions, and acceptance-commitment therapy.',
100, 4, 'pending'
FROM doc4_user;

-- 6. PATIENT ACCOUNT (patient@wellpath.demo)
WITH new_patient AS (
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'patient@wellpath.demo', crypt('Wellpath2026!', gen_salt('bf')),
    now(), '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Alex", "last_name": "Morgan"}', now(), now()
  ) RETURNING id
)
INSERT INTO public.users (id, email, first_name, last_name, role)
SELECT id, 'patient@wellpath.demo', 'Alex', 'Morgan', 'patient' FROM new_patient;

-- 7. STUDENT ACCOUNT (student@wellpath.demo)
WITH new_student AS (
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'student@wellpath.demo', crypt('Wellpath2026!', gen_salt('bf')),
    now(), '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Jordan", "last_name": "Lee"}', now(), now()
  ) RETURNING id
)
INSERT INTO public.users (id, email, first_name, last_name, role)
SELECT id, 'student@wellpath.demo', 'Jordan', 'Lee', 'student' FROM new_student;

-- 8. SEED APPOINTMENTS BETWEEN ALEX (PATIENT) & DR. SARAH JENKINS (DOCTOR)
INSERT INTO public.appointments (patient_id, professional_id, date, time, status, format, duration, fee)
SELECT 
  p.id as patient_id,
  d.id as professional_id,
  (CURRENT_DATE + INTERVAL '2 days')::date as date,
  '10:00 AM' as time,
  'upcoming' as status,
  'video' as format,
  50 as duration,
  120 as fee
FROM public.users p, public.users d
WHERE p.email = 'patient@wellpath.demo' AND d.email = 'doctor@wellpath.demo';

INSERT INTO public.appointments (patient_id, professional_id, date, time, status, format, duration, fee)
SELECT 
  p.id as patient_id,
  d.id as professional_id,
  (CURRENT_DATE + INTERVAL '7 days')::date as date,
  '02:00 PM' as time,
  'upcoming' as status,
  'video' as format,
  50 as duration,
  120 as fee
FROM public.users p, public.users d
WHERE p.email = 'patient@wellpath.demo' AND d.email = 'doctor@wellpath.demo';
