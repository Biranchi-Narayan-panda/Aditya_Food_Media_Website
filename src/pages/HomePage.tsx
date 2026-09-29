import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ProductCard } from '../components/ProductCard';
import { VideoCard } from '../components/VideoCard';
import { AdityaMainLogo, AdityaFoodsBadge, AdityaMediaBadge } from '../components/BrandLogos';
import {
  Sparkles,
  Milk,
  Film,
  ArrowRight,
  ShieldCheck,
  Award,
  HeartHandshake,
  CheckCircle2,
  Tv,
  Music,
  Video,
  Users,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, videos, navigate, getWhatsAppUrl } = useSite();
  const [heroMode, setHeroMode] = useState<'both' | 'foods' | 'media'>('both');

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  const featuredVideos = videos.filter((v) => v.featured).slice(0, 3);
  const displayVideos = featuredVideos.length > 0 ? featuredVideos : videos.slice(0, 3);

  return (
    <div className="space-y-24">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Background Visual Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-[#070a10] to-[#0b0f17]" />
          {/* Subtle dual ambient light */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-700/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Center Brand Statement with Official Emblem */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="flex justify-center mb-2">
              <div className="relative group cursor-pointer" onClick={() => navigate('/about')}>
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl scale-125 animate-pulse" />
                <div className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                  <AdityaMainLogo className="w-full h-full" />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-medium uppercase tracking-widest text-amber-200">
                Two Passions, One Vision
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Aditya <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">Food &amp; Media</span>
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-amber-100/90 font-light tracking-wide">
              Freshness in Every Bite. Creativity in Every Frame.
            </p>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Discover our world of quality dairy products, food consultation, media production and entertainment. Committed to uncompromising quality and visionary creativity.
            </p>

            {/* Quick Filter Pill for Hero Focus */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setHeroMode('both')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  heroMode === 'both' ? 'bg-amber-400 text-slate-950 font-semibold' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Unified Overview
              </button>
              <button
                onClick={() => setHeroMode('foods')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  heroMode === 'foods' ? 'bg-red-600 text-white font-semibold' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Aditya Foods Focus
              </button>
              <button
                onClick={() => setHeroMode('media')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  heroMode === 'media' ? 'bg-red-600 text-white font-semibold' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Aditya Media Focus
              </button>
            </div>
          </div>

          {/* DUAL ESSENCE SPLIT CARDS WITH OFFICIAL DIVISION BADGES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
            {/* ADITYA FOODS PANEL */}
            {(heroMode === 'both' || heroMode === 'foods') && (
              <div className="group relative rounded-3xl overflow-hidden border border-red-500/20 bg-gradient-to-br from-[#160c0e] via-[#0f1712] to-[#07100b] p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:border-red-500/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AdityaFoodsBadge className="w-24 sm:w-28 h-auto" />
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                        Dairy Division
                      </span>
                    </div>
                    <span className="text-xs text-amber-200/60 font-mono hidden sm:inline">Odisha &bull; India</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Pure Quality. Authentic Taste.
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    Farm-fresh milk, bilona churned pure ghee, creamy table butter, and fresh malai paneer crafted with uncompromising hygiene, temperature fidelity, and ethical farm partnerships.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Farm-Direct Milk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Granular Golden Ghee</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Melt-in-Mouth Paneer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Agribusiness Consultation</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigate('/foods/products')}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <span>Explore Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigate('/foods/consultation')}
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium transition-colors"
                    >
                      <span>Food Consultation</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ADITYA MEDIA PANEL */}
            {(heroMode === 'both' || heroMode === 'media') && (
              <div className="group relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-br from-[#1a0e10] via-[#12111c] to-[#0a0a14] p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:border-amber-500/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AdityaMediaBadge className="w-24 sm:w-28 h-auto" />
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                        Media Division
                      </span>
                    </div>
                    <span className="text-xs text-amber-200/60 font-mono hidden sm:inline">Cinema &amp; Broadcast</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    Stories That Inspire. Media That Connects.
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    Transforming compelling narratives into broadcast television, feature cinematography, original music recordings, high-definition documentaries, and full-stack creative campaigns.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Broadcast Television</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>4K Cinema Production</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Audio Recording &amp; Music</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Live Event Broadcasting</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigate('/media/videos')}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20"
                    >
                      <span>Watch Video Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigate('/media/portfolio')}
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-500/20 text-xs font-medium transition-colors"
                    >
                      <span>View Portfolio</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. ADITYA FOODS: PRODUCT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-3 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
              <AdityaFoodsBadge className="w-16 h-auto" />
              <span>Dairy Excellence &amp; Wholesome Purity</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Aditya Foods Product Showcase
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              From our farms to your family table: fresh milk, golden ghee, table butter, malai paneer, and probiotic curd crafted with uncompromising care.
            </p>
          </div>

          <button
            onClick={() => navigate('/foods/products')}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. OUR COMMITMENT TO QUALITY (4 PILLARS) */}
      <section className="bg-[#080d16] border-y border-white/10 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Standard of Integrity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Our Commitment to Quality
            </h2>
            <p className="text-sm text-slate-400">
              Upholding strict hygiene, consistent sourcing, and continuous testing to ensure every product delivers genuine nourishment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Quality-Focused Production
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stringent temperature management from collection points through processing, safeguarding natural enzymes and nutrients.
              </p>
            </div>

            <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Freshness and Care
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rapid turnaround times from milking to packaging guarantee that fresh flavor and authentic texture reach consumers every day.
              </p>
            </div>

            <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Hygiene and Safety
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stainless-steel sanitary pipelines, food-grade packaging barrier technology, and regular swab microbiological audits.
              </p>
            </div>

            <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Customer Satisfaction
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated customer feedback loops, transparent communication, and adaptable packaging tailored for household and institutional needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ADITYA MEDIA: INTERACTIVE YOUTUBE VIDEO GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-3 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
              <AdityaMediaBadge className="w-16 h-auto" />
              <span>Aditya Media Studio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Interactive Video Gallery
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Hover over any video on desktop for an instant muted preview, or click to watch in our dedicated high-definition cinema player.
            </p>
          </div>

          <button
            onClick={() => navigate('/media/videos')}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Explore All Videos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* 5. FOOD CONSULTATION PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-[#0d1a14] via-[#091510] to-[#0c121e] p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Food Entrepreneurship &amp; Advisory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Have a Food Business Idea? Let’s Talk.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Benefit from our industry expertise across dairy processing guidance, food safety compliance, sustainable packaging selection, and regional distribution roadmap strategy.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/foods/consultation')}
                className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20"
              >
                Request Food Consultation
              </button>
              <a
                href={getWhatsAppUrl('Hello Aditya Food & Media, I would like to consult with you regarding a food business project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MEDIA SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Creative Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Media &amp; Production Services
          </h2>
          <p className="text-sm text-slate-400">
            End-to-end creative production engineered for modern screens and discerning audiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0e121c] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Broadcast Media</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Live broadcast engineering, outdoor broadcasting vans, television news programming, and multi-feed transmission.
            </p>
          </div>

          <div className="bg-[#0e121c] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Film &amp; Television</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Feature films, docuseries, corporate commercial advertisements, scriptwriting, and color-graded post-production.
            </p>
          </div>

          <div className="bg-[#0e121c] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Music &amp; Sound</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Acoustic soundstage tracking, mixing, spatial audio mastering, vocal recording, and soundtrack composition.
            </p>
          </div>

          <div className="bg-[#0e121c] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Media Collaborations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Co-production ventures, creative direction for brands, influencer campaigns, and cross-platform distribution.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
