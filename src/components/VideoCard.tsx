import React, { useState, useRef } from 'react';
import { VideoItem } from '../types';
import { useSite } from '../context/SiteContext';
import { Play, Film, ExternalLink, Clock } from 'lucide-react';

interface VideoCardProps {
  video: VideoItem;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { setActiveVideo } = useSite();
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Slight debounce so quick mouse passes don't trigger iframe load
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 250);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  const handleClick = () => {
    setActiveVideo(video);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-[#0e1320] border border-white/10 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col cursor-pointer"
      onClick={handleClick}
    >
      {/* 16:9 Video/Thumbnail Container */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
        {/* If hovered on desktop, render muted YouTube preview */}
        {isHovered ? (
          <div className="w-full h-full pointer-events-none">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeVideoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${video.youtubeVideoId}`}
              title={video.title}
              className="w-full h-full border-0 scale-105"
              allow="autoplay"
            />
          </div>
        ) : (
          <>
            <img
              src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-13 h-13 rounded-full bg-amber-500/90 group-hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 transform group-hover:scale-110 transition-all duration-300">
                <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
              </div>
            </div>
          </>
        )}

        {/* Category Badge & Duration */}
        <div className="absolute top-3 left-3 z-10 flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-300 text-[11px] font-semibold tracking-wide border border-amber-500/20">
            {video.category}
          </span>
        </div>

        {video.duration && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center space-x-1 px-2 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-mono">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{video.duration}</span>
          </div>
        )}
      </div>

      {/* Content Meta */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="flex items-center space-x-1">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Aditya Media</span>
            </span>
            {video.publicationDate && <span>{video.publicationDate}</span>}
          </div>

          <h3 className="font-serif text-base font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
            {video.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="text-amber-400 font-medium group-hover:underline flex items-center space-x-1">
            <span>Watch Full Video</span>
          </span>

          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-slate-400 hover:text-red-400 transition-colors p-1"
            title="Open directly on YouTube"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
