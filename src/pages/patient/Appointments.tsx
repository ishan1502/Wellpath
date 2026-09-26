import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getAppointmentsByPatient } from '../../services/appointmentService';
import { appointmentService } from '../../services/appointmentService';
import { Appointment } from '../../types';
import { Calendar, Clock, Video, MapPin, AlertCircle, RefreshCw, X, MessageCircle, ExternalLink } from 'lucide-react';
import { generateGoogleCalendarLink } from '../../utils/googleCalendar';
import { generateSessionLink } from '../../utils/sessionLinks';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { mockProfessionals } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const toGCalDate = (d: Date) =>
  d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') ;

const Appointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCancel = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentService.cancelAppointment(id);
        fetchAppointments();
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
      return activeTab === 'upcoming' ? aptDate >= now : aptDate < now;
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return activeTab === 'upcoming' ? dateA - dateB : dateB - dateA;
    });
  };

  const getProfessionalName = (professionalId: string) => {
    const prof = mockProfessionals.find(p => p.id === professionalId);
    return prof ? `Dr. ${prof.firstName} ${prof.lastName}` : professionalId;
  };

  const getProfessionalPhone = (professionalId: string) => {
    const prof = mockProfessionals.find(p => p.id === professionalId);
    return prof?.phone || '919800000000';
  };

  const filteredAppointments = getFilteredAppointments();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin text-emerald-600"><RefreshCw className="w-10 h-10" /></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in font-sans text-emerald-900">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">My Appointments</h1>
        <p className="text-emerald-700/80 font-medium mt-1">Manage your upcoming and past therapy sessions.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white rounded-2xl w-fit border border-gray-100 shadow-sm overflow-x-auto">
        {(['upcoming', 'past', 'cancelled'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 whitespace-nowrap font-bold text-sm transition-all rounded-xl capitalize ${
              activeTab === tab
                ? 'bg-emerald-50 text-emerald-900 shadow-sm'
                : 'bg-transparent text-emerald-700/60 hover:text-emerald-900 hover:bg-gray-50'
            }`}
          >
            {tab === 'upcoming' ? 'Upcoming Sessions' : tab === 'past' ? 'Past Sessions' : 'Cancelled'}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-16 text-center">
          <Calendar className="w-20 h-20 text-emerald-100 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-emerald-900 mb-3">No {activeTab} appointments</h3>
          <p className="text-emerald-700/70 font-medium">
            {activeTab === 'upcoming'
              ? "You don't have any upcoming sessions scheduled."
              : `You have no ${activeTab} sessions in your history.`}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAppointments.map((apt) => {
            const aptDateObj = new Date(`${apt.date}T${apt.time}`);
            const endAptDateObj = new Date(aptDateObj.getTime() + apt.duration * 60000);
            const profName = getProfessionalName(apt.professionalId);
            const profPhone = getProfessionalPhone(apt.professionalId);

            const gcalLink = generateGoogleCalendarLink(
              `Therapy Session with ${profName}`,
              'Therapy session booked via Wellpath',
              apt.format === 'online' ? 'Online (Video Call)' : 'In-person Clinic',
              toGCalDate(aptDateObj),
              toGCalDate(endAptDateObj)
            );

            const sessionLink = generateSessionLink('meet', apt.id.substring(0, 10));
            const whatsappLink = generateWhatsAppLink(profPhone, `Hi ${profName}, I wanted to confirm my upcoming appointment on ${new Date(apt.date).toLocaleDateString()} at ${apt.time}. Looking forward to our session!`);

            return (
              <div key={apt.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-900 font-extrabold text-2xl flex-shrink-0 border border-emerald-100 shadow-sm">
                      {profName.replace('Dr. ', '').charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3">{profName}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-emerald-900 font-medium mb-5">
                        <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                          <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                          {new Date(apt.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                          <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                          {apt.time} ({apt.duration} min)
                        </div>
                        <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                          {apt.format === 'online' ? (
                            <><Video className="w-4 h-4 mr-2 text-emerald-600" /> Video Call</>
                          ) : (
                            <><MapPin className="w-4 h-4 mr-2 text-emerald-600" /> In Person</>
                          )}
                        </div>
                      </div>

                      {activeTab === 'upcoming' && (
                        <div className="flex flex-wrap gap-3 mt-2">
                          <a href={gcalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors shadow-sm">
                            <Calendar className="w-4 h-4 mr-1.5" /> Add to Calendar
                          </a>
                          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-green-700 bg-green-50 px-4 py-2 rounded-xl hover:bg-green-100 transition-colors shadow-sm">
                            <MessageCircle className="w-4 h-4 mr-1.5" /> WhatsApp Pro
                          </a>
                          {apt.format === 'online' && (
                            <a href={sessionLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-white bg-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm">
                              <ExternalLink className="w-4 h-4 mr-1.5" /> Join Session
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:flex-col lg:flex-row md:border-l border-gray-100 md:pl-8">
                    {activeTab === 'upcoming' && (
                      <>
                        <button
                          className="px-5 py-3 text-sm font-bold text-emerald-900 bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-colors shadow-sm whitespace-nowrap"
                          onClick={() => navigate(`/patient/professionals/${apt.professionalId}`)}
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="px-5 py-3 text-sm font-bold text-red-700 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors flex items-center shadow-sm whitespace-nowrap"
                        >
                          <X className="w-4 h-4 mr-1.5" /> Cancel
                        </button>
                      </>
                    )}
                    {activeTab === 'past' && (
                      <button
                        className="px-5 py-3 text-sm font-bold text-emerald-900 bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-colors shadow-sm"
                        onClick={() => navigate(`/patient/professionals/${apt.professionalId}`)}
                      >
                        Book Again
                      </button>
                    )}
                    {activeTab === 'cancelled' && (
                      <span className="flex items-center text-sm font-bold text-red-600 bg-red-50 px-4 py-2 rounded-xl">
                        <AlertCircle className="w-4 h-4 mr-2" /> Cancelled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Appointments;
