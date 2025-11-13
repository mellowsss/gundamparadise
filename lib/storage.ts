// Simple localStorage-based storage for client-side data
// Note: This only works in the browser. For server-side, we'll use in-memory storage.

const STORAGE_KEYS = {
  WISHLIST: 'gundam_wishlist',
  COLLECTION: 'gundam_collection',
  ALERTS: 'gundam_alerts',
  KITS: 'gundam_kits',
} as const;

// Server-side in-memory storage (for API routes)
const serverStorage: {
  wishlist: any[];
  collection: any[];
  alerts: any[];
  kits: any[];
} = {
  wishlist: [],
  collection: [],
  alerts: [],
  kits: [],
};

export function getWishlist(): any[] {
  if (typeof window === 'undefined') {
    return serverStorage.wishlist;
  }
  const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  return data ? JSON.parse(data) : [];
}

export function saveWishlist(items: any[]): void {
  if (typeof window === 'undefined') {
    serverStorage.wishlist = items;
    return;
  }
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(items));
}

export function getCollection(): any[] {
  if (typeof window === 'undefined') {
    return serverStorage.collection;
  }
  const data = localStorage.getItem(STORAGE_KEYS.COLLECTION);
  return data ? JSON.parse(data) : [];
}

export function saveCollection(items: any[]): void {
  if (typeof window === 'undefined') {
    serverStorage.collection = items;
    return;
  }
  localStorage.setItem(STORAGE_KEYS.COLLECTION, JSON.stringify(items));
}

export function getAlerts(): any[] {
  if (typeof window === 'undefined') {
    return serverStorage.alerts;
  }
  const data = localStorage.getItem(STORAGE_KEYS.ALERTS);
  return data ? JSON.parse(data) : [];
}

export function saveAlerts(items: any[]): void {
  if (typeof window === 'undefined') {
    serverStorage.alerts = items;
    return;
  }
  localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(items));
}

