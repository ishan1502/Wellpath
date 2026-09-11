import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  MessageSquare, 
  Calendar, 
  GraduationCap, 
  Trash2
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

const DEFAULT_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'app-001',
    professionalId: 'd1',
    professionalName: 'Dr. Ananya Mehta',
    professionalTitle: 'Lead Clinical Psychologist',
    location: 'Mumbai (Hybrid)',
    status: 'accepted',
    appliedAt: '2026-09-02T10:30:00Z',
    duration: '12 Weeks (Summer Cohort)',
    specialty: 'Cognitive Behavioral Therapy (CBT) & Mood Disorders',
    motivationText: 'I am a final-year psychology student with clinical coursework in CBT. I have completed foundational training in trauma-informed therapy and am passionate about observing therapy sessions under Dr. Mehta’s guidance.',
    feedbackNote: 'Application accepted! We were impressed with your academic background in CBT. Please check your email for orientation paperwork.'
  },
  {
    id: 'app-002',
    professionalId: 'd2',
    professionalName: 'Dr. Karan Singh',
    professionalTitle: 'Consultant Psychotherapist',
    location: 'Delhi (In-Person)',
    status: 'pending',
    appliedAt: '2026-09-08T14:15:00Z',
    duration: '8 Weeks',
    specialty: 'Adult Psychotherapy & Workplace Burnout',
    motivationText: 'I am keen to explore psychodynamic and systemic interventions for corporate professionals suffering from severe occupational exhaustion and panic symptoms.',
    feedbackNote: 'Application is currently under initial review by Dr. Singh and the clinical administration committee.'
  },
  {
    id: 'app-003',
    professionalId: 'd3',
    professionalName: 'Dr. Radhika Sen',
    professionalTitle: 'Neuropsychologist & Researcher',
    location: 'Bangalore (On-site)',
    status: 'rejected',
    appliedAt: '2026-08-15T09:00:00Z',
    duration: '16 Weeks',
    specialty: 'Neuropsychological Assessment & Rehabilitation',
    motivationText: 'Seeking practical experience administering psychometric evaluations, WAIS-IV batteries, and cognitive rehabilitation routines.',
    feedbackNote: 'Unfortunately, all 2 open supervision slots for the autumn cohort have been filled. You are encouraged to re-apply in spring.'
  }
];

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
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-text-main">
                My Internship Applications
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                {totalCount} Total
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">
              Review submission statuses, interview schedules, and mentor correspondence for your clinical internships.
            </p>
          </div>

          <Link to="/student/find-internship">
            <Button className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Find New Internships
            </Button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs text-text-muted font-medium">Total Applied</p>
            <p className="text-2xl font-bold text-text-main mt-0.5">{totalCount}</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-xs text-amber-700 font-medium">Under Review</p>
            <p className="text-2xl font-bold text-amber-900 mt-0.5">{pendingCount}</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-xs text-emerald-700 font-medium">Offers Accepted</p>
            <p className="text-2xl font-bold text-emerald-900 mt-0.5">{acceptedCount}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Not Selected</p>
            <p className="text-2xl font-bold text-slate-700 mt-0.5">{rejectedCount}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by mentor name, specialty, or clinic..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-1 bg-surface p-1 rounded-lg border border-border">
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
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-text-main hover:bg-gray-100'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-border p-12 text-center shadow-sm">
          <Briefcase className="w-12 h-12 text-text-muted mx-auto mb-3 opacity-40" />
          <h3 className="text-lg font-bold text-text-main">No applications found</h3>
          <p className="text-sm text-text-muted max-w-md mx-auto mt-1">
            {searchQuery 
              ? `No applications matched "${searchQuery}". Try clearing your search.`
              : `You don't have any applications under this filter yet.`}
          </p>
          <div className="mt-5">
            <Link to="/student/find-internship">
              <Button variant="outline" size="sm">
                Browse Verified Mentors
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => {
            const isPending = app.status === 'pending';
            const isAccepted = app.status === 'accepted';
            const isRejected = app.status === 'rejected';

            return (
              <div
                key={app.id}
                className="bg-surface rounded-2xl border border-border p-6 shadow-sm hover:border-primary/40 hover:shadow transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left: Supervisor Info */}
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-lg shrink-0">
                      {app.professionalName.replace('Dr. ', '').charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-text-main">
                          {app.professionalName}
                        </h3>
                        {app.professionalTitle && (
                          <span className="text-xs text-text-muted">
                            • {app.professionalTitle}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-primary font-medium mt-0.5">
                        {app.specialty || 'Clinical Psychology & Therapy'}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {app.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> Applied: {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {app.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {app.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:self-center">
                    <div>
                      {isPending && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                          Under Review
                        </span>
                      )}
                      {isAccepted && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Accepted / Matched
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          <XCircle className="w-3.5 h-3.5 text-slate-500" />
                          Not Selected
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedApp(app)}
                        className="text-xs"
                      >
                        View Details
                      </Button>

                      <Link to="/student/messages">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs flex items-center gap-1.5 text-text-muted hover:text-text-main"
                          title="Message Mentor"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span className="hidden sm:inline">Message</span>
                        </Button>
                      </Link>

                      {isPending && (
                        <button
                          onClick={() => handleWithdraw(app.id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-md transition-colors"
                          title="Withdraw Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Motivation snippet or Mentor Feedback */}
                {app.feedbackNote ? (
                  <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-text-main flex items-start gap-2">
                    <span className="font-semibold text-primary shrink-0">Mentor Feedback:</span>
                    <span className="text-text-muted">{app.feedbackNote}</span>
                  </div>
                ) : app.motivationText ? (
                  <div className="mt-3 text-xs text-text-muted line-clamp-1 italic">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in">
          <div className="bg-surface rounded-2xl border border-border max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Application Summary #{selectedApp.id.substring(0, 7)}
                </span>
                <h2 className="text-xl font-bold text-text-main mt-0.5">
                  {selectedApp.professionalName}
                </h2>
                <p className="text-xs text-text-muted">{selectedApp.specialty}</p>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-full text-text-muted hover:text-text-main hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Status overview */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
              <div>
                <p className="text-xs text-text-muted">Current Application Status</p>
                <p className="text-sm font-bold text-text-main capitalize mt-0.5 flex items-center gap-1.5">
                  {selectedApp.status === 'accepted' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {selectedApp.status === 'pending' && <Clock className="w-4 h-4 text-amber-600" />}
                  {selectedApp.status === 'rejected' && <XCircle className="w-4 h-4 text-slate-500" />}
                  {selectedApp.status === 'accepted' ? 'Accepted - Active Offer' : selectedApp.status === 'pending' ? 'Application Under Review' : 'Closed / Not Selected'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted">Submitted Date</p>
                <p className="text-xs font-medium text-text-main mt-0.5">
                  {new Date(selectedApp.appliedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Mentor note */}
            {selectedApp.feedbackNote && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <p className="font-semibold text-emerald-900">Notes from Clinical Supervisor</p>
                <p className="leading-relaxed">{selectedApp.feedbackNote}</p>
              </div>
            )}

            {/* Statement of purpose */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-text-main">Cover Letter & Motivation Statement</h4>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-text-muted leading-relaxed whitespace-pre-line">
                {selectedApp.motivationText || 'No motivation statement provided.'}
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-text-main">Submitted Credentials & Documents</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-white text-xs">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate font-medium">Curriculum_Vitae_2026.pdf</span>
                  </div>
                  <span className="text-[10px] text-text-muted font-mono shrink-0">1.2 MB</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-white text-xs">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate font-medium">Academic_Transcript.pdf</span>
                  </div>
                  <span className="text-[10px] text-text-muted font-mono shrink-0">840 KB</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </Button>
              <Link to="/student/messages">
                <Button size="sm" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message Supervisor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
