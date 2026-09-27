import { supabase } from '../lib/supabase';

export const studentService = {
  applyForInternship: async (application: {
    studentId: string;
    professionalId: string;
    motivationText: string;
    useProfileResume: boolean;
  }) => {
    const { data, error } = await supabase
      .from('internship_applications')
      .insert([{
        student_id: application.studentId,
        professional_id: application.professionalId,
        motivation_text: application.motivationText,
        use_profile_resume: application.useProfileResume
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getApplicationsByStudent: async (studentId: string) => {
    const { data, error } = await supabase
      .from('internship_applications')
      .select('*, professional:professionals(*, users(*))')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map((app: any) => ({
      id: app.id,
      studentId: app.student_id,
      professionalId: app.professional_id,
      professionalName: app.professional?.users?.first_name 
        ? `Dr. ${app.professional.users.first_name} ${app.professional.users.last_name || ''}` 
        : 'Professional',
      location: 'Remote', // Or get from professional
      status: app.status,
      appliedAt: app.created_at,
      motivationText: app.motivation_text
    }));
  },

  withdrawApplication: async (applicationId: string) => {
    const { error } = await supabase
      .from('internship_applications')
      .update({ status: 'withdrawn' })
      .eq('id', applicationId);
    if (error) throw error;
  }
};
