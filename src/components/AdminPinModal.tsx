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
    t,
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
        setPinError(t.admin.incorrectPin);
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
      aria-label={t.admin.securityGateTitle}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeAdminPinModal();
        }
      }}
    >
      <div
        className={`relative w-full max-w-sm sm:max-w-md bg-white border ${
          pinError
            ? 'border-red-300 shadow-red-200/50'
            : pinSuccess
            ? 'border-emerald-300 shadow-emerald-200/50'
            : 'border-slate-200 shadow-xl'
        } rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 ${
          isShaking ? 'pin-shake' : ''
        } transition-all duration-200`}
      >
        {/* Close Button */}
        <button
          onClick={closeAdminPinModal}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          title={t.common.close}
          aria-label={t.common.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Security Icon / Indicator */}
        <div className="relative mx-auto w-16 h-16 flex items-center justify-center pt-1">
          <div
            className={`w-14 h-14 rounded-2xl p-[1px] shadow-sm relative z-10 transition-all ${
              pinSuccess
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                : pinError
                ? 'bg-red-100 text-red-700 border border-red-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            } flex items-center justify-center`}
          >
            {pinSuccess ? (
              <Check className="w-7 h-7 text-emerald-700 animate-in zoom-in duration-200" />
            ) : pinError ? (
              <ShieldAlert className="w-7 h-7 text-red-700 animate-in zoom-in duration-200" />
            ) : (
              <Lock className="w-7 h-7 text-amber-700" />
            )}
          </div>
        </div>

        {/* Header Titles */}
        <div className="text-center space-y-1">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {t.admin.portalTitle}
          </h2>
          <p className="text-xs text-amber-800 font-semibold uppercase tracking-wider">
            {t.admin.securityGateSubtitle}
          </p>
          <p className="text-xs text-slate-600 max-w-xs mx-auto pt-0.5 leading-relaxed">
            {t.admin.enterPinDesc}
          </p>
        </div>

        {/* 4 Digit Indicator Boxes */}
        <div className="flex justify-center items-center gap-3 py-1">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pinDigits.length > idx;
            return (
              <div
                key={idx}
                className={`w-12 h-13 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 ${
                  pinSuccess
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 scale-105 shadow-xs'
                    : pinError
                    ? 'border-red-400 bg-red-50 text-red-800'
                    : isFilled
                    ? 'border-amber-500 bg-amber-50/80 text-amber-900 scale-105 shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                {isFilled ? (
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-600 animate-in zoom-in-50 duration-150" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* Status / Error feedback */}
        <div className="min-h-5 flex items-center justify-center text-center">
          {pinError ? (
            <span className="text-xs font-semibold text-red-600 flex items-center space-x-1.5 animate-in fade-in">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>{pinError}</span>
            </span>
          ) : pinSuccess ? (
            <span className="text-xs font-semibold text-emerald-700 flex items-center space-x-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>{t.admin.pinVerified}</span>
            </span>
          ) : (
            <span className="text-xs text-slate-500 font-mono tracking-wider">
              {pinDigits.length} / 4 {t.admin.pinDigitsPrompt}
            </span>
          )}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto pt-0.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handlePinInput(digit)}
              disabled={pinSuccess}
              className="h-11 rounded-xl bg-slate-50 hover:bg-amber-50 hover:border-amber-300 active:scale-95 text-slate-800 font-bold text-base border border-slate-200 transition-all focus:outline-none cursor-pointer"
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            onClick={handleClearPin}
            disabled={pinSuccess || pinDigits.length === 0}
            className="h-11 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-95 text-slate-600 font-medium text-xs border border-slate-200 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            {t.admin.clear}
          </button>

          <button
            type="button"
            onClick={() => handlePinInput('0')}
            disabled={pinSuccess}
            className="h-11 rounded-xl bg-slate-50 hover:bg-amber-50 hover:border-amber-300 active:scale-95 text-slate-800 font-bold text-base border border-slate-200 transition-all focus:outline-none cursor-pointer"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleBackspace}
            disabled={pinSuccess || pinDigits.length === 0}
            className="h-11 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-95 text-slate-600 flex items-center justify-center border border-slate-200 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            aria-label="Backspace"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={closeAdminPinModal}
            className="inline-flex items-center space-x-1 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.common.cancel}</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">Permanent PIN: 1793</span>
        </div>
      </div>
    </div>
  );
};
