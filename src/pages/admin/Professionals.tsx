import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Professional } from '../../types';
import { 
  Search, 
  User as UserIcon, 
  CheckCircle, 
  Clock, 
  XCircle, 
  X, 
  ExternalLink, 
  AlertTriangle, 
  Star, 
  GraduationCap, 
  ShieldCheck, 
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Professionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProf, setSelectedProf] = useState<Professional | null>(null);
  const [suspendingId, setSuspendingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchProfessionals = async () => {
    setLoading(true);
    const data = await adminService.getProfessionals();
    setProfessionals(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleToggleSuspend = async (prof: Professional) => {
    const isSuspended = prof.status === 'deactivated';
    const actionLabel = isSuspended ? 'reactivate' : 'suspend';
    const confirmMessage = isSuspended
      ? `Are you sure you want to reactivate ${prof.firstName} ${prof.lastName}? Their account will be set to active.`
      : `Are you sure you want to suspend ${prof.firstName} ${prof.lastName}? Their account will be deactivated.`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    const newStatus = isSuspended ? 'active' : 'deactivated';
    setSuspendingId(prof.id);

    try {
      await adminService.suspendProfessional(prof.id, newStatus);
      
      // Update local state
      setProfessionals((prev) =>
        prev.map((p) => (p.id === prof.id ? { ...p, status: newStatus } : p))
      );

      if (selectedProf && selectedProf.id === prof.id) {
        setSelectedProf({ ...selectedProf, status: newStatus });
      }

      showNotification(
        `Professional ${isSuspended ? 'reactivated' : 'suspended'} successfully!`,
        'success'
      );
    } catch (err: any) {
      console.error('Failed to update status:', err);
      showNotification(
        `Failed to ${actionLabel} professional: ${err.message || 'Unknown error'}`,
        'error'
      );
    } finally {
      setSuspendingId(null);
    }
  };

  // Filter professionals based on search query
  const filteredProfessionals = professionals.filter((prof) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const fullName = `${prof.firstName} ${prof.lastName}`.toLowerCase();
    const email = (prof.email || '').toLowerCase();
    const specialty = (prof.type || '').toLowerCase();
    const status = (prof.status || '').toLowerCase();
    const verStatus = (prof.verificationStatus || '').toLowerCase();
    
    return (
      fullName.includes(query) ||
      email.includes(query) ||
      specialty.includes(query) ||
      status.includes(query) ||
      verStatus.includes(query)
    );
  });

  if (loading) {
    return (
      <div className="p-12 text-center text-primary font-medium flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span>Loading professionals...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg border text-sm font-semibold transition-all transform animate-in fade-in slide-in-from-top-4 ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-red-50 text-red-900 border-red-200'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Professionals</h2>
          <p className="text-sm font-medium text-primary mt-1">
            Manage registered mental health professionals, status, and credentials
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search professionals..."
            className="w-full pl-11 pr-4 py-2.5 bg-surface border border-primary-muted rounded-lg text-primary-dark focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all shadow-sm hover:shadow-md placeholder-emerald-400/80"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-primary-muted-foreground" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary-muted overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-50">
            <thead className="bg-primary-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">
                  Professional
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-emerald-50">
              {filteredProfessionals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground font-medium">
                    No professionals found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProfessionals.map((prof) => {
                  const isSuspended = prof.status === 'deactivated';
                  const isUpdating = suspendingId === prof.id;

                  return (
                    <tr key={prof.id} className="hover:bg-primary-muted/30 transition-colors">
                      {/* Name & Email */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-lg bg-primary-muted flex items-center justify-center text-primary overflow-hidden flex-shrink-0">
                            {prof.avatarUrl ? (
                              <img
                                src={prof.avatarUrl}
                                alt={prof.firstName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <UserIcon className="h-6 w-6" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-foreground">
                              {prof.firstName} {prof.lastName}
                            </div>
                            <div className="text-sm font-medium text-primary">{prof.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Specialty & Exp */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-primary-dark">{prof.type}</div>
                        <div className="text-sm font-medium text-primary">
                          {prof.yearsExperience} yrs exp
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isSuspended ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-red-100 text-red-800">
                            <AlertTriangle className="w-4 h-4 mr-1.5" />
                            Suspended
                          </span>
                        ) : prof.verificationStatus === 'approved' ? (
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

                      {/* Rating */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                        <span className="font-bold text-primary-dark flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                          {prof.rating}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({prof.reviewCount} reviews)
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                        <button
                          onClick={() => setSelectedProf(prof)}
                          className="text-primary hover:text-primary-dark mr-4 transition-colors font-bold underline-offset-2 hover:underline"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleToggleSuspend(prof)}
                          disabled={isUpdating}
                          className={`${
                            isSuspended
                              ? 'text-emerald-600 hover:text-emerald-800'
                              : 'text-red-500 hover:text-red-700'
                          } transition-colors font-bold disabled:opacity-50 inline-flex items-center gap-1`}
                        >
                          {isUpdating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                          {isUpdating
                            ? 'Updating...'
                            : isSuspended
                            ? 'Reactivate'
                            : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Professional Details Modal */}
      {selectedProf && (
        <div className="fixed inset-0 bg-primary-dark/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-primary-muted animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-primary-muted flex justify-between items-center bg-primary-muted/40">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary overflow-hidden flex-shrink-0">
                  {selectedProf.avatarUrl ? (
                    <img
                      src={selectedProf.avatarUrl}
                      alt={selectedProf.firstName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-foreground">
                    {selectedProf.firstName} {selectedProf.lastName}
                  </h3>
                  <p className="text-sm font-semibold text-primary">{selectedProf.type}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProf(null)}
                className="text-muted-foreground hover:text-foreground bg-surface p-2 rounded-xl border border-primary-muted hover:bg-primary-muted/50 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
              {/* Status Badges Row */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Account Status */}
                {selectedProf.status === 'deactivated' ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-red-100 text-red-800">
                    <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
                    Account Suspended
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                    Account Active
                  </span>
                )}

                {/* Verification Status */}
                {selectedProf.verificationStatus === 'approved' ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-primary-muted text-primary-dark">
                    <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                    Credentials Verified
                  </span>
                ) : selectedProf.verificationStatus === 'pending' ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-800">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    Verification Pending
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-red-100 text-red-800">
                    <XCircle className="w-3.5 h-3.5 mr-1.5" />
                    Verification Rejected
                  </span>
                )}

                {/* Rating Badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  {selectedProf.rating} ({selectedProf.reviewCount} reviews)
                </span>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-primary-muted/20 p-3.5 rounded-xl border border-primary-muted/50">
                  <span className="text-xs font-semibold text-muted-foreground block">Session Fee</span>
                  <span className="text-base font-bold text-foreground">
                    ₹{selectedProf.sessionFee || selectedProf.hourlyRate || 0}
                  </span>
                </div>
                <div className="bg-primary-muted/20 p-3.5 rounded-xl border border-primary-muted/50">
                  <span className="text-xs font-semibold text-muted-foreground block">Experience</span>
                  <span className="text-base font-bold text-foreground">
                    {selectedProf.yearsExperience} Years
                  </span>
                </div>
                <div className="bg-primary-muted/20 p-3.5 rounded-xl border border-primary-muted/50">
                  <span className="text-xs font-semibold text-muted-foreground block">Duration</span>
                  <span className="text-base font-bold text-foreground">
                    {selectedProf.sessionDuration || 50} mins
                  </span>
                </div>
                <div className="bg-primary-muted/20 p-3.5 rounded-xl border border-primary-muted/50">
                  <span className="text-xs font-semibold text-muted-foreground block">Interns</span>
                  <span className="text-base font-bold text-foreground">
                    {selectedProf.acceptsInterns ? 'Accepting' : 'No'}
                  </span>
                </div>
              </div>

              {/* Contact Info & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-primary-muted/20 p-4 rounded-xl border border-primary-muted/50 space-y-2">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                    Contact Information
                  </h4>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-semibold text-foreground break-all">{selectedProf.email}</p>
                  {selectedProf.phone && (
                    <>
                      <p className="text-xs text-muted-foreground pt-1">Phone</p>
                      <p className="text-sm font-semibold text-foreground">{selectedProf.phone}</p>
                    </>
                  )}
                </div>

                <div className="bg-primary-muted/20 p-4 rounded-xl border border-primary-muted/50 space-y-2">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                    Session Availability
                  </h4>
                  <div className="space-y-1.5 text-sm">
                    <p className="flex items-center justify-between">
                      <span className="text-muted-foreground">Online Sessions:</span>
                      <span className="font-semibold text-foreground">
                        {selectedProf.isOnlineAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-muted-foreground">In-Person Sessions:</span>
                      <span className="font-semibold text-foreground">
                        {selectedProf.isInPersonAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Specializations & Languages */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                  Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProf.specializations && selectedProf.specializations.length > 0 ? (
                    selectedProf.specializations.map((spec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-surface border border-primary-muted rounded-lg text-xs font-semibold text-primary-dark"
                      >
                        {spec}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">General Psychology</span>
                  )}
                </div>
              </div>

              {/* Qualifications */}
              {selectedProf.qualifications && selectedProf.qualifications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    Qualifications & Credentials
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90 font-medium bg-primary-muted/10 p-3 rounded-xl border border-primary-muted/30">
                    {selectedProf.qualifications.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bio / About */}
              {(selectedProf.about || selectedProf.bio) && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                    About / Bio
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed bg-primary-muted/10 p-4 rounded-xl border border-primary-muted/30 whitespace-pre-line">
                    {selectedProf.about || selectedProf.bio}
                  </p>
                </div>
              )}

              {/* Clinical Approach */}
              {selectedProf.approach && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                    Therapeutic Approach
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed bg-primary-muted/10 p-4 rounded-xl border border-primary-muted/30">
                    {selectedProf.approach}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 border-t border-primary-muted bg-surface flex flex-col sm:flex-row justify-between items-center gap-3">
              <Link
                to={`/professionals/${selectedProf.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-primary-muted text-primary-dark font-bold hover:bg-primary-muted/40 transition-colors text-sm"
              >
                <span>View Public Profile</span>
                <ExternalLink className="w-4 h-4 text-primary" />
              </Link>

              <div className="w-full sm:w-auto flex items-center gap-3">
                <button
                  onClick={() => handleToggleSuspend(selectedProf)}
                  disabled={suspendingId === selectedProf.id}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow inline-flex items-center justify-center gap-2 ${
                    selectedProf.status === 'deactivated'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  } disabled:opacity-50`}
                >
                  {suspendingId === selectedProf.id && <Loader2 className="w-4 h-4 animate-spin" />}
                  {suspendingId === selectedProf.id
                    ? 'Updating...'
                    : selectedProf.status === 'deactivated'
                    ? 'Reactivate Account'
                    : 'Suspend Account'}
                </button>

                <button
                  onClick={() => setSelectedProf(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border font-semibold text-muted-foreground hover:text-foreground hover:bg-surface text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
