import React, { useState } from 'react';
import { Star, MapPin, Video, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Saved = () => {
  // Simulate saved professionals (empty for real users)
  const [savedProfessionals, setSavedProfessionals] = useState<any[]>([]);

  const removeSaved = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSavedProfessionals(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in font-sans text-primary-dark">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Saved Professionals</h1>
        <p className="text-primary-hover/80 font-medium mt-1">Review and book sessions with professionals you've bookmarked.</p>
      </div>

      {savedProfessionals.length === 0 ? (
        <div className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-16 text-center">
          <Heart className="w-20 h-20 text-primary-muted mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-primary-dark mb-3">No saved professionals</h3>
          <p className="text-primary-hover/70 mb-8 font-medium">You haven't bookmarked any professionals yet.</p>
          <Link 
            to="/find-professional" 
            className="inline-flex items-center text-white bg-primary hover:bg-primary-hover font-bold px-8 py-4 rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            Browse professionals <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProfessionals.map((pro) => (
            <Link 
              key={pro.id} 
              to={`../professionals/${pro.id}`}
              className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-0 group relative flex flex-col h-full overflow-hidden"
            >
              <button 
                onClick={(e) => removeSaved(pro.id, e)}
                className="absolute top-5 right-5 p-3 bg-surface/80 backdrop-blur-md rounded-lg shadow-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-all z-10 border border-gray-100"
                title="Remove from saved"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
              
              <div className="p-8 flex-grow">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 bg-primary-muted rounded-lg flex items-center justify-center text-primary-dark font-extrabold text-2xl flex-shrink-0 border border-primary-muted shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {pro.firstName[0]}{pro.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-dark text-xl group-hover:text-primary transition-colors">
                      {pro.firstName} {pro.lastName}
                    </h3>
                    <p className="text-sm text-primary font-semibold mt-1">{pro.type}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm text-primary-dark/80 font-medium">
                  <div className="flex items-center bg-background px-3 py-2 rounded-xl w-fit">
                    <Star className="w-4 h-4 text-amber-400 fill-current mr-2" />
                    <span className="font-bold text-primary-dark mr-1">{pro.rating}</span>
                    <span>({pro.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-primary" />
                    {pro.location}
                  </div>
                  {pro.isOnlineAvailable && (
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-3 text-primary" />
                      Online Sessions Available
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {pro.specializations?.slice(0, 3).map((spec: string) => (
                    <span key={spec} className="px-3 py-1.5 bg-primary-muted border border-primary-muted text-primary-dark rounded-xl text-xs font-bold">
                      {spec}
                    </span>
                  ))}
                  {pro.specializations.length > 3 && (
                    <span className="px-3 py-1.5 bg-primary-muted border border-primary-muted text-primary-dark rounded-xl text-xs font-bold">
                      +{pro.specializations.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-50 bg-background/50 flex items-center justify-between mt-auto">
                <span className="font-extrabold text-primary-dark text-lg">
                  ₹{pro.sessionFee} <span className="text-primary-hover/60 text-sm font-medium">/ session</span>
                </span>
                <span className="text-primary font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                  Book now <ArrowRight className="w-5 h-5 ml-1.5" />
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
