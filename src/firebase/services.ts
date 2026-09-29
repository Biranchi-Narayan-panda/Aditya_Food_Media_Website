import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType } from './errors';
import { Product, VideoItem, PortfolioItem, Enquiry, SiteSettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_VIDEOS, INITIAL_PORTFOLIO, INITIAL_SETTINGS } from './seedData';

// Helper to extract YouTube video ID from various formats
export function extractYouTubeId(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2].length === 11) ? match[2] : trimmed;
}

// ---------------- PRODUCTS ----------------
export async function fetchProducts(): Promise<Product[]> {
  try {
    const colRef = collection(db, 'products');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      // Seed default products
      for (const prod of INITIAL_PRODUCTS) {
        await setDoc(doc(db, 'products', prod.id), prod);
      }
      return INITIAL_PRODUCTS;
    }
    const products: Product[] = [];
    snapshot.forEach(docSnap => {
      products.push(docSnap.data() as Product);
    });
    return products.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  } catch (error) {
    console.warn('Using local fallback for products if Firestore fails:', error);
    return INITIAL_PRODUCTS;
  }
}

export async function saveProduct(product: Product): Promise<void> {
  const path = `products/${product.id}`;
  try {
    await setDoc(doc(db, 'products', product.id), {
      ...product,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function removeProduct(id: string): Promise<void> {
  const path = `products/${id}`;
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ---------------- VIDEOS ----------------
export async function fetchVideos(): Promise<VideoItem[]> {
  try {
    const colRef = collection(db, 'videos');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      for (const vid of INITIAL_VIDEOS) {
        await setDoc(doc(db, 'videos', vid.id), vid);
      }
      return INITIAL_VIDEOS;
    }
    const videos: VideoItem[] = [];
    snapshot.forEach(docSnap => {
      videos.push(docSnap.data() as VideoItem);
    });
    return videos.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  } catch (error) {
    console.warn('Using local fallback for videos if Firestore fails:', error);
    return INITIAL_VIDEOS;
  }
}

export async function saveVideo(video: VideoItem): Promise<void> {
  const path = `videos/${video.id}`;
  const videoId = extractYouTubeId(video.youtubeUrl);
  const updatedVideo: VideoItem = {
    ...video,
    youtubeVideoId: videoId,
    thumbnailUrl: video.thumbnailUrl || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    updatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'videos', video.id), updatedVideo);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function removeVideo(id: string): Promise<void> {
  const path = `videos/${id}`;
  try {
    await deleteDoc(doc(db, 'videos', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ---------------- PORTFOLIO ----------------
export async function fetchPortfolio(): Promise<PortfolioItem[]> {
  try {
    const colRef = collection(db, 'portfolio');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      for (const item of INITIAL_PORTFOLIO) {
        await setDoc(doc(db, 'portfolio', item.id), item);
      }
      return INITIAL_PORTFOLIO;
    }
    const items: PortfolioItem[] = [];
    snapshot.forEach(docSnap => {
      items.push(docSnap.data() as PortfolioItem);
    });
    return items;
  } catch (error) {
    console.warn('Using local fallback for portfolio if Firestore fails:', error);
    return INITIAL_PORTFOLIO;
  }
}

export async function savePortfolioItem(item: PortfolioItem): Promise<void> {
  const path = `portfolio/${item.id}`;
  try {
    await setDoc(doc(db, 'portfolio', item.id), {
      ...item,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function removePortfolioItem(id: string): Promise<void> {
  const path = `portfolio/${id}`;
  try {
    await deleteDoc(doc(db, 'portfolio', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ---------------- ENQUIRIES ----------------
export async function submitEnquiry(data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> {
  const id = 'enq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
  const enquiry: Enquiry = {
    ...data,
    id,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const path = `enquiries/${id}`;
  try {
    await setDoc(doc(db, 'enquiries', id), enquiry);
    return enquiry;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function fetchEnquiries(): Promise<Enquiry[]> {
  const path = 'enquiries';
  try {
    const colRef = collection(db, 'enquiries');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const enquiries: Enquiry[] = [];
    snapshot.forEach(docSnap => {
      enquiries.push(docSnap.data() as Enquiry);
    });
    return enquiries;
  } catch (error) {
    // If indexing fails or fallback needed
    try {
      const snapshot = await getDocs(collection(db, 'enquiries'));
      const enquiries: Enquiry[] = [];
      snapshot.forEach(docSnap => {
        enquiries.push(docSnap.data() as Enquiry);
      });
      return enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (innerError) {
      handleFirestoreError(innerError, OperationType.LIST, path);
    }
  }
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<void> {
  const path = `enquiries/${id}`;
  try {
    await updateDoc(doc(db, 'enquiries', id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function removeEnquiry(id: string): Promise<void> {
  const path = `enquiries/${id}`;
  try {
    await deleteDoc(doc(db, 'enquiries', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ---------------- SETTINGS ----------------
export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, 'settings', 'general');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as SiteSettings;
    } else {
      await setDoc(docRef, INITIAL_SETTINGS);
      return INITIAL_SETTINGS;
    }
  } catch (error) {
    console.warn('Using local fallback for settings:', error);
    return INITIAL_SETTINGS;
  }
}

export async function updateSiteSettings(settings: SiteSettings): Promise<void> {
  const path = 'settings/general';
  try {
    await setDoc(doc(db, 'settings', 'general'), {
      ...settings,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
