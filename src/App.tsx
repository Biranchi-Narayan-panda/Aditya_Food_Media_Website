import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { SiteProvider, useSite } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BrandIntro } from './components/BrandIntro';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { VideoModal } from './components/VideoModal';
import { ProductModal } from './components/ProductModal';
import { AdminPinModal } from './components/AdminPinModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FoodsPage } from './pages/FoodsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { MediaPage } from './pages/MediaPage';
import { VideosPage } from './pages/VideosPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentPath, navigate } = useSite();
  const [introFinished, setIntroFinished] = useState(() => {
    return sessionStorage.getItem('aditya_intro_shown') === 'true';
  });

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
    if (path === '/admin') {
      return <AdminPage />;
    }

    // 404 Not Found Page
    return (
      <div className="pt-36 pb-28 max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
          <span className="font-serif text-2xl font-bold">404</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-white">Page Not Found</h1>
        <p className="text-sm text-slate-400">
          The requested section could not be located. Explore our dairy products or cinematic video gallery.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase"
          >
            Return to Homepage
          </button>
          <button
            onClick={() => navigate('/foods/products')}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
          >
            Dairy Products
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {!introFinished && <BrandIntro onComplete={() => setIntroFinished(true)} />}

      <Navbar />

      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      <Footer />

      <FloatingWhatsApp />
      <VideoModal />
      <ProductModal />
      <AdminPinModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SiteProvider>
        <AppContent />
      </SiteProvider>
    </AuthProvider>
  );
}
