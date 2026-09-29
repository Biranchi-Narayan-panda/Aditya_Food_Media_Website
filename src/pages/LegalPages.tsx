import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last Updated: September 2026</p>
      </div>

      <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-slate-300 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-white">1. Information We Collect</h2>
          <p>
            Aditya Food & Media collects information directly from you when you submit inquiry forms, schedule food business consultations, or contact us via WhatsApp or email. This may include your name, contact phone number, email address, business name, and project specifications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-white">2. Use of Information</h2>
          <p>
            Your information is used strictly to fulfill your customer inquiries, coordinate dairy product supplies, provide food consultation advice, and manage media production collaborations. We do not sell or rent your personal information to third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-white">3. Data Security & Storage</h2>
          <p>
            We implement robust data security measures, leveraging encrypted Google Cloud and Firebase infrastructure to safeguard your communication records against unauthorized access.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-white">4. Contact & Inquiries</h2>
          <p>
            If you have questions regarding this privacy policy or your personal data, contact us at <a href="mailto:personal@adityafoodsandmedia.com" className="text-amber-400 underline">personal@adityafoodsandmedia.com</a> or telephone <span className="text-white">0674-2915041</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>Terms of Service</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Terms & Conditions</h1>
        <p className="text-xs text-slate-400">Effective Date: September 2026</p>
      </div>

      <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-slate-300 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Aditya Food & Media website and associated services, you agree to comply with and be bound by these Terms and Conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-white">2. Dairy Products & Availability</h2>
          <p>
            Dairy products showcased on this website are subject to seasonal availability, localized distribution boundaries, and quality validation. Final pricing, minimum order quantities, and packaging variants are confirmed upon formal inquiry.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-white">3. Media Content & Intellectual Property</h2>
          <p>
            All media broadcasts, film reels, music recordings, photography, logos, and written content appearing on this website are the proprietary intellectual property of Aditya Food & Media or respective copyright holders. Reproduction without express written permission is prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-white">4. Consultation Disclaimer</h2>
          <p>
            Food business consultation is provided as advisory guidance based on professional experience. Final statutory licenses (FSSAI, trade, etc.) and equipment investments remain the responsibility of the client venture.
          </p>
        </section>
      </div>
    </div>
  );
};
