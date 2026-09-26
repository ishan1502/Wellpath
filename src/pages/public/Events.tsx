import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Video, Users, Search, CheckCircle, X } from 'lucide-react';
import { mockEvents } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

const defaultEvents: any[] = [
  {
    id: 'evt-1',
    title: 'Mindfulness & Cognitive Restructuring for Anxiety',
    description: 'An interactive 90-minute clinical workshop on practical CBT techniques to break worry loops and build emotional resilience.',
    date: '2026-10-05',
    time: '18:00 - 19:30',
    platform: 'Zoom Telehealth',
    speaker: 'Dr. Sarah Jenkins (Clinical Psychologist)',
    attendees: 42,
    maxAttendees: 100,
    price: 'Free Community Event',
    tags: ['Anxiety', 'CBT', 'Workshop']
  },
  {
    id: 'evt-2',
    title: 'Burnout Recovery & Work-Life Boundary Architecture',
    description: 'Designed for healthcare practitioners, educators, and tech workers navigating chronic workplace fatigue and occupational exhaustion.',
    date: '2026-10-12',
    time: '19:00 - 20:30',
    platform: 'Google Meet',
    speaker: 'Dr. Marcus Vance (Psychiatrist)',
    attendees: 78,
    maxAttendees: 150,
    price: '$15 General / Free for Students',
    tags: ['Burnout', 'Workplace Wellness', 'Webinar']
  },
  {
    id: 'evt-3',
    title: 'Navigating Neurodivergence: ADHD & Adult Executive Function',
    description: 'Strategies for managing attention, motivation, and time perception with practical behavioral scaffolding.',
    date: '2026-10-20',
    time: '17:30 - 19:00',
    platform: 'Zoom Telehealth',
    speaker: 'Elena Rostova, LMFT',
    attendees: 95,
    maxAttendees: 100,
    price: 'Free Community Event',
    tags: ['ADHD', 'Neurodivergence', 'Executive Function']
  }
];

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

  const allEvents = mockEvents.length > 0 ? mockEvents : defaultEvents;
  const filteredEvents = allEvents.filter(event => {
    const matchesDate = !dateFilter || event.date >= dateFilter;
    const matchesSearch =
      !searchTerm ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.platform.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen text-emerald-900">
      <div className="bg-emerald-900 text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-800/50 blur-3xl"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-950/50 blur-3xl"></div>
        </div>
        
        {/* Success Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 max-w-sm bg-white border border-emerald-200 rounded-2xl shadow-xl p-4 flex items-start gap-3 animate-in slide-in-from-right">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 mt-0.5">
              <p className="text-sm font-bold text-emerald-900">Registered!</p>
              <p className="text-xs text-emerald-700/80 mt-1">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-emerald-400 hover:text-emerald-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-800/50 text-emerald-100 border border-emerald-700/50 mb-6 shadow-sm backdrop-blur-sm">
            Learn & Grow Together
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Webinars & Events</h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Enhance your knowledge and connect with peers through our professional development events.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Filters */}
        <div className="mb-10 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
            <input
              type="text"
              placeholder="Search events by title or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium transition-all"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 text-emerald-800 text-sm font-bold">
              <Calendar className="w-5 h-5 text-emerald-500" />
              <span>From:</span>
            </div>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium w-full sm:w-auto"
            />
            {(dateFilter || searchTerm) && (
              <button
                onClick={() => { setDateFilter(''); setSearchTerm(''); }}
                className="text-sm text-emerald-600 font-bold hover:text-emerald-800 whitespace-nowrap px-4"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <p className="text-sm font-semibold text-emerald-800/60 mb-8 px-2">
          Showing <span className="text-emerald-900 font-bold">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => {
              const isRegistered = registeredEvents.has(event.id);
              const isFull = event.currentAttendees >= event.maxAttendees;

              return (
                <div key={event.id} className="bg-white border border-emerald-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="bg-emerald-900 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-emerald-800/80 backdrop-blur-sm text-emerald-200 border border-emerald-700/50">
                          {event.platform === 'In-person' ? 'Workshop' : 'Webinar'}
                        </span>
                        <span className="text-lg font-bold text-white bg-emerald-800/80 px-3 py-1 rounded-lg backdrop-blur-sm">
                          {event.price || 'Free'}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white leading-snug">{event.title}</h2>
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-emerald-800/70 text-sm leading-relaxed mb-8">{event.description}</p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center text-sm font-medium text-emerald-900">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mr-4 flex-shrink-0">
                            <Calendar className="w-5 h-5 text-emerald-600" />
                          </div>
                          {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex items-center text-sm font-medium text-emerald-900">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mr-4 flex-shrink-0">
                            <Clock className="w-5 h-5 text-emerald-600" />
                          </div>
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm font-medium text-emerald-900">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mr-4 flex-shrink-0">
                            <Video className="w-5 h-5 text-emerald-600" />
                          </div>
                          {event.platform}
                        </div>
                        <div className="flex items-center text-sm font-medium text-emerald-900">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mr-4 flex-shrink-0">
                            <Users className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            {event.currentAttendees} / {event.maxAttendees} Attendees
                            {isFull && <span className="ml-2 text-red-500 font-bold text-xs bg-red-50 px-2 py-1 rounded-md">Full</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRegister(event.id, event.title)}
                      disabled={isFull || isRegistered}
                      className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                        isRegistered
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default shadow-none'
                          : isFull
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md'
                      }`}
                    >
                      {isRegistered ? <><CheckCircle className="w-5 h-5" /> Registered!</> : isFull ? 'Fully Booked' : 'Register Now'}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 bg-white border border-emerald-100 rounded-3xl shadow-sm">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-emerald-300" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900">No events found</h3>
              <p className="text-emerald-700/70 mt-2">Try adjusting your search or date filter.</p>
              {(dateFilter || searchTerm) && (
                <button
                  onClick={() => { setDateFilter(''); setSearchTerm(''); }}
                  className="mt-6 px-6 py-2 bg-emerald-100 text-emerald-800 font-bold rounded-xl hover:bg-emerald-200 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
