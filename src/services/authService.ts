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

    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      role: profile.role,
      avatarUrl: profile.avatar_url
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

    // 3. If role is professional, create the professional record
    if (role === 'professional') {
      const { error: proError } = await supabase
        .from('professionals')
        .insert([
          {
            id: authData.user.id,
            title: 'Licensed Professional',
            specialty: 'General Practice',
            verification_status: 'pending'
          }
        ]);
        
      if (proError) {
        console.error(proError);
        // Do not throw here, the user is created, but professional data might need to be filled out later.
      }
    }
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

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (!profile) return null;

    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      role: profile.role,
      avatarUrl: profile.avatar_url
    } as User;
  }
};
