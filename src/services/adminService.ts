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
  /**
   * Best-effort deletion of all verification documents for a professional.
   * Parses verificationDocUrl as JSON (new format) or comma-separated (legacy).
   */
  deleteVerificationDocs: async (verificationDocUrl: string): Promise<void> => {
    try {
      let urls: string[] = [];

      // Try to parse as JSON first
      try {
        const parsed = JSON.parse(verificationDocUrl);
        if (parsed && typeof parsed === 'object') {
          urls = Object.entries(parsed)
            .filter(([key]) => key !== 'type')
            .map(([, val]) => val as string)
            .filter(Boolean);
        }
      } catch {
        // Fall back to comma-separated string
        urls = verificationDocUrl.split(',').map((u) => u.trim()).filter(Boolean);
      }

      if (urls.length === 0) return;

      // Extract storage paths after '/Verification Documents/' or '/Verification%20Documents/'
      const paths: string[] = urls
        .map((url) => {
          const decoded = decodeURIComponent(url);
          const marker = '/Verification Documents/';
          const idx = decoded.indexOf(marker);
          if (idx !== -1) {
            return decoded.slice(idx + marker.length);
          }
          return null;
        })
        .filter((p): p is string => p !== null && p.length > 0);

      if (paths.length === 0) return;

      const { error } = await supabase.storage
        .from('Verification Documents')
        .remove(paths);

      if (error) {
        console.error('Error deleting verification documents from storage:', error);
      }
    } catch (err) {
      console.error('Error in deleteVerificationDocs:', err);
    }
  },

  getPendingVerifications: async (): Promise<Professional[]> => {
    try {
      const { data, error } = await supabase
        .from('professionals')
        .select('*, created_at, users(*)')
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
        qualifications: [d.title || 'Licensed Professional'],
        submittedAt: d.created_at,
      })) as Professional[];
    } catch (err) {
      console.error('Error fetching pending verifications:', err);
      return [];
    }
  },

  updateVerificationStatus: async (
    id: string,
    status: 'approved' | 'rejected',
    verificationDocUrl?: string
  ): Promise<void> => {
    try {
      const { error } = await supabase
        .from('professionals')
        .update({ verification_status: status })
        .eq('id', id);

      if (error) throw error;

      // If approving, clean up uploaded documents (best-effort)
      if (status === 'approved' && verificationDocUrl) {
        await adminService.deleteVerificationDocs(verificationDocUrl);
      }
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
        createdAt: u.created_at,
        status: u.status || 'active'
      })) as User[];
    } catch (err) {
      console.error('Error fetching users for admin:', err);
      return [];
    }
  },

  updateUserStatus: async (id: string, status: 'active' | 'deactivated'): Promise<void> => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating user status:', err);
      throw err;
    }
  },

  suspendProfessional: async (id: string, status: 'active' | 'deactivated'): Promise<void> => {
    try {
      // 1. Update user record status
      const { error: userError } = await supabase
        .from('users')
        .update({ status })
        .eq('id', id);

      if (userError) {
        console.warn('Could not update users.status directly:', userError);
      }

      // 2. Also persist status in professionals metadata for resilience
      const { data: profData } = await supabase
        .from('professionals')
        .select('metadata')
        .eq('id', id)
        .maybeSingle();

      const existingMeta = (profData?.metadata as Record<string, any>) || {};
      const { error: profError } = await supabase
        .from('professionals')
        .update({
          metadata: {
            ...existingMeta,
            account_status: status
          }
        })
        .eq('id', id);

      if (userError && profError) {
        throw userError;
      }
    } catch (err) {
      console.error('Error updating professional status:', err);
      throw err;
    }
  },

  getProfessionals: async (): Promise<Professional[]> => {
    try {
      const { data, error } = await supabase
        .from('professionals')
        .select('*, users(*)');

      if (error || !data) return [];

      return data.map((d: any) => {
        const meta = d.metadata || {};
        const userStatus = (d.users?.status as 'active' | 'deactivated') || meta.account_status || 'active';
        const fee = d.hourly_rate || meta.fee || meta.sessionFee || 1500;
        
        return {
          id: d.id,
          firstName: d.users?.first_name || 'Professional',
          lastName: d.users?.last_name || '',
          email: d.users?.email || '',
          phone: d.users?.phone || meta.phone || '',
          role: 'professional',
          avatarUrl: d.users?.avatar_url || '',
          status: userStatus,
          title: d.title || meta.title || 'Therapist',
          type: d.title || meta.title || 'Therapist',
          specializations: d.specialty 
            ? d.specialty.split(',').map((s: string) => s.trim()) 
            : meta.specializations || ['Counseling', 'Mental Health'],
          hourlyRate: fee,
          rating: meta.rating || 4.9,
          reviewCount: meta.reviewCount || 5,
          bio: d.bio || meta.about || '',
          verificationStatus: d.verification_status || 'approved',
          verificationDocUrl: d.verification_doc_url || '',
          isVerified: d.verification_status === 'approved',
          acceptsInterns: d.accepts_interns ?? meta.acceptsInterns ?? true,
          subscriptionPaid: true,
          yearsExperience: d.years_experience || meta.yearsExperience || 5,
          languages: meta.languages || ['English', 'Hindi'],
          sessionFee: fee,
          sessionDuration: meta.sessionDuration || 50,
          isOnlineAvailable: meta.isOnlineAvailable ?? true,
          isInPersonAvailable: meta.isInPersonAvailable ?? true,
          about: d.bio || meta.about || '',
          approach: meta.approach || 'Compassionate, client-centered care.',
          qualifications: meta.qualifications || [d.title || 'Master of Psychology']
        };
      }) as Professional[];
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

  updateReviewStatus: async (_id: string, _status: 'approved' | 'hidden' | 'pending'): Promise<void> => {
    // Review status update handler
  },

  getArticles: async (): Promise<Article[]> => {
    return [];
  }
};
