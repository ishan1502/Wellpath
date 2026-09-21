import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://lhrbauyrigdedxagftmy.supabase.co', 'sb_publishable_4_zYzWjE3IzTO21RmFBzeA_H8O769oh');

async function seed() {
  console.log('Seeding demo accounts...');

  const users = [
    { email: 'patient@demo.com', password: 'password123', firstName: 'Demo', lastName: 'Patient', role: 'patient' },
    { email: 'doctor@demo.com', password: 'password123', firstName: 'Dr. Sarah', lastName: 'Chen', role: 'professional' },
    { email: 'student@demo.com', password: 'password123', firstName: 'Demo', lastName: 'Student', role: 'student' },
    { email: 'admin@demo.com', password: 'password123', firstName: 'Admin', lastName: 'User', role: 'admin' }
  ];

  const createdUsers = {};

  for (const u of users) {
    const { data, error } = await supabase.auth.signUp({
      email: u.email,
      password: u.password,
    });
    
    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        console.log(`${u.email} already registered, attempting login...`);
        const { data: loginData } = await supabase.auth.signInWithPassword({ email: u.email, password: u.password });
        if (loginData?.user) {
          createdUsers[u.role] = loginData.user.id;
        }
      } else {
        console.error(`Error creating ${u.email}:`, error.message);
      }
    } else if (data.user) {
      console.log(`Created ${u.email}`);
      createdUsers[u.role] = data.user.id;
      
      // Insert into public.users
      const { error: dbErr } = await supabase.from('users').insert([{
        id: data.user.id,
        email: u.email,
        first_name: u.firstName,
        last_name: u.lastName,
        role: u.role
      }]);
      if (dbErr) console.error(dbErr);

      if (u.role === 'professional') {
        await supabase.from('professionals').upsert([{
          id: data.user.id,
          title: 'Clinical Psychologist',
          specialty: 'Anxiety & Depression',
          bio: 'Demo professional bio...',
          hourly_rate: 150,
          verification_status: 'approved'
        }]);
      }
    }
  }

  console.log('User IDs:', createdUsers);
  
  if (createdUsers.patient && createdUsers.professional) {
    console.log('Seeding appointments...');
    await supabase.from('appointments').insert([
      {
        patient_id: createdUsers.patient,
        professional_id: createdUsers.professional,
        date: '2026-10-01',
        time: '10:00',
        format: 'video',
        status: 'upcoming',
        fee: 150
      },
      {
        patient_id: createdUsers.patient,
        professional_id: createdUsers.professional,
        date: '2026-09-15',
        time: '14:00',
        format: 'video',
        status: 'completed',
        fee: 150
      }
    ]);
    console.log('Seeded appointments!');
  }
}

seed();
