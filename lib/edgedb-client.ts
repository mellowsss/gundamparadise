import { createClient } from 'edgedb';

// EdgeDB client for Vercel
// EdgeDB automatically uses EDGEDB_INSTANCE and EDGEDB_SECRET_KEY from environment
const globalForEdgeDB = globalThis as unknown as {
  edgedb: ReturnType<typeof createClient> | undefined;
};

export const edgedb = globalForEdgeDB.edgedb ?? createClient({
  instance: process.env.EDGEDB_INSTANCE,
  secretKey: process.env.EDGEDB_SECRET_KEY,
});

if (process.env.NODE_ENV !== 'production') {
  globalForEdgeDB.edgedb = edgedb;
}
