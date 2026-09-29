import React from 'react';
import { useSite } from '../context/SiteContext';
import { AdityaMainLogo, AdityaFoodsBadge, AdityaMediaBadge } from '../components/BrandLogos';
import {
  Sparkles,
  Target,
  Eye,
  ShieldCheck,
  ArrowRight,
  Heart,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useSite();

  return (
    <div className="pt-24 pb-20 space-y-24">
      {/* Header with Main Brand Logo */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-6">
        <div className="flex justify-center mb-2">
          <div className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-2xl">
            <AdityaMainLogo className="w-full h-full" />
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Our Brand Identity</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Two Worlds. <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-red-400 bg-clip-text text-transparent">One Vision.</span>
        </h1>

        <p className="font-serif text-lg sm:text-2xl text-slate-200 font-light max-w-3xl mx-auto leading-relaxed">
          Where wholesome nutrition meets cinematic imagination.
        </p>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          Aditya Food &amp; Media unites two powerful domains: the meticulous craft of pure dairy nourishment and the transformative artistry of modern media production.
        </p>
      </section>

      {/* Split Story Section with Division Emblems */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Foods Story */}
          <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-[#160c0e] via-[#0c1813] to-[#07100b] p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <AdityaFoodsBadge className="w-28 h-auto" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                  Aditya Foods
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                The Aditya Foods Story
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Our food journey began with a singular conviction: genuine dairy nutrition should never be compromised by chemical additives, shortcuts, or synthetic thickeners.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                By championing sustainable dairy husbandry, prompt temperature controls, and traditional bilona techniques, we craft milk, ghee, butter, and paneer that preserve the wholesome purity nature intended.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-500/20">
              <button
                onClick={() => navigate('/foods')}
                className="text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
              >
                <span>Learn more about Foods</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Media Story */}
          <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#180e10] via-[#12111c] to-[#0a0a14] p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <AdityaMediaBadge className="w-28 h-auto" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                  Aditya Media
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                The Aditya Media Story
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Storytelling is in our DNA. Aditya Media was established to create impactful broadcast television, cinematic documentary coverage, music albums, and video content that resonate deeply with audiences.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                With comprehensive production infrastructure—from 4K multi-camera setups to Dolby acoustic mastering suites—we translate visions into compelling screen experiences.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-500/20">
              <button
                onClick={() => navigate('/media')}
                className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                <span>Learn more about Media</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#080d16] border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Our Mission</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To deliver unadulterated, wholesome food products that enhance health and wellness, while simultaneously producing cinematic media content that informs, enriches, and elevates cultural dialogue.
              </p>
            </div>

            <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Our Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To establish Aditya Food &amp; Media as an esteemed emblem of trust, quality, and creative excellence across Eastern India and beyond—uniting nutrition and media under one respected banner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            What Drives Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Our Guiding Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#0c121e] border border-white/10 rounded-2xl p-6 space-y-3 text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-white">Uncompromising Quality</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Whether producing a jar of golden bilona ghee or filming an episodic broadcast, we never settle for mediocre shortcuts.
            </p>
          </div>

          <div className="bg-[#0c121e] border border-white/10 rounded-2xl p-6 space-y-3 text-center">
            <Heart className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-white">Authentic Care</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deep respect for farmer partnerships, animal well-being, collaborative creative artists, and our valued consumers.
            </p>
          </div>

          <div className="bg-[#0c121e] border border-white/10 rounded-2xl p-6 space-y-3 text-center">
            <Sparkles className="w-8 h-8 text-red-400 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-white">Visionary Creativity</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Embracing technological innovation in agribusiness processing while continually pushing the boundaries of cinematic storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0c121e] to-[#0e1624] p-8 sm:p-12 text-center space-y-5">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Partner With Aditya Food &amp; Media
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Whether inquiring about dairy supplies, seeking food processing consultation, or proposing a media collaboration, we are eager to connect.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
            >
              Get In Touch With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
