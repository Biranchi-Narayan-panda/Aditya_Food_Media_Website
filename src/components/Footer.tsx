import React from 'react';
import { useSite } from '../context/SiteContext';
import { AdityaMainLogo, AdityaFoodsBadge, AdityaMediaBadge } from './BrandLogos';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Youtube,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  ArrowUp,
  ShieldCheck,
  Milk,
  Film,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, navigate, getWhatsAppUrl } = useSite();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06090e] border-t border-white/10 text-slate-300 pt-16 pb-10 relative overflow-hidden">
      {/* Subtle background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3.5">
              <div className="w-14 h-14 shrink-0">
                <AdityaMainLogo className="w-full h-full" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-white">
                  ADITYA <span className="text-amber-400 font-sans font-light text-sm">FOOD & MEDIA</span>
                </span>
                <p className="text-xs text-amber-200/70 uppercase tracking-widest">
                  Where Quality Meets Creativity
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Harmonizing the pure essence of dairy nutrition and artisanal food consultation with high-impact broadcast media, cinema, and music production.
            </p>

            {/* Official Division Badges */}
            <div className="flex items-center space-x-4 pt-2">
              <div
                onClick={() => navigate('/foods')}
                className="cursor-pointer group flex items-center space-x-2 bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/5 transition-all"
              >
                <AdityaFoodsBadge className="w-16 h-auto group-hover:scale-105 transition-transform" />
                <span className="text-[11px] font-semibold text-emerald-400">Foods</span>
              </div>
              <div
                onClick={() => navigate('/media')}
                className="cursor-pointer group flex items-center space-x-2 bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/5 transition-all"
              >
                <AdityaMediaBadge className="w-16 h-auto group-hover:scale-105 transition-transform" />
                <span className="text-[11px] font-semibold text-amber-400">Media</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-red-600/20 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors border border-white/5 hover:border-red-500/30"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-pink-600/20 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-colors border border-white/5 hover:border-pink-500/30"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-colors border border-white/5 hover:border-blue-500/30"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-sky-600/20 text-slate-400 hover:text-sky-400 flex items-center justify-center transition-colors border border-white/5 hover:border-sky-500/30"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.xTwitter && (
                <a
                  href={settings.xTwitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-slate-200/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/5 hover:border-white/30"
                  aria-label="X Twitter Account"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links: Foods */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Milk className="w-4 h-4" />
              <span>Aditya Foods</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => navigate('/foods')} className="hover:text-emerald-300 transition-colors">
                  Foods Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/foods/products')} className="hover:text-emerald-300 transition-colors">
                  Fresh Farm Milk
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/foods/products')} className="hover:text-emerald-300 transition-colors">
                  Pure Golden Ghee
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/foods/products')} className="hover:text-emerald-300 transition-colors">
                  Paneer &amp; Table Butter
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/foods/consultation')} className="hover:text-emerald-300 transition-colors">
                  Food Business Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Media */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Film className="w-4 h-4" />
              <span>Aditya Media</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => navigate('/media')} className="hover:text-amber-300 transition-colors">
                  Media Division Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/media/videos')} className="hover:text-amber-300 transition-colors">
                  YouTube Video Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/media/portfolio')} className="hover:text-amber-300 transition-colors">
                  Broadcast &amp; Film Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/media')} className="hover:text-amber-300 transition-colors">
                  Music &amp; Sound Production
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-amber-300 transition-colors">
                  Media Collaborations
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a href={`tel:${settings.phone || '0674-2915041'}`} className="hover:text-white transition-colors">
                  {settings.phone || '0674-2915041'}
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email || 'personal@adityafoodsandmedia.com'}`} className="hover:text-white transition-colors break-all">
                  {settings.email || 'personal@adityafoodsandmedia.com'}
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  {settings.address || 'Bhubaneswar, Odisha, India'}
                </span>
              </li>
              <li className="pt-1">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div>
            &copy; {currentYear} Aditya Food &amp; Media. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => navigate('/privacy-policy')} className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/terms')} className="hover:text-slate-200 transition-colors">
              Terms &amp; Conditions
            </button>
            <button onClick={() => navigate('/admin')} className="hover:text-amber-400 transition-colors flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
