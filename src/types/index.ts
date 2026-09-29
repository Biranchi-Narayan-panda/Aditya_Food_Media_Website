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
}

export interface AdminUser {
  uid: string;
  email: string;
  role: string;
}
