import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Save, User as UserIcon } from 'lucide-react';

export default function ProfileEditor() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    title: 'Clinical Psychologist',
    about: 'I am a dedicated professional with over 10 years of experience helping patients overcome anxiety and depression through evidence-based therapies.',
    approach: 'Cognitive Behavioral Therapy (CBT), Mindfulness',
    acceptsInterns: true,
    fee: 1500,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Public Profile</h1>
        <p className="text-gray-500">Manage how you appear to patients and students.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-6 mb-6">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20">
                <UserIcon className="h-10 w-10" />
              </div>
              <div>
                <Button variant="outline" type="button" size="sm">Change Photo</Button>
                <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Professional Title</label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Clinical Psychologist" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Consultation Fee (₹)</label>
                <Input name="fee" type="number" value={formData.fee} onChange={handleChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">About Me</label>
              <textarea 
                name="about" 
                value={formData.about} 
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Write a brief description about yourself and your background..."
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Treatment Approach</label>
              <Input name="approach" value={formData.approach} onChange={handleChange} placeholder="e.g. CBT, EMDR, Mindfulness" />
            </div>

            <div className="flex items-start space-x-3 pt-4 border-t border-border mt-4">
              <div className="flex items-center h-5">
                <input
                  id="acceptsInterns"
                  name="acceptsInterns"
                  type="checkbox"
                  checked={formData.acceptsInterns}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </div>
              <div className="text-sm">
                <label htmlFor="acceptsInterns" className="font-medium text-gray-700">Open to Interns</label>
                <p className="text-gray-500">Allow students to apply for internship opportunities under your supervision.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={saving} className="min-w-[120px]">
            {saving ? (
              <span className="flex items-center"><span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span> Saving...</span>
            ) : (
              <span className="flex items-center"><Save className="h-4 w-4 mr-2" /> Save Changes</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
