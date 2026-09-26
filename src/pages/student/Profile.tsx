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
    <div className="space-y-10 max-w-4xl mx-auto animate-fade-in font-sans text-emerald-900 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Profile</h1>
          <p className="text-emerald-700/80 font-medium mt-2">
            This information is used as your resume when applying for internships.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
        >
          {saved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {saved ? 'Saved Successfully!' : 'Save Profile'}
        </button>
      </div>

      {/* Basic Info Card */}
      <section className="bg-white rounded-3xl border-0 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 space-y-8">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="p-2.5 bg-emerald-50 rounded-xl">
            <User className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-xl font-extrabold">Personal Information</h2>
        </div>

        {/* Avatar placeholder */}
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-900 font-extrabold text-3xl shadow-sm">
            {user?.firstName?.charAt(0) || 'S'}{user?.lastName?.charAt(0) || ''}
          </div>
          <div>
            <p className="text-2xl font-bold">{user?.firstName} {user?.lastName}</p>
            <p className="text-emerald-700/70 font-medium mt-1 bg-gray-50 px-3 py-1 rounded-lg w-fit border border-gray-100">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold ml-1">Field of Study</label>
            <input
              type="text"
              placeholder="e.g. Clinical Psychology"
              value={profile.fieldOfStudy}
              onChange={e => handleFieldChange('fieldOfStudy', e.target.value)}
              className="w-full border-gray-200 bg-gray-50/50 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold ml-1">Current Year / Semester</label>
            <input
              type="text"
              placeholder="e.g. 3rd Year, Semester 6"
              value={profile.currentYear}
              onChange={e => handleFieldChange('currentYear', e.target.value)}
              className="w-full border-gray-200 bg-gray-50/50 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold ml-1 flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-600/50" /> Phone</label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={profile.phone}
              onChange={e => handleFieldChange('phone', e.target.value)}
              className="w-full border-gray-200 bg-gray-50/50 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold ml-1 flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600/50" /> Location</label>
            <input
              type="text"
              placeholder="e.g. Mumbai, Maharashtra"
              value={profile.location}
              onChange={e => handleFieldChange('location', e.target.value)}
              className="w-full border-gray-200 bg-gray-50/50 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-bold ml-1 flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-600/50" /> LinkedIn / Portfolio URL</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={profile.website}
              onChange={e => handleFieldChange('website', e.target.value)}
              className="w-full border-gray-200 bg-gray-50/50 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-bold ml-1">Short Bio</label>
            <textarea
              rows={4}
              placeholder="Tell professionals a little about yourself and your interests..."
              value={profile.bio}
              onChange={e => handleFieldChange('bio', e.target.value)}
              className="w-full border-gray-200 bg-gray-50/50 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-white rounded-3xl border-0 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl">
              <GraduationCap className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-extrabold">Education</h2>
          </div>
          {!newEdu && (
            <button
              onClick={() => setNewEdu({ degree: '', institution: '', year: '', grade: '' })}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl px-4 py-2.5 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          )}
        </div>

        {profile.education.length === 0 && !newEdu && (
          <div className="text-sm font-medium text-emerald-900/40 text-center py-10 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            No education added yet. Click "Add Education" to get started.
          </div>
        )}

        <div className="space-y-4">
          {profile.education.map(edu => (
            <div key={edu.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all">
              <div>
                <p className="text-lg font-bold">{edu.degree}</p>
                <div className="flex flex-wrap gap-2 text-sm font-medium text-emerald-700/70 mt-1">
                  <span>{edu.institution}</span>
                  <span className="opacity-50">•</span>
                  <span>{edu.year}</span>
                </div>
                {edu.grade && <p className="text-sm text-emerald-600 font-bold mt-2 bg-emerald-50 px-3 py-1 rounded-lg w-fit">Grade: {edu.grade}</p>}
              </div>
              <button onClick={() => removeEducation(edu.id)} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Education Form */}
        {newEdu && (
          <div className="p-6 md:p-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-6 shadow-inner">
            <p className="text-sm font-extrabold text-emerald-800 uppercase tracking-widest">New Education Entry</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold ml-1">Degree / Program *</label>
                <input type="text" placeholder="e.g. B.Sc Psychology" value={newEdu.degree}
                  onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })}
                  className="w-full border-gray-200 bg-white rounded-xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold ml-1">Institution *</label>
                <input type="text" placeholder="e.g. Delhi University" value={newEdu.institution}
                  onChange={e => setNewEdu({ ...newEdu, institution: e.target.value })}
                  className="w-full border-gray-200 bg-white rounded-xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold ml-1">Year / Duration</label>
                <input type="text" placeholder="e.g. 2022 – 2025" value={newEdu.year}
                  onChange={e => setNewEdu({ ...newEdu, year: e.target.value })}
                  className="w-full border-gray-200 bg-white rounded-xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold ml-1">Grade / CGPA (optional)</label>
                <input type="text" placeholder="e.g. 8.5 / 10" value={newEdu.grade}
                  onChange={e => setNewEdu({ ...newEdu, grade: e.target.value })}
                  className="w-full border-gray-200 bg-white rounded-xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm" />
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <button onClick={addEducation} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md">Save Entry</button>
              <button onClick={() => setNewEdu(null)} className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm">Cancel</button>
            </div>
          </div>
        )}
      </section>

      {/* Certificates Section */}
      <section className="bg-white rounded-3xl border-0 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl">
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-extrabold">Certifications & Courses</h2>
          </div>
          {!newCert && (
            <button
              onClick={() => setNewCert({ name: '', issuer: '', year: '', credentialId: '' })}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl px-4 py-2.5 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Certificate
            </button>
          )}
        </div>

        {profile.certificates.length === 0 && !newCert && (
          <div className="text-sm font-medium text-emerald-900/40 text-center py-10 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            No certificates added yet. Add courses, workshops, or training programs.
          </div>
        )}

        <div className="space-y-4">
          {profile.certificates.map(cert => (
            <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all">
              <div>
                <p className="text-lg font-bold">{cert.name}</p>
                <div className="flex flex-wrap gap-2 text-sm font-medium text-emerald-700/70 mt-1">
                  <span>{cert.issuer}</span>
                  <span className="opacity-50">•</span>
                  <span>{cert.year}</span>
                </div>
                {cert.credentialId && <p className="text-sm text-gray-500 font-mono font-bold mt-2 bg-gray-100 px-3 py-1 rounded-lg w-fit border border-gray-200">ID: {cert.credentialId}</p>}
              </div>
              <button onClick={() => removeCertificate(cert.id)} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Certificate Form */}
        {newCert && (
          <div className="p-6 md:p-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-6 shadow-inner">
            <p className="text-sm font-extrabold text-emerald-800 uppercase tracking-widest">New Certificate</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold ml-1">Certificate Name *</label>
                <input type="text" placeholder="e.g. CBT Foundations Course" value={newCert.name}
                  onChange={e => setNewCert({ ...newCert, name: e.target.value })}
                  className="w-full border-gray-200 bg-white rounded-xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold ml-1">Issuing Organization *</label>
                <input type="text" placeholder="e.g. Coursera / NIMHANS" value={newCert.issuer}
                  onChange={e => setNewCert({ ...newCert, issuer: e.target.value })}
                  className="w-full border-gray-200 bg-white rounded-xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold ml-1">Year</label>
                <input type="text" placeholder="e.g. 2024" value={newCert.year}
                  onChange={e => setNewCert({ ...newCert, year: e.target.value })}
                  className="w-full border-gray-200 bg-white rounded-xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold ml-1">Credential ID (optional)</label>
                <input type="text" placeholder="e.g. CERT-12345" value={newCert.credentialId}
                  onChange={e => setNewCert({ ...newCert, credentialId: e.target.value })}
                  className="w-full border-gray-200 bg-white rounded-xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm" />
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <button onClick={addCertificate} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md">Save Entry</button>
              <button onClick={() => setNewCert(null)} className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm">Cancel</button>
            </div>
          </div>
        )}
      </section>

      {/* Skills Section */}
      <section className="bg-white rounded-3xl border-0 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="p-2.5 bg-emerald-50 rounded-xl">
            <BookOpen className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-xl font-extrabold">Skills & Competencies</h2>
        </div>

        <div className="flex flex-wrap gap-3 min-h-[50px]">
          {profile.skills.map(skill => (
            <span key={skill} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-xl text-sm font-bold shadow-sm">
              {skill}
              <button onClick={() => removeSkill(skill)} className="p-1 bg-white rounded-lg text-emerald-600/50 hover:text-red-500 transition-colors shadow-sm border border-emerald-100">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          {profile.skills.length === 0 && (
            <span className="text-sm font-medium text-emerald-900/40 py-2">No skills added yet.</span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <input
            type="text"
            placeholder="e.g. CBT, Active Listening, SPSS..."
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
            className="flex-1 border-gray-200 bg-gray-50/50 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />
          <button
            onClick={addSkill}
            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Skill
          </button>
        </div>
      </section>
    </div>
  );
}
