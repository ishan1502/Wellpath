import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-700 mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-600 mt-2 text-lg">Last updated: September 2026</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            1. Our Commitment to Your Privacy
          </h2>
          <p>
            At WELLPath, your privacy and confidential clinical care are our utmost priority. We adhere to rigorous 
            health information privacy standards, including end-to-end encryption for teletherapy sessions and stringent access controls 
            for health records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-600" />
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Details:</strong> Name, email address, password hash, and user role (Patient, Professional, or Student).</li>
            <li><strong>Clinical & Matching Information:</strong> Intake survey responses, matching preferences, and appointment schedules.</li>
            <li><strong>Professional Credentials:</strong> Medical licenses, academic degrees, and verification documents submitted by healthcare providers.</li>
            <li><strong>Technical Telemetry:</strong> Device identifiers, browser type, and diagnostic logs to ensure video session reliability.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            3. How We Use Your Data
          </h2>
          <p>We process your personal information strictly to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Facilitate telehealth consultations and scheduling between patients and certified therapists.</li>
            <li>Verify healthcare provider licensing and maintain a verified professional registry.</li>
            <li>Enable student internship matching and mentor communication.</li>
            <li>Detect, prevent, and respond to fraud, unauthorized access, or safety threats.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            4. Your Rights and Data Protection
          </h2>
          <p>
            You have the right to request access to your personal data, request corrections, or request complete deletion of your account 
            and associated history at any time. For privacy inquiries or data requests, contact our Data Protection Officer at{' '}
            <a href="mailto:privacy@wellpath.com" className="text-emerald-600 font-medium underline">privacy@wellpath.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
