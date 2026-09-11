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
    <div className="space-y-6 max-w-6xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <SettingsIcon className="h-7 w-7 text-emerald-600" />
            Platform Configuration & Settings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Global controls for pricing models, clinical practitioner verification rules, notifications, and compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RotateCcw className="h-3.5 w-3.5 text-gray-500" />
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between animate-in">
          <div className="flex items-center gap-2.5 text-emerald-800 text-sm font-medium">
            <Check className="h-5 w-5 text-emerald-600" />
            Platform configuration settings updated successfully.
          </div>
          <span className="text-xs text-emerald-600 font-semibold">Active in Production</span>
        </div>
      )}

      {/* Settings Container with Sidebar Nav */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Sub-navigation Tabs */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50/75 p-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-white text-emerald-700 font-semibold shadow-xs border border-gray-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <div className="flex-1 p-6 md:p-8">
          <form onSubmit={handleSave} className="space-y-8">
            {/* TAB 1: GENERAL */}
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">General Information</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Core identity and emergency crisis support helpline configurations.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Platform Brand Title
                    </label>
                    <input
                      type="text"
                      value={config.platformName}
                      onChange={(e) => handleChange('platformName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Support Email Address
                    </label>
                    <input
                      type="email"
                      value={config.supportEmail}
                      onChange={(e) => handleChange('supportEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      24/7 Emergency Crisis SOS Hotline Display
                    </label>
                    <input
                      type="text"
                      value={config.crisisHotline}
                      onChange={(e) => handleChange('crisisHotline', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      Prominently shown in the patient header and during emergency intake assessments.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Standard Currency
                    </label>
                    <select
                      value={config.defaultCurrency}
                      onChange={(e) => handleChange('defaultCurrency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                      <option value="USD ($)">USD ($) - US Dollar</option>
                      <option value="EUR (€)">EUR (€) - Euro</option>
                      <option value="GBP (£)">GBP (£) - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Default Platform Timezone
                    </label>
                    <select
                      value={config.timezone}
                      onChange={(e) => handleChange('timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST) - UTC +5:30</option>
                      <option value="UTC">UTC (Universal Time)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                    <div>
                      <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        Maintenance Lockdown Mode
                      </h4>
                      <p className="text-[11px] text-amber-700 mt-0.5">
                        Temporarily prevents new patient bookings while upgrades are in progress.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('maintenanceMode')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.maintenanceMode ? 'bg-amber-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
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
              <div className="space-y-6 animate-in">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Commissions & Provider Payouts</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Define platform rake, automated settlement schedules, and cancellation policies.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Platform Fee / Rake (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={config.platformTakeRate}
                        onChange={(e) => handleChange('platformTakeRate', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <span className="absolute right-3 top-2 text-xs text-gray-400">%</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">Deducted from each completed consultation fee.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      TDS Tax Rate (Section 194J) (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={config.tdsRate}
                        onChange={(e) => handleChange('tdsRate', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <span className="absolute right-3 top-2 text-xs text-gray-400">%</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">Withholding tax deposited against therapist PAN.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Settlement Payout Cycle
                    </label>
                    <select
                      value={config.payoutCycle}
                      onChange={(e) => handleChange('payoutCycle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="weekly">Weekly (Every Monday)</option>
                      <option value="bi-weekly">Bi-weekly (1st & 15th)</option>
                      <option value="monthly">Monthly (1st of month)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Minimum Payout Threshold (₹)
                    </label>
                    <input
                      type="number"
                      step="500"
                      value={config.minPayoutThreshold}
                      onChange={(e) => handleChange('minPayoutThreshold', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Free Cancellation Window (Hours)
                    </label>
                    <input
                      type="number"
                      value={config.cancellationWindowHours}
                      onChange={(e) => handleChange('cancellationWindowHours', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Patients can cancel for 100% refund up to this threshold.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Late Cancellation Therapist Payout (%)
                    </label>
                    <input
                      type="number"
                      value={config.lateCancellationFeePercent}
                      onChange={(e) => handleChange('lateCancellationFeePercent', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Protected revenue credited to practitioner on no-show.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: VERIFICATION & COMPLIANCE */}
            {activeTab === 'verification' && (
              <div className="space-y-6 animate-in">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Clinical Verification & Onboarding Rules</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Ensure clinical credential integrity, licensing guidelines, and student intern protocols.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Mandatory RCI / State Medical Council Verification</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Clinical psychologists and psychiatrists must provide valid registration numbers verified against national registries.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('requireRciLicense')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.requireRciLicense ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.requireRciLicense ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Annual Credential Re-verification</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Flag practitioner profiles for re-certification review every 12 months.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('annualVerificationExpiry')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.annualVerificationExpiry ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.annualVerificationExpiry ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Student Internship & Shadowing Portal</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Allow psychology graduate students to browse verified clinical supervisors and apply for internships.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('enableInternshipPortal')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.enableInternshipPortal ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.enableInternshipPortal ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">In-Person Clinic Lease / Utility Bill Verification</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Require physical clinic proof before listing clinic addresses on patient search.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('inPersonClinicProof')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.inPersonClinicProof ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
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
              <div className="space-y-6 animate-in">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Security & Patient Confidentiality</h2>
                  <p className="text-xs text-gray-500 mt-0.5">HIPAA and DISHA compliance standards, data retention, and admin access control.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Require Two-Factor Authentication (2FA) for Admin Accounts</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Enforce TOTP authenticator app verification for all staff accessing the admin dashboard.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('requireAdminTwoFactor')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.requireAdminTwoFactor ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.requireAdminTwoFactor ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Tele-Health Consultation Recording</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Strictly prohibited by default. Tele-consultations use end-to-end encryption without server storage.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('sessionRecordingAllowed')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.sessionRecordingAllowed ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.sessionRecordingAllowed ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">Clinical Encounters Retention Period</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Statutory legal preservation period for medical invoices and clinical consultation metadata.
                        </p>
                      </div>
                      <div className="w-32">
                        <select
                          value={config.clinicalDataRetentionYears}
                          onChange={(e) => handleChange('clinicalDataRetentionYears', Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              <div className="space-y-6 animate-in">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Alerts, Notifications & Integrations</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Manage automated email alerts, SMS gateway toggles, and incident reporting channels.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Automated Patient SMS Reminders</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Dispatches SMS with video session joining links 2 hours and 15 minutes before the appointment.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('patientSmsReminders')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.patientSmsReminders ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.patientSmsReminders ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Therapist New Booking Email Alerts</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Instant email notification to therapists with calendar invite whenever a slot is booked.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('bookingEmailAlerts')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        config.bookingEmailAlerts ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.bookingEmailAlerts ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-200 space-y-2">
                    <label className="block text-xs font-bold text-gray-900">
                      Emergency SOS & Dispute Escalation Webhook (Slack / Opsgenie)
                    </label>
                    <p className="text-[11px] text-gray-500">
                      Triggers instant ping to the on-call admin team when a patient presses the SOS distress signal.
                    </p>
                    <input
                      type="url"
                      value={config.urgentDisputeSlackWebhook}
                      onChange={(e) => handleChange('urgentDisputeSlackWebhook', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Save Action Bar */}
            <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Changes take effect across the platform immediately after saving.
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Save className="h-3.5 w-3.5" />
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
