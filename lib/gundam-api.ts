// Gundam API integration
const GUNDAM_API_BASE = 'https://gundam-api.pages.dev/api';

export interface GundamApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Array<{
    id: number;
    wikiName: string;
    wikiUrl: string;
    gundamName: string;
    header: string;
    details: string;
    imgUrl: string;
    pilots: string;
  }>;
}

export interface TransformedKit {
  id: string;
  name: string;
  grade: string;
  series?: string | null;
  scale?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  currentPrice?: number | null;
  averagePrice?: number | null;
  storeLinks?: Array<{
    id: string;
    url: string;
    store: {
      name: string;
      website: string;
    };
  }>;
}

// Extract grade from Gundam name (e.g., "RX-78-2 Gundam MG" -> "MG")
function extractGrade(name: string): string {
  const grades = ['PG', 'MG', 'RG', 'HG', 'SD', 'EG', 'FM', 'RE/100', '1/144', '1/100', '1/60'];
  for (const grade of grades) {
    if (name.toUpperCase().includes(grade)) {
      return grade;
    }
  }
  // Default to HG if no grade found
  return 'HG';
}

// Extract series from Gundam name or details
function extractSeries(name: string, details: string): string | null {
  const seriesMap: { [key: string]: string } = {
    'UC': 'UC',
    'Universal Century': 'UC',
    'SEED': 'SEED',
    '00': '00',
    'Wing': 'Wing',
    'G': 'G',
    'X': 'X',
    'AGE': 'AGE',
    'IBO': 'IBO',
    'Iron-Blooded Orphans': 'IBO',
    'Build': 'Build Fighters',
  };

  const searchText = `${name} ${details}`.toUpperCase();
  for (const [key, value] of Object.entries(seriesMap)) {
    if (searchText.includes(key.toUpperCase())) {
      return value;
    }
  }
  return null;
}

// Extract scale from name or default based on grade
function extractScale(grade: string): string {
  if (grade === 'PG') return '1/60';
  if (grade === 'MG' || grade === 'FM' || grade === 'RE/100') return '1/100';
  if (grade === 'RG' || grade === 'HG' || grade === 'EG') return '1/144';
  return '1/144';
}

// Generate a random price based on grade
function generatePrice(grade: string): { current: number; average: number; min: number; max: number } {
  const priceRanges: { [key: string]: { min: number; max: number } } = {
    'PG': { min: 150, max: 250 },
    'MG': { min: 35, max: 65 },
    'RG': { min: 25, max: 40 },
    'HG': { min: 15, max: 30 },
    'SD': { min: 8, max: 15 },
    'EG': { min: 5, max: 12 },
    'FM': { min: 30, max: 50 },
    'RE/100': { min: 40, max: 60 },
  };

  const range = priceRanges[grade] || priceRanges['HG'];
  const current = Math.random() * (range.max - range.min) + range.min;
  const average = current + (Math.random() * 5 - 2.5);
  const min = range.min;
  const max = range.max;

  return {
    current: Math.round(current * 100) / 100,
    average: Math.round(average * 100) / 100,
    min: Math.round(min * 100) / 100,
    max: Math.round(max * 100) / 100,
  };
}

// Transform Gundam API response to our kit format
export function transformGundamToKit(gundam: GundamApiResponse['results'][0]): TransformedKit {
  const grade = extractGrade(gundam.gundamName);
  const series = extractSeries(gundam.gundamName, gundam.details);
  const scale = extractScale(grade);
  const prices = generatePrice(grade);

  return {
    id: `gundam-${gundam.id}`,
    name: gundam.gundamName,
    grade,
    series,
    scale,
    imageUrl: gundam.imgUrl || null,
    description: gundam.header || gundam.details || null,
    currentPrice: prices.current,
    averagePrice: prices.average,
    storeLinks: [
      {
        id: `store-${gundam.id}-1`,
        url: `https://www.hlj.com/search/go?w=${encodeURIComponent(gundam.gundamName)}`,
        store: { name: 'HobbyLink Japan', website: 'https://www.hlj.com' },
      },
      {
        id: `store-${gundam.id}-2`,
        url: `https://www.usagundamstore.com/search?q=${encodeURIComponent(gundam.gundamName)}`,
        store: { name: 'USA Gundam Store', website: 'https://www.usagundamstore.com' },
      },
    ],
  };
}

// Fetch Gundams from API
export async function fetchGundamsFromAPI(
  page: number = 1,
  limit: number = 20,
  search?: string
): Promise<{ kits: TransformedKit[]; total: number; hasMore: boolean }> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${GUNDAM_API_BASE}/gundams?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Gundam API error: ${response.status}`);
    }

    const data: GundamApiResponse = await response.json();
    
    let kits = data.results.map(transformGundamToKit);

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      kits = kits.filter(
        (kit) =>
          kit.name.toLowerCase().includes(searchLower) ||
          kit.grade.toLowerCase().includes(searchLower) ||
          (kit.series && kit.series.toLowerCase().includes(searchLower)) ||
          (kit.description && kit.description.toLowerCase().includes(searchLower))
      );
    }

    return {
      kits,
      total: data.info.count,
      hasMore: data.info.next !== null,
    };
  } catch (error) {
    console.error('Error fetching from Gundam API:', error);
    throw error;
  }
}

// Fetch all Gundams with pagination
export async function fetchAllGundams(
  search?: string,
  grade?: string,
  series?: string
): Promise<TransformedKit[]> {
  try {
    const allKits: TransformedKit[] = [];
    let page = 1;
    let hasMore = true;
    const limit = 50; // Fetch more per page for efficiency

    while (hasMore && page <= 10) {
      // Limit to 10 pages to avoid too many requests
      const result = await fetchGundamsFromAPI(page, limit, search);
      allKits.push(...result.kits);
      hasMore = result.hasMore;
      page++;
    }

    // Apply filters
    let filtered = allKits;
    if (grade) {
      filtered = filtered.filter((kit) => kit.grade === grade);
    }
    if (series) {
      filtered = filtered.filter((kit) => kit.series === series);
    }

    return filtered;
  } catch (error) {
    console.error('Error fetching all Gundams:', error);
    return [];
  }
}

