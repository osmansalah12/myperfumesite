import { Perfume, Review, User, MarketplaceListing, Deal } from '@/types';

export const mockPerfumes: Perfume[] = [
  {
    id: '1',
    name: 'Sauvage',
    brand: 'Dior',
    concentration: 'EDT',
    price: 82,
    originalPrice: 110,
    rating: 4.3,
    reviewCount: 2847,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
    notes: {
      top: ['Bergamot', 'Pepper'],
      middle: ['Sichuan Pepper', 'Lavender', 'Pink Pepper', 'Vetiver', 'Patchouli', 'Geranium', 'Elemi'],
      base: ['Ambroxan', 'Cedar', 'Vanilla']
    },
    description: 'A radically fresh composition, Sauvage is both raw and noble.',
    longevity: 8,
    projection: 7,
    seasonality: ['Spring', 'Summer', 'Fall'],
    occasions: ['Casual', 'Office', 'Date Night'],
    mood: ['Confident', 'Fresh', 'Masculine']
  },
  {
    id: '2',
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    concentration: 'EDP',
    price: 195,
    rating: 4.6,
    reviewCount: 1924,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
    notes: {
      top: ['Saffron', 'Jasmine'],
      middle: ['Amberwood', 'Ambergris'],
      base: ['Fir Resin', 'Cedar']
    },
    description: 'A luminous and sophisticated fragrance with incredible projection.',
    longevity: 10,
    projection: 9,
    seasonality: ['Fall', 'Winter'],
    occasions: ['Evening', 'Special Events', 'Date Night'],
    mood: ['Luxurious', 'Seductive', 'Sophisticated']
  },
  {
    id: '3',
    name: 'Light Blue',
    brand: 'Dolce & Gabbana',
    concentration: 'EDT',
    price: 68,
    originalPrice: 88,
    rating: 4.1,
    reviewCount: 3156,
    image: 'https://images.pexels.com/photos/1889946/pexels-photo-1889946.jpeg',
    notes: {
      top: ['Sicilian Lemon', 'Apple', 'Cedar'],
      middle: ['Bamboo', 'Jasmine', 'White Rose'],
      base: ['Cedar', 'Amber', 'Musk']
    },
    description: 'Fresh and fruity, evoking the joy of the Mediterranean summer.',
    longevity: 6,
    projection: 5,
    seasonality: ['Spring', 'Summer'],
    occasions: ['Casual', 'Beach', 'Daytime'],
    mood: ['Fresh', 'Cheerful', 'Light']
  },
  {
    id: '4',
    name: 'Tom Ford Black Orchid',
    brand: 'Tom Ford',
    concentration: 'EDP',
    price: 145,
    rating: 4.4,
    reviewCount: 1687,
    image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg',
    notes: {
      top: ['Truffle', 'Gardenia', 'Black Currant', 'Ylang-Ylang', 'Jasmine', 'Bergamot', 'Mandarin Orange', 'Agarwood'],
      middle: ['Orchid', 'Spices', 'Gardenia', 'Fruity Notes', 'Ylang-Ylang', 'Jasmine', 'Lotus'],
      base: ['Mexican Chocolate', 'Patchouli', 'Vanilla', 'Incense', 'Amber', 'Sandalwood', 'Vetiver', 'White Musk']
    },
    description: 'A luxurious and sensual fragrance that captures glamour and sophistication.',
    longevity: 9,
    projection: 8,
    seasonality: ['Fall', 'Winter'],
    occasions: ['Evening', 'Special Events', 'Date Night'],
    mood: ['Seductive', 'Mysterious', 'Luxurious']
  },
  {
    id: '5',
    name: 'Acqua di Gio',
    brand: 'Giorgio Armani',
    concentration: 'EDT',
    price: 75,
    originalPrice: 92,
    rating: 4.2,
    reviewCount: 4231,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
    notes: {
      top: ['Lime', 'Lemon', 'Bergamot', 'Jasmine', 'Orange', 'Mandarin Orange', 'Neroli'],
      middle: ['Sea Notes', 'Jasmine', 'Calone', 'Peach', 'Freesia', 'Hiacynth', 'Cyclamen', 'Violet', 'Coriander', 'Nutmeg', 'Rose'],
      base: ['White Musk', 'Cedar', 'Oakmoss', 'Amber']
    },
    description: 'A fresh aquatic fragrance inspired by the Mediterranean sea.',
    longevity: 7,
    projection: 6,
    seasonality: ['Spring', 'Summer'],
    occasions: ['Casual', 'Office', 'Beach', 'Daytime'],
    mood: ['Fresh', 'Clean', 'Aquatic']
  },
  {
    id: '6',
    name: 'Flowerbomb',
    brand: 'Viktor & Rolf',
    concentration: 'EDP',
    price: 128,
    rating: 4.5,
    reviewCount: 2894,
    image: 'https://images.pexels.com/photos/1889946/pexels-photo-1889946.jpeg',
    notes: {
      top: ['Tea', 'Bergamot', 'Osmanthus'],
      middle: ['Sambac Jasmine', 'Orchid', 'Freesia', 'Rose'],
      base: ['Patchouli', 'Musk', 'Vanilla']
    },
    description: 'An explosive bouquet of flowers that makes everything seem possible.',
    longevity: 8,
    projection: 7,
    seasonality: ['Spring', 'Fall', 'Winter'],
    occasions: ['Date Night', 'Special Events', 'Evening'],
    mood: ['Romantic', 'Feminine', 'Sweet']
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    perfumeId: '1',
    userId: '1',
    userName: 'FragranceExpert',
    rating: 4,
    longevity: 8,
    projection: 7,
    title: 'Great everyday scent',
    content: 'Perfect for office wear. Fresh and clean without being overwhelming. Lasts about 6-8 hours on my skin.',
    helpful: 23,
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    perfumeId: '1',
    userId: '2',
    userName: 'ScentLover92',
    rating: 5,
    longevity: 9,
    projection: 8,
    title: 'Amazing projection!',
    content: 'This fragrance has incredible projection. People compliment me all day when I wear this. The bergamot opening is fantastic.',
    helpful: 45,
    date: '2024-01-10',
    verified: true
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    isPremium: true,
    preferences: {
      favoriteNotes: ['Bergamot', 'Vanilla', 'Cedar'],
      dislikedNotes: ['Patchouli', 'Oud'],
      preferredConcentration: ['EDT', 'EDP']
    }
  }
];

