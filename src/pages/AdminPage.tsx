import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import {
  fetchEnquiries,
  updateEnquiryStatus,
  removeEnquiry,
  saveProduct,
  removeProduct,
  saveVideo,
  removeVideo,
  savePortfolioItem,
  removePortfolioItem,
  updateSiteSettings,
  extractYouTubeId,
} from '../firebase/services';
import { Product, VideoItem, PortfolioItem, Enquiry, SiteSettings } from '../types';
import { AdityaMainLogo } from '../components/BrandLogos';
import {
  ShieldCheck,
  Package,
  Film,
  FolderKanban,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Download,
  LogIn,
  LogOut,
  ExternalLink,
  Save,
  X,
  Sparkles,
  Milk,
  RefreshCw,
  Lock,
  Unlock,
  ShieldAlert,
  ArrowLeft,
  Delete,
  Check,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user, isAdmin, signInWithGoogle, logout, enableDemoAdmin, disableDemoAdmin } = useAuth();
  const {
    products,
    videos,
    portfolio,
    settings,
    refreshData,
    navigate,
    isAdminPinUnlocked,
    unlockAdminPortal,
    lockAdminPortal,
  } = useSite();

  // Permanent 4-Digit Security PIN
  const PERMANENT_PIN = '1793';

  // PIN security gate state
  const isPinUnlocked = isAdminPinUnlocked;
  const [pinDigits, setPinDigits] = useState<string[]>([]);
  const [pinError, setPinError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [pinSuccess, setPinSuccess] = useState(false);

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
        setPinError('Incorrect PIN. Access Denied.');
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

  const handleLockPortal = () => {
    setPinDigits([]);
    setPinError(null);
    lockAdminPortal();
  };

  const handleSignOutAndLock = async () => {
    lockAdminPortal();
    await logout();
  };

  // Keyboard listener for 4-digit PIN entry
  useEffect(() => {
    if (isPinUnlocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handlePinInput(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        handleClearPin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPinUnlocked, pinDigits, pinSuccess]);

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'videos' | 'portfolio' | 'enquiries' | 'settings'>('overview');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals & form state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [siteSettingsForm, setSiteSettingsForm] = useState<SiteSettings>(settings);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    setSiteSettingsForm(settings);
  }, [settings]);

  const loadEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const data = await fetchEnquiries();
      setEnquiries(data || []);
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadEnquiries();
    }
  }, [isAdmin]);

  // Product CRUD
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      await saveProduct(editingProduct);
      setEditingProduct(null);
      await refreshData();
    } catch (err) {
      console.error('Failed to save product:', err);
      alert('Error saving product. Please verify permissions.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await removeProduct(id);
      await refreshData();
    }
  };

  // Video CRUD
  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    try {
      const parsedId = extractYouTubeId(editingVideo.youtubeUrl);
      const toSave: VideoItem = {
        ...editingVideo,
        youtubeVideoId: parsedId,
        thumbnailUrl: editingVideo.thumbnailUrl || `https://img.youtube.com/vi/${parsedId}/maxresdefault.jpg`,
      };
      await saveVideo(toSave);
      setEditingVideo(null);
      await refreshData();
    } catch (err) {
      console.error('Failed to save video:', err);
      alert('Error saving video. Please verify permissions.');
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      await removeVideo(id);
      await refreshData();
    }
  };

  // Portfolio CRUD
  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolio) return;
    try {
      await savePortfolioItem(editingPortfolio);
      setEditingPortfolio(null);
      await refreshData();
    } catch (err) {
      console.error('Failed to save portfolio item:', err);
      alert('Error saving portfolio item.');
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await removePortfolioItem(id);
      await refreshData();
    }
  };

  // Enquiries
  const handleStatusChange = async (id: string, newStatus: Enquiry['status']) => {
    await updateEnquiryStatus(id, newStatus);
    setEnquiries((prev) => prev.map((enq) => (enq.id === id ? { ...enq, status: newStatus } : enq)));
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (window.confirm('Delete this inquiry record?')) {
      await removeEnquiry(id);
      setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
    }
  };

  const exportEnquiriesToCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Type', 'Status', 'Message'];
    const rows = enquiries.map((enq) => [
      enq.id,
      enq.createdAt,
      `"${enq.name}"`,
      enq.email,
      enq.phone,
      enq.enquiryType,
      enq.status,
      `"${(enq.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aditya-enquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await updateSiteSettings(siteSettingsForm);
      await refreshData();
      alert('Site configuration updated successfully!');
    } catch (err) {
      console.error('Failed to update settings:', err);
      alert('Error updating settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  // 1. PIN Security Gate: Must enter permanent PIN (1793) before accessing management portal
  if (!isPinUnlocked) {
    return (
      <div className="pt-28 pb-20 max-w-md mx-auto px-4 text-center">
        <div
          className={`bg-[#0e1422] border ${
            pinError ? 'border-red-500/60 shadow-red-500/10' : 'border-amber-500/30 shadow-amber-500/10'
          } rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 ${isShaking ? 'pin-shake' : ''} transition-all`}
        >
          {/* Security Emblem */}
          <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
            <div
              className={`absolute inset-0 ${
                pinSuccess ? 'bg-emerald-500/20' : pinError ? 'bg-red-500/20' : 'bg-amber-500/20'
              } rounded-full blur-xl scale-125 animate-pulse transition-colors`}
            />
            <div
              className={`w-16 h-16 rounded-2xl p-[1.5px] shadow-xl relative z-10 transition-all ${
                pinSuccess
                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
                  : pinError
                  ? 'bg-gradient-to-br from-red-400 to-red-600'
                  : 'bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700'
              }`}
            >
              <div className="w-full h-full bg-[#0b0f17] rounded-[14px] flex items-center justify-center">
                {pinSuccess ? (
                  <Check className="w-8 h-8 text-emerald-400 animate-in zoom-in duration-200" />
                ) : pinError ? (
                  <ShieldAlert className="w-8 h-8 text-red-400 animate-in zoom-in duration-200" />
                ) : (
                  <Lock className="w-8 h-8 text-amber-400" />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
              Security Gate
            </h1>
            <p className="text-xs text-amber-200/80 font-medium uppercase tracking-wider">
              Permanent PIN Passcode Required
            </p>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto pt-1 leading-relaxed">
              Enter your 4-digit authorization PIN to unlock the Aditya Management Portal.
            </p>
          </div>

          {/* 4 Digit Boxes */}
          <div className="flex justify-center items-center gap-3.5 py-2">
            {[0, 1, 2, 3].map((idx) => {
              const isFilled = pinDigits.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-13 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 ${
                    pinSuccess
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 scale-105 shadow-lg shadow-emerald-500/20'
                      : pinError
                      ? 'border-red-500 bg-red-950/30 text-red-300'
                      : isFilled
                      ? 'border-amber-400 bg-amber-500/15 text-amber-300 scale-105 shadow-lg shadow-amber-500/20'
                      : 'border-white/10 bg-[#080b12] text-slate-600'
                  }`}
                >
                  {isFilled ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/50 animate-in zoom-in-50 duration-150" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-white/10" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Error / Status Message */}
          <div className="min-h-5 flex items-center justify-center">
            {pinError ? (
              <span className="text-xs font-semibold text-red-400 flex items-center space-x-1.5 animate-in fade-in">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{pinError}</span>
              </span>
            ) : pinSuccess ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>PIN Verified &bull; Accessing Portal...</span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-500 font-mono tracking-wider">
                {pinDigits.length} / 4 DIGITS
              </span>
            )}
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto pt-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handlePinInput(digit)}
                disabled={pinSuccess}
                className="h-12 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:border-amber-400/50 active:scale-95 text-white font-semibold text-base border border-white/5 transition-all focus:outline-none"
              >
                {digit}
              </button>
            ))}

            <button
              type="button"
              onClick={handleClearPin}
              disabled={pinSuccess || pinDigits.length === 0}
              className="h-12 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-slate-400 hover:text-white font-medium text-xs border border-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => handlePinInput('0')}
              disabled={pinSuccess}
              className="h-12 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:border-amber-400/50 active:scale-95 text-white font-semibold text-base border border-white/5 transition-all focus:outline-none"
            >
              0
            </button>

            <button
              type="button"
              onClick={handleBackspace}
              disabled={pinSuccess || pinDigits.length === 0}
              className="h-12 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-slate-400 hover:text-white flex items-center justify-center border border-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Backspace"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

          {/* Return to website link */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Login Screen if not authorized
  if (!isAdmin) {
    return (
      <div className="pt-32 pb-24 max-w-md mx-auto px-4 text-center">
        <div className="bg-[#0e1422] border border-amber-500/30 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="w-20 h-20 mx-auto drop-shadow-xl">
            <AdityaMainLogo className="w-full h-full" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-white">
              Aditya Management Portal
            </h1>
            <p className="text-xs text-slate-400">
              Sign in with your authorized administrator account to manage products, videos, inquiries, and website settings.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In with Google</span>
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0e1422] px-2 text-slate-500">Or Preview Access</span>
              </div>
            </div>

            <button
              onClick={enableDemoAdmin}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
            >
              Enter as Admin (Demo Reviewer Mode)
            </button>
          </div>

          <div className="text-[11px] text-slate-500">
            Registered Admin Email: <span className="text-slate-400">jayprabhujagannath01@gmail.com</span>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
            <button
              type="button"
              onClick={handleLockPortal}
              className="inline-flex items-center space-x-1.5 hover:text-amber-300 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Portal (PIN)</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center space-x-1.5 hover:text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter === 'all') return true;
    return e.status === statusFilter;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-[#0e1422] border border-amber-500/20 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 shrink-0">
            <AdityaMainLogo className="w-full h-full" />
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Aditya Management Portal
            </h1>
            <p className="text-xs text-slate-400">
              Logged in as: <span className="text-amber-400 font-mono">{user?.email || 'Administrator (Active)'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => refreshData()}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 text-xs transition-colors"
            title="Reload database items"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLockPortal}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
            title="Lock Portal with PIN"
          >
            <Lock className="w-4 h-4" />
            <span>Lock Portal</span>
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'overview', label: 'Overview', icon: Sparkles },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'videos', label: `Videos (${videos.length})`, icon: Film },
          { id: 'portfolio', label: `Portfolio (${portfolio.length})`, icon: FolderKanban },
          { id: 'enquiries', label: `Inquiries (${enquiries.length})`, icon: MessageSquare },
          { id: 'settings', label: 'Site Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-[#0e1422] text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Dairy Products</span>
              <div className="text-3xl font-serif font-bold text-white">{products.length}</div>
              <p className="text-[11px] text-emerald-400">Milk, Ghee, Butter, Paneer, Curd</p>
            </div>

            <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Published Videos</span>
              <div className="text-3xl font-serif font-bold text-white">{videos.length}</div>
              <p className="text-[11px] text-amber-400">Interactive YouTube gallery reels</p>
            </div>

            <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Portfolio Highlights</span>
              <div className="text-3xl font-serif font-bold text-white">{portfolio.length}</div>
              <p className="text-[11px] text-indigo-400">Film, TV & music releases</p>
            </div>

            <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Customer Inquiries</span>
              <div className="text-3xl font-serif font-bold text-white">{enquiries.length}</div>
              <p className="text-[11px] text-emerald-400">
                {enquiries.filter((e) => e.status === 'pending').length} Pending response
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Quick Administrative Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setEditingProduct({
                    id: 'prod-' + Date.now(),
                    name: '',
                    slug: '',
                    category: 'Milk',
                    description: '',
                    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=80',
                    packaging: '500ml & 1L',
                    availability: 'Available Daily',
                    featured: true,
                    displayOrder: products.length + 1,
                  });
                  setActiveTab('products');
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>

              <button
                onClick={() => {
                  setEditingVideo({
                    id: 'vid-' + Date.now(),
                    title: '',
                    slug: '',
                    youtubeUrl: '',
                    youtubeVideoId: '',
                    description: '',
                    thumbnailUrl: '',
                    category: 'Film & Television',
                    featured: true,
                    displayOrder: videos.length + 1,
                  });
                  setActiveTab('videos');
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
              >
                <Plus className="w-4 h-4" />
                <span>Add YouTube Video</span>
              </button>

              <button
                onClick={() => setActiveTab('enquiries')}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Review Customer Inquiries</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-white">Product Catalog Management</h2>
            <button
              onClick={() =>
                setEditingProduct({
                  id: 'prod-' + Date.now(),
                  name: '',
                  slug: '',
                  category: 'Milk',
                  description: '',
                  imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=80',
                  packaging: '500ml Pouch',
                  availability: 'In Stock',
                  featured: true,
                  displayOrder: products.length + 1,
                })
              }
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="bg-[#0e1422] border border-white/10 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#080b12] text-slate-400 uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Packaging</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="font-semibold text-white">{p.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{p.slug}</div>
                      </div>
                    </td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4">{p.packaging || '-'}</td>
                    <td className="p-4">
                      <span className="text-emerald-400">{p.availability || 'In Stock'}</span>
                    </td>
                    <td className="p-4">{p.featured ? 'Yes' : 'No'}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. VIDEOS TAB */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-white">YouTube Video Gallery Management</h2>
            <button
              onClick={() =>
                setEditingVideo({
                  id: 'vid-' + Date.now(),
                  title: '',
                  slug: '',
                  youtubeUrl: '',
                  youtubeVideoId: '',
                  description: '',
                  thumbnailUrl: '',
                  category: 'Food',
                  featured: true,
                  displayOrder: videos.length + 1,
                })
              }
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>Add YouTube Video</span>
            </button>
          </div>

          <div className="bg-[#0e1422] border border-white/10 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#080b12] text-slate-400 uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Thumbnail & Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">YouTube ID</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {videos.map((v) => (
                  <tr key={v.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={v.thumbnailUrl} alt={v.title} className="w-14 h-9 rounded object-cover" />
                      <div className="max-w-xs">
                        <div className="font-semibold text-white truncate">{v.title}</div>
                        <div className="text-[10px] text-slate-500 truncate">{v.description}</div>
                      </div>
                    </td>
                    <td className="p-4">{v.category}</td>
                    <td className="p-4 font-mono text-[11px] text-amber-300">{v.youtubeVideoId}</td>
                    <td className="p-4">{v.duration || '-'}</td>
                    <td className="p-4">{v.featured ? 'Yes' : 'No'}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingVideo(v)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300"
                        title="Edit Video"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(v.id)}
                        className="p-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400"
                        title="Delete Video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. PORTFOLIO TAB */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-white">Media Portfolio Management</h2>
            <button
              onClick={() =>
                setEditingPortfolio({
                  id: 'port-' + Date.now(),
                  title: '',
                  category: 'Film & Television',
                  description: '',
                  imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
                  featured: true,
                })
              }
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>Add Portfolio Project</span>
            </button>
          </div>

          <div className="bg-[#0e1422] border border-white/10 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#080b12] text-slate-400 uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Project</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Video Link</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {portfolio.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={item.imageUrl} alt={item.title} className="w-12 h-8 rounded object-cover" />
                      <div>
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{item.description}</div>
                      </div>
                    </td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4 truncate max-w-xs">{item.videoUrl || '-'}</td>
                    <td className="p-4">{item.featured ? 'Yes' : 'No'}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingPortfolio(item)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePortfolio(item.id)}
                        className="p-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. ENQUIRIES TAB */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <h2 className="font-serif text-xl font-bold text-white">Customer Enquiries & Leads</h2>
              <button
                onClick={loadEnquiries}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                title="Refresh leads"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingEnquiries ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#070a10] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
              </select>

              <button
                onClick={exportEnquiriesToCSV}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {filteredEnquiries.length === 0 ? (
            <div className="text-center py-16 bg-[#0e1422] border border-white/10 rounded-2xl p-6">
              <MessageSquare className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No inquiries recorded matching this filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-[#0e1422] border border-white/10 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white text-sm">{enq.name}</span>
                      {enq.businessName && (
                        <span className="text-xs text-slate-400">({enq.businessName})</span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold uppercase">
                        {enq.enquiryType}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">
                        {new Date(enq.createdAt).toLocaleString()}
                      </span>
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as any)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                          enq.status === 'resolved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : enq.status === 'contacted'
                            ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>

                      <button
                        onClick={() => handleDeleteEnquiry(enq.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-[#080b12] p-3 rounded-xl border border-white/5 whitespace-pre-line">
                    {enq.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <div>
                      Email: <a href={`mailto:${enq.email}`} className="text-white hover:underline">{enq.email}</a>
                    </div>
                    <div>
                      Phone: <a href={`tel:${enq.phone}`} className="text-white hover:underline">{enq.phone}</a>
                    </div>
                    {enq.preferredContact && (
                      <div>
                        Preferred Contact: <span className="text-amber-400 uppercase font-semibold">{enq.preferredContact}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. SETTINGS TAB */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-[#0e1422] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-bold text-white">Global Website Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase">Company Name</label>
              <input
                type="text"
                value={siteSettingsForm.companyName}
                onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, companyName: e.target.value })}
                className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase">Tagline</label>
              <input
                type="text"
                value={siteSettingsForm.tagline}
                onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, tagline: e.target.value })}
                className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase">Telephone</label>
              <input
                type="text"
                value={siteSettingsForm.phone}
                onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, phone: e.target.value })}
                className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase">Official Email</label>
              <input
                type="email"
                value={siteSettingsForm.email}
                onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, email: e.target.value })}
                className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase">WhatsApp Number (with Country Code)</label>
              <input
                type="text"
                value={siteSettingsForm.whatsapp}
                onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, whatsapp: e.target.value })}
                className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase">Physical Address</label>
            <input
              type="text"
              value={siteSettingsForm.address}
              onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, address: e.target.value })}
              className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div className="space-y-3 pt-3 border-t border-white/10">
            <h3 className="font-serif text-sm font-semibold text-amber-400 uppercase tracking-wider">
              Social Media URL Destinations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">YouTube Channel URL</label>
                <input
                  type="url"
                  value={siteSettingsForm.youtube}
                  onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, youtube: e.target.value })}
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Instagram Profile URL</label>
                <input
                  type="url"
                  value={siteSettingsForm.instagram}
                  onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, instagram: e.target.value })}
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Facebook Page URL</label>
                <input
                  type="url"
                  value={siteSettingsForm.facebook}
                  onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, facebook: e.target.value })}
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={siteSettingsForm.linkedin}
                  onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, linkedin: e.target.value })}
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">X (Twitter) URL</label>
                <input
                  type="url"
                  value={siteSettingsForm.xTwitter}
                  onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, xTwitter: e.target.value })}
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={savingSettings}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
          >
            {savingSettings ? 'Saving Settings...' : 'Save Configuration Changes'}
          </button>
        </form>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0e1422] border border-emerald-500/30 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingProduct.id.startsWith('prod-') && !editingProduct.name ? 'Add Product' : 'Edit Product'}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      })
                    }
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Milk">Milk</option>
                    <option value="Ghee">Ghee</option>
                    <option value="Butter">Butter</option>
                    <option value="Paneer">Paneer</option>
                    <option value="Curd">Curd</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingProduct.imageUrl}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Packaging Variants</label>
                  <input
                    type="text"
                    value={editingProduct.packaging || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, packaging: e.target.value })}
                    placeholder="e.g. 500ml & 1L pouch"
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Availability Status</label>
                  <input
                    type="text"
                    value={editingProduct.availability || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, availability: e.target.value })}
                    placeholder="e.g. In Stock / Daily delivery"
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Product Specifications</label>
                <textarea
                  rows={2}
                  value={editingProduct.specifications || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, specifications: e.target.value })}
                  placeholder="e.g. Fat 3.0%, SNF 8.5% min..."
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="prodFeatured"
                  checked={editingProduct.featured || false}
                  onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                  className="accent-emerald-400"
                />
                <label htmlFor="prodFeatured" className="text-xs text-slate-300">
                  Feature on Homepage
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT VIDEO MODAL */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0e1422] border border-amber-500/30 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingVideo.title ? 'Edit Video' : 'Add YouTube Video'}
              </h3>
              <button onClick={() => setEditingVideo(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">YouTube Video URL *</label>
                <input
                  type="text"
                  required
                  value={editingVideo.youtubeUrl}
                  onChange={(e) => {
                    const url = e.target.value;
                    const id = extractYouTubeId(url);
                    setEditingVideo({
                      ...editingVideo,
                      youtubeUrl: url,
                      youtubeVideoId: id,
                      thumbnailUrl: id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : editingVideo.thumbnailUrl,
                    });
                  }}
                  placeholder="e.g. https://www.youtube.com/watch?v=EngW7tLk6R8"
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
                <span className="text-[10px] text-slate-400">
                  Parsed YouTube ID: <span className="text-amber-400 font-mono">{editingVideo.youtubeVideoId || 'None'}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Video Title *</label>
                  <input
                    type="text"
                    required
                    value={editingVideo.title}
                    onChange={(e) =>
                      setEditingVideo({
                        ...editingVideo,
                        title: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      })
                    }
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Category *</label>
                  <select
                    value={editingVideo.category}
                    onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value })}
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Food">Food</option>
                    <option value="Film & Television">Film & Television</option>
                    <option value="Music">Music</option>
                    <option value="Interviews">Interviews</option>
                    <option value="Events">Events</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Promotional Videos">Promotional Videos</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Duration (optional)</label>
                  <input
                    type="text"
                    value={editingVideo.duration || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    placeholder="e.g. 04:15"
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Thumbnail URL</label>
                  <input
                    type="url"
                    value={editingVideo.thumbnailUrl || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, thumbnailUrl: e.target.value })}
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={editingVideo.description}
                  onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="vidFeatured"
                  checked={editingVideo.featured || false}
                  onChange={(e) => setEditingVideo({ ...editingVideo, featured: e.target.checked })}
                  className="accent-amber-400"
                />
                <label htmlFor="vidFeatured" className="text-xs text-slate-300">
                  Feature in Gallery Spotlight
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingVideo(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                >
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PORTFOLIO MODAL */}
      {editingPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0e1422] border border-amber-500/30 rounded-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">Edit Portfolio Project</h3>
              <button onClick={() => setEditingPortfolio(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePortfolio} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPortfolio.title}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })}
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Category *</label>
                  <select
                    value={editingPortfolio.category}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, category: e.target.value })}
                    className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Film & Television">Film & Television</option>
                    <option value="Broadcast Media">Broadcast Media</option>
                    <option value="Music & Entertainment">Music & Entertainment</option>
                    <option value="Media Collaborations">Media Collaborations</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingPortfolio.imageUrl}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, imageUrl: e.target.value })}
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Associated Video URL (Optional)</label>
                <input
                  type="url"
                  value={editingPortfolio.videoUrl || ''}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={editingPortfolio.description}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, description: e.target.value })}
                  className="w-full bg-[#080b12] border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingPortfolio(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
