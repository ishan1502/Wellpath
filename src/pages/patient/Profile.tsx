import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, Mail, Phone, MapPin, Calendar, Heart, Shield, Bell, Save, 
  CheckCircle2, Camera, AlertCircle, Sparkles, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function Profile() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'personal' | 'therapy' | 'emergency' | 'privacy'>('personal');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Alex',
    lastName: user?.lastName || 'Sharma',
    email: user?.email || 'patient@wellpath.demo',
    phone: '+91 98765 43210',
    dob: '1996-04-15',
    gender: 'Prefer not to say',
    occupation: 'Software Engineer',
    city: 'Mumbai',
    state: 'Maharashtra',
    preferredLanguage: 'English',
    secondaryLanguage: 'Hindi',
    // Therapy preferences
    selectedConcerns: ['Anxiety & Panic', 'Workplace Stress', 'Sleep Issues'],
    preferredFormat: 'online',
    preferredGender: 'No preference',
    previousTherapy: 'Yes, 1-2 years ago',
    goalsSummary: 'Looking to develop healthier boundaries at work and manage recurring sleep-onset anxiety through CBT techniques.',
    // Emergency Contact
    emergencyName: 'Pooja Sharma',
    emergencyRelation: 'Spouse',
    emergencyPhone: '+91 98765 12345',
    emergencyEmail: 'pooja.sharma@example.com',
    // Privacy & Notifications
    emailReminders: true,
    smsReminders: true,
    whatsappUpdates: false,
    shareHistoryWithTherapist: true,
    anonymousReviews: true
  });

  const availableConcerns = [
    'Anxiety & Panic', 'Workplace Stress', 'Depression & Mood', 'Sleep Issues',
    'Relationship Dynamics', 'ADHD & Focus', 'Grief & Loss', 'Self-Esteem & Confidence',
    'Trauma & PTSD', 'Life Transitions'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleConcern = (concern: string) => {
    setFormData(prev => {
      const exists = prev.selectedConcerns.includes(concern);
      if (exists) {
        return { ...prev, selectedConcerns: prev.selectedConcerns.filter(c => c !== concern) };
      } else {
        return { ...prev, selectedConcerns: [...prev.selectedConcerns, concern] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in font-sans text-emerald-900 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border-0 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-900 text-3xl md:text-4xl font-extrabold shadow-sm group-hover:shadow-md transition-all">
                {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
              </div>
              <button 
                type="button"
                className="absolute -bottom-2 -right-2 p-2.5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 shadow-md transition-colors"
                title="Change Avatar"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  {formData.firstName} {formData.lastName}
                </h1>
                <span className="px-3 py-1 text-xs font-bold rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Verified Patient
                </span>
              </div>
              <p className="text-sm text-emerald-700/80 font-medium mt-2 flex items-center gap-3">
                <span>{formData.email}</span>
                <span className="opacity-50">•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {formData.city}, {formData.state}
                </span>
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl w-fit">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <span>Account Active</span>
                <span className="opacity-50">•</span>
                <span>Member since August 2026</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 w-full md:w-auto min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900/60 mb-2">
              <span>Profile Completion</span>
              <span className="text-emerald-600 font-extrabold text-sm">90%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
            </div>
            <p className="text-[11px] text-emerald-700/80 font-medium mt-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Complete for better therapist matching
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto mt-10 gap-2 no-scrollbar p-1 bg-gray-50 rounded-2xl border border-gray-100">
          {[
            { id: 'personal', label: 'Personal Information', icon: User },
            { id: 'therapy', label: 'Therapy & Wellness', icon: Heart },
            { id: 'emergency', label: 'Emergency Contacts', icon: Shield },
            { id: 'privacy', label: 'Privacy & Alerts', icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                type="button"
                className={`flex items-center justify-center gap-2 py-3 px-5 text-sm font-bold rounded-xl whitespace-nowrap transition-all flex-1 ${
                  isActive
                    ? 'bg-white text-emerald-900 shadow-sm border border-gray-100'
                    : 'text-emerald-700/60 hover:text-emerald-900 hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center justify-between transition-all shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <span className="text-sm font-bold">Your profile changes have been successfully saved.</span>
          </div>
          <button onClick={() => setSaveSuccess(false)} className="text-emerald-700 hover:text-emerald-900 text-xs font-bold bg-emerald-100 px-3 py-1.5 rounded-xl">
            Dismiss
          </button>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {activeTab === 'personal' && (
          <div className="bg-white rounded-3xl border-0 p-8 space-y-8 shadow-sm hover:shadow-xl transition-all duration-300">
            <div>
              <h2 className="text-xl font-bold">Personal Information</h2>
              <p className="text-sm text-emerald-700/70 font-medium mt-1">Update your personal contact details and identification.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">First Name *</label>
                <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 bg-gray-50/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Last Name *</label>
                <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 bg-gray-50/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Email Address</label>
                <div className="relative">
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="pl-11 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 bg-gray-50/50" />
                  <Mail className="w-5 h-5 text-emerald-600/50 absolute left-3 top-2.5" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Phone Number</label>
                <div className="relative">
                  <Input name="phone" value={formData.phone} onChange={handleInputChange} className="pl-11 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 bg-gray-50/50" />
                  <Phone className="w-5 h-5 text-emerald-600/50 absolute left-3 top-2.5" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Date of Birth</label>
                <div className="relative">
                  <Input name="dob" type="date" value={formData.dob} onChange={handleInputChange} className="pl-11 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 bg-gray-50/50" />
                  <Calendar className="w-5 h-5 text-emerald-600/50 absolute left-3 top-2.5" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Gender Identity</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">City</label>
                <Input name="city" value={formData.city} onChange={handleInputChange} className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 bg-gray-50/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">State / Province</label>
                <Input name="state" value={formData.state} onChange={handleInputChange} className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 bg-gray-50/50" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold">Occupation / Field</label>
                <Input name="occupation" value={formData.occupation} onChange={handleInputChange} placeholder="e.g. Architect, Student, Teacher" className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 bg-gray-50/50" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'therapy' && (
          <div className="bg-white rounded-3xl border-0 p-8 space-y-8 shadow-sm hover:shadow-xl transition-all duration-300">
            <div>
              <h2 className="text-xl font-bold">Therapy & Wellness Profile</h2>
              <p className="text-sm text-emerald-700/70 font-medium mt-1">This helps our matching algorithm tailor sessions to your exact needs.</p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold">What areas would you like support with? (Select all that apply)</label>
              <div className="flex flex-wrap gap-2.5">
                {availableConcerns.map(concern => {
                  const isSelected = formData.selectedConcerns.includes(concern);
                  return (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => toggleConcern(concern)}
                      className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                          : 'bg-gray-50 border border-gray-200 text-emerald-900/60 hover:bg-gray-100 hover:text-emerald-900'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {concern}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <label className="text-sm font-bold">Preferred Session Format</label>
                <select name="preferredFormat" value={formData.preferredFormat} onChange={handleInputChange} className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="online">Online Video Call</option>
                  <option value="in-person">In-Person Clinic Visit</option>
                  <option value="flexible">No Preference (Flexible)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Therapist Gender Preference</label>
                <select name="preferredGender" value={formData.preferredGender} onChange={handleInputChange} className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="No preference">No preference</option>
                  <option value="Female">Female therapist</option>
                  <option value="Male">Male therapist</option>
                  <option value="Non-binary">Non-binary therapist</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold">Have you attended therapy before?</label>
                <select name="previousTherapy" value={formData.previousTherapy} onChange={handleInputChange} className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="No, this is my first time">No, this is my first time</option>
                  <option value="Yes, currently in therapy elsewhere">Yes, currently in therapy elsewhere</option>
                  <option value="Yes, 1-2 years ago">Yes, 1-2 years ago</option>
                  <option value="Yes, several years ago">Yes, several years ago</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold">Personal Goals & What You Want to Achieve</label>
                <textarea
                  name="goalsSummary"
                  value={formData.goalsSummary}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  placeholder="Share anything you want your therapist to know..."
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="bg-white rounded-3xl border-0 p-8 space-y-8 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
              <div className="space-y-1">
                <p className="font-extrabold text-sm text-amber-950">Why do we ask for an emergency contact?</p>
                <p className="text-xs font-medium leading-relaxed">
                  As part of mental healthcare safety best practices, licensed providers require a trusted contact in the rare case of an immediate medical or psychiatric emergency. We will never share session details or routine updates with this contact.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">Contact Full Name *</label>
                <Input name="emergencyName" value={formData.emergencyName} onChange={handleInputChange} required className="rounded-xl border-gray-200 focus:border-emerald-500 bg-gray-50/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Relationship to You *</label>
                <select name="emergencyRelation" value={formData.emergencyRelation} onChange={handleInputChange} className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="Spouse">Spouse / Partner</option>
                  <option value="Parent">Parent / Guardian</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Adult Child">Adult Child</option>
                  <option value="Close Friend">Close Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Contact Phone Number *</label>
                <div className="relative">
                  <Input name="emergencyPhone" value={formData.emergencyPhone} onChange={handleInputChange} required className="pl-11 rounded-xl border-gray-200 focus:border-emerald-500 bg-gray-50/50" />
                  <Phone className="w-5 h-5 text-emerald-600/50 absolute left-3 top-2.5" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Contact Email Address</label>
                <div className="relative">
                  <Input name="emergencyEmail" type="email" value={formData.emergencyEmail} onChange={handleInputChange} className="pl-11 rounded-xl border-gray-200 focus:border-emerald-500 bg-gray-50/50" />
                  <Mail className="w-5 h-5 text-emerald-600/50 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="bg-white rounded-3xl border-0 p-8 space-y-8 shadow-sm hover:shadow-xl transition-all duration-300">
            <div>
              <h2 className="text-xl font-bold">Notifications & Privacy</h2>
              <p className="text-sm text-emerald-700/70 font-medium mt-1">Control your communications and privacy preferences.</p>
            </div>

            <div className="divide-y divide-gray-100">
              <div className="py-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">Email Reminders</h4>
                  <p className="text-xs text-emerald-700/60 font-medium mt-1">Receive appointment notifications and 24-hour reminders.</p>
                </div>
                <input type="checkbox" name="emailReminders" checked={formData.emailReminders} onChange={handleInputChange} className="h-6 w-6 text-emerald-600 rounded-md border-gray-300 focus:ring-emerald-500 cursor-pointer" />
              </div>
              <div className="py-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">SMS Appointment Alerts</h4>
                  <p className="text-xs text-emerald-700/60 font-medium mt-1">Receive critical text message reminders 1 hour before scheduled sessions.</p>
                </div>
                <input type="checkbox" name="smsReminders" checked={formData.smsReminders} onChange={handleInputChange} className="h-6 w-6 text-emerald-600 rounded-md border-gray-300 focus:ring-emerald-500 cursor-pointer" />
              </div>
              <div className="py-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">Share Clinical History with Assigned Doctor</h4>
                  <p className="text-xs text-emerald-700/60 font-medium mt-1">Allow matched verified psychologists to view your intake questionnaire before your call.</p>
                </div>
                <input type="checkbox" name="shareHistoryWithTherapist" checked={formData.shareHistoryWithTherapist} onChange={handleInputChange} className="h-6 w-6 text-emerald-600 rounded-md border-gray-300 focus:ring-emerald-500 cursor-pointer" />
              </div>
              <div className="py-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">Anonymous Testimonials</h4>
                  <p className="text-xs text-emerald-700/60 font-medium mt-1">Mask your name to initials (e.g. A. S.) if you submit provider reviews.</p>
                </div>
                <input type="checkbox" name="anonymousReviews" checked={formData.anonymousReviews} onChange={handleInputChange} className="h-6 w-6 text-emerald-600 rounded-md border-gray-300 focus:ring-emerald-500 cursor-pointer" />
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
              <Lock className="w-6 h-6 text-emerald-600/60 shrink-0" />
              <p className="text-xs font-bold text-emerald-900/60 leading-relaxed">
                All communications and clinical data on WELLPath are encrypted end-to-end adhering to healthcare data protection standards.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="outline" className="rounded-2xl font-bold px-6 py-5 border-gray-200 text-gray-500 hover:bg-gray-50" onClick={() => {}}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving} className="rounded-2xl font-bold px-8 py-5 bg-emerald-600 text-white hover:bg-emerald-700 shadow-md flex items-center gap-2">
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Profile Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
