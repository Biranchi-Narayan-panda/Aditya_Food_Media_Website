import React from 'react';
import { VideoItem } from '../types';
import { useSite } from '../context/SiteContext';
import { Play, Film, ExternalLink, Clock } from 'lucide-react';

interface VideoCardProps {
  video: VideoItem;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { setActiveVideo, t } = useSite();

  const handleClick = () => {
    setActiveVideo(video);
  };

  return (
    <div
      className="group relative bg-white border border-slate-200/90 hover:border-amber-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
      onClick={handleClick}
    >
      {/* 16:9 Video Thumbnail Container */}
      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
        <img
          src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/90 group-hover:bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-200">
            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
          </div>
        </div>

        {/* Category & Duration */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-amber-900 text-[11px] font-semibold tracking-wide border border-slate-200/80 shadow-xs">
            {video.category}
          </span>
        </div>

        {video.duration && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center space-x-1 px-2 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-mono">
            <Clock className="w-3 h-3 text-slate-300" />
            <span>{video.duration}</span>
          </div>
        )}
      </div>

      {/* Content Meta */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="flex items-center space-x-1 font-medium text-amber-700">
              <Film className="w-3.5 h-3.5" />
              <span>{t.nav.media}</span>
            </span>
            {video.viewCount ? (
              <span className="font-semibold text-amber-900 bg-amber-50/90 border border-amber-200/80 px-2 py-0.5 rounded-md text-[11px]">
                {video.viewCount}
              </span>
            ) : video.publicationDate ? (
              <span>{video.publicationDate}</span>
            ) : null}
          </div>

          <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
            {video.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-amber-700 font-bold group-hover:underline flex items-center space-x-1">
            <span>{t.media.watchVideo}</span>
          </span>

          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-slate-400 hover:text-red-600 transition-colors p-1"
            title="Open on YouTube"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
