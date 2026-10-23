import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * ============================================================================
 * LAXMI PUJA WISHES POPUP (TEMPORARY FESTIVE FEATURE)
 * ============================================================================
 * 
 * - Appears automatically upon opening the website.
 * - Uses responsive <picture> element:
 *     * Desktop/Tablet (>= 640px): 16:9 landscape image
 *     * Mobile (< 640px): 9:16 portrait image
 * - Displays in a centered modal dialog above existing website content.
 * - High-contrast accessible close button (×) in top-right corner.
 * - Supports keyboard Escape key and backdrop click to dismiss.
 * - Closes cleanly without page reload, redirect, or interference with site features.
 * 
 * CONFIGURATION & EASY REMOVAL:
 * To temporarily disable: change ENABLE_LAXMI_PUJA_POPUP to false.
 * To permanently remove after festival: remove <LaxmiPujaPopup /> from src/App.tsx.
 */

export const ENABLE_LAXMI_PUJA_POPUP = true;

export const LAXMI_PUJA_ASSETS = {
  // 16:9 Landscape for Desktop & Tablet
  desktopImage: '/assets/aistudio/laxmi-puja-desktop_3a0e27ee.png',
  // 9:16 Portrait for Mobile
  mobileImage: '/assets/aistudio/laxmi-puja-mobile_05771875.png',
};

export const LaxmiPujaPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(ENABLE_LAXMI_PUJA_POPUP);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!ENABLE_LAXMI_PUJA_POPUP || !isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Laxmi Puja Greetings - Aditya Foods & Media"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
      onClick={() => setIsOpen(false)}
    >
      {/* Centered Modal Content Container */}
      <div
        className="relative max-h-[90vh] flex flex-col items-center justify-center max-w-[340px] xs:max-w-[380px] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prominent High-Contrast Close Button in Top-Right Corner */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute -top-3 -right-3 sm:-top-3.5 sm:-right-3.5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/95 text-white hover:text-amber-300 hover:bg-slate-950 border-2 border-amber-400 shadow-xl flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 active:scale-95"
          aria-label="Close Laxmi Puja wishes popup"
          title="Close (Esc)"
        >
          <X className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.5]" />
        </button>

        {/* Responsive Image Wrapper with Intact Proportions and Aspect Ratios */}
        <div className="overflow-hidden rounded-2xl shadow-2xl border border-amber-500/30 bg-black/40">
          <picture className="block w-full h-auto">
            {/* Desktop & Tablet Screens (min-width: 640px) -> 16:9 Landscape Image */}
            <source
              media="(min-width: 640px)"
              srcSet={LAXMI_PUJA_ASSETS.desktopImage}
            />
            {/* Mobile Screens (< 640px) -> 9:16 Portrait Image */}
            <img
              src={LAXMI_PUJA_ASSETS.mobileImage}
              alt="Wishing you all a very Happy Laxmi Puja - Aditya Foods & Media"
              className="w-auto max-w-full max-h-[82vh] sm:max-h-[85vh] object-contain block mx-auto rounded-2xl"
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};
