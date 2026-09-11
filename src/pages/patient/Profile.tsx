import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  Shield, 
  Bell, 
  Save, 
  CheckCircle2, 
  Camera, 
  AlertCircle,
  Sparkles,
  Lock
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
    'Anxiety & Panic',
    'Workplace Stress',
    'Depression & Mood',
    'Sleep Issues',
    'Relationship Dynamics',
    'ADHD & Focus',
    'Grief & Loss',
    'Self-Esteem & Confidence',
    'Trauma & PTSD',
    'Life Transitions'
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

    // Simulate saving to local storage or API
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center text-primary text-2xl md:text-3xl font-bold shadow-inner">
                {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
              </div>
              <button 
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-hover shadow-md transition-colors"
                title="Change Avatar"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-text-main">
                  {formData.firstName} {formData.lastName}
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                  Verified Patient
                </span>
              </div>
              <p className="text-sm text-text-muted mt-1 flex items-center gap-3">
                <span>{formData.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-text-muted" /> {formData.city}, {formData.state}
                </span>
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs text-text-muted">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Account Active</span>
                <span>•</span>
                <span>Member since August 2026</span>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl p-4 border border-border w-full md:w-auto min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-medium text-text-muted mb-1">
              <span>Profile Completion</span>
              <span className="text-primary font-bold">90%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
            <p className="text-[11px] text-text-muted mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Complete for better therapist matching
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-border mt-8 gap-2 no-scrollbar">
          {[
            { id: 'personal', label: 'Personal Information', icon: User },
            { id: 'therapy', label: 'Therapy & Wellness Goals', icon: Heart },
            { id: 'emergency', label: 'Emergency Contacts', icon: Shield },
            { id: 'privacy', label: 'Privacy & Notifications', icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                type="button"
                className={`flex items-center gap-2 py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'
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
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center justify-between transition-all animate-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-medium">Your profile changes have been successfully saved.</span>
          </div>
          <button onClick={() => setSaveSuccess(false)} className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold">
            Dismiss
          </button>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 1: PERSONAL INFORMATION */}
        {activeTab === 'personal' && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-text-main">Personal Information</h2>
              <p className="text-sm text-text-muted">Update your personal contact details and identification.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">First Name *</label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Last Name *</label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Email Address</label>
                <div className="relative">
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10"
                  />
                  <Mail className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Phone Number</label>
                <div className="relative">
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                  <Phone className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Date of Birth</label>
                <div className="relative">
                  <Input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                  <Calendar className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Gender Identity</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">City</label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">State / Province</label>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Primary Communication Language</label>
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Gujarati">Gujarati</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Occupation / Field</label>
                <Input
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="e.g. Architect, Student, Teacher"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THERAPY & WELLNESS GOALS */}
        {activeTab === 'therapy' && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-text-main">Therapy & Wellness Profile</h2>
              <p className="text-sm text-text-muted">
                This information helps our matching algorithm and your chosen therapist tailor sessions to your exact needs.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-text-main">
                What areas would you like support with? (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {availableConcerns.map(concern => {
                  const isSelected = formData.selectedConcerns.includes(concern);
                  return (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => toggleConcern(concern)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-white shadow-sm ring-2 ring-primary/30'
                          : 'bg-gray-100 text-text-muted hover:bg-gray-200 hover:text-text-main'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {concern}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Preferred Session Format</label>
                <select
                  name="preferredFormat"
                  value={formData.preferredFormat}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="online">Online Video Call (Telehealth)</option>
                  <option value="in-person">In-Person Clinic Visit</option>
                  <option value="flexible">No Preference (Flexible)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Therapist Gender Preference</label>
                <select
                  name="preferredGender"
                  value={formData.preferredGender}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="No preference">No preference</option>
                  <option value="Female">Female therapist</option>
                  <option value="Male">Male therapist</option>
                  <option value="Non-binary">Non-binary therapist</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-text-main">Have you attended therapy before?</label>
                <select
                  name="previousTherapy"
                  value={formData.previousTherapy}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="No, this is my first time">No, this is my first time</option>
                  <option value="Yes, currently in therapy elsewhere">Yes, currently in therapy elsewhere</option>
                  <option value="Yes, 1-2 years ago">Yes, 1-2 years ago</option>
                  <option value="Yes, several years ago">Yes, several years ago</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-text-main">Personal Goals & What You Want to Achieve</label>
                <textarea
                  name="goalsSummary"
                  value={formData.goalsSummary}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Share anything you want your therapist to know about your expectations or goals..."
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EMERGENCY CONTACT */}
        {activeTab === 'emergency' && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1 leading-relaxed">
                <p className="font-semibold text-sm text-amber-950">Why do we ask for an emergency contact?</p>
                <p>
                  As part of mental healthcare safety best practices, licensed providers require a trusted contact in the rare case of an immediate medical or psychiatric emergency. We will never share session details or routine updates with this contact.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Emergency Contact Full Name *</label>
                <Input
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Relationship to You *</label>
                <select
                  name="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Spouse">Spouse / Partner</option>
                  <option value="Parent">Parent / Guardian</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Adult Child">Adult Child</option>
                  <option value="Close Friend">Close Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Contact Phone Number *</label>
                <div className="relative">
                  <Input
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    required
                    className="pl-10"
                  />
                  <Phone className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Contact Email Address (Optional)</label>
                <div className="relative">
                  <Input
                    name="emergencyEmail"
                    type="email"
                    value={formData.emergencyEmail}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                  <Mail className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRIVACY & NOTIFICATIONS */}
        {activeTab === 'privacy' && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-text-main">Notifications & Privacy</h2>
              <p className="text-sm text-text-muted">Control your communications and privacy preferences.</p>
            </div>

            <div className="divide-y divide-border">
              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">Email Reminders</h4>
                  <p className="text-xs text-text-muted">Receive appointment notifications and 24-hour reminders.</p>
                </div>
                <input
                  type="checkbox"
                  name="emailReminders"
                  checked={formData.emailReminders}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
                />
              </div>

              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">SMS Appointment Alerts</h4>
                  <p className="text-xs text-text-muted">Receive critical text message reminders 1 hour before scheduled sessions.</p>
                </div>
                <input
                  type="checkbox"
                  name="smsReminders"
                  checked={formData.smsReminders}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
                />
              </div>

              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">Share Clinical History with Assigned Doctor</h4>
                  <p className="text-xs text-text-muted">Allow matched verified psychologists to view your intake questionnaire before your call.</p>
                </div>
                <input
                  type="checkbox"
                  name="shareHistoryWithTherapist"
                  checked={formData.shareHistoryWithTherapist}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
                />
              </div>

              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">Anonymous Testimonials</h4>
                  <p className="text-xs text-text-muted">Mask your name to initials (e.g. A. S.) if you submit provider reviews.</p>
                </div>
                <input
                  type="checkbox"
                  name="anonymousReviews"
                  checked={formData.anonymousReviews}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-500 shrink-0" />
              <p className="text-xs text-gray-600">
                All communications and clinical data on WELLPath are encrypted end-to-end adhering to healthcare data protection standards.
              </p>
            </div>
          </div>
        )}

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // Reset
              setFormData(prev => ({
                ...prev,
                firstName: user?.firstName || 'Alex',
                lastName: user?.lastName || 'Sharma'
              }));
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Profile Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
