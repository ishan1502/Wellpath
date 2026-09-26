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

  if (loading) return <div className="p-8 text-center text-emerald-600 font-medium">Loading professionals...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Professionals</h2>
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search professionals..." 
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-emerald-100 rounded-2xl text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md placeholder-emerald-300"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-emerald-400" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-50">
            <thead className="bg-emerald-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Professional</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Specialty</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-emerald-50">
              {professionals.map((prof) => (
                <tr key={prof.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-emerald-950">{prof.firstName} {prof.lastName}</div>
                        <div className="text-sm font-medium text-emerald-600">{prof.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-emerald-900">{prof.type}</div>
                    <div className="text-sm font-medium text-emerald-600">{prof.yearsExperience} yrs exp</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {prof.verificationStatus === 'approved' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">
                    <span className="font-bold text-emerald-900">{prof.rating}</span> ({prof.reviewCount} reviews)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <button className="text-emerald-600 hover:text-emerald-800 mr-4 transition-colors">View</button>
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
