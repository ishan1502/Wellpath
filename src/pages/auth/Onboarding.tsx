import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Upload, FileText, CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
type ProfessionalType = 'Psychiatrist' | 'Psychologist' | 'Clinical Psychologist' | '';
type UploadState = 'idle' | 'uploading' | 'done' | 'error';

interface DocSlot {
  key: string;       // storage slug: 'mbbs', 'md_dnb', etc.
  label: string;     // human readable label
  hint: string;      // helper text
}

// ── Document slot definitions per professional type ───────────────────────────
const DOC_SLOTS: Record<string, DocSlot[]> = {
  Psychiatrist: [
    { key: 'mbbs',    label: 'MBBS Certificate',                      hint: 'Upload your MBBS degree certificate (PDF/JPG/PNG)' },
    { key: 'md_dnb',  label: 'MD / DNB Psychiatry Certificate',       hint: 'Upload your MD or DNB Psychiatry certificate' },
    { key: 'nmc_reg', label: 'Medical Council / NMC Registration',    hint: 'Upload your Medical Council or NMC registration document' },
  ],
  Psychologist: [
    { key: 'psychology_degree', label: "Bachelor's / Master's Degree in Psychology", hint: "Upload your Bachelor's or Master's degree certificate" },
    { key: 'ncahp_reg',         label: 'NCAHP Professional Registration',           hint: 'Upload your NCAHP registration certificate (if applicable)' },
  ],
  'Clinical Psychologist': [
    { key: 'rci_qualification', label: 'RCI-Recognised Clinical Psychology Qualification', hint: 'Upload your RCI-recognised clinical psychology degree/diploma' },
    { key: 'rci_reg',           label: 'RCI / CRR Registration Certificate',              hint: 'Upload your RCI or CRR registration certificate' },
  ],
};

const TYPE_INFO: Record<string, string> = {
  Psychiatrist:
    'As a Psychiatrist, you must hold an MBBS degree, a post-graduate MD or DNB in Psychiatry, and be registered with the Medical Council of India (MCI) or National Medical Commission (NMC).',
  Psychologist:
    "As a Psychologist, you must hold a Bachelor's or Master's degree in Psychology and, where applicable, be registered under the NCAHP (National Commission for Allied and Healthcare Professions) framework.",
  'Clinical Psychologist':
    'As a Clinical Psychologist, you must hold an RCI-recognised qualification in Clinical Psychology and be registered with the Rehabilitation Council of India (RCI) or hold a Certificate of Registration (CRR).',
};

// ── FileSlotInput component ────────────────────────────────────────────────────
interface FileSlotProps {
  slot: DocSlot;
  file: File | null;
  uploadState: UploadState;
  onFileChange: (key: string, file: File | null) => void;
}

