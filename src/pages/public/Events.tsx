import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Video, Users, Search, CheckCircle, X } from 'lucide-react';
import { mockEvents } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

const Events = () => {
  const [dateFilter, setDateFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ message: string; eventId: string } | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const showToast = (message: string, eventId: string) => {
    setToast({ message, eventId });
    setTimeout(() => setToast(null), 4000);
  };

  const handleRegister = (eventId: string, eventTitle: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setRegisteredEvents(prev => new Set([...prev, eventId]));
    showToast(`You're registered for "${eventTitle}"! Check your email for details.`, eventId);
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesDate = !dateFilter || event.date >= dateFilter;
    const matchesSearch =
      !searchTerm ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.platform.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 max-w-sm bg-white border border-emerald-200 rounded-xl shadow-xl p-4 flex items-start gap-3 animate-in slide-in-from-right">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Registered!</p>
            <p className="text-xs text-gray-600 mt-0.5">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Webinars & Events</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Enhance your knowledge and connect with peers through our professional development events.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events by title or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>From:</span>
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />
          {(dateFilter || searchTerm) && (
            <button
              onClick={() => { setDateFilter(''); setSearchTerm(''); }}
              className="text-xs text-emerald-600 font-medium hover:underline whitespace-nowrap"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Showing <span className="font-semibold text-gray-900">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => {
            const isRegistered = registeredEvents.has(event.id);
            const isFull = event.currentAttendees >= event.maxAttendees;

            return (
              <div key={event.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="bg-emerald-50 p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {event.platform === 'In-person' ? 'Workshop' : 'Webinar'}
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                      {event.fee === 0 ? 'Free' : `₹${event.fee}`}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{event.title}</h2>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">{event.description}</p>

                    <div className="space-y-2.5 mb-6">
                      <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0" />
                        {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Clock className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Video className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0" />
                        {event.platform}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Users className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0" />
                        <span>
                          {event.currentAttendees} / {event.maxAttendees} Attendees
                          {isFull && <span className="ml-2 text-red-500 font-medium text-xs">Full</span>}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegister(event.id, event.title)}
                    disabled={isFull || isRegistered}
                    className={`w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      isRegistered
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : isFull
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {isRegistered ? <><CheckCircle className="w-4 h-4" /> Registered!</> : isFull ? 'Fully Booked' : 'Register Now'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 bg-white border border-gray-200 rounded-xl">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No events found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or date filter.</p>
            {(dateFilter || searchTerm) && (
              <button
                onClick={() => { setDateFilter(''); setSearchTerm(''); }}
                className="mt-4 text-emerald-600 font-medium hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
