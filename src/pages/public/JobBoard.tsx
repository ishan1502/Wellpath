import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, GraduationCap, Clock, IndianRupee, Calendar, CheckCircle, X, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { JobPosting } from '../../types';
import { supabase } from '../../lib/supabase';

const JobBoard = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'job' | 'internship'>('job');
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const allJobs = jobs;

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


  const filteredJobs = allJobs.filter((job) => job.type === activeTab);

  return (
    <div className="bg-background min-h-screen text-primary-dark">
      <div className="bg-primary-dark text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary-dark/50 blur-3xl"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-dark/50 blur-3xl"></div>
        </div>
        
        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 max-w-sm bg-surface border border-primary-muted rounded-lg shadow-md p-5 flex items-start gap-4 animate-in slide-in-from-right">
            <div className="w-10 h-10 rounded-full bg-primary-muted flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 mt-0.5">
              <p className="text-sm font-bold text-primary-dark">Application Sent!</p>
              <p className="text-xs text-primary-hover/80 mt-1 leading-relaxed">{toast}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-primary-muted-foreground hover:text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-primary-dark/50 text-primary-muted border border-primary-hover/50 mb-6 shadow-sm backdrop-blur-sm">
            Build Your Career
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Mental Health Opportunities</h1>
          <p className="text-lg md:text-xl text-primary-muted max-w-2xl mx-auto leading-relaxed">
            Find your next role or internship in the mental health field. Connect with verified professionals and clinics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-surface rounded-lg p-1.5 shadow-sm border border-primary-muted">
            <button
              onClick={() => setActiveTab('job')}
              className={`flex items-center px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'job' ? 'bg-primary text-white shadow-md' : 'text-primary-dark hover:bg-primary-muted'
              }`}
            >
              <Briefcase className="w-5 h-5 mr-2.5" /> Jobs
            </button>
            <button
              onClick={() => setActiveTab('internship')}
              className={`flex items-center px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'internship' ? 'bg-primary text-white shadow-md' : 'text-primary-dark hover:bg-primary-muted'
              }`}
            >
              <GraduationCap className="w-5 h-5 mr-2.5" /> Internships
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-16 text-primary">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p className="font-semibold text-sm">Loading opportunities...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isApplied = appliedJobs.has(job.id);
              const postedDateStr = job.postedAt || (job as any).created_at;
              return (
                <div key={job.id} className="bg-surface border border-primary-muted rounded-xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark leading-tight mb-4 group-hover:text-primary-hover transition-colors">{job.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-primary-dark/70">
                        <span className="flex items-center bg-primary-muted px-3 py-1.5 rounded-lg">
                          <Clock className="w-4 h-4 mr-2 text-primary" />
                          Posted {postedDateStr ? new Date(postedDateStr).toLocaleDateString() : 'Recently'}
                        </span>
                        <span className="flex items-center bg-primary-muted px-3 py-1.5 rounded-lg">
                          <IndianRupee className="w-4 h-4 mr-1 text-primary" />
                          {job.compensation || (job as any).stipend || 'Competitive'}
                        </span>
                        {(() => {
                          const deadlineVal = job.deadline
                            ? new Date(job.deadline).toLocaleDateString()
                            : (job as any).duration?.startsWith('Deadline:')
                            ? (job as any).duration.replace('Deadline:', '').trim()
                            : null;
                          return deadlineVal ? (
                            <span className="flex items-center bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg">
                              <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                              Deadline: {deadlineVal}
                            </span>
                          ) : (
                            <span className="flex items-center bg-primary-muted px-3 py-1.5 rounded-lg">
                              <Calendar className="w-4 h-4 mr-2 text-primary" />
                              Status: Open
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                    <button
                      onClick={() => handleApply(job.id, job.title)}
                      disabled={isApplied}
                      className={`w-full lg:w-auto px-8 py-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0 shadow-sm ${
                        isApplied
                          ? 'bg-primary-muted text-primary-dark border border-primary-muted cursor-default shadow-none'
                          : 'bg-primary text-white hover:bg-primary-hover hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      {isApplied ? <><CheckCircle className="w-5 h-5" /> Applied!</> : 'Apply Now'}
                    </button>
                  </div>

                  <div className="mb-8">
                    <p className="text-primary-dark/80 leading-relaxed text-lg">{job.description}</p>
                  </div>

                  <div className="bg-primary-muted/50 rounded-lg p-6 border border-primary-muted">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary-dark mb-4 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" /> Requirements
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {(Array.isArray(job.requirements)
                        ? job.requirements
                        : typeof job.requirements === 'string'
                        ? (job.requirements as string).split(',').map((s: string) => s.trim()).filter(Boolean)
                        : []
                      ).map((req: string, index: number) => (
                        <li key={index} className="flex items-start text-sm text-primary-dark/80 font-medium">
                           <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                           {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-24 bg-surface border border-primary-muted rounded-xl shadow-sm">
              <div className="w-24 h-24 bg-primary-muted rounded-full flex items-center justify-center mx-auto mb-6">
                 {activeTab === 'job' ? <Briefcase className="w-10 h-10 text-primary-muted-foreground" /> : <GraduationCap className="w-10 h-10 text-primary-muted-foreground" />}
              </div>
              <h3 className="text-2xl font-bold text-primary-dark mb-2">No open {activeTab}s</h3>
              <p className="text-primary-hover/70 text-lg">Check back later for new opportunities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
