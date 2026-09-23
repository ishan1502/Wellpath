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
          <h1 className="text-2xl font-bold text-gray-900">Events & Webinars</h1>
          <p className="text-gray-500 mt-1">Manage platform events and review professional submissions.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <PlusCircle className="w-5 h-5" />
          Host Event
        </button>
      </div>

      {isCreating ? (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Create Admin Event</h2>
            <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" placeholder="Event Title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Event Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-2 border rounded">
                  <option value="webinar">Webinar</option>
                  <option value="workshop">Workshop</option>
                  <option value="event">Community Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Platform</label>
                <select value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} className="w-full p-2 border rounded">
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max Attendees</label>
                <input required type="number" value={formData.maxAttendees} onChange={e => setFormData({...formData, maxAttendees: e.target.value})} className="w-full p-2 border rounded" placeholder="Capacity" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" placeholder="Event details..." />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Create Event</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 text-sm font-medium ${activeTab === 'pending' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Approvals ({pendingEvents.length})
            </button>
            <button
              className={`flex-1 py-4 text-sm font-medium ${activeTab === 'admin' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('admin')}
            >
              Admin Hosted
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'pending' ? (
              pendingEvents.length > 0 ? (
                <div className="space-y-4">
                  {pendingEvents.map((event) => (
                    <div key={event.id} className="border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold">{event.type}</span>
                          <h3 className="font-bold text-gray-900">{event.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1"><User className="w-4 h-4" /> {event.professionalName}</div>
                          <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</div>
                          <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</div>
                          <div className="flex items-center gap-1"><Video className="w-4 h-4" /> {event.platform}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={() => handleApprove(event.id)} className="flex-1 md:flex-none flex items-center justify-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 rounded hover:bg-emerald-100">
                          <CheckCircle className="w-4 h-4" /> Approve
                        </button>
                        <button onClick={() => handleReject(event.id)} className="flex-1 md:flex-none flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100">
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">No events pending approval.</div>
              )
            ) : (
              adminEvents.length > 0 ? (
                <div className="space-y-4">
                  {adminEvents.map((event) => (
                    <div key={event.id} className="border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold">{event.type}</span>
                          <h3 className="font-bold text-gray-900">{event.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</div>
                          <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</div>
                          <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {event.currentAttendees}/{event.maxAttendees}</div>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Manage Event</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">No admin hosted events.</div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