export const mockListings: MarketplaceListing[] = [
  {
    id: '1',
    perfumeId: '2',
    sellerId: '1',
    sellerName: 'FragranceCollector',
    sellerRating: 4.8,
    price: 165,
    condition: 'Like New',
    bottleSize: '70ml',
    remainingAmount: '95%',
    description: 'Barely used, purchased last month but not my style.',
    images: ['https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg'],
    location: 'New York, NY',
    shippingOptions: ['Standard Shipping ($5)', 'Express Shipping ($15)'],
    datePosted: '2024-01-20'
  }
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    perfumeId: '1',
    store: 'FragranceX',
    originalPrice: 110,
    discountedPrice: 82,
    discountPercentage: 25,
    couponCode: 'SAVE25',
    validUntil: '2024-02-15',
    url: '#',
    inStock: true
  },
  {
    id: '2',
    perfumeId: '3',
    store: 'Sephora',
    originalPrice: 88,
    discountedPrice: 68,
    discountPercentage: 23,
    validUntil: '2024-02-10',
    url: '#',
    inStock: true
  }
];

export const allFragranceNotes = [
  'Bergamot', 'Lemon', 'Orange', 'Grapefruit', 'Lime', 'Mandarin',
  'Lavender', 'Rose', 'Jasmine', 'Ylang-Ylang', 'Geranium', 'Neroli',
  'Sandalwood', 'Cedar', 'Vetiver', 'Patchouli', 'Oakmoss', 'Amber',
  'Vanilla', 'Musk', 'Tonka Bean', 'Benzoin', 'Oud', 'Incense',
  'Pepper', 'Cinnamon', 'Cardamom', 'Ginger', 'Nutmeg', 'Clove',
  'Apple', 'Peach', 'Pear', 'Blackcurrant', 'Strawberry', 'Pineapple',
  'Sea Salt', 'Ozone', 'Water Lily', 'Marine Notes', 'Seaweed'
];

export const moodCategories = [
  'Fresh & Clean',
  'Romantic & Seductive',
  'Confident & Bold',
  'Calm & Relaxing',
  'Energetic & Vibrant',
  'Mysterious & Dark',
  'Elegant & Sophisticated',
  'Playful & Fun'
];

export const occasionCategories = [
  'Daily Wear',
  'Office & Professional',
  'Date Night',
  'Special Events',
  'Beach & Vacation',
  'Winter Evenings',
  'Spring Days',
  'Gym & Sports'
];