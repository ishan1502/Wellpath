import { mockProfessionals } from '../data/mockData';
import { Professional } from '../types';

const PROFESSIONALS_STORAGE_KEY = 'wellpath_professionals';

const getStoredProfessionals = (): Professional[] => {
  if (typeof window === 'undefined') return mockProfessionals;

  const stored = localStorage.getItem(PROFESSIONALS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(PROFESSIONALS_STORAGE_KEY, JSON.stringify(mockProfessionals));
  return mockProfessionals;
};

export const getProfessionalById = async (id: string): Promise<Professional | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const all = getStoredProfessionals();
  return all.find(p => p.id === id);
};

export const professionalService = {
  getProfessionals: async (): Promise<Professional[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return getStoredProfessionals();
  },

  getProfessionalById,

  searchProfessionals: async (query: string): Promise<Professional[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const all = getStoredProfessionals();
    const lowerQuery = query.toLowerCase();
    
    return all.filter(p => 
      p.firstName.toLowerCase().includes(lowerQuery) ||
      p.lastName.toLowerCase().includes(lowerQuery) ||
      p.type.toLowerCase().includes(lowerQuery) ||
      p.specializations.some(s => s.toLowerCase().includes(lowerQuery))
    );
  }
};
