import { createClient } from 'edgedb';

// EdgeDB client for Vercel
// EdgeDB automatically uses EDGEDB_INSTANCE and EDGEDB_SECRET_KEY from environment variables
const globalForEdgeDB = globalThis as unknown as {
  edgedb: ReturnType<typeof createClient> | undefined;
};

// Create client with error handling - won't crash if env vars are missing
let edgedbClient: ReturnType<typeof createClient>;

try {
  // Only create client if environment variables are present
  if (process.env.EDGEDB_INSTANCE && process.env.EDGEDB_SECRET_KEY) {
    edgedbClient = globalForEdgeDB.edgedb ?? createClient();
    
    if (process.env.NODE_ENV !== 'production') {
      globalForEdgeDB.edgedb = edgedbClient;
    }
  } else {
    // Create a client anyway - EdgeDB will handle missing credentials gracefully
    edgedbClient = createClient();
  }
} catch (error) {
  console.warn('EdgeDB client initialization warning:', error);
  // Create client anyway - errors will be handled at query time
  edgedbClient = createClient();
}

export const edgedb = edgedbClient;