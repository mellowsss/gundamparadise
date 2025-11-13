import { createClient } from 'edgedb';

// EdgeDB client for Vercel
// EdgeDB automatically uses EDGEDB_INSTANCE and EDGEDB_SECRET_KEY from environment variables
const globalForEdgeDB = globalThis as unknown as {
  edgedb: ReturnType<typeof createClient> | undefined;
};

// Create client with error handling - won't crash if env vars are missing
let edgedbClient: ReturnType<typeof createClient>;

try {
  // Always create client - EdgeDB will handle connection at query time
  edgedbClient = globalForEdgeDB.edgedb ?? createClient();
  
  if (process.env.NODE_ENV !== 'production') {
    globalForEdgeDB.edgedb = edgedbClient;
  }
} catch (error) {
  console.warn('EdgeDB client initialization warning:', error);
  // Create client anyway - errors will be handled at query time
  try {
    edgedbClient = createClient();
  } catch (e) {
    // If createClient itself fails, we'll handle it in API routes
    console.error('Failed to create EdgeDB client:', e);
    // @ts-ignore - This is a fallback, queries will fail gracefully
    edgedbClient = null as any;
  }
}

export const edgedb = edgedbClient;