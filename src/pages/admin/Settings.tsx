import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  ShieldCheck, 
  DollarSign, 
  Bell, 
  Lock, 
  Globe, 
  Check, 
  AlertTriangle, 
  RotateCcw
} from 'lucide-react';

interface PlatformConfig {
  // General
  platformName: string;
  supportEmail: string;
  crisisHotline: string;
  defaultCurrency: string;
  timezone: string;
  maintenanceMode: boolean;

  // Commission & Payouts
  platformTakeRate: number;
  payoutCycle: 'weekly' | 'bi-weekly' | 'monthly';
  minPayoutThreshold: number;
  tdsRate: number;
  cancellationWindowHours: number;
  lateCancellationFeePercent: number;

  // Verification & Clinical
  requireRciLicense: boolean;
  minYearsExperience: number;
  enableInternshipPortal: boolean;
  annualVerificationExpiry: boolean;
  inPersonClinicProof: boolean;

  // Security & Data
  requireAdminTwoFactor: boolean;
  sessionRecordingAllowed: boolean;
  clinicalDataRetentionYears: number;
  ipRestrictionEnabled: boolean;

  // Notifications
  patientSmsReminders: boolean;
  bookingEmailAlerts: boolean;
  adminDailyDigest: boolean;
  urgentDisputeSlackWebhook: string;
}

const DEFAULT_SETTINGS: PlatformConfig = {
  platformName: 'WELLPath Mental Health Portal',
  supportEmail: 'support@wellpath.care',
  crisisHotline: '+91 91529 87821 (KIRAN) / 14416 (Tele-MANAS)',
  defaultCurrency: 'INR (₹)',
  timezone: 'Asia/Kolkata (IST)',
  maintenanceMode: false,

  platformTakeRate: 10,
  payoutCycle: 'weekly',
  minPayoutThreshold: 1000,
  tdsRate: 10,
  cancellationWindowHours: 24,
  lateCancellationFeePercent: 70,

  requireRciLicense: true,
  minYearsExperience: 1,
  enableInternshipPortal: true,
  annualVerificationExpiry: true,
  inPersonClinicProof: true,

  requireAdminTwoFactor: true,
  sessionRecordingAllowed: false,
  clinicalDataRetentionYears: 7,
  ipRestrictionEnabled: false,

  patientSmsReminders: true,
  bookingEmailAlerts: true,
  adminDailyDigest: true,
  urgentDisputeSlackWebhook: 'https://hooks.slack.com/services/T00/B00/XXXXX',
};

