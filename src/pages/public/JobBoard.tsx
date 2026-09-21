import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, GraduationCap, Clock, DollarSign, Calendar, CheckCircle, X } from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

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

  const filteredJobs = mockJobs.filter((job) => job.type === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 max-w-sm bg-white border border-emerald-200 rounded-xl shadow-xl p-4 flex items-start gap-3 animate-in slide-in-from-right">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Application Sent!</p>
            <p className="text-xs text-gray-600 mt-0.5">{toast}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mental Health Opportunities</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find your next role or internship in the mental health field. Connect with verified professionals and clinics.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('job')}
            className={`flex items-center px-6 py-2.5 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'job' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Briefcase className="w-4 h-4 mr-2" /> Jobs
          </button>
          <button
            onClick={() => setActiveTab('internship')}
            className={`flex items-center px-6 py-2.5 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'internship' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 mr-2" /> Internships
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const isApplied = appliedJobs.has(job.id);
            return (
              <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        Posted {new Date(job.postedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                        {job.compensation}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApply(job.id, job.title)}
                    disabled={isApplied}
                    className={`w-full md:w-auto px-6 py-2.5 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 flex-shrink-0 ${
                      isApplied
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {isApplied ? <><CheckCircle className="w-4 h-4" /> Applied!</> : 'Apply Now'}
                  </button>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700">{job.description}</p>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No open {activeTab}s</h3>
            <p className="text-gray-500 mt-2">Check back later for new opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
