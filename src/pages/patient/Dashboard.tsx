import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getAppointmentsByPatient, cancelAppointment } from '@/services/appointmentService';
import { Appointment, Professional } from '@/types';
import { getProfessionalById } from '@/services/professionalService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, Video, User, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<(Appointment & { professional?: Professional })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const appts = await getAppointmentsByPatient(user.id);
        const upcomingAppts = appts.filter(a => a.status === 'upcoming');
        
        // Fetch professional info for each appointment
        const enrichedAppts = await Promise.all(upcomingAppts.map(async (appt) => {
          const prof = await getProfessionalById(appt.professionalId);
          return { ...appt, professional: prof };
        }));
        
        // Sort by date
        enrichedAppts.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
        setAppointments(enrichedAppts);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleCancel = async (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      await cancelAppointment(id);
      setAppointments(prev => prev.filter(a => a.id !== id));
    }
  };

  const nextAppointment = appointments.length > 0 ? appointments[0] : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Good morning, {user?.firstName}</h1>
        <p className="text-gray-500">Here's an overview of your mental health journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Session Card */}
        <div className="md:col-span-2">
          <Card className="h-full border-primary/20 bg-primary/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Your next session</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-primary/20 h-16 w-16"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-primary/20 rounded"></div>
                      <div className="h-4 bg-primary/20 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ) : nextAppointment ? (
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="h-20 w-20 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden shrink-0">
                    <User className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      Dr. {nextAppointment.professional?.firstName} {nextAppointment.professional?.lastName}
                    </h3>
                    <p className="text-text-muted mb-4">{nextAppointment.professional?.type}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-text-main bg-white px-3 py-1.5 rounded-md border border-border">
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        {format(new Date(nextAppointment.date), 'EEEE, MMMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-text-main bg-white px-3 py-1.5 rounded-md border border-border">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        {nextAppointment.time}
                      </div>
                      <div className="flex items-center text-text-main bg-white px-3 py-1.5 rounded-md border border-border capitalize">
                        {nextAppointment.format === 'online' ? (
                          <Video className="mr-2 h-4 w-4 text-primary" />
                        ) : (
                          <User className="mr-2 h-4 w-4 text-primary" />
                        )}
                        {nextAppointment.format}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-text-muted mb-4">You don't have any upcoming sessions.</p>
                  <Button onClick={() => navigate('/find-professional')}>Find a Professional</Button>
                </div>
              )}
            </CardContent>
            {nextAppointment && (
              <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary-hover">Join Session</Button>
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleCancel(nextAppointment.id)}>Cancel Session</Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {/* Quick Actions / Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-md">Explore matching</CardTitle>
              <CardDescription>Not sure who to choose?</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted mb-4">Take our matching quiz to find professionals tailored to your needs.</p>
              <Button variant="outline" className="w-full" onClick={() => navigate('/patient/matching')}>Take the Quiz</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-md flex justify-between items-center">
                Saved Professionals
                <Link to="/patient/saved" className="text-sm font-normal text-primary hover:underline flex items-center">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-text-muted py-2">
                No saved professionals yet. Browse our directory to find the right fit for you.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
