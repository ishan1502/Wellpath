import { mockUsers } from '../data/mockData';
import { User } from '../types';

export const authService = {
  login: async (email: string): Promise<User | null> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find(u => u.email === email);
    if (user) {
        return user;
    }
    throw new Error('User not found. Try patient@wellpath.demo, doctor@wellpath.demo, or admin@wellpath.demo');
  }
};
