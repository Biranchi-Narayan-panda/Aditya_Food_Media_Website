import React from 'react';
import { useSite } from '../context/SiteContext';
import { ShieldCheck, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { t } = useSite();

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
          {t.footer.privacyPolicy}
        </h1>
        <p className="text-xs text-slate-500">Aditya Food & Media &bull; Odisha, India</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-slate-700 leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            Aditya Food & Media collects information directly from you when you submit inquiry forms, schedule food business consultations, or contact us via WhatsApp or email. This may include your name, contact phone number, email address, business name, and project specifications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-slate-900">2. Use of Information</h2>
          <p>
            Your information is used strictly to fulfill your customer inquiries, coordinate dairy product supplies, provide food consultation advice, and manage media production collaborations. We do not sell or rent your personal information to third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-slate-900">3. Data Security & Storage</h2>
          <p>
            We implement robust data security measures, leveraging encrypted Google Cloud and Firebase infrastructure to safeguard your communication records against unauthorized access.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-slate-900">4. Contact & Inquiries</h2>
          <p>
            If you have questions regarding this privacy policy or your personal data, contact us at <a href="mailto:personal@adityafoodandmedia.com" className="text-emerald-700 font-semibold underline">personal@adityafoodandmedia.com</a> or telephone <a href="tel:674-2915041" className="font-semibold text-slate-900 underline">674-2915041</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { t } = useSite();

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5 text-amber-600" />
          <span>Terms of Service</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
          {t.footer.termsConditions}
        </h1>
        <p className="text-xs text-slate-500">Aditya Food & Media &bull; Odisha, India</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-slate-700 leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Aditya Food & Media website and associated services, you agree to comply with and be bound by these Terms and Conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-slate-900">2. Dairy Products & Availability</h2>
          <p>
            Dairy products showcased on this website are subject to seasonal availability, localized distribution boundaries, and quality validation. Final pricing, minimum order quantities, and packaging variants are confirmed upon formal inquiry.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-slate-900">3. Media Content & Intellectual Property</h2>
          <p>
            All media broadcasts, film reels, music recordings, photography, logos, and written content appearing on this website are the proprietary intellectual property of Aditya Food & Media or respective copyright holders. Reproduction without express written permission is prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-slate-900">4. Consultation Disclaimer</h2>
          <p>
            Food business consultation is provided as advisory guidance based on professional experience. Final statutory licenses (FSSAI, trade, etc.) and equipment investments remain the responsibility of the client venture.
          </p>
        </section>
      </div>
    </div>
  );
};
