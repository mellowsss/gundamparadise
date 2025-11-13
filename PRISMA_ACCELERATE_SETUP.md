# Prisma Accelerate Setup

You're using Prisma Accelerate for connection pooling. Here's how to set it up:

## Environment Variables Needed

You need **TWO** environment variables in Vercel:

### 1. DATABASE_URL (Prisma Accelerate)
```
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

### 2. DIRECT_URL (Direct PostgreSQL connection)
For migrations and direct connections, you need the actual PostgreSQL connection string.

**To get your DIRECT_URL:**
1. Go to your Prisma Accelerate dashboard
2. Find your database connection details
3. Look for the "Direct Connection" or "Connection String" (not the Accelerate one)
4. It should look like: `postgresql://user:password@host:port/database?sslmode=require`

## Setting Up in Vercel

1. Go to: https://vercel.com/mellowsss-projects/gundamparadise
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

**Variable 1: DATABASE_URL**
- Key: `DATABASE_URL`
- Value: `prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19xUy1xOVpJR2xuY0xHSV8zTTNnMkYiLCJhcGlfa2V5IjoiMDFLOVpONDg2NlEwMEQ2S1JZQjVHWVE2WU0iLCJ0ZW5hbnRfaWQiOiJjMTU3OGIwNmM3YTRkMmIwZjBmMjEwMzg1Mjc1OTY4M2M1Y2FmMmI2MWRhYjIzMTEwODgzMTcwNzZmNDc2Y2MxIiwiaW50ZXJuYWxfc2VjcmV0IjoiNDk3OGYwZGEtOGFmYi00NmJmLWIzZmMtYWIwMmM4MzNhMDdmIn0.z8IevClG7U64rerec-a6UtFqIYCbRZ8US_PVnmAkef10`
- Environments: ✅ Production, ✅ Preview, ✅ Development

**Variable 2: DIRECT_URL**
- Key: `DIRECT_URL`
- Value: Your direct PostgreSQL connection string (get from Prisma dashboard)
- Environments: ✅ Production, ✅ Preview, ✅ Development

## Important Notes

- **DATABASE_URL** uses Prisma Accelerate (for app queries)
- **DIRECT_URL** is the direct PostgreSQL connection (for migrations)
- Both are required for Prisma to work properly

## Finding Your DIRECT_URL

If you don't have the DIRECT_URL:
1. Check your Prisma Accelerate dashboard
2. Look for "Database Connection" or "Connection String"
3. It should be a standard PostgreSQL URL format
4. If you're using Vercel Postgres, it would be the `POSTGRES_URL_NON_POOLING` value

## After Adding Variables

1. Vercel will automatically redeploy
2. The build will create all database tables
3. Your app will connect through Prisma Accelerate
