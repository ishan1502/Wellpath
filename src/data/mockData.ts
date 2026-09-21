import { Professional, User, Appointment, Article, Review, JobPosting, Event } from '../types';

export const mockUsers: User[] = [
  { id: 'p1', email: 'patient@wellpath.demo', firstName: 'Alex', lastName: 'Sharma', role: 'patient' },
  { id: 'p2', email: 'priya@wellpath.demo', firstName: 'Priya', lastName: 'Kapoor', role: 'patient' },
  { id: 'd1', email: 'doctor@wellpath.demo', firstName: 'Ananya', lastName: 'Mehta', role: 'professional' },
  { id: 'a1', email: 'admin@wellpath.demo', firstName: 'System', lastName: 'Admin', role: 'admin' },
  { id: 's1', email: 'student@wellpath.demo', firstName: 'Rahul', lastName: 'Verma', role: 'student' },
];

export const mockProfessionals: Professional[] = [
  {
    id: 'd1',
    email: 'doctor@wellpath.demo',
    firstName: 'Ananya',
    lastName: 'Mehta',
    role: 'professional',
    type: 'Clinical Psychologist',
    isVerified: true,
    verificationStatus: 'approved',
    acceptsInterns: true,
    subscriptionPaid: true,
    yearsExperience: 8,
    specializations: ['Anxiety', 'Stress', 'Relationships'],
    languages: ['English', 'Hindi'],
    sessionFee: 1500,
    sessionDuration: 50,
    isOnlineAvailable: true,
    isInPersonAvailable: false,
    location: 'Mumbai',
    phone: '919876543210',
    nextAvailableSlot: new Date(Date.now() + 86400000).toISOString(),
    about: 'I am a clinical psychologist specializing in cognitive behavioral therapy (CBT) for anxiety and relationship issues.',
    approach: 'My approach is collaborative, goal-oriented, and tailored to each individual.',
    qualifications: ['M.A. Clinical Psychology', 'Ph.D. Psychology'],
    rating: 4.9,
    reviewCount: 124
  },
  {
    id: 'd2',
    email: 'karan@wellpath.demo',
    firstName: 'Karan',
    lastName: 'Singh',
    role: 'professional',
    type: 'Psychotherapist',
    isVerified: true,
    verificationStatus: 'approved',
    acceptsInterns: false,
    subscriptionPaid: true,
    yearsExperience: 12,
    specializations: ['Burnout', 'Depression', 'Life transitions'],
    languages: ['English', 'Punjabi'],
    sessionFee: 2000,
    sessionDuration: 60,
    isOnlineAvailable: true,
    isInPersonAvailable: true,
    location: 'Delhi',
    phone: '919811223344',
    nextAvailableSlot: new Date(Date.now() + 172800000).toISOString(),
    about: 'I help professionals navigate burnout and find balance in their lives.',
    approach: 'I use a psychodynamic approach to help clients understand underlying patterns.',
    qualifications: ['M.Phil Psychotherapy'],
    rating: 4.7,
    reviewCount: 89
  }
];

export const mockArticles: Article[] = [
  {
    id: 'a1',
    slug: 'understanding-burnout',
    title: 'Understanding Burnout: Signs and Solutions',
    category: 'Burnout',
    author: 'Dr. Ananya Mehta',
    publishedAt: new Date(Date.now() - 864000000).toISOString(),
    readingTime: 5,
    excerpt: 'Burnout is more than just feeling tired. Learn how to identify the signs.',
    content: 'Burnout is a state of emotional, physical, and mental exhaustion caused by excessive and prolonged stress...',
    tags: ['Burnout', 'Work', 'Stress']
  },
  {
    id: 'a2',
    slug: 'managing-anxiety',
    title: '5 Techniques for Managing Daily Anxiety',
    category: 'Anxiety',
    author: 'Karan Singh',
    publishedAt: new Date(Date.now() - 1728000000).toISOString(),
    readingTime: 8,
    excerpt: 'Practical techniques you can use right now to calm your mind.',
    content: 'Anxiety can strike at any moment. Here are five practical techniques to help you stay grounded...',
    tags: ['Anxiety', 'Wellness', 'Techniques']
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'appt1',
    patientId: 'p1',
    professionalId: 'd1',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    time: '18:30',
    duration: 50,
    format: 'online',
    status: 'upcoming',
    fee: 1500
  },
  {
    id: 'appt2',
    patientId: 'p1',
    professionalId: 'd1',
    date: new Date(Date.now() - 864000000).toISOString().split('T')[0], // past
    time: '10:00',
    duration: 50,
    format: 'online',
    status: 'completed',
    fee: 1500
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev1',
    appointmentId: 'appt2',
    professionalId: 'd1',
    patientId: 'p1',
    rating: 5,
    comment: 'Dr. Mehta is incredibly patient and understanding. I felt heard.',
    createdAt: new Date(Date.now() - 777600000).toISOString(),
    status: 'approved'
  }
];

export const mockJobs: JobPosting[] = [
  {
    id: 'job1',
    professionalId: 'd1',
    title: 'Clinical Psychology Intern',
    type: 'internship',
    description: 'Looking for a motivated intern to assist with clinical assessments and research.',
    requirements: ['Pursuing MA in Psychology', 'Strong communication skills'],
    compensation: 'Unpaid - Academic Credit',
    deadline: new Date(Date.now() + 864000000).toISOString().split('T')[0],
    postedAt: new Date(Date.now() - 172800000).toISOString(),
    status: 'open'
  },
  {
    id: 'job2',
    professionalId: 'd2',
    title: 'Associate Psychotherapist',
    type: 'job',
    description: 'We are expanding our clinic and looking for a licensed psychotherapist.',
    requirements: ['M.Phil or equivalent', '2+ years experience', 'Licensed'],
    compensation: '₹40,000 - ₹60,000 / month',
    deadline: new Date(Date.now() + 1728000000).toISOString().split('T')[0],
    postedAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'open'
  }
];

export const mockEvents: Event[] = [
  {
    id: 'evt1',
    professionalId: 'd1',
    hostType: 'professional',
    type: 'webinar',
    title: 'Overcoming Workplace Burnout',
    description: 'Join this webinar to learn practical strategies for managing stress and avoiding burnout in high-pressure environments.',
    date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    time: '18:00',
    platform: 'Zoom',
    maxAttendees: 50,
    currentAttendees: 12,
    fee: 0,
    postedAt: new Date(Date.now() - 259200000).toISOString(),
    status: 'approved'
  }
];

