import React from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { VideoModal } from './components/VideoModal';
import { ProductModal } from './components/ProductModal';

// Pages
import { HomePage } from './pages/HomePage';
const AboutPage = React.lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const FoodsPage = React.lazy(() => import('./pages/FoodsPage').then((m) => ({ default: m.FoodsPage })));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const ConsultationPage = React.lazy(() => import('./pages/ConsultationPage').then((m) => ({ default: m.ConsultationPage })));
const MediaPage = React.lazy(() => import('./pages/MediaPage').then((m) => ({ default: m.MediaPage })));
const VideosPage = React.lazy(() => import('./pages/VideosPage').then((m) => ({ default: m.VideosPage })));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPolicyPage = React.lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = React.lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.TermsPage })));

const RouteLoadingFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center py-20">
    <div className="w-7 h-7 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
  </div>
);

const AppContent: React.FC = () => {
  const { currentPath, navigate, t } = useSite();

  const renderCurrentPage = () => {
    // Clean up trailing slash
    const path = currentPath.toLowerCase().replace(/\/$/, '') || '/';

    if (path === '/' || path === '/home') {
      return <HomePage />;
    }
    if (path === '/about') {
      return <AboutPage />;
    }
    if (path === '/foods') {
      return <FoodsPage />;
    }
    if (path === '/foods/products') {
      return <ProductsPage />;
    }
    if (path === '/foods/consultation') {
      return <ConsultationPage />;
    }
    if (path === '/media') {
      return <MediaPage />;
    }
    if (path === '/media/videos') {
      return <VideosPage />;
    }
    if (path === '/media/portfolio') {
      return <PortfolioPage />;
    }
    if (path === '/contact') {
      return <ContactPage />;
    }
    if (path === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (path === '/terms') {
      return <TermsPage />;
    }

    // 404 Not Found Page
    return (
      <div className="pt-36 pb-28 max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto shadow-sm">
          <span className="font-serif text-2xl font-bold">404</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          {t.common.noItemsFound}
        </h1>
        <p className="text-sm text-slate-600">
          The requested section could not be located. Explore our dairy products or cinematic video gallery.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase shadow-sm transition-all"
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => navigate('/foods/products')}
            className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-all"
          >
            {t.nav.dairyProducts}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <main className="flex-1">
        <React.Suspense fallback={<RouteLoadingFallback />}>
          {renderCurrentPage()}
        </React.Suspense>
      </main>

      <Footer />

      <FloatingWhatsApp />
      <VideoModal />
      <ProductModal />
    </div>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
