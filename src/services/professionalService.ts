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
    firstName: data.users?.first_name || 'Professional',
    lastName: data.users?.last_name || '',
    email: data.users?.email || '',
    role: data.users?.role || 'professional',
    avatarUrl: data.users?.avatar_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    title: data.title || 'Clinical Specialist',
    type: data.title || 'Clinical Specialist',
    specializations: data.specialty ? [data.specialty] : ['Mental Health'],
    hourlyRate: data.hourly_rate || 120,
    rating: 4.9,
    reviewCount: 14,
    bio: data.bio || '',
    verificationStatus: data.verification_status || 'approved',
    verificationDocUrl: data.verification_doc_url || '',
    isVerified: data.verification_status === 'approved',
    acceptsInterns: true,
    subscriptionPaid: true,
    yearsExperience: data.years_experience || 8,
    languages: ['English'],
    sessionFee: data.hourly_rate || 120,
    sessionDuration: 50,
    isOnlineAvailable: true,
    isInPersonAvailable: true,
    about: data.bio || '',
    approach: 'Client-centered cognitive and mindfulness-based therapy.',
    qualifications: [data.title || 'Master in Clinical Psychology']
  } as Professional;
};

export const professionalService = {
  getProfessionals: async (): Promise<Professional[]> => {
    const { data, error } = await supabase
      .from('professionals')
      .select('*, users(*)');

    if (error || !data) return [];

    return data.map((d: any) => ({
      id: d.id,
      firstName: d.users?.first_name || 'Professional',
      lastName: d.users?.last_name || '',
      email: d.users?.email || '',
      role: d.users?.role || 'professional',
      avatarUrl: d.users?.avatar_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
      title: d.title || 'Therapist',
      type: d.title || 'Therapist',
      specializations: d.specialty ? [d.specialty] : ['Counseling'],
      hourlyRate: d.hourly_rate || 120,
      rating: 4.9,
      reviewCount: 12,
      bio: d.bio || '',
      verificationStatus: d.verification_status || 'approved',
      verificationDocUrl: d.verification_doc_url || '',
      isVerified: d.verification_status === 'approved',
      acceptsInterns: true,
      subscriptionPaid: true,
      yearsExperience: d.years_experience || 6,
      languages: ['English'],
      sessionFee: d.hourly_rate || 120,
      sessionDuration: 50,
      isOnlineAvailable: true,
      isInPersonAvailable: true,
      about: d.bio || '',
      approach: 'Compassionate, evidence-guided care.',
      qualifications: [d.title || 'Licensed Practitioner']
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

export const uploadVerificationDocument = async (userId: string, file: File): Promise<string> => {
  // 1. Upload to Supabase Storage
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/verification_${Date.now()}.${fileExt}`;
  
  const { error: uploadError, data } = await supabase.storage
    .from('Storage')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // 2. Get Public URL
  const { data: { publicUrl } } = supabase.storage
    .from('Storage')
    .getPublicUrl(filePath);

  // 3. Update professionals table
  const { error: updateError } = await supabase
    .from('professionals')
    .update({ verification_doc_url: publicUrl })
    .eq('id', userId);

  if (updateError) {
    throw new Error(`Database update failed: ${updateError.message}`);
  }

  return publicUrl;
};
