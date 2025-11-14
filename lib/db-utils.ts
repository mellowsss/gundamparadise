import { prisma } from './prisma-client';
import { SAMPLE_KITS } from './sample-data';

// Helper to check if database is available
export function checkDatabase() {
  // Check if Prisma client exists and DATABASE_URL is set
  if (!prisma || !process.env.DATABASE_URL) {
    return null;
  }
  return prisma;
}

// Helper to return sample data when database is not available
export function getSampleKits(search?: string, grade?: string, series?: string) {
  let filteredKits = SAMPLE_KITS;
  
  if (search) {
    filteredKits = filteredKits.filter(kit => 
      kit.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (grade) {
    filteredKits = filteredKits.filter(kit => kit.grade === grade);
  }
  if (series) {
    filteredKits = filteredKits.filter(kit => kit.series === series);
  }
  
  return filteredKits;
}

