import { User, Professional, Appointment, Transaction, Review, Article } from '../types';
import { mockUsers, mockProfessionals, mockAppointments, mockReviews, mockArticles } from '../data/mockData';

// Mock storage keys
const USERS_KEY = 'wellpath_users';
const PROFESSIONALS_KEY = 'wellpath_professionals';
const APPOINTMENTS_KEY = 'wellpath_appointments';
const TRANSACTIONS_KEY = 'wellpath_transactions';
const REVIEWS_KEY = 'wellpath_reviews';
const ARTICLES_KEY = 'wellpath_articles';

// Initialize mock transactions since they are not in mockData.ts
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
    amount: 1500,
    date: new Date(Date.now() - 864000000).toISOString(),
    status: 'successful'
  }
];

const getStoredData = <T>(key: string, defaultData: T[]): T[] => {
  if (typeof window === 'undefined') return defaultData;
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
};

const setStoredData = <T>(key: string, data: T[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const adminService = {
  getPendingVerifications: async (): Promise<Professional[]> => {
    await new Promise(r => setTimeout(r, 300));
    const all = getStoredData<Professional>(PROFESSIONALS_KEY, mockProfessionals);
    return all.filter(p => p.verificationStatus === 'pending');
  },
  
  updateVerificationStatus: async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
    await new Promise(r => setTimeout(r, 300));
    const all = getStoredData<Professional>(PROFESSIONALS_KEY, mockProfessionals);
    const updated = all.map(p => p.id === id ? { ...p, verificationStatus: status, isVerified: status === 'approved' } : p);
    setStoredData(PROFESSIONALS_KEY, updated);
  },

  getUsers: async (): Promise<User[]> => {
    await new Promise(r => setTimeout(r, 300));
    return getStoredData<User>(USERS_KEY, mockUsers);
  },

  getProfessionals: async (): Promise<Professional[]> => {
    await new Promise(r => setTimeout(r, 300));
    return getStoredData<Professional>(PROFESSIONALS_KEY, mockProfessionals);
  },

  getAppointments: async (): Promise<Appointment[]> => {
    await new Promise(r => setTimeout(r, 300));
    return getStoredData<Appointment>(APPOINTMENTS_KEY, mockAppointments);
  },

  getTransactions: async (): Promise<Transaction[]> => {
    await new Promise(r => setTimeout(r, 300));
    return getStoredData<Transaction>(TRANSACTIONS_KEY, mockTransactions);
  },

  getReviews: async (): Promise<Review[]> => {
    await new Promise(r => setTimeout(r, 300));
    return getStoredData<Review>(REVIEWS_KEY, mockReviews);
  },

  updateReviewStatus: async (id: string, status: 'approved' | 'hidden' | 'pending'): Promise<void> => {
    await new Promise(r => setTimeout(r, 300));
    const all = getStoredData<Review>(REVIEWS_KEY, mockReviews);
    const updated = all.map(r => r.id === id ? { ...r, status } : r);
    setStoredData(REVIEWS_KEY, updated);
  },

  getArticles: async (): Promise<Article[]> => {
    await new Promise(r => setTimeout(r, 300));
    return getStoredData<Article>(ARTICLES_KEY, mockArticles);
  }
};
