import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { PortfolioItem } from '../types';
import {
  Film,
  Camera,
  Play,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { portfolio, setActiveVideo, videos } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const categories = [
    'All',
    'Film & Television',
    'Broadcast Media',
    'Music & Entertainment',
    'Media Collaborations',
  ];

  const filteredPortfolio = portfolio.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const handlePlayAssociatedVideo = (item: PortfolioItem) => {
    if (item.videoUrl) {
      // Find matching video or create temporary player item
      const found = videos.find((v) => v.youtubeUrl === item.videoUrl);
      if (found) {
        setActiveVideo(found);
      } else {
        // extract ID
        const match = item.videoUrl.match(/(?:youtu\.be\/|watch\?v=)([\w-]+)/);
        const id = match ? match[1] : '';
        if (id) {
          setActiveVideo({
            id: 'temp-' + item.id,
            title: item.title,
            slug: 'portfolio-video',
            youtubeUrl: item.videoUrl,
            youtubeVideoId: id,
            description: item.description,
            thumbnailUrl: item.imageUrl,
            category: item.category,
          });
        }
      }
    }
  };

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>Cinematic Portfolio</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Media Portfolio & Selected Projects
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          A showcase of our cinematic commercial campaigns, documentary storytelling, television broadcasts, and musical compositions.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-[#0d121c] text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#0e1320] border border-white/10 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Media Preview Image */}
              <div
                className="relative aspect-16/10 w-full overflow-hidden cursor-pointer bg-slate-950"
                onClick={() => setLightboxItem(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1320] via-black/30 to-transparent opacity-90" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-semibold border border-amber-500/30">
                    {item.category}
                  </span>
                </div>

                {item.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAssociatedVideo(item);
                      }}
                      className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/40 transform hover:scale-110 transition-transform"
                      title="Play reel"
                    >
                      <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Text Description */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3
                    onClick={() => setLightboxItem(item)}
                    className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setLightboxItem(item)}
                    className="text-amber-400 font-semibold hover:underline flex items-center space-x-1"
                  >
                    <span>View Project Imagery</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {item.videoUrl && (
                    <button
                      onClick={() => handlePlayAssociatedVideo(item)}
                      className="inline-flex items-center space-x-1 text-slate-400 hover:text-white"
                    >
                      <Film className="w-3.5 h-3.5 text-amber-400" />
                      <span>Watch Reel</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0c101a] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                {lightboxItem.category}
              </span>
              <button
                onClick={() => setLightboxItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-hidden rounded-xl bg-black">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="w-full h-auto max-h-[60vh] object-contain mx-auto"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-white">
                {lightboxItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
