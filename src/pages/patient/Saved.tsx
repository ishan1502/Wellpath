import React, { useState } from 'react';
import { mockProfessionals } from '../../data/mockData';
import { Star, MapPin, Video, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Saved = () => {
  // Simulate saved professionals by taking the first 3
  const [savedProfessionals, setSavedProfessionals] = useState(mockProfessionals.slice(0, 3));

  const removeSaved = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSavedProfessionals(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Professionals</h1>
        <p className="text-gray-600">Review and book sessions with professionals you've bookmarked.</p>
      </div>

      {savedProfessionals.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No saved professionals</h3>
          <p className="text-gray-500 mb-6">You haven't bookmarked any professionals yet.</p>
          <Link 
            to="/find-professional" 
            className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700"
          >
            Browse professionals <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProfessionals.map((pro) => (
            <Link 
              key={pro.id} 
              to={`../professionals/${pro.id}`}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group relative flex flex-col h-full"
            >
              <button 
                onClick={(e) => removeSaved(pro.id, e)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors z-10"
                title="Remove from saved"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
              
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xl flex-shrink-0">
                    {pro.firstName[0]}{pro.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors">
                      {pro.firstName} {pro.lastName}
                    </h3>
                    <p className="text-sm text-emerald-600 font-medium">{pro.type}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-400 fill-current mr-2" />
                    <span className="font-semibold text-gray-900 mr-1">{pro.rating}</span>
                    <span>({pro.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {pro.location}
                  </div>
                  {pro.isOnlineAvailable && (
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-2 text-emerald-500" />
                      Online Sessions Available
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {pro.specializations.slice(0, 3).map(spec => (
                    <span key={spec} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                      {spec}
                    </span>
                  ))}
                  {pro.specializations.length > 3 && (
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                      +{pro.specializations.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between mt-auto">
                <span className="font-semibold text-gray-900">
                  ₹{pro.sessionFee} <span className="text-gray-500 text-sm font-normal">/ session</span>
                </span>
                <span className="text-emerald-600 font-medium text-sm flex items-center group-hover:underline">
                  Book now <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
