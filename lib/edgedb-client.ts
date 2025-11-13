import { createClient } from 'edgedb';

// EdgeDB client for Vercel
// EdgeDB automatically uses EDGEDB_INSTANCE and EDGEDB_SECRET_KEY from environment variables
const globalForEdgeDB = globalThis as unknown as {
  edgedb: ReturnType<typeof createClient> | undefined;
};

// Create client with error handling
let edgedbClient: ReturnType<typeof createClient>;

try {
  edgedbClient = globalForEdgeDB.edgedb ?? createClient();
  
  if (process.env.NODE_ENV !== 'production') {
    globalForEdgeDB.edgedb = edgedbClient;
  }
} catch (error) {
  console.error('Failed to create EdgeDB client:', error);
  // Create a mock client that will fail gracefully
  edgedbClient = createClient();
}

export const edgedb = edgedbClient;