import { mockAppointments } from '../data/mockData';
import { Appointment } from '../types';

const APPOINTMENTS_STORAGE_KEY = 'wellpath_appointments';

// Helper to get appointments from local storage or seed them
const getStoredAppointments = (): Appointment[] => {
  if (typeof window === 'undefined') return mockAppointments;
  
  const stored = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Seed initial data
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(mockAppointments));
  return mockAppointments;
};

// Helper to save appointments to local storage
const saveAppointments = (appointments: Appointment[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  }
};

export const getAppointmentsByPatient = async (userId: string): Promise<Appointment[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const all = getStoredAppointments();
  return all.filter(a => a.patientId === userId);
};

export const getAppointmentsByProfessional = async (userId: string): Promise<Appointment[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const all = getStoredAppointments();
  return all.filter(a => a.professionalId === userId);
};

export const cancelAppointment = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const all = getStoredAppointments();
  const index = all.findIndex(a => a.id === id);
  if (index === -1) throw new Error('Appointment not found');
  
  all[index] = { ...all[index], status: 'cancelled' };
  saveAppointments(all);
};

export const appointmentService = {
  getAppointments: async (userId: string, role: 'patient' | 'professional' | 'admin'): Promise<Appointment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const all = getStoredAppointments();
    if (role === 'admin') return all;
    return all.filter(a => role === 'patient' ? a.patientId === userId : a.professionalId === userId);
  },

  getAppointmentById: async (id: string): Promise<Appointment | undefined> => {
     await new Promise((resolve) => setTimeout(resolve, 200));
     const all = getStoredAppointments();
     return all.find(a => a.id === id);
  },

  bookAppointment: async (appointment: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newAppointment: Appointment = {
      ...appointment,
      id: `appt_${Date.now()}`,
      status: 'upcoming'
    };
    const all = getStoredAppointments();
    saveAppointments([...all, newAppointment]);
    return newAppointment;
  },

  rescheduleAppointment: async (id: string, newDate: string, newTime: string): Promise<Appointment> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const all = getStoredAppointments();
    const index = all.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    
    const updated = { ...all[index], date: newDate, time: newTime };
    all[index] = updated;
    saveAppointments(all);
    return updated;
  },

  cancelAppointment
};
