import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { AdityaMainLogo, AdityaFoodsBadge, AdityaMediaBadge } from './BrandLogos';
import {
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  Milk,
  Film,
  PhoneCall,
  Languages,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPath,
    navigate,
    getWhatsAppUrl,
    language,
    setLanguage,
    t,
  } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [foodsDropdownOpen, setFoodsDropdownOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setFoodsDropdownOpen(false);
    setMediaDropdownOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && (currentPath === '/' || currentPath === '')) return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center space-x-3 text-left group focus:outline-none shrink-0"
          >
            <div className="w-11 h-11 transition-transform group-hover:scale-105 duration-200 shrink-0">
              <AdityaMainLogo className="w-full h-full" />
            </div>
            <div>
              <div className="font-serif text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                {t.nav.brandTitle}{' '}
                <span className="text-amber-600 font-sans font-medium text-xs sm:text-sm tracking-normal">
                  {t.nav.brandSubtitle}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider hidden sm:block">
                {t.nav.tagline}
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            <button
              onClick={() => handleNav('/')}
              className={`px-3 py-2 text-sm font-medium transition-colors relative rounded-lg ${
                isActive('/')
                  ? 'text-amber-800 font-bold bg-amber-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.nav.home}
              {isActive('/') && (
                <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-amber-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNav('/about')}
              className={`px-3 py-2 text-sm font-medium transition-colors relative rounded-lg ${
                isActive('/about')
                  ? 'text-amber-800 font-bold bg-amber-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.nav.about}
              {isActive('/about') && (
                <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-amber-500 rounded-full" />
              )}
            </button>

            {/* Aditya Foods Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFoodsDropdownOpen(true)}
              onMouseLeave={() => setFoodsDropdownOpen(false)}
            >
              <button
                onClick={() => handleNav('/foods')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors relative rounded-lg ${
                  isActive('/foods')
                    ? 'text-emerald-800 font-bold bg-emerald-50/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Milk className="w-4 h-4 text-emerald-600" />
                <span>{t.nav.foods}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${
                    foodsDropdownOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
                {isActive('/foods') && (
                  <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-emerald-500 rounded-full" />
                )}
              </button>

              {foodsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-1.5 z-50">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-2.5 animate-soft-in">
                    <div className="flex items-center space-x-2 px-2.5 py-1.5 mb-1.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <AdityaFoodsBadge className="w-14 h-auto" />
                      <div className="text-[11px] text-emerald-800 font-semibold">
                        {t.nav.officialDivision}
                      </div>
                    </div>
                    <button
                      onClick={() => handleNav('/foods')}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">{t.nav.foodsOverview}</div>
                      <div className="text-xs text-slate-500">{t.about.heritageTitle}</div>
                    </button>
                    <button
                      onClick={() => handleNav('/foods/products')}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">{t.nav.dairyProducts}</div>
                      <div className="text-xs text-slate-500">Milk, Ghee, Butter, Paneer, Curd</div>
                    </button>
                    <button
                      onClick={() => handleNav('/foods/consultation')}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">{t.nav.foodConsultation}</div>
                      <div className="text-xs text-slate-500">{t.consultation.badge}</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Aditya Media Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMediaDropdownOpen(true)}
              onMouseLeave={() => setMediaDropdownOpen(false)}
            >
              <button
                onClick={() => handleNav('/media')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors relative rounded-lg ${
                  isActive('/media')
                    ? 'text-amber-800 font-bold bg-amber-50/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Film className="w-4 h-4 text-amber-600" />
                <span>{t.nav.media}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${
                    mediaDropdownOpen ? 'rotate-180 text-amber-600' : ''
                  }`}
                />
                {isActive('/media') && (
                  <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-amber-500 rounded-full" />
                )}
              </button>

              {mediaDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-1.5 z-50">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-2.5 animate-soft-in">
                    <div className="flex items-center space-x-2 px-2.5 py-1.5 mb-1.5 bg-amber-50/50 rounded-xl border border-amber-100">
                      <AdityaMediaBadge className="w-14 h-auto" />
                      <div className="text-[11px] text-amber-800 font-semibold">
                        {t.nav.officialDivision}
                      </div>
                    </div>
                    <button
                      onClick={() => handleNav('/media')}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">{t.nav.mediaOverview}</div>
                      <div className="text-xs text-slate-500">{t.media.heroSubtitle.slice(0, 35)}...</div>
                    </button>
                    <button
                      onClick={() => handleNav('/media/videos')}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">{t.nav.videoGallery}</div>
                      <div className="text-xs text-slate-500">{t.media.latestReelsTitle}</div>
                    </button>
                    <button
                      onClick={() => handleNav('/media/portfolio')}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">{t.nav.mediaPortfolio}</div>
                      <div className="text-xs text-slate-500">{t.media.portfolioHeading}</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/contact')}
              className={`px-3 py-2 text-sm font-medium transition-colors relative rounded-lg ${
                isActive('/contact')
                  ? 'text-amber-800 font-bold bg-amber-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.nav.contact}
              {isActive('/contact') && (
                <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-amber-500 rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center space-x-2.5">
            {/* Language Switcher Segmented Control */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('or')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  language === 'or'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="ଓଡ଼ିଆ ଭାଷା ଚୟନ କରନ୍ତୁ"
              >
                ଓଡ଼ିଆ
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                English
              </button>
            </div>

            {/* WhatsApp Link */}
            <a
              href={getWhatsAppUrl(
                language === 'or'
                  ? 'ନମସ୍କାର ଆଦିତ୍ୟ ଫୁଡ୍ସ ଏବଂ ମିଡିଆ, ମୁଁ ଉତ୍ପାଦ ଏବଂ ସେବା ସମ୍ବନ୍ଧରେ ଜାଣିବାକୁ ଚାହେଁ।'
                  : 'Hello Aditya Food & Media, I would like to get in touch.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.nav.whatsapp}</span>
            </a>

            {/* Quick Contact CTA */}
            <button
              onClick={() => handleNav('/contact')}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.nav.getInTouch}</span>
            </button>
          </div>

          {/* Mobile Right Controls: Language Switcher + Hamburger */}
          <div className="flex items-center space-x-1.5 lg:hidden">
            {/* Compact Mobile Language Switcher */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'or' ? 'en' : 'or')}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-amber-50 text-amber-800 border border-amber-200"
              title={t.nav.switchLanguage}
            >
              <Languages className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'or' ? 'EN' : 'ଓଡ଼ିଆ'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label={t.nav.menu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-soft-in">
          {/* Mobile Language Switcher Bar */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 mb-2">
            <span className="text-xs font-semibold text-slate-600 flex items-center space-x-1.5">
              <Languages className="w-4 h-4 text-amber-600" />
              <span>{t.nav.switchLanguage}:</span>
            </span>
            <div className="flex items-center space-x-1 bg-white p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setLanguage('or')}
                className={`px-3 py-1 rounded-md font-semibold ${
                  language === 'or'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                ଓଡ଼ିଆ
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md font-semibold ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <button
            onClick={() => handleNav('/')}
            className={`w-full text-left py-2 px-3 rounded-xl text-sm font-semibold ${
              isActive('/')
                ? 'bg-amber-50 text-amber-800 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNav('/about')}
            className={`w-full text-left py-2 px-3 rounded-xl text-sm font-semibold ${
              isActive('/about')
                ? 'bg-amber-50 text-amber-800 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.nav.about}
          </button>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="px-3 py-1 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center space-x-1.5">
                <Milk className="w-4 h-4 text-emerald-600" />
                <span>{t.nav.foods}</span>
              </span>
              <AdityaFoodsBadge className="w-12 h-auto" />
            </div>
            <button
              onClick={() => handleNav('/foods')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-600 hover:text-slate-900 pl-6 rounded-lg"
            >
              {t.nav.foodsOverview}
            </button>
            <button
              onClick={() => handleNav('/foods/products')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-600 hover:text-slate-900 pl-6 rounded-lg"
            >
              {t.nav.dairyProducts}
            </button>
            <button
              onClick={() => handleNav('/foods/consultation')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-600 hover:text-slate-900 pl-6 rounded-lg"
            >
              {t.nav.foodConsultation}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="px-3 py-1 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center space-x-1.5">
                <Film className="w-4 h-4 text-amber-600" />
                <span>{t.nav.media}</span>
              </span>
              <AdityaMediaBadge className="w-12 h-auto" />
            </div>
            <button
              onClick={() => handleNav('/media')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-600 hover:text-slate-900 pl-6 rounded-lg"
            >
              {t.nav.mediaOverview}
            </button>
            <button
              onClick={() => handleNav('/media/videos')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-600 hover:text-slate-900 pl-6 rounded-lg"
            >
              {t.nav.videoGallery}
            </button>
            <button
              onClick={() => handleNav('/media/portfolio')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-600 hover:text-slate-900 pl-6 rounded-lg"
            >
              {t.nav.mediaPortfolio}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNav('/contact')}
              className={`w-full text-left py-2 px-3 rounded-xl text-sm font-semibold ${
                isActive('/contact')
                  ? 'bg-amber-50 text-amber-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.nav.contact}
            </button>
          </div>

          <div className="pt-3 grid grid-cols-2 gap-2">
            <a
              href={getWhatsAppUrl(
                language === 'or'
                  ? 'ନମସ୍କାର ଆଦିତ୍ୟ ଫୁଡ୍ସ ଏବଂ ମିଡିଆ'
                  : 'Hello Aditya Food & Media'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{t.nav.whatsapp}</span>
            </a>
            <button
              onClick={() => handleNav('/contact')}
              className="flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.nav.getInTouch}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
