import React, { useState, useRef, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { VideoCard } from '../components/VideoCard';
import { Film, Search, Sparkles, Youtube, Play } from 'lucide-react';

export const VideosPage: React.FC = () => {
  const { videos, setActiveVideo, t, language } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [featuredHoverPlaying, setFeaturedHoverPlaying] = useState(false);
  const startTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = () => {
    if (startTimerRef.current) {
      clearTimeout(startTimerRef.current);
      startTimerRef.current = null;
    }
    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleMouseEnter = () => {
    clearTimers();
    startTimerRef.current = setTimeout(() => {
      setFeaturedHoverPlaying(true);
      stopTimerRef.current = setTimeout(() => {
        setFeaturedHoverPlaying(false);
      }, 15000);
    }, 250);
  };

  const handleMouseLeave = () => {
    clearTimers();
    setFeaturedHoverPlaying(false);
  };

  const categories = [
    'All',
    'Comedy & Entertainment',
    'Food',
    'Film & Television',
    'Music',
    'Interviews',
    'Events',
  ];

  const filteredVideos = videos.filter((v) => {
    const matchesCategory =
      selectedCategory === 'All' || v.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredHighlight = videos.find((v) => v.featured) || videos[0];

  return (
    <div className="pt-28 pb-20 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Youtube className="w-3.5 h-3.5 text-red-600" />
          <span>{t.nav.videoGallery}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {t.nav.videoGallery}
        </h1>

        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.media.latestReelsSubtitle}
        </p>
      </section>

      {/* Featured Banner */}
      {featuredHighlight && selectedCategory === 'All' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              clearTimers();
              setFeaturedHoverPlaying(false);
              setActiveVideo(featuredHighlight);
            }}
            className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white cursor-pointer shadow-xs hover:shadow-md transition-all"
          >
            <div className="aspect-21/9 sm:aspect-16/7 w-full relative">
              {featuredHoverPlaying ? (
                <div className="w-full h-full pointer-events-none relative bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${featuredHighlight.youtubeVideoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${featuredHighlight.youtubeVideoId}`}
                    title={featuredHighlight.title}
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
                    src={featuredHighlight.thumbnailUrl}
                    alt={featuredHighlight.title}
                    className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-amber-500 group-hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-200">
                      <Play className="w-6 h-6 fill-slate-950 ml-1" />
                    </div>
                  </div>
                </>
              )}

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div className="max-w-xl space-y-1.5">
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-400/90 text-slate-950 text-xs font-bold">
                    {featuredHighlight.category}
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold">
                    {featuredHighlight.title}
                  </h2>
                  <p className="text-xs text-slate-200 line-clamp-2">
                    {featuredHighlight.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {featuredHighlight.viewCount && (
                    <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
                      {featuredHighlight.viewCount}
                    </span>
                  )}
                  <a
                    href={featuredHighlight.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <span>Watch on YouTube</span>
                  </a>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300">
                    <span>{t.media.watchVideo} &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'All' && language === 'or' ? 'ସବୁ (All)' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'or' ? 'ଭିଡିଓ ଖୋଜନ୍ତୁ...' : 'Search videos...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8 space-y-3 shadow-xs">
            <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-serif text-lg text-slate-800 font-bold">{t.common.noItemsFound}</h3>
            <p className="text-xs text-slate-500">
              {language === 'or' ? 'ଅନ୍ୟ ବର୍ଗ ବାଛି ଚେଷ୍ଟା କରନ୍ତୁ।' : 'Try adjusting your category filter or search query.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </section>

      {/* “Watch Full Content” Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-200/90 rounded-3xl p-8 sm:p-10 shadow-xs space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
            <Youtube className="w-3.5 h-3.5 text-red-600" />
            <span>Official Channel Showcase</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Enjoying Our Comedy &amp; Entertainment?
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Discover full-length episodes, exclusive bloopers, comedic sketches, and cultural releases on our official YouTube channel.
          </p>

          <div className="pt-2">
            <a
              href="https://youtube.com/@ss17523?si=ZnG7pZu12DHFMbuP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              <span>Watch Full Content on YouTube</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
