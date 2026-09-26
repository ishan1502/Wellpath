import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="bg-gray-50 min-h-screen text-emerald-900 pb-20">
      <div className="bg-emerald-900 text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-xl relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-800/50 blur-3xl"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-950/50 blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-3xl bg-emerald-800/50 border border-emerald-700/50 text-emerald-100 mb-6 shadow-sm backdrop-blur-sm">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-emerald-100 text-lg font-medium">Last updated: September 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white rounded-[3rem] border border-emerald-50 shadow-sm hover:shadow-xl transition-shadow duration-500 p-8 sm:p-12 md:p-16 space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-emerald-900 flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                <Lock className="w-6 h-6" />
              </div>
              1. Our Commitment to Your Privacy
            </h2>
            <p className="text-emerald-800/80 leading-relaxed font-medium pl-12">
              At WELLPath, your privacy and confidential clinical care are our utmost priority. We adhere to rigorous 
              health information privacy standards, including end-to-end encryption for teletherapy sessions and stringent access controls 
              for health records.
            </p>
          </section>

          <div className="w-full h-px bg-emerald-50"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-emerald-900 flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                <Eye className="w-6 h-6" />
              </div>
              2. Information We Collect
            </h2>
            <ul className="space-y-4 pl-12">
              <li className="text-emerald-800/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                 <span><strong className="font-extrabold text-emerald-900">Account Details:</strong> Name, email address, password hash, and user role (Patient, Professional, or Student).</span>
              </li>
              <li className="text-emerald-800/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                 <span><strong className="font-extrabold text-emerald-900">Clinical & Matching Information:</strong> Intake survey responses, matching preferences, and appointment schedules.</span>
              </li>
              <li className="text-emerald-800/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                 <span><strong className="font-extrabold text-emerald-900">Professional Credentials:</strong> Medical licenses, academic degrees, and verification documents submitted by healthcare providers.</span>
              </li>
              <li className="text-emerald-800/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                 <span><strong className="font-extrabold text-emerald-900">Technical Telemetry:</strong> Device identifiers, browser type, and diagnostic logs to ensure video session reliability.</span>
              </li>
            </ul>
          </section>

          <div className="w-full h-px bg-emerald-50"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-emerald-900 flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                <FileText className="w-6 h-6" />
              </div>
              3. How We Use Your Data
            </h2>
            <p className="text-emerald-800/80 font-extrabold pl-12">We process your personal information strictly to:</p>
            <ul className="space-y-3 pl-12">
              <li className="text-emerald-800/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                 <span>Facilitate telehealth consultations and scheduling between patients and certified therapists.</span>
              </li>
              <li className="text-emerald-800/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                 <span>Verify healthcare provider licensing and maintain a verified professional registry.</span>
              </li>
              <li className="text-emerald-800/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                 <span>Enable student internship matching and mentor communication.</span>
              </li>
              <li className="text-emerald-800/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                 <span>Detect, prevent, and respond to fraud, unauthorized access, or safety threats.</span>
              </li>
            </ul>
          </section>

          <div className="w-full h-px bg-emerald-50"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-emerald-900 flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              4. Your Rights and Data Protection
            </h2>
            <p className="text-emerald-800/80 leading-relaxed font-medium pl-12">
              You have the right to request access to your personal data, request corrections, or request complete deletion of your account 
              and associated history at any time. For privacy inquiries or data requests, contact our Data Protection Officer at{' '}
              <a href="mailto:privacy@wellpath.com" className="text-emerald-600 font-extrabold hover:text-emerald-700 underline underline-offset-4 transition-colors">privacy@wellpath.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
