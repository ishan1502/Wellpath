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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Internship Requests</h1>
        <p className="text-gray-500">Manage students requesting to intern under your supervision.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map(app => (
                <div key={app.id} className="border border-border rounded-lg p-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{app.studentName || 'Unknown Student'}</h3>
                      <p className="text-xs text-gray-500 mt-1">Applied on {format(parseISO(app.appliedAt), 'MMM d, yyyy')}</p>
                      
                      {app.motivationText && (
                        <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-100 italic">
                          "{app.motivationText}"
                        </div>
                      )}
                      
                      <button className="mt-3 flex items-center text-xs text-primary font-medium hover:underline">
                        <FileText className="h-3 w-3 mr-1" /> View Full Profile
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center md:flex-col gap-2 shrink-0">
                    {app.status === 'pending' ? (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(app.id, 'accepted')}
                          className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-success/10 text-success hover:bg-success hover:text-white rounded text-sm font-medium transition-colors"
                        >
                          <Check className="h-4 w-4 mr-1" /> Accept
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(app.id, 'rejected')}
                          className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-error/10 text-error hover:bg-error hover:text-white rounded text-sm font-medium transition-colors"
                        >
                          <X className="h-4 w-4 mr-1" /> Decline
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                        app.status === 'accepted' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                      }`}>
                        {app.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <GraduationCap className="h-10 w-10 mx-auto text-gray-300 mb-3" />
              <p>No internship applications yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
