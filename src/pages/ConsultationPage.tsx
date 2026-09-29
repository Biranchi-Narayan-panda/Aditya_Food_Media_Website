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
  Sparkles,
} from 'lucide-react';

export const ConsultationPage: React.FC = () => {
  const { getWhatsAppUrl } = useSite();

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
      setErrorMessage('Please fill in all required fields (Name, Email, Phone, and Project Details).');
      return;
    }

    setSubmitting(true);
    try {
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
      setErrorMessage('Failed to send consultation request. Please try again or reach out directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 space-y-20">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Food Advisory & Growth</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Have a Food Business Idea? Let’s Talk.
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From dairy micro-units to commercial food brands, we assist entrepreneurs and agribusinesses with end-to-end processing strategy, packaging engineering, and distribution.
        </p>
      </section>

      {/* Advisory Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0c1410] border border-emerald-500/20 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-white">Food Processing Guidance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plant layout, pasteurization techniques, hygienic workflow design, and cold-chain compliance.
            </p>
          </div>

          <div className="bg-[#0c1410] border border-emerald-500/20 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-white">Packaging Consultation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Shelf-life extension, oxygen barrier selection, tamper-evident seals, and eco-conscious food-grade packaging.
            </p>
          </div>

          <div className="bg-[#0c1410] border border-emerald-500/20 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-white">Food Marketing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Brand positioning, label storytelling, compliance disclosures, and consumer trust-building.
            </p>
          </div>

          <div className="bg-[#0c1410] border border-emerald-500/20 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-white">Distribution Guidance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              B2B distributor networks, retail grocery onboarding, direct-to-consumer delivery loops, and logistics.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Request Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0e1420] border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Request a Consultation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Tell us about your venture. Our food specialists will review your requirements and coordinate an initial advisory session.
            </p>
          </div>

          {successId ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                Consultation Request Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you. Your inquiry reference is <span className="font-mono text-emerald-400 font-semibold">{successId}</span>. Our advisory team will reach out via your preferred channel within 24 hours.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <a
                  href={getWhatsAppUrl(`Hello Aditya Food & Media, I have submitted consultation request ${successId}. I would like to discuss it directly.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={() => setSuccessId(null)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Business / Project Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Sunrise Organic Dairy"
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Consultation Domain
                  </label>
                  <select
                    value={consultationType}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="Food Processing">Food Processing & Pasteurization</option>
                    <option value="Packaging & Shelf Life">Packaging Consultation & Shelf Life</option>
                    <option value="Food Marketing">Food Brand Marketing & Strategy</option>
                    <option value="Distribution Guidance">Distribution & Cold-Chain Logistics</option>
                    <option value="Turnkey Dairy Unit">Turnkey Dairy Unit Setup</option>
                    <option value="General Consultation">General Food Advisory</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Preferred Contact Channel
                  </label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value as any)}
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">Direct Phone Call</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Project Details / Specific Questions *
                </label>
                <textarea
                  required
                  rows={4}
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="Describe your current product, target market, capacity goals, or any specific challenge you are facing..."
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Submitting to Advisory Team...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Consultation Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
