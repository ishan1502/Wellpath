import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { appointmentService, getAppointmentsByPatient, cancelAppointment } from '../../services/appointmentService';
import { Appointment } from '../../types';
import { Calendar, Clock, Video, MapPin, AlertCircle, RefreshCw, X } from 'lucide-react';

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  const fetchAppointments = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getAppointmentsByPatient(user.id);
      setAppointments(data);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const handleCancel = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentService.cancelAppointment(id);
        fetchAppointments(); // Refresh the list
      } catch (error) {
        console.error('Failed to cancel appointment:', error);
      }
    }
  };

  const getFilteredAppointments = () => {
    const now = new Date();
    return appointments.filter(apt => {
      const aptDate = new Date(`${apt.date}T${apt.time}`);
      if (activeTab === 'cancelled') return apt.status === 'cancelled';
      if (apt.status === 'cancelled') return false;
      
      if (activeTab === 'upcoming') {
        return aptDate >= now;
      } else {
        return aptDate < now;
      }
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return activeTab === 'upcoming' ? dateA - dateB : dateB - dateA;
    });
  };

  const filteredAppointments = getFilteredAppointments();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin text-emerald-600"><RefreshCw className="w-8 h-8" /></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">Manage your upcoming and past therapy sessions.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-4 px-4 whitespace-nowrap font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'upcoming'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Upcoming Sessions
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`pb-4 px-4 whitespace-nowrap font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'past'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Past Sessions
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`pb-4 px-4 whitespace-nowrap font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'cancelled'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Appointment List */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No {activeTab} appointments</h3>
          <p className="text-gray-500">
            {activeTab === 'upcoming' 
              ? "You don't have any upcoming sessions scheduled." 
              : `You have no ${activeTab} sessions in your history.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-lg flex-shrink-0">
                    {apt.professionalId.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{apt.professionalId}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                        {new Date(apt.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                        {apt.time}
                      </div>
                      <div className="flex items-center">
                        {apt.format === 'online' ? (
                          <><Video className="w-4 h-4 mr-1.5 text-gray-400" /> Video Call</>
                        ) : (
                          <><MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> In Person</>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:border-l border-gray-100 md:pl-6">
                  {activeTab === 'upcoming' && (
                    <>
                      <button 
                        className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                        onClick={() => alert('Reschedule functionality coming soon!')}
                      >
                        Reschedule
                      </button>
                      <button 
                        onClick={() => handleCancel(apt.id)}
                        className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </button>
                    </>
                  )}
                  {activeTab === 'past' && (
                    <button className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                      Book Again
                    </button>
                  )}
                  {activeTab === 'cancelled' && (
                    <span className="flex items-center text-sm font-medium text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      Cancelled
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
