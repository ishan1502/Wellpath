import React from 'react';
import { FileCheck, AlertTriangle, Scale, Stethoscope, HelpCircle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-700 mb-4">
          <Scale className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Terms of Service</h1>
        <p className="text-gray-600 mt-2 text-lg">Effective Date: September 2026</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
        {/* Emergency Alert Banner */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4 text-red-800">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 text-red-600 mt-0.5" />
          <div className="text-sm">
            <strong className="font-semibold block text-base mb-1">Emergency Medical Notice</strong>
            WELLPath is not an emergency response service. If you or someone you know is experiencing acute crisis, thoughts of self-harm, or a medical emergency, please call <strong>911</strong> (US), <strong>112</strong> / <strong>14416 (Tele-MANAS)</strong> (India), or proceed to the nearest emergency room immediately.
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            1. Acceptance of Terms
          </h2>
          <p>
            By creating an account, browsing the WELLPath directory, or booking clinical sessions, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you must discontinue platform use immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-600" />
            2. Healthcare Provider Relationship
          </h2>
          <p>
            WELLPath provides a technology platform connecting independent licensed therapists, counselors, and psychiatrists with patients and students. Therapists on WELLPath are independent contractors and are not employees of WELLPath. Clinical discretion and therapeutic decisions remain solely the responsibility of the treating healthcare professional.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            3. Cancellations & Rescheduling
          </h2>
          <p>
            Appointments can be rescheduled or cancelled without fee up to 24 hours prior to the scheduled consultation time. Cancellations made within 24 hours may be subject to a late-cancellation fee in accordance with the individual provider's policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            4. Contact and Governance
          </h2>
          <p>
            These terms shall be governed by applicable healthcare laws. For billing disputes or legal inquiries, please contact our legal counsel team at{' '}
            <a href="mailto:support@wellpath.com" className="text-emerald-600 font-medium underline">support@wellpath.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
