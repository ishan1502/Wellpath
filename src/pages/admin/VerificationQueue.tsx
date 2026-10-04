import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Professional } from '../../types';
import { Check, X, FileText, Search, User, ExternalLink, Eye, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Map JSON document keys to human-readable labels
const DOC_LABELS: Record<string, string> = {
  mbbs: 'MBBS Certificate',
  md_dnb: 'MD / DNB Psychiatry Certificate',
  nmc_reg: 'Medical Council / NMC Registration',
  psychology_degree: "Bachelor's / Master's Degree in Psychology",
  ncahp_reg: 'NCAHP Professional Registration',
  rci_qualification: 'RCI-Recognised Clinical Psychology Qualification',
  rci_reg: 'RCI / CRR Registration Certificate',
};

interface ParsedDoc {
  label: string;
  url: string;
}

interface ResolvedDoc extends ParsedDoc {
  signedUrl: string | null;
  loading: boolean;
  notFound: boolean;
}

function getStoragePath(url: string): string {
  if (!url) return '';
  const decoded = decodeURIComponent(url);
  const marker = '/Verification Documents/';
  const idx = decoded.indexOf(marker);
  if (idx !== -1) {
    const pathWithQuery = decoded.slice(idx + marker.length);
    return pathWithQuery.split('?')[0];
  }
  return url.split('?')[0];
}

/**
 * Parse verificationDocUrl into an array of { label, url } objects.
 * Supports:
 *   - JSON format: { type: '...', mbbs: 'url', md_dnb: 'url', ... }
 *   - Legacy comma-separated: 'url1,url2,...'
 */
function parseVerificationDocs(verificationDocUrl: string): { docs: ParsedDoc[]; profType: string } {
  if (!verificationDocUrl) return { docs: [], profType: '' };

  try {
    const parsed = JSON.parse(verificationDocUrl);
    if (parsed && typeof parsed === 'object') {
      const profType: string = parsed.type || '';
      const docs: ParsedDoc[] = Object.entries(parsed)
        .filter(([key]) => key !== 'type')
        .map(([key, val]) => ({
          label: DOC_LABELS[key] || key,
          url: val as string,
        }))
        .filter((d) => d.url);
      return { docs, profType };
    }
  } catch {
    // Legacy: comma-separated URLs
    const docs: ParsedDoc[] = verificationDocUrl
      .split(',')
      .map((url, i) => ({ label: `Document ${i + 1}`, url: url.trim() }))
      .filter((d) => d.url);
    return { docs, profType: '' };
  }

  return { docs: [], profType: '' };
}

export default function VerificationQueue() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProf, setSelectedProf] = useState<Professional | null>(null);
  const [actionLoading, setActionLoading] = useState<'approve' | 'reject' | null>(null);
  const [resolvedDocs, setResolvedDocs] = useState<ResolvedDoc[]>([]);
  const [previewDoc, setPreviewDoc] = useState<{ label: string; url: string } | null>(null);

  const fetchPending = async () => {
    setLoading(true);
    const data = await adminService.getPendingVerifications();
    setProfessionals(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  useEffect(() => {
    if (!selectedProf?.verificationDocUrl) {
      setResolvedDocs([]);
      return;
    }

    let isMounted = true;
    const { docs } = parseVerificationDocs(selectedProf.verificationDocUrl);
    setResolvedDocs(docs.map((d) => ({ ...d, signedUrl: null, loading: true, notFound: false })));

    Promise.all(
      docs.map(async (doc) => {
        const path = getStoragePath(doc.url);
        try {
          const { data, error } = await supabase.storage
            .from('Verification Documents')
            .createSignedUrl(path, 7200);

          if (error || !data?.signedUrl) {
            return {
              ...doc,
              signedUrl: null,
              loading: false,
              notFound: true,
            };
          }

          return {
            ...doc,
            signedUrl: data.signedUrl,
            loading: false,
            notFound: false,
          };
        } catch {
          return {
            ...doc,
            signedUrl: null,
            loading: false,
            notFound: true,
          };
        }
      })
    ).then((results) => {
      if (isMounted) {
        setResolvedDocs(results);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedProf]);

  const handleApprove = async () => {
    if (!selectedProf) return;
    setActionLoading('approve');
    try {
      await adminService.updateVerificationStatus(
        selectedProf.id,
        'approved',
        selectedProf.verificationDocUrl
      );
      setSelectedProf(null);
      fetchPending();
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!selectedProf) return;
    setActionLoading('reject');
    try {
      await adminService.updateVerificationStatus(selectedProf.id, 'rejected');
      setSelectedProf(null);
      fetchPending();
    } finally {
      setActionLoading(null);
    }
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
                  <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Applied On</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-emerald-50">
                {professionals.map((prof) => {
                  const { profType } = parseVerificationDocs(prof.verificationDocUrl || '');
                  const displayType = profType || prof.type || 'N/A';
                  const submittedAt = (prof as any).submittedAt;
                  const appliedDate = submittedAt
                    ? new Date(submittedAt).toLocaleDateString()
                    : new Date().toLocaleDateString();

                  return (
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
                          {displayType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                        {appliedDate}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedProf && (() => {
        const { profType } = parseVerificationDocs(selectedProf.verificationDocUrl || '');
        const displayType = profType || selectedProf.type || 'N/A';
        const submittedAt = (selectedProf as any).submittedAt;
        const appliedDate = submittedAt
          ? new Date(submittedAt).toLocaleDateString()
          : new Date().toLocaleDateString();

        return (
          <div className="fixed inset-0 bg-primary-dark/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
            <div className="bg-surface rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-primary-muted">
              {/* Modal Header */}
              <div className="p-6 border-b border-primary-muted flex justify-between items-center bg-primary-muted/50">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Review Application</h3>
                  <p className="text-sm font-semibold text-primary mt-0.5">{displayType}</p>
                </div>
                <button
                  onClick={() => setSelectedProf(null)}
                  className="text-primary hover:text-primary-dark bg-surface p-2 rounded-xl shadow-sm hover:shadow transition-all"
                  disabled={actionLoading !== null}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-primary-muted/30 p-6 rounded-lg border border-primary-muted">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Personal Info</h4>
                    <div className="space-y-3 text-sm">
                      <p className="flex flex-col">
                        <span className="font-semibold text-primary text-xs mb-1">Name</span>
                        <span className="font-bold text-foreground">{selectedProf.firstName} {selectedProf.lastName}</span>
                      </p>
                      <p className="flex flex-col">
                        <span className="font-semibold text-primary text-xs mb-1">Email</span>
                        <span className="font-bold text-foreground">{selectedProf.email}</span>
                      </p>
                      <p className="flex flex-col">
                        <span className="font-semibold text-primary text-xs mb-1">Professional Type</span>
                        <span className="font-bold text-foreground">{displayType}</span>
                      </p>
                      <p className="flex flex-col">
                        <span className="font-semibold text-primary text-xs mb-1">Applied On</span>
                        <span className="font-bold text-foreground">{appliedDate}</span>
                      </p>
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

                {/* Uploaded Documents */}
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Uploaded Documents</h4>
                  {resolvedDocs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {resolvedDocs.map((doc, i) => (
                        <div
                          key={i}
                          className="bg-surface border border-primary-muted rounded-xl p-5 flex flex-col justify-between transition-all shadow-sm hover:shadow-md"
                        >
                          <div className="flex items-start mb-3">
                            <div className="bg-primary-muted p-3 rounded-xl mr-3.5 flex-shrink-0">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-foreground text-sm mb-1 leading-snug">{doc.label}</p>
                              {doc.loading ? (
                                <p className="text-xs text-primary flex items-center gap-1.5 font-medium">
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating secure link...
                                </p>
                              ) : doc.notFound ? (
                                <div className="space-y-1">
                                  <p className="text-xs text-amber-700 flex items-center gap-1 font-semibold">
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" /> File unavailable in storage
                                  </p>
                                  <p className="text-[11px] text-muted-foreground leading-tight">
                                    Cleaned up after approval to save storage, or expired.
                                  </p>
                                </div>
                              ) : (
                                <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                  Verified in storage
                                </span>
                              )}
                            </div>
                          </div>

                          {!doc.loading && !doc.notFound && doc.signedUrl && (
                            <div className="pt-3 border-t border-primary-muted/40 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setPreviewDoc({ label: doc.label, url: doc.signedUrl! })}
                                className="flex-1 py-2 px-3 bg-primary-muted hover:bg-primary-muted/80 text-primary-dark font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" /> Preview
                              </button>
                              <a
                                href={doc.signedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-2 px-3 bg-primary text-white hover:bg-primary-hover font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                              >
                                <ExternalLink className="w-3.5 h-3.5" /> Open Tab
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-primary-muted/50 rounded-lg p-8 text-center text-primary font-medium border border-primary-muted border-dashed">
                      No verification documents uploaded yet.
                    </div>
                  )}
                </div>

                {/* Warning note */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 font-medium">
                  ⚠️ Approving will delete uploaded documents from storage to save space on the free plan.
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-primary-muted flex justify-end gap-4 bg-surface">
                <button
                  onClick={handleReject}
                  disabled={actionLoading !== null}
                  className="px-6 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {actionLoading === 'reject' ? 'Rejecting...' : 'Reject Application'}
                </button>
                <button
                  onClick={handleApprove}
                  disabled={actionLoading !== null}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {actionLoading === 'approve' ? 'Approving...' : 'Approve & Verify'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* In-Modal Document Viewer */}
      {previewDoc && (
        <div className="fixed inset-0 bg-primary-dark/80 backdrop-blur-md flex items-center justify-center z-[60] p-4 transition-all animate-fade-in">
          <div className="bg-surface rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-primary-muted animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-primary-muted flex justify-between items-center bg-primary-muted/40">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground text-base truncate">{previewDoc.label}</h4>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 px-3 rounded-xl bg-surface hover:bg-primary-muted text-primary transition-colors text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" /> Open Original
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-2 rounded-xl bg-surface hover:bg-primary-muted text-primary transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 overflow-auto bg-gray-50 flex items-center justify-center min-h-[400px]">
              {previewDoc.url.match(/\.(jpeg|jpg|png|webp|gif)($|\?)/i) ? (
                <img
                  src={previewDoc.url}
                  alt={previewDoc.label}
                  className="max-h-[75vh] w-auto max-w-full rounded-lg shadow-sm object-contain"
                />
              ) : (
                <iframe
                  src={previewDoc.url}
                  title={previewDoc.label}
                  className="w-full h-[75vh] rounded-lg border-0 bg-white"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
