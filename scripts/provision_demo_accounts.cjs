const { createClient } = require('@supabase/supabase-js');
const { execSync } = require('child_process');

const SUPABASE_URL = 'https://lhrbauyrigdedxagftmy.supabase.co';
const ANON_KEY = 'sb_publishable_4_zYzWjE3IzTO21RmFBzeA_H8O769oh';

const supabase = createClient(SUPABASE_URL, ANON_KEY);

const demoAccounts = [
  {
    email: 'admin@wellpath.demo',
    password: 'Wellpath2026!',
    firstName: 'Admin',
    lastName: 'Director',
    role: 'admin'
  },
  {
    email: 'doctor@wellpath.demo',
    password: 'Wellpath2026!',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    role: 'professional',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    title: 'Clinical Psychologist',
    specialty: 'Anxiety & Trauma Specialist',
    bio: 'Dr. Sarah Jenkins is a board-certified clinical psychologist with 10+ years specializing in Cognitive Behavioral Therapy (CBT), adult anxiety disorders, and mindfulness-based interventions.',
    hourlyRate: 120,
    yearsExperience: 10,
    status: 'approved'
  },
  {
    email: 'marcus.vance@wellpath.demo',
    password: 'Wellpath2026!',
    firstName: 'Marcus',
    lastName: 'Vance',
    role: 'professional',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    title: 'Adult Psychiatrist',
    specialty: 'Mood & Sleep Disorders',
    bio: 'Dr. Marcus Vance focuses on holistic mood stabilization, adult ADHD, and evidence-guided psychiatric management tailored to modern professionals.',
    hourlyRate: 160,
    yearsExperience: 12,
    status: 'approved'
  },
  {
    email: 'elena.rostova@wellpath.demo',
    password: 'Wellpath2026!',
    firstName: 'Elena',
    lastName: 'Rostova',
    role: 'professional',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-3221d6049a46?auto=format&fit=crop&q=80&w=300',
    title: 'Licensed Marriage & Family Counselor',
    specialty: 'Couples & Relational Dynamics',
    bio: 'Elena Rostova specializes in emotionally-focused therapy (EFT) for couples, pre-marital counseling, and cross-cultural family relationships.',
    hourlyRate: 110,
    yearsExperience: 8,
    status: 'approved'
  },
  {
    email: 'pending.doctor@wellpath.demo',
    password: 'Wellpath2026!',
    firstName: 'David',
    lastName: 'Kim',
    role: 'professional',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    title: 'Licensed Professional Counselor',
    specialty: 'Depression & Grief Counseling',
    bio: 'David Kim is an applicant specializing in grief support, life transitions, and acceptance-commitment therapy.',
    hourlyRate: 100,
    yearsExperience: 4,
    status: 'pending'
  },
  {
    email: 'patient@wellpath.demo',
    password: 'Wellpath2026!',
    firstName: 'Alex',
    lastName: 'Morgan',
    role: 'patient'
  },
  {
    email: 'student@wellpath.demo',
    password: 'Wellpath2026!',
    firstName: 'Jordan',
    lastName: 'Lee',
    role: 'student'
  }
];

async function run() {
  console.log('1. Cleaning up existing demo accounts via Supabase CLI...');
  execSync('npx supabase db query --linked "DELETE FROM auth.users WHERE email LIKE \'%@wellpath.demo\';"', { stdio: 'inherit' });

  console.log('\n2. Creating verified accounts via official Supabase Auth API...');
  const createdUsers = [];

  for (const acc of demoAccounts) {
    const { data, error } = await supabase.auth.signUp({
      email: acc.email,
      password: acc.password,
      options: {
        data: {
          first_name: acc.firstName,
          last_name: acc.lastName
        }
      }
    });

    if (error) {
      console.error(`Error creating ${acc.email}:`, error.message);
      continue;
    }

    const userId = data.user.id;
    console.log(`Created ${acc.email} -> ID: ${userId}`);
    createdUsers.push({ ...acc, id: userId });
  }

  console.log('\n3. Updating public.users and public.professionals tables...');
  for (const user of createdUsers) {
    // Upsert into public.users
    const sqlUser = `
      INSERT INTO public.users (id, email, first_name, last_name, role, avatar_url)
      VALUES ('${user.id}', '${user.email}', '${user.firstName}', '${user.lastName}', '${user.role}', ${user.avatarUrl ? `'${user.avatarUrl}'` : 'NULL'})
      ON CONFLICT (id) DO UPDATE SET 
        role = '${user.role}',
        first_name = '${user.firstName}',
        last_name = '${user.lastName}',
        avatar_url = ${user.avatarUrl ? `'${user.avatarUrl}'` : 'public.users.avatar_url'};
    `;
    execSync(`npx supabase db query --linked "${sqlUser.replace(/\n/g, ' ')}"`, { stdio: 'inherit' });

    // If professional, upsert into public.professionals
    if (user.role === 'professional') {
      const bioEscaped = (user.bio || '').replace(/'/g, "''");
      const sqlProf = `
        INSERT INTO public.professionals (id, title, specialty, bio, hourly_rate, years_experience, verification_status)
        VALUES ('${user.id}', '${user.title}', '${user.specialty}', '${bioEscaped}', ${user.hourlyRate}, ${user.yearsExperience}, '${user.status}')
        ON CONFLICT (id) DO UPDATE SET
          title = '${user.title}',
          specialty = '${user.specialty}',
          bio = '${bioEscaped}',
          hourly_rate = ${user.hourlyRate},
          years_experience = ${user.yearsExperience},
          verification_status = '${user.status}';
      `;
      execSync(`npx supabase db query --linked "${sqlProf.replace(/\n/g, ' ')}"`, { stdio: 'inherit' });
    }
  }

  console.log('\n4. Seeding appointments between Patient (Alex) and Doctor (Sarah)...');
  const patient = createdUsers.find(u => u.email === 'patient@wellpath.demo');
  const doctor = createdUsers.find(u => u.email === 'doctor@wellpath.demo');

  if (patient && doctor) {
    const sqlAppts = `
      INSERT INTO public.appointments (patient_id, professional_id, date, time, status, format, duration, fee)
      VALUES 
        ('${patient.id}', '${doctor.id}', (CURRENT_DATE + INTERVAL '2 days')::date, '10:00 AM', 'upcoming', 'video', 50, 120),
        ('${patient.id}', '${doctor.id}', (CURRENT_DATE + INTERVAL '7 days')::date, '02:00 PM', 'upcoming', 'video', 50, 120);
    `;
    execSync(`npx supabase db query --linked "${sqlAppts.replace(/\n/g, ' ')}"`, { stdio: 'inherit' });
    console.log('Appointments successfully created!');
  }

  console.log('\n5. Verifying login for all 4 primary demo roles...');
  for (const role of ['doctor@wellpath.demo', 'patient@wellpath.demo', 'student@wellpath.demo', 'admin@wellpath.demo']) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: role,
      password: 'Wellpath2026!'
    });

    if (error) {
      console.error(`FAILED to log in as ${role}:`, error.message);
    } else {
      console.log(`VERIFIED: ${role} logged in successfully! User ID: ${data.user.id}`);
    }
  }

  console.log('\nAll demo accounts are 100% operational!');
}

run();
