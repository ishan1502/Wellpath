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
      <div className="bg-surface rounded-xl border-0 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-muted/50 rounded-lg text-primary-hover shadow-sm">
                <SettingsIcon className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Account & Practice Settings
                </h1>
                <p className="text-sm text-primary-hover/80 mt-1 font-medium">
                  Configure your practice defaults, telehealth options, payout bank details, and security controls.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-primary-muted mt-8 gap-4 no-scrollbar">
          {[
            { id: 'practice', label: 'Practice Rules', icon: Clock },
            { id: 'security', label: 'Security', icon: KeyRound },
            { id: 'payout', label: 'Banking', icon: CreditCard },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'interns', label: 'Interns', icon: GraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                type="button"
                className={`flex items-center gap-2 py-3 px-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-primary text-primary-dark font-semibold'
                    : 'border-transparent text-primary/70 hover:text-primary-dark hover:border-primary-muted'
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
        <div className="p-4 bg-primary-muted/80 border border-primary-muted text-primary-dark rounded-lg flex items-center justify-between transition-all animate-in shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm font-medium">Your practice settings have been successfully updated.</span>
          </div>
          <button onClick={() => setSaveSuccess(false)} className="text-primary-hover hover:text-primary-dark text-xs font-semibold px-2 py-1 hover:bg-primary-muted rounded-lg transition-colors">
            Dismiss
          </button>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: PRACTICE & BOOKING RULES */}
        {activeTab === 'practice' && (
          <div className="bg-surface rounded-xl border-0 p-6 md:p-8 space-y-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground">Practice & Booking Configuration</h2>
              <p className="text-sm text-primary-hover/80 font-medium">Define how clients schedule sessions and set your clinical session rules.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Standard Session Duration</label>
                <select
                  name="sessionDuration"
                  value={settings.sessionDuration}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border-0 bg-primary-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
                >
                  <option value="45">45 Minutes</option>
                  <option value="50">50 Minutes (Standard Clinical Hour)</option>
                  <option value="60">60 Minutes</option>
                  <option value="90">90 Minutes (Intake / Couples)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Standard Fee per Session (₹)</label>
                <div className="relative">
                  <Input
                    name="sessionFee"
                    type="number"
                    value={settings.sessionFee}
                    onChange={handleChange}
                    className="pl-10 h-11 rounded-lg border-0 bg-primary-muted/50 text-foreground shadow-sm focus-visible:ring-ring"
                  />
                  <span className="absolute left-4 top-3 text-primary-hover font-bold text-sm">₹</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Buffer Time Between Sessions</label>
                <select
                  name="bufferTime"
                  value={settings.bufferTime}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border-0 bg-primary-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
                >
                  <option value="0">No buffer</option>
                  <option value="10">10 Minutes</option>
                  <option value="15">15 Minutes (Recommended for notes)</option>
                  <option value="30">30 Minutes</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Minimum Advance Notice</label>
                <select
                  name="minAdvanceNotice"
                  value={settings.minAdvanceNotice}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border-0 bg-primary-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
                >
                  <option value="2">2 Hours prior</option>
                  <option value="6">6 Hours prior</option>
                  <option value="12">12 Hours prior</option>
                  <option value="24">24 Hours prior</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Maximum Advance Booking</label>
                <select
                  name="maxAdvanceBooking"
                  value={settings.maxAdvanceBooking}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border-0 bg-primary-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
                >
                  <option value="7">Up to 7 days ahead</option>
                  <option value="14">Up to 14 days ahead</option>
                  <option value="30">Up to 30 days ahead</option>
                  <option value="60">Up to 60 days ahead</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Cancellation Policy</label>
                <select
                  name="cancellationPolicy"
                  value={settings.cancellationPolicy}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border-0 bg-primary-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
                >
                  <option value="24hours">Free cancellation up to 24 hours before</option>
                  <option value="48hours">Strict: 48 hours notice required</option>
                  <option value="flexible">Flexible: Free cancellation up to 4 hours before</option>
                </select>
              </div>

              <div className="space-y-3 md:col-span-2 pt-2">
                <label className="text-sm font-semibold text-primary-dark">Telehealth Video Call Platform</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'wellpath_builtin', label: 'WellPath Video', desc: 'Encrypted & HIPAA compliant' },
                    { id: 'google_meet', label: 'Google Meet', desc: 'Auto-generates Meet links' },
                    { id: 'zoom', label: 'Zoom Healthcare', desc: 'Requires Zoom account' }
                  ].map(provider => (
                    <label
                      key={provider.id}
                      className={`p-4 rounded-lg cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-sm ${
                        settings.telehealthProvider === provider.id
                          ? 'bg-primary-muted border-2 border-primary shadow-md'
                          : 'bg-surface border-2 border-transparent hover:bg-primary-muted/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-foreground flex items-center gap-2">
                          <Video className="w-4 h-4 text-primary" />
                          {provider.label}
                        </span>
                        <input
                          type="radio"
                          name="telehealthProvider"
                          value={provider.id}
                          checked={settings.telehealthProvider === provider.id}
                          onChange={handleChange}
                          className="accent-emerald-600 h-4 w-4"
                        />
                      </div>
                      <p className="text-xs text-primary-hover font-medium">{provider.desc}</p>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-primary-muted flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground">Instant Auto-Confirmation</h4>
                <p className="text-xs text-primary-hover/80 font-medium mt-1">Automatically confirm appointment slots when a patient pays.</p>
              </div>
              <input
                type="checkbox"
                name="autoConfirmBookings"
                checked={settings.autoConfirmBookings}
                onChange={handleChange}
                className="h-6 w-6 text-primary rounded-lg border-primary-muted focus:ring-ring accent-emerald-600"
              />
            </div>
          </div>
        )}

        {/* TAB 2: SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="bg-surface rounded-xl border-0 p-6 md:p-8 space-y-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground">Login & Security</h2>
              <p className="text-sm text-primary-hover/80 font-medium">Protect your account and confidential patient records.</p>
            </div>

            {/* Email overview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-lg bg-primary-muted/50 border border-primary-muted gap-4 shadow-sm">
              <div>
                <p className="text-xs text-primary-hover font-semibold uppercase tracking-wider">Registered Email Address</p>
                <p className="text-base font-bold text-foreground mt-1">{settings.email}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-primary-muted text-primary-dark">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Primary & Verified
              </span>
            </div>

            {/* Change Password */}
            <div className="space-y-5 pt-2">
              <h3 className="text-sm font-bold text-primary-dark flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" /> Change Password
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-primary-dark">Current Password</label>
                  <Input
                    type="password"
                    name="currentPassword"
                    value={settings.currentPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="h-11 rounded-lg border-0 bg-primary-muted/50 shadow-sm focus-visible:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-primary-dark">New Password</label>
                  <Input
                    type="password"
                    name="newPassword"
                    value={settings.newPassword}
                    onChange={handleChange}
                    placeholder="Minimum 8 chars"
                    className="h-11 rounded-lg border-0 bg-primary-muted/50 shadow-sm focus-visible:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-primary-dark">Confirm New Password</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={settings.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat new password"
                    className="h-11 rounded-lg border-0 bg-primary-muted/50 shadow-sm focus-visible:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Two Factor Authentication */}
            <div className="pt-6 border-t border-primary-muted flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-sm font-bold text-foreground">Two-Factor Authentication (2FA)</h4>
                  <span className="text-[10px] bg-primary-muted text-primary-dark px-2 py-0.5 rounded-lg font-bold">Enabled</span>
                </div>
                <p className="text-xs text-primary-hover/80 font-medium mt-1">Require an authenticator app code on every new sign-in.</p>
              </div>
              <input
                type="checkbox"
                name="twoFactorEnabled"
                checked={settings.twoFactorEnabled}
                onChange={handleChange}
                className="h-6 w-6 text-primary rounded-lg border-primary-muted focus:ring-ring accent-emerald-600"
              />
            </div>

            {/* Active Sessions */}
            <div className="pt-6 border-t border-primary-muted space-y-4">
              <h4 className="text-sm font-bold text-foreground">Active Authorized Sessions</h4>
              <div className="space-y-3">
                <div className="p-4 bg-primary-muted/50 rounded-lg border border-primary-muted flex items-center justify-between text-xs shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-muted rounded-xl">
                      <Laptop className="w-5 h-5 text-primary-hover" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Apple MacBook Pro (macOS 15.3)</p>
                      <p className="text-primary-hover/80 text-[11px] font-medium mt-0.5">Chrome 128 • Mumbai, India • Current session</p>
                    </div>
                  </div>
                  <span className="text-primary font-bold bg-primary-muted px-3 py-1 rounded-xl">Active Now</span>
                </div>

                <div className="p-4 bg-primary-muted/50 rounded-lg border border-primary-muted flex items-center justify-between text-xs shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-muted rounded-xl">
                      <Smartphone className="w-5 h-5 text-primary-hover" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">iPhone 15 Pro (iOS 18)</p>
                      <p className="text-primary-hover/80 text-[11px] font-medium mt-0.5">WellPath Practitioner App • Last active 3 hours ago</p>
                    </div>
                  </div>
                  <button type="button" className="text-rose-600 hover:text-rose-700 font-bold px-3 py-1 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BANKING & PAYOUTS */}
        {activeTab === 'payout' && (
          <div className="bg-surface rounded-xl border-0 p-6 md:p-8 space-y-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground">Banking & Payout Accounts</h2>
              <p className="text-sm text-primary-hover/80 font-medium">Earnings from completed therapy sessions are settled directly into this account.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Bank Name</label>
                <div className="relative">
                  <Input
                    name="bankName"
                    value={settings.bankName}
                    onChange={handleChange}
                    className="pl-11 h-11 rounded-lg border-0 bg-primary-muted/50 text-foreground shadow-sm focus-visible:ring-ring"
                  />
                  <Building className="w-5 h-5 text-primary absolute left-4 top-3" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Beneficiary Full Name</label>
                <Input
                  name="beneficiaryName"
                  value={settings.beneficiaryName}
                  onChange={handleChange}
                  className="h-11 rounded-lg border-0 bg-primary-muted/50 text-foreground shadow-sm focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Bank Account Number</label>
                <Input
                  name="accountNumber"
                  value={settings.accountNumber}
                  onChange={handleChange}
                  className="h-11 rounded-lg border-0 bg-primary-muted/50 text-foreground shadow-sm focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">IFSC Code / Branch Routing</label>
                <Input
                  name="ifscCode"
                  value={settings.ifscCode}
                  onChange={handleChange}
                  className="h-11 rounded-lg border-0 bg-primary-muted/50 text-foreground shadow-sm focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">PAN / Tax Registration Number</label>
                <Input
                  name="panNumber"
                  value={settings.panNumber}
                  onChange={handleChange}
                  className="h-11 rounded-lg border-0 bg-primary-muted/50 text-foreground shadow-sm focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Automated Settlement Frequency</label>
                <select
                  name="payoutFrequency"
                  value={settings.payoutFrequency}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border-0 bg-primary-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
                >
                  <option value="weekly">Weekly (Every Monday Morning)</option>
                  <option value="biweekly">Bi-Weekly (Every Alternate Friday)</option>
                  <option value="monthly">Monthly (1st of Each Month)</option>
                </select>
              </div>
            </div>

            <div className="p-5 bg-primary-muted rounded-lg border border-primary-muted flex items-start gap-4 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div className="text-sm text-foreground space-y-1">
                <p className="font-bold">Automated TDS & Invoicing</p>
                <p className="text-primary-hover font-medium">
                  WellPath platform fee (12%) is deducted automatically. Quarterly GST tax reports and Form 16A TDS certificates are available under your Earnings tab.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="bg-surface rounded-xl border-0 p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground">Communication Preferences</h2>
              <p className="text-sm text-primary-hover/80 font-medium">Choose when and how you receive alerts from patients and students.</p>
            </div>

            <div className="divide-y divide-emerald-100">
              <div className="py-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground">New Booking Email Notifications</h4>
                  <p className="text-xs text-primary-hover/80 font-medium mt-1">Instant email when a patient books a new therapy session.</p>
                </div>
                <input
                  type="checkbox"
                  name="emailOnBooking"
                  checked={settings.emailOnBooking}
                  onChange={handleChange}
                  className="h-6 w-6 text-primary rounded-lg border-primary-muted focus:ring-ring accent-emerald-600"
                />
              </div>

              <div className="py-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground">SMS Appointment Alerts</h4>
                  <p className="text-xs text-primary-hover/80 font-medium mt-1">SMS notification for bookings, cancellations, and reschedules.</p>
                </div>
                <input
                  type="checkbox"
                  name="smsOnBooking"
                  checked={settings.smsOnBooking}
                  onChange={handleChange}
                  className="h-6 w-6 text-primary rounded-lg border-primary-muted focus:ring-ring accent-emerald-600"
                />
              </div>

              <div className="py-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground">24-Hour Session Reminders</h4>
                  <p className="text-xs text-primary-hover/80 font-medium mt-1">Daily calendar digest of upcoming consultations for tomorrow.</p>
                </div>
                <input
                  type="checkbox"
                  name="sms24hReminder"
                  checked={settings.sms24hReminder}
                  onChange={handleChange}
                  className="h-6 w-6 text-primary rounded-lg border-primary-muted focus:ring-ring accent-emerald-600"
                />
              </div>

              <div className="py-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground">New Patient Review Alerts</h4>
                  <p className="text-xs text-primary-hover/80 font-medium mt-1">Get alerted whenever a patient leaves a testimonial or rating.</p>
                </div>
                <input
                  type="checkbox"
                  name="emailOnReview"
                  checked={settings.emailOnReview}
                  onChange={handleChange}
                  className="h-6 w-6 text-primary rounded-lg border-primary-muted focus:ring-ring accent-emerald-600"
                />
              </div>

              <div className="py-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground">Internship Application Alerts</h4>
                  <p className="text-xs text-primary-hover/80 font-medium mt-1">Notification when a student applies for supervision.</p>
                </div>
                <input
                  type="checkbox"
                  name="emailOnInternApp"
                  checked={settings.emailOnInternApp}
                  onChange={handleChange}
                  className="h-6 w-6 text-primary rounded-lg border-primary-muted focus:ring-ring accent-emerald-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INTERNSHIP SUPERVISION */}
        {activeTab === 'interns' && (
          <div className="bg-surface rounded-xl border-0 p-6 md:p-8 space-y-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground">Internship Supervision Program</h2>
              <p className="text-sm text-primary-hover/80 font-medium">Control your visibility in the student directory and manage mentorship capacity.</p>
            </div>

            <div className="p-5 bg-primary-muted rounded-lg border border-primary-muted flex items-center justify-between shadow-sm">
              <div>
                <h4 className="text-sm font-bold text-foreground">Accepting Student Interns</h4>
                <p className="text-xs text-primary-hover font-medium mt-1">Your profile will display an "Open for Interns" badge to enrolled students.</p>
              </div>
              <input
                type="checkbox"
                name="acceptsInterns"
                checked={settings.acceptsInterns}
                onChange={handleChange}
                className="h-6 w-6 text-primary rounded-lg border-primary-muted focus:ring-ring accent-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Max Active Intern Capacity</label>
                <select
                  name="maxInternsCapacity"
                  value={settings.maxInternsCapacity}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border-0 bg-primary-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
                >
                  <option value="1">1 Student Intern</option>
                  <option value="2">2 Student Interns (Recommended)</option>
                  <option value="3">3 Student Interns</option>
                  <option value="5">5 Student Interns</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark">Preferred Student Level</label>
                <select
                  name="preferredStudentLevel"
                  value={settings.preferredStudentLevel}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border-0 bg-primary-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
                >
                  <option value="Undergraduate senior">Final-year Undergraduate</option>
                  <option value="Masters or PhD candidates">Master's (MA / MSc / MPhil) or PhD Candidates</option>
                  <option value="Postgraduate Residents">Medical Residents / Postgrads</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-primary-dark">Supervision Modality & Expectations</label>
                <Input
                  name="supervisionFormat"
                  value={settings.supervisionFormat}
                  onChange={handleChange}
                  placeholder="e.g. Weekly 1-on-1 supervision, case discussions, research reviews..."
                  className="h-11 rounded-lg border-0 bg-primary-muted/50 text-foreground shadow-sm focus-visible:ring-ring"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-lg h-11 px-6 font-bold border-primary-muted text-primary-dark hover:bg-primary-muted"
            onClick={() => {
              // Reset
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg h-11 px-6 font-bold bg-primary hover:bg-primary-hover text-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Practice Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
