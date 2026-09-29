import React from 'react';
import { useSite } from '../context/SiteContext';
import { ProductCard } from '../components/ProductCard';
import { AdityaFoodsBadge } from '../components/BrandLogos';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  Droplets,
  Layers,
  Truck,
} from 'lucide-react';

export const FoodsPage: React.FC = () => {
  const { products, navigate } = useSite();

  return (
    <div className="pt-24 pb-20 space-y-24">
      {/* 1. FOODS DEDICATED HERO WITH OFFICIAL EMBLEM */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#180b0e] via-[#09110d] to-[#070d0a] border-b border-red-900/30">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-16 space-y-6">
          {/* Official Emblem Banner */}
          <div className="flex justify-center mb-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl scale-110" />
              <div className="relative z-10 w-44 sm:w-52 h-auto drop-shadow-2xl">
                <AdityaFoodsBadge className="w-full h-auto" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
            <span>Official Dairy &amp; Agribusiness Division</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Pure Quality. <span className="bg-gradient-to-r from-emerald-200 via-amber-200 to-emerald-100 bg-clip-text text-transparent">Authentic Taste.</span>
          </h1>

          <p className="font-serif text-lg sm:text-xl text-emerald-100/90 font-light max-w-2xl mx-auto">
            Discover our range of dairy products, presented with a focus on quality, freshness and care.
          </p>

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            From farm-fresh milk pasteurized at pristine temperatures to slow-churned granular ghee and handcrafted paneer, Aditya Foods champions genuine nutrition and traditional culinary taste.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/foods/products')}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20"
            >
              Browse All Products
            </button>
            <button
              onClick={() => navigate('/foods/consultation')}
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors"
            >
              Consult with Our Food Experts
            </button>
          </div>
        </div>
      </section>

      {/* 2. CORE VALUES & FRESHNESS GUARANTEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0c1410] border border-emerald-500/20 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Responsible Farm Sourcing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We partner directly with certified local dairy farmers practicing humane animal husbandry, balanced green forage feed, and clean milking routines.
            </p>
          </div>

          <div className="bg-[#0c1410] border border-emerald-500/20 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Cold Chain Precision</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Immediate chilling to 4°C arrests microbial multiplication, guaranteeing that raw freshness, essential amino acids, and sweetness remain uncompromised.
            </p>
          </div>

          <div className="bg-[#0c1410] border border-emerald-500/20 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Unadulterated Integrity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Zero synthetic stabilizers, zero chemical thickeners, and zero adulterants. Every batch undergoes rigorous quality parameter testing before packaging.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              <span>Available Catalog</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">
              Dairy Products Collection
            </h2>
          </div>
          <button
            onClick={() => navigate('/foods/products')}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. COMMITMENT TO QUALITY DETAIL */}
      <section className="bg-[#080d16] border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Food Safety &amp; Hygiene
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Our Commitment to Quality
            </h2>
            <p className="text-sm text-slate-400">
              Four pillars defining how Aditya Foods sets the benchmark in ethical dairy processing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0c121e] border border-white/10 rounded-2xl p-6 space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h4 className="font-serif text-base font-bold text-white">Quality-Focused Production</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                State-of-the-art closed processing lines preventing ambient exposure and contamination.
              </p>
            </div>
            <div className="bg-[#0c121e] border border-white/10 rounded-2xl p-6 space-y-3">
              <Award className="w-8 h-8 text-emerald-400" />
              <h4 className="font-serif text-base font-bold text-white">Freshness &amp; Care</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prompt morning &amp; evening processing so you enjoy dairy at the pinnacle of authentic freshness.
              </p>
            </div>
            <div className="bg-[#0c121e] border border-white/10 rounded-2xl p-6 space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <h4 className="font-serif text-base font-bold text-white">Hygiene &amp; Safety</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Regular laboratory validation of fat, SNF, acidity, and microbial safety benchmarks.
              </p>
            </div>
            <div className="bg-[#0c121e] border border-white/10 rounded-2xl p-6 space-y-3">
              <HeartHandshake className="w-8 h-8 text-emerald-400" />
              <h4 className="font-serif text-base font-bold text-white">Customer Satisfaction</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reliable doorstep distribution, custom commercial packaging, and dedicated support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONSULTATION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-red-500/30 bg-[#160d10] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Industry Knowledge Sharing
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Starting or Expanding a Food Venture?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We provide tailored consultation across food processing, hygienic packaging selection, brand distribution, and regulatory compliance.
            </p>
          </div>
          <button
            onClick={() => navigate('/foods/consultation')}
            className="shrink-0 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20"
          >
            Schedule Consultation
          </button>
        </div>
      </section>
    </div>
  );
};
