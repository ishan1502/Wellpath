import { supabase } from '../lib/supabase';
import { User } from '../types';

async function buildUserObject(profile: any, userId: string): Promise<User> {
  let needsOnboarding = false;
  let verificationStatus: 'pending' | 'approved' | 'rejected' | undefined = undefined;
  if (profile.role !== 'admin') {
    const table = profile.role === 'professional' ? 'professionals' : (profile.role === 'student' ? 'students' : 'patients');
    if (profile.role === 'professional') {
      const { data } = await supabase
        .from('professionals')
        .select('verification_status')
        .eq('id', userId)
        .maybeSingle();
      needsOnboarding = !data;
      if (data) {
        verificationStatus = data.verification_status || 'pending';
      }
    } else {
      const { count } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('id', userId);
      needsOnboarding = count === 0;
    }
  }

  return {
    id: profile.id,
    email: profile.email,
    firstName: profile.first_name,
    lastName: profile.last_name,
    role: profile.role,
    avatarUrl: profile.avatar_url,
    needsOnboarding,
    status: profile.status || 'active',
    verificationStatus
  } as User;
}

export const authService = {
  loginWithEmailAndPassword: async (email: string, password: string): Promise<User> => {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Login failed');

    // Fetch user profile from public.users table
    let { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (!profile) {
      // If profile is missing, create it from auth metadata
      const metaRole = authData.user.user_metadata?.role || localStorage.getItem('pending_signup_role') || 'patient';
      const fullName = authData.user.user_metadata?.full_name || authData.user.user_metadata?.name || '';
      const metaFirstName = authData.user.user_metadata?.first_name || authData.user.user_metadata?.given_name || (fullName ? fullName.split(' ')[0] : '') || 'User';
      const metaLastName = authData.user.user_metadata?.last_name || authData.user.user_metadata?.family_name || (fullName ? fullName.split(' ').slice(1).join(' ') : '') || '';

      const { data: newProfile, error: createError } = await supabase
        .from('users')
        .upsert([
          {
            id: authData.user.id,
            email: authData.user.email!,
            first_name: metaFirstName,
            last_name: metaLastName,
            role: metaRole,
            avatar_url: authData.user.user_metadata?.avatar_url || authData.user.user_metadata?.picture || ''
          }
        ], { onConflict: 'id' })
        .select()
        .single();

      if (createError || !newProfile) {
        throw new Error('User profile not found and could not be created');
      }
      profile = newProfile;
    } else {
      // If auth metadata has a role that differs from profile, sync auth metadata to canonical profile role
      const metaRole = authData.user.user_metadata?.role;
      if (profile.role && metaRole !== profile.role) {
        supabase.auth.updateUser({
          data: { role: profile.role }
        }).catch(() => {});
      }
    }

    return buildUserObject(profile, authData.user.id);
  },

  signup: async (email: string, password: string, firstName: string, lastName: string, role: string): Promise<void> => {
    // 1. Store pending role in localStorage so concurrent listeners/OAuth/sessions know the chosen role
    localStorage.setItem('pending_signup_role', role);

    // 2. Create the user in Supabase Auth with metadata so role is stored in auth.users
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role,
        }
      }
    });

    if (authError) {
      localStorage.removeItem('pending_signup_role');
      throw new Error(authError.message);
    }
    if (!authData.user) {
      localStorage.removeItem('pending_signup_role');
      throw new Error('Signup failed');
    }

    // 3. Upsert user into the public.users table with the selected role
    const { error: profileError } = await supabase
      .from('users')
      .upsert([
        {
          id: authData.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
          role: role,
        }
      ], { onConflict: 'id' });

    if (profileError) {
      console.error('Failed to create user profile:', profileError);
      throw new Error('Failed to create user profile: ' + profileError.message);
    }

    localStorage.removeItem('pending_signup_role');
  },

  resetPassword: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw new Error(error.message);
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('pending_signup_role');
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
      .maybeSingle();

    // If profile doesn't exist, create it from pending role or auth metadata
    if (!profile) {
      const metaRole = session.user.user_metadata?.role;
      const pendingRole = localStorage.getItem('pending_signup_role') || metaRole || 'patient';
      
      // Extract name from Google metadata or signup metadata if available
      const fullName = session.user.user_metadata?.full_name || session.user.user_metadata?.name || '';
      const metaFirstName = session.user.user_metadata?.first_name || session.user.user_metadata?.given_name || (fullName ? fullName.split(' ')[0] : '') || 'User';
      const metaLastName = session.user.user_metadata?.last_name || session.user.user_metadata?.family_name || (fullName ? fullName.split(' ').slice(1).join(' ') : '') || '';
      
      const { data: newProfile, error } = await supabase
        .from('users')
        .upsert([
          {
            id: session.user.id,
            email: session.user.email!,
            first_name: metaFirstName,
            last_name: metaLastName,
            role: pendingRole,
            avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || ''
          }
        ], { onConflict: 'id' })
        .select()
        .single();

      if (error) {
        console.error('Failed to create user profile:', error);
        return null;
      }

      profile = newProfile;
      localStorage.removeItem('pending_signup_role');
    } else {
      // If profile exists, only update from pending_signup_role if user explicitly initiated a new signup with a chosen role
      const pendingRole = localStorage.getItem('pending_signup_role');
      if (pendingRole && profile.role !== pendingRole) {
        const { data: updatedProfile } = await supabase
          .from('users')
          .update({ role: pendingRole })
          .eq('id', session.user.id)
          .select()
          .single();
        if (updatedProfile) {
          profile = updatedProfile;
        }
        localStorage.removeItem('pending_signup_role');
      } else if (session.user.user_metadata?.role !== profile.role) {
        // Keep auth metadata in sync with canonical profile role
        supabase.auth.updateUser({
          data: { role: profile.role }
        }).catch(() => {});
      }
    }

    return buildUserObject(profile, session.user.id);
  }
};
