import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="bg-background min-h-screen text-primary-dark pb-20">
      <div className="bg-primary-dark text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-md relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary-dark/50 blur-3xl"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-dark/50 blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-xl bg-primary-dark/50 border border-primary-hover/50 text-primary-muted mb-6 shadow-sm backdrop-blur-sm">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-primary-muted text-lg font-medium">Last updated: September 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-surface rounded-[3rem] border border-primary-muted shadow-sm hover:shadow-md transition-shadow duration-500 p-8 sm:p-12 md:p-16 space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-primary-dark flex items-center gap-3">
              <div className="bg-primary-muted p-2 rounded-xl text-primary">
                <Lock className="w-6 h-6" />
              </div>
              1. Our Commitment to Your Privacy
            </h2>
            <p className="text-primary-dark/80 leading-relaxed font-medium pl-12">
              At WellPath, your privacy and confidential clinical care are our utmost priority. We adhere to rigorous 
              health information privacy standards, including end-to-end encryption for teletherapy sessions and stringent access controls 
              for health records.
            </p>
          </section>

          <div className="w-full h-px bg-primary-muted"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-primary-dark flex items-center gap-3">
              <div className="bg-primary-muted p-2 rounded-xl text-primary">
                <Eye className="w-6 h-6" />
              </div>
              2. Information We Collect
            </h2>
            <ul className="space-y-4 pl-12">
              <li className="text-primary-dark/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                 <span><strong className="font-extrabold text-primary-dark">Account Details:</strong> Name, email address, password hash, and user role (Patient, Professional, or Student).</span>
              </li>
              <li className="text-primary-dark/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                 <span><strong className="font-extrabold text-primary-dark">Clinical & Matching Information:</strong> Intake survey responses, matching preferences, and appointment schedules.</span>
              </li>
              <li className="text-primary-dark/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                 <span><strong className="font-extrabold text-primary-dark">Professional Credentials:</strong> Medical licenses, academic degrees, and verification documents submitted by healthcare providers.</span>
              </li>
              <li className="text-primary-dark/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                 <span><strong className="font-extrabold text-primary-dark">Technical Telemetry:</strong> Device identifiers, browser type, and diagnostic logs to ensure video session reliability.</span>
              </li>
            </ul>
          </section>

          <div className="w-full h-px bg-primary-muted"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-primary-dark flex items-center gap-3">
              <div className="bg-primary-muted p-2 rounded-xl text-primary">
                <FileText className="w-6 h-6" />
              </div>
              3. How We Use Your Data
            </h2>
            <p className="text-primary-dark/80 font-extrabold pl-12">We process your personal information strictly to:</p>
            <ul className="space-y-3 pl-12">
              <li className="text-primary-dark/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                 <span>Facilitate telehealth consultations and scheduling between patients and certified therapists.</span>
              </li>
              <li className="text-primary-dark/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                 <span>Verify healthcare provider licensing and maintain a verified professional registry.</span>
              </li>
              <li className="text-primary-dark/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                 <span>Enable student internship matching and mentor communication.</span>
              </li>
              <li className="text-primary-dark/80 font-medium flex items-start leading-relaxed">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                 <span>Detect, prevent, and respond to fraud, unauthorized access, or safety threats.</span>
              </li>
            </ul>
          </section>

          <div className="w-full h-px bg-primary-muted"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-primary-dark flex items-center gap-3">
              <div className="bg-primary-muted p-2 rounded-xl text-primary">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              4. Your Rights and Data Protection
            </h2>
            <p className="text-primary-dark/80 leading-relaxed font-medium pl-12">
              You have the right to request access to your personal data, request corrections, or request complete deletion of your account 
              and associated history at any time. For privacy inquiries or data requests, contact our Data Protection Officer at{' '}
              <a href="mailto:privacy@wellpath.com" className="text-primary font-extrabold hover:text-primary-hover underline underline-offset-4 transition-colors">privacy@wellpath.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
