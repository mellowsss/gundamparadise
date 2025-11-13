# Vercel Database Setup Guide

## Option 1: Use Default Prefix (Recommended)

1. In the database connection screen, **leave the "Custom Prefix" field EMPTY**
2. Click "Connect"
3. Vercel will create these environment variables:
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
4. Go to **Settings → Environment Variables**
5. Add these mappings:
   - `DATABASE_URL` = Copy the value from `POSTGRES_PRISMA_URL`
   - `DIRECT_URL` = Copy the value from `POSTGRES_URL_NON_POOLING` (optional)

## Option 2: Use Custom Prefix "STORAGE"

If you already connected with "STORAGE" prefix:

1. Go to **Settings → Environment Variables**
2. You'll see variables like:
   - `STORAGE_URL`
   - `STORAGE_DIRECT_URL` (if available)
3. Add these mappings:
   - `DATABASE_URL` = Copy the value from `STORAGE_URL`
   - `DIRECT_URL` = Copy the value from `STORAGE_DIRECT_URL` (if available, otherwise leave empty)

## After Setup

1. **Redeploy** your project (Vercel will automatically redeploy when env vars change)
2. The app will connect to your database
3. Tables will be created automatically on first API call (or you can run `prisma db push` manually)

## Verify Connection

After deployment, check:
- The app loads without errors
- You can search for kits
- You can add items to wishlist/collection

## Troubleshooting

If you see database connection errors:
- Verify `DATABASE_URL` is set correctly
- Check that the database is in the same region as your deployment
- Ensure all three environments (Development, Preview, Production) are checked if you want the database available everywhere
