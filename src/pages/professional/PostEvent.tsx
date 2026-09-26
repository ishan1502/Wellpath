import React, { useState } from 'react';
import { CalendarPlus, FileText, Calendar, Clock, Video, Users, DollarSign, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

const PostEvent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    platform: 'Zoom',
    maxAttendees: '',
    fee: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to post an event');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('events')
        .insert({
          professional_id: user.id,
          host_type: 'professional',
          type: 'event', // fallback or update if formData has type
          title: formData.title,
          description: formData.description,
          date: formData.date,
          time: formData.time,
          platform: formData.platform,
          max_attendees: parseInt(formData.maxAttendees) || 50,
          fee: parseInt(formData.fee) || 0,
          status: 'pending' // Goes to admin approval
        });

      if (insertError) throw insertError;

      setIsSubmitted(true);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        platform: 'Zoom',
        maxAttendees: '',
        fee: ''
      });
    } catch (err: any) {
      console.error('Error posting event:', err);
      setError(err.message || 'Failed to post event');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto mt-10 animate-fade-in">
        <div className="bg-white p-10 rounded-3xl border-0 shadow-sm text-center hover:shadow-xl transition-all duration-300">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-emerald-950 mb-3">Event Submitted!</h2>
          <p className="text-emerald-700/80 mb-8 font-medium max-w-md mx-auto">
            Your event has been submitted and is pending admin approval. It will be visible to users once approved.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            Post Another Event
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-950 tracking-tight">Host an Event</h1>
        <p className="text-emerald-700/80 mt-2 font-medium">Organize a webinar or workshop for the Wellpath community.</p>
      </div>

      <div className="bg-white rounded-3xl border-0 shadow-sm p-6 md:p-10 hover:shadow-xl transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-emerald-900">Event Title</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Navigating Workplace Stress"
                className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-emerald-600/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-emerald-900">Description</label>
            <textarea
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="What will attendees learn? Who is this for?"
              className="w-full p-4 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-emerald-600/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-emerald-900">Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                </div>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-emerald-900">Time</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <input
                  type="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-emerald-900">Platform/Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Video className="h-5 w-5 text-emerald-600" />
                </div>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm appearance-none"
                >
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-emerald-900">Max Attendees</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <input
                  type="number"
                  name="maxAttendees"
                  required
                  min="1"
                  value={formData.maxAttendees}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-emerald-600/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-emerald-900">Registration Fee <span className="font-medium text-emerald-600/70">(₹)</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
                <input
                  type="number"
                  name="fee"
                  required
                  min="0"
                  value={formData.fee}
                  onChange={handleChange}
                  placeholder="0 for free"
                  className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-emerald-600/50"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-emerald-100 flex flex-col items-end gap-4">
            {error && <p className="text-red-500 font-medium text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <CalendarPlus className="w-5 h-5 mr-2" />}
              {loading ? 'Publishing...' : 'Publish Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEvent;
