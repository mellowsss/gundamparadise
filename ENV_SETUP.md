# Environment Variables Setup for Vercel

Based on your Prisma Accelerate connection, here's what to set in Vercel:

## Required Environment Variables

Go to your Vercel project → **Settings** → **Environment Variables** and add:

### 1. DATABASE_URL (Required)
```
prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19UUzlKQzYwUXBUdmdVOTlyZUlHV3QiLCJhcGlfa2V5IjoiMDFLOVpKNVdRTjNYNk5ZNFZGRVAxUkdXQTUiLCJ0ZW5hbnRfaWQiOiJjMTU3OGIwNmM3YTRkMmIwZjBmMjEwMzg1Mjc1OTY4M2M1Y2FmMmI2MWRhYjIzMTEwODgzMTcwNzZmNDc2Y2MxIiwiaW50ZXJuYWxfc2VjcmV0IjoiNDk3OGYwZGEtOGFmYi00NmJmLWIzZmMtYWIwMmM4MzNhMDdmIn0.NvtbCPxodOcLt6SnUmJ22gPEONdy8wSnL7Zfkddjhjo
```

**This is the Prisma Accelerate connection string** - use this for `DATABASE_URL`

### 2. DIRECT_URL (Required for Migrations)
```
postgres://c1578b06c7a4d2b0f0f2103852759683c5caf2b61dab2311088317076f476cc1:sk_TS9JC60QpTvgU99reIGWt@db.prisma.io:5432/postgres?sslmode=require
```

**This is the direct Postgres connection** - use this for `DIRECT_URL` (needed for migrations)

## Steps to Add in Vercel

1. Go to: https://vercel.com/mellowsss-projects/gundamparadise/settings/environment-variables
2. Click **"Add New"**
3. Add each variable:
   - **Key**: `DATABASE_URL`
   - **Value**: The Prisma Accelerate URL (prisma+postgres://...)
   - **Environments**: Check all (Production, Preview, Development)
4. Click **"Add"**
5. Repeat for `DIRECT_URL` with the direct postgres URL

## After Adding Variables

1. **Redeploy** your project (Vercel will auto-redeploy or you can manually trigger)
2. The build should succeed
3. After deployment, the database tables will be created automatically

## Important Notes

- **DATABASE_URL** uses Prisma Accelerate (connection pooling) - this is for your app runtime
- **DIRECT_URL** uses direct Postgres connection - this is for migrations and schema operations
- Both are required for Prisma to work correctly
- Make sure to add them to all environments (Production, Preview, Development)
