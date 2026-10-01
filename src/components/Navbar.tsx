import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';
import { AdityaMainLogo, AdityaFoodsBadge, AdityaMediaBadge } from './BrandLogos';
import {
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  ShieldCheck,
  Milk,
  Film,
  PhoneCall,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, getWhatsAppUrl, openAdminPortal, isAdminPinUnlocked } = useSite();
  const { isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [foodsDropdownOpen, setFoodsDropdownOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090d16]/95 backdrop-blur-md border-b border-amber-500/10 shadow-lg shadow-black/40 py-2.5'
          : 'bg-gradient-to-b from-[#070a10]/95 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Official Brand Emblem */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 transition-transform group-hover:scale-105 duration-300 shrink-0">
              <AdityaMainLogo className="w-full h-full" />
            </div>
            <div>
              <div className="font-serif text-base sm:text-lg font-bold tracking-wider text-white group-hover:text-amber-300 transition-colors">
                ADITYA <span className="text-amber-400 font-sans font-light text-xs sm:text-sm tracking-normal">FOOD & MEDIA</span>
              </div>
              <p className="text-[10px] text-amber-200/60 uppercase tracking-widest hidden sm:block">
                Quality & Creativity
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => handleNav('/')}
              className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                isActive('/') ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNav('/about')}
              className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                isActive('/about') ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              About Us
              {isActive('/about') && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" />
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
                className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-medium transition-colors relative ${
                  isActive('/foods') ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Milk className="w-3.5 h-3.5 text-emerald-400" />
                <span>Aditya Foods</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${foodsDropdownOpen ? 'rotate-180' : ''}`} />
                {isActive('/foods') && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full" />
                )}
              </button>

              {foodsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-[#0f1422] border border-emerald-500/20 rounded-xl shadow-2xl p-3 backdrop-blur-xl">
                    <div className="flex items-center space-x-2 px-2 pb-2 mb-2 border-b border-white/5">
                      <AdityaFoodsBadge className="w-16 h-auto" />
                      <div className="text-[11px] text-emerald-400 font-semibold">Official Division</div>
                    </div>
                    <button
                      onClick={() => handleNav('/foods')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-emerald-950/40 hover:text-emerald-300 transition-colors"
                    >
                      <div className="font-medium">Foods Overview</div>
                      <div className="text-xs text-slate-400">Our dairy philosophy & values</div>
                    </button>
                    <button
                      onClick={() => handleNav('/foods/products')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-emerald-950/40 hover:text-emerald-300 transition-colors"
                    >
                      <div className="font-medium">Dairy Products</div>
                      <div className="text-xs text-slate-400">Milk, Ghee, Butter, Paneer, Curd</div>
                    </button>
                    <button
                      onClick={() => handleNav('/foods/consultation')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-emerald-950/40 hover:text-emerald-300 transition-colors"
                    >
                      <div className="font-medium">Food Consultation</div>
                      <div className="text-xs text-slate-400">Processing, packaging & distribution</div>
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
                className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-medium transition-colors relative ${
                  isActive('/media') ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>Aditya Media</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mediaDropdownOpen ? 'rotate-180' : ''}`} />
                {isActive('/media') && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-amber-400 to-indigo-400 rounded-full" />
                )}
              </button>

              {mediaDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-[#0f1422] border border-amber-500/20 rounded-xl shadow-2xl p-3 backdrop-blur-xl">
                    <div className="flex items-center space-x-2 px-2 pb-2 mb-2 border-b border-white/5">
                      <AdityaMediaBadge className="w-16 h-auto" />
                      <div className="text-[11px] text-amber-400 font-semibold">Official Division</div>
                    </div>
                    <button
                      onClick={() => handleNav('/media')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-amber-950/40 hover:text-amber-300 transition-colors"
                    >
                      <div className="font-medium">Media Overview</div>
                      <div className="text-xs text-slate-400">Cinematic storytelling & services</div>
                    </button>
                    <button
                      onClick={() => handleNav('/media/videos')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-amber-950/40 hover:text-amber-300 transition-colors"
                    >
                      <div className="font-medium">Video Gallery</div>
                      <div className="text-xs text-slate-400">Interactive YouTube showcase</div>
                    </button>
                    <button
                      onClick={() => handleNav('/media/portfolio')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-amber-950/40 hover:text-amber-300 transition-colors"
                    >
                      <div className="font-medium">Media Portfolio</div>
                      <div className="text-xs text-slate-400">Broadcast, films & music reels</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/contact')}
              className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                isActive('/contact') ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Contact Us
              {isActive('/contact') && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* WhatsApp Direct Action */}
            <a
              href={getWhatsAppUrl('Hello Aditya Food & Media, I would like to get in touch.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all shadow-sm group"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
              <span>WhatsApp</span>
            </a>

            {/* Quick Contact CTA */}
            <button
              onClick={() => handleNav('/contact')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-xs hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </button>

            {/* Admin Portal Link */}
            <button
              onClick={openAdminPortal}
              title={isAdmin && isAdminPinUnlocked ? 'Aditya Management Portal (Active)' : 'Admin Portal (PIN Protected)'}
              className={`p-2 rounded-full border transition-all ${
                isAdmin && isAdminPinUnlocked
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300 ring-2 ring-amber-400/30'
                  : 'border-white/10 text-slate-400 hover:text-white hover:border-white/30'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={openAdminPortal}
              className="p-2 text-slate-400 hover:text-amber-400"
              title="Admin Portal (PIN Protected)"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090d16]/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl">
          <button
            onClick={() => handleNav('/')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm ${
              isActive('/') ? 'bg-amber-500/10 text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('/about')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm ${
              isActive('/about') ? 'bg-amber-500/10 text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            About Us
          </button>

          <div className="pt-2 border-t border-white/5 space-y-1">
            <div className="px-3 py-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Milk className="w-3.5 h-3.5" />
                <span>Aditya Foods</span>
              </span>
              <AdityaFoodsBadge className="w-14 h-auto" />
            </div>
            <button
              onClick={() => handleNav('/foods')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-300 hover:text-white pl-6"
            >
              Foods Overview
            </button>
            <button
              onClick={() => handleNav('/foods/products')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-300 hover:text-white pl-6"
            >
              Dairy Products (Milk, Ghee, Paneer)
            </button>
            <button
              onClick={() => handleNav('/foods/consultation')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-300 hover:text-white pl-6"
            >
              Food Consultation
            </button>
          </div>

          <div className="pt-2 border-t border-white/5 space-y-1">
            <div className="px-3 py-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Film className="w-3.5 h-3.5" />
                <span>Aditya Media</span>
              </span>
              <AdityaMediaBadge className="w-14 h-auto" />
            </div>
            <button
              onClick={() => handleNav('/media')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-300 hover:text-white pl-6"
            >
              Media Overview
            </button>
            <button
              onClick={() => handleNav('/media/videos')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-300 hover:text-white pl-6"
            >
              Interactive Video Gallery
            </button>
            <button
              onClick={() => handleNav('/media/portfolio')}
              className="w-full text-left py-1.5 px-3 text-sm text-slate-300 hover:text-white pl-6"
            >
              Media Portfolio & Projects
            </button>
          </div>

          <div className="pt-2 border-t border-white/5">
            <button
              onClick={() => handleNav('/contact')}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm ${
                isActive('/contact') ? 'bg-amber-500/10 text-amber-400 font-semibold' : 'text-slate-300'
              }`}
            >
              Contact Us
            </button>
          </div>

          <div className="pt-3 grid grid-cols-2 gap-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => handleNav('/contact')}
              className="flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-semibold text-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
