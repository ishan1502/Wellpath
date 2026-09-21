import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Video, CheckCircle } from 'lucide-react';
import { mockProfessionals } from '../../data/mockData';
import { useAuth } from '@/hooks/useAuth';
import { LoginPromptModal } from '@/components/shared/LoginPromptModal';

const SPECIALIZATIONS = ['Anxiety', 'Depression', 'Stress', 'Relationships', 'Burnout', 'Trauma'];
const SESSION_TYPES = ['online', 'in-person'] as const;

const FindProfessional = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleSpec = (spec: string) =>
    setSelectedSpecs(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]);

  const toggleType = (type: string) =>
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);

  const filteredProfessionals = mockProfessionals.filter(p => {
    const matchesSearch =
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.specializations.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpec =
      selectedSpecs.length === 0 ||
      selectedSpecs.some(spec => p.specializations.includes(spec));

    const matchesType =
      selectedTypes.length === 0 ||
      (selectedTypes.includes('online') && p.isOnlineAvailable) ||
      (selectedTypes.includes('in-person') && p.isInPersonAvailable);

    const matchesPrice = p.sessionFee <= maxPrice;

    return matchesSearch && matchesSpec && matchesType && matchesPrice;
  });

  const handleBookSession = (profId: string) => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      // Navigate to the professional's profile where booking modal can be opened
      const prefix = window.location.pathname.startsWith('/patient') ? '/patient' : '';
      navigate(`${prefix}/professionals/${profId}`);
    }
  };

  const hasActiveFilters = selectedSpecs.length > 0 || selectedTypes.length > 0 || maxPrice < 5000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Therapist</h1>
        <p className="text-gray-600">Browse our network of licensed professionals</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                <Filter className="w-5 h-5" />
                <h2>Filters</h2>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={() => { setSelectedSpecs([]); setSelectedTypes([]); setMaxPrice(5000); }}
                  className="text-xs text-emerald-600 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Specialization</h3>
                <div className="space-y-2">
                  {SPECIALIZATIONS.map(spec => (
                    <label key={spec} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSpecs.includes(spec)}
                        onChange={() => toggleSpec(spec)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <span className="text-sm text-gray-600">{spec}</span>
                      {selectedSpecs.includes(spec) && <CheckCircle className="w-3 h-3 text-emerald-500 ml-auto" />}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Session Type</h3>
                <div className="space-y-2">
                  {SESSION_TYPES.map(type => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <span className="text-sm text-gray-600 capitalize">{type === 'online' ? 'Online Video' : 'In-Person'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Max Price: <span className="text-emerald-600 font-semibold">₹{maxPrice.toLocaleString()}</span>
                </h3>
                <input
                  type="range"
                  className="w-full accent-emerald-600"
                  min="500"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹500</span>
                  <span>₹5000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-grow">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm shadow-sm"
              placeholder="Search by name, specialty, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Showing <span className="font-semibold text-gray-900">{filteredProfessionals.length}</span> professional{filteredProfessionals.length !== 1 ? 's' : ''}
          </p>

          {/* Results Grid */}
          <div className="space-y-6">
            {filteredProfessionals.length > 0 ? (
              filteredProfessionals.map(prof => (
                <div key={prof.id} className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-100 rounded-full flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold text-2xl md:text-4xl mx-auto md:mx-0">
                    {prof.firstName[0]}{prof.lastName[0]}
                  </div>

                  <div className="flex-grow text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{prof.firstName} {prof.lastName}</h3>
                        <p className="text-emerald-600 font-medium">{prof.type}</p>
                      </div>
                      <div className="flex items-center justify-center space-x-1 text-sm bg-amber-50 text-amber-700 px-2 py-1 rounded mt-2 md:mt-0">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{prof.rating}</span>
                        <span>({prof.reviewCount})</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{prof.about}</p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{prof.location}</div>
                      {prof.isOnlineAvailable && <div className="flex items-center"><Video className="w-4 h-4 mr-1" />Online</div>}
                      {prof.isInPersonAvailable && <div className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-emerald-500" />In-Person</div>}
                      <div className="font-medium text-gray-900">₹{prof.sessionFee} / session</div>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {prof.specializations.slice(0, 3).map(s => (
                        <span
                          key={s}
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                            selectedSpecs.includes(s)
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-gray-50 border border-gray-100 text-gray-600 hover:bg-emerald-50'
                          }`}
                          onClick={() => toggleSpec(s)}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6 mt-2 md:mt-0 gap-3">
                    <Link
                      to={`${window.location.pathname.startsWith('/patient') ? '/patient' : window.location.pathname.startsWith('/student') ? '/student' : ''}/professionals/${prof.id}`}
                      className="w-full bg-emerald-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => handleBookSession(prof.id)}
                      className="w-full bg-white border border-emerald-600 text-emerald-600 text-center py-3 px-6 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No professionals found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search terms or filters.</p>
                {hasActiveFilters && (
                  <button
                    onClick={() => { setSelectedSpecs([]); setSelectedTypes([]); setMaxPrice(5000); setSearchTerm(''); }}
                    className="text-emerald-600 font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
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
