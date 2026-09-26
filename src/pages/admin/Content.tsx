import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Article, JobPosting, Event } from '../../types';
import { Search, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Content() {
  const [activeTab, setActiveTab] = useState<'articles' | 'jobs' | 'events'>('articles');
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [pendingJobs, setPendingJobs] = useState<JobPosting[]>([]);
  const [pendingEvents, setPendingEvents] = useState<Event[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'articles') {
      const data = await adminService.getArticles();
      setArticles(data);
    } else if (activeTab === 'jobs') {
      const { data } = await supabase.from('job_postings').select('*').eq('status', 'pending');
      setPendingJobs(data || []);
    } else if (activeTab === 'events') {
      const { data } = await supabase.from('events').select('*').eq('status', 'pending');
      setPendingEvents(data || []);
    }
    setLoading(false);
  };

  const handleJobAction = async (id: string, action: 'approved' | 'rejected') => {
    await supabase.from('job_postings').update({ status: action }).eq('id', id);
    fetchData();
  };

  const handleEventAction = async (id: string, action: 'approved' | 'rejected') => {
    await supabase.from('events').update({ status: action }).eq('id', id);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Content Management</h2>
        {activeTab === 'articles' && (
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <div className="relative flex-1 sm:w-72">
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-emerald-100 rounded-2xl text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md placeholder-emerald-300"
              />
              <Search className="absolute left-4 top-3 h-5 w-5 text-emerald-400" />
            </div>
            <button className="bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center whitespace-nowrap">
              <Plus className="w-5 h-5 mr-2" />
              New Article
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-4 border-b border-emerald-100 pb-2">
        <button 
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2 font-bold rounded-t-lg transition-colors ${activeTab === 'articles' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-emerald-500 hover:text-emerald-700'}`}
        >
          Articles
        </button>
        <button 
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 font-bold rounded-t-lg transition-colors ${activeTab === 'jobs' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-emerald-500 hover:text-emerald-700'}`}
        >
          Pending Jobs/Internships
        </button>
        <button 
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 font-bold rounded-t-lg transition-colors ${activeTab === 'events' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-emerald-500 hover:text-emerald-700'}`}
        >
          Pending Events
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-emerald-600 font-medium">Loading content...</div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden">
          
          {activeTab === 'articles' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-50">
                <thead className="bg-emerald-50/50">
                  <tr>
                    <th className="px-6 py-5 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Title & Category</th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Published</th>
                    <th className="px-6 py-5 text-right text-xs font-bold text-emerald-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-emerald-50">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-emerald-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="text-base font-bold text-emerald-950 mb-1.5 group-hover:text-emerald-700 transition-colors">{article.title}</div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 shadow-sm">
                            {article.category}
                          </span>
                          <span className="text-xs font-semibold text-emerald-600">{article.readingTime} min read</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm font-bold text-emerald-900">{article.author}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-emerald-600">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-2 rounded-xl transition-colors mr-2 shadow-sm">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-xl transition-colors shadow-sm">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {articles.length === 0 && (
                <div className="p-16 text-center">
                  <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Edit2 className="h-8 w-8 text-emerald-300" />
                  </div>
                  <p className="text-lg font-bold text-emerald-950">No articles found</p>
                  <p className="text-emerald-600 font-medium mt-1">Create your first piece of content.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-50">
                <thead className="bg-emerald-50/50">
                  <tr>
                    <th className="px-6 py-5 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Title & Type</th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-5 text-right text-xs font-bold text-emerald-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-emerald-50">
                  {pendingJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-emerald-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="text-base font-bold text-emerald-950 mb-1.5">{job.title}</div>
                        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 shadow-sm">{job.type}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-emerald-900 truncate max-w-xs">{job.description}</div>
                        <div className="text-xs text-emerald-600 mt-1">Comp: {job.compensation}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleJobAction(job.id, 'approved')} className="text-emerald-600 hover:text-white hover:bg-emerald-600 bg-emerald-50 p-2 rounded-xl transition-colors mr-2 shadow-sm">
                          <Check className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleJobAction(job.id, 'rejected')} className="text-red-500 hover:text-white hover:bg-red-500 bg-red-50 p-2 rounded-xl transition-colors shadow-sm">
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pendingJobs.length === 0 && (
                <div className="p-16 text-center">
                  <Check className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
                  <p className="text-lg font-bold text-emerald-950">No pending jobs</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-50">
                <thead className="bg-emerald-50/50">
                  <tr>
                    <th className="px-6 py-5 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Event Title</th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Date/Time</th>
                    <th className="px-6 py-5 text-right text-xs font-bold text-emerald-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-emerald-50">
                  {pendingEvents.map((ev) => (
                    <tr key={ev.id} className="hover:bg-emerald-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="text-base font-bold text-emerald-950 mb-1.5">{ev.title}</div>
                        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 shadow-sm">{ev.type}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm font-bold text-emerald-900">{ev.date}</div>
                        <div className="text-sm text-emerald-600">{ev.time}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEventAction(ev.id, 'approved')} className="text-emerald-600 hover:text-white hover:bg-emerald-600 bg-emerald-50 p-2 rounded-xl transition-colors mr-2 shadow-sm">
                          <Check className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleEventAction(ev.id, 'rejected')} className="text-red-500 hover:text-white hover:bg-red-500 bg-red-50 p-2 rounded-xl transition-colors shadow-sm">
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pendingEvents.length === 0 && (
                <div className="p-16 text-center">
                  <Check className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
                  <p className="text-lg font-bold text-emerald-950">No pending events</p>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
