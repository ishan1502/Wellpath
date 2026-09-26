import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Briefcase, FileText, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { professionalService } from '@/services/professionalService';
import { Professional } from '@/types';
import { Link } from 'react-router-dom';

const PROFILE_KEY = 'wellpath_student_profile';
const MIN_WORDS = 300;
const MAX_WORDS = 500;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function FindInternship() {
  const { user } = useAuth();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Apply modal state
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [motivationText, setMotivationText] = useState('');
  const [useProfileAsResume, setUseProfileAsResume] = useState(false);
  const [studentProfile, setStudentProfile] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem(PROFILE_KEY);
    if (stored) {
      try { setStudentProfile(JSON.parse(stored)); } catch {}
    }
  }, []);

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      try {
        const data = await professionalService.getProfessionals();
        setProfessionals(data.filter(p => p.acceptsInterns));
      } catch (error) {
        console.error('Failed to load professionals', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionals();
  }, []);

  const wordCount = countWords(motivationText);
  const isWordCountValid = wordCount >= MIN_WORDS && wordCount <= MAX_WORDS;

  const handleApply = () => {
    if (!selectedProfessional || !user || !isWordCountValid) return;

    const profileSummary = useProfileAsResume && studentProfile
      ? `\n\n--- Profile Summary ---\nField of Study: ${studentProfile.fieldOfStudy || 'N/A'}\nCurrent Year: ${studentProfile.currentYear || 'N/A'}\nSkills: ${(studentProfile.skills || []).join(', ') || 'N/A'}\nEducation: ${(studentProfile.education || []).map((e: any) => `${e.degree} at ${e.institution} (${e.year})`).join('; ') || 'N/A'}\nCertificates: ${(studentProfile.certificates || []).map((c: any) => c.name).join(', ') || 'N/A'}`
      : '';

    const newApp = {
      id: Math.random().toString(36).substring(2),
      studentId: user.id,
      professionalId: selectedProfessional.id,
      professionalName: `Dr. ${selectedProfessional.firstName} ${selectedProfessional.lastName}`,
      status: 'pending',
      motivationText: motivationText + profileSummary,
      appliedAt: new Date().toISOString(),
      location: selectedProfessional.location || 'Remote',
      useProfileAsResume,
    };

    const existingApps = JSON.parse(localStorage.getItem('wellpath_internship_applications') || '[]');
    localStorage.setItem('wellpath_internship_applications', JSON.stringify([...existingApps, newApp]));

    setSelectedProfessional(null);
    setMotivationText('');
    setUseProfileAsResume(false);
    alert('Application submitted successfully!');
  };

  const closeModal = () => {
    setSelectedProfessional(null);
    setMotivationText('');
    setUseProfileAsResume(false);
  };

  const filteredProfessionals = professionals.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
      p.type?.toLowerCase().includes(q) ||
      (p.location || '').toLowerCase().includes(q) ||
      p.specializations.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-fade-in font-sans text-emerald-900">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Find Internships</h1>
        <p className="text-emerald-700/80 font-medium mt-2">
          Apply to learn directly from verified mental health professionals.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-3 border-0 shadow-sm flex items-center gap-3">
        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
          <Search className="text-emerald-600 w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search by specialty, name, or location..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent border-none focus:ring-0 text-emerald-900 font-medium placeholder:text-emerald-900/30 outline-none"
        />
        <button className="px-6 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg">
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full" />
          <p className="mt-4 text-emerald-900/60 font-bold">Loading opportunities...</p>
        </div>
      ) : filteredProfessionals.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-0 shadow-sm">
          <Briefcase className="w-16 h-16 text-emerald-100 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-emerald-900">No opportunities found</h3>
          <p className="text-emerald-700/60 mt-2 font-medium max-w-md mx-auto">
            {searchQuery
              ? `No professionals matched "${searchQuery}". Try a different search.`
              : 'There are currently no professionals accepting interns.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProfessionals.map((prof) => (
            <div key={prof.id} className="bg-white rounded-3xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="p-8 flex-1">
                <div className="flex gap-6">
                  {prof.avatarUrl ? (
                    <img src={prof.avatarUrl} alt={prof.firstName} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-900 font-extrabold text-2xl shrink-0 shadow-sm">
                      {prof.firstName.charAt(0)}{prof.lastName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-xl text-emerald-900">Dr. {prof.firstName} {prof.lastName}</h3>
                    <p className="text-emerald-600 text-sm font-bold mt-1">{prof.type}</p>
                    <div className="flex flex-wrap items-center text-xs font-bold text-emerald-800/70 mt-3 gap-3">
                      <span className="flex items-center bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><Star className="w-3.5 h-3.5 text-amber-400 mr-1.5" fill="currentColor" /> {prof.rating}</span>
                      <span className="flex items-center bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><MapPin className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> {prof.location || 'Remote'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50">
                  <p className="text-sm text-emerald-900/70 font-medium leading-relaxed line-clamp-2">{prof.about}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {prof.specializations.slice(0, 3).map((spec, i) => (
                    <span key={i} className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-900 text-xs rounded-xl font-bold">{spec}</span>
                  ))}
                  {prof.specializations.length > 3 && (
                    <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-900 text-xs rounded-xl font-bold">+{prof.specializations.length - 3} more</span>
                  )}
                </div>
              </div>
              <div className="p-5 bg-gray-50/50 border-t border-gray-50">
                <button
                  onClick={() => setSelectedProfessional(prof)}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center"
                >
                  <FileText className="w-5 h-5 mr-2" /> Apply for Internship
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Modal */}
      {selectedProfessional && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-900/40 backdrop-blur-sm animate-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col font-sans text-emerald-900">
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center shrink-0 bg-gray-50/50">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  Apply to Dr. {selectedProfessional.firstName} {selectedProfessional.lastName}
                </h3>
                <p className="text-sm text-emerald-600 font-bold mt-1">Submit your internship application</p>
              </div>
              <button onClick={closeModal} className="p-3 bg-white rounded-full text-emerald-900/50 hover:text-emerald-900 hover:bg-emerald-50 transition-all shadow-sm">
                <span className="text-xl leading-none font-bold">×</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto space-y-8 flex-1">
              {/* Profile as Resume toggle */}
              <div className="flex items-start gap-4 p-6 rounded-3xl border border-emerald-100 bg-emerald-50/50 shadow-sm">
                <div className="mt-1 relative flex items-center">
                  <input
                    id="useProfile"
                    type="checkbox"
                    checked={useProfileAsResume}
                    onChange={e => setUseProfileAsResume(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="useProfile" className="text-base font-bold cursor-pointer flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-emerald-600" />
                    Attach Profile as Resume
                  </label>
                  <p className="text-sm text-emerald-700/70 font-medium mt-1">
                    Your education, certifications, and skills will be included with your application.
                    {!studentProfile && (
                      <Link
                        to="/student/profile"
                        onClick={closeModal}
                        className="text-emerald-600 hover:text-emerald-700 underline font-bold ml-1.5"
                      >
                        Set up your profile first →
                      </Link>
                    )}
                  </p>
                  {useProfileAsResume && studentProfile && (
                    <div className="mt-4 p-4 bg-white rounded-2xl border border-emerald-100 text-sm font-medium text-emerald-800 space-y-2 shadow-sm">
                      {studentProfile.fieldOfStudy && <p className="flex items-center gap-2">📚 {studentProfile.fieldOfStudy} · {studentProfile.currentYear}</p>}
                      {studentProfile.education?.length > 0 && <p className="flex items-center gap-2">🎓 {studentProfile.education.length} education entr{studentProfile.education.length === 1 ? 'y' : 'ies'}</p>}
                      {studentProfile.certificates?.length > 0 && <p className="flex items-center gap-2">🏆 {studentProfile.certificates.length} certificate(s)</p>}
                      {studentProfile.skills?.length > 0 && <p className="flex items-center gap-2">⚡ {studentProfile.skills.slice(0, 4).join(', ')}{studentProfile.skills.length > 4 ? '...' : ''}</p>}
                    </div>
                  )}
                </div>
              </div>

              {/* Motivation Statement */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-base font-bold">
                    Motivation Statement <span className="text-red-500">*</span>
                  </label>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                    wordCount === 0 ? 'bg-gray-100 text-gray-500' :
                    wordCount < MIN_WORDS ? 'bg-amber-100 text-amber-700' :
                    wordCount > MAX_WORDS ? 'bg-red-100 text-red-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {wordCount} / {MAX_WORDS} words
                  </span>
                </div>
                <textarea
                  rows={8}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 shadow-inner focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium p-5 resize-none outline-none transition-all"
                  placeholder={`Write your motivation statement — minimum ${MIN_WORDS} words, maximum ${MAX_WORDS} words. Explain why you want to intern with them, your background, and what you hope to learn...`}
                  value={motivationText}
                  onChange={e => setMotivationText(e.target.value)}
                />
                <div className="mt-3">
                  {wordCount > 0 && wordCount < MIN_WORDS && (
                    <p className="text-sm font-bold text-amber-600 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {MIN_WORDS - wordCount} more words needed (minimum {MIN_WORDS})
                    </p>
                  )}
                  {wordCount > MAX_WORDS && (
                    <p className="text-sm font-bold text-red-600 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {wordCount - MAX_WORDS} words over the limit (maximum {MAX_WORDS})
                    </p>
                  )}
                  {isWordCountValid && (
                    <p className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">✓ Word count is optimal</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-4 shrink-0">
              <button
                onClick={closeModal}
                className="px-6 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={!isWordCountValid}
                className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
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
