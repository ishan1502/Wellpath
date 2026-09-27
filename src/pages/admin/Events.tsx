import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Video, Users, User, PlusCircle } from 'lucide-react';

const mockPendingEvents = [
  {
    id: 'e1',
    professionalId: 'p1',
    professionalName: 'Dr. Sarah Jenkins',
    title: 'Coping with Anxiety in the Workplace',
    type: 'webinar',
    date: '2023-11-15',
    time: '18:00',
    platform: 'Zoom',
    maxAttendees: 50,
    fee: 0,
    status: 'pending'
  }
];

const mockAdminEvents = [
  {
    id: 'a1',
    hostType: 'admin',
    title: 'Wellpath Community Guidelines 2024',
    type: 'event',
    date: '2023-12-01',
    time: '12:00',
    platform: 'Google Meet',
    maxAttendees: 200,
    currentAttendees: 120,
    status: 'approved'
  }
];

export default function AdminEvents() {
  const [activeTab, setActiveTab] = useState<'pending' | 'admin'>('pending');
  const [pendingEvents, setPendingEvents] = useState<any[]>([]);
  const [adminEvents, setAdminEvents] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  
  React.useEffect(() => {
    const stored = localStorage.getItem('wellpath_events');
    if (stored) {
      const allEvents = JSON.parse(stored);
      setPendingEvents(allEvents.filter((e: any) => e.status === 'pending'));
      setAdminEvents(allEvents.filter((e: any) => e.status === 'approved' || e.hostType === 'admin'));
    }
  }, []);

  const saveEvents = (updatedEvents: any[]) => {
    localStorage.setItem('wellpath_events', JSON.stringify(updatedEvents));
    setPendingEvents(updatedEvents.filter((e: any) => e.status === 'pending'));
    setAdminEvents(updatedEvents.filter((e: any) => e.status === 'approved' || e.hostType === 'admin'));
  };

  // New Event Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'webinar',
    platform: 'Zoom',
    maxAttendees: ''
  });

  const handleApprove = (id: string) => {
    const stored = localStorage.getItem('wellpath_events');
    const allEvents = stored ? JSON.parse(stored) : [];
    const updated = allEvents.map((e: any) => e.id === id ? { ...e, status: 'approved' } : e);
    saveEvents(updated);
  };

  const handleReject = (id: string) => {
    const stored = localStorage.getItem('wellpath_events');
    const allEvents = stored ? JSON.parse(stored) : [];
    const updated = allEvents.filter((e: any) => e.id !== id);
    saveEvents(updated);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      hostType: 'admin',
      title: formData.title,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      platform: formData.platform,
      maxAttendees: Number(formData.maxAttendees),
      currentAttendees: 0,
      status: 'approved'
    };
    setAdminEvents([newEvent, ...adminEvents]);
    setIsCreating(false);
    setFormData({ title: '', description: '', date: '', time: '', type: 'webinar', platform: 'Zoom', maxAttendees: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Events & Webinars</h1>
          <p className="text-primary-hover font-medium mt-1">Manage platform events and review professional submissions.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-sm hover:shadow-md transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Host Event
        </button>
      </div>

      {isCreating ? (
        <div className="bg-surface p-8 rounded-xl border border-primary-muted shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Create Admin Event</h2>
            <button onClick={() => setIsCreating(false)} className="text-primary-muted-foreground hover:text-primary bg-primary-muted p-2 rounded-xl transition-colors">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleCreateEvent} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-primary-dark mb-2">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-primary-muted/50 border border-primary-muted rounded-xl focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all font-medium text-foreground placeholder-emerald-300" placeholder="Event Title" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-dark mb-2">Event Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-3 bg-primary-muted/50 border border-primary-muted rounded-xl focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all font-medium text-foreground">
                  <option value="webinar">Webinar</option>
                  <option value="workshop">Workshop</option>
                  <option value="event">Community Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-dark mb-2">Date</label>
                <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-3 bg-primary-muted/50 border border-primary-muted rounded-xl focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all font-medium text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-dark mb-2">Time</label>
                <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full p-3 bg-primary-muted/50 border border-primary-muted rounded-xl focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all font-medium text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-dark mb-2">Platform</label>
                <select value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} className="w-full p-3 bg-primary-muted/50 border border-primary-muted rounded-xl focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all font-medium text-foreground">
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-dark mb-2">Max Attendees</label>
                <input required type="number" value={formData.maxAttendees} onChange={e => setFormData({...formData, maxAttendees: e.target.value})} className="w-full p-3 bg-primary-muted/50 border border-primary-muted rounded-xl focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all font-medium text-foreground placeholder-emerald-300" placeholder="Capacity" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-primary-dark mb-2">Description</label>
              <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-primary-muted/50 border border-primary-muted rounded-xl focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all font-medium text-foreground placeholder-emerald-300" placeholder="Event details..." />
            </div>
            <div className="flex justify-end gap-4 pt-6">
              <button type="button" onClick={() => setIsCreating(false)} className="px-6 py-2.5 bg-primary-muted text-primary-hover font-bold rounded-xl hover:bg-primary-muted transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-sm hover:shadow-md transition-all">Create Event</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-primary-muted shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
          <div className="flex border-b border-primary-muted bg-primary-muted/30">
            <button
              className={`flex-1 py-5 text-sm font-bold transition-colors ${activeTab === 'pending' ? 'text-primary-hover border-b-2 border-primary bg-surface' : 'text-primary hover:text-primary-dark hover:bg-primary-muted/50'}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Approvals <span className="ml-2 bg-primary-muted text-primary-dark py-1 px-2.5 rounded-xl">{pendingEvents.length}</span>
            </button>
            <button
              className={`flex-1 py-5 text-sm font-bold transition-colors ${activeTab === 'admin' ? 'text-primary-hover border-b-2 border-primary bg-surface' : 'text-primary hover:text-primary-dark hover:bg-primary-muted/50'}`}
              onClick={() => setActiveTab('admin')}
            >
              Admin Hosted
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'pending' ? (
              pendingEvents.length > 0 ? (
                <div className="space-y-4">
                  {pendingEvents.map((event) => (
                    <div key={event.id} className="border border-primary-muted bg-primary-muted/30 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:bg-primary-muted/60 transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-amber-100 text-amber-800 text-[10px] px-3 py-1 rounded-xl uppercase tracking-widest font-bold">{event.type}</span>
                          <h3 className="font-extrabold text-foreground text-lg">{event.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm font-medium text-primary-hover">
                          <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-primary-muted shadow-sm"><User className="w-4 h-4 text-primary" /> {event.professionalName}</div>
                          <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-primary-muted shadow-sm"><Calendar className="w-4 h-4 text-primary" /> {event.date}</div>
                          <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-primary-muted shadow-sm"><Clock className="w-4 h-4 text-primary" /> {event.time}</div>
                          <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-primary-muted shadow-sm"><Video className="w-4 h-4 text-primary" /> {event.platform}</div>
                        </div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button onClick={() => handleApprove(event.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-sm transition-all">
                          <CheckCircle className="w-5 h-5" /> Approve
                        </button>
                        <button onClick={() => handleReject(event.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 shadow-sm transition-all">
                          <XCircle className="w-5 h-5" /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="h-16 w-16 bg-primary-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary-muted-foreground" />
                  </div>
                  <p className="text-lg font-bold text-foreground">No events pending</p>
                  <p className="text-primary font-medium mt-1">All event submissions have been reviewed.</p>
                </div>
              )
            ) : (
              adminEvents.length > 0 ? (
                <div className="space-y-4">
                  {adminEvents.map((event) => (
                    <div key={event.id} className="border border-primary-muted bg-primary-muted/30 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:bg-primary-muted/60 transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-primary-muted text-primary-dark text-[10px] px-3 py-1 rounded-xl uppercase tracking-widest font-bold">{event.type}</span>
                          <h3 className="font-extrabold text-foreground text-lg">{event.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm font-medium text-primary-hover">
                          <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-primary-muted shadow-sm"><Calendar className="w-4 h-4 text-primary" /> {event.date}</div>
                          <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-primary-muted shadow-sm"><Clock className="w-4 h-4 text-primary" /> {event.time}</div>
                          <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-primary-muted shadow-sm"><Users className="w-4 h-4 text-primary" /> {event.currentAttendees}/{event.maxAttendees}</div>
                        </div>
                      </div>
                      <button className="text-sm font-bold text-primary hover:text-primary-dark bg-surface border border-primary-muted px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all mt-4 md:mt-0">Manage Event</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="h-16 w-16 bg-primary-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-primary-muted-foreground" />
                  </div>
                  <p className="text-lg font-bold text-foreground">No admin events</p>
                  <p className="text-primary font-medium mt-1">Host an event to see it listed here.</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
