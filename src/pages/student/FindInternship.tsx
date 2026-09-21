import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Briefcase, FileText } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { professionalService } from '@/services/professionalService';
import { Professional } from '@/types';

export default function FindInternship() {
  const { user } = useAuth();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  
  // For application modal
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [motivationText, setMotivationText] = useState('');
  
  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      try {
        const data = await professionalService.getProfessionals();
        // Only show those accepting interns
        setProfessionals(data.filter(p => p.acceptsInterns));
      } catch (error) {
        console.error("Failed to load professionals", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfessionals();
  }, []);

  const handleApply = () => {
    if (!selectedProfessional || !user) return;
    
    const newApp = {
      id: Math.random().toString(36).substring(2),
      studentId: user.id,
      professionalId: selectedProfessional.id,
      professionalName: `${selectedProfessional.firstName} ${selectedProfessional.lastName}`,
      status: 'pending',
      motivationText,
      appliedAt: new Date().toISOString(),
      location: selectedProfessional.location || 'Remote'
    };

    const existingApps = JSON.parse(localStorage.getItem('wellpath_internship_applications') || '[]');
    localStorage.setItem('wellpath_internship_applications', JSON.stringify([...existingApps, newApp]));
    
    setSelectedProfessional(null);
    setMotivationText('');
    alert('Application submitted successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Find Internships</h1>
        <p className="text-text-muted mt-1">
          Apply to learn directly from verified mental health professionals.
        </p>
      </div>

      <div className="bg-surface rounded-xl p-4 border border-border shadow-sm flex items-center gap-3">
        <Search className="text-gray-400 w-5 h-5 ml-2" />
        <input 
          type="text" 
          placeholder="Search by specialty, name, or location..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-text-main placeholder:text-gray-400"
        />
        <button className="px-4 py-2 bg-primary text-primary-content rounded-lg font-medium hover:bg-primary-dark transition-colors">
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          <p className="mt-4 text-text-muted">Loading opportunities...</p>
        </div>
      ) : professionals.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No opportunities found</h3>
          <p className="text-gray-500 mt-1">There are currently no professionals accepting interns.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {professionals.map((prof) => (
            <div key={prof.id} className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    {prof.avatarUrl ? (
                      <img src={prof.avatarUrl} alt={prof.firstName} className="w-14 h-14 rounded-full object-cover border border-gray-200" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                        {prof.firstName.charAt(0)}{prof.lastName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg text-text-main">
                        Dr. {prof.firstName} {prof.lastName}
                      </h3>
                      <p className="text-primary text-sm font-medium">{prof.type}</p>
                      <div className="flex items-center text-sm text-text-muted mt-1 gap-3">
                        <span className="flex items-center"><Star className="w-3.5 h-3.5 text-amber-400 mr-1" fill="currentColor"/> {prof.rating}</span>
                        <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1"/> {prof.location || 'Remote'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-text-muted line-clamp-2">
                    {prof.about}
                  </p>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {prof.specializations.slice(0, 3).map((spec, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      {spec}
                    </span>
                  ))}
                  {prof.specializations.length > 3 && (
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      +{prof.specializations.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-border mt-auto">
                <button 
                  onClick={() => setSelectedProfessional(prof)}
                  className="w-full py-2 bg-primary text-primary-content rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center"
                >
                  <FileText className="w-4 h-4 mr-2" /> Apply for Internship
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Modal */}
      {selectedProfessional && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-bold text-text-main">
                Apply to Dr. {selectedProfessional.firstName} {selectedProfessional.lastName}
              </h3>
              <button 
                onClick={() => setSelectedProfessional(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Tell the professional why you want to intern with them and what you hope to learn. 
                Your profile information will be shared automatically.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Motivation Statement
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                    placeholder="I am highly interested in learning from your practice..."
                    value={motivationText}
                    onChange={(e) => setMotivationText(e.target.value)}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attach Resume (Mock)
                  </label>
                  <input type="file" className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary/10 file:text-primary
                    hover:file:bg-primary/20
                  "/>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-border flex justify-end gap-3">
              <button 
                onClick={() => setSelectedProfessional(null)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleApply}
                disabled={!motivationText.trim()}
                className="px-4 py-2 bg-primary text-primary-content rounded-lg text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
