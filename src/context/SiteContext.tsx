import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Product, VideoItem, PortfolioItem, SiteSettings } from '../types';
import { fetchProducts, fetchVideos, fetchPortfolio, fetchSiteSettings } from '../firebase/services';
import { INITIAL_SETTINGS } from '../firebase/seedData';
import { Language, TranslationDictionary, translations, PRODUCT_TRANSLATIONS } from '../i18n/translations';

interface SiteContextType {
  products: Product[];
  videos: VideoItem[];
  portfolio: PortfolioItem[];
  settings: SiteSettings;
  loading: boolean;
  refreshData: () => Promise<void>;
  activeVideo: VideoItem | null;
  setActiveVideo: (video: VideoItem | null) => void;
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  getWhatsAppUrl: (message?: string) => string;
  currentPath: string;
  navigate: (path: string) => void;
  // Bilingual i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  getProductLocalized: (product: Product) => {
    name: string;
    category: string;
    description: string;
    packaging?: string;
    availability?: string;
  };
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Bilingual Language State (Defaults to ODIA for first-time visitors)
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('aditya_user_lang');
      if (stored === 'en' || stored === 'or') {
        return stored as Language;
      }
    } catch {
      // ignore storage access errors
    }
    // REQUIRED: The DEFAULT WEBSITE LANGUAGE must be ODIA ('or')
    return 'or';
  });

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('aditya_user_lang', newLang);
      document.documentElement.lang = newLang === 'or' ? 'or' : 'en';
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'or' ? 'or' : 'en';
  }, [language]);

  const t = translations[language] || translations.or;

  const getProductLocalized = useCallback(
    (product: Product) => {
      if (language === 'or') {
        const odiaData = PRODUCT_TRANSLATIONS[product.id];
        return {
          name: product.nameOr || (odiaData ? odiaData.name : product.name),
          category: product.categoryOr || (odiaData ? odiaData.category : product.category),
          description: product.descriptionOr || (odiaData ? odiaData.description : product.description),
          packaging: product.packagingOr || (odiaData ? odiaData.packaging : product.packaging),
          availability: product.availabilityOr || (odiaData ? odiaData.availability : product.availability),
        };
      }
      return {
        name: product.name,
        category: product.category,
        description: product.description,
        packaging: product.packaging,
        availability: product.availability,
      };
    },
    [language]
  );

  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Synchronize path from window.location.hash or pathname
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) return hash.startsWith('/') ? hash : '/' + hash;
    return window.location.pathname || '/';
  });

  const navigate = useCallback((path: string) => {
    window.location.hash = path.startsWith('/') ? path : '/' + path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        setCurrentPath(hash.startsWith('/') ? hash : '/' + hash);
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const refreshData = useCallback(async () => {
    try {
      const [prodRes, vidRes, portRes, setRes] = await Promise.all([
        fetchProducts(),
        fetchVideos(),
        fetchPortfolio(),
        fetchSiteSettings(),
      ]);
      setProducts(prodRes);
      setVideos(vidRes);
      setPortfolio(portRes);
      setSettings(setRes);
    } catch (err) {
      console.error('Error fetching site data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const getWhatsAppUrl = (customMessage?: string): string => {
    const rawNumber = settings.whatsapp || '+919437012345';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const defaultMsg = 'Hello Aditya Food & Media, I would like to enquire about your products and media services.';
    const encoded = encodeURIComponent(customMessage || defaultMsg);
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  };

  return (
    <SiteContext.Provider
      value={{
        products,
        videos,
        portfolio,
        settings,
        loading,
        refreshData,
        activeVideo,
        setActiveVideo,
        activeProduct,
        setActiveProduct,
        getWhatsAppUrl,
        currentPath,
        navigate,
        language,
        setLanguage,
        t,
        getProductLocalized,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
