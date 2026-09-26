export type Role = 'patient' | 'professional' | 'admin' | 'student';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatarUrl?: string;
  needsOnboarding?: boolean;
}

export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export interface Professional extends User {
  type: string; // e.g. Clinical Psychologist
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  verificationDocUrl?: string;
  acceptsInterns: boolean;
  subscriptionPaid: boolean;
  yearsExperience: number;
  specializations: string[];
  languages: string[];
  sessionFee: number;
  sessionDuration: number;
  isOnlineAvailable: boolean;
  isInPersonAvailable: boolean;
  location?: string;
  phone?: string;
  nextAvailableSlot?: string;
  about: string;
  approach: string;
  qualifications: string[];
  rating: number;
  reviewCount: number;
}

export interface InternshipApplication {
  id: string;
  studentId: string;
  professionalId: string;
  status: 'pending' | 'accepted' | 'rejected';
  motivationText: string;
  appliedAt: string;
}

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';
export type SessionFormat = 'online' | 'in-person';

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  date: string; // ISO date string
  time: string; // "14:30"
  duration: number; // minutes
  format: SessionFormat;
  status: AppointmentStatus;
  fee: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string; // ISO format
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  updatedAt: string;
}

export interface Review {
  id: string;
  appointmentId: string;
  professionalId: string;
  patientId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'hidden';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number; // minutes
  excerpt: string;
  content: string;
  tags: string[];
}

export interface Transaction {
  id: string;
  appointmentId: string;
  patientId: string;
  professionalId: string;
  amount: number;
  date: string;
  status: 'successful' | 'pending' | 'failed' | 'refunded';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking_confirmed' | 'appointment_reminder' | 'appointment_changed' | 'message_received' | 'professional_verified' | 'payment_successful' | 'review_received';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  linkTo?: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: any[];
}

export interface JobPosting {
  id: string;
  professionalId: string;
  title: string;
  type: 'job' | 'internship';
  description: string;
  requirements: string[];
  compensation: string;
  deadline: string;
  postedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'open' | 'closed';
}

export interface Event {
  id: string;
  professionalId: string; // ID of the professional or admin who created it
  hostType: 'professional' | 'admin';
  type: 'webinar' | 'workshop' | 'support_group' | 'event';
  title: string;
  description: string;
  date: string;
  time: string;
  platform: 'Zoom' | 'Google Meet' | 'In-person' | string;
  maxAttendees: number;
  currentAttendees: number;
  fee: number;
  postedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
