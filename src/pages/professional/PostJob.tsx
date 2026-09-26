import React, { useState } from 'react';
import { Briefcase, Building, DollarSign, Calendar, FileText, CheckCircle } from 'lucide-react';

const PostJob = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedType, setSubmittedType] = useState('job');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedType(formData.type);
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({
        title: '',
        type: 'job',
        description: '',
        requirements: '',
        compensation: '',
        deadline: ''
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto mt-10 animate-fade-in">
        <div className="bg-white p-10 rounded-3xl border-0 shadow-sm text-center hover:shadow-xl transition-all duration-300">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-emerald-950 mb-3">Successfully Posted!</h2>
          <p className="text-emerald-700/80 mb-8 font-medium max-w-md mx-auto">
            Your {submittedType === 'job' ? 'job' : 'internship'} opportunity is now live on the board.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
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
        <h1 className="text-3xl font-bold text-emerald-950 tracking-tight">Post an Opportunity</h1>
        <p className="text-emerald-700/80 mt-2 font-medium">Publish a job or internship for mental health professionals and students.</p>
      </div>

      <div className="bg-white rounded-3xl border-0 shadow-sm p-6 md:p-10 hover:shadow-xl transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-emerald-900">Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-emerald-600" />
                </div>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Clinical Psychologist"
                  className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-emerald-600/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-emerald-900">Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-emerald-600" />
                </div>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm appearance-none"
                >
                  <option value="job">Job</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
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
              placeholder="Describe the role, responsibilities, and clinic environment..."
              className="w-full p-4 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-emerald-600/50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-emerald-900">Requirements <span className="font-medium text-emerald-600/70">(comma separated)</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>
              <input
                type="text"
                name="requirements"
                required
                value={formData.requirements}
                onChange={handleChange}
                placeholder="e.g. M.Phil in Psychology, 2+ years experience"
                className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-emerald-600/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-emerald-900">Compensation</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
                <input
                  type="text"
                  name="compensation"
                  required
                  value={formData.compensation}
                  onChange={handleChange}
                  placeholder="e.g. ₹40,000/month or Unpaid"
                  className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-emerald-600/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-emerald-900">Application Deadline</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                </div>
                <input
                  type="date"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  className="pl-12 w-full h-12 bg-emerald-50/50 border-0 rounded-2xl text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-emerald-100 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Post Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
