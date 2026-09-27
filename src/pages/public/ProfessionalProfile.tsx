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
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-background">
        <div className="text-primary font-bold animate-pulse">Loading profile...</div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-background text-primary-dark">
        <h2 className="text-3xl font-bold mb-4">Professional not found</h2>
        <p className="text-primary-dark/70 mb-8 font-medium">The professional you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20 text-primary-dark">
      {/* Top Banner */}
      <div className="bg-primary-dark h-64 w-full relative rounded-b-[3rem] shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-dark/50 blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-start pt-8 relative z-10">
          <button onClick={() => navigate(-1)} className="text-primary-muted hover:text-white flex items-center bg-surface/10 px-4 py-2 rounded-xl backdrop-blur-sm transition-colors border border-primary-hover/50 hover:bg-surface/20 text-sm font-bold shadow-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 -mt-32">
          
          {/* Main Content */}
          <div className="flex-grow lg:w-2/3">
            {/* Header Card */}
            <div className="bg-surface rounded-xl shadow-md hover:shadow-md transition-shadow duration-300 border border-primary-muted p-8 sm:p-10 mb-8 relative">
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <div className="w-36 h-36 bg-primary-muted rounded-xl flex-shrink-0 flex items-center justify-center text-primary-dark font-extrabold text-5xl border-4 border-white shadow-lg -mt-16 sm:mt-0 relative z-10">
                  {professional.firstName[0]}{professional.lastName[0]}
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark flex items-center gap-2 tracking-tight">
                        {professional.firstName} {professional.lastName}
                        {professional.isVerified && (
                          <CheckCircle className="w-7 h-7 text-primary fill-emerald-100" />
                        )}
                      </h1>
                      <p className="text-xl text-primary font-bold mb-4">{professional.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm font-bold text-primary-dark/70 mb-6 bg-primary-muted/50 p-4 rounded-lg border border-primary-muted/50">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500 mr-2" />
                      <span className="font-extrabold text-foreground mr-1.5 text-base">{professional.rating}</span>
                      <span>({professional.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      {professional.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      {professional.yearsExperience} Years Exp.
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {professional.specializations.map(s => (
                      <span key={s} className="px-4 py-1.5 bg-primary-muted text-primary-hover rounded-xl text-xs font-bold border border-primary-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-primary-muted p-8 sm:p-10 mb-8">
              <h2 className="text-2xl font-extrabold text-primary-dark mb-5">About</h2>
              <p className="text-primary-dark/80 leading-relaxed mb-8 whitespace-pre-line font-medium text-lg">
                {professional.about}
              </p>
              
              <h3 className="text-xl font-bold text-primary-dark mb-4 bg-primary-muted inline-block px-4 py-1.5 rounded-xl text-primary-dark">Therapeutic Approach</h3>
              <p className="text-primary-dark/80 leading-relaxed mb-10 font-medium text-lg">
                {professional.approach}
              </p>

              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-primary-muted">
                <div className="bg-primary-muted/50 rounded-lg p-6 border border-primary-muted">
                  <h3 className="flex items-center text-lg font-bold text-primary-dark mb-5">
                    <Languages className="w-5 h-5 mr-2.5 text-primary" />
                    Languages
                  </h3>
                  <ul className="space-y-3">
                    {professional.languages.map(lang => (
                      <li key={lang} className="text-primary-dark/80 flex items-center font-bold text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {lang}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary-muted/50 rounded-lg p-6 border border-primary-muted">
                  <h3 className="flex items-center text-lg font-bold text-primary-dark mb-5">
                    <BookOpen className="w-5 h-5 mr-2.5 text-primary" />
                    Qualifications
                  </h3>
                  <ul className="space-y-3">
                    {professional.qualifications.map(qual => (
                      <li key={qual} className="text-primary-dark/80 flex items-start font-bold text-sm leading-snug">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-primary-muted p-8 sm:p-10">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-primary-muted">
                <h2 className="text-2xl font-extrabold text-primary-dark">Patient Reviews</h2>
                <div className="flex items-center bg-primary-muted px-4 py-2 rounded-xl">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500 mr-2" />
                  <span className="font-extrabold text-foreground mr-1.5">{professional.rating}</span>
                  <span className="text-primary-hover/70 font-bold text-sm">overall</span>
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-8">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-primary-muted/30 p-6 rounded-lg border border-primary-muted/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 mr-0.5 ${i < review.rating ? 'fill-current' : 'text-primary-muted'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-primary-dark/40">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-primary-dark/80 italic font-medium leading-relaxed">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-primary-muted/50 rounded-lg border border-primary-muted border-dashed">
                   <Star className="w-10 h-10 text-primary-muted mx-auto mb-3" />
                   <p className="text-primary-hover/60 font-bold">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-surface rounded-xl shadow-lg border border-primary-muted p-8 sticky top-24">
              <h3 className="text-2xl font-extrabold text-primary-dark mb-8 flex items-center">
                 <Calendar className="w-6 h-6 mr-2 text-primary" /> Book Session
              </h3>
              
              <div className="space-y-2 mb-8 bg-primary-muted/30 p-4 rounded-lg border border-primary-muted">
                <div className="flex justify-between items-center py-3">
                  <span className="text-primary-dark/70 font-bold text-sm uppercase tracking-wider">Session Fee</span>
                  <span className="font-extrabold text-primary-dark text-xl">₹{professional.sessionFee}</span>
                </div>
                <div className="w-full h-px bg-primary-muted"></div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-primary-dark/70 font-bold text-sm uppercase tracking-wider">Duration</span>
                  <span className="font-extrabold text-primary-dark">{professional.sessionDuration} min</span>
                </div>
                <div className="w-full h-px bg-primary-muted"></div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-primary-dark/70 font-bold text-sm uppercase tracking-wider">Formats</span>
                  <div className="flex gap-2">
                    {professional.isOnlineAvailable && <div className="p-2 bg-primary-muted rounded-lg text-primary-hover" title="Online"><Video className="w-4 h-4" /></div>}
                    {professional.isInPersonAvailable && <div className="p-2 bg-primary-muted rounded-lg text-primary-hover" title="In-person"><MapPin className="w-4 h-4" /></div>}
                  </div>
                </div>
              </div>

              <div className="bg-primary-dark rounded-lg p-6 mb-8 text-white shadow-inner">
                <div className="flex items-start">
                  <div className="bg-primary-dark p-2 rounded-xl mr-4 flex-shrink-0">
                     <Clock className="w-5 h-5 text-primary-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-muted text-sm tracking-wide uppercase mb-1">Next Available</h4>
                    <p className="text-white font-extrabold text-lg">
                      {professional.nextAvailableSlot ? `${new Date(professional.nextAvailableSlot).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at ${new Date(professional.nextAvailableSlot).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}` : 'Contact to book'}
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
                className="w-full bg-primary text-white font-extrabold py-5 rounded-lg hover:bg-primary-hover transition-all shadow-lg hover:shadow-md hover:-translate-y-0.5 mb-6 text-lg"
              >
                Select a Time
              </button>
              
              <div className="flex items-center justify-center text-sm font-bold text-primary-hover/50 bg-primary-muted py-3 rounded-xl">
                <Shield className="w-4 h-4 mr-2" />
                Secure booking & payment
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
