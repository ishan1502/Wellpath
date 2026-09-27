import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getInternshipApplications, updateInternshipApplicationStatus } from '@/services/internshipService';
import { InternshipApplication } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { GraduationCap, FileText, Check, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';

type AppWithStudent = InternshipApplication & { studentName?: string };

export default function Interns() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<AppWithStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      if (user) {
        try {
          const data = await getInternshipApplications(user.id);
          setApplications(data);
        } catch (error) {
          console.error("Error fetching applications:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchApps();
  }, [user]);

  const handleStatusUpdate = async (id: string, status: 'accepted' | 'rejected') => {
    const updated = await updateInternshipApplicationStatus(id, status);
    if (updated) {
      setApplications(apps => apps.map(app => app.id === id ? updated : app));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Internship Requests</h1>
        <p className="text-primary-hover/80 mt-1 font-medium">Manage students requesting to intern under your supervision.</p>
      </div>

      <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-surface">
        <CardHeader className="pb-4 md:p-8">
          <CardTitle className="text-xl font-bold text-foreground">Applications</CardTitle>
        </CardHeader>
        <CardContent className="md:px-8 pb-8">
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="h-28 bg-primary-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : applications.length > 0 ? (
            <div className="space-y-5">
              {applications.map(app => (
                <div key={app.id} className="bg-primary-muted/30 border border-primary-muted rounded-lg p-5 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-5">
                    <div className="h-14 w-14 rounded-lg bg-primary-muted flex items-center justify-center text-primary-hover shrink-0 shadow-sm">
                      <GraduationCap className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{app.studentName || 'Unknown Student'}</h3>
                      <p className="text-xs text-primary-hover/80 font-semibold mt-1 uppercase tracking-wider">Applied on {format(parseISO(app.appliedAt), 'MMM d, yyyy')}</p>
                      
                      {app.motivationText && (
                        <div className="mt-4 text-sm text-primary-dark bg-surface p-4 rounded-xl border border-primary-muted font-medium italic shadow-sm">
                          "{app.motivationText}"
                        </div>
                      )}
                      
                      <button className="mt-4 flex items-center text-xs text-primary font-bold hover:text-primary-dark transition-colors">
                        <FileText className="h-4 w-4 mr-1.5" /> View Full Profile
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center md:flex-col gap-3 shrink-0 mt-4 md:mt-0">
                    {app.status === 'pending' ? (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(app.id, 'accepted')}
                          className="flex items-center justify-center w-full md:w-32 px-4 py-2.5 bg-primary text-white hover:bg-primary-hover rounded-xl text-sm font-bold transition-all duration-300 shadow-sm"
                        >
                          <Check className="h-4 w-4 mr-1.5" /> Accept
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(app.id, 'rejected')}
                          className="flex items-center justify-center w-full md:w-32 px-4 py-2.5 bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100 hover:border-rose-200 rounded-xl text-sm font-bold transition-all duration-300"
                        >
                          <X className="h-4 w-4 mr-1.5" /> Decline
                        </button>
                      </>
                    ) : (
                      <span className={`px-4 py-2 text-xs font-bold rounded-xl capitalize shadow-sm ${
                        app.status === 'accepted' ? 'bg-primary-muted text-primary-dark border border-primary-muted' : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {app.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-primary-muted rounded-lg">
              <GraduationCap className="mx-auto h-12 w-12 text-primary-muted mb-3" />
              <p className="text-sm font-semibold text-primary-hover">No applications received yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
