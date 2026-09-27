import React, { useState } from 'react';
import { Briefcase, Building, DollarSign, Calendar, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

const PostJob = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedType, setSubmittedType] = useState('job');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    type: 'job',
    description: '',
    requirements: '',
    compensation: '',
    deadline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to post a job');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const { error: insertError } = await supabase
        .from('job_postings')
        .insert({
          professional_id: user.id,
          title: formData.title,
          type: formData.type,
          description: formData.description,
          requirements: formData.requirements,
          compensation: formData.compensation,
          deadline: formData.deadline,
          status: 'pending'
        });

      if (insertError) throw insertError;

      setSubmittedType(formData.type);
      setIsSubmitted(true);
      setFormData({
        title: '',
        type: 'job',
        description: '',
        requirements: '',
        compensation: '',
        deadline: ''
      });
    } catch (err: any) {
      console.error('Error posting job:', err);
      setError(err.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto mt-10 animate-fade-in">
        <div className="bg-surface p-10 rounded-xl border-0 shadow-sm text-center hover:shadow-md transition-all duration-300">
          <div className="w-20 h-20 bg-primary-muted rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">Successfully Posted!</h2>
          <p className="text-primary-hover/80 mb-8 font-medium max-w-md mx-auto">
            Your {submittedType === 'job' ? 'job' : 'internship'} opportunity is now live on the board.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            Post Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Post an Opportunity</h1>
        <p className="text-primary-hover/80 mt-2 font-medium">Publish a job or internship for mental health professionals and students.</p>
      </div>

      <div className="bg-surface rounded-xl border-0 shadow-sm p-6 md:p-10 hover:shadow-md transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-primary-dark">Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Clinical Psychologist"
                  className="pl-12 w-full h-12 bg-primary-muted/50 border-0 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm placeholder:text-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-primary-dark">Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="pl-12 w-full h-12 bg-primary-muted/50 border-0 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm appearance-none"
                >
                  <option value="job">Job</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-primary-dark">Description</label>
            <textarea
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and clinic environment..."
              className="w-full p-4 bg-primary-muted/50 border-0 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm placeholder:text-primary/50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-primary-dark">Requirements <span className="font-medium text-primary/70">(comma separated)</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <input
                type="text"
                name="requirements"
                required
                value={formData.requirements}
                onChange={handleChange}
                placeholder="e.g. M.Phil in Psychology, 2+ years experience"
                className="pl-12 w-full h-12 bg-primary-muted/50 border-0 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm placeholder:text-primary/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-primary-dark">Compensation</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <input
                  type="text"
                  name="compensation"
                  required
                  value={formData.compensation}
                  onChange={handleChange}
                  placeholder="e.g. ₹40,000/month or Unpaid"
                  className="pl-12 w-full h-12 bg-primary-muted/50 border-0 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm placeholder:text-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-primary-dark">Application Deadline</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <input
                  type="date"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  className="pl-12 w-full h-12 bg-primary-muted/50 border-0 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-primary-muted flex flex-col items-end gap-4">
            {error && <p className="text-red-500 font-medium text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Briefcase className="w-5 h-5 mr-2" />}
              {loading ? 'Posting...' : 'Post Opportunity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
