import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Appointment } from '../../types';
import { Search, Calendar as CalendarIcon, Clock, Video, MapPin } from 'lucide-react';

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    const data = await adminService.getAppointments();
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading appointments...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">System Appointments</h2>
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search appointments..." 
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Participants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Format</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Fee</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {appt.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-foreground">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {new Date(appt.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {appt.time} ({appt.duration} min)
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">Prof: {appt.professionalId}</div>
                  <div className="text-sm text-muted-foreground">Pat: {appt.patientId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-foreground capitalize">
                    {appt.format === 'online' ? (
                      <Video className="w-4 h-4 mr-2 text-blue-500" />
                    ) : (
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                    )}
                    {appt.format}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                    appt.status === 'completed' ? 'bg-green-100 text-green-800' :
                    appt.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    'bg-surface-hover text-foreground'
                  }`}>
                    {appt.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-medium">
                  ₹{appt.fee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
}
