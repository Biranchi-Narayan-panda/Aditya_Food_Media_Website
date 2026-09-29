import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { VideoCard } from '../components/VideoCard';
import { Film, Search, Filter, Sparkles, Youtube, Play } from 'lucide-react';

export const VideosPage: React.FC = () => {
  const { videos, setActiveVideo } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'newest'>('featured');

  const categories = [
    'All',
    'Food',
    'Film & Television',
    'Music',
    'Interviews',
    'Events',
    'Entertainment',
    'Promotional Videos',
  ];

  const filteredVideos = videos
    .filter((v) => {
      const matchesCategory =
        selectedCategory === 'All' || v.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      return (a.displayOrder || 99) - (b.displayOrder || 99);
    });

  const featuredHighlight = videos.find((v) => v.featured) || videos[0];

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Youtube className="w-3.5 h-3.5 text-red-500" />
          <span>Interactive Video Gallery</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Aditya Media Streaming Lounge
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          Hover over any video card on desktop to experience a live muted preview, or click to watch in full high-definition.
        </p>
      </section>

      {/* Featured Banner (if available) */}
      {featuredHighlight && selectedCategory === 'All' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => setActiveVideo(featuredHighlight)}
            className="group relative rounded-3xl overflow-hidden border border-amber-500/30 bg-[#0d101a] cursor-pointer shadow-2xl transition-all hover:border-amber-400/60"
          >
            <div className="aspect-21/9 sm:aspect-16/7 w-full relative">
              <img
                src={featuredHighlight.thumbnailUrl}
                alt={featuredHighlight.title}
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/60 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 group-hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 transform group-hover:scale-110 transition-all duration-300">
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-xl space-y-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                    Spotlight: {featuredHighlight.category}
                  </span>
                  <h2 className="font-serif text-xl sm:text-3xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {featuredHighlight.title}
                  </h2>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {featuredHighlight.description}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400">
                  <span>Click to Stream Now &rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c121e] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full bg-[#070a10] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#070a10] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 transition-colors shrink-0"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Order Default</option>
            </select>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-20 bg-[#0c121e] border border-white/10 rounded-3xl p-8 space-y-3">
            <Film className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-serif text-lg text-white">No videos found</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your category selection or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
