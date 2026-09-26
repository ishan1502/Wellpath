import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Article } from '../../types';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

export default function Content() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    const data = await adminService.getArticles();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return <div className="p-8 text-center text-emerald-600 font-medium">Loading content...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Content Management</h2>
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
      </div>

      <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden">
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
        </div>
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
    </div>
  );
}
