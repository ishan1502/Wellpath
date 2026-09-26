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
          <h1 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Events & Webinars</h1>
          <p className="text-emerald-700 font-medium mt-1">Manage platform events and review professional submissions.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Host Event
        </button>
      </div>

      {isCreating ? (
        <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-emerald-950">Create Admin Event</h2>
            <button onClick={() => setIsCreating(false)} className="text-emerald-400 hover:text-emerald-600 bg-emerald-50 p-2 rounded-xl transition-colors">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleCreateEvent} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-emerald-900 mb-2">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-emerald-950 placeholder-emerald-300" placeholder="Event Title" />
              </div>
              <div>
                <label className="block text-sm font-bold text-emerald-900 mb-2">Event Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-emerald-950">
                  <option value="webinar">Webinar</option>
                  <option value="workshop">Workshop</option>
                  <option value="event">Community Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-emerald-900 mb-2">Date</label>
                <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-emerald-950" />
              </div>
              <div>
                <label className="block text-sm font-bold text-emerald-900 mb-2">Time</label>
                <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-emerald-950" />
              </div>
              <div>
                <label className="block text-sm font-bold text-emerald-900 mb-2">Platform</label>
                <select value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} className="w-full p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-emerald-950">
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-emerald-900 mb-2">Max Attendees</label>
                <input required type="number" value={formData.maxAttendees} onChange={e => setFormData({...formData, maxAttendees: e.target.value})} className="w-full p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-emerald-950 placeholder-emerald-300" placeholder="Capacity" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-emerald-900 mb-2">Description</label>
              <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-emerald-950 placeholder-emerald-300" placeholder="Event details..." />
            </div>
            <div className="flex justify-end gap-4 pt-6">
              <button type="button" onClick={() => setIsCreating(false)} className="px-6 py-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all">Create Event</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="flex border-b border-emerald-100 bg-emerald-50/30">
            <button
              className={`flex-1 py-5 text-sm font-bold transition-colors ${activeTab === 'pending' ? 'text-emerald-700 border-b-2 border-emerald-600 bg-white' : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50/50'}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Approvals <span className="ml-2 bg-emerald-100 text-emerald-800 py-1 px-2.5 rounded-xl">{pendingEvents.length}</span>
            </button>
            <button
              className={`flex-1 py-5 text-sm font-bold transition-colors ${activeTab === 'admin' ? 'text-emerald-700 border-b-2 border-emerald-600 bg-white' : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50/50'}`}
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
                    <div key={event.id} className="border border-emerald-100 bg-emerald-50/30 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:bg-emerald-50/60 transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-amber-100 text-amber-800 text-[10px] px-3 py-1 rounded-xl uppercase tracking-widest font-bold">{event.type}</span>
                          <h3 className="font-extrabold text-emerald-950 text-lg">{event.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm font-medium text-emerald-700">
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm"><User className="w-4 h-4 text-emerald-500" /> {event.professionalName}</div>
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm"><Calendar className="w-4 h-4 text-emerald-500" /> {event.date}</div>
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm"><Clock className="w-4 h-4 text-emerald-500" /> {event.time}</div>
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm"><Video className="w-4 h-4 text-emerald-500" /> {event.platform}</div>
                        </div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button onClick={() => handleApprove(event.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-sm transition-all">
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
                  <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                  </div>
                  <p className="text-lg font-bold text-emerald-950">No events pending</p>
                  <p className="text-emerald-600 font-medium mt-1">All event submissions have been reviewed.</p>
                </div>
              )
            ) : (
              adminEvents.length > 0 ? (
                <div className="space-y-4">
                  {adminEvents.map((event) => (
                    <div key={event.id} className="border border-emerald-100 bg-emerald-50/30 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:bg-emerald-50/60 transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-3 py-1 rounded-xl uppercase tracking-widest font-bold">{event.type}</span>
                          <h3 className="font-extrabold text-emerald-950 text-lg">{event.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm font-medium text-emerald-700">
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm"><Calendar className="w-4 h-4 text-emerald-500" /> {event.date}</div>
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm"><Clock className="w-4 h-4 text-emerald-500" /> {event.time}</div>
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm"><Users className="w-4 h-4 text-emerald-500" /> {event.currentAttendees}/{event.maxAttendees}</div>
                        </div>
                      </div>
                      <button className="text-sm font-bold text-emerald-600 hover:text-emerald-800 bg-white border border-emerald-200 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all mt-4 md:mt-0">Manage Event</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-emerald-400" />
                  </div>
                  <p className="text-lg font-bold text-emerald-950">No admin events</p>
                  <p className="text-emerald-600 font-medium mt-1">Host an event to see it listed here.</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
