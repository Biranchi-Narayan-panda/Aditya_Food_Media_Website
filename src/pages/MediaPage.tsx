import React from 'react';
import { useSite } from '../context/SiteContext';
import { VideoCard } from '../components/VideoCard';
import { AdityaMediaBadge } from '../components/BrandLogos';
import {
  Film,
  Tv,
  Music,
  Users,
  Play,
  ArrowRight,
  Camera,
  Clapperboard,
} from 'lucide-react';

export const MediaPage: React.FC = () => {
  const { videos, navigate, setActiveVideo, t } = useSite();

  const previewVideos = videos.slice(0, 3);
  const heroVideo = videos[0] || null;

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* 1. CINEMATIC MEDIA HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-[#fafaf9] border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12 space-y-5">
          {/* Official Media Emblem Banner */}
          <div className="flex justify-center mb-1">
            <div className="w-36 sm:w-44 h-auto drop-shadow-sm">
              <AdityaMediaBadge className="w-full h-auto" />
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
            <span>{t.media.badge}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.media.heroTitle}
          </h1>

          <p className="font-serif text-base sm:text-xl text-slate-700 font-normal max-w-2xl mx-auto">
            {t.media.heroSubtitle}
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/media/videos')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wide transition-colors shadow-xs cursor-pointer"
            >
              {t.media.viewGalleryBtn}
            </button>
            <button
              type="button"
              onClick={() => navigate('/media/portfolio')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors shadow-xs cursor-pointer"
            >
              {t.media.viewPortfolioBtn}
            </button>
          </div>
        </div>
      </section>

      {/* 2. MEDIA PRODUCTION REEL SPOTLIGHT */}
      {heroVideo && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs">
            <div className="aspect-21/9 sm:aspect-16/7 w-full relative">
              <img
                src={heroVideo.thumbnailUrl || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'}
                alt={heroVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setActiveVideo(heroVideo)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl transform hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label={t.media.watchVideo}
                >
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div className="max-w-xl space-y-1">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                    {heroVideo.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">
                    {heroVideo.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveVideo(heroVideo)}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-semibold tracking-wider uppercase text-white transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <span>{t.media.watchVideo}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. CAPABILITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            {t.media.servicesTitle}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {t.media.servicesSubtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">{t.media.broadcastingTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.media.broadcastingDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">{t.media.cinematographyTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.media.cinematographyDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Music className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">{t.media.musicStudioTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.media.musicStudioDesc}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900">{t.media.brandCampaignsTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.media.brandCampaignsDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 4. FEATURED VIDEO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-slate-200 gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {t.media.latestReelsTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {t.media.latestReelsSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/media/videos')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-950 transition-colors cursor-pointer"
          >
            <span>{t.home.viewAllVideos}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
};
