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
  const { products, navigate, t } = useSite();

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* 1. FOODS DEDICATED HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-[#fafaf9] border-b border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12 space-y-5">
          {/* Official Emblem Banner */}
          <div className="flex justify-center mb-1">
            <div className="w-36 sm:w-44 h-auto drop-shadow-sm">
              <AdityaFoodsBadge className="w-full h-auto" />
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <span>{t.foods.badge}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.foods.heroTitle}
          </h1>

          <p className="font-serif text-base sm:text-xl text-slate-700 font-normal max-w-2xl mx-auto">
            {t.foods.heroSubtitle}
          </p>

          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {t.home.foodsIntroDesc}
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/foods/products')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wide transition-colors shadow-xs cursor-pointer"
            >
              {t.home.exploreFoodsBtn}
            </button>
            <button
              type="button"
              onClick={() => navigate('/foods/consultation')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors shadow-xs cursor-pointer"
            >
              {t.nav.foodConsultation}
            </button>
          </div>
        </div>
      </section>

      {/* 2. CORE VALUES & FRESHNESS GUARANTEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-7 space-y-3 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">{t.home.purityPillar}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.home.purityPillarDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-7 space-y-3 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">{t.home.coldChainPillar}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.home.coldChainPillarDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-7 space-y-3 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">{t.home.communityPillar}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.home.communityPillarDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-slate-200 gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {t.foods.productsHeading}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {t.foods.productsSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/foods/products')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
          >
            <span>{t.home.viewAllProducts}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. FOOD CONSULTANCY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-200 bg-white p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.consultation.badge}
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              {t.foods.consultationCtaTitle}
            </h3>
            <p className="text-sm text-slate-600">
              {t.foods.consultationCtaDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/foods/consultation')}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wide transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            {t.foods.consultationCtaBtn}
          </button>
        </div>
      </section>
    </div>
  );
};
