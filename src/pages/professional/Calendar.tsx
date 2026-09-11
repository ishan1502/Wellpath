import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getAppointmentsByProfessional } from '@/services/appointmentService';
import { Appointment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';

export default function CalendarView() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        try {
          const data = await getAppointmentsByProfessional(user.id);
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

  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Calendar</h1>
        <p className="text-gray-500">Manage your weekly schedule.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>This Week</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-64 bg-gray-200 rounded-md"></div>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day) => {
                const dayAppointments = appointments.filter((appt) => 
                  isSameDay(parseISO(appt.date), day)
                );
                return (
                  <div key={day.toISOString()} className="border border-border rounded-lg p-2 min-h-[150px]">
                    <div className="text-center mb-2">
                      <div className="text-xs text-gray-500 font-medium">{format(day, 'EEE')}</div>
                      <div className={`text-lg font-bold ${isSameDay(day, new Date()) ? 'text-primary' : 'text-gray-900'}`}>
                        {format(day, 'd')}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {dayAppointments.map(appt => (
                        <div key={appt.id} className="text-xs p-1 bg-primary/10 text-primary rounded truncate">
                          {appt.time} - {appt.patientId}
                        </div>
                      ))}
                      {dayAppointments.length === 0 && (
                        <div className="text-xs text-gray-400 text-center py-2">No sessions</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
