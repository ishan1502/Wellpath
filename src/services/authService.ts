import { supabase } from '../lib/supabase';
import { User } from '../types';

export const authService = {
  loginWithEmailAndPassword: async (email: string, password: string): Promise<User> => {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Login failed');

    // Fetch user profile from public.users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw new Error('User profile not found');

    let needsOnboarding = false;
    if (profile.role !== 'admin') {
      const table = profile.role === 'professional' ? 'professionals' : (profile.role === 'student' ? 'students' : 'patients');
      const { count } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('id', authData.user.id);
      needsOnboarding = count === 0;
    }

    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      role: profile.role,
      avatarUrl: profile.avatar_url,
      needsOnboarding
    } as User;
  },

  signup: async (email: string, password: string, firstName: string, lastName: string, role: string): Promise<void> => {
    // 1. Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Signup failed');

    // 2. Insert the user into the public.users table
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
          role,
        }
      ]);

    if (profileError) {
      console.error(profileError);
      throw new Error('Failed to create user profile');
    }

    // We do not insert into role-specific tables here. 
    // This is handled by the onboarding flow.
  },

  resetPassword: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw new Error(error.message);
  },

  logout: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return null;

    let { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    // If profile doesn't exist, this is a first-time OAuth login
    if (!profile) {
      const pendingRole = localStorage.getItem('pending_signup_role') || 'patient';
      
      // Extract name from Google metadata if available
      const fullName = session.user.user_metadata?.full_name || '';
      const [firstName = '', lastName = ''] = fullName.split(' ');
      
      const { data: newProfile, error } = await supabase
        .from('users')
        .insert([
          {
            id: session.user.id,
            email: session.user.email!,
            first_name: firstName || 'User',
            last_name: lastName,
            role: pendingRole,
            avatar_url: session.user.user_metadata?.avatar_url || ''
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Failed to create OAuth profile:', error);
        return null;
      }

      profile = newProfile;
      localStorage.removeItem('pending_signup_role');
    }

    let needsOnboarding = false;
    if (profile.role !== 'admin') {
      const table = profile.role === 'professional' ? 'professionals' : (profile.role === 'student' ? 'students' : 'patients');
      const { count } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('id', session.user.id);
      needsOnboarding = count === 0;
    }

    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      role: profile.role,
      avatarUrl: profile.avatar_url,
      needsOnboarding
    } as User;
  }
};
