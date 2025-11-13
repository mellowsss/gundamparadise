import { createClient } from 'edgedb';

// EdgeDB client for Vercel
// EdgeDB automatically uses EDGEDB_INSTANCE and EDGEDB_SECRET_KEY from environment variables
const globalForEdgeDB = globalThis as unknown as {
  edgedb: ReturnType<typeof createClient> | undefined;
};

export const edgedb = globalForEdgeDB.edgedb ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalForEdgeDB.edgedb = edgedb;
}
