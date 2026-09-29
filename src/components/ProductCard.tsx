import React from 'react';
import { Product } from '../types';
import { useSite } from '../context/SiteContext';
import { MessageCircle, Info, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setActiveProduct, getWhatsAppUrl } = useSite();

  const whatsappMessage = `Hello Aditya Food & Media, I would like to enquire about ${product.name} (${product.packaging || 'dairy supply'}). Please share availability and supply details.`;

  return (
    <div className="group relative bg-[#0e141a] border border-emerald-950 hover:border-emerald-500/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 flex flex-col">
      {/* Product Image */}
      <div
        className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden cursor-pointer"
        onClick={() => setActiveProduct(product)}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e141a] via-transparent to-transparent opacity-80" />

        {/* Category & Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-emerald-500/30">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>{product.category}</span>
        </div>

        {product.packaging && (
          <div className="absolute bottom-3 left-3 text-[11px] font-medium text-slate-300 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
            {product.packaging}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3
            onClick={() => setActiveProduct(product)}
            className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>

          {product.availability && (
            <div className="flex items-center space-x-1.5 mt-3 text-[11px] text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              <span>{product.availability}</span>
            </div>
          )}
        </div>

        {/* Actions: WhatsApp & Details */}
        <div className="pt-3 border-t border-white/5 flex items-center gap-2">
          <a
            href={getWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold transition-all"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire on WhatsApp</span>
          </a>

          <button
            onClick={() => setActiveProduct(product)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
            title="View product specifications"
            aria-label="View product details"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
