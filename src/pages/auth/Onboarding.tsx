import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

// ── Utilities ──────────────────────────────────────────────────────────────────
function formatFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
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

  const handleStudentDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Synchronously capture File list into array before clearing input value
      const newFiles = Array.from(e.target.files);
      setStudentDocs(prev => {
        const existingKeys = new Set(prev.map(f => `${f.name}-${f.size}`));
        const unique = newFiles.filter(f => !existingKeys.has(`${f.name}-${f.size}`));
        return [...prev, ...unique];
      });
    }
    // Clear input so user can re-select the same file if removed
    e.target.value = '';
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeDoc(e.target.files[0]);
    }
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setError('');

    try {
      if (user.role === 'patient') {
        const { error: pError } = await supabase.from('patients').upsert([{
          id: user.id,
          age: parseInt(age),
          emergency_contact_name: emergencyContactName,
          emergency_contact_phone: emergencyContactPhone,
          clinical_focus: clinicalFocusAreas.split(',').map(s => s.trim()),
        }], { onConflict: 'id' });
        if (pError) throw pError;

      } else if (user.role === 'student') {
        if (studentDocs.length === 0) {
          throw new Error('Please upload at least one verification document (e.g. marksheets or degree certificate).');
        }
        if (!resumeDoc) {
          throw new Error('Please upload your resume.');
        }

        const docUrls: string[] = [];
        for (let i = 0; i < studentDocs.length; i++) {
          const file = studentDocs[i];
          setUploadProgressText(`Uploading verification document (${i + 1}/${studentDocs.length})...`);
          const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const fileName = `student/${user.id}/${Date.now()}-${i}-${cleanFileName}`;
          const { error: uploadError } = await supabase.storage
            .from('Verification Documents')
            .upload(fileName, file, { upsert: true });
          if (uploadError) {
            console.error('Failed to upload document:', file.name, uploadError);
            throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
          }
          const { data: { publicUrl } } = supabase.storage
            .from('Verification Documents')
            .getPublicUrl(fileName);
          docUrls.push(publicUrl);
        }

        setUploadProgressText('Uploading resume...');
        const cleanResumeName = resumeDoc.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const resumeFileName = `student/${user.id}/resume/${Date.now()}-${cleanResumeName}`;
        const { error: resumeUploadError } = await supabase.storage
          .from('Verification Documents')
          .upload(resumeFileName, resumeDoc, { upsert: true });
        if (resumeUploadError) {
          console.error('Failed to upload resume:', resumeUploadError);
          throw new Error(`Failed to upload resume: ${resumeUploadError.message}`);
        }
        const { data: { publicUrl: resumeUrl } } = supabase.storage
          .from('Verification Documents')
          .getPublicUrl(resumeFileName);

        setUploadProgressText('Saving profile...');
        const { error: sError } = await supabase.from('students').upsert([{
          id: user.id,
          university,
          degree,
          graduation_year: parseInt(graduationYear),
          contact_number: studentContact,
          documents_url: docUrls.join(','),
          resume_url: resumeUrl,
        }], { onConflict: 'id' });
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
            .upload(filePath, file, { upsert: true });
          
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

        const { error: proError } = await supabase.from('professionals').upsert([{
          id: user.id,
          title: title,
          specialty: specializations,
          hourly_rate: parseFloat(hourlyRate),
          verification_doc_url: JSON.stringify(urlMap),
          verification_status: 'pending',
        }], { onConflict: 'id' });
        if (proError) throw proError;
      }

      // Redirect to their respective dashboard
      window.location.href = `/${user.role}/dashboard`;
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during onboarding.');
    } finally {
      setIsLoading(false);
      setUploadProgressText('');
    }
  };

  const handleSwitchRole = async (newRole: 'patient' | 'professional' | 'student') => {
    if (!user || user.role === newRole) return;
    setIsLoading(true);
    setError('');
    try {
      const { error: updateError } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', user.id);
      if (updateError) throw updateError;

      await supabase.auth.updateUser({
        data: { role: newRole }
      });

      window.location.reload();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to switch role');
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
          <p className="text-primary-hover/70 mt-2">Just a few more details to get you started as a <span className="font-bold capitalize">{user.role}</span>.</p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">Signed up as the wrong role? Switch to:</span>
            {(['patient', 'professional', 'student'] as const).filter(r => r !== user.role).map(r => (
              <button
                key={r}
                type="button"
                disabled={isLoading}
                onClick={() => handleSwitchRole(r)}
                className="text-xs text-primary hover:text-primary-dark font-semibold capitalize underline bg-transparent border-none cursor-pointer disabled:opacity-50"
              >
                {r}
              </button>
            ))}
          </div>
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
                  <label className="text-sm font-bold text-primary-dark">University <span className="text-red-500">*</span></label>
                  <Input required value={university} onChange={e => setUniversity(e.target.value)} placeholder="University Name" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Degree <span className="text-red-500">*</span></label>
                  <Input required value={degree} onChange={e => setDegree(e.target.value)} placeholder="e.g. BSc Psychology" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Graduation Year <span className="text-red-500">*</span></label>
                  <Input type="number" required value={graduationYear} onChange={e => setGraduationYear(e.target.value)} placeholder="e.g. 2025" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Contact Number <span className="text-red-500">*</span></label>
                  <Input required type="tel" value={studentContact} onChange={e => setStudentContact(e.target.value)} placeholder="Phone Number" className="rounded-xl" />
                </div>

                {/* Verification Documents */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-primary-dark">
                      Verification Documents <span className="text-red-500">*</span>
                    </label>
                    {studentDocs.length > 0 && (
                      <span className="text-xs font-semibold text-primary">
                        {studentDocs.length} {studentDocs.length === 1 ? 'file' : 'files'} selected
                      </span>
                    )}
                  </div>

                  {studentDocs.length > 0 && (
                    <div className="space-y-2 mb-2">
                      {studentDocs.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-primary-muted/20 border border-border p-3 rounded-xl">
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm font-medium text-foreground truncate">{doc.name}</span>
                            <span className="text-xs text-muted-foreground flex-shrink-0">({formatFileSize(doc.size)})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setStudentDocs(docs => docs.filter((_, i) => i !== index))}
                            className="text-muted-foreground hover:text-red-600 p-1 rounded-md transition-colors"
                            title="Remove document"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <label className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-border hover:border-primary rounded-xl cursor-pointer bg-surface hover:bg-primary-muted/20 transition-all group">
                    <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {studentDocs.length === 0 ? 'Click to upload verification document(s)' : '+ Add more documents'}
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      Please upload your semester marksheets (if not graduated) or degree (if graduated).
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="sr-only"
                      onChange={handleStudentDocsChange}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground">Accepted formats: PDF, JPG, PNG, DOCX. Max 10 MB per file.</p>
                </div>

                {/* Resume */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-primary-dark">
                      Resume <span className="text-red-500">*</span>
                    </label>
                    {resumeDoc && (
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>

                  {resumeDoc ? (
                    <div className="flex items-center justify-between bg-primary-muted/20 border border-border p-3 rounded-xl">
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground truncate">{resumeDoc.name}</span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">({formatFileSize(resumeDoc.size)})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResumeDoc(null)}
                        className="text-muted-foreground hover:text-red-600 p-1 rounded-md transition-colors"
                        title="Remove resume"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-border hover:border-primary rounded-xl cursor-pointer bg-surface hover:bg-primary-muted/20 transition-all group">
                      <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        Click to upload your latest resume
                      </span>
                      <span className="text-xs text-muted-foreground text-center">
                        Upload your latest CV or resume in PDF or Word format.
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        onChange={handleResumeChange}
                      />
                    </label>
                  )}
                  <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX. Max 10 MB.</p>
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
              {isLoading ? (uploadProgressText || 'Saving & Uploading...') : 'Complete Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