function FileSlot({ slot, file, uploadState, onFileChange }: FileSlotProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border">
        <div className="flex items-center gap-2">
          {uploadState === 'done' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          ) : uploadState === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          ) : (
            <FileText className="w-4 h-4 text-primary flex-shrink-0" />
          )}
          <span className="text-sm font-semibold text-foreground">{slot.label}</span>
          <span className="text-red-500 text-sm font-bold">*</span>
        </div>
        {file && (
          <button
            type="button"
            onClick={() => { onFileChange(slot.key, null); if (inputRef.current) inputRef.current.value = ''; }}
            className="text-muted-foreground hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="p-4">
        {file ? (
          <div className="flex items-center gap-3 text-sm">
            <FileText className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-foreground font-medium truncate">{file.name}</span>
            {uploadState === 'uploading' && (
              <span className="text-primary text-xs font-semibold ml-auto animate-pulse">Uploading...</span>
            )}
            {uploadState === 'done' && (
              <span className="text-emerald-600 text-xs font-semibold ml-auto">✓ Uploaded</span>
            )}
            {uploadState === 'error' && (
              <span className="text-red-500 text-xs font-semibold ml-auto">Upload failed</span>
            )}
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary-muted/30 transition-all group">
            <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors font-medium">
              Click to upload
            </span>
            <span className="text-xs text-muted-foreground">{slot.hint}</span>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0] || null;
                onFileChange(slot.key, f);
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Patient states
  const [age, setAge] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [clinicalFocusAreas, setClinicalFocusAreas] = useState('');

  // Student states
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [studentContact, setStudentContact] = useState('');
  const [studentDocs, setStudentDocs] = useState<File[]>([]);
  const [resumeDoc, setResumeDoc] = useState<File | null>(null);

  // Professional states
  const [professionalType, setProfessionalType] = useState<ProfessionalType>('');
  const [title, setTitle] = useState('');
  const [specializations, setSpecializations] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  // key = slot.key, value = File
  const [profDocs, setProfDocs] = useState<Record<string, File | null>>({});
  // key = slot.key, value = upload state
  const [uploadStates, setUploadStates] = useState<Record<string, UploadState>>({});

  const currentSlots = professionalType ? (DOC_SLOTS[professionalType] ?? []) : [];

  const handleTypeChange = (t: ProfessionalType) => {
    setProfessionalType(t);
    setTitle(t); // auto-fill title
    setProfDocs({});
    setUploadStates({});
  };

  const handleProfDocChange = (key: string, file: File | null) => {
    setProfDocs(prev => ({ ...prev, [key]: file }));
    setUploadStates(prev => ({ ...prev, [key]: 'idle' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setError('');

    try {
      if (user.role === 'patient') {
        const { error: pError } = await supabase.from('patients').insert([{
          id: user.id,
          age: parseInt(age),
          emergency_contact_name: emergencyContactName,
          emergency_contact_phone: emergencyContactPhone,
          clinical_focus: clinicalFocusAreas.split(',').map(s => s.trim()),
        }]);
        if (pError) throw pError;

      } else if (user.role === 'student') {
        if (studentDocs.length === 0) throw new Error('At least one verification document is required');
        if (!resumeDoc) throw new Error('Resume is required');

        const docUrls: string[] = [];
        for (const file of studentDocs) {
          const fileExt = file.name.split('.').pop();
          const fileName = `student/${user.id}/${Date.now()}-${file.name}`;
          const { error: uploadError } = await supabase.storage.from('Verification Documents').upload(fileName, file);
          if (uploadError) throw uploadError;
          const { data: { publicUrl } } = supabase.storage.from('Verification Documents').getPublicUrl(fileName);
          docUrls.push(publicUrl);
        }

        const resumeExt = resumeDoc.name.split('.').pop();
        const resumeFileName = `student/${user.id}/resume/${Date.now()}.${resumeExt}`;
        const { error: resumeUploadError } = await supabase.storage.from('Verification Documents').upload(resumeFileName, resumeDoc);
        if (resumeUploadError) throw resumeUploadError;
        const { data: { publicUrl: resumeUrl } } = supabase.storage.from('Verification Documents').getPublicUrl(resumeFileName);

        const { error: sError } = await supabase.from('students').insert([{
          id: user.id,
          university,
          degree,
          graduation_year: parseInt(graduationYear),
          contact_number: studentContact,
          documents_url: docUrls.join(','),
          resume_url: resumeUrl,
        }]);
        if (sError) throw sError;

      } else if (user.role === 'professional') {
        if (!professionalType) throw new Error('Please select your professional type');
        
        // Validate all slots are filled
        for (const slot of currentSlots) {
          if (!profDocs[slot.key]) {
            throw new Error(`Please upload: ${slot.label}`);
          }
        }

        // Upload each document slot
        const urlMap: Record<string, string> = { type: professionalType };
        
        for (const slot of currentSlots) {
          const file = profDocs[slot.key]!;
          const fileExt = file.name.split('.').pop();
          const filePath = `professional/${user.id}/${slot.key}/${Date.now()}.${fileExt}`;
          
          setUploadStates(prev => ({ ...prev, [slot.key]: 'uploading' }));
          
          const { error: uploadError } = await supabase.storage
            .from('Verification Documents')
            .upload(filePath, file);
          
          if (uploadError) {
            setUploadStates(prev => ({ ...prev, [slot.key]: 'error' }));
            throw uploadError;
          }
          
          const { data: { publicUrl } } = supabase.storage
            .from('Verification Documents')
            .getPublicUrl(filePath);
          
          urlMap[slot.key] = publicUrl;
          setUploadStates(prev => ({ ...prev, [slot.key]: 'done' }));
        }

        const { error: proError } = await supabase.from('professionals').insert([{
          id: user.id,
          title: title,
          specialty: specializations,
          hourly_rate: parseFloat(hourlyRate),
          verification_doc_url: JSON.stringify(urlMap),
          verification_status: 'pending',
        }]);
        if (proError) throw proError;
      }

      // Reload to trigger auth check
      window.location.href = '/';
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during onboarding.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  const isProfessional = user.role === 'professional';

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className={`w-full border-0 shadow-md rounded-xl bg-surface ${isProfessional ? 'max-w-2xl' : 'max-w-lg'}`}>
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-3xl font-bold text-primary-dark">Complete Your Profile</CardTitle>
          <p className="text-primary-hover/70 mt-2">Just a few more details to get you started as a {user.role}.</p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            {/* ── PATIENT ── */}
            {user.role === 'patient' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Age</label>
                  <Input type="number" required value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 30" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Emergency Contact Name</label>
                  <Input required value={emergencyContactName} onChange={e => setEmergencyContactName(e.target.value)} placeholder="Full Name" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Emergency Contact Phone</label>
                  <Input required value={emergencyContactPhone} onChange={e => setEmergencyContactPhone(e.target.value)} placeholder="Phone Number" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Clinical Focus Areas (comma separated)</label>
                  <Input required value={clinicalFocusAreas} onChange={e => setClinicalFocusAreas(e.target.value)} placeholder="e.g. Anxiety, Depression" className="rounded-xl" />
                </div>
              </>
            )}

            {/* ── STUDENT ── */}
            {user.role === 'student' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">University</label>
                  <Input required value={university} onChange={e => setUniversity(e.target.value)} placeholder="University Name" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Degree</label>
                  <Input required value={degree} onChange={e => setDegree(e.target.value)} placeholder="e.g. BSc Psychology" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Graduation Year</label>
                  <Input type="number" required value={graduationYear} onChange={e => setGraduationYear(e.target.value)} placeholder="e.g. 2025" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Contact Number</label>
                  <Input required type="tel" value={studentContact} onChange={e => setStudentContact(e.target.value)} placeholder="Phone Number" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Verification Documents</label>
                  {studentDocs.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {studentDocs.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-background p-2 rounded-lg border border-border">
                          <span className="text-sm truncate max-w-[250px] font-medium">{doc.name}</span>
                          <button
                            type="button"
                            onClick={() => setStudentDocs(docs => docs.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700 text-sm font-semibold px-2 py-1"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <Input
                    type="file"
                    multiple
                    required={studentDocs.length === 0}
                    onChange={e => {
                      if (e.target.files) setStudentDocs(prev => [...prev, ...Array.from(e.target.files!)]);
                      e.target.value = '';
                    }}
                    className="rounded-xl pt-2 cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Please upload your semester marksheets (if not graduated) or degree (if graduated).</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Resume</label>
                  <Input
                    type="file"
                    required={!resumeDoc}
                    onChange={e => setResumeDoc(e.target.files?.[0] || null)}
                    className="rounded-xl pt-2 cursor-pointer"
                  />
                  {resumeDoc && <p className="text-xs font-medium text-primary mt-1">Selected: {resumeDoc.name}</p>}
                  {!resumeDoc && <p className="text-xs text-muted-foreground mt-1">Please upload your latest resume.</p>}
                </div>
              </>
            )}

            {/* ── PROFESSIONAL ── */}
            {user.role === 'professional' && (
              <>
                {/* Step 1: Select type */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Professional Type <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={professionalType}
                    onChange={e => handleTypeChange(e.target.value as ProfessionalType)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring text-foreground font-medium"
                  >
                    <option value="">Select your professional type...</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="Psychologist">Psychologist</option>
                    <option value="Clinical Psychologist">Clinical Psychologist</option>
                  </select>
                </div>

                {/* Info box */}
                {professionalType && TYPE_INFO[professionalType] && (
                  <div className="flex gap-3 p-4 bg-primary-muted/40 border border-primary/30 rounded-xl">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-primary-dark leading-relaxed">{TYPE_INFO[professionalType]}</p>
                  </div>
                )}

                {/* Step 2: Specializations & rate */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Specializations (comma separated)</label>
                  <Input required value={specializations} onChange={e => setSpecializations(e.target.value)} placeholder="e.g. CBT, EMDR, Anxiety" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Session Fee (₹)</label>
                  <Input type="number" required value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="e.g. 1500" className="rounded-xl" />
                </div>

                {/* Step 3: Required documents */}
                {professionalType && currentSlots.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-primary-dark">Required Documents</label>
                      <span className="text-xs text-muted-foreground">
                        {currentSlots.filter(s => profDocs[s.key]).length} / {currentSlots.length} uploaded
                      </span>
                    </div>
                    <div className="space-y-3">
                      {currentSlots.map(slot => (
                        <FileSlot
                          key={slot.key}
                          slot={slot}
                          file={profDocs[slot.key] || null}
                          uploadState={uploadStates[slot.key] || 'idle'}
                          onFileChange={handleProfDocChange}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Accepted formats: PDF, JPG, PNG. Max 10 MB per file.
                    </p>
                  </div>
                )}
              </>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold py-6 shadow-sm"
            >
              {isLoading ? 'Saving & Uploading...' : 'Complete Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
