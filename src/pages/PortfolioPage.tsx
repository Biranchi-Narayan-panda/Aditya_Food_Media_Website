import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { PortfolioItem } from '../types';
import {
  Film,
  Camera,
  Play,
  X,
  Sparkles,
} from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { portfolio, setActiveVideo, videos, t, language } = useSite();
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
      const found = videos.find((v) => v.youtubeUrl === item.videoUrl);
      if (found) {
        setActiveVideo(found);
      } else {
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
    <div className="pt-28 pb-20 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5 text-amber-600" />
          <span>{t.nav.mediaPortfolio}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {t.media.portfolioHeading}
        </h1>

        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.media.portfolioSubtitle}
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat === 'All' && language === 'or' ? 'ସମସ୍ତ (All)' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPortfolio.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8 space-y-3 shadow-xs">
            <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-serif text-lg text-slate-800 font-bold">{t.common.noItemsFound}</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Image */}
                <div
                  className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => setLightboxItem(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-amber-900 text-xs font-semibold border border-slate-200 shadow-xs">
                    {item.category}
                  </span>

                  {item.videoUrl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAssociatedVideo(item);
                      }}
                      className="absolute bottom-3 right-3 p-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md cursor-pointer transition-transform hover:scale-110"
                      title={t.media.watchVideo}
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <button
                      type="button"
                      onClick={() => setLightboxItem(item)}
                      className="hover:text-slate-900 font-medium cursor-pointer"
                    >
                      {t.common.learnMore}
                    </button>
                    {item.videoUrl && (
                      <button
                        type="button"
                        onClick={() => handlePlayAssociatedVideo(item)}
                        className="text-amber-700 font-bold hover:underline flex items-center space-x-1 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-amber-700" />
                        <span>{t.media.watchVideo}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/9 w-full bg-black">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                aria-label={t.common.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                {lightboxItem.category}
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900">{lightboxItem.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{lightboxItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
