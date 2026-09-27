import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

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
  const [title, setTitle] = useState('');
  const [specializations, setSpecializations] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [verificationDocs, setVerificationDocs] = useState<File[]>([]);

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
          clinical_focus: clinicalFocusAreas.split(',').map(s => s.trim())
        }]);
        if (pError) throw pError;
      } 
      else if (user.role === 'student') {
        if (studentDocs.length === 0) {
          throw new Error("At least one verification document is required");
        }
        if (!resumeDoc) {
          throw new Error("Resume is required");
        }

        const docUrls: string[] = [];
        for (const file of studentDocs) {
          const fileExt = file.name.split('.').pop();
          const fileName = `student-${user.id}-${Math.random()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('Verification Documents')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('Verification Documents')
            .getPublicUrl(fileName);
            
          docUrls.push(publicUrl);
        }

        const resumeExt = resumeDoc.name.split('.').pop();
        const resumeFileName = `resume-${user.id}-${Math.random()}.${resumeExt}`;
        const { error: resumeUploadError } = await supabase.storage
          .from('Verification Documents')
          .upload(resumeFileName, resumeDoc);
          
        if (resumeUploadError) throw resumeUploadError;

        const { data: { publicUrl: resumeUrl } } = supabase.storage
          .from('Verification Documents')
          .getPublicUrl(resumeFileName);

        const { error: sError } = await supabase.from('students').insert([{
          id: user.id,
          university,
          degree,
          graduation_year: parseInt(graduationYear),
          contact_number: studentContact,
          documents_url: docUrls.join(','),
          resume_url: resumeUrl
        }]);
        if (sError) throw sError;
      } 
      else if (user.role === 'professional') {
        if (verificationDocs.length === 0) {
          throw new Error("At least one Verification Document is required");
        }

        const publicUrls: string[] = [];
        
        for (const file of verificationDocs) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}-${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('Verification Documents')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('Verification Documents')
            .getPublicUrl(filePath);
            
          publicUrls.push(publicUrl);
        }

        const allUrls = publicUrls.join(',');

        const { error: proError } = await supabase.from('professionals').insert([{
          id: user.id,
          title: title,
          specialty: specializations,
          hourly_rate: parseFloat(hourlyRate),
          verification_doc_url: allUrls,
          verification_status: 'pending'
        }]);

        if (proError) throw proError;
      }

      // After successful insert, user no longer needs onboarding
      // We will reload the window to trigger auth check again
      window.location.href = '/';

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during onboarding.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-lg border-0 shadow-md rounded-xl bg-surface">
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-3xl font-bold text-primary-dark">Complete Your Profile</CardTitle>
          <p className="text-primary-hover/70 mt-2">Just a few more details to get you started as a {user.role}.</p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-semibold">
                {error}
              </div>
            )}

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
                        <div key={index} className="flex items-center justify-between bg-surface-muted p-2 rounded-lg border border-border">
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
                      if (e.target.files) {
                        setStudentDocs(prev => [...prev, ...Array.from(e.target.files!)]);
                      }
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
                  {resumeDoc && (
                    <p className="text-xs font-medium text-primary mt-1">Selected: {resumeDoc.name}</p>
                  )}
                  {!resumeDoc && (
                    <p className="text-xs text-muted-foreground mt-1">Please upload your latest resume.</p>
                  )}
                </div>
              </>
            )}

            {user.role === 'professional' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Title</label>
                  <Input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Clinical Psychologist" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Specializations (comma separated)</label>
                  <Input required value={specializations} onChange={e => setSpecializations(e.target.value)} placeholder="e.g. CBT, EMDR" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Hourly Rate (₹)</label>
                  <Input type="number" required value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="e.g. 150" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-dark">Verification Documents</label>
                  
                  {verificationDocs.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {verificationDocs.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-surface-muted p-2 rounded-lg border border-border">
                          <span className="text-sm truncate max-w-[250px] font-medium">{doc.name}</span>
                          <button
                            type="button"
                            onClick={() => setVerificationDocs(docs => docs.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700 text-sm font-semibold px-2 py-1"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="relative">
                    <Input 
                      type="file" 
                      multiple 
                      onChange={e => {
                        if (e.target.files) {
                          setVerificationDocs(prev => [...prev, ...Array.from(e.target.files!)]);
                        }
                        e.target.value = '';
                      }} 
                      className="rounded-xl pt-2 cursor-pointer" 
                    />
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1 mt-2">
                    <p>Please upload document(s) containing:</p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Degree</li>
                      <li>Certifications</li>
                      <li>Licenses</li>
                      <li>License Number</li>
                      <li>Practitioner Registered Number</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            <Button type="submit" disabled={isLoading} className="w-full rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold py-6 shadow-sm">
              {isLoading ? 'Saving...' : 'Complete Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
