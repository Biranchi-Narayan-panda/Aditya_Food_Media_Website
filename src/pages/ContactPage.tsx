import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { processEnquirySubmission } from '../services/emailService';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, getWhatsAppUrl, t, language } = useSite();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState<'product' | 'consultation' | 'media' | 'general'>('product');
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'email' | 'phone'>('whatsapp');
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{
    referenceNumber: string;
    status: 'fully_completed' | 'email_sent_db_failed';
    warningMessage?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return; // Prevent duplicate clicks
    setErrorMessage(null);
    setSuccessInfo(null);

    setSubmitting(true);
    try {
      const result = await processEnquirySubmission({
        name,
        email,
        phone,
        enquiryType,
        message,
        preferredContact,
        honeypot,
      });

      if (result.success) {
        if (result.status === 'fully_completed') {
          setSuccessInfo({
            referenceNumber: result.referenceNumber,
            status: 'fully_completed',
          });
        } else {
          setSuccessInfo({
            referenceNumber: result.referenceNumber,
            status: 'email_sent_db_failed',
            warningMessage: language === 'or' ? result.warningMessageOr : result.warningMessageEn,
          });
        }
        // Clear form fields
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setHoneypot('');
      } else {
        setErrorMessage(language === 'or' ? result.messageOr : result.messageEn);
      }
    } catch {
      setErrorMessage(t.contact.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-14">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Phone className="w-3.5 h-3.5 text-amber-600" />
          <span>{t.contact.badge}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {t.contact.heroTitle}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.contact.heroSubtitle}
        </p>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Details Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {t.contact.touchTitle}
              </h3>

              <div className="space-y-3.5 text-sm text-slate-700">
                <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-slate-500 font-bold">
                      {t.contact.phoneLabel}
                    </span>
                    <a
                      href={`tel:${settings.phone || '674-2915041'}`}
                      className="text-slate-900 hover:text-amber-700 font-semibold"
                    >
                      {settings.phone || '674-2915041'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-slate-500 font-bold">
                      {t.contact.emailLabel}
                    </span>
                    <a
                      href={`mailto:${settings.email || 'personal@adityafoodandmedia.com'}`}
                      className="text-slate-900 hover:text-emerald-700 font-semibold break-all"
                    >
                      {settings.email || 'personal@adityafoodandmedia.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-slate-500 font-bold">
                      {t.contact.officeLabel}
                    </span>
                    <span className="text-slate-800 leading-relaxed text-xs">
                      {settings.address || 'Aditya Tower, Chandrasekharpur, Bhubaneswar, Odisha 751024'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-slate-500 font-bold">
                      {t.contact.hoursLabel}
                    </span>
                    <span className="block text-slate-800 text-xs leading-relaxed whitespace-pre-line mt-0.5">
                      {t.contact.hoursValue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl(
                    language === 'or'
                      ? 'ନମସ୍କାର ଆଦିତ୍ୟ ଫୁଡ୍ସ ଏବଂ ମିଡିଆ, ମୁଁ ସମ୍ପର୍କ କରିବାକୁ ଚାହେଁ।'
                      : 'Hello Aditya Food & Media, I would like to get in touch.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.contact.whatsappAction}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact & Enquiry Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
              <div className="mb-6 space-y-1">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs text-slate-600">
                  {t.contact.formSubtitle}
                </p>
              </div>

              {successInfo && successInfo.status === 'fully_completed' && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold">{t.contact.successMessage}</span>
                    <p className="text-xs text-emerald-800">
                      Reference ID: <span className="font-mono font-semibold">{successInfo.referenceNumber}</span>
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      {language === 'or'
                        ? 'ଆପଣଙ୍କ ଅନୁରୋଧ ଇମେଲ୍ ମାଧ୍ୟମରେ ସଫଳତାର ସହିତ ପଠାଗଲା।'
                        : 'A notification email has been dispatched to adityafoodsandmedia.it@gmail.com.'}
                    </p>
                  </div>
                </div>
              )}

              {successInfo && successInfo.status === 'email_sent_db_failed' && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold">
                      {language === 'or'
                        ? `ଇମେଲ୍ ସଫଳତାର ସହିତ ପଠାଯାଇଛି (ସନ୍ଦର୍ଭ: ${successInfo.referenceNumber})`
                        : `Enquiry Email Delivered (Ref: ${successInfo.referenceNumber})`}
                    </span>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      {successInfo.warningMessage}
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

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for anti-spam bot defense */}
                <input
                  type="text"
                  name="website_url_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden pointer-events-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.contact.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priyabrata Nayak"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.contact.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.contact.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 94370 00000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.contact.subjectType}
                    </label>
                    <select
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    >
                      <option value="product">{t.contact.typeProduct}</option>
                      <option value="consultation">{t.contact.typeConsultation}</option>
                      <option value="media">{t.contact.typeMedia}</option>
                      <option value="general">{t.contact.typeGeneral}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Response Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['whatsapp', 'phone', 'email'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPreferredContact(method)}
                        className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                          preferredContact === method
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.contact.message} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? t.contact.submitting : t.contact.submitBtn}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
