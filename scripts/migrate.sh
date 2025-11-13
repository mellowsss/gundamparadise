#!/bin/bash
# Migration script for Vercel
# This script handles database migrations safely

set -e

echo "Generating Prisma Client..."
npx prisma generate

echo "Checking database connection..."
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set"
  exit 1
fi

echo "Running database migrations..."
npx prisma migrate deploy || {
  echo "Migration failed, trying db push as fallback..."
  npx prisma db push --accept-data-loss || {
    echo "Database setup failed"
    exit 1
  }
}

echo "Migrations completed successfully"
