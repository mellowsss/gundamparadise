import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create Prisma client with error handling
let prismaClient: PrismaClient;

try {
  prismaClient =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaClient;
  }
} catch (error) {
  console.warn('Prisma client initialization warning:', error);
  // Create client anyway - errors will be handled at query time
  prismaClient = new PrismaClient();
}

export const prisma = prismaClient;
