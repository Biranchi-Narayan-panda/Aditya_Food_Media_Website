import React from 'react';
import { useSite } from '../context/SiteContext';
import { VideoCard } from '../components/VideoCard';
import { AdityaMediaBadge } from '../components/BrandLogos';
import {
  Film,
  Tv,
  Music,
  Video,
  Users,
  Play,
  ArrowRight,
  Camera,
  Clapperboard,
} from 'lucide-react';

export const MediaPage: React.FC = () => {
  const { videos, navigate, setActiveVideo } = useSite();

  const previewVideos = videos.slice(0, 3);
  const heroVideo = videos[0] || null;

  return (
    <div className="pt-24 pb-20 space-y-24">
      {/* 1. CINEMATIC MEDIA HERO WITH OFFICIAL EMBLEM */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#180b0f] via-[#090712] to-[#0b0f17] border-b border-amber-900/30">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-16 space-y-6">
          {/* Official Media Emblem Banner */}
          <div className="flex justify-center mb-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl scale-110" />
              <div className="relative z-10 w-44 sm:w-52 h-auto drop-shadow-2xl">
                <AdityaMediaBadge className="w-full h-auto" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <span>Official Cinema, Broadcast &amp; Entertainment Division</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Stories That Inspire. <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">Media That Connects.</span>
          </h1>

          <p className="font-serif text-lg sm:text-xl text-amber-100/90 font-light max-w-2xl mx-auto">
            Explore the creative world of Aditya Media, featuring video content, entertainment, broadcasting, film and television.
          </p>

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-light">
            Equipped with state-of-the-art cinema cameras, sound mixing consoles, and seasoned broadcast editors, we bring regional and national stories to life with cinematic fidelity.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/media/videos')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
            >
              Watch YouTube Videos
            </button>
            <button
              onClick={() => navigate('/media/portfolio')}
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors"
            >
              View Broadcast Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* 2. MEDIA PRODUCTION REEL SPOTLIGHT */}
      {heroVideo && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-[#0e121e] shadow-2xl">
            <div className="aspect-21/9 sm:aspect-16/7 w-full relative">
              <img
                src={heroVideo.thumbnailUrl || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'}
                alt={heroVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e121e] via-[#0e121e]/50 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setActiveVideo(heroVideo)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 transform hover:scale-110 active:scale-95 transition-all"
                  aria-label="Play spotlight video"
                >
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-xl space-y-1">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    Featured Studio Production
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {heroVideo.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveVideo(heroVideo)}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-colors"
                >
                  <Clapperboard className="w-4 h-4 text-amber-400" />
                  <span>Launch High-Def Cinema Player</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. MEDIA SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Broadcast &amp; Creative Spectrum
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Media Services &amp; Capabilities
          </h2>
          <p className="text-sm text-slate-400">
            Professional studio infrastructure delivering comprehensive audio-visual solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0e1322] border border-white/10 hover:border-amber-500/40 rounded-2xl p-7 space-y-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Broadcast Media</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equipped with satellite uplink capabilities, OB vans, multi-channel live streaming protocols, and real-time television graphics.
            </p>
          </div>

          <div className="bg-[#0e1322] border border-white/10 hover:border-amber-500/40 rounded-2xl p-7 space-y-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Film and Television</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              End-to-end cinema production from script development and scouting to 4K RED/ARRI cinematography, VFX, and theater DCP mastering.
            </p>
          </div>

          <div className="bg-[#0e1322] border border-white/10 hover:border-amber-500/40 rounded-2xl p-7 space-y-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Music &amp; Entertainment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Acoustic treated recording suites, multi-track instrumentation tracking, voiceover dubbing, and distribution to major streaming DSPs.
            </p>
          </div>

          <div className="bg-[#0e1322] border border-white/10 hover:border-amber-500/40 rounded-2xl p-7 space-y-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Video Content Production</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Commercial advertising films, corporate documentaries, social YouTube syndication, and high-engagement digital video series.
            </p>
          </div>

          <div className="bg-[#0e1322] border border-white/10 hover:border-amber-500/40 rounded-2xl p-7 space-y-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Media Collaborations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Co-production agreements with independent filmmakers, brand integrations, government campaigns, and regional cultural archives.
            </p>
          </div>

          <div className="bg-[#0e1322] border border-white/10 hover:border-amber-500/40 rounded-2xl p-7 space-y-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Post-Production &amp; Grading</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              DaVinci Resolve HDR color grading suites, Dolby 5.1/7.1 surround sound mastering, motion graphics, and editorial finishing.
            </p>
          </div>
        </div>
      </section>

      {/* 4. YOUTUBE GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <span>Streaming Gallery</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">
              Latest Video Releases
            </h2>
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
          {previewVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* 5. COLLABORATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-[#180e12] via-[#0d0c18] to-[#0c121e] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Creative Partnership
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Ready to Produce Your Next Creative Project?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect with our producers and creative directors to discuss commercials, documentary coverage, music albums, or television broadcasting.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
          >
            Initiate Collaboration
          </button>
        </div>
      </section>
    </div>
  );
};
