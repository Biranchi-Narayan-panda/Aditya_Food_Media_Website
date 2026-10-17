import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  Users,
  MessageCircle,
  Youtube,
  Play,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, videos, setActiveVideo, navigate, getWhatsAppUrl, t, language } = useSite();
  const [heroMode, setHeroMode] = useState<'both' | 'foods' | 'media'>('both');
  const [featuredHoverPlaying, setFeaturedHoverPlaying] = useState(false);
  const featuredStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const featuredStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFeaturedTimers = () => {
    if (featuredStartTimerRef.current) {
      clearTimeout(featuredStartTimerRef.current);
      featuredStartTimerRef.current = null;
    }
    if (featuredStopTimerRef.current) {
      clearTimeout(featuredStopTimerRef.current);
      featuredStopTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearFeaturedTimers();
  }, []);

  const handleFeaturedMouseEnter = () => {
    clearFeaturedTimers();
    featuredStartTimerRef.current = setTimeout(() => {
      setFeaturedHoverPlaying(true);
      featuredStopTimerRef.current = setTimeout(() => {
        setFeaturedHoverPlaying(false);
      }, 15000);
    }, 250);
  };

  const handleFeaturedMouseLeave = () => {
    clearFeaturedTimers();
    setFeaturedHoverPlaying(false);
  };

  const displayProducts = useMemo(() => {
    const featured = products.filter((p) => p.featured).slice(0, 4);
    return featured.length > 0 ? featured : products.slice(0, 4);
  }, [products]);

  const featuredVideo = useMemo(() => {
    return videos.find((v) => v.featured) || videos[0];
  }, [videos]);

  const additionalVideos = useMemo(() => {
    if (!featuredVideo) return videos.slice(1, 5);
    return videos.filter((v) => v.id !== featuredVideo.id).slice(0, 4);
  }, [videos, featuredVideo]);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. LIGHT MODERN HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-gradient-to-b from-amber-50/40 via-white to-[#fafaf9]">
        {/* Soft, warm ambient light spots */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Center Brand Statement */}
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="flex justify-center mb-1">
              <div
                className="relative group cursor-pointer"
                onClick={() => navigate('/about')}
                title={t.nav.about}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 relative z-10 transform group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">
                  <AdityaMainLogo className="w-full h-full" />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-semibold text-amber-900 tracking-wide">
                {t.home.heroKicker}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.home.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              {t.home.heroSubtitle}
            </p>

            {/* Quick Filter for Focus */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setHeroMode('both')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  heroMode === 'both'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {language === 'or' ? 'ଉଭୟ ବିଭାଗ (All)' : 'All Divisions'}
              </button>
              <button
                type="button"
                onClick={() => setHeroMode('foods')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  heroMode === 'foods'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
                }`}
              >
                {t.nav.foods}
              </button>
              <button
                type="button"
                onClick={() => setHeroMode('media')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  heroMode === 'media'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
                }`}
              >
                {t.nav.media}
              </button>
            </div>
          </div>

          {/* DUAL ESSENCE LIGHT PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* ADITYA FOODS PANEL */}
            {(heroMode === 'both' || heroMode === 'foods') && (
              <div className="group relative rounded-3xl overflow-hidden border border-emerald-200/90 bg-white p-7 sm:p-9 shadow-xs hover:shadow-md transition-all duration-200">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <AdityaFoodsBadge className="w-20 sm:w-24 h-auto" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        {t.foods.badge}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 hidden sm:inline">Odisha &bull; India</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {t.foods.heroTitle}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {t.home.foodsIntroDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t.home.pillarsTitle ? '100% Farm Fresh' : 'Fresh Milk'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Pure Golden Ghee</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Fresh Malai Paneer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{t.nav.foodConsultation}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/foods/products')}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide transition-all shadow-xs cursor-pointer"
                    >
                      <span>{t.home.exploreFoodsBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/foods/consultation')}
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-emerald-900 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>{t.nav.foodConsultation}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ADITYA MEDIA PANEL */}
            {(heroMode === 'both' || heroMode === 'media') && (
              <div className="group relative rounded-3xl overflow-hidden border border-amber-200/90 bg-white p-7 sm:p-9 shadow-xs hover:shadow-md transition-all duration-200">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <AdityaMediaBadge className="w-20 sm:w-24 h-auto" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                        {t.media.badge}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 hidden sm:inline">Cinema &amp; Broadcast</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {t.media.heroTitle}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {t.home.mediaIntroDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{t.media.broadcastingTitle}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{t.media.cinematographyTitle}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{t.media.musicStudioTitle}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{t.media.brandCampaignsTitle}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/media/videos')}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-xs cursor-pointer"
                    >
                      <span>{t.home.exploreMediaBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/media/portfolio')}
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-amber-900 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>{t.nav.mediaPortfolio}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* KEY STATS ROW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {t.home.stats.pureQualityLabel}
              </div>
              <div className="text-xs text-slate-600 mt-1">{t.home.stats.pureQualityDesc}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {t.home.stats.viewsLabel}
              </div>
              <div className="text-xs text-slate-600 mt-1">{t.home.stats.viewsDesc}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {t.home.stats.experienceLabel}
              </div>
              <div className="text-xs text-slate-600 mt-1">{t.home.stats.experienceDesc}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {t.home.stats.householdsLabel}
              </div>
              <div className="text-xs text-slate-600 mt-1">{t.home.stats.householdsDesc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ADITYA FOODS: PRODUCT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
              <AdityaFoodsBadge className="w-14 h-auto" />
              <span>{t.home.foodsIntroKicker}</span>
            </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. OUR COMMITMENT TO QUALITY (4 PILLARS) */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              {t.home.pillarsTitle}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {t.home.pillarsSubtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">
                {t.home.purityPillar}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.home.purityPillarDesc}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">
                {t.home.coldChainPillar}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.home.coldChainPillarDesc}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 space-y-3 hover:border-amber-300 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">
                {t.home.creativityPillar}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.home.creativityPillarDesc}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">
                {t.home.communityPillar}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.home.communityPillarDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ADITYA MEDIA: COMEDY & ENTERTAINMENT VIDEO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-5 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5">
              <AdityaMediaBadge className="w-14 h-auto" />
              <span>{t.home.mediaIntroKicker}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {t.media.brandCampaignsTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {t.media.brandCampaignsDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/media/videos')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-950 transition-colors cursor-pointer shrink-0"
          >
            <span>{t.home.viewAllVideos}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Most-Viewed Video */}
        {featuredVideo && (
          <div
            onMouseEnter={handleFeaturedMouseEnter}
            onMouseLeave={handleFeaturedMouseLeave}
            onClick={() => {
              clearFeaturedTimers();
              setFeaturedHoverPlaying(false);
              setActiveVideo(featuredVideo);
            }}
            className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white cursor-pointer shadow-xs hover:shadow-md transition-all"
          >
            <div className="aspect-video sm:aspect-[21/9] w-full relative">
              {featuredHoverPlaying ? (
                <div className="w-full h-full pointer-events-none relative bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${featuredVideo.youtubeVideoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${featuredVideo.youtubeVideoId}`}
                    title={featuredVideo.title}
                    className="w-full h-full border-0 scale-105"
                    allow="autoplay"
                  />
                  <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-xs text-amber-300 text-xs font-bold border border-amber-400/40 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Previewing</span>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={featuredVideo.thumbnailUrl}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500 group-hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-200">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950 ml-1" />
                    </div>
                  </div>
                </>
              )}

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div className="max-w-2xl space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold">
                      {featuredVideo.category}
                    </span>
                    {featuredVideo.viewCount && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
                        {featuredVideo.viewCount}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold leading-snug">
                    {featuredVideo.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 hidden sm:block">
                    {featuredVideo.description}
                  </p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <a
                    href={featuredVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>Watch on YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top 3–4 Additional Popular Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Watch Full Content on YouTube Call To Action */}
        <div className="mt-8 text-center pt-2">
          <a
            href="https://youtube.com/@ss17523?si=ZnG7pZu12DHFMbuP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:scale-105 cursor-pointer"
          >
            <Youtube className="w-4 h-4" />
            <span>Watch Full Content on YouTube</span>
          </a>
        </div>
      </section>

      {/* 5. FOOD CONSULTATION PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.consultation.badge}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {t.consultation.heroTitle}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {t.consultation.heroSubtitle}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/foods/consultation')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide transition-colors shadow-xs cursor-pointer"
              >
                {t.foods.consultationCtaBtn}
              </button>
              <a
                href={getWhatsAppUrl(
                  language === 'or'
                    ? 'ନମସ୍କାର, ମୁଁ ଖାଦ୍ୟ ବ୍ୟବସାୟ ପରାମର୍ଶ ବିଷୟରେ ଆଲୋଚନା କରିବାକୁ ଚାହେଁ।'
                    : 'Hello Aditya Food & Media, I would like to consult regarding food business services.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors shadow-xs inline-flex items-center space-x-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.contact.whatsappAction}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MEDIA SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            {t.media.badge}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {t.media.servicesTitle}
          </h2>
          <p className="text-sm text-slate-600">
            {t.media.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 hover:border-amber-300 transition-colors shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">
              {t.media.broadcastingTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.media.broadcastingDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 hover:border-amber-300 transition-colors shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">
              {t.media.cinematographyTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.media.cinematographyDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 hover:border-amber-300 transition-colors shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Music className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">
              {t.media.musicStudioTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.media.musicStudioDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 hover:border-amber-300 transition-colors shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">
              {t.media.brandCampaignsTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.media.brandCampaignsDesc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
