import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Lock, ShieldAlert, Check, X, Delete, ArrowLeft } from 'lucide-react';

export const AdminPinModal: React.FC = () => {
  const {
    isAdminPinModalOpen,
    isAdminPinUnlocked,
    currentPath,
    closeAdminPinModal,
    unlockAdminPortal,
  } = useSite();

  // Permanent 4-Digit Security PIN specified by the owner
  const PERMANENT_PIN = '1793';

  // Automatically show modal if someone is on /admin and not unlocked
  const isDirectAdminAccess = (currentPath === '/admin' || currentPath.startsWith('/admin')) && !isAdminPinUnlocked;
  const isVisible = isAdminPinModalOpen || isDirectAdminAccess;

  const [pinDigits, setPinDigits] = useState<string[]>([]);
  const [pinError, setPinError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [pinSuccess, setPinSuccess] = useState(false);

  // Reset state when modal opens or closes
  useEffect(() => {
    if (isVisible) {
      setPinDigits([]);
      setPinError(null);
      setIsShaking(false);
      setPinSuccess(false);
    }
  }, [isVisible]);

  const handlePinInput = (digit: string) => {
    if (pinSuccess || pinDigits.length >= 4) return;
    setPinError(null);
    const newDigits = [...pinDigits, digit];
    setPinDigits(newDigits);

    if (newDigits.length === 4) {
      const fullPin = newDigits.join('');
      if (fullPin === PERMANENT_PIN) {
        setPinSuccess(true);
        setTimeout(() => {
          unlockAdminPortal();
          setPinSuccess(false);
          setPinDigits([]);
        }, 400);
      } else {
        setIsShaking(true);
        setPinError('Incorrect PIN. Access Denied.');
        setTimeout(() => {
          setPinDigits([]);
          setIsShaking(false);
        }, 700);
      }
    }
  };

  const handleBackspace = () => {
    if (pinSuccess || pinDigits.length === 0) return;
    setPinError(null);
    setPinDigits((prev) => prev.slice(0, prev.length - 1));
  };

  const handleClearPin = () => {
    if (pinSuccess) return;
    setPinError(null);
    setPinDigits([]);
  };

  // Keyboard listener for 4-digit PIN entry
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handlePinInput(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeAdminPinModal();
      } else if (e.key.toLowerCase() === 'c') {
        handleClearPin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, pinDigits, pinSuccess]);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Admin PIN Verification"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeAdminPinModal();
        }
      }}
    >
      <div
        className={`relative w-full max-w-sm sm:max-w-md bg-[#0e1422] border ${
          pinError
            ? 'border-red-500/60 shadow-red-500/20'
            : pinSuccess
            ? 'border-emerald-500/60 shadow-emerald-500/20'
            : 'border-amber-500/30 shadow-amber-500/10'
        } rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 ${
          isShaking ? 'pin-shake' : ''
        } transition-all duration-200`}
      >
        {/* Close Button */}
        <button
          onClick={closeAdminPinModal}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
          title="Close"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Security Icon / Indicator */}
        <div className="relative mx-auto w-16 h-16 flex items-center justify-center pt-1">
          <div
            className={`absolute inset-0 ${
              pinSuccess ? 'bg-emerald-500/20' : pinError ? 'bg-red-500/20' : 'bg-amber-500/20'
            } rounded-full blur-xl scale-125 transition-colors`}
          />
          <div
            className={`w-14 h-14 rounded-2xl p-[1.5px] shadow-xl relative z-10 transition-all ${
              pinSuccess
                ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
                : pinError
                ? 'bg-gradient-to-br from-red-400 to-red-600'
                : 'bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700'
            }`}
          >
            <div className="w-full h-full bg-[#0b0f17] rounded-[13px] flex items-center justify-center">
              {pinSuccess ? (
                <Check className="w-7 h-7 text-emerald-400 animate-in zoom-in duration-200" />
              ) : pinError ? (
                <ShieldAlert className="w-7 h-7 text-red-400 animate-in zoom-in duration-200" />
              ) : (
                <Lock className="w-7 h-7 text-amber-400" />
              )}
            </div>
          </div>
        </div>

        {/* Header Titles */}
        <div className="text-center space-y-1">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
            Aditya Management Portal
          </h2>
          <p className="text-xs text-amber-300/90 font-medium uppercase tracking-wider">
            Enter 4-Digit Security PIN
          </p>
          <p className="text-[11px] text-slate-400 max-w-xs mx-auto pt-0.5 leading-relaxed">
            Please enter your permanent 4-digit PIN to unlock owner access.
          </p>
        </div>

        {/* 4 Digit Boxes */}
        <div className="flex justify-center items-center gap-3 py-1">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pinDigits.length > idx;
            return (
              <div
                key={idx}
                className={`w-12 h-13 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 ${
                  pinSuccess
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 scale-105 shadow-md shadow-emerald-500/20'
                    : pinError
                    ? 'border-red-500 bg-red-950/30 text-red-300 scale-100'
                    : isFilled
                    ? 'border-amber-400 bg-amber-500/15 text-amber-300 scale-105 shadow-md shadow-amber-500/20'
                    : 'border-white/10 bg-[#080b12] text-slate-600'
                }`}
              >
                {isFilled ? (
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/50 animate-in zoom-in-50 duration-150" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-white/10" />
                )}
              </div>
            );
          })}
        </div>

        {/* Error / Status Feedback */}
        <div className="min-h-5 flex items-center justify-center text-center">
          {pinError ? (
            <span className="text-xs font-semibold text-red-400 flex items-center space-x-1.5 animate-in fade-in">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>{pinError}</span>
            </span>
          ) : pinSuccess ? (
            <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>PIN Verified &bull; Opening Portal...</span>
            </span>
          ) : (
            <span className="text-[11px] text-slate-500 font-mono tracking-wider">
              {pinDigits.length} OF 4 DIGITS
            </span>
          )}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto pt-0.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handlePinInput(digit)}
              disabled={pinSuccess}
              className="h-11 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:border-amber-400/50 active:scale-95 text-white font-semibold text-base border border-white/5 transition-all focus:outline-none cursor-pointer"
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            onClick={handleClearPin}
            disabled={pinSuccess || pinDigits.length === 0}
            className="h-11 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-slate-400 hover:text-white font-medium text-xs border border-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => handlePinInput('0')}
            disabled={pinSuccess}
            className="h-11 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:border-amber-400/50 active:scale-95 text-white font-semibold text-base border border-white/5 transition-all focus:outline-none cursor-pointer"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleBackspace}
            disabled={pinSuccess || pinDigits.length === 0}
            className="h-11 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-slate-400 hover:text-white flex items-center justify-center border border-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            aria-label="Backspace"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom actions */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <button
            type="button"
            onClick={closeAdminPinModal}
            className="inline-flex items-center space-x-1 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
          <span className="text-[11px] text-slate-500">Security Gate</span>
        </div>
      </div>
    </div>
  );
};
