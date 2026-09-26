import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Video, CheckCircle, SlidersHorizontal, ChevronRight, GraduationCap } from 'lucide-react';
import { professionalService } from '../../services/professionalService';
import { Professional } from '../../types';
import { useAuth } from '@/hooks/useAuth';
import { LoginPromptModal } from '@/components/shared/LoginPromptModal';

const SPECIALIZATIONS = ['Anxiety', 'Depression', 'Stress', 'Relationships', 'Burnout', 'Trauma', 'Couples', 'Family'];
const TYPES = ['Therapist', 'Psychiatrist', 'Counselor', 'Coach'];

const FindProfessional = () => {
  const [searchParams] = useSearchParams();
  const matched = searchParams.get('matched');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    professionalService.getProfessionals().then(data => {
      setProfessionals(data);
      setIsLoading(false);
    });
  }, []);

  const toggleSpec = (spec: string) =>
    setSelectedSpecs(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]);

  const toggleType = (type: string) =>
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);

  const filteredProfessionals = professionals.filter(p => {
    const matchesSearch =
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.specializations && p.specializations.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpec = selectedSpecs.length === 0 || selectedSpecs.some(spec => p.specializations.includes(spec));
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.type);
    const matchesPrice = p.sessionFee <= maxPrice;

    return matchesSearch && matchesSpec && matchesType && matchesPrice;
  });

  const handleBookSession = (profId: string) => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      const prefix = window.location.pathname.startsWith('/patient') ? '/patient' : '';
      navigate(`${prefix}/professionals/${profId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-emerald-900 pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,80 70,80 100,100 L100,0 L0,0 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Find Your <span className="text-emerald-300">Perfect Match</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10">
            {matched 
              ? "Based on your answers, we've found these excellent professionals for you."
              : "Search through our vetted network of licensed professionals to find the right support for your mental health journey."}
          </p>
          
          <div className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex items-center">
            <Search className="w-6 h-6 text-gray-400 ml-3" />
            <input 
              type="text" 
              placeholder="Search by name, specialization, or condition..."
              className="flex-grow bg-transparent border-none py-3 px-4 focus:ring-0 text-gray-900 font-medium placeholder-gray-400 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-3 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20 w-full flex gap-8 flex-col md:flex-row items-start">
        
        {/* Filters Sidebar */}
        <div className={`md:w-1/4 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <Filter className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            <button onClick={() => {
              setSelectedSpecs([]); setSelectedTypes([]); setMaxPrice(5000); setSearchTerm('');
            }} className="ml-auto text-xs text-emerald-600 font-medium hover:underline">Clear all</button>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Professional Type</h3>
            <div className="space-y-3">
              {TYPES.map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300 group-hover:border-emerald-500'}`}>
                    {selectedTypes.includes(type) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Specialization</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {SPECIALIZATIONS.map(spec => (
                <label key={spec} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedSpecs.includes(spec) ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300 group-hover:border-emerald-500'}`}>
                    {selectedSpecs.includes(spec) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{spec}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Max Price/Session</h3>
              <span className="text-emerald-700 font-bold text-sm">₹{maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
              <span>₹500</span>
              <span>₹10,000+</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:w-3/4 flex-grow">
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-gray-700 font-medium">
              Showing <span className="font-bold text-gray-900">{filteredProfessionals.length}</span> professionals
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              Sort by: <select className="bg-transparent font-semibold text-gray-900 border-none outline-none cursor-pointer"><option>Recommended</option><option>Highest Rated</option><option>Lowest Price</option></select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-6 animate-pulse">
                  <div className="w-24 h-24 bg-gray-200 rounded-2xl flex-shrink-0"></div>
                  <div className="flex-grow space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProfessionals.length === 0 ? (
             <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No professionals found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                <button onClick={() => {
                  setSelectedSpecs([]); setSelectedTypes([]); setMaxPrice(5000); setSearchTerm('');
                }} className="mt-6 bg-emerald-50 text-emerald-700 font-semibold px-6 py-2 rounded-lg hover:bg-emerald-100 transition-colors">Clear Filters</button>
             </div>
          ) : (
            <div className="space-y-6">
              {filteredProfessionals.map(prof => (
                <div key={prof.id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col sm:flex-row gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300"></div>
                  
                  <div className="w-full sm:w-32 h-40 sm:h-auto bg-emerald-100 rounded-2xl flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold text-4xl object-cover overflow-hidden relative">
                    {prof.firstName[0]}{prof.lastName[0]}
                    {prof.isVerified && (
                      <div className="absolute bottom-2 right-2 bg-white rounded-full p-0.5 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-blue-500" fill="currentColor" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 hover:text-emerald-700 transition-colors cursor-pointer" onClick={() => handleBookSession(prof.id)}>
                          {prof.firstName} {prof.lastName}
                        </h3>
                        <p className="text-emerald-600 font-medium flex items-center gap-2">
                          {prof.type} <span className="text-gray-300">•</span> <GraduationCap className="w-4 h-4"/> {prof.yearsExperience} yrs exp
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="text-2xl font-black text-gray-900">₹{prof.sessionFee}</div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">per session</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-xl inline-flex flex-wrap w-fit">
                      <div className="flex items-center gap-1 font-semibold">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-gray-900">{prof.rating}</span>
                        <span className="text-gray-500 font-normal">({prof.reviewCount})</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></div>
                      <div className="flex items-center gap-1">
                        <Video className="w-4 h-4 text-emerald-600" />
                        <span>{prof.isOnlineAvailable ? 'Online available' : 'In-person only'}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {prof.specializations.map(s => (
                        <span key={s} className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:border-emerald-300 hover:bg-emerald-50 transition-colors cursor-default">
                          {s}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => handleBookSession(prof.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm shadow-emerald-200 flex-grow text-center flex items-center justify-center gap-2"
                      >
                        Book Session <ChevronRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleBookSession(prof.id)}
                        className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors sm:w-auto w-full text-center"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <LoginPromptModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

export default FindProfessional;
