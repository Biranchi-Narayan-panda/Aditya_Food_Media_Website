import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdityaMainLogo, AdityaFoodsBadge, AdityaMediaBadge } from './BrandLogos';

interface BrandIntroProps {
  onComplete: () => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'liquid' | 'film' | 'union' | 'done'>('liquid');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const hasSeenIntro = sessionStorage.getItem('aditya_intro_shown');
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    const t1 = setTimeout(() => setPhase('film'), 650);
    const t2 = setTimeout(() => setPhase('union'), 1300);
    const t3 = setTimeout(() => {
      sessionStorage.setItem('aditya_intro_shown', 'true');
      setPhase('done');
      onComplete();
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('aditya_intro_shown', 'true');
    onComplete();
  };

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070a10] text-white overflow-hidden select-none"
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-600/15 rounded-full blur-3xl" />
        </div>

        {/* Film strip decorative bars */}
        <div className="absolute top-0 inset-x-0 h-10 border-b border-white/10 flex items-center justify-between px-4 opacity-40">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-5 h-5 bg-white/20 rounded-xs" />
          ))}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 border-t border-white/10 flex items-center justify-between px-4 opacity-40">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-5 h-5 bg-white/20 rounded-xs" />
          ))}
        </div>

        {/* Central Official Emblem Reveal */}
        <div className="relative mb-6 h-36 flex items-center justify-center">
          {/* Phase 1: Foods Emblem */}
          {phase === 'liquid' && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-36 h-auto drop-shadow-2xl">
                <AdityaFoodsBadge className="w-full h-auto" />
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 tracking-widest uppercase">
                Aditya Foods
              </span>
            </motion.div>
          )}

          {/* Phase 2: Media Emblem */}
          {phase === 'film' && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-36 h-auto drop-shadow-2xl">
                <AdityaMediaBadge className="w-full h-auto" />
              </div>
              <span className="text-[11px] font-semibold text-amber-400 tracking-widest uppercase">
                Aditya Media
              </span>
            </motion.div>
          )}

          {/* Phase 3: The Combined Brand Logo */}
          {phase === 'union' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              animate={{ scale: 1.1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl scale-125 animate-pulse" />
              <div className="w-32 h-32 relative z-10 drop-shadow-2xl">
                <AdityaMainLogo className="w-full h-full" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Brand Typography */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center px-4"
        >
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase text-white mb-2">
            Aditya <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">Food & Media</span>
          </h1>
          <p className="text-xs md:text-sm tracking-widest text-amber-200/80 uppercase font-light">
            Where Quality Meets Creativity
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-amber-400 to-amber-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider px-3 py-1 rounded-full border border-white/5 hover:border-white/20"
        >
          Skip Intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
