import { supabase } from '../lib/supabase';

export const getInternshipApplications = async (professionalId: string): Promise<any[]> => {
  const { data, error } = await supabase
    .from('internship_applications')
    .select('*, student:users!internship_applications_student_id_fkey(*)')
    .eq('professional_id', professionalId)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching applications', error);
    return [];
  }

  return data.map(app => ({
    id: app.id,
    studentId: app.student_id,
    professionalId: app.professional_id,
    status: app.status,
    appliedAt: app.created_at,
    motivationText: app.motivation_text,
    studentName: app.student ? `${app.student.first_name} ${app.student.last_name}` : 'Unknown Student',
  }));
};

export const updateInternshipApplicationStatus = async (applicationId: string, status: 'accepted' | 'rejected'): Promise<any | null> => {
  const { data, error } = await supabase
    .from('internship_applications')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', applicationId)
    .select('*, student:users!internship_applications_student_id_fkey(*)')
    .single();

  if (error || !data) {
    console.error('Error updating application', error);
    return null;
  }

  return {
    id: data.id,
    studentId: data.student_id,
    professionalId: data.professional_id,
    status: data.status,
    appliedAt: data.created_at,
    motivationText: data.motivation_text,
    studentName: data.student ? `${data.student.first_name} ${data.student.last_name}` : 'Unknown Student',
  };
};
