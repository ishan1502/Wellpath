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

  const handleApply = async () => {
    if (!selectedProfessional || !user || !isWordCountValid) return;

    try {
      // Lazy-import to avoid modifying file top-level imports significantly if studentService isn't there
      const { studentService } = await import('../../services/studentService');
      
      const profileSummary = useProfileAsResume && studentProfile
        ? `\n\n--- Profile Summary ---\nField of Study: ${studentProfile.fieldOfStudy || 'N/A'}\nCurrent Year: ${studentProfile.currentYear || 'N/A'}\nSkills: ${(studentProfile.skills || []).join(', ') || 'N/A'}\nEducation: ${(studentProfile.education || []).map((e: any) => `${e.degree} at ${e.institution} (${e.year})`).join('; ') || 'N/A'}\nCertificates: ${(studentProfile.certificates || []).map((c: any) => c.name).join(', ') || 'N/A'}`
        : '';

      await studentService.applyForInternship({
        studentId: user.id,
        professionalId: selectedProfessional.id,
        motivationText: motivationText + profileSummary,
        useProfileResume: useProfileAsResume
      });

      setSelectedProfessional(null);
      setMotivationText('');
      setUseProfileAsResume(false);
      alert('Application submitted successfully!');
    } catch (err) {
      console.error('Failed to submit application', err);
      alert('Failed to submit application. Please try again later.');
    }
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
    <div className="space-y-8 animate-fade-in font-sans text-primary-dark">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Find Internships</h1>
        <p className="text-primary-hover/80 font-medium mt-2">
          Apply to learn directly from verified mental health professionals.
        </p>
      </div>

      <div className="bg-surface rounded-xl p-3 border-0 shadow-sm flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-muted rounded-lg flex items-center justify-center shrink-0">
          <Search className="text-primary w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search by specialty, name, or location..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent border-none focus:ring-0 text-primary-dark font-medium placeholder:text-primary-dark/30 outline-none"
        />
        <button className="px-6 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-all shadow-md hover:shadow-lg">
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
          <p className="mt-4 text-primary-dark/60 font-bold">Loading opportunities...</p>
        </div>
      ) : filteredProfessionals.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-xl border-0 shadow-sm">
          <Briefcase className="w-16 h-16 text-primary-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-primary-dark">No opportunities found</h3>
          <p className="text-primary-hover/60 mt-2 font-medium max-w-md mx-auto">
            {searchQuery
              ? `No professionals matched "${searchQuery}". Try a different search.`
              : 'There are currently no professionals accepting interns.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProfessionals.map((prof) => (
            <div key={prof.id} className="bg-surface rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
              <div className="p-8 flex-1">
                <div className="flex gap-6">
                  {prof.avatarUrl ? (
                    <img src={prof.avatarUrl} alt={prof.firstName} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-primary-muted border border-primary-muted flex items-center justify-center text-primary-dark font-extrabold text-2xl shrink-0 shadow-sm">
                      {prof.firstName.charAt(0)}{prof.lastName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-xl text-primary-dark">Dr. {prof.firstName} {prof.lastName}</h3>
                    <p className="text-primary text-sm font-bold mt-1">{prof.type}</p>
                    <div className="flex flex-wrap items-center text-xs font-bold text-primary-dark/70 mt-3 gap-3">
                      <span className="flex items-center bg-background px-2 py-1 rounded-lg border border-gray-100"><Star className="w-3.5 h-3.5 text-amber-400 mr-1.5" fill="currentColor" /> {prof.rating}</span>
                      <span className="flex items-center bg-background px-2 py-1 rounded-lg border border-gray-100"><MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" /> {prof.location || 'Remote'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50">
                  <p className="text-sm text-primary-dark/70 font-medium leading-relaxed line-clamp-2">{prof.about}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {prof.specializations.slice(0, 3).map((spec, i) => (
                    <span key={i} className="px-3 py-1.5 bg-primary-muted border border-primary-muted text-primary-dark text-xs rounded-xl font-bold">{spec}</span>
                  ))}
                  {prof.specializations.length > 3 && (
                    <span className="px-3 py-1.5 bg-primary-muted border border-primary-muted text-primary-dark text-xs rounded-xl font-bold">+{prof.specializations.length - 3} more</span>
                  )}
                </div>
              </div>
              <div className="p-5 bg-background/50 border-t border-gray-50">
                <button
                  onClick={() => setSelectedProfessional(prof)}
                  className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-all shadow-sm hover:shadow-md flex items-center justify-center"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/40 backdrop-blur-sm animate-in">
          <div className="bg-surface rounded-xl shadow-lg w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col font-sans text-primary-dark">
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center shrink-0 bg-background/50">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  Apply to Dr. {selectedProfessional.firstName} {selectedProfessional.lastName}
                </h3>
                <p className="text-sm text-primary font-bold mt-1">Submit your internship application</p>
              </div>
              <button onClick={closeModal} className="p-3 bg-surface rounded-full text-primary-dark/50 hover:text-primary-dark hover:bg-primary-muted transition-all shadow-sm">
                <span className="text-xl leading-none font-bold">×</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto space-y-8 flex-1">
              {/* Profile as Resume toggle */}
              <div className="flex items-start gap-4 p-6 rounded-xl border border-primary-muted bg-primary-muted/50 shadow-sm">
                <div className="mt-1 relative flex items-center">
                  <input
                    id="useProfile"
                    type="checkbox"
                    checked={useProfileAsResume}
                    onChange={e => setUseProfileAsResume(e.target.checked)}
                    className="w-5 h-5 text-primary border-primary-muted-foreground rounded focus:ring-ring cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="useProfile" className="text-base font-bold cursor-pointer flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-primary" />
                    Attach Profile as Resume
                  </label>
                  <p className="text-sm text-primary-hover/70 font-medium mt-1">
                    Your education, certifications, and skills will be included with your application.
                    {!studentProfile && (
                      <Link
                        to="/student/profile"
                        onClick={closeModal}
                        className="text-primary hover:text-primary-hover underline font-bold ml-1.5"
                      >
                        Set up your profile first →
                      </Link>
                    )}
                  </p>
                  {useProfileAsResume && studentProfile && (
                    <div className="mt-4 p-4 bg-surface rounded-lg border border-primary-muted text-sm font-medium text-primary-dark space-y-2 shadow-sm">
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
                    wordCount === 0 ? 'bg-surface-hover text-muted-foreground' :
                    wordCount < MIN_WORDS ? 'bg-amber-100 text-amber-700' :
                    wordCount > MAX_WORDS ? 'bg-red-100 text-red-700' :
                    'bg-primary-muted text-primary-hover'
                  }`}>
                    {wordCount} / {MAX_WORDS} words
                  </span>
                </div>
                <textarea
                  rows={8}
                  className="w-full rounded-lg border border-border bg-background/50 shadow-inner focus:border-primary focus:ring-2 focus:ring-ring/20 text-sm font-medium p-5 resize-none outline-none transition-all"
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
                    <p className="text-sm font-bold text-primary flex items-center gap-1.5">✓ Word count is optimal</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-background/50 border-t border-gray-100 flex justify-end gap-4 shrink-0">
              <button
                onClick={closeModal}
                className="px-6 py-4 bg-surface border border-border rounded-lg font-bold text-muted-foreground hover:bg-background transition-all shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={!isWordCountValid}
                className="px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
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
