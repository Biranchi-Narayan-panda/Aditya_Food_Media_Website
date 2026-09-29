import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { X, ExternalLink, Share2, Film, Check } from 'lucide-react';

export const VideoModal: React.FC = () => {
  const { activeVideo, setActiveVideo } = useSite();
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo, setActiveVideo]);

  if (!activeVideo) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: activeVideo.title,
        text: activeVideo.description,
        url: activeVideo.youtubeUrl || window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(activeVideo.youtubeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0c101a] border border-amber-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#090d16]">
          <div className="flex items-center space-x-2 truncate pr-4">
            <Film className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
              {activeVideo.title}
            </span>
          </div>
          <button
            onClick={() => setActiveVideo(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Details & Meta */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30">
                {activeVideo.category}
              </span>
              {activeVideo.duration && (
                <span className="text-xs text-slate-400">Duration: {activeVideo.duration}</span>
              )}
              {activeVideo.publicationDate && (
                <span className="text-xs text-slate-400">&bull; {activeVideo.publicationDate}</span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors border border-white/5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              <a
                href={activeVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs transition-colors border border-red-500/30"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
            {activeVideo.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {activeVideo.description}
          </p>
        </div>
      </div>
    </div>
  );
};
