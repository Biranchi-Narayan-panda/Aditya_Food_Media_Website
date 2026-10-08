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
  Milk,
  Film,
  Languages,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, navigate, getWhatsAppUrl, t, language, setLanguage } = useSite();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100/90 border-t border-slate-200 text-slate-600 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-13 h-13 shrink-0">
                <AdityaMainLogo className="w-full h-full" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-slate-900">
                  {t.nav.brandTitle}{' '}
                  <span className="text-amber-600 font-sans font-medium text-sm">
                    {t.nav.brandSubtitle}
                  </span>
                </span>
                <p className="text-xs text-amber-800/80 font-medium uppercase tracking-wider">
                  {t.nav.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>

            {/* Division Switchers */}
            <div className="flex items-center space-x-3 pt-1">
              <button
                type="button"
                onClick={() => navigate('/foods')}
                className="cursor-pointer group flex items-center space-x-2 bg-white hover:bg-emerald-50/60 p-2 rounded-xl border border-slate-200/90 transition-all shadow-xs"
              >
                <AdityaFoodsBadge className="w-14 h-auto group-hover:scale-105 transition-transform" />
                <span className="text-xs font-semibold text-emerald-800">{t.nav.foods}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/media')}
                className="cursor-pointer group flex items-center space-x-2 bg-white hover:bg-amber-50/60 p-2 rounded-xl border border-slate-200/90 transition-all shadow-xs"
              >
                <AdityaMediaBadge className="w-14 h-auto group-hover:scale-105 transition-transform" />
                <span className="text-xs font-semibold text-amber-800">{t.nav.media}</span>
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-2.5 pt-2">
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 flex items-center justify-center transition-colors border border-slate-200 shadow-xs"
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
                  className="w-9 h-9 rounded-xl bg-white hover:bg-pink-50 text-slate-600 hover:text-pink-600 flex items-center justify-center transition-colors border border-slate-200 shadow-xs"
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
                  className="w-9 h-9 rounded-xl bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-colors border border-slate-200 shadow-xs"
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
                  className="w-9 h-9 rounded-xl bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-600 flex items-center justify-center transition-colors border border-slate-200 shadow-xs"
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
                  className="w-9 h-9 rounded-xl bg-white hover:bg-slate-200/50 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors border border-slate-200 shadow-xs"
                  aria-label="X Twitter Account"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links: Foods */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center space-x-1.5">
              <Milk className="w-4 h-4 text-emerald-600" />
              <span>{t.footer.foodsDivision}</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/foods')}
                  className="hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  {t.nav.foodsOverview}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/foods/products')}
                  className="hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  {t.nav.dairyProducts}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/foods/consultation')}
                  className="hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  {t.nav.foodConsultation}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/about')}
                  className="hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  {t.about.heritageTitle}
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Media */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center space-x-1.5">
              <Film className="w-4 h-4 text-amber-600" />
              <span>{t.footer.mediaDivision}</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/media')}
                  className="hover:text-amber-800 transition-colors cursor-pointer"
                >
                  {t.nav.mediaOverview}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/media/videos')}
                  className="hover:text-amber-800 transition-colors cursor-pointer"
                >
                  {t.nav.videoGallery}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/media/portfolio')}
                  className="hover:text-amber-800 transition-colors cursor-pointer"
                >
                  {t.nav.mediaPortfolio}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="hover:text-amber-800 transition-colors cursor-pointer"
                >
                  {t.media.collaborateCtaTitle}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t.footer.contactHeading}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <a href={`tel:${settings.phone || '0674-2915041'}`} className="hover:text-slate-900 transition-colors">
                  {settings.phone || '0674-2915041'}
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email || 'personal@adityafoodsandmedia.com'}`} className="hover:text-slate-900 transition-colors break-all">
                  {settings.email || 'personal@adityafoodsandmedia.com'}
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-slate-600">
                  {settings.address || 'Bhubaneswar, Odisha, India'}
                </span>
              </li>
              <li className="pt-1">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.contact.whatsappAction}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with Language Switcher, Legal, and Back to Top */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-3">
            <span>&copy; {currentYear} Aditya Food &amp; Media. {t.footer.rightsReserved}</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            {/* Inline Footer Language Switcher */}
            <div className="inline-flex items-center space-x-1 bg-white px-2 py-1 rounded-lg border border-slate-200">
              <Languages className="w-3 h-3 text-slate-400" />
              <button
                type="button"
                onClick={() => setLanguage('or')}
                className={`font-semibold ${language === 'or' ? 'text-amber-700 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
              >
                ଓଡ଼ିଆ
              </button>
              <span className="text-slate-300">/</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`font-semibold ${language === 'en' ? 'text-amber-700 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
              >
                English
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <button
              type="button"
              onClick={() => navigate('/privacy-policy')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              {t.footer.privacyPolicy}
            </button>
            <button
              type="button"
              onClick={() => navigate('/terms')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              {t.footer.termsConditions}
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-xs"
              title={t.footer.backToTop}
              aria-label={t.footer.backToTop}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
