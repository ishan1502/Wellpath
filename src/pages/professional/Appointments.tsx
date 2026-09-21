import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getAppointmentsByProfessional } from '@/services/appointmentService';
import { Appointment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar as CalendarIcon, Clock, Video, User, MessageCircle, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { generateGoogleCalendarLink } from '@/utils/googleCalendar';
import { generateSessionLink } from '@/utils/sessionLinks';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import { mockUsers } from '@/data/mockData';

const toGCalDate = (d: Date) =>
  d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        try {
          const data = await getAppointmentsByProfessional(user.id);
          data.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
          setAppointments(data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAppointments();
  }, [user]);

  const getPatientName = (patientId: string) => {
    const patient = mockUsers.find(u => u.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : `Patient #${patientId}`;
  };

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
              {appointments.map(appt => {
                const aptDateObj = new Date(`${appt.date}T${appt.time}`);
                const endAptDateObj = new Date(aptDateObj.getTime() + appt.duration * 60000);
                const patientName = getPatientName(appt.patientId);

                const gcalLink = generateGoogleCalendarLink(
                  `Session with ${patientName} (Wellpath)`,
                  `Therapy session with patient: ${patientName}`,
                  appt.format === 'online' ? 'Online (Video Call)' : 'In-person Clinic',
                  toGCalDate(aptDateObj),
                  toGCalDate(endAptDateObj)
                );

                const sessionLink = generateSessionLink('meet', appt.id.substring(0, 10));
                const whatsappLink = generateWhatsAppLink('919876543210', `Hi ${patientName}, I am confirming our therapy session on ${appt.date} at ${appt.time}. See you then!`);

                return (
                  <div key={appt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center mb-3 sm:mb-0">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{patientName}</h3>
                        <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3 mb-2">
                          <span className="flex items-center"><CalendarIcon className="h-3 w-3 mr-1" /> {format(parseISO(appt.date), 'MMM d, yyyy')}</span>
                          <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {appt.time} ({appt.duration} min)</span>
                          <span className="flex items-center capitalize"><Video className="h-3 w-3 mr-1" /> {appt.format}</span>
                        </div>

                        {appt.status === 'upcoming' && (
                          <div className="flex flex-wrap gap-2">
                            <a href={gcalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors">
                              <CalendarIcon className="w-3 h-3 mr-1" /> Calendar
                            </a>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[10px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded hover:bg-green-100 transition-colors">
                              <MessageCircle className="w-3 h-3 mr-1" /> WhatsApp
                            </a>
                          </div>
                        )}
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
                      {appt.status === 'upcoming' && appt.format === 'online' && (
                        <a
                          href={sessionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> Join Call
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
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
