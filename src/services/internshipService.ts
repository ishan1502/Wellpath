import { User, InternshipApplication } from '../types';

const MOCK_APPLICATIONS: (InternshipApplication & { studentName?: string })[] = [
  {
    id: '1',
    studentId: 'stud1',
    professionalId: 'prof1',
    status: 'pending',
    appliedAt: '2026-09-10T10:00:00Z',
    motivationText: 'I am highly interested in learning from your practice...',
    studentName: 'Alice Johnson',
  },
  {
    id: '2',
    studentId: 'stud2',
    professionalId: 'prof1',
    status: 'accepted',
    appliedAt: '2026-09-01T10:00:00Z',
    motivationText: 'I have a strong background in psychology...',
    studentName: 'Bob Smith',
  }
];

export const getInternshipApplications = async (professionalId: string): Promise<(InternshipApplication & { studentName?: string })[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_APPLICATIONS.filter(app => app.professionalId === professionalId || professionalId === 'all'));
    }, 500);
  });
};

export const updateInternshipApplicationStatus = async (applicationId: string, status: 'accepted' | 'rejected'): Promise<(InternshipApplication & { studentName?: string }) | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appIndex = MOCK_APPLICATIONS.findIndex(app => app.id === applicationId);
      if (appIndex > -1) {
        MOCK_APPLICATIONS[appIndex] = { ...MOCK_APPLICATIONS[appIndex], status };
        resolve(MOCK_APPLICATIONS[appIndex]);
      } else {
        resolve(null);
      }
    }, 500);
  });
};
