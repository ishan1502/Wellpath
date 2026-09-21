import { supabase } from '../lib/supabase';
import { Appointment } from '../types';

export const getAppointmentsByPatient = async (userId: string): Promise<Appointment[]> => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('patient_id', userId);
    
  if (error || !data) return [];
  return data.map(mapAppointmentRecord);
};

export const getAppointmentsByProfessional = async (userId: string): Promise<Appointment[]> => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('professional_id', userId);
    
  if (error || !data) return [];
  return data.map(mapAppointmentRecord);
};

export const cancelAppointment = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('appointments')
    .update({ status: 'cancelled' })
    .eq('id', id);
  if (error) throw new Error(error.message);
};

// Map database record to frontend type
function mapAppointmentRecord(d: any): Appointment {
  return {
    id: d.id,
    patientId: d.patient_id,
    professionalId: d.professional_id,
    date: d.date,
    time: d.time,
    duration: d.duration || 50,
    format: (d.format === 'in-person' ? 'in-person' : 'online'),
    status: d.status,
    fee: d.fee || 0
  };
}

export const appointmentService = {
  getAppointments: async (userId: string, role: 'patient' | 'professional' | 'admin'): Promise<Appointment[]> => {
    if (role === 'admin') {
      const { data } = await supabase.from('appointments').select('*');
      return (data || []).map(mapAppointmentRecord);
    }
    return role === 'patient' ? getAppointmentsByPatient(userId) : getAppointmentsByProfessional(userId);
  },

  getAppointmentById: async (id: string): Promise<Appointment | undefined> => {
     const { data } = await supabase.from('appointments').select('*').eq('id', id).single();
     if (!data) return undefined;
     return mapAppointmentRecord(data);
  },

  bookAppointment: async (appointment: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> => {
    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        patient_id: appointment.patientId,
        professional_id: appointment.professionalId,
        date: appointment.date,
        time: appointment.time,
        duration: appointment.duration,
        format: appointment.format === 'online' ? 'video' : 'in-person',
        status: 'upcoming',
        fee: appointment.fee
      }])
      .select()
      .single();
      
    if (error) throw new Error(error.message);
    return mapAppointmentRecord(data);
  },

  rescheduleAppointment: async (id: string, newDate: string, newTime: string): Promise<Appointment> => {
    const { data, error } = await supabase
      .from('appointments')
      .update({ date: newDate, time: newTime })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw new Error(error.message);
    return mapAppointmentRecord(data);
  },

  cancelAppointment
};
