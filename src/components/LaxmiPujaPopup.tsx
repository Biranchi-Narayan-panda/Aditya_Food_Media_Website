import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const DISPLAY_DURATION_MS = 8000; // 8 seconds visible before closing begins
const ANIMATION_DURATION_MS = 600; // 600ms smooth fade-out and scale-down transition

export const LaxmiPujaPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClosingRef = useRef(false);

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    // Clear the auto-close timer so it doesn't trigger a duplicate animation
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }

    // Trigger smooth fade-out and scale-down
    setIsClosing(true);

    // Completely remove the popup from the visible tree after transition completes
    finishCloseTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, ANIMATION_DURATION_MS);
  };

  useEffect(() => {
    // Small delay to allow the DOM to mount before triggering CSS entrance transition
    const enterTimer = setTimeout(() => {
      setHasEntered(true);
    }, 40);

    // 8-second automatic closing timer
    autoCloseTimerRef.current = setTimeout(() => {
      handleClose();
    }, DISPLAY_DURATION_MS);

    // Accessibility: Allow keyboard users to close with Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(enterTimer);
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      if (finishCloseTimerRef.current) clearTimeout(finishCloseTimerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  // Active appearance flag (entered and not yet closing)
  const isAppearing = hasEntered && !isClosing;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Laxmi Puja Wishes - Aditya Foods & Media"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 transition-opacity duration-600 ease-in-out motion-reduce:transition-none ${
        isAppearing ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
      }}
      onClick={(e) => {
        // Close if clicking outside the banner on the backdrop overlay
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className={`relative w-auto max-w-[92vw] sm:max-w-[400px] md:max-w-2xl lg:max-w-3xl max-h-[88vh] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-amber-500/30 bg-stone-900 transition-all duration-600 ease-in-out motion-reduce:transition-none transform ${
          isAppearing ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'
        }`}
      >
        {/* Top-Right Manual Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close Laxmi Puja wishes banner"
          className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 hover:border-amber-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg cursor-pointer"
        >
          <X className="w-5 h-5 sm:w-5 sm:h-5" />
        </button>

        {/* Responsive HTML <picture> element */}
        <picture className="block w-full h-auto">
          {/* Mobile view (< 768px): 9:16 portrait banner */}
          <source
            media="(max-width: 767px)"
            srcSet="/assets/aistudio/laxmi-puja-mobile_9fa2f543.png"
          />
          {/* Desktop & Tablet view (>= 768px): 16:9 landscape banner */}
          <source
            media="(min-width: 768px)"
            srcSet="/assets/aistudio/laxmi-puja-desktop_c4d496c5.png"
          />
          {/* Fallback image */}
          <img
            src="/assets/aistudio/laxmi-puja-desktop_c4d496c5.png"
            alt="Happy Laxmi Puja - Aditya Foods & Media"
            className="w-full h-auto max-h-[85vh] object-contain block select-none"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
};
