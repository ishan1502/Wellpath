import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getAppointmentsByProfessional } from '@/services/appointmentService';
import { Appointment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth, isSameDay, parseISO, addMonths, subMonths, isToday 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import AvailabilitySlotModal from '@/components/appointment/AvailabilitySlotModal';

// Mock local storage key for availabilities
const AVAILABILITIES_KEY = 'wellpath_mock_availabilities';

export default function CalendarView() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Availability State
  const [availabilities, setAvailabilities] = useState<Record<string, string[]>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    // Load mock availabilities
    const saved = localStorage.getItem(AVAILABILITIES_KEY);
    if (saved) {
      setAvailabilities(JSON.parse(saved));
    }
  }, []);

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

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const handleSaveAvailability = (date: Date, slots: string[]) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const newAvailabilities = { ...availabilities, [dateKey]: slots };
    setAvailabilities(newAvailabilities);
    localStorage.setItem(AVAILABILITIES_KEY, JSON.stringify(newAvailabilities));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-emerald-950 tracking-tight">Calendar</h1>
        <p className="text-emerald-700/80 mt-1 font-medium">Manage your monthly schedule and availability.</p>
      </div>

      <Card className="rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div>
            <CardTitle className="text-xl font-bold text-emerald-950">
              {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4" /> Click any day to manage your availability slots
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={handlePrevMonth} className="p-2 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm text-emerald-700">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={handleNextMonth} className="p-2 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm text-emerald-700">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-[600px] bg-emerald-50 rounded-2xl"></div>
            </div>
          ) : (
            <div>
              {/* Day Names */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center font-bold text-sm text-emerald-800/70 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-3">
                {calendarDays.map((day, idx) => {
                  const dateKey = format(day, 'yyyy-MM-dd');
                  const dayAppointments = appointments.filter((appt) => 
                    appt.date === dateKey
                  );
                  const daySlots = availabilities[dateKey] || [];
                  const isCurrentMonth = isSameMonth(day, currentMonth);

                  return (
                    <div 
                      key={day.toISOString()} 
                      onClick={() => handleDayClick(day)}
                      className={`min-h-[140px] p-3 border rounded-2xl cursor-pointer transition-all duration-300 ${
                        isCurrentMonth 
                          ? 'bg-white border-emerald-100 hover:border-emerald-400 hover:shadow-md' 
                          : 'bg-emerald-50/30 border-emerald-50 text-emerald-600/40'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-xl ${
                          isToday(day) ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-950'
                        }`}>
                          {format(day, 'd')}
                        </span>
                        {daySlots.length > 0 && (
                          <span className="text-[10px] flex items-center text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg font-bold">
                            <Clock className="w-3 h-3 mr-1" /> {daySlots.length} slots
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-1.5">
                        {dayAppointments.slice(0, 3).map(appt => (
                          <div key={appt.id} className="text-[11px] px-2 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl truncate border border-emerald-100/50 font-semibold shadow-sm">
                            {appt.time} - Session
                          </div>
                        ))}
                        {dayAppointments.length > 3 && (
                          <div className="text-[10px] text-emerald-600 font-bold pl-1 mt-1">
                            +{dayAppointments.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AvailabilitySlotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={selectedDate}
        existingSlots={selectedDate ? (availabilities[format(selectedDate, 'yyyy-MM-dd')] || []) : []}
        onSave={handleSaveAvailability}
      />
    </div>
  );
}
