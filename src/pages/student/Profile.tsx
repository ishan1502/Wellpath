import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, GraduationCap, Award, Briefcase, Plus, Trash2, 
  Save, Edit3, CheckCircle2, BookOpen, Globe, Phone, MapPin
} from 'lucide-react';

const PROFILE_KEY = 'wellpath_student_profile';

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

interface StudentProfile {
  bio: string;
  phone: string;
  location: string;
  website: string;
  currentYear: string;
  fieldOfStudy: string;
  skills: string[];
  education: Education[];
  certificates: Certificate[];
}

const defaultProfile: StudentProfile = {
  bio: '',
  phone: '',
  location: '',
  website: '',
  currentYear: '',
  fieldOfStudy: '',
  skills: [],
  education: [],
  certificates: [],
};

export default function StudentProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [saved, setSaved] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  // Edit states
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);

  // New item drafts
  const [newEdu, setNewEdu] = useState<Omit<Education, 'id'> | null>(null);
  const [newCert, setNewCert] = useState<Omit<Certificate, 'id'> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(PROFILE_KEY);
    if (stored) {
      try { setProfile(JSON.parse(stored)); } catch {}
    }
  }, []);

  const saveProfile = (updated: StudentProfile) => {
    setProfile(updated);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleFieldChange = (field: keyof StudentProfile, value: any) => {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
  };

  const handleSave = () => saveProfile(profile);

  // Skills
  const addSkill = () => {
    const s = newSkill.trim();
    if (!s || profile.skills.includes(s)) return;
    handleFieldChange('skills', [...profile.skills, s]);
    setNewSkill('');
  };
  const removeSkill = (s: string) => handleFieldChange('skills', profile.skills.filter(x => x !== s));

  // Education
  const addEducation = () => {
    if (!newEdu?.degree || !newEdu?.institution) return;
    const edu: Education = { id: Date.now().toString(), ...newEdu };
    handleFieldChange('education', [...profile.education, edu]);
    setNewEdu(null);
  };
  const removeEducation = (id: string) => handleFieldChange('education', profile.education.filter(e => e.id !== id));

  // Certificates
  const addCertificate = () => {
    if (!newCert?.name || !newCert?.issuer) return;
    const cert: Certificate = { id: Date.now().toString(), ...newCert };
    handleFieldChange('certificates', [...profile.certificates, cert]);
    setNewCert(null);
  };
  const removeCertificate = (id: string) => handleFieldChange('certificates', profile.certificates.filter(c => c.id !== id));

  return (
    <div className="space-y-8 max-w-3xl animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">My Profile</h1>
          <p className="text-text-muted mt-1 text-sm">
            This information is used as your resume when applying for internships.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Profile'}
        </button>
      </div>

      {/* Basic Info Card */}
      <section className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-text-main">Personal Information</h2>
        </div>

        {/* Avatar placeholder */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-2xl border-2 border-emerald-200">
            {user?.firstName?.charAt(0) || 'S'}{user?.lastName?.charAt(0) || ''}
          </div>
          <div>
            <p className="text-sm font-semibold text-text-main">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-text-muted">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Field of Study</label>
            <input
              type="text"
              placeholder="e.g. Clinical Psychology"
              value={profile.fieldOfStudy}
              onChange={e => handleFieldChange('fieldOfStudy', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Current Year / Semester</label>
            <input
              type="text"
              placeholder="e.g. 3rd Year, Semester 6"
              value={profile.currentYear}
              onChange={e => handleFieldChange('currentYear', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1 flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={profile.phone}
              onChange={e => handleFieldChange('phone', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</label>
            <input
              type="text"
              placeholder="e.g. Mumbai, Maharashtra"
              value={profile.location}
              onChange={e => handleFieldChange('location', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-text-muted mb-1 flex items-center gap-1"><Globe className="w-3 h-3" /> LinkedIn / Portfolio URL</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={profile.website}
              onChange={e => handleFieldChange('website', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-text-muted mb-1">Short Bio</label>
            <textarea
              rows={3}
              placeholder="Tell professionals a little about yourself and your interests..."
              value={profile.bio}
              onChange={e => handleFieldChange('bio', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-text-main">Education</h2>
          </div>
          {!newEdu && (
            <button
              onClick={() => setNewEdu({ degree: '', institution: '', year: '', grade: '' })}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-emerald-700 border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-emerald-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Education
            </button>
          )}
        </div>

        {profile.education.length === 0 && !newEdu && (
          <p className="text-sm text-text-muted text-center py-4 border border-dashed border-border rounded-xl">
            No education added yet. Click "Add Education" to get started.
          </p>
        )}

        <div className="space-y-3">
          {profile.education.map(edu => (
            <div key={edu.id} className="flex items-start justify-between p-4 rounded-xl border border-border bg-gray-50/50">
              <div>
                <p className="text-sm font-semibold text-text-main">{edu.degree}</p>
                <p className="text-xs text-text-muted">{edu.institution} · {edu.year}</p>
                {edu.grade && <p className="text-xs text-emerald-700 font-medium mt-0.5">Grade: {edu.grade}</p>}
              </div>
              <button onClick={() => removeEducation(edu.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Education Form */}
        {newEdu && (
          <div className="p-4 rounded-xl border border-primary/30 bg-emerald-50/30 space-y-3">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wide">New Education Entry</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Degree / Program *</label>
                <input type="text" placeholder="e.g. B.Sc Psychology" value={newEdu.degree}
                  onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Institution *</label>
                <input type="text" placeholder="e.g. Delhi University" value={newEdu.institution}
                  onChange={e => setNewEdu({ ...newEdu, institution: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Year / Duration</label>
                <input type="text" placeholder="e.g. 2022 – 2025" value={newEdu.year}
                  onChange={e => setNewEdu({ ...newEdu, year: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Grade / CGPA (optional)</label>
                <input type="text" placeholder="e.g. 8.5 / 10" value={newEdu.grade}
                  onChange={e => setNewEdu({ ...newEdu, grade: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={addEducation} className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-emerald-700">Add</button>
              <button onClick={() => setNewEdu(null)} className="px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        )}
      </section>

      {/* Certificates Section */}
      <section className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-text-main">Certifications & Courses</h2>
          </div>
          {!newCert && (
            <button
              onClick={() => setNewCert({ name: '', issuer: '', year: '', credentialId: '' })}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-emerald-700 border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-emerald-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Certificate
            </button>
          )}
        </div>

        {profile.certificates.length === 0 && !newCert && (
          <p className="text-sm text-text-muted text-center py-4 border border-dashed border-border rounded-xl">
            No certificates added yet. Add courses, workshops, or training programs.
          </p>
        )}

        <div className="space-y-3">
          {profile.certificates.map(cert => (
            <div key={cert.id} className="flex items-start justify-between p-4 rounded-xl border border-border bg-gray-50/50">
              <div>
                <p className="text-sm font-semibold text-text-main">{cert.name}</p>
                <p className="text-xs text-text-muted">{cert.issuer} · {cert.year}</p>
                {cert.credentialId && <p className="text-xs text-gray-400 mt-0.5 font-mono">ID: {cert.credentialId}</p>}
              </div>
              <button onClick={() => removeCertificate(cert.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Certificate Form */}
        {newCert && (
          <div className="p-4 rounded-xl border border-primary/30 bg-emerald-50/30 space-y-3">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wide">New Certificate</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Certificate Name *</label>
                <input type="text" placeholder="e.g. CBT Foundations Course" value={newCert.name}
                  onChange={e => setNewCert({ ...newCert, name: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Issuing Organization *</label>
                <input type="text" placeholder="e.g. Coursera / NIMHANS" value={newCert.issuer}
                  onChange={e => setNewCert({ ...newCert, issuer: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Year</label>
                <input type="text" placeholder="e.g. 2024" value={newCert.year}
                  onChange={e => setNewCert({ ...newCert, year: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Credential ID (optional)</label>
                <input type="text" placeholder="e.g. CERT-12345" value={newCert.credentialId}
                  onChange={e => setNewCert({ ...newCert, credentialId: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={addCertificate} className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-emerald-700">Add</button>
              <button onClick={() => setNewCert(null)} className="px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        )}
      </section>

      {/* Skills Section */}
      <section className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-text-main">Skills & Competencies</h2>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {profile.skills.map(skill => (
            <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-medium">
              {skill}
              <button onClick={() => removeSkill(skill)} className="text-emerald-600 hover:text-red-500 transition-colors">
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
          {profile.skills.length === 0 && (
            <span className="text-xs text-text-muted">No skills added yet.</span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. CBT, Active Listening, SPSS..."
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
            className="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Save button bottom */}
      <div className="flex justify-end pb-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Profile Saved!' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
