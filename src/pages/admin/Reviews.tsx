import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Review } from '../../types';
import { Search, Star, EyeOff, CheckCircle, Clock } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const data = await adminService.getReviews();
    setReviews(data);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: 'approved' | 'hidden' | 'pending') => {
    await adminService.updateReviewStatus(id, status);
    fetchReviews();
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading reviews...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Review Moderation</h2>
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search reviews..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & IDs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating & Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 mb-1">{new Date(review.createdAt).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-400">Pat: {review.patientId}</div>
                  <div className="text-xs text-gray-400">Prof: {review.professionalId}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-900 line-clamp-2">{review.comment}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                    review.status === 'approved' ? 'bg-green-100 text-green-800' :
                    review.status === 'hidden' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1 self-center" />}
                    {review.status === 'hidden' && <EyeOff className="w-3 h-3 mr-1 self-center" />}
                    {review.status === 'pending' && <Clock className="w-3 h-3 mr-1 self-center" />}
                    {review.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {review.status !== 'approved' && (
                    <button 
                      onClick={() => handleStatusChange(review.id, 'approved')}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Approve
                    </button>
                  )}
                  {review.status !== 'hidden' && (
                    <button 
                      onClick={() => handleStatusChange(review.id, 'hidden')}
                      className="text-red-600 hover:text-red-900 mr-3"
                    >
                      Hide
                    </button>
                  )}
                  {review.status !== 'pending' && (
                    <button 
                      onClick={() => handleStatusChange(review.id, 'pending')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Mark Pending
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reviews.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No reviews found.
          </div>
        )}
      </div>
    </div>
  );
}
