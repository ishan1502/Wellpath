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

  if (loading) return <div className="p-8 text-center text-emerald-600 font-medium">Loading queue...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Verification Queue</h2>
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search pending..." 
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-emerald-100 rounded-2xl text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md placeholder-emerald-300"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-emerald-400" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden">
        {professionals.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center bg-emerald-50/30">
            <div className="h-20 w-20 bg-emerald-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
              <Check className="h-10 w-10 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-950 mb-2">All caught up!</p>
            <p className="text-emerald-700 font-medium">No professionals are waiting for verification.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-emerald-50">
              <thead className="bg-emerald-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Professional</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Applied On</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-emerald-50">
                {professionals.map((prof) => (
                  <tr key={prof.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                          <User className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-emerald-950">{prof.firstName} {prof.lastName}</div>
                          <div className="text-sm font-medium text-emerald-600">{prof.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-xl bg-emerald-100 text-emerald-800 shadow-sm">
                        {prof.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-700">
                      {prof.location || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">
                      {/* Mock date */}
                      {new Date().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <button 
                        onClick={() => setSelectedProf(prof)}
                        className="text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors shadow-sm"
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
        <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-emerald-100">
            <div className="p-6 border-b border-emerald-100 flex justify-between items-center bg-emerald-50/50">
              <h3 className="text-2xl font-bold text-emerald-950">Review Application</h3>
              <button onClick={() => setSelectedProf(null)} className="text-emerald-600 hover:text-emerald-900 bg-white p-2 rounded-xl shadow-sm hover:shadow transition-all">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Personal Info</h4>
                  <div className="space-y-3 text-sm">
                    <p className="flex flex-col"><span className="font-semibold text-emerald-600 text-xs mb-1">Name</span> <span className="font-bold text-emerald-950">{selectedProf.firstName} {selectedProf.lastName}</span></p>
                    <p className="flex flex-col"><span className="font-semibold text-emerald-600 text-xs mb-1">Email</span> <span className="font-bold text-emerald-950">{selectedProf.email}</span></p>
                    <p className="flex flex-col"><span className="font-semibold text-emerald-600 text-xs mb-1">Type</span> <span className="font-bold text-emerald-950">{selectedProf.type}</span></p>
                    <p className="flex flex-col"><span className="font-semibold text-emerald-600 text-xs mb-1">Location</span> <span className="font-bold text-emerald-950">{selectedProf.location}</span></p>
                  </div>
                </div>
                <div className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Qualifications</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {selectedProf.qualifications.map((q, i) => (
                      <li key={i} className="text-sm font-medium text-emerald-900">{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Uploaded Documents</h4>
                {selectedProf.verificationDocUrl ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href={selectedProf.verificationDocUrl} target="_blank" rel="noopener noreferrer" className="bg-white border border-emerald-200 rounded-2xl p-5 flex items-center hover:bg-emerald-50 transition-all shadow-sm hover:shadow-md group">
                      <div className="bg-emerald-100 p-3 rounded-xl mr-4 group-hover:bg-emerald-200 transition-colors">
                        <FileText className="h-6 w-6 text-emerald-700" />
                      </div>
                      <div>
                        <p className="font-bold text-emerald-950 text-sm mb-1">Verification_Document.pdf</p>
                        <p className="text-xs font-semibold text-emerald-600">Click to view/download</p>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div className="bg-emerald-50/50 rounded-2xl p-8 text-center text-emerald-600 font-medium border border-emerald-200 border-dashed">
                    No verification documents uploaded yet.
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-emerald-100 flex justify-end gap-4 bg-white">
              <button 
                onClick={() => handleAction(selectedProf.id, 'rejected')}
                className="px-6 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors shadow-sm"
              >
                Reject Application
              </button>
              <button 
                onClick={() => handleAction(selectedProf.id, 'approved')}
                className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm hover:shadow-md"
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
