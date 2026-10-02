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
    <div className="space-y-8 animate-fade-in font-sans text-primary-dark">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Good morning, {user?.firstName}</h1>
        <p className="text-primary-hover/80 font-medium mt-1">Here's an overview of your mental health journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Next Session Card */}
        <div className="md:col-span-2 lg:col-span-1 flex flex-col">
          <Card className="h-full border-0 bg-primary-dark shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden flex flex-col text-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-white font-bold">Your next session</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              {loading ? (
                <div className="animate-pulse flex space-x-6">
                  <div className="rounded-lg bg-surface/20 h-20 w-20"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-surface/20 rounded-full w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-surface/20 rounded-full"></div>
                      <div className="h-4 bg-surface/20 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </div>
              ) : nextAppointment ? (
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="h-24 w-24 rounded-lg bg-surface/10 border border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    <User className="h-12 w-12 text-white/80" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">
                      Dr. {nextAppointment.professional?.firstName} {nextAppointment.professional?.lastName}
                    </h3>
                    <p className="text-primary-muted font-medium mb-5">{nextAppointment.professional?.type}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center text-primary-dark bg-surface px-4 py-2 rounded-lg font-bold shadow-sm">
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        {format(new Date(nextAppointment.date), 'EEE, MMM d, yyyy')}
                      </div>
                      <div className="flex items-center text-primary-dark bg-surface px-4 py-2 rounded-lg font-bold shadow-sm">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        {nextAppointment.time}
                      </div>
                      <div className="flex items-center text-primary-dark bg-surface px-4 py-2 rounded-lg font-bold shadow-sm capitalize">
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
                <div className="py-10 text-center">
                  <p className="text-primary-muted mb-6 font-medium text-lg">You don't have any upcoming sessions.</p>
                  <Button onClick={() => navigate('/patient/find-professional')} className="bg-surface text-primary-dark hover:bg-primary-muted rounded-lg font-bold px-8 py-6 h-auto">Find a Professional</Button>
                </div>
              )}
            </CardContent>
            {nextAppointment && (
              <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6 bg-surface/5 border-t border-white/10">
                <Button className="w-full sm:w-auto bg-surface text-primary-dark hover:bg-primary-muted rounded-lg font-bold px-8">Join Session</Button>
                <Button variant="outline" className="w-full sm:w-auto text-white border-white/30 hover:bg-surface/10 rounded-lg font-bold" onClick={() => handleCancel(nextAppointment.id)}>Cancel Session</Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {/* Quick Actions / Status */}
        <div className="flex flex-col gap-8">
          <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl bg-surface overflow-hidden flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-50 bg-background/50">
              <CardTitle className="text-lg font-bold text-primary-dark">Explore matching</CardTitle>
              <CardDescription className="text-primary-hover/70 font-medium mt-1">Not sure who to choose?</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col justify-center">
              <p className="text-sm text-primary-dark/80 mb-6 font-medium leading-relaxed">Take our matching quiz to find professionals tailored exactly to your needs and preferences.</p>
              <Button variant="outline" className="w-full rounded-lg border-primary-muted text-primary-dark hover:bg-primary-muted hover:border-primary-muted-foreground font-bold py-6 h-auto transition-all duration-300" onClick={() => navigate('/patient/matching')}>Take the Quiz</Button>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl bg-surface overflow-hidden flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-50 bg-background/50">
              <CardTitle className="text-lg font-bold flex justify-between items-center text-primary-dark">
                Saved Professionals
                <Link to="/patient/saved" className="text-sm font-bold text-primary hover:text-primary-hover transition-colors flex items-center bg-primary-muted px-3 py-1 rounded-xl">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex-grow flex flex-col justify-center text-center">
              <div className="text-sm text-primary-dark/60 font-medium bg-background rounded-lg p-6 border border-gray-100 border-dashed">
                No saved professionals yet. Browse our directory to find the right fit for you.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
