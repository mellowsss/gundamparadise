import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create Prisma client with error handling - never crashes
let prismaClient: PrismaClient | null = null;

try {
  // Only create if DATABASE_URL exists
  if (process.env.DATABASE_URL) {
    prismaClient =
      globalForPrisma.prisma ??
      new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaClient;
    }
  }
} catch (error) {
  // Silently fail - app will work without database
  console.warn('Prisma client initialization skipped:', error);
  prismaClient = null;
}

export const prisma = prismaClient;
