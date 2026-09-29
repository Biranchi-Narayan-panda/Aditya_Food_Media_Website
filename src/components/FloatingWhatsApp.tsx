import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { currentPath, getWhatsAppUrl } = useSite();
  const [isOpen, setIsOpen] = useState(false);

  // Generate context-aware prefill message
  const getContextMessage = () => {
    if (currentPath.includes('consultation')) {
      return 'Hello Aditya Food & Media, I would like to enquire about food business consultation services.';
    }
    if (currentPath.includes('food') || currentPath.includes('product')) {
      return 'Hello Aditya Food & Media, I am interested in your dairy products (Milk, Ghee, Butter, Paneer, Curd). Please share more details.';
    }
    if (currentPath.includes('media') || currentPath.includes('video') || currentPath.includes('portfolio')) {
      return 'Hello Aditya Food & Media, I would like to know more about your media production and collaboration services.';
    }
    return 'Hello Aditya Food & Media, I would like to enquire about your services.';
  };

  const whatsappLink = getWhatsAppUrl(getContextMessage());

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover preview on desktop or toggle */}
      {isOpen && (
        <div className="mb-3 w-72 bg-[#0e1422] border border-emerald-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-left transition-all transform animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-white">Aditya Food & Media</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Welcome! Connect directly with our team for dairy product orders, media collaborations, or food business consultation.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center space-x-2 w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs rounded-xl transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Chat with Aditya Food & Media on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-slate-950 text-emerald-500" />
        </a>

        {/* Desktop Tooltip */}
        <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0e1422] text-white text-xs font-medium rounded-lg shadow-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </div>
    </div>
  );
};
