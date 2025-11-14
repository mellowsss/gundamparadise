// Prisma client - only initialized if Prisma is available
let prismaClient: any = null;

try {
  // Try to import Prisma - will fail if @prisma/client is not generated
  const { PrismaClient } = require('@prisma/client');
  
  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined;
  };

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
  // Prisma not available - app will use sample data
  // This is expected if Prisma is not being used
  prismaClient = null;
}

export const prisma = prismaClient;
