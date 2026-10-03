import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { X, MessageCircle, CheckCircle2, Package, Shield, Sparkles } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { activeProduct, setActiveProduct, getWhatsAppUrl, navigate, getProductLocalized, t, language } = useSite();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProduct(null);
    };
    if (activeProduct) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProduct, setActiveProduct]);

  if (!activeProduct) return null;

  const localized = getProductLocalized(activeProduct);

  const whatsappMessage =
    language === 'or'
      ? `ନମସ୍କାର ଆଦିତ୍ୟ ଫୁଡ୍ସ, ମୁଁ ${localized.name} (${localized.packaging || 'ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ'}) କ୍ରୟ କିମ୍ବା ଅର୍ଡର କରିବାକୁ ଚାହେଁ। ଦୟାକରି ମୂଲ୍ୟ ଏବଂ ଯୋଗାଣ ବିବରଣୀ ପ୍ରଦାନ କରନ୍ତୁ।`
      : `Hello Aditya Food & Media, I am interested in placing an order or enquiry for ${localized.name} (${localized.packaging || 'Standard Packaging'}). Please provide availability and pricing details.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setActiveProduct(null)}
    >
      <div
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              {localized.category}
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              {t.foods.badge}
            </span>
          </div>
          <button
            onClick={() => setActiveProduct(null)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Image */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              <img
                src={activeProduct.imageUrl}
                alt={localized.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-emerald-800 flex items-center space-x-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>100% Pure & Fresh</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                {localized.name}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {localized.description}
              </p>

              {localized.packaging && (
                <div className="flex items-start space-x-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <Package className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">{t.foods.packaging}: </span>
                    {localized.packaging}
                  </div>
                </div>
              )}

              {localized.availability && (
                <div className="flex items-start space-x-2.5 text-xs text-emerald-900 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-emerald-950">{t.foods.availability}: </span>
                    {localized.availability}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Specifications */}
          {activeProduct.specifications && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>{t.foods.specifications}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                {activeProduct.specifications}
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.foods.orderWhatsApp}</span>
            </a>

            <button
              onClick={() => {
                setActiveProduct(null);
                navigate('/contact');
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors border border-slate-200 cursor-pointer"
            >
              {t.nav.getInTouch}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
