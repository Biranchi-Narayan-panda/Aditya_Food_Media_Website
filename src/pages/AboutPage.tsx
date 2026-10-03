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
  Award,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate, t } = useSite();

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Header with Main Brand Logo */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 pt-4">
        <div className="flex justify-center mb-1">
          <div className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-sm">
            <AdityaMainLogo className="w-full h-full" />
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{t.nav.about}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {t.about.heroTitle}
        </h1>

        <p className="font-serif text-base sm:text-xl text-slate-700 font-normal max-w-3xl mx-auto leading-relaxed">
          {t.about.heroSubtitle}
        </p>
      </section>

      {/* Split Story Section with Division Emblems */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Foods Story */}
          <div className="rounded-3xl border border-emerald-200 bg-white p-7 sm:p-9 space-y-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-1">
                <AdityaFoodsBadge className="w-20 h-auto" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {t.foods.badge}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                {t.foods.badge} {t.about.heritageTitle}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t.about.heritageText1}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t.about.heritageText2}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate('/foods')}
                className="text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 flex items-center space-x-1 cursor-pointer"
              >
                <span>{t.home.exploreFoodsBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Media Story */}
          <div className="rounded-3xl border border-amber-200 bg-white p-7 sm:p-9 space-y-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-1">
                <AdityaMediaBadge className="w-20 h-auto" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  {t.media.badge}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                {t.media.badge} {t.about.heritageTitle}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t.media.heroSubtitle}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t.home.mediaIntroDesc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate('/media')}
                className="text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-950 flex items-center space-x-1 cursor-pointer"
              >
                <span>{t.home.exploreMediaBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-7 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">{t.about.missionTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.about.missionDesc}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-7 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">{t.about.visionTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.about.visionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            {t.about.valuesTitle}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {t.about.heroTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 text-center shadow-xs">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-serif text-base font-bold text-slate-900">{t.about.purityValue}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.about.purityValueDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 text-center shadow-xs">
            <Heart className="w-8 h-8 text-amber-600 mx-auto" />
            <h4 className="font-serif text-base font-bold text-slate-900">{t.about.trustValue}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.about.trustValueDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 text-center shadow-xs">
            <Award className="w-8 h-8 text-amber-600 mx-auto" />
            <h4 className="font-serif text-base font-bold text-slate-900">{t.about.excellenceValue}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.about.excellenceValueDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 text-center space-y-4 shadow-xs">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {t.about.contactCtaTitle}
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            {t.about.contactCtaSubtitle}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            >
              {t.about.contactCtaBtn}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
