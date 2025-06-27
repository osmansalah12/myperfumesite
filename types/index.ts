export interface Perfume {
  id: string;
  name: string;
  brand: string;
  concentration: 'EDT' | 'EDP' | 'EPC' | 'Parfum';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  description: string;
  longevity: number; // 1-10
  projection: number; // 1-10
  seasonality: ('Spring' | 'Summer' | 'Fall' | 'Winter')[];
  occasions: string[];
  mood: string[];
}

export interface Review {
  id: string;
  perfumeId: string;
  userId: string;
  userName: string;
  rating: number;
  longevity: number;
  projection: number;
  title: string;
  content: string;
  helpful: number;
  date: string;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
  preferences: {
    favoriteNotes: string[];
    dislikedNotes: string[];
    preferredConcentration: string[];
  };
}

export interface MarketplaceListing {
  id: string;
  perfumeId: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  price: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  bottleSize: string;
  remainingAmount: string;
  description: string;
  images: string[];
  location: string;
  shippingOptions: string[];
  datePosted: string;
}

export interface Deal {
  id: string;
  perfumeId: string;
  store: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  couponCode?: string;
  validUntil: string;
  url: string;
  inStock: boolean;
}

export interface ScentProfile {
  id: string;
  name: string;
  notes: {
    top: { note: string; intensity: number }[];
    middle: { note: string; intensity: number }[];
    base: { note: string; intensity: number }[];
  };
  mood: string[];
  occasions: string[];
  createdBy: string;
  matches: { perfume: Perfume; similarity: number }[];
}