export default function Settings() {
  const [config, setConfig] = useState<PlatformConfig>(() => {
    const saved = localStorage.getItem('wellpath_platform_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [activeTab, setActiveTab] = useState<'general' | 'payouts' | 'verification' | 'security' | 'notifications'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (key: keyof PlatformConfig) => {
    setConfig((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (key: keyof PlatformConfig, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('wellpath_platform_settings', JSON.stringify(config));
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 600);
  };

  const handleReset = () => {
    if (window.confirm('Reset all platform settings to system defaults?')) {
      setConfig(DEFAULT_SETTINGS);
      localStorage.setItem('wellpath_platform_settings', JSON.stringify(DEFAULT_SETTINGS));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const tabs = [
    { id: 'general', label: 'General & Support', icon: Globe },
    { id: 'payouts', label: 'Commissions & Payouts', icon: DollarSign },
    { id: 'verification', label: 'Clinical Compliance', icon: ShieldCheck },
    { id: 'security', label: 'Security & Privacy', icon: Lock },
    { id: 'notifications', label: 'Alerts & Webhooks', icon: Bell },
  ] as const;

  return (
    <div className="space-y-8 max-w-7xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-950 tracking-tight flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-emerald-600" />
            Platform Configuration & Settings
          </h1>
          <p className="text-emerald-700 font-medium text-sm mt-1">
            Global controls for pricing models, clinical practitioner verification rules, notifications, and compliance.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 bg-white hover:bg-emerald-50 transition-colors shadow-sm"
          >
            <RotateCcw className="h-4 w-4 text-emerald-600" />
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-75 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all"
          >
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {saveSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-900 text-sm font-bold">
            <div className="bg-emerald-100 p-1.5 rounded-full">
              <Check className="h-5 w-5 text-emerald-600" />
            </div>
            Platform configuration settings updated successfully.
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg font-bold shadow-sm">Active in Production</span>
        </div>
      )}

      {/* Settings Container with Sidebar Nav */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sub-navigation Tabs */}
        <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-emerald-100 bg-emerald-50/50 p-6 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all text-left ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md transform scale-[1.02]'
                    : 'text-emerald-700 hover:bg-emerald-100/80 hover:text-emerald-900'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-100' : 'text-emerald-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <div className="flex-1 p-8 md:p-10 bg-white">
          <form onSubmit={handleSave} className="space-y-10">
            {/* TAB 1: GENERAL */}
            {activeTab === 'general' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-2xl font-extrabold text-emerald-950">General Information</h2>
                  <p className="text-sm font-medium text-emerald-600 mt-1">Core identity and emergency crisis support helpline configurations.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      Platform Brand Title
                    </label>
                    <input
                      type="text"
                      value={config.platformName}
                      onChange={(e) => handleChange('platformName', e.target.value)}
                      className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      Support Email Address
                    </label>
                    <input
                      type="email"
                      value={config.supportEmail}
                      onChange={(e) => handleChange('supportEmail', e.target.value)}
                      className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      24/7 Emergency Crisis SOS Hotline Display
                    </label>
                    <input
                      type="text"
                      value={config.crisisHotline}
                      onChange={(e) => handleChange('crisisHotline', e.target.value)}
                      className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                    />
                    <p className="text-xs font-semibold text-emerald-600/70 mt-2">
                      Prominently shown in the patient header and during emergency intake assessments.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      Standard Currency
                    </label>
                    <select
                      value={config.defaultCurrency}
                      onChange={(e) => handleChange('defaultCurrency', e.target.value)}
                      className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                    >
                      <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                      <option value="USD ($)">USD ($) - US Dollar</option>
                      <option value="EUR (€)">EUR (€) - Euro</option>
                      <option value="GBP (£)">GBP (£) - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      Default Platform Timezone
                    </label>
                    <select
                      value={config.timezone}
                      onChange={(e) => handleChange('timezone', e.target.value)}
                      className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                    >
                      <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST) - UTC +5:30</option>
                      <option value="UTC">UTC (Universal Time)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-emerald-100">
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-sm">
                    <div>
                      <h4 className="text-sm font-extrabold text-amber-900 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        Maintenance Lockdown Mode
                      </h4>
                      <p className="text-xs font-semibold text-amber-700 mt-1.5">
                        Temporarily prevents new patient bookings while upgrades are in progress.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('maintenanceMode')}
                      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.maintenanceMode ? 'bg-amber-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PAYOUTS */}
            {activeTab === 'payouts' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-2xl font-extrabold text-emerald-950">Commissions & Provider Payouts</h2>
                  <p className="text-sm font-medium text-emerald-600 mt-1">Define platform rake, automated settlement schedules, and cancellation policies.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      Platform Fee / Rake (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={config.platformTakeRate}
                        onChange={(e) => handleChange('platformTakeRate', Number(e.target.value))}
                        className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-extrabold focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                      />
                      <span className="absolute right-4 top-3 text-sm font-bold text-emerald-500">%</span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-600/70 mt-2">Deducted from each completed consultation fee.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      TDS Tax Rate (Section 194J) (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={config.tdsRate}
                        onChange={(e) => handleChange('tdsRate', Number(e.target.value))}
                        className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-extrabold focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                      />
                      <span className="absolute right-4 top-3 text-sm font-bold text-emerald-500">%</span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-600/70 mt-2">Withholding tax deposited against therapist PAN.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      Settlement Payout Cycle
                    </label>
                    <select
                      value={config.payoutCycle}
                      onChange={(e) => handleChange('payoutCycle', e.target.value)}
                      className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                    >
                      <option value="weekly">Weekly (Every Monday)</option>
                      <option value="bi-weekly">Bi-weekly (1st & 15th)</option>
                      <option value="monthly">Monthly (1st of month)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      Minimum Payout Threshold (₹)
                    </label>
                    <input
                      type="number"
                      step="500"
                      value={config.minPayoutThreshold}
                      onChange={(e) => handleChange('minPayoutThreshold', Number(e.target.value))}
                      className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-extrabold focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      Free Cancellation Window (Hours)
                    </label>
                    <input
                      type="number"
                      value={config.cancellationWindowHours}
                      onChange={(e) => handleChange('cancellationWindowHours', Number(e.target.value))}
                      className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-extrabold focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                    />
                    <p className="text-xs font-semibold text-emerald-600/70 mt-2">Patients can cancel for 100% refund up to this threshold.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">
                      Late Cancellation Therapist Payout (%)
                    </label>
                    <input
                      type="number"
                      value={config.lateCancellationFeePercent}
                      onChange={(e) => handleChange('lateCancellationFeePercent', Number(e.target.value))}
                      className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-extrabold focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                    />
                    <p className="text-xs font-semibold text-emerald-600/70 mt-2">Protected revenue credited to practitioner on no-show.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: VERIFICATION & COMPLIANCE */}
            {activeTab === 'verification' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-2xl font-extrabold text-emerald-950">Clinical Verification & Onboarding Rules</h2>
                  <p className="text-sm font-medium text-emerald-600 mt-1">Ensure clinical credential integrity, licensing guidelines, and student intern protocols.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 rounded-2xl border border-emerald-100 bg-white hover:bg-emerald-50/30 hover:border-emerald-200 transition-colors shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Mandatory RCI / State Medical Council Verification</h4>
                      <p className="text-xs font-semibold text-emerald-600/80 mt-1">
                        Clinical psychologists and psychiatrists must provide valid registration numbers verified against national registries.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('requireRciLicense')}
                      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.requireRciLicense ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.requireRciLicense ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl border border-emerald-100 bg-white hover:bg-emerald-50/30 hover:border-emerald-200 transition-colors shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Annual Credential Re-verification</h4>
                      <p className="text-xs font-semibold text-emerald-600/80 mt-1">
                        Flag practitioner profiles for re-certification review every 12 months.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('annualVerificationExpiry')}
                      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.annualVerificationExpiry ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.annualVerificationExpiry ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl border border-emerald-100 bg-white hover:bg-emerald-50/30 hover:border-emerald-200 transition-colors shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Student Internship & Shadowing Portal</h4>
                      <p className="text-xs font-semibold text-emerald-600/80 mt-1">
                        Allow psychology graduate students to browse verified clinical supervisors and apply for internships.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('enableInternshipPortal')}
                      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.enableInternshipPortal ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.enableInternshipPortal ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl border border-emerald-100 bg-white hover:bg-emerald-50/30 hover:border-emerald-200 transition-colors shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">In-Person Clinic Lease / Utility Bill Verification</h4>
                      <p className="text-xs font-semibold text-emerald-600/80 mt-1">
                        Require physical clinic proof before listing clinic addresses on patient search.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('inPersonClinicProof')}
                      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.inPersonClinicProof ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.inPersonClinicProof ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SECURITY & PRIVACY */}
            {activeTab === 'security' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-2xl font-extrabold text-emerald-950">Security & Patient Confidentiality</h2>
                  <p className="text-sm font-medium text-emerald-600 mt-1">HIPAA and DISHA compliance standards, data retention, and admin access control.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 rounded-2xl border border-emerald-100 bg-white hover:bg-emerald-50/30 hover:border-emerald-200 transition-colors shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Require Two-Factor Authentication (2FA) for Admin Accounts</h4>
                      <p className="text-xs font-semibold text-emerald-600/80 mt-1">
                        Enforce TOTP authenticator app verification for all staff accessing the admin dashboard.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('requireAdminTwoFactor')}
                      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.requireAdminTwoFactor ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.requireAdminTwoFactor ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl border border-emerald-100 bg-white hover:bg-emerald-50/30 hover:border-emerald-200 transition-colors shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Tele-Health Consultation Recording</h4>
                      <p className="text-xs font-semibold text-emerald-600/80 mt-1">
                        Strictly prohibited by default. Tele-consultations use end-to-end encryption without server storage.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('sessionRecordingAllowed')}
                      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.sessionRecordingAllowed ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.sessionRecordingAllowed ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl border border-emerald-100 bg-white hover:bg-emerald-50/30 transition-colors shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-emerald-950">Clinical Encounters Retention Period</h4>
                        <p className="text-xs font-semibold text-emerald-600/80 mt-1">
                          Statutory legal preservation period for medical invoices and clinical consultation metadata.
                        </p>
                      </div>
                      <div className="w-36">
                        <select
                          value={config.clinicalDataRetentionYears}
                          onChange={(e) => handleChange('clinicalDataRetentionYears', Number(e.target.value))}
                          className="w-full px-4 py-2 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                        >
                          <option value="3">3 Years</option>
                          <option value="5">5 Years</option>
                          <option value="7">7 Years (Default)</option>
                          <option value="10">10 Years</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: NOTIFICATIONS & WEBHOOKS */}
            {activeTab === 'notifications' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-2xl font-extrabold text-emerald-950">Alerts, Notifications & Integrations</h2>
                  <p className="text-sm font-medium text-emerald-600 mt-1">Manage automated email alerts, SMS gateway toggles, and incident reporting channels.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 rounded-2xl border border-emerald-100 bg-white hover:bg-emerald-50/30 transition-colors shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Automated Patient SMS Reminders</h4>
                      <p className="text-xs font-semibold text-emerald-600/80 mt-1">
                        Dispatches SMS with video session joining links 2 hours and 15 minutes before the appointment.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('patientSmsReminders')}
                      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.patientSmsReminders ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.patientSmsReminders ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl border border-emerald-100 bg-white hover:bg-emerald-50/30 transition-colors shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Therapist New Booking Email Alerts</h4>
                      <p className="text-xs font-semibold text-emerald-600/80 mt-1">
                        Instant email notification to therapists with calendar invite whenever a slot is booked.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('bookingEmailAlerts')}
                      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.bookingEmailAlerts ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.bookingEmailAlerts ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl border border-emerald-100 bg-white shadow-sm space-y-3">
                    <label className="block text-sm font-bold text-emerald-950">
                      Emergency SOS & Dispute Escalation Webhook (Slack / Opsgenie)
                    </label>
                    <p className="text-xs font-semibold text-emerald-600/80">
                      Triggers instant ping to the on-call admin team when a patient presses the SOS distress signal.
                    </p>
                    <input
                      type="url"
                      value={config.urgentDisputeSlackWebhook}
                      onChange={(e) => handleChange('urgentDisputeSlackWebhook', e.target.value)}
                      className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-sm font-mono text-emerald-900 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Save Action Bar */}
            <div className="pt-8 border-t border-emerald-100 flex items-center justify-between mt-10">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest hidden sm:block">
                Changes take effect globally upon saving.
              </span>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border-2 border-emerald-100 rounded-xl text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