// Sample kits data with images and store links
export const SAMPLE_KITS = [
  {
    id: 'kit-1',
    name: 'RX-78-2 Gundam',
    grade: 'MG',
    series: 'UC',
    scale: '1/100',
    description: 'The original Mobile Suit Gundam in Master Grade. A highly detailed model kit with excellent articulation and accessories.',
    currentPrice: 45.99,
    averagePrice: 48.50,
    minPrice: 42.00,
    maxPrice: 55.00,
    imageUrl: 'https://images.unsplash.com/photo-1606166188517-4a8c8c8c8c8c?w=800&h=800&fit=crop',
    storeLinks: [
      {
        id: 'store-1',
        url: 'https://www.hlj.com/search/go?w=RX-78-2+Gundam+MG',
        store: { name: 'HobbyLink Japan', website: 'https://www.hlj.com' }
      },
      {
        id: 'store-2',
        url: 'https://www.usagundamstore.com/search?q=RX-78-2+MG',
        store: { name: 'USA Gundam Store', website: 'https://www.usagundamstore.com' }
      },
      {
        id: 'store-3',
        url: 'https://www.bigbadtoystore.com/Search?SearchText=RX-78-2+MG',
        store: { name: 'BigBadToyStore', website: 'https://www.bigbadtoystore.com' }
      }
    ],
  },
  {
    id: 'kit-2',
    name: 'Wing Gundam Zero',
    grade: 'RG',
    series: 'Wing',
    scale: '1/144',
    description: 'Real Grade Wing Gundam Zero with incredible detail and poseability in a compact 1/144 scale.',
    currentPrice: 28.99,
    averagePrice: 30.00,
    minPrice: 25.00,
    maxPrice: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1606166188517-4a8c8c8c8c8c?w=800&h=800&fit=crop',
    storeLinks: [
      {
        id: 'store-1',
        url: 'https://www.hlj.com/search/go?w=Wing+Gundam+Zero+RG',
        store: { name: 'HobbyLink Japan', website: 'https://www.hlj.com' }
      },
      {
        id: 'store-2',
        url: 'https://www.usagundamstore.com/search?q=Wing+Gundam+Zero+RG',
        store: { name: 'USA Gundam Store', website: 'https://www.usagundamstore.com' }
      }
    ],
  },
  {
    id: 'kit-3',
    name: 'Unicorn Gundam',
    grade: 'PG',
    series: 'UC',
    scale: '1/60',
    description: 'Perfect Grade Unicorn Gundam with LED lighting system. The ultimate Gunpla experience with incredible detail.',
    currentPrice: 189.99,
    averagePrice: 195.00,
    minPrice: 175.00,
    maxPrice: 220.00,
    imageUrl: 'https://images.unsplash.com/photo-1606166188517-4a8c8c8c8c8c?w=800&h=800&fit=crop',
    storeLinks: [
      {
        id: 'store-1',
        url: 'https://www.hlj.com/search/go?w=Unicorn+Gundam+PG',
        store: { name: 'HobbyLink Japan', website: 'https://www.hlj.com' }
      },
      {
        id: 'store-2',
        url: 'https://www.usagundamstore.com/search?q=Unicorn+Gundam+PG',
        store: { name: 'USA Gundam Store', website: 'https://www.usagundamstore.com' }
      },
      {
        id: 'store-3',
        url: 'https://www.bigbadtoystore.com/Search?SearchText=Unicorn+Gundam+PG',
        store: { name: 'BigBadToyStore', website: 'https://www.bigbadtoystore.com' }
      }
    ],
  },
  {
    id: 'kit-4',
    name: 'Barbatos Lupus',
    grade: 'HG',
    series: 'IBO',
    scale: '1/144',
    description: 'High Grade Barbatos Lupus from Iron-Blooded Orphans. Great value with excellent articulation.',
    currentPrice: 18.99,
    averagePrice: 20.00,
    minPrice: 16.00,
    maxPrice: 24.00,
    imageUrl: 'https://images.unsplash.com/photo-1606166188517-4a8c8c8c8c8c?w=800&h=800&fit=crop',
    storeLinks: [
      {
        id: 'store-1',
        url: 'https://www.hlj.com/search/go?w=Barbatos+Lupus+HG',
        store: { name: 'HobbyLink Japan', website: 'https://www.hlj.com' }
      },
      {
        id: 'store-2',
        url: 'https://www.usagundamstore.com/search?q=Barbatos+Lupus+HG',
        store: { name: 'USA Gundam Store', website: 'https://www.usagundamstore.com' }
      }
    ],
  },
  {
    id: 'kit-5',
    name: 'Freedom Gundam',
    grade: 'MG',
    series: 'SEED',
    scale: '1/100',
    description: 'Master Grade Freedom Gundam from Gundam SEED. Features full burst mode and detailed inner frame.',
    currentPrice: 52.99,
    averagePrice: 55.00,
    minPrice: 48.00,
    maxPrice: 62.00,
    imageUrl: 'https://images.unsplash.com/photo-1606166188517-4a8c8c8c8c8c?w=800&h=800&fit=crop',
    storeLinks: [
      {
        id: 'store-1',
        url: 'https://www.hlj.com/search/go?w=Freedom+Gundam+MG',
        store: { name: 'HobbyLink Japan', website: 'https://www.hlj.com' }
      },
      {
        id: 'store-2',
        url: 'https://www.usagundamstore.com/search?q=Freedom+Gundam+MG',
        store: { name: 'USA Gundam Store', website: 'https://www.usagundamstore.com' }
      },
      {
        id: 'store-3',
        url: 'https://www.bigbadtoystore.com/Search?SearchText=Freedom+Gundam+MG',
        store: { name: 'BigBadToyStore', website: 'https://www.bigbadtoystore.com' }
      }
    ],
  },
];

export function getKits(search?: string, grade?: string, series?: string): any[] {
  let kits = [...SAMPLE_KITS];
  
  if (search) {
    kits = kits.filter(kit => 
      kit.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (grade) {
    kits = kits.filter(kit => kit.grade === grade);
  }
  
  if (series) {
    kits = kits.filter(kit => kit.series === series);
  }
  
  return kits;
}

export function getKitById(id: string): any | null {
  return SAMPLE_KITS.find(kit => kit.id === id) || null;
}
