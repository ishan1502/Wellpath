import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, GraduationCap, Clock, DollarSign, Calendar, CheckCircle, X } from 'lucide-react';
import { mockJobPostings } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';
import { JobPosting } from '../../types';

const defaultJobs: JobPosting[] = [
  {
    id: 'job-1',
    professionalId: 'prof-demo',
    title: 'Associate Licensed Clinical Psychologist',
    description: 'Seeking a compassionate clinical psychologist to join our multidisciplinary outpatient mental health practice. Flexible telehealth and in-person hybrid schedule.',
    type: 'job',
    requirements: ['Ph.D. or Psy.D. in Clinical Psychology', 'Active state medical/clinical license', '2+ years outpatient experience'],
    compensation: '$90,000 - $115,000 / year',
    deadline: '2026-12-31',
    postedAt: '2026-09-01',
    status: 'open'
  },
  {
    id: 'job-2',
    professionalId: 'prof-demo',
    title: 'Adolescent & Family Behavioral Counselor',
    description: 'Focus on adolescent anxiety, school stress, and parent-child communication therapy in an innovative digital-first clinic.',
    type: 'job',
    requirements: ['Master in Counseling or Social Work (LCSW / LMFT)', 'Proven child and family counseling background', 'Proficiency with telehealth tools'],
    compensation: '$75,000 - $95,000 / year',
    deadline: '2026-11-30',
    postedAt: '2026-09-10',
    status: 'open'
  },
  {
    id: 'intern-1',
    professionalId: 'prof-demo',
    title: 'Clinical Psychology Graduate Internship (Fall 2026)',
    description: 'Supervised clinical internship for advanced master or doctoral students. Gain direct hours under board-certified supervisors with comprehensive case reviews.',
    type: 'internship',
    requirements: ['Enrolled in an accredited clinical psychology program', 'Completed practicum coursework', 'Commitment of 15-20 hours/week'],
    compensation: '$25 / hour stipend',
    deadline: '2026-10-31',
    postedAt: '2026-09-15',
    status: 'open'
  },
  {
    id: 'intern-2',
    professionalId: 'prof-demo',
    title: 'Mental Health Research & Psychoeducation Intern',
    description: 'Work alongside leading clinicians to develop evidence-based wellness modules and analyze telehealth patient outcome metrics.',
    type: 'internship',
    requirements: ['Undergraduate senior or graduate student in psychology/neuroscience', 'Strong statistical & scientific writing skills'],
    compensation: 'Academic Credit + $500 monthly stipend',
    deadline: '2026-11-15',
    postedAt: '2026-09-18',
    status: 'open'
  }
];

const JobBoard = () => {
  const [activeTab, setActiveTab] = useState<'job' | 'internship'>('job');
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const handleApply = (jobId: string, jobTitle: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setAppliedJobs(prev => new Set([...prev, jobId]));
    showToast(`Application submitted for "${jobTitle}". You'll hear back soon!`);
  };

  const allJobs = mockJobPostings.length > 0 ? mockJobPostings : defaultJobs;
  const filteredJobs = allJobs.filter((job) => job.type === activeTab);

  return (
    <div className="bg-gray-50 min-h-screen text-emerald-900">
      <div className="bg-emerald-900 text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-800/50 blur-3xl"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-950/50 blur-3xl"></div>
        </div>
        
        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 max-w-sm bg-white border border-emerald-200 rounded-2xl shadow-xl p-5 flex items-start gap-4 animate-in slide-in-from-right">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 mt-0.5">
              <p className="text-sm font-bold text-emerald-900">Application Sent!</p>
              <p className="text-xs text-emerald-700/80 mt-1 leading-relaxed">{toast}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-emerald-400 hover:text-emerald-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-800/50 text-emerald-100 border border-emerald-700/50 mb-6 shadow-sm backdrop-blur-sm">
            Build Your Career
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Mental Health Opportunities</h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Find your next role or internship in the mental health field. Connect with verified professionals and clinics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-sm border border-emerald-100">
            <button
              onClick={() => setActiveTab('job')}
              className={`flex items-center px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'job' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <Briefcase className="w-5 h-5 mr-2.5" /> Jobs
            </button>
            <button
              onClick={() => setActiveTab('internship')}
              className={`flex items-center px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'internship' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <GraduationCap className="w-5 h-5 mr-2.5" /> Internships
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isApplied = appliedJobs.has(job.id);
              return (
                <div key={job.id} className="bg-white border border-emerald-50 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">{job.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-emerald-800/70">
                        <span className="flex items-center bg-emerald-50 px-3 py-1.5 rounded-lg">
                          <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                          Posted {new Date(job.postedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center bg-emerald-50 px-3 py-1.5 rounded-lg">
                          <DollarSign className="w-4 h-4 mr-1 text-emerald-500" />
                          {job.compensation}
                        </span>
                        <span className="flex items-center bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg">
                          <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                          Deadline: {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApply(job.id, job.title)}
                      disabled={isApplied}
                      className={`w-full lg:w-auto px-8 py-4 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0 shadow-sm ${
                        isApplied
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default shadow-none'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      {isApplied ? <><CheckCircle className="w-5 h-5" /> Applied!</> : 'Apply Now'}
                    </button>
                  </div>

                  <div className="mb-8">
                    <p className="text-emerald-800/80 leading-relaxed text-lg">{job.description}</p>
                  </div>

                  <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 mb-4 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" /> Requirements
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {job.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start text-sm text-emerald-800/80 font-medium">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                           {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-24 bg-white border border-emerald-100 rounded-3xl shadow-sm">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 {activeTab === 'job' ? <Briefcase className="w-10 h-10 text-emerald-300" /> : <GraduationCap className="w-10 h-10 text-emerald-300" />}
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-2">No open {activeTab}s</h3>
              <p className="text-emerald-700/70 text-lg">Check back later for new opportunities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
