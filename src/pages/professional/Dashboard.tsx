import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getProfessionalById, uploadVerificationDocument } from '@/services/professionalService';
import { getAppointmentsByProfessional } from '@/services/appointmentService';
import { Professional, Appointment } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Users, 
  Calendar as CalendarIcon, 
  IndianRupee, 
  Star, 
  AlertCircle, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  X, 
  Award,
  Video,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ProfessionalDashboard() {
  const { user } = useAuth();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  
  // File upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const prof = await getProfessionalById(user.id);
        if (prof) {
          setProfessional(prof);
          // Check if documents are approved and popup hasn't been dismissed yet
          if (prof.verificationStatus === 'approved') {
            const dismissed = localStorage.getItem(`wellpath_approval_modal_dismissed_${user.id}`);
            if (!dismissed) {
              setShowApprovalModal(true);
            }
          }
        }

        const appts = await getAppointmentsByProfessional(user.id);
        setAppointments(appts);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleDismissApprovalModal = () => {
    if (user?.id) {
      localStorage.setItem(`wellpath_approval_modal_dismissed_${user.id}`, 'true');
    }
    setShowApprovalModal(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (file.type !== 'application/pdf') {
      setUploadError('Only PDF files are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB.');
      return;
    }

    try {
      setUploading(true);
      setUploadError('');
      const url = await uploadVerificationDocument(user.id, file);
      if (professional) {
        setProfessional({ ...professional, verificationDocUrl: url });
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingAppts = appointments
    .filter(a => a.status === 'upcoming')
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
    
  const todayAppts = upcomingAppts.filter(a => a.date === todayStr);
  const completedAppts = appointments.filter(a => a.status === 'completed');
  
  // Derived stats
  const uniqueClients = new Set(appointments.map(a => a.patientId)).size;
  const thisMonthEarnings = completedAppts.reduce((sum, a) => sum + (a.fee || 120), 0);
  const averageRating = professional?.rating || 0;

  return (
    <div className="space-y-8">
      {/* Welcome Header & Verified Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-dark tracking-tight">
            Welcome, Dr. {user?.lastName || user?.firstName}
          </h1>
          <p className="text-primary-hover/80 mt-1">Here's what's happening with your practice today.</p>
        </div>

        {professional?.verificationStatus === 'approved' && (
          <button
            onClick={() => setShowApprovalModal(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-full transition-all shadow-sm group"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span>Documents & Profile Verified</span>
          </button>
        )}
      </div>

      {/* Approved Documents Banner */}
      {professional && professional.verificationStatus === 'approved' && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-emerald-950">Documents Approved & Verified</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900">
                  Active
                </span>
              </div>
              <p className="text-sm font-medium text-emerald-800/90 mt-0.5">
                Your clinical credentials have been approved. Your profile is live in the directory and accepting bookings.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              to={`/professionals/${user?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-xs font-bold px-3.5 py-2 bg-white text-emerald-800 border border-emerald-300 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm inline-flex items-center justify-center gap-1.5"
            >
              <span>View Live Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setShowApprovalModal(true)}
              className="w-full sm:w-auto text-xs font-bold px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-all shadow-sm inline-flex items-center justify-center gap-1.5"
            >
              <span>Verification Info</span>
            </button>
          </div>
        </div>
      )}

      {/* Pending / Unverified Action Banner */}
      {professional && professional.verificationStatus !== 'approved' && (
        <Card className={`rounded-xl border-0 shadow-sm transition-all duration-300 hover:shadow-md ${professional.verificationDocUrl ? 'bg-amber-50' : 'bg-rose-50'}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-lg flex items-center ${professional.verificationDocUrl ? 'text-amber-900' : 'text-rose-900'}`}>
              {professional.verificationDocUrl ? (
                <><CheckCircle2 className="mr-3 h-6 w-6 text-amber-600" /> Verification Pending Review</>
              ) : (
                <><AlertCircle className="mr-3 h-6 w-6 text-rose-600" /> Action Required: Verification</>
              )}
            </CardTitle>
            <CardDescription className={`text-base ml-9 ${professional.verificationDocUrl ? 'text-amber-700' : 'text-rose-700'}`}>
              {professional.verificationDocUrl 
                ? "We've received your documents. Our team will review them shortly."
                : "Please upload your medical license or certification (PDF) to activate your account."
              }
            </CardDescription>
          </CardHeader>
          {!professional.verificationDocUrl && (
            <CardContent className="ml-9 pb-6">
              <input 
                type="file" 
                accept="application/pdf" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
              />
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  disabled={uploading}
                  className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md py-6"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Documents (PDF)'}
                </Button>
                {uploadError && <p className="text-sm text-rose-600 font-medium">{uploadError}</p>}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-surface">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-primary-dark/70">Today's Sessions</CardTitle>
            <div className="p-2 bg-primary-muted rounded-lg">
              <CalendarIcon className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{loading ? '-' : todayAppts.length}</div>
            <p className="text-sm text-primary mt-2 font-medium">
              {upcomingAppts.length} total upcoming
            </p>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-surface">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-primary-dark/70">Total Clients</CardTitle>
            <div className="p-2 bg-primary-muted rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{loading ? '-' : uniqueClients}</div>
            <p className="text-sm text-primary mt-2 font-medium flex items-center">
              All time unique clients
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-surface">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-primary-dark/70">Earnings</CardTitle>
            <div className="p-2 bg-primary-muted rounded-lg">
              <IndianRupee className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{loading ? '-' : `₹${thisMonthEarnings.toLocaleString()}`}</div>
            <p className="text-sm text-primary mt-2 font-medium">All time</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-surface">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-primary-dark/70">Average Rating</CardTitle>
            <div className="p-2 bg-primary-muted rounded-lg">
              <Star className="h-5 w-5 text-primary fill-emerald-600/20" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{loading ? '-' : averageRating > 0 ? averageRating : 'N/A'}</div>
            <p className="text-sm text-primary mt-2 font-medium">Based on patient reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="col-span-1 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-surface">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-foreground">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center space-x-4 animate-pulse">
                    <div className="h-12 w-12 bg-primary-muted rounded-lg"></div>
                    <div className="space-y-3 flex-1">
                      <div className="h-4 bg-primary-muted rounded w-1/3"></div>
                      <div className="h-3 bg-primary-muted rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : upcomingAppts.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppts.slice(0, 4).map(appt => (
                  <div key={appt.id} className="flex items-center p-4 rounded-lg bg-primary-muted/50 hover:bg-primary-muted transition-colors border border-primary-muted/50">
                    <div className="h-12 w-12 rounded-lg bg-primary-muted flex flex-col items-center justify-center text-primary-hover shrink-0 mr-4 shadow-sm">
                      <span className="text-sm font-bold">{new Date(appt.date).getDate()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-foreground truncate">Patient Session</p>
                      <p className="text-sm text-primary/80 font-medium">
                        {appt.time} ({appt.duration} min) · <span className="capitalize">{appt.format}</span>
                      </p>
                    </div>
                    <div className="text-xs font-semibold px-3 py-1.5 bg-primary-muted/50 text-primary-dark rounded-xl">
                      Upcoming
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-primary/70 text-center py-6 font-medium bg-primary-muted/50 rounded-lg">No upcoming sessions.</p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-surface">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-primary-hover/80 p-6 bg-primary-muted/50 rounded-lg text-center font-medium">
                  Your recent appointments and updates will appear here.
                </p>
              </div>
            ) : (
              <div className="text-center py-8 text-primary/70 text-sm font-medium bg-primary-muted/50 rounded-lg">
                No recent activity.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Documents Approved Celebratory Popup Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-primary-dark/65 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity animate-in fade-in duration-200">
          <div className="bg-surface rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-200 animate-in fade-in zoom-in-95 duration-200 relative">
            {/* Celebratory Banner Header */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 p-6 text-white text-center relative overflow-hidden">
              {/* Background Glow Decorations */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={handleDismissApprovalModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Verified Badge Icon */}
              <div className="mx-auto w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-lg mb-3 relative ring-4 ring-emerald-400/40">
                <ShieldCheck className="w-10 h-10" />
                <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 fill-amber-400 animate-pulse" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-bold text-emerald-100 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verification Approved</span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white">
                Documents Approved!
              </h2>
              <p className="text-emerald-100/90 text-sm mt-1 font-medium">
                Your credentials have been successfully verified
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="text-sm text-foreground/90 leading-relaxed">
                <p className="font-semibold text-primary-dark">
                  Dear Dr. {user?.lastName || user?.firstName || 'Doctor'},
                </p>
                <p className="mt-1.5 text-muted-foreground">
                  Our clinical compliance team has reviewed your uploaded verification documents. Your license and credentials have been verified, and your professional practice is now <strong className="text-emerald-700 font-bold">100% active</strong> on WellPath.
                </p>
              </div>

              {/* Features Unlocked List */}
              <div className="bg-primary-muted/20 border border-primary-muted/50 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  What's now active on your account:
                </h4>
                <ul className="space-y-2.5 text-xs text-foreground/90 font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Live Public Profile:</strong> Patients can view your credentials and approach in the specialist directory.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Video className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Direct Booking Enabled:</strong> Patients can book online consultations and in-person sessions with you.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Host Events & Webinars:</strong> Publish paid or free mental health workshops and masterclasses.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Mentorship & Internships:</strong> Post internship opportunities to mentor psychology students.</span>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-2">
                <Button
                  onClick={handleDismissApprovalModal}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-md transition-all hover:shadow-lg text-sm"
                >
                  Awesome, Let's Get Started!
                </Button>

                {user?.id && (
                  <Link
                    to={`/professionals/${user.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                  >
                    <span>Preview My Public Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
