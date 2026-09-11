import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getAppointmentsByProfessional } from '@/services/appointmentService';
import { Appointment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar as CalendarIcon, Clock, Video, User } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        try {
          const data = await getAppointmentsByProfessional(user.id);
          // Sort by date and time
          data.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
          setAppointments(data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAppointments();
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Appointments</h1>
        <p className="text-gray-500">View all your upcoming and past appointments.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map(appt => (
                <div key={appt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center mb-3 sm:mb-0">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Patient ID: {appt.patientId}</h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                        <span className="flex items-center"><CalendarIcon className="h-3 w-3 mr-1" /> {format(parseISO(appt.date), 'MMM d, yyyy')}</span>
                        <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {appt.time} ({appt.duration} min)</span>
                        <span className="flex items-center capitalize"><Video className="h-3 w-3 mr-1" /> {appt.format}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
                      appt.status === 'completed' ? 'bg-green-100 text-green-700' :
                      appt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {appt.status}
                    </span>
                    {appt.status === 'upcoming' && (
                      <button className="px-3 py-1 bg-primary text-white text-xs font-medium rounded hover:bg-primary-dark transition">
                        Join Call
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <CalendarIcon className="h-10 w-10 mx-auto text-gray-300 mb-3" />
              <p>No appointments found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
