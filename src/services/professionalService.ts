import { supabase } from '../lib/supabase';
import { Professional } from '../types';

export const getProfessionalById = async (id: string): Promise<Professional | undefined> => {
  const { data, error } = await supabase
    .from('professionals')
    .select('*, users(*)')
    .eq('id', id)
    .single();

  if (error || !data) return undefined;

  return {
    id: data.id,
    firstName: data.users.first_name,
    lastName: data.users.last_name,
    email: data.users.email,
    role: data.users.role,
    avatarUrl: data.users.avatar_url,
    title: data.title,
    type: data.title,
    specializations: data.specialty ? [data.specialty] : [],
    hourlyRate: data.hourly_rate || 0,
    rating: 5.0, // Default for now
    reviewCount: 0,
    bio: data.bio || '',
    verificationStatus: data.verification_status,
    isVerified: data.verification_status === 'approved',
    acceptsInterns: false, // Default
    subscriptionPaid: true,
    yearsExperience: data.years_experience || 0,
    languages: ['English'],
    sessionFee: data.hourly_rate || 100,
    sessionDuration: 50,
    isOnlineAvailable: true,
    isInPersonAvailable: false,
    about: data.bio || '',
    approach: 'Client-centered approach focusing on individual growth.',
    qualifications: [data.title]
  } as Professional;
};

export const professionalService = {
  getProfessionals: async (): Promise<Professional[]> => {
    const { data, error } = await supabase
      .from('professionals')
      .select('*, users(*)');

    if (error || !data) return [];

    return data.map(d => ({
      id: d.id,
      firstName: d.users.first_name,
      lastName: d.users.last_name,
      email: d.users.email,
      role: d.users.role,
      avatarUrl: d.users.avatar_url,
      title: d.title,
      type: d.title,
      specializations: d.specialty ? [d.specialty] : [],
      hourlyRate: d.hourly_rate || 0,
      rating: 5.0,
      reviewCount: 0,
      bio: d.bio || '',
      verificationStatus: d.verification_status,
      isVerified: d.verification_status === 'approved',
      acceptsInterns: false,
      subscriptionPaid: true,
      yearsExperience: d.years_experience || 0,
      languages: ['English'],
      sessionFee: d.hourly_rate || 100,
      sessionDuration: 50,
      isOnlineAvailable: true,
      isInPersonAvailable: false,
      about: d.bio || '',
      approach: 'Client-centered approach focusing on individual growth.',
      qualifications: [d.title]
    })) as Professional[];
  },

  getProfessionalById,

  searchProfessionals: async (query: string): Promise<Professional[]> => {
    const all = await professionalService.getProfessionals();
    if (!query) return all;
    const lowerQuery = query.toLowerCase();
    
    return all.filter(p => 
      p.firstName.toLowerCase().includes(lowerQuery) ||
      p.lastName.toLowerCase().includes(lowerQuery) ||
      (p.type && p.type.toLowerCase().includes(lowerQuery)) ||
      (p.specializations && p.specializations.some(s => s.toLowerCase().includes(lowerQuery)))
    );
  }
};
