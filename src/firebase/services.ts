import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType } from './errors';
import { Product, VideoItem, PortfolioItem, Enquiry, SiteSettings, EnquiryMetadata } from '../types';
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
      return INITIAL_PRODUCTS;
    }
    const products: Product[] = [];
    snapshot.forEach((docSnap) => {
      products.push(docSnap.data() as Product);
    });
    return products.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  } catch {
    return INITIAL_PRODUCTS;
  }
}

// ---------------- VIDEOS ----------------
export async function fetchVideos(): Promise<VideoItem[]> {
  try {
    const colRef = collection(db, 'videos');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      return INITIAL_VIDEOS;
    }
    const videos: VideoItem[] = [];
    snapshot.forEach((docSnap) => {
      videos.push(docSnap.data() as VideoItem);
    });
    return videos.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  } catch {
    return INITIAL_VIDEOS;
  }
}

// ---------------- PORTFOLIO ----------------
export async function fetchPortfolio(): Promise<PortfolioItem[]> {
  try {
    const colRef = collection(db, 'portfolio');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      return INITIAL_PORTFOLIO;
    }
    const items: PortfolioItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push(docSnap.data() as PortfolioItem);
    });
    return items;
  } catch {
    return INITIAL_PORTFOLIO;
  }
}

// ---------------- ENQUIRIES ----------------
/**
 * Records ONLY minimum operational metadata (reference number, timestamp, delivery status).
 * Never stores personal details (name, email, phone, message) in Firestore.
 */
export async function recordEnquiryOperationalMetadata(metadata: EnquiryMetadata): Promise<void> {
  const path = `enquiries/${metadata.referenceNumber}`;
  try {
    await setDoc(doc(db, 'enquiries', metadata.referenceNumber), metadata);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

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
    throw error;
  }
}

// ---------------- SETTINGS ----------------
export async function fetchSiteSettings(): Promise<SiteSettings> {
  let fallback = INITIAL_SETTINGS;
  try {
    const localCached = localStorage.getItem('aditya_site_settings');
    if (localCached) {
      fallback = { ...INITIAL_SETTINGS, ...JSON.parse(localCached) };
    }
  } catch {
    // ignore
  }

  try {
    const docRef = doc(db, 'settings', 'general');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as SiteSettings;
      try {
        localStorage.setItem('aditya_site_settings', JSON.stringify(data));
      } catch {
        // ignore
      }
      return data;
    }
    return fallback;
  } catch {
    return fallback;
  }
}
