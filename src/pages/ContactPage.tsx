import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { submitEnquiry } from '../firebase/services';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Youtube,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Clock,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, getWhatsAppUrl } = useSite();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState<'product' | 'consultation' | 'media' | 'general'>('product');
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'email' | 'phone'>('whatsapp');

  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        enquiryType,
        message: message.trim(),
        preferredContact,
      });

      setSuccessId(res.id);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Failed to deliver message. Please contact us via phone or WhatsApp directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Direct Communication</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Contact Aditya Food & Media
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Whether you are inquiring about daily dairy supplies, exploring food business consultation, or initiating a media collaboration, our team is at your service.
        </p>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0e1422] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl font-bold text-white">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-slate-400 font-semibold">
                      Telephone
                    </span>
                    <a
                      href={`tel:${settings.phone || '0674-2915041'}`}
                      className="text-white font-medium hover:text-amber-300 transition-colors"
                    >
                      {settings.phone || '0674-2915041'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-slate-400 font-semibold">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${settings.email || 'personal@adityafoodsandmedia.com'}`}
                      className="text-white font-medium hover:text-emerald-300 transition-colors break-all"
                    >
                      {settings.email || 'personal@adityafoodsandmedia.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-slate-400 font-semibold">
                      Headquarters
                    </span>
                    <span className="text-white font-medium leading-relaxed">
                      {settings.address || 'Aditya Tower, Chandrasekharpur, Bhubaneswar, Odisha 751024'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-slate-400 font-semibold">
                      Business Hours
                    </span>
                    <span className="text-white font-medium">
                      Mon – Sat: 9:00 AM – 7:00 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl('Hello Aditya Food & Media, I would like to enquire about your services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <span className="block text-xs text-slate-400 uppercase font-semibold mb-3">
                  Connect on Social Media
                </span>
                <div className="flex items-center space-x-3">
                  {settings.youtube && (
                    <a
                      href={settings.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-600/20 text-slate-300 hover:text-red-400 flex items-center justify-center transition-colors border border-white/5"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                  {settings.instagram && (
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-pink-600/20 text-slate-300 hover:text-pink-400 flex items-center justify-center transition-colors border border-white/5"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {settings.facebook && (
                    <a
                      href={settings.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 flex items-center justify-center transition-colors border border-white/5"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {settings.linkedin && (
                    <a
                      href={settings.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-sky-600/20 text-slate-300 hover:text-sky-400 flex items-center justify-center transition-colors border border-white/5"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {settings.xTwitter && (
                    <a
                      href={settings.xTwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/5"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-3">
            <div className="bg-[#0e1422] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Fill in the form below and your message will be dispatched directly to our executive team.
              </p>

              {successId ? (
                <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Message Successfully Sent!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your enquiry tracking ID is <span className="font-mono text-emerald-400 font-semibold">{successId}</span>. We will respond promptly.
                  </p>
                  <button
                    onClick={() => setSuccessId(null)}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 00000 00000"
                        className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Enquiry Nature
                      </label>
                      <select
                        value={enquiryType}
                        onChange={(e) => setEnquiryType(e.target.value as any)}
                        className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="product">Aditya Foods Dairy Products</option>
                        <option value="consultation">Food Business Consultation</option>
                        <option value="media">Aditya Media & Cinema Production</option>
                        <option value="general">General Corporate Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Preferred Reply Channel
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          checked={preferredContact === 'whatsapp'}
                          onChange={() => setPreferredContact('whatsapp')}
                          className="accent-amber-400"
                        />
                        <span>WhatsApp</span>
                      </label>
                      <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          checked={preferredContact === 'phone'}
                          onChange={() => setPreferredContact('phone')}
                          className="accent-amber-400"
                        />
                        <span>Phone Call</span>
                      </label>
                      <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          checked={preferredContact === 'email'}
                          onChange={() => setPreferredContact('email')}
                          className="accent-amber-400"
                        />
                        <span>Email</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify your product quantities, project requirements, or any questions..."
                      className="w-full bg-[#080b12] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
