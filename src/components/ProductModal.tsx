import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { X, MessageCircle, CheckCircle2, Package, Shield, Sparkles } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { activeProduct, setActiveProduct, getWhatsAppUrl, navigate } = useSite();

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

  const whatsappMessage = `Hello Aditya Food & Media, I am interested in placing an order or enquiry for ${activeProduct.name} (${activeProduct.packaging || 'Standard Packaging'}). Please provide availability and pricing details.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#0d121c] border border-emerald-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090d16]">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-500/30">
              {activeProduct.category}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">Verified Dairy Quality</span>
          </div>
          <button
            onClick={() => setActiveProduct(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Image */}
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg">
              <img
                src={activeProduct.imageUrl}
                alt={activeProduct.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-sm border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-medium text-emerald-300 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>100% Pure & Fresh</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-white">
                {activeProduct.name}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeProduct.description}
              </p>

              {activeProduct.packaging && (
                <div className="flex items-start space-x-2 text-xs text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                  <Package className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Available Packaging: </span>
                    {activeProduct.packaging}
                  </div>
                </div>
              )}

              {activeProduct.availability && (
                <div className="flex items-start space-x-2 text-xs text-emerald-300 bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Supply Status: </span>
                    {activeProduct.availability}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Specifications */}
          {activeProduct.specifications && (
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Product Specifications & Quality Standards</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-[#080b12] p-3.5 rounded-xl border border-white/5">
                {activeProduct.specifications}
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setActiveProduct(null);
                navigate('/contact');
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors border border-white/10"
            >
              Send Detailed Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
