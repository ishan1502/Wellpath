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
  const [emergencyContact, setEmergencyContact] = useState('');
  const [clinicalFocusAreas, setClinicalFocusAreas] = useState('');

  // Student states
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [graduationYear, setGraduationYear] = useState('');

  // Professional states
  const [specializations, setSpecializations] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [verificationDoc, setVerificationDoc] = useState<File | null>(null);

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
          emergency_contact: emergencyContact,
          clinical_focus_areas: clinicalFocusAreas.split(',').map(s => s.trim())
        }]);
        if (pError) throw pError;
      } 
      else if (user.role === 'student') {
        const { error: sError } = await supabase.from('students').insert([{
          id: user.id,
          university,
          degree,
          graduation_year: parseInt(graduationYear)
        }]);
        if (sError) throw sError;
      } 
      else if (user.role === 'professional') {
        if (!verificationDoc) {
          throw new Error("Verification Document is required");
        }

        const fileExt = verificationDoc.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('Verification Documents')
          .upload(filePath, verificationDoc);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('Verification Documents')
          .getPublicUrl(filePath);

        const { error: proError } = await supabase.from('professionals').insert([{
          id: user.id,
          specializations: specializations.split(',').map(s => s.trim()),
          session_fee: parseFloat(hourlyRate),
          verification_doc_url: publicUrl,
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-lg border-0 shadow-xl rounded-3xl bg-white">
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-3xl font-bold text-emerald-900">Complete Your Profile</CardTitle>
          <p className="text-emerald-700/70 mt-2">Just a few more details to get you started as a {user.role}.</p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-semibold">
                {error}
              </div>
            )}

            {user.role === 'patient' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">Age</label>
                  <Input type="number" required value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 30" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">Emergency Contact</label>
                  <Input required value={emergencyContact} onChange={e => setEmergencyContact(e.target.value)} placeholder="Name & Phone" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">Clinical Focus Areas (comma separated)</label>
                  <Input required value={clinicalFocusAreas} onChange={e => setClinicalFocusAreas(e.target.value)} placeholder="e.g. Anxiety, Depression" className="rounded-xl" />
                </div>
              </>
            )}

            {user.role === 'student' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">University</label>
                  <Input required value={university} onChange={e => setUniversity(e.target.value)} placeholder="University Name" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">Degree</label>
                  <Input required value={degree} onChange={e => setDegree(e.target.value)} placeholder="e.g. BSc Psychology" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">Graduation Year</label>
                  <Input type="number" required value={graduationYear} onChange={e => setGraduationYear(e.target.value)} placeholder="e.g. 2025" className="rounded-xl" />
                </div>
              </>
            )}

            {user.role === 'professional' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">Specializations (comma separated)</label>
                  <Input required value={specializations} onChange={e => setSpecializations(e.target.value)} placeholder="e.g. CBT, EMDR" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">Hourly Rate ($)</label>
                  <Input type="number" required value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="e.g. 150" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">Verification Document</label>
                  <Input type="file" required onChange={e => setVerificationDoc(e.target.files?.[0] || null)} className="rounded-xl pt-2" />
                  <p className="text-xs text-gray-500">Please upload your license or certification.</p>
                </div>
              </>
            )}

            <Button type="submit" disabled={isLoading} className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 shadow-sm">
              {isLoading ? 'Saving...' : 'Complete Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
