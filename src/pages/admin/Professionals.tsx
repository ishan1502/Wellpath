import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Professional } from '../../types';
import { Search, User as UserIcon, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function Professionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    setLoading(true);
    const data = await adminService.getProfessionals();
    setProfessionals(data);
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-center text-primary font-medium">Loading professionals...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Professionals</h2>
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search professionals..." 
            className="w-full pl-11 pr-4 py-2.5 bg-surface border border-primary-muted rounded-lg text-primary-dark focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all shadow-sm hover:shadow-md placeholder-emerald-300"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-primary-muted-foreground" />
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary-muted overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-50">
            <thead className="bg-primary-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Professional</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Specialty</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-emerald-50">
              {professionals.map((prof) => (
                <tr key={prof.id} className="hover:bg-primary-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-primary-muted flex items-center justify-center text-primary">
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-foreground">{prof.firstName} {prof.lastName}</div>
                        <div className="text-sm font-medium text-primary">{prof.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-primary-dark">{prof.type}</div>
                    <div className="text-sm font-medium text-primary">{prof.yearsExperience} yrs exp</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {prof.verificationStatus === 'approved' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-primary-muted text-primary-dark">
                        <CheckCircle className="w-4 h-4 mr-1.5" />
                        Verified
                      </span>
                    ) : prof.verificationStatus === 'pending' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-800">
                        <Clock className="w-4 h-4 mr-1.5" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-red-100 text-red-800">
                        <XCircle className="w-4 h-4 mr-1.5" />
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    <span className="font-bold text-primary-dark">{prof.rating}</span> ({prof.reviewCount} reviews)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <button className="text-primary hover:text-primary-dark mr-4 transition-colors">View</button>
                    <button className="text-red-500 hover:text-red-700 transition-colors">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
