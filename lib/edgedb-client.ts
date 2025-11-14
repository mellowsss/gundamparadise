import { createClient } from 'edgedb';

// EdgeDB client for Vercel - completely safe, never throws
const globalForEdgeDB = globalThis as unknown as {
  edgedb: ReturnType<typeof createClient> | undefined;
};

// Create a safe client that never crashes the app
let edgedbClient: ReturnType<typeof createClient> | null = null;

// Only initialize if we're in a Node.js environment (not during build)
if (typeof window === 'undefined') {
  try {
    // Check if environment variables exist
    if (process.env.EDGEDB_INSTANCE && process.env.EDGEDB_SECRET_KEY) {
      edgedbClient = globalForEdgeDB.edgedb ?? createClient();
      
      if (process.env.NODE_ENV !== 'production') {
        globalForEdgeDB.edgedb = edgedbClient;
      }
    }
  } catch (error) {
    // Silently fail - app will work without EdgeDB
    console.warn('EdgeDB client initialization skipped:', error);
    edgedbClient = null;
  }
}

// Export a safe client that handles null gracefully
export const edgedb = edgedbClient;