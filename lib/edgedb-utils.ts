import { NextResponse } from 'next/server';
import { edgedb } from './edgedb-client';

// Helper to check if EdgeDB is available
export function checkEdgeDB() {
  if (!edgedb || !process.env.EDGEDB_INSTANCE || !process.env.EDGEDB_SECRET_KEY) {
    return null;
  }
  return edgedb;
}

// Helper to return empty response if EdgeDB is not available
export function getEmptyResponse() {
  return NextResponse.json({
    error: 'Database not configured',
    data: [],
  });
}
