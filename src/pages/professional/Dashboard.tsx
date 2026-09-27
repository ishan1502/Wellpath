import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getProfessionalById, uploadVerificationDocument } from '@/services/professionalService';
import { getAppointmentsByProfessional } from '@/services/appointmentService';
import { Professional, Appointment } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Users, Calendar as CalendarIcon, DollarSign, TrendingUp, Star, AlertCircle, Upload, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ProfessionalDashboard() {
  const { user } = useAuth();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // File upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const prof = await getProfessionalById(user.id);
        if (prof) setProfessional(prof);

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
      <div>
        <h1 className="text-3xl font-bold text-primary-dark tracking-tight">Welcome, Dr. {user?.lastName || user?.firstName}</h1>
        <p className="text-primary-hover/80 mt-1">Here's what's happening with your practice today.</p>
      </div>

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
              <DollarSign className="h-5 w-5 text-primary" />
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
    </div>
  );
}
