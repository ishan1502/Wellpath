import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Professional } from '../../types';
import { Check, X, FileText, Search, User } from 'lucide-react';

export default function VerificationQueue() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProf, setSelectedProf] = useState<Professional | null>(null);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    setLoading(true);
    const data = await adminService.getPendingVerifications();
    setProfessionals(data);
    setLoading(false);
  };

  const handleAction = async (id: string, action: 'approved' | 'rejected') => {
    await adminService.updateVerificationStatus(id, action);
    setSelectedProf(null);
    fetchPending();
  };

  if (loading) return <div className="p-8 text-center text-primary font-medium">Loading queue...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Verification Queue</h2>
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search pending..." 
            className="w-full pl-11 pr-4 py-2.5 bg-surface border border-primary-muted rounded-lg text-primary-dark focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all shadow-sm hover:shadow-md placeholder-emerald-300"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-primary-muted-foreground" />
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary-muted overflow-hidden">
        {professionals.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center bg-primary-muted/30">
            <div className="h-20 w-20 bg-primary-muted rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-2">All caught up!</p>
            <p className="text-primary-hover font-medium">No professionals are waiting for verification.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-emerald-50">
              <thead className="bg-primary-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Professional</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Applied On</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-emerald-50">
                {professionals.map((prof) => (
                  <tr key={prof.id} className="hover:bg-primary-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-lg bg-primary-muted flex items-center justify-center text-primary shadow-sm">
                          <User className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-foreground">{prof.firstName} {prof.lastName}</div>
                          <div className="text-sm font-medium text-primary">{prof.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-xl bg-primary-muted text-primary-dark shadow-sm">
                        {prof.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-hover">
                      {prof.location || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                      {/* Mock date */}
                      {new Date().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <button 
                        onClick={() => setSelectedProf(prof)}
                        className="text-primary hover:text-primary-dark bg-primary-muted hover:bg-primary-muted px-4 py-2 rounded-xl transition-colors shadow-sm"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedProf && (
        <div className="fixed inset-0 bg-primary-dark/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-surface rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-primary-muted">
            <div className="p-6 border-b border-primary-muted flex justify-between items-center bg-primary-muted/50">
              <h3 className="text-2xl font-bold text-foreground">Review Application</h3>
              <button onClick={() => setSelectedProf(null)} className="text-primary hover:text-primary-dark bg-surface p-2 rounded-xl shadow-sm hover:shadow transition-all">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-primary-muted/30 p-6 rounded-lg border border-primary-muted">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Personal Info</h4>
                  <div className="space-y-3 text-sm">
                    <p className="flex flex-col"><span className="font-semibold text-primary text-xs mb-1">Name</span> <span className="font-bold text-foreground">{selectedProf.firstName} {selectedProf.lastName}</span></p>
                    <p className="flex flex-col"><span className="font-semibold text-primary text-xs mb-1">Email</span> <span className="font-bold text-foreground">{selectedProf.email}</span></p>
                    <p className="flex flex-col"><span className="font-semibold text-primary text-xs mb-1">Type</span> <span className="font-bold text-foreground">{selectedProf.type}</span></p>
                    <p className="flex flex-col"><span className="font-semibold text-primary text-xs mb-1">Location</span> <span className="font-bold text-foreground">{selectedProf.location}</span></p>
                  </div>
                </div>
                <div className="bg-primary-muted/30 p-6 rounded-lg border border-primary-muted">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Qualifications</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {selectedProf.qualifications.map((q, i) => (
                      <li key={i} className="text-sm font-medium text-primary-dark">{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Uploaded Documents</h4>
                {selectedProf.verificationDocUrl ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href={selectedProf.verificationDocUrl} target="_blank" rel="noopener noreferrer" className="bg-surface border border-primary-muted rounded-lg p-5 flex items-center hover:bg-primary-muted transition-all shadow-sm hover:shadow-md group">
                      <div className="bg-primary-muted p-3 rounded-xl mr-4 group-hover:bg-primary-muted transition-colors">
                        <FileText className="h-6 w-6 text-primary-hover" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm mb-1">Verification_Document.pdf</p>
                        <p className="text-xs font-semibold text-primary">Click to view/download</p>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div className="bg-primary-muted/50 rounded-lg p-8 text-center text-primary font-medium border border-primary-muted border-dashed">
                    No verification documents uploaded yet.
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-primary-muted flex justify-end gap-4 bg-surface">
              <button 
                onClick={() => handleAction(selectedProf.id, 'rejected')}
                className="px-6 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors shadow-sm"
              >
                Reject Application
              </button>
              <button 
                onClick={() => handleAction(selectedProf.id, 'approved')}
                className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                Approve & Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
