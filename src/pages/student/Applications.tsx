import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, Search, MapPin, Clock, CheckCircle2, 
  XCircle, FileText, MessageSquare, Calendar, 
  GraduationCap, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ApplicationItem {
  id: string;
  studentId?: string;
  professionalId: string;
  professionalName: string;
  professionalTitle?: string;
  avatarUrl?: string;
  location: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
  duration?: string;
  specialty?: string;
  motivationText: string;
  feedbackNote?: string;
}

const DEFAULT_APPLICATIONS: ApplicationItem[] = [];

export default function Applications() {
  const [applications, setApplications] = useState<ApplicationItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wellpath_internship_applications');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const existingIds = new Set(parsed.map((a: any) => a.id));
            const nonDuplicates = DEFAULT_APPLICATIONS.filter(d => !existingIds.has(d.id));
            return [...parsed, ...nonDuplicates];
          }
        } catch (e) {
          console.error('Failed to parse internship applications', e);
        }
      }
      localStorage.setItem('wellpath_internship_applications', JSON.stringify(DEFAULT_APPLICATIONS));
    }
    return DEFAULT_APPLICATIONS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  const handleWithdraw = (id: string) => {
    if (confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
      const updated = applications.filter(a => a.id !== id);
      setApplications(updated);
      localStorage.setItem('wellpath_internship_applications', JSON.stringify(updated));
      if (selectedApp?.id === id) {
        setSelectedApp(null);
      }
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.professionalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.specialty && app.specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.location && app.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' ? true : app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCount = applications.length;
  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const acceptedCount = applications.filter(a => a.status === 'accepted').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

  return (
    <div className="space-y-8 pb-12 animate-fade-in font-sans text-emerald-900">
      {/* Header */}
      <div className="bg-white rounded-3xl border-0 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                My Applications
              </h1>
              <span className="px-4 py-1.5 text-sm font-bold rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 shadow-sm">
                {totalCount} Total
              </span>
            </div>
            <p className="text-emerald-700/80 font-medium mt-2 max-w-2xl">
              Review submission statuses, interview schedules, and mentor correspondence for your clinical internships.
            </p>
          </div>

          <Link to="/student/find-internship">
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg w-full md:w-auto whitespace-nowrap">
              <Search className="w-5 h-5" />
              Find New Internships
            </button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-10 border-t border-gray-100">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-emerald-900/60 font-bold uppercase tracking-wider">Total Applied</p>
            <p className="text-4xl font-extrabold mt-2">{totalCount}</p>
          </div>
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm">
            <p className="text-sm text-amber-700/80 font-bold uppercase tracking-wider">Under Review</p>
            <p className="text-4xl font-extrabold text-amber-900 mt-2">{pendingCount}</p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
            <p className="text-sm text-emerald-700/80 font-bold uppercase tracking-wider">Accepted</p>
            <p className="text-4xl font-extrabold text-emerald-900 mt-2">{acceptedCount}</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Not Selected</p>
            <p className="text-4xl font-extrabold text-gray-700 mt-2">{rejectedCount}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between">
        <div className="relative flex-1 max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-emerald-900/30" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by mentor name, specialty, or clinic..."
            className="w-full pl-12 pr-6 py-4 bg-white border-0 shadow-sm hover:shadow-md rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium placeholder:text-emerald-900/30 transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border-0 shadow-sm overflow-x-auto">
          {[
            { id: 'all', label: 'All', count: totalCount },
            { id: 'pending', label: 'Pending', count: pendingCount },
            { id: 'accepted', label: 'Accepted', count: acceptedCount },
            { id: 'rejected', label: 'Archived', count: rejectedCount }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              type="button"
              className={`px-5 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-700/60 hover:text-emerald-900 hover:bg-emerald-50'
              }`}
            >
              {tab.label} <span className={`ml-1.5 px-2 py-0.5 rounded-lg text-xs ${statusFilter === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-3xl border-0 p-16 text-center shadow-sm hover:shadow-xl transition-all duration-300">
          <Briefcase className="w-20 h-20 text-emerald-100 mx-auto mb-6" />
          <h3 className="text-2xl font-bold">No applications found</h3>
          <p className="text-emerald-700/70 max-w-md mx-auto mt-2 font-medium">
            {searchQuery 
              ? `No applications matched "${searchQuery}". Try clearing your search.`
              : `You don't have any applications under this filter yet.`}
          </p>
          <div className="mt-8">
            <Link to="/student/find-internship">
              <button className="px-8 py-4 bg-emerald-50 text-emerald-900 font-bold rounded-2xl hover:bg-emerald-100 transition-all shadow-sm">
                Browse Verified Mentors
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApps.map((app) => {
            const isPending = app.status === 'pending';
            const isAccepted = app.status === 'accepted';
            const isRejected = app.status === 'rejected';

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl border-0 p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
                  {/* Left: Supervisor Info */}
                  <div className="flex items-start gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-900 font-extrabold text-2xl shrink-0 shadow-sm">
                      {app.professionalName.replace('Dr. ', '').charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold">
                          {app.professionalName}
                        </h3>
                        {app.professionalTitle && (
                          <span className="text-sm font-bold text-emerald-700/60 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100">
                            {app.professionalTitle}
                          </span>
                        )}
                      </div>

                      <p className="text-base text-emerald-600 font-bold mt-2">
                        {app.specialty || 'Clinical Psychology & Therapy'}
                      </p>

                      <div className="flex flex-wrap items-center gap-5 mt-4 text-sm font-medium text-emerald-900/70">
                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                          <MapPin className="w-4 h-4 text-emerald-600" /> {app.location}
                        </span>
                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                          <Calendar className="w-4 h-4 text-emerald-600" /> Applied: {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {app.duration && (
                          <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                            <Clock className="w-4 h-4 text-emerald-600" /> {app.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-end gap-5">
                    <div>
                      {isPending && (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold bg-amber-50 text-amber-800 border border-amber-100 shadow-sm">
                          <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                          Under Review
                        </span>
                      )}
                      {isAccepted && (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 shadow-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Accepted / Matched
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold bg-gray-100 text-gray-600 border border-gray-200 shadow-sm">
                          <XCircle className="w-4 h-4 text-gray-500" />
                          Not Selected
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="flex-1 sm:flex-none px-6 py-3 bg-white border border-gray-200 text-emerald-900 font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-sm text-sm"
                      >
                        Details
                      </button>

                      <Link to="/student/messages" className="flex-1 sm:flex-none">
                        <button
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-800 font-bold rounded-2xl hover:bg-emerald-100 transition-all shadow-sm text-sm"
                          title="Message Mentor"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Message</span>
                        </button>
                      </Link>

                      {isPending && (
                        <button
                          onClick={() => handleWithdraw(app.id)}
                          className="p-3 bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-2xl transition-all shadow-sm"
                          title="Withdraw Application"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Motivation snippet or Mentor Feedback */}
                {app.feedbackNote ? (
                  <div className="mt-6 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-sm font-medium flex items-start gap-3 shadow-inner">
                    <span className="font-bold text-emerald-800 shrink-0">Feedback:</span>
                    <span className="text-emerald-900/80 leading-relaxed">{app.feedbackNote}</span>
                  </div>
                ) : app.motivationText ? (
                  <div className="mt-6 text-sm text-emerald-900/50 font-medium italic line-clamp-2 px-2 border-l-4 border-emerald-100">
                    "{app.motivationText}"
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-900/40 backdrop-blur-sm animate-in">
          <div className="bg-white rounded-3xl border-0 max-w-3xl w-full p-8 md:p-10 shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto font-sans text-emerald-900">
            <div className="flex items-start justify-between border-b border-gray-100 pb-6">
              <div>
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 rounded-lg">
                  App #{selectedApp.id.substring(0, 7)}
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight">
                  {selectedApp.professionalName}
                </h2>
                <p className="text-emerald-700/80 font-bold mt-2">{selectedApp.specialty}</p>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="p-3 bg-gray-50 rounded-full text-gray-400 hover:text-emerald-900 hover:bg-gray-100 transition-all"
              >
                <span className="text-xl font-bold leading-none">✕</span>
              </button>
            </div>

            {/* Status overview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-gray-50 border border-gray-100 gap-4">
              <div>
                <p className="text-xs font-bold text-emerald-900/50 uppercase tracking-wider mb-2">Current Status</p>
                <p className="text-lg font-bold capitalize flex items-center gap-2">
                  {selectedApp.status === 'accepted' && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                  {selectedApp.status === 'pending' && <Clock className="w-6 h-6 text-amber-600" />}
                  {selectedApp.status === 'rejected' && <XCircle className="w-6 h-6 text-gray-500" />}
                  {selectedApp.status === 'accepted' ? 'Accepted - Active Offer' : selectedApp.status === 'pending' ? 'Application Under Review' : 'Closed / Not Selected'}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-bold text-emerald-900/50 uppercase tracking-wider mb-2">Submitted Date</p>
                <p className="text-base font-bold">
                  {new Date(selectedApp.appliedAt).toLocaleString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Mentor note */}
            {selectedApp.feedbackNote && (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm space-y-3 shadow-inner">
                <p className="font-extrabold text-emerald-800 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Notes from Clinical Supervisor
                </p>
                <p className="leading-relaxed font-medium text-emerald-900/80">{selectedApp.feedbackNote}</p>
              </div>
            )}

            {/* Statement of purpose */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Cover Letter & Motivation</h4>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-medium leading-relaxed whitespace-pre-line text-emerald-900/80 shadow-inner">
                {selectedApp.motivationText || 'No motivation statement provided.'}
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Submitted Documents</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                      <FileText className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="truncate font-bold text-sm">Curriculum_Vitae.pdf</span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono font-bold shrink-0 ml-2">1.2 MB</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="truncate font-bold text-sm">Academic_Transcript.pdf</span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono font-bold shrink-0 ml-2">840 KB</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
              >
                Close
              </button>
              <Link to="/student/messages">
                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md">
                  <MessageSquare className="w-5 h-5" />
                  Message Supervisor
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
