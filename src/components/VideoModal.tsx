import React, { useEffect, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { X, ExternalLink, Share2, Film, Check, Play, Clock, RotateCcw } from 'lucide-react';

const PREVIEW_LIMIT_SECONDS = 90; // 1 minute 30 seconds limit

export const VideoModal: React.FC = () => {
  const { activeVideo, setActiveVideo, t } = useSite();
  const [copied, setCopied] = useState(false);
  const [previewElapsed, setPreviewElapsed] = useState(0);
  const [previewEnded, setPreviewEnded] = useState(false);

  // Reset preview state whenever active video changes
  useEffect(() => {
    setPreviewElapsed(0);
    setPreviewEnded(false);
  }, [activeVideo?.id]);

  // 90-second preview timer
  useEffect(() => {
    if (!activeVideo || previewEnded) return;

    const timer = setInterval(() => {
      setPreviewElapsed((prev) => {
        if (prev + 1 >= PREVIEW_LIMIT_SECONDS) {
          setPreviewEnded(true);
          return PREVIEW_LIMIT_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeVideo, previewEnded]);

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
      navigator
        .share({
          title: activeVideo.title,
          text: activeVideo.description,
          url: activeVideo.youtubeUrl || window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(activeVideo.youtubeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReplay = () => {
    setPreviewElapsed(0);
    setPreviewEnded(false);
  };

  const youtubeTargetUrl =
    activeVideo.youtubeUrl || 'https://youtube.com/@ss17523?si=ZnG7pZu12DHFMbuP';

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setActiveVideo(null)}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center space-x-2 truncate pr-4">
            <Film className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
              {activeVideo.title}
            </span>
          </div>
          <button
            onClick={() => setActiveVideo(null)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player or 90s Preview Ended Screen */}
        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
          {previewEnded ? (
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black p-6 flex flex-col items-center justify-center text-center text-white space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 fill-red-500 ml-1" />
              </div>

              <div className="max-w-md space-y-2">
                <span className="inline-block text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  90-Second Preview Completed
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  Enjoying this video? Watch the full video on YouTube.
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Continue enjoying the full comedy video with high-definition audio and visuals on our official YouTube channel.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={youtubeTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Watch Full Video on YouTube</span>
                </a>

                <button
                  type="button"
                  onClick={handleReplay}
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Preview (90s)</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <iframe
                key={`${activeVideo.youtubeVideoId}-${previewElapsed === 0 ? 'fresh' : 'active'}`}
                src={`https://www.youtube.com/embed/${activeVideo.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&end=90`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />

              {/* Preview countdown badge */}
              <div className="absolute top-3 right-3 pointer-events-none bg-slate-900/85 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center space-x-1.5 shadow-md">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Preview: {formatSeconds(PREVIEW_LIMIT_SECONDS - previewElapsed)} remaining</span>
              </div>
            </>
          )}
        </div>

        {/* Video Details & Meta */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold">
                {activeVideo.category}
              </span>
              {activeVideo.viewCount && (
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                  {activeVideo.viewCount}
                </span>
              )}
              {activeVideo.duration && (
                <span className="text-xs text-slate-500 font-medium">
                  {t.media.duration}: {activeVideo.duration}
                </span>
              )}
              {activeVideo.publicationDate && (
                <span className="text-xs text-slate-500">&bull; {activeVideo.publicationDate}</span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors border border-slate-200 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              <a
                href={youtubeTargetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-xs text-red-700 font-medium transition-colors border border-red-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
            {activeVideo.description}
          </p>
        </div>
      </div>
    </div>
  );
};
