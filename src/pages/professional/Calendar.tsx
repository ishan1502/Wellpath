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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Calendar</h1>
        <p className="text-gray-500">Manage your monthly schedule and availability.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg font-bold">
              {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Click any day to manage your availability slots
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrevMonth} className="p-2 border border-gray-200 rounded-md hover:bg-gray-50">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={handleNextMonth} className="p-2 border border-gray-200 rounded-md hover:bg-gray-50">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-[600px] bg-gray-200 rounded-md"></div>
            </div>
          ) : (
            <div>
              {/* Day Names */}
              <div className="grid grid-cols-7 gap-px mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center font-medium text-sm text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, idx) => {
                  const dateKey = format(day, 'yyyy-MM-dd');
                  const dayAppointments = appointments.filter((appt) => 
                    isSameDay(parseISO(appt.date), day)
                  );
                  const daySlots = availabilities[dateKey] || [];
                  const isCurrentMonth = isSameMonth(day, currentMonth);

                  return (
                    <div 
                      key={day.toISOString()} 
                      onClick={() => handleDayClick(day)}
                      className={`min-h-[120px] p-2 border rounded-lg cursor-pointer transition-colors ${
                        isCurrentMonth ? 'bg-white border-gray-200 hover:border-primary' : 'bg-gray-50 border-gray-100 text-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${
                          isToday(day) ? 'bg-primary text-white' : ''
                        }`}>
                          {format(day, 'd')}
                        </span>
                        {daySlots.length > 0 && (
                          <span className="text-[10px] flex items-center text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                            <Clock className="w-3 h-3 mr-1" /> {daySlots.length} slots
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        {dayAppointments.slice(0, 3).map(appt => (
                          <div key={appt.id} className="text-[11px] px-1.5 py-1 bg-blue-50 text-blue-700 rounded truncate border border-blue-100">
                            {appt.time} - {appt.patientId.substring(0, 8)}...
                          </div>
                        ))}
                        {dayAppointments.length > 3 && (
                          <div className="text-[10px] text-gray-500 font-medium pl-1">
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
