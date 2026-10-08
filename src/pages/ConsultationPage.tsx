import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { submitEnquiry } from '../firebase/services';
import {
  Compass,
  CheckCircle2,
  Package,
  Share2,
  Truck,
  MessageCircle,
  Send,
  AlertCircle,
} from 'lucide-react';

export const ConsultationPage: React.FC = () => {
  const { getWhatsAppUrl, t, language } = useSite();

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consultationType, setConsultationType] = useState('Food Processing');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'email' | 'phone'>('whatsapp');
  const [projectDetails, setProjectDetails] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !phone.trim() || !projectDetails.trim()) {
      setErrorMessage(
        language === 'or'
          ? 'ଦୟାକରି ସମସ୍ତ ଆବଶ୍ୟକ ତଥ୍ୟ (ନାମ, ଇମେଲ୍, ଫୋନ୍ ଏବଂ ବାର୍ତ୍ତା) ପୂରଣ କରନ୍ତୁ।'
          : 'Please fill in all required fields (Name, Email, Phone, and Project Details).'
      );
      return;
    }

    setSubmitting(true);
    try {
      // Save directly to Firebase Firestore
      const res = await submitEnquiry({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        businessName: businessName.trim() || undefined,
        enquiryType: 'consultation',
        relatedItem: consultationType,
        message: projectDetails.trim(),
        preferredContact,
      });

      setSuccessId(res.id);
      setFullName('');
      setBusinessName('');
      setEmail('');
      setPhone('');
      setProjectDetails('');
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage(t.consultation.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.consultation.badge}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {t.consultation.heroTitle}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.consultation.heroSubtitle}
        </p>
      </section>

      {/* Advisory Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">{t.consultation.processingTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.consultation.processingDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">{t.consultation.packagingTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.consultation.packagingDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">{t.consultation.distributionTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.consultation.distributionDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">{t.consultation.complianceTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.consultation.complianceDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Main Request Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="mb-8 space-y-2 text-center sm:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {t.consultation.formTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t.consultation.formSubtitle}
            </p>
          </div>

          {successId && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold">{t.consultation.successMessage}</span>
                <p className="text-xs text-emerald-800">
                  Reference ID: <span className="font-mono font-semibold">{successId}</span>
                </p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.consultation.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Mohapatra"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.consultation.businessName}
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Utkal Dairy Enterprises"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.consultation.email} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.consultation.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 94370 12345"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.consultation.consultationTopic}
                </label>
                <select
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                >
                  <option value="Food Processing">Dairy & Food Processing Guidance</option>
                  <option value="Packaging Solutions">Packaging & Preservation Technology</option>
                  <option value="Cold Chain & Logistics">Cold Chain & Distribution Strategy</option>
                  <option value="Licensing & FSSAI Standards">Licensing & Regulatory Compliance</option>
                  <option value="Commercial Food Brand Scaling">Commercial Brand Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Preferred Contact Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['whatsapp', 'phone', 'email'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPreferredContact(method)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                        preferredContact === method
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.consultation.message} *
              </label>
              <textarea
                rows={4}
                required
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                placeholder="Share your requirements or questions..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? t.consultation.submitting : t.consultation.submitBtn}</span>
              </button>

              <a
                href={getWhatsAppUrl('Hello Aditya Food & Media, I would like to consult with you directly regarding my food business venture.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{t.contact.whatsappAction}</span>
              </a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
