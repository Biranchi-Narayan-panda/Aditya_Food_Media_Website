import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { currentPath, getWhatsAppUrl, t, language } = useSite();
  const [isOpen, setIsOpen] = useState(false);

  // Generate bilingual context-aware prefill message
  const getContextMessage = () => {
    if (language === 'or') {
      if (currentPath.includes('consultation')) {
        return 'ନମସ୍କାର ଆଦିତ୍ୟ ଫୁଡ୍ସ, ମୁଁ ଖାଦ୍ୟ ଏବଂ ଡାଏରୀ ବ୍ୟବସାୟ ପରାମର୍ଶ ସମ୍ବନ୍ଧରେ ଜାଣିବାକୁ ଚାହେଁ।';
      }
      if (currentPath.includes('food') || currentPath.includes('product')) {
        return 'ନମସ୍କାର ଆଦିତ୍ୟ ଫୁଡ୍ସ, ମୁଁ ଆପଣଙ୍କ ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ (କ୍ଷୀର, ଘିଅ, ଲହୁଣୀ, ପନୀର, ଦହି) କ୍ରୟ ବିଷୟରେ ଜାଣିବାକୁ ଚାହେଁ।';
      }
      if (currentPath.includes('media') || currentPath.includes('video') || currentPath.includes('portfolio')) {
        return 'ନମସ୍କାର ଆଦିତ୍ୟ ମିଡିଆ, ମୁଁ ଆପଣଙ୍କ ସିନେମା ଏବଂ ମିଡିଆ ପ୍ରଯୋଜନା ସମ୍ବନ୍ଧରେ ଆଲୋଚନା କରିବାକୁ ଚାହେଁ।';
      }
      return 'ନମସ୍କାର ଆଦିତ୍ୟ ଫୁଡ୍ସ ଏବଂ ମିଡିଆ, ମୁଁ ଆପଣଙ୍କ ସେବା ସମ୍ବନ୍ଧରେ ଅଧିକ ଜାଣିବାକୁ ଚାହେଁ।';
    }

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
        <div className="mb-3 w-72 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-left transition-all transform animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">
                {t.nav.brandTitle} {t.nav.brandSubtitle}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1"
              aria-label={t.common.close}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            {language === 'or'
              ? 'ସ୍ୱାଗତମ୍! ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ ଅର୍ଡର, ମିଡିଆ ସହଯୋଗ କିମ୍ବା ଖାଦ୍ୟ ପରାମର୍ଶ ପାଇଁ ଆମ ଟିମ୍ ସହିତ ସିଧାସଳଖ ଯୋଗାଯୋଗ କରନ୍ତୁ।'
              : 'Welcome! Connect directly with our team for dairy product orders, media collaborations, or food business consultation.'}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center space-x-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.contact.whatsappAction}</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label={t.contact.whatsappAction}
        >
          <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        </a>

        {/* Desktop Tooltip */}
        <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-slate-800 text-xs font-semibold rounded-xl shadow-md border border-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {t.contact.whatsappAction}
        </span>
      </div>
    </div>
  );
};
