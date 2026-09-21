import { supabase } from '../lib/supabase';
import { User, Professional, Appointment, Transaction, Review, Article } from '../types';

// Mock transactions & articles for reporting views
const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    appointmentId: 'appt1',
    patientId: 'p1',
    professionalId: 'd1',
    amount: 1500,
    date: new Date(Date.now() - 86400000).toISOString(),
    status: 'successful'
  },
  {
    id: 'tx2',
    appointmentId: 'appt2',
    patientId: 'p1',
    professionalId: 'd1',
    amount: 1800,
    date: new Date(Date.now() - 864000000).toISOString(),
    status: 'successful'
  }
];

export const adminService = {
  getPendingVerifications: async (): Promise<Professional[]> => {
    try {
      const { data, error } = await supabase
        .from('professionals')
        .select('*, users(*)')
        .eq('verification_status', 'pending');

      if (error || !data) return [];

      return data.map((d: any) => ({
        id: d.id,
        firstName: d.users?.first_name || 'Professional',
        lastName: d.users?.last_name || '',
        email: d.users?.email || '',
        role: 'professional',
        avatarUrl: d.users?.avatar_url || '',
        title: d.title || 'Therapist',
        type: d.title || 'Therapist',
        specializations: d.specialty ? [d.specialty] : ['Mental Health'],
        hourlyRate: d.hourly_rate || 0,
        rating: 5.0,
        reviewCount: 0,
        bio: d.bio || '',
        verificationStatus: d.verification_status || 'pending',
        verificationDocUrl: d.verification_doc_url || '',
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
        approach: 'Evidence-based clinical approach.',
        qualifications: [d.title || 'Licensed Professional']
      })) as Professional[];
    } catch (err) {
      console.error('Error fetching pending verifications:', err);
      return [];
    }
  },
  
  updateVerificationStatus: async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
    try {
      const { error } = await supabase
        .from('professionals')
        .update({ verification_status: status })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating verification status:', err);
      throw err;
    }
  },

  getUsers: async (): Promise<User[]> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return [];

      return data.map((u: any) => ({
        id: u.id,
        email: u.email,
        firstName: u.first_name,
        lastName: u.last_name,
        role: u.role,
        avatarUrl: u.avatar_url,
        createdAt: u.created_at
      })) as User[];
    } catch (err) {
      console.error('Error fetching users for admin:', err);
      return [];
    }
  },

  getProfessionals: async (): Promise<Professional[]> => {
    try {
      const { data, error } = await supabase
        .from('professionals')
        .select('*, users(*)');

      if (error || !data) return [];

      return data.map((d: any) => ({
        id: d.id,
        firstName: d.users?.first_name || 'Professional',
        lastName: d.users?.last_name || '',
        email: d.users?.email || '',
        role: 'professional',
        avatarUrl: d.users?.avatar_url || '',
        title: d.title || 'Therapist',
        type: d.title || 'Therapist',
        specializations: d.specialty ? [d.specialty] : ['Counseling'],
        hourlyRate: d.hourly_rate || 120,
        rating: 4.9,
        reviewCount: 5,
        bio: d.bio || '',
        verificationStatus: d.verification_status || 'approved',
        verificationDocUrl: d.verification_doc_url || '',
        isVerified: d.verification_status === 'approved',
        acceptsInterns: true,
        subscriptionPaid: true,
        yearsExperience: d.years_experience || 5,
        languages: ['English'],
        sessionFee: d.hourly_rate || 120,
        sessionDuration: 50,
        isOnlineAvailable: true,
        isInPersonAvailable: true,
        about: d.bio || '',
        approach: 'Compassionate, client-centered care.',
        qualifications: [d.title || 'Master of Psychology']
      })) as Professional[];
    } catch (err) {
      console.error('Error fetching professionals for admin:', err);
      return [];
    }
  },

  getAppointments: async (): Promise<Appointment[]> => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: false });

      if (error || !data) return [];

      return data.map((a: any) => ({
        id: a.id,
        patientId: a.patient_id,
        professionalId: a.professional_id,
        date: a.date,
        time: a.time,
        duration: a.duration || 50,
        status: a.status,
        format: a.format || 'online',
        notes: a.notes || '',
        fee: a.fee || 1500
      })) as Appointment[];
    } catch (err) {
      console.error('Error fetching appointments for admin:', err);
      return [];
    }
  },

  getTransactions: async (): Promise<Transaction[]> => {
    return mockTransactions;
  },

  getReviews: async (): Promise<Review[]> => {
    return [];
  },

  updateReviewStatus: async (id: string, status: 'approved' | 'hidden' | 'pending'): Promise<void> => {
    // Review status update handler
  },

  getArticles: async (): Promise<Article[]> => {
    return [];
  }
};
