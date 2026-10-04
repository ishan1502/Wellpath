import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Video, Users, Search, CheckCircle, X, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { Event } from '../../types';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ message: string; eventId: string } | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'approved')
        .order('date', { ascending: true });
        
      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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

  const allEvents = events;
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
    <div className="bg-background min-h-screen text-primary-dark">
      <div className="bg-primary-dark text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary-dark/50 blur-3xl"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-dark/50 blur-3xl"></div>
        </div>
        
        {/* Success Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 max-w-sm bg-surface border border-primary-muted rounded-lg shadow-md p-4 flex items-start gap-3 animate-in slide-in-from-right">
            <div className="w-8 h-8 rounded-full bg-primary-muted flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 mt-0.5">
              <p className="text-sm font-bold text-primary-dark">Registered!</p>
              <p className="text-xs text-primary-hover/80 mt-1">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-primary-muted-foreground hover:text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-primary-dark/50 text-primary-muted border border-primary-hover/50 mb-6 shadow-sm backdrop-blur-sm">
            Learn & Grow Together
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Webinars & Events</h1>
          <p className="text-lg text-primary-muted max-w-2xl mx-auto">
            Enhance your knowledge and connect with peers through our professional development events.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Filters */}
        <div className="mb-10 bg-surface p-6 rounded-xl border border-primary-muted shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-muted-foreground" />
            <input
              type="text"
              placeholder="Search events by title or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring/20 focus:border-primary text-sm font-medium transition-all"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 text-primary-dark text-sm font-bold">
              <Calendar className="w-5 h-5 text-primary" />
              <span>From:</span>
            </div>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring/20 focus:border-primary text-sm font-medium w-full sm:w-auto"
            />
            {(dateFilter || searchTerm) && (
              <button
                onClick={() => { setDateFilter(''); setSearchTerm(''); }}
                className="text-sm text-primary font-bold hover:text-primary-dark whitespace-nowrap px-4"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <p className="text-sm font-semibold text-primary-dark/60 mb-8 px-2">
          Showing <span className="text-primary-dark font-bold">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center p-16 text-primary">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p className="font-semibold text-sm">Loading upcoming events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map(event => {
              const isRegistered = registeredEvents.has(event.id);
              const isFull = event.currentAttendees >= event.maxAttendees;

              return (
                <div key={event.id} className="bg-surface border border-primary-muted rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
                  <div className="bg-primary-dark p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-dark rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-primary-dark/80 backdrop-blur-sm text-primary-muted border border-primary-hover/50">
                          {event.platform === 'In-person' ? 'Workshop' : 'Webinar'}
                        </span>
                        <span className="text-lg font-bold text-white bg-primary-dark/80 px-3 py-1 rounded-lg backdrop-blur-sm">
                          {event.fee === 0 ? 'Free' : `₹${event.fee}`}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white leading-snug">{event.title}</h2>
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-primary-dark/70 text-sm leading-relaxed mb-8">{event.description}</p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center text-sm font-medium text-primary-dark">
                          <div className="w-10 h-10 rounded-xl bg-primary-muted flex items-center justify-center mr-4 flex-shrink-0">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex items-center text-sm font-medium text-primary-dark">
                          <div className="w-10 h-10 rounded-xl bg-primary-muted flex items-center justify-center mr-4 flex-shrink-0">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm font-medium text-primary-dark">
                          <div className="w-10 h-10 rounded-xl bg-primary-muted flex items-center justify-center mr-4 flex-shrink-0">
                            <Video className="w-5 h-5 text-primary" />
                          </div>
                          {event.platform}
                        </div>
                        <div className="flex items-center text-sm font-medium text-primary-dark">
                          <div className="w-10 h-10 rounded-xl bg-primary-muted flex items-center justify-center mr-4 flex-shrink-0">
                            <Users className="w-5 h-5 text-primary" />
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
                      className={`w-full py-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                        isRegistered
                          ? 'bg-primary-muted text-primary-dark border border-primary-muted cursor-default shadow-none'
                          : isFull
                          ? 'bg-surface-hover text-gray-400 cursor-not-allowed shadow-none'
                          : 'bg-primary text-white hover:bg-primary-hover hover:shadow-md'
                      }`}
                    >
                      {isRegistered ? <><CheckCircle className="w-5 h-5" /> Registered!</> : isFull ? 'Fully Booked' : 'Register Now'}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 bg-surface border border-primary-muted rounded-xl shadow-sm">
              <div className="w-20 h-20 bg-primary-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-primary-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary-dark">No events found</h3>
              <p className="text-primary-hover/70 mt-2">Try adjusting your search or date filter.</p>
              {(dateFilter || searchTerm) && (
                <button
                  onClick={() => { setDateFilter(''); setSearchTerm(''); }}
                  className="mt-6 px-6 py-2 bg-primary-muted text-primary-dark font-bold rounded-xl hover:bg-primary-muted transition-colors"
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
