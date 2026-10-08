import React from 'react';
import { Product } from '../types';
import { useSite } from '../context/SiteContext';
import { MessageCircle, Info, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setActiveProduct, getWhatsAppUrl, getProductLocalized, t, language } = useSite();
  const localized = getProductLocalized(product);

  const whatsappMessage =
    language === 'or'
      ? `ନମସ୍କାର ଆଦିତ୍ୟ ଫୁଡ୍ସ, ମୁଁ ${localized.name} (${localized.packaging || 'ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ'}) ସମ୍ବନ୍ଧରେ ଜାଣିବାକୁ ଚାହେଁ। ଦୟାକରି ଉପଲବ୍ଧତା ଏବଂ ଯୋଗାଣ ବିବରଣୀ ଜଣାନ୍ତୁ।`
      : `Hello Aditya Food & Media, I would like to enquire about ${localized.name} (${localized.packaging || 'dairy supply'}). Please share availability and supply details.`;

  return (
    <div className="group relative bg-white border border-slate-200/90 hover:border-emerald-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Product Image */}
      <div
        className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => setActiveProduct(product)}
      >
        <img
          src={product.imageUrl}
          alt={localized.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />

        {/* Clean Unboxed Category Indicator */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-emerald-800 text-xs font-semibold shadow-xs border border-slate-200/60">
          {localized.category}
        </div>

        {localized.packaging && (
          <div className="absolute bottom-3 left-3 text-[11px] font-medium text-slate-700 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-slate-200/60 shadow-xs">
            {localized.packaging}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3
            onClick={() => setActiveProduct(product)}
            className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors cursor-pointer"
          >
            {localized.name}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {localized.description}
          </p>

          {localized.availability && (
            <div className="flex items-center space-x-1.5 mt-3 text-[11px] font-medium text-emerald-700">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{localized.availability}</span>
            </div>
          )}
        </div>

        {/* Actions: WhatsApp & Details */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <a
            href={getWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-all shadow-xs"
            title="WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.foods.orderWhatsApp}</span>
          </a>

          <button
            onClick={() => setActiveProduct(product)}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
            title={t.foods.viewSpecs}
            aria-label={t.foods.viewSpecs}
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
