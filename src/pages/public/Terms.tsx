import React from 'react';
import { FileCheck, AlertTriangle, Scale, Stethoscope, HelpCircle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen text-emerald-900 pb-20">
      <div className="bg-emerald-900 text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-xl relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-800/50 blur-3xl"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-950/50 blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-3xl bg-emerald-800/50 border border-emerald-700/50 text-emerald-100 mb-6 shadow-sm backdrop-blur-sm">
            <Scale className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-emerald-100 text-lg font-medium">Effective Date: September 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white rounded-[3rem] border border-emerald-50 shadow-sm hover:shadow-xl transition-shadow duration-500 p-8 sm:p-12 md:p-16 space-y-12">
          {/* Emergency Alert Banner */}
          <div className="bg-red-50 border border-red-100 rounded-3xl p-8 flex flex-col sm:flex-row items-start gap-5 text-red-900">
            <div className="bg-red-100 p-3 rounded-2xl flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <strong className="font-extrabold block text-lg mb-2">Emergency Medical Notice</strong>
              <span className="text-red-800/80 font-medium leading-relaxed block">
                WELLPath is not an emergency response service. If you or someone you know is experiencing acute crisis, thoughts of self-harm, or a medical emergency, please call <strong className="text-red-900 font-extrabold">911</strong> (US), <strong className="text-red-900 font-extrabold">112</strong> / <strong className="text-red-900 font-extrabold">14416 (Tele-MANAS)</strong> (India), or proceed to the nearest emergency room immediately.
              </span>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-emerald-900 flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                <FileCheck className="w-6 h-6" />
              </div>
              1. Acceptance of Terms
            </h2>
            <p className="text-emerald-800/80 leading-relaxed font-medium pl-12">
              By creating an account, browsing the WELLPath directory, or booking clinical sessions, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you must discontinue platform use immediately.
            </p>
          </section>

          <div className="w-full h-px bg-emerald-50"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-emerald-900 flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                <Stethoscope className="w-6 h-6" />
              </div>
              2. Healthcare Provider Relationship
            </h2>
            <p className="text-emerald-800/80 leading-relaxed font-medium pl-12">
              WELLPath provides a technology platform connecting independent licensed therapists, counselors, and psychiatrists with patients and students. Therapists on WELLPath are independent contractors and are not employees of WELLPath. Clinical discretion and therapeutic decisions remain solely the responsibility of the treating healthcare professional.
            </p>
          </section>

          <div className="w-full h-px bg-emerald-50"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-emerald-900 flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                <Scale className="w-6 h-6" />
              </div>
              3. Cancellations & Rescheduling
            </h2>
            <p className="text-emerald-800/80 leading-relaxed font-medium pl-12">
              Appointments can be rescheduled or cancelled without fee up to 24 hours prior to the scheduled consultation time. Cancellations made within 24 hours may be subject to a late-cancellation fee in accordance with the individual provider's policy.
            </p>
          </section>

          <div className="w-full h-px bg-emerald-50"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-emerald-900 flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              4. Contact and Governance
            </h2>
            <p className="text-emerald-800/80 leading-relaxed font-medium pl-12">
              These terms shall be governed by applicable healthcare laws. For billing disputes or legal inquiries, please contact our legal counsel team at{' '}
              <a href="mailto:support@wellpath.com" className="text-emerald-600 font-extrabold hover:text-emerald-700 underline underline-offset-4 transition-colors">support@wellpath.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
