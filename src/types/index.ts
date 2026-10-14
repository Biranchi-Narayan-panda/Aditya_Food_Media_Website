export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
  packaging?: string;
  availability?: string;
  featured?: boolean;
  displayOrder?: number;
  specifications?: string;
  createdAt?: string;
  updatedAt?: string;
  // Bilingual Odia Fields
  nameOr?: string;
  categoryOr?: string;
  descriptionOr?: string;
  packagingOr?: string;
  availabilityOr?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  slug: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  viewCount?: string;
  publicationDate?: string;
  duration?: string;
  featured?: boolean;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  enquiryType: 'product' | 'consultation' | 'media' | 'general';
  relatedItem?: string;
  message: string;
  preferredContact?: 'whatsapp' | 'email' | 'phone';
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface EnquiryMetadata {
  referenceNumber: string;
  enquiryType: string;
  createdAt: string;
  emailDeliveryStatus: 'delivered' | 'failed';
  channel: 'emailjs';
}

export interface SiteSettings {
  id: string;
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  youtube: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  xTwitter: string;
  updatedAt?: string;
  // Bilingual settings
  defaultLanguage?: 'or' | 'en';
  companyNameOr?: string;
  taglineOr?: string;
  addressOr?: string;
}
