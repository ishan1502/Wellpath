import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { professionalService } from '../../services/professionalService';
import { Professional, Review } from '../../types';
import { Star, MapPin, Video, Calendar, Clock, CheckCircle, Shield, Languages, BookOpen, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import BookingModal from '../../components/appointment/BookingModal';

const ProfessionalProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      try {
        const prof = await professionalService.getProfessionalById(id);
        if (prof) setProfessional(prof);
        // Reviews service not implemented yet with Supabase, return empty
        setReviews([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50">
        <div className="text-emerald-600 font-medium">Loading profile...</div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional not found</h2>
        <p className="text-gray-600 mb-6">The professional you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate(-1)} className="text-emerald-600 hover:underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-emerald-900 h-48 w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <button onClick={() => navigate(-1)} className="text-emerald-100 hover:text-white flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm transition-colors mt-[-40px]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 -mt-24">
          
          {/* Main Content */}
          <div className="flex-grow lg:w-2/3">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 relative z-10">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-32 h-32 bg-emerald-100 rounded-full flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold text-4xl border-4 border-white shadow-md">
                  {professional.firstName[0]}{professional.lastName[0]}
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        {professional.firstName} {professional.lastName}
                        {professional.isVerified && (
                          <CheckCircle className="w-6 h-6 text-blue-500" />
                        )}
                      </h1>
                      <p className="text-lg text-emerald-600 font-medium mb-3">{professional.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-amber-400 fill-current mr-1.5" />
                      <span className="font-bold text-gray-900 mr-1">{professional.rating}</span>
                      <span>({professional.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-1.5 text-gray-400" />
                      {professional.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-1.5 text-gray-400" />
                      {professional.yearsExperience} Years Experience
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {professional.specializations.map(s => (
                      <span key={s} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                {professional.about}
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Therapeutic Approach</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {professional.approach}
              </p>

              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div>
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <Languages className="w-5 h-5 mr-2 text-emerald-600" />
                    Languages
                  </h3>
                  <ul className="space-y-2">
                    {professional.languages.map(lang => (
                      <li key={lang} className="text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></div>
                        {lang}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <BookOpen className="w-5 h-5 mr-2 text-emerald-600" />
                    Qualifications
                  </h3>
                  <ul className="space-y-2">
                    {professional.qualifications.map(qual => (
                      <li key={qual} className="text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></div>
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Patient Reviews</h2>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-amber-400 fill-current mr-1" />
                  <span className="font-bold text-gray-900 mr-1">{professional.rating}</span>
                  <span className="text-gray-500">overall</span>
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Book a Session</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-600">Session Fee</span>
                  <span className="font-bold text-gray-900 text-lg">₹{professional.sessionFee}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">{professional.sessionDuration} minutes</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-600">Available Formats</span>
                  <div className="flex gap-2">
                    {professional.isOnlineAvailable && <Video className="w-5 h-5 text-emerald-600" />}
                    {professional.isInPersonAvailable && <MapPin className="w-5 h-5 text-emerald-600" />}
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 mb-6">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-emerald-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-emerald-900 text-sm">Next Available Slot</h4>
                    <p className="text-emerald-700 text-sm mt-1">
                      {professional.nextAvailableSlot ? `${new Date(professional.nextAvailableSlot).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at ${new Date(professional.nextAvailableSlot).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}` : 'Contact for availability'}
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (user) {
                    setIsModalOpen(true);
                  } else {
                    navigate('/login');
                  }
                }}
                className="w-full bg-emerald-600 text-white font-semibold py-4 rounded-xl hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200 mb-4"
              >
                Select a Time
              </button>
              
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-1.5" />
                Secure booking and payment
              </div>
            </div>
          </div>

        </div>
      </div>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        professional={professional} 
        patientId={user?.id || ''} 
      />
    </div>
  );
};

export default ProfessionalProfile;
