import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  Settings as SettingsIcon, 
  Clock, 
  ShieldCheck, 
  KeyRound, 
  CreditCard, 
  Bell, 
  GraduationCap, 
  Video, 
  Save, 
  CheckCircle2, 
  Smartphone, 
  Lock, 
  Building, 
  Laptop
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function Settings() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'practice' | 'security' | 'payout' | 'notifications' | 'interns'>('practice');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    // Practice
    sessionDuration: '50',
    sessionFee: '1500',
    bufferTime: '15',
    minAdvanceNotice: '12',
    maxAdvanceBooking: '30',
    autoConfirmBookings: true,
    cancellationPolicy: '24hours',
    telehealthProvider: 'wellpath_builtin',
    // Security
    email: user?.email || 'doctor@wellpath.demo',
    twoFactorEnabled: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    // Payout
    bankName: 'HDFC Bank Ltd',
    accountNumber: '50100492817291',
    ifscCode: 'HDFC0000128',
    beneficiaryName: 'Dr. Ananya Mehta',
    panNumber: 'ABCDE1234F',
    payoutFrequency: 'weekly',
    // Notifications
    emailOnBooking: true,
    smsOnBooking: true,
    emailOnCancel: true,
    sms24hReminder: true,
    emailOnReview: true,
    emailOnInternApp: true,
    marketingUpdates: false,
    // Intern Supervision
    acceptsInterns: true,
    maxInternsCapacity: '2',
    preferredStudentLevel: 'Masters or PhD candidates',
    supervisionFormat: 'Hybrid (1-on-1 Weekly Clinical Case Review)'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSettings(prev => ({ ...prev, [name]: checked }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
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
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <SettingsIcon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-main">
                  Account & Practice Settings
                </h1>
                <p className="text-sm text-text-muted mt-0.5">
                  Configure your practice defaults, telehealth options, payout bank details, and security controls.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-border mt-8 gap-2 no-scrollbar">
          {[
            { id: 'practice', label: 'Practice & Booking Rules', icon: Clock },
            { id: 'security', label: 'Security & Password', icon: KeyRound },
            { id: 'payout', label: 'Banking & Payouts', icon: CreditCard },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'interns', label: 'Internship Supervision', icon: GraduationCap },
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
            <span className="text-sm font-medium">Your practice settings have been successfully updated.</span>
          </div>
          <button onClick={() => setSaveSuccess(false)} className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold">
            Dismiss
          </button>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: PRACTICE & BOOKING RULES */}
        {activeTab === 'practice' && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-text-main">Practice & Booking Configuration</h2>
              <p className="text-sm text-text-muted">Define how clients schedule sessions and set your clinical session rules.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Standard Session Duration</label>
                <select
                  name="sessionDuration"
                  value={settings.sessionDuration}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="45">45 Minutes</option>
                  <option value="50">50 Minutes (Standard Clinical Hour)</option>
                  <option value="60">60 Minutes</option>
                  <option value="90">90 Minutes (Intake / Couples)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Standard Fee per Session (₹)</label>
                <div className="relative">
                  <Input
                    name="sessionFee"
                    type="number"
                    value={settings.sessionFee}
                    onChange={handleChange}
                    className="pl-9"
                  />
                  <span className="absolute left-3 top-2.5 text-text-muted font-bold text-sm">₹</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Buffer Time Between Sessions</label>
                <select
                  name="bufferTime"
                  value={settings.bufferTime}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="0">No buffer</option>
                  <option value="10">10 Minutes</option>
                  <option value="15">15 Minutes (Recommended for notes)</option>
                  <option value="30">30 Minutes</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Minimum Advance Notice Required</label>
                <select
                  name="minAdvanceNotice"
                  value={settings.minAdvanceNotice}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="2">2 Hours prior</option>
                  <option value="6">6 Hours prior</option>
                  <option value="12">12 Hours prior</option>
                  <option value="24">24 Hours prior</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Maximum Advance Booking Window</label>
                <select
                  name="maxAdvanceBooking"
                  value={settings.maxAdvanceBooking}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="7">Up to 7 days ahead</option>
                  <option value="14">Up to 14 days ahead</option>
                  <option value="30">Up to 30 days ahead</option>
                  <option value="60">Up to 60 days ahead</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Cancellation Policy</label>
                <select
                  name="cancellationPolicy"
                  value={settings.cancellationPolicy}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="24hours">Free cancellation up to 24 hours before</option>
                  <option value="48hours">Strict: 48 hours notice required</option>
                  <option value="flexible">Flexible: Free cancellation up to 4 hours before</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-text-main">Telehealth Video Call Platform</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {[
                    { id: 'wellpath_builtin', label: 'WELLPath Video', desc: 'Encrypted, HIPAA & GDPR compliant built-in' },
                    { id: 'google_meet', label: 'Google Meet', desc: 'Generates Meet links automatically' },
                    { id: 'zoom', label: 'Zoom Healthcare', desc: 'Requires connected Zoom account' }
                  ].map(provider => (
                    <label
                      key={provider.id}
                      className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                        settings.telehealthProvider === provider.id
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-xs text-text-main flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-primary" />
                          {provider.label}
                        </span>
                        <input
                          type="radio"
                          name="telehealthProvider"
                          value={provider.id}
                          checked={settings.telehealthProvider === provider.id}
                          onChange={handleChange}
                          className="accent-emerald-600"
                        />
                      </div>
                      <p className="text-[11px] text-text-muted">{provider.desc}</p>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-text-main">Instant Auto-Confirmation</h4>
                <p className="text-xs text-text-muted">Automatically confirm appointment slots when a patient pays, without requiring manual approval.</p>
              </div>
              <input
                type="checkbox"
                name="autoConfirmBookings"
                checked={settings.autoConfirmBookings}
                onChange={handleChange}
                className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
              />
            </div>
          </div>
        )}

        {/* TAB 2: SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-text-main">Login & Security</h2>
              <p className="text-sm text-text-muted">Protect your account and confidential patient records.</p>
            </div>

            {/* Email overview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-background border border-border gap-3">
              <div>
                <p className="text-xs text-text-muted">Registered Email Address</p>
                <p className="text-sm font-semibold text-text-main mt-0.5">{settings.email}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Primary & Verified
              </span>
            </div>

            {/* Change Password */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" /> Change Password
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-muted">Current Password</label>
                  <Input
                    type="password"
                    name="currentPassword"
                    value={settings.currentPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-muted">New Password</label>
                  <Input
                    type="password"
                    name="newPassword"
                    value={settings.newPassword}
                    onChange={handleChange}
                    placeholder="Minimum 8 chars"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-muted">Confirm New Password</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={settings.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat new password"
                  />
                </div>
              </div>
            </div>

            {/* Two Factor Authentication */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-text-main">Two-Factor Authentication (2FA)</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Enabled</span>
                </div>
                <p className="text-xs text-text-muted mt-0.5">Require an authenticator app (Google Authenticator or Duo) code on every new sign-in.</p>
              </div>
              <input
                type="checkbox"
                name="twoFactorEnabled"
                checked={settings.twoFactorEnabled}
                onChange={handleChange}
                className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
              />
            </div>

            {/* Active Sessions */}
            <div className="pt-4 border-t border-border space-y-3">
              <h4 className="text-sm font-semibold text-text-main">Active Authorized Sessions</h4>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Laptop className="w-5 h-5 text-text-muted" />
                    <div>
                      <p className="font-semibold text-text-main">Apple MacBook Pro (macOS 15.3)</p>
                      <p className="text-text-muted text-[11px]">Chrome 128 • Mumbai, India • Current session</p>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-semibold">Active Now</span>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-text-muted" />
                    <div>
                      <p className="font-semibold text-text-main">iPhone 15 Pro (iOS 18)</p>
                      <p className="text-text-muted text-[11px]">WELLPath Practitioner App • Last active 3 hours ago</p>
                    </div>
                  </div>
                  <button type="button" className="text-red-600 hover:text-red-700 font-medium">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BANKING & PAYOUTS */}
        {activeTab === 'payout' && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-text-main">Banking & Payout Accounts</h2>
              <p className="text-sm text-text-muted">Earnings from completed therapy sessions are settled directly into this account.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Bank Name</label>
                <div className="relative">
                  <Input
                    name="bankName"
                    value={settings.bankName}
                    onChange={handleChange}
                    className="pl-9"
                  />
                  <Building className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Beneficiary Full Name</label>
                <Input
                  name="beneficiaryName"
                  value={settings.beneficiaryName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Bank Account Number</label>
                <Input
                  name="accountNumber"
                  value={settings.accountNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">IFSC Code / Branch Routing</label>
                <Input
                  name="ifscCode"
                  value={settings.ifscCode}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">PAN / Tax Registration Number</label>
                <Input
                  name="panNumber"
                  value={settings.panNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Automated Settlement Frequency</label>
                <select
                  name="payoutFrequency"
                  value={settings.payoutFrequency}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="weekly">Weekly (Every Monday Morning)</option>
                  <option value="biweekly">Bi-Weekly (Every Alternate Friday)</option>
                  <option value="monthly">Monthly (1st of Each Month)</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950 space-y-1">
                <p className="font-semibold">Automated TDS & Invoicing</p>
                <p>
                  WELLPath platform fee (12%) is deducted automatically. Quarterly GST tax reports and Form 16A TDS certificates are available under your Earnings tab.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-text-main">Communication & Notification Preferences</h2>
              <p className="text-sm text-text-muted">Choose when and how you receive alerts from patients and students.</p>
            </div>

            <div className="divide-y divide-border">
              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">New Booking Email Notifications</h4>
                  <p className="text-xs text-text-muted">Instant email when a patient books a new therapy session.</p>
                </div>
                <input
                  type="checkbox"
                  name="emailOnBooking"
                  checked={settings.emailOnBooking}
                  onChange={handleChange}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
                />
              </div>

              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">SMS Appointment Alerts</h4>
                  <p className="text-xs text-text-muted">SMS notification for bookings, cancellations, and urgent reschedules.</p>
                </div>
                <input
                  type="checkbox"
                  name="smsOnBooking"
                  checked={settings.smsOnBooking}
                  onChange={handleChange}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
                />
              </div>

              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">24-Hour Session Reminders</h4>
                  <p className="text-xs text-text-muted">Daily calendar digest of upcoming consultations for tomorrow.</p>
                </div>
                <input
                  type="checkbox"
                  name="sms24hReminder"
                  checked={settings.sms24hReminder}
                  onChange={handleChange}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
                />
              </div>

              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">New Patient Review Alerts</h4>
                  <p className="text-xs text-text-muted">Get alerted whenever a patient leaves a testimonial or rating.</p>
                </div>
                <input
                  type="checkbox"
                  name="emailOnReview"
                  checked={settings.emailOnReview}
                  onChange={handleChange}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
                />
              </div>

              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">Internship Application Alerts</h4>
                  <p className="text-xs text-text-muted">Notification when a medical or psychology student applies for supervision.</p>
                </div>
                <input
                  type="checkbox"
                  name="emailOnInternApp"
                  checked={settings.emailOnInternApp}
                  onChange={handleChange}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INTERNSHIP SUPERVISION */}
        {activeTab === 'interns' && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-text-main">Internship Supervision Program</h2>
              <p className="text-sm text-text-muted">Control your visibility in the student directory and manage your mentorship capacity.</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-emerald-950">Accepting Student Interns</h4>
                <p className="text-xs text-emerald-800">Your profile will display an "Open for Interns" badge to enrolled students.</p>
              </div>
              <input
                type="checkbox"
                name="acceptsInterns"
                checked={settings.acceptsInterns}
                onChange={handleChange}
                className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Max Active Intern Capacity</label>
                <select
                  name="maxInternsCapacity"
                  value={settings.maxInternsCapacity}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="1">1 Student Intern</option>
                  <option value="2">2 Student Interns (Recommended)</option>
                  <option value="3">3 Student Interns</option>
                  <option value="5">5 Student Interns</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-main">Preferred Student Level</label>
                <select
                  name="preferredStudentLevel"
                  value={settings.preferredStudentLevel}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Undergraduate senior">Final-year Undergraduate</option>
                  <option value="Masters or PhD candidates">Master's (MA / MSc / MPhil) or PhD Candidates</option>
                  <option value="Postgraduate Residents">Medical Residents / Postgrads</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-text-main">Supervision Modality & Expectations</label>
                <Input
                  name="supervisionFormat"
                  value={settings.supervisionFormat}
                  onChange={handleChange}
                  placeholder="e.g. Weekly 1-on-1 supervision, case discussions, research reviews..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // Reset
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
            {saving ? 'Saving...' : 'Save Practice Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
